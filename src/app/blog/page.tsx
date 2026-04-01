import { getAllPosts } from '@/lib/blog';
import Link from 'next/link';
import { ArrowUpRight, Clock, Calendar } from 'lucide-react';

export const metadata = {
    title: 'Blog | Laksh',
    description: 'Deep dives on artificial intelligence, systems, and scaling modern businesses.',
    alternates: {
        canonical: '/blog',
    },
};

export default function BlogIndex() {
    const posts = getAllPosts();

    return (
        <div className="min-h-screen bg-[#030303] text-white">
            {/* Hero Section */}
            <section className="relative pt-32 pb-16 md:pt-48 md:pb-32 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(163,230,53,0.1),transparent_50%)] z-0 pointer-events-none" />
                <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-start">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#a3e635] uppercase tracking-widest mb-6">
                        <span className="w-2 h-2 rounded-full bg-[#a3e635] animate-pulse" />
                        Insights & Architecture
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 text-white leading-tight">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a3e635] to-[#bef264]">Archive.</span>
                    </h1>
                    <p className="font-[system-ui,sans-serif] tracking-normal text-xl md:text-2xl text-white/60 max-w-2xl font-light leading-relaxed">
                        Long-form essays on artificial intelligence, agency scaling, and the backend systems that power modern businesses.
                    </p>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="px-6 pb-32 relative z-10">
                <div className="max-w-7xl mx-auto">
                    {posts.length === 0 ? (
                        <div className="min-h-[40vh] flex items-center justify-center border border-dashed border-white/10 rounded-2xl">
                            <p className="text-white/40 font-mono">No entries found.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post) => (
                                <Link
                                    key={post.slug}
                                    href={`/blog/${post.slug}`}
                                    className="group relative flex flex-col bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden hover:border-[#a3e635]/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(163,230,53,0.1)]"
                                >
                                    {/* Image Container */}
                                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#111]">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="absolute inset-0 w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] opacity-70 group-hover:opacity-100"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-90" />
                                    </div>

                                    {/* Content Container */}
                                    <div className="font-[system-ui,sans-serif] tracking-normal flex flex-col flex-grow p-6 md:p-8 relative z-10 -mt-16">
                                        <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider mb-4">
                                            <div className="flex items-center gap-1.5 text-[#a3e635]">
                                                <Calendar className="w-3.5 h-3.5" />
                                                <time dateTime={post.date}>
                                                    {new Date(post.date).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </time>
                                            </div>
                                            <span className="w-1 h-1 rounded-full bg-white/20" />
                                            <div className="flex items-center gap-1.5 text-white/50">
                                                <Clock className="w-3.5 h-3.5" />
                                                <span>{post.readTime}</span>
                                            </div>
                                        </div>

                                        <h2 className="text-2xl md:text-[28px] font-bold mb-4 group-hover:text-[#a3e635] transition-colors leading-tight line-clamp-3">
                                            {post.title}
                                        </h2>

                                        <p className="text-white/50 leading-relaxed line-clamp-3 text-sm flex-grow">
                                            {post.description}
                                        </p>

                                        <div className="mt-8 flex items-center text-[#a3e635] font-semibold text-sm tracking-wide uppercase group/link">
                                            <span className="relative overflow-hidden">
                                                <span className="inline-block transition-transform duration-300 group-hover/link:-translate-y-full">Read Article</span>
                                                <span className="absolute left-0 top-0 inline-block translate-y-full transition-transform duration-300 group-hover/link:translate-y-0 text-white">Read Article</span>
                                            </span>
                                            <ArrowUpRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
