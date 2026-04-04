import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET() {
  try {
    const { rows } = await pool.query(`
      SELECT p.id, p.name, p.price, p.tax_rate, p.stock_status, c.name as category
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY c.id, p.id
    `);

    // Map database snake_case to frontend camelCase expectations
    const products = rows.map(r => ({
      id: r.id,
      name: r.name,
      price: Number(r.price),
      tax: Number(r.tax_rate),
      category: r.category,
      color: 'bg-emerald-50 text-emerald-700', // Default colors for now
      accent: 'border-emerald-200'
    }));

    return NextResponse.json(products);
  } catch (err) {
    console.error("Failed to fetch products:", err);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
