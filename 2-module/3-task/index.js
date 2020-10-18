let calculator = {

  read(x, y) {
    this.a = x;
    this.b = y;
  },

  sum() {
    return this.a + this.b;
  },

  mul() {
    return this.a * this.b;
  },

};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
