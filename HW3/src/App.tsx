import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { useLocation } from '@modern-js/runtime/router';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer, NowShowing } from './components/Footer';
import { TodoModel, TodoItem } from './models/todoModel';
import './styles/index.css';
import './styles/base.css';

const KeyCodes = {
  Enter: 'Enter',
  Escape: 'Escape',
};

const model = new TodoModel('TodoMVC');

function App() {
  const [newTodo, setNewTodo] = useState('');
  const [editing, setEditing] = useState('');
  const [nowShowing, setNowShowing] = useState<NowShowing>('all');
  const [, forceUpdate] = useState(0);

  const { hash } = useLocation();

  const activeTodoCount = model.todos.reduce(function (accum, todo) {
    return todo.completed ? accum : accum + 1;
  }, 0);

  const completedTodoCount = model.todos.length - activeTodoCount;

  // 当状态变化时，强制更新页面
  useEffect(() => {
    model.subscribe(() => forceUpdate(state => state + 1));
  }, []);

  useEffect(() => {
    if (hash.includes('active')) {
      setNowShowing('active');
    } else if (hash.includes('completed')) {
      setNowShowing('completed');
    } else {
      setNowShowing('all');
    }
  }, [hash]);

  const handleNewTodoKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code !== KeyCodes.Enter) {
      return;
    }

    event.preventDefault();

    const val = newTodo.trim();

    if (!val) {
      return;
    }

    model.addTodo(val);
    setNewTodo('');
  };

  const handleNewTodoChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const onToggle = (todo: TodoItem) => {
    model.toggle(todo);
  };

  const onToggleAll = (checked: boolean) => {
    model.toggleAll(checked);
  };

  const onDestroy = (todo: TodoItem) => {
    model.destroy(todo);
  };

  const onEdit = (todo: TodoItem) => {
    setEditing(todo.id);
  };

  const onSave = (todo: TodoItem, val: string) => {
    model.save(todo, val);
    setEditing('');
  };

  const onCancel = () => {
    setEditing('');
  };

  const onClearCompleted = () => {
    model.clearCompleted();
  };

  return (
    <section className="todoapp">
      <Header
        newTodo={newTodo}
        handleNewTodoChange={handleNewTodoChange}
        handleNewTodoKeyDown={handleNewTodoKeyDown}
      />
      {Boolean(model.todos.length) && (
        <>
          <Main
            editing={editing}
            todos={model.todos}
            onToggle={onToggle}
            onToggleAll={onToggleAll}
            onDestroy={onDestroy}
            onEdit={onEdit}
            onSave={onSave}
            onCancel={onCancel}
          />
          <Footer
            activeTodoCount={activeTodoCount}
            nowShowing={nowShowing}
            onClearCompleted={onClearCompleted}
            hasCompletedTodos={completedTodoCount !== 0}
          />
        </>
      )}
    </section>
  );
}

export default App;
