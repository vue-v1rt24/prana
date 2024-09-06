<script setup lang="ts">
const props = defineProps<{
  label?: string;
  placeholder?: string;
  required?: boolean;
  type: 'text' | 'email' | 'tel' | 'file' | 'checkbox' | 'radio' | 'textarea';
}>();

// const modelValue = defineModel<string | string[] | File>({ default: '' });
const modelValue = defineModel<string | string[] | File | null>({ default: null });

//
const fileInp = ref<HTMLInputElement | null>(null);

const btnTrigger = () => {
  fileInp.value?.click();
};

// Загрузка файла
const loadFile = (event: Event) => {
  const target = event.target as HTMLInputElement;

  if (target.files) {
    modelValue.value = target.files[0];
  }
};
</script>

<template>
  <div>
    <label v-if="type === 'checkbox'" class="field_checkbox">
      <input :type="type" :value="label" v-model="modelValue" class="field_checkbox__inp" />
      <span>{{ label }}</span>
    </label>

    <!--  -->
    <label v-else-if="type === 'radio'" class="field_radio field_checkbox">
      <input
        :type="type"
        :name="type"
        :value="label"
        v-model="modelValue"
        class="field_checkbox__inp"
      />
      <span>{{ label }}</span>
    </label>

    <!--  -->
    <div v-else-if="type === 'textarea'" class="field field_textarea">
      <label class="field__label" :for="label">{{ label }}</label>
      <textarea
        :placeholder="placeholder"
        v-model="modelValue"
        class="field__inp field__inp__textarea"
      ></textarea>
    </div>

    <!--  -->
    <div v-else-if="type === 'file'" class="field_file">
      <input ref="fileInp" class="field_file__inp" :type="type" @change="loadFile" />

      <button @click="btnTrigger" class="field_file__btn" type="button">
        <div v-show="!modelValue">
          <span class="field_file__btn_plus">+</span>
          <span>Прикрепить файл</span>
        </div>

        <div v-show="modelValue">
          <span class="field_file__btn_plus">
            <img src="/img/attach.svg" alt="" />
          </span>
          <span>Файл прикреплён</span>
        </div>
      </button>
    </div>

    <!--  -->
    <div v-else-if="type === 'tel'" class="field field_text">
      <label class="field__label" :for="label">{{ label }}</label>

      <input
        type="tel"
        :id="label"
        :placeholder="placeholder"
        :required="required"
        v-model="modelValue"
        v-maska="'+7 (###) ###-##-##'"
        class="field__inp"
      />
    </div>

    <!--  -->
    <div v-else class="field field_text">
      <label class="field__label" :for="label">{{ label }}</label>

      <input
        :type="type"
        :id="label"
        :placeholder="placeholder"
        :required="required"
        v-model="modelValue"
        class="field__inp"
      />
    </div>
  </div>
</template>

<style lang="css" scoped>
.field__label {
  font-weight: 700;
  font-size: 20px;
  line-height: 130%;
  color: var(--bgColor);
  display: block;
  margin-bottom: 12px;
}

.field__inp {
  max-width: 730px;
  width: 100%;
  height: 87px;
  font-family: var(--fontFamily-NeueMachina);
  font-weight: 300;
  font-size: 18px;
  line-height: 130%;
  color: var(--bgColor);
  background-color: #f2fafa;
  border: none;
  border-radius: 18px;
  padding: 32px;
}

.errorField .field__inp {
  outline: 2px solid #c20000;
}

/*  */
.field_textarea .field__inp {
  height: 174px;
}

.field_textarea .field__inp::placeholder {
  max-width: 563px;
}

/* textarea */
.field__inp__textarea::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.field__inp__textarea::-webkit-scrollbar-thumb {
  background-color: var(--accentColor);
  border: 2px solid #e5ebeb;
  border-radius: 18px;
}

.field__inp__textarea::-webkit-scrollbar-track-piece {
  background-color: #e5ebeb;
  border-radius: 18px;
  margin: 10px 10px 10px 10px;
}

.field__inp__textarea::-webkit-resizer {
  background-color: transparent;
  border: none;
}

.field__inp__textarea::-webkit-scrollbar-corner {
  background-color: transparent;
  border: none;
}

/* checkbox */
.field_checkbox {
  width: fit-content;
  font-weight: 300;
  font-size: 18px;
  line-height: 100%;
  color: #030810;
  display: flex;
  align-items: center;
  column-gap: 14px;
  cursor: pointer;
}

.field_checkbox__inp {
  -webkit-appearance: none;
  appearance: none;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border: 2px solid var(--accentColor);
  border-radius: 6px;
  cursor: pointer;
}

.field_checkbox__inp:checked {
  background-color: var(--accentColor);
  background-image: url(/img/check.svg);
  background-repeat: no-repeat;
  background-position: center center;
}

/* radio */
.field_radio .field_checkbox__inp {
  border-radius: 50%;
}

/* file */
.field_file__inp {
  display: none;
}

.field_file__btn {
  width: 228px;
  height: 42px;
  font-family: var(--fontFamily-NeueMachina);
  font-weight: 500;
  font-size: 17px;
  line-height: 100%;
  color: #43b7b7;
  background-color: white;
  border: 2px solid var(--accentColor);
  border-radius: 47px;

  display: flex;
  justify-content: center;
  align-items: center;
}

.field_file__btn > div {
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
}

.field_file__btn_plus {
  font-size: 26px;
  transform: translateY(-3px);
}

/* ===================================== */
@media (max-width: 576px) {
  .field__label {
    font-size: 16px;
  }

  .field__inp {
    height: 71px;
    font-size: 15px;
    border-radius: 16px;
    padding: 26px;
  }

  .field_textarea .field__inp {
    height: 146px;
  }

  .field_checkbox {
    font-size: 16px;
  }

  .field_file__btn_plus {
    transform: translateY(0);
  }
}
</style>
