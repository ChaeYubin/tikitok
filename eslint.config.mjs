import { defineConfig, globalIgnores } from 'eslint/config'
import mantine from 'eslint-config-mantine'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettier from 'eslint-config-prettier/flat'
import unusedImports from 'eslint-plugin-unused-imports'

// Mantine preset 중 jsx-a11y가 포함된 블록 제거 (플러그인 중복 등록 이슈)
const mantineWithoutA11y = mantine.filter(config => !(config.plugins && config.plugins['jsx-a11y']))

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  ...mantineWithoutA11y,
  {
    ignores: ['**/*.{mjs,cjs,js,d.ts,d.mts}'],
  },
  prettier,
  {
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      // 사용하지 않는 import 제거
      'unused-imports/no-unused-imports': 'error',
      // 코드 가독성을 위한 빈 줄 규칙
      'padding-line-between-statements': [
        'error',
        // import 다음 빈 줄
        { blankLine: 'always', prev: 'import', next: '*' },
        { blankLine: 'any', prev: 'import', next: 'import' },
        // directive 다음 빈 줄
        { blankLine: 'always', prev: 'directive', next: '*' },
        // block문 (if, for 등) 다음 빈 줄
        {
          blankLine: 'always',
          prev: ['block', 'block-like', 'multiline-block-like'],
          next: '*',
        },
        // const 여러 개는 붙여도 됨
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
        // const 선언 후 제어문 전에 빈 줄
        {
          blankLine: 'always',
          prev: ['const', 'let', 'var'],
          next: ['if', 'switch', 'for', 'while', 'try'],
        },
      ],
      // import 그룹 정렬
      'import/order': [
        'error',
        {
          groups: [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index']],
          'newlines-between': 'always', // 그룹 사이에 항상 빈 줄 추가
          alphabetize: { order: 'asc', caseInsensitive: true }, // 알파벳 순 정렬
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
])

export default eslintConfig
