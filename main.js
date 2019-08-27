class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.currentOperand = currentOperandTextElement.innerText
        this.previousOperand = previousOperandTextElement.innerText
    }

    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
        // this.currentOperand += number.toString()
    }

    chooseOperation(operation){
        if(this.currentOperand === '')return
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand =this.currentOperand //+' '+this.operation
        this.currentOperand = ''
    }

    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const curr = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(curr))return
        switch(this.operation){
            case '+':
                computation = prev + curr
                break;
            case '-':
                computation = prev - curr
                break;
            case '*':
                computation = prev * curr
                break;
            case '/':
                computation = prev / curr
                break;
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number){
        const floatNumber = parseFloat(number)
        if(NaN(floatNumber))return ""
        return number.toLocaleString('en')
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText =this.currentOperand.toLocaleString('en')
        this.previousOperandTextElement.innerText =this.previousOperand.toLocaleString('en')
         
        //or(add it in chooseOperation)
        if(this.operation != null){
            this.previousOperandTextElement.innerText = `${this.previousOperand.toLocaleString('en')} ${this.operation}`
        } 
        
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click',() =>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();   
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click',() =>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();   
    })
})

allClearButton.addEventListener('click',() =>{
    calculator.clear()
    calculator.updateDisplay()
})

equalsButton.addEventListener('click',()=>{
    calculator.compute()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click',()=>{
    calculator.delete()
    calculator.updateDisplay()
})