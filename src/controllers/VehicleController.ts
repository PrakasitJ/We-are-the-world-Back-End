import Elysia, { t } from "elysia";
import VehicleTypeRepository from "../repositories/VehicleRepository";

const VehicleTypeController = new Elysia({
  prefix: "/api/vehicle_type",
  tags: ["Vehicle Type"],
});

VehicleTypeController.get(
  "/getAll",
  async () => {
    const vehicleTypeRepository = new VehicleTypeRepository();
    const vehicleTypes = await vehicleTypeRepository.getAllVehicleType();
    return vehicleTypes;
  },
  {
    detail: {
      summary: "Get all Vehicle Type",
      description: "Get all Vehicle Type from database",
    },
  }
);

VehicleTypeController.get(
  "/get/:id",
  async ({ params: { id } }) => {
    const vehicleTypeRepository = new VehicleTypeRepository();
    const vehicleType = await vehicleTypeRepository.getVehicleTypeById(id);
    return vehicleType ?? { error: "Vehicle Type not found", status: 200 };
  },
  {
    params: t.Object({
      id: t.Number(),
    }),
    detail: {
      summary: "Get Vehicle Type by Id",
      description: "Get Vehicle Type by Id from database",
    },
  }
);

VehicleTypeController.post(
  "/creat",
  async ({ body: { vehicle_type, wheel, createdAt } }) => {
    const vehicleTypeRepository = new VehicleTypeRepository();
    const vehicleType = await vehicleTypeRepository.createVehicleType({
      vehicle_type,
      wheel,
      createdAt,
    });
    return vehicleType;
  },
  {
    body: t.Object({
      vehicle_type: t.String({
        pattern: "^[a-zA-Z0-9s-]*$",
        minLength: 2,
        error: {
          pattern: "Vehicle type should contain",
        },
      }),
      wheel: t.Number({
        minimum: 2,
        error: {
          minimum: "Wheel should more than 2",
        },
      }),
      createdAt: t.Date(),
    }),
    detail: {
      summary: "Create new Vehicle Type",
      description: "Create new Vehicle Type in database",
    },
  }
);

VehicleTypeController.put(
  "/update",
  async ({ body }) => {
    const vehicleTypeRepository = new VehicleTypeRepository();
    const vehicleType = await vehicleTypeRepository.updateVehicleType(
      body.id,
      body
    );
    return vehicleType;
  },
  {
    body: t.Object({
      id: t.Number(),
      vehicle_type: t.Optional(t.String()),
      wheel: t.Optional(t.Number()),
      // updatedAt: t.Date()
    }),
    detail: {
      summary: "Update Vehicle",
      description: "Update a Vehicle in the database",
    },
  }
);

export default VehicleTypeController;
