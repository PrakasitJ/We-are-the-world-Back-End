import { Elysia, t } from "elysia";
import UserRepository from "../repositories/UserRepository";
import { User } from "@prisma/client";
import { password } from "bun";

const UserController = new Elysia({
  prefix: "/api/user", // Define prefix for all routes in this controller
  tags: ["User"], // Define tags for all routes in this controller
});

UserController.model({
  User: t.Object({
    // Define User model
    uuid: t.String(),
    location_id: t.Integer(),
    username: t.String(),
    email: t.String(),
    password: t.String(),
    salt: t.String(),
    name: t.String(),
    surname: t.String(),
    tel: t.String(),
    createdAt: t.Date(),
    updatedAt: t.Date(),
  }),
});

UserController.get(
  // Define GET route
  "/:id",
  async ({ params: { id } }) => {
    const userRepository = new UserRepository(); // Create new UserRepository instance
    const user: User | null = await userRepository.getUserById(id); // Get user by id
    return user ?? { error: "User not found", status: 200 }; // Return user or error
  },
  {
    params: t.Object({ id: t.String() }), // Define id parameter
    detail: {
      summary: "Get User By Id", // API Name for documentation
      description: "Get user by id from database", // API Description for documentation
    },
  }
);

UserController.get(
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

UserController.post(
  // Define POST route
  "/create",
  async ({ body, set }) => {
    // Get body from request and set for custom response
    const userRepository = new UserRepository(); // Create new UserRepository instance

    try {
      // Try to create user
      body.salt === undefined ? body.salt = Math.random().toString(36).substring(2, 12) : ""; // Generate random
      const newBody = { ...body, salt: body.salt };
      const password =  await Bun.password.hash(newBody.password + newBody.salt, 'bcrypt'); // Hash password
      newBody.password = password; // Set password
      const user: User = await userRepository.createUser(newBody); // Create user
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
        maxLength: 30,
        format: "hostname",
        error: {
          minLength: "Username should have at least 2 characters",
          maxLength: "Username should have at most 30 characters",
          format: "Username should have no whitespace and have 2-30 characters",
        },
        description:
          "Username should have no whitespace and have 2-30 characters",
      }),
      email: t.String({
        // Define email parameter
        minLength: 5,
        maxLength: 20,
        format: "email",
        error: {
          minLength: "Email should have at least 5 characters",
          maxLength: "Email should have at most 20 characters",
          format: "Email should be in email form and have 5-20 characters",
        },
        description: "Email should be in email form and have 5-20 characters",
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
      name: t.String({
        // Define name parameter
        minLength: 2,
        maxLength: 15,
        pattern: "^[a-zA-Z]*$",
        error: {
          minLength: "Name should have at least 2 characters",
          maxLength: "Name should have at most 15 characters",
        },
        description:
          "Name should have at least 2 characters and at most 15 characters",
      }),
      surname: t.String({
        // Define surname parameter
        minLength: 2,
        maxLength: 15,
        pattern: "^[a-zA-Z]*$",
        error: {
          minLength: "Surname should have at least 2 characters",
          maxLength: "Surname should have at most 15 characters",
        },
        description:
          "Surname should have at least 2 characters and at most 15 characters",
      }),
      tel: t.String({
        // Define tel parameter
        minLength: 10,
        maxLength: 10,
        pattern: "^[0-9]*$",
        error: {
          minLength: "Tel should have 10 characters",
          maxLength: "Tel should have 10 characters",
        },
        description: "Tel should have 10 characters",
      }),
      location_id: t.Integer({
        minimum: 1,
        error: { minimum: "Location id should be at least 1" },
        description: "Location id should be at least 1",
      }),
      salt: t.Optional(
        t.String({
          minLength: 10,
          maxLength: 10,
          error: {
            minLength: "Salt should have at least 10 characters",
            maxLength: "Salt should have at most 10 characters",
          },
          description:
            "Salt should have at least 10 characters and at most 10 characters",
        })
      ),
    }),
    detail: {
      summary: "Create User", // API Name for documentation
      description: "Create user in database", // API Description for documentation
    },
  }
);

// You can define more routes here
// UserController.get(...)
// UserController.post(...)
// UserController.put(...)
// UserController.patch(...)
// UserController.delete(...)

export default UserController; // Export UserController for use in other files
