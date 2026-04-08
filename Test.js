
// import "dotenv/config";
// import { OpenAI } from "openai";

// const client = new OpenAI({
//     baseURL: "https://router.huggingface.co/v1",
//     apiKey: process.env.HF_TOKEN,
// });

// async function main() {
//     const chatCompletion = await client.chat.completions.create({
//         model: "openai/gpt-oss-120b:groq",
//         messages: [
//             {
//                 role: "user",
//                 content: "What is the capital of France?",
//             },
//         ],
//     });

//     console.log(chatCompletion.choices[0].message);
// }

// main();



import "dotenv/config";
import { OpenAI } from "openai";
import fs from "fs";

const client = new OpenAI({
    baseURL: "https://router.huggingface.co/v1",
    apiKey: process.env.HF_TOKEN,
});

async function main() {
    const fileContent = fs.readFileSync("data.txt", "utf-8");
    const userQuery = "What is this document about?";
    const chatCompletion = await client.chat.completions.create({
        model: "openai/gpt-oss-120b:groq",
        messages: [
            {
                role: "system",
                content: "Answer ONLY from the provided document. If not found, say 'Not in document'."
            },
            {
                role: "user",
                content: `DOCUMENT:\n${fileContent}\n\nQUESTION:\n${userQuery}`
            },
        ],
        temperature: 0.2,
    });
    console.log(chatCompletion.choices[0].message.content);
}

main();