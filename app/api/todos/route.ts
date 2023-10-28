import connectMongoDB from "@/lib/dbConnection";
import Todo from "@/models/todoModel";

export async function GET() {
    await connectMongoDB();
    try {
        const todos = await Todo.find();
        return Response.json(todos, { status: 200 });
    } catch (error) {
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    await connectMongoDB();
    const todo = await req.json();

    if (!todo.title || todo.title === "") {
        return Response.json({ error: "Invalid todo" }, { status: 400 });
    }

    try {
        const newTodo = await new Todo(todo).save();
        return Response.json(newTodo, { status: 201 });
    } catch (error) {
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}
