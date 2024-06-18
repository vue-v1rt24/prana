<script setup lang="ts"></script>

<template>
  <div class="page_portfolio111">
    <!-- Хлебные крошки -->
    <div class="breadcrumbs_bx">
      <div class="container">
        <nav class="breadcrumbs">
          <a href="/">Главная</a>
          <span class="breadcrumbs_delimiter"></span>
          Портфолио
        </nav>
      </div>
    </div>

    <!--  -->
    <div class="portfolio_particles"></div>

    <!-- Кнопки -->
    <section class="works_fiter">
      <div class="container">
        <h2 class="title_52">Портфолио</h2>

        <div class="works_tabs stop_pointer">
          <button type="button" class="works_tabs__btn control active" data-filter="all">
            <span class="works_tabs__btn_title">Все</span>
            <span class="works_tabs__btn_count">126</span>
          </button>

          <button type="button" class="works_tabs__btn control" data-filter=".development_filter">
            <span class="works_tabs__btn_title">Разработка сайтов</span>
            <span class="works_tabs__btn_count">25</span>
          </button>

          <button type="button" class="works_tabs__btn control" data-filter=".branding_filter">
            <span class="works_tabs__btn_title">Брендинг</span>
            <span class="works_tabs__btn_count">43</span>
          </button>

          <button type="button" class="works_tabs__btn control" data-filter=".photo_filter">
            <span class="works_tabs__btn_title">Фото</span>
            <span class="works_tabs__btn_count">72</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Портфолио -->
    <section class="works_bx works_modal_js filter_js skeleton_js stop_pointer">
      <div class="works">
        <!--  -->
        <div class="works__item mix development_filter direct">
          <div class="works__img skeleton">
            <!-- <img src="img/works/1.jpg" alt="" /> -->

            <!-- По наведению -->
            <div class="works__item_more_detailed_bx">
              <a class="works__item_more_detailed__link" href="#">
                <div class="works__item_more_detailed__title">Приложение</div>

                <p class="works__item_more_detailed__desc">
                  В данном проекте мы вообще красавчики, по полной забахали дизайна для компании
                  стройстрой: сделали пи#д@тый сайт, отсняли дома, смоделировали всю эту конитель
                </p>

                <div class="works__item_more_detailed__preview">
                  <span>Смотреть проект</span>

                  <div class="works__item_more_detailed__preview_svg">
                    <svg width="22px" height="18px" class="straight_arrow">
                      <use xlink:href="/img/sprite.svg#straight_arrow"></use>
                    </svg>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div class="works__text">
            <a href="#" class="works__title skeleton">Приложение</a>

            <div class="works__tags skeleton">
              <span class="works__tag">
                <a class="works__tag_link" href="#">
                  <span class="works__tag_hash">#</span>
                  <span>Разработка приложения</span>
                </a>
              </span>
            </div>
          </div>
        </div>

        <!--  -->
        <div class="works__item mix branding_filter direct">
          <div class="works__img skeleton">
            <!-- <img src="img/works/8.jpg" alt="" /> -->

            <!-- По наведению -->
            <div class="works__item_more_detailed_bx">
              <a class="works__item_more_detailed__link" href="#">
                <div class="works__item_more_detailed__title">dvna.fr</div>

                <p class="works__item_more_detailed__desc">
                  В данном проекте мы вообще красавчики, по полной забахали дизайна для компании
                  стройстрой: сделали пи#д@тый сайт, отсняли дома, смоделировали всю эту конитель
                </p>

                <div class="works__item_more_detailed__preview">
                  <span>Смотреть проект</span>

                  <div class="works__item_more_detailed__preview_svg">
                    <svg width="22px" height="18px" class="straight_arrow">
                      <use xlink:href="/img/sprite.svg#straight_arrow"></use>
                    </svg>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div class="works__text">
            <a href="#" class="works__title skeleton">dvna.fr</a>

            <div class="works__tags skeleton">
              <span class="works__tag">
                <a class="works__tag_link" href="#">
                  <span class="works__tag_hash">#</span>
                  <span>Разработка сайта</span>
                </a>
              </span>

              <span class="works__tag">
                <a class="works__tag_link" href="#">
                  <span class="works__tag_hash">#</span>
                  <span>Фото</span>
                </a>
              </span>
            </div>
          </div>
        </div>

        <!--  -->
        <div class="works__item mix photo_filter direct">
          <div class="works__img skeleton">
            <!-- <img src="img/works/6.jpg" alt="" /> -->

            <!-- По наведению -->
            <div class="works__item_more_detailed_bx">
              <a class="works__item_more_detailed__link" href="#">
                <div class="works__item_more_detailed__title">Премиум парфюм Moiss Dior</div>

                <p class="works__item_more_detailed__desc">
                  В данном проекте мы вообще красавчики, по полной забахали дизайна для компании
                  стройстрой: сделали пи#д@тый сайт, отсняли дома, смоделировали всю эту конитель
                </p>

                <div class="works__item_more_detailed__preview">
                  <span>Смотреть проект</span>

                  <div class="works__item_more_detailed__preview_svg">
                    <svg width="22px" height="18px" class="straight_arrow">
                      <use xlink:href="/img/sprite.svg#straight_arrow"></use>
                    </svg>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div class="works__text">
            <a href="#" class="works__title skeleton">Премиум парфюм Moiss Dior</a>

            <div class="works__tags skeleton">
              <span class="works__tag">
                <a class="works__tag_link" href="#">
                  <span class="works__tag_hash">#</span>
                  <span>Фото</span>
                </a>
              </span>

              <span class="works__tag">
                <a class="works__tag_link" href="#">
                  <span class="works__tag_hash">#</span>
                  <span>3D Визуализация</span>
                </a>
              </span>
            </div>
          </div>
        </div>

        <!--  -->
      </div>
    </section>
  </div>
</template>

<style lang="css" scoped>
.page_portfolio {
  background-color: transparent;
  background-image: linear-gradient(var(--bg) 1000px, white 1000px);
}

.portfolio_particles {
  position: absolute;
  top: 0;
  right: 0;
  width: 1012px;
  height: 633px;
  background-image: url(/img/portfolio/decor_portfolio_1.svg);
  background-repeat: no-repeat;
  overflow: hidden;
  z-index: -1;
}

/*  */
.page_portfolio .works_bx::before {
  bottom: -230px;
}

.page_portfolio .title_52 {
  font-size: 62px;
  letter-spacing: 0.02em;
  text-align: left;
  margin-bottom: 82px;
}

/*  */
.works_tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 62px;
}

.works_tabs::-webkit-scrollbar {
  height: 0;
}

.works_tabs__btn {
  height: 71px;
  font-family: var(--fontFamily-RoadRadio);
  font-size: 18px;
  color: white;
  background-color: #060e1b;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 8px;
  border: none;
  border-radius: 18px;
  padding: 0 34px;
}

.works_tabs__btn.active {
  background-color: var(--accentColor2);
}

.works_tabs__btn_count {
  color: rgba(255, 255, 255, 0.25);
}

.works_tabs__btn.active .works_tabs__btn_count {
  color: var(--colorTextOpacity06);
}

/*  */
.discuss_bx {
  background-color: white;
  padding-bottom: 160px;
}

.discuss {
  color: var(--colorDark3);
  background-color: var(--colorBirch);
  background-image: url(../img/portfolio/discuss_particle.png);
  background-repeat: no-repeat;
  background-position: right center;
  border-radius: 42px;
  padding: 100px;
}

.discuss_form {
  max-width: 660px;
}

.discuss__title {
  font-family: var(--fontFamily-RFDewi);
  font-weight: 700;
  font-size: 38px;
  line-height: 120%;
  letter-spacing: 0.02em;
  margin-bottom: 52px;
}

.discuss__fields {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.discuss__fields input,
.discuss__fields textarea {
  width: 48%;
  height: 93px;
  font-family: var(--fontFamily-NeueMachina);
  background-color: white;
  border: none;
  border-radius: 24px;
  padding: 36px;
}

.discuss__fields input::placeholder,
.discuss__fields textarea::placeholder {
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  color: var(--colorGray);
}

.discuss__fields textarea {
  width: 100%;
  resize: none;
}

.discuss__file {
  margin: 42px 0;
}

.discuss__file_title {
  font-weight: 400;
  font-size: 18px;
  line-height: 120%;
  margin-bottom: 24px;
}

/*  */
.discuss__submit {
  display: flex;
  align-items: center;
  gap: 20px 24px;
}

.discuss__file_btn {
  width: 228px;
  height: 42px;
  color: var(--accentColor2);
  background-color: transparent;
  display: flex;
  align-items: center;
  column-gap: 10px;
  border: 2px solid var(--accentColor);
  border-radius: 47px;
  padding: 12px 26px;
}

.discuss__file_load,
.discuss__file_success {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
}

.discuss__file_btn.load .discuss__file_load {
  display: none;
}

.discuss__file_success {
  display: none;
}

.discuss__file_btn.load .discuss__file_success {
  display: flex;
}

.discuss__file_btn_plus {
  font-size: 28px;
}

.discuss_form .blue_btn {
  width: 315px;
  height: 103px;
  flex-shrink: 0;
  margin: 0;
}

.discuss__submit_text {
  font-weight: 300;
  font-size: 14px;
  line-height: 130%;
  color: var(--colorGray);
}

.discuss__submit_text a {
  color: var(--colorGray);
  border-bottom: 1px solid var(--colorGray);
}
</style>
