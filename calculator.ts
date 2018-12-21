class Calculator {
  public container: HTMLDivElement;
  private output: HTMLDivElement;
  private span: HTMLSpanElement;
  public n1: string = "";
  public n2: string = "";
  public operator: string = "";
  public result: string = "";
  public keys: Array<Array<string>> = [
    ["clear", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="]
  ];
  constructor() {
    this.createContainer();
    this.createOutput();
    this.createButtons();
    this.bindEvents();
  }

  createButton(text: string, container: HTMLElement, className?: string) {
    let button: HTMLButtonElement = document.createElement("button");
    if (className) {
      button.className = className;
    }
    button.textContent = text.toString();
    container.appendChild(button);
    return button;
  }
  createContainer() {
    let container: HTMLDivElement = document.createElement("div");
    container.classList.add("calculator");
    document.body.appendChild(container);
    this.container = container;
  }
  createOutput() {
    let output: HTMLDivElement = document.createElement("div");
    output.classList.add("output");
    let span: HTMLSpanElement = document.createElement("span");
    span.textContent = "0";
    output.appendChild(span);
    this.container.appendChild(output);
    this.output = output;
    this.span = span;
  }
  createButtons() {
    this.keys.forEach((textList: Array<string>) => {
      let div = document.createElement("div");
      div.classList.add("row");
      textList.forEach((text: string) => {
        this.createButton(text, div, `button text-${text}`);
      });
      this.container.appendChild(div);
    });
  }
  updateNum(text: string) {
    if (this.operator) {
      this.n2 += text;
      this.span.textContent = this.n2;
    } else {
      this.result = "";
      this.n1 += text;
      this.span.textContent = this.n1;
    }
  }

  updateResult(n1: string, n2: string, operator: string): string {
    let numN1: number = parseFloat(n1);
    let numN2: number = parseFloat(n2);
    // 四则运算
    if (operator === "+") {
      return (numN1 + numN2).toString();
    } else if (operator === "-") {
      return (numN1 - numN2).toString();
    } else if (operator === "×") {
      return (numN1 * numN2).toString();
    } else if (operator === "÷") {
      if (numN2 === 0) {
        return "不是数字";
      } else {
        return (numN1 / numN2).toString();
      }
    }
  }
  rmZero(string: string) {
    return string.replace(/.0+$/g, "").replace(/\.0+e/, "e");
  }
  updateNumOrOperator(text: string) {
    if ("0123456789.".indexOf(text) >= 0) {
      this.updateNum(text);
    } else if ("+-×÷".indexOf(text) >= 0) {
      // 更新operator
      if (this.n1 && this.n2) {
        this.n1 = this.rmZero(
          this.updateResult(this.n1, this.n2, this.operator)
        );
        this.n2 = "";
      }
      this.operator = text;
    } else if ("=".indexOf(text) >= 0) {
      this.result = this.rmZero(
        this.updateResult(this.n1, this.n2, this.operator)
      );
      this.span.textContent = this.result;
      this.n1 = "";
      this.n2 = "";
      this.operator = "";
    } else if ("clear".indexOf(text) >= 0) {
      this.n1 = "";
      this.n2 = "";
      this.operator = "";
      this.result = "";
      this.span.textContent = "0";
    }
    console.log(this.n1, this.operator, this.n2);
  }
  bindEvents() {
    this.container.addEventListener("click", event => {
      if (event.target instanceof HTMLButtonElement) {
        let button: HTMLButtonElement = event.target;
        let text = button.textContent;
        // 判断字符类型
        if (text) {
          this.updateNumOrOperator(text);
        }
      }
    });
  }
}
new Calculator();

// 声明创建按钮

// 创建container

// 创建output

// 创建output里的span

// container监听器

// 声明所有按钮

// 将按钮放到container
