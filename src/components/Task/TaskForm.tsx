// Import libraries
import { FastField, Formik, type FieldProps } from "formik";
import * as Yup from "yup";

// Import components
import Button from "@components/shared/Button";
import FormItem from "@components/shared/FormItem";
import Input from "@components/shared/Input";
import TextArea from "@components/shared/TextArea";
import { Checkbox } from "@components/shared/Checkbox";

type TaskFormValues = {
  name: string;
  points: number;
  description: string;
  isDaily: boolean;
};

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(1, "Name must be minimum 1 character long")
    .required("Name is required"),
  points: Yup.number()
    .min(1, "Points must be minimum 1")
    .required("Name is required"),
  description: Yup.string(),
  isDaily: Yup.boolean().required("Is Dail is required"),
});

interface TaskFormProps {
  initialValues?: TaskFormValues;
  onSubmit: (values: TaskFormValues) => void;
}

const defaultValues: TaskFormValues = {
  name: "",
  points: 1,
  description: "",
  isDaily: false,
};

const TaskForm = ({ onSubmit, initialValues }: TaskFormProps) => {
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues || defaultValues}
      onSubmit={onSubmit}
    >
      {(form) => {
        return (
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="flex flex-col gap-2"
          >
            <div className="flex gap-5">
              <div className="w-full">
                <FastField name="name">
                  {({ field, meta }: FieldProps) => (
                    <FormItem label="Name" error={meta.error}>
                      <Input placeholder="Task Name" {...field} />
                    </FormItem>
                  )}
                </FastField>
              </div>
              <div className="w-20">
                <FastField name="points">
                  {({ field, meta }: FieldProps) => (
                    <FormItem label="Points" error={meta.error}>
                      <Input type="number" min={1} {...field} />
                    </FormItem>
                  )}
                </FastField>
              </div>
            </div>
            <FastField name="description">
              {({ field, meta }: FieldProps) => (
                <FormItem label="Description" error={meta.error}>
                  <TextArea
                    placeholder="Description"
                    className="resize-none"
                    {...field}
                  />
                </FormItem>
              )}
            </FastField>
            <FastField name="isDaily">
              {({ field }: FieldProps) => (
                <Checkbox
                  label="Is it a daily task"
                  {...field}
                  checked={field.value}
                />
              )}
            </FastField>
            <Button
              onClick={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
              disabled={!form.isValid}
              type="submit"
              className="mt-2"
            >
              Submit
            </Button>
          </form>
        );
      }}
    </Formik>
  );
};

export default TaskForm;
