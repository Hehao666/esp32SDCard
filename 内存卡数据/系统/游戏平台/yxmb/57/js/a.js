function a_init() {
	updateShare(0);
}

function goHome() {
	window.location.href ='http://www.xiaoqbk.com';
}

function a_submitScore(score) {
	updateShareScore(score);
	setTimeout( function() { show_share(); }, 1500 )
}

function updateShare(bestScore) {
	imgUrl = 'http://www.xiaoqbk.com/content/uploadfile/201906/2b8e1561550213.png';
	lineLink = 'http://www.xiaoqbk.com';
	descContent = "这3D转啊转到我头晕！";
	updateShareScore(bestScore);
	appid = '';
}

function updateShareScore(bestScore) {
	if(bestScore > 0) {
		shareTitle = "我在《3D拼图》过了第" + bestScore + "关，这样子拼图好难啊！";
	}
	else{
		shareTitle = "另类拼图游戏《3D拼图》好难啊！";
	}
}