import { Elysia, t } from "elysia";
import CharityRepository from "../repositories/CharityRepository";

const CharityController = new Elysia({
  prefix: "/api/charity",
  tags: ["Charity"],
});

CharityController.get("/getAll", async () => {
  const charityRepository = new CharityRepository();
  const charitys = await charityRepository.getAllCharity();
  return charitys;
});

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
  }
);

CharityController.delete(
  "/delete/:id",
  async ({ params: { id } }) => {
    const charityRepository = new CharityRepository();
    const charity = await charityRepository.deleteCharity(id);
    return charity;
  },
  {
    params: t.Object({
      id: t.Number(),
    }),
  }
);

export default CharityController;
