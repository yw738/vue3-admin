<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="12">
        <Briefing class="marginB20" />
      </el-col>
      <el-col :span="12">
        <Targets class="marginB20" />
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <Ranking class="marginB20" />
      </el-col>
      <el-col :span="12">
        <Forecast class="marginB20" />
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <Funnel class="marginB20" />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
// 组件引用
import Briefing from './components/briefing/index.vue';
import Targets from './components/targets/index.vue';
import Ranking from './components/ranking/index.vue';
import Forecast from './components/forecast/index.vue';
import Funnel from './components/funnel/index.vue';

// import BarChart from '@/views/product/statisticsManage/sendCensus/components/BarChart.vue';
import { indexApi } from '@/api/call/index';
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 24px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .box-center {
    margin: 0 auto;
    display: table;
  }

  .user-profile {
    .box-center {
      padding-top: 10px;
    }

    .user-role {
      padding-top: 10px;
      font-weight: 400;
      font-size: 14px;
    }

    .box-social {
      padding-top: 30px;

      .el-table {
        border-top: 1px solid #dfe6ec;
      }
    }

    .user-follow {
      padding-top: 20px;
    }
  }

  .chart-container {
    background: #ffffff;
  }
}
</style>
