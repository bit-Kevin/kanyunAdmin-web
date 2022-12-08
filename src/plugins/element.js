import Vue from 'vue'

//导入消息弹窗组件
//导入弹窗确认组件
import {
    MessageBox,
    Message,
    Form,
    Input,
    FormItem,
    Button,
    Main,
    Aside,
    Header,
    Container,
    Submenu,
    MenuItem,
    Menu,
    Breadcrumb,
    BreadcrumbItem,
    Card,
    Row,
    Col,
    Table,
    TableColumn,
    Tooltip,
    Pagination,
    Dialog,
    Select,
    Option
} from 'element-ui';

Vue.prototype.$message = Message
    //全局挂载Vue.prototype.$confirm = MessageBox.confirm  不使用MessageBox.confirm 会导致取消按键消失
Vue.prototype.$confirm = MessageBox.confirm

Vue.use(Button)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Form)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Container)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Menu)
    // 用户页
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
    // 阑珊布局
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)