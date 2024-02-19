import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://cxpinjucleoprhczpybz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4cGluanVjbGVvcHJoY3pweWJ6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwODI3NDQ5OSwiZXhwIjoyMDIzODUwNDk5fQ.J1xAKd6WDd76zhdGlhwAWpI69-WZupyG3EavuW7cHBY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;