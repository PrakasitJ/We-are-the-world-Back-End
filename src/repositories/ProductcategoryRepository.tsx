import {Product_category} from "@prisma/client";
import db from './Database';

class ProductCategoryRepository{

	public async getAllProductCategories(): Promise<Product_category[]> {
		return await db.product_category.findMany();
	}

	public async getProductCategoryById(id: number): Promise<Product_category | null> {
		return await db.product_category.findUnique({
			where: {
				id: id
			}
		});
	}

	public async getProductCategoryFromCategoryName(category_name: string): Promise<Product_category[]> {
		return await db.product_category.findMany({
			where: {
				category_name: category_name
			}
		});
	}

	public async getProductCategoryByShopID(id: number): Promise<Product_category[] | null> {
		return await db.product_category.findMany({
			where: {
				shop_id: id
			}
		});
	}

	public async createProductCategory({
		shop_id,
		category_name,
	}:{
		shop_id: number;
		category_name: string;
	}): Promise<Product_category> {
		try{
			const respone = await db.product_category.create({
				data: {
					shop_id: shop_id,
					category_name: category_name,
				}
			});
			return respone;
		}catch(error){
			throw error;
		}
	}

	public async updateProductCategory({
		id,
		product_category,
	}:{
		id : number;
		product_category: Product_category;
	}): Promise<Product_category> {
		try{
			const respone = await db.product_category.update({
				where: {
					id: id
				},
				data: product_category
			});
			return respone;
		}catch(error){
			throw error;
		}
	}

	// public async deleteProductCategory(id: number): Promise<Product_category | null> {
	// 	return await db.product_category.delete({
	// 		where: { id: id }
	// 	});
	// }
}
