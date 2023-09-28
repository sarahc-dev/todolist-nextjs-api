import { useState } from "react";
import Checkbox from "./Checkbox";
import IconButton from "./IconButton";
import EditTodo from "./EditTodo";
import { BsPencil } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ITodo, EditTodoFunction, DeleteTodoFunction } from "@/types";

interface TodoItemProps {
    todo: ITodo;
    editTodo: EditTodoFunction;
    deleteTodo: DeleteTodoFunction;
}

export default function TodoItem({ todo, editTodo, deleteTodo }: TodoItemProps) {
    const [editMode, setEditMode] = useState<boolean>(false);

    const handleToggleCompleted = () => {
        editTodo(todo._id, { completed: !todo.completed });
    };

    const handleConfirmEdit = (editedTodo: string) => {
        editTodo(todo._id, { title: editedTodo });
        setEditMode(false);
    };

    const handleDeleteTodo = () => {
        deleteTodo(todo._id);
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
            <IconButton action="delete" Icon={RiDeleteBin6Line} handleClick={handleDeleteTodo} />
        </li>
    );
}
