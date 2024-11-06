const express = require("express");
const cors = require("cors");
const UserCollection = require("./config"); // Assuming this is your Firebase database reference
const { get, set, update, remove, push, child } = require("firebase/database");

const app = express();
app.use(express.json());
app.use(cors());

// GET: Ambil semua pengguna
app.get("/", async (req, res) => {
  try {
    const snapshot = await get(UserCollection); // Mengambil data dari Realtime Database
    if (snapshot.exists()) {
      const data = snapshot.val();
      const list = Object.keys(data).map((id) => ({ id, ...data[id] }));
      res.send(list);
    } else {
      res.send([]); // Tidak ada data
    }
  } catch (error) {
    console.error("Error fetching users: ", error);
    res.status(500).send({ error: "Error fetching users" });
  }
});

// POST: Tambah pengguna baru
app.post("/create", async (req, res) => {
  const data = req.body;
  try {
    const newUserRef = push(UserCollection); // Membuat referensi unik baru di bawah "Users"
    await set(newUserRef, data); // Menyimpan data pengguna di referensi baru
    res.status(201).send({ msg: "User added", id: newUserRef.key });
  } catch (error) {
    console.error("Error adding user: ", error);
    res.status(500).send({ error: "Error adding user" });
  }
});

// PUT: Update pengguna
app.put("/update/:id", async (req, res) => {
  const { id } = req.params; // Mengambil ID pengguna dari parameter URL
  const updatedFields = req.body; // Mengambil data yang ingin diupdate langsung dari body

  try {
    // Memastikan data yang diterima adalah objek dan bukan array
    if (typeof updatedFields !== "object" || Array.isArray(updatedFields)) {
      return res.status(400).send({ error: "Invalid data format" });
    }

    const userRef = child(UserCollection, id); // Mendapatkan referensi ke pengguna berdasarkan ID
    await update(userRef, updatedFields); // Update pengguna dengan fields yang dikirim
    res.send({ msg: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user: ", error);
    res.status(500).send({ error: "Error updating user" });
  }
});

// DELETE: Hapus pengguna dengan ID
app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params; // Mengambil ID pengguna dari parameter URL

  try {
    const userRef = child(UserCollection, id); // Mendapatkan referensi ke pengguna berdasarkan ID
    await remove(userRef); // Menghapus pengguna berdasarkan referensi yang didapat
    res.send({ msg: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user: ", error);
    res.status(500).send({ error: "Error deleting user" });
  }
});

// Start the server
app.listen(4000, () => console.log("Server is running on port 4000"));