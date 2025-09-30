import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { device_id, smoke1, smoke2, flame1, flame2 } = req.body;

      // Insert data into Supabase and return the inserted row
      const { data, error } = await supabase
        .from('device_logs')
        .insert([{ device_id, smoke1, smoke2, flame1, flame2 }])
        .select(); // 👈 this makes Supabase return the new row(s)

      if (error) throw error;

      res.status(200).json({ message: 'Data inserted!', data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error inserting data', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
