import { Dispatch, SetStateAction } from "react";
import { filter } from "@/types";

interface FilterTodosProps {
    activeFilter: filter;
    setActiveFilter: Dispatch<SetStateAction<filter>>;
}

export default function FilterTodos({ activeFilter, setActiveFilter }: FilterTodosProps) {
    return (
        <div className="flex flex-row gap-4 mt-auto">
            <button type="button" data-cy="filterAllTodos" onClick={() => setActiveFilter("all")} className={`${activeFilter === "all" && "border-b-2 border-blue-600"}`}>
                All
            </button>
            <button type="button" data-cy="filterCompletedTodos" onClick={() => setActiveFilter("completed")} className={`${activeFilter === "completed" && "border-b-2 border-blue-600"}`}>
                Completed
            </button>
            <button type="button" data-cy="filterIncompleteTodos" onClick={() => setActiveFilter("incomplete")} className={`${activeFilter === "incomplete" && "border-b-2 border-blue-600"}`}>
                Incomplete
            </button>
        </div>
    );
}
