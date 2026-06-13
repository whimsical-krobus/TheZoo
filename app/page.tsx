"use client";

import { useAnimals } from "./hooks/useAnimals";
import { AnimalList } from "./components/AnimalList";
import { FeedNotice } from "./components/FeedNotice";
import { isMoreThan4HoursPassed } from "./utils/timeUtils";

export default function Home() {
    const { animals, loading, error } = useAnimals();

    // Find animals that need feeding (> 4 hours)
    const animalsNeedingFood = animals.filter(
        (animal) => isMoreThan4HoursPassed(animal.lastFed)
    );

    return (
        <div className="w-full">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
                🦁 Välkommen till Zoomies 🦁
            </h1>
            <h2 className="text-2xl font-semibold text-center mb-4 text-gray-700 dark:text-gray-300">
              Zooet där lite spring i benen är en vanlig biverkning av matning 🐾
            </h2>

            <div className="bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-500 text-blue-700 dark:text-blue-200 p-6 rounded mb-8">
                <p className="text-lg mb-3">
                    Välkommen till vårt fantastiska zoo! Här kan du se vilka av våra djur som behöver matas just nu.
                </p>
                <p className="text-sm">
                    Om ett djur inte visas här betyder det att det redan är matat och inte behöver mat inom de närmaste 4 timmarna.
                    Besök <span className="font-semibold">"Möt våra djur"</span> för att se alla djur i zooet!
                </p>
            </div>

            {/* Show notices for all animals needing food */}
            {animalsNeedingFood.length > 0 && (
                <div className="mb-6 space-y-2">
                    {animalsNeedingFood.map((animal) => (
                        <FeedNotice
                            key={animal.id}
                            needsFeeding={true}
                            animalName={animal.name}
                        />
                    ))}
                </div>
            )}

            {error ? (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
                    <p className="font-bold">Error loading animals</p>
                    <p className="text-sm">{error}</p>
                </div>
            ) : (
                <AnimalList animals={animals} loading={loading} />
            )}
        </div>
    );
}
