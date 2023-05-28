# friend-front

# 第一天

初始化了前台项目

用 **Vite** 脚手架快速构建

`yarn create vite \\用 vite 初始化项目`

整合了组件库 **Vant**

`yarn add vant \\ 整合了 Vant 组件`

修改 main.ts ，全量引入了 Vant

```typescript
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Vant from 'vant'
import 'vant/lib/vant-css/index.css'

createApp(App)
    .use(Vant)
    .mount('#app')
```

