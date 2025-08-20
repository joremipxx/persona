// Test Supabase connection
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cpwyyrssesmermjlrmza.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwd3l5cnNzZXNtZXJtamxybXphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2NTI4NjksImV4cCI6MjA3MTIyODg2OX0.0vtxxnsmjj7AEoDFsxfKryFk9Z37sORe4rElQ8Z_0cM';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test persona insertion
async function testPersonaInsert() {
  console.log('Testing Supabase connection...');
  
  const testData = {
    user_id: '00000000-0000-0000-0000-000000000000',
    persona_name: 'Test Persona',
    avatar_id: 1,
    age_range: '25-34',
    education_level: 'Bac+5',
    professional_sector: 'IT',
    organization_size: '1-10',
    job_title: 'Developer',
    job_measured_by: 'Projects completed',
    reports_to: 'CTO',
    goals: 'Build great software',
    biggest_challenges: ['Time management'],
    responsibilities: 'Code development',
    tools: ['VS Code'],
    communication_preference: 'email',
    information_gathering: 'Google',
    social_networks: ['LinkedIn']
  };

  try {
    console.log('Attempting to insert persona...');
    const { data, error } = await supabase
      .from('personas')
      .insert(testData)
      .select()
      .single();

    if (error) {
      console.error('Supabase Error:', error);
      return null;
    }

    console.log('Success! Inserted persona:', data);
    return data;
  } catch (error) {
    console.error('JavaScript Error:', error);
    return null;
  }
}

testPersonaInsert();
