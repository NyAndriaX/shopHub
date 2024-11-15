/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from 'next-auth';
import { AuthOptions } from "next-auth";
import { jwtDecode } from 'jwt-decode';
import { encrypt } from '@/app/[locale]/utils';
import KeycloakProvider from "next-auth/providers/keycloak";
import { Session } from 'next-auth';

export const authOptions: AuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID || '',
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET || '',
      issuer: process.env.KEYCLOAK_ISSUER || '',
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      const nowTimeStamp = Math.floor(Date.now() / 1000);

      if (account) {
        token.decoded = jwtDecode(account.access_token || '');
        token.id_token = account.id_token;
        token.expires_at = account.expires_at;
        token.accessToken = account.access_token;
        return token;
      } else if (typeof token.expires_at === 'number' && nowTimeStamp < token.expires_at) {
        return token;
      } else {
        console.log('Token has expired. Will refresh...');
        return token;
      }
    },

    async session({ session, token }: { session: Session, token: any }) {
      session.access_token = token.accessToken;
      session.id_token = encrypt(token.id_token || '');
      session.roles = token.decoded?.realm_access?.roles || [];
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
