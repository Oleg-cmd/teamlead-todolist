import store from "../../../../shared/model/Store";
import Pagination from "@atlaskit/pagination";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

/**
 * PaginationContainer component for managing pagination of tasks.
 * It utilizes MobX for state management and Atlassian's pagination component.
 */
export const PaginationContainer = observer(() => {
  const [currentPage, setCurrentPage] = useState(0); // State to track the current page
  const totalPages = Math.ceil(store.taskCount / store.tasksPerPage); // Calculate total pages based on task count and tasks per page

  // Effect to update the store when the current page changes
  useEffect(() => {
    store.setCurrentPage(currentPage); // Set the current page in the store
    store.addTasks(); // Fetch tasks for the new page
  }, [currentPage]);

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Pagination
        pages={Array.from({ length: totalPages }, (_, i) => i + 1)} // Create an array of page numbers
        nextLabel='Next' // Label for the next button
        label='Page' // Label for pagination
        pageLabel='Page' // Label for individual page numbers
        selectedPage={currentPage} // Current selected page
        onChange={(event, page) => setCurrentPage(page - 1)} // Update current page on change
      />
    </div>
  );
});
