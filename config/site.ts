export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: 'Next.js + NextUI',
    description:
        'Make beautiful websites regardless of your design experience.',
    navItems: [
        {
            label: 'Home',
            href: '/',
        },
        {
            label: 'Products',
            href: '/products',
        },
        {
            label: 'About',
            href: '/about',
        },
    ],
    navMenuItems: [
        {
            label: 'Profile',
            href: '/profile',
        },
        {
            label: 'Logout',
            href: '/logout',
        },
    ],
    links: {
        login: '/auth/login',
        register: '/auth/register',
    },
};
