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
        <form onSubmit={handleSubmit}>
            <input type="text" data-cy="todo-input" value={newTodo} onChange={handleChange} className="border-b" />
            <button type="submit" data-cy="todo-submit">
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
