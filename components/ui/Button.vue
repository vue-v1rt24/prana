<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string;
    type?: 'button' | 'submit' | 'reset' | 'reset';
    colorClass?: string;
    borderRadius?: string;
    arrow?: boolean;
  }>(),
  {
    type: 'button',
    borderRadius: '28px',
    arrow: true,
  },
);

//
const emit = defineEmits<{
  clickBtn: [];
}>();
</script>

<template>
  <button
    :type="type"
    :class="['blue_btn', { wrap_arrow: arrow }, colorClass]"
    @click="emit('clickBtn')"
  >
    <span class="blue_btn__title">{{ title }}</span>

    <span v-if="arrow" class="btn__arrow">
      <svg class="arrow">
        <use xlink:href="/img/sprite.svg#arrow"></use>
      </svg>
    </span>
  </button>
</template>

<style lang="css" scoped>
/* Синяя кнопка */
.blue_btn {
  font-family: var(--fontFamily-Unbounded);
  font-size: 24px;
  line-height: 130%;
  color: white;
  background-color: var(--accentColor);
  white-space: nowrap;
  border: none;
  border-radius: v-bind(borderRadius);
  user-select: none;
  overflow: hidden;
  transition: background-color 0.3s;
}

.blue_btn:hover {
  background-color: #4ccecf;
}

.blue_btn:active {
  background-color: #328f8f;
}

.blue_btn .btn__arrow .arrow {
  width: 15px;
  height: 15px;
  fill: white;
}
/* /Синяя кнопка */

/* Белая кнопка */
.btn_white {
  color: var(--accentColor);
  background-color: var(--colorTextWhite);
}

.btn_white .btn__arrow .arrow {
  fill: var(--accentColor);
}

.btn_white:hover {
  background-color: var(--colorTextWhite);
}

.btn_white:active {
  background-color: #e8e2e2;
}
/* /Белая кнопка */

/* Прозрачная кнопка */
.btn_transparent {
  color: var(--colorDark3);
  background-color: transparent;
  border: 2px solid var(--accentColor);
  margin: 0;
}

.btn_transparent .btn__arrow .arrow {
  fill: var(--accentColor);
}

.btn_transparent:hover {
  background-color: transparent;
}

.hover_bg.btn_transparent:hover {
  background-color: rgba(64, 182, 183, 0.3);
}

.btn_transparent:active {
  background-color: transparent;
}
/* /Прозрачная кнопка */

/*  */
.wrap_arrow {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
}

.btn__arrow {
  display: inherit;
  transform: translateY(0);
  transition: transform 0.3s;
}

.wrap_arrow:hover .btn__arrow {
  animation: swing 0.8s ease;
}

@keyframes swing {
  15% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-9px);
  }
  40% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
  65% {
    transform: translateY(0);
  }
}

/* ==================== Медиа запросы */
@media (max-width: 576px) {
  .blue_btn {
    font-size: 18px;
    border-radius: 18px;
    gap: 10px;
  }

  .blue_btn .btn__arrow .arrow {
    width: 14px;
    height: 14px;
  }
}
</style>
