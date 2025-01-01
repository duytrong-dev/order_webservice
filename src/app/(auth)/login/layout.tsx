import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Đăng nhập",
    description: "Đăng nhập tài khoản!",
};

export default function LoginLayout( {children,}: Readonly<{children: React.ReactNode}>) {
    return (
      <div>{children}</div>
    );
}