import prisma from '../db/prismaClient.js';

export const getSampleData = async (req, res) => {
    try {
        const students = await prisma.stud.findMany();
        res.json(students);
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ error: 'Failed to fetch students' });
    }
};
