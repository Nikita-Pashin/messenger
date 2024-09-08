import { Signup } from "@/features/Signup";
import { getDictionary } from "@/shared/i18n";

export default function SignupPage() {
  const d = getDictionary();

  return (
    <div className="flex justify-center pt-10">
      <Signup d={d} />
    </div>
  );
};
