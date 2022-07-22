import React from 'react';

type Todo = {
    id: string;
    label: string;
    isCompleted: boolean;
    created: number;
};

interface ITodoContext {
    list: Todo[];
    addTodo: (text: string) => void;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onDelete: (id: string) => void;
    onEdit: (text: string, id: string) => void;
    leaveOnlyChecked: boolean;
    setLeaveOnlyChecked: (val: boolean) => void;
    headerClickedTimes: number;
    countClickHeader: (val: number) => void;
}

export const TodoContext = React.createContext<ITodoContext>({
    list: [],
    addTodo: () => undefined,
    onChange: () => undefined,
    onDelete: () => undefined,
    onEdit: () => undefined,
    leaveOnlyChecked: false,
    setLeaveOnlyChecked: () => undefined,
    headerClickedTimes: 0,
    countClickHeader: () => undefined,
});

TodoContext.displayName = 'TodoContext';

export function TodoProvider({ children }: { children: React.ReactNode }) {
    const localState = JSON.parse(localStorage.getItem('todo-list') || '[]');
    const [list, updateList] = React.useState<Todo[]>(localState);
    const [leaveOnlyChecked, setLeaveOnlyChecked] =
        React.useState<boolean>(false);

    const localHeaderClickCounter = +JSON.parse(
        localStorage.getItem('headerClickedCounter') || '0'
    );
    const [headerClickedTimes, countClickHeader] = React.useState<number>(
        localHeaderClickCounter
    );

    const clickHeaderTimesRef = React.useRef(0);

    React.useEffect(() => {
        if (headerClickedTimes === 0 && clickHeaderTimesRef.current !== 0) {
            updateList(
                [...list]
                    .sort((a, b) => {
                        if (a.created < b.created) {
                            return -1;
                        }
                        return 1;
                    })
                    .reverse()
            );
            clickHeaderTimesRef.current = 0;
        }

        if (headerClickedTimes === 1 && clickHeaderTimesRef.current !== 1) {
            updateList(
                [...list].sort((a, b) => {
                    if (a.label < b.label) {
                        return -1;
                    }
                    return 1;
                })
            );
            clickHeaderTimesRef.current = 1;
        }

        if (headerClickedTimes === 2 && clickHeaderTimesRef.current !== 2) {
            updateList(
                [...list]
                    .sort((a, b) => {
                        if (a.label < b.label) {
                            return -1;
                        }
                        return 1;
                    })
                    .reverse()
            );
            clickHeaderTimesRef.current = 2;
        }
    }, [headerClickedTimes, list]);

    const addTodo = React.useCallback(
        (text: string) => {
            const updatedList = [...list];
            updatedList.push({
                id: `${text}${+new Date()}`,
                label: text,
                isCompleted: false,
                created: new Date().getTime(),
            });
            updateList(updatedList);
        },
        [list, updateList]
    );

    const onChange = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const updatedList = list.map((item) => {
                if (e.target.id === item.id) {
                    return { ...item, isCompleted: e.target.checked };
                }
                return item;
            });
            updateList(updatedList);
        },
        [list, updateList]
    );

    const onDelete = React.useCallback(
        (id: string) => {
            const arr = [...list];
            const index = arr.findIndex((item) => id === item.id);
            arr.splice(index, 1);
            updateList(arr);
        },
        [list, updateList]
    );

    const onEdit = React.useCallback(
        (text: string, id: string) => {
            const updatedList = list.map((item) => {
                if (id === item.id) {
                    return { ...item, label: text };
                }
                return item;
            });
            updateList(updatedList);
        },
        [list, updateList]
    );

    React.useEffect(() => {
        localStorage.setItem('todo-list', JSON.stringify(list));
    }, [list]);

    React.useEffect(() => {
        localStorage.setItem(
            'headerClickedCounter',
            JSON.stringify(headerClickedTimes)
        );
    }, [headerClickedTimes]);

    return (
        <TodoContext.Provider
            value={{
                list,
                addTodo,
                onChange,
                onDelete,
                onEdit,
                leaveOnlyChecked,
                setLeaveOnlyChecked,
                headerClickedTimes,
                countClickHeader,
            }}
        >
            {children}
        </TodoContext.Provider>
    );
}

const def = {
    TodoContext,
    TodoProvider,
};

export default def;
