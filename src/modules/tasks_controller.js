const tasksController = (() => {
  function createTask(description, date, priority, status) {
    let formattedDate;
    if (date === '') {
      formattedDate = '-';
    }

    let formattedStatus;
    if (status === 'on') {
      formattedStatus = true;
    }

    return {
      description,
      date: formattedDate,
      priority: parseInt(priority, 10),
      status: formattedStatus,
    };
  }

  return { createTask };
})();

export default tasksController;
