import { Flex } from '@chakra-ui/react';
import RecentContent from '@/components/admin/RecentContent/RecentContent';
import StatCard from '@/components/admin/StatCard/StatCard';
import { getTableStatistics } from '@/utils/server/stats';
import { StatCardProps } from '@/components/admin/StatCard/StatCard';
import { auth } from '@/lib/auth';

export default async function Admin() {
  const stats = await getTableStatistics();
  const session = await auth();
  console.log('session', session)
  return (
    <>
      <Flex
        gap={4}
        padding={4}
        mb={8}
      >
        {stats?.map((stat) => (
          <StatCard
            key={stat.tableName}
            variant={stat.tableName as StatCardProps['variant']}
            label={stat.tableName}
            value={stat.count}
          />
        ))}
      </Flex>
      <RecentContent />
    </>
  );
}
