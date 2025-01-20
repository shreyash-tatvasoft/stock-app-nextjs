import { DB_URL, JWT_SECRET_KEY } from "../../../common/constant";
import { UserType } from "../../../common/types";
import jwt from  "jsonwebtoken";

export async function POST(request: Request) {
  // get all users
  const response = await fetch(`${DB_URL}/users`);
  const users = await response.json();

  // get data from body
  const user = await request.json();

  const findUser = users.find((item: UserType) => item.email === user.email && item.password === user.password);

  if (findUser) {
    const token = jwt.sign({ userId : findUser.id}, JWT_SECRET_KEY, {expiresIn : "1d"})
    return new Response(
      JSON.stringify({
        data: findUser,
        token
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    );
  } else {
    return new Response(
        JSON.stringify({
          error: "Invalid Details",
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 404,
        }
    );
  }
}
