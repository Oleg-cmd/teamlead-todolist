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

export const ProjectForm = observer(() => {
  const {
    projects,
    loading,
    fetchTasks,
    setProjectKey,
    setTasksPerPage,
    fetchCount,
    setExperimental,
  } = store;

  const projectOptions = projects.map((project) => ({
    value: project.key,
    label: project.name,
  }));

  const handleSubmit = async (data) => {
    setExperimental(data.experimental);
    setProjectKey(data.project.value);
    const count = await fetchCount();
    setTasksPerPage(data.maxItems);
    await fetchTasks();
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
              <Field
                name='project'
                label='Select by Name'
                validate={(value) => {
                  if (!value) {
                    return "Project selection is required.";
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
                      isLoading={loading}
                      isClearable
                      required
                    />
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                  </Fragment>
                )}
              </Field>

              <Field
                label='Maximum Items to Display'
                name='maxItems'
                defaultValue='10'
              >
                {({ fieldProps }) => (
                  <Fragment>
                    <Textfield
                      {...fieldProps}
                      type='number'
                      data-testid='nativeFormValidationTestNumber'
                    />
                  </Fragment>
                )}
              </Field>

              <Field
                name='experimental'
                label='Experimental'
              >
                {({ fieldProps }) => (
                  <Checkbox
                    {...fieldProps}
                    size='large'
                    label='Do not include with large datasets'
                  />
                )}
              </Field>
            </FormSection>

            <FormFooter>
              {submitting ? (
                <Spinner
                  interactionName='load'
                  label='Loading'
                />
              ) : (
                <Button
                  style={{ width: "100%" }}
                  type='submit'
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
