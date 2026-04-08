import type { APIContext } from 'astro';
import defaultProfile from '../../content/profile.json';

export const prerender = false;

async function getKV(context: APIContext): Promise<KVNamespace | null> {
  try {
    return (context.locals as any).runtime?.env?.CONTENT ?? null;
  } catch {
    return null;
  }
}

export async function GET(context: APIContext) {
  const kv = await getKV(context);

  if (kv) {
    const data = await kv.get('profile', { type: 'json' });
    if (data) {
      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  return new Response(JSON.stringify(defaultProfile), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function PUT(context: APIContext) {
  const kv = await getKV(context);
  const body = await context.request.json();

  if (kv) {
    await kv.put('profile', JSON.stringify(body));
    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Dev fallback: write to local file
  try {
    const fs = await import('node:fs/promises');
    const path = await import('node:path');
    const filePath = path.join(process.cwd(), 'src/content/profile.json');
    await fs.writeFile(filePath, JSON.stringify(body, null, 2));
    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'No storage available' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
