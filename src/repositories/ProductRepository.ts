import { Product } from "@prisma/client";
import db from './Database';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

class ProductRepository{

	public async getAllProducts(): Promise<Product[]> {
		return await db.product.findMany();
	}

	public async getProductById(id: number): Promise<Product | null> {
		return await db.product.findUnique({
			where: {
				id: id
			}
		});
	}

	public async getProductByShopId(id: number): Promise<Product[]> {
		return await db.product.findMany({
			where: {
				shop_id: id
			}
		});
	}

	public async getProductByCategoryId(id: number): Promise<Product[]> {
		return await db.product.findMany({
			where: {
				product_category_id: id
			}
		});
	}

	public async createProduct({
		shop_id,
		product_category_id,
		name,
		price,
		amount,
		image_url,
		description,
	}: {
		shop_id: number;
		product_category_id: number;
		name: string;
		price: number;
		amount: number;
		image_url: string;
		description: string;
	}): Promise<Product | undefined> {
		try{
			const respone = await db.product.create({
				data:{
					shop_id: shop_id,
					name: name,
					price: price,
					amount: amount,
					image_url: image_url,
					description: description,
					product_category_id: product_category_id,
				},
			});
			return respone;
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				switch (error.code) {
				  default:
					throw new Error(error.message);
				}
			  }
		}
	}

	public async updateProduct({
		id,
		product,
	}: {
		id: number;
		product: Product;
	}): Promise<Product | null> {
		return await db.product.update({
			where: { id: id},
			data: product,
		});
	}

	public async deleteProduct(id: number): Promise<Product | null> {
		return await db.product.delete({
			where: {
				id: id
			}
		});
	}

}

export default ProductRepository;
