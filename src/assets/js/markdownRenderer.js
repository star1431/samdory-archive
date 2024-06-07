// markdown 커스텀 (참고 : https://blog.itcode.dev/posts/2021/11/07/nextjs-reorganization-5)
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/vs2015.css'

const renderer = new marked.Renderer()

// 코드블럭 렌더링
renderer.code = (code, lang) => {
    // 유효한 언어가 있을 경우
    if (lang && renderer?.options?.highlight) {
        code = renderer.options.highlight(code, lang) || code
        const langClass = 'language-' + lang
        return `
            <div class="codeblock">
                <div class="top">
                    <p>${lang.toUpperCase()}</p>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>

				<button class="button-copy" onclick="copyCode(this);">
                    <span class="ally-hidden">코드 복사</span>
				</button>

                <pre class="${langClass}">${code}</pre>
            </div>
        `
    }

    // 없을 경우
    else {
        lang = 'unknown';
        const langClass = 'language-' + lang
        return `
            <div class="codeblock">
                <div class="top">
                    <p>${lang.toUpperCase()}</p>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>

				<button class="button-copy" onclick="copyCode(this);">
                    <span class="ally-hidden">코드 복사</span>
				</button>

                <pre class="${langClass}">
                    ${code}
                </pre>
            </div>
        `
    }
}

// marked 옵션 설정
marked.setOptions({
    renderer: renderer,
    highlight: (code, lang) => {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext'
        return hljs.highlight(code, { language }).value
    }
})

export default marked
