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
        // 마크다운 내 앞단 매터정보 영역부분 나오지 않게 없앰 (변수로 쓸거)
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
renderer.blockquote = (quote) => {
    const classMatch = quote.match(/>\s+(.*)\s+\{:class="([^"]+)"\}/)
    if (classMatch) {
        const className = classMatch[2]
        const cleanQuote = classMatch[1].trim()
        return `<blockquote class="${className}">${cleanQuote}</blockquote>`
    }
    return `<blockquote>${quote.replace(/^>\s*/, '')}</blockquote>`
}
// [tag : h1,h2,h3] 목차용 id값 렌더링
renderer.heading = (text, level) => {
    // 연속된 비알파벳 문자를 하나의 하이픈으로 변환하고 양 끝의 하이픈을 제거
    const slug = text.toLowerCase()
                      .replace(/[^a-zA-Z0-9가-힣]+/g, '-') // 비알파벳/비숫자 문자를 하이픈으로 변환
                      .replace(/^-+|-+$/g, ''); // 양 끝의 하이픈 제거

    toc.push({ level, text, slug })
    return `<h${level} id="${slug}">${text}</h${level}>`
}

// 마크다운 변환 시 처리
const preprocessMarkdown = (markdown) => {
    toc = []
    // 앞단 매터부분 제외 및 변수 담기 적용
    const { attributes, body } = matterDataReform(markdown)
    MatterData = attributes

    // [tag : a] href 아닌 글자로 표현 시 {:target="_blank"} 처리
    markdown = body.replace(/\[([^\]]+)\]\(([^)]+)\)\{:target="_blank"\}/g, (match, p1, p2) => {
        return `<a href="${p2}" target="_blank">${p1}</a>`
    })

    // [tag : a] href 그대로 표현 시  {:target="_blank"} 처리 
    markdown = body.replace(/<([^>]+)>\{:target="_blank"\}/g, (match, p1) => {
        return `<a href="${p1}" target="_blank">${p1}</a>`
    })

    // [tag : blockquote]의 {:class="class-name"} 처리
    markdown = body.replace(/>\s+(.*)\s+\{:class="([^"]+)"\}/g, (match, p1, p2) => {
        return `<blockquote class="${p2}">${p1}</blockquote>`
    })

    // 이미지 경로 처리
    markdown = body.replace(/!\[([^\]]*)\]\(@\/([^)]+)\)/g, (match, p1, p2) => {
        let imagePath
        try {
            const relativePath = p2.replace('assets/images/', '')
            imagePath = requireImage(`./${relativePath}`)
            // imagePath = ''
        } catch (err) {
            console.error('Image not found:', err)
            imagePath = ''
        }
        return `<img src="${imagePath}" alt="${p1}">`
    })

    // 파일 경로 처리
    markdown = body.replace(/\[([^\]]+)\]\(@\/assets\/file\/([^)]+)\)/g, (match, p1, p2) => {
        let filePath
        try {
            const relativePath = p2
            filePath = requireFile(`./${relativePath}`)
            console.log(relativePath)
        } catch (err) {
            console.error('File not found:', err)
            filePath = ''
        }
        return `<a href="${filePath.default}" download>${p1}</a>`
    })
    
    return markdown
}

// 목차 반환 
const getToc = () => toc

// 앞단 정보 데이터 반환
const getMatterData = () => MatterData

// marked 옵션 설정 : 랜더링 및 코드블럭 선 적용
marked.setOptions({
    renderer: renderer,
    highlight: (code, lang) => {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext'
        return hljs.highlight(code, { language }).value
    }
})

export { marked, preprocessMarkdown, getToc, getMatterData }
