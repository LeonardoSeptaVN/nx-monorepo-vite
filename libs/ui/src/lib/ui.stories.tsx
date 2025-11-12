import type { Meta, StoryObj } from '@storybook/react-vite';
import { NxMonorepoUi } from './ui';
import { expect } from 'storybook/test';

const meta = {
  component: NxMonorepoUi,
  title: 'NxMonorepoUi',
} satisfies Meta<typeof NxMonorepoUi>;
export default meta;

type Story = StoryObj<typeof NxMonorepoUi>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/NxMonorepoUi/gi)).toBeTruthy();
  },
} satisfies Story;
