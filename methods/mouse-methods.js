export default {
    onmousedown(e) {
        this[this.btnState](e)
    },
    onmouseup(e) {
        this.clearControl(e)
    },
    onmouseout(e) {
        this.onmouseup(e)
    },
    onmousemove(e) {
        this.throttle((function (e) {
            if (this.chooseItem) {
                this.canMove ?
                    this.control == 'dragging' ? this.dragging(e) : this.resizeRect(e) : this.getControlType(...this.getPointerXY(e))
            }
            this.changePointer(e)
        }).bind(this, e))
    },
    ondblclick(e) {
        this.choose(e)
        this.clearControl()
        let { dbClick } = this.methods
        if (!dbClick) return;
        dbClick(this.chooseItem)
    }
}