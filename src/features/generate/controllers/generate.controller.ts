import { NextResponse } from 'next/server';
import { z } from 'zod';
import { generateLayoutFromPrompt } from '@/core/gemini/gemini.client';


const GenerateRequestSchema = z.object({
  prompt: z.string().min(1, 'Prompt cannot be empty'),
  apiKey: z.string().min(1, 'API key is required'),
});

export async function handleGenerateRequest(req: Request) {
  try {
    const rawBody = await req.json();

   
    const result = GenerateRequestSchema.safeParse(rawBody);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid request payload', details: result.error.issues},
        { status: 400 }
      );
    }

    
    const { prompt, apiKey } = result.data;

    
    const layout = await generateLayoutFromPrompt(prompt, apiKey);

    return NextResponse.json({ success: true, layout }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}