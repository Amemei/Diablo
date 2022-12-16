/*:ja
 * @plugindesc ステータス画面で、衣装アイテムによって異なる立ち絵を表示します。
 * @author Mr.マスタベ
 *
 * @param picture_x
 * @desc 立ち絵表示の横座標始点(X座標)
 * @default 520
 *
 * @param picture_y
 * @desc 立ち絵表示の縦座標始点(Y座標)
 * @default 100
 *
 * @param fontsize
 * @desc 文字フォントサイズ
 * @default 22
 *
 * @param lineheight
 * @desc 1行の高さ
 * @default 35
 *
 */
(function() {   

	var VocabEVA = "回避率";
	var VocabMEV = "魔法回避";
	var VocabHIT = "命中率";
	var VocabCRI = "会心率";

	var RL_StatusDetailPicture_grp = [ [[""]], 	// ダミー
		[	// アクターID 1
			["Actor1_0_Normal_R"],		// 裸
			["Actor1_1_Normal_R"],		// 貴族服（通常グラフィック）
			["Actor1_2_Normal_R"],		// 囚人服（通常グラフィック）
			["Actor1_3_Normal_R"],		// 手縫いのブラジャー・白のみ
			["Actor1_4_Normal_R"],		// 手縫いのパンティ・白のみ
			["Actor1_5_Normal_R"],		// 手縫いのブラジャー・黒のみ
			["Actor1_6_Normal_R"],		// 手縫いのパンティ・黒のみ
			["Actor1_7_Normal_R"],		// 手縫いのブラジャー・パンティともに白
			["Actor1_8_Normal_R"],		// 手縫いのブラジャー・パンティともに黒
			["Actor1_9_Normal_R"],		// 手縫いのブラジャー・白、パンティは黒
			["Actor1_10_Normal_R"],		// 手縫いのブラジャー・黒、パンティは白
			["Actor1_11_Normal_R"],		// 異国の武闘着
			["Actor1_12_Normal_R"],		// セーラー服
			["Actor1_13_Normal_R"],		// サキュバス
			["Actor1_14_Normal_R"],		// 軽装戦闘服
			["Actor1_15_Normal_R"],		// メイド服
			["Actor1_16_Normal_R"],		// 熾天使の鎧
		],
	];
	// ステータス詳細を開いた際に再生する音声ファイル名(audio/se)
	var RL_StatusDetailSound_grp = [ [""],	// ダミー
		 ["P1_Status_01", "P1_Status_02", "P1_Status_03", "P1_Status_04", "P1_Status_05", "P1_Status_06", "P1_Status_07", "P1_Status_08"],	// アクター1の音声
	];

	var parameters = PluginManager.parameters('RL_StatusDetailPicture');
	var rl_picture_x  = parseInt(parameters['picture_x']  || 520);
	var rl_picture_y  = parseInt(parameters['picture_y']  || 100);
	var rl_fontsize   = parseInt(parameters['fontsize']   ||  22);
	var rl_lineheight = parseInt(parameters['lineheight'] ||  35);

	var _RL_StatusDetailPicture_Window_Status_initialize = Window_Status.prototype.initialize;
	Window_Status.prototype.initialize = function() {
		_RL_StatusDetailPicture_Window_Status_initialize.call(this);
		this.createSprites();
	};

	Window_Status.prototype.lineHeight = function() {
		return rl_lineheight;
	};

	Window_Status.prototype.createSprites = function()
	{
		this._pictureSprite = new Sprite();
		this._pictureSprite.anchor.x = 0;
		this._pictureSprite.anchor.y = 0;
		this._pictureSprite.visible = false;
		this.addChild(this._pictureSprite);
	};

	Window_Status.prototype.refresh = function() {
		this.contents.clear();
		if (this._actor) {
			var lineHeight = this.lineHeight();
			this.drawBlock1  (lineHeight * 0);
			this.drawHorzLine(lineHeight * 1);
			this.drawBlock2  (lineHeight * 2);
			this.drawBlock3  (lineHeight * 7);
			this.drawBlock4  (lineHeight * 11);
		}
	};

	// アクター名、職業、NickName
	Window_Status.prototype.drawBlock1 = function(y) {
		this.drawActorName(this._actor, 4, y);
		this.drawActorClass(this._actor, 240, y);
		this.drawActorNickname(this._actor, 328, y);
	};

	// LV、HPMPバー、経験値、立ち絵
	Window_Status.prototype.drawBlock2 = function(y) {
		this.drawBasicInfo(4, y);
		this.drawExpInfo(238, y);
		this.drawActorIllust(rl_picture_x, rl_picture_y);
	};

	// ステータス
	Window_Status.prototype.drawBlock3 = function(y) {
		this.drawParameters(4, y);
		this.drawParameters2(204, y);
	};

	// 装備品
	Window_Status.prototype.drawBlock4 = function(y) {
		this.drawSlotName(210, y);
		this.drawEquipments(234, y + this.lineHeight());
	};

	Window_Status.prototype.drawBasicInfo = function(x, y) {
		var lineHeight = this.lineHeight();
		this.contents.fontSize = rl_fontsize;
		this.drawActorLevel(this._actor, x, y + lineHeight * 0);
		this.drawActorHp(this._actor, x, y + lineHeight * 1.5);
		this.drawActorMp(this._actor, x, y + lineHeight * 2.5);
	};

	Window_Status.prototype.drawExpInfo = function(x, y) {
		var lineHeight = this.lineHeight();
		var expTotal = TextManager.expTotal.format(TextManager.exp);
		var expNext  = TextManager.expNext.format(TextManager.level);
		var value1 = this._actor.currentExp();
		var value2 = this._actor.nextRequiredExp();
		if (this._actor.isMaxLevel()) {
			value1 = '-------';
			value2 = '-------';
		}
		this.contents.fontSize = rl_fontsize;
		this.changeTextColor(this.systemColor());
		this.drawText(expTotal, x + 80, y + lineHeight * 0, 180);
		this.drawText(expNext,  x + 80, y + lineHeight * 2, 180);
		this.resetTextColor();
		this.drawText(value1, x, y + lineHeight * 1, 200, 'right');
		this.drawText(value2, x, y + lineHeight * 3, 200, 'right');
	};

	Window_Status.prototype.drawParameters = function(x, y) {
		var lineHeight = this.lineHeight();
		for (var i = 0; i < 14; i++) {
			this.drawActorParam(x, y + lineHeight * i, i + 2);
		}
	};

	Window_Status.prototype.drawParameters2 = function(x, y) {
		var lineHeight = this.lineHeight();
		for (var i = 0; i < 4; i++) {
			this.drawActorParam2(x, y + lineHeight * i, i + 2);
		}
	};

	Window_Status.prototype.drawActorParam = function(x, y, paramId) {
		switch (paramId) {
		//攻撃力,防御力,魔法力,魔法防御力,敏捷性,運
		case 2:
		case 3:
		case 4:
		case 5:
		case 6:
		case 7:
			var paramName  = TextManager.param(paramId);
			var paramValue = this._actor.param(paramId);
			paramValue =  Math.floor(paramValue);
			break;
		case 8: //処女プレイ
			var paramName  = "貞操";
			var paramValue = "処女";
			if ($gameVariables.value(this._actor.actorId() + 200) != 0) {
				paramValue = "非処女";
			}
			break;
		case 9: //服従度
			var paramName  = "服従度";
			var paramValue = $gameVariables.value(this._actor.actorId() + 212);
			break;
		case 10: //膣内射精回数
			var paramName  = "膣内射精回数";
			var paramValue = $gameVariables.value(this._actor.actorId() + 202);
			break;
		case 11: //膣外射精回数
			var paramName  = "膣外射精回数";
			var paramValue = $gameVariables.value(this._actor.actorId() + 203);
			break;
		case 12: //アナル射精回数
			var paramName  = "アナル射精回数";
			var paramValue = $gameVariables.value(this._actor.actorId() + 204);
			break;
		case 13: //自慰回数
			var paramName  = "自慰回数";
			var paramValue = $gameVariables.value(this._actor.actorId() + 205);
			break;
		case 14: //手淫回数
			var paramName  = "手淫回数";
			var paramValue = $gameVariables.value(this._actor.actorId() + 206);
			break;
		case 15: //口淫回数
			var paramName  = "口淫回数";
			var paramValue = $gameVariables.value(this._actor.actorId() + 207);
			break;
		}
		this.contents.fontSize = rl_fontsize;
		this.changeTextColor(this.systemColor());
		this.drawText(paramName, x, y, 160);
		this.resetTextColor();
		this.drawText(paramValue, x + 120, y, 60, 'right');
	};

	Window_Status.prototype.drawActorParam2 = function(x, y, paramId) {
		switch (paramId) {
		case 2: //魔精取得回数
			var paramName  = "魔精取得回数";
			var paramValue = $gameVariables.value(this._actor.actorId() + 208);
			break;
		case 3: //初体験
			var paramName  = "初体験";
			var paramValue = $gameVariables.value(this._actor.actorId() + 214);
			if (paramValue == 0) {
				paramValue = "";
			}
			break;
		case 4: //S度
			var paramName  = "Ｓ度";
			var paramValue = $gameVariables.value(this._actor.actorId() + 210);
			break;
		case 5: //M度
			var paramName  = "Ｍ度";
			var paramValue = $gameVariables.value(this._actor.actorId() + 211);
			break;
		}
		this.contents.fontSize = rl_fontsize;
		this.changeTextColor(this.systemColor());
		this.drawText(paramName, x, y, 160);
		this.resetTextColor();
		this.drawText(paramValue, x + 120, y, 60, 'right');
	};

	Window_Status.prototype.drawSlotName = function(x, y) {
		var lineHeight = this.lineHeight();
		var slots = this._actor.equipSlots();
		var count = slots.length;
		for (var i = 0; i < count; i++) {
			var y2 = y + lineHeight * i * 2;
			this.contents.fontSize = rl_fontsize;
			this.changeTextColor(this.systemColor());
			this.drawText($dataSystem.equipTypes[slots[i]], x, y2, 200);
		}
	};

	Window_Status.prototype.drawEquipments = function(x, y) {
		var lineHeight = this.lineHeight();
		var equips = this._actor.equips();
		var count = equips.length;
		for (var i = 0; i < count; i++) {
			var y2 = y + lineHeight * i * 2;
			this.contents.fontSize = rl_fontsize;
			this.resetTextColor();
			this.drawItemName(equips[i], x, y2);
		}
	};

	Window_Status.prototype.drawActorIllust = function(x, y) {
		var actor = this._actor;

		// アクターのHP割合計算
		if (actor.hpRate() > 0.4) {
			// 全快状態
			var graphics_break = 0;
		} else {
			// 大破状態
			var graphics_break = 1;
		}

		// グラフィック変更
		var actorId = actor.actorId();
		var costumeId = 30 + actor.actorId();

		var a, b, c;
		a = ($gameActors.actor(actorId).equips()[1]) ? $gameActors.actor(actorId).equips()[1].id : 0;	// 上半身装備
		b = ($gameActors.actor(actorId).equips()[2]) ? $gameActors.actor(actorId).equips()[2].id : 0;	// 下半身装備
		c = ($gameActors.actor(actorId).equips()[3]) ? $gameActors.actor(actorId).equips()[3].id : 0;	// 全身装備

		if (c != 0) {
			// 全身装備 = 防具ID
			var bitmapName = RL_StatusDetailPicture_grp[actorId][c][0];
			$gameVariables.setValue(costumeId, c);
		} else if (a == 0 && b == 0 && c == 0) {
			// 全裸
			var bitmapName = RL_StatusDetailPicture_grp[actorId][0][0];
			$gameVariables.setValue(costumeId, 0);
		} else if (a == 3 && b == 0) {
			// ブラ・白のみ
			var bitmapName = RL_StatusDetailPicture_grp[actorId][3][0];
			$gameVariables.setValue(costumeId, 3);
		} else if (a == 0 && b == 4) {
			// パンティ・白のみ
			var bitmapName = RL_StatusDetailPicture_grp[actorId][4][0];
			$gameVariables.setValue(costumeId, 4);
		} else if (a == 5 && b == 0) {
			// ブラ・黒のみ
			var bitmapName = RL_StatusDetailPicture_grp[actorId][5][0];
			$gameVariables.setValue(costumeId, 5);
		} else if (a == 0 && b == 6) {
			// パンティ・黒のみ
			var bitmapName = RL_StatusDetailPicture_grp[actorId][6][0];
			$gameVariables.setValue(costumeId, 6);
		} else if (a == 3 && b == 4) {
			// ブラ、パンティ・白
			var bitmapName = RL_StatusDetailPicture_grp[actorId][7][0];
			$gameVariables.setValue(costumeId, 7);
		} else if (a == 5 && b == 6) {
			// ブラ、パンティ・黒
			var bitmapName = RL_StatusDetailPicture_grp[actorId][8][0];
			$gameVariables.setValue(costumeId, 8);
		} else if (a == 3 && b == 6) {
			// ブラ・白、パンティ・黒
			var bitmapName = RL_StatusDetailPicture_grp[actorId][9][0];
			$gameVariables.setValue(costumeId, 9);
		} else if (a == 5 && b == 4) {
			// ブラ・黒、パンティ・白
			var bitmapName = RL_StatusDetailPicture_grp[actorId][10][0];
			$gameVariables.setValue(costumeId, 10);
		}

		// 表示する立ち絵設定(/img/pictures/)
		this._pictureSprite.bitmap = ImageManager.loadPicture(bitmapName);
		this._pictureSprite.x = x;
		this._pictureSprite.y = y;
		this._pictureSprite.visible = true;


		// ランダム音声再生 淫乱度で音声切り替え
		if ($gameVariables.value(actorId + 83) >= 80) {
			var soundNo = Math.floor(Math.random() * 8);
		} else if ($gameVariables.value(actorId + 83) >= 40) {
			var soundNo = Math.floor(Math.random() * 5);
		} else if ($gameVariables.value(actorId + 83) >= 0) {
			var soundNo = Math.floor(Math.random() * 2);
		}
		var soundName = RL_StatusDetailSound_grp[actorId][soundNo];
		if (soundName) {
			//AudioManager.playSe({"name":soundName,"volume":100,"pitch":100,"pan":0});
		}
	};

})();
