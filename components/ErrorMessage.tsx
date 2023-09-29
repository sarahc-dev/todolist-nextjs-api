interface ErrorMessageProps {
    errorMessage: string | null;
}

export default function ErrorMessage({ errorMessage }: ErrorMessageProps) {
    let displayErrorText = "";
    if (errorMessage?.includes("Error adding todo")) {
        displayErrorText = "There was an error adding the todo. Please try again.";
    } else if (errorMessage?.includes("Error editing todo")) {
        displayErrorText = "There was an error updating the todo. Please try again.";
    } else if (errorMessage?.includes("Error deleting todo")) {
        displayErrorText = "There was an error deleting the todo. Please try again.";
    } else {
        displayErrorText = "Oops, there's been an error. Please try again.";
    }

    if (errorMessage) {
        return <p className="text-red-600">{displayErrorText}</p>;
    }

    return null;
}
