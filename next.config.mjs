/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'steamcdn-a.akamaihd.net',
                pathname: '/steamcommunity/**',
            },
        ],
    },
};

export default nextConfig;
