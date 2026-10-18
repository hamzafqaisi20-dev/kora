<template>
  <div class="max-w-4xl mx-auto px-4 py-4 sm:py-6 space-y-6 pb-28 animate-fade-in">
    <!-- Top Action Bar (Matching Reference Right Screen Style) -->
    <div class="flex items-center justify-between">
      <button
        @click="navigateTo('discovery')"
        class="w-11 h-11 rounded-full bg-white border border-slate-200/80 shadow-sm hover:shadow text-slate-800 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
        :title="t.details.backToSearch"
      >
        <ArrowRight v-if="isRtl" class="w-5 h-5" />
        <ArrowLeft v-else class="w-5 h-5" />
      </button>

      <!-- Verified Venue Pill Badge -->
      <div class="px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-1.5 shadow-xs">
        <ShieldCheck class="w-4 h-4 text-emerald-600" />
        <span>{{ t.details.verifiedVenue }}</span>
      </div>

      <!-- Distance Pill -->
      <div class="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-[#258ecb] text-xs font-extrabold flex items-center gap-1 shadow-xs">
        <Navigation class="w-3.5 h-3.5 fill-[#38a5e6] text-[#38a5e6]" />
        <span>{{ distance }} {{ t.discovery.km }}</span>
      </div>
    </div>

    <!-- Main Large Stadium Photo Frame with Rounded Squircle (Ref: Center Screen) -->
    <div class="relative w-full h-80 sm:h-96 rounded-[38px] overflow-hidden bg-slate-100 shadow-[0_12px_36px_rgba(25,50,90,0.08)] cursor-pointer select-none group" @click="openGallery(0)">
      <img
        :src="stadium.images[0]"
        :alt="isRtl ? stadium.nameAr : stadium.nameEn"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20"></div>

      <!-- Story Progress Bars at Top -->
      <div class="absolute top-4 inset-x-6 flex items-center gap-1.5 z-20">
        <div class="h-1 flex-1 bg-white rounded-full"></div>
        <div class="h-1 flex-1 bg-white/50 rounded-full"></div>
        <div class="h-1 flex-1 bg-white/50 rounded-full"></div>
        <div class="h-1 flex-1 bg-white/50 rounded-full"></div>
      </div>

      <!-- Expand Gallery Button -->
      <button
        @click.stop="openGallery(0)"
        class="absolute top-8 end-4 z-20 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1.5 hover:bg-black/60 transition-colors"
      >
        <Maximize2 class="w-3.5 h-3.5" />
        <span>{{ stadium.images.length }} {{ isRtl ? 'صور' : 'Photos' }}</span>
      </button>

      <!-- Title Bubble Inside Image at Bottom -->
      <div class="absolute bottom-4 inset-x-4 z-20">
        <div class="bg-white/95 backdrop-blur-md rounded-[28px] p-4 px-5 shadow-lg border border-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <!-- Stadium Name with Direct External Facebook Link Integration -->
            <div class="flex items-center gap-2">
              <a
                :href="stadium.facebookUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="text-xl sm:text-2xl font-black text-slate-900 hover:text-[#38a5e6] transition-colors inline-flex items-center gap-2"
                :title="t.discovery.openFacebook"
                @click.stop
              >
                <span>{{ isRtl ? stadium.nameAr : stadium.nameEn }}</span>
                <ExternalLink class="w-4 h-4 text-[#38a5e6]" />
              </a>
            </div>

            <div class="flex items-center gap-2 text-xs text-slate-500 mt-1">
              <span class="font-bold text-slate-700">{{ stadium.format }}</span>
              <span>•</span>
              <span>{{ isRtl ? stadium.addressAr : stadium.addressEn }}</span>
            </div>
          </div>

          <!-- Price & Rating Bubble -->
          <div class="flex items-center gap-4 shrink-0 sm:border-s sm:ps-4 border-slate-200">
            <div>
              <span class="text-xs text-slate-400 block">{{ isRtl ? 'السعر/ساعة' : 'Rate/hr' }}</span>
              <span class="text-xl font-black text-[#258ecb]">{{ stadium.pricePerHour }} {{ isRtl ? 'ريال' : 'SAR' }}</span>
            </div>
            <div class="flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
              <Star class="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{{ stadium.rating }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions Row: Facebook Official Link + Direct Call Phone -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <!-- Direct Facebook Link Card -->
      <a
        :href="stadium.facebookUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="bg-white rounded-[24px] p-4 border border-blue-100 hover:border-blue-300 shadow-sm flex items-center justify-between transition-all group"
      >
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </div>
          <div>
            <span class="text-xs font-bold text-slate-900 block group-hover:text-blue-600 transition-colors">
              {{ t.details.facebookPageBadge }}
            </span>
            <span class="text-[11px] text-slate-400">{{ isRtl ? 'عرض الصور والتحديثات الرسمية' : 'Visit Official Page' }}</span>
          </div>
        </div>
        <ExternalLink class="w-4 h-4 text-blue-500 group-hover:translate-x-0.5 transition-transform" />
      </a>

      <!-- Direct Call Card with Quick Copy -->
      <div class="bg-white rounded-[24px] p-4 border border-slate-200/80 shadow-sm flex items-center justify-between">
        <div class="flex items-center gap-3">
          <a
            :href="`tel:${stadium.phone}`"
            class="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 hover:scale-105 transition-transform"
          >
            <Phone class="w-5 h-5" />
          </a>
          <div>
            <span class="text-xs font-bold text-slate-900 block font-mono">{{ stadium.phone }}</span>
            <span class="text-[11px] text-slate-400">{{ t.details.contactVenue }}</span>
          </div>
        </div>
        <button
          @click="copyPhone"
          class="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
        >
          <Copy class="w-3.5 h-3.5" />
          <span>{{ copiedToast ? (isRtl ? 'تم النسخ!' : 'Copied!') : t.details.copyPhone }}</span>
        </button>
      </div>
    </div>

    <!-- Interactive Time-Slot Selector Component (Styling adapted to soft blue/white) -->
    <div id="booking-section">
      <TimeSlotSelector
        :stadium="stadium"
        @slot-selected="onSlotSelected"
        @proceed-payment="openPaymentModal"
      />
    </div>

    <!-- Pitch Specifications & Amenities Cards (Crisp White with Giant Rounded Corners) -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Specifications -->
      <div class="bg-white rounded-[32px] p-6 border border-slate-200/80 shadow-[0_8px_30px_rgba(25,50,90,0.05)] space-y-4">
        <h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2">
          <Layers class="w-5 h-5 text-[#38a5e6]" />
          <span>{{ t.details.fieldSpecs }}</span>
        </h3>

        <div class="grid grid-cols-2 gap-3 text-xs">
          <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
            <span class="text-slate-400 block mb-0.5">{{ t.details.dimensions }}</span>
            <span class="font-extrabold text-slate-800">{{ stadium.dimensions }}</span>
          </div>
          <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
            <span class="text-slate-400 block mb-0.5">{{ t.details.capacity }}</span>
            <span class="font-extrabold text-slate-800">{{ stadium.capacity }}</span>
          </div>
          <div class="col-span-2 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
            <span class="text-slate-400 block mb-0.5">{{ t.details.surfaceType }}</span>
            <span class="font-bold text-emerald-700">{{ isRtl ? stadium.surfaceAr : stadium.surfaceEn }}</span>
          </div>
          <div class="col-span-2 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
            <span class="text-slate-400 block mb-0.5">{{ t.details.lightingLevel }}</span>
            <span class="font-semibold text-slate-700">{{ stadium.lighting }}</span>
          </div>
        </div>

        <p class="text-xs text-slate-500 leading-relaxed pt-2 border-t border-slate-100">
          {{ isRtl ? stadium.descriptionAr : stadium.descriptionEn }}
        </p>
      </div>

      <!-- Amenities & Map Directions -->
      <div class="bg-white rounded-[32px] p-6 border border-slate-200/80 shadow-[0_8px_30px_rgba(25,50,90,0.05)] space-y-4">
        <h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2">
          <CheckSquare class="w-5 h-5 text-[#38a5e6]" />
          <span>{{ t.details.amenitiesTitle }}</span>
        </h3>

        <div class="grid grid-cols-2 gap-2.5 text-xs">
          <div
            v-for="(val, key) in stadium.amenities"
            :key="key"
            :class="[
              'p-2.5 px-3 rounded-2xl border flex items-center gap-2 font-medium',
              val ? 'bg-sky-50/60 border-sky-100 text-slate-800' : 'bg-slate-50 border-slate-100 text-slate-400 line-through'
            ]"
          >
            <CheckCircle2 v-if="val" class="w-4 h-4 text-[#38a5e6] shrink-0" />
            <XCircle v-else class="w-4 h-4 text-slate-300 shrink-0" />
            <span class="truncate">{{ getAmenityLabel(key) }}</span>
          </div>
        </div>

        <!-- Google Maps Link Card -->
        <div class="p-3.5 rounded-2xl bg-[#ebf2f7] border border-slate-200 flex items-center justify-between mt-2">
          <div class="flex items-center gap-2 text-xs">
            <MapPin class="w-4 h-4 text-[#38a5e6]" />
            <span class="font-bold text-slate-800">{{ isRtl ? 'موقع الملعب على الخريطة' : 'Venue GPS Location' }}</span>
          </div>
          <a
            :href="stadium.mapsUrl"
            target="_blank"
            class="px-3 py-1.5 rounded-full bg-white text-slate-700 hover:text-[#38a5e6] text-xs font-bold shadow-xs transition-colors"
          >
            {{ t.details.openGoogleMaps }}
          </a>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <StadiumGalleryModal
      :isOpen="galleryOpen"
      :stadium="stadium"
      :initialIndex="galleryIndex"
      @close="galleryOpen = false"
    />

    <BookingModal
      :isOpen="paymentOpen"
      :stadium="stadium"
      :date="activeBookingData.date"
      :slot="activeBookingData.slot"
      @close="paymentOpen = false"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useLocalization } from '../composables/useLocalization';
import { useGeolocation } from '../composables/useGeolocation';
import { useBookings } from '../composables/useBookings';
import TimeSlotSelector from '../components/stadium/TimeSlotSelector.vue';
import StadiumGalleryModal from '../components/stadium/StadiumGalleryModal.vue';
import BookingModal from '../components/stadium/BookingModal.vue';
import {
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Navigation,
  Star,
  ExternalLink,
  MapPin,
  Phone,
  Copy,
  Maximize2,
  Layers,
  CheckSquare,
  CheckCircle2,
  XCircle
} from 'lucide-vue-next';

const props = defineProps({
  stadium: {
    type: Object,
    required: true,
  },
});

const { t, isRtl } = useLocalization();
const { userCoords, calculateDistance } = useGeolocation();
const { navigateTo } = useBookings();

const galleryOpen = ref(false);
const galleryIndex = ref(0);
const paymentOpen = ref(false);
const copiedToast = ref(false);

const activeBookingData = ref({
  date: '2026-10-18',
  slot: props.stadium.slots?.[0] || { time: '20:00 - 21:00', price: 340 },
});

const distance = computed(() => {
  return calculateDistance(
    userCoords.value.lat,
    userCoords.value.lng,
    props.stadium.lat,
    props.stadium.lng
  );
});

const copyPhone = async () => {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(props.stadium.phone);
    copiedToast.value = true;
    setTimeout(() => {
      copiedToast.value = false;
    }, 2500);
  }
};

const openGallery = (idx) => {
  galleryIndex.value = idx;
  galleryOpen.value = true;
};

const onSlotSelected = (data) => {
  activeBookingData.value = {
    date: data.date,
    slot: data.slot,
  };
};

const openPaymentModal = (data) => {
  activeBookingData.value = {
    date: data.date,
    slot: data.slot,
  };
  paymentOpen.value = true;
};

const getAmenityLabel = (key) => {
  const map = {
    nightLighting: isRtl.value ? 'إضاءة ليلية عالية الكفاءة' : 'Night Floodlights',
    indoor: isRtl.value ? 'مغطى ومكيف بالكامل' : 'Indoor Air-conditioned',
    parking: isRtl.value ? 'مواقف سيارات خاصة مجانية' : 'Free Dedicated Parking',
    showerRooms: isRtl.value ? 'غرف تبديل واستحمام خاصة' : 'Shower & Locker Rooms',
    cafeteria: isRtl.value ? 'كافيه واستراحة للاعبين' : 'Café & Player Lounge',
    bibsAndBalls: isRtl.value ? 'كرات وصدريات مجانية' : 'Free Balls & Bibs',
    referee: isRtl.value ? 'إمكانية توفير حكام معتمدين' : 'Certified Referees Available',
    spectators: isRtl.value ? 'مدرجات جماهيرية مجهزة' : 'Spectator Seating',
  };
  return map[key] || key;
};
</script>
