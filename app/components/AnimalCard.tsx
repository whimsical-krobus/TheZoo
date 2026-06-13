"use client";

import Link from "next/link";
import { Animal } from "@/app/models/Animals";
import { handleImageError, getImageUrl } from "@/app/utils/imageUtils";

interface AnimalCardProps {
    animal: Animal;
}

export const AnimalCard = ({ animal }: AnimalCardProps) => {
    return (
        <Link href={`/animals/${animal.id}`}>
            <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden h-full">
                <div className="relative w-full h-48 bg-gray-200">
                    <img
                        src={getImageUrl(animal.imageUrl)}
                        alt={animal.name}
                        onError={handleImageError}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {animal.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                        {animal.shortDescription}
                    </p>
                </div>
            </div>
        </Link>
    );
};
