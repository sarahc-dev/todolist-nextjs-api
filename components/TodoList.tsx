import { ITodo } from "@/types";

interface TodoListProps {
    items: ITodo[];
}

export default function TodoList({ items }: TodoListProps) {
    if (items.length === 0) {
        return <p>There&apos;s nothing here.</p>;
    }

    return (
        <ul data-cy="todolist" className="mt-4">
            {items.map(item => (
                <li key={item._id}>{item.title}</li>
            ))}
        </ul>
    );
}
