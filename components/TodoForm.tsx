import { useState } from "react";

interface TodoFormProps {
    onSubmit: (todo: string) => void;
}

export default function TodoForm({ onSubmit }: TodoFormProps) {
    const [newTodo, setNewTodo] = useState<string>("");
    const [showError, setShowError] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodo(e.target.value);
        if (showError) setShowError(false);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newTodo === "") {
            setShowError(true);
            return;
        }
        onSubmit(newTodo);
        setNewTodo("");
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-lg flex my-4">
            <input type="text" data-cy="todo-input" value={newTodo} onChange={handleChange} placeholder="Create a new todo..." className="border-b mr-3 px-2 flex-1" />
            <button type="submit" data-cy="todo-submit" className="bg-blue-600 text-white px-3 py-1 rounded-sm hover:bg-blue-900 font-semibold">
                Add
            </button>
            {showError && (
                <p data-cy="todo-error" className="text-red">
                    Please enter a todo.
                </p>
            )}
        </form>
    );
}
