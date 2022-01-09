import projectsController from "./projects_controller.js";

const displayController = (() => {
  function addBasicFunctionality() {
    addNewProjectFunctionality();
  }

  function addNewProjectFunctionality() {
    document.getElementById("newProjectForm").addEventListener("submit", function(event){
      event.preventDefault();

      let newProjectTitle = document.getElementById('new-project-title').value;
      projectsController.createProject(newProjectTitle)

      displayProjects();
      closeAllModals();
    });
  }

  // I took this function from https://stackoverflow.com/questions/46577690/hide-bootstrap-modal-using-pure-javascript-on-click
  function closeAllModals() {
    // get modals
    const modals = document.getElementsByClassName('modal');

    // on every modal change state like in hidden modal
    for(let i=0; i<modals.length; i++) {
      modals[i].classList.remove('show');
      modals[i].setAttribute('aria-hidden', 'true');
      modals[i].setAttribute('style', 'display: none');
    }

    // get modal backdrops
    const modalsBackdrops = document.getElementsByClassName('modal-backdrop');

    // remove every modal backdrop
    for(let i=0; i<modalsBackdrops.length; i++) {
      document.body.removeChild(modalsBackdrops[i]);
    }

    // remove modal-open from body
    document.body.classList.remove('modal-open');
  }

  function displayProjects() {
    let container = document.getElementById('container');
    container.innerHTML = '';
    let projects = projectsController.getProjects();

    projects.forEach((project, index) => {
      // table
      let table = document.createElement('table');
      table.classList.add('table', 'table-striped', 'table-bordered');
      container.appendChild(table);

      // thead
      let thead = document.createElement('thead');
      table.appendChild(thead);

      // first tr
      let tr = document.createElement('tr');
      thead.appendChild(tr);

      let th = document.createElement('th');
      th.classList.add('text-center', 'table-dark', 'p-2');
      th.setAttribute("colspan", "5");
      tr.appendChild(th);

      let div = document.createElement('div');
      div.classList.add('d-flex', 'justify-content-between');
      th.appendChild(div);

      // div to show sort options
      let sortDiv = document.createElement('div');
      sortDiv.classList.add('align-items-center', 'd-flex');
      div.appendChild(sortDiv);

      // alhpa sort span
      appendSpanToElement(
        sortDiv,
        ['mx-2', 'resize-on-hover'],
        {'data-index': index},
        ['fas', 'fa-sort-alpha-down', `${project.sort === 'description' ? 'text-secondary' : null }`],
        {},
        function() {
          projectsController.sortProject(index, 'description');
          displayProjects();
        }
      )

      // date sort span
      appendSpanToElement(
        sortDiv,
        ['mx-2', 'resize-on-hover'],
        {'data-index': index},
        ['fas', 'fa-calendar-alt', `${project.sort === 'date' ? 'text-secondary' : null }`],
        {},
        function() {
          projectsController.sortProject(index, 'date');
          displayProjects();
        }
      )

      // priority sort span
      appendSpanToElement(
        sortDiv,
        ['mx-2', 'resize-on-hover'],
        {'data-index': index},
        ['fas', 'fa-exclamation', `${project.sort === 'priority' ? 'text-secondary' : null }`],
        {},
        function() {
          projectsController.sortProject(index, 'priority');
          displayProjects();
        }
      )

      // status sort span
      appendSpanToElement(
        sortDiv,
        ['mx-2', 'resize-on-hover'],
        {'data-index': index},
        ['fas', 'fa-tasks', `${project.sort === 'status' ? 'text-secondary' : null }`],
        {},
        function() {
          projectsController.sortProject(index, 'status');
          displayProjects();
        }
      )

      // div to show project name and collapse option
      let titleDiv = document.createElement('div');
      titleDiv.classList.add('align-items-center', 'd-flex');
      div.appendChild(titleDiv);

      // project name span
      let titleSpan = document.createElement('span');
      titleSpan.classList.add('mb-0', 'mx-3', 'h3');
      titleSpan.innerHTML = project.title;
      titleDiv.appendChild(titleSpan);

      // collapse span
      appendSpanToElement(
        titleDiv,
        ['text-light', 'resize-on-hover'],
        {'data-index': index},
        ['fas', `fa-chevron-circle-${project.collapse ? 'down' : 'up' }`],
        {},
        function() {
          projectsController.collapseProject(index, project.collapse);
          displayProjects();
        }
      )

      // actions div
      let actionsDiv = document.createElement('div');
      actionsDiv.classList.add('align-items-center', 'd-flex');
      div.appendChild(actionsDiv);

      // add task span
      appendSpanToElement(
        actionsDiv,
        ['mx-3', 'resize-on-hover'],
        {'data-index': index},
        ['fas', 'fa-plus-circle'],
        {"title": "Add a task"}
      )

      // remove project span
      appendSpanToElement(
        actionsDiv,
        ['mx-3', 'resize-on-hover'],
        {'data-index': index},
        ['fas', 'fa-trash-alt'],
        {},
        function() {
          projectsController.removeProject(index);
          displayProjects();
        }
      )

      // add body if project is not collapsed
      if (!project.collapse) {
        let lastTr = document.createElement('tr');
        thead.appendChild(lastTr);

        ['Task', 'Date', 'Priority', 'Status', 'Actions'].forEach((columnName) => {
          let columnHeader = document.createElement('th');
          columnHeader.classList.add('text-center', `${columnName === 'Task' ? 'col-4' : 'col-2'}`);
          columnHeader.innerHTML = columnName;
          lastTr.appendChild(columnHeader);
        });

        let tbody = document.createElement('tbody');
        tbody.classList.add('border-top-0');
        table.appendChild(tbody);

        project.tasks.forEach((task, taskIndex) =>{
          appendTaskToBody(tbody, task, taskIndex);
        })
      }
    });
  }

  function appendSpanToElement(element, spanClasses, spanAttributes, iClasses, iAttributes, functionOnClick) {
    let span = document.createElement('span');
    span.classList.add(...spanClasses);
    Object.entries(spanAttributes).forEach(([attribute, value]) => {
      span.setAttribute(attribute, value);
    })
    if (functionOnClick !== undefined) {
      span.addEventListener("click", functionOnClick);
    }
    element.appendChild(span);

    let i = document.createElement('i');
    i.classList.add(...iClasses);
    Object.entries(iAttributes).forEach(([attribute, value]) => {
      i.setAttribute(attribute, value);
    })
    span.appendChild(i);
  }

  function appendTaskToBody(body, task, taskIndex) {
    let tr = document.createElement('tr');
    body.appendChild(tr);

    // description column
    let descriptionTd = document.createElement('td');
    descriptionTd.classList.add('align-middle');
    descriptionTd.innerHTML = task.description;
    tr.appendChild(descriptionTd);

    // date column
    let dateTd = document.createElement('td');
    dateTd.classList.add('align-middle', 'text-center');
    dateTd.innerHTML = task.date || '-';
    tr.appendChild(dateTd);

    // priority column
    let priorityTd = document.createElement('td');
    priorityTd.classList.add('align-middle', 'text-center');
    priorityTd.innerHTML = task.priority;
    tr.appendChild(priorityTd);

    // status column
    let statusTd = document.createElement('td');
    statusTd.classList.add('align-middle', 'text-center');
    tr.appendChild(statusTd);
    appendSpanToElement(
      statusTd,
      [`${task.status ? 'text-success' : 'text-danger'}`],
      {},
      ['fas', 'fa-check', `${task.status ? 'fa-check' : 'fa-times'}`],
      {}
    )

    // actions column
    let actionsTd = document.createElement('td');
    actionsTd.classList.add('align-middle', 'text-center');
    tr.appendChild(actionsTd);
    appendSpanToElement(
      actionsTd,
      ['mx-2', 'resize-on-hover'],
      {'data-index': taskIndex},
      ['fas', 'fa-edit'],
      {}
    )
    appendSpanToElement(
      actionsTd,
      ['mx-2', 'resize-on-hover'],
      {'data-index': taskIndex},
      ['fas', 'fa-trash-alt'],
      {}
    )
  }

  return { displayProjects, addBasicFunctionality };
})();

export default displayController;
