import { Assumptions, useAssumptionsContext } from "#/lib/contexts/AssumptionsContext";
import clsx from "clsx";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import styles from "./ChatAssumptions.module.scss";

type ChatAssumptionsProps = {
  className?: string;
  children?: React.ReactNode;
};

export const ChatAssumptions = ({ className }: ChatAssumptionsProps) => {
  const { assumptions, setAssumptions, setShowAssumptions } = useAssumptionsContext();
  const methods = useForm<Assumptions>({
    defaultValues: assumptions,
  });
  const onSubmit = (data: any) => {
    setAssumptions(data);
    setShowAssumptions(false);
  };
  return (
    <FormProvider {...methods}>
      <form
        id="SMChatAsssumptions"
        className={clsx(
          styles.ChatAssumptions,
          "bg-blend-darke mt-2 w-full max-w-lg space-y-8",
          className,
        )}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <section className="flex flex-col space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Age</span>
            </label>
            <input
              type="number"
              {...methods.register("age")}
              className="peer input-bordered input input-sm w-full max-w-xs p-6 focus:bg-base-100"
            />
          </div>
          {/* <ControlInput label="Assets" min={0} max={56000} name="assets" />
					<ControlInput label="Debts" min={0} max={56000} name="debts" />
					<ControlInput label="Income" min={0} max={56000} name="yearly_income" />
					<ControlInput label="Spending" min={0} max={56000} name="monthly_spending" /> */}
        </section>
        <button className="btn-primary btn-sm btn" type="submit">
          Save
        </button>
      </form>
    </FormProvider>
  );
};

export default ChatAssumptions;
