
# Linux下安装MongoDB

## 一、MongoDB的安装

1. 下载安装包

```bash
#  - 下载方式：
curl -O https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.6.4.tgz
# - 解压缩压缩包：
tar zxvf mongodb-linux-x86_64-3.6.4.tgz
```

2. 安装准备

- 创建数据库文件夹与日志文件、配置文件：

 ```bash
mkdir -p  /usr/local/server/mongodb/data
touch /usr/local/server/mongodb/mongod.log
touch /usr/local/server/mongodb/mongodb.conf
```

- 将mongodb移动到/usr/local/server/mongdb文件夹：

```bash
mv mongodb-linux-x86_64-3.6.4/*  /usr/local/server/mongodb
```
 
3. 启动mongodb(有两种方式)

- 参数启动：

```bash
#   参数启动可以直接在命令后面加配置参数，也可以加配置文件启动，如下加配置参数启动：
./mongod --dbpath=/usr/local/server/mongodb/data --logpath=/usr/local/server/mongodb/mongod.log --logappend  --port=27017 --fork
```

- 如果在配置文件中配置好各项参数，则可以使用配置文件启动：
```bash
 ./mongod --config /usr/local/server/mongodb/mongodb.conf
 mongod -f mongodb.conf
```

- mongodb.conf


```yaml

dbpath=/usr/local/server/mongodb/data #数据库路径
logpath=/usr/local/server/mongodb/mongodb.log #日志输出文件路径
logappend=true #错误日志采用追加模式，配置这个选项后mongodb的日志会追加到现有的日志文件，而不是从新创建一个新文件
journal=true #启用日志文件，默认启用
quiet=true #这个选项可以过滤掉一些无用的日志信息，若需要调试使用请设置为false
port=27017 #端口号 默认为27017
```

- 加入系统路径变量
注：可以将mongodb临时加入系统路径变量中，这样可以不用输入路径直接启动，代码如下：
export PATH=/usr/local/server/mongodb/bin:$PATH
然后可以查看是否成功：echo $PATH


## 二、用户授权和管理

1. mongodb安装好后第一次进入是不需要密码的，也没有任何用户，通过shell命令可直接进入，cd到mongodb目录下的bin文件夹，执行命令./mongo即可

```bash
[root@namenode mongodb]# ./bin/mongo
MongoDB shell version: 1.8.2
connecting to: test
> use test;
switched to db test
```

2. 添加管理用户（mongoDB 没有无敌用户root，只有能管理用户的用户 userAdminAnyDatabase）,

```bash
>use admin
>db.createUser( {user: "admin",pwd: "123456",roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]})
```
- 注：添加完用户后可以使用show users或db.system.users.find()查看已有用户

3. 添加完管理用户后，关闭MongoDB，并使用权限方式再次开启MongoDB，这里注意不要使用kill直接去杀掉mongodb进程，（如果这样做了，请去data/db目录下删除mongo.lock文件），可以使用db.shutdownServer()关闭

4. 使用权限方式启动MongoDB

```bash
./mongod --dbpath=/usr/local/server/mongodb/data --logpath=/usr/local/server/mongodb/mongod.log --fork --auth
或者在配置文件中修改：
 auth = true
#noauth = true
```

5. 进入mongo shell，使用admin数据库并进行验证，如果不验证，是做不了任何操作的。 

```bash
> use admin
> db.auth("admin","123456")   #认证，返回1表示成功
```

6. 验证之后还是做不了操作，因为admin只有用户管理权限，下面创建用户，用户都跟着库走，

```bash
> use mydb
> db.createUser({user: "root",pwd: "123456",roles: [{ role: "readWrite", db: "mydb" }]})
```

7. 使用创建的用户root登录进行数据库操作：

```bash
[root@localhost mongodb]# mongo 127.0.0.1/mydb -uroot -p
MongoDB shell version: 3.2.9
Enter password:
connecting to: 127.0.0.1/mydb
> db
mydb
> use mydb
switched to db mydb
> show collections
```
然后就可以进行增删改查各种数据操作...


