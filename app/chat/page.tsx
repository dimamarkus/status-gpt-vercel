import { redirect } from "next/navigation";
import { ExternalLink } from "#/ui/examples/external-link";
import { DEFAULT_CHAT_BOT } from "#/lib/constants/settings";

export default function Page() {
  redirect("/chat/" + DEFAULT_CHAT_BOT);
}
