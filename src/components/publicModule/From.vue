<template>
  <div class="ces-search">
    <el-form
      :size="size"
      ref="form"
      inline
      :label-width="labelWidth"
      class="from_item"
    >
      <el-form-item
        v-for="item in searchForm"
        :label="item.label"
        :key="item.label"
        :prop="searchData[item.prop]"
        :required="item.required || false"
        class="from_item"
      >
        <!-- 输入框 -->
        <el-input
          v-if="item.type === 'input'"
          v-model="searchData[item.prop]"
          :size="size || item.size"
          :style="{ width: item.width }"
          :clearable="item.clearable === false ? false : true"
          @change="item.change(that, searchData[item.prop])"
          :placeholder="item.placeholder || ''"
          :readonly="item.readonly === true ? true : false"
          :disabled="item.disable && item.disable(searchData[item.prop])"
        />
        <!-- 下拉框 -->
        <el-select
          v-if="item.type === 'select'"
          v-model="searchData[item.prop]"
          :size="size || item.size"
          :style="{ width: item.width }"
          @change="item.change(that, searchData[item.prop])"
          :placeholder="item.placeholder || ''"
          :clearable="item.clearable === false ? false : true"
          :disabled="item.disable && item.disable(searchData[item.prop])"
        >
          <el-option
            v-for="op in item.options"
            :label="op.label"
            :value="op.value"
            :key="op.value"
          />
        </el-select>
        <!-- 输入框 第二种 -->
        <div v-if="item.type === 'input2'">
          <el-input
            v-model="searchData[item.prop]"
            :size="size || item.size"
            :style="{ width: item.width }"
            @change="item.change(that, searchData[item.prop])"
            :placeholder="item.placeholder || ''"
            :disabled="item.disable && item.disable(searchData[item.prop])"
            :readonly="true"
          />
          <el-button
            style="margin-left: 10px"
            :type="item.type"
            :icon="item.icon || ''"
            :size="size || item.size"
            @click="item.handle(that)"
            >选择</el-button
          >
        </div>

        <!-- 单选 -->
        <el-radio-group
          v-if="item.type === 'radio'"
          v-model="searchData[item.prop]"
          :style="{ width: item.width }"
          @change="item.change(that, searchData[item.prop])"
          :size="size || item.size"
          :disabled="item.disable && item.disable(searchData[item.prop])"
        >
          <el-radio
            v-for="ra in item.radios"
            :label="ra.value"
            :key="ra.value"
            >{{ ra.label }}</el-radio
          >
        </el-radio-group>
        <!-- 单选按钮 -->
        <el-radio-group
          v-if="item.type === 'radioButton'"
          v-model="searchData[item.prop]"
          :style="{ width: item.width }"
          @change="item.change && item.change(that, searchData[item.prop])"
          :size="size || item.size"
          :disabled="item.disable && item.disable(searchData[item.prop])"
        >
          <el-radio-button
            v-for="ra in item.radios"
            :label="ra.value"
            :key="ra.value"
            >{{ ra.label }}</el-radio-button
          >
        </el-radio-group>
        <!-- 复选框 -->
        <el-checkbox-group
          v-if="item.type === 'checkbox'"
          v-model="searchData[item.prop]"
          :style="{ width: item.width }"
          @change="item.change(that, searchData[item.prop])"
          :size="size || item.size"
          :disabled="item.disable && item.disable(searchData[item.prop])"
        >
          <el-checkbox
            v-for="ch in item.checkboxs"
            :label="ch.value"
            :key="ch.value"
            >{{ ch.label }}</el-checkbox
          >
        </el-checkbox-group>
        <!-- 日期 -->
        <el-date-picker
          v-if="item.type === 'date'"
          v-model="searchData[item.prop]"
          :style="{ width: item.width }"
          :size="size || item.size"
          value-format="yyyy-MM-dd"
          type="date"
          :placeholder="item.placeholder || ''"
        />
        <!-- 时间 -->
        <el-time-select
          v-if="item.type === 'time'"
          v-model="searchData[item.prop]"
          type
          :style="{ width: item.width }"
          @change="item.change(that, searchData[item.prop])"
          :size="size || item.size"
          :disabled="item.disable && item.disable(searchData[item.prop])"
        />
        <!-- 日期时间 -->
        <el-date-picker
          v-if="item.type === 'dateTime'"
          type="datetime"
          :style="{ width: item.width }"
          v-model="searchData[item.prop]"
          @change="item.change(that, searchData[item.prop])"
          :size="size || item.size"
          :disabled="item.disable && item.disable(searchData[item.prop])"
        />
        <!-- 日期区间选择 -->
        <DateRangeCom
          v-if="item.type === 'daterange'"
          v-model:starTime="searchData[item.prop]"
          v-model:endTime="searchData[item.prop2]"
          :startPlaceholder="item.placeholder"
          :endPlaceholder="item.placeholder2"
          :width="item.width"
        />
        <!-- 开关 -->
        <el-switch
          v-if="item.type === 'switch'"
          v-model="searchData[item.prop]"
          :size="size || item.size"
          @change="item.change(that, searchData[item.prop])"
          :style="{ width: item.width }"
          :disabled="item.disable && item.disable(searchData[item.prop])"
        ></el-switch>
        <!-- 字典表下拉框 -->
        <DictSelect
          v-if="item.type === 'dictSelect'"
          v-model:sleValue="searchData[item.prop]"
          :api="item.api || ''"
          :placeholder="item.placeholder || ''"
          :width="item.width"
          @change="item.change(that, searchData[item.prop])"
        />
        <el-cascader
          v-if="item.type === 'cascader'"
          v-model="searchData[item.prop]"
          :options="item.options"
          :props="props1"
          :width="item.width"
          :placeholder="item.placeholder || ''"
          @change="item.change(that, searchData[item.prop])"
          clearable
        />
      </el-form-item>
    </el-form>
    <el-form inline v-if="isHandle" class="from_item">
      <el-form-item
        v-for="item in searchHandle"
        :key="item.label"
        class="from_item"
      >
        <el-button
          :type="item.type"
          :icon="item.icon || ''"
          :size="size || item.size"
          @click="item.handle(that)"
          >{{ item.label }}</el-button
        >
      </el-form-item>
      <slot />
    </el-form>
  </div>
</template>

<script>
/**
 * 搜索表单组件封装
 */
import DateRangeCom from './DateRangeCom.vue';
import DictSelect from './DictSelect.vue';
export default {
  components: {
    DateRangeCom,
    DictSelect
  },
  props: {
    that: { type: Object, default: this },
    isHandle: { type: Boolean, default: true },
    labelWidth: { type: String, default: '' },
    size: { type: String, default: 'default' },
    searchForm: { type: Array, default: () => [] },
    searchHandle: { type: Array, default: () => [] },
    searchData: { type: Object, default: () => {} },
    ssss: { type: Boolean, default: true },
    rules: [],
    refName: { type: String, default: '' }
  },
  data() {
    return {
      props1: {
        checkStrictly: true,
        value:'id',
        label:'name'
      }
    };
  }
};
</script>
<style>
.from_item {
  display: inline-block;
      margin-right: 20px !important;
}
.el-form-item__content {
  line-height: normal !important;
}
</style>
