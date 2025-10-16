import { db } from '..';
import { post, category, user } from '../schema';
import { eq } from 'drizzle-orm';

import { seedCategories } from './categories';
import { seedPosts } from './posts';
import { ERole } from '@/types/role';

const main = async () => {
  try {
    const adminDefault = {
      email: 'admin@example.com',
      image: 'https://i.pravatar.cc/150?img=6',
      password: 'password',
      name: 'Admin',
      role: ERole.ADMIN,
    };

    console.log('Seeding init data started...🚀');

    await db.insert(user).values(adminDefault);

    const userFromDB = await db.query.user.findFirst({
      where: eq(user.email, adminDefault.email),
    });

    await db.insert(category).values(seedCategories());

    if (userFromDB) {
      await db.insert(post).values(seedPosts(userFromDB.id));
    }

    console.log('Seeding completed 👌');
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding 🆘:', error);
    process.exit(1);
  }
};

main();
