<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl"
    @click.self="close"
  >
    <div class="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
      <!-- Header -->
      <div class="p-5 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
            <Compass class="w-5 h-5" />
          </div>
          <div>
            <h3 class="text-base font-bold text-white">
              {{ isRtl ? 'الخريطة التفاعلية للملاعب الرياضية' : 'Interactive Venues & Radar Map' }}
            </h3>
            <p class="text-xs text-slate-400">
              {{ isRtl ? 'موقعك الحالي:' : 'Your Location:' }} <span class="text-emerald-400 font-semibold">{{ userCoords.city }}</span>
            </p>
          </div>
        </div>
        <button
          @click="close"
          class="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Radar / SVG Tactical Map View -->
      <div class="relative flex-1 bg-slate-950 p-6 min-h-[380px] overflow-hidden flex items-center justify-center">
        <!-- Background Grid & Radar circles -->
        <div class="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-15"></div>
        <div class="absolute w-[500px] h-[500px] rounded-full border border-emerald-500/20 animate-pulse pointer-events-none"></div>
        <div class="absolute w-[320px] h-[320px] rounded-full border border-emerald-500/30 pointer-events-none"></div>
        <div class="absolute w-[160px] h-[160px] rounded-full border border-emerald-500/40 pointer-events-none"></div>

        <!-- Center: User Position Pin -->
        <div class="relative z-20 flex flex-col items-center">
          <div class="w-6 h-6 rounded-full bg-blue-500 ring-4 ring-blue-500/30 flex items-center justify-center shadow-lg shadow-blue-500/50">
            <div class="w-2.5 h-2.5 bg-white rounded-full"></div>
          </div>
          <span class="mt-1 px-2 py-0.5 rounded-md bg-blue-900/80 border border-blue-500/40 text-[10px] text-blue-200 font-bold">
            {{ isRtl ? 'أنت هنا' : 'You are here' }}
          </span>
        </div>

        <!-- Plotted Stadium Pins (Spread organically) -->
        <div
          v-for="(stadium, idx) in stadiums"
          :key="stadium.id"
          class="absolute z-30 transition-all transform cursor-pointer group"
          :style="getPinStyle(idx, stadiums.length)"
          @click="highlightedStadium = stadium"
        >
          <div
            :class="[
              'p-2 rounded-2xl border transition-all duration-300 flex items-center gap-2 shadow-xl backdrop-blur-md',
              highlightedStadium?.id === stadium.id
                ? 'bg-emerald-500 text-slate-950 border-white scale-110 ring-4 ring-emerald-500/40'
                : 'bg-slate-900/90 text-white border-slate-700/80 hover:border-emerald-500 hover:scale-105'
            ]"
          >
            <div class="w-6 h-6 rounded-full bg-emerald-950 flex items-center justify-center text-emerald-400">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
            </div>
            <div class="text-start">
              <div class="text-[11px] font-extrabold truncate max-w-[120px]">
                {{ isRtl ? stadium.nameAr : stadium.nameEn }}
              </div>
              <div class="text-[9px] font-semibold opacity-80 flex items-center gap-1">
                <span>{{ calculateDistance(userCoords.lat, userCoords.lng, stadium.lat, stadium.lng) }} كم</span>
                <span>• {{ stadium.pricePerHour }} ريال</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Selected Venue Details Drawer -->
      <div v-if="highlightedStadium" class="p-4 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <img :src="highlightedStadium.images[0]" class="w-16 h-12 object-cover rounded-xl" />
          <div>
            <h4 class="text-sm font-bold text-white">
              {{ isRtl ? highlightedStadium.nameAr : highlightedStadium.nameEn }}
            </h4>
            <p class="text-xs text-slate-400">
              {{ isRtl ? highlightedStadium.cityAr : highlightedStadium.cityEn }} • {{ highlightedStadium.format }}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <a
            :href="highlightedStadium.mapsUrl"
            target="_blank"
            class="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5"
          >
            <Navigation class="w-3.5 h-3.5 text-emerald-400" />
            <span>{{ isRtl ? 'فتح في خرائط Google' : 'Google Maps Directions' }}</span>
          </a>

          <button
            @click="onSelectVenue(highlightedStadium)"
            class="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-md shadow-emerald-500/30"
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
  // Distribute pins along tactical radar angles
  const radius = 120 + (idx % 3) * 60;
  const angle = (idx / total) * 2 * Math.PI - Math.PI / 2;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  return {
    top: `calc(50% + ${y}px - 20px)`,
    left: `calc(50% + ${x}px - 70px)`,
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
