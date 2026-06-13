"use client";

import { useState, useEffect } from "react";
import { updateAnimalFedStatus, checkIfNeedsFeeding } from "@/app/services/animalService";

export const useFeedingStatus = (animalId: number, onFeedingUpdate?: (isFed: boolean, lastFed: Date | null) => void) => {
    const [isFed, setIsFed] = useState(false);
    const [lastFed, setLastFed] = useState<Date | null>(null);
    const [needsFeeding, setNeedsFeeding] = useState(false);

    // Load feeding status from localStorage on mount
    useEffect(() => {
        const animals = localStorage.getItem("animals");
        if (animals) {
            try {
                const data = JSON.parse(animals);
                const animal = data.find((a: any) => a.id === animalId);
                if (animal) {
                    const lastFedDate = animal.lastFed ? new Date(animal.lastFed) : null;
                    setIsFed(animal.isFed);
                    setLastFed(lastFedDate);
                }
            } catch (error) {
                console.error("Error loading feeding status from localStorage:", error);
            }
        }
    }, [animalId]);

    // Update needsFeeding whenever lastFed changes
    useEffect(() => {
        const needsFed = checkIfNeedsFeeding(lastFed);
        setNeedsFeeding(needsFed);
    }, [lastFed]);

    const handleFeed = () => {
        const now = new Date();
        setIsFed(true);
        setLastFed(now);
        updateAnimalFedStatus(animalId, true);
        
        // Notify parent component of the update
        if (onFeedingUpdate) {
            onFeedingUpdate(true, now);
        }
    };

    return {
        isFed,
        lastFed,
        needsFeeding,
        handleFeed,
    };
};
