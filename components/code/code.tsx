import styles from './code.module.css'
import { faCode, faInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { domToReact } from 'html-react-parser';
import { Source_Code_Pro } from 'next/font/google'
import React from 'react';

const SourceCodePro = Source_Code_Pro({
    weight: ["500"],
    subsets: ["latin"]
});

export function InlineCode({ text }: { text: any; }) {
    return (
        <span className={`${SourceCodePro.className} ${styles.code}`}>
            {text}
        </span>
    )
}

export function CodeBlock({ node }: { node: any }) {
    return (
        <div className={styles.codeblock}>
            <div className={styles.code_header}>
                <FontAwesomeIcon icon={faCode} />
                <span>コード</span>
            </div>
            <pre className={`${SourceCodePro.className}`}>
                {domToReact(node.children)}
            </pre>
        </div>

    )
}

export function InfoBox({
    text, children
}: {
    text?: any;
    children?: React.ReactNode;
}) {
    return (
        <span className={styles.info}>
            <span className={styles.info_header}>
                <FontAwesomeIcon icon={faInfo} />
                <span>情報</span>
            </span>
            <span>{text}{children}</span>
        </span>
    )
}