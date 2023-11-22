# 宝塔优化脚本

[![LICENSE](https://img.shields.io/badge/license-Apache--2.0-green)](https://github.com/chenjinnian/bt_clean/blob/main/LICENSE)
[![GitHub release](https://img.shields.io/github/release/chenjinnian/bt_clean.svg)](https://github.com/chenjinnian/bt_clean/releases)
[![GitHub stars](https://img.shields.io/github/stars/chenjinnian/bt_clean)](https://github.com/chenjinnian/bt_clean/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/chenjinnian/bt_clean)](https://github.com/chenjinnian/bt_clean/network/members)
[![GitHub issues](https://img.shields.io/github/issues/chenjinnian/bt_clean)](https://github.com/chenjinnian/bt_clean/issues) 
[![Github downloads](https://poser.pugx.org/chenjinnian/bt_clean/downloads)](https://packagist.org/packages/chenjinnian/bt_clean)



这个是自用的宝塔面板一键优化补丁，主要有以下优化项目：

~~1.去除宝塔面板强制绑定账号~~(7.9版本不支持)

2.去除各种删除操作时的计算题与延时等待

3.去除创建网站自动创建的垃圾文件（index.html、404.html、.htaccess）

4.关闭未绑定域名提示页面，防止有人访问未绑定域名直接看出来是用的宝塔面板

5.关闭活动推荐与在线客服

6.去除自动校验文件与上报信息定时任务

7.去除面板日志与网站绑定域名上报功能

<br><br>

适用宝塔面板版本7.7版本的命令:  

>github官方源：
>>```wget -O optimize.sh https://raw.githubusercontent.com/chenjinnian/bt_clean/master/optimize.sh && bash optimize.sh```

>第三方加速源：
>>```wget -O optimize.sh https://raw.githubusercontents.com/chenjinnian/bt_clean/master/optimize.sh && bash optimize.sh```

一键升（降）级到宝塔7.7版本命令：  

>github官方源：
>>```curl https://raw.githubusercontent.com/chenjinnian/bt_clean/master/update6.sh|bash```

>第三方加速源：
>>```curl https://raw.githubusercontents.com/chenjinnian/bt_clean/master/update6.sh|bash```

<br>

适用宝塔面板7.7以上版本的命令（7.9版本不支持去除强制绑定账号，新增去除面板首页广告）：  

>github官方源：
>>```wget -O optimize.sh https://raw.githubusercontent.com/chenjinnian/bt_clean/master/optimize_new.sh && bash optimize.sh```

>第三方加速源：
>>```wget -O optimize.sh https://raw.githubusercontents.com/chenjinnian/bt_clean/master/optimize_new.sh && bash optimize.sh```

<br>

适用于宝塔国际版aaPanel的命令：  

>github官方源：
>>```wget -O optimize.sh https://raw.githubusercontent.com/chenjinnian/bt_clean/master/optimize_aapanel.sh && bash optimize.sh```

>第三方加速源：
>>```wget -O optimize.sh https://raw.githubusercontents.com/chenjinnian/bt_clean/master/optimize_aapanel.sh && bash optimize.sh```


## 由 JetBrains 赞助

非常感谢 Jetbrains 为我提供的 IDE 开源许可，让我完成此项目和其他开源项目上的开发工作。

[![](https://resources.jetbrains.com/storage/products/company/brand/logos/jb_beam.svg)](https://www.jetbrains.com/?from=https://github.com/chenjinnian)


## License

Apache-2.0
