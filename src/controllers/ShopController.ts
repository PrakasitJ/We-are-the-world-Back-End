import { Elysia, t } from "elysia";
import ShopRepository from "../repositories/ShopRepository";

const ShopController = new Elysia({
  prefix: "/api/shop",
  tags: ["Shop"],
});

ShopController.get(
  "/getAll",
  async () => {
    const shopRepository = new ShopRepository();
    const shop = await shopRepository.getAllShops();
    return shop;
  },
  {
    detail: {
      summary: "Get all Shop",
      description: "Get all Shop in database",
    },
  }
);

ShopController.get(
  "/getAllWithImagesAndCategory",
  async () => {
    const shopRepository = new ShopRepository();
    const shop = await shopRepository.getAllShopsWithImagesAndCategory();
    return shop;
  },
  {
    detail: {
      summary: "Get all Shop with Images",
      description: "Get all Shop with Images in database",
    },
  }
);

ShopController.get(
  "/get/:id",
  async ({ params: { id } }) => {
    const shopRepository = new ShopRepository();
    const shop = await shopRepository.getShopById(id);
    return shop;
  },
  {
    params: t.Object({
      id: t.Number(),
    }),
    detail: {
      summary: "get Shop by id",
      description: "Get Shop by id in database",
    },
  }
);

ShopController.get(
  "/getAllCategories/:shop_id",
  async ({ params: { shop_id } }) => {
    const shopRepository = new ShopRepository();
    const shop = await shopRepository.getAllCategories(shop_id);
    return shop;
  },
  {
    params: t.Object({
      shop_id: t.Number(),
    }),
    detail: {
      summary: "Get all Categories",
      description: "Get all Categories in database",
    },
  }
);

ShopController.get(
  "/get/:id/detail",
  async ({ params: { id } }) => {
    const shopRepository = new ShopRepository();
    const shop = await shopRepository.getShopByIdWithDetail(id);
    return shop;
  },
  {
    params: t.Object({
      id: t.Number(),
    }),
    detail: {
      summary: "get Shop by id with all detail",
      description: "Get Shop by id in database with all detail",
    },
  }
);

ShopController.get(
  "/getByUserId/:user_id",
  async ({ params: { user_id } }) => {
    const shopRepository = new ShopRepository();
    const shop = await shopRepository.getShopsByUserId(user_id);
    return shop;
  },
  {
    params: t.Object({
      user_id: t.String(),
    }),
    detail: {
      summary: "Get the belong shops by user id ",
      description: "Get the belong shops by user id in database",
    },
  }
);

ShopController.post(
  "/create",
  async ({ body: { user_id, name, description, open_time, close_time } }) => {
    const shopRepository = new ShopRepository();
    const shop = await shopRepository.create({
      user_id,
      name,
      description,
      open_time,
      close_time,
    });
    return shop;
  },
  {
    body: t.Object({
      user_id: t.String(),
      name: t.String({
        minLength: 1,
        maxLength: 255,
        pattern: "^[a-zA-Z0-9 ']*$",
        error: '{"error" : "Name must be a string and not empty"}',
        description: "Name must be a string and not empty",
      }),
      description: t.String({
        minLength: 1,
        maxLength: 255,
        pattern: "^[a-zA-Z0-9 ']*$",
        error: '{"error" : "Description must be a string and not empty"}',
        description: "Description must be a string and not empty",
      }),
      open_time: t.Date({
        error: '{"error" : "Open time must be a date"}',
        description: "Open time must be a date",
      }),
      close_time: t.Date({
        error: '{"error" : "Close time must be a date"}',
        description: "Close time must be a date",
      }),
    }),
    detail: {
      summary: "Create Shop",
      description: "Create a new Shop in database",
    },
  }
);

ShopController.post(
  "/createBankAccountAndAddToShop",
  async ({
    body: { shop_id, bank_account_number, account_holder_name, bank_id },
  }) => {
    const shopRepository = new ShopRepository();
    const shop = await shopRepository.createBankAndAddToShop({
      shop_id,
      bank_account_number,
      account_holder_name,
      bank_id,
    });
    return shop;
  },
  {
    body: t.Object({
      shop_id: t.Number({
        minimum: 1,
        error: "Shop Id must be a number",
        description: "Shop Id must be a number and greater than 0",
      }),
      bank_account_number: t.String({
        minLength: 18,
        maxLength: 18,
        pattern: "^[0-9]+$",
        error: "Bank Account Number must be a string and 18 characters",
        description: "Bank Account Number must be a string and 18 characters",
      }),
      account_holder_name: t.String({
        minLength: 1,
        maxLength: 255,
        pattern: "^[a-zA-Z ]*$",
        error: "Account Holder Name must be a string and not empty",
        description: "Account Holder Name must be a string and not empty",
      }),
      bank_id: t.Number({
        minimum: 1,
        error: "Bank Id must be a number",
        description: "Bank Id must be a number and greater than 0",
      }),
    }),
    detail: {
      summary: "Create Bank Account and Add to Shop",
      description: "Create Bank Account and Add to Shop",
    },
  }
);

ShopController.post(
  "/addShopImage",
  async ({ body: { shop_id, image_url } }) => {
    const shopRepository = new ShopRepository();
    const shop = await shopRepository.addShopImage({ shop_id, image_url });
    return shop;
  },
  {
    body: t.Object({
      shop_id: t.Number(),
      image_url: t.String(),
    }),
    detail: {
      summary: "Add Shop Image",
      description: "Add Shop Image in database",
    },
  }
);

ShopController.delete(
  "/removeShopImage",
  async ({ body: { shop_image_id } }) => {
    const shopRepository = new ShopRepository();
    const shop = await shopRepository.removeShopImage({ shop_image_id });
    return shop;
  },
  {
    body: t.Object({
      shop_image_id: t.Number(),
    }),
    detail: {
      summary: "Remove Shop Image",
      description: "Remove Shop Image in database",
    },
  }
);

ShopController.post(
  "/addBankAccount",
  async ({ body: { shop_id, bank_account_id } }) => {
    const shopRepository = new ShopRepository();
    const shop = await shopRepository.addBankAccount({
      shop_id,
      bank_account_id,
    });
    return shop;
  },
  {
    body: t.Object({
      shop_id: t.Number(),
      bank_account_id: t.Number(),
    }),
    detail: {
      summary: "Add Bank Account",
      description: "Connect Bank Account and Shop",
    },
  }
);

ShopController.post(
  "/addProduct",
  async ({ body }) => {
    const shopRepository = new ShopRepository();
    const shop = await shopRepository.addProduct(body);
    return shop;
  },
  {
    body: t.Object({
      shop_id: t.Number(),
      category_id: t.Optional(t.Number()),
      name: t.String({
        minLength: 1, 
        maxLength: 255,
        pattern: "^[a-zA-Z0-9 ']*$",
        error: '{"error" : "Name must be a string and not empty"}',
        description: "Name must be a string and not empty",
      }),
      price: t.Number({
        minimum:  0,
        error: '{"error" : "Price must be a number and greater than 0"}',
        description: "Price must be a number and greater than 0",
      }),
      amount: t.Number({
        minimum: 0,
        error: '{"error" : "Amount must be a number and greater than 0"}',
        description: "Amount must be a number and greater than 0",
      }), 
      description: t.String({
        minLength: 1,
        maxLength: 255,
        pattern: "^[a-zA-Z0-9 ']*$",
        error: '{"error" : "Description must be a string and not empty"}',
        description: "Description must be a string and not empty",
      }),
      image_url: t.String({
        minLength: 1,
        maxLength: 255,
        error: '{"error" : "Image URL must be a string and not empty"}',
        description: "Image URL must be a string and not empty",
      }),
    }),
    detail: {
      summary: "Add Product",
      description: "Add Product to Shop",
    },
  }
);

ShopController.put(
  "/update",
  async ({ body }) => {
    const shopRepository = new ShopRepository();
    const shop = await shopRepository.updateShop({ id: body.id, shop: body });
    return shop;
  },
  {
    body: t.Object({
      id: t.Number(),
      user_id: t.Optional(t.String()),
      name: t.Optional(t.String()),
      description: t.Optional(t.String()),
      open_time: t.Optional(t.Date()),
      close_time: t.Optional(t.Date()),
    }),
    detail: {
      summary: "Update Shop",
      description: "Update a new Shop in database",
    },
  }
);

ShopController.delete(
  "/delete",
  async ({ body: { shop_id } }) => {
    const shopRepository = new ShopRepository();
    shopRepository.deleteShop(shop_id);
  },
  {
    body: t.Object({
      shop_id: t.Number(),
    }),
    detail: {
      summary: "Delete Shop",
      description: "Detate Shop by Id",
    },
  }
);

export default ShopController;
