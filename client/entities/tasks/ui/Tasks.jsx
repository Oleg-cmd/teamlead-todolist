import React from "react";
import store from "../../../shared/model/Store";

import Button from "@atlaskit/button";
import { TaskContainer } from "./utils/TaskContainer";
import { PaginationContainer } from "./utils/PaginationContainer";

export const Tasks = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "400px",
      }}
    >
      <Button
        appearance='primary'
        onClick={() => store.toggleShowCompleted()}
        style={{ marginBottom: "10px", width: "100%" }}
      >
        {store.showCompleted ? "Show all" : "Show completed"}
      </Button>
      <TaskContainer />
      <PaginationContainer />
    </div>
  );
};
