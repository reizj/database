import { createClient } from '@supabase/supabase-js';

// Connect to Supabase using environment variables
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { device_id, smoke1, smoke2, flame1, flame2 } = req.body;

      // Insert into device_logs table
      const { data, error } = await supabase
        .from('device_logs')
        .insert([
          {
            device_id,
            smoke1,
            smoke2,
            flame1,
            flame2
          }
        ]);

      if (error) throw error;

      res.status(200).json({ success: true, data });
    } catch (error) {
      console.error('API Error:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
