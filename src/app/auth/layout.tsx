import { Roboto } from "next/font/google";

const inter = Roboto({ subsets: ["cyrillic"], weight: ['300', '400', '500', '700'] });

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)  {
  return (
    <div>
      {children}
    </div>
  );
}