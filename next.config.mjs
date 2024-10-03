/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash:true,
    output:'export',
    basePath: '/blackboard-projector',
    assetPrefix: '/blackboard-projector/',
    distDir: 'docs'
};

export default nextConfig;
