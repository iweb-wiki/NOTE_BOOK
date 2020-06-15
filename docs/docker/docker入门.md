#Docker 入门

## 优点：

1. 不需要打包系统进镜像所以体积非常小
1. 不需要等待虚拟系统启动所以启动快速资源占用低
1. 沙箱机制保证不同服务之间环境隔离
1. Dockerfile 镜像构建机制让镜像打包部署自动化
1. Docker hub 提供镜像平台方便共享镜像

> VM 是打包了 Guest OS 进入镜像中的，而 Docker 是直接基于宿主系统虚拟化的实例。

## 基础

> Docker 主要有 Dockerfile, Image, Container, Repository 四个基本概念

通过 Dcokerfile 可以生成 Image，可以将自己的 IMage 上传到 Docker Hub 上，也可以直接去下载平台上的自己需要在 Image，下载之后，可以实例生成 Container，镜像启动命令

```bash
docker run [组织名称]/<镜像名称>:[镜像标签]
<!-- 其中除了镜像名称，其它的都是可选参数。组织名称不填默认为 library，镜像标签不填则默认为 latest。例如经典的启动一个 Hello World 镜像的过程如下： -->
```

## 安装

- ubuntu

```bash
sudo apt update

sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo apt update

apt
```
