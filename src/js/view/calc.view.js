class CalcView{
    #_display = document.querySelector('#display')
    #_displayHistory = document.querySelector('#displayHistory')

    get displayHistory(){
        return this.#_displayHistory
    }

    set displayHistory(value){
        return this.#_displayHistory.textContent = value
    }

    get display(){
        return this.#_display.textContent
    }

    set display(value){
        return this.#_display.textContent = value.toString()
    }

    clearAll(){
        this.displayHistory = ''
        this.display = '0'
    }
    //métodos para adcionar + um evento a um elemento no DOM

    addEventListenerAll(element, events, cb){

        events.split(' ').forEach( event =>{

            element.addEventListener(event, cb)

        })

    }


}

export const calcView = new CalcView()