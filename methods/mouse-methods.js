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
            if (this.dragAdd) {
                let [x, y] = this.getPointerXY(e)
                this._startXY = [x,y]
                this.addRect(x, y)
                this.canMove = true
                this.dragAdd = false
                this.control = 'dragging'
            } else if (this.chooseItem) {
                this.canMove ?
                    this.control == 'dragging' ? this.dragging(e) : this.resizeRect(e) : this.getControlType(...this.getPointerXY(e))
            }
            this.changePointer(e)
        }).bind(this, e))
    },
    ondblclick(e) {
        this.choose(e)
        this.clearControl()
        let {chooseItem}=this
        if(!chooseItem) return;
        let { dbClick } = this.methods
        if (!dbClick) return console.warn('Pleace add params of dbClick method');
        dbClick(chooseItem)
    }
}