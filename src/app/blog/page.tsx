import { getAllPosts } from '@/lib/blog';
import Link from 'next/link';

export const metadata = {
    title: 'Blog',
    description: 'Thoughts, essays, and deep dives.',
};

export default function BlogIndex() {
    const posts = getAllPosts();

    return (
        <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 mt-16 lg:mt-24 min-h-screen">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Blog</h1>

            {posts.length === 0 ? (
                <p className="text-muted-foreground">No posts found yet.</p>
            ) : (
                <div className="flex flex-col gap-6">
                    {posts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="group block p-6 border rounded-xl hover:border-primary/50 transition-colors"
                        >
                            <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
                                {post.title}
                            </h2>
                            <div className="text-sm text-muted-foreground mb-4">
                                {new Date(post.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </div>
                            {post.description && (
                                <p className="text-foreground/80 leading-relaxed">
                                    {post.description}
                                </p>
                            )}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
