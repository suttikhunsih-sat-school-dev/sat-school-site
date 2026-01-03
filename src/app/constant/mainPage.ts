export interface MenuItem {
    id: string;
    label: string;
    children?: MenuItem[];
    urlNavigate?: string;
}
export const DONATION_LINK = "https://www.punboon.org/foundation/projects/donate?foundation_id=01026&project_id=01026001";
export const menuItems = [
    {
        id: 'mainpage',
        label: 'Main Page',
        children: [
            { id: 'what-we-do', label: 'What We Do?', urlNavigate: '/' },
            { id: 'our-projects', label: 'Our Projects', urlNavigate: '/' },
            { id: 'voice-from-volunteer', label: 'Voice From Volunteer', urlNavigate: '/' },
            { id: 'hotnews', label: 'Hot News', urlNavigate: '/' },
            { id: 'sponsors', label: 'Sponsors', urlNavigate: '/' },
        ]
    },
    {
        id: 'join-us',
        label: 'Join Us (Volunteer)',
        urlNavigate: '/join-us',
    },
    {
        id: 'donate',
        label: 'Donate',
        urlNavigate: DONATION_LINK,
    },
    {
        id: 'csr',
        label: 'CSR (Company)',
        urlNavigate: '/csr',
    },
    {
        id: 'news',
        label: 'News',
        urlNavigate: '/news',
    },
    {
        id: 'about-us',
        label: 'About Us',
        children: [
            { id: 'company-history', label: 'Company History', urlNavigate: '/about-us/company-history', },
            { id: 'message-from-founder', label: 'Message From Founder', urlNavigate: '/about-us/message-from-founder' },
            { id: 'contact-us', label: 'Contact Us', urlNavigate: '/about-us/contact-us' },
            { id: 'annual-report', label: 'Annual Report', urlNavigate: '/about-us/annual-report' },
            { id: 'foundation-committee', label: 'Foundation Committee', urlNavigate: '/about-us/foundation-committee' },
        ]
    },
    { id: 'our-journey', label: 'Our Journey' },
];