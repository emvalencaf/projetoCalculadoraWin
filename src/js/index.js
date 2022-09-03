    //módulos
import { calcController } from "./controller/calc.controller.js"

console.log(calcController)

Array.from([...document.querySelectorAll("button")]).forEach( btn => {

    calcController.addEventListenerAll(btn, 'click drag')

})

