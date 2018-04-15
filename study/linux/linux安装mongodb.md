
Linux下MongoDB安装和配置详解（一）

一、MongoDB的安装
1.下载安装包
下载方式：
curl -O https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.2.9.tgz
解压缩压缩包：
tar zxvf mongodb-linux-x86_64-3.2.9.tgz
 
2. 安装准备
创建数据库文件夹与日志文件、配置文件：
mkdir -p  /usr/local/server/mongodb/data
touch /usr/local/server/mongodb/mongod.log
touch /usr/local/server/mongodb/mongodb.conf
将mongodb移动到/usr/local/server/mongdb文件夹：
mv mongodb-linux-x86_64-3.2.9/* /usr/local/server/mongodb/
 
3. 启动mongodb(有两种方式)
参数启动：
参数启动可以直接在命令后面加配置参数，也可以加配置文件启动，如下加配置参数启动：
cd /usr/local/server/mongodb/bin/mongod/bin/
./mongod --dbpath=/usr/local/server/mongodb/data --logpath=/usr/local/server/mongodb/mongod.log --logappend  --port=27017 --fork
注：如果加权限就用 --auth 参数，不需要权限就去掉
如果在配置文件中配置好各项参数，则可以使用配置文件启动：
 ./mongod --config /usr/local/server/mongodb/mongodb.conf
附录：mongodb配置文件详解
系统服务启动：
使用系统服务命令启动需要先将服务加入到系统服务中，附录：将mongod添加到系统服务
service mongod start|stop|restart
注：可以将mongodb临时加入系统路径变量中，这样可以不用输入路径直接启动，代码如下：
export PATH=/usr/local/server/mongodb/bin:$PATH
然后可以查看是否成功：echo $PATH

4. 参数解释: --dbpath 数据库路径(数据文件)
--logpath 日志文件路径
--master 指定为主机器
--slave 指定为从机器
--source 指定主机器的IP地址
--pologSize 指定日志文件大小不超过64M.因为resync是非常操作量大且耗时，最好通过设置一个足够大的oplogSize来避免resync(默认的 oplog大小是空闲磁盘大小的5%)。
--logappend 日志文件末尾添加
--port 启用端口号
--fork 在后台运行
--only 指定只复制哪一个数据库
--slavedelay 指从复制检测的时间间隔
--auth 是否需要验证权限登录(用户名和密码)
--config 配置文件位置

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
二、用户授权和管理
1、mongodb安装好后第一次进入是不需要密码的，也没有任何用户，通过shell命令可直接进入，cd到mongodb目录下的bin文件夹，执行命令./mongo即可
运行如下：
[root@namenode mongodb]# ./bin/mongo
MongoDB shell version: 1.8.2
connecting to: test
> use test;
switched to db test
2、添加管理用户（mongoDB 没有无敌用户root，只有能管理用户的用户 userAdminAnyDatabase）,
>use admin
>db.createUser( {user: "admin",pwd: "123456",roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]})
注：添加完用户后可以使用show users或db.system.users.find()查看已有用户
3、添加完管理用户后，关闭MongoDB，并使用权限方式再次开启MongoDB，这里注意不要使用kill直接去杀掉mongodb进程，（如果这样做了，请去data/db目录下删除mongo.lock文件），可以使用db.shutdownServer()关闭
4、使用权限方式启动MongoDB
./mongod --dbpath=/usr/local/server/mongodb/data --logpath=/usr/local/server/mongodb/mongod.log --fork --auth
或者在配置文件中修改：
 auth = true
#noauth = true
5、进入mongo shell，使用admin数据库并进行验证，如果不验证，是做不了任何操作的。 
> use admin
> db.auth("admin","123456")   #认证，返回1表示成功
6、验证之后还是做不了操作，因为admin只有用户管理权限，下面创建用户，用户都跟着库走，
> use mydb
> db.createUser({user: "root",pwd: "123456",roles: [{ role: "readWrite", db: "mydb" }]})
7、使用创建的用户root登录进行数据库操作：
[root@localhost mongodb]# mongo 127.0.0.1/mydb -uroot -p
MongoDB shell version: 3.2.9
Enter password:
connecting to: 127.0.0.1/mydb
> db
mydb
> use mydb
switched to db mydb
> show collections
然后就可以进行增删改查各种数据操作...
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
三、Linux下安装PHP的MongoDB扩展
因为是手动安装的MongoDB，所以也需要编译安装MongoDB扩展，步骤如下：
1)下载最新的php mongodb扩展源码，源码可以在 
http://pecl.php.net/package/mongo下载.

2）解压,进入安装目录

wget http://pecl.php.net/get/mongo-1.4.0.tgz 
tar -zxvf mongo-1.4.0.tgz
cd mongo-1.4.0   
3)进入文件夹后，首先运行phpize来编译扩展的环境
[root@localhost mongo-1.4.0]# /usr/bin/phpize
Configuring for: 
PHP Api Version: 20121113 
Zend Module Api No: 20121212 
Zend Extension Api No: 220121212

4)运行后，我们运行./configure脚本来进行配置

./configure --with-php-config=/usr/local/php/bin/php-config && make && make install
## --with-php-config 这个参数是告诉配置脚本 php-config 这个程序的路径
5)完成后，请编辑你php.ini文件增加一行 
extension=mongo.so 
一般默认的编译php的ini文件/usr/local/php/etc/php.ini 
重启Apache/Nginx[或者/etc/init.d/php-fpm restart] 打开 phpinfo 
看到mongo模块，证明MongoDB的php扩展安装成功。

OK ,至此你可以使用php来操作 MongoDB 了

