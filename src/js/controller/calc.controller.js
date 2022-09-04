    //módulos

import { calcService } from "../service/calc.service.js"
import { calcView } from "../view/calc.view.js"

    //classe

class CalcController{
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

        if(dataCalc === 'C') return calcController.clearAll()

        if(dataCalc === 'CE') return calcController.clearEntry()

        if(dataCalc === '←') return  calcController.backspaceEntry()

        if(dataCalc === "=") {

            try{
                
                calcController.service.calc()
                calcController.setDisplayHistory()
                return
                
            } catch(e){
                calcController.setError()
            }

        }

        if(dataCalc === "pow"){

            try{

                
                calcController.setDisplayHistory(calcController.service.getSquareNumber())
            }catch(e){
                calcController.setError()
                console.log(e)
            }
            return
        }

        if(dataCalc === ".") {
            calcController.service.addDot()
            calcController.setDisplay()
            return
        }

        calcController.addOperator(dataCalc)

    }

    //setDisplay

        //manipulando display do histórico
    setDisplayHistory(value){

        this.view.display = this.service.getLastItem(false)
        
        if(!value){

            this.service.operation.length === 1 ?
                this.view.displayHistory = this.service.operation.join("") + this.service.lastOperator + this.service.lastNumber + "=" :
                this.view.displayHistory = this.service.operation.join("")
            return        
        }
        
        this.view.displayHistory = value    

    }

    
    //manipulando display
    
    setDisplay(value){
        
        if(value) return this.view.display = value
        
        if(this.service.operation.length > 2) return
        
        this.view.display = this.service.operation.join("")
    }
    
    //tratar operações
    debuggerOperation(cb){
    
        try{

            cb()

        }catch(e){

            this.setError()

        }
    }
    
    setError(){
        return this.view.display = 'ERROR'
    }

    //manipulação dos dados da calculadora

        //Apaga todos os dados da calculadora
    clearAll(){

        this.service.clearAll()
        this.view.clearAll()

    }
        //Apaga a entrada da operação na calculadora
    clearEntry(){

        this.service.clearEntry()
        this.view.display = this.service.operation.join("")

    }

    backspaceEntry(){
        this.service.backspaceEntry()
        this.view.display = this.service.operation.join("")
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