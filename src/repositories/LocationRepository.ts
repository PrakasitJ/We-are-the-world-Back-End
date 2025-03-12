import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import db from "./Database";

class LocationRepository {
  public async create({
    user_id,
    latitude,
    longitude,
    address,
  }: {
    user_id: string;
    latitude: number;
    longitude: number;
    address?: string;
  }) {
    try {
      const response = await db.user_location.create({
        data: {
          user_id: user_id,
          latitude: latitude,
          longitude: longitude,
          address: address,
        },
      });
      return response;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case "P2002":
            throw new Error("User id already exists");
          case "P2023":
            throw new Error("User id must be uid");
          default:
            throw new Error(error.code);
        }
      }
      throw new Error("Internal Server Error");
    }
  }

  public async getAllLocations() {
    return await db.user_location.findMany();
  }

  public async getLocationById(id: number) {
    return await db.user_location.findUnique({
      where: { id: id },
    });
  }

  public async getLocationByUserId(user_id: string) {
    return await db.user_location.findFirst({
      where: { user_id: user_id },
    });
  }
}

export default LocationRepository;
