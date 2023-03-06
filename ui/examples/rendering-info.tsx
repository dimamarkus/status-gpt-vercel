import { RenderedTimeAgo } from '#/ui/examples/rendered-time-ago';

export function RenderingInfo({
  type,
}: {
  type: 'spa' | 'ssg' | 'ssgod' | 'ssr' | 'isr';
}) {
  let msg = '';
  switch (type) {
    case 'spa':
      msg = 'Dynamically rendered on the client';
      break;
    case 'ssg':
      msg = 'Statically pre-rendered at build time';
      break;
    case 'ssgod':
      msg = 'Statically rendered on demand';
      break;
    case 'isr':
      msg =
        'Statically pre-rendered at build time and periodically revalidated';
      break;
    case 'ssr':
      msg = 'Dynamically rendered at request time';
      break;
  }

  return (
    <div className="p-3 space-y-3 bg-gray-900 rounded-lg">
      <div className="text-sm text-gray-300">{msg}</div>

      <div className="flex">
        <RenderedTimeAgo timestamp={Date.now()} />
      </div>
    </div>
  );
}
