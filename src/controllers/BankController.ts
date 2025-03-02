import Elysia, { t } from "elysia";
import BankRepository from "../repositories/BankRepository";

const BankController = new Elysia({
  prefix: "/api/bank",
  tags: ["Bank"],
});

BankController.get(
  "/getAll",
  async () => {
    return { message: "Get all bank" };
  },
  {
    detail: {
      summary: "Get all Bank",
      description: "Get all Bank in database",
    },
  }
);

BankController.get(
  "/get/:id",
  async ({ params: { id } }) => {
    return { message: "Get Bank by id", id };
  },
  {
    detail: {
      summary: "Get Bank by id",
      description: "Get Bank by id in database",
    },
  }
);

BankController.get(
  "/get/:id/detail",
  async ({ params: { id } }) => {
    return { message: "Get Bank by id with all detail", id };
  },
  {
    detail: {
      summary: "Get Bank by Id with all detail",
      description: "Get Bank by Id with all detail",
    },
  }
);

BankController.post(
  "/create",
  async ({ body: { name } }) => {
    const bankRepository = new BankRepository();
    const bank = bankRepository.createBank({ name });
    return bank;
  },
  {
    body: t.Object({ name: t.String() }),
    detail: {
      summary: "Create Bank",
      description: "Create Bank in database",
    },
  }
);

export default BankController;
