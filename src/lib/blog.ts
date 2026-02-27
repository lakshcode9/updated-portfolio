import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content/blog');

export type Post = {
    slug: string;
    title: string;
    date: string;
    description?: string;
    image?: string;
    readTime?: string;
    content: string;
};

export function getPostSlugs() {
    if (!fs.existsSync(contentDirectory)) return [];
    return fs.readdirSync(contentDirectory);
}

export function getPostBySlug(slug: string): Post {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = path.join(contentDirectory, `${realSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Calculate read time based on word count
    const wordCount = content.trim().split(/\s+/).length;
    const readTimeInMinutes = Math.ceil(wordCount / 200);
    const readTime = `${readTimeInMinutes} min read`;

    // Provide a default fallback image if not specified in frontmatter
    const defaultImage = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop';

    return {
        slug: realSlug,
        title: data.title || 'Untitled',
        date: data.date || 'No date',
        description: data.description || '',
        image: data.image || defaultImage,
        readTime,
        content,
    };
}

export function getAllPosts(): Post[] {
    const slugs = getPostSlugs();
    const posts = slugs
        .filter((slug) => slug.endsWith('.md') && !slug.includes('sample-post'))
        .map((slug) => getPostBySlug(slug))
        // sort posts by date in descending order
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
    return posts;
}
