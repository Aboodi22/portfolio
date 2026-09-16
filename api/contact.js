import { createClient } from '@supabase/supabase-js';
import WebSocket from 'ws';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, {
  realtime: { transport: WebSocket }
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "L'adresse email n'est pas valide." });
  }

  const { error } = await supabase.from('messages').insert([{ name, email, message }]);

  if (error) {
    console.error('Supabase insert error:', error);
    return res.status(500).json({ error: "Erreur lors de l'enregistrement du message." });
  }

  res.status(200).json({ success: true });
}