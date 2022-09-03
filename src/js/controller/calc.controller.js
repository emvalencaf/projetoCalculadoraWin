    //módulos

import { calcService } from "../service/calc.service.js"
import { calcView } from "../view/calc.view.js"

    //classe

class CalcController{
    constructor(view, service){
        this.view = view
        this.service = service
    }

    addEventListenerAll(btn, events){

        this.view.addEventListenerAll(btn, events, this.btnExec)

    }

    btnExec(e){

        const dataCalc = e.currentTarget.getAttribute('data-calc')

        calcController.addOperator(dataCalc)

    }

    addOperator(value){

        this.service.addOperator(value, this.view)

    }
}


    //instância
export const calcController = new CalcController(calcView, calcService)