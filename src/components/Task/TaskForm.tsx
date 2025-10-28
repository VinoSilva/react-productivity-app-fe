// Import libraries
import { FastField, Formik, type FieldProps } from "formik";

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
    <Formik initialValues={initialValues || defaultValues} onSubmit={onSubmit}>
      {(form) => {
        return (
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="flex flex-col"
          >
            <div className="flex gap-5">
              <div className="w-full">
                <FastField name="name">
                  {({ field }: FieldProps) => (
                    <FormItem label="Name">
                      <Input placeholder="Task Name" {...field} />
                    </FormItem>
                  )}
                </FastField>
              </div>
              <div className="w-20">
                <FastField name="points">
                  {({ field }: FieldProps) => (
                    <FormItem label="Points">
                      <Input type="number" min={1} {...field} />
                    </FormItem>
                  )}
                </FastField>
              </div>
            </div>
            <FastField name="description">
              {({ field }: FieldProps) => (
                <FormItem label="Description">
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
                  className="mb-4"
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
