function ModalService (options) {
	this.options = options;
	this.open = function() {
		var modal = document.getElementsByClassName('card-popup-holder')[0];
		modal.innerHTML = this.options.template;
		modal.setAttribute('z-index', '2');	//*
	};

	this.close = function () {
		var modal = document.getElementsByClassName('card-popup-holder')[0];
		modal.innerHTML = this.options.template;
		modal.setAttribute('z-index', '-1'); //*
	}
};