class Shape {

  f() {
    return 2;
  }
}

class Triangle extends Shape {
  constructor(a) {
    super();
    this.pointa = a;
    this.pointb = 2;
    this.pointc = 3;
  }

  f() {
    return 1;
  }
}

Triangle.square = () => {
  return 23423;
};

const tr = new Triangle(213);

console.log(tr.f());

console.log(Triangle.square());
