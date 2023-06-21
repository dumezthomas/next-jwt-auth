import "@/styles/globals.css";
import "@/styles/tailwindClasses.css";

import LayoutProvider from "@/components/LayoutProvider";

export const metadata = {
  title: "Next Auth",
  description: "Next.js JWT Authentication template",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  );
};

export default RootLayout;
