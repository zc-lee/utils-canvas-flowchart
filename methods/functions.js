
import Init from './init-methods'
import btn from './btn-methods'
import canvas from './canvas-methods'
import control from './control-methods'
import mouse from './mouse-methods'
export default class Function extends Init {
    constructor() {
        super()
        Object.assign(this, canvas, btn, control, mouse)
    }
}