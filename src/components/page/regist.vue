<template>
	<el-card shadow="always" class="regist-card">
		<div slot="header">
			<span>用户注册</span>
		</div>
		<el-form :model="registForm" status-icon :rules="registRules" ref="registForm" >
			<el-form-item label="用户账号" prop="account">
				<el-input v-model="registForm.account"></el-input>
			</el-form-item>
			<el-form-item label="用户名称" prop="username">
				<el-input v-model="registForm.username"></el-input>
			</el-form-item>
			<el-form-item label="用户邮箱" prop="email">
				<el-input type="email" v-model="registForm.email"></el-input>
			</el-form-item>
			<el-form-item label="用户密码" prop="password">
				<el-input type="password" v-model="registForm.password"></el-input>
			</el-form-item>
			<el-form-item label="确认密码" prop="checkpwd">
				<el-input type="password" v-model="registForm.checkpwd"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('registForm')">注册</el-button>
				<el-button @click="loginVue()">返回登录</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				registForm: {
					account: '',
					username: '',
					password: '',
					checkpwd: '',
					email: ''
				},
				registRules: {
					account:[
						{ required: true, message: '请输入注册账号！', trigger: 'blur'}
					],
					username: [
						{ required: true, message: '请输入用户名称！', trigger: 'blur'}
					],
					email: [
						{ required: true, message: '请输入用户邮箱！', trigger: 'blur'}
					],
					password: [
						{ required: true, message: '请输入登录密码！', trigger: 'blur'}
					],
					checkpwd: [
						{ required: true, message: '请输入确认密码！', trigger: 'blur'}
					]
				}
			}
		},
		methods:{
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$axios.post(this.$HOST + "/regist", this.registForm)
							.then((res) => {
								let result = res.data
								if (result.status) {
									this.$message({
										message: "注册成功！",
										type: "success"
									})
									this.$router.push({path: '/'})
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
						console.log("error submit!")
						return false
					}
				})
			},
			loginVue() {
				this.$router.push({path: '/'})
			}
		}
	}
</script>

<style>
	.regist-card {
		width: 50%;
		margin-left: 25%;
		margin-top: 10%;
	}
</style>
