<template>
  <div class="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6">
    <!-- Header & Legend -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
      <div>
        <h3 class="text-lg font-bold text-white flex items-center gap-2">
          <Clock class="w-5 h-5 text-emerald-400" />
          <span>{{ t.details.timeSlotSectionTitle }}</span>
        </h3>
        <p class="text-xs text-slate-400 mt-1">
          {{ isRtl ? 'اختر اليوم والوقت المناسب لحجزك الرياضي' : 'Select your desired date and match time slot' }}
        </p>
      </div>

      <!-- Legend -->
      <div class="flex flex-wrap items-center gap-3 text-xs">
        <div class="flex items-center gap-1.5">
          <span class="w-3 h-3 rounded-full bg-slate-800 border border-slate-600"></span>
          <span class="text-slate-300">{{ t.details.availableLegend }}</span>
        </div>
        <div class="flex items-center gap-1.5">
          <span class="w-3 h-3 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"></span>
          <span class="text-emerald-400 font-bold">{{ t.details.selectedLegend }}</span>
        </div>
        <div class="flex items-center gap-1.5">
          <span class="w-3 h-3 rounded-full bg-slate-800/50 border border-red-500/30 opacity-50"></span>
          <span class="text-slate-500">{{ t.details.reservedLegend }}</span>
        </div>
      </div>
    </div>

    <!-- Date Selector Strip (Today, Tomorrow, and upcoming days) -->
    <div>
      <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5">
        {{ t.details.selectDay }}
      </label>
      <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
        <button
          v-for="day in upcomingDays"
          :key="day.dateString"
          type="button"
          @click="selectedDate = day.dateString; selectedSlot = null"
          :class="[
            'p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1',
            selectedDate === day.dateString
              ? 'bg-emerald-500/15 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-950/40'
              : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60'
          ]"
        >
          <span class="text-xs font-medium text-slate-400">{{ day.dayLabel }}</span>
          <span class="text-base font-extrabold text-white">{{ day.dayNumber }}</span>
          <span class="text-[10px] text-slate-400 uppercase">{{ day.monthLabel }}</span>
        </button>
      </div>
    </div>

    <!-- Time Slots Grid -->
    <div>
      <div class="flex items-center justify-between mb-3">
        <span class="text-xs font-semibold text-slate-300 uppercase tracking-wider">
          {{ isRtl ? 'الفترات المتاحة لهذا اليوم:' : 'Available Slots for Selected Date:' }}
        </span>
        <span class="text-xs text-emerald-400 font-bold">
          {{ availableSlotsCount }} {{ isRtl ? 'أوقات شاغرة' : 'open slots' }}
        </span>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        <button
          v-for="(slot, idx) in slotsList"
          :key="idx"
          type="button"
          :disabled="slot.status === 'reserved'"
          @click="onSelectSlot(slot)"
          :class="[
            'p-3.5 rounded-xl border text-center transition-all relative flex flex-col items-center justify-center gap-1 group',
            slot.status === 'reserved'
              ? 'bg-slate-950/40 border-slate-800/40 text-slate-600 cursor-not-allowed opacity-60'
              : selectedSlot && selectedSlot.time === slot.time
              ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400 shadow-xl shadow-emerald-500/30 scale-102 ring-2 ring-emerald-400/50'
              : 'bg-slate-950/80 border-slate-800 text-slate-200 hover:border-emerald-500/60 hover:bg-slate-800/80'
          ]"
        >
          <!-- Peak hour indicator dot -->
          <div
            v-if="slot.isPeak && slot.status !== 'reserved'"
            class="absolute top-1.5 end-1.5"
            :title="t.details.peakHourBadge"
          >
            <span class="flex h-2 w-2 relative">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
            </span>
          </div>

          <span
            :class="[
              'text-sm font-extrabold tracking-tight',
              slot.status === 'reserved' ? 'line-through' : ''
            ]"
          >
            {{ slot.time }}
          </span>

          <div class="flex items-center gap-1 text-xs">
            <template v-if="slot.status === 'reserved'">
              <span class="text-[11px] font-semibold text-red-400/80">{{ t.details.reservedLegend }}</span>
            </template>
            <template v-else>
              <span :class="selectedSlot && selectedSlot.time === slot.time ? 'text-slate-950 font-bold' : 'text-emerald-400 font-extrabold'">
                {{ slot.price }} {{ isRtl ? 'ريال' : 'SAR' }}
              </span>
              <span v-if="slot.isPeak" :class="selectedSlot && selectedSlot.time === slot.time ? 'text-slate-900 text-[10px]' : 'text-amber-400 text-[10px]'">
                ({{ t.details.peakHourBadge }})
              </span>
            </template>
          </div>
        </button>
      </div>
    </div>

    <!-- Selected Slot Summary & Proceed Button -->
    <div class="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div v-if="selectedSlot" class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
          <CalendarCheck class="w-5 h-5" />
        </div>
        <div>
          <span class="text-xs text-slate-400 block">{{ isRtl ? 'الموعد المختار:' : 'Selected Booking:' }}</span>
          <span class="text-sm font-extrabold text-white">
            {{ selectedDate }} • {{ selectedSlot.time }}
          </span>
          <span class="text-xs text-emerald-400 font-bold ms-2">
            ({{ selectedSlot.price }} {{ isRtl ? 'ريال' : 'SAR' }})
          </span>
        </div>
      </div>
      <div v-else class="text-xs text-amber-400/90 flex items-center gap-2">
        <AlertCircle class="w-4 h-4 shrink-0" />
        <span>{{ t.details.selectSlotPrompt }}</span>
      </div>

      <button
        type="button"
        :disabled="!selectedSlot"
        @click="onProceed"
        :class="[
          'w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2',
          selectedSlot
            ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 text-white shadow-lg shadow-emerald-600/30 active:scale-95 cursor-pointer'
            : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
        ]"
      >
        <Zap class="w-4 h-4" />
        <span>{{ t.details.proceedToPayment }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useLocalization } from '../../composables/useLocalization';
import { Clock, CalendarCheck, AlertCircle, Zap } from 'lucide-vue-next';

const props = defineProps({
  stadium: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['slot-selected', 'proceed-payment']);

const { t, isRtl } = useLocalization();

// Generate next 7 days dates
const today = new Date();
const upcomingDays = computed(() => {
  const days = [];
  const arabicDays = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  const englishDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const arabicMonths = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
  const englishMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    const dayLabel =
      i === 0
        ? t.value.hero.today
        : i === 1
        ? t.value.hero.tomorrow
        : isRtl.value
        ? arabicDays[d.getDay()]
        : englishDays[d.getDay()];

    days.push({
      dateString: dateStr,
      dayLabel,
      dayNumber: d.getDate(),
      monthLabel: isRtl.value ? arabicMonths[d.getMonth()] : englishMonths[d.getMonth()],
    });
  }
  return days;
});

const selectedDate = ref(upcomingDays.value[0]?.dateString || '2026-10-18');
const selectedSlot = ref(null);

const slotsList = computed(() => {
  return props.stadium.slots || [];
});

const availableSlotsCount = computed(() => {
  return slotsList.value.filter((s) => s.status === 'available').length;
});

const onSelectSlot = (slot) => {
  if (slot.status === 'reserved') return;
  selectedSlot.value = slot;
  emit('slot-selected', {
    date: selectedDate.value,
    slot,
  });
};

const onProceed = () => {
  if (!selectedSlot.value) return;
  emit('proceed-payment', {
    date: selectedDate.value,
    slot: selectedSlot.value,
    stadium: props.stadium,
  });
};
</script>
