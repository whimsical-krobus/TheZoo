import { Animal } from "../models/Animals";
import { get } from "./serviceBase";
import { AnimalDetails } from "../models/AnimalDetails";

const API_URL = "https://animals.azurewebsites.net/api/animals";

/**
 * Helper function to convert lastFed string to Date object
 */
const convertLastFedToDate = <T extends { lastFed?: any }>(animal: T): T => {
    return {
        ...animal,
        lastFed: animal.lastFed ? new Date(animal.lastFed) : null
    } as T;
};

export const getAnimals = async () => {
    try {
        const data = await get<Animal[]>(API_URL);
        // Initialize animals with feeding data from storage if available
        const storedAnimals = localStorage.getItem("animals");
        if (storedAnimals) {
            const stored = JSON.parse(storedAnimals) as any[];
            const enrichedData = data.map(animal => {
                const storedAnimal = stored.find(a => a.id === animal.id);
                return storedAnimal 
                    ? convertLastFedToDate(storedAnimal)
                    : { ...animal, isFed: false, lastFed: null };
            });
            localStorage.setItem("animals", JSON.stringify(enrichedData));
            return enrichedData;
        }
        // First time - initialize all with empty feeding status
        const initializedData = data.map(animal => ({ 
            ...animal, 
            isFed: false, 
            lastFed: null 
        }));
        localStorage.setItem("animals", JSON.stringify(initializedData));
        return initializedData;
    } catch (error) {
        console.error("Error fetching animals:", error);
        const cachedAnimals = localStorage.getItem("animals");
        if (cachedAnimals) {
            const parsed = JSON.parse(cachedAnimals) as any[];
            return parsed.map(convertLastFedToDate);
        }
        throw error;
    }
};

export const getAnimalById = async (id: number): Promise<AnimalDetails | null> => {
    try {
        const animal = await get<AnimalDetails>(`${API_URL}/${id}`);
        const storedAnimals = localStorage.getItem("animals");
        if (storedAnimals) {
            const stored = JSON.parse(storedAnimals) as AnimalDetails[];
            const storedAnimal = stored.find(a => a.id === id);
            if (storedAnimal) {
                return {
                    ...animal,
                    isFed: storedAnimal.isFed,
                    lastFed: storedAnimal.lastFed ? new Date(storedAnimal.lastFed) : null
                };
            }
        }
        return {
            ...animal,
            isFed: false,
            lastFed: null
        };
    } catch (error) {
        console.error(`Error fetching animal with id ${id}:`, error);
        const cachedAnimals = localStorage.getItem("animals");
        if (cachedAnimals) {
            const animals = JSON.parse(cachedAnimals) as AnimalDetails[];
            const found = animals.find((animal) => animal.id === id);
            return found ? convertLastFedToDate(found) : null;
        }
        throw error;
    }
};

export const updateAnimalFedStatus = (id: number, isFed: boolean): void => {
    try {
        const animals = localStorage.getItem("animals");
        if (animals) {
            const data = JSON.parse(animals) as any[];
            const animal = data.find(a => a.id === id);
            if (animal) {
                animal.isFed = isFed;
                animal.lastFed = isFed ? new Date() : null;
                localStorage.setItem("animals", JSON.stringify(data));
            }
        }
    } catch (error) {
        console.error("Error updating animal fed status:", error);
    }
};

export const checkIfNeedsFeeding = (lastFed: Date | null): boolean => {
    if (!lastFed) return true;
    const now = new Date();
    const lastFedDate = new Date(lastFed);
    const hoursSinceFed = (now.getTime() - lastFedDate.getTime()) / (1000 * 60 * 60);
    return hoursSinceFed > 4;
};

export const checkIfFeedingExpired = (lastFed: Date | null): boolean => {
    if (!lastFed) return false;
    const now = new Date();
    const lastFedDate = new Date(lastFed);
    const hoursSinceFed = (now.getTime() - lastFedDate.getTime()) / (1000 * 60 * 60);
    return hoursSinceFed > 3;
};

export const resetFeedingIfExpired = (id: number): boolean => {
    try {
        const animals = localStorage.getItem("animals");
        if (animals) {
            const data = JSON.parse(animals) as any[];
            const animal = data.find(a => a.id === id);
            if (animal && animal.isFed && checkIfFeedingExpired(animal.lastFed ? new Date(animal.lastFed) : null)) {
                animal.isFed = false;
                animal.lastFed = null;
                localStorage.setItem("animals", JSON.stringify(data));
                return true;
            }
        }
        return false;
    } catch (error) {
        console.error("Error resetting feeding status:", error);
        return false;
    }
};