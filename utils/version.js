// utils/version.js
const fs = require('fs');
module.exports = fs.readFileSync('VERSION', 'utf8').trim();
