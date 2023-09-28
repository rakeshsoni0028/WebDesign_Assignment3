let studentCounter = 4;


const initialise = function () {
  const name = document.getElementById('displayName');
  name.style.display = 'inline-block';

  const button = document.getElementById('button');
  button.disabled = true;
  button.id = 'button-disabled';

  for (let i = 0; i < 3; i++) {
    dropdown(i);
  }

  hideOtherColumns();
};

const hideOtherColumns = function () {
  const delCols = document.getElementsByClassName('dellCol');
  const edCols = document.getElementsByClassName('editCol');

  for (let i = 0; i < edCols.length; i++) {
    edCols[i].style.display = 'none';
  }

  for (let i = 0; i < delCols.length; i++) {
    delCols[i].style.display = 'none';
  }
};

const dropdown = function (id) {
  console.log(id);
  const element = document.getElementsByClassName('dropDownTextArea')[id];
  element.style.display = element.style.display === 'none' ? 'table-row' : 'none';
};


const delRow = function (event) {
  const button = event.target;
  const row = button.closest('tr');
  const rowParent = row.parentNode;
  const studentValue = row.querySelector('td:nth-child(2)').innerHTML;

  rowParent.removeChild(row);
  alert(`${studentValue} Record deleted successfully`);

  hidCheckboxfunc(event);
};


const edit = function (event) {
  const button = event.target;
  const row = button.closest('tr');
  const studentValue = row.querySelector('td:nth-child(2)').innerHTML;

  const value = prompt(`Edit details of ${studentValue}`);
  if (value !== null && value !== '') {
    alert(`${studentValue} data updated successfully`);
  }
};

const studentadd = function () {
  const tableBody = document.getElementById('myTable');
  const newRow = document.createElement('tr');

  const checkboxCell = document.createElement('td');
  checkboxCell.innerHTML = '<input type="checkbox" /><br /><br /><img src="down.png" width="25px" onClick="dropdown(' + (studentCounter - 1) + ')"/>';
  checkboxCell.addEventListener('change', checkchange);
  newRow.appendChild(checkboxCell);

  const studentCell = document.createElement('td');
  studentCell.textContent = `Student ${studentCounter}`;
  newRow.appendChild(studentCell);

  const teacherCell = document.createElement('td');
  teacherCell.textContent = `Teacher ${studentCounter}`;
  newRow.appendChild(teacherCell);

  const otherColumns = ["Approved", "Fall", "TA", `${studentCounter}23456`, "100%", '<button onclick="delRow(event)">Delete</button>', '<button onclick="edit(event)">Edit</button>'];
  for (let i = 0; i < otherColumns.length; i++) {
    const cell = document.createElement('td');
    cell.innerHTML = otherColumns[i];
    if (i >= 5) cell.style.display = 'none';
    newRow.appendChild(cell);
  }

  tableBody.appendChild(newRow);

  const newRow2 = document.createElement('tr');
  const colData = document.createElement('td');
  const staticRow = 'Advisor:<br /><br />Award Details<br />Summer 1-2014(TA)<br />Budget Number: <br />Tuition Number: <br />Comments:<br /><br /><br />Award Status:<br /><br /><br />';

  colData.innerHTML = staticRow;
  colData.colSpan = 8;
  newRow2.appendChild(colData);

  newRow2.classList.add('dropDownTextArea');

  tableBody.appendChild(newRow2);

  dropdown(studentCounter - 1);

  studentCounter++;
  alert(`Student ${studentCounter - 1} Record added successfully`);
};

function checkchange(event) {
  const checkbox = event.target;
  const row = checkbox.closest('tr');
  const dellcol = row.querySelector(':nth-child(9)');
  const edcol = row.querySelector(':nth-child(10)');
  const edColsHead = document.getElementsByClassName('editCol')[0];
  const delColsHead = document.getElementsByClassName('dellCol')[0];

  if (checkbox.checked) {
    row.style.backgroundColor = 'yellow';

    edColsHead.style.display = 'table-cell';
    delColsHead.style.display = 'table-cell';

    dellcol.style.display = 'table-cell';
    edcol.style.display = 'table-cell';

    const submitButton = document.getElementById('button-disabled');
    if (submitButton) submitButton.id = 'button';
  } else {
    row.style.backgroundColor = '';
    hidCheckboxfunc(event);
  }
}

const hidCheckboxfunc = function (event) {
  const checkbox = event.target;
  const row = checkbox.closest('tr');
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const edcol = row.querySelector(':nth-child(9)');
  const dellcol = row.querySelector(':nth-child(10)');
  const edColsHead = document.getElementsByClassName('editCol')[0];
  const delColsHead = document.getElementsByClassName('dellCol')[0];

  edcol.style.display = 'none';
  dellcol.style.display = 'none';
  let anyChecked = false;

  checkboxes.forEach((chk) => {
    if (chk.checked) {
      anyChecked = true;
    }
  });

  if (!anyChecked) {
    const submitButton = document.getElementById('button');
    submitButton.id = 'button-disabled';

    edColsHead.style.display = 'none';
    delColsHead.style.display = 'none';
  }
};
