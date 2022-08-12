import { ChangeEvent } from 'react';

export interface ITodoItem {
    id: string;
    label: string;
    isChecked: boolean;
    onChangeTodo: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onDeleteTodo: (id: string) => void;
    onEditTodo: (text: string, id: string) => void;
    created: number;
}
