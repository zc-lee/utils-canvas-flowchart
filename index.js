/**
 * @class 流程图工具
 * @date 2019-06-12
 * @description {*} 
 * 1、添加/删除（矩形、折线）
 * 2、修改（矩形大小、折线方向）
 * 3、移动（拖拽移动矩形、矩形移动时所连接折线移动）
 */
//
/** 功能逻辑梳理
元素
    矩形
    折线
操作
    指针修改
        移动至元素 - 小手
        拖拽 - 四角箭头
        矩形缩放
            ↔ ↕ ↖ ↘ ↙ ↗
    矩形缩放
    折线拆分
process：
    1.create canvas dom tree
    2.add click event
        add rect
        delect rect
        choose rect
        add line:connect rect by line when click one rect to another
        delect line:clear rects connection
    3.add listen mouse event
        mouse move:
            judge is mouse move or move element
            mouse move:
            move element:
 */
import Functions from './methods/functions'
export default class Canvas extends Functions {
    constructor({
        // 容器id
        id = 'Canvas',
        // 函数注入目标 @click需注入this   onclick无需注入
        This = window,
        // 弹框 弹框弹出时 关闭键盘删除事件
        dialog = false,
        style = {},
        // 自定义按钮注入事件名称
        methodsName = {},
        // 注入事件（双击事件）
        methods = {
            dbClick: null,
            beforeDelete: null
        },
        // 设置颜色
        options = {},
        // 元素集合
        rects = [],
        lines = [],
    }) {
        super()
        let defaultStyle = {
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
            defaultOptions = {
                type: "2d",
                // 使用默认按钮
                useBtn: true,
                // 点击空白初始化状态为选择
                clickEmptyInit:true,
                // 按钮状体 点击后将一直处于该状态
                btnState: {
                    choose: true,
                    delete: true,
                    connect: true,
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
                addId: null,
                // 线条拖拽
                dragLine: true,
                // 编辑
                edit: true,
                // 函数节流帧数
                frame: 60,
                // 弹性距离
                flex: 6,
                // 删除开始结束
                deleteStartEnd: false,
                // 开始Id
                startId: 1,
                // 结束标签id 不显示编号
                endId: 999999999,
                // 初始title
                title: '',
                // 初始text
                text: '',
            }, defaultMethods = {
                add: 'add',
                delete: 'del',
                connect: 'connect',
                choose: 'choose'
            }
        Object.assign(defaultStyle, style)
        Object.assign(defaultOptions, options)
        Object.assign(defaultMethods, methodsName)
        Object.assign(this, {
            id,
            This,
            dialog,
            style: defaultStyle,
            options: defaultOptions,
            methodsName: defaultMethods,
            methods,
            rects,
            lines,
            DOM: document.getElementById(id),
            chooseItem: null,
            /** 控制
             * dragging 拖拽矩形
             * resizeToTop
             * resizeToTopLeft
             * resizeToTopRight
             * resizeToLeft
             * resizeToRight
             * resizeToBottom
             * resizeToBottomLeft
             * resizeToBottomRight
             */
            control: null,
            isDragging: false,
            dragAdd: false,
            _lastTime: 0,
            _startXY: [0, 0],
            // 新增连接线
            lineFrom: null, // 有则[fromId,toId] 无则null 
            btnState: 'choose',
            rectId: 1,
            lineId: lines[0] ? Math.max(...lines.map(v => v.id)) + 1 : 1
        })
        this.rectId = rects[0] ? Math.max(...rects.map(v => v.id).filter(v => v != this.options.endId)) + 1 : 1,
            this.init()
    }
}

