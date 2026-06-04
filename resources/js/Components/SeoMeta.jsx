import { Head } from '@inertiajs/react';

export default function SeoMeta({ title, description, image, url }) {
    const siteName = 'Nexorah';
    const defaultTitle = 'Experience The Grandeur - Nexorah';
    const defaultDescription = 'Nexorah creates breathtaking, unforgettable events. Welcome to the next level of event management.';
    const defaultImage = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop';
    
    const pageTitle = title ? `${title} - ${siteName}` : defaultTitle;
    const metaDescription = description || defaultDescription;
    const metaImage = image || defaultImage;
    const metaUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

    return (
        <Head>
            <title>{title ? title : defaultTitle}</title>
            <meta name="description" content={metaDescription} />
            
            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={metaUrl} />
            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={metaImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={metaUrl} />
            <meta property="twitter:title" content={pageTitle} />
            <meta property="twitter:description" content={metaDescription} />
            <meta property="twitter:image" content={metaImage} />
        </Head>
    );
}
