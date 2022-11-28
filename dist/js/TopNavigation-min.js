// define("PORTLET/navigationRST/TopNavigation", ["SHARED/jquery", "SHARED/svgxuse"], function (g, m) {
// 	eXo.define.names = ["$", "svgxuse"];
// 	eXo.define.deps = [g, m];
// 	return (function (b) {
// 		function g(a, c) {
// 			if (!(a instanceof c)) throw new TypeError("Cannot call a class as a function");
// 		}
// 		function l(a, c) {
// 			var b = "" + a,
// 				d = c - b.length + 1;
// 			return b.length >= c ? b : Array(d).join("0") + b;
// 		}
// 		function p() {
// 			var a = b(".main-banner__wrap").outerHeight(),
// 				c = b(".nav-menu__wrap").outerHeight();
// 			b(window).scrollTop() > a ? (b(".main-header").addClass("main-header--sticky"), b(".main-header").css("padding-bottom", c + "px")) : (b(".main-header").removeClass("main-header--sticky"), b(".main-header").css("padding-bottom", "0"));
// 		}
// 		function m() {
// 			var a = b(".nav-menu__item \x3e a");
// 			console.log(a.find("\x3e a"));
// 			a.on("click", function (c) {
// 				var a = b(c.currentTarget.parentNode).children(".nav-menu__dropdown-container"),
// 					d = a.is(":visible");
// 				b(".nav-menu__dropdown-container").slideUp();
// 				b(".nav-menu__item \x3e .active").removeClass("active");
// 				d ? a.blur() : (a.slideDown(), a.prev().addClass("active"), c.preventDefault());
// 			});
// 			b(".nav-menu__dropdown-item \x3e a").click(function (c) {
// 				return c.currentTarget.classList.add("active");
// 			});
// 		}
// 		function q() {
// 			b(window).off("scroll", p);
// 			b(".nav-menu__item").children("a").off("click");
// 			b(".nav-menu__item").off("click");
// 			if (window.matchMedia("(min-width: 1200px)").matches && "gost" === currentTheme) b(window).on("scroll", p);
// 			else (window.matchMedia("(min-width: 1200px)").matches && "gost" !== currentTheme) || m();
// 		}
// 		function k(a) {
// 			location.replace(navUriChangeTheme + "\x26theme\x3d" + String(a.font + "-" + a.bg + "-" + a.img + "-" + a.fontFamily + "-" + a.letterSpacing));
// 		}
// 		function r() {
// 			var a = (((window.PORTAL_CONFIG || {}).gatewayUrl || "").split("://")[1] || "").replace("/", ""),
// 				c = new WebSocket("wss://" + a + "/notification-service/subscribe");
// 			c.onopen = function () {
// 				c.send(JSON.stringify({ systemId: window.PORTAL_CONFIG.systemId, operation: "SUBSCRIBE" }));
// 			};
// 			c.onmessage = function (c) {
// 				c = JSON.parse(c.data);
// 				var a = b('\n            \x3cdiv class\x3d"agenda-notification"\x3e\n                \x3cdiv class\x3d"agenda-notification__logo"\x3e\x3c/div\x3e\n\n                \x3cdiv class\x3d"agenda-notification__content"\x3e\n                    \x3cdiv class\x3d"agenda-notification__content-title"\x3e\n                        ' + c.title + "\n                    \x3c/div\x3e\n\n                    " + c.text + '\n                \x3c/div\x3e\n\n                \x3csvg class\x3d"agenda-notification__close-icon"\x3e\n                    \x3cuse xmlns:xlink\x3d"http://www.w3.org/1999/xlink"\n                        xlink:href\x3d"' + navigationConstants.cr + '/sprite/sprite.svg#header--close"\x3e\x3c/use\x3e\n                \x3c/svg\x3e\n\n            \x3c/div\x3e\n        ');
// 				b("body").append(a);
// 				a.on("click", ".agenda-notification__close-icon", function (c) {
// 					a.addClass("remove");
// 					setTimeout(function () {
// 						a.remove();
// 					}, 200);
// 				});
// 				setTimeout(function () {
// 					a.addClass("remove");
// 					setTimeout(function () {
// 						a.remove();
// 					}, 200);
// 				}, 1e4);
// 			};
// 			c.onerror = function (a) {
// 				c = null;
// 				s(a);
// 			};
// 			c.onclose = function (a) {
// 				c = null;
// 				s(a);
// 			};
// 		}
// 		function s(a) {
// 			console.log(a);
// 			n ||
// 				(n = setTimeout(function () {
// 					n = null;
// 					r();
// 				}, 1e4));
// 		}
// 		var t = (function () {
// 				function a(c, a) {
// 					for (var b = 0; b < a.length; b++) {
// 						var e = a[b];
// 						e.enumerable = e.enumerable || !1;
// 						e.configurable = !0;
// 						"value" in e && (e.writable = !0);
// 						Object.defineProperty(c, e.key, e);
// 					}
// 				}
// 				return function (c, b, d) {
// 					b && a(c.prototype, b);
// 					d && a(c, d);
// 					return c;
// 				};
// 			})(),
// 			u = (function () {
// 				function a() {
// 					var c = this;
// 					g(this, a);
// 					this.correction = 0;
// 					this.serverUrl = navigationConstants.cr + "/commons/getTime.action";
// 					this.sync();
// 					setInterval(function () {
// 						c.sync();
// 					}, 3e4);
// 				}
// 				t(a, [
// 					{
// 						key: "sync",
// 						value: function () {
// 							var c = this;
// 							b.ajax({
// 								dataType: "json",
// 								headers: { Accept: "application/json", "Content-Type": "application/json" },
// 								type: "GET",
// 								url: this.serverUrl,
// 								success: function (a) {
// 									c.correction = new Date() - new Date(a.currentTime);
// 								},
// 							});
// 						},
// 					},
// 					{
// 						key: "serverTime",
// 						get: function () {
// 							return new Date(new Date() - this.correction);
// 						},
// 					},
// 				]);
// 				return a;
// 			})();
// 		null !== document.querySelector('[data-clock\x3d"date"]') &&
// 			new ((function () {
// 				function a() {
// 					g(this, a);
// 					this.timeSync = new u();
// 					this.hourEl = document.querySelector('[data-clock\x3d"h"]');
// 					this.minutesEl = document.querySelector('[data-clock\x3d"m"]');
// 					this.secondsEl = document.querySelector('[data-clock\x3d"s"]');
// 					this.mSecondsEl = document.querySelector('[data-clock\x3d"ms"]');
// 					this.dateEl = document.querySelector('[data-clock\x3d"date"]');
// 					this.dayEl = document.querySelector('[data-clock\x3d"dayOfWeek"]');
// 					this.lastDate = new Date(0);
// 				}
// 				t(a, [
// 					{
// 						key: "init",
// 						value: function () {
// 							var a = this;
// 							this.updateCalendar(this.timeSync.serverTime);
// 							setInterval(function () {
// 								a.updateClock(a.timeSync.serverTime);
// 								a.toggleTimeZoneText(a.timeSync.serverTime);
// 							}, 20);
// 							setInterval(function () {
// 								return a.updateCalendar(a.timeSync.serverTime);
// 							}, 1e3);
// 							b(".datetime.uninitialized").removeClass("uninitialized");
// 						},
// 					},
// 					{
// 						key: "updateCalendar",
// 						value: function (a) {
// 							if (this.lastDate.getDate() !== a.getDate() || this.lastDate.getMonth() !== a.getMonth() || this.lastDate.getFullYear() !== a.getFullYear()) (this.lastDate = a), (this.dateEl.textContent = this.computeDateString(a)), (this.dayEl.textContent = navigationConstants.i18nStrings["daysOfWeek" + a.getDay()]);
// 						},
// 					},
// 					{
// 						key: "updateClock",
// 						value: function (a) {
// 							this.hourEl.innerHTML = l(a.getHours(), 2);
// 							this.minutesEl.innerHTML = l(a.getMinutes(), 2);
// 							this.secondsEl.innerHTML = l(a.getSeconds(), 2);
// 							this.mSecondsEl.innerHTML = l(a.getMilliseconds(), 3);
// 						},
// 					},
// 					{
// 						key: "computeDateString",
// 						value: function (a) {
// 							var b = a.getDate(),
// 								d = navigationConstants.i18nStrings["months" + a.getMonth()];
// 							a = a.getFullYear();
// 							return b + " " + d + " " + a;
// 						},
// 					},
// 					{
// 						key: "toggleTimeZoneText",
// 						value: function (a) {
// 							3 == a.getTimezoneOffset() / 60 ? b(".datetime__timezone").addClass("-visible") : b(".datetime__timezone").removeClass("-visible");
// 						},
// 					},
// 				]);
// 				return a;
// 			})())().init();
// 		("use strict");
// 		(function () {
// 			b(document).on("click", ".main-banner .dropdown__button", function (a) {
// 				var c = b(a.currentTarget).parent(".dropdown").hasClass("active");
// 				b(".dropdown").removeClass("active");
// 				c || b(a.currentTarget).parent(".dropdown").addClass("active");
// 			});
// 			b(document).on("mouseup", function (a) {
// 				var c = b(".main-banner .dropdown");
// 				c.is(a.target) || 0 !== c.has(a.target).length || c.removeClass("active");
// 			});
// 		})();
// 		(function () {
// 			b(".hamburger").on("click", function () {
// 				b(".nav-menu__wrap").slideToggle();
// 				b(".main-header").toggleClass("open");
// 			});
// 		})();
// 		(function () {
// 			var a = b(".main-header"),
// 				c = b(".js-head-search-close"),
// 				h = b("\x3cdiv/\x3e").addClass("overlay-bg").appendTo(a);
// 			b("body").on("click", ".js-head-search-btn", function (c) {
// 				c.preventDefault();
// 				800 <= b(window).width() && (a.addClass("main-header--open-search"), h.show());
// 				return !1;
// 			});
// 			h.on("click", function () {
// 				a.removeClass("main-header--open-search");
// 				h.hide();
// 			});
// 			c.on("click", function (b) {
// 				b.preventDefault();
// 				a.removeClass("main-header--open-search");
// 				h.hide();
// 			});
// 		})();
// 		("use strict");
// 		q();
// 		b(window).on("resize", q);
// 		("use strict");
// 		b(".spec-switcher").on("click", function (a) {
// 			a.stopPropagation();
// 		});
// 		b(document).on("click", ".special-header-section .dropdown__button", function () {
// 			var a = b(this).parent(".dropdown").hasClass("active");
// 			b(".dropdown").removeClass("active");
// 			a || b(this).parent(".dropdown").addClass("active");
// 		});
// 		(function () {
// 			var a = currentTheme;
// 			a[0].replace("\x26theme\x3d", "");
// 			var a = a.split("-"),
// 				c = a[0],
// 				h = a[1],
// 				d = a[2],
// 				e = a[3],
// 				g = a[4],
// 				f = { font: c, bg: h, img: d, fontFamily: e, letterSpacing: g };
// 			b(".special-header-section__list_fonts li").on("click", function (a) {
// 				a.preventDefault();
// 				c = b(this).data("font");
// 				f.font = c;
// 				k(f);
// 			});
// 			b(".special-header-section__list_background li").on("click", function (a) {
// 				a.preventDefault();
// 				h = b(this).data("bg");
// 				f.bg = h;
// 				k(f);
// 			});
// 			b(".special-header-section__list_img li").on("click", function (a) {
// 				a.preventDefault();
// 				d = b(this).data("img");
// 				f.img = d;
// 				k(f);
// 			});
// 			b(".dropdown_font-family label").on("click", function (a) {
// 				a.preventDefault();
// 				e = b(this).data("font");
// 				f.fontFamily = e;
// 				k(f);
// 			});
// 			b(".dropdown__item_letter-spacing label").on("click", function (a) {
// 				a.preventDefault();
// 				g = b(this).data("spacing");
// 				f.letterSpacing = g;
// 				k(f);
// 			});
// 		})();
// 		("use strict");
// 		var n = null;
// 		r();
// 	})(g);
// });
