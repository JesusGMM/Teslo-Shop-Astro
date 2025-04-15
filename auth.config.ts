// import GitHub from '@auth/core/providers/github';
import { defineConfig } from 'auth-astro';
import Credentials from '@auth/core/providers/credentials';
import bcrypt from 'bcryptjs';
import type { AdapterUser } from '@auth/core/adapters';
import { users } from 'keys';

export default defineConfig({
  providers: [
    //TODO:
    // GitHub({
    //   clientId: import.meta.env.GITHUB_CLIENT_ID,
    //   clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
    // }),

    Credentials({
      credentials: {
        email: { label: 'Correo', type: 'email' },
        password: { label: 'Contraseña', type: 'password' },
      },
      authorize: async ({ email, password }) => {
        const user = users.find((user) => user.email === email);

        if (!user) {
          throw new Error('User not found');
        }


        if (password !== user.password) {
          throw new Error('Invalid password');
        }
        // if (!bcrypt.compareSync(password as string, user.password)) {
        //   throw new Error('Invalid password');
        // }

        const { password: _, ...rest } = user;

        return rest;
      },
    }),
  ],

  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.user = user;
      }

      return token;
    },

    session: ({ session, token, user }) => {

      session.user = token.user as AdapterUser;
      return session;

    },
  },
});
