import { observer } from "mobx-react-lite";
import store from "../../../../shared/model/Store";
import { renderTasks } from "./renderTasks";

// Function to determine if a task is completed
const isCompleted = (task) => {
  return task.fields.status.statusCategory.key === "done";
};

export const TaskContainer = observer(() => {
  const tasksPerPage = store.tasksPerPage; // Get tasks per page from the store
  const taskHeight = 96; // Define static height for each task
  const containerHeight = (tasksPerPage + 1) * taskHeight + 60; // Calculate total height of the container

  const allTasks = store.tasks.issues; // Get all tasks from the store
  const startIndex = store.currentPage * tasksPerPage; // Calculate starting index for current page
  const endIndex = startIndex + tasksPerPage; // Calculate ending index
  const currentTasks = allTasks.slice(startIndex, endIndex); // Get tasks for the current page

  // Show a loading spinner if there are no current tasks
  if (!currentTasks) {
    return (
      <Spinner
        interactionName='loading'
        label='Loading'
      />
    );
  }

  // Filter active and completed tasks
  const activeTasks = currentTasks.filter((task) => !isCompleted(task));
  const completedTasks = currentTasks.filter((task) => isCompleted(task));

  return (
    <div style={{ minHeight: containerHeight }}>
      {!store.showCompleted && // Conditionally render active tasks
        renderTasks(
          activeTasks,
          false,
          "There is nothing here",
          "There is no active tasks",
          "success"
        )}

      {/* Always render completed tasks */}
      {renderTasks(
        completedTasks,
        true,
        "There is nothing here",
        "There is no completed tasks",
        "discovery"
      )}
    </div>
  );
});
