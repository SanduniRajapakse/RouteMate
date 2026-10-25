import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LOGO_URL = "https://i.imgur.com/VFc8FK1.png";

const CalendarIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
);
const ShieldCheckIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
);
const SearchIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
);
const CheckCircleIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);
const AlertCircleIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
);
const LoaderIcon = ({ className = "w-5 h-5" }) => (
  <svg className={`${className} animate-spin`} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>
);
const MapIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>
);
const BookmarkCheckIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/><polyline points="9 10 11 12 15 8"/></svg>
);
const SparklesIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 3v3m0 12v3M3 12h3m12 0h3m-2.636-6.364l-2.121 2.121m-9.9 9.9l-2.121 2.121m0-14.142l2.121 2.121m9.9 9.9l2.121 2.121"/></svg>
);
const XIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
);
const TrashIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
);
const EditIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
);
const ServerIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
);
const UserIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const LogOutIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
);
const CameraIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
);

const styles = `
  @keyframes subtle-pulse {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.05); opacity: 0.9; }
    100% { transform: scale(1); opacity: 1; }
  }
  .logo-animate {
    animation: subtle-pulse 3s infinite ease-in-out;
  }
  .leaflet-container {
    width: 100%;
    height: 100%;
    border-radius: 1.5rem;
    z-index: 10 !important;
  }
`;

const INITIAL_CATEGORIES = [
  { id: 1, name: 'Temple / Culture', thumbnail: 'https://i.imgur.com/PmN6cSY.jpeg' },
  { id: 2, name: 'Beach / Nature', thumbnail: 'https://i.imgur.com/WFec46P.jpeg' },
  { id: 3, name: 'Restaurant', thumbnail: 'https://i.imgur.com/Cm9diPJ.jpeg' }
];

// Mock Places if backend fails
const MOCK_PLACES = [
  { id: 1, name: 'Nilwala River Park, Matara', description: 'A peaceful riverside park in Matara ideal for evening strolls and boat rides.', categoryId: 2, categoryName: 'Beach / Nature', latitude: 5.9525, longitude: 80.5480, openingTime: '06:00 AM - 09:00 PM', fees: 'LKR 100 (~$0.5 USD)', travelTips: 'Great spot for bird watching during early morning.', thumbnail: 'https://i.imgur.com/5Ky7XMM.jpeg', photos: ['https://i.imgur.com/vTbjH89.jpeg'] },
  { id: 2, name: 'Weherahena Poorwarama Rajamaha Viharaya', description: 'A famous historic Buddhist temple featuring an underground tunnel network.', categoryId: 1, categoryName: 'Temple / Culture', latitude: 5.9528, longitude: 80.5756, openingTime: '06:00 AM - 08:00 PM', fees: 'Free', travelTips: 'Dress modestly covering shoulders and knees.', thumbnail: 'https://i.imgur.com/CLWXJuu.jpeg', photos: ['https://i.imgur.com/Iif8ckI.jpeg'] },
  { id: 3, name: 'Sampatha Southern Villa & Restaurant', description: 'A charming dining spot and culinary hub in Talalla.', categoryId: 3, categoryName: 'Restaurant', latitude: 5.954838, longitude: 80.632338, openingTime: '08:00 AM - 10:00 PM', fees: 'Variable (Dining/Class)', travelTips: 'Advance booking recommended for traditional cooking classes.', thumbnail: 'https://i.imgur.com/ZArJvwt.jpeg', photos: ['https://i.imgur.com/4s69sdz.jpeg'] },
  { id: 4, name: 'Hiriketiya Beach', description: 'A stunning horseshoe-shaped bay renowned with surfers.', categoryId: 2, categoryName: 'Beach / Nature', latitude: 5.962370, longitude: 80.706972, openingTime: 'Open 24 Hours', fees: 'Free', travelTips: 'Best surf waves are early in the morning.', thumbnail: 'https://i.imgur.com/EH87UKN.jpeg', photos: ['https://i.imgur.com/CjMzoKO.jpeg'] },
  { id: 5, name: 'Mirissa Beach', description: 'One of the most famous tropical beaches on the southern coast known for whale watching.', categoryId: 2, categoryName: 'Beach / Nature', latitude: 5.9483, longitude: 80.4556, openingTime: 'Open 24 Hours', fees: 'Free', travelTips: 'Book whale watching excursions with certified operators only.', thumbnail: 'https://i.imgur.com/cT6H0fY.jpeg', photos: ['https://i.imgur.com/CWNhmQ5.jpeg'] },
  { id: 6, name: 'Red Snapper – Restaurant', description: 'A popular beachfront restaurant in Mirissa serving fresh seafood catches daily.', categoryId: 3, categoryName: 'Restaurant', latitude: 5.94900000, longitude: 80.45700000, openingTime: '11:00 AM - 11:00 PM', fees: 'Variable (Dining)', travelTips: 'Try the garlic butter prawns and grilled red snapper.', thumbnail: 'https://i.imgur.com/jqrFXac.jpeg', photos: ['https://i.imgur.com/1OXRDl1.jpeg'] },
  { id: 7, name: 'Blue Beach (Nilwella - Dikwella)', description: 'A hidden tropical paradise featuring a unique sandbar connecting to a tiny islet.', categoryId: 2, categoryName: 'Beach / Nature', latitude: 5.961297, longitude: 80.719185, openingTime: 'Open 24 Hours', fees: 'Free', travelTips: 'Access can depend on tide levels.Check local conditions.', thumbnail: 'https://i.imgur.com/mABHJpT.jpeg', photos: ['https://i.imgur.com/FZp7D5Y.jpeg'] },
  { id: 8, name: 'Art by Kax Art Museum', description: 'A creative cultural art gallery and museum showcasing local contemporary Sri Lankan artists.', categoryId: 1, categoryName: 'Temple / Culture', latitude: 5.95400000, longitude: 80.53800000, openingTime: '09:00 AM - 06:00 PM', fees: 'LKR 500 (~$1.5 USD)', travelTips: 'Combine this visit with a walk across the Matara old bridge.', thumbnail: 'https://i.imgur.com/ZPY9bBK.jpeg', photos: ['https://i.imgur.com/safpavC.jpeg'] }
];

const API_BASE = 'http://localhost:5000/api';

// Haversine Coordinate Math for Distance & travel time Calculation 
const calculateDistanceKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371; //// Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // // Distance in km
};

const checkClosingWarning = (openingTimeStr, travelTimeMins) => {
  if (!openingTimeStr || openingTimeStr.toLowerCase().includes('open 24 hours') || openingTimeStr.toLowerCase().includes('variable')) return null;
  
  const parts = openingTimeStr.split('-');
  if (parts.length < 2) return null;
  const closingTimePart = parts[1].trim();
  
  try {
    const now = new Date();
    const [time, modifier] = closingTimePart.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
    
    const closingDate = new Date();
    closingDate.setHours(hours, minutes, 0, 0);
    
    if (now >= closingDate) {
      return { type: 'already-closed', message: '❌ Notice: This attraction is ALREADY CLOSED for today!' };
    }
    
    const arrivalTime = new Date(now.getTime() + travelTimeMins * 60000);
    const timeDifferenceMins = (closingDate - arrivalTime) / 60000;
    
    if (timeDifferenceMins < 0) {
      return { type: 'closed-on-arrival', message: '⚠️ Warning: This attraction will be CLOSED by the time you arrive!' };
    } else if (timeDifferenceMins <= 60) {
      return { type: 'hurry', message: `⏰ Hurry! Closes in ${Math.round(timeDifferenceMins)} mins after your arrival.` };
    }
  } catch (e) {}
  return null;
};

export default function App() {
  const [sharedItinerary, setSharedItinerary] = useState(null);
  const [sharedLoading, setSharedLoading] = useState(false);

  const [activeTab, setActiveTab] = useState('explore');
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [places, setPlaces] = useState(MOCK_PLACES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  
  const [galleryPhotos, setGalleryPhotos] = useState(null);

  const [tripTitle, setTripTitle] = useState('');
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [savedItineraries, setSavedItineraries] = useState(() => {
    try {
      const stored = localStorage.getItem('routemate_saved_itineraries');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });
  
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authUsername, setAuthUsername] = useState('');

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);
  const [adminPin, setAdminPin] = useState('');

  const [editingPlaceId, setEditingPlaceId] = useState(null);
  const [adminForm, setAdminForm] = useState({ 
    name: '', 
    description: '', 
    categoryId: '1', 
    latitude: '5.9525', 
    longitude: '80.5480', 
    openingTime: '06:00 AM - 09:00 PM', 
    fees: 'Free', 
    travelTips: '', 
    thumbnail: '',
    photos: '' 
  });

  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryThumbnail, setNewCategoryThumbnail] = useState('');
  const [reassignFromCat, setReassignFromCat] = useState('');
  const [reassignToCat, setReassignToCat] = useState('');

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('routemate_saved_itineraries', JSON.stringify(savedItineraries));
    } catch (e) {}
  }, [savedItineraries]);

  // Standalone View-Only Shared Itinerary Route Interceptor
  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith('/itinerary/shared/')) {
      const code = path.split('/').pop();
      fetchSharedItinerary(code); // Renders standalone view-only itinerary screen
    }
    document.title = "RouteMate | Local Adventure & Day Trip Planner";

    let link = document.querySelector("link[rel*='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'shortcut icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = LOGO_URL;

    fetchCategories();
    fetchPlaces();
  }, [searchQuery, selectedCategory]);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_BASE}/categories`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setCategories(data);
        }
      }
    } catch (err) {}
  };

  const fetchSharedItinerary = async (code) => {
    setSharedLoading(true);
    try {
      const res = await fetch(`${API_BASE}/itineraries/shared/${code}`);
      if (!res.ok) throw new Error("Itinerary not found");
      const data = await res.json();
      setSharedItinerary(data);
    } catch (err) {
      setSharedItinerary(null);
    } finally {
      setSharedLoading(false);
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const fetchPlaces = async () => {
    setLoading(true);
    try {
      let url = `${API_BASE}/places?`;
      if (searchQuery) url += `search=${encodeURIComponent(searchQuery)}&`;
      if (selectedCategory) url += `categoryId=${selectedCategory}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Backend offline");
      const data = await res.json();
      if (Array.isArray(data)) { 
        setPlaces(data); 
        setIsOfflineMode(false); 
      }
    } catch (err) {
      setIsOfflineMode(true);
      let filtered = [...places];
      
      if (searchQuery && searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(query) || 
          p.description.toLowerCase().includes(query)
        );
      }
      
      if (selectedCategory !== '' && selectedCategory !== null && selectedCategory !== undefined) {
        filtered = filtered.filter(p => p.categoryId == selectedCategory);
      }
      
      setPlaces(filtered);
    } finally { 
      setLoading(false); 
    }
  };

  const handleAddToTrip = (place) => {
    if (selectedPlaces.some(p => p.id === place.id)) { 
      showNotification(`${place.name} is already in your trip plan!`, "error"); 
      return; 
    }

    let travelMins = 0;
    if (selectedPlaces.length > 0) {
      const prev = selectedPlaces[selectedPlaces.length - 1];
      const km = calculateDistanceKm(prev.latitude, prev.longitude, place.latitude, place.longitude);
      travelMins = Math.round((km / 40) * 60);
    }

    const warning = checkClosingWarning(place.openingTime, travelMins);
    setSelectedPlaces([...selectedPlaces, place]);

    if (warning) {
      showNotification(`${place.name}: ${warning.message}`, 'error');
    } else {
      showNotification(`Added ${place.name} to your day plan.`);
    }
  };

  const handleRemoveFromTrip = (indexToRemove) => { 
    setSelectedPlaces(selectedPlaces.filter((_, idx) => idx !== indexToRemove)); 
  };

  // Live Waypoint Reordering & Leg Distance Recalculation
  const handleMovePlace = (index, direction) => {
    const newPlaces = [...selectedPlaces];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < newPlaces.length) {
      const temp = newPlaces[index];
      newPlaces[index] = newPlaces[targetIndex];
      newPlaces[targetIndex] = temp;
      setSelectedPlaces(newPlaces); // Triggers dynamic leg distance recalculation
    }
  };

  const handleAttemptSaveTrip = (e) => {
    e.preventDefault();
    if (!tripTitle.trim()) { showNotification("Please provide a trip title.", "error"); return; }
    if (selectedPlaces.length === 0) { showNotification("Please select at least one destination before saving.", "error"); return; }
    
    // Require login for saving itineraries (Guests blocked)
    if (!user && !isAdminLoggedIn) { 
      setShowAuthModal(true); 
      return; 
    }
    commitSaveTrip();
  };

  const commitSaveTrip = async () => {
    if (selectedPlaces.length === 0) {
      showNotification("Cannot save an empty itinerary.", "error");
      return;
    }

    const placesWithTravelTime = selectedPlaces.map((place, index) => {
      let travelTime = '0 mins';
      if (index > 0) {
        const prev = selectedPlaces[index - 1];
        const km = calculateDistanceKm(prev.latitude, prev.longitude, place.latitude, place.longitude);
        const mins = Math.round((km / 40) * 60);
        travelTime = `${mins} mins`;
      }
      return { placeId: place.id, travelTimeFromPrev: travelTime };
    });

    try {
      const res = await fetch(`${API_BASE}/itineraries`, { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ 
          userId: user?.id || null, 
          title: tripTitle, 
          placesWithTravelTime 
        }) 
      });

      if (!res.ok) throw new Error("Failed to save itinerary to database");

      const data = await res.json();
      const finalShareLink = data.shareLink || `${window.location.origin}/itinerary/shared/${data.shareCode}`;

      const newItinerary = { 
        id: data.itineraryId, 
        title: tripTitle, 
        places: [...selectedPlaces], 
        shareLink: finalShareLink 
      };
      
      setSavedItineraries(prev => [newItinerary, ...prev]);
      setTripTitle('');
      setSelectedPlaces([]);
      setActiveTab('itineraries');
      showNotification("Itinerary saved successfully to database!");
    } catch (err) {
      showNotification("Error saving itinerary to server.", "error");
    }
  };

  // LOGIN AUTHENTICATION
 const handleAuthSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSignUp ? `${API_BASE}/auth/register` : `${API_BASE}/auth/login`;
    const payload = isSignUp 
      ? { email: authEmail, password: authPassword, username: authUsername || authEmail.split('@')[0] }
      : { email: authEmail, password: authPassword };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        setShowAuthModal(false);
        setAuthEmail('');
        setAuthPassword('');
        setAuthUsername('');
        setIsSignUp(false);
        showNotification(isSignUp ? `Account created! Welcome, ${data.user.username}!` : `Welcome back, ${data.user.username}!`);
        commitSaveTrip();
      } else {
        showNotification(data.error || "Authentication failed", "error");
      }
    } catch (err) {
      showNotification("Server connection error during authentication", "error");
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPin === '1234') {
      setIsAdminLoggedIn(true);
      setShowAdminLoginModal(false);
      setAdminPin('');
      setActiveTab('admin');
      showNotification("Admin access granted.");
    } else {
      showNotification("Incorrect Admin PIN", "error");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsAdminLoggedIn(false);
    setSavedItineraries([]); // Clear saved itineraries from view on logout
    localStorage.removeItem('routemate_saved_itineraries');
    showNotification("Logged out successfully.");
    setActiveTab('explore');
  };

  // Delete saved itineraries
  const handleDeleteItinerary = async (itineraryId) => {
    if (!window.confirm("Do you want to remove this completed trip from your saved itineraries?")) return;
    try {
      const res = await fetch(`${API_BASE}/itineraries/${itineraryId}`, { method: 'DELETE' });
      if (res.ok) {
        setSavedItineraries(prev => prev.filter(it => it.id !== itineraryId));
        showNotification("Itinerary removed from saved list.");
      } else {
        showNotification("Failed to delete itinerary from server.", "error");
      }
    } catch (err) {
      // Local fallback removal
      setSavedItineraries(prev => prev.filter(it => it.id !== itineraryId));
      showNotification("Itinerary removed successfully.");
    }
  };

  const handleAdminSavePlace = async (e) => {
    e.preventDefault();
    const photoArray = adminForm.photos 
      ? adminForm.photos.split(',').map(s => s.trim()).filter(Boolean) 
      : [adminForm.thumbnail || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800'];
    const selectedCatObj = categories.find(c => c.id == adminForm.categoryId);
    const catName = selectedCatObj ? selectedCatObj.name : 'Attraction';

    const placePayload = {
      ...adminForm,
      categoryId: parseInt(adminForm.categoryId),
      categoryName: catName,
      latitude: parseFloat(adminForm.latitude),
      longitude: parseFloat(adminForm.longitude),
      photos: photoArray,
      thumbnail: adminForm.thumbnail || photoArray[0]
    };

    if (editingPlaceId) {
      try {
        const res = await fetch(`${API_BASE}/admin/places/${editingPlaceId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(placePayload)
        });

        if (res.ok) {
          fetchPlaces();
          showNotification("Attraction record updated successfully!");
        } else {
          showNotification("Failed to update attraction.", "error");
        }
      } catch (err) {
        showNotification("Server connection error during update.", "error");
      }
    } else {
      try {
        const res = await fetch(`${API_BASE}/admin/places`, { 
          method: 'POST', 
          headers: { 'Content-Type': 'application/json' }, 
          body: JSON.stringify(placePayload) 
        });
        if (res.ok) {
          fetchPlaces();
          showNotification("New attraction created successfully!");
        } else {
          showNotification("Failed to create attraction.", "error");
        }
      } catch (err) {
        showNotification("Server connection error during creation.", "error");
      }
    }

    resetAdminForm();
  };

  const handleEditClick = (place) => {
    setEditingPlaceId(place.id);
    setAdminForm({
      name: place.name || '',
      description: place.description || '',
      categoryId: place.categoryId ? place.categoryId.toString() : '1',
      latitude: place.latitude ? place.latitude.toString() : '5.9525',
      longitude: place.longitude ? place.longitude.toString() : '80.5480',
      openingTime: place.openingTime || '06:00 AM - 09:00 PM',
      fees: place.fees || 'Free',
      travelTips: place.travelTips || place.travel_tips || '',
      thumbnail: place.thumbnail || place.photos?.[0] || '',
      photos: place.photos ? place.photos.join(', ') : ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetAdminForm = () => {
    setEditingPlaceId(null);
    setAdminForm({ name: '', description: '', categoryId: '1', latitude: '5.9525', longitude: '80.5480', openingTime: '06:00 AM - 09:00 PM', fees: 'Free', travelTips: '', thumbnail: '', photos: '' });
  };

  const handleDeletePlace = async (placeId) => {
    if (!window.confirm("Are you sure you want to delete this attraction?")) return;
    try {
      await fetch(`${API_BASE}/admin/places/${placeId}`, { method: 'DELETE' });
    } catch (err) {}
    setPlaces(places.filter(p => p.id !== placeId));
    showNotification("Attraction record deleted.");
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    
    const catPayload = {
      name: newCategoryName.trim(),
      thumbnailUrl: newCategoryThumbnail.trim() || 'https://i.imgur.com/WFec46P.jpeg'
    };

    try {
      const res = await fetch(`${API_BASE}/admin/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(catPayload)
      });
      if (res.ok) {
        if (typeof fetchCategories === 'function') {
          fetchCategories();
        }
        fetchPlaces(); 
        showNotification(`Category "${catPayload.name}" created successfully!`);
      } else {
        showNotification("Failed to create category", "error");
      }
    } catch (err) {
      const newCat = {
        id: Date.now(),
        name: catPayload.name,
        thumbnail: catPayload.thumbnailUrl
      };
      setCategories([...categories, newCat]);
      showNotification(`Category "${catPayload.name}" created locally!`);
    }

    setNewCategoryName('');
    setNewCategoryThumbnail('');
  };

  const handleRemoveCategory = async (catId) => {
    const cat = categories.find(c => c.id === catId);
    if (!cat) return;
    
    if (categories.length <= 1) {
      showNotification("Cannot delete the only category remaining.", "error");
      return;
    }

    if (!window.confirm(`Delete category "${cat.name}"?`)) return;

    try {
      const res = await fetch(`${API_BASE}/admin/categories/${catId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });

      if (res.ok) {
        showNotification(`Category "${cat.name}" deleted successfully.`);
        fetchCategories();
        fetchPlaces();
      } else {
        showNotification("Failed to delete category.", "error");
      }
    } catch (err) {
      setCategories(categories.filter(c => c.id !== catId));
      showNotification(`Category "${cat.name}" deleted successfully.`);
    }
  };

  const handleReassignAttractions = async (e) => {
    e.preventDefault();
    if (!reassignFromCat || !reassignToCat) return;
    if (reassignFromCat === reassignToCat) {
      showNotification("Source and target categories must be different.", "error");
      return;
    }

    const targetCat = categories.find(c => c.id == reassignToCat);

    try {
      const res = await fetch(`${API_BASE}/admin/categories/reassign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fromCategoryId: reassignFromCat, toCategoryId: reassignToCat })
      });

      if (res.ok) {
        showNotification(`Reassigned attractions to "${targetCat.name}" successfully!`);
        fetchPlaces();
      } else {
        showNotification("Failed to reassign attractions.", "error");
      }
    } catch (err) {
      showNotification("Server connection error during reassignment.", "error");
    }

    setReassignFromCat('');
    setReassignToCat('');
  };

  const tabButtonStyle = (isActive) => 
    `flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition-all duration-300 ${
      isActive ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' : 'text-slate-600 hover:bg-blue-50 hover:text-blue-700'
    }`;

  const mapCenter = places.length > 0 ? [parseFloat(places[0].latitude) || 5.9525, parseFloat(places[0].longitude) || 80.5480] : [5.9525, 80.5480];

  if (window.location.pathname.startsWith('/itinerary/shared/')) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-6 sm:p-12 flex items-center justify-center">
        <div className="max-w-3xl w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <img src={LOGO_URL} alt="RouteMate Logo" className="w-10 h-10 object-contain logo-animate" />
              <div>
                <h1 className="text-xl font-black text-blue-950">RouteMate Shared Itinerary</h1>
                <p className="text-xs text-slate-500">View-Only Itinerary Details & Route Plan</p>
              </div>
            </div>
            <a href="/" className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition">Open App</a>
          </div>

          {sharedLoading ? (
            <div className="text-center py-20"><LoaderIcon className="w-10 h-10 text-blue-600 animate-spin mx-auto" /></div>
          ) : sharedItinerary ? (
            <div className="space-y-6">
              <div className="bg-blue-950 text-white p-6 rounded-2xl shadow-lg">
                <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">Trip Title</span>
                <h2 className="text-2xl font-black mt-1">{sharedItinerary.title}</h2>
              </div>

              {sharedItinerary.items && sharedItinerary.items.length > 0 && (
                <div className="h-72 w-full rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
                  <MapContainer center={[parseFloat(sharedItinerary.items[0].latitude) || 5.9525, parseFloat(sharedItinerary.items[0].longitude) || 80.5480]} zoom={9} scrollWheelZoom={false} className="w-full h-full">
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {sharedItinerary.items.map((item, idx) => (
                      <Marker key={idx} position={[parseFloat(item.latitude) || 5.9525, parseFloat(item.longitude) || 80.5480]}>
                        <Popup>
                          <div className="p-2 space-y-1">
                            <h4 className="font-bold text-slate-900">{item.name}</h4>
                            <p className="text-xs text-slate-600">{item.description}</p>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>
              )}

              <div className="space-y-3">
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Waypoint Sequence & Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {sharedItinerary.items?.map((item, idx) => {
                    let distText = "Starting Location (0 km)";
                    let timeText = "(0 mins)";
                    if (idx > 0) {
                      const prev = sharedItinerary.items[idx - 1];
                      const km = calculateDistanceKm(parseFloat(prev.latitude), parseFloat(prev.longitude), parseFloat(item.latitude), parseFloat(item.longitude));
                      const mins = Math.round((km / 40) * 60);
                      distText = `${km.toFixed(1)} km from "${prev.name}"`;
                      timeText = `(~${mins} mins drive)`;
                    }
                    return (
                      <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm flex flex-col justify-between space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="w-7 h-7 bg-blue-600 text-white rounded-xl text-xs font-black flex items-center justify-center shrink-0">{idx + 1}</span>
                          <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{item.name}</h4>
                        </div>
                        <span className="text-xs text-blue-600 font-semibold block">📍 {distText} {timeText}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500 font-bold">Itinerary not found or link has expired.</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
      <style>{styles}</style>
      
      {notification && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl text-white transition-all transform ${notification.type === 'error' ? 'bg-red-600' : 'bg-blue-600'}`}>
          {notification.type === 'error' ? <AlertCircleIcon className="w-6 h-6" /> : <CheckCircleIcon className="w-6 h-6" />}
          <span className="font-bold">{notification.message}</span>
        </div>
      )}

      {isOfflineMode && (
        <div className="bg-amber-400 text-slate-950 px-4 py-2 text-center text-sm font-bold flex items-center justify-center gap-2 shadow-inner z-50 relative">
          <ServerIcon className="w-4 h-4 animate-pulse" />
          <span>Running in Preview Mode (Mock backend active).</span>
        </div>
      )}

      {galleryPhotos && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
            <button onClick={() => setGalleryPhotos(null)} className="absolute top-6 right-6 p-2 bg-slate-100 hover:bg-red-100 text-slate-700 rounded-full transition"><XIcon className="w-5 h-5" /></button>
            <h3 className="text-2xl font-black text-slate-900">Destination Photo Gallery</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {galleryPhotos.map((photo, i) => (
                <img key={i} src={photo} alt="Destination view" className="rounded-2xl object-cover h-64 sm:h-80 w-full shadow-lg border border-slate-100" />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* DATABASE LOGIN MODAL */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl">
            <button onClick={() => setShowAuthModal(false)} className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 bg-slate-100 rounded-full"><XIcon className="w-5 h-5" /></button>
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner"><UserIcon className="w-7 h-7" /></div>
              <h3 className="text-2xl font-black text-slate-900">{isSignUp ? 'Create an Account' : 'Sign In Required'}</h3>
              <p className="text-sm text-slate-500 mt-1">
                {isSignUp ? 'Sign up to start saving and sharing your itineraries.' : 'Please log in with your account credentials to save your itinerary.'}
              </p>
            </div>
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="block text-sm font-bold text-slate-700 uppercase mb-1">Your Name / Username</label>
                  <input type="text" value={authUsername} onChange={(e) => setAuthUsername(e.target.value)} placeholder="John Doe" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-semibold text-sm" />
                </div>
              )}
              <div>
                <label className="block text-sm font-bold text-slate-700 uppercase mb-1">Email Address</label>
                <input type="email" required value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} placeholder="john@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-semibold text-sm" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 uppercase mb-1">Password</label>
                <input type="password" required value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-semibold text-sm" />
              </div>
              <button type="submit" className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition active:scale-95 mt-2 text-sm">
                {isSignUp ? 'Sign Up & Save Trip' : 'Log In & Save Trip'}
              </button>

              <div className="text-center pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsSignUp(!isSignUp)} 
                  className="text-xs font-bold text-blue-600 hover:underline"
                >
                  {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Create one"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAdminLoginModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 relative shadow-2xl">
            <button onClick={() => setShowAdminLoginModal(false)} className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full"><XIcon className="w-5 h-5" /></button>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Admin Portal PIN</h3>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <input type="password" required value={adminPin} onChange={(e) => setAdminPin(e.target.value)} placeholder="••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-center tracking-widest text-lg font-bold" />
              <button type="submit" className="w-full py-3.5 bg-blue-600 text-white font-bold rounded-xl shadow-lg">Authenticate</button>
            </form>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:h-20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center justify-between w-full sm:w-auto">
            <div className="flex items-center gap-3">
              <img src={LOGO_URL} alt="RouteMate Logo" className="w-10 h-10 sm:w-12 sm:h-12 object-contain logo-animate" />
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-blue-950 tracking-tight">RouteMate</h1>
                <p className="text-[10px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wider">One-day Adventure Planner</p>
              </div>
            </div>
            
            {/* Mobile Auth Button */}
            <div className="flex sm:hidden items-center gap-2">
              {user || isAdminLoggedIn ? (
                <button onClick={handleLogout} className="p-2 bg-slate-100 text-slate-600 rounded-xl"><LogOutIcon className="w-4 h-4" /></button>
              ) : (
                <button onClick={() => setShowAuthModal(true)} className="px-3 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-bold">Sign In</button>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between w-full sm:w-auto gap-3">
            <nav className="flex items-center gap-1 sm:gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 overflow-x-auto w-full sm:w-auto justify-center">
              <button onClick={() => setActiveTab('explore')} className={tabButtonStyle(activeTab === 'explore')}><MapIcon className="w-4 h-4 sm:w-5 sm:h-5" /> Explore</button>
              <button onClick={() => setActiveTab('itineraries')} className={tabButtonStyle(activeTab === 'itineraries')}><CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5" /> Itineraries</button>
              <button 
                onClick={() => { 
                  setSelectedCategory(''); 
                  setSearchQuery(''); 
                  if (!isAdminLoggedIn) setShowAdminLoginModal(true); 
                  else setActiveTab('admin'); 
                }} 
                className={tabButtonStyle(activeTab === 'admin')}
              >
                <ShieldCheckIcon className="w-4 h-4 sm:w-5 sm:h-5" /> Admin
              </button>
            </nav>

            <div className="hidden sm:flex items-center gap-3">
              {user || isAdminLoggedIn ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 px-4 py-2 rounded-2xl font-bold text-blue-800 text-sm"><UserIcon className="w-4 h-4" /> {isAdminLoggedIn ? 'Admin' : user?.username}</div>
                  <button onClick={handleLogout} className="p-2.5 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 rounded-2xl transition"><LogOutIcon className="w-5 h-5" /></button>
                </div>
              ) : (
                <button onClick={() => setShowAuthModal(true)} className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-blue-600 transition"><UserIcon className="w-4 h-4" /> Sign In</button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'explore' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 rounded-3xl py-8 px-6 sm:py-10 sm:px-8 text-white shadow-2xl border border-blue-900 overflow-hidden">
              <div className="w-full space-y-3">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold bg-blue-500/20 text-blue-200 border border-blue-400/30">
                  <SparklesIcon className="w-3.5 h-3.5" /> My way, My Trip
                </span>
                
                {/* Removed whitespace-nowrap and added responsive font sizing */}
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                  Discover & Route Your Next Adventure
                </h2>

                <p className="text-blue-200 text-xs sm:text-sm font-medium leading-relaxed max-w-2xl">
                  Explore top local destinations to find your ideal destinations
                </p>

                <div className="relative mt-6 max-w-xl">
                  <SearchIcon className="absolute left-4 top-4 w-5 h-5 text-blue-300" />
                  <input 
                    type="text" 
                    placeholder="Search destinations by name or description..." 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    className="w-full bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl pl-12 pr-5 py-3.5 text-white placeholder-blue-300 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner" 
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">Explore Categories</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {categories.map(cat => (
                  <div key={cat.id} onClick={() => setSelectedCategory(selectedCategory === cat.id.toString() ? '' : cat.id.toString())} className={`relative rounded-3xl overflow-hidden h-44 cursor-pointer shadow-lg group border-4 transition-all duration-300 ${selectedCategory === cat.id.toString() ? 'border-blue-600 scale-[1.02]' : 'border-transparent'}`}>
                    <img src={cat.thumbnail_url} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent flex flex-col justify-end p-6">
                      <h4 className="text-2xl font-black text-white">{cat.name}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-inner"><MapIcon className="w-6 h-6" /></div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">Visual Journey Explorer</h3>
                    <p className="text-xs text-slate-500">Pinpoint your next stop with real-time geographic mapping and interactive destination insights at your fingertips.</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-black rounded-full">{places.length} Pins Mapped</span>
              </div>

              <div className="h-[450px] w-full rounded-3xl overflow-hidden shadow-inner border border-slate-200 relative z-10">
                <MapContainer center={mapCenter} zoom={9} scrollWheelZoom={false} className="w-full h-full">
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {places.map((place) => {
                    const lat = parseFloat(place.latitude);
                    const lng = parseFloat(place.longitude);
                    if (isNaN(lat) || isNaN(lng)) return null;

                    const thumbImg = place.thumbnail || place.photos?.[0] || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800';

                    return (
                      <Marker key={place.id} position={[lat, lng]}>
                        <Popup>
                          <div className="p-2 space-y-2 max-w-xs">
                            <img src={thumbImg} alt={place.name} className="w-full h-28 object-cover rounded-xl" />
                            <h4 className="font-black text-slate-900 text-base">{place.name}</h4>
                            <p className="text-xs text-slate-600 line-clamp-2">{place.description}</p>
                            <button 
                              onClick={() => handleAddToTrip(place)} 
                              className="w-full mt-2 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md"
                            >
                              + Add to Trip Plan
                            </button>
                          </div>
                        </Popup>
                      </Marker>
                    );
                  })}
                </MapContainer>
              </div>

              {selectedPlaces.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider">Waypoint Route Guidance & Distances</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {selectedPlaces.map((place, idx) => {
                      let distText = "Starting Location (0 km)";
                      let timeText = "(0 mins)";
                      if (idx > 0) {
                        const prev = selectedPlaces[idx - 1];
                        const km = calculateDistanceKm(prev.latitude, prev.longitude, place.latitude, place.longitude);
                        const mins = Math.round((km / 40) * 60);
                        distText = `${km.toFixed(1)} km from "${prev.name}"`;
                        timeText = `(~${mins} mins drive)`;
                      }
                      return (
                        <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm flex flex-col justify-between space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="w-7 h-7 bg-blue-600 text-white rounded-xl text-xs font-black flex items-center justify-center shrink-0">{idx + 1}</span>
                            <h5 className="font-bold text-slate-900 text-sm line-clamp-1">{place.name}</h5>
                          </div>
                          <span className="text-xs text-blue-600 font-semibold block">📍 {distText} {timeText}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-slate-900">Available Destinations</h3>
                  {selectedCategory && <button onClick={() => setSelectedCategory('')} className="text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-xl">Clear Filter</button>}
                </div>

                {loading ? (
                  <div className="text-center py-20 bg-white rounded-3xl border"><LoaderIcon className="w-10 h-10 text-blue-600 animate-spin mx-auto" /></div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {places.map(place => {
                      const tip = place.travelTips || place.travel_tips;
                      const thumbImg = place.thumbnail || place.photos?.[0] || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800';
                      return (
                        <div key={place.id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md flex flex-col justify-between group">
                          <div>
                            <div 
                              className="relative h-48 overflow-hidden cursor-pointer" 
                              onClick={() => setGalleryPhotos(place.photos && place.photos.length > 0 ? place.photos : [thumbImg])}
                            >
                              <img src={thumbImg} alt={place.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-bold text-blue-700 shadow-md">{place.categoryName || 'Attraction'}</div>
                              
                              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md group-hover:bg-blue-600 transition">
                                <CameraIcon className="w-4 h-4" /> Gallery
                              </div>
                            </div>
                            
                            <div className="p-6 space-y-3">
                              <h4 className="text-lg font-black text-slate-900">{place.name}</h4>
                              <p className="text-sm text-slate-600 leading-relaxed">{place.description}</p>
                              
                              <div className="grid grid-cols-2 gap-2 pt-2">
                                <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                                  <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">OPENING HOURS</span>
                                  <span className="text-xs font-bold text-slate-900 mt-0.5 block">🕒 {place.openingTime || 'Open 24 Hours'}</span>
                                </div>
                                <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                                  <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">ADMISSION / FEES</span>
                                  <span className="text-xs font-bold text-slate-900 mt-0.5 block">💳 {place.fees || 'Free'}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="p-6 pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            {tip && (
                              <div className="flex-1 bg-blue-50/70 border border-blue-100 p-2.5 rounded-2xl space-y-0.5">
                                <span className="text-[10px] font-black text-blue-800 uppercase tracking-wider block">TRAVEL TIPS</span>
                                <p className="text-xs font-semibold text-blue-900 line-clamp-2">{tip}</p>
                              </div>
                            )}

                            <div className="flex items-center gap-2 shrink-0">
                              <button 
                                onClick={() => handleAddToTrip(place)} 
                                className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold transition shadow-md whitespace-nowrap"
                              >
                                + Add to Trip Plan
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-24 bg-gradient-to-b from-white via-white to-blue-50/40 rounded-3xl p-7 border-2 border-blue-100 shadow-2xl space-y-6">
                  <div className="flex items-center gap-4 pb-5 border-b border-slate-100">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 text-white flex items-center justify-center shadow-lg shadow-blue-600/30">
                      <CalendarIcon className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="font-black text-slate-950 text-xl tracking-tight">Day Trip Planner</h3>
                      <p className="text-xs font-bold text-blue-600 flex items-center gap-1 mt-0.5">
                        <SparklesIcon className="w-3.5 h-3.5" /> Live Itinerary Builder
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleAttemptSaveTrip} className="space-y-5">
                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">Trip Title</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Journey to South Coast" 
                        value={tripTitle} 
                        onChange={(e) => setTripTitle(e.target.value)} 
                        className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-4 py-3.5 text-sm font-bold text-slate-900 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition shadow-inner" 
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-black text-slate-700 uppercase tracking-wider">Selected Stops</label>
                        <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 font-black text-xs rounded-full">{selectedPlaces.length} Stops</span>
                      </div>

                      {selectedPlaces.length === 0 ? (
                        <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/80 p-6">
                          <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
                            <img src={LOGO_URL} alt="RouteMate Logo" className="w-6 h-6 object-contain logo-animate" />
                          </div>
                          <h4 className="text-sm font-extrabold text-slate-700">Your route is currently empty</h4>
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed">Click "+ Add to Trip Plan" on any destination card to start building your itinerary.</p>
                        </div>
                      ) : (
                        <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                          {selectedPlaces.map((place, index) => (
                            <div key={index} className="flex items-center justify-between p-3.5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-300 transition group">
                              <div className="flex items-center gap-3 overflow-hidden">
                                <span className="w-7 h-7 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center shadow-md shadow-blue-600/20 shrink-0">{index + 1}</span>
                                <div>
                                  <h4 className="text-sm font-black text-slate-900 line-clamp-1">{place.name}</h4>
                                  <span className="text-xs font-semibold text-blue-600">{place.categoryName}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 shrink-0">
                                <button type="button" onClick={() => handleMovePlace(index, 'up')} disabled={index === 0} className="p-1 bg-slate-100 hover:bg-slate-200 rounded text-xs disabled:opacity-30">▲</button>
                                <button type="button" onClick={() => handleMovePlace(index, 'down')} disabled={index === selectedPlaces.length - 1} className="p-1 bg-slate-100 hover:bg-slate-200 rounded text-xs disabled:opacity-30">▼</button>
                                <button type="button" onClick={() => handleRemoveFromTrip(index)} className="p-1.5 text-slate-400 hover:text-red-600 rounded-xl hover:bg-red-50 transition"><XIcon className="w-4 h-4" /></button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <button 
                      type="submit" 
                      disabled={selectedPlaces.length === 0} 
                      className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-200 disabled:to-slate-200 disabled:text-slate-400 text-white font-black rounded-2xl text-sm transition-all shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2.5 active:scale-95"
                    >
                      <BookmarkCheckIcon className="w-5 h-5" /> Save & Get Share Link
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ITINERARIES TAB WITH DELETE / COMPLETE TRIP BUTTON */}
        {activeTab === 'itineraries' && (
          <div className="max-w-4xl mx-auto py-8 space-y-6">
            <div className="bg-white rounded-3xl p-8 border shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-2xl font-black text-blue-950">My Saved Adventures</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Access your custom day trips and share instant route links with friends.</p>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-black rounded-full">{user || isAdminLoggedIn ? savedItineraries.length : 0} Saved</span>
              </div>

              {!user && !isAdminLoggedIn ? (
                <div className="text-center py-16 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 space-y-4">
                  <UserIcon className="w-12 h-12 text-slate-400 mx-auto" />
                  <div>
                    <h3 className="font-black text-slate-800 text-lg">Authentication Required</h3>
                    <p className="text-xs text-slate-500 mt-1">Please sign in to your account to view and manage your saved itineraries.</p>
                  </div>
                  <button 
                    onClick={() => setShowAuthModal(true)} 
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition shadow-md"
                  >
                    Sign In Now
                  </button>
                </div>
              ) : savedItineraries.length === 0 ? (
                <div className="text-center py-16 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                  <CalendarIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <h3 className="font-black text-slate-700 text-lg">No itineraries saved yet</h3>
                  <p className="text-xs text-slate-400 mt-1">Plan a trip in the Explore tab and click "Save & Get Share Link".</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {savedItineraries.map((it) => (
                    <div key={it.id} className="bg-slate-50 border border-slate-200 p-6 rounded-3xl space-y-5 shadow-sm relative">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-black text-slate-900">{it.title}</h3>
                          <span className="text-xs font-mono bg-blue-100 text-blue-800 px-3 py-1 rounded-xl font-bold">{it.places.length} Waypoints</span>
                        </div>
                        <button 
                          onClick={() => handleDeleteItinerary(it.id)} 
                          className="px-3.5 py-2 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 self-start sm:self-auto"
                        >
                          <TrashIcon className="w-4 h-4" /> Remove / Complete Trip
                        </button>
                      </div>

                      <div className="bg-white border border-blue-100 p-4 rounded-2xl space-y-1.5 shadow-inner">
                        <span className="text-xs font-black text-blue-800 uppercase tracking-wider">Shareable Itinerary Link</span>
                        <div className="flex gap-2">
                          <input type="text" readOnly value={it.shareLink} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-mono text-blue-900 focus:outline-none" />
                          <button 
                            onClick={() => { navigator.clipboard.writeText(it.shareLink); showNotification("Share link copied to clipboard!"); }} 
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition shadow-md shrink-0"
                          >
                            Copy Link
                          </button>
                          <a 
                            href={it.shareLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-slate-900 hover:bg-blue-600 text-white font-bold rounded-xl text-xs transition flex items-center justify-center shrink-0 shadow-md"
                          >
                            Open
                          </a>
                        </div>
                      </div>

                      <div className="space-y-3 pt-2">
                        <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">Stop Sequence & Travel Metrics</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {it.places.map((place, pIdx) => {
                            let distText = "Starting Location (0 km)";
                            let timeText = "(0 mins)";
                            if (pIdx > 0) {
                              const prev = it.places[pIdx - 1];
                              const km = calculateDistanceKm(prev.latitude, prev.longitude, place.latitude, place.longitude);
                              const mins = Math.round((km / 40) * 60);
                              distText = `${km.toFixed(1)} km from "${prev.name}"`;
                              timeText = `(~${mins} mins drive)`;
                            }
                            return (
                              <div key={pIdx} className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col justify-between space-y-2">
                                <div className="flex items-center gap-2">
                                  <span className="w-7 h-7 bg-blue-600 text-white rounded-xl text-xs font-black flex items-center justify-center shrink-0">{pIdx + 1}</span>
                                  <h5 className="font-bold text-slate-900 text-sm line-clamp-1">{place.name}</h5>
                                </div>
                                <span className="text-xs text-blue-600 font-semibold block">📍 {distText} {timeText}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="max-w-6xl mx-auto py-8 space-y-10">
            <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Admin Dashboard</span>
                <h2 className="text-3xl font-black mt-1">Attraction & Category Manager</h2>
                <p className="text-slate-400 text-xs mt-1">Seamlessly create, update, or remove destinations and organize your regional categories</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b pb-4">
                  <h3 className="text-xl font-black text-slate-900">
                    {editingPlaceId ? "✏️ Edit Attraction Record" : "➕ Add New Attraction"}
                  </h3>
                  {editingPlaceId && (
                    <button onClick={resetAdminForm} className="text-xs font-bold text-slate-500 hover:text-slate-800 bg-slate-100 px-3 py-1.5 rounded-xl">Cancel Edit</button>
                  )}
                </div>

                <form onSubmit={handleAdminSavePlace} className="space-y-4">
                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">Place / Attraction Name *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Mirissa Coconut Tree Hill" 
                      value={adminForm.name} 
                      onChange={(e) => setAdminForm({...adminForm, name: e.target.value})} 
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">Category *</label>
                      <select 
                        value={adminForm.categoryId} 
                        onChange={(e) => setAdminForm({...adminForm, categoryId: e.target.value})} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">Thumbnail URL</label>
                      <input 
                        type="url" 
                        placeholder="https://i.imgur.com/example.png" 
                        value={adminForm.thumbnail} 
                        onChange={(e) => setAdminForm({...adminForm, thumbnail: e.target.value})} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">Description *</label>
                    <textarea 
                      required 
                      rows="3" 
                      placeholder="Brief overview of this attraction..." 
                      value={adminForm.description} 
                      onChange={(e) => setAdminForm({...adminForm, description: e.target.value})} 
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">Latitude *</label>
                      <input 
                        type="number" 
                        step="any" 
                        required 
                        placeholder="5.9525" 
                        value={adminForm.latitude} 
                        onChange={(e) => setAdminForm({...adminForm, latitude: e.target.value})} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">Longitude *</label>
                      <input 
                        type="number" 
                        step="any" 
                        required 
                        placeholder="80.5480" 
                        value={adminForm.longitude} 
                        onChange={(e) => setAdminForm({...adminForm, longitude: e.target.value})} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">Opening Hours</label>
                      <input 
                        type="text" 
                        placeholder="06:00 AM - 08:00 PM" 
                        value={adminForm.openingTime} 
                        onChange={(e) => setAdminForm({...adminForm, openingTime: e.target.value})} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">Admission / Fees</label>
                      <input 
                        type="text" 
                        placeholder="Free or LKR 500" 
                        value={adminForm.fees} 
                        onChange={(e) => setAdminForm({...adminForm, fees: e.target.value})} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">Travel Tips</label>
                    <input 
                      type="text" 
                      placeholder="Best visited during morning hours..." 
                      value={adminForm.travelTips} 
                      onChange={(e) => setAdminForm({...adminForm, travelTips: e.target.value})} 
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">Photo Gallery URLs (Comma-Separated)</label>
                    <input 
                      type="text" 
                      placeholder="https://url1.com, https://url2.com" 
                      value={adminForm.photos} 
                      onChange={(e) => setAdminForm({...adminForm, photos: e.target.value})} 
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl text-sm transition shadow-lg mt-2"
                  >
                    {editingPlaceId ? "Save Changes to Attraction" : "+ Create Destination Record"}
                  </button>
                </form>
              </div>

              <div className="lg:col-span-5 space-y-8">
                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-5">
                  <h3 className="text-xl font-black text-slate-900 border-b pb-3">📁 Category Manager</h3>

                  <form onSubmit={handleAddCategory} className="space-y-4">
                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">New Category Name</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Wildlife & Safaris" 
                        value={newCategoryName} 
                        onChange={(e) => setNewCategoryName(e.target.value)} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 font-semibold text-sm" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">Category Thumbnail URL</label>
                      <input 
                        type="url" 
                        placeholder="https://i.imgur.com/example.png" 
                        value={newCategoryThumbnail} 
                        onChange={(e) => setNewCategoryThumbnail(e.target.value)} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 font-semibold text-sm" 
                      />
                    </div>
                    <button type="submit" className="w-full py-3 bg-slate-900 hover:bg-blue-600 text-white font-bold rounded-2xl text-xs transition">
                      + Add New Category
                    </button>
                  </form>

                  <div className="space-y-2 pt-2">
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">Active Categories</label>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {categories.map(cat => (
                        <div key={cat.id} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                          <div className="flex items-center gap-3">
                            <img src={cat.thumbnail_url} alt={cat.name} className="w-10 h-10 rounded-xl object-cover" />
                            <span className="font-bold text-sm text-slate-900">{cat.name}</span>
                          </div>
                          <button 
                            onClick={() => handleRemoveCategory(cat.id)} 
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-4">
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">Reassign Attractions</h4>
                  <p className="text-xs text-slate-500">Move all attractions from one category to another before removing a category.</p>

                  <form onSubmit={handleReassignAttractions} className="space-y-3">
                    <select 
                      value={reassignFromCat} 
                      onChange={(e) => {
                        setReassignFromCat(e.target.value);
                        if (reassignToCat === e.target.value) setReassignToCat('');
                      }} 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold"
                    >
                      <option value="">Select From Category...</option>
                      {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>

                    <select 
                      value={reassignToCat} 
                      onChange={(e) => setReassignToCat(e.target.value)} 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold"
                    >
                      <option value="">Select Target Category...</option>
                      {categories
                        .filter(c => c.id.toString() !== reassignFromCat)
                        .map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>

                    <button type="submit" className="w-full py-2.5 bg-blue-50 text-blue-700 font-bold rounded-xl text-xs hover:bg-blue-100 transition">
                      Reassign Attractions
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900">Destination Inventory ({places.length})</h3>
                  <p className="text-xs text-slate-500">Select any listing below to modify its details or permanently remove it from the system.</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-xs font-black text-slate-400 uppercase tracking-wider">
                      <th className="pb-3 px-2">Image</th>
                      <th className="pb-3 px-2">Attraction Name</th>
                      <th className="pb-3 px-2">Category</th>
                      <th className="pb-3 px-2">Coordinates</th>
                      <th className="pb-3 px-2">Fees</th>
                      <th className="pb-3 px-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
                    {places.map(place => (
                      <tr key={place.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3 px-2">
                          <img src={place.thumbnail || place.photos?.[0]} alt={place.name} className="w-12 h-10 object-cover rounded-xl border border-slate-200" />
                        </td>
                        <td className="py-3 px-2 font-bold text-slate-900">{place.name}</td>
                        <td className="py-3 px-2">
                          <span className="px-2.5 py-1 bg-blue-50 text-blue-700 font-bold text-xs rounded-xl">
                            {place.categoryName || categories.find(c => c.id === place.categoryId)?.name || 'Attraction'}
                          </span>
                        </td>
                        <td className="py-3 px-2 font-mono text-xs text-slate-500">{place.latitude}, {place.longitude}</td>
                        <td className="py-3 px-2 text-xs">{place.fees || 'Free'}</td>
                        <td className="py-3 px-2 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => handleEditClick(place)} 
                              className="px-3 py-1.5 bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white rounded-xl text-xs font-bold transition flex items-center gap-1"
                            >
                              <EditIcon className="w-3.5 h-3.5" /> Edit
                            </button>
                            <button 
                              onClick={() => handleDeletePlace(place.id)} 
                              className="px-3 py-1.5 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white rounded-xl text-xs font-bold transition flex items-center gap-1"
                            >
                              <TrashIcon className="w-3.5 h-3.5" /> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}