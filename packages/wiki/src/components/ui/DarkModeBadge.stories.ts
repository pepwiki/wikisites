import type { Meta, StoryObj } from "@storybook/astro";

const meta: Meta = {
  title: "Components/DarkModeBadge",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "success", "error", "warning", "info"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const variantClasses = {
  default: "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300",
  success: "bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400",
  error: "bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400",
  warning: "bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400",
  info: "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400",
};

export const Default: Story = {
  args: { variant: "default" },
  render: (args) =>
    `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[args.variant]}">Badge</span>`,
};

export const Success: Story = { args: { variant: "success" } };
export const Error: Story = { args: { variant: "error" } };
export const Warning: Story = { args: { variant: "warning" } };
export const Info: Story = { args: { variant: "info" } };
