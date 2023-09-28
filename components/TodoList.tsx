import TodoItem from "./TodoItem";
import { ITodo, EditTodoFunction } from "@/types";

interface TodoListProps {
    items: ITodo[];
    editTodo: EditTodoFunction;
}

export default function TodoList({ items, editTodo }: TodoListProps) {
    if (items.length === 0) {
        return <p>There&apos;s nothing here.</p>;
    }

    return (
        <ul data-cy="todolist" className="mt-4">
            {items.map(item => (
                <TodoItem key={item._id} todo={item} editTodo={editTodo} />
            ))}
        </ul>
    );
}
