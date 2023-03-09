'use client';

import { useAuthContext } from '#/lib/contexts/AuthContext';
import { postData } from '#/lib/helpers/helpers';
import Card from '#/ui/containers/Card/Card';
import LoadingDots from '#/ui/examples/supabase/LoadingDots';
import SupabaseButton from '#/ui/examples/supabase/SupabaseButton';
import LandingLayout from '#/ui/layouts/LandingLayout/LandingLayout';
import Link from 'next/link';
import { useState } from 'react';

export default function Account() {
  const [loading, setLoading] = useState(false);
  const { isLoading, subscription, user } = useAuthContext();
  const userDetails = user ? user.user_metadata : null;

  const redirectToCustomerPortal = async () => {
    setLoading(true);
    try {
      const { url, error } = await postData({
        url: '/api/create-portal-link',
      });
      window.location.assign(url);
    } catch (error) {
      if (error) return alert((error as Error).message);
    }
    setLoading(false);
  };

  const subscriptionPrice =
    subscription &&
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: subscription?.prices?.currency,
      minimumFractionDigits: 0,
    }).format((subscription?.prices?.unit_amount || 0) / 100);

  return (
    <LandingLayout>
      <section className="mb-32 bg-black">
        <div className="mx-auto max-w-6xl px-4 pt-8 pb-8 sm:px-6 sm:pt-24 lg:px-8">
          <div className="sm:align-center sm:flex sm:flex-col">
            <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
              Account
            </h1>
            <p className="m-auto mt-5 max-w-2xl text-xl text-zinc-200 sm:text-center sm:text-2xl">
              We partnered with Stripe for a simplified billing.
            </p>
          </div>
        </div>
        <div className="p-4">
          <Card
            title="Your Plan"
            description={
              subscription
                ? `You are currently on the ${subscription?.prices?.products?.name} plan.`
                : ''
            }
            footer={
              <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
                <p className="pb-4 sm:pb-0">
                  Manage your subscription on Stripe.
                </p>
                <SupabaseButton
                  variant="slim"
                  loading={loading}
                  disabled={loading || !subscription}
                  onClick={redirectToCustomerPortal}
                >
                  Open customer portal
                </SupabaseButton>
              </div>
            }
          >
            <div className="mt-8 mb-4 text-xl font-semibold">
              {isLoading ? (
                <div className="mb-6 h-12">
                  <LoadingDots />
                </div>
              ) : subscription ? (
                `${subscriptionPrice}/${subscription?.prices?.interval}`
              ) : (
                <Link href="/">Choose your plan</Link>
              )}
            </div>
          </Card>
          <Card
            title="Your Name"
            description="Please enter your full name, or a display name you are comfortable with."
            footer={<p>Please use 64 characters at maximum.</p>}
          >
            <div className="mt-8 mb-4 text-xl font-semibold">
              {userDetails ? (
                `${
                  userDetails.full_name ??
                  `${userDetails.first_name} ${userDetails.last_name}`
                }`
              ) : (
                <div className="mb-6 h-8">
                  <LoadingDots />
                </div>
              )}
            </div>
          </Card>
          <Card
            title="Your Email"
            description="Please enter the email address you want to use to login."
            footer={<p>We will email you to verify the change.</p>}
          >
            <p className="mt-8 mb-4 text-xl font-semibold">
              {user ? user.email : undefined}
            </p>
          </Card>
        </div>
      </section>
    </LandingLayout>
  );
}
