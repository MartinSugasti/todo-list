import projectsController from './projects_controller';

const displayController = (() => {
  function removeTaskInfoFromTaskModal() {
    document.getElementById('task-index').value = '';
    document.getElementById('task-description').value = '';
    document.getElementById('task-date').value = '';
    document.getElementById('task-priority').value = '';
    document.getElementById('task-status').checked = false;
  }

  function addProjectInfoToTaskModal(index) {
    const projectIndexInput = document.getElementById('task-project-index');
    projectIndexInput.setAttribute('value', index);
  }

  function addTaskInfoToTaskModal(projectIndex, taskIndex) {
    const taskIndexInput = document.getElementById('task-index');
    taskIndexInput.setAttribute('value', taskIndex);

    const task = projectsController.getTask(projectIndex, taskIndex);
    document.getElementById('task-description').value = task.description;
    document.getElementById('task-date').value = task.date;
    document.getElementById('task-priority').value = task.priority;
    document.getElementById('task-status').checked = task.status;
  }

  function appendSpanToElement(
    element,
    spanClasses,
    spanAttributes,
    iClasses,
    iAttributes,
    functionOnClick
  ) {
    const span = document.createElement('span');
    span.classList.add(...spanClasses);
    Object.entries(spanAttributes).forEach(([attribute, value]) => {
      span.setAttribute(attribute, value);
    });
    if (functionOnClick !== undefined) {
      span.addEventListener('click', functionOnClick);
    }
    element.appendChild(span);

    const i = document.createElement('i');
    i.classList.add(...iClasses);
    Object.entries(iAttributes).forEach(([attribute, value]) => {
      i.setAttribute(attribute, value);
    });
    span.appendChild(i);
  }

  function appendTaskToBody(body, projectIndex, task, taskIndex) {
    const tr = document.createElement('tr');
    body.appendChild(tr);

    // description column
    const descriptionTd = document.createElement('td');
    descriptionTd.classList.add('align-middle', 'text-center');
    descriptionTd.innerHTML = task.description;
    tr.appendChild(descriptionTd);

    // date column
    const dateTd = document.createElement('td');
    dateTd.classList.add('align-middle', 'text-center');
    dateTd.innerHTML = task.date || '-';
    tr.appendChild(dateTd);

    // priority column
    const priorityTd = document.createElement('td');
    priorityTd.classList.add('align-middle', 'text-center');
    priorityTd.innerHTML = task.priority;
    tr.appendChild(priorityTd);

    // status column
    const statusTd = document.createElement('td');
    statusTd.classList.add('align-middle', 'text-center');
    tr.appendChild(statusTd);
    appendSpanToElement(
      statusTd,
      [`${task.status ? 'text-success' : 'text-danger'}`],
      {},
      ['fas', 'fa-check', `${task.status ? 'fa-check' : 'fa-times'}`],
      {}
    );

    // actions column
    const actionsTd = document.createElement('td');
    actionsTd.classList.add('align-middle', 'text-center');
    tr.appendChild(actionsTd);
    appendSpanToElement(
      actionsTd,
      ['mx-2', 'resize-on-hover'],
      { 'data-toggle': 'modal', 'data-target': '#taskModal' },
      ['fas', 'fa-edit'],
      {},
      () => {
        addProjectInfoToTaskModal(projectIndex);
        addTaskInfoToTaskModal(projectIndex, taskIndex);
      }
    );
    appendSpanToElement(
      actionsTd,
      ['mx-2', 'resize-on-hover'],
      { 'data-index': taskIndex },
      ['fas', 'fa-trash-alt'],
      {},
      () => {
        projectsController.removeTask(projectIndex, taskIndex);
        displayProjects();
      }
    );
  }

  function displayProjects() {
    const container = document.getElementById('container');
    container.innerHTML = '';
    const projects = projectsController.getProjects();

    projects.forEach((project, index) => {
      // table
      const table = document.createElement('table');
      table.classList.add('table', 'table-striped', 'table-light', 'mb-5');
      container.appendChild(table);

      // thead
      const thead = document.createElement('thead');
      table.appendChild(thead);

      // first tr
      const tr = document.createElement('tr');
      thead.appendChild(tr);

      const th = document.createElement('th');
      th.classList.add('border-0', 'text-center', 'table-dark', 'p-2');
      th.setAttribute('colspan', '5');
      tr.appendChild(th);

      const div = document.createElement('div');
      div.classList.add('d-flex', 'justify-content-between');
      th.appendChild(div);

      // div to show sort options
      const sortDiv = document.createElement('div');
      sortDiv.classList.add('align-items-center', 'd-flex');
      div.appendChild(sortDiv);

      // alhpa sort span
      appendSpanToElement(
        sortDiv,
        ['mx-2', 'resize-on-hover'],
        { 'data-index': index },
        [
          'fas',
          'fa-sort-alpha-down',
          `${project.sort === 'description' ? 'text-secondary' : null}`,
        ],
        {},
        () => {
          projectsController.sortProject(index, 'description');
          displayProjects();
        }
      );

      // date sort span
      appendSpanToElement(
        sortDiv,
        ['mx-2', 'resize-on-hover'],
        { 'data-index': index },
        ['fas', 'fa-calendar-alt', `${project.sort === 'date' ? 'text-secondary' : null}`],
        {},
        () => {
          projectsController.sortProject(index, 'date');
          displayProjects();
        }
      );

      // priority sort span
      appendSpanToElement(
        sortDiv,
        ['mx-2', 'resize-on-hover'],
        { 'data-index': index },
        ['fas', 'fa-exclamation', `${project.sort === 'priority' ? 'text-secondary' : null}`],
        {},
        () => {
          projectsController.sortProject(index, 'priority');
          displayProjects();
        }
      );

      // status sort span
      appendSpanToElement(
        sortDiv,
        ['mx-2', 'resize-on-hover'],
        { 'data-index': index },
        ['fas', 'fa-tasks', `${project.sort === 'status' ? 'text-secondary' : null}`],
        {},
        () => {
          projectsController.sortProject(index, 'status');
          displayProjects();
        }
      );

      // div to show project name and collapse option
      const titleDiv = document.createElement('div');
      titleDiv.classList.add('align-items-center', 'd-flex');
      div.appendChild(titleDiv);

      // project name span
      const titleSpan = document.createElement('span');
      titleSpan.classList.add('mb-0', 'mx-3', 'h3');
      titleSpan.innerHTML = project.title;
      titleDiv.appendChild(titleSpan);

      // collapse span
      appendSpanToElement(
        titleDiv,
        ['text-light', 'resize-on-hover'],
        { 'data-index': index },
        ['fas', `fa-chevron-circle-${project.collapse ? 'down' : 'up'}`],
        {},
        () => {
          projectsController.collapseProject(index, project.collapse);
          displayProjects();
        }
      );

      // actions div
      const actionsDiv = document.createElement('div');
      actionsDiv.classList.add('align-items-center', 'd-flex');
      div.appendChild(actionsDiv);

      // add task span
      appendSpanToElement(
        actionsDiv,
        ['mx-3', 'resize-on-hover'],
        { 'data-toggle': 'modal', 'data-target': '#taskModal' },
        ['fas', 'fa-plus-circle'],
        { title: 'Add a task' },
        () => {
          // this function is on here in order to remove taskIndex from modal
          // if the modal was previosuly shown to edit a task
          removeTaskInfoFromTaskModal();
          addProjectInfoToTaskModal(index);
        }
      );

      // remove project span
      appendSpanToElement(
        actionsDiv,
        ['mx-3', 'resize-on-hover'],
        { 'data-index': index },
        ['fas', 'fa-trash-alt'],
        {},
        () => {
          projectsController.removeProject(index);
          displayProjects();
        }
      );

      // add body if project is not collapsed
      if (!project.collapse) {
        const lastTr = document.createElement('tr');
        lastTr.classList.add('border-0');
        thead.appendChild(lastTr);

        ['Task', 'Date', 'Priority', 'Status', 'Actions'].forEach((columnName) => {
          const columnHeader = document.createElement('th');
          columnHeader.classList.add('text-center', `${columnName === 'Task' ? 'col-4' : 'col-2'}`);
          columnHeader.innerHTML = columnName;
          lastTr.appendChild(columnHeader);
        });

        const tbody = document.createElement('tbody');
        tbody.classList.add('border-0');
        table.appendChild(tbody);

        project.tasks.forEach((task, taskIndex) => {
          appendTaskToBody(tbody, index, task, taskIndex);
        });
      }
    });
  }

  // I took this function from https://stackoverflow.com/questions/46577690/hide-bootstrap-modal-using-pure-javascript-on-click
  function closeAllModals() {
    // get modals
    const modals = document.getElementsByClassName('modal');

    // on every modal change state like in hidden modal
    for (let i = 0; i < modals.length; i += 1) {
      modals[i].classList.remove('show');
      modals[i].setAttribute('aria-hidden', 'true');
      modals[i].setAttribute('style', 'display: none');
    }

    // get modal backdrops
    const modalsBackdrops = document.getElementsByClassName('modal-backdrop');

    // remove every modal backdrop
    for (let i = 0; i < modalsBackdrops.length; i += 1) {
      document.body.removeChild(modalsBackdrops[i]);
    }

    // remove modal-open from body
    document.body.classList.remove('modal-open');
  }

  function addNewProjectFunctionality() {
    document.getElementById('newProjectForm').addEventListener('submit', (event) => {
      event.preventDefault();

      const newProjectTitle = document.getElementById('new-project-title').value;
      projectsController.createProject(newProjectTitle);

      displayProjects();
      closeAllModals();
    });
  }

  function addTaskFunctionality() {
    document.getElementById('taskForm').addEventListener('submit', (event) => {
      event.preventDefault();

      const description = document.getElementById('task-description').value;
      const date = document.getElementById('task-date').value;
      const priority = document.getElementById('task-priority').value;
      const status = document.getElementById('task-status').checked;
      const projectIndex = document.getElementById('task-project-index').value;
      const taskIndex = document.getElementById('task-index').value;
      if (taskIndex !== '') {
        projectsController.editTask(projectIndex, taskIndex, description, date, priority, status);
      } else {
        projectsController.addTask(projectIndex, description, date, priority, status);
      }

      displayProjects();
      closeAllModals();
    });
  }

  function addBasicFunctionality() {
    addNewProjectFunctionality();
    addTaskFunctionality();
  }

  return { displayProjects, addBasicFunctionality };
})();

export default displayController;
