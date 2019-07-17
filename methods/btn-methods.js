export default {
    connect(e) {
        this.choose(e)
        let { lineFrom, chooseItem } = this
        if (!chooseItem || this.typeIsLine(chooseItem)) return this.lineFrom = null;
        if (!lineFrom) {
            let { fromEnd, from, alertWarn } = this.options.connectRule,
                { endId } = this.options,
                warn = 'from can`t be end node!!!',
                match = 'from can`t match from rule!!!'
            if (!fromEnd && chooseItem.id == endId)
                return alertWarn ? alert(warn) : console.warn(warn)
            if (!from)
                return alertWarn ? alert(match) : console.warn(match)
            this.lineFrom = chooseItem
        } else if (chooseItem.id == lineFrom.id) {
            return
        } else {
            let { toStart, to, alertWarn } = this.options.connectRule,
                { startId } = this.options,
                warn = 'to can`t be start node!!!',
                match = 'to can`t match to rule!!!'
            if (!toStart && chooseItem.id == startId)
                return alertWarn ? alert(warn) : console.warn(warn)
            if (!to)
                return alertWarn ? alert(match) : console.warn(match)
            this.addLine(chooseItem.id)
            if (!this.options.btnState.connect)
                this.chooseOne()
        }
    },
    choose(e) {
        this._startXY = this.getPointerXY(e)
        this.chooseItem = this.isItem(...this._startXY)
        this.getControlType(...this._startXY)
        this.changePointer(e)
        this.draw();
        if (this.chooseItem) {
            this.moveItemToEnd()
            this.canMove = true;
        } else if (this.options.clickEmptyInit && this.btnState != 'choose') {
            this.btnState = 'choose'
        }
    },
    async delete(e) {
        if (e)
            this.choose(e)
        let { chooseItem } = this,
            { beforeDelete } = this.methods,
            { deleteStartEnd, startId, endId } = this.options;
        if (!chooseItem) return;
        if (!deleteStartEnd && !this.typeIsLine(chooseItem) && (chooseItem.id == startId || chooseItem.id == endId)) return console.warn('Pleace set options deleteStartEnd');
        if (beforeDelete) {
            await beforeDelete(chooseItem);
        }
        this.delItem()
    },
    addItem() {
        this.addRect()
    },
    deleteItem() {
        if (!this.options.btnState.delete)
            return this.delete()
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
            let background = btns[i].id == key ? '#ccc' : null;
            btns[i].style.background = background
        }
    }
}