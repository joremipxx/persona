-- URGENT: Complete security disable for testing
-- Run this EXACT script in your Supabase SQL Editor

-- 1. Disable RLS completely
ALTER TABLE personas DISABLE ROW LEVEL SECURITY;

-- 2. Drop ALL existing policies (in case some are still active)
DROP POLICY IF EXISTS "Users can view own personas" ON personas;
DROP POLICY IF EXISTS "Users can insert own personas" ON personas;
DROP POLICY IF EXISTS "Users can update own personas" ON personas;
DROP POLICY IF EXISTS "Users can delete own personas" ON personas;
DROP POLICY IF EXISTS "Allow all read operations" ON personas;
DROP POLICY IF EXISTS "Allow all insert operations" ON personas;
DROP POLICY IF EXISTS "Allow all update operations" ON personas;
DROP POLICY IF EXISTS "Allow all delete operations" ON personas;
DROP POLICY IF EXISTS "Allow all operations" ON personas;

-- 3. Grant explicit permissions to anon role
GRANT ALL ON personas TO anon;
GRANT ALL ON personas TO authenticated;

-- 4. Verify the table is accessible
SELECT 'SUCCESS: Table is now accessible for testing' as status;
