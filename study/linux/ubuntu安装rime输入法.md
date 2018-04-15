## ubuntu系统安装 rime输入法

> RIME／中州韻輸入法引擎，是一個跨平臺的輸入法算法框架。基於這一框架，Rime 開發者與其他開源社區的參與者在 Windows、macOS、Linux、Android 等平臺上創造了不同的輸入法前端實現

以上是[RIME官网](http://http://rime.im/)的介绍，是一款开源的跨平台输入法。这里是linux平台的，Windows平台下的是小狼毫，都很好用。

因为系统自带的输入法，不是很好用，而且以前一直用的rime输入法，确实很好用，但是，由于之前没怎么用ubuntu，今天安装，遇到了一些问题，这里记录下

1. 首先 安装 ibus-rime,执行下面命令 

```
sudo apt-get install ibus-rime
```

2.  然后 安装输入方案，选择自己需要的安装

```
# 朙月拼音（預裝）
sudo apt-get install librime-data-luna-pinyin
# 雙拼
sudo apt-get install librime-data-double-pinyin
# 宮保拼音
sudo apt-get install librime-data-combo-pinyin
# 注音、地球拼音
sudo apt-get install librime-data-terra-pinyin librime-data-bopomofo
# 倉頡五代（預裝）
sudo apt-get install librime-data-cangjie5
# 速成五代
sudo apt-get install librime-data-quick5
# 五筆86、袖珍簡化字拼音、五筆畫
sudo apt-get install librime-data-wubi librime-data-pinyin-simp librime-data-stroke-simp
# IPA (X-SAMPA)
sudo apt-get install librime-data-ipa-xsampa
# 上海吳語
sudo apt-get install librime-data-wugniu
# 粵拼
sudo apt-get install librime-data-jyutping
# 中古漢語拼音
sudo apt-get install librime-data-zyenpheng
```

3. 但是安装之后，直接切换输入法的时候，是找不到rime，是需要先去`系统设置->语言支持->键盘输入法系统`，把默认值`fcitx`设置为`IBus`，然后再设置，如果不行就重启系统试试

4. rime的设置文件放在`~/.config/ibus/rime`下的`default.yaml`，执行`vi default.yaml`，编辑文件，把需要用的方案写在`schema_list`中，然后重新部署，再按ctrl+`或者F4，就可以切换方案了，

```
schema_list:
  - schema: wubi_pinyin
  - schema: wubi86

```