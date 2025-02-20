import ProductFilterRepositoy from "../repositories/ProductFilterRepositoy";
import {Elysia, t  } from "elysia";
import ProductListRepository from "../repositories/ProductlistRepository";

const ProductListController = new Elysia({
	prefix: "/api/ProductList",
	tags: ["ProductList"],
})

ProductListController.get(
	"/getAll",
	async() =>{
		const productListRepository = new ProductListRepository;
		const productList = productListRepository.getAllProductLists();
		return productList ?? { error: "ProductList not found", status: 200 };
	},
	{
		detail: {
			summary: "Get All ProductList",
			description : "Get all product list in data base"
		}
	}
)

ProductListController.get(
	"/getById/:id",
	async({params : {id}}) => {
		const productListRepository = new ProductListRepository;
		const productList = productListRepository.getProductListById(id);
		return productList ?? { error: "ProductList not found", status: 200};
	},
	{
		params : t.Object({
			id : t.Number()
		}),
		detail: {
			summary: "Get ProductList by id",
			description : "Get product list by id in data base"
		}

	}
)

ProductListController.get(
	"/getByProductId/:id",
	async({params : {id}}) => {
		const productListRepository = new ProductListRepository;
		const productList = productListRepository.getProductListByProductID(id);
		return productList ?? { error: "ProductList not found", status :200};
	},
	{
		params : t.Object({
			id : t.Number()
		}),
		detail: {
			summary: "Get ProductList by Product id",
			description : "Get product list by Product id in data base"
		}
	}
)

ProductListController.get(
	"/getByOrderId/:id",
	async({params : {id}}) => {
		const productListRepository = new ProductListRepository;
		const productList = productListRepository.getProductListByOrderId(id);
		return productList ?? { error: "ProductList not found", status :200};
	},
	{
		params : t.Object({
			id : t.Number()
		}),
		detail: {
			summary: "Get ProductList by Ordet id",
			description : "Get product list by Order id in data base"
		}
	}
)

ProductListController.put(
	"/update",
	async({body}) =>{
		const productListRepository = new ProductListRepository;
		const product = productListRepository.updateProductList({id : body.id,product_list : body})
		return product;
	},
	{
		body : t.Object({
			id : t.Number(),
			order_id : t.Optional(t.Number()),
			product_id : t.Optional(t.Number()),
			quantity : t.Optional(t.Number()),
			created_at: t.Optional(t.Date()),
			updated_at: t.Optional(t.Date())
		}),
		detail: {
			summary: "Update ProductList",
			description : "Update product list in data base"
		}
	}
)

ProductListController.post(
	"/create",
	async({body : {order_id,product_id,quantity}}) =>{
		const productListRepository = new ProductListRepository;
		const product = productListRepository.createProductList({order_id,product_id,quantity});
		return product;
	},
	{
		body : t.Object({
			order_id : t.Number(),
			product_id : t.Number(),
			quantity : t.Number()
		}),
		detail: {
			summary: "CreateProductList",
			description : "Create product list in data base"
		}
	}
)

ProductListController.delete(
	"/delete",
	async({body : {id}}) => {
		const productListRepository = new ProductListRepository;
		const productList = productListRepository.deleteProductList(id);
	},
	{
		body:t.Object({
			id : t.Number(),
		}),
		detail: {
			summary: "Delete ProductList",
			description : "Delete product list in data base"
		}
	}
)

export default ProductListController;
