import store from "../../../../shared/model/Store";
import SectionMessage from "@atlaskit/section-message";
import { TaskCard } from "../TaskCard";

export const renderTasks = (
  tasks,
  isCompleted,
  emptyMessageTitle,
  emptyMessage,
  appearance
) => {
  if (!tasks || tasks.length === 0) {
    return (
      <div style={{ width: "100%", marginBottom: "25px", height: "80px" }}>
        <SectionMessage
          appearance={appearance}
          title={emptyMessageTitle}
        >
          <p>{emptyMessage}</p>
        </SectionMessage>
      </div>
    );
  }

  return tasks.map((task) => (
    <TaskCard
      key={task.key}
      task={{
        key: task.key,
        summary: task.fields.summary,
        status: isCompleted,
      }}
      onDelete={() => store.removeTask(task.key)}
      onToggleComplete={() => store.toggleTaskCompletion(task.key)}
    />
  ));
};
