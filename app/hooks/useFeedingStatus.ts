"use client";

import { useState, useEffect } from "react";
import { updateAnimalFedStatus, checkIfNeedsFeeding } from "@/app/services/animalService";

const FEEDING_STATUS_CHECK_INTERVAL = 60000;

export const useFeedingStatus = (animalId: number, onFeedingUpdate?: (isFed: boolean, lastFed: Date | null) => void) => {
    const [isFed, setIsFed] = useState(false);
    const [lastFed, setLastFed] = useState<Date | null>(null);
    const [needsFeeding, setNeedsFeeding] = useState(false);

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


    useEffect(() => {
        const needsFed = checkIfNeedsFeeding(lastFed);
        setNeedsFeeding(needsFed);
    }, [lastFed]);


    useEffect(() => {
        const needsFed = checkIfNeedsFeeding(lastFed);
        setNeedsFeeding(needsFed);

        const interval = setInterval(() => {
            const needsFed = checkIfNeedsFeeding(lastFed);
            setNeedsFeeding(needsFed);
        }, FEEDING_STATUS_CHECK_INTERVAL);

        return () => clearInterval(interval);
    }, [lastFed]);

    const handleFeed = () => {
        const now = new Date();
        setIsFed(true);
        setLastFed(now);
        updateAnimalFedStatus(animalId, true);
        
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
