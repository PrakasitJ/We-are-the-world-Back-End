import { Elysia, redirect } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";
import UserController from "./controllers/UserController";
import ShopController from "./controllers/ShopController";
import BankAccountController from "./controllers/BankAccountController";

//This is the main app
const app = new Elysia();

//This is for the CORS
app.use(cors());

//This is for the API documentation
app.use(
  swagger({
    documentation: {
      info: {
        title: "We are the world API",
        description: "We are the world API Document",
        version: "1.0.0",
      },
      tags: [
        { name: "Home", description: "Home related endpoints" },
        { name: "User", description: "User related endpoints" },
        { name: "Shop", description: "Shop related endpoints"},
        { name: "Bank Account", description: "Bank Account related endpoints"},
      ],
    },
    path: "/api/docs",
  })
);

app.use(UserController); // Use userController in app
app.use(ShopController);
app.use(BankAccountController);
// app.use(anotherController);
// if you have more controllers, you can use them here


//This for redirect to API docs don't touch this
app.get(
  "/",
  () => {
    return redirect("/api/docs"); // Redirect to API docs
  },
  { detail: { tags: ["Home"], summary: "Home", description: 'Redirect to API docs'} }
);


//This is port for the server to run
app.listen(3000);

//This is just a log for the server to know where it's running
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
