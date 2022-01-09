import localStorageController from "./local_storage_controller.js";

const projectsController = (() => {
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
    if (index > -1) {
      projects.splice(index, 1);
    }

    localStorageController.updateLocalStorage(projects);
  }

  return { createProject, removeProject };
})();

export default projectsController;
