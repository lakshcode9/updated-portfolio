import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content/blog');

export type Post = {
    slug: string;
    title: string;
    date: string;
    description?: string;
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

    return {
        slug: realSlug,
        title: data.title || 'Untitled',
        date: data.date || 'No date',
        description: data.description || '',
        content,
    };
}

export function getAllPosts(): Post[] {
    const slugs = getPostSlugs();
    const posts = slugs
        .filter((slug) => slug.endsWith('.md'))
        .map((slug) => getPostBySlug(slug))
        // sort posts by date in descending order
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
    return posts;
}
