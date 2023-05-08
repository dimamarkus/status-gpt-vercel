import LandingLayout from "#/ui/atoms/layouts/LandingLayout/LandingLayout";

type LayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
  return <div>{children}</div>;
}
