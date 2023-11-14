let interval = null;

const fixAds = (video) => {
	if (video == null)
		return;
		
	console.log("[AdSkip] Detected a playing video ...");
	
	let parent = video.parentElement.parentElement;
	let isAd = parent.classList.contains('ad-showing');
	
	if (isAd) {
		console.log('[AdSkip] => Advertisment detected, try to speed up things ...');
		video.playbackRate = 16;
		video.muted = true;
		video.style.opacity = '0.05';
		video.style.filter = 'blur(50px)';
		interval = setInterval(() => {
			let skipButton = document.querySelector('[class*="ytp-ad-skip-button"]');
			if (skipButton != null) {
				skipButton.click();
				console.log('[AdSkip] => Advertisment skip button clicked.');
			}
		}, 100);
	} else {
		console.log("[AdSkip] => This video is not an ad, do nothing.");
		clearInterval(interval);
		video.playbackRate = 1;
		video.muted = false;
		video.style.opacity = '1';
		video.style.filter = '';
	}
}

document.body.addEventListener('play', (ev) => {
	fixAds(ev.target);
}, true);

let video = document.querySelector('video');
fixAds(video);
