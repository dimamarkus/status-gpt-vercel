"use client";

import { CreateBotSchema } from "#/lib/forms/schemas";
import { makeServerPostRequest } from "#/lib/helpers/requests/makeServerRequest";
import { Bot } from "#/lib/types/cms";
import BaseButton from "#/ui/_base/BaseButton/BaseButton";
import TextInput from "#/ui/atoms/inputs/TextInput/TextInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";

export type BotEditFields = {
  name: string;
  slug: string;
};

export const BotEditForm = () => {
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<BotEditFields>({
    resolver: yupResolver(CreateBotSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const onSubmit = async (formData: BotEditFields) => {
    setSubmissionError(null);
    setSuccessMsg(null);
    const response = await makeServerPostRequest<Bot, BotEditFields>("/bots", formData);
    if (response.status !== 200) {
      setSubmissionError(response.statusText || "Something went wrong");
    } else {
      // const bot = response.json();
      setSuccessMsg("Success! Your bot has been saved!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <TextInput
        label="Name"
        type="name"
        touched={touchedFields.name}
        errors={errors.name?.message}
        register={register}
        name="name"
      />
      <TextInput
        label="Slug"
        type="text"
        touched={touchedFields.slug}
        errors={errors.slug?.message}
        register={register}
        name="slug"
      />
      {submissionError && <div className="text-red-500">{submissionError}</div>}
      {successMsg && <div className="text-green-500">{successMsg}</div>}
      <BaseButton type="submit" fullWidth text="Submit" />
    </form>
  );
};

export default BotEditForm;
