import type { Meta, StoryObj } from "@storybook/astro";
import FlipCard from "./FlipCard";

const meta: Meta = {
  title: "Components/FlipCard",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    flipped: { control: "boolean" },
    interactive: { control: "boolean" },
    height: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div class="w-64">
      <FlipCard
        flipped={args.flipped}
        interactive={args.interactive}
        height={args.height}
        front={<p class="text-lg font-semibold text-slate-900">Front</p>}
        back={<p class="text-lg font-semibold text-white">Back</p>}
      />
    </div>
  ),
  args: {
    flipped: false,
    interactive: true,
    height: "h-48",
  },
};

export const Flipped: Story = {
  render: (args) => (
    <div class="w-64">
      <FlipCard
        flipped={true}
        interactive={args.interactive}
        front={<p class="text-lg font-semibold text-slate-900">Front</p>}
        back={<p class="text-lg font-semibold text-white">Back</p>}
      />
    </div>
  ),
  args: {
    interactive: true,
  },
};

export const NonInteractive: Story = {
  render: () => (
    <div class="w-64">
      <FlipCard
        flipped={false}
        interactive={false}
        front={<p class="text-sm text-slate-600">Hover does nothing</p>}
        back={<p class="text-sm text-white">Non-interactive back</p>}
      />
    </div>
  ),
};

export const TallCard: Story = {
  render: () => (
    <div class="w-64">
      <FlipCard
        flipped={false}
        height="h-72"
        front={
          <div class="text-center">
            <p class="text-lg font-bold text-slate-900 mb-2">What is glycine?</p>
            <p class="text-xs text-slate-400">Click to reveal</p>
          </div>
        }
        back={
          <div class="text-center">
            <p class="text-sm text-white/90">
              The simplest amino acid with a hydrogen atom as its side chain. Nonpolar, achiral, and
              the most flexible amino acid.
            </p>
          </div>
        }
      />
    </div>
  ),
};
