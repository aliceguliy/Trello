var contentBlock = document.getElementsByClassName('content')[0];

function addGroup(group) {
	var addNewGroup = document.getElementsByClassName('add-group')[0];
	var defaultGroup = document.createElement('div'); 
	defaultGroup.className = 'group';
	defaultGroup.id = contentBlock.children.length;
	var title = document.getElementById('input_form').value;
	if (title == '') {
		title = '<strong class="title">Group Title</strong>';
	}
	if (group) {
		title = group.title;
		defaultGroup.id = group.id;
	} 
	defaultGroup.innerHTML ='<div class="group-header">' + title +
								'<button class="btn btn-remove" onclick="removeGroup()"><i class="fa fa-times" aria-hidden="true"></i></button>' +
							'</div>' +
							'<div class="card-holder"></div>' +
							'<div class="group-footer" onclick="addCard(' + defaultGroup.id + ')">' +
								'<button class="add-card">+ Add card...</button>' + 
							'</div>';
	contentBlock.insertBefore(defaultGroup, addNewGroup);
}

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

// delete group
function removeGroup() { 
	var target = getGroupRecursive(event.target);
	target.remove();
}

function getGroupRecursive(elem) {
	if (elem.className === 'group') {
		return elem;
	}
	return getGroupRecursive(elem.parentNode);
}