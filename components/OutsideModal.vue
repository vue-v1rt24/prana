<script setup lang="ts">
import { type TypeOutsideModal } from '@/types/form.types';

/*  */
defineProps<{
  isProject?: boolean;
}>();

/*  */
const openModalRef = ref(false);
const isOpenSelectRef = ref<boolean>(false);
const whereFromRef = ref('Откуда узнали про PRANA IT?');

// Поля формы
const fields = reactive({
  nameUser: 'Имя',
  phone: '1111111111',
  email: 'w@w.ww',
  project: [],
  text: 'Тест сообщения',
  file: null as File | null,
  whereFrom: '',
});

// Обработка загружаемого файла
const loadFile = (evt: Event) => {
  const target = evt.target as HTMLInputElement;

  if (target.files) {
    fields.file = target.files[0];
  }
};

// Выбор "Откуда узнали про PRANA IT"
const setWhereFrom = (evt: MouseEvent) => {
  const target = evt.target as HTMLDialogElement;

  if (target.textContent) {
    whereFromRef.value = target.textContent;
    fields.whereFrom = target.textContent;
  }
};

// Открытие/Закрытие селекта
const openSelect = () => {
  isOpenSelectRef.value = !isOpenSelectRef.value;
};

// Отправка формы
const sendHandler = () => {
  console.log('Отправка формы модального окна');
};

// Открытие модального окна
const openModal = () => {
  openModalRef.value = true;
};

// Закрытие модального окна
const closeModal = () => {
  openModalRef.value = false;
};

//
defineExpose({
  openModal,
});

//
watch(
  () => openModalRef.value,
  (val) => {
    if (val) {
      document.body.classList.add('open_modal');
    } else {
      document.body.classList.remove('open_modal');
    }
  },
);
</script>

<template>
  <div
    @click="openModalRef = false"
    :class="['outside__backdrop', { outside__backdrop_visible: openModalRef }]"
  ></div>

  <form @submit.prevent="" :class="['outside', { outside__open: openModalRef }]">
    <div class="outside__field">
      <div class="outside__title">Ваши контакты</div>

      <div class="outside__inp">
        <div class="outside__inp_duo">
          <input type="text" placeholder="Ваше имя*" v-model="fields.nameUser" />
          <input
            type="tel"
            placeholder="Номер телефона*"
            v-model="fields.phone"
            v-maska="'+7 (###) ###-##-##'"
          />
        </div>

        <input type="email" placeholder="Почта" v-model="fields.email" />
      </div>
    </div>

    <!--  -->
    <div class="outside__field">
      <div class="outside__title">О проекте</div>

      <div v-if="!isProject" class="outside__inp_checkbox">
        <label class="outside__inp_var react">
          <input type="checkbox" value="Разработка" v-model="fields.project" />
          <span>Разработка</span>
        </label>

        <label class="outside__inp_var react">
          <input type="checkbox" value="Брендинг" v-model="fields.project" />
          <span>Брендинг</span>
        </label>

        <label class="outside__inp_var react">
          <input type="checkbox" value="Продвижение" v-model="fields.project" />
          <span>Продвижение</span>
        </label>

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
      <UiButton class="outside__send_btn" title="Отправить" @click-btn="sendHandler" />

      <div class="outside__send_text">
        Нажимая кнопку “Отправить” вы соглашаетесь с
        <NuxtLink to="/privacyPolicy">политикой конфиденциальности</NuxtLink>
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
  z-index: 100;
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
  z-index: 101;
  width: 950px;
  height: 100%;
  background-color: var(--colorBirch);
  padding: 80px;
  overflow-y: auto;
  transition: right 0.5s;
}

.outside__open {
  right: 0;
}

/*  */
.outside__field {
  margin-bottom: 52px;
}

/*  */
.outside__title {
  font-family: var(--fontFamily-RFDewi);
  font-weight: 700;
  font-size: 22px;
  line-height: 100%;
  letter-spacing: 0.02em;
  color: var(--colorDark3);
  margin-bottom: 32px;
}

/* input */
.outside input,
.outside__textarea {
  width: 100%;
  height: 72px;
  font-family: var(--fontFamily-NeueMachina);
  line-height: 100%;
  /* color: var(--colorGray); */
  border: none;
  border-radius: 18px;
  padding: 28px;
}

.outside input::placeholder,
.outside__textarea::placeholder {
  color: var(--colorGray);
}

/* textarea */
.outside__textarea {
  height: 120px;
  resize: none;
}

/*  */
.outside__inp_duo {
  display: flex;
  gap: 28px;
  margin-bottom: 28px;
}

/*  */
.outside__inp_checkbox {
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
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
}

/*  */
.outside__load_file {
  margin: 32px 0 42px 0;
}

.outside__load_file_title {
  color: var(--colorDark3);
  margin-bottom: 24px;
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
    }
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
    width: 791px;
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
    }
  }
}

/*  */
.outside__send {
  display: flex;
  align-items: center;
  column-gap: 32px;
}

.outside__send_btn {
  width: 315px;
  height: 95px;
  border-radius: 28px;
}

.outside__send_text {
  width: 210px;
  font-weight: 300;
  font-size: 14px;
  line-height: 130%;
  color: var(--colorGray);
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
}
</style>
