import { GoogleGenAI, Modality, ThinkingLevel } from "@google/genai";

// Note: GEMINI_API_KEY is injected by the platform
const apiKey = process.env.GEMINI_API_KEY || "";

export const getAI = () => {
  return new GoogleGenAI({ apiKey });
};

export const analyzeImage = async (base64Image: string, prompt: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: [
      {
        parts: [
          { text: prompt },
          { inlineData: { data: base64Image.split(',')[1], mimeType: "image/jpeg" } }
        ]
      }
    ]
  });
  return response.text;
};

export const analyzeVideo = async (base64Video: string, prompt: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: [
      {
        parts: [
          { text: prompt },
          { inlineData: { data: base64Video.split(',')[1], mimeType: "video/mp4" } }
        ]
      }
    ]
  });
  return response.text;
};

export const solveComplexTask = async (prompt: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: prompt,
    config: {
      thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH }
    }
  });
  return response.text;
};

export const generateMusic = async (prompt: string, onProgress?: (chunk: string) => void) => {
  const ai = getAI();
  const response = await ai.models.generateContentStream({
    model: "lyria-3-pro-preview",
    contents: prompt,
    config: {
      responseModalities: [Modality.AUDIO]
    }
  });

  let audioBase64 = "";
  let mimeType = "audio/wav";

  for await (const chunk of response) {
    const parts = chunk.candidates?.[0]?.content?.parts;
    if (!parts) continue;
    for (const part of parts) {
      if (part.inlineData?.data) {
        if (!audioBase64 && part.inlineData.mimeType) {
          mimeType = part.inlineData.mimeType;
        }
        audioBase64 += part.inlineData.data;
      }
    }
  }

  const binary = atob(audioBase64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  const blob = new Blob([bytes], { type: mimeType });
  return URL.createObjectURL(blob);
};

export const generateVideo = async (prompt: string, base64Image?: string) => {
  const ai = getAI();
  let operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: prompt,
    image: base64Image ? {
      imageBytes: base64Image.split(',')[1],
      mimeType: 'image/jpeg',
    } : undefined,
    config: {
      numberOfVideos: 1,
      resolution: '720p',
      aspectRatio: '16:9'
    }
  });

  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 5000));
    operation = await ai.operations.getVideosOperation({ operation: operation });
  }

  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  if (!downloadLink) throw new Error("Video generation failed");

  const response = await fetch(downloadLink, {
    method: 'GET',
    headers: {
      'x-goog-api-key': apiKey,
    },
  });
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};

export const connectLive = async (callbacks: {
  onopen: () => void;
  onmessage: (message: any) => void;
  onerror: (error: any) => void;
  onclose: () => void;
}) => {
  const ai = getAI();
  return ai.live.connect({
    model: "gemini-3.1-flash-live-preview",
    callbacks,
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: { prebuiltVoiceConfig: { voiceName: "Zephyr" } },
      },
      systemInstruction: "You are a helpful AI tutor for Keltix Academy. You speak naturally and help students learn AI.",
    },
  });
};
