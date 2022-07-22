import { ChangeEvent } from 'react';

export interface ITodoItem {
    id: string;
    label: string;
    isChecked: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onDelete: (id: string) => void;
    onEdit: (text: string, id: string) => void;
}
