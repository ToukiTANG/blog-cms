<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>又拍云配置</span>
            <el-button style="float: right" type="primary" icon="el-icon-check" @click="updateSetting">保存</el-button>
          </div>
          <el-form label-position="right" label-width="100px">
            <el-form-item label="存储空间">
              <el-input v-model="upyunSetting.bucketName" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="操作员">
              <el-input v-model="upyunSetting.username" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="upyunSetting.password" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="访问域名">
              <el-input v-model="upyunSetting.baseUrl" size="mini"></el-input>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SvgIcon from "@/components/SvgIcon";
import {getUpyunSetting, updateUpyunSetting} from "@/api/upyun";

export default {
  name: "UpyunManage",
  components: {SvgIcon},
  data() {
    return {
      upyunSetting: {
        bucketName: '',
        username: '',
        password: '',
        baseUrl: ''
      }
    }
  },
  computed: {},
  created() {
    this.getSetting()
  },
  methods: {
    getSetting() {
      getUpyunSetting().then(res => {
        this.upyunSetting = res.data
      })
    },
    updateSetting(){
      updateUpyunSetting(this.upyunSetting).then(()=>{
        this.getSetting()
      })
    }
  },
}
</script>

<style scoped>
</style>
