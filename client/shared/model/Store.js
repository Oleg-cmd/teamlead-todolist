import { action, makeAutoObservable } from "mobx";
import { getProjects } from "../../entities/project/api/getProjects";
import { findTasks } from "../../entities/tasks/api/findTasks";
import { getCount } from "../../entities/tasks/api/getCount";
import { deleteTask } from "../../entities/tasks/api/deleteTask";

class Store {
  // Store state variables
  tasks = { issues: [] };
  projects = [];
  loading = true;
  activeTab = "projects";
  showCompleted = false;
  tasksPerPage = 10;
  projectKey = "";
  currentPage = 0;
  loaded = [0];
  taskCount = 0;

  experimental = false;
  real = false;

  constructor() {
    makeAutoObservable(this, {
      // Bind actions for MobX
      setTasks: action.bound,
      setProjects: action.bound,
      setLoading: action.bound,
      fetchTasks: action.bound,
      fetchProjects: action.bound,
      setActiveTab: action.bound,
      toggleTaskCompletion: action.bound,
      removeTask: action.bound,
      toggleShowCompleted: action.bound,
      setTasksPerPage: action.bound,
      setProjectKey: action.bound,
      setCurrentPage: action.bound,
      updateTasksIssues: action.bound,
      addTasks: action.bound,
      setExperimental: action.bound,
      setTaskCount: action.bound,
    });
  }

  // Set experimental mode
  setExperimental = (experiment) => {
    this.experimental = experiment;
  };

  // Set experimental mode
  setReal = (isReal) => {
    this.real = isReal;
  };

  // Update task count
  setTaskCount = (count) => {
    this.taskCount = count;
  };

  // Update current page for pagination
  setCurrentPage(page) {
    this.currentPage = page;
  }

  // Toggle visibility of completed tasks
  toggleShowCompleted() {
    this.showCompleted = !this.showCompleted;
  }

  // Set the number of tasks displayed per page
  setTasksPerPage = (count) => {
    this.tasksPerPage = Number.parseInt(count);
  };

  // Update tasks from API
  setTasks = (apiTasks) => {
    this.tasks = apiTasks;
  };

  // Update projects from API
  setProjects = (apiProjects) => {
    this.projects = apiProjects;
  };

  // Set loading state
  setLoading = (isLoading) => {
    this.loading = isLoading;
  };

  // Set the currently active tab
  setActiveTab = (tab) => {
    this.activeTab = tab;
  };

  // Update the project key used in API calls
  setProjectKey = (key) => {
    this.projectKey = key;
  };

  // Remove a task by its key
  removeTask = async (taskKey) => {
    const currentTask = this.tasks.issues.find((task) => task.key === taskKey);

    if (this.real) {
      await deleteTask(currentTask.id);
    }

    this.tasks.issues = this.tasks.issues.filter(
      (task) => task.key !== taskKey
    );
  };

  // Toggle task completion status
  toggleTaskCompletion(taskKey) {
    const task = this.tasks.issues.find((task) => task.key === taskKey);
    if (task && task.fields) {
      const currentStatus = task.fields.status;

      // Save old status if it’s the first toggle
      if (!currentStatus.oldStatus) {
        if (currentStatus.statusCategory?.key === "done") {
          currentStatus.oldStatus = "temp";
        } else {
          currentStatus.oldStatus = currentStatus.statusCategory?.key;
        }
      }

      // Toggle the completion status
      if (currentStatus.statusCategory.key === "done") {
        task.fields.status.statusCategory.key = currentStatus.oldStatus;
        console.log(
          `Task ${taskKey} returned in status "${currentStatus.oldStatus}"`
        );
      } else {
        currentStatus.oldStatus = currentStatus.statusCategory?.key;
        task.fields.status.statusCategory.key = "done";
        console.log(
          `Task ${taskKey} moved from status ${currentStatus.oldStatus} to ${task.fields.status.statusCategory.key}`
        );
      }
    }
  }

  // Fetch the count of tasks
  fetchCount = async () => {
    const data = await getCount(this.projectKey);
    this.setTaskCount(data.count);
  };

  // Fetch tasks based on project key and pagination
  fetchTasks = async () => {
    const data = await findTasks(
      this.projectKey,
      this.experimental ? this.taskCount : this.tasksPerPage,
      0
    );
    this.setTasks(data);
    this.setActiveTab("tasks");
  };

  // Add more tasks if they haven't been loaded yet
  addTasks = async () => {
    if (this.experimental || this.loaded.includes(this.currentPage)) return;

    const data = await findTasks(
      this.projectKey,
      this.tasksPerPage,
      this.currentPage * this.tasksPerPage
    );
    if (data && data.issues) {
      this.updateTasksIssues(data.issues);
      this.loaded.push(this.currentPage);
    }
  };

  // Update the list of issues with new tasks
  updateTasksIssues = (newIssues) => {
    if (this.experimental) return;

    const existingKeys = new Set(this.tasks.issues.map((task) => task.key));
    const uniqueNewIssues = newIssues.filter(
      (issue) => !existingKeys.has(issue.key)
    );
    this.tasks.issues = [...this.tasks.issues, ...uniqueNewIssues];
  };

  // Fetch projects and update loading state
  fetchProjects = async () => {
    this.setLoading(true);
    const data = await getProjects();
    this.setProjects(data);
    this.setLoading(false);
  };
}

const store = new Store();
export default store;
