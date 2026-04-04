const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgres://postgres:1234@localhost:5432/odoo_pos_cafe'
});

async function seed() {
  try {
    console.log("Seeding Database...");

    // Clear existing
    await pool.query('TRUNCATE floors, tables, categories, products RESTART IDENTITY CASCADE');

    // 1. Categories
    const catRes = await pool.query(`INSERT INTO categories (name) VALUES ('Beverages'), ('Food'), ('Desserts') RETURNING id, name`);
    const catMap = {};
    catRes.rows.forEach(r => catMap[r.name] = r.id);

    // 2. Products
    const products = [
      { name: 'Espresso', price: 3.50, tax: 5.0, cat: 'Beverages' },
      { name: 'Latte', price: 4.50, tax: 5.0, cat: 'Beverages' },
      { name: 'Croissant', price: 3.00, tax: 8.0, cat: 'Food' },
      { name: 'Avocado Toast', price: 8.50, tax: 8.0, cat: 'Food' },
      { name: 'Cheesecake', price: 6.00, tax: 8.0, cat: 'Desserts' }
    ];

    for (const p of products) {
      await pool.query(
        `INSERT INTO products (category_id, name, price, tax_rate) VALUES ($1, $2, $3, $4)`,
        [catMap[p.cat], p.name, p.price, p.tax]
      );
    }

    // 3. Floors
    const floorRes = await pool.query(`INSERT INTO floors (name) VALUES ('Main Floor'), ('Patio') RETURNING id`);
    const mainFloorId = floorRes.rows[0].id;
    const patioId = floorRes.rows[1].id;

    // 4. Tables
    const tables = [
      { floor_id: mainFloorId, name: 'T1', cap: 2 },
      { floor_id: mainFloorId, name: 'T2', cap: 4 },
      { floor_id: patioId, name: 'P1', cap: 4 },
      { floor_id: patioId, name: 'P2', cap: 2 }
    ];

    for (const t of tables) {
      await pool.query(
        `INSERT INTO tables (floor_id, name, capacity) VALUES ($1, $2, $3)`,
        [t.floor_id, t.name, t.cap]
      );
    }

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error Seeding Data:", err);
    process.exit(1);
  }
}

seed();
