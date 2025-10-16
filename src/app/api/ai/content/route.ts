import { NextRequest } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { parse } from 'marked';

export async function POST(req: NextRequest) {
  try {
    const title = await req.json();

    if (!title) {
      return Response.json({ error: 'Missing context' }, { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a detailed blog post based on the following title: "${title}". 

                  The blog post should include:
                  - An engaging introduction
                  - 2–3 informative sections with subheadings
                  - A short conclusion that summarizes the key points
                  - The tone should be friendly and professional
                  `,
    });

    if (response.text) {
      const parsedText = parse(response.text);
      return Response.json({ success: true, content: parsedText });
    }
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
