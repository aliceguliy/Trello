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
	appFunctions.openModal(); 
	// call json data
	init();
});

