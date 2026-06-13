/**
 * Utility functions for time-related calculations
 */

const HOURS_THRESHOLD_3 = 3;
const HOURS_THRESHOLD_4 = 4;
const MS_PER_HOUR = 1000 * 60 * 60;

/**
 * Get hours since a given date
 * @param date - The date to calculate from
 * @returns Number of hours since the date
 */
export const getHoursSince = (date: Date | null): number => {
    if (!date) return Infinity;
    const now = new Date();
    const givenDate = new Date(date);
    return (now.getTime() - givenDate.getTime()) / MS_PER_HOUR;
};

/**
 * Check if more than 3 hours have passed
 * @param date - The date to check
 * @returns true if more than 3 hours have passed
 */
export const isMoreThan3HoursPassed = (date: Date | null): boolean => {
    return getHoursSince(date) > HOURS_THRESHOLD_3;
};

/**
 * Check if more than 4 hours have passed
 * @param date - The date to check
 * @returns true if more than 4 hours have passed
 */
export const isMoreThan4HoursPassed = (date: Date | null): boolean => {
    return getHoursSince(date) > HOURS_THRESHOLD_4;
};

/**
 * Format the last fed time for display
 * @param date - The date to format
 * @returns Formatted string like "2 hours ago" or "1 hour ago"
 */
export const formatLastFedTime = (date: Date | null): string => {
    if (!date) return "Never";
    const hours = Math.floor(getHoursSince(date));
    const minutes = Math.floor((getHoursSince(date) % 1) * 60);

    if (hours === 0) {
        return `${minutes} minutes ago`;
    } else if (hours === 1) {
        return "1 hour ago";
    } else {
        return `${hours} hours ago`;
    }
};
