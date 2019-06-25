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
        style = {},
        // 自定义按钮注入事件名称
        methodsName = {},
        // 注入事件（双击事件）
        methods = {
            dbClick: null
        },
        // 设置颜色
        options = {},
        // 元素集合
        rects = [],
        lines = []
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
                // 线条拖拽
                dragLine: true,
                // 编辑
                edit: true,
                // 函数节流帧数
                frame: 60,
                // 弹性距离
                flex: 6,
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
            _lastTime: 0,
            _startXY: [0, 0],
            // 新增连接线
            lineFrom: null, // 有则[fromId,toId] 无则null 
            btnState: 'choose',
            itemId:rects.length+lines.length+1
        })
        this.init()
    }
}

