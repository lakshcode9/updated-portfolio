import { getPostBySlug, getPostSlugs } from '@/lib/blog';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const post = getPostBySlug(params.slug);
    if (!post) {
        return { title: 'Post Not Found' };
    }
    return {
        title: `${post.title} | Blog`,
        description: post.description,
    };
}

export async function generateStaticParams() {
    const posts = getPostSlugs();
    return posts.map((post) => ({
        slug: post.replace(/\.md$/, ''),
    }));
}

export default async function BlogPostPage(props: Props) {
    const params = await props.params;
    let post;
    try {
        post = getPostBySlug(params.slug);
    } catch (e) {
        return notFound();
    }

    return (
        <article className="max-w-3xl mx-auto px-6 py-12 md:py-20 mt-16 lg:mt-24 min-h-screen">
            <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary mb-8 inline-block transition-colors">
                ← Back to Blog
            </Link>

            <header className="mb-10">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight leading-tight">
                    {post.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </time>
                    <span>•</span>
                    <a href={`/blog/${post.slug}/raw`} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors underline">
                        View Raw MD (for AI)
                    </a>
                </div>
            </header>

            <div className="prose prose-neutral dark:prose-invert prose-lg max-w-none">
                <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
        </article>
    );
}
