## <center>CentOS 安装 wget</center>

## CentOS wget

- CentOS wget 是一个从网络上自动下载文件的自由工具。它支持 HTTP，HTTPS 和 FTP 协议，可以使用 HTTP 代理. 所谓的自动下载是指，CentOS wget 可以在用户退出系统的之后在后台执行。这意味这你可以登录系统，启动一个 CentOS wget 下载任务，然后退出系统，CentOS wget 将在后台执行直到任务完成，相对于其它大部分浏览器在下载大量数据时需要用户一直的参与，这省去了极大的麻烦。

- wget 可以跟踪 HTML 页面上的链接依次下载来创建远程服务器的本地版本，完全重建原始站点的目录结构。这又常被称作"递归下载"。在递归下载的时候，wget 遵循 Robot Exclusion 标准(/robots.txt). wget 可以在下载的同时，将链接转换成指向本地文件，以方便离线浏览。

- wget 非常稳定,它在带宽很窄的情况下和不稳定网络中有很强的适应性.如果是由于网络的原因下载失败，wget 会不断的尝试，直到整个文件下载完毕。如果是服务器打断下载过程，它会再次联到服务器上从停止的地方继续下载。这对从那些限定了链接时间的服务器上下载大文件非常有用。

## centos 安装 wget(很简单)

```
yum -y install wget

yum -y install setup

yum -y install perl
```

## CentOS 7 关闭防火

用 Service iptables status 已经无效了，

应该使用：systemctl start iptables.serivce

Centos7 中的防火墙调整为 firewalld，试一下 service firewalld stop 关闭防火墙。
