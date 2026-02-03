// Supabase Edge Function to send email notifications
import { serve } from 'https://deno.land/std/http/server.ts';

// Handler for email notifications
serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { contact_id, name, company, email, country, message } = await req.json();

    console.log('Email notification request:', {
      contact_id,
      sender_name: name,
      sender_email: email,
      company,
      country
    });

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Get Supabase configuration
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || 'https://fsdobcctowexkvzrsrma.supabase.co';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

    console.log('Sending email to: gerente@staminaintl.com');

    // Use Supabase native send_email function via REST API
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/send_email`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
      },
      body: JSON.stringify({
        to: 'gerente@staminaintl.com',
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
                <p>Your Strategic Bridge Between Asia and the Americas</p>
              </div>
              <div class="content">
                <h2>Nuevo Contacto Recibido</h2>
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
                <p>Contact ID: ${contact_id}</p>
                <p>Este es un mensaje automático del sitio web staminaintl.com</p>
              </div>
            </div>
          </body>
          </html>
        `
      }),
    });

    const result = await response.json();

    console.log('Email send response:', { status: response.status, result });

    if (!response.ok) {
      console.error('Failed to send email:', result);
      return new Response(
        JSON.stringify({ error: 'Failed to send email', details: result }),
        { status: 500, headers: corsHeaders }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Email sent successfully to gerente@staminaintl.com'
      }),
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error('Email notification error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
});
