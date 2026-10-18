<template>
  <div class="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
    <!-- Top Executive Header Banner -->
    <div class="bg-gradient-to-r from-sky-950/40 via-slate-900 to-slate-900 rounded-3xl border border-sky-500/30 p-6 sm:p-8 relative overflow-hidden shadow-2xl">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <span class="px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold border border-sky-500/30">
              {{ t.admin.portalBadge }}
            </span>
            <span class="text-xs text-slate-400 font-semibold">• Super Admin Authority</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-black text-white">
            {{ t.admin.title }}
          </h1>
          <p class="text-xs text-slate-300 max-w-xl">
            {{ t.admin.subtitle }}
          </p>
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="activeTab = 'stadiumApprovals'"
            class="px-4 py-2.5 rounded-xl bg-sky-500 text-slate-950 font-black text-xs shadow-lg shadow-sky-500/20 hover:bg-sky-400 transition-all flex items-center gap-2"
          >
            <ShieldAlert class="w-4 h-4" />
            <span>{{ t.admin.tabs.stadiumApprovals }}</span>
            <span class="px-1.5 py-0.5 rounded-full bg-slate-950 text-white text-[10px]">{{ pendingApprovalsCount }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Platform Financial KPIs -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="p-5 rounded-2xl bg-slate-900/90 border border-slate-800/80 space-y-2">
        <div class="flex items-center justify-between text-slate-400">
          <span class="text-xs font-semibold">{{ t.admin.kpi.totalGmv }}</span>
          <Activity class="w-4 h-4 text-emerald-400" />
        </div>
        <div class="text-2xl sm:text-3xl font-black text-white">
          482,900 <span class="text-xs font-semibold text-slate-400">SAR</span>
        </div>
        <span class="text-[11px] text-emerald-400 font-bold block">{{ t.admin.kpi.growth }}</span>
      </div>

      <div class="p-5 rounded-2xl bg-slate-900/90 border border-slate-800/80 space-y-2">
        <div class="flex items-center justify-between text-slate-400">
          <span class="text-xs font-semibold">{{ t.admin.kpi.platformRevenue }}</span>
          <DollarSign class="w-4 h-4 text-sky-400" />
        </div>
        <div class="text-2xl sm:text-3xl font-black text-sky-400">
          48,290 <span class="text-xs font-semibold text-slate-400">SAR</span>
        </div>
        <span class="text-[11px] text-slate-400 font-semibold block">صافي إيرادات الحجوزات</span>
      </div>

      <div class="p-5 rounded-2xl bg-slate-900/90 border border-slate-800/80 space-y-2">
        <div class="flex items-center justify-between text-slate-400">
          <span class="text-xs font-semibold">{{ t.admin.kpi.totalStadiums }}</span>
          <Building2 class="w-4 h-4 text-amber-400" />
        </div>
        <div class="text-2xl sm:text-3xl font-black text-white">
          {{ stadiums.length }}
        </div>
        <span class="text-[11px] text-amber-400 font-bold block">{{ pendingApprovalsCount }} بانتظار الاعتماد</span>
      </div>

      <div class="p-5 rounded-2xl bg-slate-900/90 border border-slate-800/80 space-y-2">
        <div class="flex items-center justify-between text-slate-400">
          <span class="text-xs font-semibold">{{ t.admin.kpi.activeUsers }}</span>
          <Users class="w-4 h-4 text-purple-400" />
        </div>
        <div class="text-2xl sm:text-3xl font-black text-white">
          12,450
        </div>
        <span class="text-[11px] text-purple-400 font-bold block">+340 لاعب هذا الأسبوع</span>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
      <button
        @click="activeTab = 'stadiumApprovals'"
        :class="[
          'px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2',
          activeTab === 'stadiumApprovals'
            ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
            : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white'
        ]"
      >
        <Building2 class="w-4 h-4" />
        <span>{{ t.admin.tabs.stadiumApprovals }}</span>
        <span class="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-950/40 font-mono">{{ pendingApprovalsCount }}</span>
      </button>

      <button
        @click="activeTab = 'users'"
        :class="[
          'px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2',
          activeTab === 'users'
            ? 'bg-purple-500 text-slate-950 shadow-md shadow-purple-500/20'
            : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white'
        ]"
      >
        <Users class="w-4 h-4" />
        <span>{{ t.admin.tabs.users }}</span>
      </button>

      <button
        @click="activeTab = 'settings'"
        :class="[
          'px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2',
          activeTab === 'settings'
            ? 'bg-slate-700 text-white'
            : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white'
        ]"
      >
        <Sliders class="w-4 h-4" />
        <span>{{ t.admin.tabs.systemSettings }}</span>
      </button>
    </div>

    <!-- TAB 1: STADIUM APPROVAL PIPELINE -->
    <div v-if="activeTab === 'stadiumApprovals'" class="space-y-4">
      <div class="bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div class="p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 class="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck class="w-5 h-5 text-sky-400" />
              <span>{{ t.admin.approvals.title }}</span>
            </h3>
            <p class="text-xs text-slate-400 mt-0.5">
              {{ t.admin.approvals.subtitle }}
            </p>
          </div>
          <span class="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
            {{ pendingApprovalsCount }} {{ isRtl ? 'طلبات جديدة' : 'Pending' }}
          </span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-start text-xs">
            <thead class="bg-slate-950/80 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th class="px-5 py-3.5">{{ t.admin.approvals.table.venue }}</th>
                <th class="px-5 py-3.5">{{ t.admin.approvals.table.location }}</th>
                <th class="px-5 py-3.5">{{ t.admin.approvals.table.sportTypes }}</th>
                <th class="px-5 py-3.5">{{ t.admin.approvals.table.license }}</th>
                <th class="px-5 py-3.5">{{ t.admin.approvals.table.facebook }}</th>
                <th class="px-5 py-3.5">{{ t.admin.approvals.table.submittedDate }}</th>
                <th class="px-5 py-3.5 text-center">{{ t.admin.approvals.table.actions }}</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800/80">
              <tr
                v-for="app in adminApprovals"
                :key="app.id"
                class="hover:bg-slate-800/40 transition-colors"
              >
                <td class="px-5 py-4">
                  <div class="font-bold text-white">{{ isRtl ? app.venueNameAr : app.venueNameEn }}</div>
                  <div class="text-[11px] text-slate-400 font-semibold">{{ app.ownerName }}</div>
                </td>
                <td class="px-5 py-4 text-slate-300">
                  {{ app.city }} • {{ app.district }}
                </td>
                <td class="px-5 py-4">
                  <span class="px-2.5 py-1 rounded-md bg-slate-800 text-emerald-400 font-bold text-[11px]">
                    {{ app.sportTypes }}
                  </span>
                </td>
                <td class="px-5 py-4 font-mono text-slate-400">
                  {{ app.licenseNumber }}
                </td>
                <td class="px-5 py-4">
                  <a
                    :href="app.facebookUrl"
                    target="_blank"
                    class="text-blue-400 hover:underline inline-flex items-center gap-1 font-semibold"
                  >
                    <span>فيسبوك</span>
                    <ExternalLink class="w-3 h-3" />
                  </a>
                </td>
                <td class="px-5 py-4 text-slate-400">
                  {{ app.submittedDate }}
                </td>
                <td class="px-5 py-4 text-center">
                  <div v-if="app.status === 'pending'" class="flex items-center justify-center gap-2">
                    <button
                      @click="onApprove(app.id)"
                      class="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition-all flex items-center gap-1"
                    >
                      <Check class="w-3.5 h-3.5" />
                      <span>{{ t.admin.approvals.approve }}</span>
                    </button>
                    <button
                      @click="onReject(app.id)"
                      class="px-3 py-1.5 rounded-xl bg-red-950/60 hover:bg-red-900 border border-red-500/40 text-red-300 font-semibold text-xs transition-all flex items-center gap-1"
                    >
                      <X class="w-3.5 h-3.5" />
                      <span>{{ t.admin.approvals.reject }}</span>
                    </button>
                  </div>
                  <div v-else>
                    <span
                      :class="[
                        'px-2.5 py-1 rounded-full text-[10px] font-bold uppercase',
                        app.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-red-500/20 text-red-400'
                      ]"
                    >
                      {{ app.status === 'approved' ? 'تم الاعتماد والنشر' : 'مرفوض' }}
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- TAB 2: USERS & VENUE OPERATORS -->
    <div v-else-if="activeTab === 'users'" class="bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
      <div class="p-5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 class="text-base font-bold text-white flex items-center gap-2">
            <Users class="w-5 h-5 text-purple-400" />
            <span>{{ t.admin.usersManagement.title }}</span>
          </h3>
        </div>

        <input
          type="text"
          v-model="userSearch"
          :placeholder="t.admin.usersManagement.search"
          class="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 w-64"
        />
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-start text-xs">
          <thead class="bg-slate-950/80 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
            <tr>
              <th class="px-5 py-3.5">الاسم</th>
              <th class="px-5 py-3.5">الدور</th>
              <th class="px-5 py-3.5">البريد الإلكتروني</th>
              <th class="px-5 py-3.5">رقم الهاتف</th>
              <th class="px-5 py-3.5">تاريخ التسجيل</th>
              <th class="px-5 py-3.5">الحالة</th>
              <th class="px-5 py-3.5 text-center">إجراءات</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800/80">
            <tr
              v-for="u in filteredUsers"
              :key="u.id"
              class="hover:bg-slate-800/40 transition-colors"
            >
              <td class="px-5 py-4 font-bold text-white">
                {{ u.name }}
              </td>
              <td class="px-5 py-4">
                <span
                  :class="[
                    'px-2.5 py-0.5 rounded-md font-bold text-[10px] uppercase',
                    u.role === 'admin'
                      ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40'
                      : u.role === 'owner'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  ]"
                >
                  {{ u.role === 'owner' ? t.admin.usersManagement.owner : u.role === 'admin' ? t.admin.usersManagement.admin : t.admin.usersManagement.player }}
                </span>
              </td>
              <td class="px-5 py-4 text-slate-300 font-mono">
                {{ u.email }}
              </td>
              <td class="px-5 py-4 text-slate-400 font-mono">
                {{ u.phone }}
              </td>
              <td class="px-5 py-4 text-slate-400">
                {{ u.joinedDate }}
              </td>
              <td class="px-5 py-4">
                <span class="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  {{ t.admin.usersManagement.statusActive }}
                </span>
              </td>
              <td class="px-5 py-4 text-center">
                <button
                  @click="toggleUserStatus(u)"
                  class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-[10px]"
                >
                  {{ t.admin.usersManagement.toggleStatus }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- TAB 3: SYSTEM SETTINGS -->
    <div v-else-if="activeTab === 'settings'" class="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6">
      <div>
        <h3 class="text-lg font-bold text-white flex items-center gap-2">
          <Sliders class="w-5 h-5 text-emerald-400" />
          <span>{{ t.admin.settings.title }}</span>
        </h3>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div>
          <label class="block text-xs font-semibold text-slate-400 mb-1.5">{{ t.admin.settings.commissionRate }}</label>
          <input
            type="number"
            v-model="settingsForm.commission"
            class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-400 mb-1.5">{{ t.admin.settings.depositPercentage }}</label>
          <input
            type="number"
            v-model="settingsForm.deposit"
            class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-400 mb-1.5">{{ t.admin.settings.currency }}</label>
          <select
            v-model="settingsForm.currency"
            class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="SAR">{{ t.admin.settings.sarCurrency }}</option>
            <option value="USD">US Dollar (USD)</option>
            <option value="AED">UAE Dirham (AED)</option>
          </select>
        </div>
      </div>

      <div class="space-y-3 pt-2">
        <label class="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
          <input type="checkbox" v-model="settingsForm.whatsapp" class="w-4 h-4 rounded text-emerald-500 bg-slate-950 border-slate-800" />
          <span>{{ t.admin.settings.enableWhatsapp }}</span>
        </label>

        <label class="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
          <input type="checkbox" v-model="settingsForm.sms" class="w-4 h-4 rounded text-emerald-500 bg-slate-950 border-slate-800" />
          <span>{{ t.admin.settings.enableSms }}</span>
        </label>
      </div>

      <div class="pt-4 border-t border-slate-800 flex items-center justify-between">
        <button
          type="button"
          @click="saveSettings"
          class="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Save class="w-4 h-4" />
          <span>{{ t.admin.settings.saveSettings }}</span>
        </button>

        <span v-if="savedToast" class="text-xs text-emerald-400 font-bold animate-pulse">
          ✓ {{ t.admin.settings.savedToast }}
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
  ShieldAlert,
  Activity,
  DollarSign,
  Building2,
  Users,
  Sliders,
  ShieldCheck,
  Check,
  X,
  ExternalLink,
  Save
} from 'lucide-vue-next';

const { t, isRtl } = useLocalization();
const { stadiums, adminApprovals, adminUsers, approveStadiumApplication, rejectStadiumApplication } = useBookings();

const activeTab = ref('stadiumApprovals'); // 'stadiumApprovals' | 'users' | 'settings'
const userSearch = ref('');
const savedToast = ref(false);

const settingsForm = ref({
  commission: 10,
  deposit: 30,
  currency: 'SAR',
  whatsapp: true,
  sms: true,
});

const pendingApprovalsCount = computed(() => {
  return adminApprovals.value.filter((a) => a.status === 'pending').length;
});

const filteredUsers = computed(() => {
  if (!userSearch.value) return adminUsers.value;
  return adminUsers.value.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearch.value.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.value.toLowerCase())
  );
});

const onApprove = (id) => {
  approveStadiumApplication(id);
};

const onReject = (id) => {
  rejectStadiumApplication(id);
};

const toggleUserStatus = (u) => {
  u.status = u.status === 'active' ? 'suspended' : 'active';
};

const saveSettings = () => {
  savedToast.value = true;
  setTimeout(() => (savedToast.value = false), 3000);
};
</script>
