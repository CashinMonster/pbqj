

var control_type = function() {
	function t() {}
	var e = (__define, t);
	e.prototype;
	return t.control_image = "ImageViewObjectData", t.control_textfield = "TextObjectData", t
}();
egret.registerClass(control_type, "control_type");
var WinBase = function(t) {
	function e() {
		t.call(this), this.touchEnabled = !0
	}
	__extends(e, t);
	var i = (__define, e),
		a = i.prototype;
	return a.create = function(t) {
		this.groupName = t, RES.isGroupLoaded(this.groupName) ? this.creating() : (RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this), RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this), RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this), RES.loadGroup(this.groupName), WndManager.root.loadingView.visible = !0)
	}, a.creating = function() {
		this.createOk()
	}, a.createOk = function() {}, a.Destroy = function() {
		this.parent && this.parent.removeChild(this)
	}, a.onResourceLoadComplete = function(t) {
		t.groupName == this.groupName && (WndManager.root.loadingView.visible = !1, RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this), RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this), RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this), WndManager.root.loadingView.update(), this.creating())
	}, a.onResourceLoadError = function(t) {
		t.groupName == this.groupName && (console.warn("Group:" + t.groupName + " has failed to load"), this.onResourceLoadComplete(t))
	}, a.onResourceProgress = function(t) {
		t.groupName == this.groupName && WndManager.root.loadingView.setProgress(t.itemsLoaded, t.itemsTotal)
	}, e
}(egret.Sprite);
egret.registerClass(WinBase, "WinBase");
var Duihuanjilu = function(t) {
	function e() {
		t.call(this), this.createGameScene(), this.touchEnabled = !0, this.width = 640, this.height = 1036, Tool.center(this), this.addEventListener(egret.Event.ADDED_TO_STAGE, function() {
			var t = this,
				e = this;
			e.alpha = 0, egret.Tween.get(e).to({
				scaleX: .95,
				scaleY: .95,
				alpha: .5
			}, 200).call(function() {
				egret.Tween.get(e).to({
					scaleX: 1,
					scaleY: 1,
					alpha: 1
				}, 200).call(function() {}, t)
			}, this)
		}, this)
	}
	__extends(e, t);
	var i = (__define, e),
		a = i.prototype;
	return a.createGameScene = function() {
		this.addChild(Tool.createBitmapByName("goumaibg_jpg"));
		var t = Tool.createBitmapByName("rank_fh_png");
		t.x = 31, t.y = 18, t.touchEnabled = !0, this.addChild(t), t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fanhuimc, this), this.bg_container = new egret.Sprite, this.addChild(this.bg_container), this.scroller = new egret.ScrollView(this.bg_container), this.scroller.width = 1040, this.scroller.height = 880, this.scroller.x = 0, this.scroller.y = 150, this.scroller.horizotalScrollPolicy = "off", this.scroller.bounces = !0, this.addChild(this.scroller);
		var e = new egret.URLLoader,
			i = new egret.URLRequest;
		i.url = WndManager.root.url_ + "Api/Ware/getBuyRecord";
		var a = new egret.URLVariables("");
		e.addEventListener(egret.Event.COMPLETE, this.updateRank, this), i.method = egret.URLRequestMethod.POST, i.data = a, e.load(i)
	}, a.jiaoyijilu = function() {}, a.updateRank = function(t) {
		var e = JSON.parse(t.target.data);
		if(egret.log(e.status), 1 == e.status)
			for(var i = 0; i < e.data.record.length; i++) {
				var a = Tool.createBitmapByName("goumaikuang_png");
				//a.x = 28, a.y = 200 * i, this.bg_container.addChild(a), this.win = Tool.createTextFiled(80, 40 + 200 * i, 500, 50, "商品名称：" + e.data.record[i].title, 28, 5053713, !0), this.bg_container.addChild(this.pkwin), this.gamewin = Tool.createTextFiled(80, 120 + 200 * i, 500, 150, "兑换码：" + e.data.record[i].ticket, 28, 5053713, !0), this.bg_container.addChild(this.gamewin), this.maxwin = Tool.createTextFiled(80, 80 + 200 * i, 500, 50, "有效期：" + e.data.record[i].expiry_date, 28, 5053713, !0), this.bg_container.addChild(this.maxwin)
			a.x = 28, a.y = 200 * i, this.bg_container.addChild(a), this.pkwin = Tool.createTextFiled(80, 40 + 200 * i, 500, 50, "商品名称：" + e.data.record[i].title, 28, 5053713, !0), this.bg_container.addChild(this.pkwin), this.gamewin = Tool.createTextFiled(80, 120 + 200 * i, 500, 150, "兑换码：" + e.data.record[i].ticket, 28, 5053713, !0), this.bg_container.addChild(this.gamewin), this.maxwin = Tool.createTextFiled(80, 80 + 200 * i, 500, 50, "有效期：" + e.data.record[i].expiry_date, 28, 5053713, !0), this.bg_container.addChild(this.maxwin)
			}
		this.closeGame = new egret.Sprite, this.closeGame.graphics.beginFill(0, 0), this.closeGame.graphics.drawRect(0, 0, 110, 115), this.closeGame.graphics.endFill(), this.closeGame.x = 362, this.closeGame.y = 776, this.closeGame.touchEnabled = !0, this.closeGame.name = "closeGame", this.addChild(this.closeGame), this.closeGame.addEventListener(egret.TouchEvent.TOUCH_TAP, this.swichClick, this)
	}, a.swichClick = function(t) {
		var e = t.currentTarget.name;
		switch(e) {
			case "closeGame":
//				alert("关闭")
		}
	}, a.fanhuimc = function() {
		WndManager.switchWnd(e, WIN_OPERATOR.WIN_CLOSE_DELETE), WndManager.switchWnd(Shoping, WIN_OPERATOR.WIN_OPEN_SHOW)
	}, e
}(WinBase);
egret.registerClass(Duihuanjilu, "Duihuanjilu");
var Fortune = function(t) {
	function e() {
		t.call(this), this.ok = {
			gameinn: "165",
			pkinn: "131",
			pkwin: "66%",
			gamewin: "51%",
			maxwin: "73%"
		}, this.createGameScene(), this.touchEnabled = !0, this.width = 640, this.height = 1036, Tool.center(this), this.addEventListener(egret.Event.ADDED_TO_STAGE, function() {
			var t = this,
				e = this;
			e.alpha = 0, egret.Tween.get(e).to({
				scaleX: .95,
				scaleY: .95,
				alpha: .5
			}, 200).call(function() {
				egret.Tween.get(e).to({
					scaleX: 1,
					scaleY: 1,
					alpha: 1
				}, 200).call(function() {}, t)
			}, this)
		}, this)
	}
	__extends(e, t);
	var i = (__define, e),
		a = i.prototype;
	return a.createGameScene = function() {
		this.addChild(Tool.createBitmapByName("fortune_bg_jpg"));
		var t = Tool.createBitmapByName("rank_fh_png");
		t.x = 31, t.y = 18, t.touchEnabled = !0, this.addChild(t), t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fanhuimc, this), this.updateHead(), this.headMask = Tool.createBitmapByName("fortune_gai_png"), this.headMask.x = 20, this.headMask.y = 160, this.addChild(this.headMask), this.money = Tool.getBitmapText("fortune_font_fnt"), this.money.x = 275, this.money.y = 235, this.money.scaleX = this.money.scaleY = .7, this.addChild(this.money), this.money.text = String(Mode.money), this.log = Tool.createBitmapByName("fortune_log_png"), this.log.x = 438, this.log.y = 187, this.log.touchEnabled = !0, this.addChild(this.log), this.log.addEventListener(egret.TouchEvent.TOUCH_TAP, this.jiaoyijilu, this);
		var e = new egret.URLLoader,
			i = new egret.URLRequest;
		i.url = WndManager.root.url_ + "Api/User/getTreasureCenter";
		var a = new egret.URLVariables("");
		e.addEventListener(egret.Event.COMPLETE, this.updateRank, this), i.method = egret.URLRequestMethod.POST, i.data = a, e.load(i)
	}, a.jiaoyijilu = function() {
		WndManager.switchWnd(e, WIN_OPERATOR.WIN_CLOSE_DELETE), WndManager.switchWnd(Fortunejilu, WIN_OPERATOR.WIN_OPEN_SHOW)
	}, a.updateRank = function(t) {
		var e = JSON.parse(t.target.data);
		egret.log(e.status), egret.log(e.data.treasure_center.nickname), this.nickName = Tool.createTextFiled(150, 180, 250, 50, e.data.treasure_center.nickname, 28, 5053713, !0), this.addChild(this.nickName), this.gameinn = Tool.createTextFiled(210, 460, 120, 50, e.data.treasure_center.bet_win_time, 28, 5053713, !0), this.addChild(this.gameinn), this.pkinn = Tool.createTextFiled(75, 550, 120, 50, e.data.treasure_center.pk_win_rate, 28, 5053713, !0), this.addChild(this.pkinn), this.pkwin = Tool.createTextFiled(280, 680, 120, 50, e.data.treasure_center.pk_total_rate, 36, 5053713, !0), this.addChild(this.pkwin), this.gamewin = Tool.createTextFiled(510, 650, 120, 50, e.data.treasure_center.bet_win_rate, 28, 5053713, !0), this.addChild(this.gamewin), this.maxwin = Tool.createTextFiled(403, 855, 120, 50, e.data.treasure_center.max_success, 24, 5053713, !0), this.addChild(this.maxwin), this.closeGame = new egret.Sprite, this.closeGame.graphics.beginFill(0, 0), this.closeGame.graphics.drawRect(0, 0, 110, 115), this.closeGame.graphics.endFill(), this.closeGame.x = 362, this.closeGame.y = 776, this.closeGame.touchEnabled = !0, this.closeGame.name = "closeGame", this.addChild(this.closeGame), this.closeGame.addEventListener(egret.TouchEvent.TOUCH_TAP, this.swichClick, this)
	}, a.swichClick = function(t) {
		var e = t.currentTarget.name;
		switch(e) {
			case "closeGame":
//				alert("关闭")
		}
	}, a.updateHead = function() {
		this.head && this.removeChild(this.head), this.head = this.getHeadImg(), this.head.x = 75, this.head.y = 220, this.addChild(this.head)
	}, a.getHeadImg = function() {
		var t = new egret.Sprite,
			e = Tool.createBitmapByName(this.getHeadStr());
		e.scaleX = e.scaleY = .5, e.x = -25, e.y = -40;
		var i = this.getCircle();
		return t.addChild(e), t.addChild(i), e.mask = i, t
	}, a.getHeadStr = function() {
		if(Mode.money < 5e5) {
			if("LittleGril" == Mode.xuanzerole) return Mode.mo[0];
			if("MatureWoman" == Mode.xuanzerole) return Mode.jin[0];
			if("LoserMan" == Mode.xuanzerole) return Mode.fa[0];
			if("TyrantMan" == Mode.xuanzerole) return Mode.hao[0]
		} else if(Mode.money >= 5e5 && Mode.money < 1e6) {
			if("LittleGril" == Mode.xuanzerole) return Mode.mo[1];
			if("MatureWoman" == Mode.xuanzerole) return Mode.jin[1];
			if("LoserMan" == Mode.xuanzerole) return Mode.fa[1];
			if("TyrantMan" == Mode.xuanzerole) return Mode.hao[1]
		} else {
			if("LittleGril" == Mode.xuanzerole) return Mode.mo[2];
			if("MatureWoman" == Mode.xuanzerole) return Mode.jin[2];
			if("LoserMan" == Mode.xuanzerole) return Mode.fa[2];
			if("TyrantMan" == Mode.xuanzerole) return Mode.hao[2]
		}
	}, a.getCircle = function() {
		var t = new egret.Shape;
		return t.graphics.beginFill(0, 1), t.graphics.drawCircle(0, 0, 43), t.graphics.endFill(), t
	}, a.fanhuimc = function() {
		WndManager.switchWnd(e, WIN_OPERATOR.WIN_CLOSE_DELETE), WndManager.switchWnd(Home, WIN_OPERATOR.WIN_OPEN_SHOW)
	}, e
}(WinBase);
egret.registerClass(Fortune, "Fortune");
var Fortunejilu = function(t) {
	function e() {
		t.call(this), this.createGameScene(), this.touchEnabled = !0, this.width = 640, this.height = 1036, Tool.center(this), this.addEventListener(egret.Event.ADDED_TO_STAGE, function() {
			var t = this,
				e = this;
			e.alpha = 0, egret.Tween.get(e).to({
				scaleX: .95,
				scaleY: .95,
				alpha: .5
			}, 200).call(function() {
				egret.Tween.get(e).to({
					scaleX: 1,
					scaleY: 1,
					alpha: 1
				}, 200).call(function() {}, t)
			}, this)
		}, this)
	}
	__extends(e, t);
	var i = (__define, e),
		a = i.prototype;
	return a.createGameScene = function() {
		this.addChild(Tool.createBitmapByName("lishi_bg_jpg"));
		var t = Tool.createBitmapByName("rank_fh_png");
		t.x = 31, t.y = 18, t.touchEnabled = !0, this.addChild(t), t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fanhuimc, this), this.headMask = Tool.createBitmapByName("lishi_btn_png"), this.headMask.x = 20, this.headMask.y = 140, this.addChild(this.headMask), this.log = Tool.createBitmapByName("pkjilu_btn_png"), this.log.x = 228, this.log.y = 140, this.log.touchEnabled = !0, this.addChild(this.log), this.log.alpha = .6, this.log.addEventListener(egret.TouchEvent.TOUCH_TAP, this.jiaoyijilu, this), this.bg_container = new egret.Sprite, this.addChild(this.bg_container), this.scroller = new egret.ScrollView(this.bg_container), this.scroller.width = 640, this.scroller.height = 800, this.scroller.x = 0, this.scroller.y = 240, this.scroller.horizotalScrollPolicy = "off", this.scroller.bounces = !0, this.addChild(this.scroller);
		var e = new egret.URLLoader,
			i = new egret.URLRequest;
		i.url = WndManager.root.url_ + "Api/User/getBetRecord";
		var a = new egret.URLVariables("");
		e.addEventListener(egret.Event.COMPLETE, this.updateRank, this), i.method = egret.URLRequestMethod.POST, i.data = a, e.load(i)
	}, a.jiaoyijilu = function() {
		WndManager.switchWnd(e, WIN_OPERATOR.WIN_CLOSE_DELETE), WndManager.switchWnd(Pklishijilu, WIN_OPERATOR.WIN_OPEN_SHOW)
	}, a.updateRank = function(t) {
		var e = JSON.parse(t.target.data);
		if(egret.log(e.status), 1 == e.status) {
			egret.log("yyyy:" + e.data.bet_record.length);
			for(var i = 0; i < e.data.bet_record.length; i++) {
				var a = Tool.createBitmapByName("lishi_kuang_png");
				a.x = 50, a.y = 200 * i, this.bg_container.addChild(a), this.pkwin = Tool.createTextFiled(80, 35 + 200 * i, 500, 50, "押注金额：" + e.data.bet_record[i].money, 28, 16777215, !0), this.bg_container.addChild(this.pkwin);
				var n = "";
				n = "win" == e.data.bet_record[i].status ? "赢" : "lose" == e.data.bet_record[i].status ? "输" : "未出结果", this.gamewin = Tool.createTextFiled(80, 125 + 200 * i, 500, 150, "押注结果：" + n, 28, 16777215, !0), this.bg_container.addChild(this.gamewin), this.maxwin = Tool.createTextFiled(80, 78 + 200 * i, 500, 50, "交易时间：" + e.data.bet_record[i].add_time, 28, 16777215, !0), this.bg_container.addChild(this.maxwin)
			}
		}
		this.closeGame = new egret.Sprite, this.closeGame.graphics.beginFill(0, 0), this.closeGame.graphics.drawRect(0, 0, 110, 115), this.closeGame.graphics.endFill(), this.closeGame.x = 362, this.closeGame.y = 776, this.closeGame.touchEnabled = !0, this.closeGame.name = "closeGame", this.addChild(this.closeGame), this.closeGame.addEventListener(egret.TouchEvent.TOUCH_TAP, this.swichClick, this)
	}, a.swichClick = function(t) {
		var e = t.currentTarget.name;
		switch(e) {
			case "closeGame":
//				alert("关闭")
		}
	}, a.fanhuimc = function() {
		WndManager.switchWnd(e, WIN_OPERATOR.WIN_CLOSE_DELETE), WndManager.switchWnd(Fortune, WIN_OPERATOR.WIN_OPEN_SHOW)
	}, e
}(WinBase);
egret.registerClass(Fortunejilu, "Fortunejilu");
var GamehelpPk = function(t) {
	function e() {
		t.call(this), this.createGameScene(), this.touchEnabled = !0, this.width = 640, this.height = 1036, Tool.center(this), this.addEventListener(egret.Event.ADDED_TO_STAGE, function() {
			var t = this,
				e = this;
			e.alpha = 0, egret.Tween.get(e).to({
				scaleX: .95,
				scaleY: .95,
				alpha: .5
			}, 200).call(function() {
				egret.Tween.get(e).to({
					scaleX: 1,
					scaleY: 1,
					alpha: 1
				}, 200).call(function() {}, t)
			}, this)
		}, this)
	}
	__extends(e, t);
	var i = (__define, e),
		a = i.prototype;
	return a.createGameScene = function() {
		WndManager.root.qiandaois = !1, this.bg = Tool.createBitmapByName("pkbg_jpg"), this.addChild(this.bg), this.bg.touchEnabled = !0, this.bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fanhui, this);
		var t = new egret.URLLoader,
			e = new egret.URLRequest;
		e.url = WndManager.root.url_ + "Api/Index";
		var i = new egret.URLVariables("");
		t.addEventListener(egret.Event.COMPLETE, this.updateRank, this), e.method = egret.URLRequestMethod.POST, e.data = i, t.load(e);
		
	}, a.updateRank = function(t) {
		var e = JSON.parse(t.target.data);
		egret.log("data" + e.data.user_info.balance), Mode.money = Number(e.data.user_info.balance), Mode.talk = e.data.user_info.motto, Mode.xuanzerole = e.data.user_info.role, null != e.data.open_prize && (Mode.PK_result = e.data.open_prize.pk.result, Mode.PK_money = e.data.open_prize.pk.money);
		var i = new egret.URLLoader,
			a = new egret.URLRequest;
		a.url = WndManager.root.url_ + "Api/Game/checkUserPk";
		var n = new egret.URLVariables("");
		i.addEventListener(egret.Event.COMPLETE, this.updateRk3, this), a.method = egret.URLRequestMethod.POST, a.data = n, i.load(a)
	}, a.updateRk3 = function(t) {
		var i = JSON.parse(t.target.data);
		1 == i.status ? this.pk_num0() : "" != Mode.PK_result ? (this.tancdi = new egret.Sprite, this.tancdi.graphics.beginFill(0, .6), this.tancdi.graphics.drawRect(0, 0, 640, 1036), this.tancdi.graphics.endFill(), this.addChild(this.tancdi), this.tancdi.touchEnabled = !0, this.tancdi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tuichupk_tc, this), "win" == Mode.PK_result ? (this.tancyuck = Tool.createBitmapByName("home_pk_cg_png"), this.tancyuck.x = 80, this.tancyuck.y = 288, this.addChild(this.tancyuck)) : (this.tancyuck = Tool.createBitmapByName("home_pk_sb_png"), this.tancyuck.x = 80, this.tancyuck.y = 288, this.addChild(this.tancyuck))) : (Mode.PKnikename1 = i.data.user_info.oneself.nickname, Mode.PKnikename2 = i.data.user_info.other.nickname, Mode.xuanzerole2 = i.data.user_info.oneself.role, Mode.xuanzerole = i.data.user_info.other.role, Mode.yazhu_pic = i.data.pk_record.user_forecast, Mode.yazhu_self = i.data.pk_record.robot_forecast, WndManager.switchWnd(e, WIN_OPERATOR.WIN_CLOSE_DELETE), WndManager.switchWnd(GamePk, WIN_OPERATOR.WIN_OPEN_SHOW))
//		, WndManager.switchWnd(GamePk, WIN_OPERATOR.WIN_OPEN_SHOW)
	}, a.tuichupk_tc = function() {
		this.removeChild(this.tancdi), this.removeChild(this.tancyuck), this.removeChild(this.tancbtn), this.removeChild(this.tanctxt)
	}, a.yichupknum = function() {
		this.removeChild(this.tancdi), this.removeChild(this.tancyuck), this.removeChild(this.tancbtn), this.removeChild(this.tanctxt), WndManager.switchWnd(e, WIN_OPERATOR.WIN_CLOSE_DELETE), WndManager.switchWnd(Home, WIN_OPERATOR.WIN_OPEN_SHOW)
	}, a.kong = function() {}, a.pk_num0 = function() {
		this.tancdi = new egret.Sprite, this.tancdi.graphics.beginFill(0, .6), this.tancdi.graphics.drawRect(0, 0, 640, 1036), this.tancdi.graphics.endFill(), this.addChild(this.tancdi), this.tancyuck = Tool.createBitmapByName("home_yuce_wz_png"), this.tancyuck.x = 55, this.tancyuck.y = 130, this.addChild(this.tancyuck), this.tancyuck.touchEnabled = !0, this.tancyuck.addEventListener(egret.TouchEvent.TOUCH_TAP, this.kong, this), this.tancbtn = Tool.createBitmapByName("home_yuce_btn_png"), this.tancbtn.pixelHitTest = !0, this.tancbtn.touchEnabled = !0, this.tancbtn.x = 210, this.tancbtn.y = 395, this.addChild(this.tancbtn), this.tancbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.pkqingqiu2, this), this.tanctxt = Tool.createTextFiled(170, 305, 340, 50, "", 35, 9117728), this.tanctxt.type = "input", this.tanctxt.stroke = 2, this.tanctxt.strokeColor = 16777215, this.tanctxt.restrict = "0-9", this.tanctxt.maxChars = 7, this.addChild(this.tanctxt)
	}, a.pkqingqiu2 = function() {
		var t = new egret.URLLoader,
			e = new egret.URLRequest;
		e.url = WndManager.root.url_ + "Api/Game/doUserPk";
		var i = new egret.URLVariables("?user_forecast=" + this.tanctxt.text + "&openid=" + WndManager.root.helpforId + "&other_forecast=" + WndManager.root.PKyuce_num);
		t.addEventListener(egret.Event.COMPLETE, this.updateRkyz2, this), e.method = egret.URLRequestMethod.POST, e.data = i, t.load(e)
	}, a.updateRkyz2 = function(t) {
		var e = JSON.parse(t.target.data);
		if(1 == e.status) {
			var i = new egret.URLLoader,
				a = new egret.URLRequest;
			a.url = WndManager.root.url_ + "Api/Game/checkUserPk";
			var n = new egret.URLVariables("");
			i.addEventListener(egret.Event.COMPLETE, this.updateRk, this), a.method = egret.URLRequestMethod.POST, a.data = n, i.load(a)
		} else alert(e.info)
	}, a.updateRk = function(t) {
		var i = JSON.parse(t.target.data);
		1201 == i.data.errno ? (alert(i.info), WndManager.switchWnd(e, WIN_OPERATOR.WIN_CLOSE_DELETE), WndManager.switchWnd(Home, WIN_OPERATOR.WIN_OPEN_SHOW)) : 1204 == i.data.errno && (Mode.PKnikename1 = i.data.user_info.oneself.nickname, Mode.PKnikename2 = i.data.user_info.other.nickname, Mode.xuanzerole2 = i.data.user_info.oneself.role, Mode.xuanzerole = i.data.user_info.other.role, Mode.yazhu_pic = i.data.pk_record.user_forecast, Mode.yazhu_self = i.data.pk_record.robot_forecast, WndManager.switchWnd(e, WIN_OPERATOR.WIN_CLOSE_DELETE), WndManager.switchWnd(GamePk, WIN_OPERATOR.WIN_OPEN_SHOW), WndManager.switchWnd(GamePk, WIN_OPERATOR.WIN_OPEN_SHOW))
//		,WndManager.switchWnd(GamePk, WIN_OPERATOR.WIN_OPEN_SHOW)
	}, a.fanhui = function() {
		WndManager.switchWnd(e, WIN_OPERATOR.WIN_CLOSE_DELETE), WndManager.switchWnd(Home, WIN_OPERATOR.WIN_OPEN_SHOW)
	}, a.Destroy = function() {}, e
}(WinBase);
egret.registerClass(GamehelpPk, "GamehelpPk");

//pk页面
var GamePk = function(t) {
	function e() {
		t.call(this), this.createGameScene(), this.touchEnabled = !0, this.width = 640, this.height = 1036, Tool.center(this), this.addEventListener(egret.Event.ADDED_TO_STAGE, function() {
			var t = this,
				e = this;
			e.alpha = 0, egret.Tween.get(e).to({
				scaleX: .95,
				scaleY: .95,
				alpha: .5
			}, 200).call(function() {
				egret.Tween.get(e).to({
					scaleX: 1,
					scaleY: 1,
					alpha: 1
				}, 200).call(function() {}, t)
			}, this)
		}, this)
	}
	__extends(e, t);
	var i = (__define, e),
		a = i.prototype;
	return a.createGameScene = function() {
		this.bg = Tool.createBitmapByName("pkbg_jpg"), this.addChild(this.bg), this.txt1 = Tool.createBitmapByName("txt1_png"), this.txt1.x = 180, this.txt1.y = 130, this.txt1.anchorOffsetX = this.txt1.width / 2, this.txt1.anchorOffsetY = this.txt1.height / 2, this.addChild(this.txt1), egret.Tween.get(this.txt1, {
			loop: !0
		}).to({
			rotation: 10
		}, 100).to({
			rotation: 0
		}, 100), this.txt2 = Tool.createBitmapByName("txt2_png"), this.txt2.x = 440, this.txt2.y = 700, this.txt2.anchorOffsetX = this.txt2.width / 2, this.txt2.anchorOffsetY = this.txt2.height / 2, this.addChild(this.txt2), egret.Tween.get(this.txt2, {
			loop: !0
		}).to({
			rotation: 10
		}, 100).to({
			rotation: 0
		}, 100), this.vs_mc = Tool.createBitmapByName("vs_png"), this.vs_mc.x = 320, this.vs_mc.y = 500, this.vs_mc.anchorOffsetX = this.vs_mc.width / 2, this.vs_mc.anchorOffsetY = this.vs_mc.height / 2, this.addChild(this.vs_mc), egret.Tween.get(this.vs_mc, {
			loop: !0
		}).to({
			scaleX: .8,
			scaleY: .8
		}, 300).to({
			scaleX: 1,
			scaleY: 1
		}, 300), this.textField2 = Tool.createTextFiled(75, 355, 150, 50, Mode.yazhu_pic, 24, 0), this.textField2.strokeColor = 16777215, this.textField2.textAlign = "center", this.addChild(this.textField2), this.textField = Tool.createTextFiled(375, 900, 150, 50, Mode.yazhu_self, 24, 0), this.textField.strokeColor = 16777215, this.textField.textAlign = "center", this.addChild(this.textField), this.textName = Tool.createTextFiled(75, 305, 150, 50, Mode.PKnikename1, 24, 16777215), this.textName.strokeColor = 16777215, this.textName.textAlign = "center", this.addChild(this.textName), this.textName2 = Tool.createTextFiled(375, 850, 150, 50, Mode.PKnikename2, 24, 16777215), this.textName2.strokeColor = 16777215, this.textName2.textAlign = "center", this.addChild(this.textName2), "LittleGril" == Mode.xuanzerole && (this.body1 = Tool.createBitmapByName("mov3_body_png"), this.tou_img1 = Tool.createBitmapByName("mov3_tou_png"), this.body1.x = -20, this.body1.y = 603, this.tou_img1.x = 130, this.tou_img1.y = 815, this.addChild(this.tou_img1), this.addChild(this.body1)), "MatureWoman" == Mode.xuanzerole && (this.body1 = Tool.createBitmapByName("jinv3_body_png"), this.tou_img1 = Tool.createBitmapByName("jinv3_tou_png"), this.body1.x = -20, this.body1.y = 603, this.tou_img1.x = 130, this.tou_img1.y = 815, this.addChild(this.body1), this.addChild(this.tou_img1)), "LoserMan" == Mode.xuanzerole && (this.body1 = Tool.createBitmapByName("fav3_body_png"), this.tou_img1 = Tool.createBitmapByName("fav3_tou_png"), this.body1.x = -20, this.body1.y = 630, this.tou_img1.x = 140, this.tou_img1.y = 830, this.addChild(this.body1), this.addChild(this.tou_img1)), "TyrantMan" == Mode.xuanzerole && (this.body1 = Tool.createBitmapByName("haogev3_body_png"), this.tou_img1 = Tool.createBitmapByName("haogev3_tou_png"), this.body1.x = -20, this.body1.y = 615, this.tou_img1.x = 165, this.tou_img1.y = 815, this.addChild(this.body1), this.addChild(this.tou_img1)), this.addChild(this.body1), this.addChild(this.tou_img1), this.tou_img1.anchorOffsetX = this.tou_img1.width / 2, this.tou_img1.anchorOffsetY = this.tou_img1.height / 2, egret.Tween.get(this.tou_img1, {
			loop: !0
		}).to({
			rotation: 10
		}, 300).to({
			rotation: 0
		}, 300), "LittleGril" == Mode.xuanzerole2 && (this.body2 = Tool.createBitmapByName("mov3_body_png"), this.tou_img2 = Tool.createBitmapByName("mov3_tou_png"), this.body2.x = 350, this.body2.y = 8, this.tou_img2.x = 490, this.tou_img2.y = 220, this.addChild(this.tou_img2), this.addChild(this.body2)), "MatureWoman" == Mode.xuanzerole2 && (this.body2 = Tool.createBitmapByName("jinv3_body_png"), this.tou_img2 = Tool.createBitmapByName("jinv3_tou_png"), this.body2.x = 340, this.body2.y = 10, this.tou_img2.x = 490, this.tou_img2.y = 220, this.addChild(this.body2), this.addChild(this.tou_img2)), "LoserMan" == Mode.xuanzerole2 && (this.body2 = Tool.createBitmapByName("fav3_body_png"), this.tou_img2 = Tool.createBitmapByName("fav3_tou_png"), this.body2.x = 330, this.body2.y = 25, this.tou_img2.x = 490, this.tou_img2.y = 220, this.addChild(this.body2), this.addChild(this.tou_img2)), "TyrantMan" == Mode.xuanzerole2 && (this.body2 = Tool.createBitmapByName("haogev3_body_png"), this.tou_img2 = Tool.createBitmapByName("haogev3_tou_png"), this.body2.x = 300, this.body2.y = 30, this.tou_img2.x = 490, this.tou_img2.y = 220, this.addChild(this.body2), this.addChild(this.tou_img2)), this.tou_img2.anchorOffsetX = this.tou_img2.width / 2, this.tou_img2.anchorOffsetY = this.tou_img2.height / 2, egret.Tween.get(this.tou_img2, {
			loop: !0
		}).to({
			rotation: 10
		}, 300).to({
			rotation: 0
		}, 300), this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fanhui, this), this.tou_img3 = Tool.createBitmapByName("paobu_btn_png"), this.tou_img3.x = 220, this.tou_img3.y = 960, this.addChild(this.tou_img3)
	}, a.fanhui = function() {
		WndManager.switchWnd(e, WIN_OPERATOR.WIN_CLOSE_DELETE), WndManager.switchWnd(Home, WIN_OPERATOR.WIN_OPEN_SHOW)
	}, a.Destroy = function() {
		this.removeChild(this.bg), this.removeChild(this.txt1), this.removeChild(this.txt2), this.removeChild(this.vs_mc), this.removeChild(this.textField2), this.removeChild(this.textField), this.removeChild(this.body1), this.removeChild(this.body2), this.removeChild(this.tou_img1), this.removeChild(this.tou_img2)
	}, e
}(WinBase);
egret.registerClass(GamePk, "GamePk");





var GamePrize = function(t) {
	function e() {
		t.call(this), this.jianpzbX = [], this.jianpzbY = [], this.jianpro = [], this.jianclo = [], this.jiangpingArr = [], this.jiangping_txtArr = [], this.createGameScene(), this.touchEnabled = !0, this.width = 640, this.height = 1036, Tool.center(this), this.addEventListener(egret.Event.ADDED_TO_STAGE, function() {
			var t = this,
				e = this;
			e.alpha = 0, egret.Tween.get(e).to({
				scaleX: .95,
				scaleY: .95,
				alpha: .5
			}, 200).call(function() {
				egret.Tween.get(e).to({
					scaleX: 1,
					scaleY: 1,
					alpha: 1
				}, 200).call(function() {}, t)
			}, this)
		}, this)
	}
	__extends(e, t);
	var i = (__define, e),
		a = i.prototype;
	return a.createGameScene = function() {
		this.jianpzbX = [-110, -180, -150, -40, 90, 175, 155, 40], this.jianpzbY = [-140, -35, 90, 165, 145, 45, -95, -170], this.jianpro = [-25, -65, -110, -160, 155, 120, 75, 25], this.jianclo = [16777215, 16525824, 16777215, 16525824, 16777215, 16525824, 16777215, 16525824], this.addChild(Tool.createBitmapByName("choujiang_jpg"));
		var t = new egret.URLLoader,
			e = new egret.URLRequest;
		e.url = WndManager.root.url_ + "Api/Game/getPrizeList";
		var i = new egret.URLVariables("");
		t.addEventListener(egret.Event.COMPLETE, this.updateRank, this), e.method = egret.URLRequestMethod.POST, e.data = i, t.load(e)
	}, a.updateRank = function(t) {
		var e = JSON.parse(t.target.data);
		if(egret.log(e.status), 1 == e.status) {
			this.txt1RQ = new egret.Sprite, this.txt1RQ.x = 320, this.txt1RQ.y = 460, this.txt1RQ.anchorOffsetX = this.txt1RQ.width / 2, this.txt1RQ.anchorOffsetY = this.txt1RQ.height / 2, this.addChild(this.txt1RQ), this.txt1 = Tool.createBitmapByName("zhuanpan_png"), this.txt1.anchorOffsetX = this.txt1.width / 2, this.txt1.anchorOffsetY = this.txt1.height / 2, this.txt1RQ.addChild(this.txt1);
			for(var i = 0; i < e.data.prize_list.length; i++) {
				this.jiangpingArr.push(e.data.prize_list[i].name);
				var a = Tool.createTextFiled(this.jianpzbX[i], this.jianpzbY[i], 80, 100, e.data.prize_list[i].name, 20, this.jianclo[i], !1);
				a.rotation = this.jianpro[i], this.txt1RQ.addChild(a)
			}
			this.txt2 = Tool.createBitmapByName("choujiangbtn_png"), this.txt2.x = 320, this.txt2.y = 450, this.txt2.anchorOffsetX = this.txt2.width / 2, this.txt2.anchorOffsetY = this.txt2.height / 2, this.addChild(this.txt2), this.txt2.touchEnabled = !0, this.txt2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startzhuan, this);
			var n = Tool.createBitmapByName("rank_fh_png");
			n.x = 31, n.y = 18, n.touchEnabled = !0, this.addChild(n), n.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fanhuimc, this)
		}
	}, a.startzhuan = function() {
		var t = new egret.URLLoader,
			e = new egret.URLRequest;
		e.url = WndManager.root.url_ + "Api/Game/lottery";
		var i = new egret.URLVariables("");
		t.addEventListener(egret.Event.COMPLETE, this.updateRank2, this), e.method = egret.URLRequestMethod.POST, e.data = i, t.load(e)
	}, a.updateRank2 = function(t) {
		var e = JSON.parse(t.target.data);
		if(egret.log(e.status), 1 == e.status) {
			Mode.shanpID = e.data.prize.prize_id, this._huojiang = e.data.prize.prize, this.txt1RQ.rotation = 0, this._rotation = new Array, this._rotation = [7225, 7270, 7315, 7360, 7405, 7450, 7495, 7540];
			var i = egret.Tween.get(this.txt1RQ);
			i.to({
				rotation: this._rotation[this._huojiang]
			}, 4e3, egret.Ease.circOut).wait(200).call(this.huojiangtanch, this)
		} else alert(e.info)
	}, a.huojiangtanch = function() {
		this.tancdi = new egret.Sprite, this.tancdi.graphics.beginFill(0, .6), this.tancdi.graphics.drawRect(0, 0, 640, 1036), this.tancdi.graphics.endFill(), this.addChild(this.tancdi), this.tancdi.touchEnabled = !0, this.huojtcbg = Tool.createBitmapByName("zjtanchuang_png"), this.huojtcbg.x = 320, this.huojtcbg.y = 460, this.huojtcbg.anchorOffsetX = this.huojtcbg.width / 2, this.huojtcbg.anchorOffsetY = this.huojtcbg.height / 2, this.huojtcbg.scaleX = this.huojtcbg.scaleY = .6, this.addChild(this.huojtcbg), egret.Tween.get(this.huojtcbg).to({
			scaleX: 1,
			scaleY: 1
		}, 600, egret.Ease.backOut), this.huojtctxt = Tool.createBitmapByName("jp_txt_png"), this.huojtctxt.x = 160, this.huojtctxt.y = 318, this.addChild(this.huojtctxt), this.huojtcbtn = Tool.createBitmapByName("chakanbtn_png"), this.huojtcbtn.x = 215, this.huojtcbtn.y = 530, this.huojtcbtn.touchEnabled = !0, this.addChild(this.huojtcbtn), this.huojtcbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tiaozhuan, this), this.huojtctxt2 = Tool.createTextFiled(80, 440, 500, 50, this.jiangpingArr[this._huojiang], 35, 9117728), this.huojtctxt2.stroke = 2, this.huojtctxt2.textAlign = "center", this.huojtctxt2.strokeColor = 16777215, this.addChild(this.huojtctxt2)
	}, a.yichu = function() {
		this.removeChild(this.huojtctxt2), this.removeChild(this.huojtcbtn), this.removeChild(this.huojtctxt), this.removeChild(this.huojtcbg), this.removeChild(this.tancdi)
	}, a.tiaozhuan = function() {
		this.yichu(), this.tancdi = new egret.Sprite, this.tancdi.graphics.beginFill(0, .6), this.tancdi.graphics.drawRect(0, 0, 640, 1036), this.tancdi.graphics.endFill(), this.addChild(this.tancdi), this.tancdi.touchEnabled = !0, this.tancdi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.yichu2, this), this.tancbg = Tool.createBitmapByName("home_plane_png"), this.tancbg.x = 80, this.tancbg.y = 288, this.tancbg.touchEnabled = !0, this.addChild(this.tancbg), this.tancyuck = Tool.createBitmapByName("shurutxt_png"), this.tancyuck.x = 110, this.tancyuck.y = 345, this.tancyuck.touchEnabled = !0, this.addChild(this.tancyuck), this.tancyuctxt = Tool.createBitmapByName("home_yuce_box_png"), this.tancyuctxt.x = 117, this.tancyuctxt.y = 428, this.tancyuctxt.touchEnabled = !0, this.addChild(this.tancyuctxt), this.tancbtn = Tool.createBitmapByName("lingqubtn2_png"), this.tancbtn.pixelHitTest = !0, this.tancbtn.touchEnabled = !0, this.tancbtn.x = 210, this.tancbtn.y = 525, this.addChild(this.tancbtn), this.tancbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.lingqu_p, this), this.tanctxt = Tool.createTextFiled(150, 447, 340, 50, "", 35, 9117728), this.tanctxt.type = "input", this.tanctxt.stroke = 2, this.tanctxt.strokeColor = 16777215, this.addChild(this.tanctxt), this.tanctxt.maxChars = 11, this.tanctxt.restrict = "0-9"
	}, a.yichu2 = function() {
		this.removeChild(this.tanctxt), this.removeChild(this.tancbtn), this.removeChild(this.tancyuctxt), this.removeChild(this.tancyuck), this.removeChild(this.tancbg), this.removeChild(this.tancdi)
	}, a.lingqu_p = function() {
		var t = this.tanctxt.text,
			e = new RegExp("^1[3-8][0-9]{9}$");
		if(0 == e.test(t)) return void ToastUtils.setContent("输入错误，请输入正确手机号码！", this);
		var i = new egret.URLLoader,
			a = new egret.URLRequest;
		a.url = WndManager.root.url_ + "Api/Game/saveLotteryInfo";
		var n = new egret.URLVariables("?prize_id=" + Mode.shanpID + "&telphone=" + this.tanctxt.text);
		i.addEventListener(egret.Event.COMPLETE, this.updatetijiao, this), a.method = egret.URLRequestMethod.POST, a.data = n, i.load(a)
	}, a.updatetijiao = function(t) {
		var i = JSON.parse(t.target.data);
		1 == i.status ? (alert("领取成功"), WndManager.switchWnd(e, WIN_OPERATOR.WIN_CLOSE_DELETE), WndManager.switchWnd(Duihuanjilu, WIN_OPERATOR.WIN_OPEN_SHOW)) : alert(i.info)
	}, a.fanhuimc = function() {
		WndManager.switchWnd(e, WIN_OPERATOR.WIN_CLOSE_DELETE), WndManager.switchWnd(Home, WIN_OPERATOR.WIN_OPEN_SHOW)
	}, e
}(WinBase);
egret.registerClass(GamePrize, "GamePrize");
var HeadCircularImage = function(t) {
	function e() {
		t.call(this)
	}
	__extends(e, t);
	var i = (__define, e),
		a = i.prototype;
	return a.loadUrl = function(t, e) {
		void 0 === e && (e = !1), this.isCir = e, this.loader = new egret.URLLoader, this.loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE, this.loader.addEventListener(egret.Event.COMPLETE, this.imageComplete, this), this.request = new egret.URLRequest(t), this.loader.load(this.request)
	}, a.imageComplete = function(t) {
		this.texture = t.target.data;
		var e = new egret.Bitmap(this.texture);
		if(this.isCir ? (e.width = 40, e.height = 40) : (e.width = 202, e.height = 121), this.addChild(e), this.isCir) {
			var i = new egret.Shape;
			i.graphics.beginFill(255), i.graphics.drawCircle(30, 30, 30), i.graphics.endFill(), this.addChild(i), e.mask = i
		}
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeEvent, this)
	}, a.removeEvent = function(t) {
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeEvent, this), this.texture.dispose(), this.texture = null, console.log("remove")
	}, e
}(egret.Sprite);
egret.registerClass(HeadCircularImage, "HeadCircularImage");
var HomeSelect = function(t) {
	function e() {
		t.call(this), this.nowMoney = ["10000", "15000", "5000"], this.moneyIndex = 0, this.width = 640, this.height = 60, this.createGameScene()
	}
	__extends(e, t);
	var i = (__define, e),
		a = i.prototype;
	return a.createGameScene = function() {
		var t = Tool.createBitmapByName("home_box1_png");
		t.x = 60, t.y = -15, t.rotation = -13, t.width = 251,Tool.center(t), this.addChild(t);
		var e = Tool.createBitmapByName("home_left_png");
		e.x = 80, e.y = 30, Tool.center(e), e.touchEnabled = !0, this.addChild(e), e.addEventListener(egret.TouchEvent.TOUCH_TAP, function() {
			this.moneyIndex--, this.money && this.removeChild(this.money), this.moneyIndex < 0 && (this.moneyIndex = 2), this.money = Tool.createBitmapByName("home_" + this.nowMoney[this.moneyIndex] + "_png"), Tool.center(this.money), this.money.x = 186, this.money.y = 40, this.addChild(this.money), Mode.payMoney = Number(this.nowMoney[this.moneyIndex]), egret.log(Mode.payMoney)
		}, this);
		var i = Tool.createBitmapByName("home_right_png");
		i.x = 265, i.y = 11, Tool.center(i), i.touchEnabled = !0, this.addChild(i), i.addEventListener(egret.TouchEvent.TOUCH_TAP, function() {
			this.moneyIndex++, this.money && this.removeChild(this.money), this.moneyIndex > 2 && (this.moneyIndex = 0), this.money = Tool.createBitmapByName("home_" + this.nowMoney[this.moneyIndex] + "_png"), Tool.center(this.money), this.money.x = 186, this.money.y = 40, this.addChild(this.money), Mode.payMoney = Number(this.nowMoney[this.moneyIndex]), egret.log(Mode.payMoney)
		}, this);
		var a = Tool.createBitmapByName("home_box2_png");
		a.x = 340, a.y = -15, a.width =251,a.height = 115,a.rotation = -3.5;a.touchEnabled = !0, this.addChild(a), a.addEventListener(egret.TouchEvent.TOUCH_TAP, this.switchType, this), this.money = Tool.createBitmapByName("home_10000_png"), Tool.center(this.money), this.money.x = 186, this.money.y = 40, this.addChild(this.money), this.type = Tool.createBitmapByName("home_up_png"), this.type.x = 425, this.type.y = 0, this.addChild(this.type)
	}, a.switchType = function() {
		return "rise" == Mode.payType ? (Mode.payType = "fall", this.type && this.removeChild(this.type), this.type = Tool.createBitmapByName("home_down_png"), this.type.x = 420, this.type.y = 16, void this.addChild(this.type)) : "fall" == Mode.payType ? (Mode.payType = "rise", this.type && this.removeChild(this.type), this.type = Tool.createBitmapByName("home_up_png"), this.type.x = 425, this.type.y = 0, void this.addChild(this.type)) : void 0
	}, e
}(egret.Sprite);
egret.registerClass(HomeSelect, "HomeSelect");
var Security = function(t) {
	function e(e) {
		t.call(this), this.array = [], this.array = e, this.width = 351, this.height = 86, this.createGameScene()
	}
	__extends(e, t);
	var i = (__define, e),
		a = i.prototype;
	return a.createGameScene = function() {
		this.jiantou = Tool.createBitmapByName("home_jiantou_png"), this.jiantou.anchorOffsetX = this.jiantou.width / 2, this.jiantou.anchorOffsetY = this.jiantou.height / 2, this.jiantou.x = 95, this.jiantou.y = 50, "-" == this.array[1].substring(0, 1) && (this.jiantou.rotation = 180), this.addChild(this.jiantou), e.textFieldleft = Tool.getBitmapText("home_font3_fnt"), e.textFieldleft.x = -12, e.textFieldleft.y = 38, this.addChild(e.textFieldleft), e.textFieldleft.text = this.array[0], e.textFieldC1 = Tool.getBitmapText("home_font3_fnt"), e.textFieldC1.x = 155, e.textFieldC1.y = 26, this.addChild(e.textFieldC1), e.textFieldC2 = Tool.getBitmapText("home_font3_fnt"), e.textFieldC2.x = 177, e.textFieldC2.y = 20, e.textFieldC2.height = 100, e.textFieldC2.width = 40, this.addChild(e.textFieldC2), this.array[1] < 0 ? (e.textFieldC1.text = this.array[1].substring(0, 1), e.textFieldC2.text = this.array[1].substring(1, 8)) : (e.textFieldC1.text = "+", e.textFieldC2.text = this.array[1].substring(0, 8)), e.textFieldright = Tool.getBitmapText("home_font3_fnt"), e.textFieldright.x = 270, e.textFieldright.y = 30, this.addChild(e.textFieldright), e.textFieldright.text = this.array[2]
	}, e.chongfuzhi = function() {
		e.textFieldleft.text = Mode.security[0], e.textFieldright.text = Mode.security[2], Mode.security[1] < 0 ? (e.textFieldC1.text = Mode.security[1].substring(0, 1), e.textFieldC2.text = Mode.security[1].substring(1, 8)) : (e.textFieldC1.text = "+", e.textFieldC2.text = Mode.security[1].substring(0, 8))
	}, e
}(egret.Sprite);
egret.registerClass(Security, "Security");
var Home = function(t) {
	var windowName = "";
	function e() {
		t.call(this), this.createGameScene(), this.touchEnabled = !0, this.width = 640, this.height = 1036, Tool.center(this), this.addEventListener(egret.Event.ADDED_TO_STAGE, function() {
			var t = this,
				e = this;
			e.alpha = 0, egret.Tween.get(e).to({
				scaleX: .95,
				scaleY: .95,
				alpha: .5
			}, 200).call(function() {
				egret.Tween.get(e).to({
					scaleX: 1,
					scaleY: 1,
					alpha: 1
				}, 200).call(function() {}, t)
			}, this)
		}, this)
	}
	__extends(e, t);
	var i = (__define, e),
		a = i.prototype;
	return a.createGameScene = function() {
		this.addChild(Tool.createBitmapByName("home_bg_jpg"));
		var t = new egret.URLLoader,
			e = new egret.URLRequest;
		e.url = WndManager.root.url_ + "Api/Index";
		var i = new egret.URLVariables("");
		t.addEventListener(egret.Event.COMPLETE, this.updateRank, this), e.method = egret.URLRequestMethod.POST, e.data = i, t.load(e)
			
			
		
	}, a.updateRank = function(t) {
		var i = JSON.parse(t.target.data);
		if(egret.log("data" + i.data.user_info.balance), Mode.money = Number(i.data.user_info.balance), Mode.talk = i.data.user_info.motto, Mode.xuanzerole = i.data.user_info.role, WndManager.root.selfName = i.data.user_info.nickname, null != i.data.open_prize && (Mode.PK_result = i.data.open_prize.pk.result, Mode.PK_money = i.data.open_prize.pk.money, null != i.data.open_prize.bet && (Mode.goumai_result = i.data.open_prize.bet.result, Mode.goumai_money = i.data.open_prize.bet.money)), 1 == i.data.user_info.bet_status ? Mode.payState = !0 : Mode.payState = !1, Mode.security = [], Mode.security.push(i.data.stock_trend.exponent), Mode.security.push(i.data.stock_trend.increase), Mode.security.push(i.data.stock_trend.percent), this.updateHead(), 1 == i.status) {
			if(this.nickName = Tool.createTextFiled(137, 45, 120, 14, WndManager.root.selfName, 23, 5053713), this.nickName.stroke = 3, this.nickName.strokeColor = 13016846, this.addChild(this.nickName), this.talk = Tool.createTextFiled(396, 44, 196, 14, Mode.talk, 23, 5053713), this.talk.textAlign = "center", this.talk.stroke = 3, this.talk.strokeColor = 13016846, this.addChild(this.talk), this.rank = Tool.getBitmapText("home_font_fnt"), this.rank.x = 215, this.rank.y = 85, this.addChild(this.rank), this.rank.text = i.data.user_info.ranking + "", this.money = Tool.getBitmapText("home_font_fnt"), this.money.x = 420, this.money.y = 85, this.addChild(this.money), this.money.text = String(Mode.money), this.shuaxin = Tool.createBitmapByName("shuaxin_png"), this.shuaxin.name = "shuaxin", this.shuaxin.x = 500, this.shuaxin.y = 270, this.addChild(this.shuaxin), this.shuaxin.touchEnabled = !0, this.shuaxin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.swichClick, this), 1 == WndManager.root.qiandaois && 0 == i.data.user_info.sign_status) return WndManager.switchWnd(e, WIN_OPERATOR.WIN_CLOSE_DELETE), void WndManager.switchWnd(Sign, WIN_OPERATOR.WIN_OPEN_SHOW);
			this.guide = Tool.createBitmapByName("home_share_tips_png"), this.guide.touchEnabled = !0, this.guide.name = "guide", this.guide.x = 583, this.guide.y = 150, this.addChild(this.guide), this.guide.addEventListener(egret.TouchEvent.TOUCH_TAP, this.swichClick, this), this.security = new Security(Mode.security), this.security.x = 142, this.security.y = 310, this.addChild(this.security);
			var a = new HomeSelect;
			a.y = 445, this.addChild(a), Mode.payState ? (this.payBtn = Tool.createBitmapByName("home_dengdai_png"), this.payBtn.x = 237, this.payBtn.y = 518, this.addChild(this.payBtn)) : (this.payBtn = Tool.createBitmapByName("home_mairu_png"), this.payBtn.x = 237, this.payBtn.y = 528, this.payBtn.touchEnabled = !0, this.payBtn.name = "payBtn", this.addChild(this.payBtn), this.payBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.swichClick, this));
			//抽奖
			var n = Tool.createBitmapByName("home_sc_png");
			n.pixelHitTest = !0, n.touchEnabled = !0, n.name = "sc", n.x = 110,n.y = 640,n.height = 180,n.width = 140, this.addChild(n), n.addEventListener(egret.TouchEvent.TOUCH_TAP, this.swichClick, this);
			//财富中心
			var s = Tool.createBitmapByName("home_cfzx_png");
			s.pixelHitTest = !0, s.touchEnabled = !0, s.name = "cfzx", s.x = 316, s.y = 691, this.addChild(s), s.addEventListener(egret.TouchEvent.TOUCH_TAP, this.swichClick, this);
			//兑换处
			var h = Tool.createBitmapByName("home_cj_png");
			h.pixelHitTest = !0, h.touchEnabled = !0, h.name = "cj", h.x = 255, h.y = 690, this.addChild(h),h.height = 200,h.width = 100, h.addEventListener(egret.TouchEvent.TOUCH_TAP, this.swichClick, this);
			//排行榜
			var o = Tool.createBitmapByName("home_rank_png");
			o.pixelHitTest = !0, o.touchEnabled = !0, o.name = "ph", o.x = 63, o.y = 800, this.addChild(o), o.addEventListener(egret.TouchEvent.TOUCH_TAP, this.swichClick, this);
			//我是股神
			var r = Tool.createBitmapByName("home_pk_png");
			r.pixelHitTest = !0, r.touchEnabled = !0, r.name = "pk", r.x = 380, r.y = 830, this.addChild(r), r.addEventListener(egret.TouchEvent.TOUCH_TAP, this.swichClick, this);
		}
		"" != Mode.goumai_result && (this.tancdi = new egret.Sprite, this.tancdi.graphics.beginFill(0, .6), this.tancdi.graphics.drawRect(0, 0, 640, 1036), this.tancdi.graphics.endFill(), this.addChild(this.tancdi), this.tancdi.touchEnabled = !0, this.tancdi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tuichupk_tc2, this), "win" == Mode.goumai_result ? (this.tancyuck = Tool.createBitmapByName("home_yuce_cg_png"), this.tancyuck.x = 80, this.tancyuck.y = 288, this.addChild(this.tancyuck)) : (this.tancyuck = Tool.createBitmapByName("home_yuce_sb_png"), this.tancyuck.x = 80, this.tancyuck.y = 288, this.addChild(this.tancyuck)), this.huojtctxt2 = Tool.createTextFiled(330, 580, 240, 50, Mode.goumai_money, 35, 9117728), this.huojtctxt2.stroke = 2, this.huojtctxt2.strokeColor = 16777215, this.addChild(this.huojtctxt2))
		
    	
		if (windowName == ""){
			if(isShare==2){
windowName = "none";
				isShare = 4;

			$("#anima").show();
			$("#anima").css("z-index","2");
			}else if(isShare==3){
			

				var ck = this
			if ("" != Mode.PK_result){
				//出结果
				if (0 == Main.pk_one){
					//弹结果列表
					$.ajax({
						url:'/pbqj/Public/index.php/Api/Game/getPkResult',
						success:function(data){
							var arr =data.data;
				            var str = "";
				            $.each(arr,function(index,v){
								str +='<li><p>预估值：'+v['user_forecast']+'</p>'
								str +='<p>pk时间：'+v['add_time']+'</p>'
								str +='<p>pk结果：'+v['status']+'</p>'
								str +='<div>'
								str +='<img src= "'+v['headimgurl']+'"/>'
								str +='</div></li>';
							});		
							$(".result_info").html(str);
						}
					});
					$("#pk_result").show();	
					Main.pk_one = 1;
				}else{
					//pk结束弹pk选择框
					this.pktanc(); 
				}
			}else {
	//					没有出pk结果
				 $.ajax({
		            url:'/pbqj/Public/index.php/Api/Game/checkUserPkStatus',
		            success:function(data){
		                if(data.status==1){
		                    window.sessionStorage.setItem('pkStatus',1)  //可以进行那个pk（没有与人pk）
		                    if(sessionStorage.getItem('pkStatus')==1){
				//						正在与人pk
								ck.pktanc();
							}
		                }else{
		                    window.sessionStorage.setItem('pkStatus',2) //不能进行pk（正在与人pk）
		                    var arr =data.data;
		                    var str = "";
							$.each(arr,function(index,v){
								str +='<li onclick="getDetail('+v['id']+')"><p>预估值：'+v['user_forecast']+'</p>'
								str +='<p>pk时间：'+v['add_time']+'</p>'
								str +='<p>正在与'+v['nickname']+'pk中</p>'
								str +='<div>'
								str +='<img src= "'+v['headimgurl']+'"/>'
								str +='</div></li>';
							});		
							$(".pk_info").html(str);
		                    $("#pk_ing").show();
		                }
		            }
		        });
				
			}
			windowName = "none";
			}
		}
		
		
	}, a.swichClick = function(t) {
		var i = t.currentTarget.name;
		switch(i) {
			case "payBtn":
				this.playgold();
				break;
			case "sign":
				"1" == Mode.qiandao_bool ? alert("今天已经签过到了") : (WndManager.switchWnd(e, WIN_OPERATOR.WIN_CLOSE_DELETE), WndManager.switchWnd(Sign, WIN_OPERATOR.WIN_OPEN_SHOW));
				break;
			case "shuaxin":
				this.shuaxinshuju();
				break;
			case "guide":
				this.rule_mc();
				break;
			case "cj":
				WndManager.switchWnd(e, WIN_OPERATOR.WIN_CLOSE_DELETE), WndManager.switchWnd(Shoping, WIN_OPERATOR.WIN_OPEN_SHOW);
				break;
			case "cfzx":
				WndManager.switchWnd(e, WIN_OPERATOR.WIN_CLOSE_DELETE), WndManager.switchWnd(Fortune, WIN_OPERATOR.WIN_OPEN_SHOW);
				break;
			case "sc":
				WndManager.switchWnd(e, WIN_OPERATOR.WIN_CLOSE_DELETE), WndManager.switchWnd(GamePrize, WIN_OPERATOR.WIN_OPEN_SHOW);
				break;
			case "ph":
				WndManager.switchWnd(e, WIN_OPERATOR.WIN_CLOSE_DELETE), WndManager.switchWnd(Rank, WIN_OPERATOR.WIN_OPEN_SHOW);
				break;
			case "pk":
			//禁止接收pk方点击“我是股神”
//				"" != Mode.PK_result ? (0 == Main.pk_one ? (this.tancdi = new egret.Sprite, this.tancdi.graphics.beginFill(0, .6), this.tancdi.graphics.drawRect(0, 0, 640, 1036), this.tancdi.graphics.endFill(), this.addChild(this.tancdi), this.tancdi.touchEnabled = !0, this.tancdi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tuichupk_tc, this), "win" == Mode.PK_result ? (this.tancyuck = Tool.createBitmapByName("home_pk_cg_png"), this.tancyuck.x = 80, this.tancyuck.y = 288, this.addChild(this.tancyuck)) : (this.tancyuck = Tool.createBitmapByName("home_pk_sb_png"), this.tancyuck.x = 80, this.tancyuck.y = 288, this.addChild(this.tancyuck))) : this.pktanc(), Main.pk_one = 1) : this.pktanc();
//				WndManager.switchWnd(e, WIN_OPERATOR.WIN_CLOSE_DELETE), WndManager.switchWnd(Pklishijilu1, WIN_OPERATOR.WIN_OPEN_SHOW);
//				alert("1");
//				"" != Mode.PK_result ? (0 == Main.pk_one ? (this.tancdi = new egret.Sprite, this.tancdi.graphics.beginFill(0, .6), this.tancdi.graphics.drawRect(0, 0, 640, 1036), this.tancdi.graphics.endFill(), this.addChild(this.tancdi), this.tancdi.touchEnabled = !0, this.tancdi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tuichupk_tc, this), "win" == Mode.PK_result ? (this.tancyuck = Tool.createBitmapByName("home_pk_cg_png"), this.tancyuck.x = 80, this.tancyuck.y = 288, this.addChild(this.tancyuck)) : (this.tancyuck = Tool.createBitmapByName("home_pk_sb_png"), this.tancyuck.x = 80, this.tancyuck.y = 288, this.addChild(this.tancyuck))) : this.pktanc(), Main.pk_one = 1) : this.pktanc();
				//出pk结果了
				if ("" != Mode.PK_result){
					//出结果
					if (0 == Main.pk_one){
						//遮盖层
//						this.tancdi = new egret.Sprite;
//						this.tancdi.graphics.beginFill(0, .6);
//						this.tancdi.graphics.drawRect(0, 0, 640, 1036);
//						this.tancdi.graphics.endFill();
//						this.addChild(this.tancdi);
//						this.tancdi.touchEnabled = !0;
//						this.tancdi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tuichupk_tc, this);
//						pk胜利
//						if ("win" == Mode.PK_result){
//							this.tancyuck = Tool.createBitmapByName("home_pk_cg_png");
//							this.tancyuck.x = 80; 
//							this.tancyuck.y = 288; 
//							this.addChild(this.tancyuck);
//						}else {
////							pk失败
//							this.tancyuck = Tool.createBitmapByName("home_pk_sb_png"); 
//							this.tancyuck.x = 80;
//							this.tancyuck.y = 288; 
//							this.addChild(this.tancyuck);
//						}
//						if (("win" == Mode.PK_result) || ("lose" == Mode.PK_result)){
//							alert("1");
//							e.data.open_prize = null;
//						}else{
////							$("#pk_ing").show();
//							this.pktanc();
//						}
						
						//弹结果列表
//						alert("1");
						$.ajax({
							url:'/pbqj/Public/index.php/Api/Game/getPkResult',
							success:function(data){
								var arr =data.data;
					            var str = "";
					            $.each(arr,function(index,v){
									str +='<li><p>预估值：'+v['user_forecast']+'</p>'
									str +='<p>pk时间：'+v['add_time']+'</p>'
									str +='<p>pk结果：'+v['status']+'</p>'
									str +='<div>'
									str +='<img src= "'+v['headimgurl']+'"/>'
									str +='</div></li>';
								});		
								$(".result_info").html(str);
							}
						});
						$("#pk_result").show();	
						
						Main.pk_one = 1;
					}else{
						//pk结束弹pk选择框
						this.pktanc(); 
//						$("#pk_ing").show();
						
					}
//					Main.pk_one = 1;
//					$("#pk_ing").show();
				}else {
//					没有出pk结果
//					this.pktanc();
					 $.ajax({

			            url:'/pbqj/Public/index.php/Api/Game/checkUserPkStatus',
			            success:function(data){
			                if(data.status==1){
			
			                    window.sessionStorage.setItem('pkStatus',1)  //可以进行那个pk（没有与人pk）
//			                	this.pktanc();
			                }else{
			
			                    window.sessionStorage.setItem('pkStatus',2) //不能进行pk（正在与人pk）
//			                    var ul1 = document.querySelector(".pk_info");
			                    var arr =data.data;
			                    var str = "";
//			                    for (var i=0; i<arr.length; i++){
//			                    	var li = document.createElement("li");
//			                    	var lis = ul1.getElementsByTagName("li");
//			                    	lis[i].innerHTML = '<p>预估值：'+arr[i].money+'</p>'+'<p>pk时间：'+arr[i].add_time+'</p>'+'<p>正在与'+arr[i].nickName+'pk中</p>'+'<div>'+'<img src= "'+arr[i].headimgurl+'"/>'+'</div>';
//					    			ul1.insertBefore(lis[i]);
//			                    }
								
								$.each(arr,function(index,v){
									str +='<li onclick="getDetail('+v['id']+')"><p>预估值：'+v['user_forecast']+'</p>'
									str +='<p>pk时间：'+v['add_time']+'</p>'
									str +='<p>正在与'+v['nickname']+'pk中</p>'
									str +='<div>'
									str +='<img src= "'+v['headimgurl']+'"/>'
									str +='</div></li>';
	    						});		
								$(".pk_info").html(str);
			                    $("#pk_ing").show();
			                }
			            }
			        });
			        
					if(sessionStorage.getItem('pkStatus')==1){
//						正在与人pk
//						alert('111');
						this.pktanc();
//						sessionStorage.setItem('pkStatus','')
					}
				}
				
				break;
			case "pkgo":
				this.pkqingqiu()
		}
	}, a.shuaxinshuju = function() {
		var t = new egret.URLLoader,
			e = new egret.URLRequest;
		e.url = WndManager.root.url_ + "Api/Index";
		var i = new egret.URLVariables("");
		t.addEventListener(egret.Event.COMPLETE, this.updateRank2, this), e.method = egret.URLRequestMethod.POST, e.data = i, t.load(e)
	}, a.updateRank2 = function(t) {
		var e = JSON.parse(t.target.data);
		Mode.security = [], Mode.security.push(e.data.stock_trend.exponent), Mode.security.push(e.data.stock_trend.increase), Mode.security.push(e.data.stock_trend.percent), Security.chongfuzhi()
	}, a.rule_mc = function() {
		this.tancdi = new egret.Sprite, this.tancdi.graphics.beginFill(0, .6), this.tancdi.graphics.drawRect(0, 0, 640, 1036), this.tancdi.graphics.endFill(), this.addChild(this.tancdi), this.tancdi.touchEnabled = !0, this.tancdi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tuichurule_tc, this), this.tancbtn = Tool.createBitmapByName("rulemc_png"), this.tancbtn.x = 320, this.tancbtn.y = 500, this.tancbtn.anchorOffsetX = this.tancbtn.width / 2, this.tancbtn.anchorOffsetY = this.tancbtn.height / 2, this.tancbtn.scaleX = this.tancbtn.scaleY = .6, this.addChild(this.tancbtn), this.tancbtn.touchEnabled = !0, egret.Tween.get(this.tancbtn).to({
			scaleX: 1,
			scaleY: 1
		}, 600, egret.Ease.backOut), this.qiehuanbtn = new egret.Sprite, this.qiehuanbtn.graphics.beginFill(65280, 0), this.qiehuanbtn.graphics.drawRect(0, 0, 200, 100), this.qiehuanbtn.graphics.endFill(), this.qiehuanbtn.x = 200, this.qiehuanbtn.y = 50, this.addChild(this.qiehuanbtn), this.qiehuanbtn.touchEnabled = !0, this.qiehuanbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.qiehuan_mc, this)
	}, a.qiehuan_mc = function() {
		this.removeChild(this.tancbtn), this.removeChild(this.qiehuanbtn), this.tancbtn = Tool.createBitmapByName("guanzhumc_png"), this.tancbtn.x = 320, this.tancbtn.y = 500, this.tancbtn.anchorOffsetX = this.tancbtn.width / 2, this.tancbtn.anchorOffsetY = this.tancbtn.height / 2, this.addChild(this.tancbtn), this.tancbtn.touchEnabled = !0, this.qiehuanbtn = new egret.Sprite, this.qiehuanbtn.graphics.beginFill(65280, 0), this.qiehuanbtn.graphics.drawRect(0, 0, 200, 100), this.qiehuanbtn.graphics.endFill(), this.qiehuanbtn.x = 0, this.qiehuanbtn.y = 50, this.addChild(this.qiehuanbtn), this.qiehuanbtn.touchEnabled = !0, this.qiehuanbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.qiehuan_mc2, this), this.myImg = document.createElement("img"), this.myImg.src = "http://uat.zwmedia.com.cn/pbqj/Public/resource/assets/home/ewm.jpg", this.myImg.onload = this.onLoadOk, this.myImg.style.width = "30.31%", this.myImg.style.height = "18.73%", this.myImg.style.position = "absolute", this.myImg.style.left = "34.84%", this.myImg.style.top = "53.64%";
		var t = document.getElementById("gameID");
		t.appendChild(this.myImg), this.myImg.style.display = "block"
	}, a.onLoadOk = function(t) {
		t.target;
		HTMLImageElement;
		var e = 0;
		e++
	}, a.qiehuan_mc2 = function() {
		this.myImg.style.display = "none", this.removeChild(this.tancbtn), this.removeChild(this.qiehuanbtn), this.tancbtn = Tool.createBitmapByName("rulemc_png"), this.tancbtn.x = 320, this.tancbtn.y = 500, this.tancbtn.anchorOffsetX = this.tancbtn.width / 2, this.tancbtn.anchorOffsetY = this.tancbtn.height / 2, this.addChild(this.tancbtn), this.tancbtn.touchEnabled = !0, this.qiehuanbtn = new egret.Sprite, this.qiehuanbtn.graphics.beginFill(65280, 0), this.qiehuanbtn.graphics.drawRect(0, 0, 200, 100), this.qiehuanbtn.graphics.endFill(), this.qiehuanbtn.x = 200, this.qiehuanbtn.y = 50, this.addChild(this.qiehuanbtn), this.qiehuanbtn.touchEnabled = !0, this.qiehuanbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.qiehuan_mc, this)
	}, a.tuichurule_tc = function() {
		this.removeChild(this.tancdi), this.removeChild(this.tancbtn), this.removeChild(this.qiehuanbtn), this.myImg && (this.myImg.style.display = "none")
	}, a.pktanc = function() {
		var t = new egret.URLLoader,
			e = new egret.URLRequest;
		e.url = WndManager.root.url_ + "Api/Game/checkUserPk";
		var i = new egret.URLVariables("");
		t.addEventListener(egret.Event.COMPLETE, this.updateRk, this), e.method = egret.URLRequestMethod.POST, e.data = i, t.load(e)
	}, a.tuichupk_tc2 = function() {
		this.removeChild(this.tancdi), this.removeChild(this.huojtctxt2), this.removeChild(this.tancyuck), this.removeChild(this.tancbtn), this.removeChild(this.tanctxt)
	}, a.yichuooo = function() {
		this.removeChild(this.tancdi), this.xuanzePKbg && this.removeChild(this.xuanzePKbg), this.morenPK && this.removeChild(this.morenPK), this.zhaorenPK && this.removeChild(this.zhaorenPK)
	}, a.updateRk = function(t) {
		//if (isShare==2) {
		//	isShare = 3;

		//	$("#anima").show();
		//	$("#anima").css("z-index","2");	
		//}else{
			
			var i = JSON.parse(t.target.data);
		1 == i.status ? (this.tancdi = new egret.Sprite, this.tancdi.graphics.beginFill(0, .6), this.tancdi.graphics.drawRect(0, 0, 640, 1036), this.tancdi.graphics.endFill(), this.addChild(this.tancdi), this.tancdi.touchEnabled = !0, this.tancdi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.yichuooo, this), this.xuanzePKbg = Tool.createBitmapByName("npc_input_png"), this.xuanzePKbg.x = 55, this.xuanzePKbg.y = 330, this.addChild(this.xuanzePKbg), this.morenPK = Tool.createBitmapByName("kuaisustart_png"), this.morenPK.x = 105, this.morenPK.y = 395, this.addChild(this.morenPK), this.morenPK.scaleX = this.morenPK.scaleY = .8, this.morenPK.touchEnabled = !0, this.morenPK.addEventListener(egret.TouchEvent.TOUCH_TAP, this.pk_num1, this), this.zhaorenPK = Tool.createBitmapByName("yupengyoupk_png"), this.zhaorenPK.x = 318, this.zhaorenPK.y = 395, this.addChild(this.zhaorenPK), this.zhaorenPK.scaleX = this.zhaorenPK.scaleY = .8, this.zhaorenPK.touchEnabled = !0, this.zhaorenPK.addEventListener(egret.TouchEvent.TOUCH_TAP, this.pk_num2, this)) : 1201 == i.data.errno ? alert(i.info) : 1204 == i.data.errno && (Mode.PKnikename1 = i.data.user_info.oneself.nickname, Mode.PKnikename2 = i.data.user_info.other.nickname, Mode.xuanzerole2 = i.data.user_info.oneself.role, Mode.xuanzerole = i.data.user_info.other.role, Mode.yazhu_pic = i.data.pk_record.user_forecast, Mode.yazhu_self = i.data.pk_record.robot_forecast, WndManager.switchWnd(e, WIN_OPERATOR.WIN_CLOSE_DELETE), WndManager.switchWnd(GamePk, WIN_OPERATOR.WIN_OPEN_SHOW))
		
		//}
		
		
	}, a.yichupknum = function() {
		this.removeChild(this.tancdi), this.removeChild(this.tancyuck), this.removeChild(this.tancbtn), this.removeChild(this.tanctxt)
	}, a.pk_num1 = function() {
		this.removeChild(this.xuanzePKbg), this.removeChild(this.morenPK), this.removeChild(this.zhaorenPK), this.tancyuck = Tool.createBitmapByName("home_yuce_wz_png"), this.tancyuck.x = 55, this.tancyuck.y = 130, this.addChild(this.tancyuck), this.tancbtn = Tool.createBitmapByName("home_yuce_btn_png"), this.tancbtn.pixelHitTest = !0, this.tancbtn.touchEnabled = !0, this.tancbtn.name = "pkgo", this.tancbtn.x = 210, this.tancbtn.y = 395, this.addChild(this.tancbtn), this.tancbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.swichClick, this), this.tanctxt = Tool.createTextFiled(170, 305, 340, 50, "", 35, 9117728), this.tanctxt.type = "input", this.tanctxt.stroke = 2, this.tanctxt.strokeColor = 16777215, this.tanctxt.restrict = "0-9", this.tanctxt.maxChars = 7, this.addChild(this.tanctxt), this.tancdi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tuichupk_tc, this)
	}, a.tuichupk_tc = function() {
		this.removeChild(this.tancdi), this.tancyuck && this.removeChild(this.tancyuck), this.tancbtn && this.removeChild(this.tancbtn), this.tanctxt && this.removeChild(this.tanctxt)
	}, a.pk_num2 = function() {
 
//this.tancdi = new egret.Sprite, this.tancdi.graphics.beginFill(0, .6), this.tancdi.graphics.drawRect(0, 0, 640, 1036), this.tancdi.graphics.endFill(), this.addChild(this.tancdi), this.tancdi.touchEnabled = !0, this.tancdi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tuichupk_tc, this), this.tancyuck = Tool.createBitmapByName("home_yuceyaoqing_png"), this.tancyuck.x = 55, this.tancyuck.y = 130, this.addChild(this.tancyuck), this.tancbtn = Tool.createBitmapByName("home_yuce_btn_png"), this.tancbtn.pixelHitTest = !0, this.tancbtn.touchEnabled = !0, this.tancbtn.x = 160, this.tancbtn.y = 395, this.tancbtn.scaleX = 1.5, this.tancbtn.alpha = 0, this.addChild(this.tancbtn), this.tancbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.share_pk, this), this.tanctxt = Tool.createTextFiled(170, 305, 340, 50, "", 35, 9117728), this.tanctxt.type = "input", this.tanctxt.stroke = 2, this.tanctxt.maxChars = 7, this.tanctxt.strokeColor = 16777215, this.tanctxt.restrict = "0-9", this.addChild(this.tanctxt)

	$('#pk_start_kuang').show();
		this.removeChild(this.tancdi), this.removeChild(this.xuanzePKbg), this.removeChild(this.morenPK), this.removeChild(this.zhaorenPK);
	
	}, a.share_pk = function() {
		var t = this,
			e = "http://uat.zwmedia.com.cn/pbqj/Public/index.php/Api/WeiXin?qzopenid=" + WndManager.root.selfOpenId + "&other_forecast=" + this.tanctxt.text,
			i = "股神" + WndManager.root.selfName + "向你发起挑战，不服来PK！",
			a = {
				title: "跑步钱进",
				desc: i,
				link: e,
				imgUrl: "http://uat.zwmedia.com.cn/pbqj/icon.jpg",
				success: function(t) {
					var e = egret.MainContext.instance;
					e.stage.dispatchEventWith("yifenxiang", !1)
				}
			};
		window.wx.onMenuShareAppMessage(a), window.wx.onMenuShareTimeline(a), this.share_mc = Tool.createBitmapByName("sharemc_png"), this.addChild(this.share_mc), this.share_mc.touchEnabled = !0, this.share_mc.addEventListener(egret.TouchEvent.TOUCH_TAP, function() {
			t.removeChild(t.share_mc)
		}, this)
	}, a.pkqingqiu = function() {
		var t = new egret.URLLoader,
			e = new egret.URLRequest;
		e.url = WndManager.root.url_ + "Api/Game/doUserPk";
		var i = new egret.URLVariables("?user_forecast=" + this.tanctxt.text);
		t.addEventListener(egret.Event.COMPLETE, this.updateRkyz, this), e.method = egret.URLRequestMethod.POST, e.data = i, t.load(e)
	}, a.updateRkyz = function(t) {
		var i = JSON.parse(t.target.data);
		1 == i.status ? (Mode.yazhu_self = this.tanctxt.text, WndManager.switchWnd(e, WIN_OPERATOR.WIN_CLOSE_DELETE), WndManager.switchWnd(GamePk, WIN_OPERATOR.WIN_OPEN_SHOW)) : alert(i.info)
	}, a.updateHead = function() {
		this.head && this.removeChild(this.head), this.head = this.getHeadImg(), this.head.x = 77, this.head.y = 75, this.addChild(this.head)
	}, a.getHeadImg = function() {
		var t = new egret.Sprite,
			e = Tool.createBitmapByName(this.getHeadStr());
		e.scaleX = e.scaleY = .5, e.x = -25, e.y = -40;
		var i = this.getCircle();
		return t.addChild(e), t.addChild(i), e.mask = i, t.touchEnabled = !0, t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.qiehuanhead, this), t
	}, a.qiehuanhead = function() {
		Mode.xiugai_num = 1, WndManager.switchWnd(e, WIN_OPERATOR.WIN_CLOSE_DELETE), WndManager.switchWnd(NpcSelect, WIN_OPERATOR.WIN_OPEN_SHOW)
	}, a.getHeadStr = function() {
		return Mode.money < 5e5 ? "LittleGril" == Mode.xuanzerole ? Mode.mo[0] : "MatureWoman" == Mode.xuanzerole ? Mode.jin[0] : "LoserMan" == Mode.xuanzerole ? Mode.fa[0] : "TyrantMan" == Mode.xuanzerole ? Mode.hao[0] : Mode.hao[0] : Mode.money >= 5e5 && Mode.money < 1e6 ? "LittleGril" == Mode.xuanzerole ? Mode.mo[1] : "MatureWoman" == Mode.xuanzerole ? Mode.jin[1] : "LoserMan" == Mode.xuanzerole ? Mode.fa[1] : "TyrantMan" == Mode.xuanzerole ? Mode.hao[1] : Mode.hao[1] : "LittleGril" == Mode.xuanzerole ? Mode.mo[2] : "MatureWoman" == Mode.xuanzerole ? Mode.jin[2] : "LoserMan" == Mode.xuanzerole ? Mode.fa[2] : "TyrantMan" == Mode.xuanzerole ? Mode.hao[2] : Mode.hao[2]
	}, a.getCircle = function() {
		var t = new egret.Shape;
		return t.graphics.beginFill(0, 1), t.graphics.drawCircle(0, 0, 43), t.graphics.endFill(), t
	}, a.playgold = function() {
		var t = new egret.URLLoader,
			e = new egret.URLRequest;
		e.url = WndManager.root.url_ + "Api/Game/bet";
		var i = new egret.URLVariables("?money=" + Mode.payMoney + "&forecast=" + Mode.payType);
		t.addEventListener(egret.Event.COMPLETE, this.updateplay, this), e.method = egret.URLRequestMethod.POST, e.data = i, t.load(e)
	}, a.updateplay = function(t) {
		var e = JSON.parse(t.target.data);
		1 == e.status ? (alert(e.info), this.removeChild(this.payBtn), this.payBtn = Tool.createBitmapByName("home_dengdai_png"), this.payBtn.x = 237, this.payBtn.y = 518, this.addChild(this.payBtn)) : (1002 == e.data.errno && alert("参数错误"), 1003 == e.data.errno && alert("数据库错误"), 1201 == e.data.errno && alert("当前时段不能押注"), 1202 == e.data.errno && alert("重复押注"), 1203 == e.data.errno && alert("押注金额错误"), 1205 == e.data.errno && alert("余额不足"))
	}, e
}(WinBase);
egret.registerClass(Home, "Home");
var LoadingUI = function(t) {
	
	function e() {
		t.call(this), this.createView()
	}
	__extends(e, t);
	var i = (__define, e),
		a = i.prototype;
	return a.update = function() {}, a.createView = function() {
		this.loadingbg = Tool.createBitmapByName("load_bg_jpg"), this.addChild(this.loadingbg), this.action = new egret.Sprite, this.action.x = 220, this.action.y = 700, this.addChild(this.action), this.paobu = new egret.MovieClip, this.paobu = Tool.createMovieClip("paobu2"), this.addChild(this.paobu), this.paobu.frameRate = 20, this.paobu.x = 300, this.paobu.y = 540, this.paobu.play(99999), this.paobu.scaleX = this.paobu.scaleY = .6, this.textField = new egret.TextField, this.addChild(this.textField), this.textField.textColor = 14746953, this.textField.y = 760, this.textField.size = 32, this.textField.width = 640, this.textField.height = 100, this.textField.textAlign = "center";
		var t = Tool.createBitmapByName("rule_tiqian_png");
		t.x = 280, t.y = 890, t.anchorOffsetX = t.width / 2, t.anchorOffsetY = t.height / 2, t.scaleX = t.scaleY = .6, this.addChild(t), egret.Tween.get(t).to({
			scaleX: 1,
			scaleY: 1,
			x: 320
		}, 600, egret.Ease.backOut)
	}, a.setProgress = function(t, e) {
		var i = t / e;
		if(this.paobu.x = 300 - 280 * i, this.textField.text = Math.floor(100 * i) + "%", t == e) {
			egret.Tween.get(this.textField).to({
				alpha: 0
			}, 100), egret.Tween.get(this.paobu).to({
				alpha: 0
			}, 100);
			var a = new egret.MovieClip;
			a = Tool.createMovieClip("piaodong"), this.addChild(a), a.frameRate = 8, a.play(99999), a.y = -100, a.alpha = 0, egret.Tween.get(a).to({
				alpha: 1
			}, 600, egret.Ease.backOut), this.loadingbg.touchEnabled = !0, this.loadingbg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.yichu, this), this.daojishi = egret.setTimeout(this.yichu, this, 2000)
		}
	}, a.yichu = function() {
		var t = this;
		egret.clearTimeout(this.daojishi), egret.Tween.get(this).to({
			alpha: 0
		}, 10).call(function() {
			t.parent.removeChild(t);
		}, this)
	}, e
}(egret.Sprite);
egret.registerClass(LoadingUI, "LoadingUI");
var Main = function(t) {
	function e() {
		t.call(this), this.url_ = "http://uat.zwmedia.com.cn/pbqj/Public/index.php/", this.qiandaois = !0, this.oneci = 0, this.shangcheng = "", this.helppk = !1, this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
	}
	__extends(e, t);
	var i = (__define, e),
		a = i.prototype;
	return a.onAddToStage = function(t) {
		egret.Capabilities.isMobile ? this.stage.scaleMode = egret.StageScaleMode.EXACT_FIT : this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL, RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this), RES.loadConfig("resource/default.res.json", "resource/")
	}, a.onConfigComplete = function(t) {
		RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this), RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this), RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this), RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this), RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this), RES.loadGroup("loading")
	}, a.onResourceLoadComplete = function(t) {
		"loading" == t.groupName && (WndManager.root = this, this.wndmanager = new WndManager, this.addChild(this.wndmanager), this.loadingView = new LoadingUI, this.stage.addChild(this.loadingView), RES.loadGroup("preload")), "preload" == t.groupName && (RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this), RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this), RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this), egret.MainContext.deviceType == egret.MainContext.DEVICE_MOBILE && (this.selfName = egret.localStorage.getItem("name"), this.selfOpenId = egret.localStorage.getItem("openid"), this.helpforName = egret.localStorage.getItem("qzusername"), this.helpforId = egret.localStorage.getItem("qzopenid"), this.picurlimg = egret.localStorage.getItem("imgURL"), this.shangcheng = egret.localStorage.getItem("action"), this.PKyuce_num = egret.localStorage.getItem("other_forecast"), egret.localStorage.clear()), this.createGameScene())
	}, a.onItemLoadError = function(t) {
		console.warn("Url:" + t.resItem.url + " has failed to load")
	}, a.onResourceLoadError = function(t) {
		console.warn("Group:" + t.groupName + " has failed to load"), this.onResourceLoadComplete(t)
	}, a.onResourceProgress = function(t) {
		"preload" == t.groupName && this.loadingView.setProgress(t.itemsLoaded, t.itemsTotal)
	}, a.createGameScene = function() {
		var t = new egret.URLLoader,
			e = new egret.URLRequest;
		e.url = WndManager.root.url_ + "Api/Index/checkRole", e.method = egret.URLRequestMethod.POST, t.addEventListener(egret.Event.COMPLETE, this.updateRank, this), t.load(e)
	}, a.updateRank = function(t) {
		var e = JSON.parse(t.target.data);
		if("cf" == this.shangcheng) return void WndManager.switchWnd(Fortune, WIN_OPERATOR.WIN_OPEN_SHOW);
		if("sc" == this.shangcheng) return void WndManager.switchWnd(Shoping, WIN_OPERATOR.WIN_OPEN_SHOW);
		if("" == this.helpforId || "null" == this.helpforId || void 0 == this.helpforId) this.helppk = !1, 1 == e.status ? (WndManager.switchWnd(Home, WIN_OPERATOR.WIN_OPEN_SHOW), egret.log(e.data.user_info.motto), Mode.talk = e.data.user_info.motto, Mode.money = e.data.user_info.balance, WndManager.root.role_num = e.data.user_info.role) : WndManager.switchWnd(NpcSelect, WIN_OPERATOR.WIN_OPEN_SHOW);
		else {
			if(this.helpforId != this.selfOpenId) return this.helppk = !0, void WndManager.switchWnd(GamehelpPk, WIN_OPERATOR.WIN_OPEN_SHOW);
			this.helppk = !1, 1 == e.status ? (WndManager.switchWnd(Home, WIN_OPERATOR.WIN_OPEN_SHOW), egret.log(e.data.user_info.motto), Mode.talk = e.data.user_info.motto, Mode.money = e.data.user_info.balance, WndManager.root.role_num = e.data.user_info.role) : WndManager.switchWnd(NpcSelect, WIN_OPERATOR.WIN_OPEN_SHOW)
		}
	}, e.pk_one = 0, e
}(egret.DisplayObjectContainer);
egret.registerClass(Main, "Main");
var Mode = function() {
	function t() {}
	var e = (__define, t);
	e.prototype;
	return t.yazhu_pic = "3563.56", t.xuanzerole = "LoserMan", t.xuanzerole2 = "LoserMan", t.user = "hao", t.money = 1e6, t.ismoney = 0, t.jin = ["npc_jin_photo1_png", "npc_jin_photo2_png", "npc_jin_photo3_png"], t.hao = ["npc_hao_photo1_png", "npc_hao_photo2_png", "npc_hao_photo3_png"], t.fa = ["npc_fa_photo1_png", "npc_fa_photo2_png", "npc_fa_photo3_png"], t.mo = ["npc_mo_photo1_png", "npc_mo_photo2_png", "npc_mo_photo3_png"], t.security = ["+3073.37", "+62.08", "(+1.64%)"], t.payMoney = 1e4, t.payType = "rise", t.payState = !1, t.playStop = !0, t.shanpID = "", t.PK_result = "", t.PK_money = "", t.qiandao_bool = "0", t.goumai_result = "", t.goumai_money = "", t.xiugai_num = 0, t
}();
egret.registerClass(Mode, "Mode");
var Fa = function(t) {
	function e() {
		t.call(this), this._name = "fa", this.wzArr = ["npc_fa_tip1_png", "npc_fa_tip2_png", "npc_fa_tip3_png"], this.imgArr = ["npc_fa_photo1_png", "npc_fa_photo2_png", "npc_fa_photo3_png"], this.index = 0, this.width = 226, this.height = 289, this.touchEnabled = !0, this.createGameScene()
	}
	__extends(e, t);
	var i = (__define, e),
		a = i.prototype;
	return a.createGameScene = function() {
		this.boxSp = new egret.Sprite, this.addChild(this.boxSp), this.boxSp.addChild(Tool.createBitmapByName("npc_box1_png"));
		var t = Tool.createBitmapByName("npc_bottom_png");
		t.y = 210, this.addChild(t);
		var e = Tool.createBitmapByName("npc_fa_png");
		e.y = 20, e.x = 180, this.addChild(e), this.bitmapText = Tool.getBitmapText("npcFont_fnt"), this.bitmapText.x = 167, this.bitmapText.y = 170, this.addChild(this.bitmapText), this.createNpc(), this.createWz()
	}, a.btnClick = function(t) {
		var e = t.currentTarget;
		"left" == e.name && (this.index--, this.index < 0 && (this.index = 2), egret.Tween.get(this.nowImg).to({
			alpha: 0
		}, 100).call(function() {
			this.createNpc()
		}, this), egret.Tween.get(this.nowWz).to({
			alpha: 0
		}, 100).call(function() {
			this.createWz()
		}, this)), "right" == e.name && (this.index++, this.index > 2 && (this.index = 0), egret.Tween.get(this.nowImg).to({
			alpha: 0
		}, 100).call(function() {
			this.createNpc()
		}, this), egret.Tween.get(this.nowWz).to({
			alpha: 0
		}, 100).call(function() {
			this.createWz()
		}, this))
	}, a.selectBox = function() {
		WndManager.root.select_num = 4, Tool.removeALL(this.boxSp);
		var t = Tool.createBitmapByName("npc_box2_png");
		t.x = -8, t.y = -8, this.boxSp.addChild(t), Mode.user = this.name
	}, a.noselectBox = function() {
		Tool.removeALL(this.boxSp);
		var t = Tool.createBitmapByName("npc_box1_png");
		this.boxSp.addChild(t)
	}, a.createNpc = function() {
		this.nowImg = Tool.createBitmapByName(this.imgArr[1]), this.nowImg.anchorOffsetX = this.nowImg.width / 2, this.nowImg.anchorOffsetY = this.nowImg.height / 2, this.nowImg.x = 120, this.nowImg.y = 110, this.nowImg.alpha = 0, this.addChild(this.nowImg), egret.Tween.get(this.nowImg).to({
			alpha: 1
		}, 100)
	}, a.createWz = function() {
		this.nowWz = Tool.createBitmapByName(this.wzArr[1]), this.nowWz.anchorOffsetX = this.nowWz.width / 2, this.nowWz.anchorOffsetY = this.nowWz.height / 2, this.nowWz.x = 110, this.nowWz.y = 250, this.nowWz.alpha = 0, this.addChild(this.nowWz), egret.Tween.get(this.nowWz).to({
			alpha: 1
		}, 100)
	}, e
}(egret.Sprite);
egret.registerClass(Fa, "Fa");
var Hao = function(t) {
	function e() {
		t.call(this), this._name = "hao", this.wzArr = ["npc_hao_tip1_png", "npc_hao_tip2_png", "npc_hao_tip3_png"], this.imgArr = ["npc_hao_photo1_png", "npc_hao_photo2_png", "npc_hao_photo3_png"], this.index = 0, this.width = 226, this.height = 289, this.touchEnabled = !0, this.createGameScene()
	}
	__extends(e, t);
	var i = (__define, e),
		a = i.prototype;
	return a.createGameScene = function() {
		this.boxSp = new egret.Sprite, this.addChild(this.boxSp), this.boxSp.addChild(Tool.createBitmapByName("npc_box1_png"));
		var t = Tool.createBitmapByName("npc_bottom_png");
		t.y = 210, this.addChild(t);
		var e = Tool.createBitmapByName("npc_hao_png");
		e.y = 20, e.x = 180, this.addChild(e), this.bitmapText = Tool.getBitmapText("npcFont_fnt"), this.bitmapText.x = 167, this.bitmapText.y = 170, this.addChild(this.bitmapText), this.createNpc(), this.createWz()
	}, a.btnClick = function(t) {
		var e = t.currentTarget;
		"left" == e.name && (this.index--, this.index < 0 && (this.index = 2), egret.Tween.get(this.nowImg).to({
			alpha: 0
		}, 100).call(function() {
			this.createNpc()
		}, this), egret.Tween.get(this.nowWz).to({
			alpha: 0
		}, 100).call(function() {
			this.createWz()
		}, this)), "right" == e.name && (this.index++, this.index > 2 && (this.index = 0), egret.Tween.get(this.nowImg).to({
			alpha: 0
		}, 100).call(function() {
			this.createNpc()
		}, this), egret.Tween.get(this.nowWz).to({
			alpha: 0
		}, 100).call(function() {
			this.createWz()
		}, this))
	}, a.selectBox = function() {
		WndManager.root.select_num = 2, Tool.removeALL(this.boxSp);
		var t = Tool.createBitmapByName("npc_box2_png");
		t.x = -8, t.y = -8, this.boxSp.addChild(t), Mode.user = this.name
	}, a.noselectBox = function() {
		Tool.removeALL(this.boxSp);
		var t = Tool.createBitmapByName("npc_box1_png");
		this.boxSp.addChild(t)
	}, a.createNpc = function() {
		this.nowImg = Tool.createBitmapByName(this.imgArr[1]), this.nowImg.anchorOffsetX = this.nowImg.width / 2, this.nowImg.anchorOffsetY = this.nowImg.height / 2, this.nowImg.x = 120, this.nowImg.y = 110, this.nowImg.alpha = 0, this.addChild(this.nowImg), egret.Tween.get(this.nowImg).to({
			alpha: 1
		}, 100)
	}, a.createWz = function() {
		this.nowWz = Tool.createBitmapByName(this.wzArr[1]), this.nowWz.anchorOffsetX = this.nowWz.width / 2, this.nowWz.anchorOffsetY = this.nowWz.height / 2, this.nowWz.x = 110, this.nowWz.y = 250, this.nowWz.alpha = 0, this.addChild(this.nowWz), egret.Tween.get(this.nowWz).to({
			alpha: 1
		}, 100)
	}, e
}(egret.Sprite);
egret.registerClass(Hao, "Hao");
var Jin = function(t) {
	function e() {
		t.call(this), this._name = "jin", this.wzArr = ["npc_jin_tip1_png", "npc_jin_tip2_png", "npc_jin_tip3_png"], this.imgArr = ["npc_jin_photo1_png", "npc_jin_photo2_png", "npc_jin_photo3_png"], this.index = 0, this.width = 226, this.height = 289, this.touchEnabled = !0, this.createGameScene()
	}
	__extends(e, t);
	var i = (__define, e),
		a = i.prototype;
	return a.createGameScene = function() {
		this.boxSp = new egret.Sprite, this.addChild(this.boxSp), this.boxSp.addChild(Tool.createBitmapByName("npc_box1_png"));
		var t = Tool.createBitmapByName("npc_bottom_png");
		t.y = 210, this.addChild(t);
		var e = Tool.createBitmapByName("npc_jin_png");
		e.y = 20, e.x = 180, this.addChild(e), this.bitmapText = Tool.getBitmapText("npcFont_fnt"), this.bitmapText.x = 167, this.bitmapText.y = 170, this.addChild(this.bitmapText), this.createNpc(), this.createWz()
	}, a.btnClick = function(t) {
		var e = t.currentTarget;
		"left" == e.name && (this.index--, this.index < 0 && (this.index = 2), egret.Tween.get(this.nowImg).to({
			alpha: 0
		}, 100).call(function() {
			this.createNpc()
		}, this), egret.Tween.get(this.nowWz).to({
			alpha: 0
		}, 100).call(function() {
			this.createWz()
		}, this)), "right" == e.name && (this.index++, this.index > 2 && (this.index = 0), egret.Tween.get(this.nowImg).to({
			alpha: 0
		}, 100).call(function() {
			this.createNpc()
		}, this), egret.Tween.get(this.nowWz).to({
			alpha: 0
		}, 100).call(function() {
			this.createWz()
		}, this))
	}, a.selectBox = function() {
		WndManager.root.select_num = 1, Tool.removeALL(this.boxSp);
		var t = Tool.createBitmapByName("npc_box2_png");
		t.x = -8, t.y = -8, this.boxSp.addChild(t), Mode.user = this.name
	}, a.noselectBox = function() {
		Tool.removeALL(this.boxSp);
		var t = Tool.createBitmapByName("npc_box1_png");
		this.boxSp.addChild(t)
	}, a.createNpc = function() {
		this.nowImg = Tool.createBitmapByName(this.imgArr[1]), this.nowImg.anchorOffsetX = this.nowImg.width / 2, this.nowImg.anchorOffsetY = this.nowImg.height / 2, this.nowImg.x = 120, this.nowImg.y = 110, this.nowImg.alpha = 0, this.addChild(this.nowImg), egret.Tween.get(this.nowImg).to({
			alpha: 1
		}, 100)
	}, a.createWz = function() {
		this.nowWz = Tool.createBitmapByName(this.wzArr[1]), this.nowWz.anchorOffsetX = this.nowWz.width / 2, this.nowWz.anchorOffsetY = this.nowWz.height / 2, this.nowWz.x = 110, this.nowWz.y = 250, this.nowWz.alpha = 0, this.addChild(this.nowWz), egret.Tween.get(this.nowWz).to({
			alpha: 1
		}, 100)
	}, e
}(egret.Sprite);
egret.registerClass(Jin, "Jin");
var Mo = function(t) {
	function e() {
		t.call(this), this._name = "mo", this.wzArr = ["npc_mo_tip1_png", "npc_mo_tip2_png", "npc_mo_tip3_png"], this.imgArr = ["npc_mo_photo1_png", "npc_mo_photo2_png", "npc_mo_photo3_png"], this.index = 0, this.width = 226, this.height = 289, this.touchEnabled = !0, this.createGameScene()
	}
	__extends(e, t);
	var i = (__define, e),
		a = i.prototype;
	return a.createGameScene = function() {
		this.boxSp = new egret.Sprite, this.addChild(this.boxSp), this.boxSp.addChild(Tool.createBitmapByName("npc_box1_png"));
		var t = Tool.createBitmapByName("npc_bottom_png");
		t.y = 210, this.addChild(t);
		var e = Tool.createBitmapByName("npc_mo_png");
		e.y = 20, e.x = 180, this.addChild(e), this.bitmapText = Tool.getBitmapText("npcFont_fnt"), this.bitmapText.x = 167, this.bitmapText.y = 170, this.addChild(this.bitmapText), this.createNpc(), this.createWz()
	}, a.btnClick = function(t) {
		var e = t.currentTarget;
		"left" == e.name && (this.index--, this.index < 0 && (this.index = 2), egret.Tween.get(this.nowImg).to({
			alpha: 0
		}, 100).call(function() {
			this.createNpc()
		}, this), egret.Tween.get(this.nowWz).to({
			alpha: 0
		}, 100).call(function() {
			this.createWz()
		}, this)), "right" == e.name && (this.index++, this.index > 2 && (this.index = 0), egret.Tween.get(this.nowImg).to({
			alpha: 0
		}, 100).call(function() {
			this.createNpc()
		}, this), egret.Tween.get(this.nowWz).to({
			alpha: 0
		}, 100).call(function() {
			this.createWz()
		}, this))
	}, a.selectBox = function() {
		WndManager.root.select_num = 3, Tool.removeALL(this.boxSp);
		var t = Tool.createBitmapByName("npc_box2_png");
		t.x = -8, t.y = -8, this.boxSp.addChild(t), Mode.user = this.name
	}, a.noselectBox = function() {
		Tool.removeALL(this.boxSp);
		var t = Tool.createBitmapByName("npc_box1_png");
		this.boxSp.addChild(t)
	}, a.createNpc = function() {
		this.nowImg = Tool.createBitmapByName(this.imgArr[1]), this.nowImg.anchorOffsetX = this.nowImg.width / 2, this.nowImg.anchorOffsetY = this.nowImg.height / 2, this.nowImg.x = 120, this.nowImg.y = 110, this.nowImg.alpha = 0, this.addChild(this.nowImg), egret.Tween.get(this.nowImg).to({
			alpha: 1
		}, 100)
	}, a.createWz = function() {
		this.nowWz = Tool.createBitmapByName(this.wzArr[1]), this.nowWz.anchorOffsetX = this.nowWz.width / 2, this.nowWz.anchorOffsetY = this.nowWz.height / 2, this.nowWz.x = 110, this.nowWz.y = 250, this.nowWz.alpha = 0, this.addChild(this.nowWz), egret.Tween.get(this.nowWz).to({
			alpha: 1
		}, 100)
	}, e
}(egret.Sprite);
egret.registerClass(Mo, "Mo");
var NpcSelect = function(t) {
	function e() {
		t.call(this), this.createGameScene(), this.touchEnabled = !0, this.width = 640, this.height = 1036, Tool.center(this), this.addEventListener(egret.Event.ADDED_TO_STAGE, function() {
			var t = this,
				e = this;
			e.alpha = 0, egret.Tween.get(e).to({
				scaleX: .95,
				scaleY: .95,
				alpha: .5
			}, 200).call(function() {
				egret.Tween.get(e).to({
					scaleX: 1,
					scaleY: 1,
					alpha: 1
				}, 200).call(function() {}, t)
			}, this)
		}, this)
	}
	__extends(e, t);
	var i = (__define, e),
		a = i.prototype;
	return a.createGameScene = function() {
		this.addChild(Tool.createBitmapByName("npc_bg_jpg"));
		var t = Tool.createBitmapByName("xuanzetxt_png");
		t.x = 230, t.y = 5, this.addChild(t), this.jin = new Jin, this.jin.x = 67, this.jin.y = 56, this.addChild(this.jin), this.jin.selectBox(), this.jin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectPlay, this), this.hao = new Hao, this.hao.x = 350, this.hao.y = 56, this.addChild(this.hao), this.hao.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectPlay, this), this.mo = new Mo, this.mo.x = 66, this.mo.y = 366, this.addChild(this.mo), this.mo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectPlay, this), this.fa = new Fa, this.fa.x = 350, this.fa.y = 366, this.addChild(this.fa), this.fa.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectPlay, this);
		var e = Tool.createBitmapByName("npc_input_png");
		e.x = 76, e.y = 684, this.addChild(e), this.textField = Tool.createTextFiled(110, 740, 450, 145, "", 28, 9117728), this.textField.type = "input", this.textField.stroke = 2, this.textField.text = "请输入您的财富格言，限15字以内", this.textField.strokeColor = 16777215, this.textField.maxChars = 15, this.addChild(this.textField), this.textField.addEventListener(egret.TextEvent.FOCUS_IN, this.txt_mc, this);
		var i = Tool.createBitmapByName("npc_click_png");
		i.touchEnabled = !0, i.x = 208, i.y = 904, this.addChild(i), i.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tijiaojieguo, this)
	}, a.tijiaojieguo = function() {
		if(0 == Mode.xiugai_num)
			if("请输入您的财富格言，限15字以内" == this.textField.text || "" == this.textField.text) alert("请输入格言！");
			else {
				Mode.talk = this.textField.text, egret.log(WndManager.root.select_num);
				var t;
				t = 1 == WndManager.root.select_num ? "MatureWoman" : 2 == WndManager.root.select_num ? "TyrantMan" : 3 == WndManager.root.select_num ? "LittleGril" : "LoserMan";
				var e = new egret.URLLoader,
					i = new egret.URLRequest;
				i.url = WndManager.root.url_ + "Api/Index/saveRole";
				var a = new egret.URLVariables("?role=" + t + "&motto=" + this.textField.text);
				e.addEventListener(egret.Event.COMPLETE, this.updateRank, this), i.method = egret.URLRequestMethod.POST, i.data = a, e.load(i)
			}
		else {
			Mode.talk = this.textField.text, egret.log(WndManager.root.select_num);
			var t;
			t = 1 == WndManager.root.select_num ? "MatureWoman" : 2 == WndManager.root.select_num ? "TyrantMan" : 3 == WndManager.root.select_num ? "LittleGril" : "LoserMan";
			var e = new egret.URLLoader,
				i = new egret.URLRequest;
			i.url = WndManager.root.url_ + "Api/User/changeHead";
			var a = new egret.URLVariables("?role=" + t + "&motto=" + this.textField.text);
			e.addEventListener(egret.Event.COMPLETE, this.updateRank2, this), i.method = egret.URLRequestMethod.POST, i.data = a, e.load(i)
		}
	}, a.txt_mc = function() {
		this.textField.text = ""
	}, a.updateRank = function(t) {
		var i = JSON.parse(t.target.data);
		1 == i.status && (Mode.talk = i.data.user_info.motto, Mode.money = i.data.user_info.balance, WndManager.root.role_num = i.data.user_info.role, WndManager.switchWnd(e, WIN_OPERATOR.WIN_CLOSE_DELETE), WndManager.switchWnd(Home, WIN_OPERATOR.WIN_OPEN_SHOW))
	}, a.updateRank2 = function(t) {
		WndManager.switchWnd(e, WIN_OPERATOR.WIN_CLOSE_DELETE), WndManager.switchWnd(Home, WIN_OPERATOR.WIN_OPEN_SHOW);
		var i = JSON.parse(t.target.data);
		1 == i.status
	}, a.selectPlay = function(t) {
		var e = t.currentTarget;
		this.jin.noselectBox(), this.hao.noselectBox(), this.mo.noselectBox(), this.fa.noselectBox(), e.selectBox()
	}, e
}(WinBase);
egret.registerClass(NpcSelect, "NpcSelect");
var Pklishijilu = function(t) {
	function e() {
		t.call(this), this.createGameScene(), this.touchEnabled = !0, this.width = 640, this.height = 1036, Tool.center(this), this.addEventListener(egret.Event.ADDED_TO_STAGE, function() {
			var t = this,
				e = this;
			e.alpha = 0, egret.Tween.get(e).to({
				scaleX: .95,
				scaleY: .95,
				alpha: .5
			}, 200).call(function() {
				egret.Tween.get(e).to({
					scaleX: 1,
					scaleY: 1,
					alpha: 1
				}, 200).call(function() {}, t)
			}, this)
		}, this)
	}
	__extends(e, t);
	var i = (__define, e),
		a = i.prototype;
	return a.createGameScene = function() {
		this.addChild(Tool.createBitmapByName("lishi_bg_jpg"));
		var t = Tool.createBitmapByName("rank_fh_png");
		t.x = 31, t.y = 18, t.touchEnabled = !0, this.addChild(t), t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fanhuimc, this), this.headMask = Tool.createBitmapByName("lishi_btn_png"), this.headMask.x = 20, this.headMask.y = 140, this.headMask.touchEnabled = !0, this.addChild(this.headMask), this.headMask.alpha = .6, this.headMask.addEventListener(egret.TouchEvent.TOUCH_TAP, this.jiaoyijilu, this), this.log = Tool.createBitmapByName("pkjilu_btn_png"), this.log.x = 228, this.log.y = 140, this.log.touchEnabled = !0, this.addChild(this.log), this.bg_container = new egret.Sprite, this.addChild(this.bg_container), this.scroller = new egret.ScrollView(this.bg_container), this.scroller.width = 640, this.scroller.height = 800, this.scroller.x = 0, this.scroller.y = 240, this.scroller.horizotalScrollPolicy = "off", this.scroller.bounces = !0, this.addChild(this.scroller);
		var e = new egret.URLLoader,
			i = new egret.URLRequest;
		i.url = WndManager.root.url_ + "Api/User/getPkRecord";
		var a = new egret.URLVariables("");
		e.addEventListener(egret.Event.COMPLETE, this.updateRank, this), i.method = egret.URLRequestMethod.POST, i.data = a, e.load(i)
	}, a.jiaoyijilu = function() {
		WndManager.switchWnd(e, WIN_OPERATOR.WIN_CLOSE_DELETE), WndManager.switchWnd(Fortunejilu, WIN_OPERATOR.WIN_OPEN_SHOW)
	}, a.updateRank = function(t) {
		var e = JSON.parse(t.target.data);
		if(egret.log(e.status), 1 == e.status) {
			egret.log("yyyy:" + e.data.pk_record.length);
			for(var i = 0; i < e.data.pk_record.length; i++) {
				var a = Tool.createBitmapByName("lishi_kuang_png");
				a.x = 50, a.y = 200 * i, this.bg_container.addChild(a), this.pkwin = Tool.createTextFiled(80, 35 + 200 * i, 500, 50, "预估值：" + e.data.pk_record[i].forecast, 28, 16777215, !0), this.bg_container.addChild(this.pkwin);
				var n = "";
				n = "win" == e.data.pk_record[i].status ? "赢" : "lose" == e.data.pk_record[i].status ? "输" : "未出结果", this.gamewin = Tool.createTextFiled(80, 125 + 200 * i, 500, 150, "押注结果：" + n, 28, 16777215, !0), this.bg_container.addChild(this.gamewin), this.maxwin = Tool.createTextFiled(80, 78 + 200 * i, 500, 50, "PK时间：" + e.data.pk_record[i].add_time, 28, 16777215, !0), this.bg_container.addChild(this.maxwin)
			}
		}
		this.closeGame = new egret.Sprite, this.closeGame.graphics.beginFill(0, 0), this.closeGame.graphics.drawRect(0, 0, 110, 115), this.closeGame.graphics.endFill(), this.closeGame.x = 362, this.closeGame.y = 776, this.closeGame.touchEnabled = !0, this.closeGame.name = "closeGame", this.addChild(this.closeGame), this.closeGame.addEventListener(egret.TouchEvent.TOUCH_TAP, this.swichClick, this)
	}, a.swichClick = function(t) {
		var e = t.currentTarget.name;
		switch(e) {
			case "closeGame":
//				alert("关闭")
		}
	}, a.fanhuimc = function() {
		WndManager.switchWnd(e, WIN_OPERATOR.WIN_CLOSE_DELETE), WndManager.switchWnd(Fortune, WIN_OPERATOR.WIN_OPEN_SHOW)
	}, e
}(WinBase);
egret.registerClass(Pklishijilu, "Pklishijilu");


var Pklishijilu1 = function(t) {
	function e() {
		t.call(this), this.createGameScene(), this.touchEnabled = !0, this.width = 640, this.height = 1036, Tool.center(this), this.addEventListener(egret.Event.ADDED_TO_STAGE, function() {
			var t = this,
				e = this;
			e.alpha = 0, egret.Tween.get(e).to({
				scaleX: .95,
				scaleY: .95,
				alpha: .5
			}, 200).call(function() {
				egret.Tween.get(e).to({
					scaleX: 1,
					scaleY: 1,
					alpha: 1
				}, 200).call(function() {}, t)
			}, this)
		}, this)
	}
	__extends(e, t);
	var i = (__define, e),
		a = i.prototype;
	return a.createGameScene = function() {
		this.addChild(Tool.createBitmapByName("lishi_bg_jpg"));
		var t = Tool.createBitmapByName("rank_fh_png");
		t.x = 31, t.y = 18, t.touchEnabled = !0, this.addChild(t), t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fanhuimc, this), 
//		this.headMask = Tool.createBitmapByName("lishi_btn_png"), this.headMask.x = 20, this.headMask.y = 140, this.headMask.touchEnabled = !0, this.addChild(this.headMask), this.headMask.alpha = .6, this.headMask.addEventListener(egret.TouchEvent.TOUCH_TAP, this.jiaoyijilu, this), 
		this.log = Tool.createBitmapByName("pkjilu_btn_png"), this.log.x = 20, this.log.y = 140, this.log.touchEnabled = !0, this.addChild(this.log), this.bg_container = new egret.Sprite, this.addChild(this.bg_container), this.scroller = new egret.ScrollView(this.bg_container), this.scroller.width = 640, this.scroller.height = 800, this.scroller.x = 0, this.scroller.y = 240, this.scroller.horizotalScrollPolicy = "off", this.scroller.bounces = !0, this.addChild(this.scroller);
		var e = new egret.URLLoader,
			i = new egret.URLRequest;
		i.url = WndManager.root.url_ + "Api/User/getPkRecord";
		var a = new egret.URLVariables("");
		e.addEventListener(egret.Event.COMPLETE, this.updateRank, this), i.method = egret.URLRequestMethod.POST, i.data = a, e.load(i)
	}, a.jiaoyijilu = function() {
		WndManager.switchWnd(e, WIN_OPERATOR.WIN_CLOSE_DELETE), WndManager.switchWnd(Fortunejilu, WIN_OPERATOR.WIN_OPEN_SHOW)
	}, a.updateRank = function(t) {
		var e = JSON.parse(t.target.data);
		if(egret.log(e.status), 1 == e.status) {
			egret.log("yyyy:" + e.data.pk_record.length);
			for(var i = 0; i < e.data.pk_record.length; i++) {
				var a = Tool.createBitmapByName("lishi_kuang_png");
				a.x = 50, a.y = 200 * i,a.touchEnabled = !0, this.bg_container.addChild(a), this.pkwin = Tool.createTextFiled(80, 35 + 200 * i, 500, 50, "预估值：" + e.data.pk_record[i].forecast, 28, 16777215, !0), this.bg_container.addChild(this.pkwin);
//				a.addEventListener(egret.TouchEvent.TOUCH_TAP, this.game1, this); 
				var n = "";
				n = "win" == e.data.pk_record[i].status ? "赢" : "lose" == e.data.pk_record[i].status ? "输" : "未出结果", this.gamewin = Tool.createTextFiled(80, 125 + 200 * i, 500, 150, "押注结果：" + n, 28, 16777215, !0), this.bg_container.addChild(this.gamewin), this.maxwin = Tool.createTextFiled(80, 78 + 200 * i, 500, 50, "PK时间：" + e.data.pk_record[i].add_time, 28, 16777215, !0), this.bg_container.addChild(this.maxwin),
				//新加pk对象
				this.vswin = Tool.createTextFiled(340, 125 + 200 * i, 300, 50, "VS：" + e.data.pk_record[i].add_time, 28, 16777215, !0), this.bg_container.addChild(this.vswin);
//				if (e.data.pk_record[i].status == "win"){
//					
//				}else if(e.data.pk_record[i].status == "lose") {
//					
//				}else {
//					a.addEventListener(egret.TouchEvent.TOUCH_TAP, this.game1, this); 
//				}
//				"" != Mode.PK_result ? (0 == Main.pk_one ? (this.tancdi = new egret.Sprite, this.tancdi.graphics.beginFill(0, .6), this.tancdi.graphics.drawRect(0, 0, 640, 1036), this.tancdi.graphics.endFill(), this.addChild(this.tancdi), this.tancdi.touchEnabled = !0, this.tancdi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tuichupk_tc, this), "win" == Mode.PK_result ? (this.tancyuck = Tool.createBitmapByName("home_pk_cg_png"), this.tancyuck.x = 80, this.tancyuck.y = 288, this.addChild(this.tancyuck)) : (this.tancyuck = Tool.createBitmapByName("home_pk_sb_png"), this.tancyuck.x = 80, this.tancyuck.y = 288, this.addChild(this.tancyuck))) : this.pktanc(), Main.pk_one = 1) : this.pktanc();
			}
		}
		this.closeGame = new egret.Sprite, this.closeGame.graphics.beginFill(0, 0), this.closeGame.graphics.drawRect(0, 0, 110, 115), this.closeGame.graphics.endFill(), this.closeGame.x = 362, this.closeGame.y = 776, this.closeGame.touchEnabled = !0, this.closeGame.name = "closeGame", this.addChild(this.closeGame), this.closeGame.addEventListener(egret.TouchEvent.TOUCH_TAP, this.swichClick, this)
	}, a.swichClick = function(t) {
		var e = t.currentTarget.name;
		switch(e) {
			case "closeGame":
//				alert("关闭")
		}
//	}, a.game1 = function() {
//		if (e.data.pk_record[i].status == "win"){
//			this.tancyuck = Tool.createBitmapByName("home_pk_cg_png"), this.tancyuck.x = 80, this.tancyuck.y = 288, this.addChild(this.tancyuck)
//		}else if(e.data.pk_record[i].status == "lose") {
//			this.tancyuck = Tool.createBitmapByName("home_pk_sb_png"), this.tancyuck.x = 80, this.tancyuck.y = 288, this.addChild(this.tancyuck)
//		}else {
//			WndManager.switchWnd(e, WIN_OPERATOR.WIN_CLOSE_DELETE), WndManager.switchWnd(GamePk, WIN_OPERATOR.WIN_OPEN_SHOW)
//		}
//		WndManager.switchWnd(e, WIN_OPERATOR.WIN_CLOSE_DELETE), WndManager.switchWnd(GamePk, WIN_OPERATOR.WIN_OPEN_SHOW)
	}, a.fanhuimc = function() {
		WndManager.switchWnd(e, WIN_OPERATOR.WIN_CLOSE_DELETE), WndManager.switchWnd(Home, WIN_OPERATOR.WIN_OPEN_SHOW)
	}, e
}(WinBase);
egret.registerClass(Pklishijilu1, "Pklishijilu1");



var RankItem = function(t) {
	function e(e) {
		t.call(this), this.index = e, this.width = 487, this.height = 117, this.createGameScene()
	}
	__extends(e, t);
	var i = (__define, e),
		a = i.prototype;
	return a.createGameScene = function() {
		this.bg = new egret.Sprite, this.bg.graphics.beginFill(0, 0), this.bg.graphics.drawRect(0, 0, 487, 117), this.bg.graphics.endFill(), this.addChild(this.bg), this.top = Tool.createBitmapByName("rank_xian_png"), this.addChild(this.top), this.headBg = Tool.createBitmapByName("rank_yuan_png"), this.headBg.x = 55.5, this.headBg.y = 14, this.addChild(this.headBg), this.selfMoney = Tool.createTextFiled(360, 25, 115, 13, "￥" + Rank.moneyArr[this.index], 20, 16777215, !0), this.selfMoney.textAlign = "center", this.addChild(this.selfMoney), this.selfName = Tool.createTextFiled(151, 25, 139, 15, Rank.nicknameArr[this.index], 24, 16777215, !0), this.addChild(this.selfName), this.geyan = Tool.createTextFiled(149, 70, 320, 15, Rank.talkArr[this.index], 21, 16777215, !1), this.geyan.textAlign = "right", this.addChild(this.geyan), this.selfRank = Tool.createTextFiled(8, 41, 50, 21, String(this.index + 1), 40, 16777215, !0), this.addChild(this.selfRank), RES.getResByUrl(Rank.headArr[this.index], this.onImgload, this, RES.ResourceItem.TYPE_IMAGE)
	}, a.onImgload = function(t) {
		var e = t,
			i = new egret.Sprite,
			a = new egret.Bitmap(e);
		a.width = 66, a.height = 66;
		var n = this.getCircle();
		i.addChild(n), i.addChild(a), a.mask = n, i.x = 69, i.y = 28, this.addChild(i)
	}, a.getCircle = function() {
		var t = new egret.Shape;
		return t.graphics.beginFill(16777215, 1), t.graphics.drawCircle(33, 33, 33), t.graphics.endFill(), t
	}, e
}(egret.Sprite);
egret.registerClass(RankItem, "RankItem");
var RankVip = function(t) {
	function e(e) {
		t.call(this), this.index = e, this.width = 130, this.height = 216, this.createGameScene()
	}
	__extends(e, t);
	var i = (__define, e),
		a = i.prototype;
	return a.createGameScene = function() {
		this.selfName = Tool.createTextFiled(-10, 135, 139, 15, Rank.nicknameArr[this.index], 24, 16777215, !0), this.addChild(this.selfName), this.selfName.textAlign = "center", this.selfMoney = Tool.createTextFiled(0, 173, 115, 13, "￥" + Rank.moneyArr[this.index], 20, 16771584, !0), this.selfMoney.stroke = 2, this.selfMoney.strokeColor = 14186849, this.selfMoney.textAlign = "center", this.addChild(this.selfMoney), RES.getResByUrl(Rank.headArr[this.index], this.onImgload, this, RES.ResourceItem.TYPE_IMAGE)
	}, a.onImgload = function(t) {
		var e = t,
			i = new egret.Sprite,
			a = new egret.Bitmap(e);
		a.width = 108, a.height = 108;
		var n = this.getCircle();
		i.addChild(n), i.addChild(a), a.mask = n, i.x = 9, i.y = 8, this.addChild(i)
	}, a.getCircle = function() {
		var t = new egret.Shape;
		return t.graphics.beginFill(16777215, 1), t.graphics.drawCircle(54, 54, 54), t.graphics.endFill(), t
	}, e
}(egret.Sprite);
egret.registerClass(RankVip, "RankVip");
var RankVip2 = function(t) {
	function e(e) {
		t.call(this), this.index = e, this.width = 110, this.height = 191, this.createGameScene()
	}
	__extends(e, t);
	var i = (__define, e),
		a = i.prototype;
	return a.createGameScene = function() {
		this.selfName = Tool.createTextFiled(-10, 120, 139, 15, Rank.nicknameArr[this.index], 24, 16777215, !0), this.addChild(this.selfName), this.selfName.textAlign = "center", this.selfMoney = Tool.createTextFiled(-8, 160, 115, 13, "￥" + Rank.moneyArr[this.index], 20, 16777215, !0), this.selfMoney.textAlign = "center", this.addChild(this.selfMoney), RES.getResByUrl(Rank.headArr[this.index], this.onImgload, this, RES.ResourceItem.TYPE_IMAGE)
	}, a.onImgload = function(t) {
		var e = t,
			i = new egret.Sprite,
			a = new egret.Bitmap(e);
		a.width = 88, a.height = 88;
		var n = this.getCircle();
		i.addChild(n), i.addChild(a), a.mask = n, i.x = 8, i.y = 10, this.addChild(i)
	}, a.getCircle = function() {
		var t = new egret.Shape;
		return t.graphics.beginFill(16777215, 1), t.graphics.drawCircle(44, 44, 44), t.graphics.endFill(), t
	}, e
}(egret.Sprite);
egret.registerClass(RankVip2, "RankVip2");
var Rank = function(t) {
	function e() {
		t.call(this), this.createGameScene(), this.touchEnabled = !0, this.width = 640, this.height = 1036, Tool.center(this), this.addEventListener(egret.Event.ADDED_TO_STAGE, function() {
			var t = this,
				e = this;
			e.alpha = 0, egret.Tween.get(e).to({
				scaleX: .95,
				scaleY: .95,
				alpha: .5
			}, 200).call(function() {
				egret.Tween.get(e).to({
					scaleX: 1,
					scaleY: 1,
					alpha: 1
				}, 200).call(function() {}, t)
			}, this)
		}, this)
	}
	__extends(e, t);
	var i = (__define, e),
		a = i.prototype;
	return a.createGameScene = function() {
		this.addChild(Tool.createBitmapByName("rank_bg_jpg"));
		var t = Tool.createBitmapByName("rank_fh_png");
		t.x = 31, t.y = 18, t.touchEnabled = !0, this.addChild(t), t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fanhuimc, this);
		var e = new egret.URLLoader,
			i = new egret.URLRequest;
		i.url = WndManager.root.url_ + "Api/User/getRinking";
		var a = new egret.URLVariables("");
		e.addEventListener(egret.Event.COMPLETE, this.updateRank, this), i.method = egret.URLRequestMethod.POST, i.data = a, e.load(i)
	}, a.updateRank = function(t) {
		var i = JSON.parse(t.target.data);
		if(egret.log("HHH:" + i.data.ranking[0].nickname), 1 == i.status) {
			for(var a = 0; a < i.data.ranking.length; a++) e.nicknameArr.push(i.data.ranking[a].nickname), e.moneyArr.push(i.data.ranking[a].balance), e.talkArr.push(i.data.ranking[a].motto), e.headArr.push(i.data.ranking[a].headimgurl);
			this.selfName = Tool.createTextFiled(237, 971, 139, 15, i.data.oneself.nickname, 24, 2688261, !0), this.addChild(this.selfName), this.selfRank = Tool.createTextFiled(41, 963, 96, 21, i.data.oneself.oneself_rank, 40, 2688261, !0), this.addChild(this.selfRank), this.selfMoney = Tool.createTextFiled(421, 970, 163, 13, "￥" + i.data.oneself.balance, 24, 2688261, !0), this.selfMoney.textAlign = "center", this.addChild(this.selfMoney), RES.getResByUrl(i.data.oneself.headimgurl, this.onImgload, this, RES.ResourceItem.TYPE_IMAGE), this.bg_container = new egret.DisplayObjectContainer, this.scroller = new egret.ScrollView(this.bg_container), this.scroller.width = 487, this.scroller.height = 425, this.scroller.x = 76, this.scroller.y = 503, this.scroller.horizotalScrollPolicy = "off", this.scroller.bounces = !0, this.addChild(this.scroller);
			for(var a = 0; a < i.data.ranking.length && a != i.data.ranking.length; a++)
				if(0 != a)
					if(1 != a)
						if(2 != a) {
							var n = new RankItem(a);
							n.y = 117 * (a - 3), this.bg_container.addChild(n)
						} else {
							var s = new RankVip2(a);
							s.x = 447, s.y = 300, this.addChild(s)
						}
			else {
				var h = new RankVip2(a);
				h.x = 84, h.y = 300, this.addChild(h)
			} else {
				var o = new RankVip(a);
				o.x = 257, o.y = 247, this.addChild(o)
			}
		}
	}, a.onImgload = function(t) {
		var e = t,
			i = new egret.Sprite,
			a = new egret.Bitmap(e);
		a.width = 66, a.height = 66;
		var n = this.getCircle();
		i.addChild(n), i.addChild(a), a.mask = n, i.x = 152, i.y = 951, this.addChild(i)
	}, a.getCircle = function() {
		var t = new egret.Shape;
		return t.graphics.beginFill(16777215, 1), t.graphics.drawCircle(33, 33, 33), t.graphics.endFill(), t
	}, a.fanhuimc = function() {
		WndManager.switchWnd(e, WIN_OPERATOR.WIN_CLOSE_DELETE), WndManager.switchWnd(Home, WIN_OPERATOR.WIN_OPEN_SHOW)
	}, e.headArr = [], e.nicknameArr = [], e.moneyArr = [], e.talkArr = [], e.TempD = [{
		head: "http://wx.qlogo.cn/mmopen/TTQibyKjrickzQZ6D4XFAv4aMMH3fcfGQEVPy6DXtvbdMywWyH94oESKJgwPpe1QVsoia1vDgKnFN6HxcUSFCwg5qT8tqzh0sJL/0",
		nickname: "嘻嘻",
		money: "200000",
		talk: "财富格言财富格言财富格言财富格"
	}, {
		head: "http://wx.qlogo.cn/mmopen/TTQibyKjrickzQh5vXU04Gb2G33CgyhL8VdfZ171fWZKh8ySgia3KmcpFPkWhuiclpeSAfxKYD77icqicLQEgyeKmymw/0",
		nickname: "嘻嘻",
		money: "200000",
		talk: "财富格言财富格言财富格言财富格"
	}, {
		head: "http://wx.qlogo.cn/mmopen/NUwcR8gP0xVLPdzKubJ4zRPiaMgQ5nUWuf9yrgicdBYicLXTibGFsFukSuGneiaqzhN49mia3sUPkxveMNflibj2R30pYUe5nJWOms2/0",
		nickname: "嘻嘻",
		money: "200000",
		talk: "财富格言财富格言财富格言财富格"
	}, {
		head: "http://wx.qlogo.cn/mmopen/NUwcR8gP0xVLPdzKubJ4zRPiaMgQ5nUWuf9yrgicdBYicLXTibGFsFukSuGneiaqzhN49mia3sUPkxveMNflibj2R30pYUe5nJWOms2/0",
		nickname: "嘻嘻",
		money: "200000",
		talk: "财富格言财富格言财富格言财富格"
	}, {
		head: "http://wx.qlogo.cn/mmopen/NUwcR8gP0xVLPdzKubJ4zRPiaMgQ5nUWuf9yrgicdBYicLXTibGFsFukSuGneiaqzhN49mia3sUPkxveMNflibj2R30pYUe5nJWOms2/0",
		nickname: "嘻嘻",
		money: "200000",
		talk: "财富格言财富格言财富格言财富格"
	}, {
		head: "http://wx.qlogo.cn/mmopen/NUwcR8gP0xVLPdzKubJ4zRPiaMgQ5nUWuf9yrgicdBYicLXTibGFsFukSuGneiaqzhN49mia3sUPkxveMNflibj2R30pYUe5nJWOms2/0",
		nickname: "嘻嘻",
		money: "200000",
		talk: "财富格言财富格言财富格言财富格"
	}, {
		head: "http://wx.qlogo.cn/mmopen/NUwcR8gP0xVLPdzKubJ4zRPiaMgQ5nUWuf9yrgicdBYicLXTibGFsFukSuGneiaqzhN49mia3sUPkxveMNflibj2R30pYUe5nJWOms2/0",
		nickname: "嘻嘻",
		money: "200000",
		talk: "财富格言财富格言财富格言财富格"
	}, {
		head: "http://wx.qlogo.cn/mmopen/NUwcR8gP0xVLPdzKubJ4zRPiaMgQ5nUWuf9yrgicdBYicLXTibGFsFukSuGneiaqzhN49mia3sUPkxveMNflibj2R30pYUe5nJWOms2/0",
		nickname: "嘻嘻",
		money: "200000",
		talk: "财富格言财富格言财富格言财富格"
	}, {
		head: "http://wx.qlogo.cn/mmopen/NUwcR8gP0xVLPdzKubJ4zRPiaMgQ5nUWuf9yrgicdBYicLXTibGFsFukSuGneiaqzhN49mia3sUPkxveMNflibj2R30pYUe5nJWOms2/0",
		nickname: "嘻嘻",
		money: "200000",
		talk: "财富格言财富格言财富格言财富格"
	}, {
		head: "http://wx.qlogo.cn/mmopen/NUwcR8gP0xVLPdzKubJ4zRPiaMgQ5nUWuf9yrgicdBYicLXTibGFsFukSuGneiaqzhN49mia3sUPkxveMNflibj2R30pYUe5nJWOms2/0",
		nickname: "嘻嘻",
		money: "200000",
		talk: "财富格言财富格言财富格言财富格"
	}, {
		head: "http://wx.qlogo.cn/mmopen/TTQibyKjrickzQZ6D4XFAv4RI0llhqUKYbVOO0oTOUBHOvu9DUmL5I1cdAbeiakwBUSRiaWicpKbeo42nzic3wFCN16aOIEv3lnHhA/0",
		nickname: "嘻啊嘻",
		money: "200000",
		talk: "啦啦",
		rank: "300"
	}], e
}(WinBase);
egret.registerClass(Rank, "Rank");
var Shoping = function(t) {
	function e() {
		t.call(this), this.zuobiaox = 0, this.zuobiaoy = 0, this.kj = 0, this.IDarr = [], this.imgArr = [], this.createGameScene(), this.touchEnabled = !0, this.width = 640, this.height = 1036, Tool.center(this), this.addEventListener(egret.Event.ADDED_TO_STAGE, function() {
			var t = this,
				e = this;
			e.alpha = 0, egret.Tween.get(e).to({
				scaleX: .95,
				scaleY: .95,
				alpha: .5
			}, 200).call(function() {
				egret.Tween.get(e).to({
					scaleX: 1,
					scaleY: 1,
					alpha: 1
				}, 200).call(function() {}, t)
			}, this)
		}, this)
	}
	__extends(e, t);
	var i = (__define, e),
		a = i.prototype;
	return a.createGameScene = function() {
		this.addChild(Tool.createBitmapByName("shangchbg_jpg"));
		var t = Tool.createBitmapByName("qiehuan1_png");
		t.x = 50, t.y = 150, this.addChild(t);
		var e = Tool.createBitmapByName("rank_fh_png");
		e.x = 31, e.y = 18, e.touchEnabled = !0, this.addChild(e), e.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fanhuimc, this), this.headMask = Tool.createBitmapByName("jifenbtn_png"), this.headMask.x = 50, this.headMask.y = 350, this.addChild(this.headMask), this.log = Tool.createBitmapByName("duihuanbtn_png"), this.log.x = 340, this.log.y = 350, this.log.touchEnabled = !0, this.addChild(this.log), this.log.addEventListener(egret.TouchEvent.TOUCH_TAP, this.duihuanjilu, this), this.shangpRQ = new egret.Sprite, this.addChild(this.shangpRQ), this.mScroll = new egret.ScrollView, this.mScroll.setContent(this.shangpRQ), this.addChild(this.mScroll), this.mScroll.x = 0, this.mScroll.y = 440, this.mScroll.width = 1040, this.mScroll.height = 596;
		var i = new egret.URLLoader,
			a = new egret.URLRequest;
		a.url = WndManager.root.url_ + "Api/Ware/getWareList";
		var n = new egret.URLVariables("");
		i.addEventListener(egret.Event.COMPLETE, this.updateRank, this), a.method = egret.URLRequestMethod.POST, a.data = n, i.load(a)
	}, a.duihuanjilu = function() {
		WndManager.switchWnd(e, WIN_OPERATOR.WIN_CLOSE_DELETE), WndManager.switchWnd(Duihuanjilu, WIN_OPERATOR.WIN_OPEN_SHOW)
	}, a.updateRank = function(t) {
		var e = JSON.parse(t.target.data);
		this.shuarr = e.data.length;
		for(var i = 0; i < e.data.length; i++) {
			this.IDarr.push(e.data[i].id);
			var a = Tool.createBitmapByName("shangpdi_png");
			this.shangpRQ.addChild(a), this.imgArr.push(a), this.pic = new HeadCircularImage, this.pic.loadUrl("http://uat.zwmedia.com.cn" + e.data[i].image, !1), this.pic.anchorOffsetX = this.pic.width >> 1, i % 2 == 0 && (this.zuobiaox = 0, this.zuobiaoy++), this.nickName = Tool.createTextFiled(20 + 304 * this.zuobiaox, -90 + 300 * this.zuobiaoy, 300, 50, e.data[i].title, 20, 9117728, !0), this.money_txt = Tool.createTextFiled(130 + 300 * this.zuobiaox, -55 + 300 * this.zuobiaoy, 250, 50, e.data[i].price + "金币", 20, 9117728, !0), this.money_txt.strokeColor = 16777215, this.money_txt.stroke = 2, this.nickName.strokeColor = 16777215, this.nickName.stroke = 2, this.nickName.textAlign = "center", a.x = 36 + 300 * this.zuobiaox, a.y = -290 + 300 * this.zuobiaoy, this.pic.x = 68 + 300 * this.zuobiaox, this.pic.y = -246 + 300 * this.zuobiaoy, this.zuobiaox++, this.shangpRQ.addChild(this.money_txt), this.shangpRQ.addChild(this.pic), this.shangpRQ.addChild(this.nickName), a.touchEnabled = !0, a.addEventListener(egret.TouchEvent.TOUCH_TAP, this.cheise, this)
		}
		this.gameinn = Tool.createTextFiled(190, 370, 140, 50, String(Mode.money), 28, 5053713, !0), this.addChild(this.gameinn)
	}, a.cheise = function(t) {
		egret.log(this.imgArr.indexOf(t.currentTarget)), Mode.shanpID = this.IDarr[this.imgArr.indexOf(t.currentTarget)], WndManager.switchWnd(e, WIN_OPERATOR.WIN_CLOSE_DELETE), WndManager.switchWnd(Shopxq, WIN_OPERATOR.WIN_OPEN_SHOW)
	}, a.fanhuimc = function() {
		WndManager.switchWnd(e, WIN_OPERATOR.WIN_CLOSE_DELETE), WndManager.switchWnd(Home, WIN_OPERATOR.WIN_OPEN_SHOW)
	}, e
}(WinBase);
egret.registerClass(Shoping, "Shoping");
var Shopxq = function(t) {
	function e() {
		t.call(this), this.zuobiaox = 0, this.zuobiaoy = 0, this.kj = 0, this.IDarr = [], this.imgArr = [], this.createGameScene(), this.touchEnabled = !0, this.width = 640, this.height = 1036, Tool.center(this), this.addEventListener(egret.Event.ADDED_TO_STAGE, function() {
			var t = this,
				e = this;
			e.alpha = 0, egret.Tween.get(e).to({
				scaleX: .95,
				scaleY: .95,
				alpha: .5
			}, 200).call(function() {
				egret.Tween.get(e).to({
					scaleX: 1,
					scaleY: 1,
					alpha: 1
				}, 200).call(function() {}, t)
			}, this)
		}, this)
	}
	__extends(e, t);
	var i = (__define, e),
		a = i.prototype;
	return a.createGameScene = function() {
		this.addChild(Tool.createBitmapByName("shopxqbg_jpg"));
		var t = Tool.createBitmapByName("rank_fh_png");
		t.x = 31, t.y = 18, t.touchEnabled = !0, this.addChild(t), t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fanhuimc, this), this.log = Tool.createBitmapByName("lingqubtn_png"),this.log.x = 400, this.log.y = 920, this.log.touchEnabled = !0, this.addChild(this.log),
		/*this.mm = Tool.createBitmapByName("money_png"),this.mm.x = 20, this.mm.y = 890,this.mm.height = 130,this.mm.width = 90,this.addChild(this.mm),*/ this.log.addEventListener(egret.TouchEvent.TOUCH_TAP, this.lingqu_mc, this),this.shangpRQ = new egret.Sprite, this.addChild(this.shangpRQ), this.shangpRQ.y = 140,this.mScroll = new egret.ScrollView, this.mScroll.setContent(this.shangpRQ), this.addChild(this.mScroll), this.mScroll.x = 0, this.mScroll.y = 0, this.mScroll.width = 640, this.mScroll.height = 1030;
		var e = new egret.URLLoader,
			i = new egret.URLRequest;
		i.url = WndManager.root.url_ + "Api/Ware/getWareDetail";
		var a = new egret.URLVariables("?ware_id=" + Mode.shanpID);
		e.addEventListener(egret.Event.COMPLETE, this.updateRank, this), i.method = egret.URLRequestMethod.POST, i.data = a, e.load(i)
	}, a.updateRank = function(t) {
		//兑换处商品兑换页
		var e = JSON.parse(t.target.data);
		this.shuarr = e.data.length, RES.getResByUrl("http://uat.zwmedia.com.cn" + e.data.ware_details.image, this.onImgload, this, RES.ResourceItem.TYPE_IMAGE), this.RQtxt = new egret.Sprite, this.addChild(this.RQtxt),this.gameinn = Tool.createTextFiled(20, 930, 350, 50, e.data.ware_details.price + " 金币", 60, 16760598, !0),this.gameinn.textAlign = egret.HorizontalAlign.CENTER, this.addChild(this.gameinn), this.gameinn.strokeColor = 4788754, this.gameinn.stroke = 6, this.pkwin = Tool.createTextFiled(0, 0, 500, 50, "商品名称：" + e.data.ware_details.title, 28, 5053713, !0),this.RQtxt.addChild(this.pkwin), this.gamewin = Tool.createTextFiled(0, 80, 500, 300, "使用规则：" + e.data.ware_details.rule, 28, 5053713, !0), this.gamewin.$setLineSpacing(10),this.RQtxt.addChild(this.gamewin), this.tuodong = new egret.ScrollView(this.RQtxt), this.tuodong.width = 500, this.tuodong.height = 370, this.tuodong.x = 80, this.tuodong.y = 455, this.tuodong.bounces = !0, this.addChild(this.tuodong), this.maxwin = Tool.createTextFiled(0, 40, 500, 50, "有效期：" + e.data.ware_details.expiry_date, 28, 5053713, !0), this.RQtxt.addChild(this.maxwin)
	}, a.onImgload = function(t) {
		var e = t,
			i = new egret.Sprite,
			a = new egret.Bitmap(e);
		a.width = 640, a.height = 298, i.addChild(a), i.x = 0, i.y = 110, this.addChild(i)
	}, a.lingqu_mc = function() {
		this.tancdi = new egret.Sprite, this.tancdi.graphics.beginFill(0, .6), this.tancdi.graphics.drawRect(0, 0, 640, 1036), this.tancdi.graphics.endFill(), this.addChild(this.tancdi), this.tancdi.touchEnabled = !0, this.tancdi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tuichupk_tc, this), this.tancbg = Tool.createBitmapByName("home_plane_png"), this.tancbg.x = 80, this.tancbg.y = 288, this.addChild(this.tancbg), this.tancyuck = Tool.createBitmapByName("shurutxt_png"), this.tancyuck.x = 110, this.tancyuck.y = 345, this.addChild(this.tancyuck), this.tancyuctxt = Tool.createBitmapByName("home_yuce_box_png"), this.tancyuctxt.x = 117, this.tancyuctxt.y = 428, this.addChild(this.tancyuctxt), this.tancbtn = Tool.createBitmapByName("lingqubtn2_png"), this.tancbtn.pixelHitTest = !0, this.tancbtn.touchEnabled = !0, this.tancbtn.x = 210, this.tancbtn.y = 525, this.addChild(this.tancbtn), this.tancbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.swichClick, this), this.tanctxt = Tool.createTextFiled(150, 447, 340, 50, "", 35, 9117728), this.tanctxt.type = "input", this.tanctxt.stroke = 2, this.tanctxt.strokeColor = 16777215, this.addChild(this.tanctxt), this.tanctxt.maxChars = 11, this.tanctxt.restrict = "0-9"
	}, a.swichClick = function() {
		var t = this.tanctxt.text,
			e = new RegExp("^1[3-8][0-9]{9}$");
		if(0 == e.test(t)) return void ToastUtils.setContent("输入错误，请输入正确手机号码！", this);
		var i = new egret.URLLoader,
			a = new egret.URLRequest;
		a.url = WndManager.root.url_ + "Api/Ware/buyWare";
		var n = new egret.URLVariables("?ware_id=" + Mode.shanpID + "&telphone=" + this.tanctxt.text);
		i.addEventListener(egret.Event.COMPLETE, this.updatetijiao, this), a.method = egret.URLRequestMethod.POST, a.data = n, i.load(a)
	}, a.updatetijiao = function(t) {
		var e = JSON.parse(t.target.data);
		1 == e.status ? (alert("购买成功"), this.tuichupk_tc()) : alert(e.info)
	}, a.tuichupk_tc = function() {
		this.removeChild(this.tancdi), this.removeChild(this.tancbg), this.removeChild(this.tancyuck), this.removeChild(this.tancyuctxt), this.removeChild(this.tancbtn), this.removeChild(this.tanctxt)
	}, a.cheise = function(t) {
		egret.log(this.imgArr.indexOf(t.currentTarget)), Mode.shanpID = this.IDarr[this.imgArr.indexOf(t.currentTarget)], WndManager.switchWnd(Shoping, WIN_OPERATOR.WIN_CLOSE_DELETE), WndManager.switchWnd(Home, WIN_OPERATOR.WIN_OPEN_SHOW)
	}, a.fanhuimc = function() {
		WndManager.switchWnd(e, WIN_OPERATOR.WIN_CLOSE_DELETE), WndManager.switchWnd(Shoping, WIN_OPERATOR.WIN_OPEN_SHOW)
	}, e
}(WinBase);
egret.registerClass(Shopxq, "Shopxq");
var HongBaoManager = function() {
	function t() {
		this.writeFrame = this.none, this.percents = [.4, .2, .3, .1, 0], this.datas = [], this.objs = [], this.removes = [], this.hongbaoStrs = ["sign_diamond_png", "sign_money_png", "sign_shitou_png", "dashitou_png", "dashitou_png"], this.hongbaoTxures = [null, null, null, null, null], this._inited = !1
	}
	var e = (__define, t),
		i = e.prototype;
	return t.getInstance = function() {
		return this.instance || (this.instance = new t), this.instance
	}, i.none = function() {}, i.init = function() {
		this._inited || (this._inited = !0, this.bmpRecycler = new egret.Recycler, this.paramRecycler = new egret.Recycler, this.pointRecycler = new egret.Recycler, this.container.addEventListener(egret.Event.ENTER_FRAME, this.write_frame, this))
	}, i.write_frame = function() {
		this.writeFrame()
	}, i.start = function() {
		this.writeFrame = this.writeFramePipe
	}, i.end = function() {
		this.writeFrame = this.none
	}, i.addObjs = function(t, e) {
		for(var i, a; t--;) {
			i = e ? e : this.getRandomIndex(), a = this.bmpRecycler.length > 0 ? this.bmpRecycler.pop() : new egret.Bitmap, this.hongbaoTxures[i] || (this.hongbaoTxures[i] = RES.getRes(this.hongbaoStrs[i])), a.bitmapData = this.hongbaoTxures[i].bitmapData, a.anchorOffsetX = a.width >> 1, a.anchorOffsetY = a.height >> 1, a.y = -a.height, a.x = a.anchorOffsetX + Math.random() * (this.container.width - 2 * a.anchorOffsetX);
			var n;
			n = this.paramRecycler.length > 0 ? this.paramRecycler.pop() : new Object, n.index = i, n.y = a.y, n.jv = 0, n.v0 = 10 * Math.random() + 400, n.t = egret.getTimer(), n.theta = 90, n.x = a.x, this.container.addChild(a), this.objs.push(a), this.datas.push(n)
		}
		this.objs.length > 0 && (this.writeFrame = this.writeFramePipe)
	}, i.getRandomIndex = function() {
		var t = -1;
		if(Math.random() > this.percents[4]) {
			var e = Math.random();
			t = e < this.percents[3] ? 3 : e < this.percents[2] + this.percents[3] ? 2 : Math.random() > .5 ? 1 : 0
		} else t = 3;
		return t
	}, i.writeFramePipe = function() {
		var t, e, i, a;
		for(this.checkHit(), t = 0; t < this.objs.length; t++) e = this.objs[t], i = this.datas[t], a = egret.getTimer() - i.t, a /= 1e3, e.rotation = i.jv * a, e.y = i.y + i.v0 * a, e.y >= this.container.height + .5 * e.height && this.removes.push(e);
		this.removeObjs()
	}, i.removeObjs = function() {
		for(var t, e = 0; e < this.removes.length; e++) t = this.objs.indexOf(this.removes[e]), t >= 0 && (this.bmpRecycler.push(this.objs[t]), this.objs.splice(t, 1), this.removes[e].parent && this.removes[e].parent.removeChild(this.removes[e]), this.datas.length > t && (this.paramRecycler.push(this.datas[t]), this.datas.splice(t, 1)));
		this.removes.length = 0
	}, i.wenben = function(t, e, i) {
		var a = new egret.TextField;
		a.textColor = 16735038, a.size = 30, a.x = 100 + 400 * Math.random(), a.y = 750, a.width = 150, a.height = 100, a.bold = !0, a.text = t, this.container.addChild(a), egret.Tween.get(a).to({
			alpha: 0,
			y: 100 * Math.random() + 200
		}, 1200)
	}, i.checkHit = function() {
		var t, e, i, a, n, s, h;
		for(n = 0; n < this.objs.length; n++) t = this.pointRecycler.length > 0 ? this.pointRecycler.pop() : new egret.Point, e = this.pointRecycler.length > 0 ? this.pointRecycler.pop() : new egret.Point, t.x = this.objs[n].x, t.y = this.objs[n].y, e.x = this.body.x + 30, e.y = this.body.y + 50, s = this.distance(t, e), s < .5 * this.objs[n].width + .5 * this.body.width && this.removes.push(this.objs[n]);
		var i;
		for(n = 0; n < this.removes.length; n++) h = this.objs.indexOf(this.removes[n]), h >= 0 && (i = this.objs[h], a = this.datas[h], console.log("rrr:" + a.index), 1 == Mode.playStop && (0 == a.index ? (Mode.ismoney += 600, Mode.money += 600, this.wenben("+600", a.x, a.y)) : 1 == a.index ? (Mode.ismoney += 300, Mode.money += 300, this.wenben("+300", a.x, a.y)) : 3 == a.index ? (Mode.money = Mode.money - Mode.ismoney, this.wenben("-" + Mode.ismoney, a.x, a.y), Mode.ismoney = 0, Sign.jishiqi = 1) : (Mode.ismoney -= 500, Mode.money -= 500, this.wenben("-500", a.x, a.y))), this.bmpRecycler.push(this.objs[h]), this.objs.splice(h, 1), this.removes[n].parent && this.removes[n].parent.removeChild(this.removes[n]), this.datas.length > h && (this.paramRecycler.push(this.datas[h]), this.datas.splice(h, 1)));
		this.removes.length = 0
	}, i.distance = function(t, e) {
		var i = t.x - e.x,
			a = t.y - e.y;
		return Math.sqrt(i * i + a * a)
	}, t
}();
egret.registerClass(HongBaoManager, "HongBaoManager");
var Sign = function(t) {
	function e() {
		t.call(this), this.toupicArr = [], this.daoshuci = 0, this.isMoving = !1, this.createGameScene(), this.touchEnabled = !0, this.width = 640, this.height = 1036, Tool.center(this), this.addEventListener(egret.Event.ADDED_TO_STAGE, function() {
			var t = this,
				e = this;
			e.alpha = 0, egret.Tween.get(e).to({
				scaleX: .95,
				scaleY: .95,
				alpha: .5
			}, 200).call(function() {
				egret.Tween.get(e).to({
					scaleX: 1,
					scaleY: 1,
					alpha: 1
				}, 200).call(function() {}, t)
			}, this)
		}, this)
	}
	__extends(e, t);
	var i = (__define, e),
		a = i.prototype;
	return a.createGameScene = function() {
		var t = this;
		WndManager.root.qiandaois = !1, e.jishiqi = 60, this.toupicArr = ["npc_fa_photo3_png", "npc_hao_photo3_png"], this.addChild(Tool.createBitmapByName("sign_bg_jpg")), this.dongh = new egret.MovieClip, this.dongh = MyUtils.getMovieClip("dongh"), this.dongh.frameRate = 4, this.addChild(this.dongh), this.headMask = Tool.createBitmapByName("fortune_gai_png"), this.headMask.x = 10, this.headMask.y = 6, this.addChild(this.headMask), this.money = Tool.getBitmapText("home_font_fnt"), this.money.x = 330, this.money.y = 52, this.addChild(this.money), this.money.text = String(Mode.money), this.count = Tool.getBitmapText("home_font_fnt"), this.count.x = 550, this.count.y = 45, this.count.scaleX = this.count.scaleY = 1.5, this.addChild(this.count), this.count.text = e.jishiqi + "", this.updateHead(), this.body2 = new egret.MovieClip, "LittleGril" == Mode.xuanzerole && (this.body2 = Tool.createMovieClip("xiaomo")), "MatureWoman" == Mode.xuanzerole && (this.body2 = Tool.createMovieClip("jinjie")), "LoserMan" == Mode.xuanzerole && (this.body2 = Tool.createMovieClip("xiaofa")), "TyrantMan" == Mode.xuanzerole && (this.body2 = Tool.createMovieClip("paobu")), this.addChild(this.body2), this.body2.frameRate = 20, this.body2.anchorOffsetX = this.body2.width / 2, this.body2.play(99999), this.body2.x = 254, this.body2.y = 720, HongBaoManager.getInstance().container = this, HongBaoManager.getInstance().init(), HongBaoManager.getInstance().start(), HongBaoManager.getInstance().body = this.body2, window && window.DeviceOrientationEvent && window.addEventListener("deviceorientation", function(e) {
			var i, a = 45,
				n = Number(e.gamma.toFixed(2)),
				s = 2;
			switch(egret.Capabilities.os) {
				case "iOS":
					i = 8;
					break;
				default:
					i = 8
			}
			var h = [i * s, 0],
				o = [0, 0];
			n = Math.round(e.gamma), n = -a > n ? -a : n, n = n > a ? a : n, o[0] = h[0] * (Math.abs(n) / a) * (n >= 0 ? 1 : -1) * s;
			t.body2.x += o[0];
			var r = 620 - t.body2.anchorOffsetX;
			t.body2.x = t.body2.x >= r ? r : t.body2.x, t.body2.x = t.body2.x <= -26 + t.body2.anchorOffsetX ? -26 + t.body2.anchorOffsetX : t.body2.x
		}, !1), this.tancdi = new egret.Sprite, this.tancdi.graphics.beginFill(0, .6), this.tancdi.graphics.drawRect(0, 0, 640, 1036), this.tancdi.graphics.endFill(), this.addChild(this.tancdi), this.tancdi.touchEnabled = !0, this.qiandaoxzbg = Tool.createBitmapByName("npc_input_png"), this.addChild(this.qiandaoxzbg), this.qiandaoxzbg.anchorOffsetX = this.qiandaoxzbg.width / 2, this.qiandaoxzbg.anchorOffsetY = this.qiandaoxzbg.height / 2, this.qiandaoxzbg.x = 320, this.qiandaoxzbg.y = 500, this.qiandaoxzbg.scaleX = this.qiandaoxzbg.scaleY = 1.2, this.paobuqiandao = Tool.createBitmapByName("paobuqd_btn_png"), this.addChild(this.paobuqiandao), this.paobuqiandao.x = 80, this.paobuqiandao.y = 460, this.paobuqiandao.touchEnabled = !0, this.paobuqiandao.addEventListener(egret.TouchEvent.TOUCH_TAP, this.iskaishi, this), this.kuaisuqiandao = Tool.createBitmapByName("kuaisu_btn_png"), this.addChild(this.kuaisuqiandao), this.kuaisuqiandao.x = 330, this.kuaisuqiandao.y = 460, this.kuaisuqiandao.touchEnabled = !0, this.kuaisuqiandao.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tuichu, this)
	}, a.iskaishi = function() {
		this.removeChild(this.qiandaoxzbg), this.removeChild(this.paobuqiandao), this.removeChild(this.kuaisuqiandao), this.daoshu_mc()
	}, a.tuichu = function() {
		Mode.ismoney = 3e3, this.removeChild(this.kuaisuqiandao), this.removeChild(this.paobuqiandao);
		var t = new egret.URLLoader,
			e = new egret.URLRequest;
		e.url = WndManager.root.url_ + "Api/Game/pickUpGold";
		var i = new egret.URLVariables("?money=" + Mode.ismoney);
		t.addEventListener(egret.Event.COMPLETE, this.updateRank, this), e.method = egret.URLRequestMethod.POST, e.data = i, t.load(e), this.tanctxt2 = Tool.createTextFiled(187, 484, 400, 50, "获得金币：" + Mode.ismoney, 35, 9117728), this.tanctxt2.stroke = 2, this.tanctxt2.strokeColor = 16777215, this.addChild(this.tanctxt2), egret.setTimeout(this.fanhuihome, this, 800)
	}, a.daoshu_mc = function() {
		if(this.daoshuci++, 1 == this.daoshuci) this.daoshu1 = Tool.createBitmapByName("d3_png"), this.daoshu1.anchorOffsetX = this.daoshu1.width / 2, this.daoshu1.anchorOffsetY = this.daoshu1.height / 2, this.daoshu1.x = 320, this.daoshu1.y = 518, this.daoshu1.scaleX = this.daoshu1.scaleY = 2, this.addChild(this.daoshu1), egret.Tween.get(this.daoshu1).to({
			scaleX: 1,
			scaleY: 1
		}, 600, egret.Ease.backIn).to({
			scaleX: .4,
			scaleY: .4,
			alpha: 0
		}, 400);
		else if(2 == this.daoshuci) this.removeChild(this.daoshu1), this.daoshu2 = Tool.createBitmapByName("d2_png"), this.daoshu2.anchorOffsetX = this.daoshu2.width / 2, this.daoshu2.anchorOffsetY = this.daoshu2.height / 2, this.daoshu2.x = 320, this.daoshu2.y = 518, this.daoshu2.scaleX = this.daoshu2.scaleY = 2, this.addChild(this.daoshu2), egret.Tween.get(this.daoshu2).to({
			scaleX: 1,
			scaleY: 1
		}, 600, egret.Ease.backIn).to({
			scaleX: .4,
			scaleY: .4,
			alpha: 0
		}, 400);
		else if(3 == this.daoshuci) this.removeChild(this.daoshu2), this.daoshu3 = Tool.createBitmapByName("d1_png"), this.daoshu3.anchorOffsetX = this.daoshu3.width / 2, this.daoshu3.anchorOffsetY = this.daoshu3.height / 2, this.daoshu3.x = 320, this.daoshu3.y = 518, this.daoshu3.scaleX = this.daoshu3.scaleY = 2, this.addChild(this.daoshu3), egret.Tween.get(this.daoshu3).to({
			scaleX: 1,
			scaleY: 1
		}, 600, egret.Ease.backIn).to({
			scaleX: .4,
			scaleY: .4,
			alpha: 0
		}, 400);
		else {
			if(4 != this.daoshuci) return this.removeChild(this.tancdi), this.removeChild(this.daoshu4), this.dongh.play(99999), egret.clearTimeout(this.daoshu_num), this.add_timer = egret.setTimeout(this.addwuping, this, 1e3), this.daojishi_num = egret.setTimeout(this.daojishi_mc, this, 1e3), void this.addEventListener(egret.Event.ENTER_FRAME, this.uptxt, this);
			this.removeChild(this.daoshu3), this.daoshu4 = Tool.createBitmapByName("d0_png"), this.daoshu4.anchorOffsetX = this.daoshu4.width / 2, this.daoshu4.anchorOffsetY = this.daoshu4.height / 2, this.daoshu4.x = 320, this.daoshu4.y = 518, this.daoshu4.scaleX = this.daoshu4.scaleY = 2, this.addChild(this.daoshu4), egret.Tween.get(this.daoshu4).to({
				scaleX: 1,
				scaleY: 1
			}, 600, egret.Ease.backIn).to({
				scaleX: .4,
				scaleY: .4,
				alpha: 0
			}, 400)
		}
		this.daoshu_num = egret.setTimeout(this.daoshu_mc, this, 1e3)
	}, a.uptxt = function() {
		this.money.text = String(Mode.money)
	}, a.daojishi_mc = function() {
		e.jishiqi--, e.jishiqi <= 0 ? (egret.log("asdasd"), e.jishiqi = 0, this.dongh.stop(), egret.clearTimeout(this.add_timer), egret.clearTimeout(this.daojishi_num), this.removeEventListener(egret.Event.ENTER_FRAME, this.uptxt, this), this.gameOver(), Mode.playStop = !1) : this.daojishi_num = egret.setTimeout(this.daojishi_mc, this, 1e3), this.count.text = e.jishiqi + ""
	}, a.gameOver = function() {
		this.tancdi = new egret.Sprite, this.tancdi.graphics.beginFill(0, .6), this.tancdi.graphics.drawRect(0, 0, 640, 1036), this.tancdi.graphics.endFill(), this.addChild(this.tancdi), this.tancdi.touchEnabled = !0, this.tancdi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fanhuihome, this), this.tanctxt = Tool.createBitmapByName("sign_timeover_png"), this.tanctxt.x = 320, this.tanctxt.y = 450, this.tanctxt.anchorOffsetX = this.tanctxt.width / 2, this.tanctxt.anchorOffsetY = this.tanctxt.height / 2, this.tanctxt.scaleX = this.tanctxt.scaleY = .6, this.addChild(this.tanctxt), egret.Tween.get(this.tanctxt).to({
			scaleX: 1,
			scaleY: 1
		}, 600, egret.Ease.backOut), this.tanctxt2 = Tool.createTextFiled(327, 472, 340, 50, Mode.ismoney + "", 35, 9117728), this.tanctxt2.stroke = 2, this.tanctxt2.strokeColor = 16777215, this.addChild(this.tanctxt2);
		var t = new egret.URLLoader,
			e = new egret.URLRequest;
		e.url = WndManager.root.url_ + "Api/Game/pickUpGold";
		var i = new egret.URLVariables("?money=" + Mode.ismoney);
		t.addEventListener(egret.Event.COMPLETE, this.updateRank, this), e.method = egret.URLRequestMethod.POST, e.data = i, t.load(e)
	}, a.updateRank = function(t) {
		JSON.parse(t.target.data);
		egret.setTimeout(this.fanhuihome, this, 1200)
	}, a.fanhuihome = function() {
		WndManager.switchWnd(e, WIN_OPERATOR.WIN_CLOSE_DELETE), WndManager.switchWnd(Home, WIN_OPERATOR.WIN_OPEN_SHOW)
	}, a.onBegin = function(t) {
		this.isMoving = !0
	}, a.onMove = function(t) {
		this.isMoving && t.stageX - this.body2.anchorOffsetX >= 0 && t.stageX + this.body2.anchorOffsetX <= egret.MainContext.instance.stage.stageWidth && (this.body2.x = t.stageX)
	}, a.onEnd = function(t) {
		this.isMoving = !1
	}, a.addwuping = function() {
		HongBaoManager.getInstance().addObjs(1), this.add_timer = egret.setTimeout(this.addwuping, this, 1e3)
	}, a.updateHead = function() {
		this.head && this.removeChild(this.head), this.head = this.getHeadImg(), this.head.x = 30, this.head.y = 62, this.addChild(this.head)
	}, a.getHeadImg = function() {
		var t = new egret.Sprite;
		t.width = 80;
		var e = Tool.createBitmapByName(this.getHeadStr());
		e.scaleX = e.scaleY = .5, e.anchorOffsetX = e.width / 2, e.x = t.width / 2, e.y = -40;
		var i = this.getCircle();
		return t.addChild(e), t.addChild(i), e.mask = i, t
	}, a.getHeadStr = function() {
		if(Mode.money < 5e5) {
			if("LittleGril" == Mode.xuanzerole) return Mode.mo[0];
			if("MatureWoman" == Mode.xuanzerole) return Mode.jin[0];
			if("LoserMan" == Mode.xuanzerole) return Mode.fa[0];
			if("TyrantMan" == Mode.xuanzerole) return Mode.hao[0]
		} else if(Mode.money >= 5e5 && Mode.money < 1e6) {
			if("LittleGril" == Mode.xuanzerole) return Mode.mo[1];
			if("MatureWoman" == Mode.xuanzerole) return Mode.jin[1];
			if("LoserMan" == Mode.xuanzerole) return Mode.fa[1];
			if("TyrantMan" == Mode.xuanzerole) return Mode.hao[1]
		} else {
			if("LittleGril" == Mode.xuanzerole) return Mode.mo[2];
			if("MatureWoman" == Mode.xuanzerole) return Mode.jin[2];
			if("LoserMan" == Mode.xuanzerole) return Mode.fa[2];
			if("TyrantMan" == Mode.xuanzerole) return Mode.hao[2]
		}
	}, a.getCircle = function() {
		var t = new egret.Shape;
		return t.graphics.beginFill(0, 1), t.graphics.drawCircle(40, 0, 40), t.graphics.endFill(), t
	}, e
}(WinBase);
egret.registerClass(Sign, "Sign");
var ToastUtils = function() {
	function t() {}
	var e = (__define, t);
	e.prototype;
	return t.setContent = function(t, e, i, a) {
		void 0 === i && (i = 0), void 0 === a && (a = 480);
		var n = this.InstanceSpr();
		this.toastText.text = t, egret.Tween.removeTweens(n), egret.Tween.get(n).to({
			alpha: 1
		}, 100).wait(2300).to({
			alpha: 0
		}, 100).call(function() {
			n.parent && n.parent.removeChild(n)
		}), n.x = i, n.y = a, e.addChild(n)
	}, t.InstanceSpr = function(t, e, i, a, n) {
		if(void 0 === t && (t = 0), void 0 === e && (e = 30), void 0 === i && (i = 640), void 0 === a && (a = 60), void 0 === n && (n = 16776960), null == this._instanceSpr) {
			this._instanceSpr = new egret.Sprite;
			var s = new egret.Matrix;
			s.createGradientBox(i, a), this._instanceSpr.graphics.beginGradientFill(egret.GradientType.LINEAR, [t, t, t], [0, 1, 0], [0, 127, 255], s), this._instanceSpr.graphics.drawRect(0, 0, i, a), this._instanceSpr.graphics.endFill(), this.toastText = new egret.TextField, this.toastText.size = e, this.toastText.x = this.toastText.y = 0, this.toastText.width = i, this.toastText.height = a, this.toastText.textAlign = "center", this.toastText.verticalAlign = egret.VerticalAlign.MIDDLE, this.toastText.textColor = n, this._instanceSpr.addChild(this.toastText)
		}
		return this._instanceSpr.alpha = 0, this._instanceSpr
	}, t
}();
egret.registerClass(ToastUtils, "ToastUtils");
var MessageTool = function(t) {
	function e() {
		t.call(this), this.createGameScene()
	}
	__extends(e, t);
	var i = (__define, e),
		a = i.prototype;
	return a.createGameScene = function() {}, a.POST = function(t, e, i) {
		var a = e,
			n = new egret.HttpRequest;
		n.responseType = egret.HttpResponseType.TEXT, n.open(t, egret.HttpMethod.GET), n.send(a), n.addEventListener(egret.Event.COMPLETE, i.onGetComplete, this), n.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this)
	}, a.GET = function(t, e, i) {
		var a = e,
			n = new egret.HttpRequest;
		n.responseType = egret.HttpResponseType.TEXT, n.open(t + a, egret.HttpMethod.GET), n.send(), n.addEventListener(egret.Event.COMPLETE, i.onGetComplete, this), n.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this)
	}, a.onGetIOError = function(t) {
		console.log("get error : " + t)
	}, e
}(egret.Sprite);
egret.registerClass(MessageTool, "MessageTool");
var MyUtils = function() {
	function t() {}
	var e = (__define, t);
	e.prototype;
	return t.GetBtn = function(e, i, a, n, s) {
		var h = new egret.Sprite;
		return h.graphics.beginFill(65280, 0), h.graphics.drawRect(0, 0, e, i), h.graphics.endFill(), h.width = e, h.height = i, h.x = a, h.y = n, h.touchEnabled = !0, h.addChild(t.createBitmapByName(s)), h
	}, t.GetBtn1 = function(t, e, i, a) {
		var n = new egret.Sprite;
		return n.graphics.beginFill(65280, 0), n.graphics.drawRect(0, 0, t, e), n.graphics.endFill(), n.width = t, n.height = e, n.x = i, n.y = a, n.touchEnabled = !0, n
	}, t.GetBtn2 = function(t, e, i, a) {
		var n = new egret.Sprite;
		return n.graphics.beginFill(0, .4), n.graphics.drawRect(0, 0, t, e), n.graphics.endFill(), n.width = t, n.height = e, n.x = i, n.y = a, n.touchEnabled = !0, n
	}, t.GetBtn3 = function(t, e, i, a) {
		var n = new egret.Sprite;
		return n.graphics.beginFill(0, 1), n.graphics.drawRect(0, 0, t, e), n.graphics.endFill(), n.width = t, n.height = e, n.x = i, n.y = a, n.touchEnabled = !0, n
	}, t.createBitmapByName = function(t) {
		var e = new egret.Bitmap,
			i = RES.getRes(t);
		return e.texture = i, e
	}, t.getMovieClip = function(t) {
		var e = RES.getRes(t + "_json"),
			i = RES.getRes(t + "_png"),
			a = new egret.MovieClipDataFactory(e, i),
			n = a.generateMovieClipData(t),
			s = new egret.MovieClip(n);
		return s
	}, t.GetRequest = function() {
		var t = document.location.search,
			e = new Object;
		if(-1 != t.indexOf("?"))
			for(var i = t.substr(1), a = i.split("&"), n = 0; n < a.length; n++) e[a[n].split("=")[0]] = a[n].split("=")[1];
		return e
	}, t.getMyParamer = function(e) {
		var i = new Object;
		return i = t.GetRequest(), i[e]
	}, t.calcStringByte = function(e) {
		t.by.writeUTFBytes(e);
		var i = t.by.length;
		return t.by.clear(), i
	}, t.by = new egret.ByteArray, t
}();
egret.registerClass(MyUtils, "MyUtils");
var Tool = function() {
	function t() {}
	var e = (__define, t);
	e.prototype;
	return t.createBitmapByName = function(t) {
		var e = new egret.Bitmap,
			i = RES.getRes(t);
		return e.texture = i, e
	}, t.createBitmapBySheet = function(t, e) {
		var i = new egret.Bitmap,
			a = t.getTexture(e);
		return i.texture = a, i
	}, t.createButton = function(e, i, a, n, s, h, o, r, d) {
		void 0 === r && (r = 0), void 0 === d && (d = 0);
		var c = new egret.Sprite,
			l = function() {
				c.removeEventListener(egret.TouchEvent.TOUCH_TAP, l, e), egret.Tween.get(c).to({
					scaleX: 1.1,
					scaleY: 1.1
				}, 400, egret.Ease.backOut).to({
					scaleX: 1,
					scaleY: 1
				}, 400, egret.Ease.backOut).call(function() {
					c.addEventListener(egret.TouchEvent.TOUCH_TAP, l, e)
				}, e), o(e)
			};
		return c.addChild(t.createBitmapByName(i)), c.x = a, c.y = n, c.width = s, c.height = h, c.touchEnabled = !0, c.anchorOffsetX = r, c.anchorOffsetY = d, c.addEventListener(egret.TouchEvent.TOUCH_TAP, l, e), c
	}, t.createNullBtn = function(t, e, i, a) {
		var n = new egret.Sprite;
		return n.graphics.beginFill(0, 0), n.graphics.drawRect(0, 0, i, a), n.graphics.endFill(), n.x = t, n.y = e, n
	}, t.createButton2 = function(e, i, a, n, s, h, o) {
		void 0 === h && (h = 0), void 0 === o && (o = 0);
		var r = new egret.Sprite;
		return r.addChild(t.createBitmapByName(e)), r.x = i, r.y = a, r.width = n, r.height = s, r.touchEnabled = !0, r.anchorOffsetX = h, r.anchorOffsetY = o, r
	}, t.createTextFiled = function(t, e, i, a, n, s, h, o) {
		void 0 === n && (n = ""), void 0 === s && (s = 35), void 0 === h && (h = 0), void 0 === o && (o = !1);
		var r = new egret.TextField;
		return r.fontFamily = "Microsoft YaHei, Helvetica, sans-serif", r.x = t, r.y = e, r.width = i, r.height = a, r.text = n, r.size = s, r.textColor = h, r.bold = o, r
	}, t.removeALL = function(t) {
		for(; t.numChildren > 0;) t.removeChildAt(0)
	}, t.hitTest = function(t, e) {
		var i = t.getBounds(),
			a = e.getBounds();
		return i.x = t.x, i.y = t.y, a.x = e.x - 25, a.y = e.y - 20, i.intersects(a)
	}, t.center = function(t) {
		t.anchorOffsetX = t.width >> 1, t.anchorOffsetY = t.height >> 1, t.x += t.anchorOffsetX, t.y += t.anchorOffsetY
	}, t.LMoveR = function(t, e, i, a, n, s, h) {
		void 0 === a && (a = 0), void 0 === s && (s = null), void 0 === h && (h = !1), t.y = i, t.x = -t.width, h && (t.x -= t.parent.x), egret.Tween.get(t).wait(a).to({
			x: e,
			y: i
		}, n, s)
	}, t.RMoveL = function(t, e, i, a, n, s, h) {
		void 0 === a && (a = 0), void 0 === s && (s = null), void 0 === h && (h = !1), t.y = i, t.x = egret.MainContext.instance.stage.stageWidth + t.width, h && (t.x += t.parent.x), egret.Tween.get(t).wait(a).to({
			x: e,
			y: i
		}, n, s)
	}, t.LMoveRout = function(t, e, i, a) {
		void 0 === e && (e = 0), void 0 === a && (a = null), egret.Tween.get(t).wait(e).to({
			x: t.x + egret.MainContext.instance.stage.stageWidth
		}, i, a)
	}, t.RMoveLout = function(t, e, i, a) {
		void 0 === e && (e = 0), void 0 === a && (a = null), egret.Tween.get(t).wait(e).to({
			x: -(t.x + t.width)
		}, i, a)
	}, t.getBitmapText = function(t) {
		var e = RES.getRes(t),
			i = new egret.BitmapText;
		return i.font = e, i
	}, t.createMovieClip = function(t) {
		var e = RES.getRes(t + "_json"),
			i = RES.getRes(t + "_png"),
			a = new egret.MovieClipDataFactory(e, i),
			n = a.generateMovieClipData(t),
			s = new egret.MovieClip(n);
		return s
	}, t
}();
egret.registerClass(Tool, "Tool");
var WIN_OPERATOR;
! function(t) {
	t[t.WIN_OPEN_NEW = 0] = "WIN_OPEN_NEW", t[t.WIN_CLOSE_DELETE = 1] = "WIN_CLOSE_DELETE", t[t.WIN_CLOSE_HIDE = 2] = "WIN_CLOSE_HIDE", t[t.WIN_OPEN_SHOW = 3] = "WIN_OPEN_SHOW", t[t.WIN_OPEN_SHOW_OR_HIDE = 4] = "WIN_OPEN_SHOW_OR_HIDE"
}(WIN_OPERATOR || (WIN_OPERATOR = {}));
var WIN_EFFECT;
! function(t) {
	t[t.EFFECT_WIN_CLOSE_BEGIN = 0] = "EFFECT_WIN_CLOSE_BEGIN", t[t.EFFECT_WIN_CLOSE_MOVE_LEFT = 1] = "EFFECT_WIN_CLOSE_MOVE_LEFT", t[t.EFFECT_WIN_CLOSE_MOVE_RIGHT = 2] = "EFFECT_WIN_CLOSE_MOVE_RIGHT", t[t.EFFECT_WIN_CLOSE_MOVE_UP = 3] = "EFFECT_WIN_CLOSE_MOVE_UP", t[t.EFFECT_WIN_CLOSE_MOVE_DOWN = 4] = "EFFECT_WIN_CLOSE_MOVE_DOWN", t[t.EFFECT_WIN_CLOSE_SCALE = 5] = "EFFECT_WIN_CLOSE_SCALE", t[t.EFFECT_WIN_CLOSE_END = 6] = "EFFECT_WIN_CLOSE_END", t[t.EFFECT_WIN_OPEN_MOVE_LEFT = 7] = "EFFECT_WIN_OPEN_MOVE_LEFT", t[t.EFFECT_WIN_OPEN_MOVE_RIGHT = 8] = "EFFECT_WIN_OPEN_MOVE_RIGHT", t[t.EFFECT_WIN_OPEN_MOVE_UP = 9] = "EFFECT_WIN_OPEN_MOVE_UP", t[t.EFFECT_WIN_OPEN_MOVE_DOWN = 10] = "EFFECT_WIN_OPEN_MOVE_DOWN", t[t.EFFECT_WIN_OPEN_SCALE = 11] = "EFFECT_WIN_OPEN_SCALE", t[t.EFFECT_WIN_OPEN_ALPHA = 12] = "EFFECT_WIN_OPEN_ALPHA", t[t.EFFECT_WIN_OPEN_END = 13] = "EFFECT_WIN_OPEN_END"
}(WIN_EFFECT || (WIN_EFFECT = {}));
var WndManager = function(t) {
	function e() {
		t.call(this), this.wins = []
	}
	__extends(e, t);
	var i = (__define, e),
		a = i.prototype;
	return a.switchWnd = function(t, i, a) {
		var n = null;
		switch(i) {
			case WIN_OPERATOR.WIN_OPEN_NEW:
				n = new t, this.addChild(n), this.wins.push(n);
				break;
			case WIN_OPERATOR.WIN_OPEN_SHOW:
				for(var s = 0; s < this.wins.length; s++)
					if(this.wins[s] instanceof t) {
						n = this.wins[s];
						break
					}
				null == n && (n = new t, this.wins.push(n)), this.addChild(n), n.visible = !0;
				break;
			case WIN_OPERATOR.WIN_CLOSE_DELETE:
				for(var s = 0; s < this.wins.length; s++)
					if(this.wins[s] instanceof t) {
						n = this.wins[s], this.wins.splice(s, 1);
						break
					}
				break;
			case WIN_OPERATOR.WIN_CLOSE_HIDE:
				for(var s = 0; s < this.wins.length; s++)
					if(this.wins[s] instanceof t) {
						n = this.wins[s];
						break
					}
				null == n && (n = new t, this.wins.push(n)), this.addChild(n);
				break;
			case WIN_OPERATOR.WIN_OPEN_SHOW_OR_HIDE:
				for(var s = 0; s < this.wins.length; s++)
					if(this.wins[s] instanceof t) {
						n = this.wins[s];
						break
					}
				null == n && (n = new t, this.wins.push(n)), this.addChild(n), n.visible = !1
		}
		if(null == n) return console.error("wnd can't null !!!!!!!!'"), n;
		var h = null;
		if(null == a || 0 == a) i == WIN_OPERATOR.WIN_CLOSE_HIDE ? n.visible = !1 : i == WIN_OPERATOR.WIN_CLOSE_DELETE ? n.Destroy() : i == WIN_OPERATOR.WIN_OPEN_SHOW_OR_HIDE && (n.visible = !n.visible);
		else if(a > WIN_EFFECT.EFFECT_WIN_CLOSE_END && a < WIN_EFFECT.EFFECT_WIN_OPEN_END) {
			switch(a) {
				case WIN_EFFECT.EFFECT_WIN_OPEN_MOVE_LEFT:
					n.x = -e.root.stage.stageWidth, n.y = 0, n.scaleX = 1, n.scaleY = 1, h = egret.Ease.bounceOut;
					break;
				case WIN_EFFECT.EFFECT_WIN_OPEN_MOVE_RIGHT:
					n.x = e.root.stage.stageWidth, n.y = 0, n.scaleX = 1, n.scaleY = 1, h = egret.Ease.bounceOut;
					break;
				case WIN_EFFECT.EFFECT_WIN_OPEN_MOVE_UP:
					n.x = 0, n.y = -e.root.stage.stageHeight, n.scaleX = 1, n.scaleY = 1, h = egret.Ease.bounceOut;
					break;
				case WIN_EFFECT.EFFECT_WIN_OPEN_MOVE_DOWN:
					n.x = 0, n.y = e.root.stage.stageHeight, n.scaleX = 1, n.scaleY = 1, h = egret.Ease.bounceOut;
					break;
				case WIN_EFFECT.EFFECT_WIN_OPEN_SCALE:
					n.x = e.root.stage.stageWidth >> 1, n.y = e.root.stage.stageHeight >> 1, n.scaleX = 0, n.scaleY = 0;
					break;
				case WIN_EFFECT.EFFECT_WIN_OPEN_ALPHA:
					n.alpha = .2
			}
			egret.Tween.get(n).to({
				x: 0,
				y: 0,
				scaleX: 1,
				scaleY: 1,
				alpha: 1
			}, 500)
		} else if(a > WIN_EFFECT.EFFECT_WIN_CLOSE_BEGIN && a < WIN_EFFECT.EFFECT_WIN_CLOSE_END) {
			var o, r, d, c;
			switch(a) {
				case WIN_EFFECT.EFFECT_WIN_CLOSE_MOVE_LEFT:
					o = -e.root.stage.stageWidth, r = 0, d = 1, c = 1, h = egret.Ease.bounceIn;
					break;
				case WIN_EFFECT.EFFECT_WIN_CLOSE_MOVE_RIGHT:
					o = e.root.stage.stageWidth, r = 0, d = 1, c = 1, h = egret.Ease.bounceIn;
					break;
				case WIN_EFFECT.EFFECT_WIN_CLOSE_MOVE_UP:
					o = 0, r = -e.root.stage.stageHeight, d = 1, c = 1, h = egret.Ease.bounceIn;
					break;
				case WIN_EFFECT.EFFECT_WIN_CLOSE_MOVE_DOWN:
					o = 0, r = e.root.stage.stageHeight, d = 1, c = 1, h = egret.Ease.bounceIn;
					break;
				case WIN_EFFECT.EFFECT_WIN_CLOSE_SCALE:
					d = 0, c = 0
			}
			i == WIN_OPERATOR.WIN_CLOSE_DELETE && this.addChild(n), egret.Tween.get(n).to({
				x: o,
				y: r,
				scaleX: d,
				scaleY: c
			}, 500).call(function() {
				i == WIN_OPERATOR.WIN_CLOSE_HIDE ? n.visible = !1 : i == WIN_OPERATOR.WIN_CLOSE_DELETE && n.Destroy()
			}, this)
		}
		return n
	}, e.switchWnd = function(t, i, a) {
		return e.root.wndmanager.switchWnd(t, i, a)
	}, a.getWnd = function(t) {
		for(var e = 0; e < this.wins.length; e++)
			if(this.wins[e] instanceof t) return this.wins[e];
		return null
	}, e.getWnd = function(t) {
		return e.root.wndmanager.getWnd(t)
	}, e.setinfo = function(t, e) {}, e
}(egret.Sprite);
egret.registerClass(WndManager, "WndManager");




//function newPk(){
//	if (sattus == 1){
//		alert("1");
//	}
//}
	
