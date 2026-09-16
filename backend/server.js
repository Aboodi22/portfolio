import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Health check — useful to confirm the backend is alive after deploying
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Portfolio backend is running.' });
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "L'adresse email n'est pas valide." });
  }

  const { error } = await supabase
    .from('messages')
    .insert([{ name, email, message }]);

  if (error) {
    console.error('Supabase insert error:', error);
    return res.status(500).json({ error: "Erreur lors de l'enregistrement du message." });
  }

  res.status(200).json({ success: true });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
