import FormItem from "@components/shared/FormItem";

// Import Item
import { Checkbox } from "@components/shared/Checkbox";
import Select from "@components/shared/Select";
import { FastField, Formik, type FieldProps } from "formik";
import { useEffect } from "react";

export type FilterFormValues = {
  showDailyTasks: boolean;
  taskType: "all" | "complete" | "incomplete";
};

const defaultValues: FilterFormValues = {
  showDailyTasks: true,
  taskType: "all",
};

interface TaskListFilter {
  filter?: FilterFormValues;
  onChangeFilter: (val: FilterFormValues) => void;
}

// ✅ Custom subcomponent to handle side effect safely
const FormEffect = ({
  formValues,
  onChangeFilter,
}: {
  formValues: FilterFormValues;
  onChangeFilter: (val: FilterFormValues) => void;
}) => {
  useEffect(() => {
    onChangeFilter(formValues);
  }, [formValues, onChangeFilter]);

  return null; // no UI
};

const TaskListFilter = ({
  onChangeFilter,
  filter = defaultValues,
}: TaskListFilter) => {
  return (
    <Formik initialValues={filter} onSubmit={() => {}}>
      {(form) => {
        return (
          <>
            <FormEffect
              formValues={form.values}
              onChangeFilter={onChangeFilter}
            />
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <FastField name="showDailyTasks">
                {({ field }: FieldProps) => (
                  <Checkbox
                    label="Show Daily Task Only"
                    {...field}
                    checked={field.value}
                  />
                )}
              </FastField>

              <FastField name="taskType">
                {({ field }: FieldProps) => (
                  <FormItem showError={false}>
                    <Select
                      options={[
                        { value: "all", id: 1, label: "All" },
                        { value: "complete", id: 2, label: "Completed" },
                        { value: "incomplete", id: 3, label: "Incomplete" },
                      ]}
                      value={field.value}
                      onChange={(newVal) => {
                        form.setFieldValue("taskType", newVal);
                      }}
                    />
                  </FormItem>
                )}
              </FastField>
            </form>
          </>
        );
      }}
    </Formik>
  );
};

export default TaskListFilter;
