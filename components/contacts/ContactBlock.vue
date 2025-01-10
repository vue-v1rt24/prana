<script setup lang="ts">
import { copyBuffer } from '~/utils/copy-email.utils';
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
        <div class="job__lists_item_cont">
          <div class="job__lists__desc">Горячая линия</div>
          <a class="title_20_500_130" :href="`tel:${contacts.nomerTelefona}`">
            {{ contacts.nomerTelefona }}
          </a>
        </div>

        <div class="job__lists_item_cont">
          <div class="job__lists__desc">Клиентская поддержка</div>
          <a class="title_20_500_130" :href="`tel:${contacts.nomerTelefonaMenedzhment}`">
            {{ contacts.nomerTelefonaMenedzhment }}
          </a>
        </div>

        <div class="job__lists_item_cont">
          <div class="job__lists__desc">Отдел разработки</div>
          <a
            v-if="contacts.otdelRazrabotki"
            class="title_20_500_130"
            :href="`tel:${contacts.otdelRazrabotki}`"
          >
            {{ contacts.otdelRazrabotki }}
          </a>

          <a
            v-if="contacts.otdelRazrabotkiVtorojNomer"
            class="title_20_500_130"
            :href="`tel:${contacts.otdelRazrabotkiVtorojNomer}`"
          >
            {{ contacts.otdelRazrabotkiVtorojNomer }}
          </a>
        </div>
      </div>

      <div class="job__lists_item">
        <div class="job__lists__desc">Email</div>

        <a class="title_20_500_130" href="#" @click.prevent="copyBuffer">
          {{ contacts.settingPochta }}
        </a>

        <!-- Соцсети -->
        <ContactsSocial
          :vk="contacts.vkLink"
          :telegram="contacts.telegramLink"
          :whatsapp="contacts.whatsappLink"
          :youtube="contacts.yutub"
          :behans="contacts.behansLink"
          :rutube="contacts.rutubLink"
          :workspace="contacts.workspaceLink"
          :dprofile="contacts.dprofileLink"
        />
      </div>
    </div>
  </div>

  <!-- Оповещение о копировании ссылки -->
  <NotificationCopy class="notification_animate" />
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

.job__lists_item_cont:not(:last-child) {
  margin-bottom: 12px;
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

.job__lists_item_cont a {
  white-space: nowrap;
}

/*  */
.notification_animate {
  position: fixed;
  bottom: 160px;
  right: -100%;

  @media (max-width: 576px) {
    bottom: 96px;
  }
}
</style>
