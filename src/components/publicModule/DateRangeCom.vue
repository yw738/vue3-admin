<!--  -->
<template>
  <div :style="{ width: width }">
    <el-date-picker
      style="width: 100%"
      @change="dateChange"
      v-model="date"
      format="YYYY-MM-DD"
      value-format="YYYY-MM-DD"
      type="daterange"
      range-separator="~"
      :start-placeholder="startPlaceholder"
      :end-placeholder="endPlaceholder"
    />
  </div>
</template>

<script>
/**
 * 日期选择组件
 * 用于选择日期区间
 */
export default {
  data() {
    return {
      date: []
    };
  },
  props: {
    starTime: {
      type: String,
      default: ''
    },
    endTime: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '260px'
    },
    startPlaceholder: {
      type: String,
      default: '开始日期'
    },
    endPlaceholder: {
      type: String,
      default: '结束日期'
    }
  },
  created() {
    if (this.starTime && this.endTime) {
      this.updateTime(true);
    }
  },
  watch: {
    starTime(newVal) {
      this.updateTime(newVal);
    },
    endTime(newVal) {
      this.updateTime(newVal);
    }
  },
  methods: {
    /* 外部时间更新 */
    updateTime(newVal) {
      if (newVal) {
        let start = this.starTime?.split(' ')[0] || '';
        let end = this.endTime?.split(' ')[0] || '';
        if (start && end) {
          this.date = [start, end];
        } else {
          this.date = [];
        }
      } else {
        this.date = [];
      }
    },
    /*时间改变*/
    dateChange(val) {
      if (val&&val?.length) {
        // debugger
        // this.$emit('update:starTime', val[0] + ' 00:00:00');
        // this.$emit('update:endTime', val[1] + ' 23:59:59');
        this.$emit('update:starTime', val[0]);
        this.$emit('update:endTime', val[1]);
      } else {
        // debugger
        this.$emit('update:starTime', '');
        this.$emit('update:endTime', '');
      }
      this.$emit('change');
    },
    //重置方法
    clear() {
      this.date = [];
      this.$emit('update:starTime', '');
      this.$emit('update:endTime', '');
    }
  }
};
</script>
<style lang="less" scoped></style>
