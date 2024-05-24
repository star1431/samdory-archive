
var samdory = samdory || {}

// samdory.Vue = (function() {
// 	function reset() {
// 		setmenuToggle()
// 	}

// 	function setmenuToggle() {
// 		console.log('[pub]setMenu');
// 		var items = document.querySelectorAll('[data-module="menuToggle"]')
// 		for(var i = 0; i < items.length; i ++) {
// 			var __item = items[i];
// 			if( !__item.classList.contains("initiate") ){
// 				new samdory.menuToggle({
// 					'target':__item,
// 				});
// 				__item.classList.add("initiate");
// 			}
// 		}
// 	}

// 	return {
// 		reset: reset
// 	}
// })()

// samdory.menuToggle = function(prop) {
// 	var _self		= this
// 	var _target		= null
// 	var _moBtn		= null
// 	var _moLayer	= null
// 	var _link		= null

// 	function init() {
// 		setTarget()
// 		setChild()
// 		setToggleEv()
// 		setLinkEv()
// 	}

// 	function setTarget() {
// 		_target 		= prop['target'];
// 		_target.module 	= _self;
// 	}

// 	function setChild() {
// 		_moBtn 		= _target.querySelector('.menu-btn')
// 		_moLayer 	= _target.querySelector('.menu-layer')
// 		_link 		= _target.querySelectorAll('.menu-list li a')
// 	}

// 	function setToggleEv() {
// 		_moBtn.addEventListener('click', function() {
// 			if(!_target.classList.contains('active')) {
// 				open()
// 			} else {
// 				close()
// 			}
// 		})
// 	}

// 	function setLinkEv() {
// 		for(var i = 0; i < _link.length; i ++) {
// 			_link[i].addEventListener('click', function() {
// 				close()
// 			})
// 		}
// 	}

// 	function open() {
// 		_moLayer.style.removeProperty('display')
// 		document.body.classList.add('scroll-hidden-y')
// 		setTimeout(function() {
// 			_target.classList.add('active')
// 		},0)
// 		_moBtn.querySelector('.text-medium').classList.remove('out')
// 		_moBtn.querySelector('.text-medium').classList.add('on')
// 		_moBtn.querySelector('.text-medium em').innerText = 'CLOSE'
// 	}

// 	function close() {
// 		_target.classList.remove('active')
// 		document.body.classList.remove('scroll-hidden-y')
// 		setTimeout(function() {
// 			_moLayer.style.display = 'none'
// 		},250)
// 		_moBtn.querySelector('.text-medium').classList.remove('on')
// 		_moBtn.querySelector('.text-medium').classList.add('out')
// 		_moBtn.querySelector('.text-medium em').innerText = 'MENU'
// 	}

// 	// 외부로 모듈제공
// 	_self.close = function () {
// 		if(_target.classList.contains('active')){
// 			close()
// 		}
// 	}

// 	init()
// }

// window.addEventListener('load', function(){
// 	samdory.Vue.reset()
// })