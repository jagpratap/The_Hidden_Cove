import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://zwfqpnluuqdfsliuioqb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3ZnFwbmx1dXFkZnNsaXVpb3FiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU4MjA3ODIsImV4cCI6MjAyMTM5Njc4Mn0.l_HpbFsejZPfVU1pyTmTCT0Mq_oc6otQ9prHOAjnJ1s';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;