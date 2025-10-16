// import { ERole } from '@/types/role';
import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      role: ERole;
      avatar: string;
      id: string;
    };
  }
}

// declare module 'next-auth' {
//   interface User {
//     id: string;
//     role: ERole;
//     avatar: string;
//     name: string;
//     email: string;
//   }
// }

// declare module 'next-auth/jwt' {
//   interface JWT {
//     id: string;
//     role: ERole;
//     avatar: string;
//   }
// }
