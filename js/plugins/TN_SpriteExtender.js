//=============================================================================
// TN_SpriteExtender.js
//=============================================================================
/*:
 * @plugindesc 【有償ライセンス】任意の比率で歩行グラフィックの胴体を引き伸ばし、頭身を上げます。
 * @author terunon / AA series
 * @version 1.00
 *
 * @param 胴体の引き伸ばし率
 * @desc 1でデフォルトと同じ頭身になります。高いほど頭身が上がります。
 * @default 1.42
 * 
 * @param 頭の範囲
 * @desc 歩行グラフィック上端を0とし、ここに指定した値までは引き伸ばしを行いません。
 * @default 14
 *
 * @param 除外ファイル（部分一致）
 * @desc 画像ファイル名に特定の文字列が含まれる場合、頭身引き伸ばしを行いません。【スペース無しのカンマ区切りで複数指定可】
 * @default !,Damage
 *
 * @param 除外ファイル（完全一致）
 * @desc ここに記載された画像ファイルは、頭身引き伸ばしを行いません。【スペース無しのカンマ区切りで複数指定可】
 * @default Nature,Monster,Vehicle
 *
 * @help
 * お好きな値で調節してください。
 * 微妙な数値変更で、胴体のどのドットが引き伸ばされるか変わるため
 * 引き伸ばし方が気に入らない場合は、0.1～0.01単位で各値を調節してみてください。
 * 数値によっては、ホコグラの上端に別のホコグラ由来の線が見えることがありますが、
 * 0.01ほど数値を調整すれば消失します。
 * 
 * 再定義を含むため、プラグインリストの上の方への適用が望ましいです。
 * -----------------------------------------------------------
 * 【！】 有償ライセンスプラグイン
 * 本プラグインは、ライセンス付与者様名簿
 * （https://ch.nicovideo.jp/terunon/blomaga/ar1083931）に作者名（サークル名）を
 * 記載された方が、公開ゲームへ組み込んでご使用いただけます。
 *
 * BOOTHから有償ライセンス付き本プラグインをご購入できます。
 * 購入後、通常1～2日、最長5日以内に
 * BOOTHのメッセージ機能でお名前をお伺いし、ライセンス名簿に追加いたします。
 * メッセージが届かない場合や、お問い合わせ事項がある場合は、
 * tri-nitroterunon.3790☆live.jp
 * または twitter ID: trinitroterunon までお知らせください。
 * 作者の人身トラブル等で万一、名簿追加が異常に遅延している場合は、
 * BOOTHの機能から返金申請をしてください。
 *
 * ※作者名・サークル名を変更した場合、原則ライセンスは引継ぎできません。
 * 虚偽の名前変更申請により本来のライセンス保有者さんが
 * 被害を受けるのを防ぐため、何卒ご了承ください。
 *
 * ※他プラグインとの競合については、購入履歴のお問い合わせフォーム等から
 * ご連絡いただければ、ある程度サポートいたします。
 * ただ、多数のプラグインが複雑に競合している等、工数が膨大な場合は
 * サポートしかねる場合があります。
 *
 * ※本ライセンス方式は、今後の状況次第で変更される可能性がありますが、
 * 変更により正規ライセンスが消失することはありません。
 *
 * ※ライセンス違反作品を発見した場合は、作者へご連絡いただくか
 * 各投稿サイトの通報機能で当該作品をご通報ください。
 * 
 * This plugin is released under the terunon's independent license.
 * It can be used only by the users who have added the license roster below:
 *   https://ch.nicovideo.jp/terunon/blomaga/ar1083931
 *
 * If you find a product without registering the license roster,
 * please report to me or the owner of the website.
 */

(function() {
'use strict';
const parameters = PluginManager.parameters('TN_SpriteExtender');
const bodyRate = Number(parameters['胴体の引き伸ばし率']);
const bodyMargin = Number(parameters['頭の範囲']);
const disableKeys = String(parameters['除外ファイル（部分一致）']).split(',');;
const disableFiles = String(parameters['除外ファイル（完全一致）']).split(',');
const disableKeysL = disableKeys.length;
const disableFilesL = disableFiles.length;

Sprite_Character.prototype.updateBitmap = function() {
    if (this.isImageChanged()) {
        this._tilesetId = $gameMap.tilesetId();
        this._tileId = this._character.tileId();
        this._characterName = this._character.characterName();
        this._characterIndex = this._character.characterIndex();
		this._isSeperated = this.isSeperated();
		this._needRef = true;
        if (this._tileId > 0) {
            this.setTileBitmap();
        } else {
            this.setCharacterBitmap();
        }
    }
};

const TN_dn = 172;
Sprite_Character.prototype.isSeperated = function() {
	for (let i = 0; i < disableKeysL; i++){
		if (this._characterName.contains(disableKeys[i])) return false;
	}
	for (let i = 0; i < disableFilesL; i++){
		if (this._characterName === disableFiles[i]) return false;
	}
	return true;
};

Sprite_Character.prototype.updateCharacterFrame = function() {
	var patternX = this.characterPatternX();
	var patternY = this.characterPatternY();
	var pw = this.patternWidth();
	var ph = this.patternHeight();
	var sx = (this.characterBlockX() + patternX) * pw;
	var sy = (this.characterBlockY() + patternY) * ph;
	if (this._isSeperated){
		this.createHalfBodySprites();
		if (this._bushDepth > 0){
			this._lowerBody.opacity = 100;
		}else{
			this._lowerBody.opacity = 255;				
		}
		this._upperBody.bitmap = this.bitmap;
		this._upperBody.visible = true;
		this._lowerBody.bitmap = this.bitmap;
		this._lowerBody.visible = true;
		this._upperBody.y = -bodyMargin * bodyRate;
		this._lowerBody.scale.y = bodyRate;
		this._upperBody.setFrame(sx, sy, pw, ph - bodyMargin);
		this._lowerBody.setFrame(sx, sy + ph - bodyMargin, pw, bodyMargin);
		this.setFrame(sx, sy, 0, ph);
	}else{
		this.setFrame(sx, sy, pw, ph);
		if (this._upperBody){
			this._upperBody.visible = false;
			this._lowerBody.visible = false;				
		}
	}
};

})();

