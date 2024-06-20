<script setup lang="ts"></script>

<template>
  <div class="data_company__form">
    <div class="contact_us">
      <div class="contact_us__h3">Свяжитесь с нами</div>

      <p class="description contact_us__description">
        Оставьте заявку и команда <br class="visible576" />
        PRANA IT <br class="hide576" />
        свяжется с вами <br class="visible576" />
        любым удобным способом
      </p>

      <form class="contact_form">
        <div class="contact_us__fields modal__fields">
          <input
            class="inp_field inp_field__forename"
            type="text"
            name="forename"
            placeholder="Ваше имя"
          />

          <input class="inp_field inp_field__email" type="email" name="email" placeholder="Email" />

          <input
            class="inp_field inp_field__tel"
            type="tel"
            name="tel"
            placeholder="Номер телефона"
          />
        </div>

        <div class="contact_us__connection modal__fields">
          <div class="description contact_us__description">Выберите удобный способ связи</div>

          <div class="contact_us__connection_variants">
            <label class="label_radio">
              <input class="inp_radio" checked type="radio" name="communication" value="Звонок" />
              <span class="title_radio">Звонок</span>
            </label>

            <label class="label_radio">
              <input class="inp_radio" type="radio" name="communication" value="telegram" />
              <span class="title_radio">telegram</span>
            </label>

            <label class="label_radio">
              <input class="inp_radio" type="radio" name="communication" value="whats app" />
              <span class="title_radio">whats app</span>
            </label>
          </div>
        </div>

        <UiButton type="submit" title="Отправить" class="contact_us__submit" />

        <div class="contact_us__copy">
          Нажимая кнопку “Отправить” вы соглашаетесь <br />
          с политикой конфиденциальности
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

  @media (max-width: 576px) {
    border-radius: 24px;
    padding: 24px;
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

  @media (max-width: 576px) {
    height: 73px;
    font-size: 16px;
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

  @media (max-width: 576px) {
    font-size: 11px;
    margin-top: 16px;
  }
}
</style>
