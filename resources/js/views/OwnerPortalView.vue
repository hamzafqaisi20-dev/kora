<template>
  <div class="max-w-5xl mx-auto px-4 py-4 sm:py-6 space-y-6 pb-28 animate-fade-in">
    <!-- Top Welcome Banner (Clean White with Giant Rounded Corners) -->
    <div class="bg-white rounded-[38px] border border-slate-200/80 p-6 sm:p-8 relative overflow-hidden shadow-[0_10px_30px_rgba(25,50,90,0.06)]">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <span class="px-3.5 py-1 rounded-full bg-sky-50 text-[#258ecb] text-xs font-black border border-sky-200">
              {{ t.owner.portalBadge }}
            </span>
            <span class="text-xs text-slate-400 font-medium">• Live Operations Control</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {{ isRtl ? currentStadium.nameAr : currentStadium.nameEn }}
          </h1>
          <p class="text-xs text-slate-500 font-medium">
            {{ t.owner.welcome }}
          </p>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <button
            @click="activeTab = 'slotsManager'"
            class="px-4 py-2.5 rounded-full bg-sky-50 hover:bg-sky-100 text-[#258ecb] border border-sky-200 text-xs font-black transition-all flex items-center gap-2 cursor-pointer"
          >
            <Clock class="w-4 h-4" />
            <span>{{ t.owner.tabs.slotsManager }}</span>
          </button>

          <button
            @click="navigateTo('discovery')"
            class="px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
          >
            <Eye class="w-4 h-4 text-emerald-600" />
            <span>{{ isRtl ? 'معاينة صفحة الملعب' : 'Preview Listing' }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- KPIs Metric Cards in Soft White Rounded Squircles -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="p-5 rounded-[28px] bg-white border border-slate-200/80 shadow-[0_6px_20px_rgba(25,50,90,0.04)] space-y-2">
        <div class="flex items-center justify-between text-slate-400">
          <span class="text-xs font-bold text-slate-600">{{ t.owner.kpi.todayBookings }}</span>
          <Calendar class="w-4 h-4 text-[#38a5e6]" />
        </div>
        <div class="text-2xl sm:text-3xl font-black text-slate-900">
          {{ ownerBookings.length }}
        </div>
        <span class="text-[11px] text-emerald-600 font-black block">+3 مؤكدة اليوم</span>
      </div>

      <div class="p-5 rounded-[28px] bg-white border border-slate-200/80 shadow-[0_6px_20px_rgba(25,50,90,0.04)] space-y-2">
        <div class="flex items-center justify-between text-slate-400">
          <span class="text-xs font-bold text-slate-600">{{ t.owner.kpi.todayRevenue }}</span>
          <DollarSign class="w-4 h-4 text-emerald-600" />
        </div>
        <div class="text-2xl sm:text-3xl font-black text-[#258ecb]">
          {{ totalOwnerRevenue }} <span class="text-xs font-bold text-slate-400">{{ t.owner.kpi.sar }}</span>
        </div>
        <span class="text-[11px] text-slate-500 font-medium block">سداد إلكتروني مباشر</span>
      </div>

      <div class="p-5 rounded-[28px] bg-white border border-slate-200/80 shadow-[0_6px_20px_rgba(25,50,90,0.04)] space-y-2">
        <div class="flex items-center justify-between text-slate-400">
          <span class="text-xs font-bold text-slate-600">{{ t.owner.kpi.occupancy }}</span>
          <TrendingUp class="w-4 h-4 text-[#38a5e6]" />
        </div>
        <div class="text-2xl sm:text-3xl font-black text-slate-900">
          88%
        </div>
        <span class="text-[11px] text-[#38a5e6] font-black block">ساعات الذروة مكتملة</span>
      </div>

      <div class="p-5 rounded-[28px] bg-white border border-slate-200/80 shadow-[0_6px_20px_rgba(25,50,90,0.04)] space-y-2">
        <div class="flex items-center justify-between text-slate-400">
          <span class="text-xs font-bold text-slate-600">{{ t.owner.kpi.rating }}</span>
          <Star class="w-4 h-4 text-amber-500 fill-amber-500" />
        </div>
        <div class="text-2xl sm:text-3xl font-black text-slate-900">
          {{ currentStadium.rating }} <span class="text-xs text-slate-400 font-normal">/ 5.0</span>
        </div>
        <span class="text-[11px] text-amber-600 font-black block">{{ currentStadium.reviewsCount }} مراجعة معتمدة</span>
      </div>
    </div>

    <!-- Navigation Tabs Pills -->
    <div class="flex flex-wrap items-center gap-2">
      <button
        @click="activeTab = 'reservations'"
        :class="[
          'px-4 py-2.5 rounded-full text-xs font-black transition-all flex items-center gap-2 cursor-pointer',
          activeTab === 'reservations'
            ? 'bg-[#38a5e6] text-white shadow-md shadow-[#38a5e6]/25'
            : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
        ]"
      >
        <ListFilter class="w-4 h-4" />
        <span>{{ t.owner.tabs.reservations }}</span>
        <span class="px-2 py-0.5 rounded-full text-[10px]" :class="activeTab === 'reservations' ? 'bg-white text-[#258ecb]' : 'bg-slate-100 text-slate-600'">
          {{ ownerBookings.length }}
        </span>
      </button>

      <button
        @click="activeTab = 'slotsManager'"
        :class="[
          'px-4 py-2.5 rounded-full text-xs font-black transition-all flex items-center gap-2 cursor-pointer',
          activeTab === 'slotsManager'
            ? 'bg-[#38a5e6] text-white shadow-md shadow-[#38a5e6]/25'
            : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
        ]"
      >
        <Clock class="w-4 h-4" />
        <span>{{ t.owner.tabs.slotsManager }}</span>
      </button>

      <button
        @click="activeTab = 'venueProfile'"
        :class="[
          'px-4 py-2.5 rounded-full text-xs font-black transition-all flex items-center gap-2 cursor-pointer',
          activeTab === 'venueProfile'
            ? 'bg-[#38a5e6] text-white shadow-md shadow-[#38a5e6]/25'
            : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
        ]"
      >
        <Share2 class="w-4 h-4" />
        <span>{{ t.owner.tabs.venueProfile }}</span>
      </button>
    </div>

    <!-- TAB 1: RESERVATIONS TABLE -->
    <div v-if="activeTab === 'reservations'" class="space-y-4">
      <div class="bg-white rounded-[32px] border border-slate-200/80 overflow-hidden shadow-[0_8px_30px_rgba(25,50,90,0.05)]">
        <div class="p-5 px-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 class="text-base font-black text-slate-900 flex items-center gap-2">
            <CalendarCheck class="w-5 h-5 text-[#38a5e6]" />
            <span>{{ t.owner.bookingsTable.title }}</span>
          </h3>

          <div class="flex items-center gap-2">
            <input
              type="text"
              v-model="searchQuery"
              :placeholder="t.owner.bookingsTable.searchBooking"
              class="bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#38a5e6] w-52"
            />
            <select
              v-model="statusFilter"
              class="bg-slate-50 border border-slate-200 rounded-full px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-[#38a5e6] font-medium"
            >
              <option value="all">{{ t.owner.bookingsTable.statusFilter }}</option>
              <option value="confirmed">{{ t.owner.bookingsTable.confirmed }}</option>
              <option value="pending">{{ t.owner.bookingsTable.pending }}</option>
              <option value="completed">{{ t.owner.bookingsTable.completed }}</option>
              <option value="cancelled">{{ t.owner.bookingsTable.cancelled }}</option>
            </select>
          </div>
        </div>

        <!-- Table View -->
        <div class="overflow-x-auto">
          <table class="w-full text-start text-xs">
            <thead class="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-100">
              <tr>
                <th class="px-5 py-3.5">{{ t.owner.bookingsTable.tableHeaders.id }}</th>
                <th class="px-5 py-3.5">{{ t.owner.bookingsTable.tableHeaders.customer }}</th>
                <th class="px-5 py-3.5">{{ t.owner.bookingsTable.tableHeaders.sportField }}</th>
                <th class="px-5 py-3.5">{{ t.owner.bookingsTable.tableHeaders.dateTime }}</th>
                <th class="px-5 py-3.5">{{ t.owner.bookingsTable.tableHeaders.amount }}</th>
                <th class="px-5 py-3.5">{{ t.owner.bookingsTable.tableHeaders.paymentType }}</th>
                <th class="px-5 py-3.5">{{ t.owner.bookingsTable.tableHeaders.status }}</th>
                <th class="px-5 py-3.5 text-center">{{ t.owner.bookingsTable.tableHeaders.actions }}</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr
                v-for="b in filteredBookings"
                :key="b.id"
                class="hover:bg-sky-50/40 transition-colors"
              >
                <td class="px-5 py-4 font-mono font-black text-[#258ecb]">
                  {{ b.id }}
                </td>
                <td class="px-5 py-4">
                  <div class="font-extrabold text-slate-900">{{ b.customerName }}</div>
                  <div class="text-[11px] text-slate-400 font-mono">{{ b.customerPhone }}</div>
                </td>
                <td class="px-5 py-4 text-slate-700 font-semibold">
                  {{ b.field }}
                </td>
                <td class="px-5 py-4">
                  <div class="text-slate-800 font-bold">{{ b.date }}</div>
                  <div class="text-[11px] text-[#258ecb] font-black">{{ b.slotTime }}</div>
                </td>
                <td class="px-5 py-4">
                  <div class="font-black text-slate-900">{{ b.amount }} ريال</div>
                  <div class="text-[10px] text-slate-400">عربون: {{ b.paidDeposit }} ريال</div>
                </td>
                <td class="px-5 py-4">
                  <span class="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-mono text-[11px] font-bold">
                    {{ b.paymentMethod }}
                  </span>
                </td>
                <td class="px-5 py-4">
                  <span
                    :class="[
                      'px-3 py-1 rounded-full text-[10px] font-black uppercase inline-block',
                      b.status === 'confirmed'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : b.status === 'pending'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : b.status === 'completed'
                        ? 'bg-sky-50 text-[#258ecb] border border-sky-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    ]"
                  >
                    {{ getStatusLabel(b.status) }}
                  </span>
                </td>
                <td class="px-5 py-4 text-center">
                  <div class="flex items-center justify-center gap-1.5">
                    <button
                      v-if="b.status === 'pending'"
                      @click="b.status = 'confirmed'"
                      class="px-3 py-1 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[10px] shadow-xs cursor-pointer"
                    >
                      {{ t.owner.bookingsTable.approve }}
                    </button>
                    <button
                      v-if="b.status !== 'cancelled'"
                      @click="b.status = 'cancelled'"
                      class="px-3 py-1 rounded-full bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 font-bold text-[10px] cursor-pointer"
                    >
                      {{ t.owner.bookingsTable.cancel }}
                    </button>
                    <a
                      :href="`tel:${b.customerPhone}`"
                      class="w-8 h-8 rounded-full bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-600 flex items-center justify-center"
                      :title="t.owner.bookingsTable.callCustomer"
                    >
                      <Phone class="w-3.5 h-3.5" />
                    </a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- TAB 2: SCHEDULE & PRICING RULES -->
    <div v-else-if="activeTab === 'slotsManager'" class="bg-white rounded-[32px] border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-[0_8px_30px_rgba(25,50,90,0.05)]">
      <div>
        <h3 class="text-lg font-black text-slate-900 flex items-center gap-2">
          <Clock class="w-5 h-5 text-[#38a5e6]" />
          <span>{{ t.owner.schedule.title }}</span>
        </h3>
        <p class="text-xs text-slate-500 mt-0.5">
          {{ t.owner.schedule.subtitle }}
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div>
          <label class="block text-xs font-bold text-slate-600 mb-1.5">{{ t.owner.schedule.openTime }}</label>
          <input
            type="time"
            v-model="scheduleForm.open"
            class="w-full bg-[#f4f8fb] border border-slate-200 rounded-2xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#38a5e6] font-bold"
          />
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-600 mb-1.5">{{ t.owner.schedule.closeTime }}</label>
          <input
            type="time"
            v-model="scheduleForm.close"
            class="w-full bg-[#f4f8fb] border border-slate-200 rounded-2xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#38a5e6] font-bold"
          />
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-600 mb-1.5">{{ t.owner.schedule.peakStart }}</label>
          <input
            type="time"
            v-model="scheduleForm.peakStart"
            class="w-full bg-[#f4f8fb] border border-slate-200 rounded-2xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#38a5e6] font-bold"
          />
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-600 mb-1.5">{{ t.owner.schedule.standardPrice }}</label>
          <input
            type="number"
            v-model="scheduleForm.pricePerHour"
            class="w-full bg-[#f4f8fb] border border-slate-200 rounded-2xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#38a5e6] font-bold"
          />
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-600 mb-1.5">{{ t.owner.schedule.peakPrice }}</label>
          <input
            type="number"
            v-model="scheduleForm.peakPricePerHour"
            class="w-full bg-[#f4f8fb] border border-slate-200 rounded-2xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#38a5e6] font-bold"
          />
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-600 mb-1.5">{{ t.owner.schedule.slotDuration }}</label>
          <select
            v-model="scheduleForm.slotDuration"
            class="w-full bg-[#f4f8fb] border border-slate-200 rounded-2xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#38a5e6] font-bold"
          >
            <option value="60">{{ t.owner.schedule.mins60 }}</option>
            <option value="90">{{ t.owner.schedule.mins90 }}</option>
          </select>
        </div>
      </div>

      <div class="flex items-center gap-2 pt-2">
        <input type="checkbox" id="autoApprove" v-model="scheduleForm.autoApprove" class="w-4 h-4 rounded text-[#38a5e6]" />
        <label for="autoApprove" class="text-xs text-slate-700 font-bold cursor-pointer">
          {{ t.owner.schedule.autoApprove }}
        </label>
      </div>

      <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
        <button
          type="button"
          @click="saveSchedule"
          class="px-7 py-3.5 rounded-full bg-[#38a5e6] hover:bg-[#2897da] text-white font-black text-xs shadow-md shadow-[#38a5e6]/25 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Save class="w-4 h-4" />
          <span>{{ t.owner.schedule.saveSchedule }}</span>
        </button>

        <span v-if="scheduleToast" class="text-xs text-emerald-600 font-bold animate-pulse">
          ✓ {{ t.owner.schedule.savedSuccess }}
        </span>
      </div>
    </div>

    <!-- TAB 3: VENUE PROFILE & SOCIAL INTEGRATIONS -->
    <div v-else-if="activeTab === 'venueProfile'" class="bg-white rounded-[32px] border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-[0_8px_30px_rgba(25,50,90,0.05)]">
      <div>
        <h3 class="text-lg font-black text-slate-900 flex items-center gap-2">
          <Share2 class="w-5 h-5 text-[#38a5e6]" />
          <span>{{ t.owner.profile.title }}</span>
        </h3>
        <p class="text-xs text-slate-500 mt-0.5">
          {{ t.owner.profile.subtitle }}
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label class="block text-xs font-bold text-slate-600 mb-1.5">{{ t.owner.profile.venueNameAr }}</label>
          <input
            type="text"
            v-model="profileForm.nameAr"
            class="w-full bg-[#f4f8fb] border border-slate-200 rounded-2xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#38a5e6] font-bold"
          />
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-600 mb-1.5">{{ t.owner.profile.venueNameEn }}</label>
          <input
            type="text"
            v-model="profileForm.nameEn"
            class="w-full bg-[#f4f8fb] border border-slate-200 rounded-2xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#38a5e6] font-bold"
          />
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-600 mb-1.5">{{ t.owner.profile.phone }}</label>
          <div class="relative">
            <input
              type="text"
              v-model="profileForm.phone"
              class="w-full bg-[#f4f8fb] border border-slate-200 rounded-2xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#38a5e6] font-bold"
            />
            <Phone class="w-4 h-4 text-slate-400 absolute end-3 top-3" />
          </div>
        </div>

        <!-- Facebook Official Page URL Direct Integration -->
        <div>
          <div class="flex items-center justify-between mb-1.5">
            <label class="text-xs font-bold text-blue-700 flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>{{ t.owner.profile.facebookUrl }}</span>
            </label>
            <a
              :href="profileForm.facebookUrl"
              target="_blank"
              class="text-[11px] text-blue-600 hover:underline flex items-center gap-1 font-bold"
            >
              <span>{{ isRtl ? 'اختبار الرابط' : 'Test' }}</span>
              <ExternalLink class="w-3 h-3" />
            </a>
          </div>
          <input
            type="url"
            v-model="profileForm.facebookUrl"
            :placeholder="t.owner.profile.facebookPlaceholder"
            class="w-full bg-[#f4f8fb] border border-blue-200 rounded-2xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-400 font-bold"
          />
          <p class="text-[10px] text-slate-400 mt-1">
            {{ t.owner.profile.facebookHelp }}
          </p>
        </div>

        <div class="sm:col-span-2">
          <label class="block text-xs font-bold text-slate-600 mb-1.5">{{ t.owner.profile.descriptionAr }}</label>
          <textarea
            v-model="profileForm.descriptionAr"
            rows="3"
            class="w-full bg-[#f4f8fb] border border-slate-200 rounded-2xl p-3.5 text-xs text-slate-800 focus:outline-none focus:border-[#38a5e6]"
          ></textarea>
        </div>
      </div>

      <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
        <button
          type="button"
          @click="saveProfile"
          class="px-7 py-3.5 rounded-full bg-[#38a5e6] hover:bg-[#2897da] text-white font-black text-xs shadow-md shadow-[#38a5e6]/25 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Save class="w-4 h-4" />
          <span>{{ t.owner.profile.saveProfile }}</span>
        </button>

        <span v-if="profileToast" class="text-xs text-emerald-600 font-bold animate-pulse">
          ✓ {{ t.owner.profile.profileUpdated }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useLocalization } from '../composables/useLocalization';
import { useBookings } from '../composables/useBookings';
import {
  Clock,
  Eye,
  Calendar,
  DollarSign,
  TrendingUp,
  Star,
  ListFilter,
  Share2,
  CalendarCheck,
  Phone,
  Save,
  ExternalLink
} from 'lucide-vue-next';

const { t, isRtl } = useLocalization();
const { stadiums, ownerBookings, updateOwnerStadium, navigateTo } = useBookings();

const currentStadium = computed(() => stadiums.value[0] || {});
const activeTab = ref('reservations');

const searchQuery = ref('');
const statusFilter = ref('all');
const scheduleToast = ref(false);
const profileToast = ref(false);

const scheduleForm = ref({
  open: currentStadium.value.operatingHours?.open || '15:00',
  close: currentStadium.value.operatingHours?.close || '02:00',
  peakStart: currentStadium.value.operatingHours?.peakStart || '18:00',
  pricePerHour: currentStadium.value.pricePerHour || 280,
  peakPricePerHour: currentStadium.value.peakPricePerHour || 340,
  slotDuration: '60',
  autoApprove: true,
});

const profileForm = ref({
  nameAr: currentStadium.value.nameAr || '',
  nameEn: currentStadium.value.nameEn || '',
  phone: currentStadium.value.phone || '',
  facebookUrl: currentStadium.value.facebookUrl || '',
  descriptionAr: currentStadium.value.descriptionAr || '',
});

const totalOwnerRevenue = computed(() => {
  return ownerBookings.value
    .filter((b) => b.status === 'confirmed' || b.status === 'completed')
    .reduce((acc, curr) => acc + (curr.amount || 0), 0);
});

const filteredBookings = computed(() => {
  return ownerBookings.value.filter((b) => {
    const matchesSearch =
      b.customerName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      b.id.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesStatus =
      statusFilter.value === 'all' || b.status === statusFilter.value;
    return matchesSearch && matchesStatus;
  });
});

const saveSchedule = () => {
  updateOwnerStadium(currentStadium.value.id, {
    pricePerHour: Number(scheduleForm.value.pricePerHour),
    peakPricePerHour: Number(scheduleForm.value.peakPricePerHour),
    operatingHours: {
      open: scheduleForm.value.open,
      close: scheduleForm.value.close,
      peakStart: scheduleForm.value.peakStart,
    },
  });
  scheduleToast.value = true;
  setTimeout(() => (scheduleToast.value = false), 3000);
};

const saveProfile = () => {
  updateOwnerStadium(currentStadium.value.id, {
    nameAr: profileForm.value.nameAr,
    nameEn: profileForm.value.nameEn,
    phone: profileForm.value.phone,
    facebookUrl: profileForm.value.facebookUrl,
    descriptionAr: profileForm.value.descriptionAr,
  });
  profileToast.value = true;
  setTimeout(() => (profileToast.value = false), 3000);
};

const getStatusLabel = (status) => {
  const map = {
    confirmed: isRtl.value ? 'مؤكد' : 'Confirmed',
    pending: isRtl.value ? 'معلق' : 'Pending',
    completed: isRtl.value ? 'مكتمل' : 'Completed',
    cancelled: isRtl.value ? 'ملغي' : 'Cancelled',
  };
  return map[status] || status;
};
</script>
