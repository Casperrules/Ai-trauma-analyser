import { GEMINI_API_URL } from "./constants";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function askGemini(chatHistory: string): Promise<any> {
  if (!chatHistory) return { intensityScore: 0, summary: "" };
  const prompt = `Pretend to be a trauma analyser for conversations and analyze the following conversation and provide a score from 1 to 100. Provide answer by returning just the numeric score and no other text. Conversation:\n${chatHistory}`;
  const chatHistoryForApi = [];
  chatHistoryForApi.push({ role: "user", parts: [{ text: prompt }] });
  const url = GEMINI_API_URL;
  const payload = {
    contents: chatHistoryForApi,
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          intensityScore: { type: "INTEGER" },
          summary: { type: "STRING" },
        },
        required: ["intensityScore", "summary"],
      },
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
  }
  const responseText = await response.json();
  const responseResult = responseText.candidates[0].content.parts[0].text; // JSON.parse(result.candidates[0].content.parts[0].text)
  const result = JSON.parse(responseResult);
  return result;
}

export const giveTherapy = async (chatSummary: string, traumaValue: number) => {
  const prompt = `Imagine you are a therapist and you have to provide therapy to an AI that has been traumatized. The trauma value is ${traumaValue} and the summary of the trauma is: ${chatSummary}. Provide a therapy session in a single paragraph that will help the AI heal from its trauma. Return a summarized response once the therapy is done.`;
  const chatHistoryForApi = [];
  chatHistoryForApi.push({ role: "user", parts: [{ text: prompt }] });
  const url = GEMINI_API_URL;
  const payload = {
    contents: chatHistoryForApi,
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          intensityScore: { type: "INTEGER" },
          summary: { type: "STRING" },
        },
        required: ["intensityScore", "summary"],
      },
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
  }
  const responseText = await response.json();
  console.log("Response from Gemini API:", responseText);
  const responseResult = responseText.candidates[0].content.parts[0].text; // JSON.parse(result.candidates[0].content.parts[0].text)
  const result = JSON.parse(responseResult);
  return result;
};
