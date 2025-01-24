<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';

//
const mail = useMail();

const theme = useTheme();

const contactForm = ref<HTMLFormElement | null>(null);

// === Поля формы
const fields = reactive({
  username: '',
  email: '',
  phone: '',
  svyaz: 'Звонок',
});

// === Сброс формы
const resetForm = () => {
  fields.username = '';
  fields.email = '';
  fields.phone = '';
  fields.svyaz = 'Звонок';
};

// === Валидация формы
const rules = computed(() => ({
  username: {
    required,
  },
  email: {
    // required,
    email,
  },
  phone: {
    required,
    minLength: minLength(18),
  },
}));

const v$ = useVuelidate(rules, fields);

// === Формирование письма
const setMail = () => {
  const message = {
    subject: 'Заявка с сайта pranait.ru',
    // text: 'Текстовое сообщение',
    html: `
          <div>Имя: <strong>${fields.username}</strong></div>
          <div>Номер телефона: <strong>${fields.phone}</strong></div>
          <div>Почта: <strong>${fields.email}</strong></div>
          <div>Удобный способ связи: <strong>${fields.svyaz}</strong></div>
        `,
  };

  //
  return message;
};

// === Отправка почты
const sendHandler = async () => {
  // Запускаем валидацию
  v$.value.$touch();

  // Если есть ошибки в валидации
  if (v$.value.$error) {
    contactForm.value?.scrollIntoView({
      behavior: 'smooth',
    });

    return;
  }

  // Отправка письма
  await mail.send(setMail());

  // Очищение полей
  resetForm();

  // Сброс валидации
  v$.value.$reset();

  // Перенаправление нап страницу "Спасибо"
  await navigateTo('/success');
};
</script>

<template>
  <div :class="['data_company__form', { dark: theme === 'dark', light: theme === 'light' }]">
    <div class="contact_us">
      <div class="contact_us__h3">Свяжитесь с нами</div>

      <p class="description contact_us__description">
        Оставьте заявку и команда <br class="visible576" />
        PRANA IT <br class="hide576" />
        свяжется с вами <br class="visible576" />
        любым удобным способом
      </p>

      <form @submit.prevent="sendHandler" class="contact_form" ref="contactForm">
        <div class="contact_us__fields modal__fields">
          <input
            class="inp_field inp_field__forename"
            type="text"
            placeholder="Ваше имя"
            v-model.trim="fields.username"
            :class="{ invalid: v$.username.$error }"
          />

          <input
            class="inp_field inp_field__email"
            type="email"
            placeholder="Email"
            v-model.trim="fields.email"
            :class="{ invalid: v$.email.$error }"
          />

          <input
            class="inp_field inp_field__tel"
            type="tel"
            placeholder="Номер телефона"
            v-model="fields.phone"
            v-maska="'+7 (###) ###-##-##'"
            :class="{ invalid: v$.phone.$error }"
          />
        </div>

        <div class="contact_us__connection modal__fields">
          <div class="description contact_us__description">Выберите удобный способ связи</div>

          <div class="contact_us__connection_variants">
            <label class="label_radio">
              <input class="inp_radio" checked type="radio" value="Звонок" v-model="fields.svyaz" />
              <span class="title_radio">Звонок</span>
            </label>

            <label class="label_radio">
              <input class="inp_radio" type="radio" value="telegram" v-model="fields.svyaz" />
              <span class="title_radio">telegram</span>
            </label>

            <label class="label_radio">
              <input class="inp_radio" type="radio" value="whats app" v-model="fields.svyaz" />
              <span class="title_radio">whats app</span>
            </label>
          </div>
        </div>

        <UiButton
          type="submit"
          title="Отправить"
          class="contact_us__submit"
          v-model="fields.svyaz"
        />

        <div class="contact_us__copy">
          Нажимая кнопку “Отправить” вы соглашаетесь <br />
          с
          <NuxtLink to="/privacy">политикой конфиденциальности</NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="css" scoped>
.data_company__form .inp_field {
  width: 100%;
}

.contact_us {
  background-color: var(--colorDark4);
  border-radius: 32px;
  backdrop-filter: blur(29.5px);
  -webkit-backdrop-filter: blur(29.5px);
  padding: 40px;

  /*  */
  .dark & {
    background-color: var(--colorDark3);
  }

  .light & {
    background-color: var(--colorDark3);
  }

  @media (max-width: 576px) {
    border-radius: 24px;
    padding: 24px;
    margin-top: 68px;
  }
}

/*  */
.contact_us__h3 {
  color: white;
  font-size: 32px;
  font-weight: 700;
  line-height: 100%;
  margin-bottom: 20px;

  @media (max-width: 576px) {
    font-size: 20px;
    margin-bottom: 10px;
  }
}

.description.contact_us__description {
  font-size: 18px;

  @media (max-width: 576px) {
    font-size: 14px;
  }
}

/*  */
.contact_form {
  border-top: var(--border);
  margin-top: 34px;

  @media (max-width: 576px) {
    margin-top: 24px;
  }
}

/*  */
.modal__fields {
  border-bottom: var(--border);
  padding: 34px 0;

  @media (max-width: 576px) {
    padding: 24px 0;
  }
}

/*  */
.contact_us__fields {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 576px) {
    gap: 18px;
  }
}

.inp_field {
  width: 220px;
  height: 95px;

  font-family: var(--fontFamily-NeueMachina);
  font-size: 18px;
  font-style: normal;
  font-weight: 300;
  line-height: 130%;
  color: var(--colorTextOpacity06);

  background-color: var(--colorDark3);
  border: none;
  border-radius: 28px;
  padding: 36px;

  &.invalid {
    outline: 1px solid red;
  }

  /*  */
  .dark & {
    background-color: var(--colorDark4);
  }

  .light & {
    background-color: var(--colorDark4);
  }

  /*  */
  @media (max-width: 576px) {
    height: 73px;
    font-size: 16px;
    border-radius: 18px;
    padding: 26px;
  }
}

.contact_us__fields .inp_field[type='tel'] {
  width: 100%;
}

.inp_field:not(:invalid):focus {
  outline: 2px solid var(--accentColor);
}

/*  */
.contact_us__connection_variants {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
  padding-top: 24px;

  @media (max-width: 576px) {
    gap: 12px;
  }
}

.label_radio {
  flex-shrink: 0;
  font-size: 17px;
  font-weight: 300;
  line-height: 130%;
  text-align: center;
  color: var(--colorTextOpacity06);
  background-color: var(--colorDark3);
  backdrop-filter: blur(29.5px);
  -webkit-backdrop-filter: blur(29.5px);
  border-radius: 47.5px;
  padding: 12px 26px;
  /* cursor: pointer; */
  outline: 2px solid transparent;
  transition: color 0.3s, outline 0.3s;

  .dark & {
    background-color: var(--colorDark4);
  }

  .light & {
    background-color: var(--colorDark4);
  }

  @media (max-width: 576px) {
    font-size: 14px;
  }
}

.inp_radio {
  display: none;
}

.label_radio:has(.inp_radio:checked) {
  color: white;
  outline-color: var(--40-b-6-b-7, var(--accentColor));
}

/*  */
.contact_us__submit {
  width: 100%;
  height: 103px;
  border-radius: 28px;
  margin-top: 34px;

  @media (max-width: 576px) {
    height: 80px;
    margin-top: 24px;
  }
}

/*  */
.contact_us__copy {
  color: var(--colorTextOpacity06);
  text-align: center;
  font-size: 14px;
  font-weight: 300;
  line-height: 130%;
  margin-top: 24px;

  > a {
    color: var(--colorTextOpacity06);
    border-bottom: 1px solid transparent;
    transition: border-bottom 0.3s;

    &:hover {
      border-bottom-color: var(--colorTextOpacity06);
    }
  }

  @media (max-width: 576px) {
    font-size: 11px;
    margin-top: 16px;
  }
}
</style>
