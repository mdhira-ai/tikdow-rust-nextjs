import { createClient } from "@supabase/supabase-js";

const REACT_APP_SUPABASE_URL="https://pozqnclfymdfyfcawdvz.supabase.co"
const REACT_APP_SUPABASE_PUBLISHABLE_KEY="sb_publishable_LGvdwCR3QN3PM-LXFa5H1g_2_cw_ZI5"


const supabaseUrl = REACT_APP_SUPABASE_URL;
const supabaseKey = REACT_APP_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);