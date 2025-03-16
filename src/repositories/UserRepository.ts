import { Prisma, User } from "@prisma/client";
import db from "./Database";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

//If you want to bring user data from the database, you can use the UserRepository class.
//This class will handle all the database operations related to the User model.
//If you want to get other data from the database, you can create a new repository class.
class UserRepository {
  public async getUserByUsernameOrEmail(
    username: string
  ): Promise<User | null> {
    //Make Request to Database and return User
    return await db.user.findFirst({
      where: {
        OR: [
          {
            username: username,
          },
          {
            email: username,
          },
        ],
      },
    });
  }

  public async getUserByUsername(username: string): Promise<User | null> {
    //Make Request to Database and return User
    return await db.user.findUnique({
      where: { username: username },
    });
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    //Make Request to Database and return User
    return await db.user.findUnique({
      where: { email: email },
    });
  }

  public async getUserById(uuid: string): Promise<User | null> {
    //Make Request to Database and return User
    return await db.user.findUnique({
      where: { uuid: uuid },
    });
  }

  public async getUserByIdWithDetail(uuid: string): Promise<User | null> {
    //Make Request to Database and return User
    return await db.user.findUnique({
      where: { uuid: uuid },
      include: {
        Admin: true,
        Rider: true,
        Shop: true,
        Charity: true,
        User_location: true,
      },
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
    name,
    surname,
    tel,
    salt,
  }: {
    username: string;
    email: string;
    password: string;
    name: string;
    surname: string;
    tel: string;
    salt: string;
  }): Promise<User> {
    try {
      //Make Request to Database and return User
      const response = await db.user.create({
        data: {
          username: username,
          email: email,
          password: password,
          name: name,
          surname: surname,
          tel: tel,
          salt: salt,
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

  public async updateUser({
    body,
  }: {
    body: {
      uuid: string;
      username?: string;
      email?: string;
      name?: string;
      surname?: string;
      tel?: string;
      password?: string;
      profile_image_url?: string;
    };
  }): Promise<User> {
    try {
      const user_id = body.uuid;
      let bodyCopy: Partial<typeof body> & { salt?: string } = { ...body };
      delete bodyCopy.uuid;

      if (body.password) {
        const salt = Math.random().toString(36).substring(7);
        bodyCopy.password = await Bun.password.hash(
          body.password + salt,
          "bcrypt"
        );
        bodyCopy.salt = salt;
      }
      const response = await db.user.update({
        where: { uuid: user_id },
        data: bodyCopy,
      });
      return response;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case "P2002":
            throw new Error("Email already exists");
          case "P2014":
            throw new Error("Already a rider");
          case "P2023":
            throw new Error("Invalid input");
          default:
            throw new Error(error.code);
        }
      }
      //Handle Unknown Error
      throw new Error("Internal Server Error");
    }
  }

  public async registerToBeRider({
    user_id,
    vehicle_registration,
  }: {
    user_id: string;
    vehicle_registration: string;
  }): Promise<User> {
    try {
      //Make Request to Database and return User
      const response = await db.user.update({
        where: { uuid: user_id },
        data: {
          Rider: {
            create: {
              vehicle_registration: vehicle_registration,
            },
          },
        },
      });
      return response;
    } catch (error) {
      //Handle Error from Database
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case "P2000":
            throw new Error("Too long vehicle registration");
          case "P2014":
            throw new Error("Already a rider");
          case "P2002":
            throw new Error("Invalid foreign key");
          case "P2023":
            throw new Error("Invalid input");
          default:
            throw new Error(error.code);
        }
      }
      //Handle Unknown Error
      throw new Error("Internal Server Error");
    }
  }
}

export default UserRepository; //Export UserRepository for use in other files
