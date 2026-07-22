import { supabase } from "./supabase.js";

export async function getRecords(table) {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(`Error fetching from ${table}:`, error);
    return [];
  }
  return data;
}

export async function createRecord(table, recordData) {
  const { data, error } = await supabase
    .from(table)
    .insert([recordData])
    .select();

  if (error) {
    console.error(`Error inserting into ${table}:`, error);
    return null;
  }
  return data[0];
}

export async function updateRecord(table, id, updates) {
  const { data, error } = await supabase
    .from(table)
    .update(updates)
    .eq("id", id)
    .select();

  if (error) {
    console.error(`Error updating ${table}:`, error);
    return null;
  }
  return data[0];
}

export async function deleteRecord(table, id) {
  const { error } = await supabase
    .from(table)
    .delete()
    .eq("id", id);

  if (error) {
    console.error(`Error deleting from ${table}:`, error);
    return false;
  }
  return true;
}
