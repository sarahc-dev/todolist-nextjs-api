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
