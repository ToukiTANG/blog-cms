<template>
	<div>
		<!--添加-->
		<el-row :gutter="10">
			<el-col :span="6">
				<el-button type="primary" size="small" icon="el-icon-plus" @click="addDialogVisible=true">添加标签</el-button>
			</el-col>
		</el-row>

		<el-table :data="tagList">
			<el-table-column label="序号" type="index" width="50"></el-table-column>
			<el-table-column label="名称" prop="tagName"></el-table-column>
			<el-table-column label="操作">
				<template v-slot="scope">
					<el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row)">编辑</el-button>
					<el-popconfirm title="确定删除吗？" icon="el-icon-delete" iconColor="red" @onConfirm="deleteTagById(scope.row.id)">
						<el-button size="mini" type="danger" icon="el-icon-delete" slot="reference">删除</el-button>
					</el-popconfirm>
				</template>
			</el-table-column>
		</el-table>

		<!--分页-->
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum"
		               :page-sizes="[10, 20, 30, 50]" :page-size="queryInfo.pageSize" :total="total"
		               layout="total, sizes, prev, pager, next, jumper" background>
		</el-pagination>

		<!--添加标签对话框-->
		<el-dialog title="添加标签" width="50%" :visible.sync="addDialogVisible" :close-on-click-modal="false" @close="addDialogClosed">
			<!--内容主体-->
			<el-form :model="addForm" :rules="formRules" ref="addFormRef" label-width="80px">
				<el-form-item label="标签名称" prop="tagName">
					<el-input v-model="addForm.tagName"></el-input>
				</el-form-item>
			</el-form>
			<!--底部-->
			<span slot="footer">
				<el-button @click="addDialogVisible=false">取 消</el-button>
				<el-button type="primary" @click="addTag">确 定</el-button>
			</span>
		</el-dialog>

		<!--编辑标签对话框-->
		<el-dialog title="编辑标签" width="50%" :visible.sync="editDialogVisible" :close-on-click-modal="false" @close="editDialogClosed">
			<!--内容主体-->
			<el-form :model="editForm" :rules="formRules" ref="editFormRef" label-width="80px">
				<el-form-item label="标签名称" prop="tagName">
					<el-input v-model="editForm.tagName"></el-input>
				</el-form-item>
			</el-form>
			<!--底部-->
			<span slot="footer">
				<el-button @click="editDialogVisible=false">取 消</el-button>
				<el-button type="primary" @click="editTag">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import Breadcrumb from "@/components/Breadcrumb";
	import {getData, addTag, editTag, deleteTagById} from '@/api/tag'

	export default {
		name: "TagList",
		components: {
			Breadcrumb
		},
		data() {
			return {
				queryInfo: {
					pageNum: 1,
					pageSize: 10
				},
				tagList: [],
				total: 0,
				addDialogVisible: false,
				editDialogVisible: false,
				addForm: {
          tagName: '',
				},
				editForm: {},
				formRules: {
          tagName: [{required: true, message: '请输入标签名称', trigger: 'blur'}]
				},
			}
		},
		created() {
			this.getData()
		},
		methods: {
			getData() {
				getData(this.queryInfo).then(res => {
					this.tagList = res.data.list
					this.total = res.data.total
				})
			},
			//监听 pageSize 改变事件
			handleSizeChange(newSize) {
				this.queryInfo.pageSize = newSize
				this.getData()
			},
			//监听页码改变事件
			handleCurrentChange(newPage) {
				this.queryInfo.pageNum = newPage
				this.getData()
			},
			addDialogClosed() {
				this.addForm.color = ''
				this.$refs.addFormRef.resetFields()
			},
			editDialogClosed() {
				this.editForm = {}
				this.$refs.editFormRef.resetFields()
			},
			addTag() {
				this.$refs.addFormRef.validate(valid => {
					if (valid) {
						addTag(this.addForm).then(res => {
							this.msgSuccess(res.msg)
							this.addDialogVisible = false
							this.getData()
						})
					}
				})
			},
			editTag() {
				this.$refs.editFormRef.validate(valid => {
					if (valid) {
						editTag(this.editForm).then(res => {
							this.msgSuccess(res.msg)
							this.editDialogVisible = false
							this.getData()
						})
					}
				})
			},
			showEditDialog(row) {
				this.editForm = {...row}
				this.editDialogVisible = true
			},
			deleteTagById(id) {
				deleteTagById(id).then(res => {
					this.msgSuccess(res.msg)
					this.getData()
				})
			}
		}
	}
</script>

<style scoped>
	.el-button + span {
		margin-left: 10px;
	}
</style>