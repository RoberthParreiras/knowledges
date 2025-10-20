import { Prisma, PrismaClient } from "../src/common/lib/prisma/generated";

const prisma = new PrismaClient();

const productData: Prisma.ProductCreateInput[] = [
  {
    name: "Steel Beam",
    price: 120.5,
    inventory: 100,
  },
  {
    name: "Iron Rod",
    price: 45.75,
    inventory: 250,
  },
  {
    name: "Copper Wire",
    price: 80.0,
    inventory: 150,
  },
  {
    name: "Aluminum Sheet",
    price: 60.25,
    inventory: 200,
  },
];

export async function main() {
  for (const product of productData) {
    await prisma.product.create({
      data: product,
    });
  }
}

main();
