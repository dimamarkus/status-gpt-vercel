"use client"

import BaseButton from "#/ui/_base/BaseButton/BaseButton";
import {yupResolver} from "@hookform/resolvers/yup";
import {useState} from "react";
import {FieldValues, FormProvider, useForm, UseFormProps} from "react-hook-form";
import * as yup from "yup";

export type ReactHookFormProps<TFieldValues extends FieldValues> = {
  children: React.ReactNode;
  defaultValues: UseFormProps<TFieldValues>["defaultValues"]
  schema: yup.ObjectSchema<any>;
  onSubmit: (values: TFieldValues) => Promise<Response>;
  className?: string;
};

export function ReactHookForm<TFieldValues extends FieldValues>(
  props: ReactHookFormProps<TFieldValues>,
) {
  const { children, defaultValues, schema, onSubmit } = props;

  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const formConfig = !!schema ? { resolver: yupResolver(schema), defaultValues } : { defaultValues }

  const formMethods = useForm<TFieldValues>(formConfig);

  const submitCallback = async (formData: TFieldValues) => {
    setSubmissionError(null);
    setSuccessMsg(null);
    const response = await onSubmit(formData);
    if (response.status !== 200) {
      setSubmissionError(response.statusText || "Something went wrong");
    } else {
      setSuccessMsg("Success!");
    }
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(submitCallback)} className="space-y-4">
        {children}
        {submissionError && <div className="text-red-500">{submissionError}</div>}
        {successMsg && <div className="text-green-500">{successMsg}</div>}
        <BaseButton type="submit" fullWidth text="Submit" />
      </form>
    </FormProvider>
  );
}

export default ReactHookForm;
