import { NextResponse } from 'next/server';
import { generateDualPayloadFromPrompt } from '@/core/gemini/gemini.client';

export async function handleGenerateRequest(req: Request) {
  try {
    const body = await req.json();
    const { prompt, apiKey } = body;

    const keyToUse = apiKey || process.env.GEMINI_API_KEY;
    if (!keyToUse) {
      return NextResponse.json(
        { error: 'API key missing. Please provide your Gemini API key in settings.' },
        { status: 401 }
      );
    }

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt text is required.' },
        { status: 400 }
      );
    }

    const payload = await generateDualPayloadFromPrompt(prompt, keyToUse);

    return NextResponse.json({
      success: true,
      message: payload.message,
      modifiedFiles: payload.modifiedFiles,
      layout: payload.layout,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate layout.';
    console.error('Generation Controller Error:', error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}