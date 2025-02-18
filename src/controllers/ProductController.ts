import {Elysia, t  } from "elysia";
import ProductRepository  from "../repositories/ProductRepository";
import { Param } from "@prisma/client/runtime/library";
import { $Enums } from "@prisma/client";

const ProductController = new Elysia({
	prefix: "/api/product",
	tags: ["Product"],
});


ProductController.get(
	"/getAll",
	async () => {
		const productRepository = new ProductRepository();
		const Product = await productRepository.getAllProducts();
		return Product;
	},
	{
		detail : {
			summary: "Get all Products",
			description: "Get all Products in database",
		}
	}
)

ProductController.get(
	"/get/:id",
	async ({params : {id}}) => {
		const productRepository = new ProductRepository();
		const Product = await productRepository.getProductById(id);
		return Product;
	},
	{
		params : t.Object({
			id : t.Number()
		}),
		detail : {
			summary: "Get Products by Id",
			description: "Get Products by Id in database",
		}
	}
)

ProductController.get(
	"/getByShopID/:id",
	async ({params : {id}}) => {
		const productRepository = new ProductRepository();
		const Product = await productRepository.getProductByShopId(id);
		return Product;
	},
	{
		params : t.Object({
			id : t.Number()
		}),
		detail : {
			summary: "Get Products by ShopId",
			description: "Get Products by shopid in database",
		}
	}
)

ProductController.get(
	"/getByCategoryID/:id",
	async({params : {id}}) => {
		const productRepository = new ProductRepository();
		const product = await productRepository.getProductByCategoryId(id);
		return product;
	},
	{
		params : t.Object({
			id : t.Number()
		}),
		detail : {
			summary: "Get Products by CategoryId",
			description: "Get Products by categoryid in database",
		}
	}
)

ProductController.post(
	"/create",
	async ({body : {shop_id,product_category_id,name,price,amount,image_url,description}}) => {
		const productRepository = new ProductRepository();
		const product = await productRepository.createProduct({
			shop_id,
			product_category_id,
			name,
			price,
			amount,
			image_url,
			description,
		});
		return product;
	},
	{
		body: t.Object({
			shop_id : t.Number(),
			product_category_id : t.Number(),
			name : t.String({
				minLength: 2,
				maxLength: 20,
				pattern: "^[a-zA-Z]*$",
				error: {
					minLength: "Name should have at least 2 characters",
					maxLength: "Name should have at most 20 characters",
				},
				description: "Name should have at least 2 characters and at most 15 characters",
			}),
			price : t.Number(),
			amount : t.Number(),
			image_url : t.String(),
			description : t.String({
				maxLength:50,
				error: {
					maxLength: "Name should have at most 50 characters",
				},
				description: "Desciption should have at most 50 characters",
			}),
		}),
		detail : {
			summary : "Create",
			description : "Create product in database"
		}
	}
)

ProductController.put(
	"/update",
	async ({body}) => {
		const productRepository = new ProductRepository();
		const product = await productRepository.updateProduct({id : body.id, product: body});
		return product;
	},
	{
		body : t.Object({
			id : t.Number(),
			shop_id : t.Optional(t.Number()),
			product_category_id : t.Optional(t.Number()),
			name : t.Optional(t.String({
				minLength: 2,
				maxLength: 20,
				pattern: "^[a-zA-Z]*$",
				error: {
					minLength: "Name should have at least 2 characters",
					maxLength: "Name should have at most 20 characters",
				},
				description: "Name should have at least 2 characters and at most 15 characters",
			})),
			price : t.Optional(t.Number()),
			amount : t.Optional(t.Number()),
			image_url : t.Optional(t.String()),
			description : t.Optional(t.String({
				maxLength:50,
				error: {
					maxLength: "Name should have at most 50 characters",
				},
				description: "Desciption should have at most 50 characters",
			})),
			createdAt : t.Optional(t.Date()),
			updatedAt : t.Optional(t.Date()),
			status: t.Optional(t.Enum({
				AVAILABLE : "AVAILABLE",
				NOT_AVAILABLE:"NOT_AVAILABLE",
				SOLD_OUT:"SOLD_OUT"
			})),
		}),
		detail: {
			summary: "Update",
			description : "Update Product in data base"
		}
	}
)

ProductController.delete(
	"/delete",
	async ({body: {product_id}}) => {
		const productRepository= new ProductRepository();
		productRepository.deleteProduct(product_id);
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

export default ProductController;
