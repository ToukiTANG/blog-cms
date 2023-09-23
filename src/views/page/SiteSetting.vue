<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <div slot="header">
            <span>基础设置</span>
          </div>
          <el-form label-position="right" label-width="100px">
            <el-form-item :label="item.nameZh" v-for="item in typeMap.type1" :key="item.id">
              <el-input v-model="item.value" size="mini"></el-input>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div slot="header">
            <span>资料卡</span>
          </div>
          <el-form label-position="right" label-width="100px">
            <el-form-item :label="item.nameZh" v-for="item in typeMap.type2" :key="item.id">
              <div v-if="item.nameZh==='爱好'">
                <el-col :span="20">
                  <el-input v-model="item.value" size="mini"></el-input>
                </el-col>
                <el-col :span="4">
                  <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteFavorite(item)">删除</el-button>
                </el-col>
              </div>
              <div v-else>
                <el-input v-model="item.value" size="mini"></el-input>
              </div>
            </el-form-item>
            <el-button type="primary" size="mini" icon="el-icon-plus" @click="addFavorite">添加favorite</el-button>
          </el-form>
        </el-card>
      </el-col>
    </el-row>

    <div style="text-align: right;margin-top: 30px">
      <el-button type="primary" icon="el-icon-check" @click="submit">保存</el-button>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import {getSiteSettingData, update} from "@/api/siteSetting";
import _ from 'lodash'

export default {
  name: "SiteSetting",
  components: {Breadcrumb},
  data() {
    return {
      deleteIds: [],
      typeMap: {},
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      getSiteSettingData().then(res => {
        this.typeMap = res.data
      })
    },
    addFavorite() {
      this.typeMap.type2.push({
        nameZh: "爱好",
        nameEn: "favorites",
        type: 2,
        value: "{\"title\":\"\",\"content\":\"\"}"
      })
    },
    deleteFavorite(favorite) {
      let arr = this.typeMap.type2
      if (favorite.id) {
        this.deleteIds.push(favorite.id)
        arr.forEach((item, index) => {
          if (item.id === favorite.id) {
            arr.splice(index, 1)
          }
        })
      } else {
        arr.forEach((item, index) => {
          if (item.key === favorite.key) {
            arr.splice(index, 1)
          }
        })
      }
    },
    submit() {
      const result = _.cloneDeep(this.typeMap)
      let updateArr = []
      updateArr.push(...result.type1)
      updateArr.push(...result.type2)
      update(updateArr, this.deleteIds).then(res => {
        this.deleteIds = []
        this.getData()
        this.msgSuccess(res.msg)
      })
    }
  }
}
</script>

<style scoped>

</style>
