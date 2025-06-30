<template>
  <div class="banner-parameters">
    <!-- 模板选择 -->
    <div class="template-section">
      <h5>选择模板</h5>
      <TemplateSelector
        v-model="selectedTemplate"
        @select="onTemplateSelect"
      />
    </div>

    <el-divider />

    <!-- 视觉元素选择 -->
    <div class="visual-elements-section">
      <h5>视觉元素</h5>
      <VisualElementSelector
        v-model="selectedElements"
        content-type="banner"
        :max-elements="5"
        @change="onElementsChange"
      />
    </div>

    <el-divider />

    <el-form :model="form" label-width="80px" size="small">
      <el-form-item label="尺寸">
        <div class="size-controls">
          <el-input-number
            v-model="form.width"
            :min="200"
            :max="1920"
            :step="50"
            controls-position="right"
            @change="updateParameters"
          />
          <span class="size-separator">×</span>
          <el-input-number
            v-model="form.height"
            :min="100"
            :max="1080"
            :step="25"
            controls-position="right"
            @change="updateParameters"
          />
        </div>
        <div class="preset-sizes">
          <el-button
            v-for="preset in sizePresets"
            :key="preset.name"
            size="mini"
            @click="applyPresetSize(preset)"
          >
            {{ preset.name }}
          </el-button>
        </div>
      </el-form-item>

      <el-form-item label="背景色">
        <el-color-picker
          v-model="form.backgroundColor"
          @change="updateParameters"
          show-alpha
        />
        <div class="color-presets">
          <div
            v-for="color in backgroundPresets"
            :key="color"
            :style="{ backgroundColor: color }"
            class="color-preset"
            @click="form.backgroundColor = color; updateParameters()"
          />
        </div>
      </el-form-item>

      <el-form-item label="文字颜色">
        <el-color-picker
          v-model="form.textColor"
          @change="updateParameters"
        />
        <div class="color-presets">
          <div
            v-for="color in textColorPresets"
            :key="color"
            :style="{ backgroundColor: color }"
            class="color-preset"
            @click="form.textColor = color; updateParameters()"
          />
        </div>
      </el-form-item>

      <el-form-item label="字体大小">
        <el-slider
          v-model="form.fontSize"
          :min="24"
          :max="72"
          :step="2"
          show-input
          @change="updateParameters"
        />
      </el-form-item>

      <el-form-item label="字体粗细">
        <el-select v-model="form.fontWeight" @change="updateParameters">
          <el-option label="正常" value="normal" />
          <el-option label="粗体" value="bold" />
          <el-option label="特粗" value="900" />
        </el-select>
      </el-form-item>

      <el-form-item label="文字位置">
        <el-radio-group v-model="form.textAlign" @change="updateParameters">
          <el-radio-button label="left">左对齐</el-radio-button>
          <el-radio-button label="center">居中</el-radio-button>
          <el-radio-button label="right">右对齐</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="边框样式">
        <el-switch
          v-model="form.hasBorder"
          active-text="显示边框"
          @change="updateParameters"
        />
        <div v-if="form.hasBorder" class="border-controls">
          <el-input-number
            v-model="form.borderWidth"
            :min="1"
            :max="10"
            controls-position="right"
            @change="updateParameters"
          />
          <el-color-picker
            v-model="form.borderColor"
            @change="updateParameters"
          />
        </div>
      </el-form-item>

      <el-form-item label="阴影效果">
        <el-switch
          v-model="form.hasShadow"
          active-text="添加阴影"
          @change="updateParameters"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, watch, ref } from 'vue'
import TemplateSelector from './TemplateSelector.vue'
import VisualElementSelector from './VisualElementSelector.vue'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue', 'update'])

const selectedTemplate = ref(null)
const selectedElements = ref([])

const form = reactive({
  width: 800,
  height: 300,
  backgroundColor: '#ff0000',
  textColor: '#ffffff',
  fontSize: 48,
  fontWeight: 'bold',
  textAlign: 'center',
  hasBorder: false,
  borderWidth: 2,
  borderColor: '#000000',
  hasShadow: true,
  ...props.modelValue
})

const sizePresets = [
  { name: '横幅', width: 800, height: 300 },
  { name: '方形', width: 500, height: 500 },
  { name: '竖版', width: 400, height: 600 },
  { name: '宽屏', width: 1200, height: 400 }
]

const backgroundPresets = [
  '#ff0000', '#ff6b35', '#f7931e', '#ffd700',
  '#32cd32', '#00bfff', '#8a2be2', '#ff1493'
]

const textColorPresets = [
  '#ffffff', '#000000', '#ffd700', '#ff6b35',
  '#32cd32', '#00bfff', '#ff1493', '#8a2be2'
]

const applyPresetSize = (preset) => {
  form.width = preset.width
  form.height = preset.height
  updateParameters()
}

const onTemplateSelect = (template) => {
  if (template) {
    // 应用模板配置到表单
    Object.assign(form, template.config)
    updateParameters()
  }
}

const onElementsChange = (elements) => {
  selectedElements.value = elements
  updateParameters()
}

const updateParameters = () => {
  const params = {
    ...form,
    template: selectedTemplate.value,
    visualElements: selectedElements.value
  }
  emit('update:modelValue', params)
  emit('update', params)
}

// 监听外部参数变化
watch(() => props.modelValue, (newValue) => {
  Object.assign(form, newValue)
}, { deep: true })
</script>

<style scoped>
.banner-parameters {
  max-height: 600px;
  overflow-y: auto;
}

.template-section {
  margin-bottom: 1rem;
}

.template-section h5 {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 14px;
}

.size-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.size-separator {
  font-weight: bold;
  color: #666;
}

.preset-sizes {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.color-presets {
  display: flex;
  gap: 0.25rem;
  margin-top: 0.5rem;
}

.color-preset {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid #ddd;
  transition: transform 0.2s;
}

.color-preset:hover {
  transform: scale(1.1);
}

.border-controls {
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
</style>
