# tmux 使用

1. 快捷键前缀

```
ctrl + b
```
- 为了使自身的快捷键和其他软件的快捷键互不干扰，Tmux 提供了一个快捷键前缀。当想要使用快捷键时，需要先按下快捷键前缀，然后再按下快捷键。

1. Tmux 的配置文件

-  每当开启一个新的会话时，Tmux 都会先读取 ~/.tmux.conf 这个文件。

- 每当向 ~/.tmux.conf 文件中添加了新的配置，只需要按下 Ctrl-b r 就可以重新加载配置并使新的配置生效，从而免去了开启一个新的会话。

```yaml
bind R source-file ~/.tmux.conf ; display-message "Config reloaded.."
```

1. 窗格

> 多个窗格可以把屏幕分成多个可操作的窗格

 %  水平方向新建窗格
 " 垂直方向新建窗格

1. 窗口

> 窗口是窗格的容器，一个窗口有多个窗格

c 新建一个窗口
w 列出所有在窗口list
编号 前缀加对应的窗口的编号，可以直接切换到对应的窗口


1. 会话

> 会话是窗口的容器

-  新建会话

```bash
tmux new -s <name-of-my-session>
```

- 在tmux中，新建会话

ctrl+b : new -s <session-name>

- 在会话之间切换

 tmux a -t <session-name> 进入指定会话

s 所有会话list

