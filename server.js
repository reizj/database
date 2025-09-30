// backend/server.js
import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config(); // Load .env file

const app = express();
app.use(express.json());

// 🔹 API endpoint for Arduino
app.post("/api/device-data", async (req, res) => {
  const data = req.body;

  try {
    // Forward data to Supabase
    const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/device_logs`, {
      method: "POST",
      headers: {
        "apikey": process.env.SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Supabase insert failed:", errorText);
      return res.status(500).json({ success: false, error: errorText });
    }

    console.log("✅ Inserted into Supabase:", data);
    res.json({ success: true });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 🔹 Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
