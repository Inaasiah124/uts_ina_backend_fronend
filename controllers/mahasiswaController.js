import express from "express";

let mahasiswa = []; // In-memory storage for mahasiswa

// Helper function to validate mahasiswa data
const validateMahasiswaData = (data) => {
    const { npm, nama, kelas } = data;
    return npm && nama && kelas; // Check if all required fields are present
};

// Create Mahasiswa
export const createMahasiswa = (req, res) => {
    const { npm, nama, kelas } = req.body; // Destructure npm, nama, and kelas from the request body

    // Validate that npm, nama, and kelas are provided
    if (!validateMahasiswaData(req.body)) {
        return res.status(400).json({ message: "NPM, nama, dan kelas harus disediakan." });
    }

    const newMahasiswa = {
        id: mahasiswa.length + 1, // Simple ID generation
        npm, // Store npm
        nama, // Store nama
        kelas, // Store kelas
        deleted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    mahasiswa.push(newMahasiswa); // Add new mahasiswa to the array
    res.status(201).json({
        message: "Mahasiswa berhasil ditambahkan",
        mahasiswa: newMahasiswa
    });
};

// Read Mahasiswa
export const getMahasiswa = (req, res) => {
    res.status(200).json({
        message: "Data mahasiswa berhasil diambil",
        mahasiswa: mahasiswa.filter(m => !m.deleted) // Return only non-deleted mahasiswa
    });
};

// Update Mahasiswa
export const updateMahasiswa = (req, res) => {
    const { id } = req.params; // Get ID from URL parameters
    const mahasiswaIndex = mahasiswa.findIndex(m => m.id === Number(id)); // Ensure ID comparison is numeric
    
    if (mahasiswaIndex === -1) {
        return res.status(404).json({ message: "Mahasiswa tidak ditemukan" });
    }

    // Validate that npm, nama, and kelas are provided
    if (!validateMahasiswaData(req.body)) {
        return res.status(400).json({ message: "NPM, nama, dan kelas harus disediakan." });
    }

    const updateData = {
        ...req.body,
        updatedAt: new Date().toISOString() // Update timestamp
    };

    mahasiswa[mahasiswaIndex] = { ...mahasiswa[mahasiswaIndex], ...updateData }; // Update mahasiswa data
    res.status(200).json({
        message: "Data mahasiswa berhasil diperbarui",
        mahasiswa: mahasiswa[mahasiswaIndex]
    });
};

// Delete Mahasiswa
export const deleteMahasiswa = (req, res) => {
    const { id } = req.params; // Get ID from URL parameters
    const mahasiswaIndex = mahasiswa.findIndex(m => m.id === Number(id)); // Ensure ID comparison is numeric
    
    if (mahasiswaIndex === -1) {
        return res.status(404).json({ message: "Mahasiswa tidak ditemukan" });
    }

    mahasiswa[mahasiswaIndex].deleted = true; // Mark as deleted
    res.status(200).json({ message: "Mahasiswa berhasil dihapus" });
};