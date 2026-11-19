import type { ReactNode } from "react";

export const metadata = {
  title: "DMS Collections — Customer Communications Audit",
  description: "Animated Gen Z themed prototype",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
