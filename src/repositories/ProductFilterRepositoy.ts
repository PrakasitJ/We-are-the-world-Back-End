import { Product_filter } from "@prisma/client";
import db from './Database';

class Product_filterRepository{

	public async getAllProductFilters(): Promise<Product_filter[]> {
		return await db.product_filter.findMany();
	}

	public async getProductById(id: number): Promise<Product_filter | null> {
		return await db.product_filter.findUnique({
			where: {
				id: id
			}
		});
	}

	public async getProductFilterFromFilterId(id: number): Promise<Product_filter[]> {
		return await db.product_filter.findMany({
			where: {
				filter_id: id
			}
		});
	}

	public async getProductFilterFromProductId(id: number): Promise<Product_filter[]> {
		return await db.product_filter.findMany({
			where: {
				product_id: id
			}
		});
	}

	public async createProductFilter({
		product_id,
		filter_id,
	}: {
		product_id: number;
		filter_id: number;
	}): Promise<Product_filter> {
		try{
			const respone = await db.product_filter.create({
				data:{
					product_id: product_id,
					filter_id: filter_id,
				}
			});
			return respone;
		}catch(error){
			throw error;
		}
	}

	public async updateProductFilter({
		id,
		product_Filter
	}: {
		id: number;
		product_Filter: Product_filter;
	}): Promise<Product_filter> {
		try{
			const respone = await db.product_filter.update({
				where: { id: id },
				data: product_Filter,
			});
			return respone;
		}catch(error){
			throw error;
		}
	}

	public async deleteProductFilter(id: number): Promise<Product_filter | null> {
		return await db.product_filter.delete({
			where: { id: id }
		});
	}
}

export default new Product_filterRepository();
