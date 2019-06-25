export default {
    drawText(text, x, y, width,line = null) {
        if(!text) return;
        let { ctx, style } = this,
            arr = text.split(''),
            temp = "",
            row = [],
            lineHeight=16,
            strWidth = (str) => {
                return ctx.measureText(str).width
            }
        ctx.fillStyle = style.fontColor;
        for (let i = 0; i < arr.length; i++) {
            if (strWidth(temp) < width && strWidth(temp + arr[i]) <= width) {
                temp += arr[i]
            } else {
                row.push(temp)
                temp = arr[i]
            }
        }
        row.push(temp)
        for (let i = 0; i < row.length; i++) {
            let str=row[i]
            if (i+1 == line) {
                if(row[i+1]){
                    str=str.substring(0,str.length-3)+'...'
                }
                return ctx.fillText(str, x, y + lineHeight*i)
            } else {
                ctx.fillText(str, x, y + lineHeight * i)
            }
        }
    }
}