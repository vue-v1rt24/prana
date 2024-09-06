<script setup lang="ts">
// Нравится и поделиться (переносится в модальное окно видео)

import { localStorageUtil } from '~/utils/localStorage.utils';

//
const props = defineProps<{
  id: number;
  count: number;
  isChecked: boolean;
}>();

//
const isCheckedCount = ref(false);

//
onMounted(() => {
  const res = (localStorageUtil.getStorage('useful') as number[]) || [];

  if (res && res.includes(props.id)) {
    isCheckedCount.value = true;
  }
});

//
watchEffect(() => {
  if (props.isChecked) {
    isCheckedCount.value = true;
  } else {
    isCheckedCount.value = false;
  }
});
</script>

<template>
  <div class="video_hart_bx">
    <div class="video_hart">
      <div :class="['work_full_article__hart react', { active: isCheckedCount }]">
        <svg>
          <use xlink:href="/img/sprite.svg#hart"></use>
        </svg>

        <span class="work_full_article__hart_count">{{ count }}</span>
      </div>

      <div class="work_full_article__share react">
        <svg>
          <use xlink:href="/img/sprite.svg#share"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.video_hart_bx {
  display: none;
}

.video_fancybox_modal .video_hart {
  position: absolute;
  top: 50%;
  left: 50%;
  right: auto;
  color: white;
  font-size: 30px;
  margin: -350px 0 0 617px;

  /*  */
  @media (max-width: 1500px) {
    margin: -242px 0 0 425px;
  }

  @media (max-width: 1299px) {
    display: flex;
    column-gap: 32px;
    margin: 32% 0 0 -80px;
  }

  @media (max-width: 576px) {
    column-gap: 26px;
  }
}

.work_full_article__hart {
  margin-bottom: 23px;
}

.work_full_article__hart,
.work_full_article__share {
  width: 71px;
  height: 71px;
  border-radius: 57px;
  background-color: #1e2733;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 4px;
  cursor: pointer;

  @media (max-width: 576px) {
    width: 62px;
    height: 62px;
  }
}

.work_full_article__hart span {
  display: none;
  font-weight: 500;
  font-size: 13px;
  line-height: 100%;
  color: var(--accentColor);
}

.work_full_article__hart.active {
  background-color: white;
}

.work_full_article__hart.active span {
  display: block;
}

.work_full_article__hart svg {
  width: 31px;
  height: 28px;
  fill: white;
  stroke: white;

  /*  */
  @media (max-width: 576px) {
    width: 27px;
    height: 24px;
  }
}

.work_full_article__share svg {
  width: 27px;
  height: 25px;
  fill: white;
}

.work_full_article__hart.active svg {
  fill: var(--accentColor);
  stroke: var(--accentColor);
}
</style>
