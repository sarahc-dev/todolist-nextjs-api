import { IconType } from "react-icons";

interface IconButtonProps {
    action: string;
    Icon: IconType;
    color: string;
    handleClick: () => void;
}

export default function IconButton({ action, Icon, color, handleClick }: IconButtonProps) {
    return (
        <button data-cy={action} className={`h-6 w-6 rounded-sm text-white flex items-center justify-center flex-shrink-0 ${action === "delete" && "ml-2"} ${color}`} onClick={handleClick}>
            <Icon />
            <span className="sr-only">{action}</span>
        </button>
    );
}
