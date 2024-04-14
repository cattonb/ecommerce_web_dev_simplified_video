import { Loader2 } from "lucide-react";
import React from "react";

const loading: React.FC = () => {
  return (
    <div className="flex justify-center ">
      <Loader2 className="size-16 animate-spin" />
    </div>
  );
};
export default loading;
