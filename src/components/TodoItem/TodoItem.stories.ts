import type { Meta, StoryObj } from '@storybook/react';
import { TodoItem } from './TodoItem';

const meta: Meta<typeof TodoItem> = {
  title: 'Components/TodoItem',
  component: TodoItem,
  parameters: {
    layout: 'padded',
  },
  args: {
    onToggle: () => {},
    onDelete: () => {},
    onUpdate: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    todo: {
      id: '1',
      title: 'Complete project documentation',
      description: 'Write comprehensive docs for the todo app',
      completed: false,
      priority: 'high',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
};

export const Completed: Story = {
  args: {
    todo: {
      id: '2',
      title: 'Setup development environment',
      completed: true,
      priority: 'medium',
      createdAt: new Date(Date.now() - 86400000),
      updatedAt: new Date(),
    },
  },
};