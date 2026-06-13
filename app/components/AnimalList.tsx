"use client";

import { Animal } from "@/app/models/Animals";
import { AnimalCard } from "./AnimalCard";

interface AnimalListProps {
    animals: Animal[];
    loading: boolean;
}

export const AnimalList = ({ animals, loading }: AnimalListProps) => {
    if (loading) {
        return (
            <div className="flex items-center justify-center w-full h-96">
                <p className="text-gray-500 text-lg">Loading animals...</p>
            </div>
        );
    }

    if (animals.length === 0) {
        return (
            <div className="flex items-center justify-center w-full h-96">
                <p className="text-gray-500 text-lg">No animals found</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {animals.map((animal) => (
                <AnimalCard key={animal.id} animal={animal} />
            ))}
        </div>
    );
};
