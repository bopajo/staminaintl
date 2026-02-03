-- FIX: Update the trigger function to return NEW
-- This fixes the "control reached end of trigger procedure without RETURN" error

-- Update the trigger function to return NEW
CREATE OR REPLACE FUNCTION public.notify_new_contact()
RETURNS TRIGGER AS $$
BEGIN
  -- Log that a new contact was inserted
  RAISE NOTICE 'New contact inserted: ID=%, Name=%, Email=%', NEW.id, NEW.name, NEW.email;

  -- IMPORTANT: Must return NEW for AFTER INSERT triggers
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Verify the function was created
SELECT
  p.proname as function_name,
  pg_get_functiondef(p.oid) as definition
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public'
AND p.proname = 'notify_new_contact';
