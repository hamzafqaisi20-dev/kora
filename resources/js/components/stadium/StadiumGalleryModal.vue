<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-fade-in"
    @click.self="close"
  >
    <div class="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
      <!-- Modal Top Bar -->
      <div class="p-4 px-6 flex items-center justify-between border-b border-slate-800 bg-slate-950/60">
        <div>
          <h4 class="text-base font-bold text-white flex items-center gap-2">
            <Camera class="w-4 h-4 text-emerald-400" />
            <span>{{ isRtl ? stadium.nameAr : stadium.nameEn }}</span>
          </h4>
          <span class="text-xs text-slate-400">
            {{ isRtl ? 'صورة' : 'Photo' }} {{ currentIndex + 1 }} {{ isRtl ? 'من' : 'of' }} {{ images.length }}
          </span>
        </div>
        <button
          @click="close"
          class="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Main High-Res Image Display -->
      <div class="relative flex-1 bg-black flex items-center justify-center min-h-[380px] sm:min-h-[500px] overflow-hidden select-none">
        <img
          :src="images[currentIndex]"
          :alt="isRtl ? stadium.nameAr : stadium.nameEn"
          class="max-h-[65vh] w-auto max-w-full object-contain transition-all duration-300"
        />

        <!-- Prev Button -->
        <button
          @click="prevImage"
          class="absolute start-4 p-3 rounded-full bg-slate-900/80 hover:bg-emerald-600 text-white border border-slate-700 transition-all shadow-xl hover:scale-110"
        >
          <ChevronRight v-if="isRtl" class="w-6 h-6" />
          <ChevronLeft v-else class="w-6 h-6" />
        </button>

        <!-- Next Button -->
        <button
          @click="nextImage"
          class="absolute end-4 p-3 rounded-full bg-slate-900/80 hover:bg-emerald-600 text-white border border-slate-700 transition-all shadow-xl hover:scale-110"
        >
          <ChevronLeft v-if="isRtl" class="w-6 h-6" />
          <ChevronRight v-else class="w-6 h-6" />
        </button>
      </div>

      <!-- Thumbnails Strip -->
      <div class="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2 overflow-x-auto">
        <button
          v-for="(img, idx) in images"
          :key="idx"
          @click="currentIndex = idx"
          :class="[
            'h-16 w-24 rounded-lg overflow-hidden shrink-0 border-2 transition-all',
            currentIndex === idx ? 'border-emerald-500 scale-105 opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
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
