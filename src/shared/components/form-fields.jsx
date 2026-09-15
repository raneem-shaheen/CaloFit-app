export function UiInput({ label, ...props }) {
  return <label className="ui-field">{label}<input {...props} /></label>
}

export function UiSelect({ label, children, ...props }) {
  return <label className="ui-field">{label}<select {...props}>{children}</select></label>
}
