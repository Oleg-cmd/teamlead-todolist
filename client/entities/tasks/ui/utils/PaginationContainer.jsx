import store from "../../../../shared/model/Store";
import Pagination from "@atlaskit/pagination";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

export const PaginationContainer = observer(() => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(store.taskCount / store.tasksPerPage);

  useEffect(() => {
    store.setCurrentPage(currentPage);
    store.addTasks();
  }, [currentPage]);

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Pagination
        pages={Array.from({ length: totalPages }, (_, i) => i + 1)}
        nextLabel='Next'
        label='Page'
        pageLabel='Page'
        selectedPage={currentPage}
        onChange={(event, page) => setCurrentPage(page - 1)}
      />
    </div>
  );
});
