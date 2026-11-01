import ListingForm from '../../components/ListingForm'

const defaults = {
  companyName: '', businessRegNo: '', companyEmail: '', companyPhone: '',
  vehicleType: 'Car', vehicleModel: '', plateNo: '', insuranceCompany: '', seats: 4, airConditioned: true,
  driverName: '', driverEmail: '', driverPhone: '', driverLicenseNo: '',
  location: '', dailyRate: '', pricePerKm: 0, imageUrl: '', active: true,
}

const sections = [
  {
    title: 'Company',
    description: 'Registration details stay private; travellers see the name and phone.',
    fields: [
      { name: 'companyName', label: 'Company name', required: true },
      { name: 'businessRegNo', label: 'Business registration no.', required: true },
      { name: 'companyEmail', label: 'Company email', type: 'email', required: true },
      { name: 'companyPhone', label: 'Company phone', type: 'tel', required: true },
    ],
  },
  {
    title: 'Vehicle',
    fields: [
      { name: 'vehicleType', label: 'Vehicle type', type: 'select', options: ['Car', 'Van', 'SUV', 'Tuk-tuk', 'Mini bus', 'Bus'], required: true },
      { name: 'vehicleModel', label: 'Make & model', required: true, placeholder: 'Toyota Axio' },
      { name: 'plateNo', label: 'Number plate', required: true, placeholder: 'CAB-1234' },
      { name: 'seats', label: 'Passenger seats', type: 'number', min: 1, required: true },
      { name: 'insuranceCompany', label: 'Insurance company', required: true },
      { name: 'airConditioned', label: 'Comfort', type: 'toggle', toggleLabel: 'Air-conditioned' },
      { name: 'imageUrl', label: 'Vehicle photo', type: 'image', span: 2 },
    ],
  },
  {
    title: 'Driver',
    description: 'Shown to travellers once they book.',
    fields: [
      { name: 'driverName', label: 'Driver name', required: true },
      { name: 'driverPhone', label: 'Driver phone', type: 'tel', required: true },
      { name: 'driverEmail', label: 'Driver email', type: 'email', required: true },
      { name: 'driverLicenseNo', label: 'Driving licence no.', required: true },
    ],
  },
  {
    title: 'Service & pricing',
    fields: [
      { name: 'location', label: 'Service area (city)', required: true, placeholder: 'Galle', hint: 'Travellers search by this name' },
      { name: 'dailyRate', label: 'Daily rate with driver (LKR)', type: 'number', min: 0, required: true },
      { name: 'pricePerKm', label: 'Extra per km (LKR, optional)', type: 'number', min: 0 },
      { name: 'active', label: 'Visibility', type: 'toggle', toggleLabel: 'Show this vehicle to travellers' },
    ],
  },
]

export default function TaxiForm() {
  return <ListingForm endpoint="/taxis" listPath="/taxi/fleet" nounTitle="Vehicle" sections={sections} defaults={defaults} />
}
