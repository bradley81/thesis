// JavaScript Document
$(function(){
	
	//呼叫進度顯示的函式;
	imagesProgress();
	
	//顯示圖片載入狀況的進度
	function imagesProgress (){
		
		var $container = $('#progress'), //進度顯示的整體
		var $progressBar = $container.find('.progress-bar'), //進度顯示的bar部分
		var $progressText = $container.find('.progress-text'), //進度顯示的text部分
		
		//利用imagesLoadeded函式也庫監控body元素內圖片載入狀況
		//同時紀錄body內全部圖片的數量
		
		imgLoad = imagesLoaded('body'),
		imgTotal = imgLoad.images.length,
		
		//已載入圖片的計數器
		//和進度顯示的當前數值 （最初為0）
		imgLoaded =0,
		current =0,
		
		//1秒60次檢查讀取狀況
		progressTimer = setInterval(updateProgress, 1000/60);
		
		//利用imagesLoadedㄝ, 加總每個已載入的圖片, 紀錄其個數
		imgLoad.on('progress', function(){
			imgLoaded++;
		});
		
		//依照圖片載入狀況更新進度顯示
		//此函式因setInterval()方法每秒呼叫60秒
		function updateProgress () {
			
			//載入圖片後計算完成的百分比
			var target = (imgLoaded / imgTotal)*100;
			
			//以current(當下位置)和target(目的地)的距離計算easing
			current += (target - current)*0.1;
			
			//顯示bar的寬度與text反應current的值
			//去除字串中小數的部分取整數
			$progressBar.css({width: current + '%'});
			$progressText.text(Math.floor(current) + '%');
			
			//結束處理
			if(current>=100){
				clearInterval(progressTimer);
				$container.addClass('progress-complete');
				$progressBar.add($progressText)
					.delay(500)
				.animate({opacity:0}, 250, function () {
					$container.animate({
						top: '-100vh'
					}, 1000, 'easeInOutQuint');
				});
			}
			//若current大於99.9, 則視為100並結束處理
			if(current>99.9) {
				current=100;
			}
		}
		
	}
});