<template>
	<el-card shadow="always" center="true" class="login-card">
		<div slot="header">
			<span>用户登录</span>
		</div>
		<el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm">
			<el-form-item label="登录账号" prop="account">
				<el-input v-model="loginForm.account"></el-input>
			</el-form-item>
			<el-form-item label="登录密码" prop="password">
				<el-input type="password" v-model="loginForm.password"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
				<el-button @click="registVue()">注册</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				loginForm: {
					account: '',
					password: ''
				},
				loginRules: {
					account:[
						{ required: true, message: '请输入登录账号！', trigger: 'blur'}
					],
					password: [
						{ required: true, message: '请输入登录密码！', trigger: 'blur'}
					]
				}
			}
		},
		methods:{
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$axios.post(this.$HOST + '/login', this.loginForm)
							.then((res) => {
								let result = res.data
								if (result.status) {
									localStorage["token"] = result.data.token
									console.log(localStorage.getItem("token"))
									this.$message({
										message: "登录成功！",
										type: "success"
									})
								} else {
									this.$message.error(result.msg)
								}
								
							})
							.catch((res) => {
								console.log(res)
								this.$message({
									message: "系统内部错误",
									type: "warning"
								})
							})
					}else {
						console.log("error submit")
						return false
					}
				})
			},
			registVue() {
				this.$router.push({path: '/regist'})
			}
		}
	}
</script>

<style>
	.login-card {
		width: 50%;
		margin-left: 25%;
		margin-top: 10%;
	}
</style>
