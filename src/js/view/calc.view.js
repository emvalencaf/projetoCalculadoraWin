class CalcView{
    #_display = document.querySelector('#display')
    constructor(){

    }

    get display(){
        return this.#_display.textContent
    }

    set display(value){
        return this.#_display.textContent = value.toString()
    }

    addEventListenerAll(element, events, cb){

        events.split(' ').forEach( event =>{

            element.addEventListener(event, cb)

        })

    }
}

export const calcView = new CalcView()