<template>
  <header class="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/85 border-b border-slate-800/80 transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Brand Logo & Identity -->
        <div class="flex items-center gap-3 cursor-pointer group" @click="navigateTo('discovery')">
          <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all duration-300 transform group-hover:scale-105">
            <div class="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <svg class="w-7 h-7 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <!-- Stadium pitch outline with center circle -->
                <rect x="2" y="4" width="20" height="16" rx="3" />
                <line x1="12" y1="4" x2="12" y2="20" />
                <circle cx="12" cy="12" r="3.5" />
                <path d="M2 9a3 3 0 0 1 3 3 3 3 0 0 1-3 3" />
                <path d="M22 9a3 3 0 0 0-3 3 3 3 0 0 0 3 3" />
              </svg>
            </div>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-2xl font-extrabold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                {{ t.appName }}
              </span>
              <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                PRO
              </span>
            </div>
            <p class="text-[11px] text-slate-400 font-medium hidden sm:block">
              {{ isRtl ? 'منصة حجز الملاعب والمنشآت الذكية' : 'Next-Gen Stadium Booking Platform' }}
            </p>
          </div>
        </div>

        <!-- Desktop Navigation Items -->
        <nav class="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            @click="navigateTo('discovery')"
            :class="[
              'px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2',
              currentView === 'discovery'
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
            ]"
          >
            <Compass class="w-4 h-4" />
            <span>{{ t.nav.explore }}</span>
          </button>

          <button
            @click="triggerNearestSearch"
            class="px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-900/80 transition-all duration-200 flex items-center gap-2 relative group"
          >
            <MapPin class="w-4 h-4 text-emerald-400 group-hover:animate-bounce" />
            <span>{{ t.nav.nearest }}</span>
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </button>

          <!-- Stadium Owner Portal -->
          <button
            @click="navigateTo('owner-portal')"
            :class="[
              'px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2',
              currentView === 'owner-portal'
                ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
            ]"
          >
            <ShieldCheck class="w-4 h-4 text-amber-400" />
            <span>{{ t.nav.ownerPortal }}</span>
          </button>

          <!-- Super Admin Portal -->
          <button
            @click="navigateTo('admin-portal')"
            :class="[
              'px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2',
              currentView === 'admin-portal'
                ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
            ]"
          >
            <Settings class="w-4 h-4 text-sky-400" />
            <span>{{ t.nav.adminPortal }}</span>
          </button>
        </nav>

        <!-- Right Action Elements -->
        <div class="hidden sm:flex items-center gap-3">
          <!-- City Simulator selector -->
          <div class="relative">
            <button
              @click="showCityMenu = !showCityMenu"
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <Navigation class="w-3.5 h-3.5 text-emerald-400" />
              <span>{{ userCoords.city }}</span>
              <ChevronDown class="w-3.5 h-3.5 text-slate-400" />
            </button>
            <div
              v-if="showCityMenu"
              class="absolute end-0 mt-2 w-48 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-1 z-50 text-xs"
            >
              <button
                @click="chooseCity('riyadh')"
                class="w-full text-start px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800 flex items-center justify-between"
              >
                <span>الرياض (Riyadh)</span>
                <span class="text-[10px] text-emerald-400">افتراضي</span>
              </button>
              <button
                @click="chooseCity('jeddah')"
                class="w-full text-start px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800"
              >
                <span>جدة (Jeddah)</span>
              </button>
              <button
                @click="chooseCity('khobar')"
                class="w-full text-start px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800"
              >
                <span>الخبر (Al Khobar)</span>
              </button>
            </div>
          </div>

          <!-- Language Selector Switcher -->
          <button
            @click="toggleLocale"
            class="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-900/90 text-slate-200 border border-slate-800 hover:border-emerald-500/40 hover:text-emerald-400 transition-all flex items-center gap-1.5"
            :title="isRtl ? 'Switch to English' : 'التحويل إلى العربية'"
          >
            <Globe class="w-3.5 h-3.5 text-emerald-400" />
            <span>{{ isRtl ? 'English' : 'العربية' }}</span>
          </button>

          <!-- Book Now Main CTA -->
          <button
            @click="navigateTo('discovery')"
            class="px-4 py-2 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 shadow-md shadow-emerald-600/30 hover:shadow-emerald-500/50 transition-all duration-200 flex items-center gap-2 transform active:scale-95"
          >
            <Zap class="w-4 h-4 text-emerald-100" />
            <span>{{ t.nav.bookNow }}</span>
          </button>
        </div>

        <!-- Mobile Menu Toggle Button -->
        <div class="flex items-center gap-2 md:hidden">
          <button
            @click="toggleLocale"
            class="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-slate-900 text-slate-200 border border-slate-800"
          >
            {{ isRtl ? 'EN' : 'عربي' }}
          </button>
          <button
            @click="mobileOpen = !mobileOpen"
            class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          >
            <Menu v-if="!mobileOpen" class="w-6 h-6" />
            <X v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation Drawer -->
    <div
      v-if="mobileOpen"
      class="md:hidden border-t border-slate-800 bg-slate-950/98 px-4 pt-3 pb-6 space-y-2"
    >
      <button
        @click="navigateTo('discovery'); mobileOpen = false;"
        class="w-full text-start px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 text-slate-200 hover:bg-slate-900"
      >
        <Compass class="w-5 h-5 text-emerald-400" />
        <span>{{ t.nav.explore }}</span>
      </button>

      <button
        @click="triggerNearestSearch(); mobileOpen = false;"
        class="w-full text-start px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 text-slate-200 hover:bg-slate-900"
      >
        <MapPin class="w-5 h-5 text-emerald-400" />
        <span>{{ t.nav.nearest }}</span>
      </button>

      <button
        @click="navigateTo('owner-portal'); mobileOpen = false;"
        class="w-full text-start px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 text-amber-300 hover:bg-slate-900"
      >
        <ShieldCheck class="w-5 h-5 text-amber-400" />
        <span>{{ t.nav.ownerPortal }}</span>
      </button>

      <button
        @click="navigateTo('admin-portal'); mobileOpen = false;"
        class="w-full text-start px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 text-sky-300 hover:bg-slate-900"
      >
        <Settings class="w-5 h-5 text-sky-400" />
        <span>{{ t.nav.adminPortal }}</span>
      </button>

      <div class="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <span>{{ isRtl ? 'الموقع الافتراضي:' : 'Current Location:' }}</span>
        <button @click="chooseCity('riyadh')" class="text-emerald-400 underline">
          {{ userCoords.city }}
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useLocalization } from '../../composables/useLocalization';
import { useGeolocation } from '../../composables/useGeolocation';
import { useBookings } from '../../composables/useBookings';
import {
  Compass,
  MapPin,
  ShieldCheck,
  Settings,
  Globe,
  Zap,
  Menu,
  X,
  ChevronDown,
  Navigation
} from 'lucide-vue-next';

const emit = defineEmits(['trigger-nearest']);

const { t, isRtl, toggleLocale } = useLocalization();
const { userCoords, simulateLocation, detectLocation } = useGeolocation();
const { currentView, navigateTo } = useBookings();

const mobileOpen = ref(false);
const showCityMenu = ref(false);

const chooseCity = (city) => {
  simulateLocation(city);
  showCityMenu.value = false;
};

const triggerNearestSearch = () => {
  detectLocation();
  navigateTo('discovery');
  emit('trigger-nearest');
};
</script>
