import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act, create } from 'react-test-renderer';
import TodoItem from './index';

const props = {
    id: 'todo-item',
    label: 'Test',
    isChecked: false,
    onChangeTodo: () => null,
    onDeleteTodo: () => null,
    onEditTodo: () => null,
};

function TestWrapper() {
    const [checked, setChecked] = React.useState();
    return <TodoItem {...props} isChecked={checked} onChange={(e) => setChecked(e.target.checked)} />;
}

describe('TodoItem', () => {
    test('matches snapshot', () => {
        let tree;
        act(() => {
            tree = create(<TodoItem {...props} />);
        });
        expect(tree.toJSON()).toMatchSnapshot();
    });

    test('click on the label checks the checkbox', async () => {
        const user = userEvent.setup();
        render(<TestWrapper />);
        const label = screen.getByTestId('Test-label');
        const checkbox = screen.getByTestId('Test-cb-input');
        expect(checkbox).not.toBeChecked();
        await user.click(label);
        expect(checkbox).toBeChecked();
    });

    test('label becomes editable after click on "Edit" button', async () => {
        const mockOnEditTodo = jest.fn();
        const user = userEvent.setup();
        render(<TodoItem {...props} onEditTodo={mockOnEditTodo} />);
        expect(screen.queryByTestId('Test-edit-field')).toBeNull();
        const editBtn = screen.getByText(/edit/i);
        await user.click(editBtn);
        expect(screen.queryByTestId('Test-edit-field')).toBeInTheDocument();
        await user.type(screen.queryByTestId('Test-edit-field'), ' text');
        expect(screen.queryByTestId('Test-edit-field').value).toBe('Test text');
    });

    test('after editing label value onBlur event calls onEditTodo callback', async () => {
        const mockOnEditTodo = jest.fn();
        const user = userEvent.setup();
        render(<TodoItem {...props} onEditTodo={mockOnEditTodo} />);
        await user.click(screen.getByText(/edit/i));
        await user.type(screen.queryByTestId('Test-edit-field'), ' text');
        expect(screen.queryByTestId('Test-edit-field').value).toBe('Test text');
        expect(mockOnEditTodo).toHaveBeenCalledTimes(0);
        screen.queryByTestId('Test-edit-field').blur();
        expect(mockOnEditTodo).toHaveBeenCalledTimes(1);
    });
});
