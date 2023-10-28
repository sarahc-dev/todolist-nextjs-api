import connectMongoDB from "@/lib/dbConnection";
import Todo from "@/models/todoModel";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    await connectMongoDB();

    const id = params.id;
    const newValue = await req.json();

    if ((!newValue.title && typeof newValue.completed !== "boolean") || newValue.title === "") {
        return Response.json({ error: "Invalid todo" }, { status: 400 });
    }

    try {
        const editedTodo = await Todo.findByIdAndUpdate(id, newValue, { new: true });

        if (!editedTodo) {
            return Response.json({ error: "Invalid id" }, { status: 400 });
        }
        return Response.json(editedTodo, { status: 200 });
    } catch (error) {
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    await connectMongoDB();

    const id = params.id;

    try {
        const deletedTodo = await Todo.findOneAndDelete({ _id: id });

        if (!deletedTodo) {
            return Response.json({ error: "Invalid id" }, { status: 400 });
        }
        return Response.json(deletedTodo, { status: 200 });
    } catch (error) {
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}
