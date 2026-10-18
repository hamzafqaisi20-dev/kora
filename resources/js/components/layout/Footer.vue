<template>
  <footer class="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
        <!-- Brand Info -->
        <div class="lg:col-span-2 space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 flex items-center justify-center">
              <div class="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <svg class="w-6 h-6 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="4" width="20" height="16" rx="3" />
                  <line x1="12" y1="4" x2="12" y2="20" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
            </div>
            <span class="text-2xl font-black text-white tracking-tight">{{ t.appName }}</span>
          </div>
          <p class="text-sm text-slate-400 leading-relaxed max-w-sm">
            {{ isRtl
              ? 'المنصة الرقمية المتكاملة لحجز الملاعب الرياضية واكتشاف أفضل المنشآت الرياضية القريبة منك، مع إدارة ذكية لأصحاب الملاعب وتأكيد حجز فوري.'
              : 'The comprehensive sports-tech marketplace connecting passionate athletes with premier venues. Real-time slot availability, instant bookings, and turnkey facility management.'
            }}
          </p>
          <div class="flex items-center gap-3 pt-2">
            <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <ShieldCheck class="w-4 h-4" />
              <span>{{ isRtl ? 'منشآت معتمدة وموثوقة' : 'Certified Venues' }}</span>
            </div>
            <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold">
              <Lock class="w-4 h-4" />
              <span>{{ isRtl ? 'دفع إلكتروني آمن 100%' : 'PCI-DSS Compliant' }}</span>
            </div>
          </div>
        </div>

        <!-- Sports Categories -->
        <div>
          <h4 class="text-sm font-bold text-white uppercase tracking-wider mb-4">
            {{ isRtl ? 'الرياضات والملاعب' : 'Sports & Venues' }}
          </h4>
          <ul class="space-y-2.5 text-sm">
            <li><button @click="navigateTo('discovery')" class="hover:text-emerald-400 transition-colors">{{ t.hero.football }} (5v5, 7v7, 11v11)</button></li>
            <li><button @click="navigateTo('discovery')" class="hover:text-emerald-400 transition-colors">{{ t.hero.padel }} (Panoramic Glass)</button></li>
            <li><button @click="navigateTo('discovery')" class="hover:text-emerald-400 transition-colors">{{ t.hero.tennis }} (Hard Acrylic Courts)</button></li>
            <li><button @click="navigateTo('discovery')" class="hover:text-emerald-400 transition-colors">{{ t.hero.basketball }} (Indoor Air-conditioned)</button></li>
          </ul>
        </div>

        <!-- Venue Owners & Portals -->
        <div>
          <h4 class="text-sm font-bold text-white uppercase tracking-wider mb-4">
            {{ isRtl ? 'أصحاب الملاعب والشركاء' : 'Venue Partners' }}
          </h4>
          <ul class="space-y-2.5 text-sm">
            <li>
              <button @click="navigateTo('owner-portal')" class="text-amber-400 font-medium hover:text-amber-300 transition-colors flex items-center gap-1.5">
                <span>{{ t.nav.ownerPortal }}</span>
                <span class="text-[10px] px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300">Live</span>
              </button>
            </li>
            <li>
              <button @click="navigateTo('admin-portal')" class="text-sky-400 font-medium hover:text-sky-300 transition-colors flex items-center gap-1.5">
                <span>{{ t.nav.adminPortal }}</span>
              </button>
            </li>
            <li><span class="text-slate-500">{{ isRtl ? 'إدارة الجداول والساعات' : 'Slot Scheduling' }}</span></li>
            <li><span class="text-slate-500">{{ isRtl ? 'تحصيل المبالغ والفواتير' : 'Automated Invoicing' }}</span></li>
          </ul>
        </div>

        <!-- Support & Legal -->
        <div>
          <h4 class="text-sm font-bold text-white uppercase tracking-wider mb-4">
            {{ isRtl ? 'المساعدة والموثوقية' : 'Support & Safety' }}
          </h4>
          <ul class="space-y-2.5 text-sm">
            <li><a href="#" class="hover:text-white transition-colors">{{ t.common.privacy }}</a></li>
            <li><a href="#" class="hover:text-white transition-colors">{{ t.common.terms }}</a></li>
            <li><a href="#" class="hover:text-white transition-colors">{{ t.common.support }}</a></li>
            <li>
              <span class="inline-flex items-center gap-1 text-xs text-emerald-400">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                {{ isRtl ? 'المنظومة تعمل بكفاءة 100%' : 'All Systems Operational' }}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          {{ t.common.rights }}
        </div>
        <div class="flex items-center gap-6">
          <span class="text-slate-400 font-medium">
            {{ t.common.demoNotice }}
          </span>
          <button @click="toggleLocale" class="text-emerald-400 font-bold hover:underline">
            {{ isRtl ? 'English Version' : 'النسخة العربية' }}
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
