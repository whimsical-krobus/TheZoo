"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AnimalDetails } from "@/app/models/animalDetails";
import { getAnimalById, resetFeedingIfExpired } from "@/app/services/animalService";
import { useFeedingStatus } from "@/app/hooks/useFeedingStatus";
import { FeedButton } from "@/app/components/FeedButton";
import { FeedNotice } from "@/app/components/FeedNotice";
import { handleImageError, getImageUrl } from "@/app/utils/imageUtils";
import { formatLastFedTime } from "@/app/utils/timeUtils";
import Link from "next/link";

export default function AnimalDetailPage() {
    const params = useParams();
    const id = parseInt(params.id as string);

    const [animal, setAnimal] = useState<AnimalDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(
        isNaN(id) ? "Invalid animal ID" : null
    );

    useEffect(() => {
        const checkFeedingStatus = async () => {
            // Skip if id is invalid
            if (isNaN(id)) {
                setLoading(false);
                return;
            }

            try {
                const data = await getAnimalById(id);
                if (data) {
                    resetFeedingIfExpired(id);
                    const updatedData = await getAnimalById(id);
                    setAnimal(updatedData);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load animal");
            } finally {
                setLoading(false);
            }
        };

        checkFeedingStatus();
    }, [id]);

    const { isFed, lastFed, needsFeeding, handleFeed } = useFeedingStatus(id);

    if (loading) {
        return (
            <div className="flex items-center justify-center w-full h-96">
                <p className="text-gray-500 text-lg">Loading animal details...</p>
            </div>
        );
    }

    if (error || !animal) {
        return (
            <div className="flex flex-col items-center justify-center w-full h-96 gap-4">
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
                    <p className="font-bold">Error</p>
                    <p className="text-sm">{error || "Animal not found"}</p>
                </div>
                <Link
                    href="/animals"
                    className="text-blue-500 hover:text-blue-700 underline"
                >
                    ← Back to animals
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl">
            <Link
                href="/animals"
                className="text-blue-500 hover:text-blue-700 underline mb-6 inline-block"
            >
                ← Back to animals
            </Link>

            <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg overflow-hidden">
                {/* Image */}
                <div className="relative w-full h-96 bg-gray-200 overflow-hidden">
                    <img
                        src={getImageUrl(animal.imageUrl)}
                        alt={animal.name}
                        onError={handleImageError}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content */}
                <div className="p-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        {animal.name}
                    </h1>
                    <p className="text-lg italic text-gray-600 dark:text-gray-400 mb-6">
                        {animal.latinName}
                    </p>

                    {/* Feeding Notice */}
                    {needsFeeding && (
                        <FeedNotice needsFeeding={needsFeeding} animalName={animal.name} />
                    )}

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase">
                                Year of Birth
                            </h3>
                            <p className="text-xl text-gray-900 dark:text-white">
                                {animal.yearOfBirth}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase">
                                Age
                            </h3>
                            <p className="text-xl text-gray-900 dark:text-white">
                                {new Date().getFullYear() - animal.yearOfBirth} years
                            </p>
                        </div>
                        <div className="md:col-span-2">
                            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase">
                                Medicine
                            </h3>
                            <p className="text-gray-900 dark:text-white">
                                {animal.medicine}
                            </p>
                        </div>
                    </div>

                    {/* Long Description */}
                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                            About
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {animal.longDescription}
                        </p>
                    </div>

                    {/* Feed Button */}
                    <div className="border-t pt-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                            Feeding
                        </h3>
                        <FeedButton
                            isFed={isFed}
                            onFeed={handleFeed}
                            lastFedTime={lastFed ? formatLastFedTime(lastFed) : undefined}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}