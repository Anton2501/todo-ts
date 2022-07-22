import * as React from 'react';
import CreateTodo from '~components/create-todo';
import TodosList from '~components/todos-list';
import { TodoProvider } from '~todo-context/index';
import './app.scss';

function App() {
    return (
        <div className="app">
            <TodoProvider>
                <CreateTodo />
                <TodosList />
            </TodoProvider>
        </div>
    );
}

export default App;
