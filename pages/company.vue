<script setup lang="ts"></script>

<template>
  <div class="page_company">
    <!-- Хлебные крошки -->
    <Breadcrumbs :breadcrumbs="[{ title: 'О компании' }]" />

    <!--  -->
    <div class="about_particles"></div>

    <!-- О компании -->
    <section class="about_sec">
      <div class="container">
        <div class="about_download">
          <div class="about_download__left">
            <div class="about_download__left_title">О компании</div>
            <h1 class="about_download__left_h1">PRANA IT</h1>
          </div>

          <div class="about__download__right">
            <div class="about__download__right_load">
              <img class="about__download__right_load_img" src="/img/team/download.svg" alt="" />
              <a class="about__download__right_load_link" href="#" download>
                Скачать презентацию компании
              </a>
            </div>

            <p class="about__download__right_desc">
              Команда профессионалов в различных <br />
              областях, таких как дизайн, веб-разработка, <br />
              продвижение, motion и фотография
            </p>
          </div>
        </div>

        <!--  -->
        <div class="about_video">
          <a
            class="about_video__link"
            href="https://www.youtube.com/watch?v=z2X2HaTvkl8"
            data-fancybox="team"
          >
            <picture>
              <source srcset="/img/team/poster_360.jpg" media="(max-width: 360px)" />
              <source srcset="/img/team/poster_768.jpg" media="(max-width: 768px)" />
              <img class="about_video__img" src="/img/team/poster_1920.jpg" alt="" />
            </picture>

            <div class="about_video__promo">
              <div class="about_video__promo_billet">
                <span class="about_video__promo_billet_vide">Смотрите промо ролик</span>
                <span class="about_video__promo_billet_duration">Длительность 2 минуты</span>
              </div>

              <button class="about_video__promo_billet_btn">
                <svg class="about_video__promo_billet_btn_play">
                  <use xlink:href="/img/sprite.svg#play"></use>
                </svg>
              </button>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!--  -->
    <section class="about_desc_bx">
      <div class="container">
        <!--  -->
        <div class="about_desc">
          <div class="about_desc_1">
            Имея многолетний опыт работы с самыми разными клиентами,
            <span>мы не смогли помочь абсолютно всем</span>. Берясь за амбициозные и слишком
            масштабные проекты, мы иногда
            <span>срывали оговоренные сроки и подводили</span> крупнейшие организации и предприятия
          </div>

          <div class="about_desc_2">
            У нас нет особых преимуществ в сравнении с конкурентами, которые обещают Вам
            гарантированный результат
          </div>

          <div class="about_desc_3">
            Однако, мы искренне удивимся, что Вы выберете именно нас и сделаем все возможное,
            <span>чтобы выполнить работу хотя бы на половину</span>
          </div>

          <div class="about_desc_4">
            Наша команда состоит из людей,
            <span>мало понимающих что и зачем они делают:</span> front- и beckend-разработчиков,
            копирайтеров, дизайнеров, фотографов и специалистов по продвижению в Интернете.
          </div>

          <div class="about_desc_4">
            Вы можете рассчитывать на нашу экспертность в вопросах, абсолютно не связанных с вашей
            идеей. Мы не просто, вероятнее всего,
            <span>
              не выполним свою работу, но и сможем дать ненужные и бесполезные рекомендации
            </span>
            для воплощения ваших бизнес-концепций.
          </div>
        </div>

        <!--  -->
        <div class="not_joke">
          <div class="not_joke__title">
            Отбросив шутки, вы сможете убедится в нашей экспертности только увидев
            <a class="not_joke__link" href="portfolio.html">
              <span>наши работы</span>

              <svg viewBox="0 0 34 34" fill="transparent">
                <circle cx="17" cy="17" r="15.8913" stroke="#40B6B7" stroke-width="2.21741" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M21.9988 16.1661L17.0403 11.2076L18.3476 9.90035L25.5377 17.0905L18.0208 24.6074L16.7135 23.3001L21.9988 18.0149L8.54291 18.0149L8.54291 16.1661L21.9988 16.1661Z"
                  fill="#40B6B7"
                />
              </svg>
            </a>
            <br class="hide992" />
            и
            <a class="not_joke__link" href="reviews.html">
              <span>отзывы клиентов</span>
              <svg viewBox="0 0 34 34" fill="transparent">
                <circle cx="17" cy="17" r="15.8913" stroke="#40B6B7" stroke-width="2.21741" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M21.9988 16.1661L17.0403 11.2076L18.3476 9.90035L25.5377 17.0905L18.0208 24.6074L16.7135 23.3001L21.9988 18.0149L8.54291 18.0149L8.54291 16.1661L21.9988 16.1661Z"
                  fill="#40B6B7"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Люди - наша гордость -->
    <section class="people_sec">
      <div class="container">
        <!-- <h2 class="title_52">Люди - наша гордость</h2> -->

        <div class="swiper swiper_people">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="people_item">
                <div class="people_item__img"></div>
                <div class="people_item__name">Александр Стопчев</div>
                <div class="people_item__post">Генеральный директор</div>
              </div>
            </div>

            <div class="swiper-slide">
              <div class="people_item">
                <div class="people_item__img"></div>
                <div class="people_item__name">Александр Гуминский</div>
                <div class="people_item__post">Арт-директор</div>
              </div>
            </div>

            <div class="swiper-slide">
              <div class="people_item">
                <div class="people_item__img"></div>
                <div class="people_item__name">Владислав Белецкий</div>
                <div class="people_item__post">Руководитель отдела разработки</div>
              </div>
            </div>

            <div class="swiper-slide">
              <div class="people_item">
                <div class="people_item__img"></div>
                <div class="people_item__name">Анастасия Верёвкина</div>
                <div class="people_item__post">Графический дизайнер</div>
              </div>
            </div>

            <div class="swiper-slide">
              <div class="people_item">
                <div class="people_item__img"></div>
                <div class="people_item__name">Роман Иванов</div>
                <div class="people_item__post">Разработчик</div>
              </div>
            </div>

            <div class="swiper-slide">
              <div class="people_item">
                <div class="people_item__img"></div>
                <div class="people_item__name">Александра Иванова</div>
                <div class="people_item__post">Менеджмент</div>
              </div>
            </div>

            <div class="swiper-slide">
              <div class="people_item">
                <div class="people_item__img"></div>
                <div class="people_item__name">Анатолий Дейкун</div>
                <div class="people_item__post">Разработчик</div>
              </div>
            </div>

            <div class="swiper-slide">
              <div class="people_item">
                <div class="people_item__img"></div>
                <div class="people_item__name">Семён Иванов</div>
                <div class="people_item__post">Веб-дизайнер</div>
              </div>
            </div>

            <div class="swiper-slide">
              <div class="people_item">
                <div class="people_item__img"></div>
                <div class="people_item__name">Никита Найденов</div>
                <div class="people_item__post">Веб-дизайнер</div>
              </div>
            </div>

            <div class="swiper-slide">
              <div class="people_item">
                <div class="people_item__img"></div>
                <div class="people_item__name">Серафима Гордей</div>
                <div class="people_item__post">Фотограф</div>
              </div>
            </div>

            <div class="swiper-slide">
              <div class="people_item">
                <div class="people_item__img"></div>
                <div class="people_item__name">Владислав Воробьёв</div>
                <div class="people_item__post">Видео-оператор</div>
              </div>
            </div>

            <div class="swiper-slide">
              <div class="people_item">
                <div class="people_item__img"></div>
                <div class="people_item__name">Ещё кто нибудь...</div>
                <div class="people_item__post">Кто то - олог</div>
              </div>
            </div>
          </div>

          <div class="swiper-scrollbar"></div>
        </div>
      </div>
    </section>

    <!-- Блог -->
    <section class="team_page blog_bx blog_blue">
      <div class="container">
        <h2 class="title_52">
          Как проходят наши <br />
          мероприятия
        </h2>
      </div>

      <!-- Галерея -->
      <div class="swiper swiper_article_full swiper__dark">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="works__item">
              <div class="works__img">
                <a href="article.html">
                  <!-- <img src="img/blog/blog_1.jpg" alt="" /> -->
                </a>
              </div>

              <div class="works__text">
                <a href="article.html" class="works__title">Как мы путешествовали по горам</a>

                <p class="works__desc">
                  Мы, как коллектив, очень ценим нашу сплоченность и всегда открыты для новых
                  впечатлений
                </p>

                <div class="works__tags">
                  <span class="works__tag">
                    <a class="works__tag_link" href="#">
                      <span class="works__tag_hash">#</span>
                      <span>Событие</span>
                    </a>

                    <span class="works__date">15.9.2023</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="swiper-slide">
            <div class="works__item">
              <div class="works__img">
                <a href="#">
                  <!-- <img src="img/blog/blog_2.jpg" alt="" /> -->
                </a>
              </div>

              <div class="works__text">
                <a href="#" class="works__title">Главный инструмент для малого</a>

                <p class="works__desc">
                  Мы, как коллектив, очень ценим нашу сплоченность и всегда открыты для новых
                  впечатлений
                </p>

                <div class="works__tags">
                  <span class="works__tag">
                    <a class="works__tag_link" href="#">
                      <span class="works__tag_hash">#</span>
                      <span>Статья</span>
                    </a>

                    <span class="works__date">15.9.2023</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="swiper-slide">
            <div class="works__item">
              <div class="works__img">
                <a href="#">
                  <!-- <img src="img/blog/blog_3.jpg" alt="" /> -->
                </a>
              </div>

              <div class="works__text">
                <a href="#" class="works__title">
                  Команда разработчиков PRANA IT посетила крупнейшее мероприятие по it технология
                </a>

                <p class="works__desc">
                  Мы, как коллектив, очень ценим нашу сплоченность и всегда открыты для новых
                  впечатлений, поэтому часто устраиваем совместные поездки.
                </p>

                <div class="works__tags">
                  <span class="works__tag">
                    <a class="works__tag_link" href="#">
                      <span class="works__tag_hash">#</span>
                      <span>Событие</span>
                    </a>

                    <span class="works__date">15.9.2023</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="swiper-slide">
            <div class="works__item">
              <div class="works__img">
                <a href="#">
                  <!-- <img src="img/blog/blog_4.jpg" alt="" /> -->
                </a>
              </div>

              <div class="works__text">
                <a href="#" class="works__title">Отзыв от компании СтройСфера</a>

                <p class="works__desc">
                  Мы, как коллектив, очень ценим нашу сплоченность и всегда открыты
                </p>

                <div class="works__tags">
                  <span class="works__tag">
                    <a class="works__tag_link" href="#">
                      <span class="works__tag_hash">#</span>
                      <span>Видео</span>
                    </a>

                    <span class="works__date">15.9.2023</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="swiper-slide">
            <div class="works__item">
              <div class="works__img">
                <a href="#">
                  <!-- <img src="img/blog/blog_2.jpg" alt="" /> -->
                </a>
              </div>

              <div class="works__text">
                <a href="#" class="works__title">Главный инструмент для малого</a>

                <p class="works__desc">
                  Мы, как коллектив, очень ценим нашу сплоченность и всегда открыты для новых
                  впечатлений
                </p>

                <div class="works__tags">
                  <span class="works__tag">
                    <a class="works__tag_link" href="#">
                      <span class="works__tag_hash">#</span>
                      <span>Статья</span>
                    </a>

                    <span class="works__date">15.9.2023</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="swiper-slide">
            <div class="works__item">
              <div class="works__img">
                <a href="#">
                  <!-- <img src="img/blog/blog_4.jpg" alt="" /> -->
                </a>
              </div>

              <div class="works__text">
                <a href="#" class="works__title">Отзыв от компании СтройСфера</a>

                <p class="works__desc">
                  Мы, как коллектив, очень ценим нашу сплоченность и всегда открыты
                </p>

                <div class="works__tags">
                  <span class="works__tag">
                    <a class="works__tag_link" href="#">
                      <span class="works__tag_hash">#</span>
                      <span>Статья</span>
                    </a>

                    <span class="works__date">15.9.2023</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="swiper-scrollbar"></div>
      </div>
    </section>
  </div>
</template>

<style lang="css" scoped></style>
