<template>
    <div>
        <el-button @click="logout">退出登录</el-button>
    </div>
</template>
  
<script>


export default {
    name:'HomeVue',
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
        }
    },

}
</script>
  
<style>

</style>