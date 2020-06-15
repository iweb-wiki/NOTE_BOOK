# 使用 vscode 调试 node 程序

- ctrl+shift+d 进入测试界面

## 添加配置

- 点击添加配置，选择 node 环境,自动生成 launch.json 文
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
```
