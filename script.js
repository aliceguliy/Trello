var appFunctions = {};

(function () {
	//get json data
	function getFile(cb) {
		var xhr = new XMLHttpRequest();

		xhr.open('GET', 'data.json', true);
		xhr.send();

		xhr.onreadystatechange = function() {
			if (xhr.readyState != 4){
				return;
			}
			if (xhr.status === 0) {
				cb(false, JSON.parse(xhr.response));
			} else {
				cb(true);
			}
		};
	}
	// repack json data
	function init() {
		getFile(function(error, data) {
			if (error) {
				return;
			}
			data.forEach(function(group) {
				appFunctions.addGroup(group);
				group.childrens.forEach(function(card) {
					appFunctions.addCard(group.id, card);
				});
			});
		});
	}

	// addGroup
	appFunctions.addGroup();
	//add card
	appFunctions.addcard();
	// add modal window

	appFunctions.openModal = function(title, progress, relevance, date, avatar, cardInfo) {
		var options = {
			template:
			'<div class="card-popup">' +
			'<form action="">'+
				'<div class="header-popup">' +
					'<h1>Card settings</h1>' +
					'<button class=" btn close-popup"><i class="fa fa-times" aria-hidden="true"></i></button>'+
				'</div>' + progress +
				'<div class="info">' + title + relevance + '</div>' +
				'<div class="card-content">' + date + avatar + '</div>' +
				'<div class="description description-edit">' +
					'<div class="description-block">' + cardInfo + 
					'<button class="btn edit">Edit</button>' +
				'</div>' +
			'</form>' +	
		'</div>'
		};
		var modal = new ModalService(options);
		modal.open();
	};
	
	// call json data
	init();
});