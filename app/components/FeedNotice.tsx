"use client";

import { isMoreThan4HoursPassed } from "@/app/utils/timeUtils";

interface FeedNoticeProps {
    needsFeeding: boolean;
    animalName?: string;
}

export const FeedNotice = ({ needsFeeding, animalName }: FeedNoticeProps) => {
    if (!needsFeeding) {
        return null;
    }

    return (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded">
            <p className="font-bold">
                ⚠️ {animalName ? `${animalName} needs feeding!` : "An animal needs feeding!"}
            </p>
            <p className="text-sm">
                This animal hasn't been fed for more than 4 hours.
            </p>
        </div>
    );
};
