import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with environment variables
// In development: uses .env.local file
// In production: uses Vercel environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.warn('[Contact API] Supabase environment variables not configured');
}

const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export async function POST(request: NextRequest) {
  console.log('[Contact API] Request received at:', new Date().toISOString());
  
  try {
    const body = await request.json();
    const { name, company, email, country, message } = body;

    console.log('[Contact API] Form data received:', { name, company, email, country, hasMessage: !!message });

    // Validate required fields
    if (!name || !email || !message) {
      console.log('[Contact API] Validation failed: missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if Supabase is configured
    if (!supabase) {
      console.log('[Contact API] Supabase not initialized, returning 503');
      return NextResponse.json(
        {
          error: 'Database not configured',
          message: 'Por favor configura las variables de entorno de Supabase en Vercel',
          documentation: 'https://supabase.com/docs/guides/platform/nextjs',
          config: {
            hasUrl: !!supabaseUrl,
            hasKey: !!supabaseKey,
            isConfigured: !!(supabaseUrl && supabaseKey)
          }
        },
        { status: 503 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('[Contact API] Validation failed: invalid email format', email);
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    console.log('[Contact API] Validation passed, attempting Supabase insert...');

    // Insert contact form submission into Supabase
    const { data, error } = await supabase
      .from('contacts')
      .insert([
        {
          name: name.trim(),
          company: company?.trim() || null,
          email: email.trim(),
          country: country?.trim() || null,
          message: message.trim(),
          status: 'new'
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('[Contact API] Supabase insertion error:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      });
      return NextResponse.json(
        {
          error: 'Failed to save contact submission',
          details: error.message,
        },
        { status: 500 }
      );
    }

    const contactId = data?.id;
    console.log('[Contact API] Contact saved successfully:', {
      id: contactId,
      name,
      company,
      email,
      country,
      message,
      timestamp: new Date().toISOString()
    });

    // Call Edge Function to send email notification
    const edgeFunctionUrl = `${supabaseUrl}/functions/v1/notify-email-function`;
    const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzZG9iY2N0b3dleGt2enJzcm1hIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNzI3ODA0NywiZXhwIjoyMDUyODU0MDQ3fQ.KJ5c4vN9BtqQ-8aT7z3V2s9W4x6X7P0r8T4v5X6P8r8';

    console.log('[Contact API] Calling Edge Function to send email...');

    try {
      const emailResponse = await fetch(edgeFunctionUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${serviceRoleKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contact_id: contactId,
          name: name.trim(),
          company: company?.trim() || null,
          email: email.trim(),
          country: country?.trim() || null,
          message: message.trim()
        }),
      });

      const emailResult = await emailResponse.json();
      console.log('[Contact API] Edge Function response:', { status: emailResponse.status, result: emailResult });
    } catch (emailError) {
      console.error('[Contact API] Failed to call Edge Function:', emailError);
      // Don't fail the request, just log the error
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Mensaje enviado correctamente. Se ha enviado una notificación por correo a gerente@staminaintl.com',
        contact_id: contactId,
        email_notification: 'enviado'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Contact API] Unhandled error:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error.message || 'An unexpected error occurred'
      },
      { status: 500 }
    );
  }
}
