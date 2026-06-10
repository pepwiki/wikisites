import type { Meta, StoryObj } from "@storybook/astro";

const meta: Meta = {
  title: "Components/DarkModeButton",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "ghost"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const variantClasses = {
  primary: "bg-[#0D9488] text-white hover:bg-[#0D9488]/90",
  secondary:
    "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700",
  ghost:
    "bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800",
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export const Primary: Story = {
  args: { variant: "primary", size: "md" },
  render: (args) =>
    `<button class="rounded-lg font-medium transition-colors ${variantClasses[args.variant]} ${sizeClasses[args.size]}">Click me</button>`,
};

export const Secondary: Story = { args: { variant: "secondary", size: "md" } };
export const Ghost: Story = { args: { variant: "ghost", size: "md" } };
export const Small: Story = { args: { variant: "primary", size: "sm" } };
export const Large: Story = { args: { variant: "primary", size: "lg" } };
