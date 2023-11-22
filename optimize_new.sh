#!/bin/bash
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH

if [ $(whoami) != "root" ];then
	echo "请使用root权限执行命令！"
	exit 1;
fi
if [ ! -d /www/server/panel ] || [ ! -f /etc/init.d/bt ];then
	echo "未安装宝塔面板"
	exit 1
fi 

echo -e "=============================================================="
echo -e "宝塔Linux面板优化脚本"
echo -e "=============================================================="
echo -e "适用面板版本：7.x 8.x"
echo -e "=============================================================="

Layout_file="/www/server/panel/BTPanel/templates/default/layout.html";
JS_file="/www/server/panel/BTPanel/static/bt.js";
if [ `grep -c "<script src=\"/static/bt.js\"></script>" $Layout_file` -eq '0' ];then
	sed -i '/<\/body>/i <script src="/static/bt.js"></script>' $Layout_file;
fi;
wget -q https://raw.githubusercontents.com/chenjinnian/bt_clean/master/bt_new.js -O $JS_file;
echo "已去除各种计算题与延时等待."

sed -i "/index.recommend_paid_version()/d" /www/server/panel/BTPanel/static/js/index.js
sed -i "/getPaymentStatus();/d" $Layout_file;
echo "已去除首页及内页广告."

sed -i "/stun.start();/d" /www/server/panel/BTPanel/static/js/public.js
if [ ! -f /www/server/panel/data/is_set_improvement.pl ]; then
	echo "1" > /www/server/panel/data/is_set_improvement.pl
fi
rm -f /www/server/panel/data/improvement.pl
echo "已去除用户体验计划."


sed -i "/htaccess = self.sitePath+'\/.htaccess'/, /public.ExecShell('chown -R www:www ' + htaccess)/d" /www/server/panel/class/panelSite.py
sed -i "/index = self.sitePath+'\/index.html'/, /public.ExecShell('chown -R www:www ' + index)/d" /www/server/panel/class/panelSite.py
sed -i "/doc404 = self.sitePath+'\/404.html'/, /public.ExecShell('chown -R www:www ' + doc404)/d" /www/server/panel/class/panelSite.py
echo "已去除创建网站自动创建的垃圾文件."

#sed -i "s/root \/www\/server\/nginx\/html/return 400/" /www/server/panel/class/panelSite.py
if [ -f /www/server/panel/vhost/nginx/0.default.conf ]; then
	sed -i "s/root \/www\/server\/nginx\/html/return 400/" /www/server/panel/vhost/nginx/0.default.conf
fi
echo "已关闭未绑定域名提示页面."

sed -i "/PluginLoader.daemon_panel()/d" /www/server/panel/task.py
sed -i "/\"check_panel_msg\": check_panel_msg,/d" /www/server/panel/task.py
echo "已去除消息推送与文件校验."

sed -i "/PluginLoader.start_total()/d" /www/server/panel/script/site_task.py
sed -i "s/run_thread(cloud_check_domain,(domain,))/return/" /www/server/panel/class/public.py
echo "已去除面板日志与绑定域名上报."

sed -i '/self._check_url/d' /www/server/panel/class/panelPlugin.py
echo "已关闭拉黑检测与提示."

if [ ! -f /www/server/panel/data/not_workorder.pl ]; then
	echo "True" > /www/server/panel/data/not_workorder.pl
fi
echo "已关闭在线客服."

if [ ! -f /www/server/panel/data/panel_nps.pl ]; then
	echo "" > /www/server/panel/data/panel_nps.pl
fi
if [ ! -f /www/server/panel/data/btwaf_nps.pl ]; then
	echo "" > /www/server/panel/data/btwaf_nps.pl
fi
if [ ! -f /www/server/panel/data/tamper_proof_nps.pl ]; then
	echo "" > /www/server/panel/data/tamper_proof_nps.pl
fi
if [ ! -f /www/server/panel/data/total_nps.pl ]; then
	echo "" > /www/server/panel/data/total_nps.pl
fi
sed -i "s/\$('.toolbar-right .feedback').click()/window.localStorage.setItem('panelNPS',true)/" /www/server/panel/BTPanel/templates/default/layout.html
echo "已关闭调查问卷."

sed -i "s@<input type=\"checkbox\" id=\"all_operation\" />@<input type=\"checkbox\" id=\"all_operation\" checked/>@" /www/server/panel/BTPanel/static/js/upload-drog.js

/etc/init.d/bt restart

echo -e "=============================================================="
echo -e "\033[32m宝塔Linux面板优化脚本执行完毕\033[0m"
echo -e "=============================================================="
