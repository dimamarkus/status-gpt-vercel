"use client";
import React from "react";

import { Boundary } from "#/ui/examples/boundary";
import BaseButton from "#/ui/_base/BaseButton/BaseButton";

export default function Error({ error, reset }: any) {
  React.useEffect(() => {
    console.error("logging error:", error);
  }, [error]);

  return (
    <Boundary labels={["./chat/error.tsx"]} color="pink">
      <div className="space-y-4">
        <h2 className="text-lg font-bold">Error</h2>
        <p className="text-sm">{error?.message}</p>
        <div>
          <BaseButton onClick={() => reset()}>Try Again</BaseButton>
        </div>
      </div>
    </Boundary>
  );
}
