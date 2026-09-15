export function ListPageHeader({ title, description, actions }) {
  return <header className="list-page-header"><div><h1>{title}</h1>{description && <p>{description}</p>}</div>{actions}</header>
}
