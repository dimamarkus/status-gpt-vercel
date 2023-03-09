'use client';

import { useAuthContext } from '#/lib/contexts/AuthContext';
import { getURL } from '#/lib/helpers/helpers';
import { clientSideSupabase } from '#/lib/supabase-client';
import Logo from '#/ui/atoms/icons/VercelLogo';
import Card from '#/ui/containers/Card/Card';
import LoadingDots from '#/ui/examples/supabase/LoadingDots';
import LandingLayout from '#/ui/layouts/LandingLayout/LandingLayout';
import { Auth as ReactAuth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Login = () => {
  const router = useRouter();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      router.replace('/account');
    }
  }, [user]);

  if (!user) {
    return (
      <LandingLayout>
        <div className="height-screen-helper flex justify-center">
          <div className="m-auto flex w-80 max-w-lg flex-col justify-between p-3 ">
            <div className="flex justify-center pb-12 ">
              <Logo width="64px" height="64px" />
            </div>
            <Card className="flex flex-col space-y-4">
              {/* <Auth view={VIEWS.SIGN_IN} /> */}
              <ReactAuth
                supabaseClient={clientSideSupabase}
                providers={['github']}
                redirectTo={getURL()}
                magicLink={true}
                appearance={{
                  theme: ThemeSupa,
                  // className: {
                  //   container: 'form-control',
                  //   input: 'input input-bordered text-neutral-50',
                  //   button: 'btn btn-primary',
                  //   anchor: 'text-primary',
                  //   message: 'text-red-500',
                  //   label: 'label',
                  // },
                }}
                theme="dark"
              />
            </Card>
          </div>
        </div>
      </LandingLayout>
    );
  }

  return (
    <LandingLayout>
      <div className="m-6">
        <LoadingDots />
      </div>
    </LandingLayout>
  );
};

export default Login;
