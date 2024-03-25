import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { Modal, Button, Popover } from 'antd'

export default NiceModal.create(({ city, plan, packingList, id }) => {
  const modal = useModal()

  const handleDelete = () => {
    // Implement delete logic here
    console.log('Delete button clicked')

    modal.hide() // Optionally close the modal after deletion
  }

  return (
    <Modal
      open={modal.visible}
      afterClose={modal.remove}
      footer={[
        <Button
          key="delete"
          type="danger"
          onClick={() => {
            handleDelete()
          }}
        >
          Delete
        </Button>,
        <Button key="Cancel" type="danger" onClick={modal.hide}>
          Cancel
        </Button>,
      ]}
    >
      <h1>Trip to {city}</h1>

      <h2>Plan</h2>
      <ul>
        {Object.entries(plan).map(([key, value], index) => {
          return (
            <li key={key}>
              {`Day ${index + 1} - ${value.actions}`} <br />
              <br />
            </li>
          )
        })}
      </ul>

      <h2>Packing List</h2>
      <ul>
        {Object.entries(packingList).map(([key, value]) => {
          return (
            <li key={key}>
              {value.ItemName} <br />
              <ul>
                <li>{`   ${value.ReasonToChoose}`}</li>
              </ul>
              <br />
            </li>
          )
        })}
      </ul>
    </Modal>
  )
})
