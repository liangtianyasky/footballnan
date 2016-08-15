require('../lib/swiper-3.3.1.min.js');
var homeTpl=require("../templates/home.string");
var until=require("../until/until");
SPA.defineView("home",{
	html:homeTpl,
	init:{
		vm:null,
		livelistArr:[],
		mySwiper:null,
		hotSwiper:null,
		formatData:function(data){
			var arr=[];
			for(var i=0,len=data.length;i<Math.ceil(len/2);i++){
				arr[i]=[data[2*i],data[2*i+1]];
			}
			return arr;
		}
	},
	plugins:["delegated",{
			name:"avalon",
			options:function(vm){
				vm.livedate=[];
			}
		}
	],
	bindEvents:{
		"beforeShow":function(){
			var that=this;
			 that.vm=this.getVM();
		$.ajax({
				//url:"json/livelist.json",
				url:"/api/getLivelist.php",
				//async:false,
				type:'get',
				data:{
					rtype:"origin"
				},
				success:function(e){
					that.livelistArr = e.data;
					that.vm.livedate=that.formatData(e.data);
					//console.log(vm.livedate)
				},
				error:function(){
					alert("数据加载失败");
				}
			})
			this.hotSwiper=	new Swiper('#home-swiper',{
				onSlideChangeStart:function(swpier){
					var index=swpier.activeIndex;
					until.setFoucs($('#chose li').eq(index),'onli');
				}
			})
			this.mySwiper = new Swiper('.section .swiper-container',{
				onSlideChangeStart:function(swpier){
					var index=swpier.activeIndex;
					//$('.list li').eq(index).addClass('active').siblings().removeClass('active');
					until.setFoucs($('.list li').eq(index),'active');
					
				}
			})
		},
		show:function(){
			var that=this;
			//上拉刷新，下拉加载
			var myScroll = this.widgets.homeListScroll;
     		var scrollSize = 35;
     		myScroll.scrollBy(0,-scrollSize);
     		var head=$(".head img"),
          	topImgHasClass=head.hasClass("up");
      		var foot=$(".foot img"),
            bottomImgHasClass=head.hasClass("down");
            myScroll.on("scroll",function(){
	            var y=this.y,
	            maxY=this.maxScrollY-y;
	            if(y>=0){
	                 !topImgHasClass && head.addClass("up");
	                 return "";
	            }
	            if(maxY>=0){
	                 !bottomImgHasClass && foot.addClass("down");
	                 return "";
	            }
            })
            myScroll.on("scrollEnd",function(){
		        if(this.y>=-scrollSize && this.y<0){
		              myScroll.scrollTo(0,-scrollSize);
		              head.removeClass("up");
		        }else if(this.y>=0){
		              head.attr("src","/footballApp/images/ajax-loader.gif");
		               $.ajax({
		                  url:"json/livelist-refresh.json",  //mock数据
		                  //url:"/api/getLivelist.php",
		                 type:"get",
		                  data:{
		                     rtype:"refresh"
		                  },
		                  success:function(rs){
		                    /*var arr = that.livelistArr.concat(rs.data);
		                     that.vm.livedata = that.formatData(arr);
		                     that.livelistArr = arr;*/

		                   	 that.livelistArr = rs.data.concat(that.livelistArr);
		                     that.vm.livedate = that.formatData(that.livelistArr); 

		                     myScroll.refresh();
		                     myScroll.scrollTo(0,-scrollSize);
		                     foot.removeClass("up");
		                     foot.attr("src","/footballApp/images/arrow.png")
		                  }
		              })
		            /*setTimeout(function(){
		                  myScroll.scrollTo(0,-scrollSize);
		                  head.removeClass("up");
		                  head.attr("src","/footballApp/images/arrow.png");
		            },1000)*/
		        }

		        var maxY=this.maxScrollY-this.y;
		        var self=this;
		        if(maxY>-scrollSize && maxY<0){
		              myScroll.scrollTo(0,self.maxScrollY+scrollSize);
		              foot.removeClass("down")
		            //  console.log("refresh");
		        }else if(maxY>=0){
		            foot.attr("src","/footballApp/images/ajax-loader.gif")
		              // 请求加载数据
		              $.ajax({
		                  url:"json/livelist-more.json",  //mock数据
		                 // url:"/api/getLivelist.php",
		                 // type:"get",
		                  data:{
		                     rtype:"more"
		                  },
		                  success:function(rs){
		                    /*var arr = that.livelistArr.concat(rs.data);
		                     that.vm.livedata = that.formatData(arr);
		                     that.livelistArr = arr;*/

		                    that.livelistArr = that.livelistArr.concat(rs.data);
		                     that.vm.livedate = that.formatData(that.livelistArr); 
							 myScroll.refresh();
		                     myScroll.scrollTo(0,self.y+maxY);
		                     foot.removeClass("down");
		                     foot.attr("src","/footballApp/images/arrow.png")
		                  }
		              })
		        }
             })

		}
	},
	bindActions:{
		"li-tabs":function(e){
			var index=$(e.el).index();
			this.mySwiper.slideTo(index);
		},
		"tab-li":function(e){
			var index=$(e.el).index();
			this.hotSwiper.slideTo(index);
		},
		"goto-my":function(e,data){
			SPA.open('detail',{
				 param:data  
			});
		}

	}
	
})

