import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

// The base URL of your application
// Replace this with your actual production domain when you deploy
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://lakshpujary.tech';

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getAllPosts();

    const blogUrls = posts.map((post) => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: new Date(post.date).toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    const rawBlogUrls = posts.map((post) => ({
        url: `${BASE_URL}/blog/${post.slug}/raw`,
        lastModified: new Date(post.date).toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.9, // Higher priority for AI crawlers
    }));

    return [
        {
            url: `${BASE_URL}`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: `${BASE_URL}/blog`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        ...blogUrls,
        ...rawBlogUrls,
    ];
}
