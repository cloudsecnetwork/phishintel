import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Extend dayjs with plugins
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Format a date to human-readable format
 * @param {string|Date} date - The date to format
 * @param {Object} options - Formatting options
 * @param {boolean} options.showTime - Whether to show time (default: true)
 * @param {boolean} options.relative - Whether to use relative time for recent dates (default: true)
 * @param {number} options.relativeThreshold - Days threshold for relative time (default: 7)
 * @returns {string} Formatted date string
 */
export const formatHumanReadableDate = (date, options = {}) => {
    const {
        showTime = true,
        relative = true,
        relativeThreshold = 7
    } = options;

    if (!date) return 'N/A';

    const dayjsDate = dayjs(date);
    const now = dayjs();
    const daysDiff = now.diff(dayjsDate, 'day');

    // Use relative time for recent dates (within threshold)
    if (relative && daysDiff <= relativeThreshold && daysDiff >= 0) {
        if (daysDiff === 0) {
            // Today - show time
            return showTime ? `Today at ${dayjsDate.format('h:mm A')}` : 'Today';
        } else if (daysDiff === 1) {
            // Yesterday
            return showTime ? `Yesterday at ${dayjsDate.format('h:mm A')}` : 'Yesterday';
        } else {
            // Within threshold - always use relative time (e.g., "2 days ago")
            return dayjsDate.fromNow();
        }
    }

    // For older dates, use absolute format
    if (showTime) {
        return dayjsDate.format('MMM D, YYYY [at] h:mm A');
    } else {
        return dayjsDate.format('MMM D, YYYY');
    }
};

/**
 * Format date for DataGrid columns
 * @param {string|Date} date - The date to format
 * @returns {string} Formatted date string
 */
export const formatDataGridDate = (date) => {
    if (!date) return 'N/A';
    
    const dayjsDate = dayjs(date);
    const now = dayjs();
    const daysDiff = now.diff(dayjsDate, 'day');

    // Use relative time for recent dates (within 7 days)
    if (daysDiff <= 7 && daysDiff >= 0) {
        if (daysDiff === 0) {
            // Today - show relative time like "2 hours ago"
            return dayjsDate.fromNow();
        } else if (daysDiff === 1) {
            // Yesterday - show time
            return `Yesterday at ${dayjsDate.format('h:mm A')}`;
        } else {
            // Within threshold - use relative time (e.g., "2 days ago")
            return dayjsDate.fromNow();
        }
    }

    // For older dates, use absolute format with time
    return dayjsDate.format('MMM D, YYYY [at] h:mm A');
};

/**
 * Format date for card displays (shorter format)
 * @param {string|Date} date - The date to format
 * @returns {string} Formatted date string
 */
export const formatCardDate = (date) => {
    if (!date) return 'N/A';
    
    const dayjsDate = dayjs(date);
    const now = dayjs();
    const daysDiff = now.diff(dayjsDate, 'day');

    // Use relative time for recent dates (within 7 days)
    if (daysDiff <= 7 && daysDiff >= 0) {
        if (daysDiff === 0) {
            // Today - show relative time like "2 hours ago"
            return dayjsDate.fromNow();
        } else if (daysDiff === 1) {
            // Yesterday
            return 'Yesterday';
        } else {
            // Within threshold - use relative time (e.g., "2 days ago")
            return dayjsDate.fromNow();
        }
    }

    // For older dates, use absolute format without time
    return dayjsDate.format('MMM D, YYYY');
};

/**
 * Get relative time string
 * @param {string|Date} date - The date to format
 * @returns {string} Relative time string
 */
export const getRelativeTime = (date) => {
    if (!date) return 'N/A';
    return dayjs(date).fromNow();
};

// Test function to verify formatting (for development)
export const testDateFormatting = () => {
    const now = dayjs();
    const testDates = [
        now.subtract(30, 'minute').toDate(),
        now.subtract(2, 'hour').toDate(),
        now.subtract(1, 'day').toDate(),
        now.subtract(3, 'day').toDate(),
        now.subtract(10, 'day').toDate(),
        now.subtract(30, 'day').toDate(),
    ];

    console.log('Testing date formatting:');
    testDates.forEach((date, index) => {
        console.log(`Test ${index + 1}: ${formatCardDate(date)}`);
    });
}; 