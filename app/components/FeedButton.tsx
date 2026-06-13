"use client";

interface FeedButtonProps {
    isFed: boolean;
    onFeed: () => void;
    lastFedTime?: string;
}

export const FeedButton = ({ isFed, onFeed, lastFedTime }: FeedButtonProps) => {
    return (
        <div className="flex flex-col gap-4">
            <button
                onClick={onFeed}
                disabled={isFed}
                className={`px-6 py-3 rounded-lg font-bold transition-all ${
                    isFed
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600 text-white active:scale-95"
                }`}
            >
                {isFed ? "✓ Matat" : "Mata djur"}
            </button>
            {isFed && lastFedTime && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Last fed: {lastFedTime}
                </p>
            )}
        </div>
    );
};
