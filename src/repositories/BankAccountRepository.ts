import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import db from "./Database";
import { Bank_account, Rider, Shop } from "@prisma/client";

interface BankAccountWithMessage extends Bank_account {
  message: string;
}

interface BankAccountWithDetail extends Partial<Bank_account> {
  shop: Partial<Shop> | null;
  rider: Partial<Rider> | null;
}

class BankAccountRepository {
  public async getBankAccountById(id: number): Promise<Bank_account | null> {
    return await db.bank_account.findUnique({
      where: { id: id },
    });
  }

  public async getBankAccountByIdWithDetail(
    id: number
  ): Promise<Partial<BankAccountWithDetail> | null> {
    return await db.bank_account.findUnique({
      where: { id: id },
      include: {
        Shop: true,
        Rider: true,
      },
    });
  }

  public async getAllBankAccount(): Promise<Bank_account[]> {
    return await db.bank_account.findMany();
  }

  public async createBankAccount({
    bank_name,
    bank_account_number,
    account_holder_name,
    createdAt,
  }: {
    bank_name: string;
    bank_account_number: string;
    account_holder_name: string;
    createdAt: Date;
  }): Promise<Bank_account> {
    try {
      const response = await db.bank_account.create({
        data: {
          bank_name: bank_name,
          bank_account_number: bank_account_number,
          account_holder_name: account_holder_name,
          createdAt: createdAt,
        },
      });
      return response;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case "P2002":
            throw new Error("A bank account with this number already exists.");
          default:
            throw new Error(error.code);
        }
      }
    }
    //Handle Unknown Error
    throw new Error("Internal Server Error");
  }

  //   public async updateHolderName({
  //     id,
  //     bank
  //     // account_holder_name,
  //     // updatedAt,
  //   }: {
  //     id: number;
  //     account_holder_name: string;
  //     updatedAt: Date;
  //     bank: Partial<Bank_account>
  //   }): Promise<Bank_account | null> {
  //     return await db.bank_account.update({
  //       where: { id: id },
  //       data: bank,
  //     });
  //   }

  //   public async deleteBankAccount(id: number): Promise<Bank_account | null> {
  //     return await db.bank_account.delete({
  //       where: { id: id },
  //     });
  //   }

  public async updateBankAccount(
    id: number,
    updates: {
      account_holder_name?: string;
      bank_name?: string;
      bank_account_number?: string;
      updatedAt: Date;
    }
  ): Promise<Bank_account> {
    try {
      const response = await db.bank_account.update({
        where: { id },
        data: updates,
      });
      return response;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case "P2002":
            throw new Error("A bank account with this number already exists.");
          default:
            throw new Error(error.code);
        }
      }
    }
    throw new Error("Internal Server Error");
  }

  public async deleteBankAccount(
    id: number
  ): Promise<BankAccountWithMessage | null> {
    try {
      const response = await db.bank_account.delete({
        where: { id: id },
      });
      return { ...response, message: "Delete successfully" };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case "P2025":
            throw new Error("Record does not exists.");
          default:
            throw new Error(error.code);
        }
      }
    }
    throw new Error("Internal Server Error");
  }
}

export default BankAccountRepository;
