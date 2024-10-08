import React, { Fragment } from "react";
import { observer } from "mobx-react-lite";
import Select from "@atlaskit/select";
import Form, {
  FormFooter,
  ErrorMessage,
  Field,
  FormSection,
  FormHeader,
} from "@atlaskit/form";
import Button from "@atlaskit/button";
import Textfield from "@atlaskit/textfield";
import store from "../../../shared/model/Store";
import Spinner from "@atlaskit/spinner";
import { Checkbox } from "@atlaskit/checkbox";

import QuestionCircleIcon from "@atlaskit/icon/glyph/question-circle";
import Tooltip from "@atlaskit/tooltip";
/**
 * ProjectForm component for selecting a project and fetching tasks.
 * Utilizes MobX for state management and Atlassian's form components.
 */
export const ProjectForm = observer(() => {
  const {
    projects,
    loading,
    fetchTasks,
    setProjectKey,
    setTasksPerPage,
    fetchCount,
    setExperimental,
    setReal,
  } = store;

  // Map project data to options for the select component
  const projectOptions = projects.map((project) => ({
    value: project.key,
    label: project.name,
  }));

  // Handle form submission
  const handleSubmit = async (data) => {
    setExperimental(data.experimental); // Set experimental flag
    setReal(data.real);
    setProjectKey(data.project.value); // Set selected project key
    const count = await fetchCount(); // Fetch the count of tasks
    setTasksPerPage(data.maxItems); // Set max items per page
    await fetchTasks(); // Fetch tasks for the selected project
  };

  return (
    <div style={{ display: "flex", width: "350px", height: "auto" }}>
      <Form onSubmit={handleSubmit}>
        {({ formProps, submitting }) => (
          <form
            style={{ width: "100%" }}
            {...formProps}
          >
            <FormHeader title='Project Selection' />
            <FormSection>
              {/* Project selection field */}
              <Field
                name='project'
                label='Select by Name'
                validate={(value) => {
                  if (!value) {
                    return "Project selection is required."; // Validation message
                  }
                  return undefined;
                }}
              >
                {({ fieldProps, error }) => (
                  <Fragment>
                    <Select
                      {...fieldProps}
                      options={projectOptions}
                      placeholder='Select a project'
                      isLoading={loading} // Show loading indicator if fetching
                      isClearable
                      required // Make field required
                    />
                    {error && <ErrorMessage>{error}</ErrorMessage>}{" "}
                    {/* Show error if validation fails */}
                  </Fragment>
                )}
              </Field>

              {/* Maximum items input field */}
              <Field
                label='Maximum Items to Display'
                name='maxItems'
                defaultValue='10' // Default value
              >
                {({ fieldProps }) => (
                  <Fragment>
                    <Textfield
                      {...fieldProps}
                      type='number' // Number input
                      data-testid='nativeFormValidationTestNumber'
                    />
                  </Fragment>
                )}
              </Field>

              {/* Experimental checkbox */}
              <Field
                name='experimental'
                label='Experimental'
              >
                {({ fieldProps }) => (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Tooltip content='In experimental mode ALL tasks are loaded at once, but only the above number is displayed, may cause a load with a large number of tasks'>
                      <span>
                        <QuestionCircleIcon />
                      </span>
                    </Tooltip>
                    <Checkbox
                      {...fieldProps}
                      size='large'
                      label='Do not include with large datasets'
                    />
                  </div>
                )}
              </Field>

              {/* Real checkbox */}
              <Field
                name='real'
                label='Real'
              >
                {({ fieldProps }) => (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Tooltip content='In real mode there is real DELETION of tasks, real CHANGE of task types, be careful'>
                      <span>
                        <QuestionCircleIcon />
                      </span>
                    </Tooltip>
                    <Checkbox
                      {...fieldProps}
                      size='large'
                      label='Carefully' // Checkbox label
                    />
                  </div>
                )}
              </Field>
            </FormSection>

            {/* Form footer with submit button or spinner */}
            <FormFooter>
              {submitting ? (
                <Spinner
                  interactionName='load'
                  label='Loading' // Loading label
                />
              ) : (
                <Button
                  style={{ width: "100%" }} // Full width button
                  type='submit' // Submit button
                  appearance='primary'
                >
                  Fetch Tasks
                </Button>
              )}
            </FormFooter>
          </form>
        )}
      </Form>
    </div>
  );
});
