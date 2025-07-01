import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Audience from './models/Audience.js';
import Contact from './models/Contact.js';
import Context from './models/Context.js';

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
                department: 'Marketing',
                company: 'American Business Council',
                country: 'Nigeria',
            },
            {
                firstName: 'Chukwudi',
                lastName: 'Okeke',
                email: 'chukwudi.okeke@draperuniversity.com',
                phoneNumber: '08123456789',
                role: 'Developer',
                department: 'Engineering',
                company: 'Draper University',
                country: 'Nigeria',
            },
            {
                firstName: 'Funmi',
                lastName: 'Adetayo',
                email: 'funmi.adetayo@comercio.com.ng',
                phoneNumber: '07098765432',
                role: 'Designer',
                department: 'Design',
                company: 'Comercio',
                country: 'Nigeria',
            },
            {
                firstName: 'Bolaji',
                lastName: 'Adekunle',
                email: 'bolaji.adekunle@teknowledge.com.ng',
                phoneNumber: '09087654321',
                role: 'Analyst',
                department: 'Finance',
                company: 'Teknowledge',
                country: 'Nigeria',
            },
            {
                firstName: 'Ngozi',
                lastName: 'Nwachukwu',
                email: 'ngozi.nwachukwu@naijasecforce.ng',
                phoneNumber: '08098765432',
                role: 'HR Specialist',
                department: 'Human Resources',
                company: 'Naijasecforce',
                country: 'Nigeria',
            },
        ];

        const createdContacts = await Contact.insertMany(sampleContacts);
        console.log('Contacts created:', createdContacts);

        // Create an audience referencing the contacts
        const audience = await Audience.create({
            name: 'CSN Employees',
            AIContextEnabled: true,
            contacts: createdContacts.map((contact) => contact._id),
        });
        console.log('Audience created:', audience);

        // Define aligned email subjects and project titles
        const alignedContexts = [
            {
                emailSubject: "Quarterly Performance Review",
                project: "Redesign Corporate Website",
            },
            {
                emailSubject: "Upcoming Product Launch",
                project: "Develop Mobile App",
            },
            {
                emailSubject: "Team Building Activity",
                project: "Plan Annual Retreat",
            },
            {
                emailSubject: "Company Policy Updates",
                project: "Revise Employee Handbook",
            },
            {
                emailSubject: "Client Follow-Up Reminder",
                project: "Prepare Proposal for Key Client",
            },
        ];

        // Create context for each contact
        const contexts = createdContacts.map((contact, index) => {
            const alignedData = alignedContexts[index % alignedContexts.length]; // Cycle through aligned contexts
            return {
                contact: contact._id,
                data: {
                    lastEmailSent: alignedData.emailSubject, // Unique email subject
                    currentProject: alignedData.project, // Unique project title
                },
            };
        });

        const createdContexts = await Context.insertMany(contexts);
        console.log('Contexts created:', createdContexts);

        console.log('Database seeding completed.');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        // Close the database connection
        mongoose.connection.close();
    }
};

seedDatabase();
