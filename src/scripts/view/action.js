var actionTpl=require("../templates/action.string");

SPA.defineView("action",{
	html:actionTpl,
	bindEvents:{
		/*show:function(){
			var liveiScroll=this.widgets["livenavScroll"];
			liveiScroll.options.scrollX=true;
			liveiScroll.options.scrollY=false;
		}*/
	}
})