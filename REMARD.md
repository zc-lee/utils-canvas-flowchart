# 使用说明

> 引入
```
npm install -D canvas-flowchart
import canvas from 'canvas-flowchart'
``` 

> 使用
```
new canvas({
    ...params
})
``` 

> 默认参数
```
{
    // 容器id
    id = 'Canvas',
    style = {
        width: 1000,
        height: 800,
        cssText: null,
        rectColor: '#000',
        lineColor: '#808080',
        chooseColor: '#808080',
        fillColor: '#fff',
        lineWidth: 1,
        lineCap: 'round',
        lineJoin: 'round',
        fontColor: '#808080',
        textBaseline: 'middle',
        textAlign: "center",
        font: '12px arial'
    },
    // 自定义按钮注入事件名称
    methodsName = {
        add: 'add',
        delete: 'del',
        connect: 'connect',
        choose: 'choose'
    },
    // 注入事件（双击事件）
    methods = {
        dbClick: null
    },
    // 设置颜色
    options = {
        type: "2d",
        // 使用默认按钮
        useBtn: true,
        // 线条拖拽
        dragLine: true,
        // 编辑
        edit: true,
        // 函数节流帧数
        frame: 60,
        // 弹性距离
        flex: 6,
    },
    // 元素集合
    rects = [],
    lines = []
}
``` 