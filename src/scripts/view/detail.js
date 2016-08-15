var detailTpl=require("../templates/detail.string");
SPA.defineView("detail",{
	html:detailTpl,
	plugins:["delegated",{
		name:'avalon',
		options:function(vm){
			vm.imgsrc="";
			vm.title=null;
			vm.description=null;
			vm.isShowLoding=true;
		}
	}],
	init:{
       param:5
	},
	bindEvents:{
		show:function(e){
			var vm=this.getVM();
			var id = this.param.id;
			$.ajax({
				url:"json/livedateil.json",
				data:{
        			id:id
        		},
				success:function(rs){
					var data=rs.data;
					vm.imgsrc=data.imgsrc;
					console.log(vm.imgsrc);
					vm.title=data.title;
					vm.description = data.description;
					setTimeout(function(){
						vm.isShowLoding=false;
					},1000)
				}
			})
		}
	},
	bindActions:{
		"go-index":function(e){
			SPA.open('index');
		}
	}
})