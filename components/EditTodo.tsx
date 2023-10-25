import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import IconButton from "./IconButton";
import { FaCheck } from "react-icons/fa6";
import { MdOutlineClose } from "react-icons/md";

interface EditTodoProps {
    title: string;
    confirmEdit: (editedTodo: string) => void;
    setEditMode: Dispatch<SetStateAction<boolean>>;
}

export default function EditTodo({ title, confirmEdit, setEditMode }: EditTodoProps) {
    const [editedTodo, setEditedTodo] = useState<string>(title);
    const [isError, setIsError] = useState<boolean>(false);
    const editRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (editRef.current) editRef.current.focus();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isError) setIsError(false);
        setEditedTodo(e.target.value);
    };

    const handleConfirmEditClick = () => {
        if (editedTodo === "") {
            setIsError(true);
            return;
        }
        confirmEdit(editedTodo);
    };

    const handleDeclineEditClick = () => {
        setEditMode(false);
    };

    return (
        <>
            <input type="text" data-cy="todo-edit" ref={editRef} value={editedTodo} onChange={handleChange} className={`w-full mr-4 px-2 border-b ${isError && "placeholder:text-red-500"}`} placeholder={isError ? "Cannot be blank" : ""} />

            <div className="flex gap-1">
                <IconButton action="confirm" Icon={FaCheck} color="bg-green-600 hover:bg-green-700" handleClick={handleConfirmEditClick} />
                <IconButton action="decline" Icon={MdOutlineClose} color="bg-red-700 hover:bg-red-800" handleClick={handleDeclineEditClick} />
            </div>
            {/* {isError && <small className="text-red-500">Cannot be blank.</small>} */}
        </>
    );
}
