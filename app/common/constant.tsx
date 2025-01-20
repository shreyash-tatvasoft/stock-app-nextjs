
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
   RESET_PASSWORD : "/reset-password"
}