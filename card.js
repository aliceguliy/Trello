var draggableCard = {};

function addCard (groupId, card) {
	var group = document.getElementById(groupId);
	var cardParent = group.children[1];
	var cardTitle = card ? card.title : '<h2>Title</h2>';
	var cardProgress = card ? card.progress : '<div class="progress">' +
                                '<progress max="100" value="80"></progress>' +
                                '<div class="progress-bg"><div class="progress-bar"></div></div>' +
                                '</div>';
	var cardDate = card ? card.expirationDate : new Date().toDateString();
	var cardAvatar = card ? card.avatar : '<img src="./images/carg-img.jpg" alt="">';

	// add card content
	var defaultCard = document.createElement('div');
	defaultCard.className = 'card';
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
            '<i class="fa fa-align-left" aria-hidden="true" onclick=" openModal(title, progress, relevance, date, avatar, cardInfo)"></i>' + cardDate + cardAvatar +
        '</div>'+
    '</div>';
	defaultCard.innerHTML = html;
	cardParent.appendChild(defaultCard);
        
	// drag'n'drop	
	defaultCard.draggable = true;
	function onDragStart() { 
		this.style.opacity = '0.7'; 
	}
	defaultCard.addEventListener('dragstart', onDragStart, false);

	function onDragEnd() {
		this.style.opacity = '1';
	}
	defaultCard.addEventListener('dragend', onDragEnd, false);
    
	function ondragOver() {
		event.preventDefault();
	}
	defaultCard.addEventListener('dragover', ondragOver, false);

	var onDrop = function(event) {
		event.preventDefault();
		var previousCard = event.path.find(function(node) {
			return node.className === 'card';
		});
		var droppedGroup = previousCard.parentNode;
		droppedGroup.insertBefore(draggableCard, previousCard);
	};
	defaultCard.addEventListener('drop', onDrop, false);

	// remove-icon for card deleting
	var removeCardIcon = defaultCard.children[0].children[0].children[1];
	removeCardIcon.addEventListener('click', removeCard.bind(this, group));
}

// delete card
function removeCard(group, event) {
	var target = event.target.parentNode.parentNode.parentNode.parentNode;
	var cardParent = group.children[1];
	cardParent.removeChild(target);
}