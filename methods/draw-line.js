import linesInt from './lines-intersect'
import drawArrow from './draw-arrow'
import dotLineDistence from './dot-line-distance'
export default {
    linesInt,
    drawArrow,
    dotLineDistence,
    addLine(to) {
        let from = this.lineFrom.id,
            lines = this.lines;
        if (lines.some(v => (v.from == from && v.to == to) || (v.from == to && v.to == from))) {
            alert('exist')
        } else {
            this.lines.push({ from, to, nodes: this.getInitLineNodes({ from, to }), dots: [], id: this.itemId })
            this.itemId++
        }
        this.chooseItem = null;
        this.lineFrom = null
        this.draw()
    },
    delLine(line) {
        this.lines = this.lines.filter(v => v.id != line.id)
        this.draw()
    },
    getInitLineNodes(line) {
        let { from, to } = line,
            { rects } = this,
            fromRect = rects.find(v => v.id == from),
            toRect = rects.find(v => v.id == to)
        let startXY = [fromRect.x + fromRect.width / 2, fromRect.y + fromRect.height / 2],
            endXY = [toRect.x + toRect.width / 2, toRect.y + toRect.height / 2]
        return [this.getRectLineInt(fromRect, [startXY, endXY]), this.getRectLineInt(toRect, [startXY, endXY])]
    },
    /**
     * @method
     * @description 获取节点
     * @param {*} line 
     * @param {*} type circle:可操作点 all：全部 nodes：转折点 center：线段中点
     */
    getLineNodes(line, type = "circle") {
        let nodes = [],
            arr = line.nodes
        arr.forEach((v, i) => {
            if (type == 'all') {
                //首尾 + 转折点
                nodes.push(v)
            } else if (type != 'center' && i != 0 && i != arr.length - 1) {
                //转折点 不含首位
                nodes.push(v)
            }
            // 中点
            if (arr[i + 1] && type != 'nodes') { // 存在中点
                let dot1 = arr[i],
                    dot2 = arr[i + 1];
                nodes.push([(dot1[0] + dot2[0]) / 2, (dot1[1] + dot2[1]) / 2])
            }
        })
        return nodes
    },
    drawLine() {
        let { ctx, lines, chooseItem, style, options } = this;
        ctx.lineJoin = style.lineJoin;
        ctx.lineCap = style.lineCap;
        lines.forEach(e => {
            let isChoose = chooseItem && e.id == chooseItem.id,
                nodes = e.nodes
            nodes = nodes.filter(v => v)
            if (!nodes[0]) return;
            if (options.dragLine && isChoose) {
                ctx.fillStyle = style.chooseColor
                this.getLineNodes(e).forEach(v => {
                    ctx.beginPath();
                    ctx.arc(...v, 2, 0, 2 * Math.PI);
                    ctx.fill()
                    ctx.stroke();
                })

            }
            ctx.strokeStyle = ctx.fillStyle = isChoose ? style.chooseColor : style.lineColor
            ctx.beginPath();
            nodes.forEach((v, i) => {
                ctx[i == 0 ? 'moveTo' : 'lineTo'](...v)
            })
            ctx.stroke();
            this.drawArrow(e)
        });
    },
    /**
     * @method
     * @description 获取矩形与直线的焦点
     */
    getRectLineInt(rect, lineDot) {
        let [a, b, c, d] = [rect.x, rect.x + rect.width, rect.y, rect.y + rect.height],
            // 矩形四点
            // [a,c] [b,c]
            // [a,d] [b,d]
            intRectDot =
                // top
                this.linesInt(...lineDot, [a, c], [b, c]) ||
                // bottom
                this.linesInt(...lineDot, [a, d], [b, d]) ||
                // left
                this.linesInt(...lineDot, [a, c], [a, d]) ||
                // right
                this.linesInt(...lineDot, [b, c], [b, d]);
        return intRectDot
    },
    isDotInLine(line, arg) {
        /**
         * @method 
         * @description 判断点是否在线上
         * @param {*} dot 
         * @param {*} fromDot 
         * @param {*} toDot 
         */
        let dotInLine = (dot, dot1, dot2) => {
            // 求点到线段的最短距离
            // !###########
            // 线性函数 y=kx+b
            // 两点式 (x-x1)/(x2-x1)=(y-y1)/(y2-y1)
            // 斜截式 求斜率：k=(y2-y1)/(x2-x1) 直线方程 y-y1=k(x-x1)
            let [x, y] = dot,
                [x1, y1] = dot1,
                [x2, y2] = dot2,
                { flex } = this.options,
                minX = x1 < x2 ? x1 : x2,
                maxX = x1 > x2 ? x1 : x2,
                minY = y1 < y2 ? y1 : y2,
                maxY = y1 > y2 ? y1 : y2,
                distence = this.dotLineDistence(x, y, x1, y1, x2, y2)
            return minX - flex < x && maxX + flex > x && minY - flex < y && maxY + flex > y && distence < flex
        },
            [x, y] = arg,
            arr = line.nodes,
            isInline = arr.find((v, i) => {
                if (!arr[i + 1]) return false;
                let dot1 = arr[i],
                    dot2 = arr[i + 1];
                return dotInLine([x, y], dot1, dot2)
            })
        return isInline
    },
    isDotInCenterDot(line, arg) {
        if (!this.isDotInLine(...arguments)) return;
        let nodes = this.getLineNodes(line),
            { flex } = this.options,
            [x, y] = arg;
        return nodes.find(v => {
            let minX = v[0] - flex,
                maxX = v[0] + flex,
                minY = v[1] - flex,
                maxY = v[1] + flex;
            return x > minX && x < maxX && y > minY && y < maxY
        })
    },
    dragLine(e) {
        let { chooseItem } = this,
            { flex } = this.options,
            nowXY = this.getPointerXY(e),
            startXY = this._startXY,
            allNodes = this.getLineNodes(chooseItem, 'all'),
            center = this.getLineNodes(chooseItem, 'center')
        if (this.isDotInLine(chooseItem, nowXY)) {
            return;
        } else {
            let index = allNodes.findIndex(v => v[0] == startXY[0] && v[1] == startXY[1])
            this._startXY = allNodes[index] = nowXY
            allNodes = allNodes.filter(v => !center.some(k => k[0] == v[0] && k[1] == v[1]))
            let removeLineDot = (nodes) => {
                // console.warn('去除三点一线')
                for (let i = 1; i < nodes.length - 1; i++) {
                    let [x, y] = nodes[i - 1],
                        [x1, y1] = nodes[i],
                        [x2, y2] = nodes[i + 1]
                    if (this.dotLineDistence(x1, y1, x, y, x2, y2) < flex) {
                        nodes.splice(i, 1)
                        return removeLineDot(nodes)
                    }
                }
                return nodes
            }
            chooseItem.nodes = removeLineDot(allNodes)
            this.draw()
        }
    },
    moveLine(rect) {
        let { lines } = this,
            items = lines.filter(v => this.isRectHaveLineRule(rect, v)),
            changeLine = (line) => {
                let isStartRect = rect.id == line.from;
                if (line.nodes.length == 2) {
                    // 直线
                    line.nodes = this.getInitLineNodes(line)
                } else {
                    // 折线
                    let changeIndex = isStartRect ? 0 : line.nodes.length - 1,
                        rectCenterDot = [rect.x + rect.width / 2, rect.y + rect.height / 2]
                    line.nodes[changeIndex] = this.getRectLineInt(rect, [rectCenterDot, line.nodes[isStartRect ? 1 : line.nodes.length - 2]])
                }
            }
        items.forEach(v => changeLine(v))
    },
    isLine() {
        let lines = this.lines.filter(v => this.isDotInLine(v, arguments))
        return lines.reverse()[0]
    }
}