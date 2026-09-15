export function UiEmptyState({ title = 'Nothing here yet', description }) {
  return <div className="ui-empty-state"><strong>{title}</strong>{description && <span>{description}</span>}</div>
}
