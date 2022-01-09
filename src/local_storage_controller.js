const localStorageController = (() => {
  function getLocalStorage() {
    return JSON.parse(localStorage.getItem('myProjects'));
  }

  function updateLocalStorage(projects) {
    localStorage.setItem('myProjects', JSON.stringify(projects));
  }

  return { getLocalStorage, updateLocalStorage };
})();

export default localStorageController;
