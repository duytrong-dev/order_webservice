import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Đăng ký",
    description: "Đăng ký tài khoản!",
};

export default function RegisterLayout( {children,}: Readonly<{children: React.ReactNode}>) {
    return (
      <div>{children}</div>
    );
}