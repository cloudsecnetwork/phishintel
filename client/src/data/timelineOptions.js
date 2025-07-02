// src/data/timelineOptions.js

export const timelineOptions = {
    responsive: true,
    scales: {
        x: {
            type: 'time',
            time: {
                unit: 'hour',
            },
            title: {
                display: true,
                text: 'Time (24-hour window)',
                font: {
                    family: '"Montserrat", sans-serif',
                    size: 14,
                },
            },
            ticks: {
                font: {
                    family: '"Montserrat", sans-serif',
                    size: 12,
                },
            },
        },
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: 'Count',
                font: {
                    family: '"Montserrat", sans-serif',
                    size: 14,
                },
            },
            ticks: {
                font: {
                    family: '"Montserrat", sans-serif',
                    size: 12,
                },
            },
        },
    },
    plugins: {
        legend: {
            position: 'top',
            labels: {
                font: {
                    family: '"Montserrat", sans-serif',
                    size: 12,
                },
            },
        },
    },
    elements: {
        line: {
            tension: 0.3,
        },
        point: {
            radius: 4,
        },
    },
};
