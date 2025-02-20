<!--  -->
<template>
  <el-select
    v-model="value"
    :style="{ width: width }"
    @change="handChange"
    clearable
    :placeholder="placeholder"
  >
    <el-option
      v-for="op in options"
      :label="op.label"
      :value="op.value"
      :key="op.value"
    />
  </el-select>
</template>

<script>
/**
 * 字典表组件
 */
export default {
  data() {
    return {
      value: '',
      options: [
        // { label: 'aaa', value: '0' },
        // { label: 'bbb', value: '2' }
      ]
    };
  },
  props: {
    sleValue: {
      type: String || Number,
      default: ''
    },
    width: {
      type: String,
      default: '180px'
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    // api函数名
    api: {
      type: Function
    }
  },
  created() {
    this.getSelect();
  },
  watch: {
    value(newVal) {
      this.$emit('update:sleValue', newVal);
    },
    sleValue(newVal) {
      this.value = newVal;
    }
  },
  methods: {
    getSelect() {
      if (!(this.api instanceof Function)) return;
      this.api().then(res => {
        this.options = res.data.map(v => ({
          label: v.name,
          value: (v.id).toString()
        }));
      });
    },
    handChange(res) {
      this.$emit('handChange', res);
    },
    //重置方法
    clear() {}
  }
};
</script>
<style lang="less" scoped></style>
