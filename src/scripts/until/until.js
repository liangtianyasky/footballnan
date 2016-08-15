var until={
	setFoucs:function(ele,classname){
		ele.addClass(classname).siblings().removeClass(classname);
	}
}

module.exports=until;