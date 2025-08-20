-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create personas table
CREATE TABLE IF NOT EXISTS personas (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id UUID NOT NULL,
    persona_name TEXT NOT NULL,
    avatar_id INTEGER NOT NULL DEFAULT 1,
    age_range TEXT,
    education_level TEXT,
    professional_sector TEXT,
    organization_size TEXT,
    job_title TEXT,
    job_measured_by TEXT,
    reports_to TEXT,
    goals TEXT,
    biggest_challenges TEXT[] DEFAULT '{}',
    responsibilities TEXT,
    tools TEXT[] DEFAULT '{}',
    communication_preference TEXT,
    information_gathering TEXT,
    social_networks TEXT[] DEFAULT '{}'
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_personas_user_id ON personas(user_id);
CREATE INDEX IF NOT EXISTS idx_personas_created_at ON personas(created_at);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_personas_updated_at 
    BEFORE UPDATE ON personas 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE personas ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
-- Users can only see their own personas
CREATE POLICY "Users can view own personas" ON personas
    FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own personas
CREATE POLICY "Users can insert own personas" ON personas
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own personas
CREATE POLICY "Users can update own personas" ON personas
    FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own personas
CREATE POLICY "Users can delete own personas" ON personas
    FOR DELETE USING (auth.uid() = user_id);

-- Add comments for documentation
COMMENT ON TABLE personas IS 'Stores persona data for users';
COMMENT ON COLUMN personas.user_id IS 'Reference to the user who owns this persona';
COMMENT ON COLUMN personas.persona_name IS 'Name of the persona';
COMMENT ON COLUMN personas.avatar_id IS 'ID of the selected avatar (1-12)';
COMMENT ON COLUMN personas.age_range IS 'Age range of the persona';
COMMENT ON COLUMN personas.education_level IS 'Education level of the persona';
COMMENT ON COLUMN personas.professional_sector IS 'Professional sector/industry';
COMMENT ON COLUMN personas.organization_size IS 'Size of the organization';
COMMENT ON COLUMN personas.job_title IS 'Current job title';
COMMENT ON COLUMN personas.job_measured_by IS 'How the job performance is measured';
COMMENT ON COLUMN personas.reports_to IS 'Who the persona reports to';
COMMENT ON COLUMN personas.goals IS 'Key goals of the persona';
COMMENT ON COLUMN personas.biggest_challenges IS 'Array of biggest challenges';
COMMENT ON COLUMN personas.responsibilities IS 'Main responsibilities';
COMMENT ON COLUMN personas.tools IS 'Array of tools used';
COMMENT ON COLUMN personas.communication_preference IS 'Preferred communication method';
COMMENT ON COLUMN personas.information_gathering IS 'How the persona gathers information';
COMMENT ON COLUMN personas.social_networks IS 'Array of social networks used';
