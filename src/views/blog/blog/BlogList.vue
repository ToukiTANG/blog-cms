<template>
	<div>
		<!--搜索-->
		<el-row>
			<el-col :span="8">
				<el-input placeholder="请输入标题" v-model="queryInfo.title" :clearable="true" @clear="search" @keyup.native.enter="search" size="small" style="min-width: 500px">
					<el-select v-model="queryInfo.categoryId" slot="prepend" placeholder="请选择分类" :clearable="true" @change="search" style="width: 160px">
						<el-option :label="item.categoryName" :value="item.categoryId" v-for="item in categoryList" :key="item.categoryId"></el-option>
					</el-select>
					<el-button slot="append" icon="el-icon-search" @click="search"></el-button>
				</el-input>
			</el-col>
		</el-row>

		<el-table :data="blogList">
			<el-table-column label="序号" type="index" width="50"></el-table-column>
			<el-table-column label="标题" prop="title" show-overflow-tooltip></el-table-column>
			<el-table-column label="分类" prop="category.categoryName" width="150"></el-table-column>
			<el-table-column label="置顶" width="80">
				<template v-slot="scope">
					<el-switch v-model="scope.row.top" @change="blogTopChanged(scope.row)"></el-switch>
				</template>
			</el-table-column>
			<el-table-column label="创建时间" width="170">
				<template v-slot="scope">{{ scope.row.createTime | timeFormat }}</template>
			</el-table-column>
			<el-table-column label="最近更新" width="170">
				<template v-slot="scope">{{ scope.row.updateTime | timeFormat }}</template>
			</el-table-column>
			<el-table-column label="操作" width="200">
				<template v-slot="scope">
					<el-button type="primary" icon="el-icon-edit" size="mini" @click="goBlogEditPage(scope.row.blogId)">编辑</el-button>
					<el-popconfirm title="确定删除吗？" icon="el-icon-delete" iconColor="red" @onConfirm="deleteBlogById(scope.row.blogId)">
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
	</div>
</template>

<script>
	import Breadcrumb from "@/components/Breadcrumb";
	import {getDataByQuery, deleteBlogById, updateTop} from '@/api/blog'

	export default {
		name: "BlogList",
		components: {Breadcrumb},
		data() {
			return {
				queryInfo: {
					title: null,
					categoryId: null,
					pageNum: 1,
          pageSize:10,
				},
				blogList: [],
				categoryList: [],
				total: 0,
			}
		},
		created() {
			this.getData()
		},
		methods: {
			getData() {
				getDataByQuery(this.queryInfo).then(res => {
					this.blogList = res.data.blogs.dataList
					this.categoryList = res.data.categories
					this.total = res.data.blogs.total
				})
			},
      //页首搜索功能
			search() {
				this.queryInfo.pageNum = 1
				this.getData()
			},
			//切换博客置顶状态
			blogTopChanged(row) {
				updateTop(row.blogId, row.top).then(res => {
					this.msgSuccess(res.msg);
				})
			},
			//监听 pageSize 改变事件
			handleSizeChange(newSize) {
				this.queryInfo.pageSize = newSize
				this.getData()
			},
			//监听页码改变的事件
			handleCurrentChange(newPage) {
				this.queryInfo.pageNum = newPage
				this.getData()
			},
			goBlogEditPage(id) {
				this.$router.push(`/blog/edit/${id}`)
			},
			deleteBlogById(id) {
				this.$confirm('此操作将永久删除该博客<strong style="color: red">及其所有评论</strong>，是否删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					dangerouslyUseHTMLString: true
				}).then(() => {
					deleteBlogById(id).then(res => {
						this.msgSuccess(res.msg)
						this.getData()
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					})
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
