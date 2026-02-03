-- Enable UUID extension (required for gen_random_uuid())
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable pg_net for HTTP requests (needed to call Edge Functions)
CREATE EXTENSION IF NOT EXISTS "pg_net";

-- Create contacts table (if not exists)
CREATE TABLE IF NOT EXISTS public.contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  country TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_contacts_email ON public.contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON public.contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON public.contacts(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies to allow public inserts
DROP POLICY IF EXISTS "Enable insert for all users" ON public.contacts;
CREATE POLICY "Enable insert for all users"
ON public.contacts
FOR INSERT
WITH CHECK (true);

DROP POLICY IF EXISTS "Enable read for all users" ON public.contacts;
CREATE POLICY "Enable read for all users"
ON public.contacts
FOR SELECT
USING (true);

-- Create function to trigger email notification
CREATE OR REPLACE FUNCTION public.notify_new_contact()
RETURNS TRIGGER AS $$
DECLARE
  edge_function_url TEXT := 'https://fsdobcctowexkvzrsrma.supabase.co/functions/v1/notify-email-function';
  service_role_key TEXT := 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzZG9iY2N0b3dleGt2enJzcm1hIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNzI3ODA0NywiZXhwIjoyMDUyODU0MDQ3fQ.KJ5c4vN9BtqQ-8aT7z3V2s9W4x6X7P0r8T4v5X6P8r8';
BEGIN
  -- Asynchronous HTTP request to Edge Function
  PERFORM net.http_post(
    edge_function_url,
    json_build_object(
      'name', NEW.name,
      'company', NEW.company,
      'email', NEW.email,
      'country', NEW.country,
      'message', NEW.message,
      'contact_id', NEW.id
    ),
    json_build_object(
      'Authorization', 'Bearer ' || service_role_key,
      'Content-Type', 'application/json'
    )
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if exists
DROP TRIGGER IF EXISTS send_email_notification ON public.contacts;

-- Create trigger on contacts table
CREATE TRIGGER send_email_notification
AFTER INSERT ON public.contacts
FOR EACH ROW
EXECUTE FUNCTION public.notify_new_contact();
