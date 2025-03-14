import { Elysia, redirect } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";
import UserController from "./controllers/UserController";
import ShopController from "./controllers/ShopController";
import ProductController from "./controllers/ProductController";
import ProductCategoryController from "./controllers/ProductCategoryController";
import BankAccountController from "./controllers/BankAccountController";
import ProductListController from "./controllers/ProductListController";
import CharityController from "./controllers/CharityController";
import VehicleTypeController from "./controllers/VehicleController";
import OrderController from "./controllers/OrderController";
import BankController from "./controllers/BankController";
import LocationRepository from "./repositories/LocationRepository";
import LocationController from "./controllers/LocationController";

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
        { name: "Shop", description: "Shop related endpoints" },
        { name: "Charity", description: "Charity related endpoints" },
        { name: "Bank Account", description: "Bank Account related endpoints" },
        { name: "Product", description: "Product related endpoints" },
        {
          name: "Product Category",
          description: "Product Category related endpoints",
        },
        { name: "Product List", description: "Product List related endpoints" },
        { name: "Vehicle Type", description: "Vehicle Type related endpoints" },
        { name: "Order", description: "Order related endpoints" },
        { name: "Bank", description: "Bank related endpoints" },
        { name: "ProductList", description: "Product List related endpoints" },
        { name: "Location", description: "Location related endpoints" },
        {
          name: "ProductCategory",
          description: "Product Category related endpoints",
        },
      ],
    },
    path: "/api/docs",
  })
);

app.use(UserController); // Use userController in app
app.use(ShopController);
app.use(CharityController);
app.use(BankAccountController);
app.use(ProductController);
app.use(ProductCategoryController);
app.use(ProductListController);
app.use(VehicleTypeController);
app.use(OrderController);
app.use(BankController);
app.use(LocationController);
// app.use(anotherController);
// if you have more controllers, you can use them here

//This for redirect to API docs don't touch this
app.get(
  "/",
  () => {
    return redirect("/api/docs"); // Redirect to API docs
  },
  {
    detail: {
      tags: ["Home"],
      summary: "Home",
      description: "Redirect to API docs",
    },
  }
);

//This is port for the server to run
app.listen(3000);

//This is just a log for the server to know where it's running
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
