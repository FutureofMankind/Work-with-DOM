export default class NumberTwo {
  constructor(element) {
    this.element = element;
    this.responce = [
      {
        id: 26,
        title: 'Побег из Шоушенка',
        imdb: 9.30,
        year: 1994,
      },
      {
        id: 25,
        title: 'Крёстный отец',
        imdb: 9.20,
        year: 1972,
      },
      {
        id: 27,
        title: 'Крёстный отец 2',
        imdb: 9.00,
        year: 1974,
      },
      {
        id: 1047,
        title: 'Тёмный рыцарь',
        imdb: 9.00,
        year: 2008,
      },
      {
        id: 223,
        title: 'Криминальное чтиво',
        imdb: 8.90,
        year: 1994,
      },
    ];

    this.sortingID = 0;
    this.sortingTitle = 0;
    this.sortingYear = 0;
    this.sortingImdb = 0;
    this.buttonCondition = 0;
    this.intervalCount = 0;
  }

  init() {
    this.createHtml(this.element);
    this.eventButton();
    this.timerID = setInterval(this.intervalSorting.bind(this), 2000);
  }

  createHtml(element) {
    const { responce } = this;

    const h2 = `
        <H2>
          Задача № 2<br>
          Loading and Sorting, data-attributes (задача со звёздочкой)
        </H2>
      `;
    element.insertAdjacentHTML('afterBegin', h2);

    this.table = document.createElement('table');
    element.appendChild(this.table);

    const button = '<button>Остановить интервал</button>';
    element.insertAdjacentHTML('beforeEnd', button);

    this.header = document.createElement('tr');
    this.header.innerHTML = `
        <th>id</th>
        <th>title</th>
        <th>year</th>
        <th>imdb</th>
      `;
    this.th = Array.from(this.header.querySelectorAll('th'));
    this.table.appendChild(this.header);

    for (let i = 0; i < responce.length; i += 1) {
      const {
        id, title, year, imdb,
      } = responce[i];
      const tr = document.createElement('tr');
      tr.dataset.id = id;
      tr.dataset.title = title;
      tr.dataset.year = year;
      tr.dataset.imdb = imdb;
      tr.innerHTML = `
          <td>${id}</td>
          <td>${title}</td>
          <td>(${year})</td>
          <td>imdb: ${imdb.toFixed(2)}</td>
        `;
      this.table.appendChild(tr);
    }
  }

  sortFunc(sortingState, sortEl) {
    this.headerClear();

    const tableRows = Array.from(this.table.querySelectorAll('tr[data-id]'));
    // if (!tableRows) { return; }

    const index = this.th.findIndex((i) => i.textContent === sortEl);
    let condition = 'number';
    for (let i = 0; i < this.responce.length; i += 1) {
      if (typeof this.responce[i][sortEl] === 'string') {
        condition = 'string';
      }
    }

    if (condition === 'number') {
      if (sortingState === 0) {
        tableRows.sort((a, b) => a.dataset[sortEl] - b.dataset[sortEl]);
        this.th[index].textContent += ' \u{2191}';
      }

      if (sortingState === 1) {
        tableRows.sort((a, b) => b.dataset[sortEl] - a.dataset[sortEl]);
        this.th[index].textContent += ' \u{2193}';
      }
    }

    if (condition === 'string') {
      if (sortingState === 0) {
        tableRows.sort((a, b) => {
          if (a.dataset[sortEl] > b.dataset[sortEl]) { return 1; }
          if (a.dataset[sortEl] < b.dataset[sortEl]) { return -1; }
          return 0;
        });
        this.th[index].textContent += ' \u{2191}';
      }

      if (sortingState === 1) {
        tableRows.sort((a, b) => {
          if (a.dataset[sortEl] > b.dataset[sortEl]) { return -1; }
          if (a.dataset[sortEl] < b.dataset[sortEl]) { return 1; }
          return 0;
        });
        this.th[index].textContent += ' \u{2193}';
      }
    }

    this.rendering(tableRows);

    return sortingState === 0 ? 1 : 0;
  }

  sortID() {
    this.sortingID = this.sortFunc(this.sortingID, 'id');
  }

  sortTitle() {
    this.sortingTitle = this.sortFunc(this.sortingTitle, 'title');
  }

  sortYear() {
    this.sortingYear = this.sortFunc(this.sortingYear, 'year');
  }

  sortImdb() {
    this.sortingImdb = this.sortFunc(this.sortingImdb, 'imdb');
  }

  headerClear() {
    this.th[0].textContent = 'id';
    this.th[1].textContent = 'title';
    this.th[2].textContent = 'year';
    this.th[3].textContent = 'imdb';
  }

  rendering(items) {
    // for (let i = 0; i < items.length; i += 1) {
    //   element.removeChild(items[i]);
    // }
    this.table.innerHTML = '';
    this.table.appendChild(this.header);

    for (let i = 0; i < items.length; i += 1) {
      this.table.appendChild(items[i]);
    }
  }

  intervalSorting() {
    if (this.intervalCount > 7) { this.intervalCount = 0; }
    if (this.intervalCount === 0) { this.sortID(); }
    if (this.intervalCount === 1) { this.sortID(); }
    if (this.intervalCount === 2) { this.sortTitle(); }
    if (this.intervalCount === 3) { this.sortTitle(); }
    if (this.intervalCount === 4) { this.sortYear(); }
    if (this.intervalCount === 5) { this.sortYear(); }
    if (this.intervalCount === 6) { this.sortImdb(); }
    if (this.intervalCount === 7) { this.sortImdb(); }
    this.intervalCount += 1;
  }

  buttonSetInterval() {
    if (this.buttonCondition === 0) {
      clearInterval(this.timerID);
      this.button.textContent = 'Запуск интервала';
    }
    if (this.buttonCondition === 1) {
      this.intervalCount = 0;
      this.timerID = setInterval(this.intervalSorting, 2000);
      this.button.textContent = 'Остановка интервала';
    }

    this.buttonCondition = this.buttonCondition === 0 ? 1 : 0;
  }

  eventButton() {
    this.th[0].addEventListener('click', (evt) => {
      evt.preventDefault();
      this.sortID();
    });
    this.th[1].addEventListener('click', (evt) => {
      evt.preventDefault();
      this.sortTitle();
    });
    this.th[2].addEventListener('click', (evt) => {
      evt.preventDefault();
      this.sortYear();
    });
    this.th[3].addEventListener('click', (evt) => {
      evt.preventDefault();
      this.sortImdb();
    });
    this.button = this.element.querySelector('button');
    this.button.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.buttonSetInterval();
    });
  }
}
