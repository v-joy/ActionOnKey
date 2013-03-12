/*
 * jQuery ActionOnKey Plugin
 * Copyright 2012, v-joy
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * this Plugin is now on github :
 * https://github.com/v-joy/ActionOnKey
 *
 * welcome to communicate with me via http://t.qq.com/linux_joy:
*/
(function (jQuery){
	ActionOnKey = function(options){
		var _this = this;
		var defaults = {
			triggerKey:"return",
			action:function(event){
				//console.log("the keydown event have triggered!");
			}
		};
		var triggerKeys =  {
			8: "backspace", 9: "tab", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause",
			20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home",
			37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del", 
			96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7",
			104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111 : "/", 
			112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8", 
			120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 191: "/", 224: "meta"
		}
		$.extend(defaults , options);
		this.version = 1.0;
		this.global_selector = new Array();
		this.changeTrigger = function(triggerKey){
			defaults.trigger_key = triggerKey;
			_this.reflash();
		};
		this.changeAction = function(newAction){
			if( typeof newAction !== "function"){
				//invalid assignment 
				return ;
			}
			defaults.action = newAction;
			this.reflash();
		};
		this.getAction = function(){
			return defaults.action;
		}
		this.addElement = function(selector,newaction,triggerKey){
			if( typeof newaction !== "function"){
			
				newaction = "default";
			}
			if( typeof triggerKey !== "string"){
				triggerKey = "default";
			}
			var isExist = checkSelector(selector);
			if(isExist === false){
				_this.global_selector.push({"selector":selector,"action":newaction,"triggerKey":triggerKey});
			}else{	
				updateSelector(selector,newaction,triggerKey);
			}
			this.reflash();
		};
		this.removeElement = function(selector){
			var isExist = checkSelector(selector);
			if(isExist === false){
				return ;
			}else{	
				_this.global_selector.splice(isExist,1);
				this.reflash();
			}
		};
		this.reflash = function(){
			for (var i = 0; i < _this.global_selector.length; i++) {
				$(_this.global_selector[i].selector).unbind('keydown');
				//attachfunction
				$(_this.global_selector[i].selector).bind('keydown',{"scope":_this,"i":i,"defaults":defaults},function(event){
					var triggerKey ;
					if(event.data.scope.global_selector[event.data.i].triggerKey == "default"){
						triggerKey = defaults.triggerKey;
					}else{
						triggerKey = event.data.scope.global_selector[event.data.i].triggerKey;
					}
					var handleAction;
					if( typeof event.data.scope.global_selector[event.data.i].action == "function"){
						handleAction = event.data.scope.global_selector[event.data.i].action;
					}else if( event.data.scope.global_selector[event.data.i].action == "default"){
						
						handleAction = event.data.scope.getAction();
						
					}else{
						//this situation is never supposed to be happened 
						handleAction = alert("there is an exception occored! please contact the auther: fulljoy.0@gmail.com");
					}
					if( triggerKeys[event.which] == triggerKey || triggerKey =="all"){
						handleAction();
					}
				});
			}
		};
		var checkSelector = function(selector){
			for (var i = 0; i < _this.global_selector.length; i++) {
				if(_this.global_selector[i].selector == selector){
					return i;
					break;
				}
			}
			return false;
		};
		var updateSelector = function(selector,newaction,newtriggerKey){
			for (var i = 0; i < _this.global_selector.length; i++) {
				if(_this.global_selector[i].selector == selector){
					_this.global_selector[i].action = newaction;
					_this.global_selector[i].triggerKey = newtriggerKey;
					break;
				}
			}
		};
	};
})(jQuery)
