#temp4
- 建议使用 vs code
- `npm install`
- 本架构在每次提交时，都会对js文件进行 eslint 检测，如果检测通不过，则无法提交，所以请严格执行，本架构的语法规则。

"pre-commit": [
        "fix",
        "lint"
    ],
