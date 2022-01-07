const displayController = (() => {
  function displayProjects(projects) {
    let container = document.getElementById('container');

    projects.forEach((project, index) => {
      // table
      let table = document.createElement('table');
      table.classList.add('table', 'table-striped', 'table-bordered', 'mt-4');
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
        {}
      )

      // date sort span
      appendSpanToElement(
        sortDiv,
        ['mx-2', 'resize-on-hover'],
        {'data-index': index},
        ['fas', 'fa-calendar-alt', `${project.sort === 'date' ? 'text-secondary' : null }`],
        {}
      )

      // priority sort span
      appendSpanToElement(
        sortDiv,
        ['mx-2', 'resize-on-hover'],
        {'data-index': index},
        ['fas', 'fa-exclamation', `${project.sort === 'priority' ? 'text-secondary' : null }`],
        {}
      )

      // status sort span
      appendSpanToElement(
        sortDiv,
        ['mx-2', 'resize-on-hover'],
        {'data-index': index},
        ['fas', 'fa-tasks', `${project.sort === 'status' ? 'text-secondary' : null }`],
        {}
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
        {}
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
        {}
      )

      // add body if project is not collapsed
      if (!project.collapse) {
        let lastTr = document.createElement('tr');
        thead.appendChild(lastTr);

        ['Task', 'Date', 'Priority', 'Status', 'Actions'].forEach((columnName) => {
          let columnHeader = document.createElement('th');
          columnHeader.classList.add('text-center');
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

    function appendSpanToElement(element, spanClasses, spanAttributes, iClasses, iAttributes) {
      let span = document.createElement('span');
      span.classList.add(...spanClasses);
      Object.entries(spanAttributes).forEach(([attribute, value]) => {
        span.setAttribute(attribute, value);
      })
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
        [`${task.done ? 'text-success' : 'text-danger'}`],
        {},
        ['fas', 'fa-check'],
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
  }

  return { displayProjects };
})();

export default displayController;
