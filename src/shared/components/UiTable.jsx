export function UiTable({ columns = [], rows = [], rowKey = 'id' }) {
  return <table className="ui-table"><thead><tr>{columns.map((column) => <th key={column.key}>{column.title}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[rowKey]}>{columns.map((column) => <td key={column.key}>{row[column.key]}</td>)}</tr>)}</tbody></table>
}
