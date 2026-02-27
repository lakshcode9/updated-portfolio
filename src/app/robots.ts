import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://laksh.me';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            // Prevent crawling of private/admin paths if you add them later
            disallow: ['/api/', '/admin/'],
        },
        sitemap: `${BASE_URL}/sitemap.xml`,
    };
}
