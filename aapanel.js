/*
 *aaPanel面板去除各种计算题与延时等待
 *适用aaPanel面板版本：6.8.x
*/
if("undefined" != typeof bt && bt.hasOwnProperty("show_confirm")){
    bt.show_confirm = function(title, msg, fun, error) {
        if (error == undefined) {
            error = ""
        }
        var mess = layer.open({
            type: 1,
            title: title,
            area: "350px",
            closeBtn: 2,
            shadeClose: true,
            content: "<div class='bt-form webDelete pd20 pb70'><p>" + msg + "</p>" + error + "<div class='bt-form-submit-btn'><button type='button' class='btn btn-danger btn-sm bt-cancel'>" + lan.public.cancel + "</button> <button type='button' id='toSubmit' class='btn btn-success btn-sm' >" + lan.public.ok + "</button></div></div>"
        });
        $(".bt-cancel").click(function() {
            layer.close(mess);
        });
        $("#toSubmit").click(function() {
            layer.close(mess);
            fun();
        })
    }
}
if("undefined" != typeof bt && bt.hasOwnProperty("prompt_confirm")){
    bt.prompt_confirm = function (title, msg, callback) {
        layer.open({
            type: 1,
            title: title,
            area: "480px",
            closeBtn: 2,
            btn: ['OK', 'Cancel'],
            content: "<div class='bt-form promptDelete pd20'>\
            	<p>" + msg + "</p>\
            	</div>",
            yes: function (layers, index) {
                layer.close(layers)
                if (callback) callback()
            }
        });
    }
}
if("undefined" != typeof database && database.hasOwnProperty("del_database")){
    database.del_database = function (wid, dbname, callback) {
        var title = typeof dbname === "function" ?'Batch delete databases':'Delete database [ '+ dbname +' ]';
        layer.open({
            type:1,
            title:title,
            icon:0,
            skin:'delete_site_layer',
            area: "530px",
            closeBtn: 2,
            shadeClose: true,
            content:"<div class=\'bt-form webDelete pd30\' id=\'site_delete_form\'>" +
                "<i class=\'layui-layer-ico layui-layer-ico0\'></i>" +
                "<div class=\'f13 check_title\' style=\'margin-bottom: 20px;\'>The deletion may affect the business!</div>" +
                "<div style=\'color:red;margin:18px 0 18px 18px;font-size:14px;font-weight: bold;\'>Note: The data is priceless, please operate with caution! ! !"+(!recycle_bin_db_open?'<br><br>Risk: The DB recycle bin is not enabled, deleting will disappear forever!':'')+"</div>" +
                "</div>",
            btn:[lan.public.ok,lan.public.cancel],
            yes:function(indexs){
                var data = {id: wid,name: dbname};
                if(typeof dbname === "function"){
                    delete data.id;
                    delete data.name;
                }
                layer.close(indexs)
                if(typeof dbname === "function"){
                    dbname(data)
                }else{
                    bt.database.del_database(data, function (rdata) {
                        layer.closeAll()
                        if(rdata.status) database_table.$refresh_table_list(true);
                        if (callback) callback(rdata);
                        bt.msg(rdata);
                    })
                }
            }
        })
    }
}
if("undefined" != typeof site && site.hasOwnProperty("del_site")){
    site.del_site = function(wid, wname, callback) {
        var title = title = typeof wname === "function" ? 'Deleting sites in batches' : lan.site.site_del_title + ' [ '+ wname +' ]';
        layer.open({
            type:1,
            title:title,
            icon:0,
            skin:'delete_site_layer',
            area: "480px",
            closeBtn: 2,
            shadeClose: true,
            content:'\
                <div class="bt-form webDelete pd30" id="site_delete_form">\
                    <i class="layui-layer-ico layui-layer-ico0"></i>\
                    <div class="f13 check_title">' + lan.site.site_del_info + '</div>\
                    <div class="check_type_group">\
                        <label>\
                            <input type="checkbox" name="ftp" />\
                            <span>FTP</span>\
                        </label>\
                        <label>\
                            <input type="checkbox" name="database">\
                            <span>' + lan.site.database + '</span>\
                            ' + (!recycle_bin_db_open ? '<span class="glyphicon glyphicon-info-sign" style="color: red"></span>' : '') + '\
                        </label>\
                        <label style="margin-right: 0;">\
                            <input type="checkbox" name="path">\
                            <span>' + lan.site.root_dir + '</span>\
                            ' + (!recycle_bin_open ? '<span class="glyphicon glyphicon-info-sign" style="color: red"></span>' : '') + '\
                        </label>\
                    </div>\
                </div>\
            ',
            btn:[lan.public.ok,lan.public.cancel],
            success: function (layers, indexs) {
                $(layers).find('.check_type_group label').hover(function(){
                    var name = $(this).find('input').attr('name');
                    if (name === 'data' && !recycle_bin_db_open) {
                        layer.tips('Risky operation: the current database recycle bin is not open, delete the database will disappear forever!', this, {tips: [1, 'red'], time: 0});
                    } else if (name === 'path' && !recycle_bin_open) {
                        layer.tips('Risky operation: The current file recycle bin is not open, delete the site directory will disappear forever!', this, {tips: [1, 'red'], time: 0 });
                    }
                }, function() {
                    layer.closeAll('tips');
                });
            },
            yes:function(indexs){
                var data = {id: wid,webname: wname};
                $('#site_delete_form input[type=checkbox]').each(function (index, item) {
                    if($(item).is(':checked')) data[$(item).attr('name')] = 1
                })
                var is_database = data.hasOwnProperty('database'),is_path = data.hasOwnProperty('path'),is_ftp = data.hasOwnProperty('ftp');
                if((!is_database && !is_path) && (!is_ftp || is_ftp)){
                    if(typeof wname === "function"){
                        wname(data)
                        return false;
                    }
                    bt.site.del_site(data, function (rdata) {
                        layer.close(indexs);
                        if (callback) callback(rdata);
                        bt.msg(rdata);
                    })
                    return false
                }
                if(typeof wname === "function"){
                    delete data.id;
                    delete data.webname;
                }
                layer.close(indexs)
                if(typeof wname === "function"){
                    wname(data)
                }else{
                    bt.site.del_site(data, function (rdata) {
                        layer.closeAll()
                        if (rdata.status) site.get_list();
                        if (callback) callback(rdata);
                        bt.msg(rdata);
                    })
                }
            }
        })
    }
}
if("undefined" != typeof bt && bt.hasOwnProperty("firewall") && bt.firewall.hasOwnProperty("add_accept_port")){
    bt.firewall.add_accept_port = function(type, port, ps, callback) {
        var action = "AddDropAddress";
        if (type == 'port') {
            ports = port.split(':');
            if (port.indexOf('-') != -1) ports = port.split('-');
            for (var i = 0; i < ports.length; i++) {
                if (!bt.check_port(ports[i])) {
                    layer.msg(lan.firewall.port_err, { icon: 5 });
                    return;
                }
            }
            action = "AddAcceptPort";
        }

        loading = bt.load();
        bt.send(action, 'firewall/' + action, { port: port, type: type, ps: ps }, function(rdata) {
            loading.close();
            if (callback) callback(rdata);
        })
    }
}
function SafeMessage(j, h, g, f) {
	if(f == undefined) {
		f = ""
	}
	var mess = layer.open({
		type: 1,
		title: j,
		area: "350px",
		closeBtn: 2,
		shadeClose: true,
		content: "<div class='bt-form webDelete pd20 pb70'><p>" + h + "</p>" + f + "<div class='bt-form-submit-btn'><button type='button' class='btn btn-danger btn-sm bt-cancel'>"+lan.public.cancel+"</button> <button type='button' id='toSubmit' class='btn btn-success btn-sm' >"+lan.public.ok+"</button></div></div>"
	});
	$(".bt-cancel").click(function(){
		layer.close(mess);
	});
	$("#toSubmit").click(function() {
		layer.close(mess);
		g();
	})
}