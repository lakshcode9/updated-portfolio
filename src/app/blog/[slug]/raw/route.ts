import { getPostBySlug } from '@/lib/blog';
import { notFound } from 'next/navigation';

export async function GET(
    request: Request,
    props: { params: Promise<{ slug: string }> }
) {
    const params = await props.params;
    try {
        const post = getPostBySlug(params.slug);

        // Serve the exact raw Markdown content for AI crawlers
        return new Response(post.content, {
            status: 200,
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Cache-Control': 'public, max-age=3600, s-maxage=86400',
                'Access-Control-Allow-Origin': '*',
            },
        });
    } catch (error) {
        return notFound();
    }
}
