import { Shop } from "@prisma/client";
import db from "./Database";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

class ShopRepository {

	public async getShopById(id: number): Promise<Shop | null> {
		//Make Request to Database and return Shop
		return await db.shop.findUnique({
			where: { id: id },
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
		location_id,
	}: {
		user_id: string;
		name: string;
		description: string;
		open_time: Date;
		close_time: Date;
		location_id: number;
	}): Promise<Shop> {
		//Make Request to Database and return Shop
		try{
			const response = await db.shop.create({
				data : {
					user_id : user_id,
					name : name,
					description : description,
					open_time : open_time,
					close_time : close_time,
					location_id : location_id,
				}
			})
			return response;
		}
		catch (error) {
			if (error instanceof PrismaClientKnownRequestError){
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

	public async updateShop({
		id,
		shop
	}: {
		id: number,
		shop:Partial <Shop>
	}): Promise<Shop | null> {
		//Make Request to Database and return Shop
		return await db.shop.update({
			where: { id: id },
			data: shop
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
