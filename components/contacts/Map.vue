<script setup lang="ts">
import { shallowRef } from 'vue';
import type { YMap } from '@yandex/ymaps3-types';
import {
  YandexMap,
  YandexMapDefaultSchemeLayer,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultMarker,
} from 'vue-yandex-maps';

import type { LngLat } from '@yandex/ymaps3-types';

//
const map = shallowRef<null | YMap>(null);
const address = ref<HTMLDivElement | null>(null);

// Для карты
let zoom = ref(17);
const center = ref<LngLat>([41.91638975529478, 45.000137210410344]);

//
onMounted(() => {
  // Возврат к исходному положению карты
  address.value?.addEventListener('click', async () => {
    if (!map.value) return;

    if (map.value.zoom !== 17) {
      zoom.value = map.value.zoom;
      setTimeout(() => (zoom.value = 17));
    }

    if (map.value.center[0] !== center.value[0] || map.value.center[1] !== center.value[1]) {
      center.value = [...map.value.center];
      setTimeout(() => (center.value = [41.91638975529478, 45.000137210410344]));
    }
  });
});
</script>

<template>
  <div class="map_wrap">
    <div id="map" class="map">
      <yandex-map
        v-model="map"
        :settings="{
          location: {
            center,
            zoom,
          },
          theme: 'dark',
        }"
        width="100%"
      >
        <yandex-map-default-scheme-layer />
        <!-- Метка -->
        <yandex-map-default-features-layer />
        <yandex-map-default-marker
          :settings="{
            coordinates: [41.91630928902433, 45.00018288226451] as LngLat,
            color: '#40b6b7',
          }"
        />
        <!-- /Метка -->
      </yandex-map>
    </div>

    <div class="data_company__address" ref="address">
      <div class="data_company__address_title">Мы находимся по адресу</div>
      <div class="data_company__address_loc">Ставрополь, 50 лет ВЛКСМ 113</div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.map_wrap {
  position: relative;
  margin-bottom: 40px;
}

.map {
  height: 460px;
  border-radius: 42px;
  overflow: hidden;

  @media (max-width: 576px) {
    height: 260px;
    border-radius: 24px;
  }
}

.map ymaps {
  cursor: none !important;
}

/* Цвет карты */
.ymaps-2-1-79-ground-pane {
  filter: grayscale(1);
}

/*  */
.data_company__address {
  position: absolute;
  bottom: 40px;
  left: 40px;
  width: 351px;
  height: 92px;
  color: white;
  line-height: 100%;
  border-radius: 28px;
  background-color: rgba(28, 30, 42, 0.9);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  padding: 24px;

  @media (max-width: 576px) {
    bottom: -45px;
    left: 50%;
    translate: -50%;
    width: 278px;
    height: 71px;
    text-align: center;
    border-radius: 18px;
    padding: 18px;
  }
}

.data_company__address_title {
  font-size: 16px;
  font-weight: 300;
  color: var(--colorTextOpacity06);
  margin-bottom: 10px;

  @media (max-width: 576px) {
    font-size: 13px;
    margin-bottom: 8px;
  }
}

.data_company__address_loc {
  font-size: 18px;
  font-weight: 500;

  @media (max-width: 576px) {
    font-size: 14px;
  }
}
</style>
