import { NextRequest, NextResponse } from 'next/server';
import { getHealthRecommendations } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { meals } = body;

    if (!Array.isArray(meals)) {
      return NextResponse.json(
        { error: 'Invalid payload, expected meals array' },
        { status: 400 }
      );
    }

    const recommendation = await getHealthRecommendations(meals);
    return NextResponse.json(recommendation, { status: 200 });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
