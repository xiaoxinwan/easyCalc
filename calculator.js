var Calculator = /** @class */ (function () {
    function Calculator() {
        this.n1 = "";
        this.n2 = "";
        this.operator = "";
        this.result = "";
        this.keys = [
            ["clear", "÷"],
            ["7", "8", "9", "×"],
            ["4", "5", "6", "-"],
            ["1", "2", "3", "+"],
            ["0", ".", "="]
        ];
        this.createContainer();
        this.createOutput();
        this.createButtons();
        this.bindEvents();
    }
    Calculator.prototype.createButton = function (text, container, className) {
        var button = document.createElement("button");
        if (className) {
            button.className = className;
        }
        button.textContent = text.toString();
        container.appendChild(button);
        return button;
    };
    Calculator.prototype.createContainer = function () {
        var container = document.createElement("div");
        container.classList.add("calculator");
        document.body.appendChild(container);
        this.container = container;
    };
    Calculator.prototype.createOutput = function () {
        var output = document.createElement("div");
        output.classList.add("output");
        var span = document.createElement("span");
        span.textContent = "0";
        output.appendChild(span);
        this.container.appendChild(output);
        this.output = output;
        this.span = span;
    };
    Calculator.prototype.createButtons = function () {
        var _this = this;
        this.keys.forEach(function (textList) {
            var div = document.createElement("div");
            div.classList.add("row");
            textList.forEach(function (text) {
                _this.createButton(text, div, "button text-" + text);
            });
            _this.container.appendChild(div);
        });
    };
    Calculator.prototype.updateNum = function (text) {
        if (this.operator) {
            this.n2 += text;
            this.span.textContent = this.n2;
        }
        else {
            this.result = "";
            this.n1 += text;
            this.span.textContent = this.n1;
        }
    };
    Calculator.prototype.updateResult = function (n1, n2, operator) {
        var numN1 = parseFloat(n1);
        var numN2 = parseFloat(n2);
        // 四则运算
        if (operator === "+") {
            return (numN1 + numN2).toString();
        }
        else if (operator === "-") {
            return (numN1 - numN2).toString();
        }
        else if (operator === "×") {
            return (numN1 * numN2).toString();
        }
        else if (operator === "÷") {
            if (numN2 === 0) {
                return "不是数字";
            }
            else {
                return (numN1 / numN2).toString();
            }
        }
    };
    Calculator.prototype.updateNumOrOperator = function (text) {
        if ("0123456789".indexOf(text) >= 0) {
            this.updateNum(text);
        }
        else if ("+-×÷".indexOf(text) >= 0) {
            // 更新operator
            if (this.result) {
                console.log(1111111);
                this.n1 = this.result;
                this.result = "";
            }
            this.operator = text;
        }
        else if ("=".indexOf(text) >= 0) {
            this.result = this.updateResult(this.n1, this.n2, this.operator);
            this.span.textContent = this.result;
            this.n1 = "";
            this.n2 = "";
            this.operator = "";
        }
        else if ("clear".indexOf(text) >= 0) {
            this.n1 = "";
            this.n2 = "";
            this.operator = "";
            this.result = "";
            this.span.textContent = "0";
        }
        console.log(this.n1, this.operator, this.n2);
    };
    Calculator.prototype.bindEvents = function () {
        var _this = this;
        this.container.addEventListener("click", function (event) {
            if (event.target instanceof HTMLButtonElement) {
                var button = event.target;
                var text = button.textContent;
                // 判断字符类型
                if (text) {
                    _this.updateNumOrOperator(text);
                }
            }
        });
    };
    return Calculator;
}());
new Calculator();
// 声明创建按钮
// 创建container
// 创建output
// 创建output里的span
// container监听器
// 声明所有按钮
// 将按钮放到container
