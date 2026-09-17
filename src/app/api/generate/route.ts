import { handleGenerateRequest } from '@/features/generate/controllers/generate.controller';

export async function POST(req: Request) {
  return handleGenerateRequest(req);
}