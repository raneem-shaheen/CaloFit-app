export function ListPageTemplate({ title, actions, children }) {
  return <section className="list-page-template"><header><h1>{title}</h1>{actions}</header>{children}</section>
}
