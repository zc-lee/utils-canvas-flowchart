export default {
    getControlType(x, y) {
        let type = null,
            item = this.chooseItem;
        if (!item) return;
        let { flex } = this.options,
            [yTop, yBottom, xLeft, xRight] = [item.y, item.y + item.height, item.x, item.x + item.width];
        // ! 逻辑复杂
        if (!this.options.dragLine || !this.typeIsLine(item)) {
            if (xLeft - flex < x && x < xLeft) {
                if (yTop - flex < y && y < yTop) {
                    type = "resizeToTopLeft"
                } else if (yBottom < y && y < yBottom + flex) {
                    type = "resizeToBottomLeft"
                } else if (yTop < y < yBottom) {
                    type = "resizeToLeft"
                }
            } else if (xRight < x && x < xRight + flex) {
                if (yTop - flex < y && y < yTop) {
                    type = "resizeToTopRight"
                } else if (yBottom < y && y < yBottom + flex) {
                    type = "resizeToBottomRight"
                } else if (yTop < y && y < yBottom) {
                    type = "resizeToRight"
                }
            } else if (xLeft < x && x < xRight) {
                if (y < yTop && y > yTop - flex) {
                    type = "resizeToTop"
                } else if (yBottom + flex > y && y > yBottom) {
                    type = "resizeToBottom"
                } else if (yTop < y && y < yBottom) {
                    type = "dragging"
                }
            }
        } else if (this.isDotInCenterDot(item, [x, y])) {
            type = 'dragging'
            this._startXY = this.isDotInCenterDot(item, [x, y])
        }
        this.control = type;
    },
    clearControl() {
        this.control = null
        this.canMove = false
    },
    /**
     * @method
     * @description 修改指针
     */
    changePointer(e) {
        let cursor = 'default';
        if (this.control == 'resizeToTop' || this.control == 'resizeToBottom') {
            cursor = 's-resize'
        } else if (this.control == 'resizeToLeft' || this.control == 'resizeToRight') {
            cursor = 'e-resize'
        } else if (this.control == 'resizeToTopLeft' || this.control == 'resizeToBottomRight') {
            cursor = 'se-resize'
        } else if (this.control == 'resizeToBottomLeft' || this.control == 'resizeToTopRight') {
            cursor = 'ne-resize'
        } else if (this.isItem(...this.getPointerXY(e))) {
            cursor = 'pointer'
        }
        this.canvas.style.cursor = cursor;
    },
    /**
     * @method
     * @description 获取坐标
     * @param {*} e 
     */
    getPointerXY(e) {
        let { canvas } = this,
            x = e.pageX - canvas.offsetLeft,
            y = e.pageY - canvas.offsetTop;
        return [x, y]
    },
    /**
     * @method
     * @description 函数节流
     * @param {*} handler 
     * @param {*} wait 
     */
    throttle(handler, wait = 1000 / this.options.frame) {
        return (function () {
            var nowTime = new Date().getTime();
            if (nowTime - this._lastTime > wait) {
                handler.apply(this, arguments);
                this._lastTime = nowTime;
            }
        }).call(this)
    },
    /**
     * @method
     * @description 生成随机id
     */
    createRandomId() {
        return (Math.random() * 10000000).toString(16).substr(0, 4) + '-' + (new Date()).getTime() + '-' + Math.random().toString().substr(2, 5);
    }
}