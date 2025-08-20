-- Development-friendly Supabase policies
-- This allows the app to work without authentication for demo purposes

-- First, drop existing restrictive policies
DROP POLICY IF EXISTS "Users can view own personas" ON personas;
DROP POLICY IF EXISTS "Users can insert own personas" ON personas;
DROP POLICY IF EXISTS "Users can update own personas" ON personas;
DROP POLICY IF EXISTS "Users can delete own personas" ON personas;

-- Create permissive policies for development
-- ⚠️ WARNING: These policies are for development only - they allow all operations

CREATE POLICY "Allow all read operations" ON personas
    FOR SELECT USING (true);

CREATE POLICY "Allow all insert operations" ON personas
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow all update operations" ON personas
    FOR UPDATE USING (true);

CREATE POLICY "Allow all delete operations" ON personas
    FOR DELETE USING (true);

-- Comment to explain this is for development
COMMENT ON TABLE personas IS 'Personas table with development-friendly RLS policies - ⚠️ NOT for production use';
