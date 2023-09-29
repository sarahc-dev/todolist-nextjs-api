"use client";

import { useState, useEffect } from "react";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import FilterTodos from "@/components/FilterTodos";
import ErrorMessage from "@/components/ErrorMessage";
import useTodoApi from "@/hooks/useTodoApi";
import { Oval } from "react-loader-spinner";
import { ITodo, EditTodoFunction, DeleteTodoFunction, filter } from "@/types";

export default function Home() {
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [filteredTodos, setFilteredTodos] = useState<ITodo[]>([]);
    const [activeFilter, setActiveFilter] = useState<filter>("all");

    const { allTodos, isLoading, errorMessage, addTodo, editTodo, deleteTodo } = useTodoApi();

    useEffect(() => {
        setTodos(allTodos);
    }, [allTodos]);

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

    const handleAddTodo = async (newTodo: string) => {
        const addedTodo = await addTodo(newTodo);

        if (addedTodo.success) {
            setTodos(prevTodos => [...prevTodos, addedTodo.newTodo]);
        }
    };

    const handleEditTodo: EditTodoFunction = async (id, newValue) => {
        const editedTodo = await editTodo(id, newValue);

        if (editedTodo.success) {
            setTodos(prevTodos => prevTodos.map(todo => (todo._id === id ? { ...todo, ...newValue } : todo)));
        }
    };

    const handleDeleteTodo: DeleteTodoFunction = async id => {
        const deletedTodo = await deleteTodo(id);

        if (deletedTodo.success) {
            setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <h1>TODO</h1>
            <TodoForm onSubmit={handleAddTodo} />

            <ErrorMessage errorMessage={errorMessage} />

            {isLoading && <Oval height={24} width={24} color="#4fa94d" ariaLabel="oval-loading" />}

            {!isLoading && !errorMessage?.includes("Error fetching todos") && <TodoList items={filteredTodos} editTodo={handleEditTodo} deleteTodo={handleDeleteTodo} />}

            <FilterTodos activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        </main>
    );
}
