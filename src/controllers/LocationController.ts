import {Elysia, t} from "elysia";
import LocationRepository from "../repositories/LocationRepository";

const LocationController = new Elysia({
    prefix: "/api/location",
    tags: ["Location"],
});

LocationController.model({
    Location: t.Object({
        id: t.Integer(),
        latitude: t.Number(),
        longitude: t.Number(),
        address: t.String(),
        createdAt: t.Date(),
        updatedAt: t.Date(),
    }),
});

LocationController.get(
    "/:id",
    async ({params: {id}}) => {
        const locationRepository = new LocationRepository();
        const location = await locationRepository.getLocationById(id);
        return location ?? {error: "Location not found", status: 200};
    },
    {
        params: t.Object({id: t.Number()}),
        detail: {
            summary: "Get Location By Id",
            description: "Get location by id from database",
        },
    }
);

LocationController.get(
    "/all",
    async () => {
        const locationRepository = new LocationRepository();
        const locations = await locationRepository.getAllLocations();
        return locations;
    },
    {
        detail: {
            summary: "Get All Location",
            description: "Get all location from database",
        },
    }
);

LocationController.post(
    "/create",
    async ({body: {latitude, longitude, address}}) => {
        const locationRepository = new LocationRepository();
        const location = await locationRepository.create({latitude, longitude, address});
        return location;
    },
    {
        body: t.Object({
            latitude: t.Number(),
            longitude: t.Number(),
            address: t.String(),
        }),
        detail: {
            summary: "Create Location",
            description: "Create a new location in the database",
        },
    }
);



export default LocationController;