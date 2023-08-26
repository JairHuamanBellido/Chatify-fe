import { useForgotPassword } from "@/src/hooks/useForgotPassword";
import RequestCodeContainer from "./containers/RequestCodeContainer";
import RecoveryPasswordContainer from "./containers/RecoveryPasswordContainer";
import { useEffect } from "react";

export default function ForgotPasswordContainer() {
  const [config, setConfig] = useForgotPassword();

  useEffect(() => {
    return () => setConfig({ email: "", step: 1 });
  }, [setConfig]);
  return (
    <div className="mx-auto max-w-[90%] w-[400px] flex flex-col items-center">
      {config.step === 1 ? (
        <RequestCodeContainer />
      ) : (
        <RecoveryPasswordContainer />
      )}
    </div>
  );
}
