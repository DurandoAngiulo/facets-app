// Plugin to use SVG as React components
const withSvgr = require("next-plugin-svgr");

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  svgrOptions: {
    titleProp: true,
    icon: true,
    svgProps: {
      height: "100%",
      width: "100%"
    }
  }
};

module.exports = withSvgr(nextConfig);
