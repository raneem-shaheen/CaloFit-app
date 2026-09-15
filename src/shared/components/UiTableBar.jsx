export function UiTableBar({ title, search, actions }) {
  return <header className="ui-table-bar"><h2>{title}</h2><div>{search}{actions}</div></header>
}
