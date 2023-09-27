"use client";

import { useState } from "react";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import { ITodo } from "@/types";

export default function Home() {
    const [todos, setTodos] = useState<ITodo[]>([]);

    const addTodo = (newTodo: string) => {
        const createdTodo = { _id: newTodo.length.toString(), title: newTodo, completed: false };
        setTodos(prevTodos => [...prevTodos, createdTodo]);
    };

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <h1>TODO</h1>
            <TodoForm onSubmit={addTodo} />
            <TodoList items={todos} />
        </main>
    );
}
