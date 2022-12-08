<template>
  <div>
    <!-- 顶部面包屑 -->
    <el-breadcrumb class="nav-box" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <!-- 用户搜索框 使用阑珊布局 gutter是之间的间隔 span是每个格子的大小 总共是24-->
      <el-row :gutter="40">
        <el-col :span="12">
          <!-- 将原生事件绑定到组件需要借助.native修饰符 -->
          <el-input @keyup.enter.native="queryByLikeWord" placeholder="请输入内容" v-model="pageInfo.likeWord" clearable
            @clear="queryUserList">
            <el-button slot="append" icon="el-icon-search" @click="queryByLikeWord"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" round @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表 -->
      <el-table :data="UserList" :border="true" class="table-box" style="width: 100%" :stripe="true">
        <el-table-column type="index" prop="userId" label="#" width="70">
        </el-table-column>
        <el-table-column prop="userName" label="账号">
        </el-table-column>
        <el-table-column prop="userNickname" label="昵称">
        </el-table-column>
        <el-table-column prop="userTelephoneNumber" label="联系方式">
        </el-table-column>
        <el-table-column prop="userEmail" label="邮箱">
        </el-table-column>
        <el-table-column label="注册时间">
          <template slot-scope="scope">
            <!-- 时间转换精确到分一个参数  年月日需要两个格式 parseTime(scope.row.creatTime, "{y}-{m}-{d}")-->
            {{ $parseTime(scope.row.userRegistrationTime) }}
          </template>
        </el-table-column>
        <!-- 自定义列显示效果 -->
        <el-table-column label="账号状态">
          <!-- 作用域插槽  数据在自身，当需要父类来指定显示啥数据 scope.row这一行的数据 -->
          <template slot-scope="scope">
            {{ (scope.row.userState === 0) || (scope.row.userState === 2) || (scope.row.userState === 4) ||
                (scope.row.userState === 6) ? '正常' : '冻结'
            }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220">
          <!-- 作用域插槽  数据在自身，当需要父类来指定显示啥数据 scope.row这一行的数据 -->
          <template slot-scope="scope">
            <!-- 悬浮向上弹出信息 -->
            <el-tooltip effect="dark" content="冻结用户" placement="top" :enterable="false">
              <!-- 冻结，禁用按键 -->
              <el-button type="primary" icon="el-icon-s-help" size="mini" :disabled="(scope.row.userState === 0) || (scope.row.userState === 2) || (scope.row.userState === 4) ||
              (scope.row.userState === 6) ? false : true"
                @click="ChangingAccountStatus(1, scope.row.userId)"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="解除冻结" placement="top" :enterable="false">
              <!-- 未冻结，禁用按键 -->
              <el-button type="warning" icon="el-icon-help" size="mini" :disabled="(scope.row.userState === 0) || (scope.row.userState === 2) || (scope.row.userState === 4) ||
              (scope.row.userState === 6) ? true : false"
                @click="ChangingAccountStatus(-1, scope.row.userId)"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除用户" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" size="mini"
                @click="verifyDeleteUser(scope.row.userId)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="pageInfo.pageNum" :page-sizes="[2, 5, 10]" :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total" :pager-count=9>
      </el-pagination>
    </el-card>

    <!-- 添加用户的对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="handleClose">
      <!-- 身体区域 -->
      <el-form :model="addForm" :rules="formRules" ref="addForm" label-width="100px">
        <el-form-item label="账号" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="addForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password1">
          <el-input v-model="addForm.password1"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
          <el-input v-model="addForm.password2"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="tel">
          <el-input v-model="addForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="角色选择">
          <el-select v-model="addForm.userRole" placeholder="请选择角色">
            <el-option label="管理员" value=0></el-option>
            <el-option label="普通用户" value=1></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="reSetAddForm()" round>重置</el-button>
        <el-button @click="addDialogVisible = false" round>取 消</el-button>
        <el-button type="primary" @click="verifyForm" round>确 定</el-button>
      </span>
    </el-dialog>

    <!-- 删除用户的对话框 -->
    <el-dialog title="提示" :visible.sync="deleteDialogVisible" width="30%" :before-close="handleClose">
      <span>确认是否删除用户</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteUser()">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>
  
<script>
import axios from 'axios';
import QueryString from 'qs';


export default {
  name: 'userManage',
  data() {
    //自定义密码检查 因为这变量需要拿其他的数据所以需要写在data里面
    const CheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.addForm.password1) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    }
    const CheckNameIsExist = (_, value, callback) => {
      this.CheckNameIsExist(value)
      setTimeout(() => {
        if (this.isExist) {
          callback();
        }
        else {
          callback(new Error('用户名已存在'));
        }
      }, 1000);


    }
    return {
      UserList: [],
      pageInfo: {
        pageNum: 1, // 当前页数
        pageSize: 2, // 每页显示条数
        pages: 0,// 总页数
        total: 0,// 总条数
        likeWord: '',
      },
      // 控制添加用户的对话框
      addDialogVisible: false,
      //控制删除用户提示框
      deleteDialogVisible: false,
      //当前操作的用户id
      userId: '',
      //添加用户表单数据
      addForm: {
        name: '',
        nickname: '',
        password1: '',
        password2: '',
        tel: '',
        email: '',
        userRole: ''
      },
      //添加用户表单验证规则
      formRules: {
        //规则名必须和变量名一样，不然会一直为空
        name: [
          { required: true, message: '账号不能为空', trigger: 'blur' },
          { pattern: /^[A-Za-z0-9]{4,10}$/, message: "账号只能是5-10位的英文字符或数字", trigger: 'blur' },
          // 校验账户是否存在
          { validator: CheckNameIsExist, trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '昵称不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        password1: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { pattern: /^\w{4,12}$/, message: '密码只能由数字、26个英文字母或者下划线组成的5-12位字符串', trigger: 'blur' }
        ],
        password2: [
          // 使用自定义校验规则
          { validator: CheckPass, trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: "手机号格式不对", trigger: "blur" },
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, message: '请输入正确的邮箱格式', trigger: 'blur' }
        ]
      },
      isExist: false
    }
  },
  methods: {
    queryUserList() {
      const data = {
        pageNum: this.pageInfo.pageNum,
        pageSize: this.pageInfo.pageSize,
        // likeWord: this.pageInfo.likeWord
      }
      axios({
        method: 'POST',
        url: 'http://localhost:10501/userManage/queryAllUser',
        data: QueryString.stringify(data),
        responseType: 'json'
      }).then(
        response => {
          const data = response.data
          this.UserList = data.data
          this.pageInfo.pages = data.pages
          this.pageInfo.total = data.total
        },
        error => {
          this.$message.error(error.message)
        }
      )
    },
    //改变每页数据大小
    handleSizeChange(newPageSize) {
      this.pageInfo.pageSize = newPageSize
      //发送新页请求
      this.queryUserList()
    },
    //换页
    handleCurrentChange(newPageNum) {
      this.pageInfo.pageNum = newPageNum
      //发送新页请求
      this.queryUserList()
    },
    // 模糊查询
    queryByLikeWord() {
      // 判断关键是否为空，为空给出提示
      if (this.pageInfo.likeWord === '') {
        this.$message.error("关键词为空！")
        return
      }
      const data = {
        pageNum: this.pageInfo.pageNum,
        pageSize: this.pageInfo.pageSize,
        likeWord: this.pageInfo.likeWord
      }
      axios({
        method: 'POST',
        url: 'http://localhost:10501/userManage/likeQuery',
        data: QueryString.stringify(data),
        responseType: 'json'
      }).then(
        response => {
          const data = response.data
          console.log(data);
          this.UserList = data.data
          this.pageInfo.pages = data.pages
          this.pageInfo.total = data.total
        },
        error => {
          this.$message.error(error.message)
        }
      )
    },
    //改变账户状态
    ChangingAccountStatus(change, userId) {
      const data = {
        change: change,
        userId: userId
      }
      axios({
        method: 'POST',
        url: 'http://localhost:10501/userManage/setUserState',
        data: QueryString.stringify(data),
        responseType: 'json'
      }).then(
        response => {
          const data = response.data
          //使用消息组件，提示消息
          if (data.state === 200) {
            this.$message.success(response.data)
            this.queryUserList()
          }
          if (data.state === 400) this.$message.error(response.data)
        },
        error => {
          this.$message.error(error.message)
        }
      )
    },
    //验证删除用户
    verifyDeleteUser(userId) {
      this.userId = userId
      this.deleteDialogVisible = true
    },
    //删除用户
    deleteUser() {
      const data = {
        userId: this.userId
      }
      console.log(data);
      axios({
        method: 'POST',
        url: 'http://localhost:10501/userManage/deleteUser',
        data: QueryString.stringify(data),
        responseType: 'json'
      }).then(
        response => {
          const data = response.data
          console.log(data);
          //使用消息组件，提示消息
          if (data.state === 200) {
            this.$message.success(response.data)
            this.queryUserList()
          }
          if (data.state === 400) this.$message.error(response.data)
        },
        error => {
          this.$message.error(error.message)
        }
      )
      this.deleteDialogVisible = false
    },
    //重置添加用户表单
    reSetAddForm() {
      this.$refs.addForm.resetFields()
    },
    // 对话框关闭时时将数据恢复
    handleClose() {
      this.reSetAddForm()
    },
    //验证用户名是否被使用
    CheckNameIsExist(str) {
      //axios里面不能直接返回数据，需要在外面定义一个
      axios({
        method: 'get',
        url: 'http://localhost:10501/userManage/nameIsExist/' + str,
        responseType: 'json'
      }).then(
        response => {
          const data = response.data
          if (data.state === 200) {
            this.isExist = true
          }
          if (data.state === 400) {
            this.isExist = false
          }
        }
      ),
        error => {
          this.$message.error(error.message)
        }
    },
    //表单提交时的预验证，返回布尔值给回调函数
    verifyForm() {
      const data = {
        userName: this.addForm.name,
        userNickname: this.addForm.nickname,
        userPassword: this.addForm.password1,
        userTelephoneNumber: this.addForm.tel,
        userEmail: this.addForm.email,
        userRole: this.addForm.userRole,
      }
      //validate 验证成功返回true
      this.$refs.addForm.validate((result) => {
        if (result) {
          axios({
            method: 'POST',
            url: 'http://localhost:10501/userManage/addUser',
            data: QueryString.stringify(data),
            responseType: 'json'
          }).then(
            response => {
              const data = response.data
              if (data.state === 200) {
                this.$message.success(data.message)
                //隐藏弹窗
                this.addDialogVisible = false
                //刷新用户
                this.queryUserList()
              }
              if (data.state === 400) {
                this.$message.error(data.message)
              }
            }
          ),
            error => {
              this.$message.error(error.message)
            }
        }
      })
    }
  },
  created() {
    //初始化时请求数据
    this.queryUserList()
  },

}
</script>
  
<style scoped>
.nav-box {
  margin-bottom: 20px;
}

/* 用户列表 */
.table-box {
  margin-top: 20px;
}

/* 分页栏 */
.el-pagination {
  margin-top: 30px;
}
</style>