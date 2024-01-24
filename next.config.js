// Plugin to use SVG as React components
const withSvgr = require("next-plugin-svgr");

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  svgrOptions: {
    titleProp: true,
    icon: true,
    svgProps: {
      height: "auto"
    }
  }
};

module.exports = withSvgr(nextConfig);
