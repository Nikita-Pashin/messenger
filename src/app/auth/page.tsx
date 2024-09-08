import { LoginForm } from "@/features/Login";
import { getDictionary } from "@/shared/i18n";

export default function Auth() {
  const d =  getDictionary();

  return (
    <div className="flex justify-center pt-10">
      <LoginForm d={d} />
    </div>
  );
};
