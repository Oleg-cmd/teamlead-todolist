import React, { useEffect } from "react";
import store from "../shared/model/Store.js";
import Navigation from "../shared/ui/nav/Navigation.jsx";
import { Tasks } from "../entities/tasks/ui/Tasks.jsx";
import { ProjectForm } from "../entities/project/ui/ProjectForm.jsx";
import { observer } from "mobx-react-lite";

/**
 * Main application component that manages navigation and renders
 * the appropriate content based on the active tab.
 */
const App = observer(() => {
  const { fetchProjects, activeTab } = store;

  // Fetch projects when the component mounts
  useEffect(() => {
    fetchProjects();
  }, []);

  // Render content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case "projects":
        return <ProjectForm />; // Render ProjectForm for projects tab
      case "tasks":
        return <Tasks />; // Render Tasks for tasks tab
      default:
        return "projects"; // Default case, can be modified as needed
    }
  };

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <Navigation /> {/* Navigation component */}
      <div style={{ marginTop: "50px", marginLeft: "100px" }}>
        {renderContent()} {/* Render the appropriate content */}
      </div>
    </div>
  );
});

export default App;
