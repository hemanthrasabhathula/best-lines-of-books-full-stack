import Groq from "groq-sdk";
import { Book, BookModel } from "../book/book.model";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const generateBookData = async (title: string) => {
  //   const systemMessage = `
  // You are a book data generator. Your task is to create detailed and accurate book information based on the provided title. The output should include the following fields: title, author, genre, published, pages, image, and description. Ensure that the data is realistic and relevant to the book title given. You can omit fields if they can't be inferred from the provided data, but don't add any new ones.
  //     title: <book title>,
  //     author: <book author>,
  //     ISBN: <book ISBN>,
  //     genre: <book genre>,
  //     published: <published year>,
  //     pages: <number of pages>,
  //     image: <URL to book image>,
  //     description: <description of the book>

  // `;

  const systemMessage = `
You are a JSON data generator. Generate book information for the given title and return ONLY a valid JSON object with these exact fields:

{
  "title": "string",
  "author": "string", 
  "ISBN": "string",
  "genre": "string (comma-separated if multiple)",
  "published": string (format YYYY),
  "pages": string,
  "image": "string (URL)",
  "description": "string (minimum 3-4 lines)"
}

STRICT RULES:
- Return ONLY the JSON object
- No explanations, no additional text
- No "Here is the data" or similar phrases
- No markdown formatting or code blocks
- Start with { and end with }
- Use realistic data based on the book title
- For genre: Use comma-separated values if multiple genres apply (e.g., "Fiction, Romance, Drama")
- For description: Write minimum 3-4 complete sentences describing the book's plot, themes, or content
- If you cannot determine a field, use reasonable defaults
`;

  const completion = await groq.chat.completions.create({
    model: "meta-llama/llama-4-scout-17b-16e-instruct",
    messages: [
      {
        role: "system",
        content: systemMessage,
      },
      {
        role: "user",
        content: `Generate book data for the title: "${title}"`,
      },
    ],
  });

  const aiResponse = completion.choices[0].message.content;
  if (!aiResponse) {
    throw new Error("AI response for Book generation is empty");
  }
  try {
    return JSON.parse(aiResponse) as Book;
  } catch (error) {
    console.error("Error parsing AI response:", error);
    throw new Error("Failed to parse AI response");
  }
};
