<template>
  <div>
    <!--搜索-->
    <el-form inline>
      <el-form-item label="执行时间">
        <DateTimeRangePicker :date="queryInfo.date" :setDate="setDate"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" icon="el-icon-search" @click="search">搜索</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="logList">
      <el-table-column label="序号" type="index" width="50"></el-table-column>
      <el-table-column label="日志ID" prop="logId" width="200"></el-table-column>
      <el-table-column label="任务ID" prop="jobId" width="200"></el-table-column>
      <el-table-column label="Bean" prop="beanName" show-overflow-tooltip></el-table-column>
      <el-table-column label="方法名" prop="methodName" show-overflow-tooltip></el-table-column>
      <el-table-column label="结果" width="80">
        <template v-slot="scope">
          <el-tag v-if="scope.row.status" size="small" effect="dark">成功</el-tag>
          <el-tag v-else size="small" effect="dark" type="danger">失败</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="执行耗时" prop="times" width="110">
        <template v-slot="scope">
          <el-tag size="small">{{ scope.row.timeConsumed }}ms</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="执行时间" width="170">
        <template v-slot="scope">{{ scope.row.createTime | timeFormat }}</template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template v-slot="scope">
          <el-button type="warning" icon="el-icon-view" size="mini" @click="showDetail(scope.row)">查看详情</el-button>
          <el-popconfirm title="确定删除吗？" icon="el-icon-delete" iconColor="red" @onConfirm="deleteJobLogByLogId(scope.row.logId)">
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

    <!-- 任务日志详情 -->
    <el-dialog title="日志详情" append-to-body top="20px" width="80%" :visible.sync="detailDialogVisible" destroy-on-close>
      <el-form :model="detail" ref="detailFormRef" label-width="120px" size="mini">
        <el-row>
          <el-col :span="12">
            <el-form-item label="日志ID：">{{ detail.logId }}</el-form-item>
            <el-form-item label="任务ID：">{{ detail.jobId }}</el-form-item>
            <el-form-item label="执行耗时：">{{ detail.timeConsumed }} 毫秒</el-form-item>
            <el-form-item label="执行时间：">{{ detail.createTime | timeFormat }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Bean：">{{ detail.beanName }}</el-form-item>
            <el-form-item label="方法名：">{{ detail.methodName }}</el-form-item>
            <el-form-item label="参数：">{{ detail.params }}</el-form-item>
            <el-form-item label="任务结果：">
              <el-tag v-if="detail.status" size="mini" effect="dark">成功</el-tag>
              <el-tag v-else size="mini" effect="dark" type="danger">失败</el-tag>
            </el-form-item>
          </el-col>
          <el-form-item label="异常信息：">
            <div class="match-braces rainbow-braces">
							<pre>
								<code class="language-java">{{ detail.errorMsg }}</code>
							</pre>
            </div>
          </el-form-item>
        </el-row>
      </el-form>
      <span slot="footer">
				<el-button @click="detailDialogVisible=false">关 闭</el-button>
			</span>
    </el-dialog>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import {getJobLogList, deleteJobLogByLogId} from "@/api/schedule";
import DateTimeRangePicker from "@/components/DateTimeRangePicker";

export default {
  name: "ScheduleJobLog",
  components: {DateTimeRangePicker, Breadcrumb},
  data() {
    return {
      queryInfo: {
        date: [],
        pageNum: 1,
        pageSize: 10
      },
      logList: [],
      total: 0,
      detailDialogVisible: false,
      detail: {}
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      let query = {...this.queryInfo}
      if (query.date && query.date.length === 2) {
        query.date = query.date[0] + ',' + query.date[1]
      }
      getJobLogList(query).then(res => {
        this.logList = res.data.dataList
        this.total = res.data.total
      })
    },
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.getData()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage
      this.getData()
    },
    showDetail(row) {
      this.detail = {...row}
      if (this.detail.errorMsg) {
        this.detail.errorMsg = '\n' + this.detail.errorMsg
        this.$nextTick(() => {
          Prism.highlightAll()
        })
      }
      this.detailDialogVisible = true
    },
    deleteJobLogByLogId(logId) {
      deleteJobLogByLogId(logId).then(res => {
        this.msgSuccess(res.msg)
        this.getData()
      })
    },
    search() {
      this.queryInfo.pageNum = 1
      this.queryInfo.pageSize = 10
      this.getData()
    },
    setDate(value) {
      this.queryInfo.date = value
    },
  }
}
</script>

<style scoped>
.el-button + span {
  margin-left: 10px;
}

.el-form--inline .el-form-item {
  margin-bottom: 0;
}
</style>
