function ModalService (options) {
	this.options = options;
	this.open = function() {
		var modal = document.getElementsByClassName('card-popup-holder')[0];
		modal.innerHTML = this.options.template;
		modal.setAttribute('style', 'top: 35%');
		// // icon for modal-window closing
		// var closeIcon = document.createElement('button');
		// closeIcon.classList.add('btn close-popup');
		// closeIcon.onclick = this.close.bind(this);
		// modal.appendChild(closeIcon);
	};

	this.close = function () {
		var modal = document.getElementsByClassName('card-popup-holder')[0];
		modal.innerHTML = this.options.template;
		modal.setAttribute('style', 'top: -35%'); //*
	}
}