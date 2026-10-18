<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fade-in overflow-y-auto"
    @click.self="close"
  >
    <div class="relative w-full max-w-xl bg-white border border-slate-200/80 rounded-[38px] overflow-hidden shadow-2xl flex flex-col my-8">
      <!-- Modal Header -->
      <div class="p-5 px-6 border-b border-slate-100 bg-[#f4f8fb] flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl bg-sky-100 border border-sky-200 text-[#38a5e6] flex items-center justify-center">
            <CreditCard v-if="step !== 'success'" class="w-5 h-5" />
            <CheckCircle2 v-else class="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h3 class="text-base font-extrabold text-slate-900">
              {{ step === 'success' ? t.payment.successTitle : t.payment.modalTitle }}
            </h3>
            <p class="text-xs text-slate-500 font-medium">
              {{ isRtl ? stadium.nameAr : stadium.nameEn }} • {{ date }} ({{ slot.time }})
            </p>
          </div>
        </div>

        <button
          @click="close"
          class="w-9 h-9 rounded-full bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- STEP 1: SUMMARY & PAYMENT METHOD -->
      <div v-if="step === 'summary'" class="p-6 space-y-6">
        <!-- Booking Breakdown Box -->
        <div class="bg-[#f4f8fb] rounded-[26px] border border-slate-200/80 p-4 space-y-3">
          <h4 class="text-xs font-black text-slate-600 uppercase tracking-wider">
            {{ t.payment.summaryTitle }}
          </h4>
          <div class="space-y-2 text-xs">
            <div class="flex justify-between text-slate-600">
              <span class="text-slate-400">{{ t.payment.stadium }}</span>
              <span class="font-bold text-slate-900">{{ isRtl ? stadium.nameAr : stadium.nameEn }}</span>
            </div>
            <div class="flex justify-between text-slate-600">
              <span class="text-slate-400">{{ t.payment.date }}</span>
              <span class="font-bold text-slate-900">{{ date }}</span>
            </div>
            <div class="flex justify-between text-slate-600">
              <span class="text-slate-400">{{ t.payment.slot }}</span>
              <span class="font-black text-[#258ecb]">{{ slot.time }}</span>
            </div>
            <div class="flex justify-between text-slate-600">
              <span class="text-slate-400">{{ t.payment.ratePerHour }}</span>
              <span class="font-bold text-slate-900">{{ baseSlotPrice }} {{ isRtl ? 'ريال' : 'SAR' }}</span>
            </div>
          </div>

          <!-- Match Extras Checkboxes -->
          <div class="pt-3 border-t border-slate-200 space-y-2">
            <span class="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              {{ t.payment.extrasTitle }}
            </span>
            <label class="flex items-center justify-between p-2.5 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 cursor-pointer text-xs">
              <div class="flex items-center gap-2">
                <input type="checkbox" v-model="extras.water" class="w-4 h-4 rounded text-[#38a5e6] focus:ring-[#38a5e6]" />
                <span class="text-slate-700 font-medium">{{ t.payment.extraWater }}</span>
              </div>
              <span class="text-[#258ecb] font-black">+25 {{ isRtl ? 'ريال' : 'SAR' }}</span>
            </label>

            <label class="flex items-center justify-between p-2.5 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 cursor-pointer text-xs">
              <div class="flex items-center gap-2">
                <input type="checkbox" v-model="extras.referee" class="w-4 h-4 rounded text-[#38a5e6] focus:ring-[#38a5e6]" />
                <span class="text-slate-700 font-medium">{{ t.payment.extraReferee }}</span>
              </div>
              <span class="text-[#258ecb] font-black">+80 {{ isRtl ? 'ريال' : 'SAR' }}</span>
            </label>

            <label class="flex items-center justify-between p-2.5 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 cursor-pointer text-xs">
              <div class="flex items-center gap-2">
                <input type="checkbox" v-model="extras.filming" class="w-4 h-4 rounded text-[#38a5e6] focus:ring-[#38a5e6]" />
                <span class="text-slate-700 font-medium">{{ t.payment.extraFilming }}</span>
              </div>
              <span class="text-[#258ecb] font-black">+120 {{ isRtl ? 'ريال' : 'SAR' }}</span>
            </label>
          </div>

          <!-- Total Calculation -->
          <div class="pt-3 border-t border-slate-200 space-y-1 text-xs">
            <div class="flex justify-between text-slate-500">
              <span>{{ t.payment.subtotal }}</span>
              <span>{{ subtotal }} {{ isRtl ? 'ريال' : 'SAR' }}</span>
            </div>
            <div class="flex justify-between text-slate-500">
              <span>{{ t.payment.vat }}</span>
              <span>{{ vatAmount }} {{ isRtl ? 'ريال' : 'SAR' }}</span>
            </div>
            <div class="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
              <span>{{ t.payment.totalAmount }}</span>
              <span class="text-[#258ecb] text-base">{{ totalAmount }} {{ isRtl ? 'ريال' : 'SAR' }}</span>
            </div>
          </div>
        </div>

        <!-- Advance Deposit vs Full Payment Options -->
        <div class="space-y-3">
          <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider">
            {{ t.payment.depositOption }}
          </label>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              @click="isFullPayment = false"
              :class="[
                'p-3.5 rounded-[22px] border text-start transition-all flex flex-col justify-between cursor-pointer',
                !isFullPayment
                  ? 'bg-sky-50 border-[#38a5e6] text-slate-900 shadow-sm ring-2 ring-[#38a5e6]/20'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
              ]"
            >
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold">{{ isRtl ? 'عربون تأكيد (30%)' : 'Advance Deposit (30%)' }}</span>
                <span class="text-[#258ecb] font-black text-sm">{{ depositAmount }} {{ isRtl ? 'ريال' : 'SAR' }}</span>
              </div>
              <p class="text-[10px] text-slate-500 mt-1">
                {{ t.payment.remainingNote }}
              </p>
            </button>

            <button
              type="button"
              @click="isFullPayment = true"
              :class="[
                'p-3.5 rounded-[22px] border text-start transition-all flex flex-col justify-between cursor-pointer',
                isFullPayment
                  ? 'bg-sky-50 border-[#38a5e6] text-slate-900 shadow-sm ring-2 ring-[#38a5e6]/20'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
              ]"
            >
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold">{{ isRtl ? 'كامل المبلغ (100%)' : 'Full Payment (100%)' }}</span>
                <span class="text-[#258ecb] font-black text-sm">{{ totalAmount }} {{ isRtl ? 'ريال' : 'SAR' }}</span>
              </div>
              <p class="text-[10px] text-slate-500 mt-1">
                {{ isRtl ? 'دخول سريع وتأكيد نهائي' : 'Zero balance at gate, instant entry' }}
              </p>
            </button>
          </div>
        </div>

        <!-- Payment Method Tabs -->
        <div class="space-y-3">
          <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider">
            {{ t.payment.paymentMethod }}
          </label>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              type="button"
              @click="paymentMethod = 'mada'"
              :class="[
                'p-3 rounded-2xl border text-center font-bold text-xs transition-all flex flex-col items-center gap-1 cursor-pointer',
                paymentMethod === 'mada'
                  ? 'bg-sky-50 border-[#38a5e6] text-[#258ecb] shadow-xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
              ]"
            >
              <span class="text-sm font-black">mada</span>
              <span class="text-[10px]">{{ t.payment.mada }}</span>
            </button>

            <button
              type="button"
              @click="paymentMethod = 'applepay'"
              :class="[
                'p-3 rounded-2xl border text-center font-bold text-xs transition-all flex flex-col items-center gap-1 cursor-pointer',
                paymentMethod === 'applepay'
                  ? 'bg-sky-50 border-[#38a5e6] text-[#258ecb] shadow-xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
              ]"
            >
              <span class="text-sm font-black">Pay</span>
              <span class="text-[10px]">Apple Pay</span>
            </button>

            <button
              type="button"
              @click="paymentMethod = 'card'"
              :class="[
                'p-3 rounded-2xl border text-center font-bold text-xs transition-all flex flex-col items-center gap-1 cursor-pointer',
                paymentMethod === 'card'
                  ? 'bg-sky-50 border-[#38a5e6] text-[#258ecb] shadow-xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
              ]"
            >
              <CreditCard class="w-4 h-4 text-slate-700" />
              <span class="text-[10px]">Visa / MC</span>
            </button>

            <button
              type="button"
              @click="paymentMethod = 'cash'"
              :class="[
                'p-3 rounded-2xl border text-center font-bold text-xs transition-all flex flex-col items-center gap-1 cursor-pointer',
                paymentMethod === 'cash'
                  ? 'bg-sky-50 border-[#38a5e6] text-[#258ecb] shadow-xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
              ]"
            >
              <Banknote class="w-4 h-4 text-slate-700" />
              <span class="text-[10px]">{{ isRtl ? 'كاش بالملعب' : 'At Gate' }}</span>
            </button>
          </div>
        </div>

        <!-- Card Simulation Inputs -->
        <div v-if="paymentMethod === 'mada' || paymentMethod === 'card'" class="space-y-3 bg-[#f4f8fb] p-4 rounded-2xl border border-slate-200">
          <div>
            <label class="block text-[11px] font-semibold text-slate-500 mb-1">{{ t.payment.cardNumber }}</label>
            <div class="relative">
              <input
                type="text"
                v-model="cardForm.number"
                placeholder="4000 1234 5678 9010"
                class="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#38a5e6]"
              />
              <CreditCard class="w-4 h-4 text-slate-400 absolute end-3 top-3" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-[11px] font-semibold text-slate-500 mb-1">{{ t.payment.expiry }}</label>
              <input
                type="text"
                v-model="cardForm.expiry"
                placeholder="MM/YY"
                class="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#38a5e6]"
              />
            </div>
            <div>
              <label class="block text-[11px] font-semibold text-slate-500 mb-1">{{ t.payment.cvv }}</label>
              <input
                type="password"
                v-model="cardForm.cvv"
                placeholder="123"
                maxlength="4"
                class="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#38a5e6]"
              />
            </div>
          </div>
        </div>

        <!-- Customer Contact Details -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-[11px] font-bold text-slate-500 mb-1">
              {{ isRtl ? 'اسم الحاجز:' : 'Customer Name:' }}
            </label>
            <input
              type="text"
              v-model="customerName"
              placeholder="كابتن محمد الناصر"
              class="w-full bg-[#f4f8fb] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#38a5e6]"
            />
          </div>
          <div>
            <label class="block text-[11px] font-bold text-slate-500 mb-1">
              {{ isRtl ? 'رقم الهاتف (واتساب):' : 'Phone (WhatsApp):' }}
            </label>
            <input
              type="tel"
              v-model="customerPhone"
              placeholder="+966 55 491 8820"
              class="w-full bg-[#f4f8fb] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#38a5e6]"
            />
          </div>
        </div>

        <!-- Terms checkbox -->
        <label class="flex items-center gap-2 text-xs text-slate-500 cursor-pointer">
          <input type="checkbox" v-model="termsAccepted" class="w-4 h-4 rounded text-[#38a5e6] focus:ring-[#38a5e6]" />
          <span>{{ t.payment.termsAccept }}</span>
        </label>

        <!-- Submit Button (Vibrant Blue Pill matching reference) -->
        <button
          type="button"
          :disabled="!termsAccepted || isProcessing"
          @click="startPaymentSimulation"
          :class="[
            'w-full py-4 rounded-full font-black text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2 shadow-lg',
            termsAccepted && !isProcessing
              ? 'bg-[#38a5e6] hover:bg-[#2897da] text-white shadow-[#38a5e6]/30 hover:shadow-[#38a5e6]/50 hover:scale-[1.01] active:scale-95 cursor-pointer'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
          ]"
        >
          <Lock class="w-4 h-4" />
          <span>{{ isRtl ? `تأكيد ودفع ${payableAmount} ريال بأمان` : `Authorize & Pay ${payableAmount} SAR` }}</span>
        </button>
      </div>

      <!-- STEP 2: 3D SECURE OTP SIMULATION -->
      <div v-else-if="step === 'otp'" class="p-8 text-center space-y-6">
        <div class="w-16 h-16 rounded-full bg-sky-50 border border-sky-200 text-[#38a5e6] flex items-center justify-center mx-auto">
          <ShieldAlert class="w-8 h-8" />
        </div>

        <div class="space-y-1.5">
          <h4 class="text-xl font-black text-slate-900">{{ t.payment.otpTitle }}</h4>
          <p class="text-xs text-slate-500 max-w-sm mx-auto">
            {{ t.payment.otpSubtitle }} <span class="text-slate-900 font-bold">{{ customerPhone }}</span>
          </p>
        </div>

        <div class="max-w-xs mx-auto space-y-4">
          <input
            type="text"
            v-model="otpCode"
            placeholder="1234"
            maxlength="6"
            class="w-full text-center tracking-[0.5em] text-2xl font-black bg-[#f4f8fb] border-2 border-sky-300 rounded-2xl py-3 text-slate-900 focus:outline-none focus:border-[#38a5e6]"
          />

          <p class="text-[11px] text-slate-400">
            {{ isRtl ? 'للتجربة السريعة: أدخل الرمز 1234 أو اضغط زر التحقق مباشرةً' : 'Demo Code: Enter 1234 or click verify directly' }}
          </p>

          <button
            type="button"
            @click="verifyOtpAndFinalize"
            class="w-full py-4 rounded-full bg-[#38a5e6] hover:bg-[#2897da] text-white font-black text-sm shadow-lg shadow-[#38a5e6]/30 transition-all cursor-pointer"
          >
            {{ t.payment.verifyBtn }}
          </button>
        </div>
      </div>

      <!-- STEP 3: SUCCESS CONFIRMATION VOUCHER -->
      <div v-else-if="step === 'success'" class="p-8 space-y-6 text-center">
        <div class="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-600 shadow-md">
          <CheckCircle2 class="w-10 h-10" />
        </div>

        <div>
          <span class="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
            {{ isRtl ? 'حجز فوري مؤكد 100%' : 'Booking 100% Confirmed' }}
          </span>
          <h3 class="text-2xl font-black text-slate-900 mt-2">{{ t.payment.successTitle }}</h3>
          <p class="text-xs text-slate-500 mt-0.5">{{ t.payment.successSubtitle }}</p>
          <div class="inline-block mt-2 px-4 py-2 rounded-2xl bg-sky-50 border border-sky-200 text-[#258ecb] text-xl font-mono font-black tracking-widest">
            {{ bookingVoucher.id }}
          </div>
        </div>

        <!-- Digital Pass / QR Voucher Container (Clean White Card) -->
        <div class="bg-[#f4f8fb] p-5 rounded-[28px] border border-slate-200 text-start space-y-4 max-w-md mx-auto shadow-sm">
          <div class="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <span class="text-[10px] text-slate-400 uppercase tracking-wider block">{{ isRtl ? 'الملعب والمنشأة' : 'Venue' }}</span>
              <span class="text-sm font-black text-slate-900">{{ isRtl ? stadium.nameAr : stadium.nameEn }}</span>
            </div>
            <!-- Simulated QR Code -->
            <div class="w-16 h-16 bg-white p-1 rounded-xl shadow-xs border border-slate-200 flex items-center justify-center">
              <svg class="w-full h-full text-slate-900" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 0h2v2h-2v-2zm-4 0h2v2h-2v-2zm2 2h2v2h-2v-2zm2 2h2v2h-2v-2zm-6-2h2v2h-2v-2zm0 2h2v2h-2v-2z"/>
              </svg>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span class="text-slate-400 block">{{ t.payment.date }}</span>
              <span class="font-bold text-slate-800">{{ date }}</span>
            </div>
            <div>
              <span class="text-slate-400 block">{{ t.payment.slot }}</span>
              <span class="font-black text-[#258ecb]">{{ slot.time }}</span>
            </div>
            <div>
              <span class="text-slate-400 block">{{ isRtl ? 'المبلغ المسدد:' : 'Paid Amount:' }}</span>
              <span class="font-bold text-slate-900">{{ payableAmount }} {{ isRtl ? 'ريال' : 'SAR' }}</span>
            </div>
            <div>
              <span class="text-slate-400 block">{{ isRtl ? 'المتبقي عند البوابة:' : 'Due at Gate:' }}</span>
              <span class="font-black text-amber-600">
                {{ isFullPayment ? 0 : totalAmount - depositAmount }} {{ isRtl ? 'ريال' : 'SAR' }}
              </span>
            </div>
          </div>

          <p class="text-[11px] text-slate-500 pt-2 border-t border-slate-200">
            {{ t.payment.ticketInstructions }}
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            @click="simulateDownload"
            class="px-5 py-2.5 rounded-full bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <Download class="w-4 h-4 text-[#38a5e6]" />
            <span>{{ isDownloaded ? (isRtl ? 'تم التحميل!' : 'Downloaded!') : t.payment.downloadVoucher }}</span>
          </button>

          <button
            @click="simulateWhatsApp"
            class="px-5 py-2.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <Share2 class="w-4 h-4" />
            <span>{{ isShared ? (isRtl ? 'تمت المشاركة' : 'Shared!') : t.payment.shareWhatsApp }}</span>
          </button>

          <button
            @click="goToOwnerDashboard"
            class="px-5 py-2.5 rounded-full bg-[#38a5e6] hover:bg-[#2897da] text-white text-xs font-bold transition-all flex items-center gap-2 shadow-md shadow-[#38a5e6]/20 cursor-pointer"
          >
            <ShieldCheck class="w-4 h-4" />
            <span>{{ isRtl ? 'عرض في لوحة تحكم المالك' : 'View in Owner Dashboard' }}</span>
          </button>
        </div>

        <div>
          <button
            @click="close"
            class="text-xs text-slate-400 hover:text-slate-700 underline mt-2 cursor-pointer font-medium"
          >
            {{ t.payment.backToHome }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useLocalization } from '../../composables/useLocalization';
import { useBookings } from '../../composables/useBookings';
import {
  CreditCard,
  Banknote,
  CheckCircle2,
  Lock,
  X,
  ShieldAlert,
  Download,
  Share2,
  ShieldCheck
} from 'lucide-vue-next';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  stadium: {
    type: Object,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  slot: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['close']);

const { t, isRtl } = useLocalization();
const { createBooking, navigateTo } = useBookings();

const step = ref('summary'); // 'summary' | 'otp' | 'success'
const isFullPayment = ref(false);
const paymentMethod = ref('mada');
const termsAccepted = ref(true);
const isProcessing = ref(false);
const otpCode = ref('1234');
const bookingVoucher = ref({});
const isDownloaded = ref(false);
const isShared = ref(false);

const customerName = ref('كابتن محمد الناصر');
const customerPhone = ref('+966 55 491 8820');

const cardForm = ref({
  number: '5888 4901 2234 9912',
  expiry: '09/28',
  cvv: '891',
});

const extras = ref({
  water: true,
  referee: false,
  filming: false,
});

const baseSlotPrice = computed(() => {
  return props.slot?.price || props.stadium?.pricePerHour || 280;
});

const extrasTotal = computed(() => {
  let sum = 0;
  if (extras.value.water) sum += 25;
  if (extras.value.referee) sum += 80;
  if (extras.value.filming) sum += 120;
  return sum;
});

const subtotal = computed(() => baseSlotPrice.value + extrasTotal.value);
const vatAmount = computed(() => Math.round(subtotal.value * 0.15));
const totalAmount = computed(() => subtotal.value + vatAmount.value);
const depositAmount = computed(() => Math.round(totalAmount.value * 0.3));

const payableAmount = computed(() => {
  return isFullPayment.value ? totalAmount.value : depositAmount.value;
});

const startPaymentSimulation = () => {
  if (paymentMethod.value === 'cash') {
    finalizeBooking();
    return;
  }
  step.value = 'otp';
};

const verifyOtpAndFinalize = () => {
  finalizeBooking();
};

const finalizeBooking = () => {
  const newBooking = createBooking({
    stadium: props.stadium,
    date: props.date,
    slot: props.slot,
    totalAmount: totalAmount.value,
    paidAmount: payableAmount.value,
    isFullPayment: isFullPayment.value,
    paymentMethod: paymentMethod.value,
    customerName: customerName.value,
    customerPhone: customerPhone.value,
    extras: extras.value,
  });

  bookingVoucher.value = newBooking;
  step.value = 'success';
};

const simulateDownload = () => {
  isDownloaded.value = true;
};

const simulateWhatsApp = () => {
  isShared.value = true;
};

const goToOwnerDashboard = () => {
  close();
  navigateTo('owner-portal');
};

const close = () => {
  step.value = 'summary';
  emit('close');
};
</script>
