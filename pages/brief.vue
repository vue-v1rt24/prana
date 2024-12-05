<script setup lang="ts">
import type { UiModal } from '#components';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';

// Управление модальным окно формы
const { isOpenModal } = useOutsideModal();

//
useSeoMeta({
  title: 'Бриф',
});

//
type TypeFormData = {
  name: string;
  email: string;
  phone: string;
  nameCompany: string;
  siteCompany: string;
  direction: string;
  siteAddresses: string;
  geographyOfWork: string;
  termsOfDevelopment: string;
  budget: string;
  responsiblePerson: string;
  language: string;
  otherGoals: string;
  communication: string[];
  salesServices: string[];
  integrationServices: string[];
  checked: string[];
  radio: string;
  cms: string;
  otherGoalsServices: string;
  sectionsSite: string;
  siteNavigation: string;
  informationBlocks: string;
  examplesDesignLike: string;
  examplesDesignNotLike: string;
  yourOwnVersion: string;
  corporateIdentity: string[];
  moodAssociations: string[];
  availabilityPhotos: string;
  requirementsWishes: string;
  contentSite: string[];
  additionalServices: string[];
  file: File | null;
};

//
const mail = useMail();
const filePath = ref<string | null>(null);

//
const formData = reactive<TypeFormData>({
  name: '',
  email: '',
  phone: '',
  nameCompany: '',
  siteCompany: '',
  direction: '',
  siteAddresses: '',
  geographyOfWork: '',
  termsOfDevelopment: '',
  budget: '',
  responsiblePerson: '',
  language: '',
  otherGoals: '',
  communication: [],
  salesServices: [],
  integrationServices: [],
  checked: [],
  radio: '',
  cms: '',
  otherGoalsServices: '',
  sectionsSite: '',
  siteNavigation: '',
  informationBlocks: '',
  examplesDesignLike: '',
  examplesDesignNotLike: '',
  yourOwnVersion: '',
  corporateIdentity: [],
  moodAssociations: [],
  availabilityPhotos: '',
  requirementsWishes: '',
  contentSite: [],
  additionalServices: [],
  file: null,
});

// Валидация формы
const rules = computed(() => {
  const localRules = {
    phone: {
      required,
      minLength: minLength(18),
    },
    email: {}, // для типизации
  };

  // Динамическая валидация по почты (если что-то в поле почты введём, то добавим валидацию)
  if (formData.email) {
    localRules.email = {
      required,
      email,
    };
  }

  //
  return localRules;
});

const v$ = useVuelidate(rules, formData);

// Перемещение к блоку с ошибкой
const movingToError = async () => {
  await nextTick();

  const errorField = document.querySelector('.invalid');

  errorField?.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    inline: 'start',
  });
};

//
const formHandler = async () => {
  try {
    // Запускаем валидацию
    v$.value.$touch();

    // Если есть ошибки в валидации
    if (v$.value.$error) {
      movingToError();
      return;
    }

    // Проверяем загрузку файла в форме
    if (formData.file) {
      const fd = new FormData();
      fd.append(Date.now() + '', formData.file);

      const res = await $fetch('/api/loadImg', {
        method: 'POST',
        body: fd,
      });

      filePath.value = res;
    }

    //
    const message = {
      subject: 'Бриф с сайта pranait.ru',
      html: `
          ${formData.name && `<div>Имя: <strong>${formData.name}</strong></div>`}
          ${formData.email && `<div>Почта: <strong>${formData.email}</strong></div>`}
          ${formData.phone && `<div>Номер телефона: <strong>${formData.phone}</strong></div>`}
          ${
            formData.nameCompany &&
            `<div>Название компании: <strong>${formData.nameCompany}</strong></div>`
          }
          ${
            formData.siteCompany &&
            `<div>Сайт компании: <strong>${formData.siteCompany}</strong></div>`
          }
          ${
            formData.direction &&
            `<div>Область деятельности, направления бизнеса: <strong>${formData.direction}</strong></div>`
          }
          ${
            formData.siteAddresses &&
            `<div>Адреса сайтов: <strong>${formData.siteAddresses}</strong></div>`
          }
          ${
            formData.geographyOfWork &&
            `<div>География работы: <strong>${formData.geographyOfWork}</strong></div>`
          }
          ${
            formData.termsOfDevelopment &&
            `<div>Сроки разработки: <strong>${formData.termsOfDevelopment}</strong></div>`
          }
          ${formData.budget && `<div>Бюджет: <strong>${formData.budget}</strong></div>`}
          ${
            formData.responsiblePerson &&
            `<div>Ответственное лицо: <strong>${formData.responsiblePerson}</strong></div>`
          }
          ${
            formData.language &&
            `<div>Языковые версии сайта: <strong>${formData.language}</strong></div>`
          }
          ${
            formData.otherGoals &&
            `<div>Другие цели, сервисы, функции и CMS: <strong>${formData.otherGoals}</strong></div>`
          }
          ${
            formData.checked.length
              ? `<div>Цели сайта: <strong>${formData.checked}</strong></div>`
              : ''
          }
          ${
            formData.communication.length
              ? `<div>Сервисы для связи с посетителями сайта: <strong>${formData.communication}</strong></div>`
              : ''
          }
          ${
            formData.salesServices.length
              ? `<div>Сервисы по продаже через интернет: <strong>${formData.salesServices}</strong></div>`
              : ''
          }
          ${
            formData.integrationServices.length
              ? `<div>Интеграции со сторонними сервисами и программами: <strong>${formData.integrationServices}</strong></div>`
              : ''
          }
          ${formData.radio && `<div>Тип сайта: <strong>${formData.radio}</strong></div>`}
          ${
            formData.cms && `<div>Система управления сайтом: <strong>${formData.cms}</strong></div>`
          }
          ${
            formData.otherGoalsServices &&
            `<div>Другие цели, сервисы, функции и CMS: <strong>${formData.otherGoalsServices}</strong></div>`
          }
          ${
            formData.sectionsSite &&
            `<div>Разделы сайта: <strong>${formData.sectionsSite}</strong></div>`
          }
          ${
            formData.siteNavigation &&
            `<div>Навигация по сайту: <strong>${formData.siteNavigation}</strong></div>`
          }
          ${
            formData.informationBlocks &&
            `<div>Информационные блоки: <strong>${formData.informationBlocks}</strong></div>`
          }
          ${
            formData.examplesDesignLike &&
            `<div>Примеры сайтов, дизайн которых вам нравится: <strong>${formData.examplesDesignLike}</strong></div>`
          }
          ${
            formData.examplesDesignNotLike &&
            `<div>Примеры сайтов, дизайн которых вам не нравится: <strong>${formData.examplesDesignNotLike}</strong></div>`
          }
          ${
            formData.corporateIdentity.length
              ? `<div>Какие элементы фирменного стиля существуют и могут быть использованы при разработке
                дизайна: <strong>${formData.corporateIdentity}</strong></div>`
              : ''
          }
          ${
            formData.moodAssociations.length
              ? `<div>Настроение и ассоциации, которые должен вызвать дизайн сайта: <strong>${formData.moodAssociations}</strong></div>`
              : ''
          }
          ${
            formData.yourOwnVersion &&
            `<div>Информационные блоки: <strong>${formData.yourOwnVersion}</strong></div>`
          }
          ${
            formData.availabilityPhotos &&
            `<div>Наличие фотографий и картинок для разработки дизайна: <strong>${formData.availabilityPhotos}</strong></div>`
          }
          ${
            formData.requirementsWishes &&
            `<div>Основные требования и пожелания по дизайну сайта: <strong>${formData.requirementsWishes}</strong></div>`
          }
          ${
            formData.contentSite.length
              ? `<div>Контент для сайта: тексты, переводы, фотографии: <strong>${formData.contentSite}</strong></div>`
              : ''
          }
          ${
            formData.additionalServices.length
              ? `<div>Дополнительные услуги и сервисы: <strong>${formData.additionalServices}</strong></div>`
              : ''
          }
        `,
    };

    if (filePath.value) {
      message['attachments'] = [
        {
          path: `./public/files_emails/${filePath.value}`,
        },
      ];
    }

    // Отправка на почту
    await mail.send(message);

    // Очищение полей
    resetForm();

    // Сброс валидации
    v$.value.$reset();

    // Перенаправление нап страницу "Спасибо"
    await navigateTo('/success');
  } catch (error) {
    console.log(error);
  }
};

const resetForm = () => {
  (formData.name = ''),
    (formData.email = ''),
    (formData.phone = ''),
    (formData.nameCompany = ''),
    (formData.siteCompany = ''),
    (formData.direction = ''),
    (formData.siteAddresses = ''),
    (formData.geographyOfWork = ''),
    (formData.termsOfDevelopment = ''),
    (formData.budget = ''),
    (formData.responsiblePerson = ''),
    (formData.language = ''),
    (formData.otherGoals = ''),
    (formData.communication = []),
    (formData.salesServices = []),
    (formData.integrationServices = []),
    (formData.checked = []),
    (formData.radio = ''),
    (formData.cms = ''),
    (formData.otherGoalsServices = ''),
    (formData.sectionsSite = ''),
    (formData.siteNavigation = ''),
    (formData.informationBlocks = ''),
    (formData.examplesDesignLike = ''),
    (formData.examplesDesignNotLike = ''),
    (formData.corporateIdentity = []),
    (formData.moodAssociations = []),
    (formData.availabilityPhotos = ''),
    (formData.requirementsWishes = ''),
    (formData.contentSite = []),
    (formData.additionalServices = []),
    (formData.file = null);
  filePath.value = null;
};
</script>

<template>
  <div class="main_100vh pages_brief">
    <main class="main brief_main">
      <div class="container">
        <!-- Хлебные крошки -->
        <Breadcrumbs :breadcrumbs="[{ title: 'Бриф' }]" dark />

        <h1 class="brief_title">
          Заполните бриф <br />
          на разработку сайта
        </h1>

        <div class="brief_desc">
          <span class="brief_desc__link" @click="isOpenModal().value = true">Оставьте заявку</span>,
          либо звоните, мы пообщаемся и сами все за вас заполним: 8 800 500 81 54
        </div>

        <!--  -->
        <form @submit.prevent="formHandler" enctype="multipart/form-data" class="form">
          <div class="form__bx">
            <div class="form_title">Общая информация</div>

            <div class="form_fields">
              <UiFormInput
                type="text"
                label="Имя"
                placeholder="Будем рады, если вы представитесь"
                v-model="formData.name"
              />

              <UiFormInput
                type="email"
                label="E-mail"
                placeholder="Электронный адрес"
                v-model="formData.email"
              />

              <UiFormInput
                type="tel"
                label="Телефон*"
                placeholder="Номер телефона"
                v-model="formData.phone"
                :class="{ invalid: v$.phone.$error }"
              />

              <UiFormInput
                type="text"
                label="Название компании"
                placeholder="Полное или сокращенное"
                v-model="formData.nameCompany"
              />

              <UiFormInput
                type="text"
                label="Сайт вашей компании, если есть"
                placeholder="example.ru"
                v-model="formData.siteCompany"
              />

              <UiFormInput
                type="textarea"
                label="Область деятельности, направления бизнеса"
                placeholder="Напишите, в какой сфере вы работаете, можно указать специфику и особенности"
                v-model="formData.direction"
              />

              <UiFormInput
                type="textarea"
                label="Адреса сайтов или названия компаний конкурентов"
                placeholder="Опишите ваших основных конкурентов, положительные и отрицательные стороны"
                v-model="formData.siteAddresses"
              />

              <UiFormInput
                type="textarea"
                label="География работы"
                placeholder="Напишите в каких регионах вы работаете"
                v-model="formData.geographyOfWork"
              />

              <UiFormInput
                type="textarea"
                label="Сроки разработки"
                placeholder="Укажите желаемые сроки разработки, если сроки жестко ограничены - можно указать причину ограничения"
                v-model="formData.termsOfDevelopment"
              />

              <UiFormInput
                type="text"
                label="Бюджет"
                placeholder="Укажите планируемый бюджет"
                v-model="formData.budget"
              />

              <UiFormInput
                type="textarea"
                label="Ответственное лицо"
                placeholder="Укажите контактные данные человека, который будет нести ответственность за разработку с вашей стороны"
                v-model="formData.responsiblePerson"
              />
            </div>
          </div>

          <!--  -->
          <div class="form__bx form__bx_2">
            <div class="form_title">Цели и функции сайта</div>

            <div class="form__checked">
              <div class="form__checked_title">Цели сайта</div>

              <div class="form__checked_desc">
                Выберите одну или несколько целей, которые <br />
                вы хотите достичь при помощи сайта
              </div>

              <div class="form__checked_list">
                <UiFormInput
                  type="checkbox"
                  label="Привлечение клиентов"
                  v-model="formData.checked"
                />

                <UiFormInput
                  type="checkbox"
                  label="Повышение узнаваемости компании, улучшение имиджа"
                  v-model="formData.checked"
                />

                <UiFormInput
                  type="checkbox"
                  label="Продажа товаров и услуг, через интернет"
                  v-model="formData.checked"
                />

                <UiFormInput
                  type="checkbox"
                  label="Информирование о проведении акций"
                  v-model="formData.checked"
                />

                <UiFormInput
                  type="checkbox"
                  label="Информирование и товарах и услугах"
                  v-model="formData.checked"
                />

                <UiFormInput
                  type="checkbox"
                  label="Информирование о компании"
                  v-model="formData.checked"
                />

                <UiFormInput
                  type="checkbox"
                  label="Размещение новостей компании"
                  v-model="formData.checked"
                />
              </div>
            </div>

            <!--  -->
            <div class="form__checked">
              <div class="form__checked_title">Тип сайта</div>

              <div class="form__checked_desc">Выберете тип сайта</div>

              <div class="form__checked_list">
                <UiFormInput
                  type="radio"
                  label="Лендинг (одностраничный рекламный сайт)"
                  v-model="formData.radio"
                />

                <UiFormInput type="radio" label="Многостраничный сайт" v-model="formData.radio" />

                <UiFormInput type="radio" label="Сайт каталог" v-model="formData.radio" />

                <UiFormInput type="radio" label="Интернет-магазин" v-model="formData.radio" />
              </div>
            </div>

            <!--  -->
            <div class="form__checked">
              <div class="form__checked_title">Сервисы для связи с посетителями сайта</div>

              <div class="form__checked_desc">
                Выберите желаемые сервисы для связи с посетителями сайта
              </div>

              <div class="form__checked_list">
                <UiFormInput
                  type="checkbox"
                  label="Форма обратной связи"
                  v-model="formData.communication"
                />

                <UiFormInput
                  type="checkbox"
                  label="Форма Обратный звонок"
                  v-model="formData.communication"
                />

                <UiFormInput
                  type="checkbox"
                  label="Вопрос-ответ"
                  v-model="formData.communication"
                />

                <UiFormInput type="checkbox" label="Голосования" v-model="formData.communication" />

                <UiFormInput type="checkbox" label="Отзывы" v-model="formData.communication" />

                <UiFormInput type="checkbox" label="Комментарии" v-model="formData.communication" />

                <UiFormInput
                  type="checkbox"
                  label="Онлайн-консультант"
                  v-model="formData.communication"
                />

                <UiFormInput
                  type="checkbox"
                  label="Системы онлайн-бронирования"
                  v-model="formData.communication"
                />

                <UiFormInput
                  type="checkbox"
                  label="Подписки и email-рассылки"
                  v-model="formData.communication"
                />

                <UiFormInput
                  type="checkbox"
                  label="Регистрация пользователей"
                  v-model="formData.communication"
                />

                <UiFormInput
                  type="checkbox"
                  label="Личный кабинет"
                  v-model="formData.communication"
                />

                <UiFormInput
                  type="checkbox"
                  label="Оповещения по SMS"
                  v-model="formData.communication"
                />
              </div>
            </div>

            <!--  -->
            <div class="form__checked">
              <div class="form__checked_title">Сервисы по продаже через интернет</div>

              <div class="form__checked_desc">
                Отметьте функции, которыми должен обладать сайт для продаж в сети
              </div>

              <div class="form__checked_list">
                <UiFormInput type="checkbox" label="Рубрикатор" v-model="formData.salesServices" />

                <UiFormInput
                  type="checkbox"
                  label="Поиск по каталогу"
                  v-model="formData.salesServices"
                />

                <UiFormInput
                  type="checkbox"
                  label="Фильтрация товаров"
                  v-model="formData.salesServices"
                />

                <UiFormInput
                  type="checkbox"
                  label="Расширенное описание категорий или товаров"
                  v-model="formData.salesServices"
                />

                <UiFormInput
                  type="checkbox"
                  label="Добавление товаров в избранное"
                  v-model="formData.salesServices"
                />

                <UiFormInput
                  type="checkbox"
                  label="Запрос цены по отдельным позициям"
                  v-model="formData.salesServices"
                />

                <UiFormInput
                  type="checkbox"
                  label="Сравнение товаров"
                  v-model="formData.salesServices"
                />

                <UiFormInput type="checkbox" label="Корзина" v-model="formData.salesServices" />

                <UiFormInput
                  type="checkbox"
                  label="Расчет скидок"
                  v-model="formData.salesServices"
                />

                <UiFormInput
                  type="checkbox"
                  label="Расчет стоимости доставки"
                  v-model="formData.salesServices"
                />

                <UiFormInput
                  type="checkbox"
                  label="История заказов пользователя"
                  v-model="formData.salesServices"
                />

                <UiFormInput
                  type="checkbox"
                  label="Уведомление клиентов о статусе заказов"
                  v-model="formData.salesServices"
                />

                <UiFormInput
                  type="checkbox"
                  label="Оплата онлайн"
                  v-model="formData.salesServices"
                />

                <UiFormInput
                  type="checkbox"
                  label="Автоматическое формирование счета для оплаты"
                  v-model="formData.salesServices"
                />
              </div>
            </div>

            <!--  -->
            <div class="form__checked">
              <div class="form__checked_title">
                Интеграции со сторонними сервисами и программами
              </div>

              <div class="form__checked_desc">
                Укажите сервисы, с которыми необходимо интегрировать сайт
              </div>

              <div class="form__checked_list">
                <UiFormInput
                  type="checkbox"
                  label="Импорт прайса из Excel"
                  v-model="formData.integrationServices"
                />

                <UiFormInput
                  type="checkbox"
                  label="Интеграция с 1С"
                  v-model="formData.integrationServices"
                />

                <UiFormInput
                  type="checkbox"
                  label="Интеграция с корпоративной базой данных"
                  v-model="formData.integrationServices"
                />

                <UiFormInput
                  type="checkbox"
                  label="Яндекс.Маркет"
                  v-model="formData.integrationServices"
                />

                <UiFormInput
                  type="checkbox"
                  label="Фарпост"
                  v-model="formData.integrationServices"
                />

                <UiFormInput
                  type="text"
                  label="Языковые версии сайта"
                  placeholder="Введите необходимые языки"
                  v-model="formData.language"
                  class="mt62"
                />
              </div>
            </div>

            <!--  -->
            <div class="form__checked">
              <div class="form__checked_title">Система управления сайтом</div>

              <div class="form__checked_desc">Выберете желаемую систему управления сайтом</div>

              <div class="form__checked_list">
                <UiFormInput type="radio" label="WordPress (бесплатная)" v-model="formData.cms" />
                <UiFormInput type="radio" label="Битрикс (платная)" v-model="formData.cms" />
                <UiFormInput type="radio" label="Tilda" v-model="formData.cms" />
                <UiFormInput type="radio" label="Кастомная разработка" v-model="formData.cms" />

                <UiFormInput
                  type="textarea"
                  label="Другие цели, сервисы, функции и CMS"
                  placeholder="Если вам необходимы другие сервисы и функции, у вас другие цели или CMS - укажите из здесь"
                  v-model="formData.otherGoals"
                  class="mt62"
                />
              </div>
            </div>
          </div>

          <!--  -->
          <div class="form__bx form__bx_2">
            <div class="form_title">Структура сайта</div>

            <div class="form__checked">
              <div class="form__checked_list">
                <UiFormInput
                  type="textarea"
                  label="Разделы сайта"
                  placeholder="Укажите основные разделы сайта: о компании, каталог, новости и т.д."
                  v-model="formData.sectionsSite"
                />

                <UiFormInput
                  type="textarea"
                  label="Навигация по сайту"
                  placeholder="Какие меню должны присутствовать на сайте слева, справа, сверху, снизу. Какие пункты должны содержать"
                  v-model="formData.siteNavigation"
                />

                <UiFormInput
                  type="textarea"
                  label="Информационные блоки"
                  placeholder="Перечислите информационные блоки, которые должны присутствовать на главной и внутренних страницах"
                  v-model="formData.informationBlocks"
                />
              </div>
            </div>
          </div>

          <!--  -->
          <div class="form__bx form__bx_2">
            <div class="form_title">Дизайн сайта</div>

            <div class="form__checked">
              <div class="form__checked_list">
                <UiFormInput
                  type="textarea"
                  label="Примеры сайтов, дизайн которых вам нравится"
                  placeholder="Напишите адреса сайтов, дизайн которых вам нравится, укажите почему"
                  v-model="formData.examplesDesignLike"
                />

                <UiFormInput
                  type="textarea"
                  label="Примеры сайтов, дизайн которых вам не нравится"
                  placeholder="Напишите адреса сайтов, дизайн которых вам не нравится, укажите почему"
                  v-model="formData.examplesDesignNotLike"
                />

                <UiFormInput
                  type="textarea"
                  label="Основные требования и пожелания по дизайну сайта"
                  placeholder="Опишите требования и пожелания, можно написать любую информацию, которая может помочь нашему дизайнеру"
                  v-model="formData.requirementsWishes"
                />
              </div>
            </div>

            <!-- -->
            <div class="form__checked">
              <div class="form__checked_title">
                Какие элементы фирменного стиля существуют и могут быть использованы при разработке
                дизайна
              </div>

              <div class="form__checked_list">
                <UiFormInput
                  type="checkbox"
                  label="Руководство по фирменному стилю"
                  v-model="formData.corporateIdentity"
                />

                <UiFormInput type="checkbox" label="Логотип" v-model="formData.corporateIdentity" />

                <UiFormInput
                  type="checkbox"
                  label="Фирменные цвета"
                  v-model="formData.corporateIdentity"
                />

                <UiFormInput
                  type="checkbox"
                  label="Фирменные шрифты"
                  v-model="formData.corporateIdentity"
                />

                <UiFormInput
                  type="checkbox"
                  label="Полиграфия"
                  v-model="formData.corporateIdentity"
                />

                <UiFormInput
                  type="checkbox"
                  label="Фотографии"
                  v-model="formData.corporateIdentity"
                />

                <UiFormInput
                  type="checkbox"
                  label="Каталоги"
                  v-model="formData.corporateIdentity"
                />

                <UiFormInput type="checkbox" label="Буклеты" v-model="formData.corporateIdentity" />

                <UiFormInput type="checkbox" label="Другое" v-model="formData.corporateIdentity" />
              </div>
            </div>

            <!--  -->
            <div class="form__checked">
              <div class="form__checked_title">
                Настроение и ассоциации, которые должен вызвать дизайн сайта
              </div>

              <div class="form__checked_list">
                <UiFormInput
                  type="checkbox"
                  label="Строгий корпоративный дизайн"
                  v-model="formData.moodAssociations"
                />

                <UiFormInput
                  type="checkbox"
                  label="Яркий, броский дизайн"
                  v-model="formData.moodAssociations"
                />

                <UiFormInput
                  type="checkbox"
                  label="Позитивный и веселый"
                  v-model="formData.moodAssociations"
                />

                <UiFormInput
                  type="checkbox"
                  label="Дизайн насыщенный иллюстрациями/фотографиями"
                  v-model="formData.moodAssociations"
                />

                <UiFormInput
                  type="checkbox"
                  label="Минималистичный дизайн. Упор на функциональность"
                  v-model="formData.moodAssociations"
                />

                <UiFormInput
                  type="textarea"
                  label="Свой вариант"
                  v-model="formData.yourOwnVersion"
                />
              </div>
            </div>

            <!--  -->
            <div class="form__checked">
              <div class="form__checked_title">
                Наличие фотографий и картинок для разработки дизайна
              </div>

              <div class="form__checked_list">
                <UiFormInput type="radio" label="Есть" v-model="formData.availabilityPhotos" />

                <UiFormInput
                  type="radio"
                  label="Необходимо подобрать дизайнеру"
                  v-model="formData.availabilityPhotos"
                />

                <UiFormInput
                  type="radio"
                  label="Необходима фотосессия"
                  v-model="formData.availabilityPhotos"
                />
              </div>
            </div>
          </div>

          <!-- ============================== -->
          <div class="form__bx form__bx_2">
            <div class="form_title">Контент и дополнительные услуги</div>

            <div class="form__checked">
              <div class="form__checked_title">Контент для сайта: тексты, переводы, фотографии</div>

              <div class="form__checked_list">
                <UiFormInput type="checkbox" label="Уже готов" v-model="formData.contentSite" />

                <UiFormInput
                  type="checkbox"
                  label="Необходимы услуги копирайтера, рерайтера"
                  v-model="formData.contentSite"
                />

                <UiFormInput
                  type="checkbox"
                  label="Необходим фотограф"
                  v-model="formData.contentSite"
                />

                <UiFormInput
                  type="checkbox"
                  label="Необходим переводчик"
                  v-model="formData.contentSite"
                />
              </div>
            </div>

            <!--  -->
            <div class="form__checked">
              <div class="form__checked_title">Дополнительные услуги и сервисы</div>

              <div class="form__checked_list">
                <UiFormInput
                  type="checkbox"
                  label="Наполнение контентом"
                  v-model="formData.additionalServices"
                />

                <UiFormInput
                  type="checkbox"
                  label="Техническая поддержка сайта"
                  v-model="formData.additionalServices"
                />

                <UiFormInput
                  type="checkbox"
                  label="Ведение сайта (регулярное обновление контента)"
                  v-model="formData.additionalServices"
                />

                <UiFormInput
                  type="checkbox"
                  label="Контекстная реклама"
                  v-model="formData.additionalServices"
                />

                <UiFormInput
                  type="checkbox"
                  label="SEO-продвижение"
                  v-model="formData.additionalServices"
                />

                <UiFormInput
                  type="checkbox"
                  label="Разработка фирменного стиля"
                  v-model="formData.additionalServices"
                />

                <UiFormInput
                  type="checkbox"
                  label="Разработка логотипа"
                  v-model="formData.additionalServices"
                />
              </div>
            </div>

            <!--  -->
            <div class="form__checked">
              <div class="form__checked_title">Дополнительные файлы</div>

              <div class="form__checked_desc">
                Можно прикрепить заполненный бриф, наброски прототипа, <br />
                примерное ТЗ или любые файлы для разработки сайта
              </div>

              <UiFormInput type="file" v-model="formData.file" />
            </div>
          </div>

          <!--  -->
          <UiButton class="form_btn_submit" type="submit" title="Отправить" arrow />

          <!--  -->
          <div class="form__copy">
            Нажимая кнопку "Отправить" вы соглашаетесь с
            <NuxtLink to="/privacy">политикой конфиденциальности</NuxtLink>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<style lang="css" scoped>
:global(.invalid .field__inp) {
  outline: 2px solid #c20000;
}

/*  */
.mt62 {
  margin-top: 62px;
}

/*  */
.pages_brief {
  background-color: white;
}

/*  */
.brief_title {
  font-family: var(--fontFamily-Unbounded);
  font-size: 68px;
  line-height: 110%;
  letter-spacing: 0.02em;
  margin-bottom: 42px;
}

/*  */
.brief_main {
  color: var(--colorDark3);
  padding-bottom: 160px;
}

/*  */
.brief_desc {
  max-width: 630px;
  font-weight: 300;
  font-size: 26px;
  line-height: 130%;
  color: var(--bgColor);
}

.brief_desc__link {
  color: var(--accentColor);
  border-bottom: 1px solid;
  cursor: pointer;
}

/* ================= */
.form__bx {
  margin-top: 82px;
}

.form_title {
  font-family: var(--fontFamily-Unbounded);
  font-size: 32px;
  line-height: 120%;
  letter-spacing: 0.02em;
  color: var(--bgColor);
  margin-bottom: 62px;
}

/*  */
.form_fields {
  display: flex;
  flex-direction: column;
  row-gap: 32px;
}

/*  */
.form__checked {
  margin-bottom: 62px;
}

.form__checked_title {
  font-weight: 500;
  font-size: 24px;
  line-height: 140%;
  color: var(--bgColor);
  margin-bottom: 18px;
}

.form__checked_desc {
  font-weight: 300;
  font-size: 18px;
  line-height: 140%;
  color: var(--colorBlackTextOpacity08);
  margin-bottom: 36px;
}

.form__checked_desc.form__checked_desc_cover {
  font-weight: 500;
  font-size: 20px;
  line-height: 130%;
}

.form__checked_list {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}

/*  */
.form_btn_submit {
  max-width: 730px;
  width: 100%;
  height: 103px;
  font-family: var(--fontFamily-Unbounded);
  font-size: 24px;
  line-height: 130%;
  border-radius: 28px;
}

/*  */
.form__copy {
  margin: 24px 0 0 45px;
}

.form__copy,
.form__copy a {
  font-weight: 300;
  font-size: 16px;
  line-height: 130%;
  color: var(--colorDark2);
}

.form__copy a {
  border-bottom: 1px solid var(--colorGray);
}

/* ====================== */
@media (max-width: 830px) {
  .brief_title {
    font-size: 56px;
  }

  .brief_desc {
    max-width: 535px;
    font-size: 22px;
  }
}

@media (max-width: 810px) {
  .form__copy {
    margin: 24px 0 0 0;
    text-align: center;
  }
}

@media (max-width: 768px) {
  .form__bx.form__bx_2 {
    margin-top: 82px;
  }

  .brief_title {
    margin-bottom: 37px;
  }

  .form__bx {
    margin-top: 52px;
  }

  .form_title {
    font-size: 26px;
    margin-bottom: 52px;
  }
}

@media (max-width: 700px) {
  .brief_title br {
    display: none;
  }
}

@media (max-width: 576px) {
  .mt62 {
    margin-top: 32px;
  }

  /*  */
  .brief_title {
    font-size: 28px;
    margin-bottom: 18px;
  }

  .brief_desc {
    font-size: 15px;
  }

  .form__bx {
    margin-top: 62px;
  }

  .form_title {
    font-size: 22px;
    margin-bottom: 42px;
  }

  .form__bx.form__bx_2 {
    margin-top: 52px;
  }

  .form__checked_title {
    font-size: 20px;
    margin-bottom: 12px;
  }

  .form__checked_desc {
    font-size: 16px;
    margin-bottom: 26px;
  }

  .form__checked {
    margin-bottom: 42px;
  }

  .form_btn_submit {
    height: 85px;
    font-size: 18px;
  }

  .form_btn_submit :deep(.btn__arrow .arrow) {
    width: 13px;
    height: 13px;
  }

  .form__copy {
    font-size: 13px;
  }

  .brief_main {
    padding-bottom: 62px;
  }
}

@media (max-width: 400px) {
  .brief_desc {
    max-width: 320px;
  }
}
</style>
