import LandingLayout from "#/ui/atoms/layouts/LandingLayout/LandingLayout";

type BotsPageLayoutProps = {
  children: React.ReactNode;
};

export const revalidate = 0;

export default async function BotsPageLayout({ children }: BotsPageLayoutProps) {
  return <LandingLayout>{children}</LandingLayout>;
}
