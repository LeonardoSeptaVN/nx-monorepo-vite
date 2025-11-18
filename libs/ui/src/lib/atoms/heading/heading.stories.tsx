import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from './heading';

const meta: Meta<typeof Heading> = {
  title: 'Components/Heading',
  component: Heading,
  args: {
    children: 'Ringkasan',
    size: 'h3',
  },
};
export default meta;

type Story = StoryObj<typeof Heading>;

export const Default: Story = {};

export const CustomSize: Story = {
  args: {
    children: 'Heading H1',
    size: 'h1',
  },
};

export const WithCustomClass: Story = {
  args: {
    children: 'Custom Styled Heading',
    className: 'text-red-500 underline',
  },
};

export const HeadingH2: Story = {
  args: {
    children: 'Heading H2 Example',
    size: 'h2',
  },
};

export const HeadingH3: Story = {
  args: {
    children: 'Heading H3 Example',
    size: 'h3',
  },
};

export const HeadingH4: Story = {
  args: {
    children: 'Heading H4 Example',
    size: 'h4',
  },
};
