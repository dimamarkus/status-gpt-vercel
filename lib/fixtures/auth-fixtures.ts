import { User } from '@supabase/auth-helpers-nextjs';

export const LOGGED_IN_USER: User = {
  id: '1',
  email: 'example@example.com',
  created_at: Date.now().toString(),
  aud: 'authenticated',
  user_metadata: {
    name: 'Example User',
  },
  app_metadata: {
    provider: 'email',
  },
};
