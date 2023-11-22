#!/bin/bash
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH

if [ $(whoami) != "root" ];then
	echo "请使用root权限执行命令！"
	exit 1;
fi
if [ ! -d /www/server/panel ] || [ ! -f /etc/init.d/bt ];then
	echo "未安装aaPanel面板"
	exit 1
fi 

echo -e "=============================================================="
echo -e "aaPanel面板优化脚本"
echo -e "=============================================================="
echo -e "适用aaPanel面板版本：6.8.x"
echo -e "=============================================================="

Layout_file="/www/server/panel/BTPanel/templates/default/layout.html";
JS_file="/www/server/panel/BTPanel/static/bt.js";
if [ `grep -c "<script src=\"/static/bt.js\"></script>" $Layout_file` -eq '0' ];then
	sed -i '/<\/body>/i <script src="/static/bt.js"></script>' $Layout_file;
fi;
wget -q https://raw.githubusercontents.com/chenjinnian/bt_clean/master/aapanel.js -O $JS_file;
echo "已去除各种计算题与延时等待."

sed -i "/index.recommend_paid_version()/d" /www/server/panel/BTPanel/static/js/index.js
echo "已去除首页专业版广告."

sed -i "/htaccess = self.sitePath + '\/.htaccess'/, /public.ExecShell('chown -R www:www ' + htaccess)/d" /www/server/panel/class/panelSite.py
sed -i "/index = self.sitePath + '\/index.html'/, /public.ExecShell('chown -R www:www ' + index)/d" /www/server/panel/class/panelSite.py
sed -i "/doc404 = self.sitePath + '\/404.html'/, /public.ExecShell('chown -R www:www ' + doc404)/d" /www/server/panel/class/panelSite.py
echo "已去除创建网站自动创建的垃圾文件."

sed -i "s/root \/www\/server\/nginx\/html/return 400/" /www/server/panel/class/panelSite.py
if [ -f /www/server/panel/vhost/nginx/0.default.conf ]; then
	sed -i "s/root \/www\/server\/nginx\/html/return 400/" /www/server/panel/vhost/nginx/0.default.conf
fi
echo "已关闭未绑定域名提示页面."

sed -i "/^logs_analysis()/d" /www/server/panel/script/site_task.py
sed -i "s/run_thread(cloud_check_domain,(domain,))/return/" /www/server/panel/class/public.py
echo "已去除绑定域名上报."

/etc/init.d/bt restart

echo -e "=============================================================="
echo -e "\033[32maaPanel优化脚本执行完毕\033[0m"
echo -e "=============================================================="
