<script setup lang="ts">
import { localStorageUtil } from '~/utils/localStorage.utils';

//
const { domains } = useRuntimeConfig().public;

//
const props = defineProps<{
  id: number | undefined;
  slug: string | undefined;
  countLike: number;
}>();

//
const nameStorage = 'works';
const count = ref<number>(0);
const isWhatRequest = ref(false);
const isCountVisible = ref(false);

// Получение данных из хранилища
const getStorage = () => {
  return localStorageUtil.getStorage(nameStorage) || {};
};

// При начальной загрузки страницы
const loadData = () => {
  if (props.slug) {
    const res = getStorage();

    if (res && res[props.slug]) {
      isCountVisible.value = true;
      isWhatRequest.value = true;
    } else {
      isCountVisible.value = false;
      isWhatRequest.value = false;
    }
  }
};

//
watchEffect(() => {
  if (props.slug) {
    count.value = props.countLike;
    loadData();
  }
});

// Запрос на сервер для изменения количества понравившимся
const toggleLicked = async () => {
  if (props.slug) {
    isWhatRequest.value = !isWhatRequest.value;

    if (!isWhatRequest.value) {
      try {
        const resCount = await $fetch<number>(`${domains}/wp-json/count-minus/change-count`, {
          method: 'POST',
          body: { id: props.id },
        });

        count.value = resCount;
        isCountVisible.value = false;

        const res = getStorage();
        delete res[props.slug];
        localStorageUtil.setStorage(nameStorage, res);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const resCount = await $fetch<number>(`${domains}/wp-json/count-plus/change-count`, {
          method: 'POST',
          body: { id: props.id },
        });

        count.value = resCount;
        isCountVisible.value = true;

        const res = getStorage();
        res[props.slug] = 'true';
        localStorageUtil.setStorage(nameStorage, res);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<template>
  <div class="work_full_article__hart_share">
    <div
      :class="['work_full_article__hart', 'react', { active: isCountVisible }]"
      @click="toggleLicked"
    >
      <svg>
        <use xlink:href="/img/sprite.svg#hart"></use>
      </svg>

      <span>{{ count }}</span>
    </div>

    <div class="work_full_article__share react">
      <svg>
        <use xlink:href="/img/sprite.svg#share"></use>
      </svg>
    </div>
  </div>
</template>

<style lang="css" scoped>
.work_full_article__hart_share {
  position: absolute;
  top: 0;
  right: -100px;
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
}

.work_full_article__hart {
  margin-bottom: 23px;
}

.work_full_article__hart svg {
  width: 31px;
  height: 28px;
  fill: white;
  stroke: white;
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

.work_full_article__hart.active svg {
  fill: var(--accentColor);
  stroke: var(--accentColor);
}

.work_full_article__hart.active span {
  display: block;
}

/*  */
.work_full_article__share svg {
  width: 27px;
  height: 25px;
  fill: white;
}

/*  */
@media (max-width: 1900px) {
  .work_full_article__hart_share {
    top: auto;
    right: auto;
    bottom: -138px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    column-gap: 32px;
  }
}

@media (max-width: 576px) {
  .work_full_article__hart_share {
    bottom: -127px;
  }
}
</style>
