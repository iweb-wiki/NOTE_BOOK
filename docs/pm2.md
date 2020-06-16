---
title: PM2基本使用
tags: []
date: 2017-04-01 19:18:05
---

# PM2

## 安装

- 可以通过 NPM 安装
- `npm i pm2@latest -g`

## 常用命令

- `pm2 start app.js`：自动
- `pm2 start app.js --name ma-app`：指定项目名字
- `pm2 list|ls`：显示所有 pm2 进程
- `pm2 stop app_id|app_name|all`：停止指定进程
- `pm2 restart app_id|app_name|all`：重启指定进程
- `pm2 reload app_id|app_name|all`：reload 指定进程
- `pm2 delete app_id|app_name|all`：删除进程

### 日志管理

- `pm2 -h`：显示所有的 pm2 logs 命令
- `pm2 logs app_id`：打印对应 id 的日志
- `pm2 logs app_id --err`：仅打印错误日志
- `pm2 logs --line 100`：打印日志的行数
