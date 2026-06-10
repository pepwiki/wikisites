import type { Meta, StoryObj } from "@storybook/astro";

const meta: Meta = {
  title: "Components/DarkModeProgress",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100 } },
    max: { control: { type: "number" } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { value: 75, max: 100 },
  render: (args) => `
    <div class="w-64 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
      <div class="bg-[#0D9488] h-2 rounded-full transition-all" style="width: ${(args.value / args.max) * 100}%"></div>
    </div>
  `,
};

export const Half: Story = { args: { value: 50, max: 100 } };
export const Complete: Story = { args: { value: 100, max: 100 } };
export const Empty: Story = { args: { value: 0, max: 100 } };
