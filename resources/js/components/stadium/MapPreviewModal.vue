<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fade-in"
    @click.self="close"
  >
    <div class="relative w-full max-w-3xl bg-white border border-slate-200/80 rounded-[38px] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
      <!-- Header -->
      <div class="p-5 px-6 border-b border-slate-100 bg-[#f4f8fb] flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl bg-sky-100 text-[#38a5e6] flex items-center justify-center">
            <Compass class="w-5 h-5" />
          </div>
          <div>
            <h3 class="text-base font-black text-slate-900">
              {{ isRtl ? 'الخريطة التفاعلية للملاعب الرياضية' : 'Interactive Venues & Radar Map' }}
            </h3>
            <p class="text-xs text-slate-500 font-medium">
              {{ isRtl ? 'موقعك الحالي:' : 'Your Location:' }} <span class="text-[#258ecb] font-bold">{{ userCoords.city }}</span>
            </p>
          </div>
        </div>
        <button
          @click="close"
          class="w-9 h-9 rounded-full bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Radar / Tactical Map View in Soft Clean Aesthetic -->
      <div class="relative flex-1 bg-[#edf4f9] p-6 min-h-[360px] sm:min-h-[420px] overflow-hidden flex items-center justify-center">
        <!-- Radar Circles & Grid -->
        <div class="absolute inset-0 bg-[radial-gradient(#38a5e6_1px,transparent_1px)] [background-size:28px_28px] opacity-20"></div>
        <div class="absolute w-[480px] h-[480px] rounded-full border border-sky-300/40 animate-pulse pointer-events-none"></div>
        <div class="absolute w-[320px] h-[320px] rounded-full border border-sky-300/50 pointer-events-none"></div>
        <div class="absolute w-[160px] h-[160px] rounded-full border border-sky-400/60 pointer-events-none"></div>

        <!-- Center: User Position Pin -->
        <div class="relative z-20 flex flex-col items-center">
          <div class="w-7 h-7 rounded-full bg-[#38a5e6] ring-4 ring-[#38a5e6]/30 flex items-center justify-center shadow-lg shadow-[#38a5e6]/40">
            <div class="w-2.5 h-2.5 bg-white rounded-full"></div>
          </div>
          <span class="mt-1 px-3 py-0.5 rounded-full bg-white border border-slate-200 text-[10px] text-slate-800 font-extrabold shadow-xs">
            {{ isRtl ? 'أنت هنا' : 'You are here' }}
          </span>
        </div>

        <!-- Stadium Pins -->
        <div
          v-for="(stadium, idx) in stadiums"
          :key="stadium.id"
          class="absolute z-30 transition-all transform cursor-pointer group"
          :style="getPinStyle(idx, stadiums.length)"
          @click="highlightedStadium = stadium"
        >
          <div
            :class="[
              'p-2 rounded-2xl border transition-all duration-300 flex items-center gap-2 shadow-md backdrop-blur-md',
              highlightedStadium?.id === stadium.id
                ? 'bg-[#38a5e6] text-white border-white scale-110 shadow-lg shadow-[#38a5e6]/30'
                : 'bg-white text-slate-800 border-slate-200 hover:border-[#38a5e6] hover:scale-105'
            ]"
          >
            <div
              :class="[
                'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold',
                highlightedStadium?.id === stadium.id ? 'bg-white text-[#38a5e6]' : 'bg-sky-50 text-[#38a5e6]'
              ]"
            >
              ⚽
            </div>
            <div class="text-start">
              <div class="text-[11px] font-black truncate max-w-[110px]">
                {{ isRtl ? stadium.nameAr : stadium.nameEn }}
              </div>
              <div class="text-[9px] font-semibold opacity-90">
                <span>{{ calculateDistance(userCoords.lat, userCoords.lng, stadium.lat, stadium.lng) }} كم</span>
                <span>• {{ stadium.pricePerHour }} ريال</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Selected Venue Details Drawer -->
      <div v-if="highlightedStadium" class="p-4 px-6 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <img :src="highlightedStadium.images[0]" class="w-16 h-12 object-cover rounded-2xl shadow-xs" />
          <div>
            <h4 class="text-sm font-black text-slate-900">
              {{ isRtl ? highlightedStadium.nameAr : highlightedStadium.nameEn }}
            </h4>
            <p class="text-xs text-slate-500 font-medium">
              {{ isRtl ? highlightedStadium.cityAr : highlightedStadium.cityEn }} • {{ highlightedStadium.format }}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <a
            :href="highlightedStadium.mapsUrl"
            target="_blank"
            class="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Navigation class="w-3.5 h-3.5 text-[#38a5e6]" />
            <span>{{ isRtl ? 'خرائط Google' : 'Google Maps' }}</span>
          </a>

          <button
            @click="onSelectVenue(highlightedStadium)"
            class="px-5 py-2 rounded-full bg-[#38a5e6] hover:bg-[#2897da] text-white text-xs font-black shadow-md shadow-[#38a5e6]/20 transition-all cursor-pointer"
          >
            {{ t.discovery.viewDetails }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useLocalization } from '../../composables/useLocalization';
import { useGeolocation } from '../../composables/useGeolocation';
import { Compass, X, Navigation } from 'lucide-vue-next';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  stadiums: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['close', 'select-stadium']);

const { t, isRtl } = useLocalization();
const { userCoords, calculateDistance } = useGeolocation();

const highlightedStadium = ref(props.stadiums[0]);

const getPinStyle = (idx, total) => {
  const radius = 100 + (idx % 3) * 50;
  const angle = (idx / total) * 2 * Math.PI - Math.PI / 2;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  return {
    top: `calc(50% + ${y}px - 20px)`,
    left: `calc(50% + ${x}px - 65px)`,
  };
};

const onSelectVenue = (stadium) => {
  emit('select-stadium', stadium);
  close();
};

const close = () => {
  emit('close');
};
</script>
