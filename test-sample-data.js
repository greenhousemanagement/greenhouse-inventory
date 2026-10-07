// Test Script: Add Sample Categories and Products
// Run after starting npm dev server

// Sample data to test the CRUD operations
const sampleCategories = [
  { name: 'Flowers', description: 'Fresh cut flowers and bouquets' },
  { name: 'Vegetables', description: 'Fresh vegetables from the greenhouse' },
  { name: 'Plants', description: 'Potted plants and indoor plants' },
  { name: 'Seeds', description: 'Flower and vegetable seeds' },
  { name: 'Soil & Supplies', description: 'Growing medium and gardening supplies' }
];

const sampleProducts = [
  {
    name: 'Rose Bouquet',
    category_id: '', // Will be set after categories added
    specification: 'Fresh cut roses, 10 stems per bunch',
    box_count: 50,
    items_per_box: 10,
    raw_rate: 150,
    seller_code: 'FLR-001',
    seller_contact: '022-23456789',
    status: 'active'
  },
  {
    name: 'Tomato Plants',
    category_id: '',
    specification: '2-month old tomato seedlings',
    box_count: 30,
    items_per_box: 5,
    raw_rate: 80,
    seller_code: 'VEG-045',
    seller_contact: '022-34567890',
    status: 'active'
  },
  {
    name: 'Orchid Potted Plant',
    category_id: '',
    specification: 'Premium orchid in ceramic pot',
    box_count: 20,
    items_per_box: 1,
    raw_rate: 500,
    seller_code: 'ORC-123',
    seller_contact: '022-45678901',
    status: 'active'
  }
];

console.log('📝 Sample data ready for testing');
console.log('Categories:', sampleCategories.length);
console.log('Products:', sampleProducts.length);
console.log('\nTo test, use the admin UI at http://localhost:3000/admin');
console.log('PIN: 8899');
console.log('\nOr use the APIs directly:');console.log('POST /api/admin/categories - Add categories');console.log('POST /api/admin/products - Add products with category_id');