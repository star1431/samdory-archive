---
title: 포스트 작업용 샘플 (metter의 title) 
date: 0000.00.00 (metter의 date)
---

## 문단 타이틀(h2)
### 소문단 타이틀(h3)

일반 텍스트(p)

**볼드 텍스트**

`code inline` : 백틱(`) 내

https://google.com/  : 블링크 아님

[javascript:void(0)](javascript:void(0)) : void 가능

[a태그 블링크](https://google.com/){:target="_blank"} : `{:target="_blank"}` 붙여서 사용

[첨부파일](@/assets/file/휴가신청서_이름_00월.docx) : `@assets/file/` 기준에서 정규식 처리 (public 안쓰고 vue cli3 동적 커스텀 상태)

**이미지(block center) :** `@assets/images/` 기준에서 정규식 처리 (public 안쓰고 vue cli3 동적 커스텀 상태)
![나는alt](@/assets/images/common/img_user_background_4.png)   



* 리스트 1depth
   - 리스트 2depth
      - 리스트 3depth
      - 리스트 3depth
   - 리스트 2depth
* 리스트 1depth
   - 리스트 2depth

1. ol 1depth
   - 리스트 2depth
2. **ol 1depth**
   - 리스트 2depth

## markdown 표 형식 (table)

### 기본
| Header 1 | Header 2 | Header 3 |
| -------- | -------- | -------- |
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
| Cell 7   | Cell 8   | Cell 9   |

### 정렬방식

| Header 1 (왼쪽정렬) | Header 2 (센터정렬) | Header 3 (오른쪽정렬) |
| :---------------------- | :-----------------------: | -----------------------: |
| Cell 1                  | Cell 2 Cell 2 Cell 2 Cell 2 Cell 2 Cell 2 Cell 2 Cell 2 Cell 2 Cell 2 Cell 2                    | Cell 3                   |
| Cell 4                  | Cell 5                    | Cell 6                   |
| Cell 7                  | Cell 8                    | Cell 9                   |


## 커스텀 blockquote

> **prompt-tip** : tip 타입
{:class="prompt-tip"}

> **prompt-info** : info 타입
{:class="prompt-info"}

> **prompt-warning** : warning 타입
{:class="prompt-warning"}

> **prompt-danger** : danger 타입<br>줄바꿈도가능<br>안에` 코드 inline` 가능
{:class="prompt-danger"}


## 커스텀 pre code (hljs)

```html
<!-- 주석 -->
<div class="test" role="button">
   <p>HTML<br/>HTML ?<p>
</div>
<input type="text" title="123" value="456" placeholder="789" :readonly />
<!--// 주석 -->
```

```scss
@mixin test($dis: null) {
   display: block;
   @if ($dis != null) { 
      display: $dis; // 주석
   }
}
/** 주석 */
 .sample {
   background-color: red;
   &-2 {
      @include test($dis: none);
   }
 }
```

```js
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import LayoutDefault from '@/components/layout/LayoutDefault.vue'
import LayoutLogin from '@/components/layout/LayoutLogin.vue'

// 주석
const layoutComponents = {
    LayoutDefault,
    LayoutLogin
}

/**
 * 주석
 * 주석
 */
const route = useRoute()

/** 주석 */
const layoutComponent = computed(() => {
    const matched = route.matched.find(m => m.meta && m.meta.layout)
    if (matched && matched.meta.layout) {
        const layoutName = matched.meta.layout
        return layoutComponents[layoutName] || 'LayoutDefault'
    }
    return 'LayoutDefault'
})
```