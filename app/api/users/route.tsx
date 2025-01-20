export async function GET() {
    const res = await fetch('http://localhost:5000/users');
    const users = await res.json();
    return Response.json({ users })
}