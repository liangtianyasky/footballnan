var myTpl=require("../templates/my.string");

SPA.defineView("my",{
	html:myTpl,
	plugins:["delegated"],
	styles:{
		background:"transparent!important"
	},

	bindEvents:{
		/*show:function(){
			var liveiScroll=this.widgets["livenavScroll"];
			liveiScroll.options.scrollX=true;
			liveiScroll.options.scrollY=false;
		}*/
	},
	bindActions:{
		"go-action":function(e){
			SPA.open('action',{
				name: 'actionSheet',
         		distance: 200
			});
		},
		'colse':function(e){
			this.hide();
		}
	}
})


	