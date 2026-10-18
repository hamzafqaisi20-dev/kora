<template>
  <div class="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
    <!-- Top Welcome Banner -->
    <div class="bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 rounded-3xl border border-amber-500/30 p-6 sm:p-8 relative overflow-hidden shadow-2xl">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <span class="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
              {{ t.owner.portalBadge }}
            </span>
            <span class="text-xs text-slate-400 font-semibold">• Live Operations Control</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-black text-white">
            {{ isRtl ? currentStadium.nameAr : currentStadium.nameEn }}
          </h1>
          <p class="text-xs text-slate-300">
            {{ t.owner.welcome }}
          </p>
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="activeTab = 'slotsManager'"
            class="px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all flex items-center gap-2"
          >
            <Clock class="w-4 h-4" />
            <span>{{ t.owner.tabs.slotsManager }}</span>
          </button>

          <button
            @click="navigateTo('discovery')"
            class="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-2"
          >
            <Eye class="w-4 h-4 text-emerald-400" />
            <span>{{ isRtl ? 'معاينة صفحة الملعب الحية' : 'Preview Live Listing' }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- KPIs Metric Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="p-5 rounded-2xl bg-slate-900/90 border border-slate-800/80 space-y-2">
        <div class="flex items-center justify-between text-slate-400">
          <span class="text-xs font-semibold">{{ t.owner.kpi.todayBookings }}</span>
          <Calendar class="w-4 h-4 text-emerald-400" />
        </div>
        <div class="text-2xl sm:text-3xl font-black text-white">
          {{ ownerBookings.length }}
        </div>
        <span class="text-[11px] text-emerald-400 font-bold block">+3 مؤكدة اليوم</span>
      </div>

      <div class="p-5 rounded-2xl bg-slate-900/90 border border-slate-800/80 space-y-2">
        <div class="flex items-center justify-between text-slate-400">
          <span class="text-xs font-semibold">{{ t.owner.kpi.todayRevenue }}</span>
          <DollarSign class="w-4 h-4 text-amber-400" />
        </div>
        <div class="text-2xl sm:text-3xl font-black text-emerald-400">
          {{ totalOwnerRevenue }} <span class="text-xs font-semibold text-slate-400">{{ t.owner.kpi.sar }}</span>
        </div>
        <span class="text-[11px] text-slate-400 font-semibold block">سداد إلكتروني مباشر</span>
      </div>

      <div class="p-5 rounded-2xl bg-slate-900/90 border border-slate-800/80 space-y-2">
        <div class="flex items-center justify-between text-slate-400">
          <span class="text-xs font-semibold">{{ t.owner.kpi.occupancy }}</span>
          <TrendingUp class="w-4 h-4 text-sky-400" />
        </div>
        <div class="text-2xl sm:text-3xl font-black text-white">
          88%
        </div>
        <span class="text-[11px] text-sky-400 font-bold block">ساعات الذروة مكتملة</span>
      </div>

      <div class="p-5 rounded-2xl bg-slate-900/90 border border-slate-800/80 space-y-2">
        <div class="flex items-center justify-between text-slate-400">
          <span class="text-xs font-semibold">{{ t.owner.kpi.rating }}</span>
          <Star class="w-4 h-4 text-amber-400 fill-current" />
        </div>
        <div class="text-2xl sm:text-3xl font-black text-white">
          {{ currentStadium.rating }} <span class="text-xs text-slate-400 font-normal">/ 5.0</span>
        </div>
        <span class="text-[11px] text-amber-400 font-bold block">{{ currentStadium.reviewsCount }} مراجعة معتمدة</span>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
      <button
        @click="activeTab = 'reservations'"
        :class="[
          'px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2',
          activeTab === 'reservations'
            ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
            : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white'
        ]"
      >
        <ListFilter class="w-4 h-4" />
        <span>{{ t.owner.tabs.reservations }}</span>
        <span class="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-950/40 font-mono">{{ ownerBookings.length }}</span>
      </button>

      <button
        @click="activeTab = 'slotsManager'"
        :class="[
          'px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2',
          activeTab === 'slotsManager'
            ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
            : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white'
        ]"
      >
        <Clock class="w-4 h-4" />
        <span>{{ t.owner.tabs.slotsManager }}</span>
      </button>

      <button
        @click="activeTab = 'venueProfile'"
        :class="[
          'px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2',
          activeTab === 'venueProfile'
            ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
            : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white'
        ]"
      >
        <Share2 class="w-4 h-4" />
        <span>{{ t.owner.tabs.venueProfile }}</span>
      </button>
    </div>

    <!-- TAB 1: RESERVATIONS TABLE -->
    <div v-if="activeTab === 'reservations'" class="space-y-4">
      <div class="bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div class="p-5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 class="text-base font-bold text-white flex items-center gap-2">
            <CalendarCheck class="w-5 h-5 text-emerald-400" />
            <span>{{ t.owner.bookingsTable.title }}</span>
          </h3>

          <div class="flex items-center gap-3">
            <input
              type="text"
              v-model="searchQuery"
              :placeholder="t.owner.bookingsTable.searchBooking"
              class="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 w-56"
            />
            <select
              v-model="statusFilter"
              class="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
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
            <thead class="bg-slate-950/80 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
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
            <tbody class="divide-y divide-slate-800/80">
              <tr
                v-for="b in filteredBookings"
                :key="b.id"
                class="hover:bg-slate-800/40 transition-colors"
              >
                <td class="px-5 py-4 font-mono font-bold text-emerald-400">
                  {{ b.id }}
                </td>
                <td class="px-5 py-4">
                  <div class="font-bold text-white">{{ b.customerName }}</div>
                  <div class="text-[11px] text-slate-400 font-mono">{{ b.customerPhone }}</div>
                </td>
                <td class="px-5 py-4 text-slate-300 font-medium">
                  {{ b.field }}
                </td>
                <td class="px-5 py-4">
                  <div class="text-white font-semibold">{{ b.date }}</div>
                  <div class="text-[11px] text-emerald-400 font-bold">{{ b.slotTime }}</div>
                </td>
                <td class="px-5 py-4">
                  <div class="font-bold text-white">{{ b.amount }} ريال</div>
                  <div class="text-[10px] text-slate-400">عربون: {{ b.paidDeposit }} ريال</div>
                </td>
                <td class="px-5 py-4">
                  <span class="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-mono text-[11px]">
                    {{ b.paymentMethod }}
                  </span>
                </td>
                <td class="px-5 py-4">
                  <span
                    :class="[
                      'px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase',
                      b.status === 'confirmed'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : b.status === 'pending'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : b.status === 'completed'
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
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
                      class="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px]"
                    >
                      {{ t.owner.bookingsTable.approve }}
                    </button>
                    <button
                      v-if="b.status !== 'cancelled'"
                      @click="b.status = 'cancelled'"
                      class="px-2.5 py-1 rounded-lg bg-red-950/60 hover:bg-red-900 border border-red-500/40 text-red-300 font-semibold text-[10px]"
                    >
                      {{ t.owner.bookingsTable.cancel }}
                    </button>
                    <a
                      :href="`tel:${b.customerPhone}`"
                      class="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
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
    <div v-else-if="activeTab === 'slotsManager'" class="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6">
      <div>
        <h3 class="text-lg font-bold text-white flex items-center gap-2">
          <Clock class="w-5 h-5 text-amber-400" />
          <span>{{ t.owner.schedule.title }}</span>
        </h3>
        <p class="text-xs text-slate-400 mt-1">
          {{ t.owner.schedule.subtitle }}
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div>
          <label class="block text-xs font-semibold text-slate-400 mb-1.5">{{ t.owner.schedule.openTime }}</label>
          <input
            type="time"
            v-model="scheduleForm.open"
            class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-400 mb-1.5">{{ t.owner.schedule.closeTime }}</label>
          <input
            type="time"
            v-model="scheduleForm.close"
            class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-400 mb-1.5">{{ t.owner.schedule.peakStart }}</label>
          <input
            type="time"
            v-model="scheduleForm.peakStart"
            class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-400 mb-1.5">{{ t.owner.schedule.standardPrice }}</label>
          <input
            type="number"
            v-model="scheduleForm.pricePerHour"
            class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-400 mb-1.5">{{ t.owner.schedule.peakPrice }}</label>
          <input
            type="number"
            v-model="scheduleForm.peakPricePerHour"
            class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-400 mb-1.5">{{ t.owner.schedule.slotDuration }}</label>
          <select
            v-model="scheduleForm.slotDuration"
            class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
          >
            <option value="60">{{ t.owner.schedule.mins60 }}</option>
            <option value="90">{{ t.owner.schedule.mins90 }}</option>
          </select>
        </div>
      </div>

      <div class="flex items-center gap-2 pt-2">
        <input type="checkbox" id="autoApprove" v-model="scheduleForm.autoApprove" class="w-4 h-4 rounded text-amber-500 bg-slate-950 border-slate-800" />
        <label for="autoApprove" class="text-xs text-slate-300 font-medium cursor-pointer">
          {{ t.owner.schedule.autoApprove }}
        </label>
      </div>

      <div class="pt-4 border-t border-slate-800 flex items-center justify-between">
        <button
          type="button"
          @click="saveSchedule"
          class="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Save class="w-4 h-4" />
          <span>{{ t.owner.schedule.saveSchedule }}</span>
        </button>

        <span v-if="scheduleToast" class="text-xs text-emerald-400 font-bold animate-pulse">
          ✓ {{ t.owner.schedule.savedSuccess }}
        </span>
      </div>
    </div>

    <!-- TAB 3: VENUE PROFILE & SOCIAL INTEGRATIONS -->
    <div v-else-if="activeTab === 'venueProfile'" class="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6">
      <div>
        <h3 class="text-lg font-bold text-white flex items-center gap-2">
          <Share2 class="w-5 h-5 text-sky-400" />
          <span>{{ t.owner.profile.title }}</span>
        </h3>
        <p class="text-xs text-slate-400 mt-1">
          {{ t.owner.profile.subtitle }}
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label class="block text-xs font-semibold text-slate-400 mb-1.5">{{ t.owner.profile.venueNameAr }}</label>
          <input
            type="text"
            v-model="profileForm.nameAr"
            class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-sky-400"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-400 mb-1.5">{{ t.owner.profile.venueNameEn }}</label>
          <input
            type="text"
            v-model="profileForm.nameEn"
            class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-sky-400"
          />
        </div>

        <!-- Phone Number -->
        <div>
          <label class="block text-xs font-semibold text-slate-400 mb-1.5">{{ t.owner.profile.phone }}</label>
          <div class="relative">
            <input
              type="text"
              v-model="profileForm.phone"
              class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-sky-400"
            />
            <Phone class="w-4 h-4 text-slate-500 absolute end-3 top-3" />
          </div>
        </div>

        <!-- Facebook Official Page URL Direct Integration -->
        <div>
          <div class="flex items-center justify-between mb-1.5">
            <label class="text-xs font-semibold text-blue-400 flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>{{ t.owner.profile.facebookUrl }}</span>
            </label>
            <a
              :href="profileForm.facebookUrl"
              target="_blank"
              class="text-[11px] text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>{{ isRtl ? 'اختبار الرابط' : 'Test Link' }}</span>
              <ExternalLink class="w-3 h-3" />
            </a>
          </div>
          <input
            type="url"
            v-model="profileForm.facebookUrl"
            :placeholder="t.owner.profile.facebookPlaceholder"
            class="w-full bg-slate-950 border border-blue-500/40 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-400"
          />
          <p class="text-[10px] text-slate-400 mt-1">
            {{ t.owner.profile.facebookHelp }}
          </p>
        </div>

        <div class="sm:col-span-2">
          <label class="block text-xs font-semibold text-slate-400 mb-1.5">{{ t.owner.profile.descriptionAr }}</label>
          <textarea
            v-model="profileForm.descriptionAr"
            rows="3"
            class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-sky-400"
          ></textarea>
        </div>
      </div>

      <div class="pt-4 border-t border-slate-800 flex items-center justify-between">
        <button
          type="button"
          @click="saveProfile"
          class="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs shadow-lg shadow-sky-500/20 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Save class="w-4 h-4" />
          <span>{{ t.owner.profile.saveProfile }}</span>
        </button>

        <span v-if="profileToast" class="text-xs text-emerald-400 font-bold animate-pulse">
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
const activeTab = ref('reservations'); // 'reservations' | 'slotsManager' | 'venueProfile'

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
