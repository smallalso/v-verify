
## Demo

<vuep template="#demo1"></vuep>

<script v-pre type="text/x-template" id="demo1">
  <style>
    .main {
      color: #2c3e50;
    }
    .text {
      color: #4fc08d;
    }
  </style>

  <template>
    <div class="main">
      <h2> Hello <span class="text">{{ name }}</span>!</h2>
      <h2>Features</h2>
      <ul>
        <li v-for="text in features">{{ text }}</li>
      </ul>
    </div>
  </template>

  <script>
    module.exports = {
      data () {
        return {
          name: 'Vuep',
          features: [
            'Vue component spec',
            'Scoped style',
            'UMD and CommonJS build'
          ]
        }
      }
    }
  </script>
</script>


Muse-UI 已经发布在 [npm](https://www.npmjs.com/package/muse-ui), 可以使用 `npm` 和 `yarn` 安装，或者使用 `<script>` 直接在网页中引入。

### 引入图标和字体

Muse-UI 使用了 material design 的字体和图标，需要在网页中引入。

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic">
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
```

### npm / yarn 安装

```bash
npm install --save muse-ui

```

或者

```bash
yarn add muse-ui

```

### 使用 script 标签


```html
<link rel="stylesheet" href="path/to/muse-ui.css">
<script src="path/to/muse-ui.js"></script>
```

> 这里的 **path/to** 需要替换成实际路径