import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './label';

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  args: {
    children: 'Service Charge (%)',
  },
};
export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {};

export const CustomClass: Story = {
  args: {
    children: 'Label Merah',
    className: 'text-red-500 font-bold',
  },
};
