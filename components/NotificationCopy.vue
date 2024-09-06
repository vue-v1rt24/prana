<script setup lang="ts"></script>

<template>
  <div class="notification">
    <div class="notification__check">
      <svg>
        <use xlink:href="/public/img/sprite.svg#check_notification"></use>
      </svg>
    </div>

    <span class="notification__title">Ссылка скопирована!</span>
  </div>
</template>

<style lang="css" scoped>
.notification {
  position: absolute;
  bottom: -100px;
  right: 0px;
  width: 300px;
  height: 69px;
  background-color: white;
  box-shadow: 0 0 15px 0 rgba(16, 16, 16, 0.07);
  border-radius: 12px;
  display: flex;
  align-items: center;
  column-gap: 20px;
  padding: 0 12px;
  z-index: 101;

  /*  */
  @media (max-width: 576px) {
    width: 220px;
    height: 46px;
    column-gap: 12px;
    padding: 0 8px;
  }
}

/*  */
.notification__check {
  flex-shrink: 0;
  width: 45px;
  height: 45px;
  background: var(--colorBirch);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;

  /*  */
  @media (max-width: 576px) {
    width: 30px;
    height: 30px;
    border-radius: 6px;
  }
}

.notification__check svg {
  width: 24px;
  height: 24px;
  color: var(--accentColor);

  /*  */
  @media (max-width: 576px) {
    width: 16px;
    height: 16px;
  }
}

/*  */
.notification__title {
  color: var(--colorDark3);

  /*  */
  @media (max-width: 576px) {
    font-size: 14px;
  }
}
</style>
