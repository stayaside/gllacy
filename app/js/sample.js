! function () {
    function a() {
        e = new ymaps.Map("map", {
            center: [59.938429885190054, 30.32991749740603],
            zoom: [16],
            controls: []
        }), e.behaviors.disable("scrollZoom"), e.controls.add("zoomControl"), myPlacemark = new ymaps.Placemark([59.93866675783276, 30.32307250000002], {
            hintContent: "г. Санкт-Петербург, ул. Б. Конюшенная, д. 19/8"
        }, {
            iconLayout: "default#image",
            iconImageHref: "./img/img_map-pin.png",
            iconImageSize: [218, 142],
            iconImageOffset: [-38, -125]
        }), e.geoObjects.add(myPlacemark)
    }
    ymaps.ready(a);
    var e, o = document.querySelector(".open-modal"),
        t = document.querySelector(".modal-contact"),
        c = t.querySelector(".modal-contact__close"),
        l = document.querySelector(".overlay");
    if (t) {
        var n = t.querySelector(".modal-contact__form"),
            r = t.querySelector("[name=name]"),
            s = t.querySelector("[name=email]"),
            m = t.querySelector("[name=text]"),
            i = localStorage.getItem("nameContact"),
            v = localStorage.getItem("emailContact");
        o.addEventListener("click", function (e) {
            e.preventDefault(), t.classList.add("modal-contact--show"), l.classList.add("overlay--show"), i && !v ? (r.value = i, s.focus()) : i && v ? (r.value = i, s.value = v, m.focus()) : r.focus()
        }), n.addEventListener("submit", function (e) {
            (r.value || s.value || m.value) && (localStorage.setItem("nameContact", r.value), localStorage.setItem("emailContact", s.value))
        }), c.addEventListener("click", function (e) {
            e.preventDefault(), t.classList.remove("modal-contact--show"), l.classList.remove("overlay--show")
        }), l.addEventListener("click", function (e) {
            t.classList.remove("modal-contact--show"), l.classList.remove("overlay--show")
        }), window.addEventListener("keydown", function (e) {
            27 === e.keyCode && t.classList.contains("modal-contact--show") && (t.classList.remove("modal-contact--show"), l.classList.remove("overlay--show"))
        })
    }
}();