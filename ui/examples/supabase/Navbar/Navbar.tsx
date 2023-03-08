import { useAuthContext } from '#/lib/context/authContext';
import { clientSideSupabase } from '#/lib/supabase-client';
import Logo from '#/ui/atoms/icons/Logo';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './Navbar.module.css';

const Navbar = () => {
  const router = useRouter();
  const { user } = useAuthContext();

  return (
    <nav className={styles.root}>
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="mx-auto max-w-6xl px-6">
        <div className="align-center relative flex flex-row justify-between py-4 md:py-6">
          <div className="flex flex-1 items-center">
            <Link href="/" className={styles.logo} aria-label="Logo">
              <Logo />
            </Link>
            <nav className="ml-6 hidden space-x-2 lg:block">
              <Link href="/" className={styles.link}>
                Pricing
              </Link>
              <Link href="/account" className={styles.link}>
                Account
              </Link>
            </nav>
          </div>

          <div className="flex flex-1 justify-end space-x-8">
            {user ? (
              <span
                className={styles.link}
                onClick={async () => {
                  await clientSideSupabase.auth.signOut();
                  router.push('/signin');
                }}
              >
                Sign out
              </span>
            ) : (
              <Link href="/signin" className={styles.link}>
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
