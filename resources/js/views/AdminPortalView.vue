<template>
  <div class="max-w-5xl mx-auto px-4 py-4 sm:py-6 space-y-6 pb-28 animate-fade-in">
    <!-- Top Executive Header Banner -->
    <div class="bg-white rounded-[38px] border border-slate-200/80 p-6 sm:p-8 relative overflow-hidden shadow-[0_10px_30px_rgba(25,50,90,0.06)]">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <span class="px-3.5 py-1 rounded-full bg-sky-50 text-[#258ecb] text-xs font-black border border-sky-200">
              {{ t.admin.portalBadge }}
            </span>
            <span class="text-xs text-slate-400 font-medium">• Super Admin Authority</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {{ t.admin.title }}
          </h1>
          <p class="text-xs text-slate-500 font-medium max-w-xl">
            {{ t.admin.subtitle }}
          </p>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <button
            @click="activeTab = 'stadiumApprovals'"
            class="px-5 py-2.5 rounded-full bg-[#38a5e6] hover:bg-[#2897da] text-white font-black text-xs shadow-md shadow-[#38a5e6]/25 transition-all flex items-center gap-2 cursor-pointer"
          >
            <ShieldAlert class="w-4 h-4" />
            <span>{{ t.admin.tabs.stadiumApprovals }}</span>
            <span class="px-2 py-0.5 rounded-full bg-white text-[#258ecb] text-[10px] font-mono">{{ pendingApprovalsCount }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Platform Financial KPIs in Soft White Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="p-5 rounded-[28px] bg-white border border-slate-200/80 shadow-[0_6px_20px_rgba(25,50,90,0.04)] space-y-2">
        <div class="flex items-center justify-between text-slate-400">
          <span class="text-xs font-bold text-slate-600">{{ t.admin.kpi.totalGmv }}</span>
          <Activity class="w-4 h-4 text-emerald-600" />
        </div>
        <div class="text-2xl sm:text-3xl font-black text-slate-900">
          482,900 <span class="text-xs font-bold text-slate-400">SAR</span>
        </div>
        <span class="text-[11px] text-emerald-600 font-black block">{{ t.admin.kpi.growth }}</span>
      </div>

      <div class="p-5 rounded-[28px] bg-white border border-slate-200/80 shadow-[0_6px_20px_rgba(25,50,90,0.04)] space-y-2">
        <div class="flex items-center justify-between text-slate-400">
          <span class="text-xs font-bold text-slate-600">{{ t.admin.kpi.platformRevenue }}</span>
          <DollarSign class="w-4 h-4 text-[#38a5e6]" />
        </div>
        <div class="text-2xl sm:text-3xl font-black text-[#258ecb]">
          48,290 <span class="text-xs font-bold text-slate-400">SAR</span>
        </div>
        <span class="text-[11px] text-slate-500 font-medium block">صافي إيرادات الحجوزات</span>
      </div>

      <div class="p-5 rounded-[28px] bg-white border border-slate-200/80 shadow-[0_6px_20px_rgba(25,50,90,0.04)] space-y-2">
        <div class="flex items-center justify-between text-slate-400">
          <span class="text-xs font-bold text-slate-600">{{ t.admin.kpi.totalStadiums }}</span>
          <Building2 class="w-4 h-4 text-amber-500" />
        </div>
        <div class="text-2xl sm:text-3xl font-black text-slate-900">
          {{ stadiums.length }}
        </div>
        <span class="text-[11px] text-amber-600 font-black block">{{ pendingApprovalsCount }} بانتظار الاعتماد</span>
      </div>

      <div class="p-5 rounded-[28px] bg-white border border-slate-200/80 shadow-[0_6px_20px_rgba(25,50,90,0.04)] space-y-2">
        <div class="flex items-center justify-between text-slate-400">
          <span class="text-xs font-bold text-slate-600">{{ t.admin.kpi.activeUsers }}</span>
          <Users class="w-4 h-4 text-purple-600" />
        </div>
        <div class="text-2xl sm:text-3xl font-black text-slate-900">
          12,450
        </div>
        <span class="text-[11px] text-purple-600 font-black block">+340 لاعب هذا الأسبوع</span>
      </div>
    </div>

    <!-- Navigation Tabs Pills -->
    <div class="flex flex-wrap items-center gap-2">
      <button
        @click="activeTab = 'stadiumApprovals'"
        :class="[
          'px-4 py-2.5 rounded-full text-xs font-black transition-all flex items-center gap-2 cursor-pointer',
          activeTab === 'stadiumApprovals'
            ? 'bg-[#38a5e6] text-white shadow-md shadow-[#38a5e6]/25'
            : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
        ]"
      >
        <Building2 class="w-4 h-4" />
        <span>{{ t.admin.tabs.stadiumApprovals }}</span>
        <span class="px-2 py-0.5 rounded-full text-[10px]" :class="activeTab === 'stadiumApprovals' ? 'bg-white text-[#258ecb]' : 'bg-slate-100 text-slate-600'">
          {{ pendingApprovalsCount }}
        </span>
      </button>

      <button
        @click="activeTab = 'users'"
        :class="[
          'px-4 py-2.5 rounded-full text-xs font-black transition-all flex items-center gap-2 cursor-pointer',
          activeTab === 'users'
            ? 'bg-[#38a5e6] text-white shadow-md shadow-[#38a5e6]/25'
            : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
        ]"
      >
        <Users class="w-4 h-4" />
        <span>{{ t.admin.tabs.users }}</span>
      </button>

      <button
        @click="activeTab = 'settings'"
        :class="[
          'px-4 py-2.5 rounded-full text-xs font-black transition-all flex items-center gap-2 cursor-pointer',
          activeTab === 'settings'
            ? 'bg-[#38a5e6] text-white shadow-md shadow-[#38a5e6]/25'
            : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
        ]"
      >
        <Sliders class="w-4 h-4" />
        <span>{{ t.admin.tabs.systemSettings }}</span>
      </button>
    </div>

    <!-- TAB 1: STADIUM APPROVAL PIPELINE -->
    <div v-if="activeTab === 'stadiumApprovals'" class="space-y-4">
      <div class="bg-white rounded-[32px] border border-slate-200/80 overflow-hidden shadow-[0_8px_30px_rgba(25,50,90,0.05)]">
        <div class="p-5 px-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 class="text-base font-black text-slate-900 flex items-center gap-2">
              <ShieldCheck class="w-5 h-5 text-[#38a5e6]" />
              <span>{{ t.admin.approvals.title }}</span>
            </h3>
            <p class="text-xs text-slate-500 mt-0.5">
              {{ t.admin.approvals.subtitle }}
            </p>
          </div>
          <span class="px-3.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-black">
            {{ pendingApprovalsCount }} {{ isRtl ? 'طلبات جديدة' : 'Pending' }}
          </span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-start text-xs">
            <thead class="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-100">
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
            <tbody class="divide-y divide-slate-100">
              <tr
                v-for="app in adminApprovals"
                :key="app.id"
                class="hover:bg-sky-50/40 transition-colors"
              >
                <td class="px-5 py-4">
                  <div class="font-black text-slate-900">{{ isRtl ? app.venueNameAr : app.venueNameEn }}</div>
                  <div class="text-[11px] text-slate-500 font-bold">{{ app.ownerName }}</div>
                </td>
                <td class="px-5 py-4 text-slate-700 font-medium">
                  {{ app.city }} • {{ app.district }}
                </td>
                <td class="px-5 py-4">
                  <span class="px-2.5 py-1 rounded-full bg-sky-50 text-[#258ecb] font-bold text-[11px]">
                    {{ app.sportTypes }}
                  </span>
                </td>
                <td class="px-5 py-4 font-mono text-slate-500">
                  {{ app.licenseNumber }}
                </td>
                <td class="px-5 py-4">
                  <a
                    :href="app.facebookUrl"
                    target="_blank"
                    class="text-blue-600 hover:underline inline-flex items-center gap-1 font-bold"
                  >
                    <span>فيسبوك</span>
                    <ExternalLink class="w-3 h-3" />
                  </a>
                </td>
                <td class="px-5 py-4 text-slate-500">
                  {{ app.submittedDate }}
                </td>
                <td class="px-5 py-4 text-center">
                  <div v-if="app.status === 'pending'" class="flex items-center justify-center gap-2">
                    <button
                      @click="onApprove(app.id)"
                      class="px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-xs transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Check class="w-3.5 h-3.5" />
                      <span>{{ t.admin.approvals.approve }}</span>
                    </button>
                    <button
                      @click="onReject(app.id)"
                      class="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 font-bold text-xs transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <X class="w-3.5 h-3.5" />
                      <span>{{ t.admin.approvals.reject }}</span>
                    </button>
                  </div>
                  <div v-else>
                    <span
                      :class="[
                        'px-3 py-1 rounded-full text-[10px] font-black uppercase inline-block',
                        app.status === 'approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700'
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

    <!-- TAB 2: USERS & OPERATORS -->
    <div v-else-if="activeTab === 'users'" class="bg-white rounded-[32px] border border-slate-200/80 overflow-hidden shadow-[0_8px_30px_rgba(25,50,90,0.05)]">
      <div class="p-5 px-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 class="text-base font-black text-slate-900 flex items-center gap-2">
          <Users class="w-5 h-5 text-[#38a5e6]" />
          <span>{{ t.admin.usersManagement.title }}</span>
        </h3>

        <input
          type="text"
          v-model="userSearch"
          :placeholder="t.admin.usersManagement.search"
          class="bg-[#f4f8fb] border border-slate-200 rounded-full px-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#38a5e6] w-60"
        />
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-start text-xs">
          <thead class="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-100">
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
          <tbody class="divide-y divide-slate-100">
            <tr
              v-for="u in filteredUsers"
              :key="u.id"
              class="hover:bg-sky-50/40 transition-colors"
            >
              <td class="px-5 py-4 font-black text-slate-900">
                {{ u.name }}
              </td>
              <td class="px-5 py-4">
                <span
                  :class="[
                    'px-2.5 py-0.5 rounded-full font-black text-[10px] uppercase',
                    u.role === 'admin'
                      ? 'bg-purple-50 text-purple-700 border border-purple-200'
                      : u.role === 'owner'
                      ? 'bg-sky-50 text-[#258ecb] border border-sky-200'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  ]"
                >
                  {{ u.role === 'owner' ? t.admin.usersManagement.owner : u.role === 'admin' ? t.admin.usersManagement.admin : t.admin.usersManagement.player }}
                </span>
              </td>
              <td class="px-5 py-4 text-slate-600 font-mono">
                {{ u.email }}
              </td>
              <td class="px-5 py-4 text-slate-500 font-mono">
                {{ u.phone }}
              </td>
              <td class="px-5 py-4 text-slate-500">
                {{ u.joinedDate }}
              </td>
              <td class="px-5 py-4">
                <span class="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black border border-emerald-200">
                  {{ t.admin.usersManagement.statusActive }}
                </span>
              </td>
              <td class="px-5 py-4 text-center">
                <button
                  @click="toggleUserStatus(u)"
                  class="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10px] cursor-pointer"
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
    <div v-else-if="activeTab === 'settings'" class="bg-white rounded-[32px] border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-[0_8px_30px_rgba(25,50,90,0.05)]">
      <div>
        <h3 class="text-lg font-black text-slate-900 flex items-center gap-2">
          <Sliders class="w-5 h-5 text-[#38a5e6]" />
          <span>{{ t.admin.settings.title }}</span>
        </h3>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div>
          <label class="block text-xs font-bold text-slate-600 mb-1.5">{{ t.admin.settings.commissionRate }}</label>
          <input
            type="number"
            v-model="settingsForm.commission"
            class="w-full bg-[#f4f8fb] border border-slate-200 rounded-2xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#38a5e6] font-bold"
          />
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-600 mb-1.5">{{ t.admin.settings.depositPercentage }}</label>
          <input
            type="number"
            v-model="settingsForm.deposit"
            class="w-full bg-[#f4f8fb] border border-slate-200 rounded-2xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#38a5e6] font-bold"
          />
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-600 mb-1.5">{{ t.admin.settings.currency }}</label>
          <select
            v-model="settingsForm.currency"
            class="w-full bg-[#f4f8fb] border border-slate-200 rounded-2xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#38a5e6] font-bold"
          >
            <option value="SAR">{{ t.admin.settings.sarCurrency }}</option>
            <option value="USD">US Dollar (USD)</option>
            <option value="AED">UAE Dirham (AED)</option>
          </select>
        </div>
      </div>

      <div class="space-y-3 pt-2">
        <label class="flex items-center gap-2 text-xs text-slate-700 font-bold cursor-pointer">
          <input type="checkbox" v-model="settingsForm.whatsapp" class="w-4 h-4 rounded text-[#38a5e6]" />
          <span>{{ t.admin.settings.enableWhatsapp }}</span>
        </label>

        <label class="flex items-center gap-2 text-xs text-slate-700 font-bold cursor-pointer">
          <input type="checkbox" v-model="settingsForm.sms" class="w-4 h-4 rounded text-[#38a5e6]" />
          <span>{{ t.admin.settings.enableSms }}</span>
        </label>
      </div>

      <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
        <button
          type="button"
          @click="saveSettings"
          class="px-7 py-3.5 rounded-full bg-[#38a5e6] hover:bg-[#2897da] text-white font-black text-xs shadow-md shadow-[#38a5e6]/25 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Save class="w-4 h-4" />
          <span>{{ t.admin.settings.saveSettings }}</span>
        </button>

        <span v-if="savedToast" class="text-xs text-emerald-600 font-bold animate-pulse">
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

const activeTab = ref('stadiumApprovals');
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
