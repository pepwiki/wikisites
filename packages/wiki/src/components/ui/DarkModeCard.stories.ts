import type { Meta, StoryObj } from "@storybook/astro";

const meta: Meta = {
  title: "Components/DarkModeCard",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "elevated", "outlined"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
  },
  render: (args) => `
    <div class="rounded-xl border p-6 ${
      args.variant === "elevated"
        ? "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-lg"
        : args.variant === "outlined"
          ? "bg-transparent border-slate-200 dark:border-slate-700"
          : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
    }">
      <h3 class="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Card Title</h3>
      <p class="text-slate-600 dark:text-slate-400">This is a dark mode aware card component.</p>
    </div>
  `,
};

export const Elevated: Story = {
  args: {
    variant: "elevated",
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
  },
};
