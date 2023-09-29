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
        <li className="flex mb-3">
            <Checkbox complete={todo.completed} toggleCheckbox={handleToggleCompleted} />

            {editMode ? (
                <EditTodo title={todo.title} confirmEdit={handleConfirmEdit} setEditMode={setEditMode} />
            ) : (
                <>
                    <p onClick={handleToggleCompleted} className={`${todo.completed && "line-through"} mr-4 flex-1`}>
                        {todo.title}
                    </p>
                    <IconButton action="edit" Icon={BsPencil} color="bg-orange-400 hover:bg-orange-500" handleClick={() => setEditMode(true)} />
                </>
            )}
            <IconButton action="delete" Icon={RiDeleteBin6Line} color="bg-red-700 hover:bg-red-800" handleClick={handleDeleteTodo} />
        </li>
    );
}
