var indexTpl=require("../templates/index.string");
var until=require("../until/until");
SPA.defineView("index",{
	html:indexTpl,
	plugins:["delegated"],
	modules:[{
		name:"content",
		defaultTag:"home",
		views:["home","find","my"],
		container:".main"
		}
	],
	bindEvents:{
		show:function(){
			
		}

	},
	bindActions:{
		"swidth-tabs":function(e,data){
			/*$(e.el).addClass('active_li').siblings().removeClass('active_li');*/
			until.setFoucs($(e.el),'active_li');
			this.modules.content.launch(data.tag);
		},
		'go-my':function(e){
			SPA.open('my',{
				ani:{
					name:'dialog',
					width:280,
					height:300,
					autoHide:true
				}
			})
		}
	}
	
})

