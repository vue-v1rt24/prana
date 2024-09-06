<script setup lang="ts">
import { gsap } from 'gsap';

defineProps<{
  title: string;
}>();

//
const linkPage = ref<string | null>(null);
const socModal = ref<HTMLDivElement | null>(null);
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
  <div class="article_full_save">
    <svg width="21px" height="20px" class="share react">
      <use xlink:href="/public/img/sprite.svg#share2"></use>
    </svg>

    <span class="react share_title">Поделиться</span>

    <!--  -->
    <div class="soc_modal" ref="socModal">
      <div class="soc_modal__title">Поделиться в</div>

      <div class="soc_modal__links">
        <div
          class="share_link__style react"
          :class="isCopy && 'share_copy_active_bx'"
          @click="copyBuffer"
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
  </div>
</template>

<style lang="css" scoped>
.soc_modal {
  position: relative;
  opacity: 0;
  visibility: hidden;
  position: absolute;
  top: 80px;
  left: 0;
  width: 362px;
  background-color: white;
  border-radius: 24px;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.5);
  padding: 42px;
  z-index: 3;
  transition: 0.5s;

  /*  */
  @media (max-width: 1500px) {
    left: -224px;
  }

  @media (max-width: 576px) {
    top: 50px;
    left: -60px;
    width: 172px;
    border-radius: 18px;
    padding: 24px;
  }
}

.soc_modal::before {
  content: '';
  position: absolute;
  top: -30px;
  left: 0;
  width: 100%;
  height: 60px;
}

@media (max-width: 576px) {
  .soc_modal::before {
    display: none;
  }
}

.share {
  stroke: #a9aeb9;
  transition: stroke 0.3s;
}

.article_full_save:hover .share {
  stroke: var(--accentColor);
}

.share_title {
  transition: color 0.3s;
}

.article_full_save:hover .share_title {
  color: var(--colorDark3);
}

.share_title:hover + .soc_modal {
  opacity: 1;
  visibility: visible;
  top: 50px;

  /*  */
  @media (max-width: 576px) {
    top: 30px;
  }
}

.soc_modal:hover {
  opacity: 1;
  visibility: visible;
  top: 50px;

  /*  */
  @media (max-width: 576px) {
    top: 30px;
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
