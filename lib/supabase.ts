import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) throw Error("Please provide the Supabase URL ");
if (!supabaseKey) throw Error("Please provide the Supabase Key ");

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
