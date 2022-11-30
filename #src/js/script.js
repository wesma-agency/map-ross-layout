Number.prototype.pad = function (n) {
	for (var r = this.toString(); r.length < n; r = 0 + r);
	return r;
};

function updateClock() {
	var now = new Date();
	var milli = now.getMilliseconds(),
		sec = now.getSeconds(),
		min = now.getMinutes(),
		hou = now.getHours(),
		mo = now.getMonth(),
		dy = now.getDate(),
		yr = now.getFullYear(),
		we = now.getDay();

	var months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
	var week = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
	var tags = ["mon", "wee", "d", "y", "h", "m", "s", "mi"];
	var corr = [months[mo], week[we - 1], dy, yr, hou.pad(2), min.pad(2), sec.pad(2), milli];
	for (var i = 0; i < tags.length; i++) document.getElementById(tags[i]).firstChild.nodeValue = corr[i];
}

function initClock() {
	updateClock();
	window.setInterval("updateClock()", 1);
}

document.addEventListener("DOMContentLoaded", function () {
	initClock();

	let tabContainers = Array.prototype.slice.call(document.querySelectorAll(".js-tab-container"));

	if (tabContainers.length > 0) {
		tabContainers.forEach((element) => {
			let dataTab = element.dataset.tab;

			let tabItem = Array.prototype.slice.call(element.querySelectorAll(`[data-tab-item-${dataTab}]`));
			let tabContent = Array.prototype.slice.call(element.querySelectorAll(`[data-tab-content-${dataTab}]`));

			tabItem.forEach((el, index, array) => {
				el.addEventListener("click", (e) => {
					if (!el.classList.contains("active")) {
						e.preventDefault();
						let dataId = el.dataset["tabItem-" + dataTab];

						let tabContentItem = tabContent.find((item) => {
							if (item.dataset["tabContent-" + dataTab] == dataId) {
								return item;
							} else {
								return null;
							}
						});

						if (tabContentItem != null) {
							tabItem.forEach((el) => el.classList.remove("active"));
							tabContent.forEach((el) => el.classList.remove("active"));

							el.classList.add("active");

							tabContentItem.classList.add("active");
						}
					}
				});
			});
		});
	}

	//Мобильное меню
	let header = document.querySelector(".main-header");
	let burger = document.querySelector(".hamburger");
	let menu = document.querySelector(".nav-menu__wrap");

	if (burger != null && menu != null && header != null) {
		burger.addEventListener("click", function () {
			header.classList.toggle("open");
			menu.classList.toggle("open");
		});
	}

	// Открытие окна с информацией о регионе
	let regions = document.querySelectorAll(".js-open-info");
	let mapSvg = document.querySelector(".js-map-svg");
	let openPopupInfo = document.querySelector(".js-open-popup-info");
	let closePopupInfo = document.querySelector(".js-close-popup-info");

	if (regions.length > 0) {
		regions.forEach((element) => {
			element.addEventListener("click", function () {
				setTimeout(() => {
					this.classList.add("selected");
					mapSvg != null ? mapSvg.classList.add("region-select") : null;
					openPopupInfo != null ? openPopupInfo.classList.add("show") : null;
				}, 100);
			});
		});
	}

	function closePopup() {
		regions.length > 0 ? regions.forEach((el) => el.classList.remove("selected")) : null;
		mapSvg != null ? mapSvg.classList.remove("region-select") : null;
		openPopupInfo != null ? openPopupInfo.classList.remove("show") : null;
	}

	if (closePopupInfo != null) {
		closePopupInfo.addEventListener("click", closePopup);
	}

	document.addEventListener("click", function (e) {
		let target = e.target;
		if (openPopupInfo != null) {
			if (!target.closest(".js-open-popup-info") && openPopupInfo.classList.contains("show")) {
				closePopup();
			}
		}
	});

	// Мобильный аккордеон в футере
	let match = window.matchMedia("(max-width: 768px)");

	function toogleMenu() {
		let containerAccord = this.closest(".js-accord-container");
		let listAccord = containerAccord ? containerAccord.querySelector(".js-accord-list") : null;

		if (containerAccord != null && listAccord != null) {
			containerAccord.classList.toggle("show");
			listAccord.classList.toggle("show");
		}
	}

	function accordMenuFooter() {
		let arrAccordTrigger = document.querySelectorAll(".js-accord");

		if (match.matches) {
			if (arrAccordTrigger.length > 0) {
				arrAccordTrigger.forEach((el) => el.addEventListener("click", toogleMenu));
			}
		} else {
			if (arrAccordTrigger.length > 0) {
				arrAccordTrigger.forEach((el) => el.removeEventListener("click", toogleMenu));
			}
		}
	}

	accordMenuFooter();
	match.addListener(accordMenuFooter);
});

document.addEventListener("click", function (e) {
	let target = e.target;

	if (target.closest(".js-view-all")) {
		let toggleItem = target.closest(".js-list-toggle").querySelectorAll(".js-toggle-item");

		target.closest(".js-view-all").classList.toggle("--hidden");

		toggleItem.forEach((el, i) => {
			if (i > 1) {
				el.classList.toggle("--hidden");
			}
		});

		if (target.closest(".js-view-all").classList.contains("--hidden")) {
			target.closest(".js-view-all").textContent = "Показать больше";
		} else {
			target.closest(".js-view-all").textContent = "Скрыть";
		}
	}
});
