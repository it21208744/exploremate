import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { Modal } from 'antd'

export default NiceModal.create(({ name }) => {
  const modal = useModal()
  return (
    <Modal
      title="Hello Antd"
      onOk={() => modal.hide()}
      open={modal.visible}
      onCancel={() => modal.hide()}
      afterClose={() => modal.remove()}
    >
      <h1>HE he this is a single plan</h1>
      {console.log(name)}
    </Modal>
  )
})
