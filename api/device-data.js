import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { device_id, smoke1, smoke2, flame1, flame2 } = req.body;

    const { data, error } = await supabase
      .from('device_logs')
      .insert([
        { device_id, smoke1, smoke2, flame1, flame2 }
      ]);

    if (error) {
      console.error('Supabase insert error:', error.message);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ message: 'Data inserted!', data });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
