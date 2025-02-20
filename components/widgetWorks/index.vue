<script setup lang="ts">
import { useActiveBtnCategoryPortfolio } from '~/composables/useLocalStorages';
import { replaceSpace } from '@/utils/utils';
import type { TypeWorkAll, TypeWork } from '~/types/widgetWorks.types';
import type { TypeArticleModal } from '~/server/types/widgetWork.types';

import '@/assets/css/works.css';

//
const props = defineProps<{
  namePage: string; // название страницы, где будут открываться записи в модальном окне
}>();

//
const route = useRoute();
const router = useRouter();

//
const open = ref(false);
const dataWork = useState<TypeWork>('work');
const filterInstance = ref<any>(null); // для объекта плагина фильтра
const filterJs = ref<HTMLDivElement | null>(null);

// Получение данных
const { data: works } = await useFetch<TypeWorkAll[]>('/api/widgetWork/widgetWork');

// Подключение файла для фильтрации сортировки
useHead({
  script: [
    {
      defer: true,
      src: '/libs/mixitup.min.js',
    },
  ],
});

//
onMounted(() => {
  // Установка значения для фильтра при загрузке страницы
  setTimeout(() => {
    useActiveBtnCategoryPortfolio().value.child = 'Сайт на CMS Tilda';
    filterInstance.value.filter(`.${replaceSpace(useActiveBtnCategoryPortfolio().value.child)}`);
  }, 1000);

  // Фильтрация работ
  //@ts-ignore
  filterInstance.value = mixitup(filterJs.value);
});

//
onUnmounted(() => {
  filterInstance.value.destroy();
  useActiveBtnCategoryPortfolio().value.child = 'Все';
});

// Клики по кнопкам фильтрации
const changeTitleBtmSub = (title: string) => {
  useActiveBtnCategoryPortfolio().value.child = title;
  filterInstance.value.filter(`.${replaceSpace(title)}`);
};

// Изменение URL
const changeRoutePath = (link: string) => {
  router.push(`/${props.namePage}/${link}`);
};

// Запрос на получение одной записи работы
const getWork = async (id: number) => {
  if (import.meta.server) {
    // Получение данных если есть параметр в адресной строке
    const { data } = await useFetch('/api/widgetWork/articleSingleModal', {
      query: {
        id,
      },

      transform(data) {
        const work = data as TypeArticleModal;

        return {
          ...work.portfolioBy.fullOutputOfTheWork,
          id: work.portfolioBy.databaseId,
          categories: work.portfolioBy.portfolioCategories.nodes,
          review: work.portfolioBy.reviewClient,
        };
      },
    });

    return data.value;
  } else {
    // Получение данных по клику
    const data = await $fetch<TypeArticleModal>('/api/widgetWork/articleSingleModal', {
      query: { id },
    });

    const work = {
      ...data.portfolioBy.fullOutputOfTheWork,
      id: data.portfolioBy.databaseId,
      categories: data.portfolioBy.portfolioCategories.nodes,
      review: data.portfolioBy.reviewClient,
    };

    return work;
  }
};

// Вывод работы в модальном окне
const showWork = async () => {
  try {
    if (!works.value?.length) return;

    let work: TypeWork | null = null;

    for (const item of works.value) {
      for (const w of item.node.portfolios.nodes) {
        if (w.slug === route.params.slug) {
          work = w;
          continue;
        }
      }
    }

    if (work?.databaseId) {
      const workData = await getWork(work.databaseId);

      if (!workData?.zagolovok) throw new Error('Данные не получены');

      dataWork.value = workData;
      dataWork.value['slug'] = route.params.slug;
      open.value = true;
    }
  } catch (error) {
    console.log(error);
  }
};

// После закрытия модального окна
const closeWork = () => {
  router.push(`/${props.namePage}`);
  open.value = false;
};

// Отслеживание параметра в адресной строке
watchEffect(async () => {
  if ('slug' in route.params) {
    await showWork();
  }
});
</script>

<template>
  <section class="portfolio_wrap">
    <h2 class="title_52">Смотрите примеры наших сайтов</h2>

    <!--  -->
    <div class="portfolio_btns">
      <template v-for="cat in works" :key="cat.node.databaseId">
        <ButtonsTabSubPortfolio
          v-if="cat.node.count"
          :cat-name="cat.node.name"
          @change-tag-sub="changeTitleBtmSub"
        />
      </template>
    </div>

    <!--  -->
    <div class="works" ref="filterJs">
      <template v-for="item in works" :key="item.node.databaseId">
        <template v-for="work in item.node.portfolios.nodes">
          <WidgetWorksItem :item="work" @route-path="changeRoutePath" />
        </template>
      </template>
    </div>

    <!--  -->
    <div class="container">
      <UiButton
        class="works_portfolios_link"
        title="Перейти в портфолио"
        @click-btn="router.push('/portfolio')"
      />
    </div>

    <!--  -->
    <WidgetWorksModalWork
      v-if="dataWork"
      :open="open"
      @close-work="closeWork"
      @close-modal="open = false"
      :data-work="dataWork"
    />
  </section>
</template>

<style lang="css" scoped>
.portfolio_wrap {
  position: relative;
  background-color: white;
  border-radius: 80px 80px 0 0;
  padding: 160px 0;

  /*  */
  @media (max-width: 768px) {
    padding: 120px 0;
  }

  @media (max-width: 576px) {
    padding: 80px 0;
  }

  /*  */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 647px;
    background-color: black;
    border-radius: 72px 72px 0 0;
  }
}

/*  */

.title_52 {
  position: relative;
  max-width: 785px;
  text-align: center;
  color: white;
  padding: 0 20px;
  margin: 0 auto;
}

/*  */

.portfolio_btns {
  position: relative;
  max-width: 1110px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 18px;
  padding: 0 20px;
  margin: 42px auto 62px auto;
}

/*  */

.works_portfolios_link {
  position: relative;
  z-index: 1;
  width: 438px;
  height: 103px;
  margin: 60px auto 0 auto;

  /*  */
  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 576px) {
    height: 80px;
  }
}
</style>
