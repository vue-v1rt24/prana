<script setup lang="ts">
import { gsap } from 'gsap';

defineProps<{
  title: string;
}>();

//
const linkPage = ref<string | null>(null);
const isCopy = ref<boolean>(false);

//
const copyBuffer = () => {
  linkPage.value && navigator.clipboard.writeText(linkPage.value);

  //
  isCopy.value = true;

  //
  gsap.to('.notification_animate', {
    duration: 0.3,
    display: 'flex',
    opacity: 1,
    x: 0,

    onComplete() {
      setTimeout(() => {
        isCopy.value = false;

        gsap.to('.notification_animate', { duration: 0.3, display: 'none', opacity: 0, x: 30 });
      }, 3000);
    },
  });
};

//
onMounted(() => {
  linkPage.value = location.href;
  const shareLinks = document.querySelectorAll('.share_link');

  if (shareLinks) {
    shareLinks.forEach((link, idx) => {
      link.addEventListener('click', (evt) => {
        evt.preventDefault();

        const linkData = encodeURI(link.dataset.link);
        const widthWindow = 655;
        const heightWindow = 435;

        const params = `
    width=${widthWindow},
    height=${heightWindow},
    top=${(screen.height - heightWindow) / 2},
    left=${(screen.width - widthWindow) / 2},
    resizable=yes,
    scrollbars=no,
    status=yes`;

        window.open(linkData, `title${idx}`, params);
      });
    });
  }
});
</script>

<template>
  <div class="soc_modal">
    <div class="soc_modal__title">Поделиться в</div>

    <div class="soc_modal__links">
      <div
        class="share_link__style react"
        :class="isCopy && 'share_copy_active_bx'"
        @click.stop="copyBuffer"
      >
        <svg v-if="!isCopy" width="30px" height="30px" class="share_copy">
          <use xlink:href="/public/img/sprite.svg#check_copy"></use>
        </svg>

        <svg v-else width="24px" height="24px" class="share_copy_active">
          <use xlink:href="/public/img/sprite.svg#check_notification"></use>
        </svg>
      </div>

      <a
        class="share_link share_link__style"
        :data-link="`https://vk.com/share.php?url=${linkPage}&title=${title}`"
        rel="nofollow noopener"
        href="#"
        target="_blank"
        title="ВКонтакте"
      >
        <img src="/public/img/soc/vk.svg" alt="" />
      </a>

      <a
        class="share_link share_link__style"
        :data-link="`https://t.me/share/url?url=${linkPage}&text=${title}`"
        rel="nofollow noopener"
        href="#"
        target="_blank"
        title="Telegram"
      >
        <img src="/public/img/soc/telegram.svg" alt="" />
      </a>

      <a
        class="share_link share_link__style"
        :data-link="`https://api.whatsapp.com/send?text=${linkPage} ${title}`"
        rel="nofollow noopener"
        href="#"
        target="_blank"
        title="WhatsApp"
      >
        <img src="/public/img/soc/whatsapp.svg" alt="" />
      </a>

      <a
        class="share_link share_link__style"
        :data-link="`https://connect.ok.ru/offer?url=${linkPage}&title=${title}`"
        rel="nofollow noopener"
        href="#"
        target="_blank"
        title="Одноклассники"
      >
        <img src="/public/img/soc/ok.svg" alt="" />
      </a>
    </div>

    <!-- Оповещение о копировании ссылки -->
    <NotificationCopy class="notification_animate" />
  </div>
</template>

<style lang="css" scoped>
.soc_modal {
  position: relative;
  width: 100%;
  background-color: white;
  border-radius: 24px;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.5);
  padding: 42px;
  z-index: 3;

  /*  */
  @media (max-width: 576px) {
    border-radius: 18px;
    padding: 24px;
  }
}

/*  */
.soc_modal__title {
  font-weight: 500;
  font-size: 24px;
  line-height: 130%;
  color: var(--colorDark3);
  margin-bottom: 18px;

  /*  */
  @media (max-width: 576px) {
    font-size: 15px;
    margin-bottom: 12px;
  }
}

/*  */
.soc_modal__links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;

  /*  */
  @media (max-width: 576px) {
    gap: 8px;
  }
}

.share_link__style {
  width: 46px;
  height: 46px;
  background-color: var(--accentColor);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;

  /*  */
  @media (max-width: 576px) {
    width: 36px;
    height: 36px;

    & img {
      height: 15px;
    }
  }
}

/*  */
.share_copy {
  color: white;

  /*  */
  @media (max-width: 576px) {
    width: 16px;
    height: 16px;
  }
}

.share_copy_active_bx {
  background-color: var(--colorDark4);
}

.share_copy_active {
  color: white;

  /*  */
  @media (max-width: 576px) {
    width: 16px;
    height: 16px;
  }
}

/*  */
.notification_animate {
  display: none;
  opacity: 0;
  transform: translateX(30px);

  /*  */
  @media (max-width: 576px) {
    bottom: -60px;
  }
}
</style>
