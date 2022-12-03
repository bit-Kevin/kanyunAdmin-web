import Vue from 'vue'

//导入消息弹窗组件
//导入弹窗确认组件
import { MessageBox, Message, Form, Input, FormItem, Button } from 'element-ui';

Vue.prototype.$message = Message
    //全局挂载Vue.prototype.$confirm = MessageBox.confirm  不使用MessageBox.confirm 会导致取消按键消失
Vue.prototype.$confirm = MessageBox.confirm

Vue.use(Button)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Form)