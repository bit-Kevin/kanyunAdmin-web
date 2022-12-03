<template>
    <div class="logIn-container">
        <div class="logIn-box">
            <h2 class="title-box">看云后台管理系统</h2>
            <!-- 表单区域 -->
            <el-form ref="loginFormRef" :model="formData" :rules="loginFormRules" class="form" label-width="0px">
                <el-form-item class="input-box" prop="username">
                    <el-input  v-model="formData.username" prefix-icon="el-icon-user" type="text"></el-input>
                </el-form-item>
                <el-form-item class="input-box" prop="password">
                    <el-input v-model="formData.password" prefix-icon="el-icon-lock" type="password"></el-input>
                </el-form-item>
                <el-form-item class="button-box">
                    <el-button type="primary" @click="verifyForm()"   round>登录</el-button>
                    <el-button type="info" @click="reSet()" round>重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import QueryString from 'qs';

export default {
    name: 'logIn',
    data() {
        return {
            //表单数据
            formData: {
                username: 'admin',
                password: '123456',
            },
            //输入框验证规则
            loginFormRules: {
                username: [
                    { required: true, message: '请输入管理员账号', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        //输入框重置
        reSet(){
            this.$refs.loginFormRef.resetFields()
        },
        //表单提交时的预验证，返回布尔值给回调函数
        verifyForm(){
            const data ={
                            userName: this.formData.username ,
                            userPassword: this.formData.password,
                        }
            this.$refs.loginFormRef.validate((result)=>{
                if(result){
                    axios({
                        method:'POST',
                        url:'http://localhost:10501/manage/login',
                        // axios给后端传数据需要用qs 序列化一下  安装 npm i qs -S
                        data: QueryString.stringify(data),
                        responseType:'json'
                    }).then(
                        response => {
                            console.log(response);
                            //使用消息组件，提示消息
                            if(response.data.state===200){
                                this.$message.success(response.data)
                                //将登录名存入token 用于后面的登录验证
                                window.sessionStorage.setItem('token',response.data.user.userName)
                                //跳转页面
                                this.$router.push('/home')
                                return
                            }
                            if(response.data.state===403)this.$message.error(response.data)
                    },
                    error => {
                        this.$message.error(error.message)
                    }
                    )
                    return
                }
                alert('账号/密码错误')
            })
        }
    },
}
</script>
  
<style scoped>
.title-box {
    margin-top: 30px;
    display: block;
    text-align: center;
}

.form {
    height: 80%;
    width: 100%;
    overflow: hidden;
}

.logIn-container {
    height: 100%;
    width: 100%;
    overflow: hidden;
}

.logIn-box {
    width: 500px;
    height: 350px;
    background-color: #fff;
    margin: auto;
    margin-top: 280px;
    border-radius: 4px;
    overflow: hidden;

}

/* 输入框 */

.input-box {

    margin-top: 35px;
    margin-bottom: 20px;
    margin-left: 40px;
    margin-right: 40px;
}

/* 按钮 */
.button-box {
    margin-top: 35px;
    margin-right: 40px;
    float: right;
}
</style>