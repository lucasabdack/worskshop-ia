/**
 * next/config was removed in Next.js 16, but @storybook/nextjs still requires it.
 * This script creates a compatibility stub so Storybook can start correctly.
 */
const fs = require("fs");
const path = require("path");

const stub = `// Compatibility stub for next/config (removed in Next.js 16)
let _config = {};
function getConfig() { return _config; }
function setConfig(config) { _config = config || {}; }
module.exports = getConfig;
module.exports.default = getConfig;
module.exports.getConfig = getConfig;
module.exports.setConfig = setConfig;
`;

const configPath = path.join(__dirname, "..", "node_modules", "next", "config.js");

try {
  fs.writeFileSync(configPath, stub, "utf8");
  console.log("✓ Created next/config stub for Storybook compatibility");
} catch (err) {
  console.error("✗ Failed to create next/config stub:", err.message);
  process.exit(1);
}
