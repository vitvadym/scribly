import { db } from '@/db';
import { post, comment, user } from '@/db/schema';
import { count } from 'drizzle-orm';
import { PgTable} from 'drizzle-orm/pg-core';
import { getTableName } from 'drizzle-orm';

const countTableRecords = async (table: PgTable) => {
  try {
    const tableName = getTableName(table);
    const c = await db.select({ count: count() }).from(table);

    return {
      tableName,
      count: c[0].count,
    };
  } catch (error) {
    console.error('Error counting records:', error);
    return null;
  }
};

export const getTableStatistics = async () => {
  const stats = [];

  try {
    for (const table of [post, comment, user]) {
      const stat = await countTableRecords(table);
      if (stat) stats.push(stat);
    }

    return stats;
  } catch (error) {
    console.error('Error fetching stats:', error);
    return null;
  }
};
