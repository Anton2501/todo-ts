import React from 'react';
import Button from '~ui/button';
import Input from '~ui/input';
import { TodoContext } from '~todo-context/index';
import './style.scss';

function CreateTodo() {
    const [value, updateValue] = React.useState<string>('');
    const { addTodo } = React.useContext(TodoContext);

    const createTodo = React.useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            if (value) addTodo(value);
            updateValue('');
        },
        [value, addTodo]
    );

    const onChange = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            updateValue(event.target.value);
        },
        [updateValue]
    );

    return (
        <form className="create-todo">
            <Input
                placeholder="Write new task here"
                value={value}
                onChange={onChange}
                id="type"
            />
            <Button type="submit" onClick={createTodo} disabled={!value}>
                Create
            </Button>
        </form>
    );
}

export default CreateTodo;
