# 动手安装 ss,教程

## 安装具体步骤

- 我用的是 Ubuntu 系统，安装步骤非常简单，一步一步执行下面的命令就好

```
sudo apt-get updata
<!-- 如果服务器没有安装git，需要执行这一步 -->
sudo apt-get install git
sudo apt-get install python-pip
pip install git+https://github.com/shadowsocks/shadowsocks.git@master
```

## 具体使用

#### 直接使用

```
ssserver -c /etc/shadowsocks.json
```

#### 后台使用

```
ssserver -c /etc/shadowsocks.json -d start
ssserver -c /etc/shadowsocks.json -d stop
```
