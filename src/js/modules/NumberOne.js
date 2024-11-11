export default class NumberOne {
  constructor(element) {
    this.element = element;
    this.fieldSize = 4;
    this.lastCell = 0;
    this.hits = 0;
    this.misses = 0;
  }

  init() {
    this.createHtml(this.element);
    this.timerID = setInterval(this.goblinActive.bind(this), 1000);
  }

  createHtml(element) {
    this.test = element;

    const h2 = `
      <H2>
        Задача № 1<br>
        Перемещение элемента.
      </H2>
      <div class="points">Попадания: <span>0</span></div>
      <div class="points">Промахи: <span>0</span></div>
    `;
    element.insertAdjacentHTML('afterBegin', h2);
    this.pointer = Array.from(element.querySelectorAll('.points > span'));
    this.board = document.createElement('div');
    this.board.classList.add('board');
    element.appendChild(this.board);

    const button = '<button>Обнулить статистику</button>';
    element.insertAdjacentHTML('beforeEnd', button);
    this.button = this.element.querySelector('button');
    this.button.addEventListener('click', (event) => {
      event.preventDefault();
      this.buttonClearPoints();
    });

    for (let i = 0; i < this.fieldSize ** 2; i += 1) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.addEventListener('click', (event) => this.clickCell(event));
      this.board.appendChild(cell);
    }

    this.cells = Array.from(this.element.querySelectorAll('.cell'));
  }

  goblinActive() {
    this.cells[this.lastCell].classList.remove('active');

    const rand = () => {
      const random = Math.floor(Math.random() * (this.fieldSize ** 2));
      if (random === this.lastCell) {
        return rand();
      }
      this.lastCell = random;
      return random;
    };

    const index = rand();
    this.cells[index].classList.add('active');
  }

  clickCell(event) {
    event.preventDefault();
    const index = this.cells.indexOf(event.currentTarget);
    const active = this.cells[index].classList.contains('active');
    if (active) {
      this.hits += 1;
      this.pointer[0].textContent = this.hits;
    }
    if (!active) {
      this.misses += 1;
      this.pointer[1].textContent = this.misses;
    }
  }

  buttonClearPoints() {
    this.pointer.forEach((item) => {
      item.textContent = 0;
    });
    this.hits = 0;
    this.misses = 0;
  }
}
