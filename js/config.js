const SUPABASE_URL =
"https://deptvgpxxvwilbjznvtf.supabase.co";

const SUPABASE_ANON_KEY =
"sb_publishable_VqE8G8TjaLa6jD7uAodJmA_Dc4djElN";

const supabaseClient =
window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

console.log("Supabase Connected");