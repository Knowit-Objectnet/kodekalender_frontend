import { FCWithChildren } from "../../types/utils_types"

type PageContentProps = {
  className?: string
}

/*
 * Wraps main page content.
 *
 * Is sized to be at least large enough for header + main + footer to fill
 * entire screen height-wise.
 *
 * Must account for notch on phones in landscape mode. We set a max width,
 * centering is taken care of by grid parent.
 */
const PageContent: FCWithChildren<PageContentProps> = ({ className, children }) => (
  <main className={className}>{children}</main>
)

export default PageContent
