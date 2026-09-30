import express from 'express';
import logger from './middleware/logger.js';
import studentRoutes from './routes/studentRouters.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Built-in middleware to parse JSON bodies
app.use(express.json());

// Custom Logger Middleware[cite: 1]
app.use(logger);

// Modular Routing[cite: 1]
app.use('/students', studentRoutes);

// Global Error Handling / 404 Route Not Found
app.use((req, res) => {
    res.status(404).json({ error: 'Route Not Found' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});