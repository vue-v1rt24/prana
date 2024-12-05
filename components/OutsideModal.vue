<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';

import { type TypeSetMailMessage } from '@/types/form.types';

// Управление модальным окном
const { isOpenModal, dopDate, isVisibleBtnProject, isSendFormSuccess } = useOutsideModal();

//
const mail = useMail();

//
const outsideForm = ref<HTMLFormElement | null>(null);
const openModalRef = ref(false);
const isOpenSelectRef = ref<boolean>(false);
const whereFromRef = ref('Откуда узнали про PRANA IT?');
const filePath = ref<string | null>(null);

let raschet: string = '';

// === Поля формы
const fields = reactive({
  nameUser: '',
  phone: '',
  email: '',
  project: [],
  text: '',
  file: null as File | null,
  whereFrom: '',
});

// === Сброс формы
const resetForm = () => {
  fields.nameUser = '';
  fields.phone = '';
  fields.email = '';
  fields.project = [];
  fields.text = '';
  fields.file = null;
  fields.whereFrom = '';
  whereFromRef.value = 'Откуда узнали про PRANA IT?';
  raschet = '';
};

// === Валидация формы
const rules = computed(() => {
  const localRules = {
    nameUser: {
      required,
    },
    phone: {
      required,
      minLength: minLength(18),
    },
    email: {}, // для типизации
  };

  // Динамическая валидация по почты (если что-то в поле почты введём, то добавим валидацию)
  if (fields.email) {
    localRules.email = {
      required,
      email,
    };
  }

  //
  return localRules;
});

const v$ = useVuelidate(rules, fields);

// === Обработка загружаемого файла
const loadFile = (evt: Event) => {
  const target = evt.target as HTMLInputElement;

  if (target.files) {
    fields.file = target.files[0];
  }
};

// === Выбор "Откуда узнали про PRANA IT"
const setWhereFrom = (evt: MouseEvent) => {
  const target = evt.target as HTMLDialogElement;

  if (target.textContent) {
    whereFromRef.value = target.textContent;
    fields.whereFrom = target.textContent;
  }
};

// === Открытие/Закрытие селекта
const openSelect = () => {
  isOpenSelectRef.value = !isOpenSelectRef.value;
};

// === Сохранение картинки и формирование пути до неё
const saveImage = () => {
  return new Promise(async (resolve, reject) => {
    const fd = new FormData();
    fd.append(Date.now() + '', fields.file!);

    const res = await $fetch('/api/loadImg', {
      method: 'POST',
      body: fd,
    });

    if (res) {
      filePath.value = res;
      resolve(true);
    } else {
      reject('Ошибка сохранения изображения');
    }
  });
};

// === Формирование письма
const setMail = () => {
  const message: TypeSetMailMessage = {
    subject: 'Заявка с сайта pranait.ru',
    // text: 'Текстовое сообщение',
    html: `
          <div>Имя: <strong>${fields.nameUser}</strong></div>
          <div>Номер телефона: <strong>${fields.phone}</strong></div>

          ${fields.email && `<div>Почта: <strong>${fields.email}</strong></div>`}

          ${
            (fields.project.length || raschet) &&
            `<div>Что рассчитать: <strong>${fields.project.join(', ') || raschet}</strong></div>`
          }

          ${fields.text && `<div>Текст сообщения: <strong>${fields.text}</strong></div>`}

          ${
            fields.whereFrom &&
            `<div>Откуда узнали про PRANA IT: <strong>${fields.whereFrom}</strong></div>`
          }
        `,
  };

  //
  if (fields.file) {
    message['attachments'] = [
      {
        path: `./public/files_emails/${filePath.value}`,
      },
    ];
  }

  //
  return message;
};

// === Отправка формы
const sendHandler = async () => {
  // Запускаем валидацию
  v$.value.$touch();

  // Если есть ошибки в валидации
  if (v$.value.$error) {
    outsideForm.value?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    return;
  }

  // Проверяем загрузку файла в форме
  if (fields.file) {
    try {
      await saveImage();
    } catch (error) {
      console.log(error);
    }
  }

  // Отправка письма
  await mail.send(setMail());

  // Очищение полей
  resetForm();

  // Сброс валидации
  v$.value.$reset();

  // Флаг, что форма отправлена (передаётся в другие компоненты, как emit)
  isSendFormSuccess().value = true;

  setTimeout(() => {
    isSendFormSuccess().value = false;
  }, 100);

  // Закрытие модального окна
  closeModal();

  // Перенаправление нап страницу "Спасибо"
  await navigateTo('/success');
};

// === Открытие модального окна
const openModal = () => {
  document.body.classList.add('open_modal');
  openModalRef.value = true;
};

// === Закрытие модального окна
const closeModal = () => {
  openModalRef.value = false;
  isOpenModal().value = false;
  document.body.classList.remove('open_modal', 'open_menu');
};

// Открытие модального окна
watch(
  () => isOpenModal().value,
  (val) => {
    if (val) {
      openModal();
    }
  },
);

// Формирование дополнительных данных (они приходят из вне)
watch(
  () => dopDate().value,
  (val) => {
    fields.project = [];
    raschet = '';

    for (const key in dopDate().value) {
      const element = dopDate().value[key];
      raschet += `<div>${key}: ${element.join(', ')}</div>`;
    }
  },
);
</script>

<template>
  <div
    @click="closeModal"
    :class="['outside__backdrop', { outside__backdrop_visible: openModalRef }]"
  ></div>

  <form
    ref="outsideForm"
    @submit.prevent="sendHandler"
    :class="['outside', { outside__open: openModalRef }]"
  >
    <div class="outside__field">
      <div class="outside__title">Ваши контакты</div>

      <div class="outside__inp">
        <div class="outside__inp_duo">
          <input
            type="text"
            placeholder="Ваше имя*"
            v-model.trim="fields.nameUser"
            :class="{ invalid: v$.nameUser.$error }"
          />
          <input
            type="tel"
            placeholder="Номер телефона*"
            v-model="fields.phone"
            v-maska="'+7 (###) ###-##-##'"
            :class="{ invalid: v$.phone.$error }"
          />
        </div>

        <input
          type="email"
          placeholder="Почта"
          v-model.trim="fields.email"
          :class="{ invalid: v$.email.$error }"
        />
      </div>
    </div>

    <!--  -->
    <div class="outside__field">
      <div class="outside__title">О проекте</div>

      <div v-if="!isVisibleBtnProject().value" class="outside__inp_checkbox">
        <label class="outside__inp_var react">
          <input type="checkbox" value="Разработка" v-model="fields.project" />
          <span>Разработка</span>
        </label>

        <label class="outside__inp_var react">
          <input type="checkbox" value="Брендинг" v-model="fields.project" />
          <span>Брендинг</span>
        </label>

        <!-- <label class="outside__inp_var react">
          <input type="checkbox" value="Продвижение" v-model="fields.project" />
          <span>Продвижение</span>
        </label> -->

        <label class="outside__inp_var react">
          <input type="checkbox" value="Фото и видео" v-model="fields.project" />
          <span>Фото и видео</span>
        </label>
      </div>

      <!--  -->
      <textarea
        placeholder="Опишите задачу"
        class="outside__textarea"
        v-model="fields.text"
      ></textarea>

      <!--  -->
      <div class="outside__load_file">
        <div class="outside__load_file_title">Загрузите любую информацию о вашем проекте</div>

        <label class="outside__load_file_label react">
          <input type="file" @change="loadFile" />

          <div v-if="!fields.file" class="outside__load_file_load">
            <span class="outside__load_file_load_plus">+</span>
            <span class="outside__load_file_load_title">Прикрепить файл</span>
          </div>

          <div v-else class="outside__load_file_load">
            <img src="/img/check-blue.svg" alt="" />
            <span class="outside__load_file_load_title">Файл прикреплён</span>
          </div>
        </label>
      </div>

      <!--  -->
      <div
        :class="['outside__select', 'react', { outside__select_open: isOpenSelectRef }]"
        @click="openSelect"
      >
        <div class="outside__select_title">{{ whereFromRef }}</div>

        <div class="outside__select_list" v-if="isOpenSelectRef">
          <div class="outside__select_option" @click="setWhereFrom">Реклама</div>
          <div class="outside__select_option" @click="setWhereFrom">Поиск</div>
          <div class="outside__select_option" @click="setWhereFrom">Рейтинги</div>
          <div class="outside__select_option" @click="setWhereFrom">СМИ</div>
          <div class="outside__select_option" @click="setWhereFrom">Соцсети</div>
          <div class="outside__select_option" @click="setWhereFrom">Блог</div>
          <div class="outside__select_option" @click="setWhereFrom">Выступление, конференция</div>
          <div class="outside__select_option" @click="setWhereFrom">Рекомендация</div>
          <div class="outside__select_option" @click="setWhereFrom">Давно знаю</div>
          <div class="outside__select_option" @click="setWhereFrom">Другое</div>
        </div>
      </div>
    </div>

    <!--  -->
    <div class="outside__send">
      <UiButton class="outside__send_btn" type="submit" title="Отправить" />

      <div class="outside__send_text">
        Нажимая кнопку "Отправить" вы соглашаетесь с
        <NuxtLink to="/privacy" @click="closeModal">политикой конфиденциальности</NuxtLink>
      </div>
    </div>

    <!--  -->
    <UiClose
      class="outside__close"
      back-color="rgba(64, 182, 183, 0.1)"
      @close-click="closeModal"
    />
  </form>
</template>

<style lang="css" scoped>
.outside__backdrop {
  content: '';
  opacity: 0;
  visibility: hidden;
  position: fixed;
  inset: 0;
  background-color: rgba(6, 14, 27, 0.8);
  backdrop-filter: blur(16px);
  z-index: 1099;
  transition: opacity 0.5s;
}

.outside__backdrop_visible {
  opacity: 1;
  visibility: visible;
}

/*  */
.outside {
  position: fixed;
  top: 0;
  right: -100%;
  z-index: 1100;
  width: 950px;
  height: 100%;
  background-color: var(--colorBirch);
  padding: 80px;
  overflow-y: auto;
  transition: right 0.5s;

  /*  */
  @media (max-width: 992px) {
    width: 730px;
    padding: 39px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 576px) {
    padding: 20px;
  }
}

.outside__open {
  right: 0;
}

/*  */
.outside__field {
  margin-bottom: 52px;

  /*  */
  @media (max-width: 576px) {
    margin-bottom: 32px;
  }
}

/*  */
.outside__title {
  font-family: var(--fontFamily-Unbounded);
  font-size: 22px;
  line-height: 100%;
  letter-spacing: 0.02em;
  color: var(--colorDark3);
  margin-bottom: 32px;

  /*  */
  @media (max-width: 576px) {
    font-size: 15px;
    margin-bottom: 24px;
  }
}

/* input */
.outside input,
.outside__textarea {
  width: 100%;
  height: 72px;
  font-family: var(--fontFamily-NeueMachina);
  line-height: 100%;
  border: none;
  border-radius: 18px;
  padding: 28px;

  /*  */
  @media (max-width: 576px) {
    height: 63px;
    border-radius: 14px;
    padding: 24px;
  }
}

.outside input::placeholder,
.outside__textarea::placeholder {
  color: var(--colorGray);
}

/* textarea */
.outside__textarea {
  height: 120px;
  resize: none;

  /*  */
  @media (max-width: 576px) {
    height: 90px !important;
  }
}

/*  */
.outside__inp_duo {
  display: flex;
  gap: 28px;
  margin-bottom: 28px;

  /*  */
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 10px;
    margin-bottom: 10px;
  }
}

/*  */
.outside__inp_checkbox {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 32px;

  /*  */
  @media (max-width: 576px) {
    gap: 10px;
    margin-bottom: 24px;
  }
}

.outside__inp_var {
  border: 2px solid var(--accentColor);
  font-weight: 500;
  font-size: 17px;
  line-height: 120%;
  letter-spacing: 0.02em;
  color: var(--colorDark3);
  border-radius: 100px;
  padding: 20px 26px;

  [type='checkbox'] {
    display: none;
  }

  &:has(input:checked) {
    color: white;
    background-color: var(--accentColor);
  }

  /*  */
  @media (max-width: 992px) {
    font-size: 15px;
  }

  @media (max-width: 576px) {
    font-size: 14px;
    padding: 16px 20px;
  }
}

/*  */
.outside__load_file {
  margin: 32px 0 42px 0;

  @media (max-width: 576px) {
    margin: 24px 0 32px 0;
  }
}

.outside__load_file_title {
  color: var(--colorDark3);
  margin-bottom: 24px;

  /*  */
  @media (max-width: 576px) {
    width: 224px;
    font-size: 14px;
    margin-bottom: 14px;
  }
}

.outside__load_file_label {
  width: 228px;
  height: 42px;
  font-size: 17px;
  color: var(--accentColor);
  border: 2px solid var(--accentColor);
  border-radius: 47px;
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    display: none;
  }

  .outside__load_file_load {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 10px;

    .outside__load_file_load_plus {
      font-size: 26px;
      translate: 0 -3px;

      /*  */
      @media (max-width: 576px) {
        font-size: 20px;
      }
    }

    /*  */
    @media (max-width: 576px) {
      font-size: 15px;
    }
  }

  /*  */
  @media (max-width: 576px) {
    width: 208px;
  }
}

/*  */
.outside__select {
  position: relative;
  color: var(--colorGray);
  user-select: none;
  cursor: pointer;

  /*  */
  .outside__select_title {
    position: relative;
    width: 100%;
    height: 72px;
    line-height: 100%;
    background-color: white;
    border-radius: 18px;
    display: flex;
    align-items: center;
    padding: 0 72px 0 28px;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      translate: 0 -50%;
      right: 28px;
      width: 16px;
      height: 16px;
      background-image: url(/img/select.svg);
      background-repeat: no-repeat;
    }

    .outside__select_open &::before {
      rotate: 180deg;
    }

    /*  */
    @media (max-width: 576px) {
      height: 63px;
      font-size: 15px;
      padding: 0 55px 0 24px;
    }
  }

  /*  */
  .outside__select_list {
    position: absolute;
    top: 82px;
    width: 100%;
    height: 200px;
    background-color: white;
    border-radius: 18px;
    overscroll-behavior-y: contain;
    overflow-y: auto;

    .outside__select_option {
      height: 72px;
      display: flex;
      align-items: center;
      padding: 0 28px;

      /*  */
      @media (max-width: 576px) {
        height: 63px;
        font-size: 15px;
      }
    }

    /*  */
    @media (max-width: 576px) {
      top: 70px;
      height: 160px;
    }
  }
}

/*  */
.outside__send {
  display: flex;
  align-items: center;
  column-gap: 32px;

  /*  */
  @media (max-width: 576px) {
    flex-direction: column;
    row-gap: 20px;
  }
}

.outside__send_btn {
  width: 315px;
  height: 95px;
  border-radius: 28px;

  /*  */
  @media (max-width: 576px) {
    width: 100%;
    height: 79px;
  }
}

.outside__send_text {
  width: 210px;
  font-weight: 300;
  font-size: 14px;
  line-height: 130%;
  color: var(--colorGray);

  /*  */
  @media (max-width: 576px) {
    width: 283px;
    font-size: 12px;
    text-align: center;
  }
}

.outside__send_text a {
  color: var(--colorGray);
  border-bottom: 1px solid var(--colorGray);
}

/*  */
.outside__close {
  position: absolute;
  top: 30px;
  right: 30px;

  /*  */
  @media (max-width: 992px) {
    width: 38px;
    height: 38px;

    & :deep(img) {
      width: 14px;
    }
  }

  @media (max-width: 576px) {
    width: 24px;
    height: 24px;
    top: 10px;
    right: 10px;

    & :deep(img) {
      width: 10px;
    }
  }
}

/*  */
.outside .invalid {
  outline: 1px solid red;
}
</style>
