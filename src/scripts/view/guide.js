
var guideTpl=require("../templates/guide.string");

SPA.defineView("guide",{
	html:guideTpl,
	plugins:["delegated"],
	init:{
		mySwiper:null
	},
	bindEvents:{
		"beforeShow":function(){
			this.mySwiper = new Swiper('.swiper-container');
		}
	},
	bindActions:{
		"go_index":function(e){
			//$(e.el).parents('#swiper-container').remove();
			SPA.open('index');
		}
	}
})