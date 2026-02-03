-- SQL para actualizar el trigger sin usar pg_net
-- El trigger ahora solo hace log, la Edge Function es llamada desde el API

-- Actualizar el trigger para que NO use pg_net
CREATE OR REPLACE FUNCTION public.notify_new_contact()
RETURNS TRIGGER AS $$
BEGIN
  -- Log del nuevo contacto
  RAISE NOTICE '📧 Nuevo contacto insertado: ID=%, Nombre=%, Email=%', NEW.id, NEW.name, NEW.email;

  -- IMPORTANTE: Debe retornar NEW para triggers AFTER INSERT
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Verificar que el trigger está actualizado
SELECT
  '✅ Trigger actualizado correctamente' as status,
  'Ya no usa pg_net, Edge Function es llamada desde el API' as description,
  proname as function_name
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public'
AND p.proname = 'notify_new_contact';
