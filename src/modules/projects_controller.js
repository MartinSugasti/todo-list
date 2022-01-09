import localStorageController from "./local_storage_controller.js";
import tasksController from "./tasks_controller.js";
import defaultProjects from "./default_projects.js";

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
    let newProject = {
      title: title,
      sort: 'description',
      collapse: true,
      tasks: []
    };
    let projects = localStorageController.getLocalStorage();
    projects.push(newProject);

    localStorageController.updateLocalStorage(projects);
  }

  function removeProject(index) {
    let projects = localStorageController.getLocalStorage();
    projects.splice(index, 1);

    localStorageController.updateLocalStorage(projects);
  }

  function collapseProject(index, collapse) {
    let projects = localStorageController.getLocalStorage();
    projects[index].collapse = !collapse;

    localStorageController.updateLocalStorage(projects);
  }

  function sortProject(index, property) {
    let projects = localStorageController.getLocalStorage();
    let project = projects[index];
    let tasks = project.tasks;
    tasks.sort(compare(property));
    project.sort = property;

    localStorageController.updateLocalStorage(projects);
  }

  function compare(property) {
    return function (a, b) {
      if (typeof a[property] === 'boolean') {
        return (a[property] === b[property]) ? 0 : a[property] ? -1 : 1;
      } else if (typeof a[property] === 'string') {
        let aLower = a[property].toLowerCase()
        let bLower = b[property].toLowerCase()
        return (aLower === bLower) ? 0 : (aLower < bLower) ? -1 : (aLower > b[property]) ? 1 : 0;
      } else {
        return (a[property] === b[property]) ? 0 : (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      }
    }
  }

  function addTask(index, description, date, priority, status) {
    let projects = localStorageController.getLocalStorage();
    let project = projects[index];
    let tasks = project.tasks;
    let task = tasksController.createTask(description, date, priority, status);
    tasks.push(task);

    localStorageController.updateLocalStorage(projects);
    sortProject(index, project.sort);
  }

  function removeTask(projectIndex, taskIndex) {
    let projects = localStorageController.getLocalStorage();
    let project = projects[projectIndex];
    let tasks = project.tasks;
    tasks.splice(taskIndex, 1);

    localStorageController.updateLocalStorage(projects);
  }

  function editTask(projectIndex, taskIndex, description, date, priority, status) {
    let projects = localStorageController.getLocalStorage();
    let project = projects[projectIndex];
    let tasks = project.tasks;
    tasks[taskIndex] = tasksController.createTask(description, date, priority, status);

    localStorageController.updateLocalStorage(projects);
  }

  function getTask(projectIndex, taskIndex) {
    let projects = localStorageController.getLocalStorage();
    let project = projects[projectIndex];
    let tasks = project.tasks;
    return tasks[taskIndex];
  }

  return { getProjects, createProject, removeProject, collapseProject, sortProject, addTask, removeTask, editTask, getTask };
})();

export default projectsController;
