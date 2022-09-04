    //módulos

import { calcService } from "../service/calc.service.js"
import { calcView } from "../view/calc.view.js"

    //classe

class CalcController{
    #_operation_functions = {
        "C": () => calcController.clearAll(),
        "CE": () => calcController.clearEntry(),
        '←': () => calcController.backspaceEntry(),
        '=': () =>{
                
            calcController.service.calc()
            calcController.setDisplayHistory()
        },
        '1/x': () =>{

            const reciprocal = calcController.service.getReciprocal()
            calcController.setDisplayHistory(reciprocal)
            return
        },
        'pow': () =>{

            const squareNumber = calcController.service.getSquareNumber()
            calcController.setDisplayHistory(squareNumber)
            
        },
        '.': () => {

            calcController.service.addDot()
            calcController.setDisplay()
        },
        '√': () => {
            const sqtrNumber = calcController.service.getSquareRootNumber()
            calcController.setDisplayHistory(sqtrNumber)
        },
        '+-': () =>{
            const positiveNegative = calcController.service.getPlusMinus()
            calcController.setDisplayHistory(positiveNegative)
        },
        '%': () =>{
            const getPercent = calcController.service.getPercent()
        }

    }

    constructor(view, service){
        this.view = view
        this.service = service

        this.setDisplay('0')
    }
    
    //adicionando eventos aos botões da calculadora
    init(){
        
        Array.from([...document.querySelectorAll("button")]).forEach( btn => {

            this.addEventListenerAll(btn, 'click drag')

       })

    }

    addEventListenerAll(btn, events){

        this.view.addEventListenerAll(btn, events, this.btnExec)

    }

    //o handle evento dos botões da calculadora
    btnExec(e){

        const dataCalc = e.currentTarget.getAttribute('data-calc')

        console.log(dataCalc)
        
        let cb
        
        Object.keys(calcController.#_operation_functions).indexOf(dataCalc) > -1?
            cb = calcController.#_operation_functions[dataCalc]:
            cb = () => calcController.addOperator(dataCalc)

        calcController.debuggerOperation(cb)
/*
        if(dataCalc === 'C') return calcController.clearAll()

        if(dataCalc === 'CE') return calcController.clearEntry()

        if(dataCalc === '←') return  calcController.backspaceEntry()

        if(dataCalc === "=") {

            cb = () =>{
                
                calcController.service.calc()
                calcController.setDisplayHistory()
            }

        }

        if(dataCalc === "1/x"){

            cb = () =>{

                const reciprocal = calcController.service.getReciprocal()
                calcController.setDisplayHistory(reciprocal)
                return
            }

        }

        if(dataCalc === "pow"){

            cb = () =>{

                const squareNumber = calcController.service.getSquareNumber()
                calcController.setDisplayHistory(squareNumber)
                
            }


        }

        if(dataCalc === ".") {

            cb = () => {

                calcController.service.addDot()
                calcController.setDisplay()
            }
        
        }

        if(!cb) cb = () => calcController.addOperator(dataCalc)

        calcController.debuggerOperation(cb)*/

    }

    //setDisplay

        //manipulando display do histórico
    setDisplayHistory(value){

        this.view.display = this.service.getLastItem(false)
        
        if(!value){
            let setFirstNumber = this.service.previousNumber || this.service.operation.join("")
            this.service.operation.length === 1 ?
                this.view.displayHistory = setFirstNumber + this.service.lastOperator + this.service.lastNumber + "=" :
                this.view.displayHistory = setFirstNumber
            return        
        }
        
        this.view.displayHistory = value
        return
    }

    
    //manipulando display
    
    setDisplay(value){
        
        if(value) return this.view.display = value
        
        if(this.service.operation.length >= 2) return this.setDisplayHistory()
        
        this.view.display = this.service.operation.join("")
        return
    }
    
    //tratar operações
    debuggerOperation(cb){
    
        try{

            cb()

        }catch(e){

            this.setError()

        }
        return
    }
    
    setError(){
        return this.view.display = 'ERROR'
    }

    //manipulação dos dados da calculadora

        //Apaga todos os dados da calculadora
    clearAll(){

        this.service.clearAll()
        this.view.clearAll()
        return
    }
        //Apaga a entrada da operação na calculadora
    clearEntry(){

        this.service.clearEntry()
        this.view.display = this.service.operation.join("")
        return
    }

    backspaceEntry(){
        this.service.backspaceEntry()
        
        if(this.service.operation.length < 2) return this.setDisplay()

        this.setDisplayHistory()
        return
    }
    
        //operação
    addOperator(value){

        this.service.addOperator(value)
        
        this.service.operation.length == 2?
            this.setDisplayHistory():
            this.setDisplay()

    }

}


    //instância
export const calcController = new CalcController(calcView, calcService)