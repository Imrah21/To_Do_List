import type { Meta, StoryObj } from '@storybook/react';
import { TodoForm } from './TodoForm';

const meta: Meta<typeof TodoForm> = {
  title: 'Components/TodoForm',
  component: TodoForm,
  parameters: {
    layout: 'padded',
  },
  args: {
    onSubmit: (todo) => console.log('Todo created:', todo),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};