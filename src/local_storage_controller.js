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

const localStorageController = (() => {
  function getLocalStorage() {
    let storedProjects = JSON.parse(localStorage.getItem('myProjects'));
    let preloadedProjects = storedProjects === null ? defaultProjects : storedProjects;

    return preloadedProjects;
  }

  function updateLocalStorage(projects) {
    localStorage.setItem('myProjects', JSON.stringify(projects));
  }

  return { getLocalStorage, updateLocalStorage };
})();

export default localStorageController;
