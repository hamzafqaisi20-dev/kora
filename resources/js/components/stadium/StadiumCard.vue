<template>
  <div class="group bg-white rounded-[36px] p-3 sm:p-4 border border-slate-200/80 shadow-[0_10px_30px_rgba(25,50,90,0.06)] hover:shadow-[0_18px_40px_rgba(25,50,90,0.12)] transition-all duration-300 flex flex-col justify-between">
    <!-- Main Stadium Image with Large Rounded Corners & Progress Indicators -->
    <div
      class="relative h-72 sm:h-80 w-full rounded-[30px] overflow-hidden bg-slate-100 cursor-pointer select-none"
      @click="onCardClick"
    >
      <img
        :src="stadium.images[0]"
        :alt="isRtl ? stadium.nameAr : stadium.nameEn"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <!-- Soft gradient overlay at bottom for text contrast -->
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20"></div>

      <!-- Top Story/Carousel Indicator Bars (Directly matching reference center screen!) -->
      <div class="absolute top-3.5 inset-x-6 flex items-center gap-1.5 z-20">
        <div class="h-1 flex-1 bg-white rounded-full"></div>
        <div class="h-1 flex-1 bg-white/50 rounded-full"></div>
        <div class="h-1 flex-1 bg-white/50 rounded-full"></div>
      </div>

      <!-- Top Badges: Distance & Format -->
      <div class="absolute top-7 start-4 z-20 flex items-center gap-2">
        <span class="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#228ecb] text-xs font-extrabold shadow-sm flex items-center gap-1.5">
          <Navigation class="w-3.5 h-3.5 fill-[#38a5e6] text-[#38a5e6]" />
          <span>{{ distance }} {{ t.discovery.km }}</span>
        </span>
      </div>

      <div class="absolute top-7 end-4 z-20">
        <span class="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black shadow-sm flex items-center gap-1">
          <Star class="w-3.5 h-3.5 fill-current" />
          <span>{{ stadium.rating }}</span>
        </span>
      </div>

      <!-- Bottom Pill Box inside Image (Directly matching reference center card's title bubble) -->
      <div class="absolute bottom-3 inset-x-3 z-20">
        <div class="bg-white/95 backdrop-blur-md rounded-[24px] p-3.5 px-4 shadow-lg flex items-center justify-between gap-3 border border-white/60">
          <div class="flex-1 min-w-0">
            <!-- Stadium Name with Direct External Facebook Link -->
            <div class="flex items-center gap-1.5 group/link">
              <a
                :href="stadium.facebookUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="text-base sm:text-lg font-black text-slate-900 hover:text-[#38a5e6] transition-colors truncate block"
                :title="t.discovery.openFacebook"
                @click.stop
              >
                {{ isRtl ? stadium.nameAr : stadium.nameEn }}
              </a>
              <ExternalLink class="w-3.5 h-3.5 text-blue-500 opacity-60 group-hover/link:opacity-100 shrink-0" />
            </div>

            <!-- Subtitle info line: Format & Location -->
            <div class="flex items-center gap-2 text-xs text-slate-500 mt-0.5 truncate">
              <span class="font-bold text-slate-700">{{ stadium.format }}</span>
              <span>•</span>
              <span class="truncate">{{ isRtl ? stadium.districtAr : stadium.districtEn }}</span>
            </div>
          </div>

          <!-- Price Tag Badge -->
          <div class="text-end shrink-0 ps-2 border-s border-slate-200">
            <span class="text-base sm:text-lg font-black text-[#258ecb] block leading-none">
              {{ stadium.pricePerHour }}
            </span>
            <span class="text-[10px] font-semibold text-slate-400 uppercase">
              {{ isRtl ? 'ريال/ساعة' : 'SAR/hr' }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Below Card Action Section (Matching reference's circular action buttons & actions) -->
    <div class="pt-3 px-1 flex items-center justify-between gap-3">
      <!-- Amenities preview pills -->
      <div class="flex items-center gap-1.5 overflow-hidden text-[11px] text-slate-600">
        <span v-if="stadium.amenities.nightLighting" class="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold flex items-center gap-1">
          <Zap class="w-3 h-3 text-amber-500" />
          <span>{{ isRtl ? 'إضاءة' : 'Light' }}</span>
        </span>
        <span v-if="stadium.amenities.indoor" class="px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 font-semibold flex items-center gap-1">
          <Shield class="w-3 h-3 text-[#38a5e6]" />
          <span>{{ isRtl ? 'مكيف' : 'AC' }}</span>
        </span>
        <span v-if="stadium.amenities.parking" class="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold flex items-center gap-1">
          <Car class="w-3 h-3 text-slate-500" />
          <span>{{ isRtl ? 'مواقف' : 'Parking' }}</span>
        </span>
      </div>

      <!-- Action Buttons Pair -->
      <div class="flex items-center gap-2 shrink-0">
        <!-- Call Venue Quick Button -->
        <a
          :href="`tel:${stadium.phone}`"
          class="w-10 h-10 rounded-full bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-600 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
          :title="t.discovery.callVenue"
          @click.stop
        >
          <Phone class="w-4 h-4" />
        </a>

        <!-- View Details & Book Button (Pill in vibrant primary blue matching reference) -->
        <button
          @click="onCardClick"
          class="px-4 py-2.5 rounded-full bg-[#38a5e6] hover:bg-[#2b96d6] text-white font-extrabold text-xs shadow-md shadow-[#38a5e6]/30 transition-all flex items-center gap-1.5 hover:scale-102 active:scale-95 cursor-pointer"
        >
          <span>{{ t.discovery.viewDetails }}</span>
          <ChevronLeft v-if="isRtl" class="w-3.5 h-3.5" />
          <ChevronRight v-else class="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useLocalization } from '../../composables/useLocalization';
import { useGeolocation } from '../../composables/useGeolocation';
import {
  Navigation,
  Star,
  ExternalLink,
  Zap,
  Shield,
  Car,
  Phone,
  ChevronLeft,
  ChevronRight
} from 'lucide-vue-next';

const props = defineProps({
  stadium: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['select', 'call-venue']);

const { t, isRtl } = useLocalization();
const { userCoords, calculateDistance } = useGeolocation();

const distance = computed(() => {
  return calculateDistance(
    userCoords.value.lat,
    userCoords.value.lng,
    props.stadium.lat,
    props.stadium.lng
  );
});

const onCardClick = () => {
  emit('select', props.stadium);
};
</script>
