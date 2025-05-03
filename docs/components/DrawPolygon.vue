<script setup lang="ts">
  import { useTemplateRef, onMounted, reactive } from 'vue';
  import { VPButton } from 'vitepress/theme';
  import Konva from 'konva';
  import { distanceBetween } from 'geometry-fns';
  import { LastSectionDashLine } from 'konva-extra';

  const scope = reactive({
    isLocked: true
  });
  const container = useTemplateRef<HTMLDivElement>('container');
  
  onMounted(()=> {
    const el = container.value!;
    const stage = new Konva.Stage({
      container: el,
      width: el.clientWidth,
      height: el.clientHeight
    });
    const layer = new Konva.Layer();
    stage.add(layer);
    
    let isPaint = false;
    let lineShape: LastSectionDashLine;
    let currentLine: number[];
    const render = (lastX: number, lastY: number) => {
      let lines = currentLine.concat(lastX, lastY);
      if (!lineShape.lastDashEnabled) {
        currentLine = lines;
      }
      lineShape.points(lines);
      layer.batchDraw();
    };

    stage.on('mousedown touchstart', function () {
      if (scope.isLocked) {
        return;
      }
      let pos = stage.getPointerPosition();
      if (!pos) {
        return;
      }
      let { x, y } = pos;
      if (!isPaint) {
        isPaint = true;
        currentLine = [];
        lineShape = new LastSectionDashLine({
          stroke: '#3BA5E7',
          strokeWidth: 2,
          points: currentLine,
          dash: [4, 3]
        });
        layer.add(lineShape);
      } else {
        const [ startX, startY ] = currentLine;
        if (distanceBetween(x, y, startX, startY) < 10) {
          isPaint = false;
          x = startX;
          y = startY;
        }
        lineShape.lastDashEnabled = false;
      }
      render(x, y);
    });
    stage.on('mousemove touchmove', () => {
      if (!isPaint || scope.isLocked) {
        return;
      }
      let pos = stage.getPointerPosition();
      if (!pos) {
        return;
      }
      lineShape.lastDashEnabled = true;
      render(pos.x, pos.y);
    });
  });
</script>
<template>
  <div class="buttons">
    <VPButton
      :text="scope.isLocked ? 'Get Started' : 'Stop Drawing'"
      @click="scope.isLocked = !scope.isLocked"
    />
  </div>
  <div 
    ref="container" 
    :class="{ container: true, pointer: !scope.isLocked }"
  ></div>
</template>
<style scoped>
  .buttons {
    margin-bottom: 16px;
  }
  .container {
    background-color: #f0f0f0;
    height: 400px;
    &.pointer {
      /* cursor: crosshair; */
      cursor: pointer;
    }
  }
</style>