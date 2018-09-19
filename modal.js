function modalService (options) {
	this.options = options;
	this.open = function() {
		var modal = document.getElementsByClassName('card-popup-holder')[0];
		modal.innerHTML = this.options.template;
		modal.setAttribute('style', 'top: 35%');	//*
	};

	this.close = function () {
		var modal = document.getElementsByClassName('card-popup-holder')[0];
		modal.innerHTML = this.options.template;
		modal.setAttribute('style', 'top: -35%'); //*
	}
};




// var title = '<h2>Title</h2>';
// var progress = '<div class="progress">' +
// 				'<progress max="100" value="80"></progress>' +
// 				'<div class="progress-bg"><div class="progress-bar"></div></div>' +
// 				'</div>';
// var relevance = '<div class="relevance"></div>';
// var date = new Date().toDateString();
// var avatar = '<img src="./images/carg-img.jpg" alt="">';
// var cardInfo = '<p>Information</p>';




// так должно выглядеть окно
// '<div class="card-popup">' +
// 		'<form action="">'+
// 			'<div class="header-popup">' +
// 				'<h1>Card settings</h1>' +
// 				'<button class=" btn close-popup"><i class="fa fa-times" aria-hidden="true"></i></button>'+
// 			'</div>' +
// 			'<div class="info">' + 
// 				'<h2>Title</h2>' + 
// 				'<div class="relevance"></div>' + 
// 			'</div>' +
// 			'<div class="card-content">' + new Date().toDateString() +
// 				'<img src="./images/carg-img.jpg" alt="">' + 
// 			'</div>' +
// 			'<div class="description description-edit">' +
// 				'<div class="description-block">' + 
// 					'<p>Information</p>' + 
// 					'<button class="btn edit">Edit</button>' +
// 				'</div>' +
// 		'</form>' +	
// 	'</div>'