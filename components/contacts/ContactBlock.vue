<script setup lang="ts">
import type { TypeContactFormat } from '~/types/contacts.types';
import '~/assets/css/vacancies-contacts.css';

defineProps<{
  contacts: TypeContactFormat;
}>();
</script>

<template>
  <div class="job contacts">
    <div class="title_h4 job__title_h4">Контакты</div>

    <div class="job__lists">
      <div class="job__lists_item">
        <div class="job__lists__desc">Номера</div>
        <a class="title_20_500_130" :href="`tel:${contacts.nomerTelefona}`">
          {{ contacts.nomerTelefona }}
        </a>
        <a class="title_20_500_130" :href="`tel:${contacts.nomerTelefonaMenedzhment}`">
          {{ contacts.nomerTelefonaMenedzhment }}
        </a>
        <a class="title_20_500_130" :href="`tel:${contacts.otdelRazrabotki}`">
          {{ contacts.otdelRazrabotki }}
        </a>
      </div>

      <div class="job__lists_item">
        <div class="job__lists__desc">Email</div>
        <a class="title_20_500_130" :href="`mailto:${contacts.settingPochta}`">
          {{ contacts.settingPochta }}
        </a>

        <!-- Соцсети -->
        <ContactsSocial
          :vk="contacts.vkLink"
          :telegram="contacts.telegramLink"
          :whatsapp="contacts.whatsappLink"
          :youtube="contacts.yutub"
        />
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.contacts {
  padding-bottom: 0;
}

.contacts .job__lists__desc {
  margin-bottom: 10px;
}

.contacts .job__lists_item {
  margin-bottom: 0;
}

.contacts .job__lists {
  display: flex;
  column-gap: 125px;

  @media (max-width: 1800px) {
    flex-direction: column;
    row-gap: 26px;
  }

  @media (max-width: 576px) {
    row-gap: 24px;
  }
}
</style>
