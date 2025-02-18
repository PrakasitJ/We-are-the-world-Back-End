import { Bank_account, Shop, Shop_images, User } from "@prisma/client";
import db from "./Database";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

interface ShopWithDetail extends Partial<Shop> {
  user: Partial<User> | null;
  bank_account: Partial<Bank_account> | null;
  shop_images: Shop_images[] | null;
}

class ShopRepository {
  public async getShopById(id: number): Promise<Shop | null> {
    //Make Request to Database and return Shop
    return await db.shop.findUnique({
      where: { id: id },
    });
  }

  public async getShopByIdWithDetail(
    id: number
  ): Promise<Partial<ShopWithDetail> | null> {
    //Make Request to Database and return Shop
    return await db.shop.findUnique({
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
        bank_account: {
          select: {
            bank_account_number: true,
            bank_name: true,
            account_holder_name: true,
          },
        },
        Shop_images: true,
      },
    });
  }

  public async getAllShops(): Promise<Shop[]> {
    //Make Request to Database and return all Shops
    return await db.shop.findMany();
  }

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
  }): Promise<Shop> {
    //Make Request to Database and return Shop
    try {
      const response = await db.shop.create({
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
      //Handle Unknown Error
      throw new Error("Internal Server Error");
    }
  }

  public async addShopImage({
    shop_id,
    image_url,
  }: {
    shop_id: number;
    image_url: string;
  }): Promise<Shop_images | null> {
    //Make Request to Database and return Shop
    return await db.shop_images.create({
      data: {
        shop_id: shop_id,
        image_url: image_url,
      },
    });
  }

  public async addBankAccount({
    shop_id,
    bank_id,
  }: {
    shop_id: number;
    bank_id: number;
  }): Promise<Bank_account | null> {
    return await db.bank_account.update({
      where: { id: bank_id },
      data: {
        Shop: {
          connect: {
            id: shop_id,
          },
        },
      },
    });
  }

  public async updateShop({
    id,
    shop,
  }: {
    id: number;
    shop: Partial<Shop>;
  }): Promise<Shop | null> {
    //Make Request to Database and return Shop
    return await db.shop.update({
      where: { id: id },
      data: shop,
    });
  }

  public async deleteShop(id: number): Promise<Shop | null> {
    //Make Request to Database and return Shop
    return await db.shop.delete({
      where: { id: id },
    });
  }
}

export default ShopRepository;
