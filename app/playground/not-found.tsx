import { Boundary } from "#/ui/examples/boundary";

export default function NotFound() {
  return (
    <Boundary labels={["./chat/not-found.tsx"]} color="pink">
      <div className="space-y-4 text-vercel-pink">
        <h2 className="text-lg font-bold">Not Found</h2>

        <p className="text-sm">Could not find such a bot</p>
      </div>
    </Boundary>
  );
}
