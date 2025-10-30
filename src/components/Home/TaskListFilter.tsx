// Import libraries
import { FastField, Formik, type FieldProps } from "formik";
import { useEffect } from "react";

// Import components
import { Checkbox } from "@components/shared/Checkbox";
import Select from "@components/shared/Select";
import FormItem from "@components/shared/FormItem";

// Import cconstants
import { defaultFilterValues } from "./TaskListFilter.constants";

export type FilterFormValues = {
  showDailyTasks: boolean;
  taskType: "all" | "complete" | "incomplete";
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
  filter = defaultFilterValues,
}: TaskListFilter) => {
  return (
    <Formik initialValues={filter} onSubmit={() => {}}>
      {({ setFieldValue, values }) => {
        return (
          <>
            <FormEffect formValues={values} onChangeFilter={onChangeFilter} />
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
                    onChange={(e) =>
                      setFieldValue("showDailyTasks", e.target.checked)
                    }
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
                        setFieldValue("taskType", newVal);
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
