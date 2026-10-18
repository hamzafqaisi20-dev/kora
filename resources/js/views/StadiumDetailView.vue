<template>
  <div class="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
    <!-- Breadcrumb & Back Navigation -->
    <div class="flex items-center justify-between">
      <button
        @click="navigateTo('discovery')"
        class="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-emerald-400 transition-colors group cursor-pointer"
      >
        <ArrowRight v-if="isRtl" class="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <ArrowLeft v-else class="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>{{ t.details.backToSearch }}</span>
      </button>

      <div class="flex items-center gap-2">
        <span class="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
          <ShieldCheck class="w-4 h-4" />
          <span>{{ t.details.verifiedVenue }}</span>
        </span>
      </div>
    </div>

    <!-- Header Section: Title, Facebook Integration, Badges -->
    <div class="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-8 relative overflow-hidden shadow-2xl">
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        <div class="space-y-3 max-w-2xl">
          <!-- Distance and sport badges -->
          <div class="flex flex-wrap items-center gap-2">
            <span class="px-3 py-1 rounded-xl bg-emerald-500 text-slate-950 text-xs font-extrabold uppercase">
              {{ stadium.format }}
            </span>
            <span class="px-3 py-1 rounded-xl bg-slate-800 text-emerald-400 text-xs font-bold flex items-center gap-1 border border-slate-700">
              <Navigation class="w-3.5 h-3.5" />
              <span>{{ distance }} {{ t.discovery.km }} {{ isRtl ? 'من موقعك' : 'from you' }}</span>
            </span>
            <span class="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center gap-1 border border-amber-500/30">
              <Star class="w-3.5 h-3.5 fill-current text-amber-400" />
              <span>{{ stadium.rating }} ({{ stadium.reviewsCount }} {{ isRtl ? 'تقييم' : 'reviews' }})</span>
            </span>
          </div>

          <!-- Stadium Name with Direct External Facebook Link -->
          <div class="flex items-center gap-3">
            <a
              :href="stadium.facebookUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="text-3xl sm:text-4xl font-black text-white hover:text-emerald-400 transition-colors inline-flex items-center gap-2.5 group"
              :title="t.discovery.openFacebook"
            >
              <span>{{ isRtl ? stadium.nameAr : stadium.nameEn }}</span>
              <ExternalLink class="w-6 h-6 text-emerald-400 opacity-80 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </a>
          </div>

          <!-- Location & Facebook Page Link -->
          <div class="flex flex-wrap items-center gap-4 text-xs text-slate-300">
            <div class="flex items-center gap-1.5 text-slate-400">
              <MapPin class="w-4 h-4 text-emerald-400" />
              <span>{{ stadium.addressAr && isRtl ? stadium.addressAr : stadium.addressEn }}</span>
            </div>

            <!-- Direct Facebook link button -->
            <a
              :href="stadium.facebookUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/40 text-xs font-bold transition-all"
            >
              <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>{{ t.details.facebookPageBadge }}</span>
            </a>
          </div>
        </div>

        <!-- Contact & Rate Box -->
        <div class="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 p-5 rounded-2xl bg-slate-950/80 border border-slate-800 shrink-0">
          <div>
            <span class="text-xs text-slate-400 block">{{ isRtl ? 'سعر حجز الساعة:' : 'Hourly Booking Rate:' }}</span>
            <div class="flex items-baseline gap-1.5">
              <span class="text-3xl font-black text-emerald-400">{{ stadium.pricePerHour }}</span>
              <span class="text-sm font-semibold text-slate-400">{{ t.discovery.hourRate }}</span>
            </div>
          </div>

          <!-- Contact Inquiries -->
          <div class="space-y-1.5 text-xs w-full sm:w-auto">
            <span class="text-slate-400 block text-[11px] font-semibold">{{ t.details.contactVenue }}</span>
            <div class="flex items-center gap-2">
              <a
                :href="`tel:${stadium.phone}`"
                class="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md"
              >
                <Phone class="w-3.5 h-3.5" />
                <span>{{ stadium.phone }}</span>
              </a>
              <button
                @click="copyPhone"
                class="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                :title="t.details.copyPhone"
              >
                <Copy class="w-4 h-4" />
              </button>
            </div>
            <p v-if="copiedToast" class="text-[10px] text-emerald-400 font-bold animate-pulse">
              ✓ {{ t.details.copiedPhone }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Photo Gallery Showcase -->
    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-bold text-white flex items-center gap-2">
          <Camera class="w-5 h-5 text-emerald-400" />
          <span>{{ t.details.photoGallery }}</span>
        </h3>
        <button
          @click="openGallery(0)"
          class="text-xs text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
        >
          <span>{{ isRtl ? 'عرض كل الصور بدقة كاملة' : 'View Fullscreen Gallery' }}</span>
          <Maximize2 class="w-3.5 h-3.5" />
        </button>
      </div>

      <!-- High Resolution Grid Gallery -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-3 h-[420px] rounded-3xl overflow-hidden">
        <!-- Main Large Photo (2 columns) -->
        <div
          class="md:col-span-2 relative group overflow-hidden cursor-pointer h-full bg-slate-900"
          @click="openGallery(0)"
        >
          <img
            :src="stadium.images[0]"
            :alt="stadium.nameEn"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
            <span class="text-xs font-bold text-white bg-slate-950/70 backdrop-blur-md px-3 py-1 rounded-xl">
              {{ isRtl ? 'صورة الميدان الرئيسية' : 'Main Pitch Aerial View' }}
            </span>
          </div>
        </div>

        <!-- Column 2 (2 stacked photos) -->
        <div class="hidden md:flex flex-col gap-3 h-full">
          <div
            v-if="stadium.images[1]"
            class="relative group overflow-hidden cursor-pointer flex-1 bg-slate-900 rounded-xl"
            @click="openGallery(1)"
          >
            <img :src="stadium.images[1]" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div
            v-if="stadium.images[2]"
            class="relative group overflow-hidden cursor-pointer flex-1 bg-slate-900 rounded-xl"
            @click="openGallery(2)"
          >
            <img :src="stadium.images[2]" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
        </div>

        <!-- Column 3 (2 stacked photos or overlay) -->
        <div class="hidden md:flex flex-col gap-3 h-full">
          <div
            v-if="stadium.images[3]"
            class="relative group overflow-hidden cursor-pointer flex-1 bg-slate-900 rounded-xl"
            @click="openGallery(3)"
          >
            <img :src="stadium.images[3]" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div
            v-if="stadium.images[4]"
            class="relative group overflow-hidden cursor-pointer flex-1 bg-slate-900 rounded-xl"
            @click="openGallery(4)"
          >
            <img :src="stadium.images[4]" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div class="absolute inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center text-white text-xs font-bold">
              + {{ stadium.images.length - 3 }} {{ isRtl ? 'صور إضافية' : 'more' }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Interactive Time-Slot Selector Section -->
    <div id="booking-section">
      <TimeSlotSelector
        :stadium="stadium"
        @slot-selected="onSlotSelected"
        @proceed-payment="openPaymentModal"
      />
    </div>

    <!-- Pitch Specifications & Amenities Dual Cards -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Specifications -->
      <div class="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4">
        <h3 class="text-base font-bold text-white flex items-center gap-2">
          <Layers class="w-5 h-5 text-emerald-400" />
          <span>{{ t.details.fieldSpecs }}</span>
        </h3>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <span class="text-slate-400 block mb-1">{{ t.details.dimensions }}</span>
            <span class="text-sm font-extrabold text-white">{{ stadium.dimensions }}</span>
          </div>

          <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <span class="text-slate-400 block mb-1">{{ t.details.capacity }}</span>
            <span class="text-sm font-extrabold text-white">{{ stadium.capacity }}</span>
          </div>

          <div class="sm:col-span-2 p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <span class="text-slate-400 block mb-1">{{ t.details.surfaceType }}</span>
            <span class="text-sm font-bold text-emerald-400">{{ isRtl ? stadium.surfaceAr : stadium.surfaceEn }}</span>
          </div>

          <div class="sm:col-span-2 p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <span class="text-slate-400 block mb-1">{{ t.details.lightingLevel }}</span>
            <span class="text-xs font-semibold text-slate-200">{{ stadium.lighting }}</span>
          </div>
        </div>

        <p class="text-xs text-slate-400 leading-relaxed pt-2 border-t border-slate-800/80">
          {{ isRtl ? stadium.descriptionAr : stadium.descriptionEn }}
        </p>
      </div>

      <!-- Amenities & Facilities List -->
      <div class="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4">
        <h3 class="text-base font-bold text-white flex items-center gap-2">
          <CheckSquare class="w-5 h-5 text-emerald-400" />
          <span>{{ t.details.amenitiesTitle }}</span>
        </h3>

        <div class="grid grid-cols-2 gap-3 text-xs">
          <div
            v-for="(val, key) in stadium.amenities"
            :key="key"
            :class="[
              'p-3 rounded-xl border flex items-center gap-2.5',
              val ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-950/40 border-slate-800/40 text-slate-600 line-through'
            ]"
          >
            <CheckCircle2 v-if="val" class="w-4 h-4 text-emerald-400 shrink-0" />
            <XCircle v-else class="w-4 h-4 text-slate-600 shrink-0" />
            <span>{{ getAmenityLabel(key) }}</span>
          </div>
        </div>

        <!-- Map & Location Button -->
        <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <MapPin class="w-5 h-5 text-emerald-400" />
            <div class="text-xs">
              <span class="font-bold text-white block">{{ isRtl ? 'الموقع الجغرافي والاتجاهات' : 'GPS Directions' }}</span>
              <span class="text-slate-400">{{ stadium.addressAr || stadium.addressEn }}</span>
            </div>
          </div>
          <a
            :href="stadium.mapsUrl"
            target="_blank"
            class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all shrink-0"
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
  Camera,
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
