
class Graphics1d {
  constructor() {
  this.xmin = -20.0;
    this.xmax = 20.0;
    this.ymin = -10.0;
    this.ymax = 10.0;
    this.W = 500;
    this.H = 500;
    this.f = function(x) {
      return x*x;
    }
  }
  evaluate() {  
    this.f_x = new Float64Array(this.W);
    let l_x = this.xmax-this.xmin;// тут 
    let dx = l_x/this.W;
    let i = 0;
    //this.all_dots = new Array(this.W);
    for(let x = this.xmin; x <= this.xmax; x+= dx){
      this.f_x[i] = this.f(x);
      i++;
    }
    //console.log(this.f_x);
  } 
  // возможно есть смысл занести this.xmax-this.xmin в отдельное поле обьекта
  // как сказано в задании предаем соотв. параметры
  draw ( dots = "red", axis = "green", 
      zeros_of_function = "indigo", gaps = "magenta", backgr = "grey" ) {
    
    var canv = document.getElementById("canvas");
    var ctx = canv.getContext("2d");
    canv.height = this.H;
    canv.width = this.W;
    ctx.fillStyle = backgr;
    ctx.fillRect(0, 0, this.W, this.H);
    
    this.evaluate();
    let l_x = this.xmax - this.xmin;
    let l_y = this.ymax - this.ymin;
    let step_on_x = l_x / this.W;
    let step_on_y = l_y / this.H;
    let Sx = this.W / l_x;
    let Sy = this.H / l_y;
    
    let zero_on_x = Math.abs(this.xmin) * step_on_x;//?
    let zero_on_y = Math.abs(this.ymin) * step_on_y; //?     
    let X = (0 - this.xmin) * Sx + 0;
    let Y = -(0 - this.ymin) * Sy + this.H;
    //оси
    //OX
    ctx. beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = axis;
    ctx.moveTo(0, this.H / 2);
    ctx.lineTo(this.W, this.H / 2);
    ctx.stroke();
    //OY
    ctx. beginPath();
    ctx.moveTo(this.W / 2, 0);
    ctx.lineTo(this.W / 2, this.H);
    ctx.stroke();
  //сетка координат
    ctx.lineWidth = 0.4;
    ctx.strokeStyle = axis;
    for (var x = 0; x < Math.max(this.W, this.H); x += this.W / l_x) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, Math.max(this.W, this.H));
      ctx.stroke();
    }
    for (var y = 0; y < Math.max(this.W, this.H); y += this.W / l_y) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(Math.max(this.W, this.H), y);
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = dots;
    ctx.moveTo(0, 0);
    let i = 0;
    for (let x = this.xmin; x <= this.xmax; x += step_on_x) {
       //ctx.moveTo(zero_on_x + i * step_on_x, zero_on_y - this.f_x[i] * step_on_y);
                let t = this.H - (this.f_x[i] - this.ymin) * this.H / l_y;
      ctx.lineTo(i, t);
      i++;
    }
    ctx.stroke();
    //нули
    i = 0;
    for (let x = this.xmin; x <= this.xmax; x += l_x) {
      X = (x - this.xmin) * Sx;
      Y = -(this.f_x[i] - this.ymin) * Sy + this.H;
      console.log("проверка 1");
      if ((x >= -0.01 && x <= 0.01) ||(this.f_x[i] >= -0.01 && this.f_x[i] <= 0.01)) {
        ctx.beginPath();
        console.log("проверка 2");
        ctx.arc(X, Y, 5, 0, 2 * Math.PI);//круг
        ctx.fillStyle = "zeros_of_function";
        ctx.fill();
        ctx.stroke();
      }
      i++;
    } 
    // вывод координат максимума и минимума на канве, т.е. xmin, xmax, ymin, ymax
    ctx.font = 30+"px Corbel";
    ctx.textBaseline = "bottom";
    ctx.fillStyle = "black";
    let right = "(" + this.xmax + ", " + this.ymax + ")",
     left = "(" + this.xmin + ", " + this.ymin + ")";
    ctx.fillText(left, 0, this.H - 10);
    ctx.fillText(right, this.W - 100, 50);  
  }
  autodraw(dots = "red", axis = "green", 
    zeros_of_function = "indigo", gaps = "magenta", backgr = "grey") {
    this.ymin = this.f(this.xmin);
    this.ymax = this.f(this.xmax);
    this.draw(dots, axis, zeros_of_function, gaps, backgr);
  }
};
var a = new Graphics1d();
a.evaluate()// creat an object of our class
a.draw();