import { Rider, Vehicle_type } from "@prisma/client";
import db from "./Database";
import { error } from "elysia";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

// interface VehicleTypeWithRider extends Partial<Vehicle_type> {
//   riders: Rider[] | null;
// }

interface VehicleTypeWithMessage extends Partial<Vehicle_type> {
  message: string;
}

class VehicleTypeRepository {
  public async getVehicleTypeById(id: number): Promise<Vehicle_type | null> {
    return await db.vehicle_type.findUnique({
      where: { id: id },
    });
  }

  public async getAllVehicleType(): Promise<Vehicle_type[]> {
    return await db.vehicle_type.findMany();
  }

  public async createVehicleType({
    vehicle_type,
    wheel,
    createdAt,
  }: {
    vehicle_type: string;
    wheel: number;
    createdAt: Date;
  }): Promise<Vehicle_type> {
    try {
      const response = await db.vehicle_type.create({
        data: {
          vehicle_type: vehicle_type,
          wheel: wheel,
          createdAt: createdAt,
        },
      });
      return response;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case "P2002":
            throw new Error("This vehicle type is already exists.");
          default:
            throw new Error(error.code);
        }
      }
    }
    throw new Error("Internal Server Error");
  }

  public async updateVehicleType(
    id: number,
    updates: {
      vehicle_type?: string;
      wheel?: number;
      updatedAt?: Date;
    }
  ): Promise<Vehicle_type> {
    try {
      const response = await db.vehicle_type.update({
        where: { id },
        data: updates,
      });
      return response;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case "P2002":
            throw new Error("A bank account with this number already exists.");
          default:
            throw new Error(error.code);
        }
      }
    }
    throw new Error("Internal Server Error");
  }

  public async deleteVehicleType(
    id: number
  ): Promise<VehicleTypeWithMessage | null> {
    try {
      const response = await db.vehicle_type.delete({
        where: { id: id },
      });
      return { ...response, message: "Delete successfully" };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case "P2025":
            throw new Error("Record does not exists.");
          default:
            throw new Error(error.code);
        }
      }
    }
    throw new Error("Internal Server Error");
  }
}

export default VehicleTypeRepository;
