import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

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

// Initialize Resend client
const resendApiKey = process.env.RESEND_API_KEY || '';
const resend = resendApiKey ? new Resend(resendApiKey) : null;

if (!resend) {
  console.warn('[Contact API] Resend API key not configured');
}

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

    // Send email notification using Resend
    const recipientEmail = 'gerente@staminaintl.com';

    if (resend) {
      console.log('[Contact API] Sending email via Resend to:', recipientEmail);

      try {
        const emailResult = await resend.emails.send({
          from: 'STAMINA PENGJU <onboarding@resend.dev>',
          to: [recipientEmail],
          subject: `Nuevo contacto de STAMINA PENGJU: ${name}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 20px; color: white; text-align: center; }
                .content { padding: 30px; background: #f9f9f9; }
                .field { margin-bottom: 15px; }
                .field strong { color: #1a1a2e; }
                .message { background: white; padding: 15px; border-left: 4px solid #1a1a2e; margin: 20px 0; }
                .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>STAMINA PENGJU</h1>
                  <p>Your Strategic Bridge Between Asia and Americas</p>
                </div>
                <div class="content">
                  <h2>📋 Nuevo Contacto Recibido</h2>
                  <div class="field">
                    <strong>Nombre:</strong> ${name}
                  </div>
                  ${company ? `<div class="field"><strong>Empresa:</strong> ${company}</div>` : ''}
                  <div class="field">
                    <strong>Email:</strong> <a href="mailto:${email}">${email}</a>
                  </div>
                  ${country ? `<div class="field"><strong>País:</strong> ${country}</div>` : ''}
                  <div class="field">
                    <strong>Fecha:</strong> ${new Date().toLocaleString('es-ES', { timeZone: 'America/Panama' })}
                  </div>
                  <div class="message">
                    <strong>Mensaje:</strong><br>
                    ${message.replace(/\n/g, '<br>')}
                  </div>
                </div>
                <div class="footer">
                  <p>📧 Contact ID: ${contactId}</p>
                  <p>Este es un mensaje automático del sitio web staminaintl.com</p>
                </div>
              </div>
            </body>
            </html>
          `,
          text: `
            Nuevo Contacto Recibido
            
            Nombre: ${name}
            ${company ? `Empresa: ${company}` : ''}
            Email: ${email}
            ${country ? `País: ${country}` : ''}
            Fecha: ${new Date().toLocaleString('es-ES', { timeZone: 'America/Panama' })}
            
            Mensaje:
            ${message}
            
            ---
            Contact ID: ${contactId}
            Este es un mensaje automático del sitio web staminaintl.com
          `,
        });

        console.log('[Contact API] Email sent successfully via Resend:', emailResult);
      } catch (emailError) {
        console.error('[Contact API] Failed to send email via Resend:', emailError);
        // Don't fail request, just log error
      }
    } else {
      console.warn('[Contact API] Resend client not available, skipping email');
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Mensaje enviado correctamente. Se ha enviado una notificación por correo a gerente@staminaintl.com',
        contact_id: contactId,
        email_notification: resend ? 'enviado' : 'no configurado'
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
