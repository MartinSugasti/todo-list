const tasksController = (() => {
  function createTask(description, date, priority, status) {
    if (date === '') {
      date = '-';
    }
    if (status === 'on') {
      status = true;
    }
    return {
      description: description,
      date: date,
      priority: parseInt(priority),
      status: status
    };
  }

  return { createTask };
})();

export default tasksController;
