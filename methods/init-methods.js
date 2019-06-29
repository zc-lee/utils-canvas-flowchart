export default class Init {
    init() {
        this.createCanvasDom();
        this.draw();
        if (this.options.edit)
            this.addMethodToWindow();
    }
    addMethodToWindow() {
        let metchKeys = {
            add: 'addItem',
            delete: 'deleteItem',
            connect: 'connectItem',
            choose: 'chooseOne'
        }, { This, options } = this;
        for (let [key, val] of Object.entries(this.methodsName)) {
            This[val] = this[metchKeys[key]].bind(this)
            if (options.useBtn && This != window) {
                window[val] = this[metchKeys[key]].bind(this)
            }
            console.warn(`window添加${key}:${this.checkAddMethodToWindow(val)}`)
        }
        window.onkeydown = (e) => {
            // console.log('keydown:', e.key)
            if (!this.dialog && (e.key == 'Delete' || e.key == 'Backspace')) {
                this.delete(null)
            }
        }
    }
    checkAddMethodToWindow(key) {
        let { This } = this;
        return Object.keys(This).some(v => v == key)
    }
    /**
     * @method
     * @description 创建canvasDom
     */
    createCanvasDom() {
        this.cid = this.createRandomId();
        let { cid } = this,
            { width, height, cssText, lineWidth, textBaseline, textAlign, font } = this.style,
            { type, useBtn, edit, addId } = this.options,
            btn = `
            <div style="display: flex;justify-content: space-around;text-align: center;margin: 0px;background-color: rgb(255, 255, 255);width: 450px;padding: 3px;border: 1px solid #aaa;font-size: 12px;">
            <span id='add' class="canvas-btn" onclick="add()">add</span>
            <span id='delete' class="canvas-btn" onclick="del()">del</span>
            <span id='connect' class="canvas-btn" onclick="connect()">connect</span>
            <span id='choose' class="canvas-btn" onclick="choose()">choose</span>
          </div>
        `,
            box = `
        <canvas id="${cid}" width="${width}" height="${height}">
            <p>浏览器不支持Canvas</p>
        </canvas>
        `,
            addBtnMethod = (dom) => {
                dom.onmousedown = (e) => {
                    e.preventDefault();
                    this.dragAdd = true
                }
                dom.onmouseup = (e) => {
                    e.preventDefault();
                    this.dragAdd = false
                }
            };
        this.DOM.innerHTML = edit && useBtn ? btn + box : box;
        if (useBtn) {
            let btns = document.getElementsByClassName('canvas-btn')
            for (let i = 0; i < btns.length; i++) {
                btns[i].style.cssText = "border: 1px solid #808080;padding: 3px;width: 80px;cursor: pointer;"
                btns[i].style.background = this.btnState == btns[i].id ? '#ccc' : null;
                btns[i].onmouseover = () => {
                    btns[i].style.background = '#ccc';
                }
                btns[i].onmouseout = () => {
                    btns[i].style.background = this.btnState == btns[i].id ? '#ccc' : null;
                }
                if (btns[i].id == 'add') {
                    addBtnMethod(btns[i])
                }
            }
        }
        if (addId) {
            let addBtn = document.getElementById(addId)
            addBtnMethod(addBtn)
        }
        let canvas = document.getElementById(cid)
        if (!canvas.getContext) {
            return console.error('你的浏览器不支持Canvas!');
        }
        if (edit)
            ['onmousedown', 'onmouseup', 'onmouseout', 'onmousemove', 'ondblclick'].forEach(v => {
                canvas[v] = this[v].bind(this)
            })
        canvas.style.cssText = cssText;
        this.canvas = canvas
        this.ctx = this.canvas.getContext(type)
        Object.assign(this.ctx, {
            lineWidth,
            textBaseline,
            textAlign,
            font
        })
    }
}