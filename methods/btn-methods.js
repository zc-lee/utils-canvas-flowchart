export default {
    connect(e) {
        this.choose(e)
        let { lineFrom, chooseItem } = this
        if (!chooseItem) return this.lineFrom = null;
        if (!lineFrom) {
            this.lineFrom = chooseItem
        } else if (chooseItem.id == lineFrom.id) {
            return
        } else {
            this.addLine(chooseItem.id)
        }
    },
    choose(e) {
        this._startXY = this.getPointerXY(e)
        this.chooseItem = this.isItem(...this._startXY)
        this.moveItemToEnd()
        this.canMove = true;
        this.getControlType(...this._startXY)
        this.changePointer(e)
        this.draw();
    },
    delete(e) {
        if (e)
            this.choose(e)
        let { chooseItem } = this;
        if (!chooseItem) return;
        this.delItem()
    },
    addItem() {
        this.addRect()
    },
    deleteItem() {
        this.changeBtnState('delete')
    },
    connectItem() {
        this.changeBtnState('connect')
        this.chooseItem = null;
        this.lineFrom = null;
        this.draw();
    },
    chooseOne() {
        this.changeBtnState('choose')
    },
    changeBtnState(key) {
        this.btnState = key
        let btns = document.getElementsByClassName('canvas-btn')
        for (let i = 0; i < btns.length; i++) {
            let background=btns[i].id==key?'#ccc':null;
            btns[i].style.background=background
        }
    }
}