import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  webpack(config) {
    const svgRule = config.module.rules.find(
      (rule: unknown) =>
        rule &&
        typeof rule === "object" &&
        "test" in rule &&
        rule.test instanceof RegExp &&
        rule.test.test(".svg"),
    );

    if (svgRule && typeof svgRule === "object" && "exclude" in svgRule) {
      (svgRule as { exclude?: RegExp }).exclude = /\\.svg$/i;
    }

    config.module.rules.push({
      test: /\\.svg$/i,
      issuer: /\\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: { exportType: "default" },
        },
      ],
    });
    return config;
  },
};

export default nextConfig;
