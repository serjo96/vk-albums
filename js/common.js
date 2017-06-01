'use strict';

$(function () {

	//SVG Fallback
	if (!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function () {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};

	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$("form").submit(function () { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function () {
			alert("Thank you!");
			setTimeout(function () {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if ($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch (err) {

	};

	$("img, a").on("dragstart", function (event) {
		event.preventDefault();
	});

});

//Обычная вставка 1000 элементов с рекрусией
//var wrap = document.getElementById('wrap');
//var zer = 1 ;
//
//
//
//VK.init({apiId: 5909044}); 
//VK.Auth.login(function(result){
//	
//	
//	if(result.status == 'connected'){
//		console.info('Успешная авторизация');
//		loadPhoto();
//		
//		
//function loadPhoto(offset){
//		if( typeof offset == 'undefined' ){
//			offset = 0;
//		}
//		VK.api('photos.get', {v: 5.62, owner_id: 21222203, album_id: '220094737', offset: offset, rev: 1,}, function (result){
//				
//			drawPhoto(result.response.items);
//			
//			
//			
//			if(result.response.items.length == 1000){
//				offset+=999;
//				loadPhoto(offset);
//			}
//	});
//			
//};
////			document.getElementById("more").addEventListener('click', function(){
////				offset+=150;
////				loadPhoto(offset);
////			});
//		
//		
//function drawPhoto(data){
//	for(  var i = 0; i< data.length -1; i++  ){
//		
//		var el = document.createElement('div');
//		var img = new Image();
//		var dataId = data[i].id;
//		el.className += 'img-item invisible';
//		img.src = data[i].photo_604;
//		el.dataset.id = dataId;
//		wrap.appendChild(el);
//		console.log(zer++)
//		el.appendChild(img);
////		console.log(el)
//		img.addEventListener('load', function(e){
//			e.target.parentNode.classList.remove('invisible');
//			console.log('Отрисовка закончена')
//			$('#wrap').masonry({
//				itemSelector: '.img-item',
//				columnWidth: 0,
//					percentPosition: true
//			});	
//		
//		});
//	}
//	
//}
//		
//
//		
//
//	}
//	else{
//		console.error("Не успешная авторизация")
//	}
//});
//
//var mWrapper = document.querySelector('#modalWrapper'),
//	mWindow = document.getElementById('modalWindow');
//	var mImg = new Image();
//
//wrap.addEventListener('click', function(e){
//	console.log(e.target.parentNode);
//	mImg.src = e.target.src;
//	console.log(mImg.width)
////	if(mImg.){
////		mImg.style.width = '';
////		
////	}
//	mWindow.appendChild(mImg);
//	mWrapper.style.display = 'flex';
//	
//});
//mWrapper.addEventListener('click',  function(e){
//	if( e.target === mWrapper )
//	  mWrapper.style.display = 'none';
//	  else{
//		  null;
//	  }
//	
//});



//take profile id and album id


//Вариация с photo_sizes
var wrap = document.getElementById('wrap');
var zer = -435;
var loadAlbumPhoto = document.querySelector('.js--add-album');
var loadAlbumsList = document.querySelector('.js--album-list-load');

var alubmListWrap = document.querySelector('.album-list');
var albumName ;
var setOffset ;

VK.init({
	apiId: 5909044
});


//load album list
loadAlbumsList.addEventListener('click', function () {
	var profileID = document.querySelector('.js--profileId-fild').value;
			if(isNumeric(profileID)){
	VK.Auth.login(function (result) {
		if (result.status == 'connected') {

			if(document.querySelector('#mCSB_1_container') == null){
				alubmListWrap.innerHTML = '';
			}else{
				document.querySelector('#mCSB_1_container').innerHTML = ''
			}
			console.info('Успешная авторизация');
			VK.api('photos.getAlbums', {
				v: 5.63,
				owner_id: profileID,
				need_covers: 1,
				photo_sizes: 1
			}, function (result) {
				drawAlbums(result.response.items);

				function drawAlbums(data) {
					data.forEach(function (obj) {
						var el = document.createElement('div');
						var alubmDiscr = document.createElement('div');
						var titleAlbum = document.createElement('div');
						var albumSize = document.createElement('div');
						//album covers
						el.className += 'album-list__item';
						el.dataset.id = obj.id;
						
						
						//album discription wrap
						alubmDiscr.className += 'album-discription'
						
						//album title
						titleAlbum.className += 'album-discription__title';
						titleAlbum.innerHTML = obj.title;
						//album size
						albumSize.className += 'album-discription__size';
						albumSize.innerHTML = 'Фото в альбоме: ' + '<br>' + obj.size;
						
						alubmDiscr.appendChild(titleAlbum);
						alubmDiscr.appendChild(albumSize);
						el.appendChild(alubmDiscr);
						for (var i = 0; i < obj.sizes.length; i++) {
							if (obj.sizes[i].type == 'x') {
								el.style.background = 'url(' + obj.sizes[i].src + ')' + 'no-repeat';
								el.style.backgroundSize = 'cover';
								el.style.backgroundPosition = '50%';
							if(document.querySelector('#mCSB_1_container') == null){
								alubmListWrap.appendChild(el);
							}else{
								document.querySelector('#mCSB_1_container').appendChild(el);
							}
						};
						}
					});
				};

					$(".album-list").mCustomScrollbar({
						theme: "dark-3",
						documentTouchScroll: true,
						keyboard: {
							enable: true
						}
					});
					
			});
		} else {
			console.error("Не успешная авторизация");
		}
	}, 4);
			}else{
				alert('ProfileID состоит только из числа!')
			}
	
});


function loadPhoto(profileID,albumID,offset) {
					albumName = albumID;
					if (typeof offset == 'undefined') {
						offset = 0;
					}

					VK.api('photos.get', {
						v: 5.62,
						owner_id: profileID,
						album_id: albumID,
						offset: offset,
						rev: 1,
						photo_sizes: 1,
						count: 50
					}, function startLoadPhoto(result) {
						drawPhoto(result.response.items);
						
						 setOffset = offset + 50;
						if (offset >= result.response.items){
							return
						}
						console.log(result.response.items.length)
						console.log(setOffset)
					});

				};


				function drawPhoto(data) {
					var scrollTrigger = document.createElement('div');
					scrollTrigger.className += 'scrollTrigger';
					data.forEach(function (obj) {

						var el = document.createElement('div');
						el.className += 'img-item invisible';
						var img = new Image();

						for (var i = 0; i < obj.sizes.length; i++) {
							if (obj.sizes[i].type == 'x') {

								img.src = obj.sizes[i].src;

								img.addEventListener('load', function (e) {
									e.target.parentNode.classList.remove('invisible');
									console.log('Отрисовка закончена')
									$('#wrap').masonry({
										itemSelector: '.img-item',
										columnWidth: 0,
										percentPosition: true
									});
									$('#wrap').masonry('reloadItems');
								});
							} else if (obj.sizes[i].type == 'z') {
								var dataSrc = obj.sizes[i].src;
								el.dataset.src = dataSrc;
							}

						}
						el.appendChild(img);
						wrap.appendChild(el);
					});
					if(data.length==50){
						document.body.appendChild(scrollTrigger);
				   }
				}


alubmListWrap.addEventListener('click', function (e) {
	var test = document.querySelector('.album-discription');
		
	if (e.target.className.indexOf('album-list__item') == 0 || e.target.className.indexOf('album-discription') == 0) {
		var profileID = document.querySelector('.js--profileId-fild').value;
		var albumID = e.target.closest('.album-list__item').dataset.id;
		wrap.innerHTML = '';

		VK.Auth.login(function (result) {


			if (result.status == 'connected') {
				console.info('Успешная авторизация');
				loadPhoto(profileID,albumID);


				


			} else {
				console.error("Не успешная авторизация")
			}
		});
	}
});

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

//animation modal

const STYLE = {
  SHOW: 'flex',
  HIDE: 'none'
}

const TIME = {
  FADE: {
    DEFAULT: 300,
    SHORT: 100
  },
  THROTTLE: 100
}


/**
 * Function to fade an element
 * @param  {HTMLElement} element
 * @param  {Number} from
 * @param  {Number} to
 * @param  {Number} [duration=300]
 */
const fade = (element, from, to, duration) => {
  const start = window.performance.now()

  if (from === -1) {
    from = 1 * window
      .getComputedStyle(element)
      .getPropertyValue('opacity')
  }

  duration = duration || TIME.FADE.DEFAULT
  element.style.display = STYLE.SHOW

  window.requestAnimationFrame(function step (timestamp) {
    const progress = timestamp - start
    element.style.opacity = from + (progress / duration) * (to - from)

    if (progress < duration) {
      window.requestAnimationFrame(step)
    } else if (element.style.opacity <= 0) {
      element.style.display = STYLE.HIDE
    }
  })
}

/**
 * Fade in shorthand
 * @param  {HTMLElement} element
 * @param  {Number|undefined} duration
 */
const fadeIn = (element, duration) => {
  fade(element, -1, 1, 700)
}

/**
 * Fade out shorthand
 * @param  {HTMLElement} element
 * @param  {Number|undefined} duration
 */
const fadeOut = (element, duration) => {
  fade(element, -1, 0, 700)
}


//modal window
var mWrapper = document.querySelector('#modalWrapper'),
	mWindow = document.getElementById('modalWindow');

var mImg = new Image();

wrap.addEventListener('click', function (e) {
	console.log(e.target.parentNode);
	if (e.target.parentNode.hasAttribute('data-src')) {
		mImg.src = e.target.parentNode.dataset.src;
		console.log(e.target.parentNode.dataset)
	} else {
		mImg.src = e.target.src;
	}

	mWindow.appendChild(mImg);
	fadeIn(mWrapper)

});
mWrapper.addEventListener('click', function (e) {
	if (e.target === mWrapper){
		fadeOut(mWrapper)
	}else {
		null;
	}
});


var arrow = document.getElementById('arrow-trigger');
var mOptions = document.getElementById('js--options-section');
var wrapOptions = document.querySelector('.options-section');

mOptions.onmousedown = function (e) {

	function getCoords(elem) {
		var box = elem.getBoundingClientRect();
		return {
			top: box.top + pageYOffset
		};
	}

	wrapOptions.style.top = 0 + 'px';
	
	var coords = getCoords(wrapOptions);
	var shiftY = e.clientY - coords.top;
	moveAt(e);
	function moveAt(e) {
		if (wrapOptions.getBoundingClientRect().bottom >= 7 && e.clientY < 509) {
			wrapOptions.style.top = e.clientY - wrapOptions.offsetHeight + 2  + 'px';
		}
	}

	document.onmousemove = function (e) {
		moveAt(e);
	};

	mOptions.onmouseup = function () {
		
		var elPositionTop = wrapOptions.getBoundingClientRect().top;
		if(wrapOptions.getBoundingClientRect().bottom <= calculator(49, 525)){
			number_to(parseInt(elPositionTop, 10), -519, 980);
		}else if(wrapOptions.getBoundingClientRect().bottom >= calculator(51, 525)){
			number_to(parseInt(elPositionTop, 10), -0, 980);
		}
		
		document.onmousemove = null;
		mOptions.onmouseup = null;
	};
}

mOptions.ondragstart = function () {
	return false;
};

function calculator(procent, number){
	return procent*number/100;
}


//counter
function number_to(from,to,duration){
  var start = new Date().getTime();
  setTimeout(function timeout() {
    var now = (new Date().getTime()) - start;
    var progress = now / duration;
    var result = Math.floor((to - from) * progress + from);
    progress < 1 ? wrapOptions.style.top = result + 'px' : to;
    if (progress < 1) setTimeout(timeout, 10);
  }, 150);
}


function elementInViewport(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top >= window.pageYOffset &&
    left >= window.pageXOffset &&
    (top + height) <= (window.pageYOffset + window.innerHeight) &&
    (left + width) <= (window.pageXOffset + window.innerWidth)
  );
}


document.addEventListener('scroll', function() {
let scrollTrigger = document.querySelector('.scrollTrigger')
	if( elementInViewport(scrollTrigger)){
		loadPhoto(document.querySelector('.js--profileId-fild').value,albumName,setOffset)
	}

});




