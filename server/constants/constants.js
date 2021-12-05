require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

const C16 = 'C16';
const C18 = 'C18';
const C13 = 'C13';
const NONE = 'NONE';

const NOW_PLAYING = 'NOW_PLAYING'
const UP_COMING = 'UP_COMING'

module.exports = {
    JWT_SECRET,
    MONGO_URI,
    PORT,
    C16,
    C18,
    C13,
    NOW_PLAYING,
    UP_COMING,
    NONE
}
