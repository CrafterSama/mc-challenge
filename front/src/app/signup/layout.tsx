import LoginDirective from "@/components/modules/auth/login-directive";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LoginDirective>{children}</LoginDirective>;
}
