import { Salad } from "lucide-react";

export default function LoadingAppFullScreen() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Salad className="h-12 w-12 animate-pulse" />
    </div>
  );
}
