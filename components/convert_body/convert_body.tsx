import parse, { domToReact, Element, DOMNode } from 'html-react-parser'
import PureLink from '../pure_link/pure_link'
import { CodeBlock, InfoBox, InlineCode } from '../code/code'
import Image from 'next/image'

export default function ConvertBody({ contentHTML }: { contentHTML: string; }) {
    const contentReact = parse(contentHTML, {
        replace: (node: DOMNode) => {
            if (!(node instanceof Element)) return

            if (node.name === 'img') {
                const { src, alt, width, height } = node.attribs
                return (
                    <Image
                        layout='responsive'
                        src={src}
                        width={Number(width)}
                        height={Number(height)}
                        alt={alt}
                        sizes="(min-width: 768px) 768px, 100vw" />
                )
            }
            else if (node.name === 'a') {
                const { href, target } = node.attribs
                return (
                    <PureLink text={domToReact(node.children as DOMNode[])} link={href} target={target} />
                    // <LinkButton title={domToReact(node.children)} link={href} type="3" newTab={target=='_blank'}/>
                )
            }
            else if (node.name === 'code' && node.attribs.class == null) {
                return (
                    <InlineCode text={domToReact(node.children as DOMNode[])} />
                )
            }
            else if (node.name === 'span' && node.attribs.class == "info") {
                return (
                    <InfoBox text={domToReact(node.children as DOMNode[])} />
                )
            }
            else if (node.name === 'pre') {
                return (
                    <CodeBlock node={node} />
                )
            }
        }
    })

    return <>{contentReact}</>
}