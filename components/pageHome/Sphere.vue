<script setup lang="ts">
import { gsap } from 'gsap';
import InertiaPlugin from 'gsap/InertiaPlugin';
import { Draggable } from 'gsap/Draggable';
gsap.registerPlugin(InertiaPlugin, Draggable);

//
defineProps<{
  sphere: {
    nazvanie: string;
  }[];
}>();

//
onMounted(() => {
  let idx = 10;
  const cursor = document.querySelector<HTMLDivElement>('.cursor')!;
  const btnDie = gsap.utils.toArray<HTMLButtonElement>('.btn_die');

  if (btnDie) {
    btnDie.forEach((btn) => {
      Draggable.create(btn, {
        cursor: 'none',
        activeCursor: 'none',
        bounds: '.sphere__items',
        edgeResistance: 0.9,
        inertia: true,
        onDragStart(evt) {
          evt.target.style.zIndex = idx++;
        },
        onDrag(evt) {
          cursor.style.top = evt.pageY + 'px';
          cursor.style.left = evt.pageX + 'px';
        },
      });
    });
  }
});
</script>

<template>
  <section class="sphere_bx">
    <div class="sphere">
      <div class="container">
        <div class="sphere__items">
          <h2 class="decisions__title">
            Для <span>любой</span> <br />
            сферы бизнеса
          </h2>
          <button
            v-for="(item, idx) in sphere"
            :key="item.nazvanie"
            type="button"
            :class="['btn_die', `btn_die_${idx + 1}`]"
          >
            {{ item.nazvanie }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="css" scoped>
.sphere_bx {
  position: relative;
  height: 1098px;
  background-color: var(--colorDark3);
  border-radius: 72px 72px 0px 0px;
}

.sphere_bx::before,
.sphere_bx::after {
  content: '';
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100px;
  height: 100px;
  background-color: white;
  z-index: -1;
}

.sphere_bx::after {
  left: auto;
  right: 0;
}

/*  */
.sphere__items {
  position: absolute;
  top: 180px;
  left: 50%;
  transform: translateX(-50%);
  width: 1760px;
  height: 664px;
}

.sphere__items::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1151px;
  height: 1147px;
  background-image: url(/img/ellipse-lighter.svg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center 100px;
  z-index: -1;
}

/*  */
.decisions__title {
  position: absolute;
  bottom: 157px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  font-family: var(--fontFamily-Unbounded);
  font-size: 120px;
  letter-spacing: 2.4px;
  font-weight: 700;
  line-height: 110%;
  text-align: center;
  color: var(--colorTextWhite);
}

.decisions__title span {
  background-image: var(--linearGradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/*  */
.btn_die {
  position: relative;
  font-family: var(--fontFamily-NeueMachina);
  font-size: 32px;
  font-weight: 500;
  line-height: 100%;
  white-space: nowrap;
  color: var(--colorTextOpacity06);
  background-color: rgba(8, 19, 37, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 32px;
  border: none;
  padding: 42px 52px;
}
/*  */

/*  */
.btn_die_1 {
  position: absolute;
  top: 0;
  left: 25vw;
}

.btn_die_2 {
  position: absolute;
  top: 30px;
  right: 17vw;
}

.btn_die_3 {
  position: absolute;
  top: 161px;
  right: 25.4vw;
}

.btn_die_4 {
  position: absolute;
  top: 322px;
  right: 8.4vw;
}

.btn_die_5 {
  position: absolute;
  top: 546px;
  right: 12.2vw;
}

.btn_die_6 {
  position: absolute;
  top: 481px;
  left: 29.6vw;
}

.btn_die_7 {
  position: absolute;
  top: 546px;
  left: 9.3vw;
}

.btn_die_8 {
  position: absolute;
  top: 322px;
  left: 0;
}

.btn_die_9 {
  position: absolute;
  top: 172px;
  left: 15.3vw;
}

/* ==================== Медиа запросы */
@media (max-width: 1900px) {
  .sphere__items {
    width: 92vw;
  }
}

@media (max-width: 1299px) {
  .sphere__items::before {
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    background-position: center;
  }

  .btn_die {
    font-size: 20px;
    border-radius: 24px;
    padding: 24px 28px;
  }
}

@media (max-width: 1199px) {
  .decisions__title {
    font-size: 62px;
    letter-spacing: 1.24px;
  }
}

@media (max-width: 992px) {
  .sphere_bx {
    height: 778px;
  }

  .sphere__items {
    width: 96vw;
    height: 507px;
  }

  .sphere__items::before {
    height: 800px;
    background-size: 100% 100%;
  }

  .decisions__title {
    bottom: 68px;
    width: 443px;
    font-size: 80px;
    letter-spacing: 1.6px;
  }

  .btn_die_1 {
    top: 67px;
    left: 20.2vw;
  }

  .btn_die_2 {
    top: 249px;
    right: 10vw;
  }

  .btn_die_3 {
    top: 0;
    right: 23vw;
  }

  .btn_die_4 {
    top: 300px;
    right: 24vw;
  }

  .btn_die_5 {
    top: 86%;
    right: auto;
    left: 5vw;
  }

  .btn_die_6 {
    top: 154px;
    left: 1.4vw;
  }

  .btn_die_7 {
    top: 409px;
    left: auto;
    right: 9vw;
  }

  .btn_die_8 {
    top: 118px;
    left: auto;
    right: 6.6vw;
  }

  .btn_die_9 {
    top: 236px;
    left: 18.3vw;
  }
}

@media (max-width: 768px) {
  .sphere__items {
    top: 118px;
  }
}

@media (max-width: 576px) {
  .sphere_bx {
    height: 400px;
    border-radius: 32px 32px 0px 0px;
  }

  .sphere {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .sphere__items::before {
    display: none;
  }

  .sphere__items {
    top: 51px;
    width: 123vw;
    height: 327px;
  }

  .decisions__title {
    bottom: 36px;
    width: 314px;
    font-size: 48px;
    letter-spacing: 0.96px;
  }

  .btn_die {
    font-size: 16px;
    border-radius: 16px;
    padding: 18px 24px;
  }

  .btn_die_1 {
    top: 167px;
    left: auto;
    right: 14vw;
  }

  .btn_die_2 {
    top: 200px;
    right: auto;
    left: 9vw;
  }

  .btn_die_3 {
    top: 43px;
    right: auto;
    left: 14vw;
  }

  .btn_die_4 {
    top: 0;
    right: 15vw;
  }

  .btn_die_5 {
    top: 75%;
    right: 9.3vw;
    left: auto;
  }

  .btn_die_6 {
    top: 271px;
    left: auto;
    right: 17vw;
  }

  .btn_die_7 {
    top: 120px;
    left: 0;
    right: auto;
  }

  .btn_die_8 {
    top: 100px;
    right: 0;
  }

  .btn_die_9 {
    top: 274px;
    left: 17vw;
  }
}
</style>
