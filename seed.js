import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Audience from './models/Audience.js';
import Contact from './models/Contact.js';

// Load environment variables (if needed)
dotenv.config();

// MongoDB connection
const db = "mongodb+srv://root:toor@cluster.xcwrz3x.mongodb.net/app";
mongoose.connect(db)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err.message);
        process.exit(1); // Exit on MongoDB connection error
    });

const seedDatabase = async () => {
    try {
        // Create sample contacts
        const sampleContacts = [
            {
                firstName: 'Adeola',
                lastName: 'Ogunleye',
                email: 'adeola.ogunleye@abcnigeria.org',
                phoneNumber: '08012345678',
                role: 'Manager',
                country: 'Nigeria',
                metadata: new Map([
                    ['department', 'Marketing'],
                    ['company', 'American Business Council'],
                    ['location', 'Lagos']
                ])
            },
            {
                firstName: 'Chukwudi',
                lastName: 'Okeke',
                email: 'chukwudi.okeke@draperuniversity.com',
                phoneNumber: '08123456789',
                role: 'Developer',
                country: 'Nigeria',
                metadata: new Map([
                    ['department', 'Engineering'],
                    ['company', 'Draper University'],
                    ['skills', 'JavaScript, Python']
                ])
            },
            {
                firstName: 'Funmi',
                lastName: 'Adetayo',
                email: 'funmi.adetayo@comercio.com.ng',
                phoneNumber: '07098765432',
                role: 'Designer',
                country: 'Nigeria',
                metadata: new Map([
                    ['department', 'Design'],
                    ['company', 'Comercio'],
                    ['tools', 'Figma, Adobe Creative Suite']
                ])
            },
            {
                firstName: 'Bolaji',
                lastName: 'Adekunle',
                email: 'bolaji.adekunle@teknowledge.com.ng',
                phoneNumber: '09087654321',
                role: 'Analyst',
                country: 'Nigeria',
                metadata: new Map([
                    ['department', 'Finance'],
                    ['company', 'Teknowledge'],
                    ['experience', '3 years']
                ])
            },
            {
                firstName: 'Ngozi',
                lastName: 'Nwachukwu',
                email: 'ngozi.nwachukwu@naijasecforce.ng',
                phoneNumber: '08098765432',
                role: 'HR Specialist',
                country: 'Nigeria',
                metadata: new Map([
                    ['department', 'Human Resources'],
                    ['company', 'Naijasecforce'],
                    ['certifications', 'PHR, SHRM-CP']
                ])
            },
        ];

        const createdContacts = await Contact.insertMany(sampleContacts);
        console.log('Contacts created:', createdContacts);

        // Create an audience referencing the contacts
        const audience = await Audience.create({
            name: 'CSN Employees',
            contacts: createdContacts.map((contact) => contact._id),
        });
        console.log('Audience created:', audience);

        console.log('Database seeding completed.');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        // Close the database connection
        mongoose.connection.close();
    }
};

seedDatabase();
