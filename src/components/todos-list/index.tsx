/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import Fade from 'react-reveal/Fade';
import Checkbox from '~ui/checkbox';
import Label from '~ui/label';
import TodoItem from '~components/todo-item';
import { TodoContext } from '~todo-context/index';
import './style.scss';

type TodoItemParams = {
    id: string;
    label: string;
    isCompleted: boolean;
};

function TodosList(): JSX.Element {
    const {
        list,
        onChange,
        onDelete,
        onEdit,
        leaveOnlyChecked,
        setLeaveOnlyChecked,
        headerClickedTimes,
        countClickHeader,
    } = React.useContext(TodoContext);

    const headerRef = React.useRef(null);

    const onKeyDown = React.useCallback(
        (event: React.KeyboardEvent<HTMLHeadElement>) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                headerRef.current.click();
            }
        },
        []
    );

    return (
        <React.Fragment>
            {list.length > 0 && (
                <h4
                    className="todo-list__header"
                    onClick={() =>
                        countClickHeader(
                            headerClickedTimes > 1 ? 0 : headerClickedTimes + 1
                        )
                    }
                    tabIndex={0}
                    onKeyDown={onKeyDown}
                    ref={headerRef}
                >
                    Tasks
                    {headerClickedTimes === 1
                        ? ': A-Z'
                        : headerClickedTimes === 2
                        ? ': Z-A'
                        : null}
                </h4>
            )}
            {!leaveOnlyChecked &&
                list.map(({ id, label, isCompleted }: TodoItemParams) => {
                    return (
                        <TodoItem
                            key={id}
                            id={id}
                            label={label}
                            isChecked={isCompleted}
                            onChange={onChange}
                            onDelete={onDelete}
                            onEdit={onEdit}
                        />
                    );
                })}
            {leaveOnlyChecked &&
                list
                    .filter(
                        ({ isCompleted }: { isCompleted: boolean }) =>
                            !isCompleted
                    )
                    .map(({ id, label, isCompleted }: TodoItemParams) => {
                        return (
                            <TodoItem
                                key={id}
                                id={id}
                                label={label}
                                isChecked={isCompleted}
                                onChange={onChange}
                                onDelete={onDelete}
                                onEdit={onEdit}
                            />
                        );
                    })}
            {list.length > 0 &&
                list.find(
                    ({ isCompleted }: { isCompleted: boolean }) => isCompleted
                ) && (
                    <Fade bottom>
                        <div className="todo-list__check-group">
                            <Checkbox
                                checked={leaveOnlyChecked}
                                onChange={(e) =>
                                    setLeaveOnlyChecked(e.target.checked)
                                }
                                id="#sort-checked"
                            />
                            <Label id="#sort-checked">Hide completed</Label>
                        </div>
                    </Fade>
                )}
        </React.Fragment>
    );
}

export default TodosList;
