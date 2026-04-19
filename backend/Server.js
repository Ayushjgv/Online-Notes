import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
const port = 5000;

app.use(cors({
  origin: "https://online-notes-two.vercel.app",
  credentials: true
}));

app.use(express.json());




async function query(data) {
  const response = await fetch(
    "https://router.huggingface.co/v1/chat/completions",
    {
      headers: {
        Authorization: `Bearer ${process.env.VITE_HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  return await response.json();
}








app.post('/gpt', async (req, res) => {
  const { message } = req.body;

  const response = await query({
    messages: [{ role: "user", content: message }],
    model: "deepseek-ai/DeepSeek-R1:novita",
  });

  res.json(response);
});

app.get('/', (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});