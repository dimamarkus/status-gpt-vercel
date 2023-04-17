"use client";
import Card from "#/ui/atoms/containers/Card/Card";
import BotEditForm from "#/ui/molecules/forms/BotEditForm/BotEditForm";

export default function CreateBotPage() {
  return (
    <Card title="Create Bot">
      <BotEditForm />
    </Card>
  );
}
