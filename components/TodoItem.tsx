import { useState } from "react";
import Checkbox from "./Checkbox";
import IconButton from "./IconButton";
import EditTodo from "./EditTodo";
import { BsPencil } from "react-icons/bs";
import { ITodo, EditTodoFunction } from "@/types";

interface TodoItemProps {
    todo: ITodo;
    editTodo: EditTodoFunction;
}

export default function TodoItem({ todo, editTodo }: TodoItemProps) {
    const [editMode, setEditMode] = useState<boolean>(false);

    const handleToggleCompleted = () => {
        editTodo(todo._id, { completed: !todo.completed });
    };

    const handleConfirmEdit = (editedTodo: string) => {
        editTodo(todo._id, { title: editedTodo });
        setEditMode(false);
    };

    return (
        <li className="flex">
            <Checkbox complete={todo.completed} toggleCheckbox={handleToggleCompleted} />

            {editMode ? (
                <EditTodo title={todo.title} confirmEdit={handleConfirmEdit} setEditMode={setEditMode} />
            ) : (
                <>
                    <p onClick={handleToggleCompleted} className={`${todo.completed && "line-through"} mr-3`}>
                        {todo.title}
                    </p>
                    <IconButton action="edit" Icon={BsPencil} handleClick={() => setEditMode(true)} />
                </>
            )}
        </li>
    );
}
