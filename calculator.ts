// 声明创建按钮
function createButton(
  text: string,
  container: HTMLElement,
  className?: string
) {
  let button: HTMLButtonElement = document.createElement("button");
  if (className) {
    button.className = className;
  }
  button.textContent = text.toString();
  container.appendChild(button);
}

// 创建container
let container: HTMLDivElement = document.createElement("div");
container.classList.add("calculator");
document.body.appendChild(container);

// 创建output
let output: HTMLDivElement = document.createElement("div");
output.classList.add("output");

// 创建output里的span
let span: HTMLSpanElement = document.createElement("span");
span.textContent = "0";
output.appendChild(span);
container.appendChild(output);

let n1: number;
let n2: number;
let operator: string;

// container监听器
container.addEventListener("click", event => {
  if (event.target instanceof HTMLButtonElement) {
    let button: HTMLButtonElement = event.target;
    let text = button.textContent;
    // 判断字符类型
    if (text && "0123456789".indexOf(text) >= 0) {
      // 如果有操作符
      if (operator) {
        if (n2) {
          // 更新n1
          n2 = parseInt(n2.toString() + text);
        } else {
          n2 = parseInt(text);
        }
        span.textContent = n2.toString();
      } else {
        // 没有操作符
        if (n1) {
          // 更新n2
          n1 = parseInt(n1.toString() + text);
        } else {
          n1 = parseInt(text);
        }
        span.textContent = n1.toString();
      }
    } else if (text && "+-×÷".indexOf(text) >= 0) {
      // 更新operator
      operator = text;
    } else if (text && "=".indexOf(text) >= 0) {
      // 更新结果
      let result;
      // 四则运算
      if (operator === "+") {
        result = n1 + n2;
      } else if (operator === "-") {
        result = n1 - n2;
      } else if (operator === "×") {
        result = n1 * n2;
      } else if (operator === "÷") {
        result = n1 / n2;
      }
      if (result) {
        span.textContent = result.toString();
      }
    } else if (text && "clear".indexOf(text) >= 0) {
      n1= 0
      n2=0
      operator = ''
      span.textContent = "0";
    }
    console.log(n1, operator, n2);
  }
});

// 声明所有按钮
let keys: Array<Array<string>> = [
  ["clear", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", ".", "="]
];

// 将按钮放到container
keys.forEach((textList: Array<string>) => {
  let div = document.createElement("div");
  div.classList.add("row");
  textList.forEach((text: string) => {
    createButton(text, div, `button text-${text}`);
  });
  container.appendChild(div);
});
