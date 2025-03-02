import Elysia, { t } from "elysia";
import OrderRepository from "../repositories/OrderRepository";

const OrderController = new Elysia({
  prefix: "/api/order",
  tags: ["Order"],
});

OrderController.get(
  "/getAll",
  async () => {
    const orderRepository = new OrderRepository();
    const order = await orderRepository.getAllOrders();
    return order;
  },
  {
    detail: {
      summary: "Get all Order",
      description: "Get all Order in database",
    },
  }
);

OrderController.get(
  "/get/:id",
  async ({ params: { id } }) => {
    const orderRepository = new OrderRepository();
    const order = await orderRepository.getOrderById(id);
    return order ?? { error: "Order not found", status: 200 };
  },
  {
    params: t.Object({
      id: t.Number(),
    }),
    detail: {
      summary: "get Order by id",
      description: "Get Order by id in database",
    },
  }
);

OrderController.get(
  "/get/:id/detail",
  async ({ params: { id } }) => {
    const orderRepository = new OrderRepository();
    const order = await orderRepository.getOrderByIdWithDetail(id);
    return order ?? { error: "Order not found", status: 200 };
  },
  {
    params: t.Object({
      id: t.Number(),
    }),
    detail: {
      summary: "Get Order by Id with all detail",
      description: "Get Order by Id with all detail",
    },
  }
);

OrderController.post(
  "/create",
  async ({ body }) => {
    const orderRepository = new OrderRepository();
    const order = await orderRepository.createOrder({
      charity_id: body.charity_id,
      customer_id: body.customer_id,
      rider_id: body.rider_id,
      shop_id: body.shop_id,
      service_fee: body.service_fee,
      note: body.note,
    });
    return order;
  },
  {
    body: t.Object({
      charity_id: t.Number({
        minimum: 1,
        error: "Charity id must be a number and greater than 0",
      }),
      customer_id: t.String({
        minLength: 1,
        error: "Customer id must be a string and not empty",
      }),
      rider_id: t.Number({
        minimum: 1,
        error: "Rider id must be a number and greater than 0",
      }),
      shop_id: t.Number({
        minimum: 1,
        error: "Shop id must be a number and greater than 0",
      }),
      service_fee: t.Number({
        minimum: 1,
        error: "Service fee must be a number and greater than 0",
      }),
      note: t.String({
        minLength: 1,
        error: "Note must be a string and not empty string",
      }),
    }),
    detail: {
      summary: "Create Order",
      description: "Create Order",
    },
  }
);

export default OrderController;
