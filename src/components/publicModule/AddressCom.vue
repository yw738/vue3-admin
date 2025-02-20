<!--  -->
<template>
  <el-row :gutter="20">
    <el-col :span="8">
      <el-select
        v-model="value"
        @change="provinceChange"
        placeholder="省/直辖市"
      >
        <el-option
          v-for="item in options"
          :key="item.code"
          :label="item.name"
          :value="item.code"
        />
      </el-select>
    </el-col>
    <el-col :span="8">
      <el-select v-model="value2" @change="cityChange" placeholder="市">
        <el-option
          v-for="item in options2"
          :key="item.code"
          :label="item.name"
          :value="item.code"
        />
      </el-select>
    </el-col>
    <el-col :span="8">
      <el-select v-model="value3" @change="areaChange" placeholder="区/县">
        <el-option
          v-for="item in options3"
          :key="item.code"
          :label="item.name"
          :value="item.code"
        />
      </el-select>
    </el-col>
  </el-row>
</template>

<script>
/**
 * 地址选择组件
 * 选择 省、市、区
 */
import areaCode from '@/assets/json/area_code_2022.json';
export default {
  data() {
    return {
      value: '',
      value2: '',
      value3: '',
      options: [], //省
      options2: [], //市
      options3: [] //区
    };
  },
  props: {
    /**
     * 绑定的地址
     */
    addressArr: {
      type: Array,
      default: () => []
    },
    // 省
    province: {
      type: String || Number,
      default: ''
    },
    // 市
    city: {
      type: String || Number,
      default: ''
    },
    // 区
    area: {
      type: String || Number,
      default: ''
    }
  },
  created() {
    this.getProvinceList();
    if (this.province) {
      this.value = this.province || '';
      this.provinceChange(this.province);
      this.cityChange(this.city);
      this.areaChange(this.area)
    }
    if (this.city) {
      this.value2 = this.city || '';
    }
    if (this.area) {
      this.value3 = this.area || '';
    }
  },
  watch: {
    province() {
      this.value = this.province || '';
    },
    city() {
      this.value2 = this.city || '';
    },
    area() {
      this.value3 = this.area || '';
    }
  },
  methods: {
    //
    getProvinceList() {
      this.options = areaCode.map(v => ({
        ...v,
        code:(v.code).toString(),
        children: null
      })); //市
      this.options2 = []; //市
      this.options3 = []; //区
      this.value = '';
      this.value2 = '';
      this.value3 = '';
    },
    provinceChange(val) {
      let arr = areaCode.filter(v => v.code == val);
      this.options2 =
        arr[0]?.children.map(v => ({
          ...v,
          code:(v.code).toString(),
          children: null
        })) || []; //市
      this.options3 = []; //区
      this.value2 = '';
      this.value3 = '';
      this.$emit('update:province', val || '');
      this.$emit('update:city', '');
      this.$emit('update:area', '');
    },
    cityChange(val) {
      let arr = areaCode.filter(v => v.code == this.value);
      let arr2 = arr[0]?.children?.filter(v => v.code == val) || [];
      this.options3 = arr2[0]?.children.map(v => ({
          ...v,
          code:(v.code).toString(),
          children: null
        })) || [];  //区
      this.value3 = '';
      this.$emit('update:city', val || '');
      this.$emit('update:area', '');
    },
    areaChange(val) {
      this.$emit('areaChange');
      this.$emit('update:area', val || '');
    }
  }
};
</script>
<style lang="less" scoped></style>
