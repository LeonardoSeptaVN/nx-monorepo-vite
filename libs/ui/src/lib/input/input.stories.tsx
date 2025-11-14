// Input.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';
import React, { useState } from 'react';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  args: {
    type: 'text',
    placeholder: 'Ketik sesuatu...',
    value: '',
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: (args) => {
    const Wrapper = () => {
      const [val, setVal] = useState('');

      return <Input {...args} value={val} onChange={(v) => setVal(v)} />;
    };

    return <Wrapper />;
  },
};

export const NumberInput: Story = {
  args: {
    type: 'number',
    placeholder: '0',
  },
  render: (args) => {
    const Wrapper = () => {
      const [val, setVal] = useState('');

      return <Input {...args} value={val} onChange={(v) => setVal(v)} />;
    };

    return <Wrapper />;
  },
};
