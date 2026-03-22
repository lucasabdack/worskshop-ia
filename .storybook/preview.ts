import type { Preview } from "@storybook/react";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "neutral-light",
      values: [
        { name: "white", value: "#ffffff" },
        { name: "neutral-light", value: "#F0F0F0" },
        { name: "primary", value: "#321CB2" },
      ],
    },
    viewport: {
      viewports: {
        mobile: {
          name: "Mobile (375px)",
          styles: { width: "375px", height: "812px" },
        },
        mobileLarge: {
          name: "Mobile Large (430px)",
          styles: { width: "430px", height: "932px" },
        },
      },
      defaultViewport: "mobile",
    },
  },
  tags: ["autodocs"],
};

export default preview;
