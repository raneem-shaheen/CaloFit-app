import { UiModal } from '../../shared/components/UiModal'

export function ExampleModal({ open, onClose }) {
  return <UiModal open={open} title="Create example" onClose={onClose}><p>Feature form goes here.</p></UiModal>
}
