import { headers } from "next/headers";
import { DB_URL, JWT_SECRET_KEY } from "../../../common/constant";
import { UserType } from "../../../common/types";
import jwt, {JwtPayload} from "jsonwebtoken";

export async function POST(request: Request) {
    const token = request.headers.get("token")

  // get all users
  const response = await fetch(`${DB_URL}/users`);
  const users = await response.json();

  // get data from body
  const body = await request.json();

  if(token) {
      const userObj : JwtPayload | string  = jwt.verify(token, JWT_SECRET_KEY)
      if( typeof userObj !== "string" && userObj.userId ) {
        const userId = userObj.userId;
        const findUser = users.find(
          (item: UserType) => item.id.toString() === userId.toString()
        );

        if (!findUser) {
          return Response.json({ error: "User not found" }, { status: 404 });
        }

        // Update the user's password
        console.log("first", body.new_password);
        findUser.password = body.new_password;

        // Update into DB (for now JSON Web Server)
        const res = await fetch(`${DB_URL}/users/${userId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(findUser),
        });

        // If something goes wrong, return an error response
        if (!res.ok) {
          return new Response(
            JSON.stringify({ error: "Failed to register user" }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" },
            }
          );
        }

        return Response.json(
          { message: "Password updated successfully" },
          { status: 200 } // OK
        );
      }
  } else {
    return new Response(
        JSON.stringify({
          error: "Invalid Details",
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 400,
        }
      );
  }
  
}
