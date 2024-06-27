<script setup lang="ts">
import { useQuery } from '~/composables/blog/useQuery';

// Получение данных из БД
const { blogs } = await useQuery();
// console.log(blogs);

// Подключение файла для фильтрации сортировки
useHead({
  title: 'Блог',
  meta: [{ name: 'description', content: '' }],
  link: [{ rel: 'stylesheet', href: '/css/works.css' }],
  script: [
    {
      defer: true,
      src: '/libs/mixitup.min.js',
    },
  ],
});

//
const filterJs = ref<HTMLDivElement | null>(null);
const filterInit = ref<any>(null);
const activeClassBtn = ref('all');
const viewSkeleton = ref(true); // для показа скелетона на карточках работ при загрузке страницы
const pageBlog = ref<HTMLDivElement | null>(null);

// Скрытие скелетона
setTimeout(() => {
  viewSkeleton.value = false;
}, 3000);

// Выбор тега (для сортировки)
const changeTag = (tagname: string) => {
  if (filterInit.value) {
    filterInit.value.filter(`.${tagname}`);
    activeClassBtn.value = tagname;

    // Подъём на верх страницы при перестроении работ (когда фильтруем по тегам в модальном окне)
    pageBlog.value?.scrollIntoView({
      behavior: 'smooth',
    });
    // document.body.scrollIntoView();
    // window.scrollTo(0, 0);
    console.log('Подъём');
  }
};

//
onMounted(() => {
  // Запуск сортировки
  filterInit.value = mixitup(filterJs.value);
});
</script>

<template>
  <div>
    <!-- Хлебные крошки -->
    <Breadcrumbs :breadcrumbs="[{ title: 'Отзывы' }]" />

    <!--  -->
    <div class="blog_particles"></div>

    <!--  -->
    <section class="page_blog" ref="pageBlog">
      <div class="container">
        <h2 class="title_52">Блог</h2>

        <!-- Кнопки -->
        <ButtonsTab
          v-if="blogs?.categories"
          v-show="!viewSkeleton"
          :categories="blogs.categories"
          :active-class-btn="activeClassBtn"
        />
      </div>
    </section>

    <!-- Портфолио -->
    <section class="page_blog works_bx">
      <div v-if="viewSkeleton" class="works">
        <PageBlogSkeletonBlog v-for="w in 15" :key="w" />
      </div>

      <div v-show="!viewSkeleton" class="works" ref="filterJs">
        <PageBlogItem v-for="blog in blogs?.blogs" :key="blog.id" :blog @change-tag="changeTag" />
      </div>
    </section>
  </div>
</template>

<style lang="css" scoped>
.page_blog .title_52 {
  font-size: 62px;
  letter-spacing: 0.02em;
  text-align: left;
  margin-bottom: 82px;
}

.page_blog.works_bx::before {
  bottom: -140px;
}

.blog_particles {
  position: absolute;
  top: 0;
  right: 0;
  width: 1290px;
  height: 891px;
  background-image: url(/img/blog/decor_blog_1.svg);
  background-repeat: no-repeat;
  overflow: hidden;
  z-index: -1;

  @media (max-width: 1299px) {
    width: 552px;
    height: 508px;
    background-image: url(/img/blog/decor_blog_2.svg);
  }

  @media (max-width: 576px) {
    width: 287px;
    height: 300px;
    background-image: url(/img/blog/decor_blog_3.svg);
  }
}
</style>
