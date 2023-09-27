"use client";

import { useState } from "react";
import TodoForm from "@/components/TodoForm";

export default function Home() {
    const addTodo = (newTodo: string) => {
        console.log(newTodo);
    };

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <h1>TODO</h1>
            <TodoForm onSubmit={addTodo} />
            <p>There&apos;s nothing to do.</p>
        </main>
    );
}
