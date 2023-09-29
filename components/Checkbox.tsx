import { FaCheck } from "react-icons/fa6";

interface CheckboxProps {
    complete: boolean;
    toggleCheckbox: () => void;
}

export default function Checkbox({ complete, toggleCheckbox }: CheckboxProps) {
    return (
        <button data-cy="checkbox" onClick={toggleCheckbox} className="border-2 mr-3 w-6 h-6 rounded-full flex justify-center items-center flex-shrink-0">
            {complete && <FaCheck size="24px" />}

            <span className="sr-only">Mark as {complete ? "incomplete" : "complete"}</span>
        </button>
    );
}
