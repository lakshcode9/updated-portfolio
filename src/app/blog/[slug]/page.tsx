import { getPostBySlug, getPostSlugs } from '@/lib/blog';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, ChevronRight, ArrowUpRight } from 'lucide-react';

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: Props) {
    const params = await props.params;
    const post = getPostBySlug(params.slug);
    if (!post) {
        return { title: 'Post Not Found' };
    }
    return {
        title: `${post.title} | Laksh`,
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
        <article className="font-[system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,sans-serif] tracking-normal min-h-screen bg-[#030303] text-white selection:bg-[#a3e635] selection:text-black">
            {/* Breadcrumbs Navigation */}
            <div className="fixed top-[88px] left-0 right-0 z-40 bg-gradient-to-b from-[#030303] to-transparent py-4 px-6 pointer-events-none md:block hidden">
                <div className="max-w-4xl mx-auto flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-white/40 pointer-events-auto">
                    <Link href="/" className="hover:text-[#a3e635] transition-colors">Home</Link>
                    <ChevronRight className="w-3 h-3" />
                    <Link href="/blog" className="hover:text-[#a3e635] transition-colors">Archive</Link>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-white/80 max-w-[200px] truncate">{post.title}</span>
                </div>
            </div>

            {/* Hero Header with Background Image overlay */}
            <header className="relative w-full min-h-[60vh] md:min-h-[75vh] flex flex-col justify-end pt-32 pb-16 overflow-hidden">
                {/* Background Image Elements */}
                <div className="absolute inset-0 z-0 bg-[#0a0a0a]">
                    {post.image && (
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover opacity-30 select-none pointer-events-none"
                        />
                    )}
                    {/* Gradients to fade smoothly into the content */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/80 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#030303]/80 to-transparent" />
                </div>

                <div className="max-w-3xl mx-auto px-6 relative z-10 w-full">
                    <Link
                        href="/blog"
                        className="md:hidden inline-flex items-center gap-2 text-white/50 hover:text-[#a3e635] mb-8 transition-colors uppercase tracking-widest text-xs font-semibold"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Archive
                    </Link>

                    <h1 className="font-sans text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-8 text-white uppercase">
                        {post.title}
                    </h1>

                    <div className="font-[system-ui,sans-serif] tracking-normal flex flex-wrap items-center gap-6 text-white/50 text-sm tracking-wide">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#a3e635]" />
                            <time dateTime={post.date}>
                                {new Date(post.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </time>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-[#a3e635]" />
                            <span>{post.readTime}</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Body */}
            <div className="font-[system-ui,sans-serif] tracking-normal max-w-3xl mx-auto px-6 py-12 md:py-16 relative">
                <div className="prose prose-invert max-w-none md:prose-lg lg:prose-xl
          prose-p:text-white/70 prose-p:leading-relaxed prose-p:font-light
          prose-headings:font-bold prose-headings:text-white prose-headings:tracking-tight
          prose-h2:text-3xl lg:prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:leading-tight
          prose-h3:text-2xl lg:prose-h3:text-3xl prose-h3:mt-10 prose-h3:text-white/90
          prose-a:text-[#a3e635] prose-a:font-semibold prose-a:no-underline hover:prose-a:text-white prose-a:transition-colors
          prose-strong:text-white prose-strong:font-semibold
          prose-blockquote:border-l-4 prose-blockquote:border-[#a3e635] prose-blockquote:bg-white/5 prose-blockquote:py-3 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:text-white/80
          prose-ul:text-white/70 prose-li:marker:text-[#a3e635]
          prose-img:rounded-2xl prose-img:border prose-img:border-white/10 prose-img:shadow-2xl
          prose-hr:border-white/10 prose-hr:my-16">
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>

                {/* Author & Footer Area */}
                <div className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#a3e635] to-[#bef264] flex items-center justify-center text-black font-bold text-lg">
                            L
                        </div>
                        <div>
                            <p className="text-white font-semibold flex items-center gap-2">
                                Written by Laksh
                                <span className="bg-white/10 text-white/70 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full">Author</span>
                            </p>
                            <p className="text-white/40 text-sm">System Architect & Developer</p>
                        </div>
                    </div>

                    <a
                        href={`/blog/${post.slug}/raw`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 text-white/30 hover:text-[#a3e635] transition-colors text-xs uppercase tracking-widest font-semibold bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/5"
                        title="Read raw markdown format"
                    >
                        <span>Read AI Source</span>
                        <ArrowUpRight className="w-3 h-3 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                </div>
            </div>
        </article>
    );
}
