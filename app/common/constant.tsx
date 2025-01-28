import { faker } from '@faker-js/faker';
import jwt, {JwtPayload} from "jsonwebtoken"

export const BASE_URL = "http://localhost:3000/api"
export const DB_URL = "http://localhost:5000"
export const JWT_SECRET_KEY = "qwemrevbax570tyupowedf" 

export const API_ROUTES = {
    USER_ROUTES : {
        REGISTER : `${BASE_URL}/users/register`,
        LOGIN : `${BASE_URL}/users/login`,
        All_USERS : `${BASE_URL}/users`,
        FORGOT_PASSWORD : `${BASE_URL}/users/forgot-password`,
        RESET_PASSWORD : `${BASE_URL}/users/reset-password`
    }
}
export const ROUTES = {
   MAIN_PAGE : "/",
   LOGIN : "/login",
   REGISTER : "/register",
   FORGOT_PASSWORD : "/forgot-password",
   RESET_PASSWORD : "/reset-password",
   PROFILE: "/profile",
   WATCHLIST : "/watchlist"
}

export const ApiResponse = (status: number, data: any) => {
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
    status,
  });
};


export const generateDummyStockData = () => {
  return {
    symbol: faker.finance.currencySymbol() + faker.string.alphanumeric(3),
    name: faker.company.name(),
    sector: faker.commerce.department(),
    marketCap: faker.number.int({ min: 500000000, max: 200000000000 }),
    price: parseFloat(faker.commerce.price({ min : 10, max: 5000})),
    updatedAt: new Date(),
  };
};

export const getIDFromToken = (token : string) => {
  const userObj: JwtPayload | string = jwt.verify(token, JWT_SECRET_KEY);
  let userId = "";
  if (typeof userObj !== "string" && userObj && userObj.userID) {
    userId = userObj.userID;
  }

  return userId
}