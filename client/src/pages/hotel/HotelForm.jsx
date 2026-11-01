import ListingForm from '../../components/ListingForm'

const defaults = {
  name: '', email: '', phone: '', location: '', address: '', pricePerNight: '', maxGuests: 2,
  description: '', roomDetails: '', packageDetails: '', amenities: [], imageUrl: '', active: true,
}

const sections = [
  {
    title: 'The basics',
    description: 'What travellers see first in search results.',
    fields: [
      { name: 'name', label: 'Hotel name', required: true, span: 2 },
      { name: 'location', label: 'City / area', required: true, placeholder: 'Kandy', hint: 'Travellers search by this name' },
      { name: 'address', label: 'Street address', placeholder: '12 Lake Rd, Kandy' },
      { name: 'pricePerNight', label: 'Price per night (LKR)', type: 'number', min: 0, required: true },
      { name: 'maxGuests', label: 'Max guests per booking', type: 'number', min: 1, required: true },
      { name: 'imageUrl', label: 'Cover photo', type: 'image', span: 2 },
    ],
  },
  {
    title: 'Rooms & packages',
    description: 'Help guests choose and plan their days.',
    fields: [
      { name: 'description', label: 'Description', type: 'textarea', required: true, span: 2, rows: 4, hint: 'Views, nearby sights, atmosphere. The budget planner uses this too.' },
      { name: 'roomDetails', label: 'Room details', type: 'textarea', required: true, placeholder: 'Deluxe double with balcony' },
      { name: 'packageDetails', label: 'Package details', type: 'textarea', required: true, placeholder: 'Breakfast included' },
      { name: 'amenities', label: 'Amenities', type: 'tags', span: 2, suggestions: ['Wi-Fi', 'Breakfast', 'Pool', 'Parking', 'Air conditioning', 'Hot water', 'Airport pickup', 'Family rooms', 'Garden', 'Gym'] },
    ],
  },
  {
    title: 'Contact & visibility',
    fields: [
      { name: 'email', label: 'Booking email', type: 'email', required: true },
      { name: 'phone', label: 'Phone', type: 'tel', required: true, placeholder: '+94 81 222 3344' },
      { name: 'active', label: 'Visibility', type: 'toggle', toggleLabel: 'Show this hotel to travellers', span: 2 },
    ],
  },
]

export default function HotelForm() {
  return <ListingForm endpoint="/hotels" listPath="/hotel/listings" nounTitle="Hotel" sections={sections} defaults={defaults} />
}
