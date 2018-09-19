
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

	function init() {
		getFile(function(error, data) {
			if (error) {
				return;
			}
			data.forEach(function(group) {
				addGroup(group);
				group.childrens;
			});
		});
	}

	// create content
	var group = document.getElementsByClassName('group')[0];

	// add new group
	window.addGroup = function (group) {
		var addGroup = document.getElementsByClassName('add-group')[0];
		var contentBlock = document.getElementsByClassName('content')[0];
		var defaultGroup = document.createElement('div'); 
		defaultGroup.className = 'group';
		var title = group ? group.title : '<strong class="title">Group Title</strong>';
		defaultGroup.id = group ? group.id : contentBlock.children.length;
		defaultGroup.innerHTML = '<div class="group-header">' + title +
								'<button class="btn btn-remove" onclick="removeGroup()"><i class="fa fa-times" aria-hidden="true"></i></button>' +'</div>' +
								'<div class="card-holder"></div>' +
								'<div class="group-footer" onclick="addCard(' + defaultGroup.id + ')">' +
								'<button class="add-card">+ Add card...</button>';
		contentBlock.insertBefore(defaultGroup, addGroup);
	};

	// add new card
	
	window.addCard = function (groupId, card) {
		group = document.getElementById(groupId);
		var cardParent = group.children[1];
		var defaultCard = document.createElement('div');
		defaultCard.className = 'card';
		var cardTitle = card ? card.title : '<h2>Title</h2>';
		var cardProgress = card ? card.title : '<div class="progress">' +
								'<progress max="100" value="40"></progress>'  +
								'<div class="progress-bg"><div class="progress-bar"></div></div>' +
								'</div>';
		var cardDate = card ? card.expirationDate : new Date().toDateString();
		var cardAvatar = card ? card.avatar : '<img src="./images/carg-img.jpg" alt="">';
		// var lastChild = group.children[group.children.length - 1];

		// add card content
		var html = '<div>' +
		'<div class="card-header">' + cardProgress +
			'<div class="remove-card" onclick="removeCard()">' +
				'<i class="fa fa-times" aria-hidden="true"></i>' +
			'</div>' +
		'</div>' +
		'<div class="info">' + cardTitle +
			'<div class="relevance"></div>' +
		'</div>'+
		'<div class="card-content">' +
			'<i class="fa fa-align-left" aria-hidden="true" onclick=" openModal()"></i>' + cardDate + cardAvatar +
		'</div>'+
		'</div>';
		defaultCard.innerHTML = html;
		// group.insertBefore(defaultCard, lastChild);
		cardParent.appendChild(defaultCard);
		defaultCard.draggable = true;
		
		// drag'n'drop	
		// var draggableCard = {};
		function onDragStart() { 
			this.style.opacity = '0.7'; 
		}
		defaultCard.addEventListener('dragstart', onDragStart, false);

		function onDragEnd() {
			this.style.opacity = '1';
		}
		defaultCard.addEventListener('dragend', onDragEnd, false);
		defaultCard.addEventListener('dragover', function(event){
			event.preventDefault();
		}, false);

		function onDrop(event) {
			event.preventDefault();
			var previousCard = event.path.find(function(node) {
				return node.className === 'card';
			});
			var droppedGroup = previousCard.parentNode;
			var draggableCard = this.defaultCard;
			droppedGroup.insertBefore(draggableCard, previousCard);
		}
		defaultCard.addEventListener('drop', onDrop, false);

		// remove-icon for card deleting
		var removeCardIcon = defaultCard.children[0].children[0].children[1];
		removeCardIcon.addEventListener('click', removeCard.bind(this, group));
	};
    

	// delete card
	function removeCard(group, event) {
		var target = event.target.parentNode.parentNode.parentNode.parentNode;
		var cardParent = group.children[1];
		cardParent.removeChild(target);
	}
	
	// delete group
	// function removeGroup (contentBlock, event) { 
	// 	var groupTarget = event.target.parentNode;
	// 	console.log(target);
	// 	contentBlock.removeChild(groupTarget);
	// }

	//set class on add-group button
	var btn = document.getElementsByClassName('add-group-button');
	var holder = document.getElementsByClassName('add-group');
	var btnHolder = document.getElementsByClassName('btn btn-remove-group');
	btn[0].onclick = function() {
		holder[0].classList.add('add-group-edit');
	};	
	btnHolder[0].onclick = function() {
		holder[0].classList.remove('add-group-edit');
	};

	// window.openModal = function() {
	// 	var options = {
	// 		template: ''
	// 	};
	// 	var modal = new modalService(options);
	// 	modal.open();
	// };


	init();
})();