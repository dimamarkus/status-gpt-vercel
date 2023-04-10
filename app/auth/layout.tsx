import LandingLayout from "#/ui/atoms/layouts/LandingLayout/LandingLayout";

type AuthPageLayoutProps = {
  children: React.ReactNode;
};

export const revalidate = 0;
export const runtime = "edge";

export default async function AuthPageLayout({ children }: AuthPageLayoutProps) {
  return <LandingLayout>{children}</LandingLayout>;
}
