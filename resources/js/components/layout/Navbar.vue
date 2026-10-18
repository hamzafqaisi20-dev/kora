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

        <div
          class="flex items-center gap-2 cursor-pointer group"
          @click="navigateTo('discovery')"
        >
          <div class="w-10 h-10 rounded-2xl bg-[#38a5e6] flex items-center justify-center text-white shadow-md shadow-[#38a5e6]/30 group-hover:scale-105 transition-transform">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="3" />
              <line x1="12" y1="4" x2="12" y2="20" />
              <circle cx="12" cy="12" r="3.5" />
            </svg>
          </div>
          <div>
            <span class="text-2xl font-black tracking-tight text-slate-900 lowercase font-['Plus_Jakarta_Sans',sans-serif]">
              korapass
            </span>
            <span class="ms-1.5 text-[9px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-[#258ecb]">
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

const { t, isRtl, toggleLocale } = useLocalization();
const { userCoords, simulateLocation } = useGeolocation();
const { currentView, navigateTo } = useBookings();

const showCityMenu = ref(false);

const chooseCity = (city) => {
  simulateLocation(city);
  showCityMenu.value = false;
};
</script>
