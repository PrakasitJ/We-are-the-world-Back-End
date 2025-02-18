import {Elysia, t  } from "elysia";
import ProductCategoryRepository, {} from "../repositories/ProductcategoryRepository"
import { Param } from "@prisma/client/runtime/library";
import ProductController from "./ProductController";

const ProductCategoryController = new Elysia({
	prefix: "/api/ProductCategory",
	tags: ["ProductCategory"],
})

ProductCategoryController.get(
	"/getAll",
	async () => {
		const productCategoryRepository = new ProductCategoryRepository();
		const Product = await productCategoryRepository.getAllProductCategories();
		return Product;
	},
	{
		detail : {
			summary: "Get all Products Category",
			description: "Get all Products in database",
		}
	}
)

ProductCategoryController.get(
	"/getByName:name",
	async ({params : {name}}) => {
		const productCategoryRepository = new ProductCategoryRepository();
		const product = await productCategoryRepository.getProductCategoryByCategoryName(name);
		return product;
	},
	{
		params: t.Object({
			name : t.String()
		}),

		detail : {
			summary: "Get Products Category By name",
			description: "Get all Products By name in database"
		}
	}
)

ProductCategoryController.get(
	"/getById/:id",
	async({params: {id}}) =>{
		const productCategoryRepository = new ProductCategoryRepository();
		const product = await productCategoryRepository.getProductCategoryById(id);
		return product;
	},
	{
		params: t.Object({
			id : t.Number()
		}),

		detail : {
			summary: "Get Products Category By Id",
			description: "Get all Products By id in database"
		}
	}
)

ProductCategoryController.get(
	"/getByShopId/:id",
	async({params: {id}}) =>{
		const productCategoryRepository = new ProductCategoryRepository();
		const product = await productCategoryRepository.getProductCategoryById(id);
		return product;
	},
	{
		params: t.Object({
			id : t.Number()
		}),

		detail : {
			summary: "Get Products Category By Shop_Id",
			description: "Get all Products By Shop_id in database"
		}
	}
)

ProductCategoryController.post(
	"/create",
	async({body : {shop_id,category_name}}) => {
		const productCategoryRepository = new ProductCategoryRepository();
		const product = await productCategoryRepository.createProductCategory({
			shop_id,
			category_name
		});
		return product;
	},
	{
		body: t.Object({
			shop_id : t.Number(),
			category_name : t.String({
				minLength: 2,
				maxLength: 30,
				pattern : "^[a-zA-Z]*$",
				error : {
					minLength : "Name should have at least 2 characters",
					maxLength : "Name should have at most 30 characters",
				},
				description: "Name should have at least 2 characters and at most 30 characters",

			})
		}),
		detail : {
			summary : "Create",
			description : "Create product category in database"
		}
	}
)

ProductCategoryController.put(
	"/update",
	async({body}) => {
		const product_category = new ProductCategoryRepository();
		const product = await product_category.updateProductCategory({id : body.id, product_category : body});
		return product;
	},
	{
		body: t.Object({
			id: t.Number(),
			shop_id : t.Number(),
			category_name : t.String({
				minLength: 2,
				maxLength: 30,
				pattern : "^[a-zA-Z]*$",
				error : {
					minLength : "Name should have at least 2 characters",
					maxLength : "Name should have at most 30 characters",
				},
				description: "Name should have at least 2 characters and at most 30 characters",

			}),
			cratedAt : t.Optional(t.Date()),
			updatedAt : t.Optional(t.Date()),
		}),
		detail : {
			summary : "Update",
			description : "Update product category in database"
		}
	}

)

ProductCategoryController.delete(
	"/delete",
	async ({body: {product_id}}) => {
		const productCategoryRepository = new ProductCategoryRepository();
		productCategoryRepository.deleteProductCategory(product_id);
	},
	{
		body : t.Object({
			product_id : t.Number(),
		}),
		detail : {
			summary: "Delete",
			description : "Delete Product in data base"
		}
	}
)

export default ProductCategoryController;
