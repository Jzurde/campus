import parse, {domToReact} from 'html-react-parser'
import Image from 'next/image'
import PureLink from './pure-link'
import { CodeBlock, InfoBox, InlineCode } from './code'

export default function ConvertBody({ contentHTML }) {
    const contentReact = parse(contentHTML, {
        replace: (node) => {
            if (node.name === 'img') {
                const { src, alt, width, height } = node.attribs
                return (
                    <Image layout='responsive' src={src} width={width} height={height} alt={alt} sizes="(min-width: 768px) 768px, 100vw" />
                )
            }
            else if (node.name === 'a') {
                const { href, target } = node.attribs
                return (
                    <PureLink text={domToReact(node.children)} link={href} target={target}/>
                    // <LinkButton title={domToReact(node.children)} link={href} type="3" newTab={target=='_blank'}/>
                )
            }
            else if (node.name === 'code' && node.attribs.class == null){
                return(
                    <InlineCode text={domToReact(node.children)}/>
                )
            }
            else if (node.name === 'span' && node.attribs.class=="info"){
                return(
                    <InfoBox text={domToReact(node.children)}/>
                )
            }
            else if(node.name === 'pre'){
                return(
                    <CodeBlock node={node}/>
                )
            }
        }
    })

    return <>{contentReact}</>
}