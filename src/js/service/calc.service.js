export class CalcService{
    #_operation = []
    #_lastNumber = ''
    #_previousNumber = ''
    #_lastOperator = ''

    //getters e setter
    get operation(){
        return this.#_operation
    }

    set operation(value){
        return this.#_operation.push(value)
    }
    
    get previousNumber(){
        return this.#_previousNumber
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
        this.#_lastNumber = ''
        this.#_lastOperator = ''
        this.#_previousNumber = ''
    }
        //apaga todos dados da entrada
    clearEntry(){
        
        if(this.isOperator(this.getLastOperator())) return

        return this.operation.pop()
    }
        //apaga os dígitos da entrada
    backspaceEntry(){

        let lastNumber = this.getLastOperator()

        if(!lastNumber) return

        if(isNaN(lastNumber)) return

        const indexLastNumber = this.operation.indexOf(lastNumber)

        if(typeof lastNumber !== "string") lastNumber.toString()

        lastNumber = lastNumber.slice(0, -1)

        console.log(lastNumber)

        this.operation[indexLastNumber] = lastNumber
        console.log(this.operation)
    }

        //adicionando operações

    setLastOperation(value){
        return this.#_operation[this.operation.length - 1] = value
    }
    getLastOperator(){
        return this.operation[this.operation.length - 1]
    }

    isOperator(value){
        
        if(!isNaN(value)) return false

        if(value.indexOf('(') > -1) return false

        return (['+','-','=','/','*','%'].indexOf(value) > -1)
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
    

    addDot(){
        let lastOperation = this.getLastOperator()

        this.isOperator(lastOperation) || !lastOperation?
            this.operation = "0.":
            this.setLastOperation(lastOperation.toString() + ".")
    }

        //métodos auxliares ao cálculo
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


    getResult(){
        this.#_previousNumber = this.operation[0]
        return eval(this.operation.join(""))
    }

        //calculadora
        //squareNumber
    getSquareNumber(){
        console.log(this.operation)
        const lastNumber = this.getLastItem(false)
        if(!lastNumber) throw Error()
        const display = `sqr(${lastNumber})`
        this.#_previousNumber = display
        this.setLastOperation(Math.pow(parseFloat(lastNumber), 2))
        return display
    }
        //reciprocal
    getReciprocal(){
        console.log(this.operation)
        const lastNumber = this.getLastItem(false)
        if(!lastNumber) throw Error()
        const display = `1/(${lastNumber})`
        const result = eval(display)
        this.setLastOperation(result)
        return display
    }
        //squareRootNumber
    getSquareRootNumber(){
        console.log(this.operation)
        const lastNumber = this.getLastItem(false)
        if(!lastNumber) throw Error()
        const display = `√(${lastNumber})`
        this.#_previousNumber = display
        this.setLastOperation(Math.sqrt(lastNumber))
        return display
    }
        //plus and minus number
    getPlusMinus(){
        
        let lastNumber = this.getLastItem(false)

        if(lastNumber === null || lastNumber === undefined || lastNumber === '') throw Error()

        if(typeof lastNumber === 'string' && lastNumber.indexOf('(') > - 1 ) {
            lastNumber = lastNumber.replace('(', '').replace(')','')
        }
        
        console.log(lastNumber)

        lastNumber *= -1

        if(lastNumber < 0) lastNumber = `(${lastNumber})`



        this.setLastOperation(lastNumber)
        //if(lastNumber) throw Error()

        //let display
        //lastNumberdisplay.indexOf('(') = `(${lastNumber})`
        //this.setLastOperation(display)
        return
    }

    calc(){

        //let last

        this.#_lastOperator = this.getLastItem(true)


        if(this.operation.length < 3){
            
            let firstItem = this.#_operation[0]

            this.#_operation = [firstItem, this.#_lastOperator, this.#_lastNumber]
        }

        if(this.#_operation.length > 3){

            last = this.#_operation.pop()

            this.#_lastNumber = this.getResult().toString()

        } else if(this.#_operation.length === 3){

            this.#_lastNumber = this.getLastItem(false)

        }

        let result = this.getResult()

        //if(this.#_lastOperator === "%") {
            //result /= 100
            //last = null
        //}

        this.#_operation = [result.toString()]

        //if(last) this.operation = last 

        
        console.log(this.operation)
    }
}



export const calcService = new CalcService()