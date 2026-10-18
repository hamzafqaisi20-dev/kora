import { ref } from 'vue';
import { mockStadiums } from '../data/mockStadiums';
import { mockOwnerBookings, mockAdminApprovals, mockAdminUsers } from '../data/mockAdminData';

// Shared state across the app
const stadiums = ref([...mockStadiums]);
const ownerBookings = ref([...mockOwnerBookings]);
const adminApprovals = ref([...mockAdminApprovals]);
const adminUsers = ref([...mockAdminUsers]);

const currentView = ref('discovery'); // 'discovery' | 'stadium-detail' | 'owner-portal' | 'admin-portal'
const selectedStadium = ref(stadiums.value[0]);
const lastConfirmedBooking = ref(null);

export function useBookings() {
  const selectStadium = (stadium) => {
    selectedStadium.value = stadium;
    currentView.value = 'stadium-detail';
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navigateTo = (viewName) => {
    currentView.value = viewName;
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const createBooking = (bookingData) => {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const newBooking = {
      id: `KP-2026-${randomCode}`,
      customerName: bookingData.customerName || 'كابتن محمد الناصر',
      customerPhone: bookingData.customerPhone || '+966 55 491 8820',
      stadiumId: bookingData.stadium.id,
      stadiumNameAr: bookingData.stadium.nameAr,
      stadiumNameEn: bookingData.stadium.nameEn,
      field: bookingData.stadium.format,
      date: bookingData.date,
      slotTime: bookingData.slot.time,
      amount: bookingData.totalAmount,
      paidDeposit: bookingData.paidAmount,
      isFullPayment: bookingData.isFullPayment,
      paymentMethod: bookingData.paymentMethod,
      extras: bookingData.extras,
      status: 'confirmed',
      createdAt: 'الآن',
    };

    // Prepend to owner reservations
    ownerBookings.value.unshift({
      id: newBooking.id,
      customerName: newBooking.customerName,
      customerPhone: newBooking.customerPhone,
      field: newBooking.field,
      date: newBooking.date,
      slotTime: newBooking.slotTime,
      amount: newBooking.amount,
      paidDeposit: newBooking.paidDeposit,
      paymentMethod: newBooking.paymentMethod,
      status: 'confirmed',
      createdAt: 'الآن',
    });

    // Mark slot as reserved in stadium
    const targetStadium = stadiums.value.find((s) => s.id === bookingData.stadium.id);
    if (targetStadium) {
      const targetSlot = targetStadium.slots.find((s) => s.time === bookingData.slot.time);
      if (targetSlot) {
        targetSlot.status = 'reserved';
      }
    }

    lastConfirmedBooking.value = newBooking;
    return newBooking;
  };

  const updateOwnerStadium = (stadiumId, updatedFields) => {
    const idx = stadiums.value.findIndex((s) => s.id === stadiumId);
    if (idx !== -1) {
      stadiums.value[idx] = {
        ...stadiums.value[idx],
        ...updatedFields,
      };
      if (selectedStadium.value && selectedStadium.value.id === stadiumId) {
        selectedStadium.value = stadiums.value[idx];
      }
    }
  };

  const approveStadiumApplication = (approvalId) => {
    const item = adminApprovals.value.find((a) => a.id === approvalId);
    if (item) {
      item.status = 'approved';
      // Add as active stadium
      const newStadium = {
        id: stadiums.value.length + 1,
        nameAr: item.venueNameAr,
        nameEn: item.venueNameEn,
        slug: 'venue-' + approvalId,
        sport: item.sportTypes.toLowerCase().includes('padel') ? 'padel' : 'football',
        format: item.sportTypes,
        cityAr: item.city,
        cityEn: item.city === 'الرياض' ? 'Riyadh' : item.city === 'جدة' ? 'Jeddah' : 'Dammam',
        districtAr: item.district,
        districtEn: item.district,
        addressAr: `${item.district}، ${item.city}`,
        addressEn: `${item.district}, ${item.city}`,
        lat: 24.7800 + Math.random() * 0.05,
        lng: 46.6500 + Math.random() * 0.05,
        phone: '+966 50 999 1122',
        facebookUrl: item.facebookUrl,
        instagramUrl: 'https://instagram.com/stadium_official',
        mapsUrl: 'https://maps.google.com',
        rating: 5.0,
        reviewsCount: 1,
        pricePerHour: 260,
        peakPricePerHour: 320,
        depositPercentage: 30,
        surfaceAr: 'عشب صناعي معتمد ومرافق متطورة حديثة',
        surfaceEn: 'Certified Quality Turf and modern infrastructure',
        dimensions: '60m × 40m',
        lighting: 'إضاءة حديثة 500 Lux',
        capacity: '14 لاعب',
        isFifaCertified: true,
        isPopular: true,
        images: [
          'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80'
        ],
        amenities: {
          nightLighting: true,
          indoor: false,
          parking: true,
          showerRooms: true,
          cafeteria: true,
          bibsAndBalls: true,
          referee: true,
          spectators: true,
        },
        descriptionAr: 'تم اعتماد هذا الملعب حديثاً عبر الإدارة العامة لجودته العالية وتوافقه مع معايير السلامة والأرضيات المعتمدة.',
        descriptionEn: 'Recently approved stadium facility meeting highest quality standards and athletic safety benchmarks.',
        operatingHours: { open: '16:00', close: '02:00', peakStart: '18:00' },
        slots: [
          { time: '17:00 - 18:00', status: 'available', isPeak: false, price: 260 },
          { time: '18:00 - 19:00', status: 'available', isPeak: true, price: 320 },
          { time: '19:00 - 20:00', status: 'available', isPeak: true, price: 320 },
          { time: '20:00 - 21:00', status: 'available', isPeak: true, price: 320 },
          { time: '21:00 - 22:00', status: 'available', isPeak: true, price: 320 },
        ]
      };
      stadiums.value.push(newStadium);
    }
  };

  const rejectStadiumApplication = (approvalId) => {
    const item = adminApprovals.value.find((a) => a.id === approvalId);
    if (item) {
      item.status = 'rejected';
    }
  };

  return {
    stadiums,
    ownerBookings,
    adminApprovals,
    adminUsers,
    currentView,
    selectedStadium,
    lastConfirmedBooking,
    selectStadium,
    navigateTo,
    createBooking,
    updateOwnerStadium,
    approveStadiumApplication,
    rejectStadiumApplication,
  };
}
