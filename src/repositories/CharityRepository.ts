import { Charity } from "@prisma/client";
import db from "./Database";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

class CharityRepository {
  public async create({
    user_id,
    name,
    description,
    open_time,
    close_time,
  }: {
    user_id: string;
    name: string;
    description: string;
    open_time: Date;
    close_time: Date;
  }): Promise<Charity> {
    //Make Request to Database and return Charity
    try {
      const response = await db.charity.create({
        data: {
          user_id: user_id,
          name: name,
          description: description,
          open_time: open_time,
          close_time: close_time,
        },
      });
      return response;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case "P2002":
            throw new Error("Name or userid or locationid already exists");
          case "P2023":
            throw new Error("userid mustbe uid");
          default:
            throw new Error(error.code);
        }
      }
    }
    throw new Error("Internal Server Error");
  }

  public async updateCharity({
    id,
    charity,
  }: {
    id: number;
    charity: Partial<Charity>;
  }) {
    //Make Request to Database and return Charity
    return await db.charity.update({
      where: { id: id },
      data: charity,
    });
  }

  public async deleteCharity(id: number) {
    //Make Request to Database and return Charity
    return await db.charity.delete({
      where: { id: id },
    });
  }

  public async addShopImage({
    charity_id,
    image_url,
  }: {
    charity_id: number;
    image_url: string;
  }) {
    //Make Request to Database and return Charity
    return await db.charity_images.create({
      data: {
        charity_id: charity_id,
        image_url: image_url,
      },
    });
  }

  public async getCharityById(id: number) {
    //Make Request to Database and return Charity
    return await db.charity.findUnique({
      where: { id: id },
    });
  }

  public async getAllCharity() {
    //Make Request to Database and return Charity
    return await db.charity.findMany();
  }

  public async getCharityWithDetail(id: number) {
    //Make Request to Database and return Charity
    return await db.charity.findUnique({
      where: { id: id },
      include: {
        user: {
          select: {
            username: true,
            email: true,
            name: true,
            surname: true,
            tel: true,
          },
        },
        Charity_images: true,
      },
    });
  }

  public async addCharityImage({
    charity_id,
    image_url,
  }: {
    charity_id: number;
    image_url: string;
  }) {
    //Make Request to Database and return Charity
    return await db.charity_images.create({
      data: {
        charity_id: charity_id,
        image_url: image_url,
      },
    });
  }
}

export default CharityRepository;
