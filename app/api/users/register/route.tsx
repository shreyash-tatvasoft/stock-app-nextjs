import { DB_URL, JWT_SECRET_KEY } from "../../../common/constant";
import { UserType } from "../../../common/types";
import jwt from  "jsonwebtoken";

export async function POST(request: Request) {
  // get all users
  const response = await fetch(`${DB_URL}/users`);
  const users = await response.json();

  // get data from body
  const user = await request.json();
  const newUser = {
    id: users.length + 1,
    name: user.name,
    email: user.email,
    password: user.password,
  };

  const findUser = users.find((item: UserType) => item.email === user.email);

  if (findUser) {
    return new Response(
      JSON.stringify({
        error: "Email Already Exists",
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 404,
      }
    );
  }

  // save into DB (for now JSON Web Server)
  const res = await fetch(`${DB_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  // If something goes wrong, return an error response
  if (!res.ok) {
    return new Response(JSON.stringify({ error: "Failed to register user" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  // save to DB
  await users.push(newUser);

  const token = jwt.sign({ userId : newUser.id}, JWT_SECRET_KEY, {expiresIn : "1d"})

  return new Response(JSON.stringify({newUser, token}), {
    headers: { "Content-Type": "application/json" },
    status: 201,
  });
}
