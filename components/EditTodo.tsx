import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import IconButton from "./IconButton";
import { RiCloseFill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa6";

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
            <input type="text" data-cy="todo-edit" ref={editRef} value={editedTodo} onChange={handleChange} />

            <div className="flex">
                <IconButton action="confirm" Icon={FaCheck} handleClick={handleConfirmEditClick} />
                <IconButton action="decline" Icon={RiCloseFill} handleClick={handleDeclineEditClick} />
            </div>
            {isError && <small>Cannot be blank.</small>}
        </>
    );
}
