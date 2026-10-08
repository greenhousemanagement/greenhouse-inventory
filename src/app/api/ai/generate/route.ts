import { generateText } from 'ai';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return new Response(
        JSON.stringify({ text: 'Please provide a prompt.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Use Supabase AI Gateway (ZDR-compliant)
    const supabase = createSupabaseServerClient();

    const res = await fetch(
      'https://api.supabase.com/v1/ai/generate',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.AI_GATEWAY_API_KEY}`,
        },
        body: JSON.stringify({ prompt }),
      },
    );

    if (!response.ok) {
      throw new Error('AI generation failed');
    }

    const data = await response.json();

    return new Response(
      JSON.stringify({ text: data.text || data.response || '' }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('AI generation error:', error);
    return new Response(
      JSON.stringify({ text: 'Error generating response. Please try again.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}