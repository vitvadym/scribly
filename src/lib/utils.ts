import 'dotenv/config';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { user as userTable, post as postTable } from '@/db/schema';
import transporter from './nodemailer';
import { WELCOME_EMAIL_TEMPLATE } from './emailTemplate';
import { ERole } from '@/types/role';


export const getAllUsers = async () => {
  try {
    const users = await db.query.user.findMany();
    return users;
  } catch (error) {
    console.error('Error fetching all users:', error);
    return [];
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await db.query.post.findMany({
      with: {
        author: {
          columns: {
            name: true,
            image: true,
          },
        },
        category: true,
      },
    });

    return posts;
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return [];
  }
};

export const getPostBySlug = async (slug: string) => {
  try {
    const post = await db.query.post.findFirst({
      where: eq(postTable.slug, slug),
      with: {
        category: true,
        author: {
          columns: {
            name: true,
            image: true,
          },
        },
        comments: true,
      },
    });
    return post;
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.query.user.findFirst({
      where: eq(userTable.id, id),
    });

    return user;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    return null;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.query.user.findFirst({
      where: eq(userTable.email, email),
    });

    return user;
  } catch (error) {
    console.error('Error fetching user by email:', error);
  }
};

export const sendWelcomeEmail = async (email: string, name: string) => {
  try {
    await transporter.sendMail({
      from: process.env.GOOGLE_MAIL_FROM,
      to: email,
      subject: 'Welcome to Scribbly',
      html: WELCOME_EMAIL_TEMPLATE.replace('{{name}}', name).replace(
        '{{year}}',
        new Date().getFullYear().toString(),
      ),
    });
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw new Error('Failed to send welcome email');
  }
};

export const isAdmin = async (user: { role?: ERole }) => {
  return user.role === ERole.ADMIN;
};
