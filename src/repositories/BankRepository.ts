import { Bank } from "@prisma/client";
import db from "./Database";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

class BankRepository {
  public async getAllBanks(): Promise<Bank[]> {
    return await db.bank.findMany();
  }

  public async getBankById(id: number): Promise<Bank | null> {
    return await db.bank.findUnique({
      where: { id: id },
    });
  }

  public async createBank({ name }: { name: string }): Promise<Bank> {
    try {
      const response = await db.bank.create({
        data: {
          bank_name: name,
        },
      });
      return response;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case "P2002":
            throw new Error("Bank Already Exists");
          default:
            throw new Error("Error Creating Bank");
        }
      }
      throw new Error("Error Creating Bank");
    }
  }
}

export default BankRepository;
