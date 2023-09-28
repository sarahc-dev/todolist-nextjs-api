import TodoItem from "./TodoItem";
import { ITodo, EditTodoFunction, DeleteTodoFunction } from "@/types";

interface TodoListProps {
    items: ITodo[];
    editTodo: EditTodoFunction;
    deleteTodo: DeleteTodoFunction;
}

export default function TodoList({ items, editTodo, deleteTodo }: TodoListProps) {
    if (items.length === 0) {
        return <p>There&apos;s nothing here.</p>;
    }

    return (
        <ul data-cy="todolist" className="mt-4">
            {items.map(item => (
                <TodoItem key={item._id} todo={item} editTodo={editTodo} deleteTodo={deleteTodo} />
            ))}
        </ul>
    );
}
