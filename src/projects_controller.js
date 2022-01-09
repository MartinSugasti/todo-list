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
        status: true
      },
      {
        description: 'Yosemite booking',
        date: '',
        priority: 3,
        status: false
      },
      {
        description: 'Car rental',
        date: '',
        priority: 3,
        status: false
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
        status: false
      },
      {
        description: 'Meeting with accountant',
        date: '04/01/2022',
        priority: 3,
        status: true
      },
      {
        description: 'Check company on register',
        date: '',
        priority: 5,
        status: false
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
        status: true
      },
      {
        description: 'Get info about aurora',
        date: '',
        priority: 3,
        status: false
      }
    ]
  }
];

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
      } else {
        return (a[property] === b[property]) ? 0 : (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      }
    }
  }

  return { getProjects, createProject, removeProject, collapseProject, sortProject };
})();

export default projectsController;
