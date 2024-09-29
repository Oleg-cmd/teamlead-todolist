import { action, makeAutoObservable } from "mobx";
import { getProjects } from "../../entities/project/api/getProjects";
import { findTasks } from "../../entities/tasks/api/findTasks";
import { getCount } from "../../entities/tasks/api/getCount";

class Store {
  tasks = { issues: [] };
  projects = [];
  loading = true;
  activeTab = "projects";
  showCompleted = false;
  tasksPerPage = 10;
  projectKey = "";
  currentPage = 0;
  loaded = [0];
  experimental = false;
  taskCount = 0;

  constructor() {
    makeAutoObservable(this, {
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

  setExperimental = (experiment) => {
    this.experimental = experiment;
  };

  setTaskCount = (count) => {
    this.taskCount = count;
  };

  setCurrentPage(page) {
    this.currentPage = page;
  }

  toggleShowCompleted() {
    this.showCompleted = !this.showCompleted;
  }

  setMaxPage = (count) => {
    this.maxPage = count;
  };

  setTasksPerPage = (count) => {
    // hope user is not genius
    this.tasksPerPage = Number.parseInt(count);
  };

  setTasks = (apiTasks) => {
    this.tasks = apiTasks;
  };

  setProjects = (apiProjects) => {
    this.projects = apiProjects;
  };

  setLoading = (isLoading) => {
    this.loading = isLoading;
  };

  setActiveTab = (tab) => {
    this.activeTab = tab;
  };

  setProjectKey = (key) => {
    this.projectKey = key;
  };

  removeTask(taskKey) {
    this.tasks.issues = this.tasks.issues.filter(
      (task) => task.key !== taskKey
    );
  }

  toggleTaskCompletion(taskKey) {
    const task = this.tasks.issues.find((task) => task.key === taskKey);
    if (task && task.fields) {
      const currentStatus = task.fields.status;

      if (!currentStatus.oldStatus) {
        if (currentStatus.statusCategory?.key === "done") {
          currentStatus.oldStatus = "temp";
        } else {
          currentStatus.oldStatus = currentStatus.statusCategory?.key;
        }
      }

      if (currentStatus.statusCategory.key === "done") {
        task.fields.status.statusCategory.key = currentStatus.oldStatus;
        console.log(
          `Задача ${taskKey} возвращена в статус "${currentStatus.oldStatus}"`
        );
      } else {
        currentStatus.oldStatus = currentStatus.statusCategory?.key;
        task.fields.status.statusCategory.key = "done";
        console.log(
          `Задача ${taskKey} переведена из статуса ${currentStatus.oldStatus} в статус ${task.fields.status.statusCategory.key}`
        );
      }
    }
  }

  fetchCount = async () => {
    const data = await getCount(this.projectKey);
    this.setTaskCount(data.count);
  };

  fetchTasks = async () => {
    const data = await findTasks(
      this.projectKey,
      this.experimental ? this.taskCount : this.tasksPerPage,
      0
    );
    this.setTasks(data);
    this.setActiveTab("tasks");
  };

  addTasks = async () => {
    if (this.experimental) {
      return;
    }

    if (this.loaded.includes(this.currentPage)) {
      // console.log("exists");
      return;
    }

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

  updateTasksIssues = (newIssues) => {
    if (this.experimental) {
      return;
    }

    const existingKeys = new Set(this.tasks.issues.map((task) => task.key));
    const uniqueNewIssues = newIssues.filter(
      (issue) => !existingKeys.has(issue.key)
    );
    this.tasks.issues = [...this.tasks.issues, ...uniqueNewIssues];
  };

  fetchProjects = async () => {
    this.setLoading(true);
    const data = await getProjects();
    this.setProjects(data);
    this.setLoading(false);
  };
}

const store = new Store();
export default store;
