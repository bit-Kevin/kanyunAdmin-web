<template>
    <el-container class="home-container">
        <!-- 头部区域 -->
        <el-header>
            <div>
                <img src="../assets/logo_white.png" alt="看云">
                <span>看云后台管理系统</span>
            </div>
            <el-button @click="logout">退出登录</el-button>
        </el-header>
        <el-container>
            <!-- 左侧菜单 -->
            <el-aside :width="toggleMenu ? '64px': '200px'">
                <div v-show="!toggleMenu" class="toggle-menu" @click="toggle_menu()">&lt;&lt;&lt;</div>
                <div v-show="toggleMenu" class="toggle-menu" @click="toggle_menu()">>>></div>
                <!-- 菜单选项 -->
                <el-menu background-color="#545c64" text-color="#fff" active-text-color="#409eff" 
                unique-opened :collapse="toggleMenu" :collapse-transition="false" router
                :default-active="activePath">
                    <!-- 菜单一 -->
                    <!-- index的值可以用于路由自动跳转，用在子分类上面,跳转子路由不需要全路径 -->
                    <!-- 点击时保存当前模块路径到浏览器 -->
                    <el-menu-item @click="saveActivePath('userManage')" index="userManage">
                            <template>
                                <i class="el-icon-s-custom"></i>
                                <span>用户管理</span>
                            </template>
                        </el-menu-item>

                    <!-- 菜单二 -->
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-unlock"></i>
                            <span>权限管理</span>
                        </template>
                        <!-- 选项1 -->
                        <el-menu-item @click="saveActivePath('uploadPermission')" index="uploadPermission">
                            <template>
                                <i class="el-icon-menu"></i>
                                <span>云朵权限</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item @click="saveActivePath('commentPurview')" index="commentPurview">
                            <template>
                                <i class="el-icon-menu"></i>
                                <span>评论权限</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>

                    <!-- 菜单三 -->
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-partly-cloudy"></i>
                            <span>云朵管理</span>
                        </template>
                        <!-- 选项1 -->
                        <el-menu-item @click="saveActivePath('classifyView')" index="classifyView">
                            <template>
                                <i class="el-icon-menu"></i>
                                <span>分类查看</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item @click="saveActivePath('userView')" index="userView">
                            <template>
                                <i class="el-icon-menu"></i>
                                <span>用户查看</span>
                            </template>
                        </el-menu-item>
                        
                    </el-submenu>

                    <!-- 菜单四 -->
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-chat-dot-round"></i>
                            <span>评论管理</span>
                        </template>
                        <!-- 选项1 -->
                        <el-menu-item @click="saveActivePath('cloudManage')" index="cloudManage">
                            <template>
                                <i class="el-icon-menu"></i>
                                <span>云朵评论管理</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item @click="saveActivePath('commentManage')" index="commentManage">
                            <template>
                                <i class="el-icon-menu"></i>
                                <span>全局评论管理</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>

                    <!-- 菜单五 -->
                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-s-marketing"></i>
                            <span>数据统计</span>
                        </template>
                        <!-- 选项1 -->
                        <el-menu-item @click="saveActivePath('cloudParcent')" index="cloudParcent">
                            <template>
                                <i class="el-icon-menu"></i>
                                <span>云朵分类占比</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 主显示区 -->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
  
<script>


export default {
    name: 'HomeVue',
    data() {
        return {
            toggleMenu:false,
            activePath:'',
        }
    },
    methods: {
        logout() {
            this.$confirm('是否退出登录?', '提示', {
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '退出成功!',
                });
                //清空登录信息，并跳转登录页
                window.sessionStorage.clear()
                this.$router.push('/login')
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消退出'
                });
            });
        },
        toggle_menu(){
            //隐藏/显示菜单
            this.toggleMenu=!this.toggleMenu
        },
        saveActivePath(path){
            this.activePath=path
            window.sessionStorage.setItem('activePath',path)
        }
    },
    watch:{
        // activePath(newValue){
        //     window.sessionStorage.setItem('activePath',newValue)
        // }
    },
    created() {
        this.activePath=window.sessionStorage.getItem('activePath')
    },

}
</script>
  
<style scoped>
.home-container {
    width: 100%;
    height: 100vh;
    overflow: hidden;
}

/* <!-- 头部区域 --> */

.el-header {
    background-color: #373d41;
    padding-left: 0;
    /* 弹性布局框 */
    display: flex;
    /* 弹性布局框的属性 两端对齐*/
    justify-content: space-between;
    color: #fff;
    font-size: 24px;
    /* 弹性布局框的属性 水平中间对齐*/
    align-items: center;
}

.el-header>div {
    display: flex;
    /* 弹性布局框的属性 水平中间对齐*/
    align-items: center;
}

.el-header>div>img {
    height: 60px;
    width: 60px;

}

.el-header>div>span {
    margin-left: 15px;
}


/* <!-- 左侧菜单 --> */

.el-aside {
    background-color: #545c64;
}
.el-menu{
    border-right: 0;
}

/* 切换菜单的按键 */
.toggle-menu{
    background-color: #475163;
    font-size:  10px;
    text-align: center;
    color: #fff;
    line-height: 20px;
    cursor:pointer;
}

/* <!-- 主显示区 --> */
.el-main {
    background-color: #f5f7fa;
}
</style>