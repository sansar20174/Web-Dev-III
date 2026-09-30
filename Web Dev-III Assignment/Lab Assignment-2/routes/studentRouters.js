import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

// Resolve file path for students.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.join(__dirname, '../data/students.json');

// Helper function to read students data
const readStudentsData = () => {
    try {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

// Helper function to write students data
const writeStudentsData = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
};

// GET /students - View all students
router.get('/', (req, res) => {
    const students = readStudentsData();
    res.status(200).json(students);
});

// GET /students/:id - View student by ID
router.get('/:id', (req, res) => {
    const students = readStudentsData();
    const studentId = parseInt(req.params.id);
    const student = students.find((s) => s.id === studentId);

    if (!student) {
        return res.status(404).json({ error: 'Student Not Found' });
    }

    res.status(200).json(student);
});

// POST /students - Create a new student
router.post('/', (req, res) => {
    const { name, course } = req.body;

    // Handle Invalid Input (400 Bad Request)
    if (!name || !course) {
        return res.status(400).json({ error: 'Invalid Input: Name and Course are required' });
    }

    const students = readStudentsData();
    const newId = students.length > 0 ? students[students.length - 1].id + 1 : 1;

    const newStudent = {
        id: newId,
        name,
        course
    };

    students.push(newStudent);
    writeStudentsData(students);

    res.status(201).json({
        message: 'New Student Created',
        student: newStudent
    });
});

// PUT /students/:id - Update student info
router.put('/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const { name, course } = req.body;

    const students = readStudentsData();
    const studentIndex = students.findIndex((s) => s.id === studentId);

    if (studentIndex === -1) {
        return res.status(404).json({ error: 'Student Not Found' });
    }

    // Validate fields if provided
    if (!name && !course) {
        return res.status(400).json({ error: 'Invalid Input: Provide name or course to update' });
    }

    students[studentIndex].name = name || students[studentIndex].name;
    students[studentIndex].course = course || students[studentIndex].course;

    writeStudentsData(students);

    res.status(200).json({
        message: 'Student Updated Successfully',
        student: students[studentIndex]
    });
});

// DELETE /students/:id - Remove student
router.delete('/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    let students = readStudentsData();
    const studentExists = students.some((s) => s.id === studentId);

    if (!studentExists) {
        return res.status(404).json({ error: 'Student Not Found' });
    }

    students = students.filter((s) => s.id !== studentId);
    writeStudentsData(students);

    res.status(200).json({ message: 'Student Removed Successfully' });
});

export default router;