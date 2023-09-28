export interface ITodo {
    _id: string;
    title: string;
    completed: boolean;
}

export type EditTodoFunction = (id: string, newValue: { [key: string]: string | boolean }) => void;

export type DeleteTodoFunction = (id: string) => void;

export type filter = "all" | "completed" | "incomplete";
