/**
 * Navigation menu lists for McBride Technology Services
 * Format: [identifier, display name, URL]
 */

export const navbarMenuList: [string, string, string][] = [
    ['home', 'Home', '/'],
    ['it-support', 'IT Support', '/it-support'],
    ['web-development', 'Web Development', '/web-development'],
    ['engineering', 'Engineering', '/engineering'],
    ['portfolio', 'Portfolio', '/portfolio'],
    ['contact', 'Contact', '/contact'],
];

export const footerMenuList: [string, string, string][] = [
    ['home', 'Home', '/'],
    ['it-support', 'IT Support', '/it-support'],
    ['web-development', 'Web Development', '/web-development'],
    ['engineering', 'Engineering', '/engineering'],
    ['portfolio', 'Portfolio', '/portfolio'],
    ['contact', 'Contact', '/contact'],
    ['privacy', 'Privacy Policy', '/privacy'],
    ['terms', 'Terms of Use', '/terms'],
];

export const adminMenuList: [string, string, string][] = [
    ['dashboard', 'Dashboard', '/admin'],
    ['users', 'Users', '/admin/users'],
    ['content', 'Content', '/admin/content'],
    ['analytics', 'Analytics', '/admin/analytics'],
    ['settings', 'Settings', '/admin/settings'],
];

const menuLists = {
    navbarMenuList,
    footerMenuList,
    adminMenuList,
};

export default menuLists;
