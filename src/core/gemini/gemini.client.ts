import { GoogleGenAI, Type } from "@google/genai";
import { CanvasLayout } from "@/shared/types";
import { CanvasLayoutSchema } from "@/core/schemas/canvas.schema";
import { SYSTEM_INSTRUCTION } from "./prompt.templates";

const responseSchema = {
  type: Type.ARRAY,
  description: "Complete landing page blocks with fully populated props",
  items: {
    anyOf: [
      {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          type: { type: Type.STRING, enum: ["hero"] },
          props: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              subtitle: { type: Type.STRING },
              ctaText: { type: Type.STRING },
              ctaLink: { type: Type.STRING },
            },
            required: ["title", "subtitle", "ctaText"],
          },
        },
        required: ["id", "type", "props"],
      },
      {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          type: { type: Type.STRING, enum: ["features"] },
          props: {
            type: Type.OBJECT,
            properties: {
              heading: { type: Type.STRING },
              subheading: { type: Type.STRING },
              items: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    description: { type: Type.STRING },
                    iconName: { type: Type.STRING },
                  },
                  required: ["title", "description"],
                },
              },
            },
            required: ["heading", "subheading", "items"],
          },
        },
        required: ["id", "type", "props"],
      },
      {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          type: { type: Type.STRING, enum: ["testimonials"] },
          props: {
            type: Type.OBJECT,
            properties: {
              heading: { type: Type.STRING },
              items: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    quote: { type: Type.STRING },
                    author: { type: Type.STRING },
                    role: { type: Type.STRING },
                    avatarUrl: { type: Type.STRING },
                  },
                  required: ["quote", "author", "role"],
                },
              },
            },
            required: ["heading", "items"],
          },
        },
        required: ["id", "type", "props"],
      },
      {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          type: { type: Type.STRING, enum: ["pricing"] },
          props: {
            type: Type.OBJECT,
            properties: {
              heading: { type: Type.STRING },
              plans: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    price: { type: Type.STRING },
                    features: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                    ctaText: { type: Type.STRING },
                    highlighted: { type: Type.BOOLEAN },
                  },
                  required: ["name", "price", "features", "ctaText"],
                },
              },
            },
            required: ["heading", "plans"],
          },
        },
        required: ["id", "type", "props"],
      },
      {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          type: { type: Type.STRING, enum: ["cta"] },
          props: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              buttonText: { type: Type.STRING },
            },
            required: ["title", "description", "buttonText"],
          },
        },
        required: ["id", "type", "props"],
      },
      {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          type: { type: Type.STRING, enum: ["footer"] },
          props: {
            type: Type.OBJECT,
            properties: {
              brandName: { type: Type.STRING },
              copyrightText: { type: Type.STRING },
              links: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    label: { type: Type.STRING },
                    href: { type: Type.STRING },
                  },
                  required: ["label", "href"],
                },
              },
            },
            required: ["brandName", "copyrightText", "links"],
          },
        },
        required: ["id", "type", "props"],
      },
    ],
  },
};

export async function generateLayoutFromPrompt(
  prompt: string,
  apiKey: string,
): Promise<CanvasLayout> {
  const ai = new GoogleGenAI({ apiKey });

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema,
    },
  });

  const responseText = response.text;
  if (!responseText) {
    throw new Error("Gemini API returned an empty response.");
  }

  const rawJson = JSON.parse(responseText);
  const validatedLayout = CanvasLayoutSchema.parse(rawJson);

  return validatedLayout as CanvasLayout;
}
