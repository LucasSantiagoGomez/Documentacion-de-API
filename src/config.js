import dotenv from "dotenv";
dotenv.config();

const config = {
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  SESSION_SECRET: process.env.SESSION_SECRET,
  clientID: "Iv1.0cfb1633f076232b",
  clientSecret: "94842fd108fc7eae9f2037b21cbe14cb8927220a",
  callbackUrl: "http://localhost:8080/api/sessions/githubcallback",
};

export default config;
