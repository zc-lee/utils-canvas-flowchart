// 已知线段1(a,b) 和线段2(c,d) ,其中a b c d为端点[x,y], 求线段交点p .(平行或共线视作不相交)

let linesInt = (a, b, c, d) => {
    /** 1 解线性方程组, 求线段交点. **/
    // 如果分母为0 则平行或共线, 不相交  
    var denominator = (b[1] - a[1]) * (d[0] - c[0]) - (a[0] - b[0]) * (c[1] - d[1]);
    if (denominator == 0) {
        return false;
    }

    // 线段所在直线的交点坐标 (x , y)      
    var x = ((b[0] - a[0]) * (d[0] - c[0]) * (c[1] - a[1])
        + (b[1] - a[1]) * (d[0] - c[0]) * a[0]
        - (d[1] - c[1]) * (b[0] - a[0]) * c[0]) / denominator;
    var y = -((b[1] - a[1]) * (d[1] - c[1]) * (c[0] - a[0])
        + (b[0] - a[0]) * (d[1] - c[1]) * a[1]
        - (d[0] - c[0]) * (b[1] - a[1]) * c[1]) / denominator;

    /** 2 判断交点是否在两条线段上 **/
    if (
        // 交点在线段1上  
        (x - a[0]) * (x - b[0]) <= 0 && (y - a[1]) * (y - b[1]) <= 0
        // 且交点也在线段2上  
        && (x - c[0]) * (x - d[0]) <= 0 && (y - c[1]) * (y - d[1]) <= 0
    ) {

        // 返回交点p  
        return [Math.floor(x), Math.floor(y)]
    }
    //否则不相交  
    return false
}

export default linesInt