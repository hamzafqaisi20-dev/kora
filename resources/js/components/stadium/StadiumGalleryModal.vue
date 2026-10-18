<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-md animate-fade-in"
    @click.self="close"
  >
    <div class="relative w-full max-w-4xl bg-white border border-slate-200 rounded-[38px] overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
      <!-- Modal Top Bar -->
      <div class="p-4 px-6 flex items-center justify-between border-b border-slate-100 bg-[#f4f8fb]">
        <div>
          <h4 class="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Camera class="w-4 h-4 text-[#38a5e6]" />
            <span>{{ isRtl ? stadium.nameAr : stadium.nameEn }}</span>
          </h4>
          <span class="text-xs text-slate-400 font-medium">
            {{ isRtl ? 'صورة' : 'Photo' }} {{ currentIndex + 1 }} {{ isRtl ? 'من' : 'of' }} {{ images.length }}
          </span>
        </div>
        <button
          @click="close"
          class="w-9 h-9 rounded-full bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Main High-Res Image Display -->
      <div class="relative flex-1 bg-slate-950 flex items-center justify-center min-h-[360px] sm:min-h-[480px] overflow-hidden select-none">
        <img
          :src="images[currentIndex]"
          :alt="isRtl ? stadium.nameAr : stadium.nameEn"
          class="max-h-[62vh] w-auto max-w-full object-contain transition-all duration-300"
        />

        <!-- Prev Button -->
        <button
          @click="prevImage"
          class="absolute start-4 w-12 h-12 rounded-full bg-white/90 hover:bg-white text-slate-900 shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
        >
          <ChevronRight v-if="isRtl" class="w-6 h-6" />
          <ChevronLeft v-else class="w-6 h-6" />
        </button>

        <!-- Next Button -->
        <button
          @click="nextImage"
          class="absolute end-4 w-12 h-12 rounded-full bg-white/90 hover:bg-white text-slate-900 shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
        >
          <ChevronLeft v-if="isRtl" class="w-6 h-6" />
          <ChevronRight v-else class="w-6 h-6" />
        </button>
      </div>

      <!-- Thumbnails Strip -->
      <div class="p-3 bg-white border-t border-slate-100 flex items-center gap-2 overflow-x-auto justify-center">
        <button
          v-for="(img, idx) in images"
          :key="idx"
          @click="currentIndex = idx"
          :class="[
            'h-16 w-24 rounded-2xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer',
            currentIndex === idx ? 'border-[#38a5e6] scale-105 shadow-sm opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
          ]"
        >
          <img :src="img" class="w-full h-full object-cover" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useLocalization } from '../../composables/useLocalization';
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-vue-next';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  stadium: {
    type: Object,
    required: true,
  },
  initialIndex: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(['close']);

const { isRtl } = useLocalization();

const currentIndex = ref(props.initialIndex);
const images = computed(() => props.stadium.images || []);

const prevImage = () => {
  if (currentIndex.value === 0) {
    currentIndex.value = images.value.length - 1;
  } else {
    currentIndex.value--;
  }
};

const nextImage = () => {
  if (currentIndex.value === images.value.length - 1) {
    currentIndex.value = 0;
  } else {
    currentIndex.value++;
  }
};

const close = () => {
  emit('close');
};
</script>
