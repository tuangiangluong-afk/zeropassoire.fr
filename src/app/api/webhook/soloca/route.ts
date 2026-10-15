import { NextResponse } from 'next/server';

const SHARED_SECRET = 'madero-bridge-B2655607-3494-477C-9805-C0DF08A2D4C3';

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    const secret = process.env.INTERNAL_BLOG_SECRET || SHARED_SECRET;

    if (!secret || authHeader !== `Bearer ${secret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await req.json();
    const article = payload.article || payload;

    if (!article || !article.title) {
      return NextResponse.json({ error: 'Missing article data' }, { status: 400 });
    }

    const slug = article.slug || article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const liveUrl = `https://www.zeropassoire.fr/guides/${slug}`;

    return NextResponse.json({
      success: true,
      live_url: liveUrl,
      message: 'Article registered for Zéro Passoire'
    });
  } catch (error: any) {
    console.error('Zéro Passoire Soloca Webhook error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
