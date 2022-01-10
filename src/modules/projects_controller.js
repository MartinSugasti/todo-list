import localStorageController from './local_storage_controller';
import tasksController from './tasks_controller';
import defaultProjects from './default_projects';

const projectsController = (() => {
  function getProjects() {
    let storedProjects = localStorageController.getLocalStorage();
    if (storedProjects === null) {
      storedProjects = defaultProjects;
      localStorageController.updateLocalStorage(defaultProjects);
    }

    return storedProjects;
  }

  function createProject(title) {
    const newProject = {
      title,
      sort: 'description',
      collapse: true,
      tasks: [],
    };
    const projects = localStorageController.getLocalStorage();
    projects.push(newProject);

    localStorageController.updateLocalStorage(projects);
  }

  function removeProject(index) {
    const projects = localStorageController.getLocalStorage();
    projects.splice(index, 1);

    localStorageController.updateLocalStorage(projects);
  }

  function collapseProject(index, collapse) {
    const projects = localStorageController.getLocalStorage();
    projects[index].collapse = !collapse;

    localStorageController.updateLocalStorage(projects);
  }

  function compare(property) {
    return function (a, b) {
      if (typeof a[property] === 'boolean') {
        if (a[property] === b[property]) {
          return 0;
        }

        if (a[property]) {
          return -1;
        }

        return 1;
      }
      if (typeof a[property] === 'string') {
        const aLower = a[property].toLowerCase();
        const bLower = b[property].toLowerCase();
        if (aLower === bLower) {
          return 0;
        }

        if (aLower < bLower) {
          return -1;
        }

        return 0;
      }
      if (a[property] === b[property]) {
        return 0;
      }
      if (a[property] < b[property]) {
        return -1;
      }
      if (a[property] > b[property]) {
        return 1;
      }

      return 0;
    };
  }

  function sortProject(index, property) {
    const projects = localStorageController.getLocalStorage();
    const project = projects[index];
    const { tasks } = project;
    tasks.sort(compare(property));
    project.sort = property;

    localStorageController.updateLocalStorage(projects);
  }

  function addTask(index, description, date, priority, status) {
    const projects = localStorageController.getLocalStorage();
    const project = projects[index];
    const { tasks } = project;
    const task = tasksController.createTask(description, date, priority, status);
    tasks.push(task);

    localStorageController.updateLocalStorage(projects);
    sortProject(index, project.sort);
  }

  function removeTask(projectIndex, taskIndex) {
    const projects = localStorageController.getLocalStorage();
    const project = projects[projectIndex];
    const { tasks } = project;
    tasks.splice(taskIndex, 1);

    localStorageController.updateLocalStorage(projects);
  }

  function editTask(projectIndex, taskIndex, description, date, priority, status) {
    const projects = localStorageController.getLocalStorage();
    const project = projects[projectIndex];
    const { tasks } = project;
    tasks[taskIndex] = tasksController.createTask(description, date, priority, status);

    localStorageController.updateLocalStorage(projects);
  }

  function getTask(projectIndex, taskIndex) {
    const projects = localStorageController.getLocalStorage();
    const project = projects[projectIndex];
    const { tasks } = project;
    return tasks[taskIndex];
  }

  return {
    getProjects,
    createProject,
    removeProject,
    collapseProject,
    sortProject,
    addTask,
    removeTask,
    editTask,
    getTask,
  };
})();

export default projectsController;
