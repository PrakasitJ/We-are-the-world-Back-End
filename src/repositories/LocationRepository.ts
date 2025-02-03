import { Location } from "@prisma/client";
import db from "./Database";

class LocationRepository {
  public async getLocationById(id: number): Promise<Location | null> {
    //Make Request to Database and return Location
    return await db.location.findUnique({
      where: { id: id },
    });
  }

  public async getAllLocations(): Promise<Location[]> {
    //Make Request to Database and return all Locations
    return await db.location.findMany();
  }

  public async create({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }): Promise<Location> {
    //Make Request to Database and return User
    return await db.location.create({
      data: {
        latitude: latitude,
        longitude: longitude,
        address: address,
      },
    });
  }
}

export default LocationRepository;
