import { useState, useEffect } from "react";
import { getRecords, createRecord } from "../services/database/databaseService.js";

export function useSupabaseData(tableName, initialFallback = []) {
  const [data, setData] = useState(initialFallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const records = await getRecords(tableName);
        if (records && records.length > 0) {
          setData(records);
        }
      } catch (err) {
        console.warn(`Falling back for table ${tableName}:`, err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [tableName]);

  const addRecord = async (newRecord) => {
    const saved = await createRecord(tableName, newRecord);
    if (saved) {
      setData((prev) => [saved, ...prev]);
      return saved;
    } else {
      const fallbackRecord = { id: Date.now().toString(), ...newRecord };
      setData((prev) => [fallbackRecord, ...prev]);
      return fallbackRecord;
    }
  };

  return { data, loading, addRecord };
}
