//=============================================================================
// RecollectionMode.js
// Copyright (c) 2015 rinne_grid
// This plugin is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//
// Version
// 1.0.0 2015/12/26 公開
// 1.1.0 2016/04/19 回想一覧にサムネイルを指定できるように対応
// 1.1.1 2016/05/03 セーブデータ20番目のスイッチが反映されない不具合を修正
//                  セーブデータ間のスイッチ共有オプション
//                  (share_recollection_switches)を追加
//=============================================================================

/*:ja
 * @plugindesc 回想モード機能を追加します。
 * @author rinne_grid
 *
 *
 * @help このプラグインには、プラグインコマンドはありません。
 *
 */

//--------------------------------s---------------------------------------------
// ◆ プラグイン設定
//-----------------------------------------------------------------------------
    var rngd_recollection_mode_settings = {
        //---------------------------------------------------------------------
        // ★ 回想モードで再生するBGMの設定をします
        //---------------------------------------------------------------------
        "rec_mode_bgm": {
            "bgm": {
                "name"  : "blank_memories",
                "pan"   : 0,
                "pitch" : 100,
                "volume": 90
            }
        },
        //---------------------------------------------------------------------
        // ★ 回想CG選択ウィンドウの設定を指定します
        //---------------------------------------------------------------------
        "rec_mode_window" : {
            "x": 400,
            "y": 300,
            "recollection_title": "快楽の部屋",
            "str_select_recollection": "部屋をのぞく",
            //"str_select_cg": "CGを見る",
            "str_select_back_title": "タイトルに戻る"
        },
        //---------------------------------------------------------------------
        // ★ 回想リストウィンドウの設定を指定します
        //---------------------------------------------------------------------
        "rec_list_window": {
            // 1画面に表示する縦の数
            "item_height": 2,
            // 1画面に表示する横の数
            "item_width" : 2,
            // 1枚のCGに説明テキストを表示するかどうか
            "show_title_text": true,
            // タイトルテキストの表示位置(left:左寄せ、center:中央、right:右寄せ）
            "title_text_align": "center",
            // 閲覧したことのないCGの場合に表示するピクチャファイル名
            "never_watch_picture_name": "never_watch_picture",
            // 閲覧したことのないCGのタイトルテキスト
            "never_watch_title_text": "？？？"
        },
        //---------------------------------------------------------------------
        // ★ 回想用のCGを指定します
        //---------------------------------------------------------------------
        "rec_cg_set": {
            1 : {
                "title": "看守フェラチオ",
                "pictures": ["thumb_h01"], // 349x262
                "common_event_id": 51,
                "switch_id": 51,
            },
            2 : {
                "title": "売春（ノーマル）",
                "pictures": ["thumb_h02"], // 349x262
                "common_event_id": 53,
                "switch_id": 53,
            },
            3 : {
                "title": "売春（ドＳ）",
                "pictures": ["thumb_h03"], // 349x262
                "common_event_id": 54,
                "switch_id": 54,
            },
            4 : {
                "title": "売春（ドＭ）",
                "pictures": ["thumb_h04"], // 349x262
                "common_event_id": 55,
                "switch_id": 55,
            },
            5 : {
                "title": "アナル売春（ノーマル）",
                "pictures": ["thumb_h05"], // 349x262
                "common_event_id": 56,
                "switch_id": 56,
            },
            6 : {
                "title": "アナル売春（ドＳ）",
                "pictures": ["thumb_h06"], // 349x262
                "common_event_id": 57,
                "switch_id": 57,
            },
            7 : {
                "title": "アナル売春（ドＭ）",
                "pictures": ["thumb_h07"], // 349x262
                "common_event_id": 58,
                "switch_id": 58,
            },
            8 : {
                "title": "口内射精（ノーマル）",
                "pictures": ["thumb_h08"], // 349x262
                "common_event_id": 59,
                "switch_id": 59,
            },
            9 : {
                "title": "口内射精（ドＳ）",
                "pictures": ["thumb_h09"], // 349x262
                "common_event_id": 60,
                "switch_id": 60,
            },
            10 : {
                "title": "口内射精（ドＭ）",
                "pictures": ["thumb_h10"], // 349x262
                "common_event_id": 61,
                "switch_id": 61,
            },
            11 : {
                "title": "顔射（ノーマル）",
                "pictures": ["thumb_h11"], // 349x262
                "common_event_id": 62,
                "switch_id": 62,
            },
            12 : {
                "title": "顔射（ドＳ）",
                "pictures": ["thumb_h12"], // 349x262
                "common_event_id": 63,
                "switch_id": 63,
            },
            13 : {
                "title": "顔射（ドＭ）",
                "pictures": ["thumb_h13"], // 349x262
                "common_event_id": 64,
                "switch_id": 64,
            },
            14 : {
                "title": "オナニー鑑賞（ノーマル）",
                "pictures": ["thumb_h14"], // 349x262
                "common_event_id": 65,
                "switch_id": 65,
            },
            15 : {
                "title": "オナニー鑑賞（ドＳ）",
                "pictures": ["thumb_h15"], // 349x262
                "common_event_id": 66,
                "switch_id": 66,
            },
            16 : {
                "title": "オナニー鑑賞（ドＭ）",
                "pictures": ["thumb_h16"], // 349x262
                "common_event_id": 67,
                "switch_id": 67,
            },
            17 : {
                "title": "手コキ（ノーマル）",
                "pictures": ["thumb_h17"], // 349x262
                "common_event_id": 71,
                "switch_id": 71,
            },
            18 : {
                "title": "手コキ（ドＳ）",
                "pictures": ["thumb_h18"], // 349x262
                "common_event_id": 72,
                "switch_id": 72,
            },
            19 : {
                "title": "手コキ（ドＭ）",
                "pictures": ["thumb_h19"], // 349x262
                "common_event_id": 73,
                "switch_id": 73,
            },
            20 : {
                "title": "パイズリ（ノーマル）",
                "pictures": ["thumb_h20"], // 349x262
                "common_event_id": 68,
                "switch_id": 68,
            },
            21 : {
                "title": "パイズリ（ドＳ）",
                "pictures": ["thumb_h21"], // 349x262
                "common_event_id": 69,
                "switch_id": 69,
            },
            22 : {
                "title": "パイズリ（ドＭ）",
                "pictures": ["thumb_h22"], // 349x262
                "common_event_id": 70,
                "switch_id": 70,
            },
            23 : {
                "title": "ＳＭ（ノーマル）",
                "pictures": ["thumb_h23"], // 349x262
                "common_event_id": 74,
                "switch_id": 74,
            },
            24 : {
                "title": "ＳＭ（ドＳ）",
                "pictures": ["thumb_h24"], // 349x262
                "common_event_id": 75,
                "switch_id": 75,
            },
            25 : {
                "title": "ＳＭ（ドＭ）",
                "pictures": ["thumb_h25"], // 349x262
                "common_event_id": 76,
                "switch_id": 76,
            },
            26 : {
                "title": "触手苗床",
                "pictures": ["thumb_h26"], // 349x262
                "common_event_id": 78,
                "switch_id": 77,
            },
            27 : {
                "title": "悪魔の子の初精通",
                "pictures": ["thumb_h27"], // 349x262
                "common_event_id": 79,
                "switch_id": 78,
            },
            28 : {
                "title": "睡眠姦",
                "pictures": ["thumb_h28"], // 349x262
                "common_event_id": 80,
                "switch_id": 79,
            },
            29 : {
                "title": "王国に蔓延る処女淫魔",
                "pictures": ["thumb_e06"], // 349x262
                "common_event_id": 21,
                "switch_id": 21,
            },
            30 : {
                "title": "アナル懺悔",
                "pictures": ["thumb_e05"], // 349x262
                "common_event_id": 22,
                "switch_id": 22,
            },
            31 : {
                "title": "裏街の娼婦",
                "pictures": ["thumb_e08"], // 349x262
                "common_event_id": 24,
                "switch_id": 25,
            },
            32 : {
                "title": "王国の肉便器",
                "pictures": ["thumb_e07"], // 349x262
                "common_event_id": 25,
                "switch_id": 26,
            },
            33 : {
                "title": "悪魔出産",
                "pictures": ["thumb_e09"], // 349x262
                "common_event_id": 26,
                "switch_id": 27,
            },
            34 : {
                "title": "悪魔の肉便器（破瓜）",
                "pictures": ["thumb_e10"], // 349x262
                "common_event_id": 27,
                "switch_id": 28,
            },
            35 : {
                "title": "悪魔の肉便器",
                "pictures": ["thumb_e11"], // 349x262
                "common_event_id": 28,
                "switch_id": 29,
            },
            36 : {
                "title": "魔王覚醒",
                "pictures": ["thumb_e12"], // 349x262
                "common_event_id": 29,
                "switch_id": 30,
            },
            37 : {
                "title": "魔王軍の蹂躙",
                "pictures": ["thumb_e02"], // 349x262
                "common_event_id": 30,
                "switch_id": 31,
            },
        },
        //---------------------------------------------------------------------
        // ★ 回想時に一時的に利用するマップIDを指定します
        //---------------------------------------------------------------------
        // 通常は何もないマップを指定します
        //---------------------------------------------------------------------
        "sandbox_map_id": 6,
        //---------------------------------------------------------------------
        // ★ 回想用スイッチをセーブデータ間で共有するかどうかを指定します
        //---------------------------------------------------------------------
        // パラメータの説明
        // true:
        //      回想用スイッチを共有します。
        //
        //      例1：セーブ1で回想スイッチ1, 2, 3がONとする
        //          ニューゲームで開始し、セーブ1を上書きする
        //          →セーブ1の回想スイッチ1, 2, 3はONのままとなる。
        //
        //      例2: セーブ1で回想スイッチ1, 2, 3がONとする
        //          セーブ1をロードし、セーブ2を保存する
        //          セーブ2で回想スイッチ1, 2, 3, 7がONとする
        //          セーブ1, セーブ2それぞれで、回想スイッチ1, 2, 3, 7がONとなる
        //
        // false:
        //      回想用スイッチを共有しません
        //
        // すべてのセーブデータを削除した場合にのみ、スイッチがリセットされます
        //---------------------------------------------------------------------
        "share_recollection_switches": true
    };

    function rngd_hash_size(obj) {
        var cnt = 0;
        for(var o in obj) {
            cnt++;
        }
        return cnt;
    }

//-----------------------------------------------------------------------------
// ◆ Scene関数
//-----------------------------------------------------------------------------

    //=========================================================================
    // ■ Scene_Recollection
    //=========================================================================
    // 回想用のシーン関数です
    //=========================================================================
    function Scene_Recollection() {
        this.initialize.apply(this, arguments);
    }

    Scene_Recollection.prototype = Object.create(Scene_Base.prototype);
    Scene_Recollection.prototype.constructor = Scene_Recollection;

    Scene_Recollection.prototype.initialize = function() {
        Scene_Base.prototype.initialize.call(this);
    };

    Scene_Recollection.prototype.create = function() {
        Scene_Base.prototype.create.call(this);
        this.createWindowLayer();
        this.createCommandWindow();
    };

    // 回想モードのカーソル
    Scene_Recollection.rec_list_index = 0;

    // 回想モードの再読み込み判定用 true: コマンドウィンドウを表示せず回想リストを表示 false:コマンドウィンドウを表示
    Scene_Recollection.reload_rec_list = false;

    Scene_Recollection.prototype.createCommandWindow = function() {

        if(Scene_Recollection.reload_rec_list) {
            // 回想モード選択ウィンドウ
            this._rec_window = new Window_RecollectionCommand();
            this._rec_window.setHandler('select_recollection', this.commandShowRecollection.bind(this));
            this._rec_window.setHandler('select_cg', this.commandShowCg.bind(this));
            this._rec_window.setHandler('select_back_title', this.commandBackTitle.bind(this));

            // リロードの場合：選択ウィンドウを非表示にする。通常はここがtrue
            this._rec_window.visible = false;
            this._rec_window.deactivate();
            this.addWindow(this._rec_window);

            // 回想リスト
            this._rec_list = new Window_RecList(0, 0, Graphics.width, Graphics.height);

            // リロードの場合：回想リストを表示にする。通常はここがfalse
            this._rec_list.visible = true;
            this._rec_list.setHandler('ok', this.commandDoRecMode.bind(this));
            this._rec_list.setHandler('cancel', this.commandBackSelectMode.bind(this));
            this._mode = "recollection";
            this._rec_list.activate();
            this._rec_list.select(Scene_Recollection.rec_list_index);

            this.addWindow(this._rec_list);

            // CG参照用ダミーコマンド
            this._dummy_window = new Window_Command(0, 0);
            this._dummy_window.deactivate();
            this._dummy_window.visible = false;
            this._dummy_window.setHandler('ok', this.commandDummyOk.bind(this));
            this._dummy_window.setHandler('cancel', this.commandDummyCancel.bind(this));
            this._dummy_window.addCommand('next', 'ok');
            this.addWindow(this._dummy_window);

            Scene_Recollection.reload_rec_list = false;

        } else {
            // 回想モード選択ウィンドウ
            this._rec_window = new Window_RecollectionCommand();
            this._rec_window.setHandler('select_recollection', this.commandShowRecollection.bind(this));
            this._rec_window.setHandler('select_cg', this.commandShowCg.bind(this));
            this._rec_window.setHandler('select_back_title', this.commandBackTitle.bind(this));
            this.addWindow(this._rec_window);

            // 回想リスト
            this._rec_list = new Window_RecList(0, 0, Graphics.width, Graphics.height);
            this._rec_list.visible = false;
            this._rec_list.setHandler('ok', this.commandDoRecMode.bind(this));
            this._rec_list.setHandler('cancel', this.commandBackSelectMode.bind(this));
            this._rec_list.select(Scene_Recollection.rec_list_index);
            this.addWindow(this._rec_list);

            // CG参照用ダミーコマンド
            this._dummy_window = new Window_Command(0, 0);
            this._dummy_window.deactivate();
            this._dummy_window.visible = false;
            this._dummy_window.setHandler('ok', this.commandDummyOk.bind(this));
            this._dummy_window.setHandler('cancel', this.commandDummyCancel.bind(this));
            this._dummy_window.addCommand('next', 'ok');
            this.addWindow(this._dummy_window);
        }

    };

    //-------------------------------------------------------------------------
    // ● 開始処理
    //-------------------------------------------------------------------------
    Scene_Recollection.prototype.start = function() {
        Scene_Base.prototype.start.call(this);
        this._rec_window.refresh();
        this._rec_list.refresh();
        AudioManager.playBgm(rngd_recollection_mode_settings.rec_mode_bgm.bgm);
        Scene_Recollection._rngd_recollection_doing = false;
    };

    //-------------------------------------------------------------------------
    // ● 更新処理
    //-------------------------------------------------------------------------
    Scene_Recollection.prototype.update = function() {
        Scene_Base.prototype.update.call(this);
    };

    //-------------------------------------------------------------------------
    // ● 「回想を見る」を選択した際のコマンド
    //-------------------------------------------------------------------------
    Scene_Recollection.prototype.commandShowRecollection = function() {
        // モードウィンドウの無効化とリストウィンドウの有効化
        this.do_exchange_status_window(this._rec_window, this._rec_list);
        this._mode = "recollection";
    };

    //-------------------------------------------------------------------------
    // ● 「CGを見る」を選択した際のコマンド
    //-------------------------------------------------------------------------
    Scene_Recollection.prototype.commandShowCg = function() {
        this.do_exchange_status_window(this._rec_window, this._rec_list);
        this._mode = "cg";
    };

    //-------------------------------------------------------------------------
    // ● 「タイトルに戻る」を選択した際のコマンド
    //-------------------------------------------------------------------------
    Scene_Recollection.prototype.commandBackTitle = function() {
        Scene_Recollection.rec_list_index = 0;
        SceneManager.goto(Scene_Title);
    };

    //-------------------------------------------------------------------------
    // ● 回想orCGモードから「キャンセル」して前の画面に戻った場合のコマンド
    //-------------------------------------------------------------------------
    Scene_Recollection.prototype.commandBackSelectMode = function() {
        this.do_exchange_status_window(this._rec_list, this._rec_window);
    };

    //-------------------------------------------------------------------------
    // ● 回想orCGモードにおいて、実際の回想orCGを選択した場合のコマンド
    //-------------------------------------------------------------------------
    Scene_Recollection.prototype.commandDoRecMode = function() {
        var target_index = this._rec_list.index() + 1;
        Scene_Recollection.rec_list_index = target_index - 1;

        if (this._rec_list.is_valid_picture(this._rec_list.index() + 1)) {
            // 回想モードの場合
            if (this._mode == "recollection") {
                Scene_Recollection._rngd_recollection_doing = true;

                DataManager.setupNewGame();
                $gamePlayer.setTransparent(255);
                this.fadeOutAll();
                // TODO: パーティを透明状態にする

                //$dataSystem.optTransparent = false;
                $gameTemp.reserveCommonEvent(rngd_recollection_mode_settings.rec_cg_set[target_index]["common_event_id"]);
                $gamePlayer.reserveTransfer(rngd_recollection_mode_settings.sandbox_map_id, 0, 0, 0);
                SceneManager.push(Scene_Map);

                // CGモードの場合
            } else if (this._mode == "cg") {
                this._cg_sprites = [];
                this._cg_sprites_index = 0;

                // シーン画像をロードする
                rngd_recollection_mode_settings.rec_cg_set[target_index].pictures.forEach(function (name) {
                    var sp = new Sprite();
                    sp.bitmap = ImageManager.loadPicture(name);
                    // 最初のSprite以外は見えないようにする
                    if (this._cg_sprites.length > 0) {
                        sp.visible = false;
                    }

                    // TODO: 画面サイズにあわせて、拡大・縮小すべき
                    this._cg_sprites.push(sp);
                    this.addChild(sp);

                }, this);

                this.do_exchange_status_window(this._rec_list, this._dummy_window);
                this._dummy_window.visible = false;
            }
        } else {
            this._rec_list.activate();
        }
    };

    Scene_Recollection.prototype.commandDummyOk = function() {

        if(this._cg_sprites_index < this._cg_sprites.length - 1) {
            this._cg_sprites[this._cg_sprites_index].visible = false;
            this._cg_sprites_index++;
            this._cg_sprites[this._cg_sprites_index].visible = true;

            this._dummy_window.activate();
        } else {
            this.commandDummyCancel();
        }
    };

    Scene_Recollection.prototype.commandDummyCancel = function() {
        this._cg_sprites.forEach(function(obj) {
            obj.visible = false;
            obj = null;
        });
        this.do_exchange_status_window(this._dummy_window, this._rec_list);
    };

    // コモンイベントから呼び出す関数
    Scene_Recollection.prototype.rngd_exit_scene = function() {
        if(Scene_Recollection._rngd_recollection_doing) {
            // Window_RecListを表示する
            Scene_Recollection.reload_rec_list = true;
            SceneManager.push(Scene_Recollection);
        }
    };

    //-------------------------------------------------------------------------
    // ● ウィンドウの無効化と有効化
    //-------------------------------------------------------------------------
    // win1: 無効化するウィンドウ
    // win2: 有効化するウィンドウ
    //-------------------------------------------------------------------------
    Scene_Recollection.prototype.do_exchange_status_window = function(win1, win2) {
        win1.deactivate();
        win1.visible = false;
        win2.activate();
        win2.visible = true;
    };
    //-------------------------------------------------------------------------
    // ● セーブ・ロード・ニューゲーム時に必要なスイッチをONにする
    //-------------------------------------------------------------------------
    Scene_Recollection.setRecollectionSwitches = function() {
        // 各セーブデータを参照し、RecollectionMode用のスイッチを検索する
        // スイッチが一つでもONになっている場合は回想をONにする
        for(var i = 1; i <= DataManager.maxSavefiles(); i++) {
            var data = null;
            try {
                data = StorageManager.loadFromLocalFile(i);
            } catch(e) {
                data = StorageManager.loadFromWebStorage(i);
            }
            if(data) {
                var save_data_obj = JsonEx.parse(data);
                var rec_cg_max = rngd_hash_size(rngd_recollection_mode_settings.rec_cg_set);

                for(var j = 0; j < rec_cg_max; j++) {
                    var cg = rngd_recollection_mode_settings.rec_cg_set[j+1];
                    if(save_data_obj["switches"]._data[cg.switch_id] &&
                        save_data_obj["switches"]._data[cg.switch_id] == true) {
                        $gameSwitches.setValue(cg.switch_id, true);
                    }
                }
            }
        }
    };

//-----------------------------------------------------------------------------
// ◆ Window関数
//-----------------------------------------------------------------------------

    //=========================================================================
    // ■ Window_RecollectionCommand
    //=========================================================================
    // 回想モードかCGモードを選択するウィンドウです
    //=========================================================================
    function Window_RecollectionCommand() {
        this.initialize.apply(this, arguments);
    }

    Window_RecollectionCommand.prototype = Object.create(Window_Command.prototype);
    Window_RecollectionCommand.prototype.constructor = Window_RecollectionCommand;

    Window_RecollectionCommand.prototype.initialize = function() {
        Window_Command.prototype.initialize.call(this, 0, 0);
        this.x = rngd_recollection_mode_settings.rec_mode_window.x;
        this.y = rngd_recollection_mode_settings.rec_mode_window.y;

    };

    Window_RecollectionCommand.prototype.makeCommandList = function() {
        Window_Command.prototype.makeCommandList.call(this);
        this.addCommand(rngd_recollection_mode_settings.rec_mode_window.str_select_recollection, "select_recollection");
        //this.addCommand(rngd_recollection_mode_settings.rec_mode_window.str_select_cg, "select_cg");
        this.addCommand(rngd_recollection_mode_settings.rec_mode_window.str_select_back_title, "select_back_title");
    };

    //=========================================================================
    // ■ Window_RecollectionList
    //=========================================================================
    // 回想またはCGを選択するウィンドウです
    //=========================================================================
    function Window_RecList() {
        this.initialize.apply(this, arguments);
    }

    Window_RecList.prototype = Object.create(Window_Selectable.prototype);
    Window_RecList.prototype.constructor = Window_RecList;

    //-------------------------------------------------------------------------
    // ● 初期化処理
    //-------------------------------------------------------------------------
    Window_RecList.prototype.initialize = function(x, y, width, height) {
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this.windowWidth = width;
        this.windowHeight = height;
        this.select(0);
        this._formationMode = false;
        this.get_global_variables();
        this.refresh();

    };

    Window_RecList.prototype.maxItems = function() {
        return rngd_hash_size(rngd_recollection_mode_settings.rec_cg_set);
    };

    Window_RecList.prototype.itemHeight = function() {
        return (this.height - this.standardPadding()) / rngd_recollection_mode_settings.rec_list_window.item_height;
    };

    //Window_RecList.prototype.maxRows = function() {
    //    return rngd_recollection_mode_settings.rec_list_window.item_height;
    //};

    Window_RecList.prototype.maxCols = function() {
        return rngd_recollection_mode_settings.rec_list_window.item_width;
    };

    Window_RecList.prototype.maxPageRows = function() {
        var pageHeight = this.height;// - this.padding * 2;
        return Math.floor(pageHeight / this.itemHeight());
    };

    Window_RecList.prototype.drawItem = function(index) {
        // TODO: itemWidthにあわせたサイズに拡大・縮小する
        // 1番目のCGセットを取得
        var rec_cg = rngd_recollection_mode_settings.rec_cg_set[index+1];
        var rect = this.itemRect(index);
        var text_height = 0;
        if(rngd_recollection_mode_settings.rec_list_window.show_title_text) {
            if(this._global_variables["switches"][rec_cg.switch_id]) {
                this.contents.drawText(rec_cg.title, rect.x + 4, rect.y + 4, this.itemWidth(), 32,
                    rngd_recollection_mode_settings.rec_list_window.title_text_align);
            } else {
                this.contents.drawText(rngd_recollection_mode_settings.rec_list_window.never_watch_title_text,
                    rect.x + 4, rect.y + 4, this.itemWidth(), 32,
                    rngd_recollection_mode_settings.rec_list_window.title_text_align);
            }
            text_height = 32;
        }

        // CGセットのスイッチ番号が、全てのセーブデータを走査した後にTrueであればピクチャ表示
        if(this._global_variables["switches"][rec_cg.switch_id]) {

            var thumbnail_file_name = rec_cg.pictures[0];
            if(rec_cg.thumbnail !== undefined && rec_cg.thumbnail !== null) {
                thumbnail_file_name = rec_cg.thumbnail;
            }

            this.drawRecollection(thumbnail_file_name, 0, 0,
                this.itemWidth() - 36, this.itemHeight() - 8 - text_height, rect.x + 16, rect.y + 4 +text_height);


        } else {
            this.drawRecollection(rngd_recollection_mode_settings.rec_list_window.never_watch_picture_name,
                    0, 0 , this.itemWidth() - 36,
                    this.itemHeight() - 8 - text_height, rect.x + 16, rect.y + 4 + text_height);

        }

    };

    //-------------------------------------------------------------------------
    // ● 全てのセーブデータを走査し、対象のシーンスイッチ情報を取得する
    //-------------------------------------------------------------------------
    Window_RecList.prototype.get_global_variables = function() {
        this._global_variables = {
            "switches": {}
        };
        var maxSaveFiles = DataManager.maxSavefiles();
        for(var i = 1; i <= maxSaveFiles; i++) {
            if(DataManager.loadGame(i)) {
                var rec_cg_max = rngd_hash_size(rngd_recollection_mode_settings.rec_cg_set);

                for(var j = 0; j < rec_cg_max; j++) {
                    var cg = rngd_recollection_mode_settings.rec_cg_set[j+1];
                    if($gameSwitches._data[cg.switch_id]) {
                        this._global_variables["switches"][cg.switch_id] = true;
                    }
                }
            }
        }
    };
    //-------------------------------------------------------------------------
    // ● index番目に表示された回想orCGが有効かどうか判断する
    //-------------------------------------------------------------------------
    Window_RecList.prototype.is_valid_picture = function(index) {
        // CG情報の取得と対象スイッチの取得
        var _rec_cg_obj = rngd_recollection_mode_settings.rec_cg_set[index];
        return ( this._global_variables["switches"][_rec_cg_obj.switch_id] == true);

    };


(function(){

//-----------------------------------------------------------------------------
// ◆ 組み込み関数Fix
//-----------------------------------------------------------------------------

    Window_Base.prototype.drawRecollection = function(bmp_name, x, y, width, height, dx, dy) {
        var bmp = ImageManager.loadPicture(bmp_name);

        var _width = width;
        var _height = height;
        if(_width > bmp.width) {
            _width = bmp.width - 1;
        }

        if(_height > bmp.height) {
            _height = bmp.height - 1;
        }
        this.contents.blt(bmp, x, y, _width, _height, dx, dy);
    };

    var Window_TitleCommand_makeCommandList =
        Window_TitleCommand.prototype.makeCommandList;

    Window_TitleCommand.prototype.makeCommandList = function() {
        Window_TitleCommand_makeCommandList.call(this);
        this.clearCommandList();
        this.addCommand(TextManager.newGame,   'newGame');
        this.addCommand(TextManager.continue_, 'continue', this.isContinueEnabled());
        this.addCommand(rngd_recollection_mode_settings.rec_mode_window.recollection_title, 'recollection');
        this.addCommand(TextManager.options,   'options');
    };

    Scene_Title.prototype.commandRecollection = function() {
        SceneManager.push(Scene_Recollection);
    };

    var Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
    Scene_Title.prototype.createCommandWindow = function() {
        Scene_Title_createCommandWindow.call(this);
        this._commandWindow.setHandler('recollection', this.commandRecollection.bind(this));
    };

    // セーブデータ共有オプションが指定されている場合のみ、カスタマイズ
    if(rngd_recollection_mode_settings["share_recollection_switches"]) {
        DataManager.makeSaveContents = function() {
            // A save data does not contain $gameTemp, $gameMessage, and $gameTroop.

            Scene_Recollection.setRecollectionSwitches();

            var contents = {};
            contents.system       = $gameSystem;
            contents.screen       = $gameScreen;
            contents.timer        = $gameTimer;
            contents.switches     = $gameSwitches;
            contents.variables    = $gameVariables;
            contents.selfSwitches = $gameSelfSwitches;
            contents.actors       = $gameActors;
            contents.party        = $gameParty;
            contents.map          = $gameMap;
            contents.player       = $gamePlayer;

            return contents;
        };

        DataManager.extractSaveContents = function(contents) {
            $gameSystem        = contents.system;
            $gameScreen        = contents.screen;
            $gameTimer         = contents.timer;
            $gameSwitches      = contents.switches;
            $gameVariables     = contents.variables;
            $gameSelfSwitches  = contents.selfSwitches;
            $gameActors        = contents.actors;
            $gameParty         = contents.party;
            $gameMap           = contents.map;
            $gamePlayer        = contents.player;

            Scene_Recollection.setRecollectionSwitches();
        };

        DataManager.setupNewGame = function() {
            this.createGameObjects();
            Scene_Recollection.setRecollectionSwitches();
            this.selectSavefileForNewGame();
            $gameParty.setupStartingMembers();
            $gamePlayer.reserveTransfer($dataSystem.startMapId,
                $dataSystem.startX, $dataSystem.startY);
            Graphics.frameCount = 0;
        };
    }

})();