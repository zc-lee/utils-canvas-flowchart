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
    // 函数注入目标 @click需注入this   onclick无需注入
    This = window,
    // 弹框 弹框弹出时 关闭键盘删除事件
    dialog:false,
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
        dbClick: null,
        beforeDelete:null
    },
    // 设置颜色
    options = {
        type: "2d",
        // 使用默认按钮
        useBtn: true,
        // 按钮状体 点击后将一直处于该状态
        btnState:{
            choose:true,
            delete:false,
            connect:false,
        },
        // 连线规则
        connectRule: {
            // 弹窗警告
            alertWarn: false,
            // 从结束节点开始
            fromEnd: false,
            // 指向开始节点
            toStart: false,
            // 起始规则函数 return boolean
            from: () => { return true },
            // 结束规则函数  return boolean
            to: () => { return true }
        },
        // 自定义按钮传入添加按钮id可拖拽添加
        addId:null,
        // 线条拖拽
        dragLine: true,
        // 编辑
        edit: true,
        // 函数节流帧数
        frame: 60,
        // 弹性距离
        flex: 6,
        // 删除开始结束
        deleteStartEnd:false,
        // 开始Id
        startId:1,
        // 结束标签id 不显示编号
        endId:2,
        // 初始title
        title:'',
        // 初始text
        text:'',
    },
    // 元素集合
    rects = [],
    lines = []
}
``` 