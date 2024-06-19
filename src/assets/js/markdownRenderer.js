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
renderer.code = (code) => {
    const codeText = code.text || code.raw || ''
    const lang = code.lang || 'plaintext'
    const langClass = 'language-' + lang
    const highlightedCode = hljs.getLanguage(lang) ? hljs.highlight(codeText, { language: lang }).value : hljs.highlightAuto(codeText).value
    return `
        <div class="codeblock">
            <div class="top">
                <p>${lang.toUpperCase()}</p>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <button type="button" class="ui-button markdown-copy" onclick="markdownCodeCopy(this)">
                <span class="ally-hidden">코드 복사</span>
            </button>
            <pre class="${langClass}">${highlightedCode}</pre>
        </div>
    `
}

function markdownCodeCopy(button) {
    const target = button.nextElementSibling
    console.log(target, button)
    const codeText = target.textContent || target.innerText
    navigator.clipboard.writeText(codeText).then(() => {
        // 복사 성공 시 버튼에 메시지 표시
        button.classList.add('success')
        button.disabled = true
        setTimeout(() => {
            button.classList.remove('success')
            button.disabled = false
        }, 2000)
    }).catch(err => {
        console.error('Failed to copy: ', err)
    })
}
window.markdownCodeCopy = markdownCodeCopy

// [tag : a] 커스텀 렌더링
renderer.link = (token) => {
    const href = token.href || ''
    const title = token.title || ''
    const text = token.text || ''
    let targetAttr = ''
    let link = href
    if (/:target="_blank"/.test(text)) {
        token.text = token.text.replace(/{:target="_blank"}/, '').trim()
        targetAttr = ' target="_blank"'
    }
    if (href.startsWith('@/assets/file/')) {
        const filePath = requireFile(`./${href.replace('@/assets/file/', '')}`)
        link = filePath.default
    }

    return `<a href="${link}"${targetAttr}${title ? ` title="${title}"` : ''}>${text}</a>`
}


// [tag : h1,h2,h3] 목차용 id값 렌더링
renderer.heading = (token) => {
    let text = token.text;
    let level = token.depth;

    text = typeof text === 'string' ? text : '';

    // 연속된 비알파벳 문자를 하나의 하이픈으로 변환하고 양 끝의 하이픈을 제거
    const slug = text.toLowerCase()
                      .replace(/[^a-zA-Z0-9가-힣]+/g, '-')   // 비알파벳/비숫자 문자를 하이픈으로 변환
                      .replace(/^-+|-+$/g, '');             // 양 끝의 하이픈 제거

    toc.push({ level, text, slug })
    return `<h${level} id="${slug}">${text}</h${level}>`
}

// [tag : table] 커스텀 렌더링
renderer.table = (token) => {
    const lastRowAttr = token.rows.find(row => row.some(cell => cell.text && cell.text.includes('{:class=')))
    let customClass = ''

    if (lastRowAttr) {
        const classCell = lastRowAttr.find(cell => cell.text.includes('{:class='))
        const classMatch = classCell.text.match(/\{:class="([^"]+)"\}/)
        customClass = classMatch ? classMatch[1] : ''

        // 해당 클래스를 포함하는 행을 제거
        token.rows = token.rows.filter(row => !row.includes(classCell))
    }

    const header = token.header.map(cell => {
        const align = cell.align ? ` style="text-align:${cell.align}"` : ''
        return `<th${align}>${cell.text}</th>`
    }).join('')

    const body = token.rows.map(row => {
        const cells = row.map(cell => {
            const align = cell.align ? ` style="text-align:${cell.align}"` : ''
            return `<td${align}>${cell.text}</td>`
        }).join('')
        return `<tr>${cells}</tr>`
    }).join('')

    return `
        <div class="markdown-table-area ${customClass}">
            <table>
                <thead><tr>${header}</tr></thead>
                <tbody>${body}</tbody>
            </table>
        </div>
    `;
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
