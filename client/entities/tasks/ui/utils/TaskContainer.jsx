import { observer } from "mobx-react-lite";
import store from "../../../../shared/model/Store";
import { renderTasks } from "./renderTasks";

const isCompleted = (task) => {
  return task.fields.status.statusCategory.key === "done";
};

export const TaskContainer = observer(() => {
  const tasksPerPage = store.tasksPerPage;
  // static height
  const taskHeight = 96;
  const containerHeight = (tasksPerPage + 1) * taskHeight + 60;

  const allTasks = store.tasks.issues;
  const startIndex = store.currentPage * tasksPerPage;
  const endIndex = startIndex + tasksPerPage;
  const currentTasks = allTasks.slice(startIndex, endIndex);

  if (!currentTasks) {
    return (
      <Spinner
        interactionName='loading'
        label='Loading'
      />
    );
  }

  const activeTasks = currentTasks.filter((task) => !isCompleted(task));
  const completedTasks = currentTasks.filter((task) => isCompleted(task));

  return (
    <div style={{ minHeight: containerHeight }}>
      {!store.showCompleted &&
        renderTasks(
          activeTasks,
          false,
          "There is nothing here",
          "There is no active tasks",
          "success"
        )}

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
