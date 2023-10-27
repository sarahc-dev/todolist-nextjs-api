import { useState, useEffect } from "react";
import { ITodo } from "@/types";

const useTodoApi = () => {
    const [allTodos, setAllTodos] = useState<ITodo[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const apiUrl = "http://localhost:3000/api/todos";

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch(apiUrl);

                if (!response.ok) {
                    throw new Error("Network response error");
                }

                const data = await response.json();
                setAllTodos(data);
                setIsLoading(false);
                setErrorMessage(null);
            } catch (error) {
                let message;
                if (error instanceof Error) message = error.message;
                else message = String(error);

                setIsLoading(false);
                handleError("Error fetching todos: " + message);
            }
        };
        fetchTodos();
    }, []);

    const addTodo = async (todo: string) => {
        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: todo }),
            });

            if (!response.ok) {
                throw new Error("Network response error");
            }

            const newTodo = await response.json();

            setErrorMessage(null);
            return { success: true, newTodo: newTodo };
        } catch (error) {
            let message;
            if (error instanceof Error) message = error.message;
            else message = String(error);

            handleError("Error adding todo: " + message);
            return { success: false };
        }
    };

    const editTodo = async (id: string, value: { [key: string]: string | boolean }) => {
        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(value),
            });

            if (!response.ok) {
                throw new Error("Network response error");
            }

            await response.json();

            setErrorMessage(null);
            return { success: true };
        } catch (error) {
            let message;
            if (error instanceof Error) message = error.message;
            else message = String(error);

            handleError("Error editing todo: " + message);
            return { success: false };
        }
    };

    const deleteTodo = async (id: string) => {
        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Network response error");
            }

            await response.json();

            setErrorMessage(null);
            return { success: true };
        } catch (error) {
            let message;
            if (error instanceof Error) message = error.message;
            else message = String(error);

            handleError("Error deleting todo: " + message);
            return { success: false };
        }
    };

    const handleError = (errorMessage: string) => {
        setErrorMessage(errorMessage);
        console.error(errorMessage);
    };

    return {
        allTodos,
        isLoading,
        errorMessage,
        addTodo,
        editTodo,
        deleteTodo,
    };
};

export default useTodoApi;
