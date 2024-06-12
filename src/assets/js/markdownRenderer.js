// markdown 커스텀 (참고 : https://blog.itcode.dev/posts/2021/11/07/nextjs-reorganization-5)

import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/vs2015.css'

const renderer = new marked.Renderer()

let toc = []
let MatterData = {}

// 마크다운 src 부분 vue CLI 3 맞게 동적으로 변환 처리
const requireImage = require.context('@/assets/images', true, /\.(png|jpe?g|gif|svg)$/)
const requireFile = require.context('@/assets/file', true, /\.(zip|doc|docx|pdf|txt|pptx|hwp)$/)

// 마크다운 첫단부분 매터 정보 분리
const matterDataReform = (markdown) => {
    const matterBlock =  /^\s*---\r?\n([\s\S]+?)\r?\n---\s*/
    const match = markdown.match(matterBlock)
    // console.log('Matched Block111111111111111111111111:', match)
    if (match) {
        const attributes = {}
        // '\n' 기준 각 아이템 할당
        match[1].split('\n').forEach(item => {
            // 세미콜론 기준 나누고 각각 키 벨류 저장 (앞뒤공백제거 포함)
            const [key, value] = item.split(':').map(part => part.trim())
            attributes[key] = value
        });
        // 마크다운 내 앞단 매터정보 영역부분 나오지 않게 없앰 (마크다운을 재할당으로 쓸거)
        const body = markdown.slice(match[0].length).trim()
        return { attributes, body }
    }
    return { attributes: {}, body: markdown }
    
}

// [code tag] 커스텀 렌더링
renderer.code = (code, lang) => {
    const langClass = 'language-' + (lang || 'unknown')
    const highlightedCode = lang && renderer?.options?.highlight ? renderer.options.highlight(code, lang) : code
    return `
        <div class="codeblock">
            <div class="top">
                <p>${(lang || 'unknown').toUpperCase()}</p>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <button class="button-copy" onclick="copyCode(this)">
                <span class="ally-hidden">코드 복사</span>
            </button>
            <pre class="${langClass}">${highlightedCode}</pre>
        </div>
    `
}

// [tag : a] 커스텀 렌더링
renderer.link = (href, title, text) => {
    if (href.startsWith('@/assets/file/')) {
        const filePath = requireFile(`./${href.replace('@/assets/file/', '')}`)
        return `<a href="${filePath.default}" download>${text}</a>`
    }
    const isExternal = /{:target="_blank"}/.test(text)
    const cleanText = text.replace(/{:target="_blank"}/, '').trim()
    const targetAttr = isExternal ? ' target="_blank"' : ''
    const titleAttr = title ? ` title="${title}"` : ''
    return `<a href="${href}"${targetAttr}${titleAttr}>${cleanText}</a>`
}

// [tag : blockquote] 커스텀 렌더링
// renderer.blockquote = (quote) => {
//     const classMatch = quote.match(/(.*)\s+\{:class="([^"]+)"\}/)
//     if (classMatch) {
//         console.log(classMatch, 1111111111111111111111111111111111111111111111)
//         const className = classMatch[2]
//         const cleanQuote = classMatch[1].trim()
//         return `<blockquote class="${className}">${marked.parse(cleanQuote)}</blockquote>`
//     }
//     return `<blockquote>${marked(quote.replace(/^>\s*/, ''))}</blockquote>`
// }

// [tag : h1,h2,h3] 목차용 id값 렌더링
renderer.heading = (text, level) => {
    // 연속된 비알파벳 문자를 하나의 하이픈으로 변환하고 양 끝의 하이픈을 제거
    const slug = text.toLowerCase()
                      .replace(/[^a-zA-Z0-9가-힣]+/g, '-')   // 비알파벳/비숫자 문자를 하이픈으로 변환
                      .replace(/^-+|-+$/g, '');             // 양 끝의 하이픈 제거

    toc.push({ level, text, slug })
    return `<h${level} id="${slug}">${text}</h${level}>`
}

// 마크다운 변환 사전 처리
const preprocessMarkdown = (markdown) => {
    toc = []
    // 앞단 매터부분 제외 및 변수 담기 적용
    const { attributes, body } = matterDataReform(markdown)
    MatterData = attributes
    let mdData = body
    
    // [tag : a] href 아닌 글자로 표현 시 타겟 처리
    // ex: [삼도리](https://samdory.com/){:target="_blank"}
    mdData = mdData.replace(/\[([^\]]+)\]\(([^)]+)\)\{:target="_blank"\}/g, (match, p1, p2) => {
        return `<a href="${p2}" target="_blank">${p1}</a>`
    })

    // [tag : a] href 그대로 표현 시 타겟 처리
    // ex: [https://samdory.com](https://samdory.com/){:target="_blank"}
    mdData = mdData.replace(/<([^>]+)>\{:target="_blank"\}/g, (match, p1) => {
        return `<a href="${p1}" target="_blank">${p1}</a>`
    })
    
    // [tag : a] url 바로 표현시 타겟 처리
    // ex: https://samdory.com/{:target="_blank"}
    mdData = mdData.replace(/(https?:\/\/[^\s]+)\{:target="_blank"\}/g, (match, p1) => {
        return `<a href="${p1}" target="_blank">${p1}</a>`
    })

    // [tag : blockquote] 클래스 처리
    // ex: > 안녕하세요.{:class="info"}
    mdData = mdData.replace(/>\s+(.*)\s+\{:class="([^"]+)"\}/g, (match, p1, p2) => {
        console.log(p1)
        return `<blockquote class="${p2}">${marked.parse(p1)}</blockquote>`
    })

    // 이미지 경로 처리
    // ex: ![알트값](@/assets/images/post/000.png)
    mdData = mdData.replace(/!\[([^\]]*)\]\(@\/assets\/images\/([^)]+)\)/g, (match, p1, p2) => {
        let imagePath
        try {
            const relativePath = p2.replace('assets/images/', '')
            imagePath = requireImage(`./${relativePath}`)
            // imagePath = ''
            // console.log(
            //     `\n이미지패스 :` + imagePath,
            //     `\n디폴트추가 :` + imagePath.default,
            //     `\n키값보기   :` + requireImage.keys()
            // )
        } catch (err) {
            console.error('Image null:', err)
            imagePath = ''
        }
        return `<img class="md-img" src="${imagePath}" alt="${p1}">`
    })

    // 파일 경로 처리
    // ex: [첨부파일](@/assets/file/000.docx)
    mdData = mdData.replace(/\[([^\]]+)\]\(@\/assets\/file\/([^)]+)\)/g, (match, p1, p2) => {
        let filePath
        try {
            const relativePath = p2
            filePath = requireFile(`./${relativePath}`)
            // filePath = ''
            // console.log(relativePath)
        } catch (err) {
            console.error('File null:', err)
            filePath = ''
        }
        return `<a href="${filePath.default}" download>${p1}</a>`
    })
    
    return mdData
}

// 목차 반환 
const getToc = () => toc

// 앞단 정보 데이터 반환
const getMatterData = () => MatterData

// marked api 옵션 설정 : 랜더링 및 코드블럭 선 적용
marked.setOptions({
    renderer: renderer,
    highlight: (code, lang) => {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext'
        return hljs.highlight(code, { language }).value
    }
})

export { marked, preprocessMarkdown, getToc, getMatterData }
