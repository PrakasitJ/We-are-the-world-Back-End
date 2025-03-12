import Elysia, { t } from "elysia";
import LocationRepository from "../repositories/LocationRepository";

const LocationController = new Elysia({
    prefix: "api/location",
    tags: ["Location"],
})

LocationController.get(
    "/getAll",
    async () => {
        const locationRepository = new LocationRepository();
        const location = await locationRepository.getAllLocations();
        return location;
    },
    {
        detail: {
            summary: "Get all Location",
            description: "Get all Location in database",
        },
    }
);

LocationController.get(
    "/get/:id",
    async ({ params: { id } }) => {
        const locationRepository = new LocationRepository();
        const location = await locationRepository.getLocationById(id);
        return location ?? { error: "Location not found", status: 200 };
    },
    {
        params: t.Object({
            id: t.Number(),
        }),
        detail: {
            summary: "Get Location by id",
            description: "Get Location by id in database",
        },
    }
);

LocationController.post(
    "/create",
    async ({ body }) => {
        const locationRepository = new LocationRepository();
        const location = await locationRepository.create(body);
        return location;
    },
    {
        body: t.Object({
            user_id: t.String(),
            address: t.Optional(t.String()),
            latitude: t.Number(),
            longitude: t.Number(),
        }),
        detail: {
            summary: "Create Location",
            description: "Create Location in database",
        },
    }
);

export default LocationController;