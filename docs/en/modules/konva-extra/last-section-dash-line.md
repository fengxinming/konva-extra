# LastSectionDashLine Class

## 📌 Functional Description
An enhanced dashed line component inheriting from [Konva.Line](https://konvajs.org/api/Konva.Line.html). Supports **dashed effect only on the last line segment** while keeping other segments as solid lines. Ideal for visualization scenarios requiring visual distinction of line endpoints.

## 🧱 Interface Definition
```ts
import { LineConfig } from 'konva/lib/shapes/Line';

export interface LastSectionDashLineConfig extends LineConfig {
  /** Whether to enable dashed effect for the last segment */
  lastDashEnabled?: boolean;
  /** Dash pattern [segment length, gap length] */
  dash: number[];
}
```

## 🧰 Usage Example

### Draw Polygon

::: details Click to view code
<<< @/components/DrawPolygon.vue
:::

<DrawPolygon />

## 📐 API Reference

### Constructor
```ts
new LastSectionDashLine(config: LastSectionDashLineConfig)
```
| Parameter | Type | Required | Description |
|----------|------|----------|-------------|
| `lastDashEnabled` | ❌ | Enable/disable dashed tail effect |
| `dash` | `number[]` | ✅ | Dash pattern (only works when `lastDashEnabled: true`) |
| `...` | `-` | - | Inherited from [Konva.Line](https://konvajs.org/api/Konva.Line.html) |

### Property Methods
| Method | Type | Description |
|--------|------|-------------|
| `lastDashEnabled()` | `getter` | Get current dashed tail status |
| `lastDashEnabled(bool: boolean)` | `setter` | Set dashed tail toggle state |
| `...` | `-` | Inherited from [Konva.Line](https://konvajs.org/api/Konva.Line.html) |

## ⚙️ Rendering Features
- **Hybrid rendering mode**: Automatically distinguishes solid/dashed segments
- **Performance optimized**: Complex path splitting only when `lastDashEnabled: true`
- **Cross-browser**: Works with Canvas API in modern browsers (Chrome 60+/Firefox 63+/Safari 11.1+)

## 📝 Important Notes
1. Must contain at least 2 coordinate points (i.e., 4 numbers)
2. Dash pattern array length should be even (e.g., `[10,5,10,15]`)
3. Behaves identically to standard [Konva.Line](https://konvajs.org/api/Konva.Line.html) when `lastDashEnabled: false`
