<template>
  <div class="emoji-parameters">
    <el-form :model="form" label-width="80px" size="small">
      <el-form-item label="风格">
        <el-select v-model="form.style" @change="updateParameters">
          <el-option label="可爱萌系" value="可爱" />
          <el-option label="搞笑幽默" value="搞笑" />
          <el-option label="霸气威武" value="霸气" />
          <el-option label="温暖治愈" value="温暖" />
          <el-option label="简约清新" value="简约" />
        </el-select>
      </el-form-item>

      <el-form-item label="尺寸">
        <el-radio-group v-model="form.size" @change="updateParameters">
          <el-radio-button :label="200">小 (200px)</el-radio-button>
          <el-radio-button :label="300">中 (300px)</el-radio-button>
          <el-radio-button :label="500">大 (500px)</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="格式">
        <el-select v-model="form.format" @change="updateParameters">
          <el-option label="PNG (透明背景)" value="png" />
          <el-option label="JPEG (白色背景)" value="jpeg" />
          <el-option label="GIF (动图)" value="gif" />
        </el-select>
      </el-form-item>

      <el-form-item label="表情">
        <el-checkbox-group v-model="form.expressions" @change="updateParameters">
          <el-checkbox label="开心">😊 开心</el-checkbox>
          <el-checkbox label="激动">🤩 激动</el-checkbox>
          <el-checkbox label="加油">💪 加油</el-checkbox>
          <el-checkbox label="胜利">✌️ 胜利</el-checkbox>
          <el-checkbox label="爱心">❤️ 爱心</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="背景">
        <el-switch
          v-model="form.hasBackground"
          active-text="添加背景"
          @change="updateParameters"
        />
        <div v-if="form.hasBackground" class="background-options">
          <el-color-picker
            v-model="form.backgroundColor"
            @change="updateParameters"
            show-alpha
          />
          <el-select v-model="form.backgroundPattern" @change="updateParameters">
            <el-option label="纯色" value="solid" />
            <el-option label="渐变" value="gradient" />
            <el-option label="星星" value="stars" />
            <el-option label="爱心" value="hearts" />
          </el-select>
        </div>
      </el-form-item>

      <el-form-item label="文字">
        <el-switch
          v-model="form.hasText"
          active-text="添加文字"
          @change="updateParameters"
        />
        <div v-if="form.hasText" class="text-options">
          <el-input
            v-model="form.text"
            placeholder="输入文字内容"
            @input="updateParameters"
          />
          <el-color-picker
            v-model="form.textColor"
            @change="updateParameters"
          />
        </div>
      </el-form-item>

      <el-form-item label="特效">
        <el-checkbox-group v-model="form.effects" @change="updateParameters">
          <el-checkbox label="发光">✨ 发光效果</el-checkbox>
          <el-checkbox label="阴影">🌫️ 阴影效果</el-checkbox>
          <el-checkbox label="边框">🔲 边框装饰</el-checkbox>
        </el-checkbox-group>
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
  style: '可爱',
  size: 300,
  format: 'png',
  expressions: ['开心'],
  hasBackground: false,
  backgroundColor: '#ffffff',
  backgroundPattern: 'solid',
  hasText: false,
  text: '',
  textColor: '#000000',
  effects: [],
  ...props.modelValue
})

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
.emoji-parameters {
  max-height: 500px;
  overflow-y: auto;
}

.background-options,
.text-options {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
  align-items: center;
}

:deep(.el-form-item) {
  margin-bottom: 1rem;
}

:deep(.el-form-item__label) {
  font-size: 12px;
  color: #666;
}

:deep(.el-checkbox) {
  margin-bottom: 0.5rem;
}
</style>
