<template>
  <div class="bg-white rounded-[32px] border border-slate-200/80 p-6 space-y-6 shadow-[0_8px_30px_rgba(25,50,90,0.05)]">
    <!-- Header & Legend -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
      <div>
        <h3 class="text-lg font-black text-slate-900 flex items-center gap-2">
          <Clock class="w-5 h-5 text-[#38a5e6]" />
          <span>{{ t.details.timeSlotSectionTitle }}</span>
        </h3>
        <p class="text-xs text-slate-500 mt-0.5">
          {{ isRtl ? 'اختر اليوم والوقت المناسب لحجزك الرياضي' : 'Select your desired date and match time slot' }}
        </p>
      </div>

      <!-- Legend -->
      <div class="flex flex-wrap items-center gap-3 text-xs">
        <div class="flex items-center gap-1.5">
          <span class="w-3 h-3 rounded-full bg-slate-100 border border-slate-300"></span>
          <span class="text-slate-600 font-medium">{{ t.details.availableLegend }}</span>
        </div>
        <div class="flex items-center gap-1.5">
          <span class="w-3 h-3 rounded-full bg-[#38a5e6] shadow-xs"></span>
          <span class="text-[#258ecb] font-bold">{{ t.details.selectedLegend }}</span>
        </div>
        <div class="flex items-center gap-1.5">
          <span class="w-3 h-3 rounded-full bg-slate-200 border border-slate-300 opacity-60"></span>
          <span class="text-slate-400">{{ t.details.reservedLegend }}</span>
        </div>
      </div>
    </div>

    <!-- Date Selector Strip (Capsule Cards) -->
    <div>
      <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
        {{ t.details.selectDay }}
      </label>
      <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
        <button
          v-for="day in upcomingDays"
          :key="day.dateString"
          type="button"
          @click="selectedDate = day.dateString; selectedSlot = null"
          :class="[
            'p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer',
            selectedDate === day.dateString
              ? 'bg-[#38a5e6] border-[#38a5e6] text-white shadow-md shadow-[#38a5e6]/20'
              : 'bg-slate-50 border-slate-200/80 text-slate-700 hover:border-slate-300 hover:bg-white'
          ]"
        >
          <span class="text-[11px] font-medium" :class="selectedDate === day.dateString ? 'text-sky-100' : 'text-slate-400'">
            {{ day.dayLabel }}
          </span>
          <span class="text-base font-black">
            {{ day.dayNumber }}
          </span>
          <span class="text-[10px] uppercase font-bold" :class="selectedDate === day.dateString ? 'text-sky-100' : 'text-slate-400'">
            {{ day.monthLabel }}
          </span>
        </button>
      </div>
    </div>

    <!-- Time Slots Grid -->
    <div>
      <div class="flex items-center justify-between mb-3">
        <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">
          {{ isRtl ? 'الفترات المتاحة لهذا اليوم:' : 'Available Slots for Selected Date:' }}
        </span>
        <span class="text-xs text-[#258ecb] font-black">
          {{ availableSlotsCount }} {{ isRtl ? 'أوقات شاغرة' : 'open slots' }}
        </span>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
        <button
          v-for="(slot, idx) in slotsList"
          :key="idx"
          type="button"
          :disabled="slot.status === 'reserved'"
          @click="onSelectSlot(slot)"
          :class="[
            'p-3.5 rounded-2xl border text-center transition-all relative flex flex-col items-center justify-center gap-0.5 cursor-pointer',
            slot.status === 'reserved'
              ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60'
              : selectedSlot && selectedSlot.time === slot.time
              ? 'bg-[#38a5e6] text-white font-black border-[#38a5e6] shadow-md shadow-[#38a5e6]/30 scale-102 ring-2 ring-sky-300'
              : 'bg-white border-slate-200/80 text-slate-800 hover:border-[#38a5e6] hover:bg-sky-50/50 shadow-xs'
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
              'text-sm font-black tracking-tight',
              slot.status === 'reserved' ? 'line-through' : ''
            ]"
          >
            {{ slot.time }}
          </span>

          <div class="flex items-center gap-1 text-xs">
            <template v-if="slot.status === 'reserved'">
              <span class="text-[10px] font-bold text-slate-400">{{ t.details.reservedLegend }}</span>
            </template>
            <template v-else>
              <span :class="selectedSlot && selectedSlot.time === slot.time ? 'text-white font-bold' : 'text-[#258ecb] font-black'">
                {{ slot.price }} {{ isRtl ? 'ريال' : 'SAR' }}
              </span>
              <span v-if="slot.isPeak" :class="selectedSlot && selectedSlot.time === slot.time ? 'text-sky-100 text-[10px]' : 'text-amber-600 text-[10px] font-bold'">
                ({{ t.details.peakHourBadge }})
              </span>
            </template>
          </div>
        </button>
      </div>
    </div>

    <!-- Selected Slot Summary & Proceed Button -->
    <div class="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div v-if="selectedSlot" class="flex items-center gap-3">
        <div class="w-11 h-11 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#38a5e6]">
          <CalendarCheck class="w-6 h-6" />
        </div>
        <div>
          <span class="text-xs text-slate-400 block">{{ isRtl ? 'الموعد المختار:' : 'Selected Booking:' }}</span>
          <span class="text-sm font-black text-slate-900">
            {{ selectedDate }} • {{ selectedSlot.time }}
          </span>
          <span class="text-xs text-[#258ecb] font-black ms-2">
            ({{ selectedSlot.price }} {{ isRtl ? 'ريال' : 'SAR' }})
          </span>
        </div>
      </div>
      <div v-else class="text-xs text-amber-700 bg-amber-50 px-3.5 py-2 rounded-xl flex items-center gap-2">
        <AlertCircle class="w-4 h-4 shrink-0 text-amber-500" />
        <span>{{ t.details.selectSlotPrompt }}</span>
      </div>

      <button
        type="button"
        :disabled="!selectedSlot"
        @click="onProceed"
        :class="[
          'w-full sm:w-auto px-7 py-3.5 rounded-full font-black text-sm transition-all duration-200 flex items-center justify-center gap-2',
          selectedSlot
            ? 'bg-[#38a5e6] hover:bg-[#2897da] text-white shadow-lg shadow-[#38a5e6]/30 active:scale-95 cursor-pointer'
            : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
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

const slotsList = computed(() => props.stadium.slots || []);

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
