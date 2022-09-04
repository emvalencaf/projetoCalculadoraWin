export class CalcService{
    #_operation = []
    #_lastNumber
    #_lastOperator

    //getters e setter
    get operation(){
        return this.#_operation
    }

    set operation(value){
        return this.#_operation.push(value)
    }

    get lastNumber(){
        return this.#_lastNumber
    }

    get lastOperator(){
        return this.#_lastOperator
    }

    //manipulação dos dados

        //apaga todos os dados
    clearAll(){
        this.#_operation = []
    }
        //apaga todos dados da entrada
    clearEntry(){

    }
        //apaga os dígitos da entrada
    backspaceEntry(){

    }


    getLastOperator(){
        return this.operation[this.operation.length - 1]
    }

    isOperator(value){
        return (['+','-','=','/','*','**','%'].indexOf(value) > -1)
    }

    addOperator(value){

        //Concatenando em string o último número com o primeiro.
        if(!isNaN(this.getLastOperator()) && !this.isOperator(value)){

            this.operation[this.operation.length - 1] = this.getLastOperator().toString() + value.toString()
            console.log(this.operation)
            return
        
        }

        //Trocando o último operador digitado pelo operador
        if(this.isOperator(value) && this.isOperator(this.getLastOperator())){
            this.operation[this.operation.length - 1] = value
            console.log(this.operation)
            return
        }

        //adicionando o dígito
        this.operation = value
        console.log(this.operation)
        if(this.operation.length > 3) this.calc()
    }

    getLastItem(isOperator = true){

        let lastItem

        for(let i = this.operation.length - 1; i >= 0; i --){

            if(this.isOperator(this.operation[i]) === isOperator){
                lastItem = this.operation[i]
                break
            }

        }

        if(!lastItem) lastItem = isOperator? this.#_lastOperator : this.#_lastNumber
        
        return lastItem
    }

    setLastNumber(){
        
        return this.#_lastNumber = this.getLastItem(false)
    }

    getResult(){
        return eval(this.operation.join(""))
    }

        //calculadora
    calc(){

        let last

        this.#_lastOperator = this.getLastItem(true)

        if(this.operation.length < 3){
            
            let firstItem = this.#_operation[0]

            this.#_operation = [firstItem, this.#_lastOperator, this.#_lastNumber]
        }

        if(this.#_operation.length > 3){

            last = this.#_operation.pop()

            this.#_lastNumber = this.getResult()

        } else if(this.#_operation.length === 3){

            this.#_lastNumber = this.getLastItem(false)

        }

        let result = this.getResult()

        if(this.#_lastOperator === "%") {
            result /= 100
            last = null
        }

        this.#_operation = [result]

        if(last) this.operation = last 

        
        console.log(this.operation)
    }
}



export const calcService = new CalcService()