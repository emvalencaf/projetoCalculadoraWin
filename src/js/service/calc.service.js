export class CalcService{
    #_operation = []
    #_lastNumber
    #_lastOperator

    get operation(){
        return this.#_operation.join("")
    }

    getLastOperation(value){
        return this.#_operation[this.#_operation - 1] = value
    }

    isOperator(value){

        return (['+', '-', '*', '%', '/'].indexOf(value) > -1)
    }

    calc(){
        const last = this.#_operation.pop()

        const result = eval(this.#_operation.join(""))

        return this.#_operation = [result, last]
    }

    setLastNumberToDisplay(view){
        let lastNumber = this.getLastItem(false)

        if(!lastNumber) lastNumber = 0

        view.display = lastNumber
    }
    
    getLastItem(isOperator = true){

        let lastItem

        for(let i = this.#_operation.length - 1; i >= 0; i--){


            if(this.isOperator(this.#_operation[i]) === isOperator){
                lastItem = this.#_operation[i]
                break
             }


        }

        if(!lastItem){

            lastItem = (isOperator) ? this._lastOperator : this._lastNumber

        }

        return lastItem

    }

    addOperator(value, view){

        if(isNaN(this.getLastOperation()) && !this.isOperator(value)) {
            this.#_operation[this.#_operation.length - 1] = `${this.getLastOperation()}${value}`
            this.setLastNumberToDisplay(view)
        }

        if(this.isOperator(value) && isNaN(this.getLastOperation())) {
            this.getLastOperation(value)
            this.setLastNumberToDisplay(view)
        }


        this.#_operation.push(value)

        if(this.#_operation.length > 3) this.calc()

        this.setLastNumberToDisplay(view)
    }

}



export const calcService = new CalcService()