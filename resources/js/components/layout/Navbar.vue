<template>
  <header class="sticky top-0 z-40 bg-[#ebf2f7]/90 backdrop-blur-md pt-3 pb-2 px-4 transition-all duration-300">
    <div class="max-w-5xl mx-auto flex items-center justify-between">
      <!-- Left: Back Button (if in subscreen) or Brand Logo -->
      <div class="flex items-center gap-3">
        <button
          v-if="currentView !== 'discovery'"
          @click="navigateTo('discovery')"
          class="w-11 h-11 rounded-full bg-white border border-slate-200/80 shadow-sm hover:shadow text-slate-700 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
          :title="isRtl ? 'الرجوع للرئيسية' : 'Back to Home'"
        >
          <ArrowRight v-if="isRtl" class="w-5 h-5 text-slate-800" />
          <ArrowLeft v-else class="w-5 h-5 text-slate-800" />
        </button>

        <div class="flex items-center gap-3">
          <!-- Pulsing Professional Venue Location & Radar Button -->
          <button
            type="button"
            @click.stop="handleOpenLocation"
            class="relative group/radar flex items-center justify-center cursor-pointer outline-none focus:outline-none transition-transform"
            :title="isRtl ? 'رادار الملاعب التفاعلي • اضغط لفتح الموقع' : 'Interactive Venue Radar • Click to open location'"
            aria-label="Venue location radar"
          >
            <!-- Animated Expanding Radar Wave -->
            <span class="absolute inset-0 rounded-2xl bg-[#38a5e6]/40 radar-ring-wave pointer-events-none"></span>
            
            <!-- Secondary Ambient Breathing Glow -->
            <span class="absolute -inset-1 rounded-2xl bg-gradient-to-r from-sky-400 to-[#1e8fd4] opacity-50 blur-[5px] animate-pulse pointer-events-none"></span>

            <!-- Main Button Container -->
            <div class="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-[#4db3f2] via-[#2ba0e5] to-[#1270b3] flex items-center justify-center text-white border border-white/40 shadow-lg shadow-[#38a5e6]/40 hover:scale-105 active:scale-95 transition-all duration-300 radar-pulsing-btn overflow-hidden">
              <!-- Glass Sheen Glare -->
              <div class="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent pointer-events-none"></div>

              <!-- Sleek High-Precision Stadium Pitch / Radar Icon -->
              <svg class="w-6 h-6 text-white drop-shadow-xs relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                <!-- Stadium Outer Boundary -->
                <rect x="2" y="3.5" width="20" height="17" rx="3.5" stroke-width="2" />
                <!-- Halfway Line -->
                <line x1="12" y1="3.5" x2="12" y2="20.5" stroke-width="1.8" />
                <!-- Center Circle -->
                <circle cx="12" cy="12" r="3.2" stroke-width="1.8" />
                <!-- Center Kickoff Pulsing Dot -->
                <circle cx="12" cy="12" r="1.2" fill="currentColor" class="animate-ping" />
                <!-- Left Penalty Box -->
                <path d="M 2 7.5 H 6 A 0.5 0.5 0 0 1 6.5 8 V 16 A 0.5 0.5 0 0 1 6 16.5 H 2" stroke-width="1.6" />
                <!-- Right Penalty Box -->
                <path d="M 22 7.5 H 18 A 0.5 0.5 0 0 0 17.5 8 V 16 A 0.5 0.5 0 0 0 18 16.5 H 22" stroke-width="1.6" />
                <!-- Corner Arcs -->
                <path d="M 2 5.5 A 2 2 0 0 0 4 3.5" stroke-width="1.2" />
                <path d="M 2 18.5 A 2 2 0 0 1 4 20.5" stroke-width="1.2" />
                <path d="M 22 5.5 A 2 2 0 0 1 20 3.5" stroke-width="1.2" />
                <path d="M 22 18.5 A 2 2 0 0 0 20 20.5" stroke-width="1.2" />
              </svg>

              <!-- Live GPS Beacon Dot on Top Corner -->
              <span class="absolute top-1 end-1 flex h-2.5 w-2.5 z-20">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-90"></span>
                <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 border border-white"></span>
              </span>
            </div>

            <!-- Sleek Tooltip on Hover -->
            <div class="hidden sm:group-hover/radar:flex absolute top-full mt-2 start-1/2 -translate-x-1/2 z-50 whitespace-nowrap bg-slate-900/95 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-xl border border-white/10 items-center gap-1.5 pointer-events-none transition-all">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>{{ isRtl ? 'رادار الملاعب المباشر • اضغط لفتح الموقع' : 'Live Venue Radar • Click to open location' }}</span>
            </div>
          </button>

          <!-- Brand Logo Text (Click navigates to home/discovery) -->
          <div
            class="cursor-pointer group flex items-center select-none"
            @click="navigateTo('discovery')"
          >
            <span class="text-2xl font-black tracking-tight text-slate-900 lowercase font-['Plus_Jakarta_Sans',sans-serif] group-hover:text-[#258ecb] transition-colors">
              korapass
            </span>
            <span class="ms-1.5 text-[9px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-[#258ecb] border border-sky-200/60 shadow-2xs">
              PRO
            </span>
          </div>
        </div>
      </div>

      <!-- Center: Screen Title indicator (if in subviews) or Navigation Links -->
      <div class="hidden sm:flex items-center gap-2 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/80 shadow-sm">
        <button
          @click="navigateTo('discovery')"
          :class="[
            'px-3.5 py-1.5 rounded-full text-xs font-bold transition-all',
            currentView === 'discovery' ? 'bg-[#38a5e6] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
          ]"
        >
          {{ t.nav.explore }}
        </button>

        <button
          @click="navigateTo('owner-portal')"
          :class="[
            'px-3.5 py-1.5 rounded-full text-xs font-bold transition-all',
            currentView === 'owner-portal' ? 'bg-[#38a5e6] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
          ]"
        >
          {{ t.nav.ownerPortal }}
        </button>

        <button
          @click="navigateTo('admin-portal')"
          :class="[
            'px-3.5 py-1.5 rounded-full text-xs font-bold transition-all',
            currentView === 'admin-portal' ? 'bg-[#38a5e6] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
          ]"
        >
          {{ t.nav.adminPortal }}
        </button>
      </div>

      <!-- Right: Location Simulator Pill & Language Button -->
      <div class="flex items-center gap-2">
        <!-- City Selector Pill -->
        <div class="relative">
          <button
            @click="showCityMenu = !showCityMenu"
            class="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold text-slate-700 bg-white border border-slate-200 shadow-sm hover:border-[#38a5e6] transition-colors"
          >
            <Navigation class="w-3.5 h-3.5 text-[#38a5e6]" />
            <span class="max-w-[90px] sm:max-w-[120px] truncate">{{ userCoords.city }}</span>
            <ChevronDown class="w-3.5 h-3.5 text-slate-400" />
          </button>
          <div
            v-if="showCityMenu"
            class="absolute end-0 mt-2 w-48 rounded-2xl bg-white border border-slate-200 shadow-xl p-1.5 z-50 text-xs"
          >
            <button
              @click="chooseCity('riyadh')"
              class="w-full text-start px-3 py-2 rounded-xl text-slate-700 hover:bg-sky-50 hover:text-[#38a5e6] flex items-center justify-between font-medium"
            >
              <span>الرياض (Riyadh)</span>
              <span class="text-[10px] text-emerald-600 font-bold">افتراضي</span>
            </button>
            <button
              @click="chooseCity('jeddah')"
              class="w-full text-start px-3 py-2 rounded-xl text-slate-700 hover:bg-sky-50 hover:text-[#38a5e6] font-medium"
            >
              <span>جدة (Jeddah)</span>
            </button>
            <button
              @click="chooseCity('khobar')"
              class="w-full text-start px-3 py-2 rounded-xl text-slate-700 hover:bg-sky-50 hover:text-[#38a5e6] font-medium"
            >
              <span>الخبر (Al Khobar)</span>
            </button>
          </div>
        </div>

        <!-- Language Switcher Pill -->
        <button
          @click="toggleLocale"
          class="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm text-slate-700 hover:text-[#38a5e6] hover:border-[#38a5e6] flex items-center justify-center text-xs font-bold transition-all"
          :title="isRtl ? 'Switch to English' : 'التحويل للعربية'"
        >
          <span>{{ isRtl ? 'EN' : 'عربي' }}</span>
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
  ArrowRight,
  ArrowLeft,
  Navigation,
  ChevronDown
} from 'lucide-vue-next';

const emit = defineEmits(['open-location']);

const { t, isRtl, toggleLocale } = useLocalization();
const { userCoords, simulateLocation, detectLocation } = useGeolocation();
const { currentView, navigateTo } = useBookings();

const showCityMenu = ref(false);

const handleOpenLocation = () => {
  detectLocation();
  emit('open-location');
};

const chooseCity = (city) => {
  simulateLocation(city);
  showCityMenu.value = false;
};
</script>
