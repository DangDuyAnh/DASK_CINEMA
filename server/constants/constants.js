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

// User Model
// gender
const GENDER_MALE = 'Nam';
const GENDER_FEMALE = 'Nữ';
const GENDER_SECRET = 'Tùy chỉnh';

// role
const ROLE_CUSTOMER = 'customer'; // customer : only login to client website
const ROLE_ADMIN = 'admin'; // admin : full roles in admin website
const ROLE_CASHIER = 'cashier';
const ROLE_INVENTORY = 'inventory';

module.exports = {
    GENDER_MALE,
    GENDER_FEMALE,
    GENDER_SECRET,
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
