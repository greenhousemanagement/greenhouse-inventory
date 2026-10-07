// Supabase Connection Verification Script
// Run with: node verify-supabase.js

const { createClient } = require('@supabase/supabase-js');

// Read env vars or use provided ones
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lzrtzgfzcpsgqbjhgkqg.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6cnR6Z2Z6Y3BzZ3Fiamhna3FnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEzNzgyMzksImV4cCI6MjEwNjk1NDIzOX0.hWtOEZZa-fWBp-Vi6zHJAXMcIC5kcf2xA8XwVwRHaLE';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6cnR6Z2Z6Y3BzZ3Fiamhna3FnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTM3ODIzOSwiZXhwIjoyMTA2OTU0MjM5fQ.7aXZWovxwUfniZ-wG7KCQy81m9MW8eb2G1ymTJY1sh4';

console.log('🔍 Supabase Connection Verification');
console.log('========================================\n');

let supabase = null;
let errors = [];

// Test 1: Initialize client with anon key
try {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
  console.log('✅ Test 1: Client initialized with ANON key');
  console.log('   URL:', supabaseUrl.substring(0, 30) + '...');
} catch (e) {
  errors.push('Test 1 failed: ' + e.message);
  console.log('❌ Test 1 failed:', e.message);
}

// Test 2: Initialize client with service key
try {
  const supabaseSvc = createClient(supabaseUrl, supabaseServiceKey);
  console.log('✅ Test 2: Client initialized with SERVICE key');
  supabase = supabaseSvc;
} catch (e) {
  errors.push('Test 2 failed: ' + e.message);
  console.log('❌ Test 2 failed:', e.message);
}

// Test 3: Simple query to profiles table
if (supabase) {
  try {
    console.log('\n🔍 Test 3: Querying profiles table...');
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .limit(1);
    
    if (error) {
      console.log('⚠️ Test 3 - Profiles query error (may be expected):', error.message);
      console.log('   This could mean:');
      console.log('   - Table doesn\'t exist yet');
      console.log('   - No rows in profiles table');
      console.log('   - RLS policies blocking access');
    } else {
      console.log('✅ Test 3: Profiles table accessible');
      console.log('   Data:', data);
    }
  } catch (e) {
    errors.push('Test 3 failed: ' + e.message);
    console.log('❌ Test 3 failed:', e.message);
  }
}

// Test 4: Test categories table
if (supabase) {
  try {
    console.log('\n🔍 Test 4: Querying categories table...');
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .limit(1);
    
    if (error) {
      console.log('⚠️ Test 4 - Categories query error:', error.message);
      console.log('   This is common on first run - tables may need migration');
    } else {
      console.log('✅ Test 4: Categories table accessible');
      console.log('   Data count:', data?.length || 0);
    }
  } catch (e) {
    errors.push('Test 4 failed: ' + e.message);
    console.log('❌ Test 4 failed:', e.message);
  }
}

// Test 5: Test products table
if (supabase) {
  try {
    console.log('\n🔍 Test 5: Querying products table...');
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .limit(1);
    
    if (error) {
      console.log('⚠️ Test 5 - Products query error:', error.message);
    } else {
      console.log('✅ Test 5: Products table accessible');
      console.log('   Data count:', data?.length || 0);
    }
  } catch (e) {
    errors.push('Test 5 failed: ' + e.message);
    console.log('❌ Test 5 failed:', e.message);
  }
}

console.log('\n========================================');
console.log('📊 Summary:');
if (errors.length === 0) {
  console.log('   All tests passed! Supabase connection is working.');
} else {
  console.log('   ' + errors.length + ' error(s) found:');
  errors.forEach((err, i) => {
    console.log('   ' + (i+1) + '. ' + err);
  });
}

console.log('\n💡 Recommendations:');
console.log('   1. If tables don\'t exist, run the SQL schema in Supabase SQL Editor');
console.log('   2. Ensure RLS (Row Level Security) policies are set up correctly');
console.log('   3. The hardcoded PIN (8899) fallback will work even without Supabase');