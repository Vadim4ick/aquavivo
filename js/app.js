(() => {
  "use strict";
  const e = {};
  let t = (e, t = 500, s = 0) => {
      e.classList.contains("_slide") ||
        (e.classList.add("_slide"),
        (e.style.transitionProperty = "height, margin, padding"),
        (e.style.transitionDuration = t + "ms"),
        (e.style.height = `${e.offsetHeight}px`),
        e.offsetHeight,
        (e.style.overflow = "hidden"),
        (e.style.height = s ? `${s}px` : "0px"),
        (e.style.paddingTop = 0),
        (e.style.paddingBottom = 0),
        (e.style.marginTop = 0),
        (e.style.marginBottom = 0),
        window.setTimeout(() => {
          (e.hidden = !s),
            !s && e.style.removeProperty("height"),
            e.style.removeProperty("padding-top"),
            e.style.removeProperty("padding-bottom"),
            e.style.removeProperty("margin-top"),
            e.style.removeProperty("margin-bottom"),
            !s && e.style.removeProperty("overflow"),
            e.style.removeProperty("transition-duration"),
            e.style.removeProperty("transition-property"),
            e.classList.remove("_slide"),
            document.dispatchEvent(
              new CustomEvent("slideUpDone", { detail: { target: e } })
            );
        }, t));
    },
    s = (e, t = 500, s = 0) => {
      if (!e.classList.contains("_slide")) {
        e.classList.add("_slide"),
          (e.hidden = !e.hidden && null),
          s && e.style.removeProperty("height");
        let a = e.offsetHeight;
        (e.style.overflow = "hidden"),
          (e.style.height = s ? `${s}px` : "0px"),
          (e.style.paddingTop = 0),
          (e.style.paddingBottom = 0),
          (e.style.marginTop = 0),
          (e.style.marginBottom = 0),
          e.offsetHeight,
          (e.style.transitionProperty = "height, margin, padding"),
          (e.style.transitionDuration = t + "ms"),
          (e.style.height = a + "px"),
          e.style.removeProperty("padding-top"),
          e.style.removeProperty("padding-bottom"),
          e.style.removeProperty("margin-top"),
          e.style.removeProperty("margin-bottom"),
          window.setTimeout(() => {
            e.style.removeProperty("height"),
              e.style.removeProperty("overflow"),
              e.style.removeProperty("transition-duration"),
              e.style.removeProperty("transition-property"),
              e.classList.remove("_slide"),
              document.dispatchEvent(
                new CustomEvent("slideDownDone", { detail: { target: e } })
              );
          }, t);
      }
    },
    a = (e, a = 500) => (e.hidden ? s(e, a) : t(e, a)),
    n = !0,
    i = (e = 500) => {
      let t = document.querySelector("body");
      if (n) {
        let s = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let e = 0; e < s.length; e++) {
            s[e].style.paddingRight = "0px";
          }
          (t.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, e),
          (n = !1),
          setTimeout(function () {
            n = !0;
          }, e);
      }
    },
    l = (e = 500) => {
      let t = document.querySelector("body");
      if (n) {
        let s = document.querySelectorAll("[data-lp]");
        for (let e = 0; e < s.length; e++) {
          s[e].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (t.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (n = !1),
          setTimeout(function () {
            n = !0;
          }, e);
      }
    };
  function r(e) {
    setTimeout(() => {
      window.FLS && console.log(e);
    }, 0);
  }
  function o(e) {
    return e.filter(function (e, t, s) {
      return s.indexOf(e) === t;
    });
  }
  function c(e, t) {
    const s = Array.from(e).filter(function (e, s, a) {
      if (e.dataset[t]) return e.dataset[t].split(",")[0];
    });
    if (s.length) {
      const e = [];
      s.forEach((s) => {
        const a = {},
          n = s.dataset[t].split(",");
        (a.value = n[0]),
          (a.type = n[1] ? n[1].trim() : "max"),
          (a.item = s),
          e.push(a);
      });
      let a = e.map(function (e) {
        return (
          "(" + e.type + "-width: " + e.value + "px)," + e.value + "," + e.type
        );
      });
      a = o(a);
      const n = [];
      if (a.length)
        return (
          a.forEach((t) => {
            const s = t.split(","),
              a = s[1],
              i = s[2],
              l = window.matchMedia(s[0]),
              r = e.filter(function (e) {
                if (e.value === a && e.type === i) return !0;
              });
            n.push({ itemsArray: r, matchMedia: l });
          }),
          n
        );
    }
  }
  let d = {
    getErrors(e) {
      let t = 0,
        s = e.querySelectorAll("*[data-required]");
      return (
        s.length &&
          s.forEach((e) => {
            (null === e.offsetParent && "SELECT" !== e.tagName) ||
              e.disabled ||
              (t += this.validateInput(e));
          }),
        t
      );
    },
    validateInput(e) {
      let t = 0;
      return (
        "email" === e.dataset.required
          ? ((e.value = e.value.replace(" ", "")),
            this.emailTest(e) ? (this.addError(e), t++) : this.removeError(e))
          : ("checkbox" !== e.type || e.checked) && e.value
          ? this.removeError(e)
          : (this.addError(e), t++),
        t
      );
    },
    addError(e) {
      e.classList.add("_form-error"),
        e.parentElement.classList.add("_form-error");
      let t = e.parentElement.querySelector(".form__error");
      t && e.parentElement.removeChild(t),
        e.dataset.error &&
          e.parentElement.insertAdjacentHTML(
            "beforeend",
            `<div class="form__error">${e.dataset.error}</div>`
          );
    },
    removeError(e) {
      e.classList.remove("_form-error"),
        e.parentElement.classList.remove("_form-error"),
        e.parentElement.querySelector(".form__error") &&
          e.parentElement.removeChild(
            e.parentElement.querySelector(".form__error")
          );
    },
    formClean(t) {
      t.reset(),
        setTimeout(() => {
          let s = t.querySelectorAll("input,textarea");
          for (let e = 0; e < s.length; e++) {
            const t = s[e];
            t.parentElement.classList.remove("_form-focus"),
              t.classList.remove("_form-focus"),
              d.removeError(t);
          }
          let a = t.querySelectorAll(".checkbox__input");
          if (a.length > 0)
            for (let e = 0; e < a.length; e++) {
              a[e].checked = !1;
            }
          if (e.select) {
            let s = t.querySelectorAll(".select");
            if (s.length)
              for (let t = 0; t < s.length; t++) {
                const a = s[t].querySelector("select");
                e.select.selectBuild(a);
              }
          }
        }, 0);
    },
    emailTest: (e) =>
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(e.value),
  };
  function p(e) {
    return (
      null !== e &&
      "object" == typeof e &&
      "constructor" in e &&
      e.constructor === Object
    );
  }
  function u(e = {}, t = {}) {
    Object.keys(t).forEach((s) => {
      void 0 === e[s]
        ? (e[s] = t[s])
        : p(t[s]) && p(e[s]) && Object.keys(t[s]).length > 0 && u(e[s], t[s]);
    });
  }
  e.select = new (class {
    constructor(e, t = null) {
      if (
        ((this.config = Object.assign({ init: !0, logging: !0 }, e)),
        (this.selectClasses = {
          classSelect: "select",
          classSelectBody: "select__body",
          classSelectTitle: "select__title",
          classSelectValue: "select__value",
          classSelectLabel: "select__label",
          classSelectInput: "select__input",
          classSelectText: "select__text",
          classSelectLink: "select__link",
          classSelectOptions: "select__options",
          classSelectOptionsScroll: "select__scroll",
          classSelectOption: "select__option",
          classSelectContent: "select__content",
          classSelectRow: "select__row",
          classSelectData: "select__asset",
          classSelectDisabled: "_select-disabled",
          classSelectTag: "_select-tag",
          classSelectOpen: "_select-open",
          classSelectActive: "_select-active",
          classSelectFocus: "_select-focus",
          classSelectMultiple: "_select-multiple",
          classSelectCheckBox: "_select-checkbox",
          classSelectOptionSelected: "_select-selected",
        }),
        (this._this = this),
        this.config.init)
      ) {
        const e = t
          ? document.querySelectorAll(t)
          : document.querySelectorAll("select");
        e.length
          ? (this.selectsInit(e),
            this.setLogging(`Проснулся, построил селектов: (${e.length})`))
          : this.setLogging("Сплю, нет ни одного select zzZZZzZZz");
      }
    }
    getSelectClass(e) {
      return `.${e}`;
    }
    getSelectElement(e, t) {
      return {
        originalSelect: e.querySelector("select"),
        selectElement: e.querySelector(this.getSelectClass(t)),
      };
    }
    selectsInit(e) {
      e.forEach((e, t) => {
        this.selectInit(e, t + 1);
      }),
        document.addEventListener(
          "click",
          function (e) {
            this.selectsActions(e);
          }.bind(this)
        ),
        document.addEventListener(
          "keydown",
          function (e) {
            this.selectsActions(e);
          }.bind(this)
        ),
        document.addEventListener(
          "focusin",
          function (e) {
            this.selectsActions(e);
          }.bind(this)
        ),
        document.addEventListener(
          "focusout",
          function (e) {
            this.selectsActions(e);
          }.bind(this)
        );
    }
    selectInit(e, t) {
      const s = this;
      let a = document.createElement("div");
      if (
        (a.classList.add(this.selectClasses.classSelect),
        e.parentNode.insertBefore(a, e),
        a.appendChild(e),
        (e.hidden = !0),
        t && (e.dataset.id = t),
        a.insertAdjacentHTML(
          "beforeend",
          `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`
        ),
        this.selectBuild(e),
        this.getSelectPlaceholder(e) &&
          ((e.dataset.placeholder = this.getSelectPlaceholder(e).value),
          this.getSelectPlaceholder(e).label.show))
      ) {
        this.getSelectElement(
          a,
          this.selectClasses.classSelectTitle
        ).selectElement.insertAdjacentHTML(
          "afterbegin",
          `<span class="${this.selectClasses.classSelectLabel}">${
            this.getSelectPlaceholder(e).label.text
              ? this.getSelectPlaceholder(e).label.text
              : this.getSelectPlaceholder(e).value
          }</span>`
        );
      }
      (e.dataset.speed = e.dataset.speed ? e.dataset.speed : "150"),
        e.addEventListener("change", function (e) {
          s.selectChange(e);
        });
    }
    selectBuild(e) {
      const t = e.parentElement;
      (t.dataset.id = e.dataset.id),
        t.classList.add(
          e.getAttribute("class") ? `select_${e.getAttribute("class")}` : ""
        ),
        e.multiple
          ? t.classList.add(this.selectClasses.classSelectMultiple)
          : t.classList.remove(this.selectClasses.classSelectMultiple),
        e.hasAttribute("data-checkbox") && e.multiple
          ? t.classList.add(this.selectClasses.classSelectCheckBox)
          : t.classList.remove(this.selectClasses.classSelectCheckBox),
        this.setSelectTitleValue(t, e),
        this.setOptions(t, e),
        e.hasAttribute("data-search") && this.searchActions(t),
        e.hasAttribute("data-open") && this.selectAction(t),
        this.selectDisabled(t, e);
    }
    selectsActions(e) {
      const t = e.target,
        s = e.type;
      if (
        t.closest(this.getSelectClass(this.selectClasses.classSelect)) ||
        t.closest(this.getSelectClass(this.selectClasses.classSelectTag))
      ) {
        const a = t.closest(".select")
            ? t.closest(".select")
            : document.querySelector(
                `.${this.selectClasses.classSelect}[data-id="${
                  t.closest(
                    this.getSelectClass(this.selectClasses.classSelectTag)
                  ).dataset.selectId
                }"]`
              ),
          n = this.getSelectElement(a).originalSelect;
        if ("click" === s) {
          if (!n.disabled)
            if (
              t.closest(this.getSelectClass(this.selectClasses.classSelectTag))
            ) {
              const e = t.closest(
                  this.getSelectClass(this.selectClasses.classSelectTag)
                ),
                s = document.querySelector(
                  `.${this.selectClasses.classSelect}[data-id="${e.dataset.selectId}"] .select__option[data-value="${e.dataset.value}"]`
                );
              this.optionAction(a, n, s);
            } else if (
              t.closest(
                this.getSelectClass(this.selectClasses.classSelectTitle)
              )
            )
              this.selectAction(a);
            else if (
              t.closest(
                this.getSelectClass(this.selectClasses.classSelectOption)
              )
            ) {
              const e = t.closest(
                this.getSelectClass(this.selectClasses.classSelectOption)
              );
              this.optionAction(a, n, e);
            }
        } else
          "focusin" === s || "focusout" === s
            ? t.closest(this.getSelectClass(this.selectClasses.classSelect)) &&
              ("focusin" === s
                ? a.classList.add(this.selectClasses.classSelectFocus)
                : a.classList.remove(this.selectClasses.classSelectFocus))
            : "keydown" === s && "Escape" === e.code && this.selectsСlose();
      } else this.selectsСlose();
    }
    selectsСlose() {
      const e = document.querySelectorAll(
        `${this.getSelectClass(
          this.selectClasses.classSelect
        )}${this.getSelectClass(this.selectClasses.classSelectOpen)}`
      );
      e.length &&
        e.forEach((e) => {
          this.selectAction(e);
        });
    }
    selectAction(e) {
      const t = this.getSelectElement(e).originalSelect,
        s = this.getSelectElement(
          e,
          this.selectClasses.classSelectOptions
        ).selectElement;
      s.classList.contains("_slide") ||
        (e.classList.toggle(this.selectClasses.classSelectOpen),
        a(s, t.dataset.speed));
    }
    setSelectTitleValue(e, t) {
      const s = this.getSelectElement(
          e,
          this.selectClasses.classSelectBody
        ).selectElement,
        a = this.getSelectElement(
          e,
          this.selectClasses.classSelectTitle
        ).selectElement;
      a && a.remove(),
        s.insertAdjacentHTML("afterbegin", this.getSelectTitleValue(e, t));
    }
    getSelectTitleValue(e, t) {
      let s = this.getSelectedOptionsData(t, 2).html;
      if (
        (t.multiple &&
          t.hasAttribute("data-tags") &&
          ((s = this.getSelectedOptionsData(t)
            .elements.map(
              (t) =>
                `<span role="button" data-select-id="${
                  e.dataset.id
                }" data-value="${
                  t.value
                }" class="_select-tag">${this.getSelectElementContent(
                  t
                )}</span>`
            )
            .join("")),
          t.dataset.tags &&
            document.querySelector(t.dataset.tags) &&
            ((document.querySelector(t.dataset.tags).innerHTML = s),
            t.hasAttribute("data-search") && (s = !1))),
        (s = s.length ? s : t.dataset.placeholder),
        this.getSelectedOptionsData(t).values.length
          ? e.classList.add(this.selectClasses.classSelectActive)
          : e.classList.remove(this.selectClasses.classSelectActive),
        t.hasAttribute("data-search"))
      )
        return `<div class="${this.selectClasses.classSelectTitle}"><span class="${this.selectClasses.classSelectValue}"><input autocomplete="off" type="text" placeholder="${s}" data-placeholder="${s}" class="${this.selectClasses.classSelectInput}"></span></div>`;
      {
        const e =
          this.getSelectedOptionsData(t).elements.length &&
          this.getSelectedOptionsData(t).elements[0].dataset.class
            ? ` ${this.getSelectedOptionsData(t).elements[0].dataset.class}`
            : "";
        return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span class="${this.selectClasses.classSelectValue}"><span class="${this.selectClasses.classSelectContent}${e}">${s}</span></span></button>`;
      }
    }
    getSelectElementContent(e) {
      const t = e.dataset.asset ? `${e.dataset.asset}` : "",
        s = t.indexOf("img") >= 0 ? `<img src="${t}" alt="">` : t;
      let a = "";
      return (
        (a += t ? `<span class="${this.selectClasses.classSelectRow}">` : ""),
        (a += t ? `<span class="${this.selectClasses.classSelectData}">` : ""),
        (a += t ? s : ""),
        (a += t ? "</span>" : ""),
        (a += t ? `<span class="${this.selectClasses.classSelectText}">` : ""),
        (a += e.textContent),
        (a += t ? "</span>" : ""),
        (a += t ? "</span>" : ""),
        a
      );
    }
    getSelectPlaceholder(e) {
      const t = Array.from(e.options).find((e) => !e.value);
      if (t)
        return {
          value: t.textContent,
          show: t.hasAttribute("data-show"),
          label: { show: t.hasAttribute("data-label"), text: t.dataset.label },
        };
    }
    getSelectedOptionsData(e, t) {
      let s = [];
      return (
        e.multiple
          ? (s = Array.from(e.options)
              .filter((e) => e.value)
              .filter((e) => e.selected))
          : s.push(e.options[e.selectedIndex]),
        {
          elements: s.map((e) => e),
          values: s.filter((e) => e.value).map((e) => e.value),
          html: s.map((e) => this.getSelectElementContent(e)),
        }
      );
    }
    getOptions(e) {
      let t = e.hasAttribute("data-scroll") ? "data-simplebar" : "",
        s = e.dataset.scroll ? `style="max-height:${e.dataset.scroll}px"` : "",
        a = Array.from(e.options);
      if (a.length > 0) {
        let n = "";
        return (
          ((this.getSelectPlaceholder(e) &&
            !this.getSelectPlaceholder(e).show) ||
            e.multiple) &&
            (a = a.filter((e) => e.value)),
          (n += t
            ? `<div ${t} ${s} class="${this.selectClasses.classSelectOptionsScroll}">`
            : ""),
          a.forEach((t) => {
            n += this.getOption(t, e);
          }),
          (n += t ? "</div>" : ""),
          n
        );
      }
    }
    getOption(e, t) {
      const s =
          e.selected && t.multiple
            ? ` ${this.selectClasses.classSelectOptionSelected}`
            : "",
        a = e.selected && !t.hasAttribute("data-show-selected") ? "hidden" : "",
        n = e.dataset.class ? ` ${e.dataset.class}` : "",
        i = !!e.dataset.href && e.dataset.href,
        l = e.hasAttribute("data-href-blank") ? 'target="_blank"' : "";
      let r = "";
      return (
        (r += i
          ? `<a ${l} ${a} href="${i}" data-value="${e.value}" class="${this.selectClasses.classSelectOption}${n}${s}">`
          : `<button ${a} class="${this.selectClasses.classSelectOption}${n}${s}" data-value="${e.value}" type="button">`),
        (r += this.getSelectElementContent(e)),
        (r += i ? "</a>" : "</button>"),
        r
      );
    }
    setOptions(e, t) {
      this.getSelectElement(
        e,
        this.selectClasses.classSelectOptions
      ).selectElement.innerHTML = this.getOptions(t);
    }
    optionAction(e, t, s) {
      if (t.multiple) {
        s.classList.toggle(this.selectClasses.classSelectOptionSelected);
        this.getSelectedOptionsData(t).elements.forEach((e) => {
          e.removeAttribute("selected");
        });
        e.querySelectorAll(
          this.getSelectClass(this.selectClasses.classSelectOptionSelected)
        ).forEach((e) => {
          t.querySelector(`option[value="${e.dataset.value}"]`).setAttribute(
            "selected",
            "selected"
          );
        });
      } else
        t.hasAttribute("data-show-selected") ||
          (e.querySelector(
            `${this.getSelectClass(
              this.selectClasses.classSelectOption
            )}[hidden]`
          ) &&
            (e.querySelector(
              `${this.getSelectClass(
                this.selectClasses.classSelectOption
              )}[hidden]`
            ).hidden = !1),
          (s.hidden = !0)),
          (t.value = s.hasAttribute("data-value")
            ? s.dataset.value
            : s.textContent),
          this.selectAction(e);
      this.setSelectTitleValue(e, t), this.setSelectChange(t);
    }
    selectChange(e) {
      const t = e.target;
      this.selectBuild(t), this.setSelectChange(t);
    }
    setSelectChange(e) {
      if (
        (e.hasAttribute("data-validate") && d.validateInput(e),
        e.hasAttribute("data-submit") && e.value)
      ) {
        let t = document.createElement("button");
        (t.type = "submit"), e.closest("form").append(t), t.click(), t.remove();
      }
      const t = e.parentElement;
      this.selectCallback(t, e);
    }
    selectDisabled(e, t) {
      t.disabled
        ? (e.classList.add(this.selectClasses.classSelectDisabled),
          (this.getSelectElement(
            e,
            this.selectClasses.classSelectTitle
          ).selectElement.disabled = !0))
        : (e.classList.remove(this.selectClasses.classSelectDisabled),
          (this.getSelectElement(
            e,
            this.selectClasses.classSelectTitle
          ).selectElement.disabled = !1));
    }
    searchActions(e) {
      this.getSelectElement(e).originalSelect;
      const t = this.getSelectElement(
          e,
          this.selectClasses.classSelectInput
        ).selectElement,
        s = this.getSelectElement(
          e,
          this.selectClasses.classSelectOptions
        ).selectElement,
        a = s.querySelectorAll(`.${this.selectClasses.classSelectOption}`),
        n = this;
      t.addEventListener("input", function () {
        a.forEach((e) => {
          e.textContent.toUpperCase().indexOf(t.value.toUpperCase()) >= 0
            ? (e.hidden = !1)
            : (e.hidden = !0);
        }),
          !0 === s.hidden && n.selectAction(e);
      });
    }
    selectCallback(e, t) {
      document.dispatchEvent(
        new CustomEvent("selectCallback", { detail: { select: t } })
      );
    }
    setLogging(e) {
      this.config.logging && r(`[select]: ${e}`);
    }
  })({});
  const h = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: { blur() {}, nodeName: "" },
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    createEvent: () => ({ initEvent() {} }),
    createElement: () => ({
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName: () => [],
    }),
    createElementNS: () => ({}),
    importNode: () => null,
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
  };
  function m() {
    const e = "undefined" != typeof document ? document : {};
    return u(e, h), e;
  }
  const g = {
    document: h,
    navigator: { userAgent: "" },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
    history: { replaceState() {}, pushState() {}, go() {}, back() {} },
    CustomEvent: function () {
      return this;
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle: () => ({ getPropertyValue: () => "" }),
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia: () => ({}),
    requestAnimationFrame: (e) =>
      "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
    cancelAnimationFrame(e) {
      "undefined" != typeof setTimeout && clearTimeout(e);
    },
  };
  function f() {
    const e = "undefined" != typeof window ? window : {};
    return u(e, g), e;
  }
  class v extends Array {
    constructor(e) {
      "number" == typeof e
        ? super(e)
        : (super(...(e || [])),
          (function (e) {
            const t = e.__proto__;
            Object.defineProperty(e, "__proto__", {
              get: () => t,
              set(e) {
                t.__proto__ = e;
              },
            });
          })(this));
    }
  }
  function b(e = []) {
    const t = [];
    return (
      e.forEach((e) => {
        Array.isArray(e) ? t.push(...b(e)) : t.push(e);
      }),
      t
    );
  }
  function y(e, t) {
    return Array.prototype.filter.call(e, t);
  }
  function S(e, t) {
    const s = f(),
      a = m();
    let n = [];
    if (!t && e instanceof v) return e;
    if (!e) return new v(n);
    if ("string" == typeof e) {
      const s = e.trim();
      if (s.indexOf("<") >= 0 && s.indexOf(">") >= 0) {
        let e = "div";
        0 === s.indexOf("<li") && (e = "ul"),
          0 === s.indexOf("<tr") && (e = "tbody"),
          (0 !== s.indexOf("<td") && 0 !== s.indexOf("<th")) || (e = "tr"),
          0 === s.indexOf("<tbody") && (e = "table"),
          0 === s.indexOf("<option") && (e = "select");
        const t = a.createElement(e);
        t.innerHTML = s;
        for (let e = 0; e < t.childNodes.length; e += 1)
          n.push(t.childNodes[e]);
      } else
        n = (function (e, t) {
          if ("string" != typeof e) return [e];
          const s = [],
            a = t.querySelectorAll(e);
          for (let e = 0; e < a.length; e += 1) s.push(a[e]);
          return s;
        })(e.trim(), t || a);
    } else if (e.nodeType || e === s || e === a) n.push(e);
    else if (Array.isArray(e)) {
      if (e instanceof v) return e;
      n = e;
    }
    return new v(
      (function (e) {
        const t = [];
        for (let s = 0; s < e.length; s += 1)
          -1 === t.indexOf(e[s]) && t.push(e[s]);
        return t;
      })(n)
    );
  }
  S.fn = v.prototype;
  const _ = "resize scroll".split(" ");
  function w(e) {
    return function (...t) {
      if (void 0 === t[0]) {
        for (let t = 0; t < this.length; t += 1)
          _.indexOf(e) < 0 &&
            (e in this[t] ? this[t][e]() : S(this[t]).trigger(e));
        return this;
      }
      return this.on(e, ...t);
    };
  }
  w("click"),
    w("blur"),
    w("focus"),
    w("focusin"),
    w("focusout"),
    w("keyup"),
    w("keydown"),
    w("keypress"),
    w("submit"),
    w("change"),
    w("mousedown"),
    w("mousemove"),
    w("mouseup"),
    w("mouseenter"),
    w("mouseleave"),
    w("mouseout"),
    w("mouseover"),
    w("touchstart"),
    w("touchend"),
    w("touchmove"),
    w("resize"),
    w("scroll");
  const C = {
    addClass: function (...e) {
      const t = b(e.map((e) => e.split(" ")));
      return (
        this.forEach((e) => {
          e.classList.add(...t);
        }),
        this
      );
    },
    removeClass: function (...e) {
      const t = b(e.map((e) => e.split(" ")));
      return (
        this.forEach((e) => {
          e.classList.remove(...t);
        }),
        this
      );
    },
    hasClass: function (...e) {
      const t = b(e.map((e) => e.split(" ")));
      return (
        y(this, (e) => t.filter((t) => e.classList.contains(t)).length > 0)
          .length > 0
      );
    },
    toggleClass: function (...e) {
      const t = b(e.map((e) => e.split(" ")));
      this.forEach((e) => {
        t.forEach((t) => {
          e.classList.toggle(t);
        });
      });
    },
    attr: function (e, t) {
      if (1 === arguments.length && "string" == typeof e)
        return this[0] ? this[0].getAttribute(e) : void 0;
      for (let s = 0; s < this.length; s += 1)
        if (2 === arguments.length) this[s].setAttribute(e, t);
        else
          for (const t in e) (this[s][t] = e[t]), this[s].setAttribute(t, e[t]);
      return this;
    },
    removeAttr: function (e) {
      for (let t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
      return this;
    },
    transform: function (e) {
      for (let t = 0; t < this.length; t += 1) this[t].style.transform = e;
      return this;
    },
    transition: function (e) {
      for (let t = 0; t < this.length; t += 1)
        this[t].style.transitionDuration = "string" != typeof e ? `${e}ms` : e;
      return this;
    },
    on: function (...e) {
      let [t, s, a, n] = e;
      function i(e) {
        const t = e.target;
        if (!t) return;
        const n = e.target.dom7EventData || [];
        if ((n.indexOf(e) < 0 && n.unshift(e), S(t).is(s))) a.apply(t, n);
        else {
          const e = S(t).parents();
          for (let t = 0; t < e.length; t += 1)
            S(e[t]).is(s) && a.apply(e[t], n);
        }
      }
      function l(e) {
        const t = (e && e.target && e.target.dom7EventData) || [];
        t.indexOf(e) < 0 && t.unshift(e), a.apply(this, t);
      }
      "function" == typeof e[1] && (([t, a, n] = e), (s = void 0)),
        n || (n = !1);
      const r = t.split(" ");
      let o;
      for (let e = 0; e < this.length; e += 1) {
        const t = this[e];
        if (s)
          for (o = 0; o < r.length; o += 1) {
            const e = r[o];
            t.dom7LiveListeners || (t.dom7LiveListeners = {}),
              t.dom7LiveListeners[e] || (t.dom7LiveListeners[e] = []),
              t.dom7LiveListeners[e].push({ listener: a, proxyListener: i }),
              t.addEventListener(e, i, n);
          }
        else
          for (o = 0; o < r.length; o += 1) {
            const e = r[o];
            t.dom7Listeners || (t.dom7Listeners = {}),
              t.dom7Listeners[e] || (t.dom7Listeners[e] = []),
              t.dom7Listeners[e].push({ listener: a, proxyListener: l }),
              t.addEventListener(e, l, n);
          }
      }
      return this;
    },
    off: function (...e) {
      let [t, s, a, n] = e;
      "function" == typeof e[1] && (([t, a, n] = e), (s = void 0)),
        n || (n = !1);
      const i = t.split(" ");
      for (let e = 0; e < i.length; e += 1) {
        const t = i[e];
        for (let e = 0; e < this.length; e += 1) {
          const i = this[e];
          let l;
          if (
            (!s && i.dom7Listeners
              ? (l = i.dom7Listeners[t])
              : s && i.dom7LiveListeners && (l = i.dom7LiveListeners[t]),
            l && l.length)
          )
            for (let e = l.length - 1; e >= 0; e -= 1) {
              const s = l[e];
              (a && s.listener === a) ||
              (a &&
                s.listener &&
                s.listener.dom7proxy &&
                s.listener.dom7proxy === a)
                ? (i.removeEventListener(t, s.proxyListener, n), l.splice(e, 1))
                : a ||
                  (i.removeEventListener(t, s.proxyListener, n),
                  l.splice(e, 1));
            }
        }
      }
      return this;
    },
    trigger: function (...e) {
      const t = f(),
        s = e[0].split(" "),
        a = e[1];
      for (let n = 0; n < s.length; n += 1) {
        const i = s[n];
        for (let s = 0; s < this.length; s += 1) {
          const n = this[s];
          if (t.CustomEvent) {
            const s = new t.CustomEvent(i, {
              detail: a,
              bubbles: !0,
              cancelable: !0,
            });
            (n.dom7EventData = e.filter((e, t) => t > 0)),
              n.dispatchEvent(s),
              (n.dom7EventData = []),
              delete n.dom7EventData;
          }
        }
      }
      return this;
    },
    transitionEnd: function (e) {
      const t = this;
      return (
        e &&
          t.on("transitionend", function s(a) {
            a.target === this && (e.call(this, a), t.off("transitionend", s));
          }),
        this
      );
    },
    outerWidth: function (e) {
      if (this.length > 0) {
        if (e) {
          const e = this.styles();
          return (
            this[0].offsetWidth +
            parseFloat(e.getPropertyValue("margin-right")) +
            parseFloat(e.getPropertyValue("margin-left"))
          );
        }
        return this[0].offsetWidth;
      }
      return null;
    },
    outerHeight: function (e) {
      if (this.length > 0) {
        if (e) {
          const e = this.styles();
          return (
            this[0].offsetHeight +
            parseFloat(e.getPropertyValue("margin-top")) +
            parseFloat(e.getPropertyValue("margin-bottom"))
          );
        }
        return this[0].offsetHeight;
      }
      return null;
    },
    styles: function () {
      const e = f();
      return this[0] ? e.getComputedStyle(this[0], null) : {};
    },
    offset: function () {
      if (this.length > 0) {
        const e = f(),
          t = m(),
          s = this[0],
          a = s.getBoundingClientRect(),
          n = t.body,
          i = s.clientTop || n.clientTop || 0,
          l = s.clientLeft || n.clientLeft || 0,
          r = s === e ? e.scrollY : s.scrollTop,
          o = s === e ? e.scrollX : s.scrollLeft;
        return { top: a.top + r - i, left: a.left + o - l };
      }
      return null;
    },
    css: function (e, t) {
      const s = f();
      let a;
      if (1 === arguments.length) {
        if ("string" != typeof e) {
          for (a = 0; a < this.length; a += 1)
            for (const t in e) this[a].style[t] = e[t];
          return this;
        }
        if (this[0])
          return s.getComputedStyle(this[0], null).getPropertyValue(e);
      }
      if (2 === arguments.length && "string" == typeof e) {
        for (a = 0; a < this.length; a += 1) this[a].style[e] = t;
        return this;
      }
      return this;
    },
    each: function (e) {
      return e
        ? (this.forEach((t, s) => {
            e.apply(t, [t, s]);
          }),
          this)
        : this;
    },
    html: function (e) {
      if (void 0 === e) return this[0] ? this[0].innerHTML : null;
      for (let t = 0; t < this.length; t += 1) this[t].innerHTML = e;
      return this;
    },
    text: function (e) {
      if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
      for (let t = 0; t < this.length; t += 1) this[t].textContent = e;
      return this;
    },
    is: function (e) {
      const t = f(),
        s = m(),
        a = this[0];
      let n, i;
      if (!a || void 0 === e) return !1;
      if ("string" == typeof e) {
        if (a.matches) return a.matches(e);
        if (a.webkitMatchesSelector) return a.webkitMatchesSelector(e);
        if (a.msMatchesSelector) return a.msMatchesSelector(e);
        for (n = S(e), i = 0; i < n.length; i += 1) if (n[i] === a) return !0;
        return !1;
      }
      if (e === s) return a === s;
      if (e === t) return a === t;
      if (e.nodeType || e instanceof v) {
        for (n = e.nodeType ? [e] : e, i = 0; i < n.length; i += 1)
          if (n[i] === a) return !0;
        return !1;
      }
      return !1;
    },
    index: function () {
      let e,
        t = this[0];
      if (t) {
        for (e = 0; null !== (t = t.previousSibling); )
          1 === t.nodeType && (e += 1);
        return e;
      }
    },
    eq: function (e) {
      if (void 0 === e) return this;
      const t = this.length;
      if (e > t - 1) return S([]);
      if (e < 0) {
        const s = t + e;
        return S(s < 0 ? [] : [this[s]]);
      }
      return S([this[e]]);
    },
    append: function (...e) {
      let t;
      const s = m();
      for (let a = 0; a < e.length; a += 1) {
        t = e[a];
        for (let e = 0; e < this.length; e += 1)
          if ("string" == typeof t) {
            const a = s.createElement("div");
            for (a.innerHTML = t; a.firstChild; )
              this[e].appendChild(a.firstChild);
          } else if (t instanceof v)
            for (let s = 0; s < t.length; s += 1) this[e].appendChild(t[s]);
          else this[e].appendChild(t);
      }
      return this;
    },
    prepend: function (e) {
      const t = m();
      let s, a;
      for (s = 0; s < this.length; s += 1)
        if ("string" == typeof e) {
          const n = t.createElement("div");
          for (n.innerHTML = e, a = n.childNodes.length - 1; a >= 0; a -= 1)
            this[s].insertBefore(n.childNodes[a], this[s].childNodes[0]);
        } else if (e instanceof v)
          for (a = 0; a < e.length; a += 1)
            this[s].insertBefore(e[a], this[s].childNodes[0]);
        else this[s].insertBefore(e, this[s].childNodes[0]);
      return this;
    },
    next: function (e) {
      return this.length > 0
        ? e
          ? this[0].nextElementSibling && S(this[0].nextElementSibling).is(e)
            ? S([this[0].nextElementSibling])
            : S([])
          : this[0].nextElementSibling
          ? S([this[0].nextElementSibling])
          : S([])
        : S([]);
    },
    nextAll: function (e) {
      const t = [];
      let s = this[0];
      if (!s) return S([]);
      for (; s.nextElementSibling; ) {
        const a = s.nextElementSibling;
        e ? S(a).is(e) && t.push(a) : t.push(a), (s = a);
      }
      return S(t);
    },
    prev: function (e) {
      if (this.length > 0) {
        const t = this[0];
        return e
          ? t.previousElementSibling && S(t.previousElementSibling).is(e)
            ? S([t.previousElementSibling])
            : S([])
          : t.previousElementSibling
          ? S([t.previousElementSibling])
          : S([]);
      }
      return S([]);
    },
    prevAll: function (e) {
      const t = [];
      let s = this[0];
      if (!s) return S([]);
      for (; s.previousElementSibling; ) {
        const a = s.previousElementSibling;
        e ? S(a).is(e) && t.push(a) : t.push(a), (s = a);
      }
      return S(t);
    },
    parent: function (e) {
      const t = [];
      for (let s = 0; s < this.length; s += 1)
        null !== this[s].parentNode &&
          (e
            ? S(this[s].parentNode).is(e) && t.push(this[s].parentNode)
            : t.push(this[s].parentNode));
      return S(t);
    },
    parents: function (e) {
      const t = [];
      for (let s = 0; s < this.length; s += 1) {
        let a = this[s].parentNode;
        for (; a; ) e ? S(a).is(e) && t.push(a) : t.push(a), (a = a.parentNode);
      }
      return S(t);
    },
    closest: function (e) {
      let t = this;
      return void 0 === e ? S([]) : (t.is(e) || (t = t.parents(e).eq(0)), t);
    },
    find: function (e) {
      const t = [];
      for (let s = 0; s < this.length; s += 1) {
        const a = this[s].querySelectorAll(e);
        for (let e = 0; e < a.length; e += 1) t.push(a[e]);
      }
      return S(t);
    },
    children: function (e) {
      const t = [];
      for (let s = 0; s < this.length; s += 1) {
        const a = this[s].children;
        for (let s = 0; s < a.length; s += 1)
          (e && !S(a[s]).is(e)) || t.push(a[s]);
      }
      return S(t);
    },
    filter: function (e) {
      return S(y(this, e));
    },
    remove: function () {
      for (let e = 0; e < this.length; e += 1)
        this[e].parentNode && this[e].parentNode.removeChild(this[e]);
      return this;
    },
  };
  Object.keys(C).forEach((e) => {
    Object.defineProperty(S.fn, e, { value: C[e], writable: !0 });
  });
  const E = S;
  function k(e, t) {
    return void 0 === t && (t = 0), setTimeout(e, t);
  }
  function T() {
    return Date.now();
  }
  function x(e, t) {
    void 0 === t && (t = "x");
    const s = f();
    let a, n, i;
    const l = (function (e) {
      const t = f();
      let s;
      return (
        t.getComputedStyle && (s = t.getComputedStyle(e, null)),
        !s && e.currentStyle && (s = e.currentStyle),
        s || (s = e.style),
        s
      );
    })(e);
    return (
      s.WebKitCSSMatrix
        ? ((n = l.transform || l.webkitTransform),
          n.split(",").length > 6 &&
            (n = n
              .split(", ")
              .map((e) => e.replace(",", "."))
              .join(", ")),
          (i = new s.WebKitCSSMatrix("none" === n ? "" : n)))
        : ((i =
            l.MozTransform ||
            l.OTransform ||
            l.MsTransform ||
            l.msTransform ||
            l.transform ||
            l
              .getPropertyValue("transform")
              .replace("translate(", "matrix(1, 0, 0, 1,")),
          (a = i.toString().split(","))),
      "x" === t &&
        (n = s.WebKitCSSMatrix
          ? i.m41
          : 16 === a.length
          ? parseFloat(a[12])
          : parseFloat(a[4])),
      "y" === t &&
        (n = s.WebKitCSSMatrix
          ? i.m42
          : 16 === a.length
          ? parseFloat(a[13])
          : parseFloat(a[5])),
      n || 0
    );
  }
  function L(e) {
    return (
      "object" == typeof e &&
      null !== e &&
      e.constructor &&
      "Object" === Object.prototype.toString.call(e).slice(8, -1)
    );
  }
  function $(e) {
    return "undefined" != typeof window && void 0 !== window.HTMLElement
      ? e instanceof HTMLElement
      : e && (1 === e.nodeType || 11 === e.nodeType);
  }
  function A() {
    const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
      t = ["__proto__", "constructor", "prototype"];
    for (let s = 1; s < arguments.length; s += 1) {
      const a = s < 0 || arguments.length <= s ? void 0 : arguments[s];
      if (null != a && !$(a)) {
        const s = Object.keys(Object(a)).filter((e) => t.indexOf(e) < 0);
        for (let t = 0, n = s.length; t < n; t += 1) {
          const n = s[t],
            i = Object.getOwnPropertyDescriptor(a, n);
          void 0 !== i &&
            i.enumerable &&
            (L(e[n]) && L(a[n])
              ? a[n].__swiper__
                ? (e[n] = a[n])
                : A(e[n], a[n])
              : !L(e[n]) && L(a[n])
              ? ((e[n] = {}), a[n].__swiper__ ? (e[n] = a[n]) : A(e[n], a[n]))
              : (e[n] = a[n]));
        }
      }
    }
    return e;
  }
  function M(e, t, s) {
    e.style.setProperty(t, s);
  }
  function P(e) {
    let { swiper: t, targetPosition: s, side: a } = e;
    const n = f(),
      i = -t.translate;
    let l,
      r = null;
    const o = t.params.speed;
    (t.wrapperEl.style.scrollSnapType = "none"),
      n.cancelAnimationFrame(t.cssModeFrameID);
    const c = s > i ? "next" : "prev",
      d = (e, t) => ("next" === c && e >= t) || ("prev" === c && e <= t),
      p = () => {
        (l = new Date().getTime()), null === r && (r = l);
        const e = Math.max(Math.min((l - r) / o, 1), 0),
          c = 0.5 - Math.cos(e * Math.PI) / 2;
        let u = i + c * (s - i);
        if ((d(u, s) && (u = s), t.wrapperEl.scrollTo({ [a]: u }), d(u, s)))
          return (
            (t.wrapperEl.style.overflow = "hidden"),
            (t.wrapperEl.style.scrollSnapType = ""),
            setTimeout(() => {
              (t.wrapperEl.style.overflow = ""),
                t.wrapperEl.scrollTo({ [a]: u });
            }),
            void n.cancelAnimationFrame(t.cssModeFrameID)
          );
        t.cssModeFrameID = n.requestAnimationFrame(p);
      };
    p();
  }
  let O, I, q;
  function z() {
    return (
      O ||
        (O = (function () {
          const e = f(),
            t = m();
          return {
            smoothScroll:
              t.documentElement && "scrollBehavior" in t.documentElement.style,
            touch: !!(
              "ontouchstart" in e ||
              (e.DocumentTouch && t instanceof e.DocumentTouch)
            ),
            passiveListener: (function () {
              let t = !1;
              try {
                const s = Object.defineProperty({}, "passive", {
                  get() {
                    t = !0;
                  },
                });
                e.addEventListener("testPassiveListener", null, s);
              } catch (e) {}
              return t;
            })(),
            gestures: "ongesturestart" in e,
          };
        })()),
      O
    );
  }
  function D(e) {
    return (
      void 0 === e && (e = {}),
      I ||
        (I = (function (e) {
          let { userAgent: t } = void 0 === e ? {} : e;
          const s = z(),
            a = f(),
            n = a.navigator.platform,
            i = t || a.navigator.userAgent,
            l = { ios: !1, android: !1 },
            r = a.screen.width,
            o = a.screen.height,
            c = i.match(/(Android);?[\s\/]+([\d.]+)?/);
          let d = i.match(/(iPad).*OS\s([\d_]+)/);
          const p = i.match(/(iPod)(.*OS\s([\d_]+))?/),
            u = !d && i.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
            h = "Win32" === n;
          let m = "MacIntel" === n;
          return (
            !d &&
              m &&
              s.touch &&
              [
                "1024x1366",
                "1366x1024",
                "834x1194",
                "1194x834",
                "834x1112",
                "1112x834",
                "768x1024",
                "1024x768",
                "820x1180",
                "1180x820",
                "810x1080",
                "1080x810",
              ].indexOf(`${r}x${o}`) >= 0 &&
              ((d = i.match(/(Version)\/([\d.]+)/)),
              d || (d = [0, 1, "13_0_0"]),
              (m = !1)),
            c && !h && ((l.os = "android"), (l.android = !0)),
            (d || u || p) && ((l.os = "ios"), (l.ios = !0)),
            l
          );
        })(e)),
      I
    );
  }
  function B() {
    return (
      q ||
        (q = (function () {
          const e = f();
          return {
            isSafari: (function () {
              const t = e.navigator.userAgent.toLowerCase();
              return (
                t.indexOf("safari") >= 0 &&
                t.indexOf("chrome") < 0 &&
                t.indexOf("android") < 0
              );
            })(),
            isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
              e.navigator.userAgent
            ),
          };
        })()),
      q
    );
  }
  const H = {
    on(e, t, s) {
      const a = this;
      if (!a.eventsListeners || a.destroyed) return a;
      if ("function" != typeof t) return a;
      const n = s ? "unshift" : "push";
      return (
        e.split(" ").forEach((e) => {
          a.eventsListeners[e] || (a.eventsListeners[e] = []),
            a.eventsListeners[e][n](t);
        }),
        a
      );
    },
    once(e, t, s) {
      const a = this;
      if (!a.eventsListeners || a.destroyed) return a;
      if ("function" != typeof t) return a;
      function n() {
        a.off(e, n), n.__emitterProxy && delete n.__emitterProxy;
        for (var s = arguments.length, i = new Array(s), l = 0; l < s; l++)
          i[l] = arguments[l];
        t.apply(a, i);
      }
      return (n.__emitterProxy = t), a.on(e, n, s);
    },
    onAny(e, t) {
      const s = this;
      if (!s.eventsListeners || s.destroyed) return s;
      if ("function" != typeof e) return s;
      const a = t ? "unshift" : "push";
      return (
        s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[a](e), s
      );
    },
    offAny(e) {
      const t = this;
      if (!t.eventsListeners || t.destroyed) return t;
      if (!t.eventsAnyListeners) return t;
      const s = t.eventsAnyListeners.indexOf(e);
      return s >= 0 && t.eventsAnyListeners.splice(s, 1), t;
    },
    off(e, t) {
      const s = this;
      return !s.eventsListeners || s.destroyed
        ? s
        : s.eventsListeners
        ? (e.split(" ").forEach((e) => {
            void 0 === t
              ? (s.eventsListeners[e] = [])
              : s.eventsListeners[e] &&
                s.eventsListeners[e].forEach((a, n) => {
                  (a === t || (a.__emitterProxy && a.__emitterProxy === t)) &&
                    s.eventsListeners[e].splice(n, 1);
                });
          }),
          s)
        : s;
    },
    emit() {
      const e = this;
      if (!e.eventsListeners || e.destroyed) return e;
      if (!e.eventsListeners) return e;
      let t, s, a;
      for (var n = arguments.length, i = new Array(n), l = 0; l < n; l++)
        i[l] = arguments[l];
      "string" == typeof i[0] || Array.isArray(i[0])
        ? ((t = i[0]), (s = i.slice(1, i.length)), (a = e))
        : ((t = i[0].events), (s = i[0].data), (a = i[0].context || e)),
        s.unshift(a);
      return (
        (Array.isArray(t) ? t : t.split(" ")).forEach((t) => {
          e.eventsAnyListeners &&
            e.eventsAnyListeners.length &&
            e.eventsAnyListeners.forEach((e) => {
              e.apply(a, [t, ...s]);
            }),
            e.eventsListeners &&
              e.eventsListeners[t] &&
              e.eventsListeners[t].forEach((e) => {
                e.apply(a, s);
              });
        }),
        e
      );
    },
  };
  const N = {
    updateSize: function () {
      const e = this;
      let t, s;
      const a = e.$el;
      (t =
        void 0 !== e.params.width && null !== e.params.width
          ? e.params.width
          : a[0].clientWidth),
        (s =
          void 0 !== e.params.height && null !== e.params.height
            ? e.params.height
            : a[0].clientHeight),
        (0 === t && e.isHorizontal()) ||
          (0 === s && e.isVertical()) ||
          ((t =
            t -
            parseInt(a.css("padding-left") || 0, 10) -
            parseInt(a.css("padding-right") || 0, 10)),
          (s =
            s -
            parseInt(a.css("padding-top") || 0, 10) -
            parseInt(a.css("padding-bottom") || 0, 10)),
          Number.isNaN(t) && (t = 0),
          Number.isNaN(s) && (s = 0),
          Object.assign(e, {
            width: t,
            height: s,
            size: e.isHorizontal() ? t : s,
          }));
    },
    updateSlides: function () {
      const e = this;
      function t(t) {
        return e.isHorizontal()
          ? t
          : {
              width: "height",
              "margin-top": "margin-left",
              "margin-bottom ": "margin-right",
              "margin-left": "margin-top",
              "margin-right": "margin-bottom",
              "padding-left": "padding-top",
              "padding-right": "padding-bottom",
              marginRight: "marginBottom",
            }[t];
      }
      function s(e, s) {
        return parseFloat(e.getPropertyValue(t(s)) || 0);
      }
      const a = e.params,
        { $wrapperEl: n, size: i, rtlTranslate: l, wrongRTL: r } = e,
        o = e.virtual && a.virtual.enabled,
        c = o ? e.virtual.slides.length : e.slides.length,
        d = n.children(`.${e.params.slideClass}`),
        p = o ? e.virtual.slides.length : d.length;
      let u = [];
      const h = [],
        m = [];
      let g = a.slidesOffsetBefore;
      "function" == typeof g && (g = a.slidesOffsetBefore.call(e));
      let f = a.slidesOffsetAfter;
      "function" == typeof f && (f = a.slidesOffsetAfter.call(e));
      const v = e.snapGrid.length,
        b = e.slidesGrid.length;
      let y = a.spaceBetween,
        S = -g,
        _ = 0,
        w = 0;
      if (void 0 === i) return;
      "string" == typeof y &&
        y.indexOf("%") >= 0 &&
        (y = (parseFloat(y.replace("%", "")) / 100) * i),
        (e.virtualSize = -y),
        l
          ? d.css({ marginLeft: "", marginBottom: "", marginTop: "" })
          : d.css({ marginRight: "", marginBottom: "", marginTop: "" }),
        a.centeredSlides &&
          a.cssMode &&
          (M(e.wrapperEl, "--swiper-centered-offset-before", ""),
          M(e.wrapperEl, "--swiper-centered-offset-after", ""));
      const C = a.grid && a.grid.rows > 1 && e.grid;
      let E;
      C && e.grid.initSlides(p);
      const k =
        "auto" === a.slidesPerView &&
        a.breakpoints &&
        Object.keys(a.breakpoints).filter(
          (e) => void 0 !== a.breakpoints[e].slidesPerView
        ).length > 0;
      for (let n = 0; n < p; n += 1) {
        E = 0;
        const l = d.eq(n);
        if (
          (C && e.grid.updateSlide(n, l, p, t), "none" !== l.css("display"))
        ) {
          if ("auto" === a.slidesPerView) {
            k && (d[n].style[t("width")] = "");
            const i = getComputedStyle(l[0]),
              r = l[0].style.transform,
              o = l[0].style.webkitTransform;
            if (
              (r && (l[0].style.transform = "none"),
              o && (l[0].style.webkitTransform = "none"),
              a.roundLengths)
            )
              E = e.isHorizontal() ? l.outerWidth(!0) : l.outerHeight(!0);
            else {
              const e = s(i, "width"),
                t = s(i, "padding-left"),
                a = s(i, "padding-right"),
                n = s(i, "margin-left"),
                r = s(i, "margin-right"),
                o = i.getPropertyValue("box-sizing");
              if (o && "border-box" === o) E = e + n + r;
              else {
                const { clientWidth: s, offsetWidth: i } = l[0];
                E = e + t + a + n + r + (i - s);
              }
            }
            r && (l[0].style.transform = r),
              o && (l[0].style.webkitTransform = o),
              a.roundLengths && (E = Math.floor(E));
          } else
            (E = (i - (a.slidesPerView - 1) * y) / a.slidesPerView),
              a.roundLengths && (E = Math.floor(E)),
              d[n] && (d[n].style[t("width")] = `${E}px`);
          d[n] && (d[n].swiperSlideSize = E),
            m.push(E),
            a.centeredSlides
              ? ((S = S + E / 2 + _ / 2 + y),
                0 === _ && 0 !== n && (S = S - i / 2 - y),
                0 === n && (S = S - i / 2 - y),
                Math.abs(S) < 0.001 && (S = 0),
                a.roundLengths && (S = Math.floor(S)),
                w % a.slidesPerGroup == 0 && u.push(S),
                h.push(S))
              : (a.roundLengths && (S = Math.floor(S)),
                (w - Math.min(e.params.slidesPerGroupSkip, w)) %
                  e.params.slidesPerGroup ==
                  0 && u.push(S),
                h.push(S),
                (S = S + E + y)),
            (e.virtualSize += E + y),
            (_ = E),
            (w += 1);
        }
      }
      if (
        ((e.virtualSize = Math.max(e.virtualSize, i) + f),
        l &&
          r &&
          ("slide" === a.effect || "coverflow" === a.effect) &&
          n.css({ width: `${e.virtualSize + a.spaceBetween}px` }),
        a.setWrapperSize &&
          n.css({ [t("width")]: `${e.virtualSize + a.spaceBetween}px` }),
        C && e.grid.updateWrapperSize(E, u, t),
        !a.centeredSlides)
      ) {
        const t = [];
        for (let s = 0; s < u.length; s += 1) {
          let n = u[s];
          a.roundLengths && (n = Math.floor(n)),
            u[s] <= e.virtualSize - i && t.push(n);
        }
        (u = t),
          Math.floor(e.virtualSize - i) - Math.floor(u[u.length - 1]) > 1 &&
            u.push(e.virtualSize - i);
      }
      if ((0 === u.length && (u = [0]), 0 !== a.spaceBetween)) {
        const s = e.isHorizontal() && l ? "marginLeft" : t("marginRight");
        d.filter((e, t) => !a.cssMode || t !== d.length - 1).css({
          [s]: `${y}px`,
        });
      }
      if (a.centeredSlides && a.centeredSlidesBounds) {
        let e = 0;
        m.forEach((t) => {
          e += t + (a.spaceBetween ? a.spaceBetween : 0);
        }),
          (e -= a.spaceBetween);
        const t = e - i;
        u = u.map((e) => (e < 0 ? -g : e > t ? t + f : e));
      }
      if (a.centerInsufficientSlides) {
        let e = 0;
        if (
          (m.forEach((t) => {
            e += t + (a.spaceBetween ? a.spaceBetween : 0);
          }),
          (e -= a.spaceBetween),
          e < i)
        ) {
          const t = (i - e) / 2;
          u.forEach((e, s) => {
            u[s] = e - t;
          }),
            h.forEach((e, s) => {
              h[s] = e + t;
            });
        }
      }
      if (
        (Object.assign(e, {
          slides: d,
          snapGrid: u,
          slidesGrid: h,
          slidesSizesGrid: m,
        }),
        a.centeredSlides && a.cssMode && !a.centeredSlidesBounds)
      ) {
        M(e.wrapperEl, "--swiper-centered-offset-before", -u[0] + "px"),
          M(
            e.wrapperEl,
            "--swiper-centered-offset-after",
            e.size / 2 - m[m.length - 1] / 2 + "px"
          );
        const t = -e.snapGrid[0],
          s = -e.slidesGrid[0];
        (e.snapGrid = e.snapGrid.map((e) => e + t)),
          (e.slidesGrid = e.slidesGrid.map((e) => e + s));
      }
      if (
        (p !== c && e.emit("slidesLengthChange"),
        u.length !== v &&
          (e.params.watchOverflow && e.checkOverflow(),
          e.emit("snapGridLengthChange")),
        h.length !== b && e.emit("slidesGridLengthChange"),
        a.watchSlidesProgress && e.updateSlidesOffset(),
        !(o || a.cssMode || ("slide" !== a.effect && "fade" !== a.effect)))
      ) {
        const t = `${a.containerModifierClass}backface-hidden`,
          s = e.$el.hasClass(t);
        p <= a.maxBackfaceHiddenSlides
          ? s || e.$el.addClass(t)
          : s && e.$el.removeClass(t);
      }
    },
    updateAutoHeight: function (e) {
      const t = this,
        s = [],
        a = t.virtual && t.params.virtual.enabled;
      let n,
        i = 0;
      "number" == typeof e
        ? t.setTransition(e)
        : !0 === e && t.setTransition(t.params.speed);
      const l = (e) =>
        a
          ? t.slides.filter(
              (t) =>
                parseInt(t.getAttribute("data-swiper-slide-index"), 10) === e
            )[0]
          : t.slides.eq(e)[0];
      if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
        if (t.params.centeredSlides)
          (t.visibleSlides || E([])).each((e) => {
            s.push(e);
          });
        else
          for (n = 0; n < Math.ceil(t.params.slidesPerView); n += 1) {
            const e = t.activeIndex + n;
            if (e > t.slides.length && !a) break;
            s.push(l(e));
          }
      else s.push(l(t.activeIndex));
      for (n = 0; n < s.length; n += 1)
        if (void 0 !== s[n]) {
          const e = s[n].offsetHeight;
          i = e > i ? e : i;
        }
      (i || 0 === i) && t.$wrapperEl.css("height", `${i}px`);
    },
    updateSlidesOffset: function () {
      const e = this,
        t = e.slides;
      for (let s = 0; s < t.length; s += 1)
        t[s].swiperSlideOffset = e.isHorizontal()
          ? t[s].offsetLeft
          : t[s].offsetTop;
    },
    updateSlidesProgress: function (e) {
      void 0 === e && (e = (this && this.translate) || 0);
      const t = this,
        s = t.params,
        { slides: a, rtlTranslate: n, snapGrid: i } = t;
      if (0 === a.length) return;
      void 0 === a[0].swiperSlideOffset && t.updateSlidesOffset();
      let l = -e;
      n && (l = e),
        a.removeClass(s.slideVisibleClass),
        (t.visibleSlidesIndexes = []),
        (t.visibleSlides = []);
      for (let e = 0; e < a.length; e += 1) {
        const r = a[e];
        let o = r.swiperSlideOffset;
        s.cssMode && s.centeredSlides && (o -= a[0].swiperSlideOffset);
        const c =
            (l + (s.centeredSlides ? t.minTranslate() : 0) - o) /
            (r.swiperSlideSize + s.spaceBetween),
          d =
            (l - i[0] + (s.centeredSlides ? t.minTranslate() : 0) - o) /
            (r.swiperSlideSize + s.spaceBetween),
          p = -(l - o),
          u = p + t.slidesSizesGrid[e];
        ((p >= 0 && p < t.size - 1) ||
          (u > 1 && u <= t.size) ||
          (p <= 0 && u >= t.size)) &&
          (t.visibleSlides.push(r),
          t.visibleSlidesIndexes.push(e),
          a.eq(e).addClass(s.slideVisibleClass)),
          (r.progress = n ? -c : c),
          (r.originalProgress = n ? -d : d);
      }
      t.visibleSlides = E(t.visibleSlides);
    },
    updateProgress: function (e) {
      const t = this;
      if (void 0 === e) {
        const s = t.rtlTranslate ? -1 : 1;
        e = (t && t.translate && t.translate * s) || 0;
      }
      const s = t.params,
        a = t.maxTranslate() - t.minTranslate();
      let { progress: n, isBeginning: i, isEnd: l } = t;
      const r = i,
        o = l;
      0 === a
        ? ((n = 0), (i = !0), (l = !0))
        : ((n = (e - t.minTranslate()) / a), (i = n <= 0), (l = n >= 1)),
        Object.assign(t, { progress: n, isBeginning: i, isEnd: l }),
        (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) &&
          t.updateSlidesProgress(e),
        i && !r && t.emit("reachBeginning toEdge"),
        l && !o && t.emit("reachEnd toEdge"),
        ((r && !i) || (o && !l)) && t.emit("fromEdge"),
        t.emit("progress", n);
    },
    updateSlidesClasses: function () {
      const e = this,
        {
          slides: t,
          params: s,
          $wrapperEl: a,
          activeIndex: n,
          realIndex: i,
        } = e,
        l = e.virtual && s.virtual.enabled;
      let r;
      t.removeClass(
        `${s.slideActiveClass} ${s.slideNextClass} ${s.slidePrevClass} ${s.slideDuplicateActiveClass} ${s.slideDuplicateNextClass} ${s.slideDuplicatePrevClass}`
      ),
        (r = l
          ? e.$wrapperEl.find(
              `.${s.slideClass}[data-swiper-slide-index="${n}"]`
            )
          : t.eq(n)),
        r.addClass(s.slideActiveClass),
        s.loop &&
          (r.hasClass(s.slideDuplicateClass)
            ? a
                .children(
                  `.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${i}"]`
                )
                .addClass(s.slideDuplicateActiveClass)
            : a
                .children(
                  `.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${i}"]`
                )
                .addClass(s.slideDuplicateActiveClass));
      let o = r.nextAll(`.${s.slideClass}`).eq(0).addClass(s.slideNextClass);
      s.loop && 0 === o.length && ((o = t.eq(0)), o.addClass(s.slideNextClass));
      let c = r.prevAll(`.${s.slideClass}`).eq(0).addClass(s.slidePrevClass);
      s.loop &&
        0 === c.length &&
        ((c = t.eq(-1)), c.addClass(s.slidePrevClass)),
        s.loop &&
          (o.hasClass(s.slideDuplicateClass)
            ? a
                .children(
                  `.${s.slideClass}:not(.${
                    s.slideDuplicateClass
                  })[data-swiper-slide-index="${o.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(s.slideDuplicateNextClass)
            : a
                .children(
                  `.${s.slideClass}.${
                    s.slideDuplicateClass
                  }[data-swiper-slide-index="${o.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(s.slideDuplicateNextClass),
          c.hasClass(s.slideDuplicateClass)
            ? a
                .children(
                  `.${s.slideClass}:not(.${
                    s.slideDuplicateClass
                  })[data-swiper-slide-index="${c.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(s.slideDuplicatePrevClass)
            : a
                .children(
                  `.${s.slideClass}.${
                    s.slideDuplicateClass
                  }[data-swiper-slide-index="${c.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(s.slideDuplicatePrevClass)),
        e.emitSlidesClasses();
    },
    updateActiveIndex: function (e) {
      const t = this,
        s = t.rtlTranslate ? t.translate : -t.translate,
        {
          slidesGrid: a,
          snapGrid: n,
          params: i,
          activeIndex: l,
          realIndex: r,
          snapIndex: o,
        } = t;
      let c,
        d = e;
      if (void 0 === d) {
        for (let e = 0; e < a.length; e += 1)
          void 0 !== a[e + 1]
            ? s >= a[e] && s < a[e + 1] - (a[e + 1] - a[e]) / 2
              ? (d = e)
              : s >= a[e] && s < a[e + 1] && (d = e + 1)
            : s >= a[e] && (d = e);
        i.normalizeSlideIndex && (d < 0 || void 0 === d) && (d = 0);
      }
      if (n.indexOf(s) >= 0) c = n.indexOf(s);
      else {
        const e = Math.min(i.slidesPerGroupSkip, d);
        c = e + Math.floor((d - e) / i.slidesPerGroup);
      }
      if ((c >= n.length && (c = n.length - 1), d === l))
        return void (c !== o && ((t.snapIndex = c), t.emit("snapIndexChange")));
      const p = parseInt(
        t.slides.eq(d).attr("data-swiper-slide-index") || d,
        10
      );
      Object.assign(t, {
        snapIndex: c,
        realIndex: p,
        previousIndex: l,
        activeIndex: d,
      }),
        t.emit("activeIndexChange"),
        t.emit("snapIndexChange"),
        r !== p && t.emit("realIndexChange"),
        (t.initialized || t.params.runCallbacksOnInit) && t.emit("slideChange");
    },
    updateClickedSlide: function (e) {
      const t = this,
        s = t.params,
        a = E(e).closest(`.${s.slideClass}`)[0];
      let n,
        i = !1;
      if (a)
        for (let e = 0; e < t.slides.length; e += 1)
          if (t.slides[e] === a) {
            (i = !0), (n = e);
            break;
          }
      if (!a || !i)
        return (t.clickedSlide = void 0), void (t.clickedIndex = void 0);
      (t.clickedSlide = a),
        t.virtual && t.params.virtual.enabled
          ? (t.clickedIndex = parseInt(
              E(a).attr("data-swiper-slide-index"),
              10
            ))
          : (t.clickedIndex = n),
        s.slideToClickedSlide &&
          void 0 !== t.clickedIndex &&
          t.clickedIndex !== t.activeIndex &&
          t.slideToClickedSlide();
    },
  };
  const G = {
    getTranslate: function (e) {
      void 0 === e && (e = this.isHorizontal() ? "x" : "y");
      const { params: t, rtlTranslate: s, translate: a, $wrapperEl: n } = this;
      if (t.virtualTranslate) return s ? -a : a;
      if (t.cssMode) return a;
      let i = x(n[0], e);
      return s && (i = -i), i || 0;
    },
    setTranslate: function (e, t) {
      const s = this,
        {
          rtlTranslate: a,
          params: n,
          $wrapperEl: i,
          wrapperEl: l,
          progress: r,
        } = s;
      let o,
        c = 0,
        d = 0;
      s.isHorizontal() ? (c = a ? -e : e) : (d = e),
        n.roundLengths && ((c = Math.floor(c)), (d = Math.floor(d))),
        n.cssMode
          ? (l[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal()
              ? -c
              : -d)
          : n.virtualTranslate ||
            i.transform(`translate3d(${c}px, ${d}px, 0px)`),
        (s.previousTranslate = s.translate),
        (s.translate = s.isHorizontal() ? c : d);
      const p = s.maxTranslate() - s.minTranslate();
      (o = 0 === p ? 0 : (e - s.minTranslate()) / p),
        o !== r && s.updateProgress(e),
        s.emit("setTranslate", s.translate, t);
    },
    minTranslate: function () {
      return -this.snapGrid[0];
    },
    maxTranslate: function () {
      return -this.snapGrid[this.snapGrid.length - 1];
    },
    translateTo: function (e, t, s, a, n) {
      void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === s && (s = !0),
        void 0 === a && (a = !0);
      const i = this,
        { params: l, wrapperEl: r } = i;
      if (i.animating && l.preventInteractionOnTransition) return !1;
      const o = i.minTranslate(),
        c = i.maxTranslate();
      let d;
      if (
        ((d = a && e > o ? o : a && e < c ? c : e),
        i.updateProgress(d),
        l.cssMode)
      ) {
        const e = i.isHorizontal();
        if (0 === t) r[e ? "scrollLeft" : "scrollTop"] = -d;
        else {
          if (!i.support.smoothScroll)
            return (
              P({ swiper: i, targetPosition: -d, side: e ? "left" : "top" }), !0
            );
          r.scrollTo({ [e ? "left" : "top"]: -d, behavior: "smooth" });
        }
        return !0;
      }
      return (
        0 === t
          ? (i.setTransition(0),
            i.setTranslate(d),
            s &&
              (i.emit("beforeTransitionStart", t, n), i.emit("transitionEnd")))
          : (i.setTransition(t),
            i.setTranslate(d),
            s &&
              (i.emit("beforeTransitionStart", t, n),
              i.emit("transitionStart")),
            i.animating ||
              ((i.animating = !0),
              i.onTranslateToWrapperTransitionEnd ||
                (i.onTranslateToWrapperTransitionEnd = function (e) {
                  i &&
                    !i.destroyed &&
                    e.target === this &&
                    (i.$wrapperEl[0].removeEventListener(
                      "transitionend",
                      i.onTranslateToWrapperTransitionEnd
                    ),
                    i.$wrapperEl[0].removeEventListener(
                      "webkitTransitionEnd",
                      i.onTranslateToWrapperTransitionEnd
                    ),
                    (i.onTranslateToWrapperTransitionEnd = null),
                    delete i.onTranslateToWrapperTransitionEnd,
                    s && i.emit("transitionEnd"));
                }),
              i.$wrapperEl[0].addEventListener(
                "transitionend",
                i.onTranslateToWrapperTransitionEnd
              ),
              i.$wrapperEl[0].addEventListener(
                "webkitTransitionEnd",
                i.onTranslateToWrapperTransitionEnd
              ))),
        !0
      );
    },
  };
  function j(e) {
    let { swiper: t, runCallbacks: s, direction: a, step: n } = e;
    const { activeIndex: i, previousIndex: l } = t;
    let r = a;
    if (
      (r || (r = i > l ? "next" : i < l ? "prev" : "reset"),
      t.emit(`transition${n}`),
      s && i !== l)
    ) {
      if ("reset" === r) return void t.emit(`slideResetTransition${n}`);
      t.emit(`slideChangeTransition${n}`),
        "next" === r
          ? t.emit(`slideNextTransition${n}`)
          : t.emit(`slidePrevTransition${n}`);
    }
  }
  const W = {
    slideTo: function (e, t, s, a, n) {
      if (
        (void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === s && (s = !0),
        "number" != typeof e && "string" != typeof e)
      )
        throw new Error(
          `The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`
        );
      if ("string" == typeof e) {
        const t = parseInt(e, 10);
        if (!isFinite(t))
          throw new Error(
            `The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`
          );
        e = t;
      }
      const i = this;
      let l = e;
      l < 0 && (l = 0);
      const {
        params: r,
        snapGrid: o,
        slidesGrid: c,
        previousIndex: d,
        activeIndex: p,
        rtlTranslate: u,
        wrapperEl: h,
        enabled: m,
      } = i;
      if ((i.animating && r.preventInteractionOnTransition) || (!m && !a && !n))
        return !1;
      const g = Math.min(i.params.slidesPerGroupSkip, l);
      let f = g + Math.floor((l - g) / i.params.slidesPerGroup);
      f >= o.length && (f = o.length - 1),
        (p || r.initialSlide || 0) === (d || 0) &&
          s &&
          i.emit("beforeSlideChangeStart");
      const v = -o[f];
      if ((i.updateProgress(v), r.normalizeSlideIndex))
        for (let e = 0; e < c.length; e += 1) {
          const t = -Math.floor(100 * v),
            s = Math.floor(100 * c[e]),
            a = Math.floor(100 * c[e + 1]);
          void 0 !== c[e + 1]
            ? t >= s && t < a - (a - s) / 2
              ? (l = e)
              : t >= s && t < a && (l = e + 1)
            : t >= s && (l = e);
        }
      if (i.initialized && l !== p) {
        if (!i.allowSlideNext && v < i.translate && v < i.minTranslate())
          return !1;
        if (
          !i.allowSlidePrev &&
          v > i.translate &&
          v > i.maxTranslate() &&
          (p || 0) !== l
        )
          return !1;
      }
      let b;
      if (
        ((b = l > p ? "next" : l < p ? "prev" : "reset"),
        (u && -v === i.translate) || (!u && v === i.translate))
      )
        return (
          i.updateActiveIndex(l),
          r.autoHeight && i.updateAutoHeight(),
          i.updateSlidesClasses(),
          "slide" !== r.effect && i.setTranslate(v),
          "reset" !== b && (i.transitionStart(s, b), i.transitionEnd(s, b)),
          !1
        );
      if (r.cssMode) {
        const e = i.isHorizontal(),
          s = u ? v : -v;
        if (0 === t) {
          const t = i.virtual && i.params.virtual.enabled;
          t &&
            ((i.wrapperEl.style.scrollSnapType = "none"),
            (i._immediateVirtual = !0)),
            (h[e ? "scrollLeft" : "scrollTop"] = s),
            t &&
              requestAnimationFrame(() => {
                (i.wrapperEl.style.scrollSnapType = ""),
                  (i._swiperImmediateVirtual = !1);
              });
        } else {
          if (!i.support.smoothScroll)
            return (
              P({ swiper: i, targetPosition: s, side: e ? "left" : "top" }), !0
            );
          h.scrollTo({ [e ? "left" : "top"]: s, behavior: "smooth" });
        }
        return !0;
      }
      return (
        i.setTransition(t),
        i.setTranslate(v),
        i.updateActiveIndex(l),
        i.updateSlidesClasses(),
        i.emit("beforeTransitionStart", t, a),
        i.transitionStart(s, b),
        0 === t
          ? i.transitionEnd(s, b)
          : i.animating ||
            ((i.animating = !0),
            i.onSlideToWrapperTransitionEnd ||
              (i.onSlideToWrapperTransitionEnd = function (e) {
                i &&
                  !i.destroyed &&
                  e.target === this &&
                  (i.$wrapperEl[0].removeEventListener(
                    "transitionend",
                    i.onSlideToWrapperTransitionEnd
                  ),
                  i.$wrapperEl[0].removeEventListener(
                    "webkitTransitionEnd",
                    i.onSlideToWrapperTransitionEnd
                  ),
                  (i.onSlideToWrapperTransitionEnd = null),
                  delete i.onSlideToWrapperTransitionEnd,
                  i.transitionEnd(s, b));
              }),
            i.$wrapperEl[0].addEventListener(
              "transitionend",
              i.onSlideToWrapperTransitionEnd
            ),
            i.$wrapperEl[0].addEventListener(
              "webkitTransitionEnd",
              i.onSlideToWrapperTransitionEnd
            )),
        !0
      );
    },
    slideToLoop: function (e, t, s, a) {
      void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === s && (s = !0);
      const n = this;
      let i = e;
      return n.params.loop && (i += n.loopedSlides), n.slideTo(i, t, s, a);
    },
    slideNext: function (e, t, s) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      const a = this,
        { animating: n, enabled: i, params: l } = a;
      if (!i) return a;
      let r = l.slidesPerGroup;
      "auto" === l.slidesPerView &&
        1 === l.slidesPerGroup &&
        l.slidesPerGroupAuto &&
        (r = Math.max(a.slidesPerViewDynamic("current", !0), 1));
      const o = a.activeIndex < l.slidesPerGroupSkip ? 1 : r;
      if (l.loop) {
        if (n && l.loopPreventsSlide) return !1;
        a.loopFix(), (a._clientLeft = a.$wrapperEl[0].clientLeft);
      }
      return l.rewind && a.isEnd
        ? a.slideTo(0, e, t, s)
        : a.slideTo(a.activeIndex + o, e, t, s);
    },
    slidePrev: function (e, t, s) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      const a = this,
        {
          params: n,
          animating: i,
          snapGrid: l,
          slidesGrid: r,
          rtlTranslate: o,
          enabled: c,
        } = a;
      if (!c) return a;
      if (n.loop) {
        if (i && n.loopPreventsSlide) return !1;
        a.loopFix(), (a._clientLeft = a.$wrapperEl[0].clientLeft);
      }
      function d(e) {
        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
      }
      const p = d(o ? a.translate : -a.translate),
        u = l.map((e) => d(e));
      let h = l[u.indexOf(p) - 1];
      if (void 0 === h && n.cssMode) {
        let e;
        l.forEach((t, s) => {
          p >= t && (e = s);
        }),
          void 0 !== e && (h = l[e > 0 ? e - 1 : e]);
      }
      let m = 0;
      if (
        (void 0 !== h &&
          ((m = r.indexOf(h)),
          m < 0 && (m = a.activeIndex - 1),
          "auto" === n.slidesPerView &&
            1 === n.slidesPerGroup &&
            n.slidesPerGroupAuto &&
            ((m = m - a.slidesPerViewDynamic("previous", !0) + 1),
            (m = Math.max(m, 0)))),
        n.rewind && a.isBeginning)
      ) {
        const n =
          a.params.virtual && a.params.virtual.enabled && a.virtual
            ? a.virtual.slides.length - 1
            : a.slides.length - 1;
        return a.slideTo(n, e, t, s);
      }
      return a.slideTo(m, e, t, s);
    },
    slideReset: function (e, t, s) {
      return (
        void 0 === e && (e = this.params.speed),
        void 0 === t && (t = !0),
        this.slideTo(this.activeIndex, e, t, s)
      );
    },
    slideToClosest: function (e, t, s, a) {
      void 0 === e && (e = this.params.speed),
        void 0 === t && (t = !0),
        void 0 === a && (a = 0.5);
      const n = this;
      let i = n.activeIndex;
      const l = Math.min(n.params.slidesPerGroupSkip, i),
        r = l + Math.floor((i - l) / n.params.slidesPerGroup),
        o = n.rtlTranslate ? n.translate : -n.translate;
      if (o >= n.snapGrid[r]) {
        const e = n.snapGrid[r];
        o - e > (n.snapGrid[r + 1] - e) * a && (i += n.params.slidesPerGroup);
      } else {
        const e = n.snapGrid[r - 1];
        o - e <= (n.snapGrid[r] - e) * a && (i -= n.params.slidesPerGroup);
      }
      return (
        (i = Math.max(i, 0)),
        (i = Math.min(i, n.slidesGrid.length - 1)),
        n.slideTo(i, e, t, s)
      );
    },
    slideToClickedSlide: function () {
      const e = this,
        { params: t, $wrapperEl: s } = e,
        a =
          "auto" === t.slidesPerView
            ? e.slidesPerViewDynamic()
            : t.slidesPerView;
      let n,
        i = e.clickedIndex;
      if (t.loop) {
        if (e.animating) return;
        (n = parseInt(E(e.clickedSlide).attr("data-swiper-slide-index"), 10)),
          t.centeredSlides
            ? i < e.loopedSlides - a / 2 ||
              i > e.slides.length - e.loopedSlides + a / 2
              ? (e.loopFix(),
                (i = s
                  .children(
                    `.${t.slideClass}[data-swiper-slide-index="${n}"]:not(.${t.slideDuplicateClass})`
                  )
                  .eq(0)
                  .index()),
                k(() => {
                  e.slideTo(i);
                }))
              : e.slideTo(i)
            : i > e.slides.length - a
            ? (e.loopFix(),
              (i = s
                .children(
                  `.${t.slideClass}[data-swiper-slide-index="${n}"]:not(.${t.slideDuplicateClass})`
                )
                .eq(0)
                .index()),
              k(() => {
                e.slideTo(i);
              }))
            : e.slideTo(i);
      } else e.slideTo(i);
    },
  };
  const V = {
    loopCreate: function () {
      const e = this,
        t = m(),
        { params: s, $wrapperEl: a } = e,
        n = a.children().length > 0 ? E(a.children()[0].parentNode) : a;
      n.children(`.${s.slideClass}.${s.slideDuplicateClass}`).remove();
      let i = n.children(`.${s.slideClass}`);
      if (s.loopFillGroupWithBlank) {
        const e = s.slidesPerGroup - (i.length % s.slidesPerGroup);
        if (e !== s.slidesPerGroup) {
          for (let a = 0; a < e; a += 1) {
            const e = E(t.createElement("div")).addClass(
              `${s.slideClass} ${s.slideBlankClass}`
            );
            n.append(e);
          }
          i = n.children(`.${s.slideClass}`);
        }
      }
      "auto" !== s.slidesPerView ||
        s.loopedSlides ||
        (s.loopedSlides = i.length),
        (e.loopedSlides = Math.ceil(
          parseFloat(s.loopedSlides || s.slidesPerView, 10)
        )),
        (e.loopedSlides += s.loopAdditionalSlides),
        e.loopedSlides > i.length && (e.loopedSlides = i.length);
      const l = [],
        r = [];
      i.each((t, s) => {
        const a = E(t);
        s < e.loopedSlides && r.push(t),
          s < i.length && s >= i.length - e.loopedSlides && l.push(t),
          a.attr("data-swiper-slide-index", s);
      });
      for (let e = 0; e < r.length; e += 1)
        n.append(E(r[e].cloneNode(!0)).addClass(s.slideDuplicateClass));
      for (let e = l.length - 1; e >= 0; e -= 1)
        n.prepend(E(l[e].cloneNode(!0)).addClass(s.slideDuplicateClass));
    },
    loopFix: function () {
      const e = this;
      e.emit("beforeLoopFix");
      const {
        activeIndex: t,
        slides: s,
        loopedSlides: a,
        allowSlidePrev: n,
        allowSlideNext: i,
        snapGrid: l,
        rtlTranslate: r,
      } = e;
      let o;
      (e.allowSlidePrev = !0), (e.allowSlideNext = !0);
      const c = -l[t] - e.getTranslate();
      if (t < a) {
        (o = s.length - 3 * a + t), (o += a);
        e.slideTo(o, 0, !1, !0) &&
          0 !== c &&
          e.setTranslate((r ? -e.translate : e.translate) - c);
      } else if (t >= s.length - a) {
        (o = -s.length + t + a), (o += a);
        e.slideTo(o, 0, !1, !0) &&
          0 !== c &&
          e.setTranslate((r ? -e.translate : e.translate) - c);
      }
      (e.allowSlidePrev = n), (e.allowSlideNext = i), e.emit("loopFix");
    },
    loopDestroy: function () {
      const { $wrapperEl: e, params: t, slides: s } = this;
      e
        .children(
          `.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`
        )
        .remove(),
        s.removeAttr("data-swiper-slide-index");
    },
  };
  function F(e) {
    const t = this,
      s = m(),
      a = f(),
      n = t.touchEventsData,
      { params: i, touches: l, enabled: r } = t;
    if (!r) return;
    if (t.animating && i.preventInteractionOnTransition) return;
    !t.animating && i.cssMode && i.loop && t.loopFix();
    let o = e;
    o.originalEvent && (o = o.originalEvent);
    let c = E(o.target);
    if ("wrapper" === i.touchEventsTarget && !c.closest(t.wrapperEl).length)
      return;
    if (
      ((n.isTouchEvent = "touchstart" === o.type),
      !n.isTouchEvent && "which" in o && 3 === o.which)
    )
      return;
    if (!n.isTouchEvent && "button" in o && o.button > 0) return;
    if (n.isTouched && n.isMoved) return;
    !!i.noSwipingClass &&
      "" !== i.noSwipingClass &&
      o.target &&
      o.target.shadowRoot &&
      e.path &&
      e.path[0] &&
      (c = E(e.path[0]));
    const d = i.noSwipingSelector
        ? i.noSwipingSelector
        : `.${i.noSwipingClass}`,
      p = !(!o.target || !o.target.shadowRoot);
    if (
      i.noSwiping &&
      (p
        ? (function (e, t) {
            return (
              void 0 === t && (t = this),
              (function t(s) {
                if (!s || s === m() || s === f()) return null;
                s.assignedSlot && (s = s.assignedSlot);
                const a = s.closest(e);
                return a || s.getRootNode ? a || t(s.getRootNode().host) : null;
              })(t)
            );
          })(d, c[0])
        : c.closest(d)[0])
    )
      return void (t.allowClick = !0);
    if (i.swipeHandler && !c.closest(i.swipeHandler)[0]) return;
    (l.currentX = "touchstart" === o.type ? o.targetTouches[0].pageX : o.pageX),
      (l.currentY =
        "touchstart" === o.type ? o.targetTouches[0].pageY : o.pageY);
    const u = l.currentX,
      h = l.currentY,
      g = i.edgeSwipeDetection || i.iOSEdgeSwipeDetection,
      v = i.edgeSwipeThreshold || i.iOSEdgeSwipeThreshold;
    if (g && (u <= v || u >= a.innerWidth - v)) {
      if ("prevent" !== g) return;
      e.preventDefault();
    }
    if (
      (Object.assign(n, {
        isTouched: !0,
        isMoved: !1,
        allowTouchCallbacks: !0,
        isScrolling: void 0,
        startMoving: void 0,
      }),
      (l.startX = u),
      (l.startY = h),
      (n.touchStartTime = T()),
      (t.allowClick = !0),
      t.updateSize(),
      (t.swipeDirection = void 0),
      i.threshold > 0 && (n.allowThresholdMove = !1),
      "touchstart" !== o.type)
    ) {
      let e = !0;
      c.is(n.focusableElements) &&
        ((e = !1), "SELECT" === c[0].nodeName && (n.isTouched = !1)),
        s.activeElement &&
          E(s.activeElement).is(n.focusableElements) &&
          s.activeElement !== c[0] &&
          s.activeElement.blur();
      const a = e && t.allowTouchMove && i.touchStartPreventDefault;
      (!i.touchStartForcePreventDefault && !a) ||
        c[0].isContentEditable ||
        o.preventDefault();
    }
    t.params.freeMode &&
      t.params.freeMode.enabled &&
      t.freeMode &&
      t.animating &&
      !i.cssMode &&
      t.freeMode.onTouchStart(),
      t.emit("touchStart", o);
  }
  function R(e) {
    const t = m(),
      s = this,
      a = s.touchEventsData,
      { params: n, touches: i, rtlTranslate: l, enabled: r } = s;
    if (!r) return;
    let o = e;
    if ((o.originalEvent && (o = o.originalEvent), !a.isTouched))
      return void (
        a.startMoving &&
        a.isScrolling &&
        s.emit("touchMoveOpposite", o)
      );
    if (a.isTouchEvent && "touchmove" !== o.type) return;
    const c =
        "touchmove" === o.type &&
        o.targetTouches &&
        (o.targetTouches[0] || o.changedTouches[0]),
      d = "touchmove" === o.type ? c.pageX : o.pageX,
      p = "touchmove" === o.type ? c.pageY : o.pageY;
    if (o.preventedByNestedSwiper) return (i.startX = d), void (i.startY = p);
    if (!s.allowTouchMove)
      return (
        E(o.target).is(a.focusableElements) || (s.allowClick = !1),
        void (
          a.isTouched &&
          (Object.assign(i, { startX: d, startY: p, currentX: d, currentY: p }),
          (a.touchStartTime = T()))
        )
      );
    if (a.isTouchEvent && n.touchReleaseOnEdges && !n.loop)
      if (s.isVertical()) {
        if (
          (p < i.startY && s.translate <= s.maxTranslate()) ||
          (p > i.startY && s.translate >= s.minTranslate())
        )
          return (a.isTouched = !1), void (a.isMoved = !1);
      } else if (
        (d < i.startX && s.translate <= s.maxTranslate()) ||
        (d > i.startX && s.translate >= s.minTranslate())
      )
        return;
    if (
      a.isTouchEvent &&
      t.activeElement &&
      o.target === t.activeElement &&
      E(o.target).is(a.focusableElements)
    )
      return (a.isMoved = !0), void (s.allowClick = !1);
    if (
      (a.allowTouchCallbacks && s.emit("touchMove", o),
      o.targetTouches && o.targetTouches.length > 1)
    )
      return;
    (i.currentX = d), (i.currentY = p);
    const u = i.currentX - i.startX,
      h = i.currentY - i.startY;
    if (s.params.threshold && Math.sqrt(u ** 2 + h ** 2) < s.params.threshold)
      return;
    if (void 0 === a.isScrolling) {
      let e;
      (s.isHorizontal() && i.currentY === i.startY) ||
      (s.isVertical() && i.currentX === i.startX)
        ? (a.isScrolling = !1)
        : u * u + h * h >= 25 &&
          ((e = (180 * Math.atan2(Math.abs(h), Math.abs(u))) / Math.PI),
          (a.isScrolling = s.isHorizontal()
            ? e > n.touchAngle
            : 90 - e > n.touchAngle));
    }
    if (
      (a.isScrolling && s.emit("touchMoveOpposite", o),
      void 0 === a.startMoving &&
        ((i.currentX === i.startX && i.currentY === i.startY) ||
          (a.startMoving = !0)),
      a.isScrolling)
    )
      return void (a.isTouched = !1);
    if (!a.startMoving) return;
    (s.allowClick = !1),
      !n.cssMode && o.cancelable && o.preventDefault(),
      n.touchMoveStopPropagation && !n.nested && o.stopPropagation(),
      a.isMoved ||
        (n.loop && !n.cssMode && s.loopFix(),
        (a.startTranslate = s.getTranslate()),
        s.setTransition(0),
        s.animating &&
          s.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
        (a.allowMomentumBounce = !1),
        !n.grabCursor ||
          (!0 !== s.allowSlideNext && !0 !== s.allowSlidePrev) ||
          s.setGrabCursor(!0),
        s.emit("sliderFirstMove", o)),
      s.emit("sliderMove", o),
      (a.isMoved = !0);
    let g = s.isHorizontal() ? u : h;
    (i.diff = g),
      (g *= n.touchRatio),
      l && (g = -g),
      (s.swipeDirection = g > 0 ? "prev" : "next"),
      (a.currentTranslate = g + a.startTranslate);
    let f = !0,
      v = n.resistanceRatio;
    if (
      (n.touchReleaseOnEdges && (v = 0),
      g > 0 && a.currentTranslate > s.minTranslate()
        ? ((f = !1),
          n.resistance &&
            (a.currentTranslate =
              s.minTranslate() -
              1 +
              (-s.minTranslate() + a.startTranslate + g) ** v))
        : g < 0 &&
          a.currentTranslate < s.maxTranslate() &&
          ((f = !1),
          n.resistance &&
            (a.currentTranslate =
              s.maxTranslate() +
              1 -
              (s.maxTranslate() - a.startTranslate - g) ** v)),
      f && (o.preventedByNestedSwiper = !0),
      !s.allowSlideNext &&
        "next" === s.swipeDirection &&
        a.currentTranslate < a.startTranslate &&
        (a.currentTranslate = a.startTranslate),
      !s.allowSlidePrev &&
        "prev" === s.swipeDirection &&
        a.currentTranslate > a.startTranslate &&
        (a.currentTranslate = a.startTranslate),
      s.allowSlidePrev ||
        s.allowSlideNext ||
        (a.currentTranslate = a.startTranslate),
      n.threshold > 0)
    ) {
      if (!(Math.abs(g) > n.threshold || a.allowThresholdMove))
        return void (a.currentTranslate = a.startTranslate);
      if (!a.allowThresholdMove)
        return (
          (a.allowThresholdMove = !0),
          (i.startX = i.currentX),
          (i.startY = i.currentY),
          (a.currentTranslate = a.startTranslate),
          void (i.diff = s.isHorizontal()
            ? i.currentX - i.startX
            : i.currentY - i.startY)
        );
    }
    n.followFinger &&
      !n.cssMode &&
      (((n.freeMode && n.freeMode.enabled && s.freeMode) ||
        n.watchSlidesProgress) &&
        (s.updateActiveIndex(), s.updateSlidesClasses()),
      s.params.freeMode &&
        n.freeMode.enabled &&
        s.freeMode &&
        s.freeMode.onTouchMove(),
      s.updateProgress(a.currentTranslate),
      s.setTranslate(a.currentTranslate));
  }
  function X(e) {
    const t = this,
      s = t.touchEventsData,
      { params: a, touches: n, rtlTranslate: i, slidesGrid: l, enabled: r } = t;
    if (!r) return;
    let o = e;
    if (
      (o.originalEvent && (o = o.originalEvent),
      s.allowTouchCallbacks && t.emit("touchEnd", o),
      (s.allowTouchCallbacks = !1),
      !s.isTouched)
    )
      return (
        s.isMoved && a.grabCursor && t.setGrabCursor(!1),
        (s.isMoved = !1),
        void (s.startMoving = !1)
      );
    a.grabCursor &&
      s.isMoved &&
      s.isTouched &&
      (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
      t.setGrabCursor(!1);
    const c = T(),
      d = c - s.touchStartTime;
    if (t.allowClick) {
      const e = o.path || (o.composedPath && o.composedPath());
      t.updateClickedSlide((e && e[0]) || o.target),
        t.emit("tap click", o),
        d < 300 &&
          c - s.lastClickTime < 300 &&
          t.emit("doubleTap doubleClick", o);
    }
    if (
      ((s.lastClickTime = T()),
      k(() => {
        t.destroyed || (t.allowClick = !0);
      }),
      !s.isTouched ||
        !s.isMoved ||
        !t.swipeDirection ||
        0 === n.diff ||
        s.currentTranslate === s.startTranslate)
    )
      return (s.isTouched = !1), (s.isMoved = !1), void (s.startMoving = !1);
    let p;
    if (
      ((s.isTouched = !1),
      (s.isMoved = !1),
      (s.startMoving = !1),
      (p = a.followFinger
        ? i
          ? t.translate
          : -t.translate
        : -s.currentTranslate),
      a.cssMode)
    )
      return;
    if (t.params.freeMode && a.freeMode.enabled)
      return void t.freeMode.onTouchEnd({ currentPos: p });
    let u = 0,
      h = t.slidesSizesGrid[0];
    for (
      let e = 0;
      e < l.length;
      e += e < a.slidesPerGroupSkip ? 1 : a.slidesPerGroup
    ) {
      const t = e < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
      void 0 !== l[e + t]
        ? p >= l[e] && p < l[e + t] && ((u = e), (h = l[e + t] - l[e]))
        : p >= l[e] && ((u = e), (h = l[l.length - 1] - l[l.length - 2]));
    }
    let m = null,
      g = null;
    a.rewind &&
      (t.isBeginning
        ? (g =
            t.params.virtual && t.params.virtual.enabled && t.virtual
              ? t.virtual.slides.length - 1
              : t.slides.length - 1)
        : t.isEnd && (m = 0));
    const f = (p - l[u]) / h,
      v = u < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
    if (d > a.longSwipesMs) {
      if (!a.longSwipes) return void t.slideTo(t.activeIndex);
      "next" === t.swipeDirection &&
        (f >= a.longSwipesRatio
          ? t.slideTo(a.rewind && t.isEnd ? m : u + v)
          : t.slideTo(u)),
        "prev" === t.swipeDirection &&
          (f > 1 - a.longSwipesRatio
            ? t.slideTo(u + v)
            : null !== g && f < 0 && Math.abs(f) > a.longSwipesRatio
            ? t.slideTo(g)
            : t.slideTo(u));
    } else {
      if (!a.shortSwipes) return void t.slideTo(t.activeIndex);
      t.navigation &&
      (o.target === t.navigation.nextEl || o.target === t.navigation.prevEl)
        ? o.target === t.navigation.nextEl
          ? t.slideTo(u + v)
          : t.slideTo(u)
        : ("next" === t.swipeDirection && t.slideTo(null !== m ? m : u + v),
          "prev" === t.swipeDirection && t.slideTo(null !== g ? g : u));
    }
  }
  function Y() {
    const e = this,
      { params: t, el: s } = e;
    if (s && 0 === s.offsetWidth) return;
    t.breakpoints && e.setBreakpoint();
    const { allowSlideNext: a, allowSlidePrev: n, snapGrid: i } = e;
    (e.allowSlideNext = !0),
      (e.allowSlidePrev = !0),
      e.updateSize(),
      e.updateSlides(),
      e.updateSlidesClasses(),
      ("auto" === t.slidesPerView || t.slidesPerView > 1) &&
      e.isEnd &&
      !e.isBeginning &&
      !e.params.centeredSlides
        ? e.slideTo(e.slides.length - 1, 0, !1, !0)
        : e.slideTo(e.activeIndex, 0, !1, !0),
      e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.run(),
      (e.allowSlidePrev = n),
      (e.allowSlideNext = a),
      e.params.watchOverflow && i !== e.snapGrid && e.checkOverflow();
  }
  function U(e) {
    const t = this;
    t.enabled &&
      (t.allowClick ||
        (t.params.preventClicks && e.preventDefault(),
        t.params.preventClicksPropagation &&
          t.animating &&
          (e.stopPropagation(), e.stopImmediatePropagation())));
  }
  function J() {
    const e = this,
      { wrapperEl: t, rtlTranslate: s, enabled: a } = e;
    if (!a) return;
    let n;
    (e.previousTranslate = e.translate),
      e.isHorizontal()
        ? (e.translate = -t.scrollLeft)
        : (e.translate = -t.scrollTop),
      0 === e.translate && (e.translate = 0),
      e.updateActiveIndex(),
      e.updateSlidesClasses();
    const i = e.maxTranslate() - e.minTranslate();
    (n = 0 === i ? 0 : (e.translate - e.minTranslate()) / i),
      n !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
      e.emit("setTranslate", e.translate, !1);
  }
  let Z = !1;
  function Q() {}
  const K = (e, t) => {
    const s = m(),
      {
        params: a,
        touchEvents: n,
        el: i,
        wrapperEl: l,
        device: r,
        support: o,
      } = e,
      c = !!a.nested,
      d = "on" === t ? "addEventListener" : "removeEventListener",
      p = t;
    if (o.touch) {
      const t = !(
        "touchstart" !== n.start ||
        !o.passiveListener ||
        !a.passiveListeners
      ) && { passive: !0, capture: !1 };
      i[d](n.start, e.onTouchStart, t),
        i[d](
          n.move,
          e.onTouchMove,
          o.passiveListener ? { passive: !1, capture: c } : c
        ),
        i[d](n.end, e.onTouchEnd, t),
        n.cancel && i[d](n.cancel, e.onTouchEnd, t);
    } else
      i[d](n.start, e.onTouchStart, !1),
        s[d](n.move, e.onTouchMove, c),
        s[d](n.end, e.onTouchEnd, !1);
    (a.preventClicks || a.preventClicksPropagation) &&
      i[d]("click", e.onClick, !0),
      a.cssMode && l[d]("scroll", e.onScroll),
      a.updateOnWindowResize
        ? e[p](
            r.ios || r.android
              ? "resize orientationchange observerUpdate"
              : "resize observerUpdate",
            Y,
            !0
          )
        : e[p]("observerUpdate", Y, !0);
  };
  const ee = {
      attachEvents: function () {
        const e = this,
          t = m(),
          { params: s, support: a } = e;
        (e.onTouchStart = F.bind(e)),
          (e.onTouchMove = R.bind(e)),
          (e.onTouchEnd = X.bind(e)),
          s.cssMode && (e.onScroll = J.bind(e)),
          (e.onClick = U.bind(e)),
          a.touch && !Z && (t.addEventListener("touchstart", Q), (Z = !0)),
          K(e, "on");
      },
      detachEvents: function () {
        K(this, "off");
      },
    },
    te = (e, t) => e.grid && t.grid && t.grid.rows > 1;
  const se = {
    setBreakpoint: function () {
      const e = this,
        {
          activeIndex: t,
          initialized: s,
          loopedSlides: a = 0,
          params: n,
          $el: i,
        } = e,
        l = n.breakpoints;
      if (!l || (l && 0 === Object.keys(l).length)) return;
      const r = e.getBreakpoint(l, e.params.breakpointsBase, e.el);
      if (!r || e.currentBreakpoint === r) return;
      const o = (r in l ? l[r] : void 0) || e.originalParams,
        c = te(e, n),
        d = te(e, o),
        p = n.enabled;
      c && !d
        ? (i.removeClass(
            `${n.containerModifierClass}grid ${n.containerModifierClass}grid-column`
          ),
          e.emitContainerClasses())
        : !c &&
          d &&
          (i.addClass(`${n.containerModifierClass}grid`),
          ((o.grid.fill && "column" === o.grid.fill) ||
            (!o.grid.fill && "column" === n.grid.fill)) &&
            i.addClass(`${n.containerModifierClass}grid-column`),
          e.emitContainerClasses());
      const u = o.direction && o.direction !== n.direction,
        h = n.loop && (o.slidesPerView !== n.slidesPerView || u);
      u && s && e.changeDirection(), A(e.params, o);
      const m = e.params.enabled;
      Object.assign(e, {
        allowTouchMove: e.params.allowTouchMove,
        allowSlideNext: e.params.allowSlideNext,
        allowSlidePrev: e.params.allowSlidePrev,
      }),
        p && !m ? e.disable() : !p && m && e.enable(),
        (e.currentBreakpoint = r),
        e.emit("_beforeBreakpoint", o),
        h &&
          s &&
          (e.loopDestroy(),
          e.loopCreate(),
          e.updateSlides(),
          e.slideTo(t - a + e.loopedSlides, 0, !1)),
        e.emit("breakpoint", o);
    },
    getBreakpoint: function (e, t, s) {
      if ((void 0 === t && (t = "window"), !e || ("container" === t && !s)))
        return;
      let a = !1;
      const n = f(),
        i = "window" === t ? n.innerHeight : s.clientHeight,
        l = Object.keys(e).map((e) => {
          if ("string" == typeof e && 0 === e.indexOf("@")) {
            const t = parseFloat(e.substr(1));
            return { value: i * t, point: e };
          }
          return { value: e, point: e };
        });
      l.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
      for (let e = 0; e < l.length; e += 1) {
        const { point: i, value: r } = l[e];
        "window" === t
          ? n.matchMedia(`(min-width: ${r}px)`).matches && (a = i)
          : r <= s.clientWidth && (a = i);
      }
      return a || "max";
    },
  };
  const ae = {
    addClasses: function () {
      const e = this,
        { classNames: t, params: s, rtl: a, $el: n, device: i, support: l } = e,
        r = (function (e, t) {
          const s = [];
          return (
            e.forEach((e) => {
              "object" == typeof e
                ? Object.keys(e).forEach((a) => {
                    e[a] && s.push(t + a);
                  })
                : "string" == typeof e && s.push(t + e);
            }),
            s
          );
        })(
          [
            "initialized",
            s.direction,
            { "pointer-events": !l.touch },
            { "free-mode": e.params.freeMode && s.freeMode.enabled },
            { autoheight: s.autoHeight },
            { rtl: a },
            { grid: s.grid && s.grid.rows > 1 },
            {
              "grid-column":
                s.grid && s.grid.rows > 1 && "column" === s.grid.fill,
            },
            { android: i.android },
            { ios: i.ios },
            { "css-mode": s.cssMode },
            { centered: s.cssMode && s.centeredSlides },
            { "watch-progress": s.watchSlidesProgress },
          ],
          s.containerModifierClass
        );
      t.push(...r), n.addClass([...t].join(" ")), e.emitContainerClasses();
    },
    removeClasses: function () {
      const { $el: e, classNames: t } = this;
      e.removeClass(t.join(" ")), this.emitContainerClasses();
    },
  };
  const ne = {
    init: !0,
    direction: "horizontal",
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 0,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    preloadImages: !0,
    updateOnImagesReady: !0,
    loop: !1,
    loopAdditionalSlides: 0,
    loopedSlides: null,
    loopFillGroupWithBlank: !1,
    loopPreventsSlide: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-invisible-blank",
    slideActiveClass: "swiper-slide-active",
    slideDuplicateActiveClass: "swiper-slide-duplicate-active",
    slideVisibleClass: "swiper-slide-visible",
    slideDuplicateClass: "swiper-slide-duplicate",
    slideNextClass: "swiper-slide-next",
    slideDuplicateNextClass: "swiper-slide-duplicate-next",
    slidePrevClass: "swiper-slide-prev",
    slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
    wrapperClass: "swiper-wrapper",
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  };
  function ie(e, t) {
    return function (s) {
      void 0 === s && (s = {});
      const a = Object.keys(s)[0],
        n = s[a];
      "object" == typeof n && null !== n
        ? (["navigation", "pagination", "scrollbar"].indexOf(a) >= 0 &&
            !0 === e[a] &&
            (e[a] = { auto: !0 }),
          a in e && "enabled" in n
            ? (!0 === e[a] && (e[a] = { enabled: !0 }),
              "object" != typeof e[a] ||
                "enabled" in e[a] ||
                (e[a].enabled = !0),
              e[a] || (e[a] = { enabled: !1 }),
              A(t, s))
            : A(t, s))
        : A(t, s);
    };
  }
  const le = {
      eventsEmitter: H,
      update: N,
      translate: G,
      transition: {
        setTransition: function (e, t) {
          const s = this;
          s.params.cssMode || s.$wrapperEl.transition(e),
            s.emit("setTransition", e, t);
        },
        transitionStart: function (e, t) {
          void 0 === e && (e = !0);
          const s = this,
            { params: a } = s;
          a.cssMode ||
            (a.autoHeight && s.updateAutoHeight(),
            j({ swiper: s, runCallbacks: e, direction: t, step: "Start" }));
        },
        transitionEnd: function (e, t) {
          void 0 === e && (e = !0);
          const s = this,
            { params: a } = s;
          (s.animating = !1),
            a.cssMode ||
              (s.setTransition(0),
              j({ swiper: s, runCallbacks: e, direction: t, step: "End" }));
        },
      },
      slide: W,
      loop: V,
      grabCursor: {
        setGrabCursor: function (e) {
          const t = this;
          if (
            t.support.touch ||
            !t.params.simulateTouch ||
            (t.params.watchOverflow && t.isLocked) ||
            t.params.cssMode
          )
            return;
          const s =
            "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
          (s.style.cursor = "move"), (s.style.cursor = e ? "grabbing" : "grab");
        },
        unsetGrabCursor: function () {
          const e = this;
          e.support.touch ||
            (e.params.watchOverflow && e.isLocked) ||
            e.params.cssMode ||
            (e[
              "container" === e.params.touchEventsTarget ? "el" : "wrapperEl"
            ].style.cursor = "");
        },
      },
      events: ee,
      breakpoints: se,
      checkOverflow: {
        checkOverflow: function () {
          const e = this,
            { isLocked: t, params: s } = e,
            { slidesOffsetBefore: a } = s;
          if (a) {
            const t = e.slides.length - 1,
              s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * a;
            e.isLocked = e.size > s;
          } else e.isLocked = 1 === e.snapGrid.length;
          !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
            !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
            t && t !== e.isLocked && (e.isEnd = !1),
            t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
        },
      },
      classes: ae,
      images: {
        loadImage: function (e, t, s, a, n, i) {
          const l = f();
          let r;
          function o() {
            i && i();
          }
          E(e).parent("picture")[0] || (e.complete && n)
            ? o()
            : t
            ? ((r = new l.Image()),
              (r.onload = o),
              (r.onerror = o),
              a && (r.sizes = a),
              s && (r.srcset = s),
              t && (r.src = t))
            : o();
        },
        preloadImages: function () {
          const e = this;
          function t() {
            null != e &&
              e &&
              !e.destroyed &&
              (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
              e.imagesLoaded === e.imagesToLoad.length &&
                (e.params.updateOnImagesReady && e.update(),
                e.emit("imagesReady")));
          }
          e.imagesToLoad = e.$el.find("img");
          for (let s = 0; s < e.imagesToLoad.length; s += 1) {
            const a = e.imagesToLoad[s];
            e.loadImage(
              a,
              a.currentSrc || a.getAttribute("src"),
              a.srcset || a.getAttribute("srcset"),
              a.sizes || a.getAttribute("sizes"),
              !0,
              t
            );
          }
        },
      },
    },
    re = {};
  class oe {
    constructor() {
      let e, t;
      for (var s = arguments.length, a = new Array(s), n = 0; n < s; n++)
        a[n] = arguments[n];
      if (
        (1 === a.length &&
        a[0].constructor &&
        "Object" === Object.prototype.toString.call(a[0]).slice(8, -1)
          ? (t = a[0])
          : ([e, t] = a),
        t || (t = {}),
        (t = A({}, t)),
        e && !t.el && (t.el = e),
        t.el && E(t.el).length > 1)
      ) {
        const e = [];
        return (
          E(t.el).each((s) => {
            const a = A({}, t, { el: s });
            e.push(new oe(a));
          }),
          e
        );
      }
      const i = this;
      (i.__swiper__ = !0),
        (i.support = z()),
        (i.device = D({ userAgent: t.userAgent })),
        (i.browser = B()),
        (i.eventsListeners = {}),
        (i.eventsAnyListeners = []),
        (i.modules = [...i.__modules__]),
        t.modules && Array.isArray(t.modules) && i.modules.push(...t.modules);
      const l = {};
      i.modules.forEach((e) => {
        e({
          swiper: i,
          extendParams: ie(t, l),
          on: i.on.bind(i),
          once: i.once.bind(i),
          off: i.off.bind(i),
          emit: i.emit.bind(i),
        });
      });
      const r = A({}, ne, l);
      return (
        (i.params = A({}, r, re, t)),
        (i.originalParams = A({}, i.params)),
        (i.passedParams = A({}, t)),
        i.params &&
          i.params.on &&
          Object.keys(i.params.on).forEach((e) => {
            i.on(e, i.params.on[e]);
          }),
        i.params && i.params.onAny && i.onAny(i.params.onAny),
        (i.$ = E),
        Object.assign(i, {
          enabled: i.params.enabled,
          el: e,
          classNames: [],
          slides: E(),
          slidesGrid: [],
          snapGrid: [],
          slidesSizesGrid: [],
          isHorizontal: () => "horizontal" === i.params.direction,
          isVertical: () => "vertical" === i.params.direction,
          activeIndex: 0,
          realIndex: 0,
          isBeginning: !0,
          isEnd: !1,
          translate: 0,
          previousTranslate: 0,
          progress: 0,
          velocity: 0,
          animating: !1,
          allowSlideNext: i.params.allowSlideNext,
          allowSlidePrev: i.params.allowSlidePrev,
          touchEvents: (function () {
            const e = ["touchstart", "touchmove", "touchend", "touchcancel"],
              t = ["pointerdown", "pointermove", "pointerup"];
            return (
              (i.touchEventsTouch = {
                start: e[0],
                move: e[1],
                end: e[2],
                cancel: e[3],
              }),
              (i.touchEventsDesktop = { start: t[0], move: t[1], end: t[2] }),
              i.support.touch || !i.params.simulateTouch
                ? i.touchEventsTouch
                : i.touchEventsDesktop
            );
          })(),
          touchEventsData: {
            isTouched: void 0,
            isMoved: void 0,
            allowTouchCallbacks: void 0,
            touchStartTime: void 0,
            isScrolling: void 0,
            currentTranslate: void 0,
            startTranslate: void 0,
            allowThresholdMove: void 0,
            focusableElements: i.params.focusableElements,
            lastClickTime: T(),
            clickTimeout: void 0,
            velocities: [],
            allowMomentumBounce: void 0,
            isTouchEvent: void 0,
            startMoving: void 0,
          },
          allowClick: !0,
          allowTouchMove: i.params.allowTouchMove,
          touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
          imagesToLoad: [],
          imagesLoaded: 0,
        }),
        i.emit("_swiper"),
        i.params.init && i.init(),
        i
      );
    }
    enable() {
      const e = this;
      e.enabled ||
        ((e.enabled = !0),
        e.params.grabCursor && e.setGrabCursor(),
        e.emit("enable"));
    }
    disable() {
      const e = this;
      e.enabled &&
        ((e.enabled = !1),
        e.params.grabCursor && e.unsetGrabCursor(),
        e.emit("disable"));
    }
    setProgress(e, t) {
      const s = this;
      e = Math.min(Math.max(e, 0), 1);
      const a = s.minTranslate(),
        n = (s.maxTranslate() - a) * e + a;
      s.translateTo(n, void 0 === t ? 0 : t),
        s.updateActiveIndex(),
        s.updateSlidesClasses();
    }
    emitContainerClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = e.el.className
        .split(" ")
        .filter(
          (t) =>
            0 === t.indexOf("swiper") ||
            0 === t.indexOf(e.params.containerModifierClass)
        );
      e.emit("_containerClasses", t.join(" "));
    }
    getSlideClasses(e) {
      const t = this;
      return t.destroyed
        ? ""
        : e.className
            .split(" ")
            .filter(
              (e) =>
                0 === e.indexOf("swiper-slide") ||
                0 === e.indexOf(t.params.slideClass)
            )
            .join(" ");
    }
    emitSlidesClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = [];
      e.slides.each((s) => {
        const a = e.getSlideClasses(s);
        t.push({ slideEl: s, classNames: a }), e.emit("_slideClass", s, a);
      }),
        e.emit("_slideClasses", t);
    }
    slidesPerViewDynamic(e, t) {
      void 0 === e && (e = "current"), void 0 === t && (t = !1);
      const {
        params: s,
        slides: a,
        slidesGrid: n,
        slidesSizesGrid: i,
        size: l,
        activeIndex: r,
      } = this;
      let o = 1;
      if (s.centeredSlides) {
        let e,
          t = a[r].swiperSlideSize;
        for (let s = r + 1; s < a.length; s += 1)
          a[s] &&
            !e &&
            ((t += a[s].swiperSlideSize), (o += 1), t > l && (e = !0));
        for (let s = r - 1; s >= 0; s -= 1)
          a[s] &&
            !e &&
            ((t += a[s].swiperSlideSize), (o += 1), t > l && (e = !0));
      } else if ("current" === e)
        for (let e = r + 1; e < a.length; e += 1) {
          (t ? n[e] + i[e] - n[r] < l : n[e] - n[r] < l) && (o += 1);
        }
      else
        for (let e = r - 1; e >= 0; e -= 1) {
          n[r] - n[e] < l && (o += 1);
        }
      return o;
    }
    update() {
      const e = this;
      if (!e || e.destroyed) return;
      const { snapGrid: t, params: s } = e;
      function a() {
        const t = e.rtlTranslate ? -1 * e.translate : e.translate,
          s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
        e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses();
      }
      let n;
      s.breakpoints && e.setBreakpoint(),
        e.updateSize(),
        e.updateSlides(),
        e.updateProgress(),
        e.updateSlidesClasses(),
        e.params.freeMode && e.params.freeMode.enabled
          ? (a(), e.params.autoHeight && e.updateAutoHeight())
          : ((n =
              ("auto" === e.params.slidesPerView ||
                e.params.slidesPerView > 1) &&
              e.isEnd &&
              !e.params.centeredSlides
                ? e.slideTo(e.slides.length - 1, 0, !1, !0)
                : e.slideTo(e.activeIndex, 0, !1, !0)),
            n || a()),
        s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
        e.emit("update");
    }
    changeDirection(e, t) {
      void 0 === t && (t = !0);
      const s = this,
        a = s.params.direction;
      return (
        e || (e = "horizontal" === a ? "vertical" : "horizontal"),
        e === a ||
          ("horizontal" !== e && "vertical" !== e) ||
          (s.$el
            .removeClass(`${s.params.containerModifierClass}${a}`)
            .addClass(`${s.params.containerModifierClass}${e}`),
          s.emitContainerClasses(),
          (s.params.direction = e),
          s.slides.each((t) => {
            "vertical" === e ? (t.style.width = "") : (t.style.height = "");
          }),
          s.emit("changeDirection"),
          t && s.update()),
        s
      );
    }
    mount(e) {
      const t = this;
      if (t.mounted) return !0;
      const s = E(e || t.params.el);
      if (!(e = s[0])) return !1;
      e.swiper = t;
      const a = () =>
        `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
      let n = (() => {
        if (e && e.shadowRoot && e.shadowRoot.querySelector) {
          const t = E(e.shadowRoot.querySelector(a()));
          return (t.children = (e) => s.children(e)), t;
        }
        return s.children ? s.children(a()) : E(s).children(a());
      })();
      if (0 === n.length && t.params.createElements) {
        const e = m().createElement("div");
        (n = E(e)),
          (e.className = t.params.wrapperClass),
          s.append(e),
          s.children(`.${t.params.slideClass}`).each((e) => {
            n.append(e);
          });
      }
      return (
        Object.assign(t, {
          $el: s,
          el: e,
          $wrapperEl: n,
          wrapperEl: n[0],
          mounted: !0,
          rtl: "rtl" === e.dir.toLowerCase() || "rtl" === s.css("direction"),
          rtlTranslate:
            "horizontal" === t.params.direction &&
            ("rtl" === e.dir.toLowerCase() || "rtl" === s.css("direction")),
          wrongRTL: "-webkit-box" === n.css("display"),
        }),
        !0
      );
    }
    init(e) {
      const t = this;
      if (t.initialized) return t;
      return (
        !1 === t.mount(e) ||
          (t.emit("beforeInit"),
          t.params.breakpoints && t.setBreakpoint(),
          t.addClasses(),
          t.params.loop && t.loopCreate(),
          t.updateSize(),
          t.updateSlides(),
          t.params.watchOverflow && t.checkOverflow(),
          t.params.grabCursor && t.enabled && t.setGrabCursor(),
          t.params.preloadImages && t.preloadImages(),
          t.params.loop
            ? t.slideTo(
                t.params.initialSlide + t.loopedSlides,
                0,
                t.params.runCallbacksOnInit,
                !1,
                !0
              )
            : t.slideTo(
                t.params.initialSlide,
                0,
                t.params.runCallbacksOnInit,
                !1,
                !0
              ),
          t.attachEvents(),
          (t.initialized = !0),
          t.emit("init"),
          t.emit("afterInit")),
        t
      );
    }
    destroy(e, t) {
      void 0 === e && (e = !0), void 0 === t && (t = !0);
      const s = this,
        { params: a, $el: n, $wrapperEl: i, slides: l } = s;
      return (
        void 0 === s.params ||
          s.destroyed ||
          (s.emit("beforeDestroy"),
          (s.initialized = !1),
          s.detachEvents(),
          a.loop && s.loopDestroy(),
          t &&
            (s.removeClasses(),
            n.removeAttr("style"),
            i.removeAttr("style"),
            l &&
              l.length &&
              l
                .removeClass(
                  [
                    a.slideVisibleClass,
                    a.slideActiveClass,
                    a.slideNextClass,
                    a.slidePrevClass,
                  ].join(" ")
                )
                .removeAttr("style")
                .removeAttr("data-swiper-slide-index")),
          s.emit("destroy"),
          Object.keys(s.eventsListeners).forEach((e) => {
            s.off(e);
          }),
          !1 !== e &&
            ((s.$el[0].swiper = null),
            (function (e) {
              const t = e;
              Object.keys(t).forEach((e) => {
                try {
                  t[e] = null;
                } catch (e) {}
                try {
                  delete t[e];
                } catch (e) {}
              });
            })(s)),
          (s.destroyed = !0)),
        null
      );
    }
    static extendDefaults(e) {
      A(re, e);
    }
    static get extendedDefaults() {
      return re;
    }
    static get defaults() {
      return ne;
    }
    static installModule(e) {
      oe.prototype.__modules__ || (oe.prototype.__modules__ = []);
      const t = oe.prototype.__modules__;
      "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
    }
    static use(e) {
      return Array.isArray(e)
        ? (e.forEach((e) => oe.installModule(e)), oe)
        : (oe.installModule(e), oe);
    }
  }
  Object.keys(le).forEach((e) => {
    Object.keys(le[e]).forEach((t) => {
      oe.prototype[t] = le[e][t];
    });
  }),
    oe.use([
      function (e) {
        let { swiper: t, on: s, emit: a } = e;
        const n = f();
        let i = null,
          l = null;
        const r = () => {
            t &&
              !t.destroyed &&
              t.initialized &&
              (a("beforeResize"), a("resize"));
          },
          o = () => {
            t && !t.destroyed && t.initialized && a("orientationchange");
          };
        s("init", () => {
          t.params.resizeObserver && void 0 !== n.ResizeObserver
            ? t &&
              !t.destroyed &&
              t.initialized &&
              ((i = new ResizeObserver((e) => {
                l = n.requestAnimationFrame(() => {
                  const { width: s, height: a } = t;
                  let n = s,
                    i = a;
                  e.forEach((e) => {
                    let { contentBoxSize: s, contentRect: a, target: l } = e;
                    (l && l !== t.el) ||
                      ((n = a ? a.width : (s[0] || s).inlineSize),
                      (i = a ? a.height : (s[0] || s).blockSize));
                  }),
                    (n === s && i === a) || r();
                });
              })),
              i.observe(t.el))
            : (n.addEventListener("resize", r),
              n.addEventListener("orientationchange", o));
        }),
          s("destroy", () => {
            l && n.cancelAnimationFrame(l),
              i && i.unobserve && t.el && (i.unobserve(t.el), (i = null)),
              n.removeEventListener("resize", r),
              n.removeEventListener("orientationchange", o);
          });
      },
      function (e) {
        let { swiper: t, extendParams: s, on: a, emit: n } = e;
        const i = [],
          l = f(),
          r = function (e, t) {
            void 0 === t && (t = {});
            const s = new (l.MutationObserver || l.WebkitMutationObserver)(
              (e) => {
                if (1 === e.length) return void n("observerUpdate", e[0]);
                const t = function () {
                  n("observerUpdate", e[0]);
                };
                l.requestAnimationFrame
                  ? l.requestAnimationFrame(t)
                  : l.setTimeout(t, 0);
              }
            );
            s.observe(e, {
              attributes: void 0 === t.attributes || t.attributes,
              childList: void 0 === t.childList || t.childList,
              characterData: void 0 === t.characterData || t.characterData,
            }),
              i.push(s);
          };
        s({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
          a("init", () => {
            if (t.params.observer) {
              if (t.params.observeParents) {
                const e = t.$el.parents();
                for (let t = 0; t < e.length; t += 1) r(e[t]);
              }
              r(t.$el[0], { childList: t.params.observeSlideChildren }),
                r(t.$wrapperEl[0], { attributes: !1 });
            }
          }),
          a("destroy", () => {
            i.forEach((e) => {
              e.disconnect();
            }),
              i.splice(0, i.length);
          });
      },
    ]);
  const ce = oe;
  function de(e, t, s, a) {
    const n = m();
    return (
      e.params.createElements &&
        Object.keys(a).forEach((i) => {
          if (!s[i] && !0 === s.auto) {
            let l = e.$el.children(`.${a[i]}`)[0];
            l ||
              ((l = n.createElement("div")),
              (l.className = a[i]),
              e.$el.append(l)),
              (s[i] = l),
              (t[i] = l);
          }
        }),
      s
    );
  }
  function pe(e) {
    let { swiper: t, extendParams: s, on: a, emit: n } = e;
    function i(e) {
      let s;
      return (
        e &&
          ((s = E(e)),
          t.params.uniqueNavElements &&
            "string" == typeof e &&
            s.length > 1 &&
            1 === t.$el.find(e).length &&
            (s = t.$el.find(e))),
        s
      );
    }
    function l(e, s) {
      const a = t.params.navigation;
      e &&
        e.length > 0 &&
        (e[s ? "addClass" : "removeClass"](a.disabledClass),
        e[0] && "BUTTON" === e[0].tagName && (e[0].disabled = s),
        t.params.watchOverflow &&
          t.enabled &&
          e[t.isLocked ? "addClass" : "removeClass"](a.lockClass));
    }
    function r() {
      if (t.params.loop) return;
      const { $nextEl: e, $prevEl: s } = t.navigation;
      l(s, t.isBeginning && !t.params.rewind),
        l(e, t.isEnd && !t.params.rewind);
    }
    function o(e) {
      e.preventDefault(),
        (!t.isBeginning || t.params.loop || t.params.rewind) && t.slidePrev();
    }
    function c(e) {
      e.preventDefault(),
        (!t.isEnd || t.params.loop || t.params.rewind) && t.slideNext();
    }
    function d() {
      const e = t.params.navigation;
      if (
        ((t.params.navigation = de(
          t,
          t.originalParams.navigation,
          t.params.navigation,
          { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" }
        )),
        !e.nextEl && !e.prevEl)
      )
        return;
      const s = i(e.nextEl),
        a = i(e.prevEl);
      s && s.length > 0 && s.on("click", c),
        a && a.length > 0 && a.on("click", o),
        Object.assign(t.navigation, {
          $nextEl: s,
          nextEl: s && s[0],
          $prevEl: a,
          prevEl: a && a[0],
        }),
        t.enabled ||
          (s && s.addClass(e.lockClass), a && a.addClass(e.lockClass));
    }
    function p() {
      const { $nextEl: e, $prevEl: s } = t.navigation;
      e &&
        e.length &&
        (e.off("click", c), e.removeClass(t.params.navigation.disabledClass)),
        s &&
          s.length &&
          (s.off("click", o), s.removeClass(t.params.navigation.disabledClass));
    }
    s({
      navigation: {
        nextEl: null,
        prevEl: null,
        hideOnClick: !1,
        disabledClass: "swiper-button-disabled",
        hiddenClass: "swiper-button-hidden",
        lockClass: "swiper-button-lock",
      },
    }),
      (t.navigation = {
        nextEl: null,
        $nextEl: null,
        prevEl: null,
        $prevEl: null,
      }),
      a("init", () => {
        d(), r();
      }),
      a("toEdge fromEdge lock unlock", () => {
        r();
      }),
      a("destroy", () => {
        p();
      }),
      a("enable disable", () => {
        const { $nextEl: e, $prevEl: s } = t.navigation;
        e &&
          e[t.enabled ? "removeClass" : "addClass"](
            t.params.navigation.lockClass
          ),
          s &&
            s[t.enabled ? "removeClass" : "addClass"](
              t.params.navigation.lockClass
            );
      }),
      a("click", (e, s) => {
        const { $nextEl: a, $prevEl: i } = t.navigation,
          l = s.target;
        if (t.params.navigation.hideOnClick && !E(l).is(i) && !E(l).is(a)) {
          if (
            t.pagination &&
            t.params.pagination &&
            t.params.pagination.clickable &&
            (t.pagination.el === l || t.pagination.el.contains(l))
          )
            return;
          let e;
          a
            ? (e = a.hasClass(t.params.navigation.hiddenClass))
            : i && (e = i.hasClass(t.params.navigation.hiddenClass)),
            n(!0 === e ? "navigationShow" : "navigationHide"),
            a && a.toggleClass(t.params.navigation.hiddenClass),
            i && i.toggleClass(t.params.navigation.hiddenClass);
        }
      }),
      Object.assign(t.navigation, { update: r, init: d, destroy: p });
  }
  function ue(e) {
    return (
      void 0 === e && (e = ""),
      `.${e
        .trim()
        .replace(/([\.:!\/])/g, "\\$1")
        .replace(/ /g, ".")}`
    );
  }
  function he(e) {
    let { swiper: t, extendParams: s, on: a, emit: n } = e;
    const i = "swiper-pagination";
    let l;
    s({
      pagination: {
        el: null,
        bulletElement: "span",
        clickable: !1,
        hideOnClick: !1,
        renderBullet: null,
        renderProgressbar: null,
        renderFraction: null,
        renderCustom: null,
        progressbarOpposite: !1,
        type: "bullets",
        dynamicBullets: !1,
        dynamicMainBullets: 1,
        formatFractionCurrent: (e) => e,
        formatFractionTotal: (e) => e,
        bulletClass: `${i}-bullet`,
        bulletActiveClass: `${i}-bullet-active`,
        modifierClass: `${i}-`,
        currentClass: `${i}-current`,
        totalClass: `${i}-total`,
        hiddenClass: `${i}-hidden`,
        progressbarFillClass: `${i}-progressbar-fill`,
        progressbarOppositeClass: `${i}-progressbar-opposite`,
        clickableClass: `${i}-clickable`,
        lockClass: `${i}-lock`,
        horizontalClass: `${i}-horizontal`,
        verticalClass: `${i}-vertical`,
      },
    }),
      (t.pagination = { el: null, $el: null, bullets: [] });
    let r = 0;
    function o() {
      return (
        !t.params.pagination.el ||
        !t.pagination.el ||
        !t.pagination.$el ||
        0 === t.pagination.$el.length
      );
    }
    function c(e, s) {
      const { bulletActiveClass: a } = t.params.pagination;
      e[s]().addClass(`${a}-${s}`)[s]().addClass(`${a}-${s}-${s}`);
    }
    function d() {
      const e = t.rtl,
        s = t.params.pagination;
      if (o()) return;
      const a =
          t.virtual && t.params.virtual.enabled
            ? t.virtual.slides.length
            : t.slides.length,
        i = t.pagination.$el;
      let d;
      const p = t.params.loop
        ? Math.ceil((a - 2 * t.loopedSlides) / t.params.slidesPerGroup)
        : t.snapGrid.length;
      if (
        (t.params.loop
          ? ((d = Math.ceil(
              (t.activeIndex - t.loopedSlides) / t.params.slidesPerGroup
            )),
            d > a - 1 - 2 * t.loopedSlides && (d -= a - 2 * t.loopedSlides),
            d > p - 1 && (d -= p),
            d < 0 && "bullets" !== t.params.paginationType && (d = p + d))
          : (d = void 0 !== t.snapIndex ? t.snapIndex : t.activeIndex || 0),
        "bullets" === s.type &&
          t.pagination.bullets &&
          t.pagination.bullets.length > 0)
      ) {
        const a = t.pagination.bullets;
        let n, o, p;
        if (
          (s.dynamicBullets &&
            ((l = a.eq(0)[t.isHorizontal() ? "outerWidth" : "outerHeight"](!0)),
            i.css(
              t.isHorizontal() ? "width" : "height",
              l * (s.dynamicMainBullets + 4) + "px"
            ),
            s.dynamicMainBullets > 1 &&
              void 0 !== t.previousIndex &&
              ((r += d - (t.previousIndex - t.loopedSlides || 0)),
              r > s.dynamicMainBullets - 1
                ? (r = s.dynamicMainBullets - 1)
                : r < 0 && (r = 0)),
            (n = Math.max(d - r, 0)),
            (o = n + (Math.min(a.length, s.dynamicMainBullets) - 1)),
            (p = (o + n) / 2)),
          a.removeClass(
            ["", "-next", "-next-next", "-prev", "-prev-prev", "-main"]
              .map((e) => `${s.bulletActiveClass}${e}`)
              .join(" ")
          ),
          i.length > 1)
        )
          a.each((e) => {
            const t = E(e),
              a = t.index();
            a === d && t.addClass(s.bulletActiveClass),
              s.dynamicBullets &&
                (a >= n && a <= o && t.addClass(`${s.bulletActiveClass}-main`),
                a === n && c(t, "prev"),
                a === o && c(t, "next"));
          });
        else {
          const e = a.eq(d),
            i = e.index();
          if ((e.addClass(s.bulletActiveClass), s.dynamicBullets)) {
            const e = a.eq(n),
              l = a.eq(o);
            for (let e = n; e <= o; e += 1)
              a.eq(e).addClass(`${s.bulletActiveClass}-main`);
            if (t.params.loop)
              if (i >= a.length) {
                for (let e = s.dynamicMainBullets; e >= 0; e -= 1)
                  a.eq(a.length - e).addClass(`${s.bulletActiveClass}-main`);
                a.eq(a.length - s.dynamicMainBullets - 1).addClass(
                  `${s.bulletActiveClass}-prev`
                );
              } else c(e, "prev"), c(l, "next");
            else c(e, "prev"), c(l, "next");
          }
        }
        if (s.dynamicBullets) {
          const n = Math.min(a.length, s.dynamicMainBullets + 4),
            i = (l * n - l) / 2 - p * l,
            r = e ? "right" : "left";
          a.css(t.isHorizontal() ? r : "top", `${i}px`);
        }
      }
      if (
        ("fraction" === s.type &&
          (i.find(ue(s.currentClass)).text(s.formatFractionCurrent(d + 1)),
          i.find(ue(s.totalClass)).text(s.formatFractionTotal(p))),
        "progressbar" === s.type)
      ) {
        let e;
        e = s.progressbarOpposite
          ? t.isHorizontal()
            ? "vertical"
            : "horizontal"
          : t.isHorizontal()
          ? "horizontal"
          : "vertical";
        const a = (d + 1) / p;
        let n = 1,
          l = 1;
        "horizontal" === e ? (n = a) : (l = a),
          i
            .find(ue(s.progressbarFillClass))
            .transform(`translate3d(0,0,0) scaleX(${n}) scaleY(${l})`)
            .transition(t.params.speed);
      }
      "custom" === s.type && s.renderCustom
        ? (i.html(s.renderCustom(t, d + 1, p)), n("paginationRender", i[0]))
        : n("paginationUpdate", i[0]),
        t.params.watchOverflow &&
          t.enabled &&
          i[t.isLocked ? "addClass" : "removeClass"](s.lockClass);
    }
    function p() {
      const e = t.params.pagination;
      if (o()) return;
      const s =
          t.virtual && t.params.virtual.enabled
            ? t.virtual.slides.length
            : t.slides.length,
        a = t.pagination.$el;
      let i = "";
      if ("bullets" === e.type) {
        let n = t.params.loop
          ? Math.ceil((s - 2 * t.loopedSlides) / t.params.slidesPerGroup)
          : t.snapGrid.length;
        t.params.freeMode &&
          t.params.freeMode.enabled &&
          !t.params.loop &&
          n > s &&
          (n = s);
        for (let s = 0; s < n; s += 1)
          e.renderBullet
            ? (i += e.renderBullet.call(t, s, e.bulletClass))
            : (i += `<${e.bulletElement} class="${e.bulletClass}"></${e.bulletElement}>`);
        a.html(i), (t.pagination.bullets = a.find(ue(e.bulletClass)));
      }
      "fraction" === e.type &&
        ((i = e.renderFraction
          ? e.renderFraction.call(t, e.currentClass, e.totalClass)
          : `<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`),
        a.html(i)),
        "progressbar" === e.type &&
          ((i = e.renderProgressbar
            ? e.renderProgressbar.call(t, e.progressbarFillClass)
            : `<span class="${e.progressbarFillClass}"></span>`),
          a.html(i)),
        "custom" !== e.type && n("paginationRender", t.pagination.$el[0]);
    }
    function u() {
      t.params.pagination = de(
        t,
        t.originalParams.pagination,
        t.params.pagination,
        { el: "swiper-pagination" }
      );
      const e = t.params.pagination;
      if (!e.el) return;
      let s = E(e.el);
      0 !== s.length &&
        (t.params.uniqueNavElements &&
          "string" == typeof e.el &&
          s.length > 1 &&
          ((s = t.$el.find(e.el)),
          s.length > 1 &&
            (s = s.filter((e) => E(e).parents(".swiper")[0] === t.el))),
        "bullets" === e.type && e.clickable && s.addClass(e.clickableClass),
        s.addClass(e.modifierClass + e.type),
        s.addClass(t.isHorizontal() ? e.horizontalClass : e.verticalClass),
        "bullets" === e.type &&
          e.dynamicBullets &&
          (s.addClass(`${e.modifierClass}${e.type}-dynamic`),
          (r = 0),
          e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)),
        "progressbar" === e.type &&
          e.progressbarOpposite &&
          s.addClass(e.progressbarOppositeClass),
        e.clickable &&
          s.on("click", ue(e.bulletClass), function (e) {
            e.preventDefault();
            let s = E(this).index() * t.params.slidesPerGroup;
            t.params.loop && (s += t.loopedSlides), t.slideTo(s);
          }),
        Object.assign(t.pagination, { $el: s, el: s[0] }),
        t.enabled || s.addClass(e.lockClass));
    }
    function h() {
      const e = t.params.pagination;
      if (o()) return;
      const s = t.pagination.$el;
      s.removeClass(e.hiddenClass),
        s.removeClass(e.modifierClass + e.type),
        s.removeClass(t.isHorizontal() ? e.horizontalClass : e.verticalClass),
        t.pagination.bullets &&
          t.pagination.bullets.removeClass &&
          t.pagination.bullets.removeClass(e.bulletActiveClass),
        e.clickable && s.off("click", ue(e.bulletClass));
    }
    a("init", () => {
      u(), p(), d();
    }),
      a("activeIndexChange", () => {
        (t.params.loop || void 0 === t.snapIndex) && d();
      }),
      a("snapIndexChange", () => {
        t.params.loop || d();
      }),
      a("slidesLengthChange", () => {
        t.params.loop && (p(), d());
      }),
      a("snapGridLengthChange", () => {
        t.params.loop || (p(), d());
      }),
      a("destroy", () => {
        h();
      }),
      a("enable disable", () => {
        const { $el: e } = t.pagination;
        e &&
          e[t.enabled ? "removeClass" : "addClass"](
            t.params.pagination.lockClass
          );
      }),
      a("lock unlock", () => {
        d();
      }),
      a("click", (e, s) => {
        const a = s.target,
          { $el: i } = t.pagination;
        if (
          t.params.pagination.el &&
          t.params.pagination.hideOnClick &&
          i.length > 0 &&
          !E(a).hasClass(t.params.pagination.bulletClass)
        ) {
          if (
            t.navigation &&
            ((t.navigation.nextEl && a === t.navigation.nextEl) ||
              (t.navigation.prevEl && a === t.navigation.prevEl))
          )
            return;
          const e = i.hasClass(t.params.pagination.hiddenClass);
          n(!0 === e ? "paginationShow" : "paginationHide"),
            i.toggleClass(t.params.pagination.hiddenClass);
        }
      }),
      Object.assign(t.pagination, {
        render: p,
        update: d,
        init: u,
        destroy: h,
      });
  }
  function me(e) {
    let t,
      { swiper: s, extendParams: a, on: n, emit: i } = e;
    function l() {
      const e = s.slides.eq(s.activeIndex);
      let a = s.params.autoplay.delay;
      e.attr("data-swiper-autoplay") &&
        (a = e.attr("data-swiper-autoplay") || s.params.autoplay.delay),
        clearTimeout(t),
        (t = k(() => {
          let e;
          s.params.autoplay.reverseDirection
            ? s.params.loop
              ? (s.loopFix(),
                (e = s.slidePrev(s.params.speed, !0, !0)),
                i("autoplay"))
              : s.isBeginning
              ? s.params.autoplay.stopOnLastSlide
                ? o()
                : ((e = s.slideTo(s.slides.length - 1, s.params.speed, !0, !0)),
                  i("autoplay"))
              : ((e = s.slidePrev(s.params.speed, !0, !0)), i("autoplay"))
            : s.params.loop
            ? (s.loopFix(),
              (e = s.slideNext(s.params.speed, !0, !0)),
              i("autoplay"))
            : s.isEnd
            ? s.params.autoplay.stopOnLastSlide
              ? o()
              : ((e = s.slideTo(0, s.params.speed, !0, !0)), i("autoplay"))
            : ((e = s.slideNext(s.params.speed, !0, !0)), i("autoplay")),
            ((s.params.cssMode && s.autoplay.running) || !1 === e) && l();
        }, a));
    }
    function r() {
      return (
        void 0 === t &&
        !s.autoplay.running &&
        ((s.autoplay.running = !0), i("autoplayStart"), l(), !0)
      );
    }
    function o() {
      return (
        !!s.autoplay.running &&
        void 0 !== t &&
        (t && (clearTimeout(t), (t = void 0)),
        (s.autoplay.running = !1),
        i("autoplayStop"),
        !0)
      );
    }
    function c(e) {
      s.autoplay.running &&
        (s.autoplay.paused ||
          (t && clearTimeout(t),
          (s.autoplay.paused = !0),
          0 !== e && s.params.autoplay.waitForTransition
            ? ["transitionend", "webkitTransitionEnd"].forEach((e) => {
                s.$wrapperEl[0].addEventListener(e, p);
              })
            : ((s.autoplay.paused = !1), l())));
    }
    function d() {
      const e = m();
      "hidden" === e.visibilityState && s.autoplay.running && c(),
        "visible" === e.visibilityState &&
          s.autoplay.paused &&
          (l(), (s.autoplay.paused = !1));
    }
    function p(e) {
      s &&
        !s.destroyed &&
        s.$wrapperEl &&
        e.target === s.$wrapperEl[0] &&
        (["transitionend", "webkitTransitionEnd"].forEach((e) => {
          s.$wrapperEl[0].removeEventListener(e, p);
        }),
        (s.autoplay.paused = !1),
        s.autoplay.running ? l() : o());
    }
    function u() {
      s.params.autoplay.disableOnInteraction ? o() : (i("autoplayPause"), c()),
        ["transitionend", "webkitTransitionEnd"].forEach((e) => {
          s.$wrapperEl[0].removeEventListener(e, p);
        });
    }
    function h() {
      s.params.autoplay.disableOnInteraction ||
        ((s.autoplay.paused = !1), i("autoplayResume"), l());
    }
    (s.autoplay = { running: !1, paused: !1 }),
      a({
        autoplay: {
          enabled: !1,
          delay: 3e3,
          waitForTransition: !0,
          disableOnInteraction: !0,
          stopOnLastSlide: !1,
          reverseDirection: !1,
          pauseOnMouseEnter: !1,
        },
      }),
      n("init", () => {
        if (s.params.autoplay.enabled) {
          r();
          m().addEventListener("visibilitychange", d),
            s.params.autoplay.pauseOnMouseEnter &&
              (s.$el.on("mouseenter", u), s.$el.on("mouseleave", h));
        }
      }),
      n("beforeTransitionStart", (e, t, a) => {
        s.autoplay.running &&
          (a || !s.params.autoplay.disableOnInteraction
            ? s.autoplay.pause(t)
            : o());
      }),
      n("sliderFirstMove", () => {
        s.autoplay.running &&
          (s.params.autoplay.disableOnInteraction ? o() : c());
      }),
      n("touchEnd", () => {
        s.params.cssMode &&
          s.autoplay.paused &&
          !s.params.autoplay.disableOnInteraction &&
          l();
      }),
      n("destroy", () => {
        s.$el.off("mouseenter", u),
          s.$el.off("mouseleave", h),
          s.autoplay.running && o();
        m().removeEventListener("visibilitychange", d);
      }),
      Object.assign(s.autoplay, { pause: c, run: l, start: r, stop: o });
  }
  function ge(e) {
    let { swiper: t, extendParams: s, on: a } = e;
    s({
      thumbs: {
        swiper: null,
        multipleActiveThumbs: !0,
        autoScrollOffset: 0,
        slideThumbActiveClass: "swiper-slide-thumb-active",
        thumbsContainerClass: "swiper-thumbs",
      },
    });
    let n = !1,
      i = !1;
    function l() {
      const e = t.thumbs.swiper;
      if (!e || e.destroyed) return;
      const s = e.clickedIndex,
        a = e.clickedSlide;
      if (a && E(a).hasClass(t.params.thumbs.slideThumbActiveClass)) return;
      if (null == s) return;
      let n;
      if (
        ((n = e.params.loop
          ? parseInt(E(e.clickedSlide).attr("data-swiper-slide-index"), 10)
          : s),
        t.params.loop)
      ) {
        let e = t.activeIndex;
        t.slides.eq(e).hasClass(t.params.slideDuplicateClass) &&
          (t.loopFix(),
          (t._clientLeft = t.$wrapperEl[0].clientLeft),
          (e = t.activeIndex));
        const s = t.slides
            .eq(e)
            .prevAll(`[data-swiper-slide-index="${n}"]`)
            .eq(0)
            .index(),
          a = t.slides
            .eq(e)
            .nextAll(`[data-swiper-slide-index="${n}"]`)
            .eq(0)
            .index();
        n = void 0 === s ? a : void 0 === a ? s : a - e < e - s ? a : s;
      }
      t.slideTo(n);
    }
    function r() {
      const { thumbs: e } = t.params;
      if (n) return !1;
      n = !0;
      const s = t.constructor;
      if (e.swiper instanceof s)
        (t.thumbs.swiper = e.swiper),
          Object.assign(t.thumbs.swiper.originalParams, {
            watchSlidesProgress: !0,
            slideToClickedSlide: !1,
          }),
          Object.assign(t.thumbs.swiper.params, {
            watchSlidesProgress: !0,
            slideToClickedSlide: !1,
          });
      else if (L(e.swiper)) {
        const a = Object.assign({}, e.swiper);
        Object.assign(a, { watchSlidesProgress: !0, slideToClickedSlide: !1 }),
          (t.thumbs.swiper = new s(a)),
          (i = !0);
      }
      return (
        t.thumbs.swiper.$el.addClass(t.params.thumbs.thumbsContainerClass),
        t.thumbs.swiper.on("tap", l),
        !0
      );
    }
    function o(e) {
      const s = t.thumbs.swiper;
      if (!s || s.destroyed) return;
      const a =
          "auto" === s.params.slidesPerView
            ? s.slidesPerViewDynamic()
            : s.params.slidesPerView,
        n = t.params.thumbs.autoScrollOffset,
        i = n && !s.params.loop;
      if (t.realIndex !== s.realIndex || i) {
        let l,
          r,
          o = s.activeIndex;
        if (s.params.loop) {
          s.slides.eq(o).hasClass(s.params.slideDuplicateClass) &&
            (s.loopFix(),
            (s._clientLeft = s.$wrapperEl[0].clientLeft),
            (o = s.activeIndex));
          const e = s.slides
              .eq(o)
              .prevAll(`[data-swiper-slide-index="${t.realIndex}"]`)
              .eq(0)
              .index(),
            a = s.slides
              .eq(o)
              .nextAll(`[data-swiper-slide-index="${t.realIndex}"]`)
              .eq(0)
              .index();
          (l =
            void 0 === e
              ? a
              : void 0 === a
              ? e
              : a - o == o - e
              ? s.params.slidesPerGroup > 1
                ? a
                : o
              : a - o < o - e
              ? a
              : e),
            (r = t.activeIndex > t.previousIndex ? "next" : "prev");
        } else (l = t.realIndex), (r = l > t.previousIndex ? "next" : "prev");
        i && (l += "next" === r ? n : -1 * n),
          s.visibleSlidesIndexes &&
            s.visibleSlidesIndexes.indexOf(l) < 0 &&
            (s.params.centeredSlides
              ? (l =
                  l > o ? l - Math.floor(a / 2) + 1 : l + Math.floor(a / 2) - 1)
              : l > o && s.params.slidesPerGroup,
            s.slideTo(l, e ? 0 : void 0));
      }
      let l = 1;
      const r = t.params.thumbs.slideThumbActiveClass;
      if (
        (t.params.slidesPerView > 1 &&
          !t.params.centeredSlides &&
          (l = t.params.slidesPerView),
        t.params.thumbs.multipleActiveThumbs || (l = 1),
        (l = Math.floor(l)),
        s.slides.removeClass(r),
        s.params.loop || (s.params.virtual && s.params.virtual.enabled))
      )
        for (let e = 0; e < l; e += 1)
          s.$wrapperEl
            .children(`[data-swiper-slide-index="${t.realIndex + e}"]`)
            .addClass(r);
      else
        for (let e = 0; e < l; e += 1) s.slides.eq(t.realIndex + e).addClass(r);
    }
    (t.thumbs = { swiper: null }),
      a("beforeInit", () => {
        const { thumbs: e } = t.params;
        e && e.swiper && (r(), o(!0));
      }),
      a("slideChange update resize observerUpdate", () => {
        o();
      }),
      a("setTransition", (e, s) => {
        const a = t.thumbs.swiper;
        a && !a.destroyed && a.setTransition(s);
      }),
      a("beforeDestroy", () => {
        const e = t.thumbs.swiper;
        e && !e.destroyed && i && e.destroy();
      }),
      Object.assign(t.thumbs, { init: r, update: o });
  }
  function fe() {
    let e = document.querySelectorAll(
      '[class*="__swiper"]:not(.swiper-wrapper)'
    );
    e &&
      e.forEach((e) => {
        e.parentElement.classList.add("swiper"),
          e.classList.add("swiper-wrapper");
        for (const t of e.children) t.classList.add("swiper-slide");
      });
  }
  window.addEventListener("load", function (e) {
    !(function () {
      if ((fe(), document.querySelector(".thumbs-images"))) {
        const e = new ce(".thumbs-images", {
          modules: [pe, he, ge],
          observer: !0,
          observeParents: !0,
          slidesPerView: 3,
          direction: "horizontal",
          spaceBetween: 6,
          speed: 800,
          breakpoints: {
            480: { direction: "horizontal", slidesPerView: 4 },
            768: { direction: "vertical", slidesPerView: 6 },
          },
          on: {},
        });
        new ce(".images-product__slider", {
          modules: [pe, he, ge],
          thumbs: { swiper: e },
          observer: !0,
          observeParents: !0,
          slidesPerView: 1,
          spaceBetween: 30,
          autoHeight: !0,
          speed: 800,
          navigation: {
            nextEl: ".arrow .thumbs-arrow__next",
            prevEl: ".arrow .thumbs-arrow__prev",
            disabledClass: "disabled_swiper_button",
          },
          on: {},
        });
      }
      document.querySelector(".additional-products__slider") &&
        new ce(".additional-products__slider", {
          modules: [pe, he, me],
          effect: "fade",
          autoplay: { delay: 2e3, disableOnInteraction: !1 },
          observer: !0,
          observeParents: !0,
          slidesPerView: 4,
          spaceBetween: 30,
          speed: 800,
          navigation: {
            nextEl: ".additional-products__arrows .additional-arrow__next",
            prevEl: ".additional-products__arrows .additional-arrow__prev",
            disabledClass: "disabled_swiper_button",
          },
          breakpoints: {
            320: { slidesPerView: 1.1, spaceBetween: 5 },
            415: { slidesPerView: 1.5, spaceBetween: 5 },
            560: { slidesPerView: 2.1, spaceBetween: 10 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            1100: { slidesPerView: 3, spaceBetween: 20 },
            1268: { slidesPerView: 4, spaceBetween: 30 },
          },
          on: {},
        });
    })();
  });
  e.watcher = new (class {
    constructor(e) {
      (this.config = Object.assign({ logging: !0 }, e)),
        this.observer,
        !document.documentElement.classList.contains("watcher") &&
          this.scrollWatcherRun();
    }
    scrollWatcherUpdate() {
      this.scrollWatcherRun();
    }
    scrollWatcherRun() {
      document.documentElement.classList.add("watcher"),
        this.scrollWatcherConstructor(
          document.querySelectorAll("[data-watch]")
        );
    }
    scrollWatcherConstructor(e) {
      if (e.length) {
        this.scrollWatcherLogging(
          `Проснулся, слежу за объектами (${e.length})...`
        ),
          o(
            Array.from(e).map(function (e) {
              return `${
                e.dataset.watchRoot ? e.dataset.watchRoot : null
              }|${e.dataset.watchMargin ? e.dataset.watchMargin : "0px"}|${e.dataset.watchThreshold ? e.dataset.watchThreshold : 0}`;
            })
          ).forEach((t) => {
            let s = t.split("|"),
              a = { root: s[0], margin: s[1], threshold: s[2] },
              n = Array.from(e).filter(function (e) {
                let t = e.dataset.watchRoot ? e.dataset.watchRoot : null,
                  s = e.dataset.watchMargin ? e.dataset.watchMargin : "0px",
                  n = e.dataset.watchThreshold ? e.dataset.watchThreshold : 0;
                if (
                  String(t) === a.root &&
                  String(s) === a.margin &&
                  String(n) === a.threshold
                )
                  return e;
              }),
              i = this.getScrollWatcherConfig(a);
            this.scrollWatcherInit(n, i);
          });
      } else
        this.scrollWatcherLogging("Сплю, нет объектов для слежения. ZzzZZzz");
    }
    getScrollWatcherConfig(e) {
      let t = {};
      if (
        (document.querySelector(e.root)
          ? (t.root = document.querySelector(e.root))
          : "null" !== e.root &&
            this.scrollWatcherLogging(
              `Эмм... родительского объекта ${e.root} нет на странице`
            ),
        (t.rootMargin = e.margin),
        !(e.margin.indexOf("px") < 0 && e.margin.indexOf("%") < 0))
      ) {
        if ("prx" === e.threshold) {
          e.threshold = [];
          for (let t = 0; t <= 1; t += 0.005) e.threshold.push(t);
        } else e.threshold = e.threshold.split(",");
        return (t.threshold = e.threshold), t;
      }
      this.scrollWatcherLogging(
        "Ой ой, настройку data-watch-margin нужно задавать в PX или %"
      );
    }
    scrollWatcherCreate(e) {
      this.observer = new IntersectionObserver((e, t) => {
        e.forEach((e) => {
          this.scrollWatcherCallback(e, t);
        });
      }, e);
    }
    scrollWatcherInit(e, t) {
      this.scrollWatcherCreate(t), e.forEach((e) => this.observer.observe(e));
    }
    scrollWatcherIntersecting(e, t) {
      e.isIntersecting
        ? (!t.classList.contains("_watcher-view") &&
            t.classList.add("_watcher-view"),
          this.scrollWatcherLogging(
            `Я вижу ${t.classList}, добавил класс _watcher-view`
          ))
        : (t.classList.contains("_watcher-view") &&
            t.classList.remove("_watcher-view"),
          this.scrollWatcherLogging(
            `Я не вижу ${t.classList}, убрал класс _watcher-view`
          ));
    }
    scrollWatcherOff(e, t) {
      t.unobserve(e),
        this.scrollWatcherLogging(`Я перестал следить за ${e.classList}`);
    }
    scrollWatcherLogging(e) {
      this.config.logging && r(`[Наблюдатель]: ${e}`);
    }
    scrollWatcherCallback(e, t) {
      const s = e.target;
      this.scrollWatcherIntersecting(e, s),
        s.hasAttribute("data-watch-once") &&
          e.isIntersecting &&
          this.scrollWatcherOff(s, t),
        document.dispatchEvent(
          new CustomEvent("watcherCallback", { detail: { entry: e } })
        );
    }
  })({});
  let ve = !1;
  function be(e) {
    this.type = e;
  }
  setTimeout(() => {
    if (ve) {
      let e = new Event("windowScroll");
      window.addEventListener("scroll", function (t) {
        document.dispatchEvent(e);
      });
    }
  }, 0),
    (be.prototype.init = function () {
      const e = this;
      (this.оbjects = []),
        (this.daClassname = "_dynamic_adapt_"),
        (this.nodes = document.querySelectorAll("[data-da]"));
      for (let e = 0; e < this.nodes.length; e++) {
        const t = this.nodes[e],
          s = t.dataset.da.trim().split(","),
          a = {};
        (a.element = t),
          (a.parent = t.parentNode),
          (a.destination = document.querySelector(s[0].trim())),
          (a.breakpoint = s[1] ? s[1].trim() : "767"),
          (a.place = s[2] ? s[2].trim() : "last"),
          (a.index = this.indexInParent(a.parent, a.element)),
          this.оbjects.push(a);
      }
      this.arraySort(this.оbjects),
        (this.mediaQueries = Array.prototype.map.call(
          this.оbjects,
          function (e) {
            return (
              "(" +
              this.type +
              "-width: " +
              e.breakpoint +
              "px)," +
              e.breakpoint
            );
          },
          this
        )),
        (this.mediaQueries = Array.prototype.filter.call(
          this.mediaQueries,
          function (e, t, s) {
            return Array.prototype.indexOf.call(s, e) === t;
          }
        ));
      for (let t = 0; t < this.mediaQueries.length; t++) {
        const s = this.mediaQueries[t],
          a = String.prototype.split.call(s, ","),
          n = window.matchMedia(a[0]),
          i = a[1],
          l = Array.prototype.filter.call(this.оbjects, function (e) {
            return e.breakpoint === i;
          });
        n.addListener(function () {
          e.mediaHandler(n, l);
        }),
          this.mediaHandler(n, l);
      }
    }),
    (be.prototype.mediaHandler = function (e, t) {
      if (e.matches)
        for (let e = 0; e < t.length; e++) {
          const s = t[e];
          (s.index = this.indexInParent(s.parent, s.element)),
            this.moveTo(s.place, s.element, s.destination);
        }
      else
        for (let e = t.length - 1; e >= 0; e--) {
          const s = t[e];
          s.element.classList.contains(this.daClassname) &&
            this.moveBack(s.parent, s.element, s.index);
        }
    }),
    (be.prototype.moveTo = function (e, t, s) {
      t.classList.add(this.daClassname),
        "last" === e || e >= s.children.length
          ? s.insertAdjacentElement("beforeend", t)
          : "first" !== e
          ? s.children[e].insertAdjacentElement("beforebegin", t)
          : s.insertAdjacentElement("afterbegin", t);
    }),
    (be.prototype.moveBack = function (e, t, s) {
      t.classList.remove(this.daClassname),
        void 0 !== e.children[s]
          ? e.children[s].insertAdjacentElement("beforebegin", t)
          : e.insertAdjacentElement("beforeend", t);
    }),
    (be.prototype.indexInParent = function (e, t) {
      const s = Array.prototype.slice.call(e.children);
      return Array.prototype.indexOf.call(s, t);
    }),
    (be.prototype.arraySort = function (e) {
      "min" === this.type
        ? Array.prototype.sort.call(e, function (e, t) {
            return e.breakpoint === t.breakpoint
              ? e.place === t.place
                ? 0
                : "first" === e.place || "last" === t.place
                ? -1
                : "last" === e.place || "first" === t.place
                ? 1
                : e.place - t.place
              : e.breakpoint - t.breakpoint;
          })
        : Array.prototype.sort.call(e, function (e, t) {
            return e.breakpoint === t.breakpoint
              ? e.place === t.place
                ? 0
                : "first" === e.place || "last" === t.place
                ? 1
                : "last" === e.place || "first" === t.place
                ? -1
                : t.place - e.place
              : t.breakpoint - e.breakpoint;
          });
    });
  new be("max").init(),
    document.addEventListener("DOMContentLoaded", () => {
      const e = document.querySelector(".top-header"),
        t = e.querySelector(".top-header-mobile__contact"),
        s = e.querySelector(".header-arrow");
      t.addEventListener("click", () => {
        e.classList.toggle("top-mobile__active"),
          e.classList.contains("top-mobile__active")
            ? (s.style.transform = "rotate(180deg)")
            : (s.style.transform = "rotate(0deg)");
      });
      document.querySelector(".special-offer");
      const a = document.querySelector(".special-offer__title"),
        n = document.querySelector(".special-offer__body");
      a &&
        a.addEventListener("click", () => {
          n.classList.toggle("_active");
        });
      let i = document.querySelector(".dimensions");
      i &&
        ((i = i.querySelectorAll(".dimensions-product__cart")),
        i.forEach((e) => {
          e.addEventListener("click", () => {
            i.forEach((e) => {
              e.classList.remove("_active");
            }),
              e.classList.toggle("_active");
          });
        }));
      let l = document.querySelector(".furniture");
      l &&
        ((l = l.querySelectorAll(".dimensions-product__cart")),
        l.forEach((e) => {
          e.addEventListener("click", () => {
            l.forEach((e) => {
              e.classList.remove("_active");
            }),
              e.classList.toggle("_active");
          });
        }));
      const r = document.querySelector(".dimensions-product__addition"),
        o = document.querySelector(".dimensions");
      r &&
        r.addEventListener("click", () => {
          o.insertAdjacentHTML(
            "beforeend",
            '\n       <div class="dimensions-product__cart">\n          <p>300 х 350</p>\n       </div>\n  \n       <div class="dimensions-product__cart">\n          <p>350 х 400</p>\n       </div>\n  \n       <div class="dimensions-product__cart">\n          <p>400 х 350</p>\n       </div>\n    '
          ),
            (r.style.display = "none");
          const e = document
            .querySelector(".dimensions")
            .querySelectorAll(".dimensions-product__cart");
          e.forEach((t) => {
            t.addEventListener("click", () => {
              e.forEach((e) => {
                e.classList.remove("_active");
              }),
                t.classList.toggle("_active");
            });
          });
        });
      if (document.querySelector("#countdown")) {
        const c = document.querySelector("#days"),
          d = document.querySelector("#hours"),
          p = document.querySelector("#minutes"),
          u = document.querySelector("#seconds");
        function h() {
          const e = new Date(),
            t = new Date("August 14 2022 00:00:00") - e,
            s = Math.floor(t / 1e3 / 60 / 60 / 24),
            a = Math.floor(t / 1e3 / 60 / 60) % 24,
            n = Math.floor(t / 1e3 / 60) % 60,
            i = Math.floor(t / 1e3) % 60;
          (c.innerHTML = s),
            (d.innerHTML = a < 10 ? `0${a}` : a),
            (p.innerHTML = n < 10 ? `0${n}` : n),
            (u.innerHTML = i < 10 ? `0${i}` : i);
        }
        setInterval(h, 1e3);
      }
      document.querySelectorAll(".counter-package__wrapper").forEach((e) => {
        e.addEventListener("click", (t) => {
          let s = 0;
          ("plus" !== t.target.dataset.action &&
            "minus" !== t.target.dataset.action) ||
            (s = e.querySelector("[data-counter]")),
            "plus" === t.target.dataset.action && (s.innerHTML = ++s.innerHTML),
            "minus" === t.target.dataset.action &&
              parseInt(s.innerHTML) > 1 &&
              (s.innerHTML = --s.innerHTML);
        });
      });
    });
  let ye = document.querySelector(".set-product__btns");
  const Se = document.querySelector("#tableProduct"),
    _e = document.querySelector(".header-cart-moble__count");
  let we,
    Ce = {},
    Ee = 1;
  function ke(e) {
    return e.replace(/\s/g, "");
  }
  function Te(e) {
    return String(e).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
  }
  if (ye) {
    function Pe() {
      const e = document.querySelector("[data-current]"),
        t = document.querySelector("[data-basket]");
      let s = parseInt(ke(e.innerHTML)) * parseInt(Ee);
      (t.innerHTML = `${Te(s)} руб.(${Ee}шт.)`),
        localStorage.setItem("backetItem", JSON.stringify(t.innerHTML));
    }
    (ye = ye.querySelector("[data-cart]")),
      ye.addEventListener("click", (e) => {
        localStorage.setItem("pieces", JSON.stringify(Ee)),
          (_e.innerHTML = Ee),
          e.preventDefault(),
          Pe(),
          Ee++,
          (Ce = {
            imgSrc: document.querySelector("[data-img]").getAttribute("src"),
            title: document.querySelector("[data-title]").textContent,
            price: document.querySelector("[data-current]").textContent,
          }),
          (we = localStorage.setItem("backet", JSON.stringify(Ce)));
      });
  }
  if (Se) {
    const Oe = JSON.parse(localStorage.getItem("backetItem"));
    (document.querySelector(".cart-toobler__text").innerHTML = Oe),
      (_e.innerHTML = parseInt(JSON.parse(localStorage.getItem("pieces"))));
    const Ie = JSON.parse(localStorage.getItem("backet"));
    if (Ie) {
      const je = `\n    <tr id="footer-cart">\n       <td>\n         <a href="#" class="cart__image">\n           <img src="${
        Ie.imgSrc
      }" alt="" />\n         </a>\n       </td>\n       <td\n         class="td-va-middle"\n         data-title="Названия товаров и комплектация"\n       >\n         <a href="#" class="table-cart__title">\n           <strong\n             >${
        Ie.title
      }</strong\n           >\n         </a>\n       </td>\n       <td\n         class="number-td td-center td-va-middle"\n         data-title="Кол-во"\n       >\n       <div class="table-cart__number">\n       <div\n         class="table-cart__control minuse"\n         data-action="minus"\n       >\n         <img\n           src="img/minuse.svg"\n           alt=""\n           data-action="minus"\n         />\n       </div>\n       <div data-counter class="table-cart__current">\n          ${parseInt(
        JSON.parse(localStorage.getItem("pieces"))
      )}\n       </div>\n       <div\n         class="table-cart__control pluse"\n         data-action="plus"\n       >\n         <img\n           src="img/pluse.svg"\n           alt=""\n           data-action="plus"\n         />\n       </div>\n     </div>\n       </td>\n       <td\n         class="td-center td-va-middle"\n         data-title="Стоимость"\n       >\n         <div data-finalprice>${
        Ie.price
      }</div>\n       </td>\n       <td class="td-va-middle">\n         <a href="" id="delete" class="delete"\n           ><img src="img/delete.svg" alt=""\n         /></a>\n       </td>\n     </tr>\n `;
      Se.insertAdjacentHTML("beforeend", je);
    }
    document.querySelectorAll("#delete").forEach((e) => {
      e.addEventListener("click", (e) => {
        localStorage.removeItem("backet"),
          localStorage.removeItem("backetItem");
      });
    });
    document.querySelectorAll(".table-cart__number").forEach((e) => {
      e.addEventListener("click", (t) => {
        let s = 0;
        ("plus" !== t.target.dataset.action &&
          "minus" !== t.target.dataset.action) ||
          (s = e.querySelector("[data-counter]")),
          "plus" === t.target.dataset.action && (s.innerHTML = ++s.innerHTML),
          "minus" === t.target.dataset.action &&
            parseInt(s.innerHTML) > 1 &&
            (s.innerHTML = --s.innerHTML);
      });
    });
    const qe = document.querySelectorAll("#footer-cart"),
      ze = document.querySelector(".footer-form__price"),
      De = document.querySelector(".footer-form__btn");
    function Be() {
      const e = document.querySelector("[data-counter]"),
        t = document.querySelector("[data-finalprice]");
      ze.innerHTML = Te(
        parseInt(e.innerHTML) * parseInt(ke(t.innerHTML)) + " руб."
      );
    }
    const He = document.querySelector("[data-counter]"),
      Ne = document.querySelector("[data-finalprice]");
    qe.length > 0 &&
      ((ze.innerHTML = Te(
        parseInt(He.innerHTML) * parseInt(ke(Ne.innerHTML)) + " руб."
      )),
      De.addEventListener("click", (e) => {
        e.preventDefault(), Be();
      }));
    const Ge = document.querySelector(".footer-form");
    qe.length >= 1 ? (Ge.style.display = "block") : (Ge.style.display = "none");
  }
  const xe = document.querySelector(".buyers-reviews__photo"),
    Le = document.querySelectorAll(".buyers-reviews__img img"),
    $e = document.querySelectorAll(".buyers-reviews__img");
  if (xe) {
    let We;
    function Ve() {
      const e = xe.clientWidth,
        t = parseInt((e / 135 + "").split(".")[0], 10);
      $e.forEach((e) => {
        e.classList.remove("_active"),
          (e.querySelector("img").style.opacity = "1"),
          e.querySelector(".buyers-reviews__figure") &&
            e.querySelector(".buyers-reviews__figure").remove();
      });
      const s = Le[t - 1];
      if (s) {
        const e = xe.children.length;
        (s.style.opacity = "0.3"),
          s.closest(".buyers-reviews__img").classList.add("_active"),
          s.closest(".buyers-reviews__img").classList.contains("_active") &&
            ((We = document.createElement("span")),
            (We.innerHTML = "+ " + (e - t)),
            We.classList.add("buyers-reviews__figure"),
            s.closest(".buyers-reviews__img").append(We));
      }
      const a = document
        .querySelector(".buyers-reviews__img._active")
        .querySelector(".buyers-reviews__figure");
      a.addEventListener("click", () => {
        xe.classList.add("_active"),
          a.remove(),
          $e.forEach((e) => {
            e.classList.remove("_active"),
              (e.querySelector("img").style.opacity = "1");
          });
      });
    }
    Ve(), window.addEventListener("resize", Ve);
  }
  const Ae = document.querySelector(".package-structure__body"),
    Me = document.querySelector(".package-structure__btn");
  Ae &&
    Me.addEventListener("click", (e) => {
      e.preventDefault();
      Ae.insertAdjacentHTML(
        "beforeend",
        '\n    <div class="package-structure__block">\n    <div class="package-structure__item item-package">\n      <div class="item-package__title">\n        Линейные светильники:\n      </div>\n      <div class="item-package__body body-package">\n        <div class="body-package__main">\n          <a href="#" class="body-package__img">\n            <img src="img/camera.svg" alt="" />\n          </a>\n          <div class="body-package__headings">\n            <div class="body-package__subtitle">\n              Наименование изделия\n            </div>\n            <a href="#" class="body-package__title">\n              Светильник Novotech Ratio 358099, арматура\n              черная, плафон пластик черный, 31х6 см\n            </a>\n          </div>\n        </div>\n        <div class="body-package__size">\n          <div class="body-package__subtitle">\n            Габариты ШxВxГ (см)\n          </div>\n          <div class="body-package__text">36x6x4</div>\n        </div>\n        <div class="body-package__price">\n          <div class="body-package__subtitle">\n            Стоимость\n          </div>\n          <div class="body-package__previous">\n            3 690 руб.\n          </div>\n          <s class="body-package__current">\n            4 700 руб.\n          </s>\n        </div>\n        <div\n          class="body-package__counter counter-package"\n        >\n          <div class="body-package__subtitle">\n            Кол-во\n          </div>\n          <div class="counter-package__wrapper">\n            <div\n              class="counter-package__control minuse"\n              data-action="minus"\n            >\n              <img\n                src="img/minuse.svg"\n                alt=""\n                data-action="minus"\n              />\n            </div>\n            <div\n              class="counter-package__current"\n              data-counter\n            >\n              1\n            </div>\n            <div\n              class="counter-package__control pluse"\n              data-action="plus"\n            >\n              <img\n                src="img/pluse.svg"\n                alt=""\n                data-action="plus"\n              />\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class="item-package__footer footer-package">\n        <div class="footer-package__product">\n          <div\n            class="products-catalog__code footer-package__item"\n          >\n            <span>Артикул:</span><b>358358103103</b>\n            <a href="#"\n              ><img src="img/code.svg" alt=""\n            /></a>\n          </div>\n          <div\n            class="products-catalog__code footer-package__item"\n          >\n            <span>Код товара:</span><b>351949</b>\n            <a href="#"\n              ><img src="img/code.svg" alt=""\n            /></a>\n          </div>\n        </div>\n        <a href="#" class="footer-package__btn few">\n          Остаток: <span>Мало</span>\n        </a>\n      </div>\n    </div>\n    <div class="package-structure__item item-package">\n      <div class="item-package__title"></div>\n      <div class="item-package__body body-package">\n        <div class="body-package__main">\n          <a href="#" class="body-package__img">\n            <img src="img/camera.svg" alt="" />\n          </a>\n          <div class="body-package__headings">\n            <div class="body-package__subtitle">\n              Наименование изделия\n            </div>\n            <a href="#" class="body-package__title">\n              Светильник Novotech Ratio 358099, арматура\n              черная, плафон пластик черный, 31х6 см\n            </a>\n          </div>\n        </div>\n        <div class="body-package__size">\n          <div class="body-package__subtitle">\n            Габариты ШxВxГ (см)\n          </div>\n          <div class="body-package__text">36x6x4</div>\n        </div>\n        <div class="body-package__price">\n          <div class="body-package__subtitle">\n            Стоимость\n          </div>\n          <div class="body-package__previous">\n            3 590 руб.\n          </div>\n          <s class="body-package__current">\n            4 500 руб.\n          </s>\n        </div>\n        <div\n          class="body-package__counter counter-package"\n        >\n          <div class="body-package__subtitle">\n            Кол-во\n          </div>\n          <div class="counter-package__wrapper">\n            <div\n              class="counter-package__control minuse"\n              data-action="minus"\n            >\n              <img\n                src="img/minuse.svg"\n                alt=""\n                data-action="minus"\n              />\n            </div>\n            <div\n              class="counter-package__current"\n              data-counter\n            >\n              1\n            </div>\n            <div\n              class="counter-package__control pluse"\n              data-action="plus"\n            >\n              <img\n                src="img/pluse.svg"\n                alt=""\n                data-action="plus"\n              />\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class="item-package__footer footer-package">\n        <div class="footer-package__product">\n          <div\n            class="products-catalog__code footer-package__item"\n          >\n            <span>Артикул:</span><b>358358103103</b>\n            <a href="#"\n              ><img src="img/code.svg" alt=""\n            /></a>\n          </div>\n          <div\n            class="products-catalog__code footer-package__item"\n          >\n            <span>Код товара:</span><b>351949</b>\n            <a href="#"\n              ><img src="img/code.svg" alt=""\n            /></a>\n          </div>\n        </div>\n        <a href="#" class="footer-package__btn stock">\n          Остаток: <span>В наличии</span>\n        </a>\n      </div>\n    </div>\n  </div>\n\n  <div class="package-structure__block">\n  <div class="package-structure__item item-package">\n    <div class="item-package__title">\n      Линейные светильники:\n    </div>\n    <div class="item-package__body body-package">\n      <div class="body-package__main">\n        <a href="#" class="body-package__img">\n          <img src="img/camera.svg" alt="" />\n        </a>\n        <div class="body-package__headings">\n          <div class="body-package__subtitle">\n            Наименование изделия\n          </div>\n          <a href="#" class="body-package__title">\n            Светильник Novotech Ratio 358099, арматура\n            черная, плафон пластик черный, 31х6 см\n          </a>\n        </div>\n      </div>\n      <div class="body-package__size">\n        <div class="body-package__subtitle">\n          Габариты ШxВxГ (см)\n        </div>\n        <div class="body-package__text">36x6x4</div>\n      </div>\n      <div class="body-package__price">\n        <div class="body-package__subtitle">\n          Стоимость\n        </div>\n        <div class="body-package__previous">\n          3 690 руб.\n        </div>\n        <s class="body-package__current">\n          4 700 руб.\n        </s>\n      </div>\n      <div\n        class="body-package__counter counter-package"\n      >\n        <div class="body-package__subtitle">\n          Кол-во\n        </div>\n        <div class="counter-package__wrapper">\n          <div\n            class="counter-package__control minuse"\n            data-action="minus"\n          >\n            <img\n              src="img/minuse.svg"\n              alt=""\n              data-action="minus"\n            />\n          </div>\n          <div\n            class="counter-package__current"\n            data-counter\n          >\n            1\n          </div>\n          <div\n            class="counter-package__control pluse"\n            data-action="plus"\n          >\n            <img\n              src="img/pluse.svg"\n              alt=""\n              data-action="plus"\n            />\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class="item-package__footer footer-package">\n      <div class="footer-package__product">\n        <div\n          class="products-catalog__code footer-package__item"\n        >\n          <span>Артикул:</span><b>358358103103</b>\n          <a href="#"\n            ><img src="img/code.svg" alt=""\n          /></a>\n        </div>\n        <div\n          class="products-catalog__code footer-package__item"\n        >\n          <span>Код товара:</span><b>351949</b>\n          <a href="#"\n            ><img src="img/code.svg" alt=""\n          /></a>\n        </div>\n      </div>\n      <a href="#" class="footer-package__btn few">\n        Остаток: <span>Мало</span>\n      </a>\n    </div>\n  </div>\n  <div class="package-structure__item item-package">\n    <div class="item-package__title"></div>\n    <div class="item-package__body body-package">\n      <div class="body-package__main">\n        <a href="#" class="body-package__img">\n          <img src="img/camera.svg" alt="" />\n        </a>\n        <div class="body-package__headings">\n          <div class="body-package__subtitle">\n            Наименование изделия\n          </div>\n          <a href="#" class="body-package__title">\n            Светильник Novotech Ratio 358099, арматура\n            черная, плафон пластик черный, 31х6 см\n          </a>\n        </div>\n      </div>\n      <div class="body-package__size">\n        <div class="body-package__subtitle">\n          Габариты ШxВxГ (см)\n        </div>\n        <div class="body-package__text">36x6x4</div>\n      </div>\n      <div class="body-package__price">\n        <div class="body-package__subtitle">\n          Стоимость\n        </div>\n        <div class="body-package__previous">\n          3 590 руб.\n        </div>\n        <s class="body-package__current">\n          4 500 руб.\n        </s>\n      </div>\n      <div\n        class="body-package__counter counter-package"\n      >\n        <div class="body-package__subtitle">\n          Кол-во\n        </div>\n        <div class="counter-package__wrapper">\n          <div\n            class="counter-package__control minuse"\n            data-action="minus"\n          >\n            <img\n              src="img/minuse.svg"\n              alt=""\n              data-action="minus"\n            />\n          </div>\n          <div\n            class="counter-package__current"\n            data-counter\n          >\n            1\n          </div>\n          <div\n            class="counter-package__control pluse"\n            data-action="plus"\n          >\n            <img\n              src="img/pluse.svg"\n              alt=""\n              data-action="plus"\n            />\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class="item-package__footer footer-package">\n      <div class="footer-package__product">\n        <div\n          class="products-catalog__code footer-package__item"\n        >\n          <span>Артикул:</span><b>358358103103</b>\n          <a href="#"\n            ><img src="img/code.svg" alt=""\n          /></a>\n        </div>\n        <div\n          class="products-catalog__code footer-package__item"\n        >\n          <span>Код товара:</span><b>351949</b>\n          <a href="#"\n            ><img src="img/code.svg" alt=""\n          /></a>\n        </div>\n      </div>\n      <a href="#" class="footer-package__btn stock">\n        Остаток: <span>В наличии</span>\n      </a>\n    </div>\n  </div>\n</div>\n\n<div class="package-structure__block">\n<div class="package-structure__item item-package">\n  <div class="item-package__title">\n    Линейные светильники:\n  </div>\n  <div class="item-package__body body-package">\n    <div class="body-package__main">\n      <a href="#" class="body-package__img">\n        <img src="img/camera.svg" alt="" />\n      </a>\n      <div class="body-package__headings">\n        <div class="body-package__subtitle">\n          Наименование изделия\n        </div>\n        <a href="#" class="body-package__title">\n          Светильник Novotech Ratio 358099, арматура\n          черная, плафон пластик черный, 31х6 см\n        </a>\n      </div>\n    </div>\n    <div class="body-package__size">\n      <div class="body-package__subtitle">\n        Габариты ШxВxГ (см)\n      </div>\n      <div class="body-package__text">36x6x4</div>\n    </div>\n    <div class="body-package__price">\n      <div class="body-package__subtitle">\n        Стоимость\n      </div>\n      <div class="body-package__previous">\n        3 690 руб.\n      </div>\n      <s class="body-package__current">\n        4 700 руб.\n      </s>\n    </div>\n    <div\n      class="body-package__counter counter-package"\n    >\n      <div class="body-package__subtitle">\n        Кол-во\n      </div>\n      <div class="counter-package__wrapper">\n        <div\n          class="counter-package__control minuse"\n          data-action="minus"\n        >\n          <img\n            src="img/minuse.svg"\n            alt=""\n            data-action="minus"\n          />\n        </div>\n        <div\n          class="counter-package__current"\n          data-counter\n        >\n          1\n        </div>\n        <div\n          class="counter-package__control pluse"\n          data-action="plus"\n        >\n          <img\n            src="img/pluse.svg"\n            alt=""\n            data-action="plus"\n          />\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class="item-package__footer footer-package">\n    <div class="footer-package__product">\n      <div\n        class="products-catalog__code footer-package__item"\n      >\n        <span>Артикул:</span><b>358358103103</b>\n        <a href="#"\n          ><img src="img/code.svg" alt=""\n        /></a>\n      </div>\n      <div\n        class="products-catalog__code footer-package__item"\n      >\n        <span>Код товара:</span><b>351949</b>\n        <a href="#"\n          ><img src="img/code.svg" alt=""\n        /></a>\n      </div>\n    </div>\n    <a href="#" class="footer-package__btn few">\n      Остаток: <span>Мало</span>\n    </a>\n  </div>\n</div>\n<div class="package-structure__item item-package">\n  <div class="item-package__title"></div>\n  <div class="item-package__body body-package">\n    <div class="body-package__main">\n      <a href="#" class="body-package__img">\n        <img src="img/camera.svg" alt="" />\n      </a>\n      <div class="body-package__headings">\n        <div class="body-package__subtitle">\n          Наименование изделия\n        </div>\n        <a href="#" class="body-package__title">\n          Светильник Novotech Ratio 358099, арматура\n          черная, плафон пластик черный, 31х6 см\n        </a>\n      </div>\n    </div>\n    <div class="body-package__size">\n      <div class="body-package__subtitle">\n        Габариты ШxВxГ (см)\n      </div>\n      <div class="body-package__text">36x6x4</div>\n    </div>\n    <div class="body-package__price">\n      <div class="body-package__subtitle">\n        Стоимость\n      </div>\n      <div class="body-package__previous">\n        3 590 руб.\n      </div>\n      <s class="body-package__current">\n        4 500 руб.\n      </s>\n    </div>\n    <div\n      class="body-package__counter counter-package"\n    >\n      <div class="body-package__subtitle">\n        Кол-во\n      </div>\n      <div class="counter-package__wrapper">\n        <div\n          class="counter-package__control minuse"\n          data-action="minus"\n        >\n          <img\n            src="img/minuse.svg"\n            alt=""\n            data-action="minus"\n          />\n        </div>\n        <div\n          class="counter-package__current"\n          data-counter\n        >\n          1\n        </div>\n        <div\n          class="counter-package__control pluse"\n          data-action="plus"\n        >\n          <img\n            src="img/pluse.svg"\n            alt=""\n            data-action="plus"\n          />\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class="item-package__footer footer-package">\n    <div class="footer-package__product">\n      <div\n        class="products-catalog__code footer-package__item"\n      >\n        <span>Артикул:</span><b>358358103103</b>\n        <a href="#"\n          ><img src="img/code.svg" alt=""\n        /></a>\n      </div>\n      <div\n        class="products-catalog__code footer-package__item"\n      >\n        <span>Код товара:</span><b>351949</b>\n        <a href="#"\n          ><img src="img/code.svg" alt=""\n        /></a>\n      </div>\n    </div>\n    <a href="#" class="footer-package__btn stock">\n      Остаток: <span>В наличии</span>\n    </a>\n  </div>\n</div>\n</div>\n    '
      ),
        (Me.style.display = "none");
    }),
    (window.FLS = !0),
    (function (e) {
      let t = new Image();
      (t.onload = t.onerror =
        function () {
          e(2 == t.height);
        }),
        (t.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (e) {
      let t = !0 === e ? "webp" : "no-webp";
      document.documentElement.classList.add(t);
    }),
    (function () {
      let e = document.querySelector(".icon-menu");
      e &&
        e.addEventListener("click", function (e) {
          n &&
            (((e = 500) => {
              document.documentElement.classList.contains("lock") ? i(e) : l(e);
            })(),
            document.documentElement.classList.toggle("menu-open"));
        });
    })(),
    (function () {
      const e = document.querySelectorAll("[data-spollers]");
      if (e.length > 0) {
        const s = Array.from(e).filter(function (e, t, s) {
          return !e.dataset.spollers.split(",")[0];
        });
        s.length && i(s);
        let n = c(e, "spollers");
        function i(e, t = !1) {
          e.forEach((e) => {
            (e = t ? e.item : e),
              t.matches || !t
                ? (e.classList.add("_spoller-init"),
                  l(e),
                  e.addEventListener("click", r))
                : (e.classList.remove("_spoller-init"),
                  l(e, !1),
                  e.removeEventListener("click", r));
          });
        }
        function l(e, t = !0) {
          let s = e.querySelectorAll("[data-spoller]");
          s.length &&
            ((s = Array.from(s).filter(
              (t) => t.closest("[data-spollers]") === e
            )),
            s.forEach((e) => {
              t
                ? (e.removeAttribute("tabindex"),
                  e.classList.contains("_spoller-active") ||
                    (e.nextElementSibling.hidden = !0))
                : (e.setAttribute("tabindex", "-1"),
                  (e.nextElementSibling.hidden = !1));
            }));
        }
        function r(e) {
          const t = e.target;
          if (t.closest("[data-spoller]")) {
            const s = t.closest("[data-spoller]"),
              n = s.closest("[data-spollers]"),
              i = !!n.hasAttribute("data-one-spoller");
            n.querySelectorAll("._slide").length ||
              (i && !s.classList.contains("_spoller-active") && o(n),
              s.classList.toggle("_spoller-active"),
              a(s.nextElementSibling, 500)),
              e.preventDefault();
          }
        }
        function o(e) {
          const s = e.querySelector("[data-spoller]._spoller-active");
          s &&
            (s.classList.remove("_spoller-active"),
            t(s.nextElementSibling, 500));
        }
        n &&
          n.length &&
          n.forEach((e) => {
            e.matchMedia.addEventListener("change", function () {
              i(e.itemsArray, e.matchMedia);
            }),
              i(e.itemsArray, e.matchMedia);
          });
      }
    })(),
    (function () {
      const e = document.querySelectorAll("[data-tabs]");
      let a = [];
      if (e.length > 0) {
        const t = (function () {
          if (location.hash) return location.hash.replace("#", "");
        })();
        t && t.startsWith("tab-") && (a = t.replace("tab-", "").split("-")),
          e.forEach((e, t) => {
            e.classList.add("_tab-init"),
              e.setAttribute("data-tabs-index", t),
              e.addEventListener("click", l),
              (function (e) {
                let t = e.querySelectorAll("[data-tabs-titles]>*"),
                  s = e.querySelectorAll("[data-tabs-body]>*");
                const n = e.dataset.tabsIndex,
                  i = a[0] == n;
                if (i) {
                  const t = e.querySelector("[data-tabs-titles]>._tab-active");
                  t && t.classList.remove("_tab-active");
                }
                s.length &&
                  ((s = Array.from(s).filter(
                    (t) => t.closest("[data-tabs]") === e
                  )),
                  (t = Array.from(t).filter(
                    (t) => t.closest("[data-tabs]") === e
                  )),
                  s.forEach((e, s) => {
                    t[s].setAttribute("data-tabs-title", ""),
                      e.setAttribute("data-tabs-item", ""),
                      i && s == a[1] && t[s].classList.add("_tab-active"),
                      (e.hidden = !t[s].classList.contains("_tab-active"));
                  }));
              })(e);
          });
        let s = c(e, "tabs");
        s &&
          s.length &&
          s.forEach((e) => {
            e.matchMedia.addEventListener("change", function () {
              n(e.itemsArray, e.matchMedia);
            }),
              n(e.itemsArray, e.matchMedia);
          });
      }
      function n(e, t) {
        e.forEach((e) => {
          let s = (e = e.item).querySelector("[data-tabs-titles]"),
            a = e.querySelectorAll("[data-tabs-title]"),
            n = e.querySelector("[data-tabs-body]"),
            i = e.querySelectorAll("[data-tabs-item]");
          (a = Array.from(a).filter((t) => t.closest("[data-tabs]") === e)),
            (i = Array.from(i).filter((t) => t.closest("[data-tabs]") === e)),
            i.forEach((i, l) => {
              t.matches
                ? (n.append(a[l]), n.append(i), e.classList.add("_tab-spoller"))
                : (s.append(a[l]), e.classList.remove("_tab-spoller"));
            });
        });
      }
      function i(e) {
        let a = e.querySelectorAll("[data-tabs-title]"),
          n = e.querySelectorAll("[data-tabs-item]");
        const i = e.dataset.tabsIndex;
        const l = (function (e) {
          if (e.hasAttribute("data-tabs-animate"))
            return e.dataset.tabsAnimate > 0
              ? Number(e.dataset.tabsAnimate)
              : 500;
        })(e);
        if (n.length > 0) {
          const r = e.hasAttribute("data-tabs-hash");
          (n = Array.from(n).filter((t) => t.closest("[data-tabs]") === e)),
            (a = Array.from(a).filter((t) => t.closest("[data-tabs]") === e)),
            n.forEach((e, n) => {
              var o;
              a[n].classList.contains("_tab-active")
                ? (l ? s(e, l) : (e.hidden = !1),
                  r &&
                    !e.closest(".popup") &&
                    ((o = (o = `tab-${i}-${n}`)
                      ? `#${o}`
                      : window.location.href.split("#")[0]),
                    history.pushState("", "", o)))
                : l
                ? t(e, l)
                : (e.hidden = !0);
            });
        }
      }
      function l(e) {
        const t = e.target;
        if (t.closest("[data-tabs-title]")) {
          const s = t.closest("[data-tabs-title]"),
            a = s.closest("[data-tabs]");
          if (
            !s.classList.contains("_tab-active") &&
            !a.querySelector("._slide")
          ) {
            let e = a.querySelectorAll("[data-tabs-title]._tab-active");
            e.length &&
              (e = Array.from(e).filter((e) => e.closest("[data-tabs]") === a)),
              e.length && e[0].classList.remove("_tab-active"),
              s.classList.add("_tab-active"),
              i(a);
          }
          e.preventDefault();
        }
      }
    })(),
    (function () {
      const e = document.querySelectorAll(".rating");
      e.length > 0 &&
        (function () {
          let t, s;
          for (let t = 0; t < e.length; t++) {
            a(e[t]);
          }
          function a(e) {
            n(e), i(), e.classList.contains("rating_set") && l(e);
          }
          function n(e) {
            (t = e.querySelector(".rating__active")),
              (s = e.querySelector(".rating__value"));
          }
          function i(e = s.innerHTML) {
            const a = e / 0.05;
            t.style.width = `${a}%`;
          }
          function l(e) {
            const t = e.querySelectorAll(".rating__item");
            for (let a = 0; a < t.length; a++) {
              const l = t[a];
              l.addEventListener("mouseenter", function (t) {
                n(e), i(l.value);
              }),
                l.addEventListener("mouseleave", function (e) {
                  i();
                }),
                l.addEventListener("click", function (t) {
                  n(e),
                    e.dataset.ajax
                      ? r(l.value, e)
                      : ((s.innerHTML = a + 1), i());
                });
            }
          }
          async function r(e, t) {
            if (!t.classList.contains("rating_sending")) {
              t.classList.add("rating_sending");
              let e = await fetch("rating.json", { method: "GET" });
              if (e.ok) {
                const a = (await e.json()).newRating;
                (s.innerHTML = a), i(), t.classList.remove("rating_sending");
              } else alert("Ошибка"), t.classList.remove("rating_sending");
            }
          }
        })();
    })();
})();
