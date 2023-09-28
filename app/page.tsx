"use client";

import { useState } from "react";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import { ITodo, EditTodoFunction, DeleteTodoFunction } from "@/types";

export default function Home() {
    const [todos, setTodos] = useState<ITodo[]>([]);

    const addTodo = (newTodo: string) => {
        const createdTodo = { _id: Math.random().toString(), title: newTodo, completed: false };
        setTodos(prevTodos => [...prevTodos, createdTodo]);
    };

    const editTodo: EditTodoFunction = (id, newValue) => {
        setTodos(prevTodos => prevTodos.map(todo => (todo._id === id ? { ...todo, ...newValue } : todo)));
    };

    const deleteTodo: DeleteTodoFunction = id => {
        setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
    };

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <h1>TODO</h1>
            <TodoForm onSubmit={addTodo} />
            <TodoList items={todos} editTodo={editTodo} deleteTodo={deleteTodo} />
        </main>
    );
}
