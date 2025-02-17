import { Product_list } from "@prisma/client";
import db from './Database';

class ProductListRepository {
	public async getAllProductLists(): Promise<Product_list[]> {
		return await db.product_list.findMany();
	}

	public async getProductListById(id: number): Promise<Product_list | null> {
		return await db.product_list.findUnique({
			where: {
				id: id
			}
		});
	}

	public async getProductListByOrderId(id: number): Promise<Product_list[] | null> {
		return await db.product_list.findMany({
			where: {
				order_id: id
			}
		});
	}

	public async getProductListByProductID(id: number): Promise<Product_list[] | null> {
		return await db.product_list.findMany({
			where: {
				product_id: id
			}
		});
	}

	public async createProductList({
		order_id,
		product_id,
		quantity,
	}: {
		order_id: number;
		product_id: number;
		quantity: number;
	}): Promise<Product_list> {
		try {
			const respone = await db.product_list.create({
				data: {
					order_id: order_id,
					product_id: product_id,
					quantity: quantity,
				}
			});
			return respone;
		} catch (err) {
			throw err;
		}
	}

	public async updateProductList({
		id,
		product_list
	}: {
		id: number;
		product_list: Product_list;
	}): Promise<Product_list | null> {
		return await db.product_list.update({
			where: { id: id },
			data: product_list,
		});
	}

	// public async deleteProductList(id: number): Promise<Product_list | null> {
	// 	return await db.product_list.delete({
	// 		where: {
	// 			id: id
	// 		}
	// 	});
	// }
}

export default new ProductListRepository();
