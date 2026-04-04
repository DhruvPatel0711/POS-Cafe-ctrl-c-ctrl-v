import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const SALT_ROUNDS = 10;

async function main() {
  console.log("🌱 Seeding database...\n");

  // ─── Clean existing data (order matters for FK constraints) ───
  await prisma.payment.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.selfOrderToken.deleteMany();
  await prisma.session.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.table.deleteMany();
  await prisma.floor.deleteMany();
  await prisma.paymentMethodConfig.deleteMany();
  await prisma.user.deleteMany();

  console.log("🗑️  Cleared existing data");

  // ─── Users ───
  const adminHash = await bcrypt.hash("Admin@123", SALT_ROUNDS);
  const cashierHash = await bcrypt.hash("Cash@123", SALT_ROUNDS);

  const admin = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@pos.com",
      passwordHash: adminHash,
      role: "ADMIN",
    },
  });

  const cashier = await prisma.user.create({
    data: {
      name: "Cashier",
      email: "cashier@pos.com",
      passwordHash: cashierHash,
      role: "CASHIER",
    },
  });

  console.log("👤 Users created: admin@pos.com, cashier@pos.com");

  // ─── Floor & Tables ───
  const groundFloor = await prisma.floor.create({
    data: {
      name: "Ground Floor",
    },
  });

  const tables = [];
  for (let i = 1; i <= 6; i++) {
    const table = await prisma.table.create({
      data: {
        floorId: groundFloor.id,
        tableNumber: `Table ${i}`,
        seats: 4,
        status: "EMPTY",
      },
    });
    tables.push(table);
  }

  console.log("🪑 Floor + 6 tables created");

  // ─── Products ───
  const productsData = [
    // Burgers
    { name: "Cheese Burger", category: "Burgers", price: 8, unit: "pcs", tax: 0.05 },
    { name: "Veg Burger", category: "Burgers", price: 7, unit: "pcs", tax: 0.05 },
    // Pizza
    { name: "Margherita", category: "Pizza", price: 12, unit: "pcs", tax: 0.05 },
    { name: "Pepperoni", category: "Pizza", price: 15, unit: "pcs", tax: 0.05 },
    // Drinks
    { name: "Coffee", category: "Drinks", price: 3, unit: "cup", tax: 0 },
    { name: "Water", category: "Drinks", price: 1, unit: "bottle", tax: 0 },
    { name: "Beer", category: "Drinks", price: 5, unit: "pint", tax: 0.10 },
    // Dessert
    { name: "Brownie", category: "Dessert", price: 4, unit: "pcs", tax: 0.05 },
    { name: "Ice Cream", category: "Dessert", price: 3, unit: "scoop", tax: 0.05 },
  ];

  const products: Record<string, { id: string; price: number }> = {};

  for (const p of productsData) {
    const product = await prisma.product.create({ data: p });
    products[product.name] = { id: product.id, price: product.price };
  }

  console.log("🍔 9 products created across 4 categories");

  // ─── Payment Method Configs ───
  await prisma.paymentMethodConfig.createMany({
    data: [
      { type: "CASH", enabled: true },
      { type: "DIGITAL", enabled: true },
      { type: "UPI", enabled: true, upiId: "cafe@ybl.com" },
    ],
  });

  console.log("💳 Payment methods configured (CASH, DIGITAL, UPI)");

  // ─── Past Session (yesterday, closed) ───
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(9, 0, 0, 0);

  const yesterdayClose = new Date(yesterday);
  yesterdayClose.setHours(22, 0, 0, 0);

  // Build order items for popular products
  const popularOrders: Array<{
    productName: string;
    count: number;
  }> = [
    { productName: "Cheese Burger", count: 15 },
    { productName: "Coffee", count: 12 },
    { productName: "Margherita", count: 8 },
  ];

  // Calculate total sales for the session
  let totalSales = 0;
  const orderDataList: Array<{
    productName: string;
    quantity: number;
    unitPrice: number;
    tableIndex: number;
    orderTime: Date;
  }> = [];

  let orderCounter = 0;

  for (const pop of popularOrders) {
    const product = products[pop.productName];
    for (let i = 0; i < pop.count; i++) {
      const quantity = 1 + Math.floor(Math.random() * 3); // 1-3 items per order
      const amount = product.price * quantity;
      totalSales += amount;

      const orderTime = new Date(yesterday);
      orderTime.setHours(9 + Math.floor(orderCounter * 0.4), Math.floor(Math.random() * 60));

      orderDataList.push({
        productName: pop.productName,
        quantity,
        unitPrice: product.price,
        tableIndex: orderCounter % 6,
        orderTime,
      });

      orderCounter++;
    }
  }

  // Create the closed session
  const pastSession = await prisma.session.create({
    data: {
      userId: cashier.id,
      openedAt: yesterday,
      closedAt: yesterdayClose,
      totalSales,
    },
  });

  console.log(`📋 Past session created (sales: $${totalSales.toFixed(2)})`);

  // Create all past orders with items and payments
  for (let i = 0; i < orderDataList.length; i++) {
    const od = orderDataList[i];
    const product = products[od.productName];
    const amount = od.unitPrice * od.quantity;

    const orderNumber = `ORD-${String(i + 1).padStart(4, "0")}`;

    const order = await prisma.order.create({
      data: {
        sessionId: pastSession.id,
        tableId: tables[od.tableIndex].id,
        status: "PAID",
        orderNumber,
        source: "CASHIER",
        createdAt: od.orderTime,
        items: {
          create: {
            productId: product.id,
            quantity: od.quantity,
            unitPrice: od.unitPrice,
            kitchenStatus: "COMPLETED",
          },
        },
        payment: {
          create: {
            method: i % 3 === 0 ? "CASH" : i % 3 === 1 ? "DIGITAL" : "UPI",
            amount,
            paidAt: od.orderTime,
          },
        },
      },
    });
  }

  console.log(`🧾 ${orderDataList.length} past orders created (all PAID)`);
  console.log("   → 15x Cheese Burger, 12x Coffee, 8x Margherita");

  console.log("\n✅ Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
