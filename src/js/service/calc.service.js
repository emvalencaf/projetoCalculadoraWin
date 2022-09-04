export class CalcService{
    #_operation = []
    #_lastNumber
    #_lastOperator

    get operation(){
        return this.#_operation
    }

    set operation(value){
        return this.#_operation.push(value)
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

        if(this.operation.length > 3) this.calc()
    }

    setLastNumberToDisplay(){

        for(let i = this.operation.length - 1; i >= 0; i --){

            if(!this.isOperator(this.operation[i])){
                this.#_lastNumber = this.operation[i]
                break
            }

        }
        
        return this.#_lastNumber
    }

        //calculadora
    calc(){

        let last = this.operation.pop()

        let result = eval(this.operation.join(""))

        if(last === "%") {
            
            result /= 100
            this.#_operation = [result]

        } else {

            this.#_operation = [result, last]

        }
        
        console.log(this.operation)
    }
}



export const calcService = new CalcService()