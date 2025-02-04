import {Elysia, t} from "elysia";
import ShopRepository from "../repositories/ShopRepository";

const ShopController = new Elysia({
	prefix: "/api/shop",
	tags: ["Shop"],
})

ShopController.get(
	"/getAll",
	async () => {
		const shopRepository = new ShopRepository();
		const shop = await shopRepository.getAllShops();
		return shop;
	},
	{
		detail: {
			summary : "Get all Shop",
			description : "Get all Shop in database",
		}
	}
)

ShopController.get(
	"/get/:id",
	async ({params :{
		id,
	}}) => {
		const shopRepository = new ShopRepository();
		const shop = await shopRepository.getShopById(id);
		return shop;
	},
	{
		params : t.Object({
			id : t.Number()
		}),
		detail: {
			summary : "get Shop by id",
			description : "Get Shop by id in database",
		}
	}
)

ShopController.post(
	"/create",
	async ({body : {
		user_id,
		name,
		description,
		open_time,
		close_time,
		location_id,}}) => {
			const shopRepository = new ShopRepository();
			const shop = await shopRepository.create({
				user_id,
				name,
				description,
				open_time,
				close_time,
				location_id,});
			return shop
		},
		{
			body: t.Object({
				user_id : t.String(),
				name : t.String(),
				description : t.String(),
				open_time : t.Date(),
				close_time : t.Date(),
				location_id : t.Number()
			}),
			detail: {
				summary : "Create Shop",
				description : "Create a new Shop in database",
			}
		}
)

ShopController.put(
	"/update",
	async ({body}) => {
			const shopRepository = new ShopRepository();
			const shop = await shopRepository.updateShop({id:body.id,shop:body});
			return shop;
		},
		{
			body: t.Object({
				id : t.Number(),
				user_id : t.Optional(t.String()),
				name : t.Optional(t.String()),
				description : t.Optional(t.String()),
				open_time : t.Optional(t.Date()),
				close_time : t.Optional(t.Date()),
				location_id : t.Optional(t.Number())
			}),
			detail: {
				summary : "Update",
				description : "Update a new Shop in database",
			}
		}
)

// ShopController.delete(
// 	"/delete",
// 	async ({body :{
// 		shop_id
// 	}}) =>{
// 		const shopRepository = new ShopRepository();
// 		shopRepository.deleteShop(shop_id);
// 	},
// 	{
// 		body: t.Object({
// 			shop_id : t.Number()
// 		}),
// 		detail: {
// 			summary : "Delete Shop",
// 			description : "Detate Shop by Id"
// 		}
// 	},
// )

export default ShopController;
