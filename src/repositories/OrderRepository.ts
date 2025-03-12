import { Order } from "@prisma/client";
import db from "./Database";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

class OrderRepository {
  public async getAllOrders(): Promise<Order[]> {
    return await db.order.findMany();
  }

  public async getOrderById(id: number): Promise<Order | null> {
    return await db.order.findUnique({
      where: { id: id },
    });
  }

  public async getOrderByIdWithDetail(id: number): Promise<Order | null> {
    return await db.order.findUnique({
      where: { id: id },
      include: {
        charity: true,
        customer: true,
        rider: true,
        shop: true,
        Product_list: true,
        Transaction: true,
        Report: true,
      },
    });
  }

  public async createOrder({
    charity_id,
    customer_id,
    rider_id,
    shop_id,
    service_fee,
    pickup_location_id,
    note,
  }: {
    charity_id?: number;
    customer_id: string;
    rider_id: number;
    shop_id: number;
    service_fee: number;
    pickup_location_id: number;
    note: string;
  }): Promise<Order> {
    try {
      const response = await db.order.create({
        data: {
          charity_id: charity_id,
          customer_id: customer_id,
          rider_id: rider_id,
          shop_id: shop_id,
          service_fee: service_fee,
          finish_job_image_url: "",
          pickup_location_id: pickup_location_id,
          note: note,
        },
      });
      return response;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case "P2002":
            throw new Error("Invalid foreign key");
          case "P2023":
            throw new Error("Invalid input");
          default:
            throw new Error(error.code);
        }
      }
      throw new Error("Internal Server Error");
    }
  }
  
}

export default OrderRepository;
