<template>
  <div class="min-h-screen bg-[#ebf2f7] text-slate-800 flex flex-col font-sans transition-all duration-300">
    <!-- Top Navigation Bar -->
    <Navbar />

    <!-- Main Content View Area -->
    <main class="flex-1">
      <DiscoveryView
        v-if="currentView === 'discovery'"
        ref="discoveryRef"
      />

      <StadiumDetailView
        v-else-if="currentView === 'stadium-detail'"
        :stadium="selectedStadium"
      />

      <OwnerPortalView
        v-else-if="currentView === 'owner-portal'"
      />

      <AdminPortalView
        v-else-if="currentView === 'admin-portal'"
      />
    </main>

    <!-- Global Floating Bottom Navigation (Directly matching the reference image bottom bar) -->
    <BottomNav @open-map="showGlobalMap = true" />

    <!-- Global Footer -->
    <Footer />

    <!-- Global Tactical Radar Map Modal triggered from BottomNav -->
    <MapPreviewModal
      :isOpen="showGlobalMap"
      :stadiums="stadiums"
      @close="showGlobalMap = false"
      @select-stadium="handleSelectStadiumFromMap"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useLocalization } from './composables/useLocalization';
import { useBookings } from './composables/useBookings';
import Navbar from './components/layout/Navbar.vue';
import BottomNav from './components/layout/BottomNav.vue';
import Footer from './components/layout/Footer.vue';
import DiscoveryView from './views/DiscoveryView.vue';
import StadiumDetailView from './views/StadiumDetailView.vue';
import OwnerPortalView from './views/OwnerPortalView.vue';
import AdminPortalView from './views/AdminPortalView.vue';
import MapPreviewModal from './components/stadium/MapPreviewModal.vue';

// Initialize localization
useLocalization();

const { currentView, selectedStadium, stadiums, selectStadium } = useBookings();
const discoveryRef = ref(null);
const showGlobalMap = ref(false);

const handleSelectStadiumFromMap = (stadium) => {
  showGlobalMap.value = false;
  selectStadium(stadium);
};
</script>
