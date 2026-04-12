# Guard Blocker: Playwright 실행 계약 부재

## 상태

**BLOCKED** -- 이 저장소에 Playwright 실행 계약이 없어 자동 회귀 가드를 추가할 수 없다.

### 누락된 항목

| 항목 | 현재 상태 |
|------|-----------|
| `package.json` (프로젝트 루트) | 없음 |
| `playwright.config.ts` 또는 `.js` | 없음 |
| 기존 `.spec.ts` / `.spec.js` 파일 | 없음 |
| `tests/` 또는 `e2e/` 디렉토리 | 없음 |

---

## 가드가 커버해야 할 핵심 흐름

Playwright 설정이 추가되면 아래 흐름을 spec으로 작성한다.

### 1. Singleton 첫 진입

- `index.html` 로드 후 첫 번째 topic(Singleton)이 자동 또는 수동으로 표시되는지 확인
- manifest의 `id: 'singleton'`에 대응하는 adapter(`01-singleton.html`)가 iframe에 로드되는지 검증

### 2. MVVM -> Programming Paradigms overview section 전환

- manifest #10 MVVM(`id: 'mvvm'`, section `designPattern`)에서 다음 이동 시
  manifest #11 Programming Paradigms Overview(`id: 'programming-paradigms-overview'`, section `programming`)로 전환
- section이 `designPattern`에서 `programming`으로 바뀌는 유일한 전환점
- agenda/sidebar UI가 section 전환을 올바르게 반영하는지 확인

### 3. Procedural Programming 마지막 장 도달

- manifest 마지막 항목인 `id: 'procedural-programming'`(#13)까지 순차 이동이 가능한지 확인
- 마지막 장에서 "다음" 버튼이 비활성화되거나 숨겨지는지 검증

### 4. OOP deep dive가 agenda에 비노출

- `programming/oop_deep_dive_interactive.html`은 manifest에 의도적으로 제외됨
- agenda/sidebar/navigation에 OOP deep dive 항목이 나타나지 않는지 확인

---

## 가드가 커버해야 할 추가 흐름

### 5. Design Pattern 구역 내 이동

- **순차 이동**: Singleton(#1) -> Factory(#2) -> Strategy(#3) 순서로 "다음" 버튼을 통해 이동
- **직접 점프**: agenda에서 Iterator(#6) 또는 MVC(#8)를 클릭하여 해당 topic으로 직접 이동
- 이동 후 iframe src와 활성 agenda 항목이 일치하는지 검증

### 6. Programming 구역 내 이동

- **순차 이동**: Programming Paradigms Overview(#11) -> Functional Programming(#12) -> Procedural Programming(#13)
- **직접 점프**: agenda에서 Functional Programming(#12)을 클릭하여 직접 이동
- section이 `programming`으로 유지되는지, iframe src가 올바른지 검증

---

## 해소 조건

이 blocker는 다음이 모두 충족되면 해소하고 삭제한다:

1. 프로젝트 루트에 `package.json`이 생성되고 `@playwright/test`가 devDependency로 등록
2. `playwright.config.ts` (또는 `.js`)가 프로젝트에 존재
3. 위 6가지 흐름을 커버하는 guard spec이 작성되고 통과

해소 후 이 파일을 삭제하고, 커밋 메시지에 `test(guard): add presentation flow regression guard`를 사용한다.
