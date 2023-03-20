"use client";
import React from "react";
import { Boundary } from "#/ui/examples/boundary";
import Button from "#/ui/atoms/buttons/Button/Button";

export default function Error({ error, reset }: any) {
  React.useEffect(() => {
    console.error("logging error:", error);
  }, [error]);

  return (
    <Boundary labels={["./chat/[slug]/error.tsx"]} color="pink">
      <div className="space-y-4">
        <h2 className="text-lg font-bold">Error</h2>
        <p className="text-sm">{error?.message}</p>
        <div>
          <Button onClick={() => reset()}>Try Again</Button>
        </div>
      </div>
    </Boundary>
  );
}
