import { Car } from 'lucide-react'
import ListingTable from '../../components/ListingTable'
import { money } from '../../lib/format'

const columns = [
  { label: 'Plate', render: (r) => <span className="font-mono text-xs">{r.plateNo}</span> },
  { label: 'Driver', render: (r) => <div className="text-xs"><div>{r.driverName}</div><div className="text-ink-mute">{r.driverPhone}</div></div> },
  { label: 'Area', render: (r) => r.location },
  { label: 'Seats', render: (r) => r.seats },
  { label: 'Per day', align: 'right', render: (r) => <span className="font-semibold">{money(r.dailyRate)}</span> },
]

export default function Fleet() {
  return (
    <ListingTable
      title="My fleet"
      subtitle="Your vehicles and drivers. Hide a vehicle when it’s off the road."
      endpoint="/taxis"
      basePath="/taxi/fleet"
      noun="Vehicle"
      icon={Car}
      columns={columns}
      searchFields={['vehicleModel', 'plateNo', 'driverName', 'location', 'companyName']}
      nameOf={(r) => `${r.vehicleType}, ${r.vehicleModel}`}
    />
  )
}
