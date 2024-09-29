import React, { useEffect } from "react";

import store from "../shared/model/Store.js";
import Navigation from "../shared/ui/nav/Navigation.jsx";

import { Tasks } from "../entities/tasks/ui/Tasks.jsx";
import { ProjectForm } from "../entities/project/ui/ProjectForm.jsx";
import { observer } from "mobx-react-lite";

const App = observer(() => {
  const { fetchProjects, activeTab } = store;
  useEffect(() => {
    fetchProjects();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "projects":
        return <ProjectForm />;
      case "tasks":
        return <Tasks />;
      default:
        return "projects";
    }
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
      }}
    >
      <Navigation />
      <div style={{ marginTop: "50px", marginLeft: "100px" }}>
        {renderContent()}
      </div>
    </div>
  );
});

export default App;
