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
			console.log(data);
		});
	}

	// create content
	var group = document.getElementsByClassName('group')[0]; //вытаскиваем div class="group"

	// add new group
	window.addGroup = function (group) {
		var contentBlock = document.getElementsByClassName('content')[0]; // вытаскиваем div class="content"
		var defaultGroup = document.createElement('div'); //создаем div, который будет группой стандартного вида
		defaultGroup.className = 'group'; // присваиваем div-у класс
		var title = group ? group.title : '<strong class="title">Group Title</strong>';
		defaultGroup.id = group ? group.id : contentBlock.children.length; // задаем id для всех групп, которые у нас будут в последствии
		defaultGroup.innerHTML = '<div class="group-header">' + title +
								'<button class="btn btn-remove" onclick="removeGroup()"><i class="fa fa-times" aria-hidden="true"></i></button>' +'</div>' +
								'<div class="card-holder"></div>' +
								'<div class="group-footer" onclick="addCard(' + defaultGroup.id + ')">' +
								'<button class="add-card">+ Add card...</button>';
		contentBlock.appendChild(defaultGroup); // передаем html и вставляем его вслед за последней созданной группой
	
	};


	// add new card
	window.addCard = function (groupId) {
		group = document.getElementById(groupId);
		var defaultCard = document.createElement('div'); //создаем div, который будет карточкой стандартного вида
		defaultCard.className = 'card';  // присваиваем div-у класс
		// нужно вставить дефолтные данные
		
		var lastChild = group.children[group.children.length - 1]; // определяем последнего потомка для последующей вставки карточки
		
		// add card content
		var html = '<div>' +
		'<div class="card-header">' +
			'<div class="progress">' +
				'<progress max="100" value="40"></progress>'  +
				'<div class="progress-bg"><div class="progress-bar"></div></div>' +
			'</div>'+
			'<div class="remove-card" onclick="removeCard()">' +
				'<i class="fa fa-times" aria-hidden="true"></i>' +
			'</div>' +
		'</div>' +
		'<div class="info">' +
			'<h2>Title</h2>' +
			'<div class="relevance"></div>' +
		'</div>'+
		'<div class="card-content">' +
			'<i class="fa fa-align-left" aria-hidden="true"></i>' +
			new Date().toDateString() +
			'<img src="./images/carg-img.jpg" alt="">' +
		'</div>'+
		'</div>'; // создали переменную и запхнули в нее весь нужный html-код
		defaultCard.innerHTML = html; // передали все это в html-файл
		var removeIcon = defaultCard.children[0]; 
		removeIcon.addEventListener('click', removeCard.bind(this, group)); //остледили место, где была нажата кнопка и привязали контекст для удаления в нужном месте
		group.insertBefore(defaultCard, lastChild);  // вставили новую карточку
	};
    

	// delete card
	function removeCard(group, event) {
		var target = event.target.parentNode.parentNode.parentNode;
		group.removeChild(target);
		// console.log(target);
	}


	// delete group
	function removeGroup(contentBlock, event) { 
		var removeTarget = event.target.parentNode.parentNode;
		contentBlock.removeChild(removeTarget);
	}

    
	//set class on add-group button
	var btn = document.getElementsByClassName('add-group-button');
	var holder = document.getElementsByClassName('add-group');
	btn[0].onclick = function() {
		holder[0].classList.add('add-group-edit');
	};	// нужно, чтобы по клику в любой другой области класс снимался


	init();
})();