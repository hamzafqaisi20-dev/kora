<template>
  <div class="space-y-12">
    <!-- HERO SECTION -->
    <section class="relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center overflow-hidden py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800/60">
      <!-- High-resolution Cinematic Sports Turf Background Image with dark gradient overlay -->
      <div class="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=2000&q=85"
          alt="Sports Turf Arena"
          class="w-full h-full object-cover object-center filter brightness-[0.25] scale-105 transform motion-safe:animate-pulse-subtle"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40"></div>
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent"></div>
      </div>

      <div class="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        <!-- Trust badge -->
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/40 text-emerald-400 text-xs font-bold shadow-2xl backdrop-blur-md animate-fade-in">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>{{ t.hero.badge }}</span>
        </div>

        <!-- Hero Headline -->
        <div class="space-y-3">
          <h1 class="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight">
            <span>{{ t.hero.titleLine1 }}</span><br/>
            <span class="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent">
              {{ t.hero.titleLine2 }}
            </span>
          </h1>
          <p class="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            {{ t.hero.subtitle }}
          </p>
        </div>

        <!-- Quick "Find Nearest Stadium" Button with Geolocation Trigger -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            @click="triggerNearestDetection"
            class="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-400 hover:from-emerald-500 hover:to-teal-300 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-emerald-600/30 hover:shadow-emerald-500/50 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer group"
          >
            <Navigation class="w-5 h-5 text-slate-950 group-hover:rotate-45 transition-transform" />
            <span>{{ isDetecting ? t.hero.detectingLocation : t.hero.findNearestBtn }}</span>
            <span class="px-2 py-0.5 rounded-full bg-slate-950/20 text-slate-900 text-xs font-mono">GPS</span>
          </button>

          <button
            type="button"
            @click="openMapModal = true"
            class="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2.5 backdrop-blur-md cursor-pointer hover:border-emerald-500/50"
          >
            <Map class="w-5 h-5 text-emerald-400" />
            <span>{{ t.discovery.viewOnMap }}</span>
          </button>
        </div>

        <!-- Quick Search Bar Widget -->
        <div class="bg-slate-900/95 backdrop-blur-2xl border border-slate-800/90 rounded-3xl p-3 sm:p-4 shadow-2xl max-w-4xl mx-auto">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-start">
            <!-- Search Text -->
            <div class="p-2.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 focus-within:border-emerald-500 transition-colors">
              <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                {{ isRtl ? 'اسم الملعب أو الحي' : 'Venue / Neighborhood' }}
              </label>
              <div class="flex items-center gap-2">
                <Search class="w-4 h-4 text-emerald-400 shrink-0" />
                <input
                  type="text"
                  v-model="filters.keyword"
                  :placeholder="t.hero.searchPlaceholder"
                  class="bg-transparent border-0 text-xs text-white placeholder-slate-500 focus:outline-none w-full"
                />
              </div>
            </div>

            <!-- City Selector -->
            <div class="p-2.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 focus-within:border-emerald-500 transition-colors">
              <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                {{ isRtl ? 'المدينة والمنطقة' : 'City & Region' }}
              </label>
              <div class="flex items-center gap-2">
                <MapPin class="w-4 h-4 text-emerald-400 shrink-0" />
                <select
                  v-model="filters.city"
                  class="bg-transparent border-0 text-xs text-white focus:outline-none w-full cursor-pointer"
                >
                  <option value="all" class="bg-slate-900 text-white">{{ t.hero.selectCity }}</option>
                  <option value="الرياض" class="bg-slate-900 text-white">الرياض (Riyadh)</option>
                  <option value="جدة" class="bg-slate-900 text-white">جدة (Jeddah)</option>
                  <option value="الخبر" class="bg-slate-900 text-white">الخبر (Al Khobar)</option>
                </select>
              </div>
            </div>

            <!-- Sport Type Selector -->
            <div class="p-2.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 focus-within:border-emerald-500 transition-colors">
              <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                {{ t.hero.selectSport }}
              </label>
              <div class="flex items-center gap-2">
                <Trophy class="w-4 h-4 text-emerald-400 shrink-0" />
                <select
                  v-model="filters.sport"
                  class="bg-transparent border-0 text-xs text-white focus:outline-none w-full cursor-pointer"
                >
                  <option value="all" class="bg-slate-900 text-white">{{ t.hero.allSports }}</option>
                  <option value="football" class="bg-slate-900 text-white">{{ t.hero.football }}</option>
                  <option value="padel" class="bg-slate-900 text-white">{{ t.hero.padel }}</option>
                  <option value="tennis" class="bg-slate-900 text-white">{{ t.hero.tennis }}</option>
                  <option value="basketball" class="bg-slate-900 text-white">{{ t.hero.basketball }}</option>
                </select>
              </div>
            </div>

            <!-- Action Button -->
            <button
              type="button"
              @click="scrollToDiscovery"
              class="rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 p-3 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <Search class="w-4 h-4" />
              <span>{{ t.hero.searchButton }}</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- MAIN DISCOVERY & VENUES SECTION -->
    <section id="venues-discovery" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <!-- Section Header & Dual Discovery Mode Toggle -->
      <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <span class="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
            {{ isRtl ? 'استكشاف وحجز الملاعب' : 'Stadium Explorer' }}
          </span>
          <h2 class="text-3xl font-black text-white">
            {{ t.discovery.title }}
          </h2>
          <p class="text-xs text-slate-400 mt-1">
            {{ t.discovery.subtitle }}
          </p>
        </div>

        <!-- Dual Discovery Modes Controls -->
        <div class="flex flex-wrap items-center gap-3">
          <!-- Dual Modes Switch: Nearest to Me vs All/Manual -->
          <div class="bg-slate-900 p-1 rounded-2xl border border-slate-800 flex items-center">
            <button
              @click="setDiscoveryMode('nearest')"
              :class="[
                'px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer',
                discoveryMode === 'nearest'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white'
              ]"
            >
              <Navigation class="w-3.5 h-3.5" />
              <span>{{ t.discovery.dualModes.nearest }}</span>
            </button>

            <button
              @click="setDiscoveryMode('all')"
              :class="[
                'px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer',
                discoveryMode === 'all'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white'
              ]"
            >
              <Grid class="w-3.5 h-3.5" />
              <span>{{ t.discovery.dualModes.all }}</span>
            </button>
          </div>

          <!-- Open Tactical Radar Map -->
          <button
            @click="openMapModal = true"
            class="px-4 py-2 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-200 hover:text-white flex items-center gap-2 transition-all cursor-pointer"
          >
            <Map class="w-4 h-4 text-emerald-400" />
            <span>{{ t.discovery.viewOnMap }}</span>
          </button>
        </div>
      </div>

      <!-- Filters Bar & Results Counter -->
      <div class="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-center gap-2 text-xs text-slate-300">
            <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>
              {{ isRtl ? `تم العثور على ${sortedStadiums.length} ملعب متاح` : `${sortedStadiums.length} venues available` }}
            </span>
          </div>

          <!-- Sort Select -->
          <div class="flex items-center gap-2 text-xs">
            <span class="text-slate-400">{{ t.discovery.sortBy }}</span>
            <select
              v-model="sortBy"
              class="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="nearest">{{ t.discovery.sortNearest }}</option>
              <option value="rating">{{ t.discovery.sortRating }}</option>
              <option value="priceLow">{{ t.discovery.sortPriceLow }}</option>
              <option value="priceHigh">{{ t.discovery.sortPriceHigh }}</option>
            </select>
          </div>
        </div>

        <!-- Amenity Pills Filters -->
        <div class="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80 text-xs">
          <span class="text-slate-400 text-[11px] font-semibold">{{ isRtl ? 'المرافق المطلوبة:' : 'Filter Amenities:' }}</span>
          
          <button
            type="button"
            @click="filters.amenities.nightLighting = !filters.amenities.nightLighting"
            :class="[
              'px-3 py-1 rounded-xl border text-[11px] font-semibold transition-all flex items-center gap-1 cursor-pointer',
              filters.amenities.nightLighting
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            ]"
          >
            <Zap class="w-3 h-3 text-amber-400" />
            <span>{{ isRtl ? 'إضاءة ليلية' : 'Lighting' }}</span>
          </button>

          <button
            type="button"
            @click="filters.amenities.indoor = !filters.amenities.indoor"
            :class="[
              'px-3 py-1 rounded-xl border text-[11px] font-semibold transition-all flex items-center gap-1 cursor-pointer',
              filters.amenities.indoor
                ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            ]"
          >
            <Shield class="w-3 h-3 text-sky-400" />
            <span>{{ isRtl ? 'مغطى ومكيف' : 'Indoor AC' }}</span>
          </button>

          <button
            type="button"
            @click="filters.amenities.parking = !filters.amenities.parking"
            :class="[
              'px-3 py-1 rounded-xl border text-[11px] font-semibold transition-all flex items-center gap-1 cursor-pointer',
              filters.amenities.parking
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            ]"
          >
            <Car class="w-3 h-3 text-emerald-400" />
            <span>{{ isRtl ? 'مواقف خاصة' : 'Parking' }}</span>
          </button>

          <button
            type="button"
            @click="filters.amenities.showerRooms = !filters.amenities.showerRooms"
            :class="[
              'px-3 py-1 rounded-xl border text-[11px] font-semibold transition-all flex items-center gap-1 cursor-pointer',
              filters.amenities.showerRooms
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            ]"
          >
            <Droplets class="w-3 h-3 text-cyan-400" />
            <span>{{ isRtl ? 'غرف استحمام' : 'Showers' }}</span>
          </button>

          <button
            type="button"
            @click="resetFilters"
            class="text-[11px] text-slate-500 hover:text-slate-300 underline ms-auto"
          >
            {{ t.discovery.filters.clearAll }}
          </button>
        </div>
      </div>

      <!-- Stadium Cards Grid -->
      <div v-if="sortedStadiums.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StadiumCard
          v-for="stadium in sortedStadiums"
          :key="stadium.id"
          :stadium="stadium"
          @select="onSelectStadium"
          @call-venue="onCallVenue"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16 bg-slate-900/60 rounded-3xl border border-slate-800 p-8 space-y-4">
        <div class="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto text-slate-500">
          <Search class="w-8 h-8" />
        </div>
        <h4 class="text-lg font-bold text-white">{{ isRtl ? 'لم يتم العثور على ملاعب مطابقة' : 'No Stadiums Match Criteria' }}</h4>
        <p class="text-xs text-slate-400 max-w-sm mx-auto">
          {{ isRtl ? 'جرب تغيير معايير البحث أو اختيار مدينة أخرى لعرض الملاعب المتاحة.' : 'Try relaxing your filters or selecting a different sport or city.' }}
        </p>
        <button
          @click="resetFilters"
          class="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
        >
          {{ t.discovery.filters.clearAll }}
        </button>
      </div>
    </section>

    <!-- Map Preview Modal -->
    <MapPreviewModal
      :isOpen="openMapModal"
      :stadiums="stadiums"
      @close="openMapModal = false"
      @select-stadium="onSelectStadium"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useLocalization } from '../composables/useLocalization';
import { useGeolocation } from '../composables/useGeolocation';
import { useBookings } from '../composables/useBookings';
import StadiumCard from '../components/stadium/StadiumCard.vue';
import MapPreviewModal from '../components/stadium/MapPreviewModal.vue';
import {
  Navigation,
  Map,
  Search,
  MapPin,
  Trophy,
  Grid,
  Zap,
  Shield,
  Car,
  Droplets
} from 'lucide-vue-next';

const { t, isRtl } = useLocalization();
const { userCoords, isDetecting, detectLocation, calculateDistance } = useGeolocation();
const { stadiums, selectStadium } = useBookings();

const openMapModal = ref(false);
const discoveryMode = ref('nearest'); // 'nearest' | 'all'
const sortBy = ref('nearest'); // 'nearest' | 'rating' | 'priceLow' | 'priceHigh'

const filters = ref({
  keyword: '',
  city: 'all',
  sport: 'all',
  amenities: {
    nightLighting: false,
    indoor: false,
    parking: false,
    showerRooms: false,
  },
});

const triggerNearestDetection = () => {
  discoveryMode.value = 'nearest';
  sortBy.value = 'nearest';
  detectLocation();
  scrollToDiscovery();
};

const setDiscoveryMode = (mode) => {
  discoveryMode.value = mode;
  if (mode === 'nearest') {
    sortBy.value = 'nearest';
  }
};

const scrollToDiscovery = () => {
  if (typeof document !== 'undefined') {
    const el = document.getElementById('venues-discovery');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
};

const resetFilters = () => {
  filters.value = {
    keyword: '',
    city: 'all',
    sport: 'all',
    amenities: {
      nightLighting: false,
      indoor: false,
      parking: false,
      showerRooms: false,
    },
  };
};

const sortedStadiums = computed(() => {
  let list = stadiums.value.filter((s) => {
    // Keyword match
    if (filters.value.keyword) {
      const q = filters.value.keyword.toLowerCase();
      const matchName =
        s.nameAr.toLowerCase().includes(q) ||
        s.nameEn.toLowerCase().includes(q) ||
        s.districtAr?.toLowerCase().includes(q) ||
        s.districtEn?.toLowerCase().includes(q);
      if (!matchName) return false;
    }

    // City match
    if (filters.value.city !== 'all') {
      if (s.cityAr !== filters.value.city && s.cityEn.toLowerCase() !== filters.value.city.toLowerCase()) {
        return false;
      }
    }

    // Sport match
    if (filters.value.sport !== 'all') {
      if (s.sport !== filters.value.sport) {
        return false;
      }
    }

    // Amenities filter
    if (filters.value.amenities.nightLighting && !s.amenities.nightLighting) return false;
    if (filters.value.amenities.indoor && !s.amenities.indoor) return false;
    if (filters.value.amenities.parking && !s.amenities.parking) return false;
    if (filters.value.amenities.showerRooms && !s.amenities.showerRooms) return false;

    return true;
  });

  // Calculate distance for each
  const listWithDist = list.map((s) => {
    const dist = calculateDistance(
      userCoords.value.lat,
      userCoords.value.lng,
      s.lat,
      s.lng
    );
    return { ...s, calculatedDistance: dist };
  });

  // Sort
  if (sortBy.value === 'nearest') {
    return listWithDist.sort((a, b) => a.calculatedDistance - b.calculatedDistance);
  } else if (sortBy.value === 'rating') {
    return listWithDist.sort((a, b) => b.rating - a.rating);
  } else if (sortBy.value === 'priceLow') {
    return listWithDist.sort((a, b) => a.pricePerHour - b.pricePerHour);
  } else if (sortBy.value === 'priceHigh') {
    return listWithDist.sort((a, b) => b.pricePerHour - a.pricePerHour);
  }

  return listWithDist;
});

const onSelectStadium = (stadium) => {
  selectStadium(stadium);
};

const onCallVenue = (stadium) => {
  if (typeof window !== 'undefined') {
    window.location.href = `tel:${stadium.phone}`;
  }
};
</script>
