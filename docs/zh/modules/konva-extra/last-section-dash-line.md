# LastSectionDashLine 类

## 📌 功能描述
继承自 [Konva.Line](https://konvajs.org/api/Konva.Line.html) 的增强型虚线组件，支持**仅最后一段线段显示虚线效果**，其他线段保持实线。适用于需要区分线段末尾状态的可视化场景。

## 🧱 接口定义
```ts
import { LineConfig } from 'konva/lib/shapes/Line';

export interface LastSectionDashLineConfig extends LineConfig {
  /** 是否启用最后一段虚线效果 */
  lastDashEnabled?: boolean;
  /** 虚线模式 [线段长度, 间隔长度] */
  dash: number[];
}
```

## 🧰 使用示例

### 画多边形

::: details 点我查看代码
<<< @/components/DrawPolygon.vue
:::

<DrawPolygon />

## 📐 API 详解

### 构造函数
```ts
new LastSectionDashLine(config: LastSectionDashLineConfig)
```
| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| `lastDashEnabled` | `boolean` | ❌ | 是否启用虚线末尾效果 |
| `dash` | `number[]` | ✅ | 虚线模式（仅当 `lastDashEnabled: true` 时生效） |
| `...` | `-` | - | 继承自 [Konva.Line](https://konvajs.org/api/Konva.Line.html) |

### 属性方法
| 方法 | 类型 | 描述 |
|------|------|------|
| `lastDashEnabled()` | `getter` | 获取当前虚线末尾状态 |
| `lastDashEnabled(bool: boolean)` | `setter` | 设置虚线末尾开关状态 |
| `...` | `-` | 继承自 [Konva.Line](https://konvajs.org/api/Konva.Line.html) |

## ⚙️ 渲染特性
- **混合渲染模式**：自动区分实线段与虚线段渲染
- **性能优化**：仅当 `lastDashEnabled: true` 时进行复杂路径分割
- **兼容性**：支持所有支持 Canvas 的现代浏览器（Chrome 60+ / Firefox 63+ / Safari 11.1+）

## 📝 注意事项
1. 必须至少包含 2 个坐标点（即 4 个数字）
2. 虚线模式数组长度需为偶数（如 `[10,5,10,15]`）
3. 当 `lastDashEnabled: false` 时，组件行为与标准 [Konva.Line](https://konvajs.org/api/Konva.Line.html) 一致
