export const ExternalLinkWrapper = (props: { link: string, children: React.ReactNode }) => {
  return (<a className="link" href={props.link} target="_blank" rel="noreferrer noopener">
    {props.children}
  </a>)
}
