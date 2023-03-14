// import React from "react";
"use client";

import { Boundary } from "#/ui/examples/boundary";
import Button from "#/ui/examples/example-button";

export default function Error({ error, reset }: any) {
  // React.useEffect(() => {
  //   console.log("logging error:", error);
  // }, [error]);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Error</h2>
      <p className="text-sm">{error?.message}</p>
      <div>{/* <Button onClick={() => reset()}>Try Again</Button> */}</div>
    </div>
  );
}
