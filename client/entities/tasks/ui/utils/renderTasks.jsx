import store from "../../../../shared/model/Store";
import SectionMessage from "@atlaskit/section-message";
import { TaskCard } from "../TaskCard";

/**
 * Renders a list of tasks or an empty message if there are no tasks.
 *
 * @param {Array} tasks - The list of tasks to render.
 * @param {boolean} isCompleted - Indicates if the tasks are completed.
 * @param {string} emptyMessageTitle - Title for the empty message section.
 * @param {string} emptyMessage - Message to display when no tasks are present.
 * @param {string} appearance - Appearance style for the empty message.
 * @returns {JSX.Element} The rendered tasks or an empty message.
 */

export const renderTasks = (
  tasks,
  isCompleted,
  emptyMessageTitle,
  emptyMessage,
  appearance
) => {
  // Check if there are no tasks to render
  if (!tasks || tasks.length === 0) {
    return (
      <div style={{ width: "100%", marginBottom: "25px", height: "80px" }}>
        <SectionMessage
          appearance={appearance}
          title={emptyMessageTitle} // Display the title of the empty message
        >
          <p>{emptyMessage}</p>
        </SectionMessage>
      </div>
    );
  }

  // Render TaskCard components for each task
  return tasks.map((task) => (
    <TaskCard
      key={task.key} // Unique key for each task
      task={{
        key: task.key,
        summary: task.fields.summary,
        status: isCompleted, // Pass the completion status
      }}
      onDelete={() => store.removeTask(task.key)} // Handle delete action
      onToggleComplete={() => store.toggleTaskCompletion(task.key)} // Handle completion toggle
    />
  ));
};
