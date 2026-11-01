import { BedDouble } from 'lucide-react'
import ListingTable from '../../components/ListingTable'
import { money } from '../../lib/format'

const columns = [
  { label: 'Location', render: (r) => r.location },
  { label: 'Contact', render: (r) => <div className="text-xs"><div>{r.phone}</div><div className="text-ink-mute">{r.email}</div></div> },
  { label: 'Guests', render: (r) => r.maxGuests },
  { label: 'Per night', align: 'right', render: (r) => <span className="font-semibold">{money(r.pricePerNight)}</span> },
]

export default function Hotels() {
  return (
    <ListingTable
      title="My hotels"
      subtitle="Edit details, pause a listing or print a report."
      endpoint="/hotels"
      basePath="/hotel/listings"
      noun="Hotel"
      icon={BedDouble}
      columns={columns}
      searchFields={['name', 'location', 'description']}
      nameOf={(r) => r.name}
    />
  )
}
