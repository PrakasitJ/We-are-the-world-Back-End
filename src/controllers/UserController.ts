import { Elysia, t } from "elysia";
import UserRepository from "../repositories/UserRepository";
import { User } from "@prisma/client";

const userController = new Elysia({
  prefix: "/api/user", // Define prefix for all routes in this controller
  tags: ["User"], // Define tags for all routes in this controller
});

userController.model({
  User: t.Object({
    // Define User model
    id: t.Number(),
    username: t.String(),
    email: t.String(),
    password: t.String(),
    createdAt: t.Date(),
    updatedAt: t.Date(),
  }),
});

userController.get(
  // Define GET route
  "/:id",
  async ({ params: { id } }) => {
    const userRepository = new UserRepository(); // Create new UserRepository instance
    const user: User | null = await userRepository.getUserById(id); // Get user by id
    return user ?? { error: "User not found", status: 200 }; // Return user or error
  },
  {
    params: t.Object({ id: t.Number() }), // Define id parameter
    detail: {
      summary: "Get User By Id", // API Name for documentation
      description: "Get user by id from database", // API Description for documentation
    },
  }
);

userController.get(
  // Define GET route
  "/all",
  async () => {
    const userRepository = new UserRepository(); // Create new UserRepository instance
    const users: User[] = await userRepository.getAllUsers(); // Get all users
    return users; // Return all users
  },
  {
    detail: {
      summary: "Get All User", // API Name for documentation
      description: "Get all user from database", // API Description for documentation
    },
  }
);

userController.post(
  // Define POST route
  "/create",
  async ({ body, set }) => {
    // Get body from request and set for custom response
    const userRepository = new UserRepository(); // Create new UserRepository instance

    try {
      // Try to create user
      const user: User = await userRepository.createUser(body); // Create user
      return user; // Return user
    } catch (error: any) {
      // Catch error
      set.status = 400; // Set status to 400
      return { error: error.message, status: 400 }; // Return error
    }
  },
  {
    body: t.Object({
      // Define body parameter
      username: t.String({
        // Define username parameter
        minLength: 2,
        maxLength: 12,
        format: "hostname",
        error: {
          minLength: "Username should have at least 2 characters",
          maxLength: "Username should have at most 12 characters",
          format: "Username should have no whitespace and have 2-12 characters",
        },
        description:
          "Username should have no whitespace and have 2-12 characters",
      }),
      email: t.String({
        // Define email parameter
        minLength: 5,
        maxLength: 30,
        format: "email",
        error: {
          minLength: "Email should have at least 5 characters",
          maxLength: "Email should have at most 30 characters",
          format: "Email should be in email form and have 5-30 characters",
        },
        description: "Email should be in email form and have 5-30 characters",
      }),
      password: t.String({
        // Define password parameter
        minLength: 8,
        maxLength: 12,
        pattern:
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\\d!@#$%^&*(),.?":{}|<>]{8,12}$',
        error: {
          minLength: "Password should have at least 8 characters",
          maxLength: "Password should have at most 12 characters",
          pattern:
            "Password should be 8-12 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
        },
        description:
          "Password should be 8-12 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
      }),
    }),
    detail: {
      summary: "Create User", // API Name for documentation
      description: "Create user in database", // API Description for documentation
    },
  }
);

// You can define more routes here
// userController.get(...)
// userController.post(...)
// userController.put(...)
// userController.patch(...)
// userController.delete(...)

export default userController; // Export userController for use in other files
