import localStorageController from "./local_storage_controller.js";

const defaultProjects = [
  {
    title: 'USA Trip',
    sort: 'description',
    collapse: false,
    tasks: [
      {
        description: 'Buy tickets',
        date: '04/06/2022',
        priority: 5,
        done: true
      },
      {
        description: 'Yosemite booking',
        date: '',
        priority: 3,
        done: false
      },
      {
        description: 'Car rental',
        date: '',
        priority: 3,
        done: false
      }
    ]
  },
  {
    title: 'Open unipersonal company',
    sort: 'priority',
    collapse: true,
    tasks: [
      {
        description: 'Register in Taxes Administrator',
        date: '10/02/2022',
        priority: 5,
        done: false
      },
      {
        description: 'Meeting with accountant',
        date: '04/01/2022',
        priority: 3,
        done: true
      },
      {
        description: 'Check company on register',
        date: '',
        priority: 5,
        done: false
      }
    ]
  },
  {
    title: 'Norway Trip',
    sort: 'date',
    collapse: false,
    tasks: [
      {
        description: 'Buy tickets',
        date: '04/09/2022',
        priority: 5,
        done: true
      },
      {
        description: 'Get info about aurora',
        date: '',
        priority: 3,
        done: false
      }
    ]
  }
];

const projectsController = (() => {
  function getProjects() {
    let storedProjects = localStorageController.getLocalStorage();
    let preloadedProjects = storedProjects === null ? defaultProjects : storedProjects;

    return preloadedProjects;
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
    if (index > -1) {
      projects.splice(index, 1);
    }

    localStorageController.updateLocalStorage(projects);
  }

  function collapseProject(index, collapse) {
    let projects = localStorageController.getLocalStorage();
    if (index > -1) {
      projects[index].collapse = !collapse;
    }

    localStorageController.updateLocalStorage(projects);
  }

  return { getProjects, createProject, removeProject, collapseProject };
})();

export default projectsController;
