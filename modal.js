function ModalService (options) {
	this.options = options;
	this.open = function() {
		var modal = document.getElementsByClassName('card-popup-holder')[0];
		modal.innerHTML = this.options.template;
		modal.setAttribute('style', 'top: 35%');
		// // icon for modal-window closing
		// var closeIcon = document.getElementsByClassName('btn close-popup');
		// closeIcon.onclick = this.close.bind(this);
	};

	this.close = function () {
		var modal = document.getElementsByClassName('card-popup-holder')[0];
		modal.innerHTML = this.options.template;
		modal.setAttribute('style', 'top: -35%'); //*
	}
}