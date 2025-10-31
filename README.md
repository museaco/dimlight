### 执行以下命令，在index.html 中使用tailwind

```bash
npx tailwindcss -i ./tailwind-input.css -o ./css/tailwind-output.css --watch
```

## 请始终以rem为单位

100px = 1rem

120px = 1.2rem
22px = 0.22rem
1px = 0.01rem

## 其他

1. 如果对图片使用绝对定位，在浏览器缩放的情况下图片位置不对，请设置图片的宽高

2. 如果使用 背景图片 这些属性需要有

```tailwind
bg-[url('../images/5735656.png')] bg-[left_top] bg-[length:100%_100%] bg-no-repeat
```

