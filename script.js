class Calculator {
  $previousPreview;
  $currentPreview;
  previousOperation = "";
  currentOperation = "";
  history = [];
  $historyList;

  constructor($previousPreview, $currentPreview) {
    this.$previousPreview = $previousPreview;
    this.$currentPreview = $currentPreview;
    this.history = [];
    this.$historyList = document.querySelector("[data-history-list]");
  }

  onPressNumber(number) {
    if (number === "." && this.$currentPreview.textContent.includes(".")) {
      return;
    }
    this.$currentPreview.textContent += number;
  }
  onPressOperation(operation) {
    this.$previousPreview.textContent =
      this.$currentPreview.textContent + " " + operation;
    this.$currentPreview.textContent = "";
    this.previousOperation = operation;
  }

  onEqual() {
    const operation = this.previousOperation.trim();
    const previousValue = parseFloat(
      this.$previousPreview.textContent.split(" ")[0]
    );
    const currentValue = parseFloat(this.$currentPreview.textContent);

    if (isNaN(previousValue) || isNaN(currentValue)) {
      alert("올바른 숫자를 입력해주세요");
      return;
    }

    let result = 0;
    switch (operation) {
      case "+":
        result = previousValue + currentValue;
        break;
      case "-":
        result = previousValue - currentValue;
        break;
      case "*":
        result = previousValue * currentValue;
        break;
      case "÷":
        if (currentValue === 0) {
          alert("0으로 나눌 수 없습니다");
          return;
        }
        result = previousValue / currentValue;
        break;
      default:
        return;
    }

    this.$currentPreview.textContent = "";
    this.$previousPreview.textContent = "" + result;
    const calculation = `${previousValue} ${operation} ${currentValue}`;
    this.addToHistory(calculation, result);
  }

  onReset() {
    this.$previousPreview.textContent = "";
    this.$currentPreview.textContent = "";
    this.previousOperation = "";
    this.currentOperation = "";
  }

  onDelete() {
    this.$currentPreview.textContent = this.$currentPreview.textContent.slice(
      0,
      -1
    );
  }

  addToHistory(calculation, result) {
    this.history.push(`${calculation} = ${result}`);

    // DOM에 히스토리 추가
    const historyItem = document.createElement("div");
    historyItem.textContent = `${calculation} = ${result}`;
    this.$historyList.insertBefore(historyItem, this.$historyList.firstChild);
  }

  showHistory() {
    return this.history.join("\n");
  }
}

// 사칙연산
const $plus = document.querySelector("[data-btn-plus]");
const $minus = document.querySelector("[data-btn-minus]");
const $divide = document.querySelector("[data-btn-divide]");
const $multiply = document.querySelector("[data-btn-multiply]");

// 연산
const $eqaul = document.querySelector("[data-btn-eqaul]");

// 전체삭제(AC), 삭제
const $reset = document.querySelector("[data-btn-reset]");
const $delete = document.querySelector("[data-btn-delete]");

// 숫자, 연산
const $numbers = document.querySelectorAll("[data-btn-number]");
const $operations = document.querySelectorAll("[data-btn-operation]");

// 프롬포트
const $previousPreview = document.querySelector("[data-previous-preview]");
const $currentPreview = document.querySelector("[data-current-preview]");

const calc = new Calculator($previousPreview, $currentPreview);

$numbers.forEach(($number) => {
  $number.addEventListener("click", (e) => {
    calc.onPressNumber(e.target.textContent);
  });
});

$operations.forEach(($operation) => {
  $operation.addEventListener("click", (e) => {
    if (e.target.textContent.trim() == "=") {
      calc.onEqual();
    } else {
      calc.onPressOperation(e.target.textContent);
    }
  });
});

$reset.addEventListener("click", (e) => {
  calc.onReset();
});

$delete.addEventListener("click", (e) => {
  calc.onDelete();
});
