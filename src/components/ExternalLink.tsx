import { AnchorHTMLAttributes, DetailedHTMLProps } from "react"
import { FCWithChildren } from "../../types/utils_types"


type ExternalLinkProps = DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>

const ExternalLink: FCWithChildren<ExternalLinkProps> = ({ target = "_blank", children, ...rest }) => (
  <a target={target} rel="noopener noreferrer" {...rest}>
    {children}
  </a>
)

export default ExternalLink
