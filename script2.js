(function () {
	// add new card 
	window.addCard = function (groupId) {
		group = document.getElementById(groupId);
		var defaultCard = document.createElement('div'); //создаем div, который будет карточкой стандартного вида
		defaultCard.ondrop = window.cardDrop; // сброс на карточку при перемещении
		defaultCard.className = 'card';  // присваиваем div-у класс
		var lastChild = group.children[group.children.length - 1]; // определяем последнего потомка для последующей вставки карточки
		// drag'n'drop
		defaultCard.draggable = true; //разрешаем перетаскивание
		defaultCard.ondragstart = function(event) {
			event.dataTransfer.setData('tag', event.target.id); //вписать нужное?
		};
		var draggableCard = defaultCard; // переделать
		window.onDragOver = function(event) {
			event.preventDefault();
		};
			
		window.cardDrop = function(event) {
			event.preventDefault();
			var previosCard = event.path.find(function(node){
				return node.className === 'card';
			});
			var droppedGroup = previosCard.parentNode;
			droppedGroup.insertBefore(draggableCard, previosCard);
		};
		// add card content
		var html = '<div>' +
		'<div class="card-header">' +
			'<div class="progress">' +
				'<progress max="100" value="40"></progress>'  +
				'<div class="progress-bg"><div class="progress-bar"></div></div>' +
			'</div>'+
			'<div class="remove-card">' +
				'<i class="fa fa-times" aria-hidden="true"></i>' +
			'</div>' +
		'</div>' +
		'<div class="info">' +
			'<h2>Title</h2>' +
			'<div class="relevance"></div>' +
		'</div>'+
		'<div class="card-content">' +
			'<i class="fas fa-ellipsis-h"></i>' +
			new Date().toDateString() +
			'<img src="./images/carg-img.jpg" alt="">' +
		'</div>'+
		'</div>'; // создали переменную и запхнули в нее весь нужный html-код
		defaultCard.innerHTML = html; // передали все это в html-файл
		var removeIcon = defaultCard.children[0]; 
		removeIcon.addEventListener('click', removeCard.bind(this, group)); //остледили место, где была нажата кнопка и привязали контекст для удаления в нужном месте
		group.insertBefore(defaultCard, lastChild);  // вставили новую карточку
	};
})();