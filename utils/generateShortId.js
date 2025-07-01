/**
 * Generates a unique short ID using a predefined set of alphanumeric characters.
 * Ensures the ID is URL-safe and random.
 *
 * @param {number} length - Length of the generated ID
 * @returns {string} A unique short ID
 */
const generateShortId = (length = 12) => {
    const characters = 'aaabcdeefghjkm23456789npqrstuvwxyz23456789';
    let shortId = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        shortId += characters[randomIndex];
    }
    return shortId;
};

export default generateShortId;
