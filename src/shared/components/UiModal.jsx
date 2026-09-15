export function UiModal({ open, title, children, onClose }) {
  if (!open) return null
  return <div className="ui-modal-backdrop" role="presentation"><section className="ui-modal" role="dialog" aria-modal="true"><button type="button" onClick={onClose} aria-label="Close">x</button><h2>{title}</h2>{children}</section></div>
}
