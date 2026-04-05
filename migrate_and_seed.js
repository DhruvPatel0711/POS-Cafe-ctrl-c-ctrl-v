const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Use same DATABASE_URL as the app
require('dotenv').config({ path: path.join(__dirname, '.env') });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function migrate() {
  console.log('🔄 Running schema migration...');
  const schema = fs.readFileSync(path.join(__dirname, '..', 'schema.sql'), 'utf8');
  await pool.query(schema);
  console.log('✅ Schema applied successfully');
}

async function seed() {
  console.log('🌱 Seeding database...');

  // Check if data already exists
  const existing = await pool.query('SELECT COUNT(*) FROM categories');
  if (parseInt(existing.rows[0].count) > 0) {
    console.log('⚠️  Data already exists. Clearing and re-seeding...');
    await pool.query(`
      TRUNCATE ticket_items, kitchen_tickets, payment_transactions, 
               order_items, orders, sessions, payment_methods,
               tables, floors, products, categories, users
      RESTART IDENTITY CASCADE
    `);
  }

  // ── 1. Users ──────────────────────────────────────────────
  const bcrypt = require('bcrypt');
  const adminHash = await bcrypt.hash('admin123', 10);
  const cashierHash = await bcrypt.hash('cashier123', 10);
  const kitchenHash = await bcrypt.hash('kitchen123', 10);

  await pool.query(`
    INSERT INTO users (name, email, password_hash, role) VALUES
    ('Admin User', 'admin@cafe.com', $1, 'admin'),
    ('Riya Sharma', 'riya@cafe.com', $2, 'cashier'),
    ('Arjun Kumar', 'arjun@cafe.com', $2, 'cashier'),
    ('Priya Mehta', 'priya@cafe.com', $2, 'cashier'),
    ('Karan Patel', 'karan@cafe.com', $2, 'cashier'),
    ('Rahul Singh', 'kitchen@cafe.com', $3, 'kitchen'),
    ('Meena Rao', 'meena@cafe.com', $3, 'kitchen')
  `, [adminHash, cashierHash, kitchenHash]);
  console.log('  ✓ Users seeded');

  // ── 2. Categories ─────────────────────────────────────────
  const catRes = await pool.query(`
    INSERT INTO categories (name) VALUES
    ('Breakfast'), ('Main Course'), ('Beverages'), ('Desserts'), ('Snacks')
    RETURNING id, name
  `);
  const catMap = {};
  catRes.rows.forEach(r => catMap[r.name] = r.id);
  console.log('  ✓ Categories seeded');

  // ── 3. Products ───────────────────────────────────────────
  await pool.query(`
    INSERT INTO products (category_id, name, price, tax_rate, stock_status, sold, rating) VALUES
    ($1, 'Masala Dosa',          120, 5,  'available', 284, 4.8),
    ($1, 'Idli Sambar (2 pcs)',  80,  5,  'available', 312, 4.7),
    ($1, 'Vada',                 60,  5,  'available', 198, 4.5),
    ($2, 'Paneer Butter Masala', 280, 12, 'available', 176, 4.9),
    ($2, 'Butter Naan',          50,  5,  'available', 402, 4.6),
    ($2, 'Veg Biryani',          220, 12, 'low',       144, 4.8),
    ($2, 'Dal Makhani',          200, 12, 'available', 132, 4.7),
    ($3, 'Filter Coffee',        60,  5,  'available', 521, 4.9),
    ($3, 'Masala Chai',           40,  5,  'available', 389, 4.8),
    ($3, 'Mango Lassi',          100, 5,  'available', 203, 4.7),
    ($3, 'Fresh Lime Soda',      80,  5,  'available', 167, 4.5),
    ($4, 'Gulab Jamun',           80,  5,  'available', 148, 4.9),
    ($4, 'Rasgulla',              70,  5,  'out',        96, 4.6),
    ($5, 'Samosa (2 pcs)',        60,  5,  'available', 231, 4.5),
    ($5, 'Pav Bhaji',            140, 5,  'low',       189, 4.8)
  `, [catMap['Breakfast'], catMap['Main Course'], catMap['Beverages'], catMap['Desserts'], catMap['Snacks']]);
  console.log('  ✓ Products seeded');

  // ── 4. Floors ─────────────────────────────────────────────
  const floorRes = await pool.query(`
    INSERT INTO floors (name) VALUES ('Ground Floor'), ('First Floor')
    RETURNING id, name
  `);
  const gfId = floorRes.rows[0].id;
  const ffId = floorRes.rows[1].id;
  console.log('  ✓ Floors seeded');

  // ── 5. Tables ─────────────────────────────────────────────
  await pool.query(`
    INSERT INTO tables (floor_id, name, capacity, status) VALUES
    ($1, 'T1',  2, 'available'),
    ($1, 'T2',  4, 'available'),
    ($1, 'T3',  4, 'available'),
    ($1, 'T4',  6, 'available'),
    ($1, 'T5',  4, 'available'),
    ($1, 'T6',  2, 'available'),
    ($1, 'T7',  8, 'available'),
    ($1, 'T8',  4, 'available'),
    ($1, 'T9',  4, 'available'),
    ($1, 'T10', 2, 'available'),
    ($2, 'T11', 4, 'available'),
    ($2, 'T12', 6, 'available'),
    ($2, 'T13', 10,'available'),
    ($2, 'T14', 2, 'available'),
    ($2, 'T15', 4, 'available')
  `, [gfId, ffId]);
  console.log('  ✓ Tables seeded');

  // ── 6. Payment Methods ────────────────────────────────────
  await pool.query(`
    INSERT INTO payment_methods (name, type, is_active, upi_id, merchant_name) VALUES
    ('Cash',         'cash',  true, NULL,           NULL),
    ('Card Terminal', 'card',  true, NULL,           NULL),
    ('UPI Quick Pay', 'upi',   true, 'gaurav.patel.1008.2006@okicici', 'Gaurav Patel')
  `);
  console.log('  ✓ Payment methods seeded');

  // ── 7. Generate 100 Synthetic Products ──────────────────────
  console.log('  ... generating 100 synthetic products');
  const adjectives = ['Spicy', 'Sweet', 'Tangy', 'Crunchy', 'Smoky', 'Fresh', 'Classic', 'Royal'];
  const nouns = ['Special', 'Delight', 'Bowl', 'Platter', 'Wraps', 'Bites', 'Fusion', 'Treat'];
  const allCatIds = Object.values(catMap);
  let prodValues = [];
  let prodParams = [];
  for (let i = 0; i < 100; i++) {
    const name = `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]} ${i+1}`;
    const price = Math.floor(Math.random() * 400) + 50;
    const catId = allCatIds[Math.floor(Math.random() * allCatIds.length)];
    const sold = Math.floor(Math.random() * 500);
    const rating = (Math.random() * 2 + 3).toFixed(1); // 3.0 to 5.0
    
    const offset = i * 5;
    prodValues.push(`($${offset+1}, $${offset+2}, $${offset+3}, 5, 'available', $${offset+4}, $${offset+5})`);
    prodParams.push(catId, name, price, sold, rating);
  }
  await pool.query(`
    INSERT INTO products (category_id, name, price, tax_rate, stock_status, sold, rating) 
    VALUES ${prodValues.join(',')}
  `, prodParams);
  console.log('  ✓ 100 Synthetic Products seeded');

  // ── 8. Generate 100 Synthetic Orders & Payments ────────────
  console.log('  ... generating 100 synthetic orders & past transactions');
  
  // Get newly inserted product references
  const allProdsRes = await pool.query('SELECT id, name, price, tax_rate FROM products');
  const allProds = allProdsRes.rows;

  let orderCount = 0;
  for (let i = 0; i < 100; i++) {
    const tableId = Math.floor(Math.random() * 15) + 1; // From T1 to T15
    const numItems = Math.floor(Math.random() * 4) + 1;
    
    let subtotal = 0;
    let taxTotal = 0;
    let items = [];
    
    for (let j = 0; j < numItems; j++) {
      const prod = allProds[Math.floor(Math.random() * allProds.length)];
      const qty = Math.floor(Math.random() * 3) + 1;
      const lineTotal = prod.price * qty;
      const lineTax = lineTotal * (prod.tax_rate / 100);
      subtotal += lineTotal;
      taxTotal += lineTax;
      items.push({ prodId: prod.id, name: prod.name, qty, price: prod.price, tax: prod.tax_rate });
    }
    
    const grandTotal = Math.round(subtotal + taxTotal);
    
    // Create random past date within last 30 days
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - Math.floor(Math.random() * 30));
    pastDate.setHours(Math.floor(Math.random() * 10) + 10); // 10 AM to 8 PM
    
    const orderNum = `#ORD-MOCK-${String(1000 + i).padStart(4, '0')}`;
    
    // Insert order
    const oRes = await pool.query(`
      INSERT INTO orders (table_id, order_number, subtotal, tax_total, grand_total, status, payment_status, created_at)
      VALUES ($1, $2, $3, $4, $5, 'paid', 'paid', $6) RETURNING id
    `, [tableId, orderNum, subtotal, taxTotal, grandTotal, pastDate.toISOString()]);
    
    const newOrderId = oRes.rows[0].id;
    
    // Insert order items
    for (const item of items) {
       await pool.query(`
         INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, tax_rate)
         VALUES ($1, $2, $3, $4, $5, $6)
       `, [newOrderId, item.prodId, item.name, item.qty, item.price, item.tax]);
    }
    
    // Insert Payment Transaction
    const methods = ['Cash', 'UPI Quick Pay', 'Card Terminal'];
    const pMethod = methods[Math.floor(Math.random() * methods.length)];
    
    await pool.query(`
      INSERT INTO payment_transactions (order_id, method, amount, status, cashier_name, created_at)
      VALUES ($1, $2, $3, 'success', 'System Gen', $4)
    `, [newOrderId, pMethod, grandTotal, pastDate.toISOString()]);
    
    orderCount++;
  }
  console.log(`  ✓ ${orderCount} Synthetic Orders & Payments seeded`);

  console.log('\n🎉 Database heavily seeded successfully!');
}

async function run() {
  try {
    await migrate();
    await seed();
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

run();
