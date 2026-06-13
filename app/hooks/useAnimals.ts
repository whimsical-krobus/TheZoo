"use client";

import { useState, useEffect } from "react";
import { Animal } from "@/app/models/Animals";
import { getAnimals } from "@/app/services/animalService";

export const useAnimals = () => {
    const [animals, setAnimals] = useState<Animal[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                setLoading(true);
                const data = await getAnimals();
                setAnimals(data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load animals");
                setAnimals([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAnimals();
    }, []);

    return { animals, loading, error };
};
