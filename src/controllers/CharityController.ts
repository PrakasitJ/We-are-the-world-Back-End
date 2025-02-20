import { Elysia, t } from "elysia";
import CharityRepository from "../repositories/CharityRepository";

const CharityController = new Elysia({
  prefix: "/api/charity",
  tags: ["Charity"],
});

CharityController.get(
  "/getAll",
  async () => {
    const charityRepository = new CharityRepository();
    const charitys = await charityRepository.getAllCharity();
    return charitys;
  },
  {
    detail: {
      summary: "Get all Charity",
      description: "Get all Charity in database",
      responses: {
        200: {
          description: "Success",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "number" },
                    user_id: { type: "string" },
                    name: { type: "string" },
                    description: { type: "string" },
                    open_time: { type: "string" },
                    close_time: { type: "string" },
                    createdAt: { type: "string" },
                    updatedAt: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    },
  }
);

CharityController.get(
  "/get/:id",
  async ({ params: { id } }) => {
    const charityRepository = new CharityRepository();
    const charity = await charityRepository.getCharityById(id);
    return charity;
  },
  {
    params: t.Object({
      id: t.Number(),
    }),
    detail: {
      summary: "Get Charity by id",
      description: "Get Charity by id in database",
      responses: {
        200: {
          description: "Success",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: { type: "number" },
                  user_id: { type: "string" },
                  name: { type: "string" },
                  description: { type: "string" },
                  open_time: { type: "string" },
                  close_time: { type: "string" },
                  createdAt: { type: "string" },
                  updatedAt: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
  }
);

CharityController.get(
  "/get/:id/detail",
  async ({ params: { id } }) => {
    const charityRepository = new CharityRepository();
    const charity = await charityRepository.getCharityWithDetail(id);
    return charity;
  },
  {
    params: t.Object({
      id: t.Number(),
    }),
    detail: {
        summary: "Get Charity by id with all detail",
        description: "Get Charity by id in database with all detail",
    }
  }
);

CharityController.post(
  "/create",
  async ({ body }) => {
    const charityRepository = new CharityRepository();
    const charity = await charityRepository.create(body);
    return charity;
  },
  {
    body: t.Object({
      user_id: t.String(),
      name: t.String(),
      description: t.String(),
      open_time: t.Date(),
      close_time: t.Date(),
    }),
    detail: {
      summary: "Create Charity",
      description: "Create a new Charity in database",
      responses: {
        200: {
          description: "Success",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: { type: "number" },
                  user_id: { type: "string" },
                  name: { type: "string" },
                  description: { type: "string" },
                  open_time: { type: "string" },
                  close_time: { type: "string" },
                  createdAt: { type: "string" },
                  updatedAt: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
  }
);

CharityController.post(
  "/addImage",
  async ({ body }) => {
    const charityRepository = new CharityRepository();
    const charity = await charityRepository.addCharityImage(body);
    return charity;
  },
  {
    body: t.Object({
      charity_id: t.Number(),
      image_url: t.String(),
    }),
    detail: {
      summary: "Add Charity Image",
      description: "Add a new Image for Charity in database",
    },
  }
);

CharityController.put(
  "/update",
  async ({ body }) => {
    const charityRepository = new CharityRepository();
    const charity = await charityRepository.updateCharity(body);
    return charity;
  },
  {
    body: t.Object({
      id: t.Number(),
      charity: t.Object({
        user_id: t.String(),
        name: t.String(),
        description: t.String(),
        open_time: t.Date(),
        close_time: t.Date(),
      }),
    }),
    detail: {
      summary: "Update Charity",
      description: "Update Charity in database",
    },
  }
);

CharityController.delete(
  "/delete",
  async ({ body: { charity_id } }) => {
    const charityRepository = new CharityRepository();
    const charity = await charityRepository.deleteCharity(charity_id);
    return charity;
  },
  {
    body: t.Object({
      charity_id: t.Number(),
    }),
    detail: {
      summary: "Delete Charity",
      description: "Detate Shop by Id",
    },
  }
);

export default CharityController;
