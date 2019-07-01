export default {
    addRect(x = this.options.flex, y = this.options.flex, width = 80, height = 100, id = this.rectId, title = this.options.title, text = this.options.text) {
        let rect = { x, y, width, height, id, title, text }
        this.rects.push(rect)
        this.rectId++;
        this.chooseItem = rect;
        this.draw()
    },
    delRect(rect) {
        let { lines, rects } = this
        this.rects = rects.filter(v => v.id != rect.id)
        if (!lines[0]) return this.draw()
        lines.forEach(v => {
            this.isRectHaveLineRule(rect, v) ? this.delLine(v) : ''
        })
    },
    drawRect() {
        let { ctx, style, chooseItem } = this,
            { flex, endId } = this.options;
        this.rects.forEach(e => {
            ctx.strokeStyle = style.rectColor;
            ctx.fillStyle = style.fillColor;
            ctx.fillRect(...Object.values(e))
            ctx.strokeRect(...Object.values(e));
            if (e.title)
                this.drawText(endId == e.id ? e.title : `${e.id}-` + e.title, e.x + e.width / 2, e.y + flex + 12, e.width - 2 * flex, 1)
            if (e.text)
                this.drawText(e.text, e.x + e.width / 2, e.y + e.height / 2, e.width - 2 * flex, 2)
            if (chooseItem && !this.typeIsLine(chooseItem) && chooseItem.id == e.id) {
                ctx.strokeStyle = style.chooseColor
                ctx.strokeRect(e.x - flex, e.y - flex, e.width + 2 * flex, e.height + 2 * flex);
            }
        });
    },
    moveRect(e) {
        let item = this.chooseItem,
            startXY = this._startXY,
            nowXY = this.getPointerXY(e),
            moveXY = [nowXY[0] - startXY[0], nowXY[1] - startXY[1]];
        this._startXY = nowXY;
        Object.assign(item, {
            x: item.x + moveXY[0],
            y: item.y + moveXY[1]
        })
        let { lines } = this;
        if (lines.some(v => this.isRectHaveLineRule(item, v))) {
            this.moveLine(item)
        }
        this.draw();
    },
    resizeRect(e) {
        let { control, chooseItem, _startXY, lines } = this,
            nowXY = this.getPointerXY(e),
            moveXY = [nowXY[0] - _startXY[0], nowXY[1] - _startXY[1]];
        this._startXY = nowXY;
        // ! + or -
        let newObj = {
            x: (/Left/).test(control) ? chooseItem.x + moveXY[0] : chooseItem.x,
            y: (/Top/).test(control) ? chooseItem.y + moveXY[1] : chooseItem.y,
            width: !(/Left|Right/).test(control) ? chooseItem.width : (/Left/).test(control) ? chooseItem.width - moveXY[0] : chooseItem.width + moveXY[0],
            height: !(/Top|Bottom/).test(control) ? chooseItem.height : (/Top/).test(control) ? chooseItem.height - moveXY[1] : chooseItem.height + moveXY[1]
        }
        if (newObj.width > 0 && newObj.height > 0) {
            Object.assign(chooseItem, newObj)
            if (lines.some(v => this.isRectHaveLineRule(chooseItem, v))) {
                this.moveLine(chooseItem)
            }
            this.draw();
        }
    },
    isRect() {
        let isRectRule = (rect, arg) => {
            let { flex } = this.options;
            let [startX, startY, endX, endY] = [rect.x - flex, rect.y - flex, rect.x + rect.width + 2 * flex, rect.y + rect.height + 2 * flex],
                [x, y] = arg;
            return x > startX && x < endX && y > startY && y < endY;
        }
        let rects = this.rects.filter(v => isRectRule(v, arguments))
        return rects.reverse()[0]
    },
}