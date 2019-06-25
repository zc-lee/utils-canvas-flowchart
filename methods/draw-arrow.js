export default function (line) {
    let { ctx } = this,
        { flex } = this.options,
        // 箭头顶点
        to = line.nodes[line.nodes.length - 1],
        from = line.nodes[line.nodes.length - 2],
        [fromX, fromY] = from,
        [toX, toY] = to,
        theta = 30,
        headlen = 1.5 * flex,
        // 求三个点
        // 箭头定点  直线与矩形的交点
        // 线段函数  (x-x1)/(x2-x1)=(y-y1)/(y2-y1)  (x1 <= x <= x2) (y1 <= y <= y2)
        // 矩形函数
        // 箭头两侧点

        // fromX, fromY：起点坐标（也可以换成p1，只不过它是一个数组）
        // toX, toY：终点坐标(也可以换成p2，只不过它是一个数组)
        // theta：三角斜边一直线夹角
        // headlen：三角斜边长度
        // width：箭头线宽度
        // color：箭头颜色


        // 计算各角度和对应的P2,P3坐标
        angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI,
        angle1 = (angle + theta) * Math.PI / 180,
        angle2 = (angle - theta) * Math.PI / 180,
        topX = headlen * Math.cos(angle1),
        topY = headlen * Math.sin(angle1),
        botX = headlen * Math.cos(angle2),
        botY = headlen * Math.sin(angle2);

    ctx.beginPath();

    var arrowX = fromX - topX,
        arrowY = fromY - topY;

    ctx.moveTo(arrowX, arrowY);
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    arrowX = toX + topX;
    arrowY = toY + topY;
    ctx.moveTo(arrowX, arrowY);
    ctx.lineTo(toX, toY);
    arrowX = toX + botX;
    arrowY = toY + botY;
    ctx.lineTo(arrowX, arrowY);
    ctx.closePath();
    ctx.fill()
    ctx.stroke();
}