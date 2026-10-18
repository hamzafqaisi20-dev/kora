<template>
  <div class="group bg-slate-900/90 rounded-2xl border border-slate-800/80 hover:border-emerald-500/50 shadow-xl hover:shadow-2xl hover:shadow-emerald-950/30 transition-all duration-300 flex flex-col overflow-hidden transform hover:-translate-y-1">
    <!-- Top Image Container -->
    <div class="relative h-56 w-full overflow-hidden bg-slate-950 cursor-pointer" @click="onCardClick">
      <img
        :src="stadium.images[0]"
        :alt="isRtl ? stadium.nameAr : stadium.nameEn"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

      <!-- Distance Badge (Calculated from user's location) -->
      <div class="absolute top-3 start-3 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-slate-700/80 text-emerald-400 text-xs font-bold shadow-lg">
        <Navigation class="w-3.5 h-3.5 animate-pulse text-emerald-400" />
        <span>{{ distance }} {{ t.discovery.km }}</span>
      </div>

      <!-- Rating Badge -->
      <div class="absolute top-3 end-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/90 text-slate-950 text-xs font-extrabold shadow-lg">
        <Star class="w-3.5 h-3.5 fill-current" />
        <span>{{ stadium.rating }}</span>
        <span class="text-[10px] font-semibold opacity-80">({{ stadium.reviewsCount }})</span>
      </div>

      <!-- Format / Sport Tag -->
      <div class="absolute bottom-3 start-3 z-10 flex items-center gap-2">
        <span class="px-2.5 py-0.5 rounded-lg bg-emerald-500 text-slate-950 text-xs font-extrabold uppercase tracking-wide">
          {{ stadium.format }}
        </span>
        <span v-if="stadium.isFifaCertified" class="px-2 py-0.5 rounded-lg bg-sky-500/90 text-white text-[11px] font-bold">
          FIFA Pro
        </span>
      </div>
    </div>

    <!-- Card Content -->
    <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
      <div>
        <!-- Stadium Name with Direct External Facebook Link Integration -->
        <div class="flex items-start justify-between gap-2">
          <div class="flex-1">
            <div class="flex items-center gap-1.5 group/link">
              <a
                :href="stadium.facebookUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="text-lg font-bold text-white hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5"
                :title="t.discovery.openFacebook"
                @click.stop
              >
                <span>{{ isRtl ? stadium.nameAr : stadium.nameEn }}</span>
                <ExternalLink class="w-4 h-4 text-emerald-400 opacity-70 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 transition-all" />
              </a>
            </div>
            <!-- City & Neighborhood -->
            <div class="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
              <MapPin class="w-3.5 h-3.5 text-slate-500" />
              <span>{{ isRtl ? stadium.cityAr : stadium.cityEn }} • {{ isRtl ? stadium.districtAr : stadium.districtEn }}</span>
            </div>
          </div>

          <!-- Official Facebook Button Icon -->
          <a
            :href="stadium.facebookUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="p-2 rounded-xl bg-blue-600/15 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 transition-all flex items-center justify-center shrink-0"
            :title="t.discovery.openFacebook"
            @click.stop
          >
            <!-- Facebook SVG -->
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
        </div>

        <!-- Surface details -->
        <p class="text-xs text-slate-400 mt-2 line-clamp-1">
          🌱 {{ isRtl ? stadium.surfaceAr : stadium.surfaceEn }}
        </p>

        <!-- Amenity Icons Grid -->
        <div class="flex flex-wrap items-center gap-2 mt-3 text-[11px] text-slate-300">
          <span v-if="stadium.amenities.nightLighting" class="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700/60 flex items-center gap-1">
            <Zap class="w-3 h-3 text-amber-400" />
            <span>{{ isRtl ? 'إضاءة ليلية' : 'Lighting' }}</span>
          </span>
          <span v-if="stadium.amenities.indoor" class="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700/60 flex items-center gap-1">
            <Shield class="w-3 h-3 text-sky-400" />
            <span>{{ isRtl ? 'مكيف' : 'Indoor' }}</span>
          </span>
          <span v-if="stadium.amenities.parking" class="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700/60 flex items-center gap-1">
            <Car class="w-3 h-3 text-slate-400" />
            <span>{{ isRtl ? 'مواقف' : 'Parking' }}</span>
          </span>
          <span v-if="stadium.amenities.showerRooms" class="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700/60 flex items-center gap-1">
            <Droplets class="w-3 h-3 text-cyan-400" />
            <span>{{ isRtl ? 'استحمام' : 'Showers' }}</span>
          </span>
        </div>
      </div>

      <!-- Price & Action Footer -->
      <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
        <div>
          <span class="text-xs text-slate-400 block">{{ isRtl ? 'السعر يبدأ من:' : 'Starts from:' }}</span>
          <div class="flex items-baseline gap-1">
            <span class="text-xl font-extrabold text-emerald-400">{{ stadium.pricePerHour }}</span>
            <span class="text-xs font-semibold text-slate-400">{{ t.discovery.hourRate }}</span>
          </div>
        </div>

        <div class="flex items-center gap-1.5">
          <button
            @click.stop="$emit('call-venue', stadium)"
            class="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            :title="t.discovery.callVenue"
          >
            <Phone class="w-4 h-4 text-emerald-400" />
          </button>

          <button
            @click="onCardClick"
            class="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs shadow-md shadow-emerald-600/20 hover:shadow-emerald-500/40 transition-all flex items-center gap-1.5 active:scale-95"
          >
            <span>{{ t.discovery.viewDetails }}</span>
            <ChevronLeft v-if="isRtl" class="w-3.5 h-3.5" />
            <ChevronRight v-else class="w-3.5 h-3.5" />
          </button>
        </div>
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
  MapPin,
  ExternalLink,
  Zap,
  Shield,
  Car,
  Droplets,
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
