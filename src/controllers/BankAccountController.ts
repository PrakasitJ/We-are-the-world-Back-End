import Elysia, { t } from "elysia";
import BankAccountRepository from "../repositories/BankAccountRepository";

const BankAccountController = new Elysia({
  prefix: "/api/bank_account",
  tags: ["Bank Account"],
});

BankAccountController.get(
  "/getAll",
  async () => {
    const bankAccountRepository = new BankAccountRepository();
    const bankAccount = await bankAccountRepository.getAllBankAccount();
    return bankAccount;
  },
  {
    detail: {
      summary: "Get all Bank Account",
      description: "Get all Bank Account in database",
    },
  }
);

BankAccountController.get(
  "/get/:id",
  async ({ params: { id } }) => {
    const bankAccountRepository = new BankAccountRepository();
    const bankAccount = await bankAccountRepository.getBankAccountById(id);
    return bankAccount;
  },
  {
    params: t.Object({
      id: t.Number(),
    }),
    detail: {
      summary: "Get Bank Account by Id",
      description: "Get Bank Account by Id in database",
    },
  }
);

BankAccountController.post(
  "/create",
  async ({
    body: { bank_name, bank_account_number, account_holder_name, createdAt },
  }) => {
    const bankAccountRepository = new BankAccountRepository();
    const bankAccount = await bankAccountRepository.createBankAccount({
      bank_name,
      bank_account_number,
      account_holder_name,
      createdAt,
    });
    return bankAccount;
  },
  {
    body: t.Object({
      bank_name: t.String(),
      bank_account_number: t.String(),
      account_holder_name: t.String(),
      createdAt: t.Date(),
    }),
    detail: {
      summary: "Create Bank Account",
      description: "Create a new Bank Account in database",
    },
  }
);

// BankAccountController.put(
//   "/update",
//   async ({ body }) => {
//     const bankAccountRepository = new BankAccountRepository();

//     const bankAccount = await bankAccountRepository.updateHolderName({
//       id: body.id,
//       bank: body
//     });
//     return bankAccount;
//   },
//   {
//     body: t.Object({
//       id: t.Number(),
//       account_holder_name: t.Optional(t.String()),
//       updatedAt: t.Date(),
//     }),
//     detail: {
//       summary: "Update Bank Account",
//       description: "Update a Bank Account in database",
//     },
//   }
// );

BankAccountController.put(
  "/update",
  async ({ body }) => {
    const bankAccountRepository = new BankAccountRepository();
    const bankAccount = await bankAccountRepository.updateBankAccount(
      body.id,
      body
    );
    return bankAccount;
  },
  {
    body: t.Object({
      id: t.Number(),
      account_holder_name: t.Optional(t.String()),
      bank_name: t.Optional(t.String()),
      bank_account_number: t.Optional(t.String()),
      updatedAt: t.Date(),
    }),
    detail: {
      summary: "Update Bank Account",
      description: "Update a Bank Account in the database",
    },
  }
);

export default BankAccountController;