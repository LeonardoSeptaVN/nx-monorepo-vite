import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Select, SelectOption } from './select';

const meta: Meta<typeof Select> = {
  title: 'Atoms/Select',
  component: Select,
  args: {
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'orange', label: 'Orange' },
    ] as SelectOption[],
  },
};
export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    defaultValue: 'banana',
  },
};

export const WithCustomClass: Story = {
  args: {
    className: 'text-red-500 border-red-500',
    defaultValue: 'orange',
  },
};

export const WithChildrenOverride: Story = {
  render: () => (
    <Select>
      <option value="x">Custom X</option>
      <option value="y">Custom Y</option>
    </Select>
  ),
};
