import express from "express";
import cors from "cors"; // Import CORS middleware
import { createMahasiswa, getMahasiswa, updateMahasiswa, deleteMahasiswa } from "./controllers/mahasiswaController.js"; // Import controller functions

const app = express();
const PORT = process.env.PORT || 4000; // Set the port

// Middleware
app.use(cors({
    origin: 'http://172.20.10.13:3005', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    credentials: true // Allow credentials (if needed)
}));

app.use(express.json()); // Middleware to parse JSON bodies

// Define routes
app.post("/api/mahasiswa", createMahasiswa); // Create Mahasiswa
app.get("/api/mahasiswa", getMahasiswa); // Read Mahasiswa
app.put("/api/mahasiswa/:id", updateMahasiswa); // Update Mahasiswa
app.delete("/api/mahasiswa/:id", deleteMahasiswa); // Delete Mahasiswa; // Delete Mahasiswa
// Middleware for route not found
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Route tidak ditemukan'
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});