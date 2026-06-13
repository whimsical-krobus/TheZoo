"use client";

import { useAnimals } from "@/app/hooks/useAnimals";
import { AnimalList } from "@/app/components/AnimalList";
import { FeedNotice } from "@/app/components/FeedNotice";
import { isMoreThan4HoursPassed } from "@/app/utils/timeUtils";

export default function AnimalsPage() {
    const { animals, loading, error } = useAnimals();

    // Find animals that need feeding (> 4 hours)
    const animalsNeedingFood = animals.filter(
        (animal) => animal.isFed && isMoreThan4HoursPassed(animal.lastFed)
    );

    return (
        <div className="w-full">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
                🦁 Möt våra djur 🦁
            </h1>

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

            {/* Show message about animals needing food */}
            {!loading && animalsNeedingFood.length > 0 && (
                <div className="bg-green-50 dark:bg-green-900 border-l-4 border-green-500 text-green-700 dark:text-green-200 p-4 rounded mb-6">
                    <p className="text-sm">
                        ℹ️ Gå till startsidan för att se vilka djur som behöver matas nu!
                    </p>
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