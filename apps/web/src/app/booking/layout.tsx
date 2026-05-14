import Footer from "@/core/features/main/components/blocks/footer/Footer";
import Header from "@/core/features/main/components/blocks/header/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DriverHub",
  description:
    "Step up your shoe game with DriverHub! Find the latest styles for men and women, shop online, and get them fast.",
};

async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-secondary-foreground">
      <Header />

      {children}
      <Footer />
    </main>
  );
}

export default layout;
