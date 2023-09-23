<template>
  <div>
    <el-form :model="form" :rules="formRules" ref="formRef" label-position="top">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="文章标题" prop="title">
            <el-input v-model="form.title" placeholder="请输入标题"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="文章首图URL" prop="firstPicture">
            <el-input v-model="form.firstPicture" placeholder="文章首图，用于随机文章展示"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="文章描述" prop="description">
        <mavon-editor v-model="form.description"/>
      </el-form-item>

      <el-form-item label="文章正文" prop="content">
        <mavon-editor v-model="form.content.text"/>
      </el-form-item>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="分类" prop="cate">
            <el-select v-model="form.cate" placeholder="请选择分类（输入可添加新分类）" :allow-create="true" :filterable="true" style="width: 100%;">
              <el-option :label="item.categoryName" :value="item.categoryId" v-for="item in categoryList" :key="item.categoryId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="标签" prop="tagList">
            <el-select v-model="form.tagList" placeholder="请选择标签（输入可添加新标签）" :allow-create="true" :filterable="true" :multiple="true" style="width: 100%;">
              <el-option :label="item.tagName" :value="item.tagId" v-for="item in tagList" :key="item.tagId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="浏览次数" prop="views">
            <el-input v-model="form.views" placeholder="请输入文章字数（可选）默认为 0" type="number"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item style="text-align: right;">
        <el-button type="primary" @click="dialogVisible=true">保存</el-button>
      </el-form-item>
    </el-form>

    <!--编辑可见性状态对话框-->
    <el-dialog title="博客可见性" width="30%" :visible.sync="dialogVisible">
      <!--内容主体-->
      <el-form label-width="50px" @submit.native.prevent>
        <el-form-item>
          <el-row>
            <el-col :span="6">
              <el-switch v-model="form.commentEnabled" active-text="评论"></el-switch>
            </el-col>
            <el-col :span="6">
              <el-switch v-model="form.top" active-text="置顶"></el-switch>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <!--底部-->
      <span slot="footer">
				<el-button @click="dialogVisible=false">取 消</el-button>
				<el-button type="primary" @click="submit">保存</el-button>
			</span>
    </el-dialog>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import {getCategoryAndTag, saveBlog, getBlogById, updateBlog} from '@/api/blog'

export default {
  name: "WriteBlog",
  components: {Breadcrumb},
  data() {
    return {
      categoryList: [],
      tagList: [],
      dialogVisible: false,
      radio: 1,
      form: {
        title: '',
        firstPicture: '',
        description: '',
        content: '',
        cate: null,
        tagList: [],
        views: 0,
        commentEnabled: false,
        top: false,
      },
      formRules: {
        title: [{required: true, message: '请输入标题', trigger: 'change'}],
        firstPicture: [{required: true, message: '请输入首图链接', trigger: 'change'}],
        cate: [{required: true, message: '请选择分类', trigger: 'change'}],
        tagList: [{required: true, message: '请选择标签', trigger: 'change'}],
      },
    }
  },
  watch: {},
  created() {
    this.getData()
    if (this.$route.params.id) {
      this.getBlog(this.$route.params.id)
    }
  },
  methods: {
    getData() {
      getCategoryAndTag().then(res => {
        this.categoryList = res.data.categories
        this.tagList = res.data.tags
      })
    },
    getBlog(id) {
      getBlogById(id).then(res => {
        this.computeCategoryAndTag(res.data)
        this.form = res.data
      })
    },
    computeCategoryAndTag(blog) {
      blog.cate = blog.category.categoryId
      blog.tagList = []
      blog.tags.forEach(item => {
        blog.tagList.push(item.tagId)
      })
    },
    submit() {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          if (this.$route.params.id) {
            this.form.category = null
            this.form.tags = null
            updateBlog(this.form).then(res => {
              this.msgSuccess(res.msg)
              this.$router.push('/blog/list')
            })
          } else {
            saveBlog(this.form).then(res => {
              this.msgSuccess(res.msg)
              this.$router.push('/blog/list')
            })
          }
        } else {
          this.dialogVisible = false
          return this.msgError('请填写必要的表单项')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
