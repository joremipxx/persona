-- IMMEDIATE FIX: Disable RLS entirely for testing
-- This will allow all operations without any authentication

ALTER TABLE personas DISABLE ROW LEVEL SECURITY;

-- Optional: If you want to keep RLS enabled but with permissive policies, 
-- uncomment the lines below instead of disabling RLS:

-- DROP POLICY IF EXISTS "Users can view own personas" ON personas;
-- DROP POLICY IF EXISTS "Users can insert own personas" ON personas;
-- DROP POLICY IF EXISTS "Users can update own personas" ON personas;
-- DROP POLICY IF EXISTS "Users can delete own personas" ON personas;

-- CREATE POLICY "Allow all operations" ON personas FOR ALL USING (true) WITH CHECK (true);
