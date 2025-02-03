import { Prisma, User } from "@prisma/client";
import db from "./Database";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

//If you want to bring user data from the database, you can use the UserRepository class.
//This class will handle all the database operations related to the User model.
//If you want to get other data from the database, you can create a new repository class.
class UserRepository {
  public async getUserById(id: number): Promise<User | null> {
    //Make Request to Database and return User
    return await db.user.findUnique({
      where: { id },
    });
  }

  public async getAllUsers(): Promise<User[]> {
    //Make Request to Database and return all Users
    return await db.user.findMany();
  }

  public async createUser({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }): Promise<User> {
    try {
      //Make Request to Database and return User
      const response = await db.user.create({
        data: {
          username: username,
          email: email,
          password: password,
        },
      });
      return response;
    } catch (error) {
      //Handle Error from Database
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case "P2002":
            throw new Error("Email already exists");
          default:
            throw new Error("Internal Server Error");
        }
      }
      //Handle Unknown Error
      throw new Error("Internal Server Error");
    }
  }
}

export default UserRepository; //Export UserRepository for use in other files
