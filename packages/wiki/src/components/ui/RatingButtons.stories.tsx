import type { Meta, StoryObj } from "@storybook/astro";
import RatingButtons from "./RatingButtons";

const meta: Meta = {
  title: "Components/RatingButtons",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md"] },
    showLabels: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div class="w-80">
      <RatingButtons
        onSelect={(r) => console.log("Selected:", r)}
        size={args.size}
        showLabels={args.showLabels}
      />
    </div>
  ),
  args: {
    size: "md",
    showLabels: true,
  },
};

export const Small: Story = {
  render: () => (
    <div class="w-64">
      <RatingButtons onSelect={(r) => console.log("Selected:", r)} size="sm" />
    </div>
  ),
};

export const NoLabels: Story = {
  render: () => (
    <div class="w-80">
      <RatingButtons onSelect={(r) => console.log("Selected:", r)} showLabels={false} />
    </div>
  ),
};
