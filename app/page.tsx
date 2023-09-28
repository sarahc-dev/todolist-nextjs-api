"use client";

import { useState, useEffect } from "react";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import FilterTodos from "@/components/FilterTodos";
import { ITodo, EditTodoFunction, DeleteTodoFunction, filter } from "@/types";

export default function Home() {
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [filteredTodos, setFilteredTodos] = useState<ITodo[]>([]);
    const [activeFilter, setActiveFilter] = useState<filter>("all");

    useEffect(() => {
        if (activeFilter === "all") {
            setFilteredTodos(todos);
        } else if (activeFilter === "completed") {
            const completedTodos = todos.filter(todo => todo.completed === true);
            setFilteredTodos(completedTodos);
        } else {
            const incompleteTodos = todos.filter(todo => todo.completed !== true);
            setFilteredTodos(incompleteTodos);
        }
    }, [todos, activeFilter]);

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
            <TodoList items={filteredTodos} editTodo={editTodo} deleteTodo={deleteTodo} />
            <FilterTodos activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        </main>
    );
}
