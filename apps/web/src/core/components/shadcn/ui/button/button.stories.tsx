import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "shadcn/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "outline",
        "destructive",
        "ghost",
        "link",
      ],
      description: "ظاهر دکمه",
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon", "icon-sm", "icon-lg"],
      description: "اندازه دکمه",
    },
    asChild: {
      control: "boolean",
      description: "آیا از Slot استفاده شود؟",
    },
    disabled: {
      control: "boolean",
    },
    children: {
      control: "text",
      description: "محتوای داخلی دکمه (متن یا JSX)",
    },
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    variant: "default",
    children: "Default Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline Button",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Delete",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost Button",
  },
};

export const LinkStyle: Story = {
  args: {
    variant: "link",
    children: "Link Button",
  },
};
export const Small: Story = {
  args: {
    size: "sm",
    children: "Small",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "Large Button",
  },
};

export const Icon: Story = {
  args: {
    size: "icon",
    children: "🔍",
    "aria-label": "Search",
  },
};

export const IconSmall: Story = {
  args: {
    size: "icon-sm",
    children: "✕",
    "aria-label": "Close",
  },
};

export const IconLarge: Story = {
  args: {
    size: "icon-lg",
    children: "⚙️",
    "aria-label": "Settings",
  },
};
export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled",
  },
};

export const Playground: Story = {
  args: {
    variant: "default",
    size: "default",
    children: "Playground",
    disabled: false,
  },
};
