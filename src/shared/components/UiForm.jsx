export function UiForm({ children, onSubmit }) {
  return <form onSubmit={onSubmit} className="ui-form">{children}</form>
}
