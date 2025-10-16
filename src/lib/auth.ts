import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/db';
import { getUserById, getUserByEmail } from './utils';
import { ERole } from '@/types/role';
import { account, user } from '@/db/schema';

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    accountsTable: account,
    usersTable: user,
  }),
  session: {
    strategy: 'jwt',
  },
  useSecureCookies: process.env.NODE_ENV === 'production',

  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'Email',
          value: 'admin@example.com',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
          value: 'password',
        },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;

        const user = await getUserByEmail(email as string);
        console.log('authorize user', user)

        if (user && user.password === password) {
          const { role, name, id, image, email } = user as {
            role: ERole;
            name: string;
            id: string;
            image: string;
            email: string;
          };

          return {
            id,
            email,
            name: name,
            role: role as ERole,
            avatar: image,
          };
        } else {
          return null;
        }
      },
    }),
    Google,
    GitHub,
  ],

  callbacks: {

    async jwt({ token }) {
      if (token.sub) {
        const user = await getUserById(token.sub);
        token.role = user?.role;
        token.id = user?.id;
      }

      return token;
    },

    async session({ session, token }) {
      // session.user.id = token.id as string;
      session.user.role = token.role as ERole;
      session.user.id = token.id as string;
      session.user.avatar = token.picture as string;
      return session;
    },
    redirect: async ({ baseUrl }) => baseUrl,
  },
});
