# 使用vscode调试node程序

- ctrl+shift+d 进入测试界面
## 添加配置

- 点击添加配置，选择node环境,自动生成launch.json文
- `program`会自动将`package.json`中`script`中`start`的值填入，可以修改成自己项目启动的文件
```json

    {
        "type": "node",
        "request": "launch",
        "name": "启动程序",
        "program": "${workspaceFolder}/dist/server.js"
    }
``

- 配置成功之后，`F5`即可开始调试，