export default function handler(req, res) {
  try {
    res.status(200).json({ message: "Hello from Vercel API!" });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
