<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans transition-all duration-300">
    <!-- Main Top Navigation -->
    <Navbar @trigger-nearest="handleTriggerNearest" />

    <!-- Main Content Area -->
    <main class="flex-1">
      <!-- Discovery & Search Landing -->
      <DiscoveryView
        v-if="currentView === 'discovery'"
        ref="discoveryRef"
      />

      <!-- Stadium Details & Booking Flow -->
      <StadiumDetailView
        v-else-if="currentView === 'stadium-detail'"
        :stadium="selectedStadium"
      />

      <!-- Dedicated Stadium Owners Dashboard -->
      <OwnerPortalView
        v-else-if="currentView === 'owner-portal'"
      />

      <!-- Platform Admin Dashboard -->
      <AdminPortalView
        v-else-if="currentView === 'admin-portal'"
      />
    </main>

    <!-- Global Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useLocalization } from './composables/useLocalization';
import { useBookings } from './composables/useBookings';
import Navbar from './components/layout/Navbar.vue';
import Footer from './components/layout/Footer.vue';
import DiscoveryView from './views/DiscoveryView.vue';
import StadiumDetailView from './views/StadiumDetailView.vue';
import OwnerPortalView from './views/OwnerPortalView.vue';
import AdminPortalView from './views/AdminPortalView.vue';

// Initialize localization and attributes
useLocalization();

const { currentView, selectedStadium } = useBookings();
const discoveryRef = ref(null);

const handleTriggerNearest = () => {
  if (discoveryRef.value && discoveryRef.value.triggerNearestDetection) {
    discoveryRef.value.triggerNearestDetection();
  }
};
</script>
