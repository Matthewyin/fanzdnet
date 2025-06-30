<template>
  <div class="slogan-parameters">
    <el-form :model="form" label-width="80px" size="small">
      <el-form-item label="风格">
        <el-select v-model="form.style" @change="updateParameters">
          <el-option label="激励鼓舞" value="激励" />
          <el-option label="朗朗上口" value="朗朗上口" />
          <el-option label="押韵节拍" value="押韵" />
          <el-option label="简短有力" value="简短" />
          <el-option label="胜利祝愿" value="祝愿" />
        </el-select>
      </el-form-item>

      <el-form-item label="长度">
        <el-radio-group v-model="form.length" @change="updateParameters">
          <el-radio-button label="short">短句 (4-8字)</el-radio-button>
          <el-radio-button label="medium">中等 (8-16字)</el-radio-button>
          <el-radio-button label="long">长句 (16字以上)</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="押韵">
        <el-switch
          v-model="form.rhyme"
          active-text="要求押韵"
          @change="updateParameters"
        />
      </el-form-item>

      <el-form-item label="数量">
        <el-slider
          v-model="form.count"
          :min="1"
          :max="10"
          :step="1"
          show-input
          @change="updateParameters"
        />
      </el-form-item>

      <el-form-item label="情感色彩">
        <el-checkbox-group v-model="form.emotions" @change="updateParameters">
          <el-checkbox label="热血">热血</el-checkbox>
          <el-checkbox label="温暖">温暖</el-checkbox>
          <el-checkbox label="幽默">幽默</el-checkbox>
          <el-checkbox label="霸气">霸气</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="关键词">
        <el-input
          v-model="form.keywords"
          placeholder="输入关键词，用逗号分隔"
          @input="updateParameters"
        />
        <div class="keyword-suggestions">
          <el-tag
            v-for="keyword in keywordSuggestions"
            :key="keyword"
            size="mini"
            @click="addKeyword(keyword)"
            style="cursor: pointer; margin: 2px;"
          >
            {{ keyword }}
          </el-tag>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue', 'update'])

const form = reactive({
  style: '激励',
  length: 'medium',
  rhyme: true,
  count: 5,
  emotions: ['热血'],
  keywords: '',
  ...props.modelValue
})

const keywordSuggestions = [
  '樊振东', '加油', '必胜', '冠军', '乒乓', '东哥',
  '威武', '精彩', '拼搏', '梦想', '荣耀', '传奇'
]

const addKeyword = (keyword) => {
  const keywords = form.keywords ? form.keywords.split(',') : []
  if (!keywords.includes(keyword)) {
    keywords.push(keyword)
    form.keywords = keywords.join(',')
    updateParameters()
  }
}

const updateParameters = () => {
  const params = { ...form }
  emit('update:modelValue', params)
  emit('update', params)
}

watch(() => props.modelValue, (newValue) => {
  Object.assign(form, newValue)
}, { deep: true })
</script>

<style scoped>
.slogan-parameters {
  max-height: 500px;
  overflow-y: auto;
}

.keyword-suggestions {
  margin-top: 0.5rem;
}

:deep(.el-form-item) {
  margin-bottom: 1rem;
}

:deep(.el-form-item__label) {
  font-size: 12px;
  color: #666;
}
</style>
