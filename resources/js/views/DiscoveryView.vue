<template>
  <div class="space-y-10 pb-24">
    <!-- HERO / WELCOME SECTION (Directly inspired by reference left screen) -->
    <section class="max-w-4xl mx-auto px-4 pt-4 sm:pt-6">
      <div class="bg-white rounded-[40px] p-6 sm:p-10 border border-slate-200/80 shadow-[0_12px_36px_rgba(25,50,90,0.06)] text-center relative overflow-hidden">
        <!-- Brand Wordmark at Top -->
        <div class="inline-block mb-4">
          <span class="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight lowercase font-['Plus_Jakarta_Sans',sans-serif]">
            korapass
          </span>
        </div>

        <!-- Athletic Feature Artwork Container with Large Rounded Frame -->
        <div class="relative w-full max-w-sm mx-auto h-48 sm:h-56 rounded-[32px] overflow-hidden bg-gradient-to-b from-sky-50 to-[#ebf2f7] p-2 flex items-center justify-center my-4 border border-sky-100">
          <img
            src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80"
            alt="Stadium Turf"
            class="w-full h-full object-cover rounded-[26px] shadow-sm filter saturate-110"
          />
          <div class="absolute bottom-4 inset-x-6 z-10 flex items-center justify-center">
            <span class="px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#228ecb] text-xs font-black shadow-md border border-white">
              {{ t.hero.badge }}
            </span>
          </div>
        </div>

        <!-- Typography Headline (Clean, modern dark text like reference) -->
        <div class="space-y-2 max-w-lg mx-auto mt-4">
          <h1 class="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
            {{ isRtl ? 'مرحباً بك في كورا باس' : 'Welcome to KoraPass' }}
          </h1>
          <p class="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
            {{ isRtl
              ? 'المنصة الأولى لحجز الملاعب والمنشآت الرياضية القريبة منك فورياً وبأعلى معايير الجودة'
              : 'Sports venue compatibility & booking platform that helps you reserve fields in seconds.'
            }}
          </p>
        </div>

        <!-- Primary Action Button (Solid Vibrant Blue Pill matching reference) -->
        <div class="max-w-xs mx-auto mt-6 space-y-3">
          <button
            type="button"
            @click="triggerNearestDetection"
            class="w-full py-4 rounded-full bg-[#38a5e6] hover:bg-[#2897da] text-white font-extrabold text-sm sm:text-base shadow-lg shadow-[#38a5e6]/30 hover:shadow-[#38a5e6]/50 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Navigation class="w-5 h-5 text-white" />
            <span>{{ isDetecting ? t.hero.detectingLocation : t.hero.findNearestBtn }}</span>
          </button>

          <button
            type="button"
            @click="scrollToDiscovery"
            class="text-xs font-bold text-slate-400 hover:text-slate-700 transition-colors block mx-auto py-1"
          >
            {{ isRtl ? 'تخطي واستعراض جميع الملاعب' : 'Skip & Explore All Venues' }}
          </button>
        </div>

        <!-- Floating Quick Search & Filter Bar -->
        <div class="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-start">
          <!-- Keyword Search Input -->
          <div class="bg-slate-50 hover:bg-white focus-within:bg-white rounded-2xl p-2.5 px-3.5 border border-slate-200/80 focus-within:border-[#38a5e6] transition-all">
            <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
              {{ isRtl ? 'البحث' : 'Search' }}
            </label>
            <div class="flex items-center gap-2">
              <Search class="w-4 h-4 text-[#38a5e6] shrink-0" />
              <input
                type="text"
                v-model="filters.keyword"
                :placeholder="t.hero.searchPlaceholder"
                class="bg-transparent border-0 text-xs text-slate-800 placeholder-slate-400 focus:outline-none w-full"
              />
            </div>
          </div>

          <!-- City Selector -->
          <div class="bg-slate-50 hover:bg-white focus-within:bg-white rounded-2xl p-2.5 px-3.5 border border-slate-200/80 focus-within:border-[#38a5e6] transition-all">
            <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
              {{ isRtl ? 'المدينة' : 'City' }}
            </label>
            <div class="flex items-center gap-2">
              <MapPin class="w-4 h-4 text-[#38a5e6] shrink-0" />
              <select
                v-model="filters.city"
                class="bg-transparent border-0 text-xs text-slate-800 focus:outline-none w-full cursor-pointer font-medium"
              >
                <option value="all">{{ t.hero.selectCity }}</option>
                <option value="الرياض">الرياض (Riyadh)</option>
                <option value="جدة">جدة (Jeddah)</option>
                <option value="الخبر">الخبر (Al Khobar)</option>
              </select>
            </div>
          </div>

          <!-- Sport Selector -->
          <div class="bg-slate-50 hover:bg-white focus-within:bg-white rounded-2xl p-2.5 px-3.5 border border-slate-200/80 focus-within:border-[#38a5e6] transition-all">
            <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
              {{ isRtl ? 'الرياضة' : 'Sport' }}
            </label>
            <div class="flex items-center gap-2">
              <Trophy class="w-4 h-4 text-[#38a5e6] shrink-0" />
              <select
                v-model="filters.sport"
                class="bg-transparent border-0 text-xs text-slate-800 focus:outline-none w-full cursor-pointer font-medium"
              >
                <option value="all">{{ t.hero.allSports }}</option>
                <option value="football">{{ t.hero.football }}</option>
                <option value="padel">{{ t.hero.padel }}</option>
                <option value="tennis">{{ t.hero.tennis }}</option>
                <option value="basketball">{{ t.hero.basketball }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- VENUES DISCOVERY GRID SECTION (Directly matching reference center layout) -->
    <section id="venues-discovery" class="max-w-5xl mx-auto px-4 space-y-6">
      <!-- Section Bar with Dual Modes & Sort -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {{ t.discovery.title }}
          </h2>
          <p class="text-xs text-slate-500 font-medium mt-0.5">
            {{ isRtl ? `تم العثور على ${sortedStadiums.length} ملاعب متاحة للحجز` : `${sortedStadiums.length} fields available for reservation` }}
          </p>
        </div>

        <!-- Mode Pills & Sort Dropdown -->
        <div class="flex flex-wrap items-center gap-2">
          <!-- Dual Discovery Modes -->
          <div class="bg-white p-1 rounded-full border border-slate-200 shadow-sm flex items-center">
            <button
              @click="setDiscoveryMode('nearest')"
              :class="[
                'px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer',
                discoveryMode === 'nearest'
                  ? 'bg-[#38a5e6] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              ]"
            >
              <Navigation class="w-3.5 h-3.5" />
              <span>{{ t.discovery.dualModes.nearest }}</span>
            </button>

            <button
              @click="setDiscoveryMode('all')"
              :class="[
                'px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer',
                discoveryMode === 'all'
                  ? 'bg-[#38a5e6] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              ]"
            >
              <Grid class="w-3.5 h-3.5" />
              <span>{{ t.discovery.dualModes.all }}</span>
            </button>
          </div>

          <!-- Radar Map Trigger -->
          <button
            @click="openMapModal = true"
            class="px-3.5 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-bold text-slate-700 hover:text-[#38a5e6] hover:border-[#38a5e6] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Map class="w-3.5 h-3.5 text-[#38a5e6]" />
            <span>{{ t.discovery.viewOnMap }}</span>
          </button>
        </div>
      </div>

      <!-- Quick Filter Pills Strip -->
      <div class="flex flex-wrap items-center gap-2">
        <button
          type="button"
          @click="filters.amenities.nightLighting = !filters.amenities.nightLighting"
          :class="[
            'px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer',
            filters.amenities.nightLighting
              ? 'bg-[#38a5e6] text-white border-[#38a5e6] shadow-sm'
              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
          ]"
        >
          <Zap class="w-3.5 h-3.5" :class="filters.amenities.nightLighting ? 'text-white' : 'text-amber-500'" />
          <span>{{ isRtl ? 'إضاءة ليلية' : 'Lighting' }}</span>
        </button>

        <button
          type="button"
          @click="filters.amenities.indoor = !filters.amenities.indoor"
          :class="[
            'px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer',
            filters.amenities.indoor
              ? 'bg-[#38a5e6] text-white border-[#38a5e6] shadow-sm'
              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
          ]"
        >
          <Shield class="w-3.5 h-3.5" :class="filters.amenities.indoor ? 'text-white' : 'text-[#38a5e6]'" />
          <span>{{ isRtl ? 'مغطى ومكيف' : 'Indoor AC' }}</span>
        </button>

        <button
          type="button"
          @click="filters.amenities.parking = !filters.amenities.parking"
          :class="[
            'px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer',
            filters.amenities.parking
              ? 'bg-[#38a5e6] text-white border-[#38a5e6] shadow-sm'
              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
          ]"
        >
          <Car class="w-3.5 h-3.5" :class="filters.amenities.parking ? 'text-white' : 'text-slate-500'" />
          <span>{{ isRtl ? 'مواقف مجانية' : 'Free Parking' }}</span>
        </button>

        <button
          type="button"
          @click="filters.amenities.showerRooms = !filters.amenities.showerRooms"
          :class="[
            'px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer',
            filters.amenities.showerRooms
              ? 'bg-[#38a5e6] text-white border-[#38a5e6] shadow-sm'
              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
          ]"
        >
          <Droplets class="w-3.5 h-3.5" :class="filters.amenities.showerRooms ? 'text-white' : 'text-cyan-500'" />
          <span>{{ isRtl ? 'غرف استحمام' : 'Shower Rooms' }}</span>
        </button>

        <button
          v-if="hasActiveFilters"
          type="button"
          @click="resetFilters"
          class="text-xs text-slate-400 hover:text-slate-700 underline font-semibold ms-auto"
        >
          {{ t.discovery.filters.clearAll }}
        </button>
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
      <div v-else class="text-center py-16 bg-white rounded-[36px] border border-slate-200 p-8 space-y-4 shadow-sm">
        <div class="w-16 h-16 rounded-full bg-sky-50 text-[#38a5e6] flex items-center justify-center mx-auto">
          <Search class="w-7 h-7" />
        </div>
        <h4 class="text-lg font-bold text-slate-900">{{ isRtl ? 'لم يتم العثور على ملاعب مطابقة' : 'No Venues Found' }}</h4>
        <p class="text-xs text-slate-500 max-w-sm mx-auto">
          {{ isRtl ? 'يرجى تجربة تقليل خيارات التصفية أو تغيير المدينة لعرض الملاعب الشاغرة.' : 'Try adjusting your filters or selecting a different city.' }}
        </p>
        <button
          @click="resetFilters"
          class="px-5 py-2.5 rounded-full bg-[#38a5e6] text-white font-bold text-xs shadow-md"
        >
          {{ t.discovery.filters.clearAll }}
        </button>
      </div>
    </section>

    <!-- Tactical Radar Map Modal -->
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
const sortBy = ref('nearest');

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

const hasActiveFilters = computed(() => {
  return (
    filters.value.keyword ||
    filters.value.city !== 'all' ||
    filters.value.sport !== 'all' ||
    filters.value.amenities.nightLighting ||
    filters.value.amenities.indoor ||
    filters.value.amenities.parking ||
    filters.value.amenities.showerRooms
  );
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

  const listWithDist = list.map((s) => {
    const dist = calculateDistance(
      userCoords.value.lat,
      userCoords.value.lng,
      s.lat,
      s.lng
    );
    return { ...s, calculatedDistance: dist };
  });

  if (sortBy.value === 'nearest') {
    return listWithDist.sort((a, b) => a.calculatedDistance - b.calculatedDistance);
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
