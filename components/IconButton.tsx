import { IconType } from "react-icons";

interface IconButtonProps {
    action: string;
    Icon: IconType;
    handleClick: () => void;
}

export default function IconButton({ action, Icon, handleClick }: IconButtonProps) {
    return (
        <button data-cy={action} className="border-2 h-6 w-6 flex items-center justify-center" onClick={handleClick}>
            <Icon />
            <span className="sr-only">{action}</span>
        </button>
    );
}
