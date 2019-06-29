import rect from './draw-rect'
import line from './draw-line'
import text from './draw-text'
export default {
    ...rect,
    ...line,
    ...text,
    /**
     * @method
     * @description
     */
    draw() {
        this.clearCanvas();
        if (this.lines[0]) {
            this.drawLine()
        }
        if (this.rects[0]) {
            this.drawRect()
        }
    },
    clearCanvas() {
        let { width, height } = this.style
        this.ctx.clearRect(0, 0, width, height);
    },
    isRectHaveLineRule(rect, line) {
        return line.from == rect.id || line.to == rect.id
    },
    dragging(e) {
        let {chooseItem,rects,lines}=this,
        isLine=this.typeIsLine(chooseItem),
        target=isLine?lines:rects,
        item = target.find(v => v.id == chooseItem.id)
        if (!item) return;
        isLine? this.dragLine(e) : this.moveRect(e)
    },
    /**
     * @method
     * @description 点击元素
     */
    isItem() {
        /**
         * 优先级：
         *      矩形 > 线条
         *      最后操作过的元素优先
         */
        return this.isRect(...arguments) || this.isLine(...arguments)
    },
    typeIsLine(item) {
        return Reflect.has(item, 'nodes')
    },
    moveItemToEnd() {
        let { chooseItem } = this
        if (!chooseItem) return;
        let type = this.typeIsLine(chooseItem) ? 'lines' : 'rects';
        let index = this[type].findIndex(v => v.id == chooseItem.id)
        this[type] = this[type].concat(this[type].splice(index, 1))
    },
    delItem(item = this.chooseItem) {
        this.typeIsLine(item) ? this.delLine(item) : this.delRect(item)
        this.draw()
    }
}