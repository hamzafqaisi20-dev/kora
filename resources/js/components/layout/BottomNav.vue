<template>
  <nav class="fixed bottom-0 inset-x-0 z-40 flex justify-center pb-3 px-4 pointer-events-none">
    <div class="w-full max-w-md bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_12px_40px_rgba(20,40,70,0.12)] rounded-[32px] px-6 py-2.5 flex items-center justify-between pointer-events-auto transition-all duration-300">
      <!-- 1. Explore / Home -->
      <button
        @click="navigateTo('discovery')"
        class="flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all group"
        :class="currentView === 'discovery' ? 'text-[#38a5e6]' : 'text-slate-400 hover:text-slate-600'"
      >
        <div class="relative">
          <Home class="w-6 h-6 transition-transform group-hover:scale-110" />
          <span
            v-if="currentView === 'discovery'"
            class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#38a5e6]"
          ></span>
        </div>
        <span class="text-[10px] font-bold tracking-tight">
          {{ isRtl ? 'الرئيسية' : 'Explore' }}
        </span>
      </button>

      <!-- 2. Interactive Map / Nearest Radar -->
      <button
        @click="$emit('open-map')"
        class="flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all group text-slate-400 hover:text-slate-600"
      >
        <MapPin class="w-6 h-6 transition-transform group-hover:scale-110 text-emerald-500" />
        <span class="text-[10px] font-bold tracking-tight">
          {{ isRtl ? 'الخريطة' : 'Map' }}
        </span>
      </button>

      <!-- 3. Owner Dashboard -->
      <button
        @click="navigateTo('owner-portal')"
        class="flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all group"
        :class="currentView === 'owner-portal' ? 'text-[#38a5e6]' : 'text-slate-400 hover:text-slate-600'"
      >
        <div class="relative">
          <CalendarDays class="w-6 h-6 transition-transform group-hover:scale-110" />
          <span
            v-if="currentView === 'owner-portal'"
            class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#38a5e6]"
          ></span>
        </div>
        <span class="text-[10px] font-bold tracking-tight">
          {{ isRtl ? 'الملاعب' : 'Owner' }}
        </span>
      </button>

      <!-- 4. Admin Portal -->
      <button
        @click="navigateTo('admin-portal')"
        class="flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all group"
        :class="currentView === 'admin-portal' ? 'text-[#38a5e6]' : 'text-slate-400 hover:text-slate-600'"
      >
        <div class="relative">
          <Sliders class="w-6 h-6 transition-transform group-hover:scale-110" />
          <span
            v-if="currentView === 'admin-portal'"
            class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#38a5e6]"
          ></span>
        </div>
        <span class="text-[10px] font-bold tracking-tight">
          {{ isRtl ? 'الإدارة' : 'Admin' }}
        </span>
      </button>

      <!-- 5. Language Switcher -->
      <button
        @click="toggleLocale"
        class="flex flex-col items-center gap-1 py-1 px-2.5 rounded-2xl transition-all text-slate-500 hover:text-[#38a5e6]"
        :title="isRtl ? 'Switch to English' : 'التحويل للعربية'"
      >
        <Globe class="w-5 h-5" />
        <span class="text-[10px] font-extrabold uppercase">
          {{ isRtl ? 'EN' : 'عربي' }}
        </span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { useLocalization } from '../../composables/useLocalization';
import { useBookings } from '../../composables/useBookings';
import {
  Home,
  MapPin,
  CalendarDays,
  Sliders,
  Globe
} from 'lucide-vue-next';

defineEmits(['open-map']);

const { isRtl, toggleLocale } = useLocalization();
const { currentView, navigateTo } = useBookings();
</script>
