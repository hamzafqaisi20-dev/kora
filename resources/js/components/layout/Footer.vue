<template>
  <footer class="bg-white border-t border-slate-200/80 pt-14 pb-20 text-slate-500">
    <div class="max-w-5xl mx-auto px-4 sm:px-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-100">
        <!-- Brand Info -->
        <div class="space-y-3 sm:col-span-2">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-xl bg-[#38a5e6] text-white flex items-center justify-center font-bold">
              ⚽
            </div>
            <span class="text-2xl font-black text-slate-900 tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
              korapass
            </span>
          </div>
          <p class="text-xs text-slate-500 leading-relaxed max-w-sm font-medium">
            {{ isRtl
              ? 'المنصة الرقمية الرائدة لحجز الملاعب الرياضية واكتشاف أفضل المنشآت القريبة منك، مع إدارة ذكية لأصحاب الملاعب وتأكيد حجز فوري.'
              : 'The sports-tech marketplace connecting passionate athletes with premier venues. Instant slot booking and turnkey facility management.'
            }}
          </p>
          <div class="flex items-center gap-2 pt-1">
            <span class="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200 flex items-center gap-1">
              <ShieldCheck class="w-3.5 h-3.5" />
              <span>{{ isRtl ? 'منشآت معتمدة وموثوقة' : 'Certified Venues' }}</span>
            </span>
            <span class="px-3 py-1 rounded-full bg-sky-50 text-[#258ecb] text-[11px] font-bold border border-sky-200 flex items-center gap-1">
              <Lock class="w-3.5 h-3.5" />
              <span>{{ isRtl ? 'دفع إلكتروني آمن' : 'Secure 3D Payment' }}</span>
            </span>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-xs font-black text-slate-800 uppercase tracking-wider mb-3">
            {{ isRtl ? 'الرياضات والملاعب' : 'Sports & Activities' }}
          </h4>
          <ul class="space-y-2 text-xs">
            <li><button @click="navigateTo('discovery')" class="hover:text-[#38a5e6] transition-colors font-medium">{{ t.hero.football }} (5v5, 7v7, 11v11)</button></li>
            <li><button @click="navigateTo('discovery')" class="hover:text-[#38a5e6] transition-colors font-medium">{{ t.hero.padel }} (Panoramic Glass)</button></li>
            <li><button @click="navigateTo('discovery')" class="hover:text-[#38a5e6] transition-colors font-medium">{{ t.hero.tennis }} (Hard Courts)</button></li>
            <li><button @click="navigateTo('discovery')" class="hover:text-[#38a5e6] transition-colors font-medium">{{ t.hero.basketball }} (Indoor AC)</button></li>
          </ul>
        </div>

        <!-- Portals -->
        <div>
          <h4 class="text-xs font-black text-slate-800 uppercase tracking-wider mb-3">
            {{ isRtl ? 'لوحات التحكم' : 'Portals & Admin' }}
          </h4>
          <ul class="space-y-2 text-xs">
            <li>
              <button @click="navigateTo('owner-portal')" class="text-[#258ecb] hover:text-[#1d70a2] font-bold transition-colors">
                {{ t.nav.ownerPortal }}
              </button>
            </li>
            <li>
              <button @click="navigateTo('admin-portal')" class="text-slate-700 hover:text-[#38a5e6] font-bold transition-colors">
                {{ t.nav.adminPortal }}
              </button>
            </li>
            <li><span class="text-slate-400">{{ isRtl ? 'حجز المواعيد الفورية' : 'Instant Slot Reservation' }}</span></li>
            <li><span class="text-slate-400">{{ isRtl ? 'تذاكر الدخول الإلكترونية' : 'Digital QR Passes' }}</span></li>
          </ul>
        </div>
      </div>

      <!-- Copyright & Info -->
      <div class="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <div>
          {{ t.common.rights }}
        </div>
        <div class="flex items-center gap-4">
          <span class="text-slate-500 font-medium">
            {{ t.common.demoNotice }}
          </span>
          <button @click="toggleLocale" class="text-[#38a5e6] font-extrabold hover:underline">
            {{ isRtl ? 'English' : 'العربية' }}
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useLocalization } from '../../composables/useLocalization';
import { useBookings } from '../../composables/useBookings';
import { ShieldCheck, Lock } from 'lucide-vue-next';

const { t, isRtl, toggleLocale } = useLocalization();
const { navigateTo } = useBookings();
</script>
