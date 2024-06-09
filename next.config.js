/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Fix lỗi Cannot use import outside a module dành cho next 14
  transpilePackages: [
    'antd',
    'rc-util',
    // '@babel/runtime',
    '@ant-design/icons',
    '@ant-design/icons-svg',
    'rc-pagination',
    'rc-picker',
    'rc-tree',
    'rc-table'
  ]
}

module.exports = nextConfig
