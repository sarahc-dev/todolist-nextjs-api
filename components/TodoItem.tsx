import Checkbox from "./Checkbox";
import { ITodo, EditTodoFunction } from "@/types";

interface TodoItemProps {
    todo: ITodo;
    editTodo: EditTodoFunction;
}

export default function TodoItem({ todo, editTodo }: TodoItemProps) {
    const handleToggle = () => {
        editTodo(todo._id, { completed: !todo.completed });
    };

    return (
        <li className="flex">
            <Checkbox complete={todo.completed} toggleCheckbox={handleToggle} />
            <p className={`${todo.completed && "line-through"}`}>{todo.title}</p>
        </li>
    );
}
