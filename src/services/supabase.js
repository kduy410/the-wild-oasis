
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://dxrhepfgqqrsmrijmfte.supabase.co'
// const supabaseKey = process.env.SUPABASE_KEY
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4cmhlcGZncXFyc21yaWptZnRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4NTY2NjUsImV4cCI6MjA1NzQzMjY2NX0.xHAFZFRmg-wPvGaGIOCoS4JnoNWI_ClSR5YEPak2Grk"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;