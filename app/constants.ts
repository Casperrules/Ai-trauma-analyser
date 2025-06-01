export const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${
  process.env.GEMINI_API_KEY || "AIzaSyAiBIYwqQQ4Xvtv9GoVpJz6i56hUFlWFCc"
}`; // if paid key is not set, use the free key
