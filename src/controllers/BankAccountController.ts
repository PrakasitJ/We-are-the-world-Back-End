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
    return bankAccount ?? { error: "Bank account not found", status: 200 };
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
      bank_name: t.String({
        pattern: "^[a-zA-Zก-๛]*$",
        minLength: 5,
        maxLength: 20,
        error: {
          pattern: "Bank name should contain only characters",
          minLength: "Bank name should be 5-20 characters",
          maxLength: "Bank name should be 5-20 characters",
        },
      }),
      bank_account_number: t.String({
        pattern: "[0-9]*",
        maxLength: 10,
        minLength: 10,
        error: {
          minLength: "Bank account number must be 10 number",
          maxLength: "Bank account number must be 10 number",
          pattern:
            "Bank account number should contain only numbers and must be 10 digits",
        },
        description: "Bank account must be number with 10 characters long",
      }),
      account_holder_name: t.String({
        pattern: "^[a-zA-Z ]*$",
        minLength: 4,
        maxLength: 50,
        error: {
          pattern: "Names should contain only letters",
        },
      }),
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
      bank_name: t.Optional(
        t.String({
          pattern: "^[a-zA-Zก-๛]*$",
          minLength: 5,
          maxLength: 20,
          error: {
            pattern: "Bank name should contain only characters",
            minLength: "Bank name should be 5-20 characters",
            maxLength: "Bank name should be 5-20 characters",
          },
        })
      ),
      bank_account_number: t.Optional(
        t.String({
          pattern: "[0-9]*",
          maxLength: 10,
          minLength: 10,
          error: {
            minLength: "Bank account number must be 10 number",
            maxLength: "Bank account number must be 10 number",
            pattern:
              "Bank account number should contain only numbers and must be 10 digits",
          },
          description: "Bank account must be number with 10 characters long",
        })
      ),
      account_holder_name: t.Optional(
        t.String({
          pattern: "^[a-zA-Z ]*$",
          minLength: 4,
          maxLength: 50,
          error: {
            pattern: "Names should contain only letters",
          },
        })
      ),
      updatedAt: t.Date(),
    }),
    detail: {
      summary: "Update Bank Account",
      description: "Update a Bank Account in the database",
    },
  }
);

BankAccountController.delete(
  "/delete",
  async ({ body }) => {
    const bankAccountRepository = new BankAccountRepository();
    return bankAccountRepository.deleteBankAccount(body.id);
  },
  {
    body: t.Object({
      id: t.Number(),
    }),
    detail: {
      summary: "Delete Bank Account",
      description: "Delete Bank Account by Id",
    },
  }
);

export default BankAccountController;
