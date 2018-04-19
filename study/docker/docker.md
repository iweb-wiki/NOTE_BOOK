# 执行 Docker 命令没有权限的问题

> 在安装outline的时候，需要安装docker，遇到了一些问题，这里记录下。

### 1. 首先安装docker

- 输入下边命令，自动安装docker

```bash
 curl -sS https://get.docker.com/ | sh
```

### 2. 安装docker之后，准备安装outline

- 执行下面命令安装

```bash
wget -qO- https://raw.githubusercontent.com/Jigsaw-Code/outline-server/master/src/server_manager/install_scripts/install_server.sh | bash
```
- 但是我这里并没有那么顺利，提示如下，是说没有权限，执行了`sudo usermod -a -G docker root && newgrp docker`,并没有用

```bash
It seems like you may not have permission to run Docker.  To solve this, you may need to add your user to the docker group. We recommend running "sudo usermod -a -G docker root && newgrp docker" and then attempting to install again.

```

- 解决，按照下面命令执行，应该可以解决

```bash
cat /etc/group | grep docker # 查找 docker 组，确认其是否存在
groups # 列出自己的用户组，确认自己在不在 docker 组中


# 重启服务
sudo service docker restart

# 切换一下用户组（刷新缓存）
newgrp - docker;

```
 - 继续执行安装操作就可以安装了