-- Temporary fix: Disable RLS to allow testing
-- ⚠️ WARNING: This disables security - only use for development/testing

ALTER TABLE personas DISABLE ROW LEVEL SECURITY;

-- Alternative: Create a more permissive policy for development
-- You can run this instead of disabling RLS entirely:

-- CREATE POLICY "Allow all operations for development" ON personas
--     FOR ALL USING (true)
--     WITH CHECK (true);
