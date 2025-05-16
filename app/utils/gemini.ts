import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Google Gemini API key is missing. Please check your .env.local file.");
}

const genAI = new GoogleGenerativeAI(apiKey);

type PortfolioData = {
  template: string;
  name: string;
  title: string;
  bio?: string;
  skills?: string[];
  projects?: { name: string; link?: string }[];
  email?: string;
  github?: string;
  linkedin?: string;
  socialLinks?: {
    email?: string;
    github?: string;
    linkedin?: string;
  };
  backgroundImage?: string;
  creativeTagline?: string;
  youtubeLinks?: string[];
};

export async function generatePortfolio(data: PortfolioData): Promise<string> {
  try {
    const { template } = data;
    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro" });

    let prompt = "";

    if (template === "minimalist") {
      const {
        name = "User",
        title = "Developer",
        bio = "",
        skills = [],
        projects = [],
        email = "",
        github = "",
        linkedin = "",
      } = data;

      prompt = `
Write a short professional summary for my portfolio in first person.

I am ${name}, a ${title}.
Bio: ${bio}
Skills: ${skills?.join(", ")}
Projects: ${projects?.map((p) => p.name).join(", ")}
Email: ${email}, GitHub: ${github}, LinkedIn: ${linkedin}

Use a friendly and confident tone. Write it in markdown. Do not include headings like "Summary" or "Introduction".

⚠️ Do NOT include:
- HTML code
- instructions
- headings
- bullet points
- extra formatting

✅ Only reply with: *one markdown paragraph* describing this person’s portfolio for display.
`;
    } else if (template === "creative") {
  const {
    creativeTagline = "",
    bio = "",
    skills = [],
    projects = [],
    youtubeLinks = [],
    socialLinks = {},
  } = data;

  prompt = `
Write a creative and engaging introduction paragraph for a personal portfolio.

My tagline is: "${creativeTagline}".
Bio: ${bio}
Skills: ${skills?.join(", ")}
Projects: ${projects?.map((p) => `${p.name} (${p.link || "no link"})`).join(", ")}
YouTube Links: ${youtubeLinks?.join(", ")}
Social Links: Email - ${socialLinks.email}, GitHub - ${socialLinks.github}, LinkedIn - ${socialLinks.linkedin}

✅ Write in the first person. Use a fun and informal tone with personality.
Only return a markdown paragraph without any headings, bullet points, or formatting.
`;
}
 else {
      throw new Error("Invalid template type.");
    }

    console.log("Gemini Prompt:\n", prompt);

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const response = await result.response;
    const text = await response.text();

    console.log("Gemini Response:\n", text);

    if (!text || text.length < 5) {
      throw new Error("Empty or invalid response from Gemini.");
    }

    return text;
  } catch (err: any) {
    console.error("Gemini API Error:", err.message || err);
    throw new Error("Gemini API call failed: " + (err.message || "Unknown error"));
  }
}
