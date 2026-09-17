(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) r(o);
  new MutationObserver((o) => {
    for (const a of o)
      if (a.type === "childList")
        for (const i of a.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && r(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(o) {
    const a = {};
    return (
      o.integrity && (a.integrity = o.integrity),
      o.referrerPolicy && (a.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === "use-credentials"
        ? (a.credentials = "include")
        : o.crossOrigin === "anonymous"
          ? (a.credentials = "omit")
          : (a.credentials = "same-origin"),
      a
    );
  }
  function r(o) {
    if (o.ep) return;
    o.ep = !0;
    const a = n(o);
    fetch(o.href, a);
  }
})();
function Sc(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var Ys = { exports: {} },
  Ro = {},
  Ks = { exports: {} },
  Q = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var zr = Symbol.for("react.element"),
  Cc = Symbol.for("react.portal"),
  Tc = Symbol.for("react.fragment"),
  zc = Symbol.for("react.strict_mode"),
  jc = Symbol.for("react.profiler"),
  Mc = Symbol.for("react.provider"),
  Ec = Symbol.for("react.context"),
  Nc = Symbol.for("react.forward_ref"),
  Ac = Symbol.for("react.suspense"),
  Lc = Symbol.for("react.memo"),
  Ic = Symbol.for("react.lazy"),
  zl = Symbol.iterator;
function Dc(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (zl && e[zl]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var Zs = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  Xs = Object.assign,
  Js = {};
function Ln(e, t, n) {
  ((this.props = e),
    (this.context = t),
    (this.refs = Js),
    (this.updater = n || Zs));
}
Ln.prototype.isReactComponent = {};
Ln.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
Ln.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function qs() {}
qs.prototype = Ln.prototype;
function zi(e, t, n) {
  ((this.props = e),
    (this.context = t),
    (this.refs = Js),
    (this.updater = n || Zs));
}
var ji = (zi.prototype = new qs());
ji.constructor = zi;
Xs(ji, Ln.prototype);
ji.isPureReactComponent = !0;
var jl = Array.isArray,
  e1 = Object.prototype.hasOwnProperty,
  Mi = { current: null },
  t1 = { key: !0, ref: !0, __self: !0, __source: !0 };
function n1(e, t, n) {
  var r,
    o = {},
    a = null,
    i = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (i = t.ref),
    t.key !== void 0 && (a = "" + t.key),
    t))
      e1.call(t, r) && !t1.hasOwnProperty(r) && (o[r] = t[r]);
  var s = arguments.length - 2;
  if (s === 1) o.children = n;
  else if (1 < s) {
    for (var c = Array(s), u = 0; u < s; u++) c[u] = arguments[u + 2];
    o.children = c;
  }
  if (e && e.defaultProps)
    for (r in ((s = e.defaultProps), s)) o[r] === void 0 && (o[r] = s[r]);
  return {
    $$typeof: zr,
    type: e,
    key: a,
    ref: i,
    props: o,
    _owner: Mi.current,
  };
}
function Pc(e, t) {
  return {
    $$typeof: zr,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function Ei(e) {
  return typeof e == "object" && e !== null && e.$$typeof === zr;
}
function Rc(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var Ml = /\/+/g;
function qo(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? Rc("" + e.key)
    : t.toString(36);
}
function Jr(e, t, n, r, o) {
  var a = typeof e;
  (a === "undefined" || a === "boolean") && (e = null);
  var i = !1;
  if (e === null) i = !0;
  else
    switch (a) {
      case "string":
      case "number":
        i = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case zr:
          case Cc:
            i = !0;
        }
    }
  if (i)
    return (
      (i = e),
      (o = o(i)),
      (e = r === "" ? "." + qo(i, 0) : r),
      jl(o)
        ? ((n = ""),
          e != null && (n = e.replace(Ml, "$&/") + "/"),
          Jr(o, t, n, "", function (u) {
            return u;
          }))
        : o != null &&
          (Ei(o) &&
            (o = Pc(
              o,
              n +
                (!o.key || (i && i.key === o.key)
                  ? ""
                  : ("" + o.key).replace(Ml, "$&/") + "/") +
                e
            )),
          t.push(o)),
      1
    );
  if (((i = 0), (r = r === "" ? "." : r + ":"), jl(e)))
    for (var s = 0; s < e.length; s++) {
      a = e[s];
      var c = r + qo(a, s);
      i += Jr(a, t, n, c, o);
    }
  else if (((c = Dc(e)), typeof c == "function"))
    for (e = c.call(e), s = 0; !(a = e.next()).done;)
      ((a = a.value), (c = r + qo(a, s++)), (i += Jr(a, t, n, c, o)));
  else if (a === "object")
    throw (
      (t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t) +
          "). If you meant to render a collection of children, use an array instead."
      )
    );
  return i;
}
function Ar(e, t, n) {
  if (e == null) return e;
  var r = [],
    o = 0;
  return (
    Jr(e, r, "", "", function (a) {
      return t.call(n, a, o++);
    }),
    r
  );
}
function _c(e) {
  if (e._status === -1) {
    var t = e._result;
    ((t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = n));
        }
      ),
      e._status === -1 && ((e._status = 0), (e._result = t)));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var je = { current: null },
  qr = { transition: null },
  Oc = {
    ReactCurrentDispatcher: je,
    ReactCurrentBatchConfig: qr,
    ReactCurrentOwner: Mi,
  };
function r1() {
  throw Error("act(...) is not supported in production builds of React.");
}
Q.Children = {
  map: Ar,
  forEach: function (e, t, n) {
    Ar(
      e,
      function () {
        t.apply(this, arguments);
      },
      n
    );
  },
  count: function (e) {
    var t = 0;
    return (
      Ar(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      Ar(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!Ei(e))
      throw Error(
        "React.Children.only expected to receive a single React element child."
      );
    return e;
  },
};
Q.Component = Ln;
Q.Fragment = Tc;
Q.Profiler = jc;
Q.PureComponent = zi;
Q.StrictMode = zc;
Q.Suspense = Ac;
Q.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Oc;
Q.act = r1;
Q.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        "."
    );
  var r = Xs({}, e.props),
    o = e.key,
    a = e.ref,
    i = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((a = t.ref), (i = Mi.current)),
      t.key !== void 0 && (o = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var s = e.type.defaultProps;
    for (c in t)
      e1.call(t, c) &&
        !t1.hasOwnProperty(c) &&
        (r[c] = t[c] === void 0 && s !== void 0 ? s[c] : t[c]);
  }
  var c = arguments.length - 2;
  if (c === 1) r.children = n;
  else if (1 < c) {
    s = Array(c);
    for (var u = 0; u < c; u++) s[u] = arguments[u + 2];
    r.children = s;
  }
  return { $$typeof: zr, type: e.type, key: o, ref: a, props: r, _owner: i };
};
Q.createContext = function (e) {
  return (
    (e = {
      $$typeof: Ec,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: Mc, _context: e }),
    (e.Consumer = e)
  );
};
Q.createElement = n1;
Q.createFactory = function (e) {
  var t = n1.bind(null, e);
  return ((t.type = e), t);
};
Q.createRef = function () {
  return { current: null };
};
Q.forwardRef = function (e) {
  return { $$typeof: Nc, render: e };
};
Q.isValidElement = Ei;
Q.lazy = function (e) {
  return { $$typeof: Ic, _payload: { _status: -1, _result: e }, _init: _c };
};
Q.memo = function (e, t) {
  return { $$typeof: Lc, type: e, compare: t === void 0 ? null : t };
};
Q.startTransition = function (e) {
  var t = qr.transition;
  qr.transition = {};
  try {
    e();
  } finally {
    qr.transition = t;
  }
};
Q.unstable_act = r1;
Q.useCallback = function (e, t) {
  return je.current.useCallback(e, t);
};
Q.useContext = function (e) {
  return je.current.useContext(e);
};
Q.useDebugValue = function () {};
Q.useDeferredValue = function (e) {
  return je.current.useDeferredValue(e);
};
Q.useEffect = function (e, t) {
  return je.current.useEffect(e, t);
};
Q.useId = function () {
  return je.current.useId();
};
Q.useImperativeHandle = function (e, t, n) {
  return je.current.useImperativeHandle(e, t, n);
};
Q.useInsertionEffect = function (e, t) {
  return je.current.useInsertionEffect(e, t);
};
Q.useLayoutEffect = function (e, t) {
  return je.current.useLayoutEffect(e, t);
};
Q.useMemo = function (e, t) {
  return je.current.useMemo(e, t);
};
Q.useReducer = function (e, t, n) {
  return je.current.useReducer(e, t, n);
};
Q.useRef = function (e) {
  return je.current.useRef(e);
};
Q.useState = function (e) {
  return je.current.useState(e);
};
Q.useSyncExternalStore = function (e, t, n) {
  return je.current.useSyncExternalStore(e, t, n);
};
Q.useTransition = function () {
  return je.current.useTransition();
};
Q.version = "18.3.1";
Ks.exports = Q;
var Y = Ks.exports;
const ja = Sc(Y);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Bc = Y,
  Fc = Symbol.for("react.element"),
  $c = Symbol.for("react.fragment"),
  Hc = Object.prototype.hasOwnProperty,
  Vc = Bc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  Wc = { key: !0, ref: !0, __self: !0, __source: !0 };
function o1(e, t, n) {
  var r,
    o = {},
    a = null,
    i = null;
  (n !== void 0 && (a = "" + n),
    t.key !== void 0 && (a = "" + t.key),
    t.ref !== void 0 && (i = t.ref));
  for (r in t) Hc.call(t, r) && !Wc.hasOwnProperty(r) && (o[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) o[r] === void 0 && (o[r] = t[r]);
  return {
    $$typeof: Fc,
    type: e,
    key: a,
    ref: i,
    props: o,
    _owner: Vc.current,
  };
}
Ro.Fragment = $c;
Ro.jsx = o1;
Ro.jsxs = o1;
Ys.exports = Ro;
var l = Ys.exports,
  Ma = {},
  a1 = { exports: {} },
  Be = {},
  i1 = { exports: {} },
  l1 = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(E, H) {
    var b = E.length;
    E.push(H);
    e: for (; 0 < b;) {
      var y = (b - 1) >>> 1,
        D = E[y];
      if (0 < o(D, H)) ((E[y] = H), (E[b] = D), (b = y));
      else break e;
    }
  }
  function n(E) {
    return E.length === 0 ? null : E[0];
  }
  function r(E) {
    if (E.length === 0) return null;
    var H = E[0],
      b = E.pop();
    if (b !== H) {
      E[0] = b;
      e: for (var y = 0, D = E.length, F = D >>> 1; y < F;) {
        var V = 2 * (y + 1) - 1,
          R = E[V],
          $ = V + 1,
          O = E[$];
        if (0 > o(R, b))
          $ < D && 0 > o(O, R)
            ? ((E[y] = O), (E[$] = b), (y = $))
            : ((E[y] = R), (E[V] = b), (y = V));
        else if ($ < D && 0 > o(O, b)) ((E[y] = O), (E[$] = b), (y = $));
        else break e;
      }
    }
    return H;
  }
  function o(E, H) {
    var b = E.sortIndex - H.sortIndex;
    return b !== 0 ? b : E.id - H.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var a = performance;
    e.unstable_now = function () {
      return a.now();
    };
  } else {
    var i = Date,
      s = i.now();
    e.unstable_now = function () {
      return i.now() - s;
    };
  }
  var c = [],
    u = [],
    v = 1,
    m = null,
    f = 3,
    h = !1,
    g = !1,
    S = !1,
    T = typeof setTimeout == "function" ? setTimeout : null,
    d = typeof clearTimeout == "function" ? clearTimeout : null,
    p = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function w(E) {
    for (var H = n(u); H !== null;) {
      if (H.callback === null) r(u);
      else if (H.startTime <= E)
        (r(u), (H.sortIndex = H.expirationTime), t(c, H));
      else break;
      H = n(u);
    }
  }
  function x(E) {
    if (((S = !1), w(E), !g))
      if (n(c) !== null) ((g = !0), G(C));
      else {
        var H = n(u);
        H !== null && le(x, H.startTime - E);
      }
  }
  function C(E, H) {
    ((g = !1), S && ((S = !1), d(k), (k = -1)), (h = !0));
    var b = f;
    try {
      for (
        w(H), m = n(c);
        m !== null && (!(m.expirationTime > H) || (E && !P()));
      ) {
        var y = m.callback;
        if (typeof y == "function") {
          ((m.callback = null), (f = m.priorityLevel));
          var D = y(m.expirationTime <= H);
          ((H = e.unstable_now()),
            typeof D == "function" ? (m.callback = D) : m === n(c) && r(c),
            w(H));
        } else r(c);
        m = n(c);
      }
      if (m !== null) var F = !0;
      else {
        var V = n(u);
        (V !== null && le(x, V.startTime - H), (F = !1));
      }
      return F;
    } finally {
      ((m = null), (f = b), (h = !1));
    }
  }
  var z = !1,
    j = null,
    k = -1,
    A = 5,
    M = -1;
  function P() {
    return !(e.unstable_now() - M < A);
  }
  function I() {
    if (j !== null) {
      var E = e.unstable_now();
      M = E;
      var H = !0;
      try {
        H = j(!0, E);
      } finally {
        H ? L() : ((z = !1), (j = null));
      }
    } else z = !1;
  }
  var L;
  if (typeof p == "function")
    L = function () {
      p(I);
    };
  else if (typeof MessageChannel < "u") {
    var B = new MessageChannel(),
      U = B.port2;
    ((B.port1.onmessage = I),
      (L = function () {
        U.postMessage(null);
      }));
  } else
    L = function () {
      T(I, 0);
    };
  function G(E) {
    ((j = E), z || ((z = !0), L()));
  }
  function le(E, H) {
    k = T(function () {
      E(e.unstable_now());
    }, H);
  }
  ((e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (E) {
      E.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      g || h || ((g = !0), G(C));
    }),
    (e.unstable_forceFrameRate = function (E) {
      0 > E || 125 < E
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
          )
        : (A = 0 < E ? Math.floor(1e3 / E) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return f;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(c);
    }),
    (e.unstable_next = function (E) {
      switch (f) {
        case 1:
        case 2:
        case 3:
          var H = 3;
          break;
        default:
          H = f;
      }
      var b = f;
      f = H;
      try {
        return E();
      } finally {
        f = b;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (E, H) {
      switch (E) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          E = 3;
      }
      var b = f;
      f = E;
      try {
        return H();
      } finally {
        f = b;
      }
    }),
    (e.unstable_scheduleCallback = function (E, H, b) {
      var y = e.unstable_now();
      switch (
        (typeof b == "object" && b !== null
          ? ((b = b.delay), (b = typeof b == "number" && 0 < b ? y + b : y))
          : (b = y),
        E)
      ) {
        case 1:
          var D = -1;
          break;
        case 2:
          D = 250;
          break;
        case 5:
          D = 1073741823;
          break;
        case 4:
          D = 1e4;
          break;
        default:
          D = 5e3;
      }
      return (
        (D = b + D),
        (E = {
          id: v++,
          callback: H,
          priorityLevel: E,
          startTime: b,
          expirationTime: D,
          sortIndex: -1,
        }),
        b > y
          ? ((E.sortIndex = b),
            t(u, E),
            n(c) === null &&
              E === n(u) &&
              (S ? (d(k), (k = -1)) : (S = !0), le(x, b - y)))
          : ((E.sortIndex = D), t(c, E), g || h || ((g = !0), G(C))),
        E
      );
    }),
    (e.unstable_shouldYield = P),
    (e.unstable_wrapCallback = function (E) {
      var H = f;
      return function () {
        var b = f;
        f = H;
        try {
          return E.apply(this, arguments);
        } finally {
          f = b;
        }
      };
    }));
})(l1);
i1.exports = l1;
var Uc = i1.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Gc = Y,
  Oe = Uc;
function N(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1;
    n < arguments.length;
    n++
  )
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var s1 = new Set(),
  lr = {};
function en(e, t) {
  (Tn(e, t), Tn(e + "Capture", t));
}
function Tn(e, t) {
  for (lr[e] = t, e = 0; e < t.length; e++) s1.add(t[e]);
}
var vt = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  Ea = Object.prototype.hasOwnProperty,
  Qc =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  El = {},
  Nl = {};
function Yc(e) {
  return Ea.call(Nl, e)
    ? !0
    : Ea.call(El, e)
      ? !1
      : Qc.test(e)
        ? (Nl[e] = !0)
        : ((El[e] = !0), !1);
}
function Kc(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r
        ? !1
        : n !== null
          ? !n.acceptsBooleans
          : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function Zc(e, t, n, r) {
  if (t === null || typeof t > "u" || Kc(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function Me(e, t, n, r, o, a, i) {
  ((this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = o),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = a),
    (this.removeEmptyString = i));
}
var xe = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    xe[e] = new Me(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  xe[t] = new Me(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  xe[e] = new Me(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  xe[e] = new Me(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    xe[e] = new Me(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  xe[e] = new Me(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  xe[e] = new Me(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  xe[e] = new Me(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  xe[e] = new Me(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Ni = /[\-:]([a-z])/g;
function Ai(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(Ni, Ai);
    xe[t] = new Me(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(Ni, Ai);
    xe[t] = new Me(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(Ni, Ai);
  xe[t] = new Me(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  xe[e] = new Me(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
xe.xlinkHref = new Me(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1
);
["src", "href", "action", "formAction"].forEach(function (e) {
  xe[e] = new Me(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Li(e, t, n, r) {
  var o = xe.hasOwnProperty(t) ? xe[t] : null;
  (o !== null
    ? o.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (Zc(t, n, o, r) && (n = null),
    r || o === null
      ? Yc(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
      : o.mustUseProperty
        ? (e[o.propertyName] = n === null ? (o.type === 3 ? !1 : "") : n)
        : ((t = o.attributeName),
          (r = o.attributeNamespace),
          n === null
            ? e.removeAttribute(t)
            : ((o = o.type),
              (n = o === 3 || (o === 4 && n === !0) ? "" : "" + n),
              r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var xt = Gc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  Lr = Symbol.for("react.element"),
  an = Symbol.for("react.portal"),
  ln = Symbol.for("react.fragment"),
  Ii = Symbol.for("react.strict_mode"),
  Na = Symbol.for("react.profiler"),
  c1 = Symbol.for("react.provider"),
  u1 = Symbol.for("react.context"),
  Di = Symbol.for("react.forward_ref"),
  Aa = Symbol.for("react.suspense"),
  La = Symbol.for("react.suspense_list"),
  Pi = Symbol.for("react.memo"),
  kt = Symbol.for("react.lazy"),
  d1 = Symbol.for("react.offscreen"),
  Al = Symbol.iterator;
function Rn(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (Al && e[Al]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var ie = Object.assign,
  ea;
function Yn(e) {
  if (ea === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      ea = (t && t[1]) || "";
    }
  return (
    `
` +
    ea +
    e
  );
}
var ta = !1;
function na(e, t) {
  if (!e || ta) return "";
  ta = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (u) {
          var r = u;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (u) {
          r = u;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (u) {
        r = u;
      }
      e();
    }
  } catch (u) {
    if (u && r && typeof u.stack == "string") {
      for (
        var o = u.stack.split(`
`),
          a = r.stack.split(`
`),
          i = o.length - 1,
          s = a.length - 1;
        1 <= i && 0 <= s && o[i] !== a[s];
      )
        s--;
      for (; 1 <= i && 0 <= s; i--, s--)
        if (o[i] !== a[s]) {
          if (i !== 1 || s !== 1)
            do
              if ((i--, s--, 0 > s || o[i] !== a[s])) {
                var c =
                  `
` + o[i].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    c.includes("<anonymous>") &&
                    (c = c.replace("<anonymous>", e.displayName)),
                  c
                );
              }
            while (1 <= i && 0 <= s);
          break;
        }
    }
  } finally {
    ((ta = !1), (Error.prepareStackTrace = n));
  }
  return (e = e ? e.displayName || e.name : "") ? Yn(e) : "";
}
function Xc(e) {
  switch (e.tag) {
    case 5:
      return Yn(e.type);
    case 16:
      return Yn("Lazy");
    case 13:
      return Yn("Suspense");
    case 19:
      return Yn("SuspenseList");
    case 0:
    case 2:
    case 15:
      return ((e = na(e.type, !1)), e);
    case 11:
      return ((e = na(e.type.render, !1)), e);
    case 1:
      return ((e = na(e.type, !0)), e);
    default:
      return "";
  }
}
function Ia(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case ln:
      return "Fragment";
    case an:
      return "Portal";
    case Na:
      return "Profiler";
    case Ii:
      return "StrictMode";
    case Aa:
      return "Suspense";
    case La:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case u1:
        return (e.displayName || "Context") + ".Consumer";
      case c1:
        return (e._context.displayName || "Context") + ".Provider";
      case Di:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case Pi:
        return (
          (t = e.displayName || null),
          t !== null ? t : Ia(e.type) || "Memo"
        );
      case kt:
        ((t = e._payload), (e = e._init));
        try {
          return Ia(e(t));
        } catch {}
    }
  return null;
}
function Jc(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Ia(t);
    case 8:
      return t === Ii ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function Rt(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function p1(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function qc(e) {
  var t = p1(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var o = n.get,
      a = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return o.call(this);
        },
        set: function (i) {
          ((r = "" + i), a.call(this, i));
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (i) {
          r = "" + i;
        },
        stopTracking: function () {
          ((e._valueTracker = null), delete e[t]);
        },
      }
    );
  }
}
function Ir(e) {
  e._valueTracker || (e._valueTracker = qc(e));
}
function f1(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = p1(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function po(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Da(e, t) {
  var n = t.checked;
  return ie({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function Ll(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  ((n = Rt(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    }));
}
function m1(e, t) {
  ((t = t.checked), t != null && Li(e, "checked", t, !1));
}
function Pa(e, t) {
  m1(e, t);
  var n = Rt(t.value),
    r = t.type;
  if (n != null)
    r === "number"
      ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
      : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  (t.hasOwnProperty("value")
    ? Ra(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && Ra(e, t.type, Rt(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked));
}
function Il(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(
      (r !== "submit" && r !== "reset") ||
      (t.value !== void 0 && t.value !== null)
    ))
      return;
    ((t = "" + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t));
  }
  ((n = e.name),
    n !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== "" && (e.name = n));
}
function Ra(e, t, n) {
  (t !== "number" || po(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Kn = Array.isArray;
function yn(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var o = 0; o < n.length; o++) t["$" + n[o]] = !0;
    for (n = 0; n < e.length; n++)
      ((o = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== o && (e[n].selected = o),
        o && r && (e[n].defaultSelected = !0));
  } else {
    for (n = "" + Rt(n), t = null, o = 0; o < e.length; o++) {
      if (e[o].value === n) {
        ((e[o].selected = !0), r && (e[o].defaultSelected = !0));
        return;
      }
      t !== null || e[o].disabled || (t = e[o]);
    }
    t !== null && (t.selected = !0);
  }
}
function _a(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(N(91));
  return ie({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function Dl(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(N(92));
      if (Kn(n)) {
        if (1 < n.length) throw Error(N(93));
        n = n[0];
      }
      t = n;
    }
    (t == null && (t = ""), (n = t));
  }
  e._wrapperState = { initialValue: Rt(n) };
}
function h1(e, t) {
  var n = Rt(t.value),
    r = Rt(t.defaultValue);
  (n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r));
}
function Pl(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function v1(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Oa(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? v1(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
      ? "http://www.w3.org/1999/xhtml"
      : e;
}
var Dr,
  g1 = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, o) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, o);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (
        Dr = Dr || document.createElement("div"),
          Dr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = Dr.firstChild;
        e.firstChild;
      )
        e.removeChild(e.firstChild);
      for (; t.firstChild;) e.appendChild(t.firstChild);
    }
  });
function sr(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Jn = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  eu = ["Webkit", "ms", "Moz", "O"];
Object.keys(Jn).forEach(function (e) {
  eu.forEach(function (t) {
    ((t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Jn[t] = Jn[e]));
  });
});
function y1(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (Jn.hasOwnProperty(e) && Jn[e])
      ? ("" + t).trim()
      : t + "px";
}
function w1(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        o = y1(n, t[n], r);
      (n === "float" && (n = "cssFloat"), r ? e.setProperty(n, o) : (e[n] = o));
    }
}
var tu = ie(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  }
);
function Ba(e, t) {
  if (t) {
    if (tu[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(N(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(N(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(N(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(N(62));
  }
}
function Fa(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var $a = null;
function Ri(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var Ha = null,
  wn = null,
  xn = null;
function Rl(e) {
  if ((e = Er(e))) {
    if (typeof Ha != "function") throw Error(N(280));
    var t = e.stateNode;
    t && ((t = $o(t)), Ha(e.stateNode, e.type, t));
  }
}
function x1(e) {
  wn ? (xn ? xn.push(e) : (xn = [e])) : (wn = e);
}
function b1() {
  if (wn) {
    var e = wn,
      t = xn;
    if (((xn = wn = null), Rl(e), t)) for (e = 0; e < t.length; e++) Rl(t[e]);
  }
}
function k1(e, t) {
  return e(t);
}
function S1() {}
var ra = !1;
function C1(e, t, n) {
  if (ra) return e(t, n);
  ra = !0;
  try {
    return k1(e, t, n);
  } finally {
    ((ra = !1), (wn !== null || xn !== null) && (S1(), b1()));
  }
}
function cr(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = $o(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      ((r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !r));
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(N(231, t, typeof n));
  return n;
}
var Va = !1;
if (vt)
  try {
    var _n = {};
    (Object.defineProperty(_n, "passive", {
      get: function () {
        Va = !0;
      },
    }),
      window.addEventListener("test", _n, _n),
      window.removeEventListener("test", _n, _n));
  } catch {
    Va = !1;
  }
function nu(e, t, n, r, o, a, i, s, c) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, u);
  } catch (v) {
    this.onError(v);
  }
}
var qn = !1,
  fo = null,
  mo = !1,
  Wa = null,
  ru = {
    onError: function (e) {
      ((qn = !0), (fo = e));
    },
  };
function ou(e, t, n, r, o, a, i, s, c) {
  ((qn = !1), (fo = null), nu.apply(ru, arguments));
}
function au(e, t, n, r, o, a, i, s, c) {
  if ((ou.apply(this, arguments), qn)) {
    if (qn) {
      var u = fo;
      ((qn = !1), (fo = null));
    } else throw Error(N(198));
    mo || ((mo = !0), (Wa = u));
  }
}
function tn(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return;) t = t.return;
  else {
    e = t;
    do ((t = e), t.flags & 4098 && (n = t.return), (e = t.return));
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function T1(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function _l(e) {
  if (tn(e) !== e) throw Error(N(188));
}
function iu(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = tn(e)), t === null)) throw Error(N(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ;) {
    var o = n.return;
    if (o === null) break;
    var a = o.alternate;
    if (a === null) {
      if (((r = o.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (o.child === a.child) {
      for (a = o.child; a;) {
        if (a === n) return (_l(o), e);
        if (a === r) return (_l(o), t);
        a = a.sibling;
      }
      throw Error(N(188));
    }
    if (n.return !== r.return) ((n = o), (r = a));
    else {
      for (var i = !1, s = o.child; s;) {
        if (s === n) {
          ((i = !0), (n = o), (r = a));
          break;
        }
        if (s === r) {
          ((i = !0), (r = o), (n = a));
          break;
        }
        s = s.sibling;
      }
      if (!i) {
        for (s = a.child; s;) {
          if (s === n) {
            ((i = !0), (n = a), (r = o));
            break;
          }
          if (s === r) {
            ((i = !0), (r = a), (n = o));
            break;
          }
          s = s.sibling;
        }
        if (!i) throw Error(N(189));
      }
    }
    if (n.alternate !== r) throw Error(N(190));
  }
  if (n.tag !== 3) throw Error(N(188));
  return n.stateNode.current === n ? e : t;
}
function z1(e) {
  return ((e = iu(e)), e !== null ? j1(e) : null);
}
function j1(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null;) {
    var t = j1(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var M1 = Oe.unstable_scheduleCallback,
  Ol = Oe.unstable_cancelCallback,
  lu = Oe.unstable_shouldYield,
  su = Oe.unstable_requestPaint,
  de = Oe.unstable_now,
  cu = Oe.unstable_getCurrentPriorityLevel,
  _i = Oe.unstable_ImmediatePriority,
  E1 = Oe.unstable_UserBlockingPriority,
  ho = Oe.unstable_NormalPriority,
  uu = Oe.unstable_LowPriority,
  N1 = Oe.unstable_IdlePriority,
  _o = null,
  lt = null;
function du(e) {
  if (lt && typeof lt.onCommitFiberRoot == "function")
    try {
      lt.onCommitFiberRoot(_o, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var et = Math.clz32 ? Math.clz32 : mu,
  pu = Math.log,
  fu = Math.LN2;
function mu(e) {
  return ((e >>>= 0), e === 0 ? 32 : (31 - ((pu(e) / fu) | 0)) | 0);
}
var Pr = 64,
  Rr = 4194304;
function Zn(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function vo(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    o = e.suspendedLanes,
    a = e.pingedLanes,
    i = n & 268435455;
  if (i !== 0) {
    var s = i & ~o;
    s !== 0 ? (r = Zn(s)) : ((a &= i), a !== 0 && (r = Zn(a)));
  } else ((i = n & ~o), i !== 0 ? (r = Zn(i)) : a !== 0 && (r = Zn(a)));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & o) &&
    ((o = r & -r), (a = t & -t), o >= a || (o === 16 && (a & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t;)
      ((n = 31 - et(t)), (o = 1 << n), (r |= e[n]), (t &= ~o));
  return r;
}
function hu(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function vu(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      o = e.expirationTimes,
      a = e.pendingLanes;
    0 < a;
  ) {
    var i = 31 - et(a),
      s = 1 << i,
      c = o[i];
    (c === -1
      ? (!(s & n) || s & r) && (o[i] = hu(s, t))
      : c <= t && (e.expiredLanes |= s),
      (a &= ~s));
  }
}
function Ua(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function A1() {
  var e = Pr;
  return ((Pr <<= 1), !(Pr & 4194240) && (Pr = 64), e);
}
function oa(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function jr(e, t, n) {
  ((e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - et(t)),
    (e[t] = n));
}
function gu(e, t) {
  var n = e.pendingLanes & ~t;
  ((e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements));
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n;) {
    var o = 31 - et(n),
      a = 1 << o;
    ((t[o] = 0), (r[o] = -1), (e[o] = -1), (n &= ~a));
  }
}
function Oi(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n;) {
    var r = 31 - et(n),
      o = 1 << r;
    ((o & t) | (e[r] & t) && (e[r] |= t), (n &= ~o));
  }
}
var J = 0;
function L1(e) {
  return (
    (e &= -e),
    1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1
  );
}
var I1,
  Bi,
  D1,
  P1,
  R1,
  Ga = !1,
  _r = [],
  Mt = null,
  Et = null,
  Nt = null,
  ur = new Map(),
  dr = new Map(),
  Ct = [],
  yu =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " "
    );
function Bl(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      Mt = null;
      break;
    case "dragenter":
    case "dragleave":
      Et = null;
      break;
    case "mouseover":
    case "mouseout":
      Nt = null;
      break;
    case "pointerover":
    case "pointerout":
      ur.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      dr.delete(t.pointerId);
  }
}
function On(e, t, n, r, o, a) {
  return e === null || e.nativeEvent !== a
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: a,
        targetContainers: [o],
      }),
      t !== null && ((t = Er(t)), t !== null && Bi(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      o !== null && t.indexOf(o) === -1 && t.push(o),
      e);
}
function wu(e, t, n, r, o) {
  switch (t) {
    case "focusin":
      return ((Mt = On(Mt, e, t, n, r, o)), !0);
    case "dragenter":
      return ((Et = On(Et, e, t, n, r, o)), !0);
    case "mouseover":
      return ((Nt = On(Nt, e, t, n, r, o)), !0);
    case "pointerover":
      var a = o.pointerId;
      return (ur.set(a, On(ur.get(a) || null, e, t, n, r, o)), !0);
    case "gotpointercapture":
      return (
        (a = o.pointerId),
        dr.set(a, On(dr.get(a) || null, e, t, n, r, o)),
        !0
      );
  }
  return !1;
}
function _1(e) {
  var t = Wt(e.target);
  if (t !== null) {
    var n = tn(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = T1(n)), t !== null)) {
          ((e.blockedOn = t),
            R1(e.priority, function () {
              D1(n);
            }));
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function eo(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length;) {
    var n = Qa(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      (($a = r), n.target.dispatchEvent(r), ($a = null));
    } else return ((t = Er(n)), t !== null && Bi(t), (e.blockedOn = n), !1);
    t.shift();
  }
  return !0;
}
function Fl(e, t, n) {
  eo(e) && n.delete(t);
}
function xu() {
  ((Ga = !1),
    Mt !== null && eo(Mt) && (Mt = null),
    Et !== null && eo(Et) && (Et = null),
    Nt !== null && eo(Nt) && (Nt = null),
    ur.forEach(Fl),
    dr.forEach(Fl));
}
function Bn(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    Ga ||
      ((Ga = !0),
      Oe.unstable_scheduleCallback(Oe.unstable_NormalPriority, xu)));
}
function pr(e) {
  function t(o) {
    return Bn(o, e);
  }
  if (0 < _r.length) {
    Bn(_r[0], e);
    for (var n = 1; n < _r.length; n++) {
      var r = _r[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    Mt !== null && Bn(Mt, e),
      Et !== null && Bn(Et, e),
      Nt !== null && Bn(Nt, e),
      ur.forEach(t),
      dr.forEach(t),
      n = 0;
    n < Ct.length;
    n++
  )
    ((r = Ct[n]), r.blockedOn === e && (r.blockedOn = null));
  for (; 0 < Ct.length && ((n = Ct[0]), n.blockedOn === null);)
    (_1(n), n.blockedOn === null && Ct.shift());
}
var bn = xt.ReactCurrentBatchConfig,
  go = !0;
function bu(e, t, n, r) {
  var o = J,
    a = bn.transition;
  bn.transition = null;
  try {
    ((J = 1), Fi(e, t, n, r));
  } finally {
    ((J = o), (bn.transition = a));
  }
}
function ku(e, t, n, r) {
  var o = J,
    a = bn.transition;
  bn.transition = null;
  try {
    ((J = 4), Fi(e, t, n, r));
  } finally {
    ((J = o), (bn.transition = a));
  }
}
function Fi(e, t, n, r) {
  if (go) {
    var o = Qa(e, t, n, r);
    if (o === null) (ma(e, t, r, yo, n), Bl(e, r));
    else if (wu(o, e, t, n, r)) r.stopPropagation();
    else if ((Bl(e, r), t & 4 && -1 < yu.indexOf(e))) {
      for (; o !== null;) {
        var a = Er(o);
        if (
          (a !== null && I1(a),
          (a = Qa(e, t, n, r)),
          a === null && ma(e, t, r, yo, n),
          a === o)
        )
          break;
        o = a;
      }
      o !== null && r.stopPropagation();
    } else ma(e, t, r, null, n);
  }
}
var yo = null;
function Qa(e, t, n, r) {
  if (((yo = null), (e = Ri(r)), (e = Wt(e)), e !== null))
    if (((t = tn(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = T1(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return ((yo = e), null);
}
function O1(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (cu()) {
        case _i:
          return 1;
        case E1:
          return 4;
        case ho:
        case uu:
          return 16;
        case N1:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var zt = null,
  $i = null,
  to = null;
function B1() {
  if (to) return to;
  var e,
    t = $i,
    n = t.length,
    r,
    o = "value" in zt ? zt.value : zt.textContent,
    a = o.length;
  for (e = 0; e < n && t[e] === o[e]; e++);
  var i = n - e;
  for (r = 1; r <= i && t[n - r] === o[a - r]; r++);
  return (to = o.slice(e, 1 < r ? 1 - r : void 0));
}
function no(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function Or() {
  return !0;
}
function $l() {
  return !1;
}
function Fe(e) {
  function t(n, r, o, a, i) {
    ((this._reactName = n),
      (this._targetInst = o),
      (this.type = r),
      (this.nativeEvent = a),
      (this.target = i),
      (this.currentTarget = null));
    for (var s in e)
      e.hasOwnProperty(s) && ((n = e[s]), (this[s] = n ? n(a) : a[s]));
    return (
      (this.isDefaultPrevented = (
        a.defaultPrevented != null ? a.defaultPrevented : a.returnValue === !1
      )
        ? Or
        : $l),
      (this.isPropagationStopped = $l),
      this
    );
  }
  return (
    ie(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = Or));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = Or));
      },
      persist: function () {},
      isPersistent: Or,
    }),
    t
  );
}
var In = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  Hi = Fe(In),
  Mr = ie({}, In, { view: 0, detail: 0 }),
  Su = Fe(Mr),
  aa,
  ia,
  Fn,
  Oo = ie({}, Mr, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Vi,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== Fn &&
            (Fn && e.type === "mousemove"
              ? ((aa = e.screenX - Fn.screenX), (ia = e.screenY - Fn.screenY))
              : (ia = aa = 0),
            (Fn = e)),
          aa);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : ia;
    },
  }),
  Hl = Fe(Oo),
  Cu = ie({}, Oo, { dataTransfer: 0 }),
  Tu = Fe(Cu),
  zu = ie({}, Mr, { relatedTarget: 0 }),
  la = Fe(zu),
  ju = ie({}, In, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Mu = Fe(ju),
  Eu = ie({}, In, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  Nu = Fe(Eu),
  Au = ie({}, In, { data: 0 }),
  Vl = Fe(Au),
  Lu = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  Iu = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  Du = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function Pu(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Du[e]) ? !!t[e] : !1;
}
function Vi() {
  return Pu;
}
var Ru = ie({}, Mr, {
    key: function (e) {
      if (e.key) {
        var t = Lu[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = no(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
          ? Iu[e.keyCode] || "Unidentified"
          : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Vi,
    charCode: function (e) {
      return e.type === "keypress" ? no(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? no(e)
        : e.type === "keydown" || e.type === "keyup"
          ? e.keyCode
          : 0;
    },
  }),
  _u = Fe(Ru),
  Ou = ie({}, Oo, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  Wl = Fe(Ou),
  Bu = ie({}, Mr, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Vi,
  }),
  Fu = Fe(Bu),
  $u = ie({}, In, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Hu = Fe($u),
  Vu = ie({}, Oo, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
          ? -e.wheelDeltaY
          : "wheelDelta" in e
            ? -e.wheelDelta
            : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  Wu = Fe(Vu),
  Uu = [9, 13, 27, 32],
  Wi = vt && "CompositionEvent" in window,
  er = null;
vt && "documentMode" in document && (er = document.documentMode);
var Gu = vt && "TextEvent" in window && !er,
  F1 = vt && (!Wi || (er && 8 < er && 11 >= er)),
  Ul = " ",
  Gl = !1;
function $1(e, t) {
  switch (e) {
    case "keyup":
      return Uu.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function H1(e) {
  return ((e = e.detail), typeof e == "object" && "data" in e ? e.data : null);
}
var sn = !1;
function Qu(e, t) {
  switch (e) {
    case "compositionend":
      return H1(t);
    case "keypress":
      return t.which !== 32 ? null : ((Gl = !0), Ul);
    case "textInput":
      return ((e = t.data), e === Ul && Gl ? null : e);
    default:
      return null;
  }
}
function Yu(e, t) {
  if (sn)
    return e === "compositionend" || (!Wi && $1(e, t))
      ? ((e = B1()), (to = $i = zt = null), (sn = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return F1 && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Ku = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function Ql(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Ku[e.type] : t === "textarea";
}
function V1(e, t, n, r) {
  (x1(r),
    (t = wo(t, "onChange")),
    0 < t.length &&
      ((n = new Hi("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t })));
}
var tr = null,
  fr = null;
function Zu(e) {
  e2(e, 0);
}
function Bo(e) {
  var t = dn(e);
  if (f1(t)) return e;
}
function Xu(e, t) {
  if (e === "change") return t;
}
var W1 = !1;
if (vt) {
  var sa;
  if (vt) {
    var ca = "oninput" in document;
    if (!ca) {
      var Yl = document.createElement("div");
      (Yl.setAttribute("oninput", "return;"),
        (ca = typeof Yl.oninput == "function"));
    }
    sa = ca;
  } else sa = !1;
  W1 = sa && (!document.documentMode || 9 < document.documentMode);
}
function Kl() {
  tr && (tr.detachEvent("onpropertychange", U1), (fr = tr = null));
}
function U1(e) {
  if (e.propertyName === "value" && Bo(fr)) {
    var t = [];
    (V1(t, fr, e, Ri(e)), C1(Zu, t));
  }
}
function Ju(e, t, n) {
  e === "focusin"
    ? (Kl(), (tr = t), (fr = n), tr.attachEvent("onpropertychange", U1))
    : e === "focusout" && Kl();
}
function qu(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return Bo(fr);
}
function ed(e, t) {
  if (e === "click") return Bo(t);
}
function td(e, t) {
  if (e === "input" || e === "change") return Bo(t);
}
function nd(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var nt = typeof Object.is == "function" ? Object.is : nd;
function mr(e, t) {
  if (nt(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var o = n[r];
    if (!Ea.call(t, o) || !nt(e[o], t[o])) return !1;
  }
  return !0;
}
function Zl(e) {
  for (; e && e.firstChild;) e = e.firstChild;
  return e;
}
function Xl(e, t) {
  var n = Zl(e);
  e = 0;
  for (var r; n;) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n;) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = Zl(n);
  }
}
function G1(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
          ? G1(e, t.parentNode)
          : "contains" in e
            ? e.contains(t)
            : e.compareDocumentPosition
              ? !!(e.compareDocumentPosition(t) & 16)
              : !1
    : !1;
}
function Q1() {
  for (var e = window, t = po(); t instanceof e.HTMLIFrameElement;) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = po(e.document);
  }
  return t;
}
function Ui(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function rd(e) {
  var t = Q1(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    G1(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && Ui(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        "selectionStart" in n)
      )
        ((n.selectionStart = t),
          (n.selectionEnd = Math.min(e, n.value.length)));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var o = n.textContent.length,
          a = Math.min(r.start, o);
        ((r = r.end === void 0 ? a : Math.min(r.end, o)),
          !e.extend && a > r && ((o = r), (r = a), (a = o)),
          (o = Xl(n, a)));
        var i = Xl(n, r);
        o &&
          i &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== o.node ||
            e.anchorOffset !== o.offset ||
            e.focusNode !== i.node ||
            e.focusOffset !== i.offset) &&
          ((t = t.createRange()),
          t.setStart(o.node, o.offset),
          e.removeAllRanges(),
          a > r
            ? (e.addRange(t), e.extend(i.node, i.offset))
            : (t.setEnd(i.node, i.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode);)
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      ((e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top));
  }
}
var od = vt && "documentMode" in document && 11 >= document.documentMode,
  cn = null,
  Ya = null,
  nr = null,
  Ka = !1;
function Jl(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Ka ||
    cn == null ||
    cn !== po(r) ||
    ((r = cn),
    "selectionStart" in r && Ui(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (nr && mr(nr, r)) ||
      ((nr = r),
      (r = wo(Ya, "onSelect")),
      0 < r.length &&
        ((t = new Hi("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = cn))));
}
function Br(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var un = {
    animationend: Br("Animation", "AnimationEnd"),
    animationiteration: Br("Animation", "AnimationIteration"),
    animationstart: Br("Animation", "AnimationStart"),
    transitionend: Br("Transition", "TransitionEnd"),
  },
  ua = {},
  Y1 = {};
vt &&
  ((Y1 = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete un.animationend.animation,
    delete un.animationiteration.animation,
    delete un.animationstart.animation),
  "TransitionEvent" in window || delete un.transitionend.transition);
function Fo(e) {
  if (ua[e]) return ua[e];
  if (!un[e]) return e;
  var t = un[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in Y1) return (ua[e] = t[n]);
  return e;
}
var K1 = Fo("animationend"),
  Z1 = Fo("animationiteration"),
  X1 = Fo("animationstart"),
  J1 = Fo("transitionend"),
  q1 = new Map(),
  ql =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " "
    );
function Ot(e, t) {
  (q1.set(e, t), en(t, [e]));
}
for (var da = 0; da < ql.length; da++) {
  var pa = ql[da],
    ad = pa.toLowerCase(),
    id = pa[0].toUpperCase() + pa.slice(1);
  Ot(ad, "on" + id);
}
Ot(K1, "onAnimationEnd");
Ot(Z1, "onAnimationIteration");
Ot(X1, "onAnimationStart");
Ot("dblclick", "onDoubleClick");
Ot("focusin", "onFocus");
Ot("focusout", "onBlur");
Ot(J1, "onTransitionEnd");
Tn("onMouseEnter", ["mouseout", "mouseover"]);
Tn("onMouseLeave", ["mouseout", "mouseover"]);
Tn("onPointerEnter", ["pointerout", "pointerover"]);
Tn("onPointerLeave", ["pointerout", "pointerover"]);
en(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(" ")
);
en(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " "
  )
);
en("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
en(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
en(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
en(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var Xn =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ),
  ld = new Set("cancel close invalid load scroll toggle".split(" ").concat(Xn));
function es(e, t, n) {
  var r = e.type || "unknown-event";
  ((e.currentTarget = n), au(r, t, void 0, e), (e.currentTarget = null));
}
function e2(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      o = r.event;
    r = r.listeners;
    e: {
      var a = void 0;
      if (t)
        for (var i = r.length - 1; 0 <= i; i--) {
          var s = r[i],
            c = s.instance,
            u = s.currentTarget;
          if (((s = s.listener), c !== a && o.isPropagationStopped())) break e;
          (es(o, s, u), (a = c));
        }
      else
        for (i = 0; i < r.length; i++) {
          if (
            ((s = r[i]),
            (c = s.instance),
            (u = s.currentTarget),
            (s = s.listener),
            c !== a && o.isPropagationStopped())
          )
            break e;
          (es(o, s, u), (a = c));
        }
    }
  }
  if (mo) throw ((e = Wa), (mo = !1), (Wa = null), e);
}
function te(e, t) {
  var n = t[ei];
  n === void 0 && (n = t[ei] = new Set());
  var r = e + "__bubble";
  n.has(r) || (t2(t, e, 2, !1), n.add(r));
}
function fa(e, t, n) {
  var r = 0;
  (t && (r |= 4), t2(n, e, r, t));
}
var Fr = "_reactListening" + Math.random().toString(36).slice(2);
function hr(e) {
  if (!e[Fr]) {
    ((e[Fr] = !0),
      s1.forEach(function (n) {
        n !== "selectionchange" && (ld.has(n) || fa(n, !1, e), fa(n, !0, e));
      }));
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Fr] || ((t[Fr] = !0), fa("selectionchange", !1, t));
  }
}
function t2(e, t, n, r) {
  switch (O1(t)) {
    case 1:
      var o = bu;
      break;
    case 4:
      o = ku;
      break;
    default:
      o = Fi;
  }
  ((n = o.bind(null, t, n, e)),
    (o = void 0),
    !Va ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (o = !0),
    r
      ? o !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: o })
        : e.addEventListener(t, n, !0)
      : o !== void 0
        ? e.addEventListener(t, n, { passive: o })
        : e.addEventListener(t, n, !1));
}
function ma(e, t, n, r, o) {
  var a = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var i = r.tag;
      if (i === 3 || i === 4) {
        var s = r.stateNode.containerInfo;
        if (s === o || (s.nodeType === 8 && s.parentNode === o)) break;
        if (i === 4)
          for (i = r.return; i !== null;) {
            var c = i.tag;
            if (
              (c === 3 || c === 4) &&
              ((c = i.stateNode.containerInfo),
              c === o || (c.nodeType === 8 && c.parentNode === o))
            )
              return;
            i = i.return;
          }
        for (; s !== null;) {
          if (((i = Wt(s)), i === null)) return;
          if (((c = i.tag), c === 5 || c === 6)) {
            r = a = i;
            continue e;
          }
          s = s.parentNode;
        }
      }
      r = r.return;
    }
  C1(function () {
    var u = a,
      v = Ri(n),
      m = [];
    e: {
      var f = q1.get(e);
      if (f !== void 0) {
        var h = Hi,
          g = e;
        switch (e) {
          case "keypress":
            if (no(n) === 0) break e;
          case "keydown":
          case "keyup":
            h = _u;
            break;
          case "focusin":
            ((g = "focus"), (h = la));
            break;
          case "focusout":
            ((g = "blur"), (h = la));
            break;
          case "beforeblur":
          case "afterblur":
            h = la;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            h = Hl;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            h = Tu;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            h = Fu;
            break;
          case K1:
          case Z1:
          case X1:
            h = Mu;
            break;
          case J1:
            h = Hu;
            break;
          case "scroll":
            h = Su;
            break;
          case "wheel":
            h = Wu;
            break;
          case "copy":
          case "cut":
          case "paste":
            h = Nu;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            h = Wl;
        }
        var S = (t & 4) !== 0,
          T = !S && e === "scroll",
          d = S ? (f !== null ? f + "Capture" : null) : f;
        S = [];
        for (var p = u, w; p !== null;) {
          w = p;
          var x = w.stateNode;
          if (
            (w.tag === 5 &&
              x !== null &&
              ((w = x),
              d !== null && ((x = cr(p, d)), x != null && S.push(vr(p, x, w)))),
            T)
          )
            break;
          p = p.return;
        }
        0 < S.length &&
          ((f = new h(f, g, null, n, v)), m.push({ event: f, listeners: S }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((f = e === "mouseover" || e === "pointerover"),
          (h = e === "mouseout" || e === "pointerout"),
          f &&
            n !== $a &&
            (g = n.relatedTarget || n.fromElement) &&
            (Wt(g) || g[gt]))
        )
          break e;
        if (
          (h || f) &&
          ((f =
            v.window === v
              ? v
              : (f = v.ownerDocument)
                ? f.defaultView || f.parentWindow
                : window),
          h
            ? ((g = n.relatedTarget || n.toElement),
              (h = u),
              (g = g ? Wt(g) : null),
              g !== null &&
                ((T = tn(g)), g !== T || (g.tag !== 5 && g.tag !== 6)) &&
                (g = null))
            : ((h = null), (g = u)),
          h !== g)
        ) {
          if (
            ((S = Hl),
            (x = "onMouseLeave"),
            (d = "onMouseEnter"),
            (p = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((S = Wl),
              (x = "onPointerLeave"),
              (d = "onPointerEnter"),
              (p = "pointer")),
            (T = h == null ? f : dn(h)),
            (w = g == null ? f : dn(g)),
            (f = new S(x, p + "leave", h, n, v)),
            (f.target = T),
            (f.relatedTarget = w),
            (x = null),
            Wt(v) === u &&
              ((S = new S(d, p + "enter", g, n, v)),
              (S.target = w),
              (S.relatedTarget = T),
              (x = S)),
            (T = x),
            h && g)
          )
            t: {
              for (S = h, d = g, p = 0, w = S; w; w = nn(w)) p++;
              for (w = 0, x = d; x; x = nn(x)) w++;
              for (; 0 < p - w;) ((S = nn(S)), p--);
              for (; 0 < w - p;) ((d = nn(d)), w--);
              for (; p--;) {
                if (S === d || (d !== null && S === d.alternate)) break t;
                ((S = nn(S)), (d = nn(d)));
              }
              S = null;
            }
          else S = null;
          (h !== null && ts(m, f, h, S, !1),
            g !== null && T !== null && ts(m, T, g, S, !0));
        }
      }
      e: {
        if (
          ((f = u ? dn(u) : window),
          (h = f.nodeName && f.nodeName.toLowerCase()),
          h === "select" || (h === "input" && f.type === "file"))
        )
          var C = Xu;
        else if (Ql(f))
          if (W1) C = td;
          else {
            C = qu;
            var z = Ju;
          }
        else
          (h = f.nodeName) &&
            h.toLowerCase() === "input" &&
            (f.type === "checkbox" || f.type === "radio") &&
            (C = ed);
        if (C && (C = C(e, u))) {
          V1(m, C, n, v);
          break e;
        }
        (z && z(e, f, u),
          e === "focusout" &&
            (z = f._wrapperState) &&
            z.controlled &&
            f.type === "number" &&
            Ra(f, "number", f.value));
      }
      switch (((z = u ? dn(u) : window), e)) {
        case "focusin":
          (Ql(z) || z.contentEditable === "true") &&
            ((cn = z), (Ya = u), (nr = null));
          break;
        case "focusout":
          nr = Ya = cn = null;
          break;
        case "mousedown":
          Ka = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          ((Ka = !1), Jl(m, n, v));
          break;
        case "selectionchange":
          if (od) break;
        case "keydown":
        case "keyup":
          Jl(m, n, v);
      }
      var j;
      if (Wi)
        e: {
          switch (e) {
            case "compositionstart":
              var k = "onCompositionStart";
              break e;
            case "compositionend":
              k = "onCompositionEnd";
              break e;
            case "compositionupdate":
              k = "onCompositionUpdate";
              break e;
          }
          k = void 0;
        }
      else
        sn
          ? $1(e, n) && (k = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (k = "onCompositionStart");
      (k &&
        (F1 &&
          n.locale !== "ko" &&
          (sn || k !== "onCompositionStart"
            ? k === "onCompositionEnd" && sn && (j = B1())
            : ((zt = v),
              ($i = "value" in zt ? zt.value : zt.textContent),
              (sn = !0))),
        (z = wo(u, k)),
        0 < z.length &&
          ((k = new Vl(k, e, null, n, v)),
          m.push({ event: k, listeners: z }),
          j ? (k.data = j) : ((j = H1(n)), j !== null && (k.data = j)))),
        (j = Gu ? Qu(e, n) : Yu(e, n)) &&
          ((u = wo(u, "onBeforeInput")),
          0 < u.length &&
            ((v = new Vl("onBeforeInput", "beforeinput", null, n, v)),
            m.push({ event: v, listeners: u }),
            (v.data = j))));
    }
    e2(m, t);
  });
}
function vr(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function wo(e, t) {
  for (var n = t + "Capture", r = []; e !== null;) {
    var o = e,
      a = o.stateNode;
    (o.tag === 5 &&
      a !== null &&
      ((o = a),
      (a = cr(e, n)),
      a != null && r.unshift(vr(e, a, o)),
      (a = cr(e, t)),
      a != null && r.push(vr(e, a, o))),
      (e = e.return));
  }
  return r;
}
function nn(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function ts(e, t, n, r, o) {
  for (var a = t._reactName, i = []; n !== null && n !== r;) {
    var s = n,
      c = s.alternate,
      u = s.stateNode;
    if (c !== null && c === r) break;
    (s.tag === 5 &&
      u !== null &&
      ((s = u),
      o
        ? ((c = cr(n, a)), c != null && i.unshift(vr(n, c, s)))
        : o || ((c = cr(n, a)), c != null && i.push(vr(n, c, s)))),
      (n = n.return));
  }
  i.length !== 0 && e.push({ event: t, listeners: i });
}
var sd = /\r\n?/g,
  cd = /\u0000|\uFFFD/g;
function ns(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      sd,
      `
`
    )
    .replace(cd, "");
}
function $r(e, t, n) {
  if (((t = ns(t)), ns(e) !== t && n)) throw Error(N(425));
}
function xo() {}
var Za = null,
  Xa = null;
function Ja(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var qa = typeof setTimeout == "function" ? setTimeout : void 0,
  ud = typeof clearTimeout == "function" ? clearTimeout : void 0,
  rs = typeof Promise == "function" ? Promise : void 0,
  dd =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof rs < "u"
        ? function (e) {
            return rs.resolve(null).then(e).catch(pd);
          }
        : qa;
function pd(e) {
  setTimeout(function () {
    throw e;
  });
}
function ha(e, t) {
  var n = t,
    r = 0;
  do {
    var o = n.nextSibling;
    if ((e.removeChild(n), o && o.nodeType === 8))
      if (((n = o.data), n === "/$")) {
        if (r === 0) {
          (e.removeChild(o), pr(t));
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = o;
  } while (n);
  pr(t);
}
function At(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function os(e) {
  e = e.previousSibling;
  for (var t = 0; e;) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var Dn = Math.random().toString(36).slice(2),
  it = "__reactFiber$" + Dn,
  gr = "__reactProps$" + Dn,
  gt = "__reactContainer$" + Dn,
  ei = "__reactEvents$" + Dn,
  fd = "__reactListeners$" + Dn,
  md = "__reactHandles$" + Dn;
function Wt(e) {
  var t = e[it];
  if (t) return t;
  for (var n = e.parentNode; n;) {
    if ((t = n[gt] || n[it])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = os(e); e !== null;) {
          if ((n = e[it])) return n;
          e = os(e);
        }
      return t;
    }
    ((e = n), (n = e.parentNode));
  }
  return null;
}
function Er(e) {
  return (
    (e = e[it] || e[gt]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function dn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(N(33));
}
function $o(e) {
  return e[gr] || null;
}
var ti = [],
  pn = -1;
function Bt(e) {
  return { current: e };
}
function ne(e) {
  0 > pn || ((e.current = ti[pn]), (ti[pn] = null), pn--);
}
function q(e, t) {
  (pn++, (ti[pn] = e.current), (e.current = t));
}
var _t = {},
  Ce = Bt(_t),
  Le = Bt(!1),
  Kt = _t;
function zn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return _t;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var o = {},
    a;
  for (a in n) o[a] = t[a];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = o)),
    o
  );
}
function Ie(e) {
  return ((e = e.childContextTypes), e != null);
}
function bo() {
  (ne(Le), ne(Ce));
}
function as(e, t, n) {
  if (Ce.current !== _t) throw Error(N(168));
  (q(Ce, t), q(Le, n));
}
function n2(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
    return n;
  r = r.getChildContext();
  for (var o in r) if (!(o in t)) throw Error(N(108, Jc(e) || "Unknown", o));
  return ie({}, n, r);
}
function ko(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || _t),
    (Kt = Ce.current),
    q(Ce, e),
    q(Le, Le.current),
    !0
  );
}
function is(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(N(169));
  (n
    ? ((e = n2(e, t, Kt)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      ne(Le),
      ne(Ce),
      q(Ce, e))
    : ne(Le),
    q(Le, n));
}
var dt = null,
  Ho = !1,
  va = !1;
function r2(e) {
  dt === null ? (dt = [e]) : dt.push(e);
}
function hd(e) {
  ((Ho = !0), r2(e));
}
function Ft() {
  if (!va && dt !== null) {
    va = !0;
    var e = 0,
      t = J;
    try {
      var n = dt;
      for (J = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      ((dt = null), (Ho = !1));
    } catch (o) {
      throw (dt !== null && (dt = dt.slice(e + 1)), M1(_i, Ft), o);
    } finally {
      ((J = t), (va = !1));
    }
  }
  return null;
}
var fn = [],
  mn = 0,
  So = null,
  Co = 0,
  $e = [],
  He = 0,
  Zt = null,
  ft = 1,
  mt = "";
function Ht(e, t) {
  ((fn[mn++] = Co), (fn[mn++] = So), (So = e), (Co = t));
}
function o2(e, t, n) {
  (($e[He++] = ft), ($e[He++] = mt), ($e[He++] = Zt), (Zt = e));
  var r = ft;
  e = mt;
  var o = 32 - et(r) - 1;
  ((r &= ~(1 << o)), (n += 1));
  var a = 32 - et(t) + o;
  if (30 < a) {
    var i = o - (o % 5);
    ((a = (r & ((1 << i) - 1)).toString(32)),
      (r >>= i),
      (o -= i),
      (ft = (1 << (32 - et(t) + o)) | (n << o) | r),
      (mt = a + e));
  } else ((ft = (1 << a) | (n << o) | r), (mt = e));
}
function Gi(e) {
  e.return !== null && (Ht(e, 1), o2(e, 1, 0));
}
function Qi(e) {
  for (; e === So;)
    ((So = fn[--mn]), (fn[mn] = null), (Co = fn[--mn]), (fn[mn] = null));
  for (; e === Zt;)
    ((Zt = $e[--He]),
      ($e[He] = null),
      (mt = $e[--He]),
      ($e[He] = null),
      (ft = $e[--He]),
      ($e[He] = null));
}
var _e = null,
  Re = null,
  re = !1,
  qe = null;
function a2(e, t) {
  var n = Ve(5, null, null, 0);
  ((n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n));
}
function ls(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (_e = e), (Re = At(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (_e = e), (Re = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = Zt !== null ? { id: ft, overflow: mt } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = Ve(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (_e = e),
            (Re = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function ni(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function ri(e) {
  if (re) {
    var t = Re;
    if (t) {
      var n = t;
      if (!ls(e, t)) {
        if (ni(e)) throw Error(N(418));
        t = At(n.nextSibling);
        var r = _e;
        t && ls(e, t)
          ? a2(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (re = !1), (_e = e));
      }
    } else {
      if (ni(e)) throw Error(N(418));
      ((e.flags = (e.flags & -4097) | 2), (re = !1), (_e = e));
    }
  }
}
function ss(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;)
    e = e.return;
  _e = e;
}
function Hr(e) {
  if (e !== _e) return !1;
  if (!re) return (ss(e), (re = !0), !1);
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !Ja(e.type, e.memoizedProps))),
    t && (t = Re))
  ) {
    if (ni(e)) throw (i2(), Error(N(418)));
    for (; t;) (a2(e, t), (t = At(t.nextSibling)));
  }
  if ((ss(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(N(317));
    e: {
      for (e = e.nextSibling, t = 0; e;) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Re = At(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      Re = null;
    }
  } else Re = _e ? At(e.stateNode.nextSibling) : null;
  return !0;
}
function i2() {
  for (var e = Re; e;) e = At(e.nextSibling);
}
function jn() {
  ((Re = _e = null), (re = !1));
}
function Yi(e) {
  qe === null ? (qe = [e]) : qe.push(e);
}
var vd = xt.ReactCurrentBatchConfig;
function $n(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(N(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(N(147, e));
      var o = r,
        a = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === a
        ? t.ref
        : ((t = function (i) {
            var s = o.refs;
            i === null ? delete s[a] : (s[a] = i);
          }),
          (t._stringRef = a),
          t);
    }
    if (typeof e != "string") throw Error(N(284));
    if (!n._owner) throw Error(N(290, e));
  }
  return e;
}
function Vr(e, t) {
  throw (
    (e = Object.prototype.toString.call(t)),
    Error(
      N(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e
      )
    )
  );
}
function cs(e) {
  var t = e._init;
  return t(e._payload);
}
function l2(e) {
  function t(d, p) {
    if (e) {
      var w = d.deletions;
      w === null ? ((d.deletions = [p]), (d.flags |= 16)) : w.push(p);
    }
  }
  function n(d, p) {
    if (!e) return null;
    for (; p !== null;) (t(d, p), (p = p.sibling));
    return null;
  }
  function r(d, p) {
    for (d = new Map(); p !== null;)
      (p.key !== null ? d.set(p.key, p) : d.set(p.index, p), (p = p.sibling));
    return d;
  }
  function o(d, p) {
    return ((d = Pt(d, p)), (d.index = 0), (d.sibling = null), d);
  }
  function a(d, p, w) {
    return (
      (d.index = w),
      e
        ? ((w = d.alternate),
          w !== null
            ? ((w = w.index), w < p ? ((d.flags |= 2), p) : w)
            : ((d.flags |= 2), p))
        : ((d.flags |= 1048576), p)
    );
  }
  function i(d) {
    return (e && d.alternate === null && (d.flags |= 2), d);
  }
  function s(d, p, w, x) {
    return p === null || p.tag !== 6
      ? ((p = Sa(w, d.mode, x)), (p.return = d), p)
      : ((p = o(p, w)), (p.return = d), p);
  }
  function c(d, p, w, x) {
    var C = w.type;
    return C === ln
      ? v(d, p, w.props.children, x, w.key)
      : p !== null &&
          (p.elementType === C ||
            (typeof C == "object" &&
              C !== null &&
              C.$$typeof === kt &&
              cs(C) === p.type))
        ? ((x = o(p, w.props)), (x.ref = $n(d, p, w)), (x.return = d), x)
        : ((x = co(w.type, w.key, w.props, null, d.mode, x)),
          (x.ref = $n(d, p, w)),
          (x.return = d),
          x);
  }
  function u(d, p, w, x) {
    return p === null ||
      p.tag !== 4 ||
      p.stateNode.containerInfo !== w.containerInfo ||
      p.stateNode.implementation !== w.implementation
      ? ((p = Ca(w, d.mode, x)), (p.return = d), p)
      : ((p = o(p, w.children || [])), (p.return = d), p);
  }
  function v(d, p, w, x, C) {
    return p === null || p.tag !== 7
      ? ((p = Yt(w, d.mode, x, C)), (p.return = d), p)
      : ((p = o(p, w)), (p.return = d), p);
  }
  function m(d, p, w) {
    if ((typeof p == "string" && p !== "") || typeof p == "number")
      return ((p = Sa("" + p, d.mode, w)), (p.return = d), p);
    if (typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case Lr:
          return (
            (w = co(p.type, p.key, p.props, null, d.mode, w)),
            (w.ref = $n(d, null, p)),
            (w.return = d),
            w
          );
        case an:
          return ((p = Ca(p, d.mode, w)), (p.return = d), p);
        case kt:
          var x = p._init;
          return m(d, x(p._payload), w);
      }
      if (Kn(p) || Rn(p))
        return ((p = Yt(p, d.mode, w, null)), (p.return = d), p);
      Vr(d, p);
    }
    return null;
  }
  function f(d, p, w, x) {
    var C = p !== null ? p.key : null;
    if ((typeof w == "string" && w !== "") || typeof w == "number")
      return C !== null ? null : s(d, p, "" + w, x);
    if (typeof w == "object" && w !== null) {
      switch (w.$$typeof) {
        case Lr:
          return w.key === C ? c(d, p, w, x) : null;
        case an:
          return w.key === C ? u(d, p, w, x) : null;
        case kt:
          return ((C = w._init), f(d, p, C(w._payload), x));
      }
      if (Kn(w) || Rn(w)) return C !== null ? null : v(d, p, w, x, null);
      Vr(d, w);
    }
    return null;
  }
  function h(d, p, w, x, C) {
    if ((typeof x == "string" && x !== "") || typeof x == "number")
      return ((d = d.get(w) || null), s(p, d, "" + x, C));
    if (typeof x == "object" && x !== null) {
      switch (x.$$typeof) {
        case Lr:
          return (
            (d = d.get(x.key === null ? w : x.key) || null),
            c(p, d, x, C)
          );
        case an:
          return (
            (d = d.get(x.key === null ? w : x.key) || null),
            u(p, d, x, C)
          );
        case kt:
          var z = x._init;
          return h(d, p, w, z(x._payload), C);
      }
      if (Kn(x) || Rn(x)) return ((d = d.get(w) || null), v(p, d, x, C, null));
      Vr(p, x);
    }
    return null;
  }
  function g(d, p, w, x) {
    for (
      var C = null, z = null, j = p, k = (p = 0), A = null;
      j !== null && k < w.length;
      k++
    ) {
      j.index > k ? ((A = j), (j = null)) : (A = j.sibling);
      var M = f(d, j, w[k], x);
      if (M === null) {
        j === null && (j = A);
        break;
      }
      (e && j && M.alternate === null && t(d, j),
        (p = a(M, p, k)),
        z === null ? (C = M) : (z.sibling = M),
        (z = M),
        (j = A));
    }
    if (k === w.length) return (n(d, j), re && Ht(d, k), C);
    if (j === null) {
      for (; k < w.length; k++)
        ((j = m(d, w[k], x)),
          j !== null &&
            ((p = a(j, p, k)),
            z === null ? (C = j) : (z.sibling = j),
            (z = j)));
      return (re && Ht(d, k), C);
    }
    for (j = r(d, j); k < w.length; k++)
      ((A = h(j, d, k, w[k], x)),
        A !== null &&
          (e && A.alternate !== null && j.delete(A.key === null ? k : A.key),
          (p = a(A, p, k)),
          z === null ? (C = A) : (z.sibling = A),
          (z = A)));
    return (
      e &&
        j.forEach(function (P) {
          return t(d, P);
        }),
      re && Ht(d, k),
      C
    );
  }
  function S(d, p, w, x) {
    var C = Rn(w);
    if (typeof C != "function") throw Error(N(150));
    if (((w = C.call(w)), w == null)) throw Error(N(151));
    for (
      var z = (C = null), j = p, k = (p = 0), A = null, M = w.next();
      j !== null && !M.done;
      k++, M = w.next()
    ) {
      j.index > k ? ((A = j), (j = null)) : (A = j.sibling);
      var P = f(d, j, M.value, x);
      if (P === null) {
        j === null && (j = A);
        break;
      }
      (e && j && P.alternate === null && t(d, j),
        (p = a(P, p, k)),
        z === null ? (C = P) : (z.sibling = P),
        (z = P),
        (j = A));
    }
    if (M.done) return (n(d, j), re && Ht(d, k), C);
    if (j === null) {
      for (; !M.done; k++, M = w.next())
        ((M = m(d, M.value, x)),
          M !== null &&
            ((p = a(M, p, k)),
            z === null ? (C = M) : (z.sibling = M),
            (z = M)));
      return (re && Ht(d, k), C);
    }
    for (j = r(d, j); !M.done; k++, M = w.next())
      ((M = h(j, d, k, M.value, x)),
        M !== null &&
          (e && M.alternate !== null && j.delete(M.key === null ? k : M.key),
          (p = a(M, p, k)),
          z === null ? (C = M) : (z.sibling = M),
          (z = M)));
    return (
      e &&
        j.forEach(function (I) {
          return t(d, I);
        }),
      re && Ht(d, k),
      C
    );
  }
  function T(d, p, w, x) {
    if (
      (typeof w == "object" &&
        w !== null &&
        w.type === ln &&
        w.key === null &&
        (w = w.props.children),
      typeof w == "object" && w !== null)
    ) {
      switch (w.$$typeof) {
        case Lr:
          e: {
            for (var C = w.key, z = p; z !== null;) {
              if (z.key === C) {
                if (((C = w.type), C === ln)) {
                  if (z.tag === 7) {
                    (n(d, z.sibling),
                      (p = o(z, w.props.children)),
                      (p.return = d),
                      (d = p));
                    break e;
                  }
                } else if (
                  z.elementType === C ||
                  (typeof C == "object" &&
                    C !== null &&
                    C.$$typeof === kt &&
                    cs(C) === z.type)
                ) {
                  (n(d, z.sibling),
                    (p = o(z, w.props)),
                    (p.ref = $n(d, z, w)),
                    (p.return = d),
                    (d = p));
                  break e;
                }
                n(d, z);
                break;
              } else t(d, z);
              z = z.sibling;
            }
            w.type === ln
              ? ((p = Yt(w.props.children, d.mode, x, w.key)),
                (p.return = d),
                (d = p))
              : ((x = co(w.type, w.key, w.props, null, d.mode, x)),
                (x.ref = $n(d, p, w)),
                (x.return = d),
                (d = x));
          }
          return i(d);
        case an:
          e: {
            for (z = w.key; p !== null;) {
              if (p.key === z)
                if (
                  p.tag === 4 &&
                  p.stateNode.containerInfo === w.containerInfo &&
                  p.stateNode.implementation === w.implementation
                ) {
                  (n(d, p.sibling),
                    (p = o(p, w.children || [])),
                    (p.return = d),
                    (d = p));
                  break e;
                } else {
                  n(d, p);
                  break;
                }
              else t(d, p);
              p = p.sibling;
            }
            ((p = Ca(w, d.mode, x)), (p.return = d), (d = p));
          }
          return i(d);
        case kt:
          return ((z = w._init), T(d, p, z(w._payload), x));
      }
      if (Kn(w)) return g(d, p, w, x);
      if (Rn(w)) return S(d, p, w, x);
      Vr(d, w);
    }
    return (typeof w == "string" && w !== "") || typeof w == "number"
      ? ((w = "" + w),
        p !== null && p.tag === 6
          ? (n(d, p.sibling), (p = o(p, w)), (p.return = d), (d = p))
          : (n(d, p), (p = Sa(w, d.mode, x)), (p.return = d), (d = p)),
        i(d))
      : n(d, p);
  }
  return T;
}
var Mn = l2(!0),
  s2 = l2(!1),
  To = Bt(null),
  zo = null,
  hn = null,
  Ki = null;
function Zi() {
  Ki = hn = zo = null;
}
function Xi(e) {
  var t = To.current;
  (ne(To), (e._currentValue = t));
}
function oi(e, t, n) {
  for (; e !== null;) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function kn(e, t) {
  ((zo = e),
    (Ki = hn = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (Ae = !0), (e.firstContext = null)));
}
function Ue(e) {
  var t = e._currentValue;
  if (Ki !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), hn === null)) {
      if (zo === null) throw Error(N(308));
      ((hn = e), (zo.dependencies = { lanes: 0, firstContext: e }));
    } else hn = hn.next = e;
  return t;
}
var Ut = null;
function Ji(e) {
  Ut === null ? (Ut = [e]) : Ut.push(e);
}
function c2(e, t, n, r) {
  var o = t.interleaved;
  return (
    o === null ? ((n.next = n), Ji(t)) : ((n.next = o.next), (o.next = n)),
    (t.interleaved = n),
    yt(e, r)
  );
}
function yt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null;)
    ((e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return));
  return n.tag === 3 ? n.stateNode : null;
}
var St = !1;
function qi(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function u2(e, t) {
  ((e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      }));
}
function ht(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function Lt(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), X & 2)) {
    var o = r.pending;
    return (
      o === null ? (t.next = t) : ((t.next = o.next), (o.next = t)),
      (r.pending = t),
      yt(e, n)
    );
  }
  return (
    (o = r.interleaved),
    o === null ? ((t.next = t), Ji(r)) : ((t.next = o.next), (o.next = t)),
    (r.interleaved = t),
    yt(e, n)
  );
}
function ro(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    ((r &= e.pendingLanes), (n |= r), (t.lanes = n), Oi(e, n));
  }
}
function us(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var o = null,
      a = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var i = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        (a === null ? (o = a = i) : (a = a.next = i), (n = n.next));
      } while (n !== null);
      a === null ? (o = a = t) : (a = a.next = t);
    } else o = a = t;
    ((n = {
      baseState: r.baseState,
      firstBaseUpdate: o,
      lastBaseUpdate: a,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n));
    return;
  }
  ((e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t));
}
function jo(e, t, n, r) {
  var o = e.updateQueue;
  St = !1;
  var a = o.firstBaseUpdate,
    i = o.lastBaseUpdate,
    s = o.shared.pending;
  if (s !== null) {
    o.shared.pending = null;
    var c = s,
      u = c.next;
    ((c.next = null), i === null ? (a = u) : (i.next = u), (i = c));
    var v = e.alternate;
    v !== null &&
      ((v = v.updateQueue),
      (s = v.lastBaseUpdate),
      s !== i &&
        (s === null ? (v.firstBaseUpdate = u) : (s.next = u),
        (v.lastBaseUpdate = c)));
  }
  if (a !== null) {
    var m = o.baseState;
    ((i = 0), (v = u = c = null), (s = a));
    do {
      var f = s.lane,
        h = s.eventTime;
      if ((r & f) === f) {
        v !== null &&
          (v = v.next =
            {
              eventTime: h,
              lane: 0,
              tag: s.tag,
              payload: s.payload,
              callback: s.callback,
              next: null,
            });
        e: {
          var g = e,
            S = s;
          switch (((f = t), (h = n), S.tag)) {
            case 1:
              if (((g = S.payload), typeof g == "function")) {
                m = g.call(h, m, f);
                break e;
              }
              m = g;
              break e;
            case 3:
              g.flags = (g.flags & -65537) | 128;
            case 0:
              if (
                ((g = S.payload),
                (f = typeof g == "function" ? g.call(h, m, f) : g),
                f == null)
              )
                break e;
              m = ie({}, m, f);
              break e;
            case 2:
              St = !0;
          }
        }
        s.callback !== null &&
          s.lane !== 0 &&
          ((e.flags |= 64),
          (f = o.effects),
          f === null ? (o.effects = [s]) : f.push(s));
      } else
        ((h = {
          eventTime: h,
          lane: f,
          tag: s.tag,
          payload: s.payload,
          callback: s.callback,
          next: null,
        }),
          v === null ? ((u = v = h), (c = m)) : (v = v.next = h),
          (i |= f));
      if (((s = s.next), s === null)) {
        if (((s = o.shared.pending), s === null)) break;
        ((f = s),
          (s = f.next),
          (f.next = null),
          (o.lastBaseUpdate = f),
          (o.shared.pending = null));
      }
    } while (!0);
    if (
      (v === null && (c = m),
      (o.baseState = c),
      (o.firstBaseUpdate = u),
      (o.lastBaseUpdate = v),
      (t = o.shared.interleaved),
      t !== null)
    ) {
      o = t;
      do ((i |= o.lane), (o = o.next));
      while (o !== t);
    } else a === null && (o.shared.lanes = 0);
    ((Jt |= i), (e.lanes = i), (e.memoizedState = m));
  }
}
function ds(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        o = r.callback;
      if (o !== null) {
        if (((r.callback = null), (r = n), typeof o != "function"))
          throw Error(N(191, o));
        o.call(r);
      }
    }
}
var Nr = {},
  st = Bt(Nr),
  yr = Bt(Nr),
  wr = Bt(Nr);
function Gt(e) {
  if (e === Nr) throw Error(N(174));
  return e;
}
function el(e, t) {
  switch ((q(wr, t), q(yr, e), q(st, Nr), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Oa(null, "");
      break;
    default:
      ((e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = Oa(t, e)));
  }
  (ne(st), q(st, t));
}
function En() {
  (ne(st), ne(yr), ne(wr));
}
function d2(e) {
  Gt(wr.current);
  var t = Gt(st.current),
    n = Oa(t, e.type);
  t !== n && (q(yr, e), q(st, n));
}
function tl(e) {
  yr.current === e && (ne(st), ne(yr));
}
var oe = Bt(0);
function Mo(e) {
  for (var t = e; t !== null;) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      ((t.child.return = t), (t = t.child));
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null;) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    ((t.sibling.return = t.return), (t = t.sibling));
  }
  return null;
}
var ga = [];
function nl() {
  for (var e = 0; e < ga.length; e++)
    ga[e]._workInProgressVersionPrimary = null;
  ga.length = 0;
}
var oo = xt.ReactCurrentDispatcher,
  ya = xt.ReactCurrentBatchConfig,
  Xt = 0,
  ae = null,
  fe = null,
  he = null,
  Eo = !1,
  rr = !1,
  xr = 0,
  gd = 0;
function be() {
  throw Error(N(321));
}
function rl(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!nt(e[n], t[n])) return !1;
  return !0;
}
function ol(e, t, n, r, o, a) {
  if (
    ((Xt = a),
    (ae = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (oo.current = e === null || e.memoizedState === null ? bd : kd),
    (e = n(r, o)),
    rr)
  ) {
    a = 0;
    do {
      if (((rr = !1), (xr = 0), 25 <= a)) throw Error(N(301));
      ((a += 1),
        (he = fe = null),
        (t.updateQueue = null),
        (oo.current = Sd),
        (e = n(r, o)));
    } while (rr);
  }
  if (
    ((oo.current = No),
    (t = fe !== null && fe.next !== null),
    (Xt = 0),
    (he = fe = ae = null),
    (Eo = !1),
    t)
  )
    throw Error(N(300));
  return e;
}
function al() {
  var e = xr !== 0;
  return ((xr = 0), e);
}
function at() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return (he === null ? (ae.memoizedState = he = e) : (he = he.next = e), he);
}
function Ge() {
  if (fe === null) {
    var e = ae.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = fe.next;
  var t = he === null ? ae.memoizedState : he.next;
  if (t !== null) ((he = t), (fe = e));
  else {
    if (e === null) throw Error(N(310));
    ((fe = e),
      (e = {
        memoizedState: fe.memoizedState,
        baseState: fe.baseState,
        baseQueue: fe.baseQueue,
        queue: fe.queue,
        next: null,
      }),
      he === null ? (ae.memoizedState = he = e) : (he = he.next = e));
  }
  return he;
}
function br(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function wa(e) {
  var t = Ge(),
    n = t.queue;
  if (n === null) throw Error(N(311));
  n.lastRenderedReducer = e;
  var r = fe,
    o = r.baseQueue,
    a = n.pending;
  if (a !== null) {
    if (o !== null) {
      var i = o.next;
      ((o.next = a.next), (a.next = i));
    }
    ((r.baseQueue = o = a), (n.pending = null));
  }
  if (o !== null) {
    ((a = o.next), (r = r.baseState));
    var s = (i = null),
      c = null,
      u = a;
    do {
      var v = u.lane;
      if ((Xt & v) === v)
        (c !== null &&
          (c = c.next =
            {
              lane: 0,
              action: u.action,
              hasEagerState: u.hasEagerState,
              eagerState: u.eagerState,
              next: null,
            }),
          (r = u.hasEagerState ? u.eagerState : e(r, u.action)));
      else {
        var m = {
          lane: v,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null,
        };
        (c === null ? ((s = c = m), (i = r)) : (c = c.next = m),
          (ae.lanes |= v),
          (Jt |= v));
      }
      u = u.next;
    } while (u !== null && u !== a);
    (c === null ? (i = r) : (c.next = s),
      nt(r, t.memoizedState) || (Ae = !0),
      (t.memoizedState = r),
      (t.baseState = i),
      (t.baseQueue = c),
      (n.lastRenderedState = r));
  }
  if (((e = n.interleaved), e !== null)) {
    o = e;
    do ((a = o.lane), (ae.lanes |= a), (Jt |= a), (o = o.next));
    while (o !== e);
  } else o === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function xa(e) {
  var t = Ge(),
    n = t.queue;
  if (n === null) throw Error(N(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    o = n.pending,
    a = t.memoizedState;
  if (o !== null) {
    n.pending = null;
    var i = (o = o.next);
    do ((a = e(a, i.action)), (i = i.next));
    while (i !== o);
    (nt(a, t.memoizedState) || (Ae = !0),
      (t.memoizedState = a),
      t.baseQueue === null && (t.baseState = a),
      (n.lastRenderedState = a));
  }
  return [a, r];
}
function p2() {}
function f2(e, t) {
  var n = ae,
    r = Ge(),
    o = t(),
    a = !nt(r.memoizedState, o);
  if (
    (a && ((r.memoizedState = o), (Ae = !0)),
    (r = r.queue),
    il(v2.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || a || (he !== null && he.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      kr(9, h2.bind(null, n, r, o, t), void 0, null),
      ve === null)
    )
      throw Error(N(349));
    Xt & 30 || m2(n, t, o);
  }
  return o;
}
function m2(e, t, n) {
  ((e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = ae.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (ae.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
}
function h2(e, t, n, r) {
  ((t.value = n), (t.getSnapshot = r), g2(t) && y2(e));
}
function v2(e, t, n) {
  return n(function () {
    g2(t) && y2(e);
  });
}
function g2(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !nt(e, n);
  } catch {
    return !0;
  }
}
function y2(e) {
  var t = yt(e, 1);
  t !== null && tt(t, e, 1, -1);
}
function ps(e) {
  var t = at();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: br,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = xd.bind(null, ae, e)),
    [t.memoizedState, e]
  );
}
function kr(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = ae.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (ae.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function w2() {
  return Ge().memoizedState;
}
function ao(e, t, n, r) {
  var o = at();
  ((ae.flags |= e),
    (o.memoizedState = kr(1 | t, n, void 0, r === void 0 ? null : r)));
}
function Vo(e, t, n, r) {
  var o = Ge();
  r = r === void 0 ? null : r;
  var a = void 0;
  if (fe !== null) {
    var i = fe.memoizedState;
    if (((a = i.destroy), r !== null && rl(r, i.deps))) {
      o.memoizedState = kr(t, n, a, r);
      return;
    }
  }
  ((ae.flags |= e), (o.memoizedState = kr(1 | t, n, a, r)));
}
function fs(e, t) {
  return ao(8390656, 8, e, t);
}
function il(e, t) {
  return Vo(2048, 8, e, t);
}
function x2(e, t) {
  return Vo(4, 2, e, t);
}
function b2(e, t) {
  return Vo(4, 4, e, t);
}
function k2(e, t) {
  if (typeof t == "function")
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function S2(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null),
    Vo(4, 4, k2.bind(null, t, e), n)
  );
}
function ll() {}
function C2(e, t) {
  var n = Ge();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && rl(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function T2(e, t) {
  var n = Ge();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && rl(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function z2(e, t, n) {
  return Xt & 21
    ? (nt(n, t) || ((n = A1()), (ae.lanes |= n), (Jt |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (Ae = !0)), (e.memoizedState = n));
}
function yd(e, t) {
  var n = J;
  ((J = n !== 0 && 4 > n ? n : 4), e(!0));
  var r = ya.transition;
  ya.transition = {};
  try {
    (e(!1), t());
  } finally {
    ((J = n), (ya.transition = r));
  }
}
function j2() {
  return Ge().memoizedState;
}
function wd(e, t, n) {
  var r = Dt(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    M2(e))
  )
    E2(t, n);
  else if (((n = c2(e, t, n, r)), n !== null)) {
    var o = ze();
    (tt(n, e, r, o), N2(n, t, r));
  }
}
function xd(e, t, n) {
  var r = Dt(e),
    o = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (M2(e)) E2(t, o);
  else {
    var a = e.alternate;
    if (
      e.lanes === 0 &&
      (a === null || a.lanes === 0) &&
      ((a = t.lastRenderedReducer), a !== null)
    )
      try {
        var i = t.lastRenderedState,
          s = a(i, n);
        if (((o.hasEagerState = !0), (o.eagerState = s), nt(s, i))) {
          var c = t.interleaved;
          (c === null
            ? ((o.next = o), Ji(t))
            : ((o.next = c.next), (c.next = o)),
            (t.interleaved = o));
          return;
        }
      } catch {
      } finally {
      }
    ((n = c2(e, t, o, r)),
      n !== null && ((o = ze()), tt(n, e, r, o), N2(n, t, r)));
  }
}
function M2(e) {
  var t = e.alternate;
  return e === ae || (t !== null && t === ae);
}
function E2(e, t) {
  rr = Eo = !0;
  var n = e.pending;
  (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t));
}
function N2(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    ((r &= e.pendingLanes), (n |= r), (t.lanes = n), Oi(e, n));
  }
}
var No = {
    readContext: Ue,
    useCallback: be,
    useContext: be,
    useEffect: be,
    useImperativeHandle: be,
    useInsertionEffect: be,
    useLayoutEffect: be,
    useMemo: be,
    useReducer: be,
    useRef: be,
    useState: be,
    useDebugValue: be,
    useDeferredValue: be,
    useTransition: be,
    useMutableSource: be,
    useSyncExternalStore: be,
    useId: be,
    unstable_isNewReconciler: !1,
  },
  bd = {
    readContext: Ue,
    useCallback: function (e, t) {
      return ((at().memoizedState = [e, t === void 0 ? null : t]), e);
    },
    useContext: Ue,
    useEffect: fs,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        ao(4194308, 4, k2.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return ao(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return ao(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = at();
      return (
        (t = t === void 0 ? null : t),
        (e = e()),
        (n.memoizedState = [e, t]),
        e
      );
    },
    useReducer: function (e, t, n) {
      var r = at();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = wd.bind(null, ae, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = at();
      return ((e = { current: e }), (t.memoizedState = e));
    },
    useState: ps,
    useDebugValue: ll,
    useDeferredValue: function (e) {
      return (at().memoizedState = e);
    },
    useTransition: function () {
      var e = ps(!1),
        t = e[0];
      return ((e = yd.bind(null, e[1])), (at().memoizedState = e), [t, e]);
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = ae,
        o = at();
      if (re) {
        if (n === void 0) throw Error(N(407));
        n = n();
      } else {
        if (((n = t()), ve === null)) throw Error(N(349));
        Xt & 30 || m2(r, t, n);
      }
      o.memoizedState = n;
      var a = { value: n, getSnapshot: t };
      return (
        (o.queue = a),
        fs(v2.bind(null, r, a, e), [e]),
        (r.flags |= 2048),
        kr(9, h2.bind(null, r, a, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = at(),
        t = ve.identifierPrefix;
      if (re) {
        var n = mt,
          r = ft;
        ((n = (r & ~(1 << (32 - et(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = xr++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":"));
      } else ((n = gd++), (t = ":" + t + "r" + n.toString(32) + ":"));
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  kd = {
    readContext: Ue,
    useCallback: C2,
    useContext: Ue,
    useEffect: il,
    useImperativeHandle: S2,
    useInsertionEffect: x2,
    useLayoutEffect: b2,
    useMemo: T2,
    useReducer: wa,
    useRef: w2,
    useState: function () {
      return wa(br);
    },
    useDebugValue: ll,
    useDeferredValue: function (e) {
      var t = Ge();
      return z2(t, fe.memoizedState, e);
    },
    useTransition: function () {
      var e = wa(br)[0],
        t = Ge().memoizedState;
      return [e, t];
    },
    useMutableSource: p2,
    useSyncExternalStore: f2,
    useId: j2,
    unstable_isNewReconciler: !1,
  },
  Sd = {
    readContext: Ue,
    useCallback: C2,
    useContext: Ue,
    useEffect: il,
    useImperativeHandle: S2,
    useInsertionEffect: x2,
    useLayoutEffect: b2,
    useMemo: T2,
    useReducer: xa,
    useRef: w2,
    useState: function () {
      return xa(br);
    },
    useDebugValue: ll,
    useDeferredValue: function (e) {
      var t = Ge();
      return fe === null ? (t.memoizedState = e) : z2(t, fe.memoizedState, e);
    },
    useTransition: function () {
      var e = xa(br)[0],
        t = Ge().memoizedState;
      return [e, t];
    },
    useMutableSource: p2,
    useSyncExternalStore: f2,
    useId: j2,
    unstable_isNewReconciler: !1,
  };
function Xe(e, t) {
  if (e && e.defaultProps) {
    ((t = ie({}, t)), (e = e.defaultProps));
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function ai(e, t, n, r) {
  ((t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : ie({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n));
}
var Wo = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? tn(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = ze(),
      o = Dt(e),
      a = ht(r, o);
    ((a.payload = t),
      n != null && (a.callback = n),
      (t = Lt(e, a, o)),
      t !== null && (tt(t, e, o, r), ro(t, e, o)));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = ze(),
      o = Dt(e),
      a = ht(r, o);
    ((a.tag = 1),
      (a.payload = t),
      n != null && (a.callback = n),
      (t = Lt(e, a, o)),
      t !== null && (tt(t, e, o, r), ro(t, e, o)));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = ze(),
      r = Dt(e),
      o = ht(n, r);
    ((o.tag = 2),
      t != null && (o.callback = t),
      (t = Lt(e, o, r)),
      t !== null && (tt(t, e, r, n), ro(t, e, r)));
  },
};
function ms(e, t, n, r, o, a, i) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, a, i)
      : t.prototype && t.prototype.isPureReactComponent
        ? !mr(n, r) || !mr(o, a)
        : !0
  );
}
function A2(e, t, n) {
  var r = !1,
    o = _t,
    a = t.contextType;
  return (
    typeof a == "object" && a !== null
      ? (a = Ue(a))
      : ((o = Ie(t) ? Kt : Ce.current),
        (r = t.contextTypes),
        (a = (r = r != null) ? zn(e, o) : _t)),
    (t = new t(n, a)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = Wo),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = o),
      (e.__reactInternalMemoizedMaskedChildContext = a)),
    t
  );
}
function hs(e, t, n, r) {
  ((e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && Wo.enqueueReplaceState(t, t.state, null));
}
function ii(e, t, n, r) {
  var o = e.stateNode;
  ((o.props = n), (o.state = e.memoizedState), (o.refs = {}), qi(e));
  var a = t.contextType;
  (typeof a == "object" && a !== null
    ? (o.context = Ue(a))
    : ((a = Ie(t) ? Kt : Ce.current), (o.context = zn(e, a))),
    (o.state = e.memoizedState),
    (a = t.getDerivedStateFromProps),
    typeof a == "function" && (ai(e, t, a, n), (o.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof o.getSnapshotBeforeUpdate == "function" ||
      (typeof o.UNSAFE_componentWillMount != "function" &&
        typeof o.componentWillMount != "function") ||
      ((t = o.state),
      typeof o.componentWillMount == "function" && o.componentWillMount(),
      typeof o.UNSAFE_componentWillMount == "function" &&
        o.UNSAFE_componentWillMount(),
      t !== o.state && Wo.enqueueReplaceState(o, o.state, null),
      jo(e, n, o, r),
      (o.state = e.memoizedState)),
    typeof o.componentDidMount == "function" && (e.flags |= 4194308));
}
function Nn(e, t) {
  try {
    var n = "",
      r = t;
    do ((n += Xc(r)), (r = r.return));
    while (r);
    var o = n;
  } catch (a) {
    o =
      `
Error generating stack: ` +
      a.message +
      `
` +
      a.stack;
  }
  return { value: e, source: t, stack: o, digest: null };
}
function ba(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function li(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var Cd = typeof WeakMap == "function" ? WeakMap : Map;
function L2(e, t, n) {
  ((n = ht(-1, n)), (n.tag = 3), (n.payload = { element: null }));
  var r = t.value;
  return (
    (n.callback = function () {
      (Lo || ((Lo = !0), (gi = r)), li(e, t));
    }),
    n
  );
}
function I2(e, t, n) {
  ((n = ht(-1, n)), (n.tag = 3));
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var o = t.value;
    ((n.payload = function () {
      return r(o);
    }),
      (n.callback = function () {
        li(e, t);
      }));
  }
  var a = e.stateNode;
  return (
    a !== null &&
      typeof a.componentDidCatch == "function" &&
      (n.callback = function () {
        (li(e, t),
          typeof r != "function" &&
            (It === null ? (It = new Set([this])) : It.add(this)));
        var i = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: i !== null ? i : "",
        });
      }),
    n
  );
}
function vs(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Cd();
    var o = new Set();
    r.set(t, o);
  } else ((o = r.get(t)), o === void 0 && ((o = new Set()), r.set(t, o)));
  o.has(n) || (o.add(n), (e = Od.bind(null, e, t, n)), t.then(e, e));
}
function gs(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function ys(e, t, n, r, o) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = o), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = ht(-1, 1)), (t.tag = 2), Lt(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var Td = xt.ReactCurrentOwner,
  Ae = !1;
function Te(e, t, n, r) {
  t.child = e === null ? s2(t, null, n, r) : Mn(t, e.child, n, r);
}
function ws(e, t, n, r, o) {
  n = n.render;
  var a = t.ref;
  return (
    kn(t, o),
    (r = ol(e, t, n, r, a, o)),
    (n = al()),
    e !== null && !Ae
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~o),
        wt(e, t, o))
      : (re && n && Gi(t), (t.flags |= 1), Te(e, t, r, o), t.child)
  );
}
function xs(e, t, n, r, o) {
  if (e === null) {
    var a = n.type;
    return typeof a == "function" &&
      !hl(a) &&
      a.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = a), D2(e, t, a, r, o))
      : ((e = co(n.type, null, r, t, t.mode, o)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((a = e.child), !(e.lanes & o))) {
    var i = a.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : mr), n(i, r) && e.ref === t.ref)
    )
      return wt(e, t, o);
  }
  return (
    (t.flags |= 1),
    (e = Pt(a, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function D2(e, t, n, r, o) {
  if (e !== null) {
    var a = e.memoizedProps;
    if (mr(a, r) && e.ref === t.ref)
      if (((Ae = !1), (t.pendingProps = r = a), (e.lanes & o) !== 0))
        e.flags & 131072 && (Ae = !0);
      else return ((t.lanes = e.lanes), wt(e, t, o));
  }
  return si(e, t, n, r, o);
}
function P2(e, t, n) {
  var r = t.pendingProps,
    o = r.children,
    a = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        q(gn, Pe),
        (Pe |= n));
    else {
      if (!(n & 1073741824))
        return (
          (e = a !== null ? a.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          q(gn, Pe),
          (Pe |= e),
          null
        );
      ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = a !== null ? a.baseLanes : n),
        q(gn, Pe),
        (Pe |= r));
    }
  else
    (a !== null ? ((r = a.baseLanes | n), (t.memoizedState = null)) : (r = n),
      q(gn, Pe),
      (Pe |= r));
  return (Te(e, t, o, n), t.child);
}
function R2(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function si(e, t, n, r, o) {
  var a = Ie(n) ? Kt : Ce.current;
  return (
    (a = zn(t, a)),
    kn(t, o),
    (n = ol(e, t, n, r, a, o)),
    (r = al()),
    e !== null && !Ae
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~o),
        wt(e, t, o))
      : (re && r && Gi(t), (t.flags |= 1), Te(e, t, n, o), t.child)
  );
}
function bs(e, t, n, r, o) {
  if (Ie(n)) {
    var a = !0;
    ko(t);
  } else a = !1;
  if ((kn(t, o), t.stateNode === null))
    (io(e, t), A2(t, n, r), ii(t, n, r, o), (r = !0));
  else if (e === null) {
    var i = t.stateNode,
      s = t.memoizedProps;
    i.props = s;
    var c = i.context,
      u = n.contextType;
    typeof u == "object" && u !== null
      ? (u = Ue(u))
      : ((u = Ie(n) ? Kt : Ce.current), (u = zn(t, u)));
    var v = n.getDerivedStateFromProps,
      m =
        typeof v == "function" ||
        typeof i.getSnapshotBeforeUpdate == "function";
    (m ||
      (typeof i.UNSAFE_componentWillReceiveProps != "function" &&
        typeof i.componentWillReceiveProps != "function") ||
      ((s !== r || c !== u) && hs(t, i, r, u)),
      (St = !1));
    var f = t.memoizedState;
    ((i.state = f),
      jo(t, r, i, o),
      (c = t.memoizedState),
      s !== r || f !== c || Le.current || St
        ? (typeof v == "function" && (ai(t, n, v, r), (c = t.memoizedState)),
          (s = St || ms(t, n, s, r, f, c, u))
            ? (m ||
                (typeof i.UNSAFE_componentWillMount != "function" &&
                  typeof i.componentWillMount != "function") ||
                (typeof i.componentWillMount == "function" &&
                  i.componentWillMount(),
                typeof i.UNSAFE_componentWillMount == "function" &&
                  i.UNSAFE_componentWillMount()),
              typeof i.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof i.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = c)),
          (i.props = r),
          (i.state = c),
          (i.context = u),
          (r = s))
        : (typeof i.componentDidMount == "function" && (t.flags |= 4194308),
          (r = !1)));
  } else {
    ((i = t.stateNode),
      u2(e, t),
      (s = t.memoizedProps),
      (u = t.type === t.elementType ? s : Xe(t.type, s)),
      (i.props = u),
      (m = t.pendingProps),
      (f = i.context),
      (c = n.contextType),
      typeof c == "object" && c !== null
        ? (c = Ue(c))
        : ((c = Ie(n) ? Kt : Ce.current), (c = zn(t, c))));
    var h = n.getDerivedStateFromProps;
    ((v =
      typeof h == "function" ||
      typeof i.getSnapshotBeforeUpdate == "function") ||
      (typeof i.UNSAFE_componentWillReceiveProps != "function" &&
        typeof i.componentWillReceiveProps != "function") ||
      ((s !== m || f !== c) && hs(t, i, r, c)),
      (St = !1),
      (f = t.memoizedState),
      (i.state = f),
      jo(t, r, i, o));
    var g = t.memoizedState;
    s !== m || f !== g || Le.current || St
      ? (typeof h == "function" && (ai(t, n, h, r), (g = t.memoizedState)),
        (u = St || ms(t, n, u, r, f, g, c) || !1)
          ? (v ||
              (typeof i.UNSAFE_componentWillUpdate != "function" &&
                typeof i.componentWillUpdate != "function") ||
              (typeof i.componentWillUpdate == "function" &&
                i.componentWillUpdate(r, g, c),
              typeof i.UNSAFE_componentWillUpdate == "function" &&
                i.UNSAFE_componentWillUpdate(r, g, c)),
            typeof i.componentDidUpdate == "function" && (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof i.componentDidUpdate != "function" ||
              (s === e.memoizedProps && f === e.memoizedState) ||
              (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate != "function" ||
              (s === e.memoizedProps && f === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = g)),
        (i.props = r),
        (i.state = g),
        (i.context = c),
        (r = u))
      : (typeof i.componentDidUpdate != "function" ||
          (s === e.memoizedProps && f === e.memoizedState) ||
          (t.flags |= 4),
        typeof i.getSnapshotBeforeUpdate != "function" ||
          (s === e.memoizedProps && f === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return ci(e, t, n, r, a, o);
}
function ci(e, t, n, r, o, a) {
  R2(e, t);
  var i = (t.flags & 128) !== 0;
  if (!r && !i) return (o && is(t, n, !1), wt(e, t, a));
  ((r = t.stateNode), (Td.current = t));
  var s =
    i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && i
      ? ((t.child = Mn(t, e.child, null, a)), (t.child = Mn(t, null, s, a)))
      : Te(e, t, s, a),
    (t.memoizedState = r.state),
    o && is(t, n, !0),
    t.child
  );
}
function _2(e) {
  var t = e.stateNode;
  (t.pendingContext
    ? as(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && as(e, t.context, !1),
    el(e, t.containerInfo));
}
function ks(e, t, n, r, o) {
  return (jn(), Yi(o), (t.flags |= 256), Te(e, t, n, r), t.child);
}
var ui = { dehydrated: null, treeContext: null, retryLane: 0 };
function di(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function O2(e, t, n) {
  var r = t.pendingProps,
    o = oe.current,
    a = !1,
    i = (t.flags & 128) !== 0,
    s;
  if (
    ((s = i) ||
      (s = e !== null && e.memoizedState === null ? !1 : (o & 2) !== 0),
    s
      ? ((a = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (o |= 1),
    q(oe, o & 1),
    e === null)
  )
    return (
      ri(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === "$!"
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((i = r.children),
          (e = r.fallback),
          a
            ? ((r = t.mode),
              (a = t.child),
              (i = { mode: "hidden", children: i }),
              !(r & 1) && a !== null
                ? ((a.childLanes = 0), (a.pendingProps = i))
                : (a = Qo(i, r, 0, null)),
              (e = Yt(e, r, n, null)),
              (a.return = t),
              (e.return = t),
              (a.sibling = e),
              (t.child = a),
              (t.child.memoizedState = di(n)),
              (t.memoizedState = ui),
              e)
            : sl(t, i))
    );
  if (((o = e.memoizedState), o !== null && ((s = o.dehydrated), s !== null)))
    return zd(e, t, i, r, s, o, n);
  if (a) {
    ((a = r.fallback), (i = t.mode), (o = e.child), (s = o.sibling));
    var c = { mode: "hidden", children: r.children };
    return (
      !(i & 1) && t.child !== o
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = c),
          (t.deletions = null))
        : ((r = Pt(o, c)), (r.subtreeFlags = o.subtreeFlags & 14680064)),
      s !== null ? (a = Pt(s, a)) : ((a = Yt(a, i, n, null)), (a.flags |= 2)),
      (a.return = t),
      (r.return = t),
      (r.sibling = a),
      (t.child = r),
      (r = a),
      (a = t.child),
      (i = e.child.memoizedState),
      (i =
        i === null
          ? di(n)
          : {
              baseLanes: i.baseLanes | n,
              cachePool: null,
              transitions: i.transitions,
            }),
      (a.memoizedState = i),
      (a.childLanes = e.childLanes & ~n),
      (t.memoizedState = ui),
      r
    );
  }
  return (
    (a = e.child),
    (e = a.sibling),
    (r = Pt(a, { mode: "visible", children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions),
      n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function sl(e, t) {
  return (
    (t = Qo({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function Wr(e, t, n, r) {
  return (
    r !== null && Yi(r),
    Mn(t, e.child, null, n),
    (e = sl(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function zd(e, t, n, r, o, a, i) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = ba(Error(N(422)))), Wr(e, t, i, r))
      : t.memoizedState !== null
        ? ((t.child = e.child), (t.flags |= 128), null)
        : ((a = r.fallback),
          (o = t.mode),
          (r = Qo({ mode: "visible", children: r.children }, o, 0, null)),
          (a = Yt(a, o, i, null)),
          (a.flags |= 2),
          (r.return = t),
          (a.return = t),
          (r.sibling = a),
          (t.child = r),
          t.mode & 1 && Mn(t, e.child, null, i),
          (t.child.memoizedState = di(i)),
          (t.memoizedState = ui),
          a);
  if (!(t.mode & 1)) return Wr(e, t, i, null);
  if (o.data === "$!") {
    if (((r = o.nextSibling && o.nextSibling.dataset), r)) var s = r.dgst;
    return (
      (r = s),
      (a = Error(N(419))),
      (r = ba(a, r, void 0)),
      Wr(e, t, i, r)
    );
  }
  if (((s = (i & e.childLanes) !== 0), Ae || s)) {
    if (((r = ve), r !== null)) {
      switch (i & -i) {
        case 4:
          o = 2;
          break;
        case 16:
          o = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          o = 32;
          break;
        case 536870912:
          o = 268435456;
          break;
        default:
          o = 0;
      }
      ((o = o & (r.suspendedLanes | i) ? 0 : o),
        o !== 0 &&
          o !== a.retryLane &&
          ((a.retryLane = o), yt(e, o), tt(r, e, o, -1)));
    }
    return (ml(), (r = ba(Error(N(421)))), Wr(e, t, i, r));
  }
  return o.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = Bd.bind(null, e)),
      (o._reactRetry = t),
      null)
    : ((e = a.treeContext),
      (Re = At(o.nextSibling)),
      (_e = t),
      (re = !0),
      (qe = null),
      e !== null &&
        (($e[He++] = ft),
        ($e[He++] = mt),
        ($e[He++] = Zt),
        (ft = e.id),
        (mt = e.overflow),
        (Zt = t)),
      (t = sl(t, r.children)),
      (t.flags |= 4096),
      t);
}
function Ss(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  (r !== null && (r.lanes |= t), oi(e.return, t, n));
}
function ka(e, t, n, r, o) {
  var a = e.memoizedState;
  a === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: o,
      })
    : ((a.isBackwards = t),
      (a.rendering = null),
      (a.renderingStartTime = 0),
      (a.last = r),
      (a.tail = n),
      (a.tailMode = o));
}
function B2(e, t, n) {
  var r = t.pendingProps,
    o = r.revealOrder,
    a = r.tail;
  if ((Te(e, t, r.children, n), (r = oe.current), r & 2))
    ((r = (r & 1) | 2), (t.flags |= 128));
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null;) {
        if (e.tag === 13) e.memoizedState !== null && Ss(e, n, t);
        else if (e.tag === 19) Ss(e, n, t);
        else if (e.child !== null) {
          ((e.child.return = e), (e = e.child));
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null;) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        ((e.sibling.return = e.return), (e = e.sibling));
      }
    r &= 1;
  }
  if ((q(oe, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (o) {
      case "forwards":
        for (n = t.child, o = null; n !== null;)
          ((e = n.alternate),
            e !== null && Mo(e) === null && (o = n),
            (n = n.sibling));
        ((n = o),
          n === null
            ? ((o = t.child), (t.child = null))
            : ((o = n.sibling), (n.sibling = null)),
          ka(t, !1, o, n, a));
        break;
      case "backwards":
        for (n = null, o = t.child, t.child = null; o !== null;) {
          if (((e = o.alternate), e !== null && Mo(e) === null)) {
            t.child = o;
            break;
          }
          ((e = o.sibling), (o.sibling = n), (n = o), (o = e));
        }
        ka(t, !0, n, null, a);
        break;
      case "together":
        ka(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function io(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function wt(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (Jt |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(N(153));
  if (t.child !== null) {
    for (
      e = t.child, n = Pt(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;
    )
      ((e = e.sibling),
        (n = n.sibling = Pt(e, e.pendingProps)),
        (n.return = t));
    n.sibling = null;
  }
  return t.child;
}
function jd(e, t, n) {
  switch (t.tag) {
    case 3:
      (_2(t), jn());
      break;
    case 5:
      d2(t);
      break;
    case 1:
      Ie(t.type) && ko(t);
      break;
    case 4:
      el(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        o = t.memoizedProps.value;
      (q(To, r._currentValue), (r._currentValue = o));
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (q(oe, oe.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
            ? O2(e, t, n)
            : (q(oe, oe.current & 1),
              (e = wt(e, t, n)),
              e !== null ? e.sibling : null);
      q(oe, oe.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return B2(e, t, n);
        t.flags |= 128;
      }
      if (
        ((o = t.memoizedState),
        o !== null &&
          ((o.rendering = null), (o.tail = null), (o.lastEffect = null)),
        q(oe, oe.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return ((t.lanes = 0), P2(e, t, n));
  }
  return wt(e, t, n);
}
var F2, pi, $2, H2;
F2 = function (e, t) {
  for (var n = t.child; n !== null;) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      ((n.child.return = n), (n = n.child));
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null;) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    ((n.sibling.return = n.return), (n = n.sibling));
  }
};
pi = function () {};
$2 = function (e, t, n, r) {
  var o = e.memoizedProps;
  if (o !== r) {
    ((e = t.stateNode), Gt(st.current));
    var a = null;
    switch (n) {
      case "input":
        ((o = Da(e, o)), (r = Da(e, r)), (a = []));
        break;
      case "select":
        ((o = ie({}, o, { value: void 0 })),
          (r = ie({}, r, { value: void 0 })),
          (a = []));
        break;
      case "textarea":
        ((o = _a(e, o)), (r = _a(e, r)), (a = []));
        break;
      default:
        typeof o.onClick != "function" &&
          typeof r.onClick == "function" &&
          (e.onclick = xo);
    }
    Ba(n, r);
    var i;
    n = null;
    for (u in o)
      if (!r.hasOwnProperty(u) && o.hasOwnProperty(u) && o[u] != null)
        if (u === "style") {
          var s = o[u];
          for (i in s) s.hasOwnProperty(i) && (n || (n = {}), (n[i] = ""));
        } else
          u !== "dangerouslySetInnerHTML" &&
            u !== "children" &&
            u !== "suppressContentEditableWarning" &&
            u !== "suppressHydrationWarning" &&
            u !== "autoFocus" &&
            (lr.hasOwnProperty(u)
              ? a || (a = [])
              : (a = a || []).push(u, null));
    for (u in r) {
      var c = r[u];
      if (
        ((s = o != null ? o[u] : void 0),
        r.hasOwnProperty(u) && c !== s && (c != null || s != null))
      )
        if (u === "style")
          if (s) {
            for (i in s)
              !s.hasOwnProperty(i) ||
                (c && c.hasOwnProperty(i)) ||
                (n || (n = {}), (n[i] = ""));
            for (i in c)
              c.hasOwnProperty(i) &&
                s[i] !== c[i] &&
                (n || (n = {}), (n[i] = c[i]));
          } else (n || (a || (a = []), a.push(u, n)), (n = c));
        else
          u === "dangerouslySetInnerHTML"
            ? ((c = c ? c.__html : void 0),
              (s = s ? s.__html : void 0),
              c != null && s !== c && (a = a || []).push(u, c))
            : u === "children"
              ? (typeof c != "string" && typeof c != "number") ||
                (a = a || []).push(u, "" + c)
              : u !== "suppressContentEditableWarning" &&
                u !== "suppressHydrationWarning" &&
                (lr.hasOwnProperty(u)
                  ? (c != null && u === "onScroll" && te("scroll", e),
                    a || s === c || (a = []))
                  : (a = a || []).push(u, c));
    }
    n && (a = a || []).push("style", n);
    var u = a;
    (t.updateQueue = u) && (t.flags |= 4);
  }
};
H2 = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Hn(e, t) {
  if (!re)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null;)
          (t.alternate !== null && (n = t), (t = t.sibling));
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null;)
          (n.alternate !== null && (r = n), (n = n.sibling));
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function ke(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var o = e.child; o !== null;)
      ((n |= o.lanes | o.childLanes),
        (r |= o.subtreeFlags & 14680064),
        (r |= o.flags & 14680064),
        (o.return = e),
        (o = o.sibling));
  else
    for (o = e.child; o !== null;)
      ((n |= o.lanes | o.childLanes),
        (r |= o.subtreeFlags),
        (r |= o.flags),
        (o.return = e),
        (o = o.sibling));
  return ((e.subtreeFlags |= r), (e.childLanes = n), t);
}
function Md(e, t, n) {
  var r = t.pendingProps;
  switch ((Qi(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return (ke(t), null);
    case 1:
      return (Ie(t.type) && bo(), ke(t), null);
    case 3:
      return (
        (r = t.stateNode),
        En(),
        ne(Le),
        ne(Ce),
        nl(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (Hr(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), qe !== null && (xi(qe), (qe = null)))),
        pi(e, t),
        ke(t),
        null
      );
    case 5:
      tl(t);
      var o = Gt(wr.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        ($2(e, t, n, r, o),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152)));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(N(166));
          return (ke(t), null);
        }
        if (((e = Gt(st.current)), Hr(t))) {
          ((r = t.stateNode), (n = t.type));
          var a = t.memoizedProps;
          switch (((r[it] = t), (r[gr] = a), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              (te("cancel", r), te("close", r));
              break;
            case "iframe":
            case "object":
            case "embed":
              te("load", r);
              break;
            case "video":
            case "audio":
              for (o = 0; o < Xn.length; o++) te(Xn[o], r);
              break;
            case "source":
              te("error", r);
              break;
            case "img":
            case "image":
            case "link":
              (te("error", r), te("load", r));
              break;
            case "details":
              te("toggle", r);
              break;
            case "input":
              (Ll(r, a), te("invalid", r));
              break;
            case "select":
              ((r._wrapperState = { wasMultiple: !!a.multiple }),
                te("invalid", r));
              break;
            case "textarea":
              (Dl(r, a), te("invalid", r));
          }
          (Ba(n, a), (o = null));
          for (var i in a)
            if (a.hasOwnProperty(i)) {
              var s = a[i];
              i === "children"
                ? typeof s == "string"
                  ? r.textContent !== s &&
                    (a.suppressHydrationWarning !== !0 &&
                      $r(r.textContent, s, e),
                    (o = ["children", s]))
                  : typeof s == "number" &&
                    r.textContent !== "" + s &&
                    (a.suppressHydrationWarning !== !0 &&
                      $r(r.textContent, s, e),
                    (o = ["children", "" + s]))
                : lr.hasOwnProperty(i) &&
                  s != null &&
                  i === "onScroll" &&
                  te("scroll", r);
            }
          switch (n) {
            case "input":
              (Ir(r), Il(r, a, !0));
              break;
            case "textarea":
              (Ir(r), Pl(r));
              break;
            case "select":
            case "option":
              break;
            default:
              typeof a.onClick == "function" && (r.onclick = xo);
          }
          ((r = o), (t.updateQueue = r), r !== null && (t.flags |= 4));
        } else {
          ((i = o.nodeType === 9 ? o : o.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = v1(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = i.createElement("div")),
                  (e.innerHTML = "<script><\/script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                  ? (e = i.createElement(n, { is: r.is }))
                  : ((e = i.createElement(n)),
                    n === "select" &&
                      ((i = e),
                      r.multiple
                        ? (i.multiple = !0)
                        : r.size && (i.size = r.size)))
              : (e = i.createElementNS(e, n)),
            (e[it] = t),
            (e[gr] = r),
            F2(e, t, !1, !1),
            (t.stateNode = e));
          e: {
            switch (((i = Fa(n, r)), n)) {
              case "dialog":
                (te("cancel", e), te("close", e), (o = r));
                break;
              case "iframe":
              case "object":
              case "embed":
                (te("load", e), (o = r));
                break;
              case "video":
              case "audio":
                for (o = 0; o < Xn.length; o++) te(Xn[o], e);
                o = r;
                break;
              case "source":
                (te("error", e), (o = r));
                break;
              case "img":
              case "image":
              case "link":
                (te("error", e), te("load", e), (o = r));
                break;
              case "details":
                (te("toggle", e), (o = r));
                break;
              case "input":
                (Ll(e, r), (o = Da(e, r)), te("invalid", e));
                break;
              case "option":
                o = r;
                break;
              case "select":
                ((e._wrapperState = { wasMultiple: !!r.multiple }),
                  (o = ie({}, r, { value: void 0 })),
                  te("invalid", e));
                break;
              case "textarea":
                (Dl(e, r), (o = _a(e, r)), te("invalid", e));
                break;
              default:
                o = r;
            }
            (Ba(n, o), (s = o));
            for (a in s)
              if (s.hasOwnProperty(a)) {
                var c = s[a];
                a === "style"
                  ? w1(e, c)
                  : a === "dangerouslySetInnerHTML"
                    ? ((c = c ? c.__html : void 0), c != null && g1(e, c))
                    : a === "children"
                      ? typeof c == "string"
                        ? (n !== "textarea" || c !== "") && sr(e, c)
                        : typeof c == "number" && sr(e, "" + c)
                      : a !== "suppressContentEditableWarning" &&
                        a !== "suppressHydrationWarning" &&
                        a !== "autoFocus" &&
                        (lr.hasOwnProperty(a)
                          ? c != null && a === "onScroll" && te("scroll", e)
                          : c != null && Li(e, a, c, i));
              }
            switch (n) {
              case "input":
                (Ir(e), Il(e, r, !1));
                break;
              case "textarea":
                (Ir(e), Pl(e));
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + Rt(r.value));
                break;
              case "select":
                ((e.multiple = !!r.multiple),
                  (a = r.value),
                  a != null
                    ? yn(e, !!r.multiple, a, !1)
                    : r.defaultValue != null &&
                      yn(e, !!r.multiple, r.defaultValue, !0));
                break;
              default:
                typeof o.onClick == "function" && (e.onclick = xo);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return (ke(t), null);
    case 6:
      if (e && t.stateNode != null) H2(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(N(166));
        if (((n = Gt(wr.current)), Gt(st.current), Hr(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[it] = t),
            (a = r.nodeValue !== n) && ((e = _e), e !== null))
          )
            switch (e.tag) {
              case 3:
                $r(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  $r(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          a && (t.flags |= 4);
        } else
          ((r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[it] = t),
            (t.stateNode = r));
      }
      return (ke(t), null);
    case 13:
      if (
        (ne(oe),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (re && Re !== null && t.mode & 1 && !(t.flags & 128))
          (i2(), jn(), (t.flags |= 98560), (a = !1));
        else if (((a = Hr(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!a) throw Error(N(318));
            if (
              ((a = t.memoizedState),
              (a = a !== null ? a.dehydrated : null),
              !a)
            )
              throw Error(N(317));
            a[it] = t;
          } else
            (jn(),
              !(t.flags & 128) && (t.memoizedState = null),
              (t.flags |= 4));
          (ke(t), (a = !1));
        } else (qe !== null && (xi(qe), (qe = null)), (a = !0));
        if (!a) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || oe.current & 1 ? me === 0 && (me = 3) : ml())),
          t.updateQueue !== null && (t.flags |= 4),
          ke(t),
          null);
    case 4:
      return (
        En(),
        pi(e, t),
        e === null && hr(t.stateNode.containerInfo),
        ke(t),
        null
      );
    case 10:
      return (Xi(t.type._context), ke(t), null);
    case 17:
      return (Ie(t.type) && bo(), ke(t), null);
    case 19:
      if ((ne(oe), (a = t.memoizedState), a === null)) return (ke(t), null);
      if (((r = (t.flags & 128) !== 0), (i = a.rendering), i === null))
        if (r) Hn(a, !1);
        else {
          if (me !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null;) {
              if (((i = Mo(e)), i !== null)) {
                for (
                  t.flags |= 128,
                    Hn(a, !1),
                    r = i.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;
                )
                  ((a = n),
                    (e = r),
                    (a.flags &= 14680066),
                    (i = a.alternate),
                    i === null
                      ? ((a.childLanes = 0),
                        (a.lanes = e),
                        (a.child = null),
                        (a.subtreeFlags = 0),
                        (a.memoizedProps = null),
                        (a.memoizedState = null),
                        (a.updateQueue = null),
                        (a.dependencies = null),
                        (a.stateNode = null))
                      : ((a.childLanes = i.childLanes),
                        (a.lanes = i.lanes),
                        (a.child = i.child),
                        (a.subtreeFlags = 0),
                        (a.deletions = null),
                        (a.memoizedProps = i.memoizedProps),
                        (a.memoizedState = i.memoizedState),
                        (a.updateQueue = i.updateQueue),
                        (a.type = i.type),
                        (e = i.dependencies),
                        (a.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling));
                return (q(oe, (oe.current & 1) | 2), t.child);
              }
              e = e.sibling;
            }
          a.tail !== null &&
            de() > An &&
            ((t.flags |= 128), (r = !0), Hn(a, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = Mo(i)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              Hn(a, !0),
              a.tail === null && a.tailMode === "hidden" && !i.alternate && !re)
            )
              return (ke(t), null);
          } else
            2 * de() - a.renderingStartTime > An &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), Hn(a, !1), (t.lanes = 4194304));
        a.isBackwards
          ? ((i.sibling = t.child), (t.child = i))
          : ((n = a.last),
            n !== null ? (n.sibling = i) : (t.child = i),
            (a.last = i));
      }
      return a.tail !== null
        ? ((t = a.tail),
          (a.rendering = t),
          (a.tail = t.sibling),
          (a.renderingStartTime = de()),
          (t.sibling = null),
          (n = oe.current),
          q(oe, r ? (n & 1) | 2 : n & 1),
          t)
        : (ke(t), null);
    case 22:
    case 23:
      return (
        fl(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? Pe & 1073741824 && (ke(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : ke(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(N(156, t.tag));
}
function Ed(e, t) {
  switch ((Qi(t), t.tag)) {
    case 1:
      return (
        Ie(t.type) && bo(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        En(),
        ne(Le),
        ne(Ce),
        nl(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return (tl(t), null);
    case 13:
      if (
        (ne(oe), (e = t.memoizedState), e !== null && e.dehydrated !== null)
      ) {
        if (t.alternate === null) throw Error(N(340));
        jn();
      }
      return (
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return (ne(oe), null);
    case 4:
      return (En(), null);
    case 10:
      return (Xi(t.type._context), null);
    case 22:
    case 23:
      return (fl(), null);
    case 24:
      return null;
    default:
      return null;
  }
}
var Ur = !1,
  Se = !1,
  Nd = typeof WeakSet == "function" ? WeakSet : Set,
  _ = null;
function vn(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        ue(e, t, r);
      }
    else n.current = null;
}
function fi(e, t, n) {
  try {
    n();
  } catch (r) {
    ue(e, t, r);
  }
}
var Cs = !1;
function Ad(e, t) {
  if (((Za = go), (e = Q1()), Ui(e))) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var o = r.anchorOffset,
            a = r.focusNode;
          r = r.focusOffset;
          try {
            (n.nodeType, a.nodeType);
          } catch {
            n = null;
            break e;
          }
          var i = 0,
            s = -1,
            c = -1,
            u = 0,
            v = 0,
            m = e,
            f = null;
          t: for (;;) {
            for (
              var h;
              m !== n || (o !== 0 && m.nodeType !== 3) || (s = i + o),
                m !== a || (r !== 0 && m.nodeType !== 3) || (c = i + r),
                m.nodeType === 3 && (i += m.nodeValue.length),
                (h = m.firstChild) !== null;
            )
              ((f = m), (m = h));
            for (;;) {
              if (m === e) break t;
              if (
                (f === n && ++u === o && (s = i),
                f === a && ++v === r && (c = i),
                (h = m.nextSibling) !== null)
              )
                break;
              ((m = f), (f = m.parentNode));
            }
            m = h;
          }
          n = s === -1 || c === -1 ? null : { start: s, end: c };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Xa = { focusedElem: e, selectionRange: n }, go = !1, _ = t; _ !== null;)
    if (((t = _), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      ((e.return = t), (_ = e));
    else
      for (; _ !== null;) {
        t = _;
        try {
          var g = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (g !== null) {
                  var S = g.memoizedProps,
                    T = g.memoizedState,
                    d = t.stateNode,
                    p = d.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? S : Xe(t.type, S),
                      T
                    );
                  d.__reactInternalSnapshotBeforeUpdate = p;
                }
                break;
              case 3:
                var w = t.stateNode.containerInfo;
                w.nodeType === 1
                  ? (w.textContent = "")
                  : w.nodeType === 9 &&
                    w.documentElement &&
                    w.removeChild(w.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(N(163));
            }
        } catch (x) {
          ue(t, t.return, x);
        }
        if (((e = t.sibling), e !== null)) {
          ((e.return = t.return), (_ = e));
          break;
        }
        _ = t.return;
      }
  return ((g = Cs), (Cs = !1), g);
}
function or(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var o = (r = r.next);
    do {
      if ((o.tag & e) === e) {
        var a = o.destroy;
        ((o.destroy = void 0), a !== void 0 && fi(t, n, a));
      }
      o = o.next;
    } while (o !== r);
  }
}
function Uo(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function mi(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : (t.current = e);
  }
}
function V2(e) {
  var t = e.alternate;
  (t !== null && ((e.alternate = null), V2(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[it], delete t[gr], delete t[ei], delete t[fd], delete t[md])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null));
}
function W2(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Ts(e) {
  e: for (;;) {
    for (; e.sibling === null;) {
      if (e.return === null || W2(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      ((e.child.return = e), (e = e.child));
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function hi(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    ((e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = xo)));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (hi(e, t, n), e = e.sibling; e !== null;)
      (hi(e, t, n), (e = e.sibling));
}
function vi(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (vi(e, t, n), e = e.sibling; e !== null;)
      (vi(e, t, n), (e = e.sibling));
}
var ye = null,
  Je = !1;
function bt(e, t, n) {
  for (n = n.child; n !== null;) (U2(e, t, n), (n = n.sibling));
}
function U2(e, t, n) {
  if (lt && typeof lt.onCommitFiberUnmount == "function")
    try {
      lt.onCommitFiberUnmount(_o, n);
    } catch {}
  switch (n.tag) {
    case 5:
      Se || vn(n, t);
    case 6:
      var r = ye,
        o = Je;
      ((ye = null),
        bt(e, t, n),
        (ye = r),
        (Je = o),
        ye !== null &&
          (Je
            ? ((e = ye),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : ye.removeChild(n.stateNode)));
      break;
    case 18:
      ye !== null &&
        (Je
          ? ((e = ye),
            (n = n.stateNode),
            e.nodeType === 8
              ? ha(e.parentNode, n)
              : e.nodeType === 1 && ha(e, n),
            pr(e))
          : ha(ye, n.stateNode));
      break;
    case 4:
      ((r = ye),
        (o = Je),
        (ye = n.stateNode.containerInfo),
        (Je = !0),
        bt(e, t, n),
        (ye = r),
        (Je = o));
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !Se &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        o = r = r.next;
        do {
          var a = o,
            i = a.destroy;
          ((a = a.tag),
            i !== void 0 && (a & 2 || a & 4) && fi(n, t, i),
            (o = o.next));
        } while (o !== r);
      }
      bt(e, t, n);
      break;
    case 1:
      if (
        !Se &&
        (vn(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          ((r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount());
        } catch (s) {
          ue(n, t, s);
        }
      bt(e, t, n);
      break;
    case 21:
      bt(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((Se = (r = Se) || n.memoizedState !== null), bt(e, t, n), (Se = r))
        : bt(e, t, n);
      break;
    default:
      bt(e, t, n);
  }
}
function zs(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    (n === null && (n = e.stateNode = new Nd()),
      t.forEach(function (r) {
        var o = Fd.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(o, o));
      }));
  }
}
function Ke(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var o = n[r];
      try {
        var a = e,
          i = t,
          s = i;
        e: for (; s !== null;) {
          switch (s.tag) {
            case 5:
              ((ye = s.stateNode), (Je = !1));
              break e;
            case 3:
              ((ye = s.stateNode.containerInfo), (Je = !0));
              break e;
            case 4:
              ((ye = s.stateNode.containerInfo), (Je = !0));
              break e;
          }
          s = s.return;
        }
        if (ye === null) throw Error(N(160));
        (U2(a, i, o), (ye = null), (Je = !1));
        var c = o.alternate;
        (c !== null && (c.return = null), (o.return = null));
      } catch (u) {
        ue(o, t, u);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null;) (G2(t, e), (t = t.sibling));
}
function G2(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((Ke(t, e), ot(e), r & 4)) {
        try {
          (or(3, e, e.return), Uo(3, e));
        } catch (S) {
          ue(e, e.return, S);
        }
        try {
          or(5, e, e.return);
        } catch (S) {
          ue(e, e.return, S);
        }
      }
      break;
    case 1:
      (Ke(t, e), ot(e), r & 512 && n !== null && vn(n, n.return));
      break;
    case 5:
      if (
        (Ke(t, e),
        ot(e),
        r & 512 && n !== null && vn(n, n.return),
        e.flags & 32)
      ) {
        var o = e.stateNode;
        try {
          sr(o, "");
        } catch (S) {
          ue(e, e.return, S);
        }
      }
      if (r & 4 && ((o = e.stateNode), o != null)) {
        var a = e.memoizedProps,
          i = n !== null ? n.memoizedProps : a,
          s = e.type,
          c = e.updateQueue;
        if (((e.updateQueue = null), c !== null))
          try {
            (s === "input" && a.type === "radio" && a.name != null && m1(o, a),
              Fa(s, i));
            var u = Fa(s, a);
            for (i = 0; i < c.length; i += 2) {
              var v = c[i],
                m = c[i + 1];
              v === "style"
                ? w1(o, m)
                : v === "dangerouslySetInnerHTML"
                  ? g1(o, m)
                  : v === "children"
                    ? sr(o, m)
                    : Li(o, v, m, u);
            }
            switch (s) {
              case "input":
                Pa(o, a);
                break;
              case "textarea":
                h1(o, a);
                break;
              case "select":
                var f = o._wrapperState.wasMultiple;
                o._wrapperState.wasMultiple = !!a.multiple;
                var h = a.value;
                h != null
                  ? yn(o, !!a.multiple, h, !1)
                  : f !== !!a.multiple &&
                    (a.defaultValue != null
                      ? yn(o, !!a.multiple, a.defaultValue, !0)
                      : yn(o, !!a.multiple, a.multiple ? [] : "", !1));
            }
            o[gr] = a;
          } catch (S) {
            ue(e, e.return, S);
          }
      }
      break;
    case 6:
      if ((Ke(t, e), ot(e), r & 4)) {
        if (e.stateNode === null) throw Error(N(162));
        ((o = e.stateNode), (a = e.memoizedProps));
        try {
          o.nodeValue = a;
        } catch (S) {
          ue(e, e.return, S);
        }
      }
      break;
    case 3:
      if (
        (Ke(t, e), ot(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          pr(t.containerInfo);
        } catch (S) {
          ue(e, e.return, S);
        }
      break;
    case 4:
      (Ke(t, e), ot(e));
      break;
    case 13:
      (Ke(t, e),
        ot(e),
        (o = e.child),
        o.flags & 8192 &&
          ((a = o.memoizedState !== null),
          (o.stateNode.isHidden = a),
          !a ||
            (o.alternate !== null && o.alternate.memoizedState !== null) ||
            (dl = de())),
        r & 4 && zs(e));
      break;
    case 22:
      if (
        ((v = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((Se = (u = Se) || v), Ke(t, e), (Se = u)) : Ke(t, e),
        ot(e),
        r & 8192)
      ) {
        if (
          ((u = e.memoizedState !== null),
          (e.stateNode.isHidden = u) && !v && e.mode & 1)
        )
          for (_ = e, v = e.child; v !== null;) {
            for (m = _ = v; _ !== null;) {
              switch (((f = _), (h = f.child), f.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  or(4, f, f.return);
                  break;
                case 1:
                  vn(f, f.return);
                  var g = f.stateNode;
                  if (typeof g.componentWillUnmount == "function") {
                    ((r = f), (n = f.return));
                    try {
                      ((t = r),
                        (g.props = t.memoizedProps),
                        (g.state = t.memoizedState),
                        g.componentWillUnmount());
                    } catch (S) {
                      ue(r, n, S);
                    }
                  }
                  break;
                case 5:
                  vn(f, f.return);
                  break;
                case 22:
                  if (f.memoizedState !== null) {
                    Ms(m);
                    continue;
                  }
              }
              h !== null ? ((h.return = f), (_ = h)) : Ms(m);
            }
            v = v.sibling;
          }
        e: for (v = null, m = e; ;) {
          if (m.tag === 5) {
            if (v === null) {
              v = m;
              try {
                ((o = m.stateNode),
                  u
                    ? ((a = o.style),
                      typeof a.setProperty == "function"
                        ? a.setProperty("display", "none", "important")
                        : (a.display = "none"))
                    : ((s = m.stateNode),
                      (c = m.memoizedProps.style),
                      (i =
                        c != null && c.hasOwnProperty("display")
                          ? c.display
                          : null),
                      (s.style.display = y1("display", i))));
              } catch (S) {
                ue(e, e.return, S);
              }
            }
          } else if (m.tag === 6) {
            if (v === null)
              try {
                m.stateNode.nodeValue = u ? "" : m.memoizedProps;
              } catch (S) {
                ue(e, e.return, S);
              }
          } else if (
            ((m.tag !== 22 && m.tag !== 23) ||
              m.memoizedState === null ||
              m === e) &&
            m.child !== null
          ) {
            ((m.child.return = m), (m = m.child));
            continue;
          }
          if (m === e) break e;
          for (; m.sibling === null;) {
            if (m.return === null || m.return === e) break e;
            (v === m && (v = null), (m = m.return));
          }
          (v === m && (v = null),
            (m.sibling.return = m.return),
            (m = m.sibling));
        }
      }
      break;
    case 19:
      (Ke(t, e), ot(e), r & 4 && zs(e));
      break;
    case 21:
      break;
    default:
      (Ke(t, e), ot(e));
  }
}
function ot(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null;) {
          if (W2(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(N(160));
      }
      switch (r.tag) {
        case 5:
          var o = r.stateNode;
          r.flags & 32 && (sr(o, ""), (r.flags &= -33));
          var a = Ts(e);
          vi(e, a, o);
          break;
        case 3:
        case 4:
          var i = r.stateNode.containerInfo,
            s = Ts(e);
          hi(e, s, i);
          break;
        default:
          throw Error(N(161));
      }
    } catch (c) {
      ue(e, e.return, c);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Ld(e, t, n) {
  ((_ = e), Q2(e));
}
function Q2(e, t, n) {
  for (var r = (e.mode & 1) !== 0; _ !== null;) {
    var o = _,
      a = o.child;
    if (o.tag === 22 && r) {
      var i = o.memoizedState !== null || Ur;
      if (!i) {
        var s = o.alternate,
          c = (s !== null && s.memoizedState !== null) || Se;
        s = Ur;
        var u = Se;
        if (((Ur = i), (Se = c) && !u))
          for (_ = o; _ !== null;)
            ((i = _),
              (c = i.child),
              i.tag === 22 && i.memoizedState !== null
                ? Es(o)
                : c !== null
                  ? ((c.return = i), (_ = c))
                  : Es(o));
        for (; a !== null;) ((_ = a), Q2(a), (a = a.sibling));
        ((_ = o), (Ur = s), (Se = u));
      }
      js(e);
    } else
      o.subtreeFlags & 8772 && a !== null ? ((a.return = o), (_ = a)) : js(e);
  }
}
function js(e) {
  for (; _ !== null;) {
    var t = _;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              Se || Uo(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !Se)
                if (n === null) r.componentDidMount();
                else {
                  var o =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : Xe(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    o,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate
                  );
                }
              var a = t.updateQueue;
              a !== null && ds(t, a, r);
              break;
            case 3:
              var i = t.updateQueue;
              if (i !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                ds(t, i, n);
              }
              break;
            case 5:
              var s = t.stateNode;
              if (n === null && t.flags & 4) {
                n = s;
                var c = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    c.autoFocus && n.focus();
                    break;
                  case "img":
                    c.src && (n.src = c.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var u = t.alternate;
                if (u !== null) {
                  var v = u.memoizedState;
                  if (v !== null) {
                    var m = v.dehydrated;
                    m !== null && pr(m);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(N(163));
          }
        Se || (t.flags & 512 && mi(t));
      } catch (f) {
        ue(t, t.return, f);
      }
    }
    if (t === e) {
      _ = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      ((n.return = t.return), (_ = n));
      break;
    }
    _ = t.return;
  }
}
function Ms(e) {
  for (; _ !== null;) {
    var t = _;
    if (t === e) {
      _ = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      ((n.return = t.return), (_ = n));
      break;
    }
    _ = t.return;
  }
}
function Es(e) {
  for (; _ !== null;) {
    var t = _;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Uo(4, t);
          } catch (c) {
            ue(t, n, c);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var o = t.return;
            try {
              r.componentDidMount();
            } catch (c) {
              ue(t, o, c);
            }
          }
          var a = t.return;
          try {
            mi(t);
          } catch (c) {
            ue(t, a, c);
          }
          break;
        case 5:
          var i = t.return;
          try {
            mi(t);
          } catch (c) {
            ue(t, i, c);
          }
      }
    } catch (c) {
      ue(t, t.return, c);
    }
    if (t === e) {
      _ = null;
      break;
    }
    var s = t.sibling;
    if (s !== null) {
      ((s.return = t.return), (_ = s));
      break;
    }
    _ = t.return;
  }
}
var Id = Math.ceil,
  Ao = xt.ReactCurrentDispatcher,
  cl = xt.ReactCurrentOwner,
  We = xt.ReactCurrentBatchConfig,
  X = 0,
  ve = null,
  pe = null,
  we = 0,
  Pe = 0,
  gn = Bt(0),
  me = 0,
  Sr = null,
  Jt = 0,
  Go = 0,
  ul = 0,
  ar = null,
  Ne = null,
  dl = 0,
  An = 1 / 0,
  ut = null,
  Lo = !1,
  gi = null,
  It = null,
  Gr = !1,
  jt = null,
  Io = 0,
  ir = 0,
  yi = null,
  lo = -1,
  so = 0;
function ze() {
  return X & 6 ? de() : lo !== -1 ? lo : (lo = de());
}
function Dt(e) {
  return e.mode & 1
    ? X & 2 && we !== 0
      ? we & -we
      : vd.transition !== null
        ? (so === 0 && (so = A1()), so)
        : ((e = J),
          e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : O1(e.type))),
          e)
    : 1;
}
function tt(e, t, n, r) {
  if (50 < ir) throw ((ir = 0), (yi = null), Error(N(185)));
  (jr(e, n, r),
    (!(X & 2) || e !== ve) &&
      (e === ve && (!(X & 2) && (Go |= n), me === 4 && Tt(e, we)),
      De(e, r),
      n === 1 && X === 0 && !(t.mode & 1) && ((An = de() + 500), Ho && Ft())));
}
function De(e, t) {
  var n = e.callbackNode;
  vu(e, t);
  var r = vo(e, e === ve ? we : 0);
  if (r === 0)
    (n !== null && Ol(n), (e.callbackNode = null), (e.callbackPriority = 0));
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && Ol(n), t === 1))
      (e.tag === 0 ? hd(Ns.bind(null, e)) : r2(Ns.bind(null, e)),
        dd(function () {
          !(X & 6) && Ft();
        }),
        (n = null));
    else {
      switch (L1(r)) {
        case 1:
          n = _i;
          break;
        case 4:
          n = E1;
          break;
        case 16:
          n = ho;
          break;
        case 536870912:
          n = N1;
          break;
        default:
          n = ho;
      }
      n = tc(n, Y2.bind(null, e));
    }
    ((e.callbackPriority = t), (e.callbackNode = n));
  }
}
function Y2(e, t) {
  if (((lo = -1), (so = 0), X & 6)) throw Error(N(327));
  var n = e.callbackNode;
  if (Sn() && e.callbackNode !== n) return null;
  var r = vo(e, e === ve ? we : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = Do(e, r);
  else {
    t = r;
    var o = X;
    X |= 2;
    var a = Z2();
    (ve !== e || we !== t) && ((ut = null), (An = de() + 500), Qt(e, t));
    do
      try {
        Rd();
        break;
      } catch (s) {
        K2(e, s);
      }
    while (!0);
    (Zi(),
      (Ao.current = a),
      (X = o),
      pe !== null ? (t = 0) : ((ve = null), (we = 0), (t = me)));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((o = Ua(e)), o !== 0 && ((r = o), (t = wi(e, o)))), t === 1)
    )
      throw ((n = Sr), Qt(e, 0), Tt(e, r), De(e, de()), n);
    if (t === 6) Tt(e, r);
    else {
      if (
        ((o = e.current.alternate),
        !(r & 30) &&
          !Dd(o) &&
          ((t = Do(e, r)),
          t === 2 && ((a = Ua(e)), a !== 0 && ((r = a), (t = wi(e, a)))),
          t === 1))
      )
        throw ((n = Sr), Qt(e, 0), Tt(e, r), De(e, de()), n);
      switch (((e.finishedWork = o), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(N(345));
        case 2:
          Vt(e, Ne, ut);
          break;
        case 3:
          if (
            (Tt(e, r), (r & 130023424) === r && ((t = dl + 500 - de()), 10 < t))
          ) {
            if (vo(e, 0) !== 0) break;
            if (((o = e.suspendedLanes), (o & r) !== r)) {
              (ze(), (e.pingedLanes |= e.suspendedLanes & o));
              break;
            }
            e.timeoutHandle = qa(Vt.bind(null, e, Ne, ut), t);
            break;
          }
          Vt(e, Ne, ut);
          break;
        case 4:
          if ((Tt(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, o = -1; 0 < r;) {
            var i = 31 - et(r);
            ((a = 1 << i), (i = t[i]), i > o && (o = i), (r &= ~a));
          }
          if (
            ((r = o),
            (r = de() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                  ? 480
                  : 1080 > r
                    ? 1080
                    : 1920 > r
                      ? 1920
                      : 3e3 > r
                        ? 3e3
                        : 4320 > r
                          ? 4320
                          : 1960 * Id(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = qa(Vt.bind(null, e, Ne, ut), r);
            break;
          }
          Vt(e, Ne, ut);
          break;
        case 5:
          Vt(e, Ne, ut);
          break;
        default:
          throw Error(N(329));
      }
    }
  }
  return (De(e, de()), e.callbackNode === n ? Y2.bind(null, e) : null);
}
function wi(e, t) {
  var n = ar;
  return (
    e.current.memoizedState.isDehydrated && (Qt(e, t).flags |= 256),
    (e = Do(e, t)),
    e !== 2 && ((t = Ne), (Ne = n), t !== null && xi(t)),
    e
  );
}
function xi(e) {
  Ne === null ? (Ne = e) : Ne.push.apply(Ne, e);
}
function Dd(e) {
  for (var t = e; ;) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var o = n[r],
            a = o.getSnapshot;
          o = o.value;
          try {
            if (!nt(a(), o)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      ((n.return = t), (t = n));
    else {
      if (t === e) break;
      for (; t.sibling === null;) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
  }
  return !0;
}
function Tt(e, t) {
  for (
    t &= ~ul,
      t &= ~Go,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;
  ) {
    var n = 31 - et(t),
      r = 1 << n;
    ((e[n] = -1), (t &= ~r));
  }
}
function Ns(e) {
  if (X & 6) throw Error(N(327));
  Sn();
  var t = vo(e, 0);
  if (!(t & 1)) return (De(e, de()), null);
  var n = Do(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Ua(e);
    r !== 0 && ((t = r), (n = wi(e, r)));
  }
  if (n === 1) throw ((n = Sr), Qt(e, 0), Tt(e, t), De(e, de()), n);
  if (n === 6) throw Error(N(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    Vt(e, Ne, ut),
    De(e, de()),
    null
  );
}
function pl(e, t) {
  var n = X;
  X |= 1;
  try {
    return e(t);
  } finally {
    ((X = n), X === 0 && ((An = de() + 500), Ho && Ft()));
  }
}
function qt(e) {
  jt !== null && jt.tag === 0 && !(X & 6) && Sn();
  var t = X;
  X |= 1;
  var n = We.transition,
    r = J;
  try {
    if (((We.transition = null), (J = 1), e)) return e();
  } finally {
    ((J = r), (We.transition = n), (X = t), !(X & 6) && Ft());
  }
}
function fl() {
  ((Pe = gn.current), ne(gn));
}
function Qt(e, t) {
  ((e.finishedWork = null), (e.finishedLanes = 0));
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), ud(n)), pe !== null))
    for (n = pe.return; n !== null;) {
      var r = n;
      switch ((Qi(r), r.tag)) {
        case 1:
          ((r = r.type.childContextTypes), r != null && bo());
          break;
        case 3:
          (En(), ne(Le), ne(Ce), nl());
          break;
        case 5:
          tl(r);
          break;
        case 4:
          En();
          break;
        case 13:
          ne(oe);
          break;
        case 19:
          ne(oe);
          break;
        case 10:
          Xi(r.type._context);
          break;
        case 22:
        case 23:
          fl();
      }
      n = n.return;
    }
  if (
    ((ve = e),
    (pe = e = Pt(e.current, null)),
    (we = Pe = t),
    (me = 0),
    (Sr = null),
    (ul = Go = Jt = 0),
    (Ne = ar = null),
    Ut !== null)
  ) {
    for (t = 0; t < Ut.length; t++)
      if (((n = Ut[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var o = r.next,
          a = n.pending;
        if (a !== null) {
          var i = a.next;
          ((a.next = o), (r.next = i));
        }
        n.pending = r;
      }
    Ut = null;
  }
  return e;
}
function K2(e, t) {
  do {
    var n = pe;
    try {
      if ((Zi(), (oo.current = No), Eo)) {
        for (var r = ae.memoizedState; r !== null;) {
          var o = r.queue;
          (o !== null && (o.pending = null), (r = r.next));
        }
        Eo = !1;
      }
      if (
        ((Xt = 0),
        (he = fe = ae = null),
        (rr = !1),
        (xr = 0),
        (cl.current = null),
        n === null || n.return === null)
      ) {
        ((me = 1), (Sr = t), (pe = null));
        break;
      }
      e: {
        var a = e,
          i = n.return,
          s = n,
          c = t;
        if (
          ((t = we),
          (s.flags |= 32768),
          c !== null && typeof c == "object" && typeof c.then == "function")
        ) {
          var u = c,
            v = s,
            m = v.tag;
          if (!(v.mode & 1) && (m === 0 || m === 11 || m === 15)) {
            var f = v.alternate;
            f
              ? ((v.updateQueue = f.updateQueue),
                (v.memoizedState = f.memoizedState),
                (v.lanes = f.lanes))
              : ((v.updateQueue = null), (v.memoizedState = null));
          }
          var h = gs(i);
          if (h !== null) {
            ((h.flags &= -257),
              ys(h, i, s, a, t),
              h.mode & 1 && vs(a, u, t),
              (t = h),
              (c = u));
            var g = t.updateQueue;
            if (g === null) {
              var S = new Set();
              (S.add(c), (t.updateQueue = S));
            } else g.add(c);
            break e;
          } else {
            if (!(t & 1)) {
              (vs(a, u, t), ml());
              break e;
            }
            c = Error(N(426));
          }
        } else if (re && s.mode & 1) {
          var T = gs(i);
          if (T !== null) {
            (!(T.flags & 65536) && (T.flags |= 256),
              ys(T, i, s, a, t),
              Yi(Nn(c, s)));
            break e;
          }
        }
        ((a = c = Nn(c, s)),
          me !== 4 && (me = 2),
          ar === null ? (ar = [a]) : ar.push(a),
          (a = i));
        do {
          switch (a.tag) {
            case 3:
              ((a.flags |= 65536), (t &= -t), (a.lanes |= t));
              var d = L2(a, c, t);
              us(a, d);
              break e;
            case 1:
              s = c;
              var p = a.type,
                w = a.stateNode;
              if (
                !(a.flags & 128) &&
                (typeof p.getDerivedStateFromError == "function" ||
                  (w !== null &&
                    typeof w.componentDidCatch == "function" &&
                    (It === null || !It.has(w))))
              ) {
                ((a.flags |= 65536), (t &= -t), (a.lanes |= t));
                var x = I2(a, s, t);
                us(a, x);
                break e;
              }
          }
          a = a.return;
        } while (a !== null);
      }
      J2(n);
    } catch (C) {
      ((t = C), pe === n && n !== null && (pe = n = n.return));
      continue;
    }
    break;
  } while (!0);
}
function Z2() {
  var e = Ao.current;
  return ((Ao.current = No), e === null ? No : e);
}
function ml() {
  ((me === 0 || me === 3 || me === 2) && (me = 4),
    ve === null || (!(Jt & 268435455) && !(Go & 268435455)) || Tt(ve, we));
}
function Do(e, t) {
  var n = X;
  X |= 2;
  var r = Z2();
  (ve !== e || we !== t) && ((ut = null), Qt(e, t));
  do
    try {
      Pd();
      break;
    } catch (o) {
      K2(e, o);
    }
  while (!0);
  if ((Zi(), (X = n), (Ao.current = r), pe !== null)) throw Error(N(261));
  return ((ve = null), (we = 0), me);
}
function Pd() {
  for (; pe !== null;) X2(pe);
}
function Rd() {
  for (; pe !== null && !lu();) X2(pe);
}
function X2(e) {
  var t = ec(e.alternate, e, Pe);
  ((e.memoizedProps = e.pendingProps),
    t === null ? J2(e) : (pe = t),
    (cl.current = null));
}
function J2(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = Ed(n, t)), n !== null)) {
        ((n.flags &= 32767), (pe = n));
        return;
      }
      if (e !== null)
        ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null));
      else {
        ((me = 6), (pe = null));
        return;
      }
    } else if (((n = Md(n, t, Pe)), n !== null)) {
      pe = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      pe = t;
      return;
    }
    pe = t = e;
  } while (t !== null);
  me === 0 && (me = 5);
}
function Vt(e, t, n) {
  var r = J,
    o = We.transition;
  try {
    ((We.transition = null), (J = 1), _d(e, t, n, r));
  } finally {
    ((We.transition = o), (J = r));
  }
  return null;
}
function _d(e, t, n, r) {
  do Sn();
  while (jt !== null);
  if (X & 6) throw Error(N(327));
  n = e.finishedWork;
  var o = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(N(177));
  ((e.callbackNode = null), (e.callbackPriority = 0));
  var a = n.lanes | n.childLanes;
  if (
    (gu(e, a),
    e === ve && ((pe = ve = null), (we = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      Gr ||
      ((Gr = !0),
      tc(ho, function () {
        return (Sn(), null);
      })),
    (a = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || a)
  ) {
    ((a = We.transition), (We.transition = null));
    var i = J;
    J = 1;
    var s = X;
    ((X |= 4),
      (cl.current = null),
      Ad(e, n),
      G2(n, e),
      rd(Xa),
      (go = !!Za),
      (Xa = Za = null),
      (e.current = n),
      Ld(n),
      su(),
      (X = s),
      (J = i),
      (We.transition = a));
  } else e.current = n;
  if (
    (Gr && ((Gr = !1), (jt = e), (Io = o)),
    (a = e.pendingLanes),
    a === 0 && (It = null),
    du(n.stateNode),
    De(e, de()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      ((o = t[n]), r(o.value, { componentStack: o.stack, digest: o.digest }));
  if (Lo) throw ((Lo = !1), (e = gi), (gi = null), e);
  return (
    Io & 1 && e.tag !== 0 && Sn(),
    (a = e.pendingLanes),
    a & 1 ? (e === yi ? ir++ : ((ir = 0), (yi = e))) : (ir = 0),
    Ft(),
    null
  );
}
function Sn() {
  if (jt !== null) {
    var e = L1(Io),
      t = We.transition,
      n = J;
    try {
      if (((We.transition = null), (J = 16 > e ? 16 : e), jt === null))
        var r = !1;
      else {
        if (((e = jt), (jt = null), (Io = 0), X & 6)) throw Error(N(331));
        var o = X;
        for (X |= 4, _ = e.current; _ !== null;) {
          var a = _,
            i = a.child;
          if (_.flags & 16) {
            var s = a.deletions;
            if (s !== null) {
              for (var c = 0; c < s.length; c++) {
                var u = s[c];
                for (_ = u; _ !== null;) {
                  var v = _;
                  switch (v.tag) {
                    case 0:
                    case 11:
                    case 15:
                      or(8, v, a);
                  }
                  var m = v.child;
                  if (m !== null) ((m.return = v), (_ = m));
                  else
                    for (; _ !== null;) {
                      v = _;
                      var f = v.sibling,
                        h = v.return;
                      if ((V2(v), v === u)) {
                        _ = null;
                        break;
                      }
                      if (f !== null) {
                        ((f.return = h), (_ = f));
                        break;
                      }
                      _ = h;
                    }
                }
              }
              var g = a.alternate;
              if (g !== null) {
                var S = g.child;
                if (S !== null) {
                  g.child = null;
                  do {
                    var T = S.sibling;
                    ((S.sibling = null), (S = T));
                  } while (S !== null);
                }
              }
              _ = a;
            }
          }
          if (a.subtreeFlags & 2064 && i !== null) ((i.return = a), (_ = i));
          else
            e: for (; _ !== null;) {
              if (((a = _), a.flags & 2048))
                switch (a.tag) {
                  case 0:
                  case 11:
                  case 15:
                    or(9, a, a.return);
                }
              var d = a.sibling;
              if (d !== null) {
                ((d.return = a.return), (_ = d));
                break e;
              }
              _ = a.return;
            }
        }
        var p = e.current;
        for (_ = p; _ !== null;) {
          i = _;
          var w = i.child;
          if (i.subtreeFlags & 2064 && w !== null) ((w.return = i), (_ = w));
          else
            e: for (i = p; _ !== null;) {
              if (((s = _), s.flags & 2048))
                try {
                  switch (s.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Uo(9, s);
                  }
                } catch (C) {
                  ue(s, s.return, C);
                }
              if (s === i) {
                _ = null;
                break e;
              }
              var x = s.sibling;
              if (x !== null) {
                ((x.return = s.return), (_ = x));
                break e;
              }
              _ = s.return;
            }
        }
        if (
          ((X = o), Ft(), lt && typeof lt.onPostCommitFiberRoot == "function")
        )
          try {
            lt.onPostCommitFiberRoot(_o, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      ((J = n), (We.transition = t));
    }
  }
  return !1;
}
function As(e, t, n) {
  ((t = Nn(n, t)),
    (t = L2(e, t, 1)),
    (e = Lt(e, t, 1)),
    (t = ze()),
    e !== null && (jr(e, 1, t), De(e, t)));
}
function ue(e, t, n) {
  if (e.tag === 3) As(e, e, n);
  else
    for (; t !== null;) {
      if (t.tag === 3) {
        As(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (It === null || !It.has(r)))
        ) {
          ((e = Nn(n, e)),
            (e = I2(t, e, 1)),
            (t = Lt(t, e, 1)),
            (e = ze()),
            t !== null && (jr(t, 1, e), De(t, e)));
          break;
        }
      }
      t = t.return;
    }
}
function Od(e, t, n) {
  var r = e.pingCache;
  (r !== null && r.delete(t),
    (t = ze()),
    (e.pingedLanes |= e.suspendedLanes & n),
    ve === e &&
      (we & n) === n &&
      (me === 4 || (me === 3 && (we & 130023424) === we && 500 > de() - dl)
        ? Qt(e, 0)
        : (ul |= n)),
    De(e, t));
}
function q2(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = Rr), (Rr <<= 1), !(Rr & 130023424) && (Rr = 4194304))
      : (t = 1));
  var n = ze();
  ((e = yt(e, t)), e !== null && (jr(e, t, n), De(e, n)));
}
function Bd(e) {
  var t = e.memoizedState,
    n = 0;
  (t !== null && (n = t.retryLane), q2(e, n));
}
function Fd(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        o = e.memoizedState;
      o !== null && (n = o.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(N(314));
  }
  (r !== null && r.delete(t), q2(e, n));
}
var ec;
ec = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || Le.current) Ae = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return ((Ae = !1), jd(e, t, n));
      Ae = !!(e.flags & 131072);
    }
  else ((Ae = !1), re && t.flags & 1048576 && o2(t, Co, t.index));
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      (io(e, t), (e = t.pendingProps));
      var o = zn(t, Ce.current);
      (kn(t, n), (o = ol(null, t, r, e, o, n)));
      var a = al();
      return (
        (t.flags |= 1),
        typeof o == "object" &&
        o !== null &&
        typeof o.render == "function" &&
        o.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            Ie(r) ? ((a = !0), ko(t)) : (a = !1),
            (t.memoizedState =
              o.state !== null && o.state !== void 0 ? o.state : null),
            qi(t),
            (o.updater = Wo),
            (t.stateNode = o),
            (o._reactInternals = t),
            ii(t, r, e, n),
            (t = ci(null, t, r, !0, a, n)))
          : ((t.tag = 0), re && a && Gi(t), Te(null, t, o, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (io(e, t),
          (e = t.pendingProps),
          (o = r._init),
          (r = o(r._payload)),
          (t.type = r),
          (o = t.tag = Hd(r)),
          (e = Xe(r, e)),
          o)
        ) {
          case 0:
            t = si(null, t, r, e, n);
            break e;
          case 1:
            t = bs(null, t, r, e, n);
            break e;
          case 11:
            t = ws(null, t, r, e, n);
            break e;
          case 14:
            t = xs(null, t, r, Xe(r.type, e), n);
            break e;
        }
        throw Error(N(306, r, ""));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : Xe(r, o)),
        si(e, t, r, o, n)
      );
    case 1:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : Xe(r, o)),
        bs(e, t, r, o, n)
      );
    case 3:
      e: {
        if ((_2(t), e === null)) throw Error(N(387));
        ((r = t.pendingProps),
          (a = t.memoizedState),
          (o = a.element),
          u2(e, t),
          jo(t, r, null, n));
        var i = t.memoizedState;
        if (((r = i.element), a.isDehydrated))
          if (
            ((a = {
              element: r,
              isDehydrated: !1,
              cache: i.cache,
              pendingSuspenseBoundaries: i.pendingSuspenseBoundaries,
              transitions: i.transitions,
            }),
            (t.updateQueue.baseState = a),
            (t.memoizedState = a),
            t.flags & 256)
          ) {
            ((o = Nn(Error(N(423)), t)), (t = ks(e, t, r, n, o)));
            break e;
          } else if (r !== o) {
            ((o = Nn(Error(N(424)), t)), (t = ks(e, t, r, n, o)));
            break e;
          } else
            for (
              Re = At(t.stateNode.containerInfo.firstChild),
                _e = t,
                re = !0,
                qe = null,
                n = s2(t, null, r, n),
                t.child = n;
              n;
            )
              ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
        else {
          if ((jn(), r === o)) {
            t = wt(e, t, n);
            break e;
          }
          Te(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        d2(t),
        e === null && ri(t),
        (r = t.type),
        (o = t.pendingProps),
        (a = e !== null ? e.memoizedProps : null),
        (i = o.children),
        Ja(r, o) ? (i = null) : a !== null && Ja(r, a) && (t.flags |= 32),
        R2(e, t),
        Te(e, t, i, n),
        t.child
      );
    case 6:
      return (e === null && ri(t), null);
    case 13:
      return O2(e, t, n);
    case 4:
      return (
        el(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = Mn(t, null, r, n)) : Te(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : Xe(r, o)),
        ws(e, t, r, o, n)
      );
    case 7:
      return (Te(e, t, t.pendingProps, n), t.child);
    case 8:
      return (Te(e, t, t.pendingProps.children, n), t.child);
    case 12:
      return (Te(e, t, t.pendingProps.children, n), t.child);
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (o = t.pendingProps),
          (a = t.memoizedProps),
          (i = o.value),
          q(To, r._currentValue),
          (r._currentValue = i),
          a !== null)
        )
          if (nt(a.value, i)) {
            if (a.children === o.children && !Le.current) {
              t = wt(e, t, n);
              break e;
            }
          } else
            for (a = t.child, a !== null && (a.return = t); a !== null;) {
              var s = a.dependencies;
              if (s !== null) {
                i = a.child;
                for (var c = s.firstContext; c !== null;) {
                  if (c.context === r) {
                    if (a.tag === 1) {
                      ((c = ht(-1, n & -n)), (c.tag = 2));
                      var u = a.updateQueue;
                      if (u !== null) {
                        u = u.shared;
                        var v = u.pending;
                        (v === null
                          ? (c.next = c)
                          : ((c.next = v.next), (v.next = c)),
                          (u.pending = c));
                      }
                    }
                    ((a.lanes |= n),
                      (c = a.alternate),
                      c !== null && (c.lanes |= n),
                      oi(a.return, n, t),
                      (s.lanes |= n));
                    break;
                  }
                  c = c.next;
                }
              } else if (a.tag === 10) i = a.type === t.type ? null : a.child;
              else if (a.tag === 18) {
                if (((i = a.return), i === null)) throw Error(N(341));
                ((i.lanes |= n),
                  (s = i.alternate),
                  s !== null && (s.lanes |= n),
                  oi(i, n, t),
                  (i = a.sibling));
              } else i = a.child;
              if (i !== null) i.return = a;
              else
                for (i = a; i !== null;) {
                  if (i === t) {
                    i = null;
                    break;
                  }
                  if (((a = i.sibling), a !== null)) {
                    ((a.return = i.return), (i = a));
                    break;
                  }
                  i = i.return;
                }
              a = i;
            }
        (Te(e, t, o.children, n), (t = t.child));
      }
      return t;
    case 9:
      return (
        (o = t.type),
        (r = t.pendingProps.children),
        kn(t, n),
        (o = Ue(o)),
        (r = r(o)),
        (t.flags |= 1),
        Te(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (o = Xe(r, t.pendingProps)),
        (o = Xe(r.type, o)),
        xs(e, t, r, o, n)
      );
    case 15:
      return D2(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : Xe(r, o)),
        io(e, t),
        (t.tag = 1),
        Ie(r) ? ((e = !0), ko(t)) : (e = !1),
        kn(t, n),
        A2(t, r, o),
        ii(t, r, o, n),
        ci(null, t, r, !0, e, n)
      );
    case 19:
      return B2(e, t, n);
    case 22:
      return P2(e, t, n);
  }
  throw Error(N(156, t.tag));
};
function tc(e, t) {
  return M1(e, t);
}
function $d(e, t, n, r) {
  ((this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null));
}
function Ve(e, t, n, r) {
  return new $d(e, t, n, r);
}
function hl(e) {
  return ((e = e.prototype), !(!e || !e.isReactComponent));
}
function Hd(e) {
  if (typeof e == "function") return hl(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === Di)) return 11;
    if (e === Pi) return 14;
  }
  return 2;
}
function Pt(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = Ve(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function co(e, t, n, r, o, a) {
  var i = 2;
  if (((r = e), typeof e == "function")) hl(e) && (i = 1);
  else if (typeof e == "string") i = 5;
  else
    e: switch (e) {
      case ln:
        return Yt(n.children, o, a, t);
      case Ii:
        ((i = 8), (o |= 8));
        break;
      case Na:
        return (
          (e = Ve(12, n, t, o | 2)),
          (e.elementType = Na),
          (e.lanes = a),
          e
        );
      case Aa:
        return ((e = Ve(13, n, t, o)), (e.elementType = Aa), (e.lanes = a), e);
      case La:
        return ((e = Ve(19, n, t, o)), (e.elementType = La), (e.lanes = a), e);
      case d1:
        return Qo(n, o, a, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case c1:
              i = 10;
              break e;
            case u1:
              i = 9;
              break e;
            case Di:
              i = 11;
              break e;
            case Pi:
              i = 14;
              break e;
            case kt:
              ((i = 16), (r = null));
              break e;
          }
        throw Error(N(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = Ve(i, n, t, o)),
    (t.elementType = e),
    (t.type = r),
    (t.lanes = a),
    t
  );
}
function Yt(e, t, n, r) {
  return ((e = Ve(7, e, r, t)), (e.lanes = n), e);
}
function Qo(e, t, n, r) {
  return (
    (e = Ve(22, e, r, t)),
    (e.elementType = d1),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function Sa(e, t, n) {
  return ((e = Ve(6, e, null, t)), (e.lanes = n), e);
}
function Ca(e, t, n) {
  return (
    (t = Ve(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function Vd(e, t, n, r, o) {
  ((this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = oa(0)),
    (this.expirationTimes = oa(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = oa(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = o),
    (this.mutableSourceEagerHydrationData = null));
}
function vl(e, t, n, r, o, a, i, s, c) {
  return (
    (e = new Vd(e, t, n, s, c)),
    t === 1 ? ((t = 1), a === !0 && (t |= 8)) : (t = 0),
    (a = Ve(3, null, null, t)),
    (e.current = a),
    (a.stateNode = e),
    (a.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    qi(a),
    e
  );
}
function Wd(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: an,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function nc(e) {
  if (!e) return _t;
  e = e._reactInternals;
  e: {
    if (tn(e) !== e || e.tag !== 1) throw Error(N(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Ie(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(N(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Ie(n)) return n2(e, n, t);
  }
  return t;
}
function rc(e, t, n, r, o, a, i, s, c) {
  return (
    (e = vl(n, r, !0, e, o, a, i, s, c)),
    (e.context = nc(null)),
    (n = e.current),
    (r = ze()),
    (o = Dt(n)),
    (a = ht(r, o)),
    (a.callback = t ?? null),
    Lt(n, a, o),
    (e.current.lanes = o),
    jr(e, o, r),
    De(e, r),
    e
  );
}
function Yo(e, t, n, r) {
  var o = t.current,
    a = ze(),
    i = Dt(o);
  return (
    (n = nc(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = ht(a, i)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = Lt(o, t, i)),
    e !== null && (tt(e, o, i, a), ro(e, o, i)),
    i
  );
}
function Po(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Ls(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function gl(e, t) {
  (Ls(e, t), (e = e.alternate) && Ls(e, t));
}
function Ud() {
  return null;
}
var oc =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function yl(e) {
  this._internalRoot = e;
}
Ko.prototype.render = yl.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(N(409));
  Yo(e, t, null, null);
};
Ko.prototype.unmount = yl.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    (qt(function () {
      Yo(null, e, null, null);
    }),
      (t[gt] = null));
  }
};
function Ko(e) {
  this._internalRoot = e;
}
Ko.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = P1();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < Ct.length && t !== 0 && t < Ct[n].priority; n++);
    (Ct.splice(n, 0, e), n === 0 && _1(e));
  }
};
function wl(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function Zo(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function Is() {}
function Gd(e, t, n, r, o) {
  if (o) {
    if (typeof r == "function") {
      var a = r;
      r = function () {
        var u = Po(i);
        a.call(u);
      };
    }
    var i = rc(t, r, e, 0, null, !1, !1, "", Is);
    return (
      (e._reactRootContainer = i),
      (e[gt] = i.current),
      hr(e.nodeType === 8 ? e.parentNode : e),
      qt(),
      i
    );
  }
  for (; (o = e.lastChild);) e.removeChild(o);
  if (typeof r == "function") {
    var s = r;
    r = function () {
      var u = Po(c);
      s.call(u);
    };
  }
  var c = vl(e, 0, !1, null, null, !1, !1, "", Is);
  return (
    (e._reactRootContainer = c),
    (e[gt] = c.current),
    hr(e.nodeType === 8 ? e.parentNode : e),
    qt(function () {
      Yo(t, c, n, r);
    }),
    c
  );
}
function Xo(e, t, n, r, o) {
  var a = n._reactRootContainer;
  if (a) {
    var i = a;
    if (typeof o == "function") {
      var s = o;
      o = function () {
        var c = Po(i);
        s.call(c);
      };
    }
    Yo(t, i, e, o);
  } else i = Gd(n, t, e, o, r);
  return Po(i);
}
I1 = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Zn(t.pendingLanes);
        n !== 0 &&
          (Oi(t, n | 1), De(t, de()), !(X & 6) && ((An = de() + 500), Ft()));
      }
      break;
    case 13:
      (qt(function () {
        var r = yt(e, 1);
        if (r !== null) {
          var o = ze();
          tt(r, e, 1, o);
        }
      }),
        gl(e, 1));
  }
};
Bi = function (e) {
  if (e.tag === 13) {
    var t = yt(e, 134217728);
    if (t !== null) {
      var n = ze();
      tt(t, e, 134217728, n);
    }
    gl(e, 134217728);
  }
};
D1 = function (e) {
  if (e.tag === 13) {
    var t = Dt(e),
      n = yt(e, t);
    if (n !== null) {
      var r = ze();
      tt(n, e, t, r);
    }
    gl(e, t);
  }
};
P1 = function () {
  return J;
};
R1 = function (e, t) {
  var n = J;
  try {
    return ((J = e), t());
  } finally {
    J = n;
  }
};
Ha = function (e, t, n) {
  switch (t) {
    case "input":
      if ((Pa(e, n), (t = n.name), n.type === "radio" && t != null)) {
        for (n = e; n.parentNode;) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            "input[name=" + JSON.stringify("" + t) + '][type="radio"]'
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var o = $o(r);
            if (!o) throw Error(N(90));
            (f1(r), Pa(r, o));
          }
        }
      }
      break;
    case "textarea":
      h1(e, n);
      break;
    case "select":
      ((t = n.value), t != null && yn(e, !!n.multiple, t, !1));
  }
};
k1 = pl;
S1 = qt;
var Qd = { usingClientEntryPoint: !1, Events: [Er, dn, $o, x1, b1, pl] },
  Vn = {
    findFiberByHostInstance: Wt,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom",
  },
  Yd = {
    bundleType: Vn.bundleType,
    version: Vn.version,
    rendererPackageName: Vn.rendererPackageName,
    rendererConfig: Vn.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: xt.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return ((e = z1(e)), e === null ? null : e.stateNode);
    },
    findFiberByHostInstance: Vn.findFiberByHostInstance || Ud,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Qr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Qr.isDisabled && Qr.supportsFiber)
    try {
      ((_o = Qr.inject(Yd)), (lt = Qr));
    } catch {}
}
Be.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Qd;
Be.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!wl(t)) throw Error(N(200));
  return Wd(e, t, null, n);
};
Be.createRoot = function (e, t) {
  if (!wl(e)) throw Error(N(299));
  var n = !1,
    r = "",
    o = oc;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (o = t.onRecoverableError)),
    (t = vl(e, 1, !1, null, null, n, !1, r, o)),
    (e[gt] = t.current),
    hr(e.nodeType === 8 ? e.parentNode : e),
    new yl(t)
  );
};
Be.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(N(188))
      : ((e = Object.keys(e).join(",")), Error(N(268, e)));
  return ((e = z1(t)), (e = e === null ? null : e.stateNode), e);
};
Be.flushSync = function (e) {
  return qt(e);
};
Be.hydrate = function (e, t, n) {
  if (!Zo(t)) throw Error(N(200));
  return Xo(null, e, t, !0, n);
};
Be.hydrateRoot = function (e, t, n) {
  if (!wl(e)) throw Error(N(405));
  var r = (n != null && n.hydratedSources) || null,
    o = !1,
    a = "",
    i = oc;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (o = !0),
      n.identifierPrefix !== void 0 && (a = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (i = n.onRecoverableError)),
    (t = rc(t, null, e, 1, n ?? null, o, !1, a, i)),
    (e[gt] = t.current),
    hr(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      ((n = r[e]),
        (o = n._getVersion),
        (o = o(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, o])
          : t.mutableSourceEagerHydrationData.push(n, o));
  return new Ko(t);
};
Be.render = function (e, t, n) {
  if (!Zo(t)) throw Error(N(200));
  return Xo(null, e, t, !1, n);
};
Be.unmountComponentAtNode = function (e) {
  if (!Zo(e)) throw Error(N(40));
  return e._reactRootContainer
    ? (qt(function () {
        Xo(null, null, e, !1, function () {
          ((e._reactRootContainer = null), (e[gt] = null));
        });
      }),
      !0)
    : !1;
};
Be.unstable_batchedUpdates = pl;
Be.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!Zo(n)) throw Error(N(200));
  if (e == null || e._reactInternals === void 0) throw Error(N(38));
  return Xo(e, t, n, !1, r);
};
Be.version = "18.3.1-next-f1338f8080-20240426";
function ac() {
  if (!(
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
  ))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ac);
    } catch (e) {
      console.error(e);
    }
}
(ac(), (a1.exports = Be));
var Kd = a1.exports,
  Ds = Kd;
((Ma.createRoot = Ds.createRoot), (Ma.hydrateRoot = Ds.hydrateRoot));
var xl = {};
(function e(t, n, r, o) {
  var a = !!(
      t.Worker &&
      t.Blob &&
      t.Promise &&
      t.OffscreenCanvas &&
      t.OffscreenCanvasRenderingContext2D &&
      t.HTMLCanvasElement &&
      t.HTMLCanvasElement.prototype.transferControlToOffscreen &&
      t.URL &&
      t.URL.createObjectURL
    ),
    i = typeof Path2D == "function" && typeof DOMMatrix == "function",
    s = (function () {
      if (!t.OffscreenCanvas) return !1;
      try {
        var b = new OffscreenCanvas(1, 1),
          y = b.getContext("2d");
        y.fillRect(0, 0, 1, 1);
        var D = b.transferToImageBitmap();
        y.createPattern(D, "no-repeat");
      } catch {
        return !1;
      }
      return !0;
    })();
  function c() {}
  function u(b) {
    var y = n.exports.Promise,
      D = y !== void 0 ? y : t.Promise;
    return typeof D == "function" ? new D(b) : (b(c, c), null);
  }
  var v = (function (b, y) {
      return {
        transform: function (D) {
          if (b) return D;
          if (y.has(D)) return y.get(D);
          var F = new OffscreenCanvas(D.width, D.height),
            V = F.getContext("2d");
          return (V.drawImage(D, 0, 0), y.set(D, F), F);
        },
        clear: function () {
          y.clear();
        },
      };
    })(s, new Map()),
    m = (function () {
      var b = Math.floor(16.666666666666668),
        y,
        D,
        F = {},
        V = 0;
      return (
        typeof requestAnimationFrame == "function" &&
        typeof cancelAnimationFrame == "function"
          ? ((y = function (R) {
              var $ = Math.random();
              return (
                (F[$] = requestAnimationFrame(function O(W) {
                  V === W || V + b - 1 < W
                    ? ((V = W), delete F[$], R())
                    : (F[$] = requestAnimationFrame(O));
                })),
                $
              );
            }),
            (D = function (R) {
              F[R] && cancelAnimationFrame(F[R]);
            }))
          : ((y = function (R) {
              return setTimeout(R, b);
            }),
            (D = function (R) {
              return clearTimeout(R);
            })),
        { frame: y, cancel: D }
      );
    })(),
    f = (function () {
      var b,
        y,
        D = {};
      function F(V) {
        function R($, O) {
          V.postMessage({ options: $ || {}, callback: O });
        }
        ((V.init = function (O) {
          var W = O.transferControlToOffscreen();
          V.postMessage({ canvas: W }, [W]);
        }),
          (V.fire = function (O, W, K) {
            if (y) return (R(O, null), y);
            var se = Math.random().toString(36).slice(2);
            return (
              (y = u(function (ee) {
                function ce(ge) {
                  ge.data.callback === se &&
                    (delete D[se],
                    V.removeEventListener("message", ce),
                    (y = null),
                    v.clear(),
                    K(),
                    ee());
                }
                (V.addEventListener("message", ce),
                  R(O, se),
                  (D[se] = ce.bind(null, { data: { callback: se } })));
              })),
              y
            );
          }),
          (V.reset = function () {
            V.postMessage({ reset: !0 });
            for (var O in D) (D[O](), delete D[O]);
          }));
      }
      return function () {
        if (b) return b;
        if (!r && a) {
          var V = [
            "var CONFETTI, SIZE = {}, module = {};",
            "(" + e.toString() + ")(this, module, true, SIZE);",
            "onmessage = function(msg) {",
            "  if (msg.data.options) {",
            "    CONFETTI(msg.data.options).then(function () {",
            "      if (msg.data.callback) {",
            "        postMessage({ callback: msg.data.callback });",
            "      }",
            "    });",
            "  } else if (msg.data.reset) {",
            "    CONFETTI && CONFETTI.reset();",
            "  } else if (msg.data.resize) {",
            "    SIZE.width = msg.data.resize.width;",
            "    SIZE.height = msg.data.resize.height;",
            "  } else if (msg.data.canvas) {",
            "    SIZE.width = msg.data.canvas.width;",
            "    SIZE.height = msg.data.canvas.height;",
            "    CONFETTI = module.exports.create(msg.data.canvas);",
            "  }",
            "}",
          ].join(`
`);
          try {
            b = new Worker(URL.createObjectURL(new Blob([V])));
          } catch (R) {
            return (
              typeof console < "u" &&
                typeof console.warn == "function" &&
                console.warn("🎊 Could not load worker", R),
              null
            );
          }
          F(b);
        }
        return b;
      };
    })(),
    h = {
      particleCount: 50,
      angle: 90,
      spread: 45,
      startVelocity: 45,
      decay: 0.9,
      gravity: 1,
      drift: 0,
      ticks: 200,
      x: 0.5,
      y: 0.5,
      shapes: ["square", "circle"],
      zIndex: 100,
      colors: [
        "#26ccff",
        "#a25afd",
        "#ff5e7e",
        "#88ff5a",
        "#fcff42",
        "#ffa62d",
        "#ff36ff",
      ],
      disableForReducedMotion: !1,
      scalar: 1,
    };
  function g(b, y) {
    return y ? y(b) : b;
  }
  function S(b) {
    return b != null;
  }
  function T(b, y, D) {
    return g(b && S(b[y]) ? b[y] : h[y], D);
  }
  function d(b) {
    return b < 0 ? 0 : Math.floor(b);
  }
  function p(b, y) {
    return Math.floor(Math.random() * (y - b)) + b;
  }
  function w(b) {
    return parseInt(b, 16);
  }
  function x(b) {
    return b.map(C);
  }
  function C(b) {
    var y = String(b).replace(/[^0-9a-f]/gi, "");
    return (
      y.length < 6 && (y = y[0] + y[0] + y[1] + y[1] + y[2] + y[2]),
      {
        r: w(y.substring(0, 2)),
        g: w(y.substring(2, 4)),
        b: w(y.substring(4, 6)),
      }
    );
  }
  function z(b) {
    var y = T(b, "origin", Object);
    return ((y.x = T(y, "x", Number)), (y.y = T(y, "y", Number)), y);
  }
  function j(b) {
    ((b.width = document.documentElement.clientWidth),
      (b.height = document.documentElement.clientHeight));
  }
  function k(b) {
    var y = b.getBoundingClientRect();
    ((b.width = y.width), (b.height = y.height));
  }
  function A(b) {
    var y = document.createElement("canvas");
    return (
      (y.style.position = "fixed"),
      (y.style.top = "0px"),
      (y.style.left = "0px"),
      (y.style.pointerEvents = "none"),
      (y.style.zIndex = b),
      y
    );
  }
  function M(b, y, D, F, V, R, $, O, W) {
    (b.save(),
      b.translate(y, D),
      b.rotate(R),
      b.scale(F, V),
      b.arc(0, 0, 1, $, O, W),
      b.restore());
  }
  function P(b) {
    var y = b.angle * (Math.PI / 180),
      D = b.spread * (Math.PI / 180);
    return {
      x: b.x,
      y: b.y,
      wobble: Math.random() * 10,
      wobbleSpeed: Math.min(0.11, Math.random() * 0.1 + 0.05),
      velocity: b.startVelocity * 0.5 + Math.random() * b.startVelocity,
      angle2D: -y + (0.5 * D - Math.random() * D),
      tiltAngle: (Math.random() * (0.75 - 0.25) + 0.25) * Math.PI,
      color: b.color,
      shape: b.shape,
      tick: 0,
      totalTicks: b.ticks,
      decay: b.decay,
      drift: b.drift,
      random: Math.random() + 2,
      tiltSin: 0,
      tiltCos: 0,
      wobbleX: 0,
      wobbleY: 0,
      gravity: b.gravity * 3,
      ovalScalar: 0.6,
      scalar: b.scalar,
      flat: b.flat,
    };
  }
  function I(b, y) {
    ((y.x += Math.cos(y.angle2D) * y.velocity + y.drift),
      (y.y += Math.sin(y.angle2D) * y.velocity + y.gravity),
      (y.velocity *= y.decay),
      y.flat
        ? ((y.wobble = 0),
          (y.wobbleX = y.x + 10 * y.scalar),
          (y.wobbleY = y.y + 10 * y.scalar),
          (y.tiltSin = 0),
          (y.tiltCos = 0),
          (y.random = 1))
        : ((y.wobble += y.wobbleSpeed),
          (y.wobbleX = y.x + 10 * y.scalar * Math.cos(y.wobble)),
          (y.wobbleY = y.y + 10 * y.scalar * Math.sin(y.wobble)),
          (y.tiltAngle += 0.1),
          (y.tiltSin = Math.sin(y.tiltAngle)),
          (y.tiltCos = Math.cos(y.tiltAngle)),
          (y.random = Math.random() + 2)));
    var D = y.tick++ / y.totalTicks,
      F = y.x + y.random * y.tiltCos,
      V = y.y + y.random * y.tiltSin,
      R = y.wobbleX + y.random * y.tiltCos,
      $ = y.wobbleY + y.random * y.tiltSin;
    if (
      ((b.fillStyle =
        "rgba(" +
        y.color.r +
        ", " +
        y.color.g +
        ", " +
        y.color.b +
        ", " +
        (1 - D) +
        ")"),
      b.beginPath(),
      i &&
        y.shape.type === "path" &&
        typeof y.shape.path == "string" &&
        Array.isArray(y.shape.matrix))
    )
      b.fill(
        le(
          y.shape.path,
          y.shape.matrix,
          y.x,
          y.y,
          Math.abs(R - F) * 0.1,
          Math.abs($ - V) * 0.1,
          (Math.PI / 10) * y.wobble
        )
      );
    else if (y.shape.type === "bitmap") {
      var O = (Math.PI / 10) * y.wobble,
        W = Math.abs(R - F) * 0.1,
        K = Math.abs($ - V) * 0.1,
        se = y.shape.bitmap.width * y.scalar,
        ee = y.shape.bitmap.height * y.scalar,
        ce = new DOMMatrix([
          Math.cos(O) * W,
          Math.sin(O) * W,
          -Math.sin(O) * K,
          Math.cos(O) * K,
          y.x,
          y.y,
        ]);
      ce.multiplySelf(new DOMMatrix(y.shape.matrix));
      var ge = b.createPattern(v.transform(y.shape.bitmap), "no-repeat");
      (ge.setTransform(ce),
        (b.globalAlpha = 1 - D),
        (b.fillStyle = ge),
        b.fillRect(y.x - se / 2, y.y - ee / 2, se, ee),
        (b.globalAlpha = 1));
    } else if (y.shape === "circle")
      b.ellipse
        ? b.ellipse(
            y.x,
            y.y,
            Math.abs(R - F) * y.ovalScalar,
            Math.abs($ - V) * y.ovalScalar,
            (Math.PI / 10) * y.wobble,
            0,
            2 * Math.PI
          )
        : M(
            b,
            y.x,
            y.y,
            Math.abs(R - F) * y.ovalScalar,
            Math.abs($ - V) * y.ovalScalar,
            (Math.PI / 10) * y.wobble,
            0,
            2 * Math.PI
          );
    else if (y.shape === "star")
      for (
        var Z = (Math.PI / 2) * 3,
          Ee = 4 * y.scalar,
          Qe = 8 * y.scalar,
          Ye = y.x,
          ct = y.y,
          $t = 5,
          rt = Math.PI / $t;
        $t--;
      )
        ((Ye = y.x + Math.cos(Z) * Qe),
          (ct = y.y + Math.sin(Z) * Qe),
          b.lineTo(Ye, ct),
          (Z += rt),
          (Ye = y.x + Math.cos(Z) * Ee),
          (ct = y.y + Math.sin(Z) * Ee),
          b.lineTo(Ye, ct),
          (Z += rt));
    else
      (b.moveTo(Math.floor(y.x), Math.floor(y.y)),
        b.lineTo(Math.floor(y.wobbleX), Math.floor(V)),
        b.lineTo(Math.floor(R), Math.floor($)),
        b.lineTo(Math.floor(F), Math.floor(y.wobbleY)));
    return (b.closePath(), b.fill(), y.tick < y.totalTicks);
  }
  function L(b, y, D, F, V) {
    var R = y.slice(),
      $ = b.getContext("2d"),
      O,
      W,
      K = u(function (se) {
        function ee() {
          ((O = W = null),
            $.clearRect(0, 0, F.width, F.height),
            v.clear(),
            V(),
            se());
        }
        function ce() {
          (r &&
            !(F.width === o.width && F.height === o.height) &&
            ((F.width = b.width = o.width), (F.height = b.height = o.height)),
            !F.width &&
              !F.height &&
              (D(b), (F.width = b.width), (F.height = b.height)),
            $.clearRect(0, 0, F.width, F.height),
            (R = R.filter(function (ge) {
              return I($, ge);
            })),
            R.length ? (O = m.frame(ce)) : ee());
        }
        ((O = m.frame(ce)), (W = ee));
      });
    return {
      addFettis: function (se) {
        return ((R = R.concat(se)), K);
      },
      canvas: b,
      promise: K,
      reset: function () {
        (O && m.cancel(O), W && W());
      },
    };
  }
  function B(b, y) {
    var D = !b,
      F = !!T(y || {}, "resize"),
      V = !1,
      R = T(y, "disableForReducedMotion", Boolean),
      $ = a && !!T(y || {}, "useWorker"),
      O = $ ? f() : null,
      W = D ? j : k,
      K = b && O ? !!b.__confetti_initialized : !1,
      se =
        typeof matchMedia == "function" &&
        matchMedia("(prefers-reduced-motion)").matches,
      ee;
    function ce(Z, Ee, Qe) {
      for (
        var Ye = T(Z, "particleCount", d),
          ct = T(Z, "angle", Number),
          $t = T(Z, "spread", Number),
          rt = T(Z, "startVelocity", Number),
          hc = T(Z, "decay", Number),
          vc = T(Z, "gravity", Number),
          gc = T(Z, "drift", Number),
          kl = T(Z, "colors", x),
          yc = T(Z, "ticks", Number),
          Sl = T(Z, "shapes"),
          wc = T(Z, "scalar"),
          xc = !!T(Z, "flat"),
          Cl = z(Z),
          Tl = Ye,
          Jo = [],
          bc = b.width * Cl.x,
          kc = b.height * Cl.y;
        Tl--;
      )
        Jo.push(
          P({
            x: bc,
            y: kc,
            angle: ct,
            spread: $t,
            startVelocity: rt,
            color: kl[Tl % kl.length],
            shape: Sl[p(0, Sl.length)],
            ticks: yc,
            decay: hc,
            gravity: vc,
            drift: gc,
            scalar: wc,
            flat: xc,
          })
        );
      return ee ? ee.addFettis(Jo) : ((ee = L(b, Jo, W, Ee, Qe)), ee.promise);
    }
    function ge(Z) {
      var Ee = R || T(Z, "disableForReducedMotion", Boolean),
        Qe = T(Z, "zIndex", Number);
      if (Ee && se)
        return u(function (rt) {
          rt();
        });
      (D && ee
        ? (b = ee.canvas)
        : D && !b && ((b = A(Qe)), document.body.appendChild(b)),
        F && !K && W(b));
      var Ye = { width: b.width, height: b.height };
      (O && !K && O.init(b), (K = !0), O && (b.__confetti_initialized = !0));
      function ct() {
        if (O) {
          var rt = {
            getBoundingClientRect: function () {
              if (!D) return b.getBoundingClientRect();
            },
          };
          (W(rt),
            O.postMessage({ resize: { width: rt.width, height: rt.height } }));
          return;
        }
        Ye.width = Ye.height = null;
      }
      function $t() {
        ((ee = null),
          F && ((V = !1), t.removeEventListener("resize", ct)),
          D &&
            b &&
            (document.body.contains(b) && document.body.removeChild(b),
            (b = null),
            (K = !1)));
      }
      return (
        F && !V && ((V = !0), t.addEventListener("resize", ct, !1)),
        O ? O.fire(Z, Ye, $t) : ce(Z, Ye, $t)
      );
    }
    return (
      (ge.reset = function () {
        (O && O.reset(), ee && ee.reset());
      }),
      ge
    );
  }
  var U;
  function G() {
    return (U || (U = B(null, { useWorker: !0, resize: !0 })), U);
  }
  function le(b, y, D, F, V, R, $) {
    var O = new Path2D(b),
      W = new Path2D();
    W.addPath(O, new DOMMatrix(y));
    var K = new Path2D();
    return (
      K.addPath(
        W,
        new DOMMatrix([
          Math.cos($) * V,
          Math.sin($) * V,
          -Math.sin($) * R,
          Math.cos($) * R,
          D,
          F,
        ])
      ),
      K
    );
  }
  function E(b) {
    if (!i) throw new Error("path confetti are not supported in this browser");
    var y, D;
    typeof b == "string" ? (y = b) : ((y = b.path), (D = b.matrix));
    var F = new Path2D(y),
      V = document.createElement("canvas"),
      R = V.getContext("2d");
    if (!D) {
      for (
        var $ = 1e3, O = $, W = $, K = 0, se = 0, ee, ce, ge = 0;
        ge < $;
        ge += 2
      )
        for (var Z = 0; Z < $; Z += 2)
          R.isPointInPath(F, ge, Z, "nonzero") &&
            ((O = Math.min(O, ge)),
            (W = Math.min(W, Z)),
            (K = Math.max(K, ge)),
            (se = Math.max(se, Z)));
      ((ee = K - O), (ce = se - W));
      var Ee = 10,
        Qe = Math.min(Ee / ee, Ee / ce);
      D = [
        Qe,
        0,
        0,
        Qe,
        -Math.round(ee / 2 + O) * Qe,
        -Math.round(ce / 2 + W) * Qe,
      ];
    }
    return { type: "path", path: y, matrix: D };
  }
  function H(b) {
    var y,
      D = 1,
      F = "#000000",
      V =
        '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';
    typeof b == "string"
      ? (y = b)
      : ((y = b.text),
        (D = "scalar" in b ? b.scalar : D),
        (V = "fontFamily" in b ? b.fontFamily : V),
        (F = "color" in b ? b.color : F));
    var R = 10 * D,
      $ = "" + R + "px " + V,
      O = new OffscreenCanvas(R, R),
      W = O.getContext("2d");
    W.font = $;
    var K = W.measureText(y),
      se = Math.ceil(K.actualBoundingBoxRight + K.actualBoundingBoxLeft),
      ee = Math.ceil(K.actualBoundingBoxAscent + K.actualBoundingBoxDescent),
      ce = 2,
      ge = K.actualBoundingBoxLeft + ce,
      Z = K.actualBoundingBoxAscent + ce;
    ((se += ce + ce),
      (ee += ce + ce),
      (O = new OffscreenCanvas(se, ee)),
      (W = O.getContext("2d")),
      (W.font = $),
      (W.fillStyle = F),
      W.fillText(y, ge, Z));
    var Ee = 1 / D;
    return {
      type: "bitmap",
      bitmap: O.transferToImageBitmap(),
      matrix: [Ee, 0, 0, Ee, (-se * Ee) / 2, (-ee * Ee) / 2],
    };
  }
  ((n.exports = function () {
    return G().apply(this, arguments);
  }),
    (n.exports.reset = function () {
      G().reset();
    }),
    (n.exports.create = B),
    (n.exports.shapeFromPath = E),
    (n.exports.shapeFromText = H));
})(
  (function () {
    return typeof window < "u" ? window : typeof self < "u" ? self : this || {};
  })(),
  xl,
  !1
);
const rn = xl.exports;
xl.exports.create;
function Cr(e = !0) {
  var t;
  return typeof window > "u"
    ? !1
    : e
      ? !(
          (t = window.matchMedia) != null &&
          t.call(window, "(prefers-reduced-motion: reduce)").matches
        )
      : !0;
}
function Zd(e = {}) {
  const t = e.respectReducedMotion ?? !0,
    n = new Set();
  let r = null,
    o = 0,
    a = !1;
  const i = () => {
      typeof document > "u" ||
        (!document.hidden &&
          n.size > 0 &&
          r === null &&
          (a && (document.removeEventListener("visibilitychange", i), (a = !1)),
          (o = typeof performance < "u" ? performance.now() : Date.now()),
          (r = requestAnimationFrame(s))));
    },
    s = (u) => {
      if (typeof document < "u" && document.hidden) {
        ((r = null),
          a || ((a = !0), document.addEventListener("visibilitychange", i)));
        return;
      }
      const v = u - o;
      ((o = u),
        n.forEach((m) => m(v)),
        (r = n.size > 0 ? requestAnimationFrame(s) : null));
    },
    c = () => {
      if (r === null) {
        if (typeof document < "u" && document.hidden) {
          a || ((a = !0), document.addEventListener("visibilitychange", i));
          return;
        }
        ((o = typeof performance < "u" ? performance.now() : Date.now()),
          (r = requestAnimationFrame(s)));
      }
    };
  return {
    isMotionAllowed: () => Cr(t),
    scheduleRender: (u) =>
      Cr(t)
        ? (n.add(u),
          c(),
          () => {
            (n.delete(u),
              n.size === 0 &&
                (r !== null && (cancelAnimationFrame(r), (r = null)),
                a &&
                  typeof document < "u" &&
                  (document.removeEventListener("visibilitychange", i),
                  (a = !1))));
          })
        : () => {},
    destroy: () => {
      (n.clear(),
        r !== null && (cancelAnimationFrame(r), (r = null)),
        a &&
          typeof document < "u" &&
          (document.removeEventListener("visibilitychange", i), (a = !1)));
    },
  };
}
const Xd = Zd();
function Jd(e) {
  return Xd.scheduleRender(e);
}
function bl(e, t) {
  if (typeof e == "number") return Math.min(10, Math.max(1, Math.round(e)));
  const n = e && e !== "normal" ? e : (t ?? e ?? "normal");
  return n === "low" ? 3 : n === "high" ? 8 : 5;
}
function ic(e, t = !1) {
  const n = Math.round(5 + e * 3.1);
  return t ? Math.max(4, Math.round(n * 0.6)) : n;
}
function lc(e) {
  const t = Math.max(4, 18.5 - e * 1.35),
    n = Math.max(3, 9 - e * 0.5);
  return {
    minDuration: Number(t.toFixed(1)),
    maxDuration: Number((t + n).toFixed(1)),
  };
}
const qd = "#c9a84c",
  e0 = "#2d5a27",
  t0 = "#fff7cc";
function n0() {
  if (typeof document > "u") return !1;
  try {
    const e = document.createElement("canvas");
    return !!(e.getContext && e.getContext("2d"));
  } catch {
    return !1;
  }
}
function r0(e) {
  return e === "eid-adha"
    ? ["🐑", "🎁"]
    : e === "eid-fitr" || e === "eid"
      ? ["🎁", "✨"]
      : ["🌙", "✨"];
}
async function bi(e, t, n) {
  if (!Cr() || !n0()) return;
  const r =
      t != null && t.length ? t : [qd, e0, t0, "#e8c96b", "#4a8a3a", "#ffffff"],
    [o, a] = r0(n);
  let i;
  if (typeof OffscreenCanvas < "u")
    try {
      const c = Ps(o),
        u = Ps(a),
        v = (e || 1447).toString(),
        m = o0(v);
      i = [c, u, m];
    } catch {
      i = void 0;
    }
  const s = {
    particleCount: 60,
    spread: 70,
    colors: r,
    ticks: 200,
    gravity: 0.8,
    scalar: i ? 1.8 : 1.2,
    drift: 0,
    disableForReducedMotion: !0,
  };
  i
    ? (rn({ ...s, angle: 60, origin: { x: 0, y: 0.85 }, shapes: [i[0], i[1]] }),
      await Yr(300),
      rn({ ...s, angle: 120, origin: { x: 1, y: 0.85 }, shapes: [i[0], i[1]] }),
      await Yr(300),
      await rn({
        ...s,
        angle: 90,
        particleCount: 80,
        spread: 100,
        origin: { x: 0.5, y: 0.7 },
        shapes: i,
        scalar: 2,
      }))
    : (rn({ ...s, angle: 60, origin: { x: 0, y: 0.85 } }),
      await Yr(300),
      rn({ ...s, angle: 120, origin: { x: 1, y: 0.85 } }),
      await Yr(300),
      await rn({
        ...s,
        angle: 90,
        particleCount: 80,
        spread: 100,
        origin: { x: 0.5, y: 0.7 },
        scalar: 1.4,
      }));
}
function Ps(e) {
  const r = "20px serif";
  let a = new OffscreenCanvas(1, 1),
    i = a.getContext("2d");
  i.font = r;
  const s = i.measureText(e),
    c = 5,
    u =
      typeof s.actualBoundingBoxLeft == "number" ? s.actualBoundingBoxLeft : 0,
    v =
      typeof s.actualBoundingBoxRight == "number"
        ? s.actualBoundingBoxRight
        : s.width || 20,
    m =
      typeof s.actualBoundingBoxAscent == "number"
        ? s.actualBoundingBoxAscent
        : 20,
    f =
      typeof s.actualBoundingBoxDescent == "number"
        ? s.actualBoundingBoxDescent
        : 0,
    h = Math.max(1, Math.ceil(v + u) + c * 2),
    g = Math.max(1, Math.ceil(m + f) + c * 2),
    S = u + c,
    T = m + c;
  ((a = new OffscreenCanvas(h, g)),
    (i = a.getContext("2d")),
    (i.font = r),
    (i.lineJoin = "round"),
    (i.lineWidth = 3 * 2),
    (i.strokeStyle = "rgba(0,0,0,0.55)"),
    i.strokeText(e, S, T),
    i.fillText(e, S, T));
  const d = 1 / 2;
  return {
    type: "bitmap",
    bitmap: a.transferToImageBitmap(),
    matrix: [d, 0, 0, d, (-h * d) / 2, (-g * d) / 2],
  };
}
function o0(e) {
  const r = "bold 15px system-ui, -apple-system, sans-serif";
  let o = new OffscreenCanvas(1, 1),
    a = o.getContext("2d");
  a.font = r;
  const i = a.measureText(e),
    s = 3,
    c =
      typeof i.actualBoundingBoxLeft == "number" ? i.actualBoundingBoxLeft : 0,
    u =
      typeof i.actualBoundingBoxRight == "number"
        ? i.actualBoundingBoxRight
        : i.width || 15,
    v =
      typeof i.actualBoundingBoxAscent == "number"
        ? i.actualBoundingBoxAscent
        : 15,
    m =
      typeof i.actualBoundingBoxDescent == "number"
        ? i.actualBoundingBoxDescent
        : 0,
    f = Math.max(1, Math.ceil(u + c) + s * 2),
    h = Math.max(1, Math.ceil(v + m) + s * 2),
    g = c + s,
    S = v + s;
  ((o = new OffscreenCanvas(f, h)),
    (a = o.getContext("2d")),
    (a.font = r),
    (a.lineJoin = "round"),
    (a.lineWidth = 15 * 0.28),
    (a.strokeStyle = "#000000"),
    a.strokeText(e, g, S),
    (a.fillStyle = "#ffffff"),
    a.fillText(e, g, S));
  const T = 1 / 1.5;
  return {
    type: "bitmap",
    bitmap: o.transferToImageBitmap(),
    matrix: [T, 0, 0, T, (-f * T) / 2, (-h * T) / 2],
  };
}
function a0(e, t, n = !1) {
  return t === "off" || !Cr() ? !1 : e.isRamadan || e.isEid || n;
}
function Yr(e) {
  return new Promise((t) => setTimeout(t, e));
}
const i0 = {
  standard: 0,
  saudi: 0,
  uae: 0,
  malaysia: 0,
  egypt: 1,
  turkey: 1,
  pakistan: 1,
  indonesia: 1,
  morocco: 1,
  us: 1,
  uk: 1,
};
function sc(e, t) {
  return t !== void 0
    ? typeof t == "number" && !isNaN(t) && isFinite(t)
      ? Math.max(-3, Math.min(3, Math.round(t)))
      : 0
    : e
      ? (i0[e] ?? 0)
      : 0;
}
const l0 = {
    1443: "2022-04-02",
    1444: "2023-03-23",
    1445: "2024-03-11",
    1446: "2025-03-01",
    1447: "2026-02-18",
    1448: "2027-02-07",
    1449: "2028-01-28",
    1450: "2029-01-16",
    1451: "2030-01-06",
    1452: "2030-12-26",
    1453: "2031-12-15",
    1454: "2032-12-04",
    1455: "2033-11-24",
    1456: "2034-11-13",
    1457: "2035-11-02",
    1458: "2036-10-22",
    1459: "2037-10-11",
    1460: "2038-10-01",
  },
  Rs = {
    1443: "2022-05-02",
    1444: "2023-04-21",
    1445: "2024-04-10",
    1446: "2025-03-30",
    1447: "2026-03-20",
    1448: "2027-03-09",
    1449: "2028-02-26",
    1450: "2029-02-14",
    1451: "2030-02-04",
    1452: "2031-01-24",
    1453: "2032-01-14",
    1454: "2033-01-03",
    1455: "2033-12-23",
    1456: "2034-12-12",
    1457: "2035-12-01",
    1458: "2036-11-19",
    1459: "2037-11-09",
    1460: "2038-10-29",
  },
  s0 = {
    1443: "2022-07-09",
    1444: "2023-06-28",
    1445: "2024-06-16",
    1446: "2025-06-06",
    1447: "2026-05-27",
    1448: "2027-05-16",
    1449: "2028-05-05",
    1450: "2029-04-24",
    1451: "2030-04-13",
    1452: "2031-04-02",
    1453: "2032-03-22",
    1454: "2033-03-12",
    1455: "2034-03-01",
    1456: "2035-02-19",
    1457: "2036-02-08",
    1458: "2037-01-28",
    1459: "2038-01-17",
    1460: "2039-01-06",
  },
  ki = Object.freeze({
    isRamadan: !1,
    occasion: "none",
    isEid: !1,
    hijriYear: 0,
    hijriMonth: 0,
    hijriDay: 0,
    dayNumber: 0,
  });
function c0(e) {
  var t;
  try {
    if (typeof Intl > "u" || typeof Intl.DateTimeFormat != "function")
      return null;
    const n = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
    if (typeof n.formatToParts != "function") return null;
    const r = (t = n.resolvedOptions) == null ? void 0 : t.call(n).calendar;
    if (!r || !r.startsWith("islamic")) return null;
    const o = n.formatToParts(e);
    if (!Array.isArray(o) || o.length === 0) return null;
    const a = (u) => {
        const v = o.find((m) => m.type === u);
        return v ? parseInt(v.value, 10) : NaN;
      },
      i = a("month"),
      s = a("day"),
      c = a("year");
    return isNaN(i) || isNaN(s) || isNaN(c)
      ? null
      : { month: i, day: s, year: c };
  } catch {
    return null;
  }
}
const Kr = 24 * 60 * 60 * 1e3;
function u0(e) {
  const t = e.getTime();
  for (const [o, a] of Object.entries(Rs)) {
    const i = new Date(a).getTime(),
      s = Math.floor((t - i) / Kr);
    if (s >= 0 && s < 3) {
      const c = parseInt(o, 10),
        u = s + 1;
      return {
        isRamadan: !1,
        occasion: "eid-fitr",
        isEid: !0,
        hijriYear: c,
        hijriMonth: 10,
        hijriDay: u,
        dayNumber: u,
      };
    }
  }
  for (const [o, a] of Object.entries(s0)) {
    const i = new Date(a).getTime(),
      s = Math.floor((t - i) / Kr);
    if (s >= 0 && s < 4) {
      const c = parseInt(o, 10),
        u = s + 1;
      return {
        isRamadan: !1,
        occasion: "eid-adha",
        isEid: !0,
        hijriYear: c,
        hijriMonth: 12,
        hijriDay: s + 10,
        dayNumber: u,
      };
    }
  }
  let n = 0,
    r = null;
  for (const [o, a] of Object.entries(l0)) {
    const i = new Date(a);
    i.getTime() <= t &&
      (!r || i.getTime() > r.getTime()) &&
      ((r = i), (n = parseInt(o, 10)));
  }
  if (r) {
    const o = Rs[n],
      a = o ? new Date(o).getTime() : r.getTime() + 30 * Kr;
    if (t < a) {
      const i = Math.floor((t - r.getTime()) / Kr) + 1;
      return {
        isRamadan: !0,
        occasion: "ramadan",
        isEid: !1,
        hijriYear: n,
        hijriMonth: 9,
        hijriDay: i,
        dayNumber: i,
      };
    }
  }
  return {
    isRamadan: !1,
    occasion: "none",
    isEid: !1,
    hijriYear: n,
    hijriMonth: 0,
    hijriDay: 0,
    dayNumber: 0,
  };
}
function d0(e, t = 0, n = !1) {
  const r = typeof t == "number" ? t : 0;
  let o = typeof t == "boolean" ? t : n,
    a,
    i = r;
  if (e instanceof Date) a = e;
  else if (typeof e == "object" && e !== null) {
    const u = e;
    ((a = u.date),
      typeof u.debug == "boolean" && (o = u.debug),
      (i = sc(u.region, u.hijriAdjustment)));
  }
  let s;
  if (a instanceof Date) s = isNaN(a.getTime()) ? new Date() : a;
  else if (typeof a == "string" || typeof a == "number") {
    const u = new Date(a);
    s = isNaN(u.getTime()) ? new Date() : u;
  } else
    (a !== void 0 &&
      o &&
      typeof console < "u" &&
      console.warn &&
      console.warn(
        `[ramadan-overlay] Invalid Date "${String(a)}"; falling back to current date.`
      ),
      (s = new Date()));
  const c =
    typeof i == "number" && !isNaN(i) && isFinite(i)
      ? Math.max(-3, Math.min(3, Math.round(i)))
      : 0;
  return { targetDate: s, effectiveOffset: c };
}
function Cn(e = new Date(), t = 0) {
  const n = typeof e == "object" && e !== null && "debug" in e ? !!e.debug : !1,
    { targetDate: r, effectiveOffset: o } = d0(e, t, n),
    a = o === 0 ? r : new Date(r.getTime() - o * 24 * 60 * 60 * 1e3),
    i = c0(a);
  if (i) {
    const v = i.month === 9,
      m = i.month === 10 && i.day >= 1 && i.day <= 3,
      f = i.month === 12 && i.day >= 10 && i.day <= 13;
    let h = "none",
      g = 0;
    return (
      v
        ? ((h = "ramadan"), (g = i.day))
        : m
          ? ((h = "eid-fitr"), (g = i.day))
          : f && ((h = "eid-adha"), (g = i.day - 9)),
      {
        isRamadan: v,
        occasion: h,
        isEid: m || f,
        hijriYear: i.year,
        hijriMonth: i.month,
        hijriDay: i.day,
        dayNumber: g,
      }
    );
  }
  return u0(a);
}
function _s(e, t) {
  var n, r, o, a;
  return e
    ? typeof e == "string"
      ? e.trim()
      : (typeof e == "object" &&
          (((n = e[t]) == null ? void 0 : n.trim()) ||
            ((r = e.ramadan) == null ? void 0 : r.trim()) ||
            ((o = e["eid-fitr"]) == null ? void 0 : o.trim()) ||
            ((a = e["eid-adha"]) == null ? void 0 : a.trim()))) ||
        ""
    : "";
}
const p0 = {
  ramadan: {
    en: "Ramadan Mubarak — May Allah bless you with peace, health, and happiness",
    ar: "رمضان مبارك — أعاده الله عليكم بالخير واليمن والبركات",
  },
  "eid-fitr": {
    en: "Eid Al-Fitr Mubarak — Wishing you and your loved ones joy, peace, and prosperity",
    ar: "عيد فطر مبارك — تقبل الله منا ومنكم صالح الأعمال وكل عام وأنتم بخير",
  },
  "eid-adha": {
    en: "Eid Al-Adha Mubarak — Blessed Eid and warmest wishes to you and your family",
    ar: "عيد أضحى مبارك — تقبل الله منا ومنكم صالح الأعمال وحجاً مبروراً",
  },
  none: {
    en: "Ramadan Mubarak — May Allah bless you with peace, health, and happiness",
    ar: "رمضان مبارك — أعاده الله عليكم بالخير واليمن والبركات",
  },
};
function f0(e) {
  return `<svg viewBox="0 0 54.700001 119.00001" height="36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="flex-shrink:0;display:block">
    <g transform="matrix(0.1,0,0,-0.1,-112.1,290)" fill="var(--ro-banner-icon, ${e})" stroke="none">
      <path d="m 396,2909 c -32,-25 -35,-71 -6,-96 11,-10 20,-21 20,-24 0,-4 -27,-24 -60,-44 -70,-42 -84,-64 -77,-115 4,-29 0,-41 -15,-54 -11,-10 -17,-23 -14,-31 4,-11 -9,-15 -57,-17 -50,-2 -62,-6 -65,-21 -3,-12 4,-20 17,-24 26,-7 22,8 66,-298 20,-137 38,-262 41,-277 5,-24 2,-28 -19,-28 -28,0 -55,-26 -41,-40 5,-4 20,-10 34,-12 16,-2 26,-11 30,-28 5,-21 13,-26 55,-30 58,-7 86,-20 113,-55 19,-24 21,-25 34,-8 30,40 59,56 115,62 55,6 58,8 63,36 3,17 9,29 13,28 4,-2 16,-3 28,-3 34,0 21,44 -13,48 -16,2 -28,7 -28,11 0,18 80,567 85,579 2,6 11,12 19,12 21,0 30,19 16,35 -8,10 -31,15 -66,15 -46,0 -54,3 -54,19 0,10 -7,24 -16,32 -10,8 -14,22 -10,40 10,50 -11,86 -70,119 -29,17 -56,35 -59,41 -4,5 3,21 14,35 27,35 26,59 -4,89 -30,30 -54,31 -89,4 z m 74,-19 c 33,-33 19,-63 -32,-64 -48,-2 -66,35 -32,68 21,21 40,20 64,-4 z M 265,2375 c 24,-23 30,-45 25,-88 -1,-10 6,-27 15,-37 23,-25 44,-302 25,-325 -22,-27 -49,-18 -54,18 -12,69 -56,417 -56,436 0,28 16,26 45,-4 z m 212,3 c 27,-30 32,-47 22,-81 -5,-19 -4,-36 5,-50 11,-18 12,-52 5,-166 -5,-80 -14,-150 -20,-157 -13,-16 -76,-19 -98,-5 -10,6 -16,50 -23,161 -9,136 -8,153 7,170 13,15 14,22 5,40 -14,27 -6,64 20,90 26,26 52,25 77,-2 z m 183,15 c 0,-5 -14,-111 -30,-237 -17,-126 -30,-234 -30,-238 0,-5 -12,-8 -27,-6 -35,4 -37,15 -28,187 6,106 11,137 24,150 12,12 16,28 13,54 -3,30 1,42 26,67 29,29 52,39 52,23 z"/>
      <path d="m 2320,2907 c -13,-7 -29,-25 -34,-40 -8,-22 -6,-33 13,-57 12,-17 21,-39 19,-48 -2,-10 -31,-30 -67,-48 -69,-33 -86,-53 -77,-89 5,-19 2,-24 -16,-27 -15,-2 -26,-16 -37,-45 -11,-33 -20,-43 -37,-43 -29,0 -38,-27 -19,-56 22,-33 22,-489 0,-518 -16,-21 -4,-56 20,-56 7,0 21,-24 32,-57 18,-52 23,-58 50,-61 23,-2 34,-11 46,-38 l 17,-34 h 124 124 l 12,34 c 9,29 17,35 43,38 29,3 33,8 48,57 10,36 23,57 36,62 27,10 35,33 18,56 -22,28 -21,484 0,517 19,29 10,56 -19,56 -16,0 -25,10 -36,43 -12,33 -20,42 -38,41 -20,-1 -22,3 -17,27 9,41 -5,58 -76,93 -71,34 -84,59 -49,91 54,49 -13,136 -80,102 z m 75,-38 c 4,-5 4,-20 1,-32 -4,-19 -12,-22 -45,-22 -43,0 -56,13 -45,47 11,36 69,41 89,7 z m -1,-460 36,-21 v -214 -214 h -80 -80 v 214 214 l 33,20 c 41,26 49,26 91,1 z m -194,-14 30,-16 v -209 -210 h -39 c -22,0 -46,-3 -55,-6 -14,-5 -16,16 -16,202 0,203 1,209 23,231 27,27 22,26 57,8 z m 357,-7 c 23,-21 23,-25 23,-228 v -206 l -42,2 c -24,2 -49,3 -55,3 -10,1 -13,50 -13,211 v 209 l 28,15 c 35,19 32,20 59,-6 z"/>
      <path d="m 1352,2884 c -26,-18 -30,-69 -6,-95 14,-16 14,-20 -1,-48 -8,-17 -20,-31 -25,-31 -18,0 -48,-42 -54,-75 -4,-18 -18,-44 -31,-57 -14,-13 -25,-34 -25,-50 0,-16 -20,-59 -45,-97 l -44,-70 61,-223 c 34,-123 63,-251 66,-285 2,-37 8,-63 15,-63 16,0 67,-51 67,-67 0,-9 18,-13 63,-13 59,0 63,1 75,29 7,17 26,36 42,43 26,11 29,17 32,73 3,50 54,254 113,457 l 13,46 -44,72 c -24,40 -44,84 -44,100 0,16 -8,33 -20,41 -11,8 -28,37 -38,64 -12,34 -28,57 -49,70 -36,23 -48,62 -27,86 22,25 18,75 -8,93 -12,9 -32,16 -43,16 -11,0 -31,-7 -43,-16 z m 78,-18 c 6,-8 10,-25 8,-37 -2,-19 -10,-24 -45,-26 -41,-3 -43,-1 -43,25 0,15 5,33 12,40 16,16 53,15 68,-2 z m -4,-544 c 12,-9 29,-31 37,-47 14,-28 14,-46 -3,-185 -11,-85 -19,-163 -20,-172 0,-15 -9,-18 -45,-18 -25,0 -45,3 -45,8 0,4 -9,81 -20,171 -18,152 -18,166 -3,198 15,33 48,63 68,63 5,0 20,-8 31,-18 z m -175,-50 c 5,-12 18,-86 29,-165 11,-78 23,-157 27,-175 5,-29 3,-33 -12,-30 -13,2 -29,43 -66,173 -51,181 -55,205 -38,236 10,20 11,20 31,2 11,-10 24,-28 29,-41 z m 349,27 c 12,-27 9,-44 -19,-147 -63,-227 -71,-252 -86,-252 -8,0 -15,2 -15,4 0,2 11,84 25,182 20,140 30,186 48,211 12,18 25,33 28,33 4,0 12,-14 19,-31 z"/>
      <path d="m 415,1392 c -54,-11 -75,-81 -35,-117 11,-10 20,-24 20,-31 0,-11 -72,-51 -124,-68 -15,-5 -17,-13 -13,-40 4,-28 1,-36 -18,-46 -13,-7 -31,-27 -39,-45 -9,-18 -22,-38 -31,-45 -19,-16 -19,-54 0,-70 13,-10 15,-49 15,-235 0,-189 -2,-224 -15,-229 -19,-7 -19,-40 0,-56 8,-7 15,-19 15,-27 0,-8 15,-30 33,-48 19,-19 38,-48 43,-65 6,-23 22,-40 55,-58 25,-15 56,-35 69,-44 23,-17 23,-18 6,-37 -32,-35 2,-89 49,-77 30,8 44,50 26,78 -16,26 -2,42 61,74 48,24 68,48 68,81 0,10 14,26 30,35 20,11 33,28 37,48 3,18 12,34 19,37 18,7 18,47 0,62 -12,10 -14,53 -13,232 1,198 2,221 19,236 22,20 23,37 1,54 -9,8 -22,29 -30,47 -7,18 -26,40 -42,50 -22,13 -26,22 -21,37 11,30 -6,53 -49,65 -42,11 -91,45 -91,62 0,6 7,20 16,29 41,46 -2,124 -61,111 z m 50,-62 c 0,-34 -1,-35 -40,-35 -34,0 -40,3 -43,23 -5,33 16,54 52,50 28,-3 31,-6 31,-38 z m 8,-447 c 19,-42 22,-65 22,-178 0,-113 -3,-136 -22,-177 -38,-84 -79,-57 -102,67 -14,75 -14,145 0,220 23,124 64,151 102,68 z M 296,864 c 13,-44 15,-86 12,-188 -5,-131 -18,-186 -44,-186 -50,0 -60,359 -12,417 19,23 27,14 44,-43 z m 324,29 c 20,-41 25,-295 8,-353 -17,-56 -41,-63 -58,-18 -17,47 -24,242 -11,312 16,87 38,107 61,59 z"/>
      <path d="m 1340,1350 c -26,-26 -26,-65 0,-97 19,-24 19,-27 4,-44 -9,-10 -36,-28 -60,-40 -24,-11 -55,-34 -68,-50 -14,-16 -32,-29 -40,-29 -20,0 -21,-19 -1,-26 25,-10 18,-41 -45,-199 -32,-83 -67,-182 -76,-220 -30,-130 -4,-220 86,-296 49,-41 65,-79 35,-79 -8,0 -15,-9 -15,-20 0,-11 7,-20 15,-20 8,0 35,-16 61,-35 25,-19 51,-35 58,-35 16,0 76,-56 76,-70 0,-6 4,-10 9,-10 14,0 61,45 61,58 0,5 11,13 24,16 13,3 45,21 72,39 27,18 57,36 67,40 21,8 22,26 2,33 -23,9 -18,50 8,67 76,50 116,123 117,211 0,82 -22,164 -91,335 -62,153 -69,181 -44,181 8,0 15,7 15,15 0,8 -6,15 -13,15 -7,0 -28,15 -46,34 -19,19 -48,40 -65,47 -17,7 -40,23 -52,34 -20,22 -20,23 -2,45 26,32 24,85 -4,104 -31,22 -64,20 -88,-4 z m 79,-14 c 7,-8 11,-27 9,-42 -3,-25 -7,-27 -43,-27 -37,0 -40,2 -43,28 -6,46 50,74 77,41 z M 1207,838 c -52,-175 -60,-292 -28,-398 12,-40 20,-74 18,-76 -11,-11 -87,71 -97,104 -26,96 -8,196 73,400 29,73 45,102 57,102 15,0 12,-18 -23,-132 z m 261,15 c 51,-194 67,-353 41,-420 -22,-58 -41,-68 -125,-67 -63,1 -80,5 -92,20 -45,60 -52,128 -27,284 14,85 60,273 72,293 2,4 26,7 52,7 h 48 z m 122,40 c 69,-164 92,-245 93,-323 2,-98 -14,-144 -66,-181 -22,-16 -42,-28 -44,-26 -2,2 6,30 17,62 42,123 37,204 -26,417 -39,136 -38,128 -20,128 8,0 28,-33 46,-77 z"/>
      <path d="m 2299,1352 c -27,-23 -30,-73 -6,-100 23,-26 22,-29 -18,-36 -19,-4 -48,-18 -64,-32 -30,-25 -76,-127 -67,-149 6,-16 -45,-65 -67,-65 -19,0 -22,-11 -6,-27 8,-8 7,-27 -2,-69 -18,-83 -16,-284 4,-364 9,-37 12,-66 6,-68 -19,-7 -7,-38 24,-57 18,-11 32,-27 33,-35 0,-8 8,-38 18,-67 21,-63 71,-110 125,-119 33,-5 37,-9 33,-30 -4,-23 12,-54 29,-54 18,0 40,34 35,54 -5,19 1,24 40,34 25,7 58,25 73,40 28,28 66,125 56,142 -4,6 -3,10 2,10 4,1 23,14 42,30 27,23 32,32 23,43 -9,10 -8,31 3,83 18,87 19,269 1,354 -8,36 -10,66 -5,68 14,5 11,32 -3,32 -23,1 -70,50 -64,66 3,8 2,22 -3,32 -54,112 -56,114 -95,132 -23,10 -50,21 -60,25 -18,5 -18,6 2,26 65,60 -20,156 -89,101 z m 75,-18 c 34,-34 16,-70 -34,-68 -31,1 -35,4 -38,29 -6,46 41,71 72,39 z M 2176,868 c -22,-108 -27,-191 -17,-275 14,-116 15,-113 -13,-113 -22,0 -25,5 -36,87 -12,83 -9,237 6,306 5,22 12,27 36,27 29,0 30,-2 24,-32 z m 244,-15 c 19,-76 23,-211 8,-293 l -13,-75 -71,-3 -71,-3 -12,57 c -19,96 -9,316 16,357 2,4 33,7 67,7 h 64 z m 144,38 c 16,-25 26,-201 16,-287 -12,-114 -16,-124 -47,-124 -22,0 -24,3 -19,23 16,50 18,252 4,320 -8,37 -12,69 -10,72 9,8 50,6 56,-4 z"/>
    </g>
  </svg>`;
}
function m0(e) {
  return `<svg viewBox="0 0 36 36" height="34" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="flex-shrink:0;display:block">
    <path d="M18 3 C9 3 4 10 4 18 C4 26 9 33 18 33 C12 29 10 24 10 18 C10 12 12 7 18 3 Z" fill="var(--ro-banner-icon, ${e})"/>
    <polygon points="26,10 27.2,13.5 31,13.5 28,15.5 29.2,19 26,17 22.8,19 24,15.5 21,13.5 24.8,13.5" fill="var(--ro-banner-icon, ${e})"/>
    <circle cx="15" cy="11" r="1.4" fill="var(--ro-banner-icon, ${e})" opacity="0.85"/>
    <circle cx="28" cy="25" r="1.6" fill="var(--ro-banner-icon, ${e})" opacity="0.9"/>
  </svg>`;
}
function h0(e) {
  return `<svg viewBox="0 0 36 36" height="34" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="flex-shrink:0;display:block">
    <!-- Sacred Kaaba: strictly black cube with gold Kiswah belt and door, never themed -->
    <rect x="6" y="7" width="24" height="22" rx="1.5" fill="#121212"/>
    <!-- Marble Base (Shadherwan) -->
    <rect x="5.5" y="28.5" width="25" height="1.5" rx="0.5" fill="#e5e7eb" opacity="0.85"/>
    <!-- Kiswah Gold Belt -->
    <line x1="6" y1="13" x2="30" y2="13" stroke="#d4af37" stroke-width="2.5"/>
    <line x1="6" y1="16.5" x2="30" y2="16.5" stroke="#d4af37" stroke-width="0.8" stroke-dasharray="2 1" opacity="0.9"/>
    <!-- Golden Door (Bab al-Kaaba) -->
    <rect x="19" y="15" width="5" height="11" rx="0.5" fill="#d4af37"/>
    <line x1="21.5" y1="15" x2="21.5" y2="26" stroke="#997b1a" stroke-width="0.6"/>
    <!-- Golden Spout (Mizab al-Rahmah) -->
    <rect x="10" y="6" width="2.2" height="1.8" rx="0.3" fill="#d4af37"/>
  </svg>`;
}
const Si = 52;
function Os(e, t, n, r, o, a, i) {
  const s = document.createElement("div");
  (s.setAttribute("role", "banner"),
    s.setAttribute("aria-label", r),
    (s.style.cssText = [
      `background:var(--ro-banner-bg, ${e})`,
      "position:fixed",
      "left:0",
      "width:100%",
      `height:${Si}px`,
      "display:flex",
      "align-items:center",
      "justify-content:center",
      "overflow:hidden",
      `z-index:${a}`,
      "box-sizing:border-box",
      `${i}:0`,
    ].join(";")));
  const c = document.createElement("div");
  c.style.cssText = `display:flex;align-items:center;justify-content:center;gap:12px;max-width:960px;width:100%;padding:0 20px;direction:${o ? "rtl" : "ltr"}`;
  const u = document.createElement("span");
  ((u.style.cssText = "display:flex;align-items:center;flex-shrink:0"),
    (u.innerHTML = n));
  const v = document.createElement("span");
  return (
    (v.textContent = r),
    (v.style.cssText = [
      `color:var(--ro-banner-text, ${t})`,
      `font-family:${o ? "'Amiri','Scheherazade New',Georgia,serif" : "Georgia,'Times New Roman',serif"}`,
      "font-size:clamp(12px,1.6vw,15px)",
      "font-weight:500",
      "white-space:nowrap",
      "overflow:hidden",
      "text-overflow:ellipsis",
      "line-height:1.3",
      `letter-spacing:${o ? "0.02em" : "0.04em"}`,
    ].join(";")),
    c.appendChild(u),
    c.appendChild(v),
    s.appendChild(c),
    s
  );
}
function v0(e, t) {
  const n = e.bannerBg,
    r = e.bannerTextColor,
    o = e.bannerIconColor,
    a = e.zIndex,
    i = e.locale ?? "en",
    s = t === "eid-fitr" || t === "eid-adha" || t === "ramadan" ? t : "ramadan",
    c = _s(e.bannerTextEn, s),
    u = _s(e.bannerTextAr, s),
    v = p0[s],
    m = i === "ar" ? u || c || v.ar : c || u || v.en,
    f = i === "ar",
    h = [],
    g = document.body.style.paddingTop,
    S = document.body.style.paddingBottom,
    T = e.position !== "bottom",
    d =
      e.position === "bottom" || e.position === "both" || e.position === "full";
  let p;
  if (
    (s === "eid-fitr"
      ? (p = m0(o))
      : s === "eid-adha"
        ? (p = h0())
        : (p = f0(o)),
    T)
  ) {
    const x = Os(n, r, p, m, f, a, "top");
    (x.style.setProperty("--ro-banner-bg", n),
      x.style.setProperty("--ro-banner-text", r),
      x.style.setProperty("--ro-banner-icon", o),
      document.body.prepend(x),
      h.push(x));
    const C = parseFloat(getComputedStyle(document.body).paddingTop) || 0;
    document.body.style.paddingTop = `${C + Si}px`;
  }
  if (d) {
    const x = Os(n, r, p, m, f, a, "bottom");
    (x.style.setProperty("--ro-banner-bg", n),
      x.style.setProperty("--ro-banner-text", r),
      x.style.setProperty("--ro-banner-icon", o),
      document.body.appendChild(x),
      h.push(x));
    const C = parseFloat(getComputedStyle(document.body).paddingBottom) || 0;
    document.body.style.paddingBottom = `${C + Si}px`;
  }
  return {
    elements: h,
    cleanup: () => {
      (h.forEach((x) => x.remove()),
        (document.body.style.paddingTop = g),
        (document.body.style.paddingBottom = S));
    },
  };
}
function g0(e, t) {
  return `<svg width="${t}" height="${t}" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M20 3 C8 3 2 11 2 20 C2 29 8 37 20 37 C14 32 11 26 11 20 C11 14 14 8 20 3Z" fill="${e}"/>
  </svg>`;
}
function y0(e, t) {
  const n = [];
  for (let r = 0; r < 8; r++) {
    const i = (r * Math.PI) / 4,
      s = i + Math.PI / 8;
    (n.push(`${20 + 18 * Math.sin(i)},${20 - 18 * Math.cos(i)}`),
      n.push(`${20 + 9 * Math.sin(s)},${20 - 9 * Math.cos(s)}`));
  }
  return `<svg width="${t}" height="${t}" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <polygon points="${n.join(" ")}" fill="${e}"/>
  </svg>`;
}
const w0 = (e, t) => {
  const n = t.colors,
    r = [],
    o = bl(t.intensity, t.density),
    a = typeof window < "u" && window.innerWidth < 640,
    i = ic(o, a),
    { minDuration: s, maxDuration: c } = lc(o),
    u = a ? 0.7 : 1;
  for (let v = 0; v < i; v++) {
    const m = Math.random() < 0.35,
      f = n[Math.floor(Math.random() * Math.min(n.length, 4))] ?? "#c9a84c",
      h = (m ? 32 : 20) * u,
      g = h + Math.random() * h * 0.6,
      S = document.createElement("div");
    ((S.className = m ? "ro-crescent" : "ro-star"),
      (S.innerHTML = m ? g0(f, g) : y0(f, g)));
    const { x: T } = uc(t.position, t.clearance, a),
      d = s + Math.random() * (c - s),
      p = d.toFixed(1),
      w = (-Math.random() * d).toFixed(1),
      x = (10 + Math.random() * 16) * (Math.random() < 0.5 ? 1 : -1),
      C = (10 + Math.random() * 16) * (Math.random() < 0.5 ? 1 : -1),
      z = (8 + Math.random() * 14) * (Math.random() < 0.5 ? 1 : -1),
      j = (5 + Math.random() * 12) * (Math.random() < 0.5 ? 1 : -1),
      k = (5 + Math.random() * 12) * (Math.random() < 0.5 ? 1 : -1),
      A = (5 + Math.random() * 12) * (Math.random() < 0.5 ? 1 : -1);
    ((S.style.cssText = `
      left:${T}%;
      top:102%;
      --ro-float-duration:${p}s;
      --ro-sway-1:${x.toFixed(1)}px;
      --ro-sway-2:${C.toFixed(1)}px;
      --ro-sway-end:${z.toFixed(1)}px;
      --ro-rot-1:${j.toFixed(1)}deg;
      --ro-rot-2:${k.toFixed(1)}deg;
      --ro-rot-3:${A.toFixed(1)}deg;
      animation-delay:${w}s;
    `),
      e.appendChild(S),
      r.push(S));
  }
  return () => {
    r.forEach((v) => v.remove());
  };
};
function x0(e, t, n) {
  return `<svg width="${n}" height="${(n * 1.5).toFixed(0)}" viewBox="0 0 32 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="overflow:visible">
    <ellipse cx="16" cy="18" rx="13" ry="16" fill="${e}" opacity="0.95"/>
    <ellipse cx="12" cy="12" rx="3.5" ry="6" fill="white" opacity="0.3" transform="rotate(-20 12 12)"/>
    <polygon points="16,34 13,38 19,38" fill="${e}"/>
    <path d="M16 38 Q19 43 14 46 T16 52" stroke="${t}" fill="none" stroke-width="1.2" opacity="0.75"/>
  </svg>`;
}
function b0(e, t, n) {
  return `<svg width="${n}" height="${n}" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="4" y="10" width="24" height="18" rx="2" fill="${e}"/>
    <rect x="2" y="8" width="28" height="5" rx="1.5" fill="${t}"/>
    <rect x="14" y="8" width="4" height="20" fill="${t}"/>
    <path d="M16 8 C13 3 8 4 10 7 C13 9 16 8 16 8 C16 8 19 9 22 7 C24 4 19 3 16 8" fill="none" stroke="${t}" stroke-width="1.8"/>
  </svg>`;
}
function k0(e, t) {
  return `<svg width="${t}" height="${t}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 0 C12 7 17 12 24 12 C17 12 12 17 12 24 C12 17 7 12 0 12 C7 12 12 7 12 0 Z" fill="${e}"/>
  </svg>`;
}
function S0(e, t, n) {
  return `<svg width="${n}" height="${(n * 0.8).toFixed(0)}" viewBox="0 0 40 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- Legs -->
    <rect x="13" y="22" width="2.5" height="7" rx="1.2" fill="${t}"/>
    <rect x="23" y="22" width="2.5" height="7" rx="1.2" fill="${t}"/>
    <!-- Fluffy Wool Body -->
    <path d="M14 6 C16 4 20 4 22 6 C24 4 28 5 29 8 C32 9 34 12 33 15 C35 18 33 22 30 23 C28 25 24 25 22 24 C20 26 16 26 14 24 C12 25 8 24 6 22 C4 19 5 15 7 13 C5 10 8 7 11 7 C12 6 13 6 14 6 Z" fill="${e}"/>
    <!-- Head & Ears -->
    <ellipse cx="8" cy="14" rx="4" ry="5" fill="${t}"/>
    <ellipse cx="5" cy="11" rx="1.5" ry="3" transform="rotate(-30 5 11)" fill="${t}"/>
    <!-- Eye dot -->
    <circle cx="7" cy="13" r="0.8" fill="white"/>
  </svg>`;
}
function C0(e, t) {
  return `<svg width="${t}" height="${t}" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M20 3 C8 3 2 11 2 20 C2 29 8 37 20 37 C14 32 11 26 11 20 C11 14 14 8 20 3Z" fill="${e}"/>
    <polygon points="26,11 27.5,15.5 32,15.5 28.5,18 30,22 26,19.5 22,22 23.5,18 20,15.5 24.5,15.5" fill="${e}"/>
  </svg>`;
}
const Ta = (e, t, n) => {
  const r =
      t.variant === "eid-adha" || (t.variant === "eid" && n === "eid-adha"),
    o = t.colors,
    a = [],
    i = bl(t.intensity, t.density),
    s = typeof window < "u" && window.innerWidth < 640,
    c = ic(i, s),
    { minDuration: u, maxDuration: v } = lc(i),
    m = s ? 0.7 : 1;
  for (let f = 0; f < c; f++) {
    const h = document.createElement("div"),
      g = o[0] ?? "#c9a84c",
      S = o[1] ?? "#e8c96b",
      T = o[2] ?? "#2d5a27",
      d = o[Math.floor(Math.random() * o.length)] ?? g;
    if (r)
      Math.random() < 0.5
        ? ((h.className = "ro-sheep"),
          (h.innerHTML = S0("#f8f9fa", T, Math.round(36 * m))))
        : ((h.className = "ro-crescent"),
          (h.innerHTML = C0(S, Math.round(30 * m))));
    else {
      const I = Math.random();
      I < 0.45
        ? ((h.className = "ro-balloon"),
          (h.innerHTML = x0(d, g, Math.round(26 * m))))
        : I < 0.75
          ? ((h.className = "ro-gift"),
            (h.innerHTML = b0(d, S, Math.round(24 * m))))
          : ((h.className = "ro-star"),
            (h.innerHTML = k0(S, Math.round(18 * m))));
    }
    const { x: p } = uc(t.position, t.clearance, s),
      w = u + Math.random() * (v - u),
      x = w.toFixed(1),
      C = (-Math.random() * w).toFixed(1),
      z = (10 + Math.random() * 16) * (Math.random() < 0.5 ? 1 : -1),
      j = (10 + Math.random() * 16) * (Math.random() < 0.5 ? 1 : -1),
      k = (8 + Math.random() * 14) * (Math.random() < 0.5 ? 1 : -1),
      A = (5 + Math.random() * 12) * (Math.random() < 0.5 ? 1 : -1),
      M = (5 + Math.random() * 12) * (Math.random() < 0.5 ? 1 : -1),
      P = (5 + Math.random() * 12) * (Math.random() < 0.5 ? 1 : -1);
    ((h.style.cssText = `
      left:${p}%;
      top:102%;
      --ro-float-duration:${x}s;
      --ro-sway-1:${z.toFixed(1)}px;
      --ro-sway-2:${j.toFixed(1)}px;
      --ro-sway-end:${k.toFixed(1)}px;
      --ro-rot-1:${A.toFixed(1)}deg;
      --ro-rot-2:${M.toFixed(1)}deg;
      --ro-rot-3:${P.toFixed(1)}deg;
      animation-delay:${C}s;
    `),
      e.appendChild(h),
      a.push(h));
  }
  return () => {
    a.forEach((f) => f.remove());
  };
};
function Bs(e, t, n, r) {
  return `<svg width="${n}" height="${r}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <pattern id="ro-geo-tile" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <!-- 8-pointed star (inner) -->
        <polygon
          points="20,4 23.1,14.5 34,11.7 26.9,19.4 34,27.1 23.1,25.5 20,36 16.9,25.5 6,27.1 13.1,19.4 6,11.7 16.9,14.5"
          fill="none" stroke="${e}" stroke-width="1.2"/>
        <!-- Connecting girih lines -->
        <line x1="0" y1="20" x2="40" y2="20" stroke="${t}" stroke-width="0.5" opacity="0.5"/>
        <line x1="20" y1="0" x2="20" y2="40" stroke="${t}" stroke-width="0.5" opacity="0.5"/>
        <line x1="0" y1="0" x2="40" y2="40" stroke="${t}" stroke-width="0.4" opacity="0.35"/>
        <line x1="40" y1="0" x2="0" y2="40" stroke="${t}" stroke-width="0.4" opacity="0.35"/>
        <!-- Corner diamonds -->
        <polygon points="0,20 5,15 10,20 5,25" fill="${e}" opacity="0.6"/>
        <polygon points="40,20 35,15 30,20 35,25" fill="${e}" opacity="0.6"/>
        <polygon points="20,0 25,5 20,10 15,5" fill="${e}" opacity="0.6"/>
        <polygon points="20,40 25,35 20,30 15,35" fill="${e}" opacity="0.6"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#ro-geo-tile)"/>
  </svg>`;
}
const T0 = (e, t) => {
    const n = t.colors,
      r = n[0] ?? "#c9a84c",
      o = n[1] ?? "#e8c96b",
      a = Pn(t.position);
    if (a.length > 0) {
      const u = [];
      for (const v of a) {
        const m = document.createElement("div");
        m.className = `ro-side-band ro-side-band--${v}`;
        const f = `ro-geo-tile-${v}`;
        ((m.innerHTML = `<svg width="100%" height="100%" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <pattern id="${f}" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <polygon
              points="20,4 23.1,14.5 34,11.7 26.9,19.4 34,27.1 23.1,25.5 20,36 16.9,25.5 6,27.1 13.1,19.4 6,11.7 16.9,14.5"
              fill="none" stroke="var(--ro-color-1, ${r})" stroke-width="1.2"/>
            <line x1="0" y1="20" x2="40" y2="20" stroke="var(--ro-color-2, ${o})" stroke-width="0.5" opacity="0.5"/>
            <line x1="20" y1="0" x2="20" y2="40" stroke="var(--ro-color-2, ${o})" stroke-width="0.5" opacity="0.5"/>
            <line x1="0" y1="0" x2="40" y2="40" stroke="var(--ro-color-2, ${o})" stroke-width="0.4" opacity="0.35"/>
            <line x1="40" y1="0" x2="0" y2="40" stroke="var(--ro-color-2, ${o})" stroke-width="0.4" opacity="0.35"/>
            <polygon points="0,20 5,15 10,20 5,25" fill="var(--ro-color-1, ${r})" opacity="0.6"/>
            <polygon points="40,20 35,15 30,20 35,25" fill="var(--ro-color-1, ${r})" opacity="0.6"/>
            <polygon points="20,0 25,5 20,10 15,5" fill="var(--ro-color-1, ${r})" opacity="0.6"/>
            <polygon points="20,40 25,35 20,30 15,35" fill="var(--ro-color-1, ${r})" opacity="0.6"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#${f})"/>
      </svg>`),
          e.appendChild(m),
          u.push(m));
      }
      return () => {
        u.forEach((v) => v.remove());
      };
    }
    const i = [],
      s =
        t.position === "top"
          ? ["top"]
          : t.position === "bottom"
            ? ["bottom"]
            : t.position === "full"
              ? ["top", "bottom"]
              : ["top", "bottom"],
      c = Math.max(28, Math.min(56, Math.round(window.innerWidth * 0.035)));
    for (const u of s) {
      const v = document.createElement("div");
      ((v.className = `ro-geo-band ro-geo-band--${u}`),
        (v.innerHTML = Bs(r, o, window.innerWidth, c)),
        e.appendChild(v),
        i.push(v));
    }
    if (t.position === "full") {
      const u = document.createElement("div");
      ((u.style.cssText = `
      position:absolute;inset:0;width:100%;height:100%;opacity:0.08;overflow:hidden;
    `),
        (u.innerHTML = Bs(r, o, window.innerWidth, window.innerHeight)),
        e.appendChild(u),
        i.push(u));
    }
    return () => {
      i.forEach((u) => u.remove());
    };
  },
  Wn = [
    {
      viewBox: "0 0 63.543041 123.29771",
      gContent: `<g
     transform="matrix(0.1,0,0,-0.1,-12.131086,292.84161)"
     fill="LANTERN_COLOR"
     stroke="none"
     id="g6">
    <path
       d="m 396,2909 c -32,-25 -35,-71 -6,-96 11,-10 20,-21 20,-24 0,-4 -27,-24 -60,-44 -70,-42 -84,-64 -77,-115 4,-29 0,-41 -15,-54 -11,-10 -17,-23 -14,-31 4,-11 -9,-15 -57,-17 -50,-2 -62,-6 -65,-21 -3,-12 4,-20 17,-24 26,-7 22,8 66,-298 20,-137 38,-262 41,-277 5,-24 2,-28 -19,-28 -28,0 -55,-26 -41,-40 5,-4 20,-10 34,-12 16,-2 26,-11 30,-28 5,-21 13,-26 55,-30 58,-7 86,-20 113,-55 19,-24 21,-25 34,-8 30,40 59,56 115,62 55,6 58,8 63,36 3,17 9,29 13,28 4,-2 16,-3 28,-3 34,0 21,44 -13,48 -16,2 -28,7 -28,11 0,18 80,567 85,579 2,6 11,12 19,12 21,0 30,19 16,35 -8,10 -31,15 -66,15 -46,0 -54,3 -54,19 0,10 -7,24 -16,32 -10,8 -14,22 -10,40 10,50 -11,86 -70,119 -29,17 -56,35 -59,41 -4,5 3,21 14,35 27,35 26,59 -4,89 -30,30 -54,31 -89,4 z m 74,-19 c 33,-33 19,-63 -32,-64 -48,-2 -66,35 -32,68 21,21 40,20 64,-4 z M 265,2375 c 24,-23 30,-45 25,-88 -1,-10 6,-27 15,-37 23,-25 44,-302 25,-325 -22,-27 -49,-18 -54,18 -12,69 -56,417 -56,436 0,28 16,26 45,-4 z m 212,3 c 27,-30 32,-47 22,-81 -5,-19 -4,-36 5,-50 11,-18 12,-52 5,-166 -5,-80 -14,-150 -20,-157 -13,-16 -76,-19 -98,-5 -10,6 -16,50 -23,161 -9,136 -8,153 7,170 13,15 14,22 5,40 -14,27 -6,64 20,90 26,26 52,25 77,-2 z m 183,15 c 0,-5 -14,-111 -30,-237 -17,-126 -30,-234 -30,-238 0,-5 -12,-8 -27,-6 -35,4 -37,15 -28,187 6,106 11,137 24,150 12,12 16,28 13,54 -3,30 1,42 26,67 29,29 52,39 52,23 z"
       id="path1" />
    <path
       d="m 2320,2907 c -13,-7 -29,-25 -34,-40 -8,-22 -6,-33 13,-57 12,-17 21,-39 19,-48 -2,-10 -31,-30 -67,-48 -69,-33 -86,-53 -77,-89 5,-19 2,-24 -16,-27 -15,-2 -26,-16 -37,-45 -11,-33 -20,-43 -37,-43 -29,0 -38,-27 -19,-56 22,-33 22,-489 0,-518 -16,-21 -4,-56 20,-56 7,0 21,-24 32,-57 18,-52 23,-58 50,-61 23,-2 34,-11 46,-38 l 17,-34 h 124 124 l 12,34 c 9,29 17,35 43,38 29,3 33,8 48,57 10,36 23,57 36,62 27,10 35,33 18,56 -22,28 -21,484 0,517 19,29 10,56 -19,56 -16,0 -25,10 -36,43 -12,33 -20,42 -38,41 -20,-1 -22,3 -17,27 9,41 -5,58 -76,93 -71,34 -84,59 -49,91 54,49 -13,136 -80,102 z m 75,-38 c 4,-5 4,-20 1,-32 -4,-19 -12,-22 -45,-22 -43,0 -56,13 -45,47 11,36 69,41 89,7 z m -1,-460 36,-21 v -214 -214 h -80 -80 v 214 214 l 33,20 c 41,26 49,26 91,1 z m -194,-14 30,-16 v -209 -210 h -39 c -22,0 -46,-3 -55,-6 -14,-5 -16,16 -16,202 0,203 1,209 23,231 27,27 22,26 57,8 z m 357,-7 c 23,-21 23,-25 23,-228 v -206 l -42,2 c -24,2 -49,3 -55,3 -10,1 -13,50 -13,211 v 209 l 28,15 c 35,19 32,20 59,-6 z"
       id="path2" />
    <path
       d="m 1352,2884 c -26,-18 -30,-69 -6,-95 14,-16 14,-20 -1,-48 -8,-17 -20,-31 -25,-31 -18,0 -48,-42 -54,-75 -4,-18 -18,-44 -31,-57 -14,-13 -25,-34 -25,-50 0,-16 -20,-59 -45,-97 l -44,-70 61,-223 c 34,-123 63,-251 66,-285 2,-37 8,-63 15,-63 16,0 67,-51 67,-67 0,-9 18,-13 63,-13 59,0 63,1 75,29 7,17 26,36 42,43 26,11 29,17 32,73 3,50 54,254 113,457 l 13,46 -44,72 c -24,40 -44,84 -44,100 0,16 -8,33 -20,41 -11,8 -28,37 -38,64 -12,34 -28,57 -49,70 -36,23 -48,62 -27,86 22,25 18,75 -8,93 -12,9 -32,16 -43,16 -11,0 -31,-7 -43,-16 z m 78,-18 c 6,-8 10,-25 8,-37 -2,-19 -10,-24 -45,-26 -41,-3 -43,-1 -43,25 0,15 5,33 12,40 16,16 53,15 68,-2 z m -4,-544 c 12,-9 29,-31 37,-47 14,-28 14,-46 -3,-185 -11,-85 -19,-163 -20,-172 0,-15 -9,-18 -45,-18 -25,0 -45,3 -45,8 0,4 -9,81 -20,171 -18,152 -18,166 -3,198 15,33 48,63 68,63 5,0 20,-8 31,-18 z m -175,-50 c 5,-12 18,-86 29,-165 11,-78 23,-157 27,-175 5,-29 3,-33 -12,-30 -13,2 -29,43 -66,173 -51,181 -55,205 -38,236 10,20 11,20 31,2 11,-10 24,-28 29,-41 z m 349,27 c 12,-27 9,-44 -19,-147 -63,-227 -71,-252 -86,-252 -8,0 -15,2 -15,4 0,2 11,84 25,182 20,140 30,186 48,211 12,18 25,33 28,33 4,0 12,-14 19,-31 z"
       id="path3" />
    <path
       d="m 415,1392 c -54,-11 -75,-81 -35,-117 11,-10 20,-24 20,-31 0,-11 -72,-51 -124,-68 -15,-5 -17,-13 -13,-40 4,-28 1,-36 -18,-46 -13,-7 -31,-27 -39,-45 -9,-18 -22,-38 -31,-45 -19,-16 -19,-54 0,-70 13,-10 15,-49 15,-235 0,-189 -2,-224 -15,-229 -19,-7 -19,-40 0,-56 8,-7 15,-19 15,-27 0,-8 15,-30 33,-48 19,-19 38,-48 43,-65 6,-23 22,-40 55,-58 25,-15 56,-35 69,-44 23,-17 23,-18 6,-37 -32,-35 2,-89 49,-77 30,8 44,50 26,78 -16,26 -2,42 61,74 48,24 68,48 68,81 0,10 14,26 30,35 20,11 33,28 37,48 3,18 12,34 19,37 18,7 18,47 0,62 -12,10 -14,53 -13,232 1,198 2,221 19,236 22,20 23,37 1,54 -9,8 -22,29 -30,47 -7,18 -26,40 -42,50 -22,13 -26,22 -21,37 11,30 -6,53 -49,65 -42,11 -91,45 -91,62 0,6 7,20 16,29 41,46 -2,124 -61,111 z m 50,-62 c 0,-34 -1,-35 -40,-35 -34,0 -40,3 -43,23 -5,33 16,54 52,50 28,-3 31,-6 31,-38 z m 8,-447 c 19,-42 22,-65 22,-178 0,-113 -3,-136 -22,-177 -38,-84 -79,-57 -102,67 -14,75 -14,145 0,220 23,124 64,151 102,68 z M 296,864 c 13,-44 15,-86 12,-188 -5,-131 -18,-186 -44,-186 -50,0 -60,359 -12,417 19,23 27,14 44,-43 z m 324,29 c 20,-41 25,-295 8,-353 -17,-56 -41,-63 -58,-18 -17,47 -24,242 -11,312 16,87 38,107 61,59 z"
       id="path4" />
    <path
       d="m 1340,1350 c -26,-26 -26,-65 0,-97 19,-24 19,-27 4,-44 -9,-10 -36,-28 -60,-40 -24,-11 -55,-34 -68,-50 -14,-16 -32,-29 -40,-29 -20,0 -21,-19 -1,-26 25,-10 18,-41 -45,-199 -32,-83 -67,-182 -76,-220 -30,-130 -4,-220 86,-296 49,-41 65,-79 35,-79 -8,0 -15,-9 -15,-20 0,-11 7,-20 15,-20 8,0 35,-16 61,-35 25,-19 51,-35 58,-35 16,0 76,-56 76,-70 0,-6 4,-10 9,-10 14,0 61,45 61,58 0,5 11,13 24,16 13,3 45,21 72,39 27,18 57,36 67,40 21,8 22,26 2,33 -23,9 -18,50 8,67 76,50 116,123 117,211 0,82 -22,164 -91,335 -62,153 -69,181 -44,181 8,0 15,7 15,15 0,8 -6,15 -13,15 -7,0 -28,15 -46,34 -19,19 -48,40 -65,47 -17,7 -40,23 -52,34 -20,22 -20,23 -2,45 26,32 24,85 -4,104 -31,22 -64,20 -88,-4 z m 79,-14 c 7,-8 11,-27 9,-42 -3,-25 -7,-27 -43,-27 -37,0 -40,2 -43,28 -6,46 50,74 77,41 z M 1207,838 c -52,-175 -60,-292 -28,-398 12,-40 20,-74 18,-76 -11,-11 -87,71 -97,104 -26,96 -8,196 73,400 29,73 45,102 57,102 15,0 12,-18 -23,-132 z m 261,15 c 51,-194 67,-353 41,-420 -22,-58 -41,-68 -125,-67 -63,1 -80,5 -92,20 -45,60 -52,128 -27,284 14,85 60,273 72,293 2,4 26,7 52,7 h 48 z m 122,40 c 69,-164 92,-245 93,-323 2,-98 -14,-144 -66,-181 -22,-16 -42,-28 -44,-26 -2,2 6,30 17,62 42,123 37,204 -26,417 -39,136 -38,128 -20,128 8,0 28,-33 46,-77 z"
       id="path5" />
    <path
       d="m 2299,1352 c -27,-23 -30,-73 -6,-100 23,-26 22,-29 -18,-36 -19,-4 -48,-18 -64,-32 -30,-25 -76,-127 -67,-149 6,-16 -45,-65 -67,-65 -19,0 -22,-11 -6,-27 8,-8 7,-27 -2,-69 -18,-83 -16,-284 4,-364 9,-37 12,-66 6,-68 -19,-7 -7,-38 24,-57 18,-11 32,-27 33,-35 0,-8 8,-38 18,-67 21,-63 71,-110 125,-119 33,-5 37,-9 33,-30 -4,-23 12,-54 29,-54 18,0 40,34 35,54 -5,19 1,24 40,34 25,7 58,25 73,40 28,28 66,125 56,142 -4,6 -3,10 2,10 4,1 23,14 42,30 27,23 32,32 23,43 -9,10 -8,31 3,83 18,87 19,269 1,354 -8,36 -10,66 -5,68 14,5 11,32 -3,32 -23,1 -70,50 -64,66 3,8 2,22 -3,32 -54,112 -56,114 -95,132 -23,10 -50,21 -60,25 -18,5 -18,6 2,26 65,60 -20,156 -89,101 z m 75,-18 c 34,-34 16,-70 -34,-68 -31,1 -35,4 -38,29 -6,46 41,71 72,39 z M 2176,868 c -22,-108 -27,-191 -17,-275 14,-116 15,-113 -13,-113 -22,0 -25,5 -36,87 -12,83 -9,237 6,306 5,22 12,27 36,27 29,0 30,-2 24,-32 z m 244,-15 c 19,-76 23,-211 8,-293 l -13,-75 -71,-3 -71,-3 -12,57 c -19,96 -9,316 16,357 2,4 33,7 67,7 h 64 z m 144,38 c 16,-25 26,-201 16,-287 -12,-114 -16,-124 -47,-124 -22,0 -24,3 -19,23 16,50 18,252 4,320 -8,37 -12,69 -10,72 9,8 50,6 56,-4 z"
       id="path6" />
  </g>`,
    },
    {
      viewBox: "0 0 59.001457 122.46818",
      gContent: `<g
     transform="matrix(0.1,0,0,-0.1,-205.49927,291.46818)"
     fill="LANTERN_COLOR"
     stroke="none"
     id="g6">
    <path
       d="m 396,2909 c -32,-25 -35,-71 -6,-96 11,-10 20,-21 20,-24 0,-4 -27,-24 -60,-44 -70,-42 -84,-64 -77,-115 4,-29 0,-41 -15,-54 -11,-10 -17,-23 -14,-31 4,-11 -9,-15 -57,-17 -50,-2 -62,-6 -65,-21 -3,-12 4,-20 17,-24 26,-7 22,8 66,-298 20,-137 38,-262 41,-277 5,-24 2,-28 -19,-28 -28,0 -55,-26 -41,-40 5,-4 20,-10 34,-12 16,-2 26,-11 30,-28 5,-21 13,-26 55,-30 58,-7 86,-20 113,-55 19,-24 21,-25 34,-8 30,40 59,56 115,62 55,6 58,8 63,36 3,17 9,29 13,28 4,-2 16,-3 28,-3 34,0 21,44 -13,48 -16,2 -28,7 -28,11 0,18 80,567 85,579 2,6 11,12 19,12 21,0 30,19 16,35 -8,10 -31,15 -66,15 -46,0 -54,3 -54,19 0,10 -7,24 -16,32 -10,8 -14,22 -10,40 10,50 -11,86 -70,119 -29,17 -56,35 -59,41 -4,5 3,21 14,35 27,35 26,59 -4,89 -30,30 -54,31 -89,4 z m 74,-19 c 33,-33 19,-63 -32,-64 -48,-2 -66,35 -32,68 21,21 40,20 64,-4 z M 265,2375 c 24,-23 30,-45 25,-88 -1,-10 6,-27 15,-37 23,-25 44,-302 25,-325 -22,-27 -49,-18 -54,18 -12,69 -56,417 -56,436 0,28 16,26 45,-4 z m 212,3 c 27,-30 32,-47 22,-81 -5,-19 -4,-36 5,-50 11,-18 12,-52 5,-166 -5,-80 -14,-150 -20,-157 -13,-16 -76,-19 -98,-5 -10,6 -16,50 -23,161 -9,136 -8,153 7,170 13,15 14,22 5,40 -14,27 -6,64 20,90 26,26 52,25 77,-2 z m 183,15 c 0,-5 -14,-111 -30,-237 -17,-126 -30,-234 -30,-238 0,-5 -12,-8 -27,-6 -35,4 -37,15 -28,187 6,106 11,137 24,150 12,12 16,28 13,54 -3,30 1,42 26,67 29,29 52,39 52,23 z"
       id="path1" />
    <path
       d="m 2320,2907 c -13,-7 -29,-25 -34,-40 -8,-22 -6,-33 13,-57 12,-17 21,-39 19,-48 -2,-10 -31,-30 -67,-48 -69,-33 -86,-53 -77,-89 5,-19 2,-24 -16,-27 -15,-2 -26,-16 -37,-45 -11,-33 -20,-43 -37,-43 -29,0 -38,-27 -19,-56 22,-33 22,-489 0,-518 -16,-21 -4,-56 20,-56 7,0 21,-24 32,-57 18,-52 23,-58 50,-61 23,-2 34,-11 46,-38 l 17,-34 h 124 124 l 12,34 c 9,29 17,35 43,38 29,3 33,8 48,57 10,36 23,57 36,62 27,10 35,33 18,56 -22,28 -21,484 0,517 19,29 10,56 -19,56 -16,0 -25,10 -36,43 -12,33 -20,42 -38,41 -20,-1 -22,3 -17,27 9,41 -5,58 -76,93 -71,34 -84,59 -49,91 54,49 -13,136 -80,102 z m 75,-38 c 4,-5 4,-20 1,-32 -4,-19 -12,-22 -45,-22 -43,0 -56,13 -45,47 11,36 69,41 89,7 z m -1,-460 36,-21 v -214 -214 h -80 -80 v 214 214 l 33,20 c 41,26 49,26 91,1 z m -194,-14 30,-16 v -209 -210 h -39 c -22,0 -46,-3 -55,-6 -14,-5 -16,16 -16,202 0,203 1,209 23,231 27,27 22,26 57,8 z m 357,-7 c 23,-21 23,-25 23,-228 v -206 l -42,2 c -24,2 -49,3 -55,3 -10,1 -13,50 -13,211 v 209 l 28,15 c 35,19 32,20 59,-6 z"
       id="path2" />
    <path
       d="m 1352,2884 c -26,-18 -30,-69 -6,-95 14,-16 14,-20 -1,-48 -8,-17 -20,-31 -25,-31 -18,0 -48,-42 -54,-75 -4,-18 -18,-44 -31,-57 -14,-13 -25,-34 -25,-50 0,-16 -20,-59 -45,-97 l -44,-70 61,-223 c 34,-123 63,-251 66,-285 2,-37 8,-63 15,-63 16,0 67,-51 67,-67 0,-9 18,-13 63,-13 59,0 63,1 75,29 7,17 26,36 42,43 26,11 29,17 32,73 3,50 54,254 113,457 l 13,46 -44,72 c -24,40 -44,84 -44,100 0,16 -8,33 -20,41 -11,8 -28,37 -38,64 -12,34 -28,57 -49,70 -36,23 -48,62 -27,86 22,25 18,75 -8,93 -12,9 -32,16 -43,16 -11,0 -31,-7 -43,-16 z m 78,-18 c 6,-8 10,-25 8,-37 -2,-19 -10,-24 -45,-26 -41,-3 -43,-1 -43,25 0,15 5,33 12,40 16,16 53,15 68,-2 z m -4,-544 c 12,-9 29,-31 37,-47 14,-28 14,-46 -3,-185 -11,-85 -19,-163 -20,-172 0,-15 -9,-18 -45,-18 -25,0 -45,3 -45,8 0,4 -9,81 -20,171 -18,152 -18,166 -3,198 15,33 48,63 68,63 5,0 20,-8 31,-18 z m -175,-50 c 5,-12 18,-86 29,-165 11,-78 23,-157 27,-175 5,-29 3,-33 -12,-30 -13,2 -29,43 -66,173 -51,181 -55,205 -38,236 10,20 11,20 31,2 11,-10 24,-28 29,-41 z m 349,27 c 12,-27 9,-44 -19,-147 -63,-227 -71,-252 -86,-252 -8,0 -15,2 -15,4 0,2 11,84 25,182 20,140 30,186 48,211 12,18 25,33 28,33 4,0 12,-14 19,-31 z"
       id="path3" />
    <path
       d="m 415,1392 c -54,-11 -75,-81 -35,-117 11,-10 20,-24 20,-31 0,-11 -72,-51 -124,-68 -15,-5 -17,-13 -13,-40 4,-28 1,-36 -18,-46 -13,-7 -31,-27 -39,-45 -9,-18 -22,-38 -31,-45 -19,-16 -19,-54 0,-70 13,-10 15,-49 15,-235 0,-189 -2,-224 -15,-229 -19,-7 -19,-40 0,-56 8,-7 15,-19 15,-27 0,-8 15,-30 33,-48 19,-19 38,-48 43,-65 6,-23 22,-40 55,-58 25,-15 56,-35 69,-44 23,-17 23,-18 6,-37 -32,-35 2,-89 49,-77 30,8 44,50 26,78 -16,26 -2,42 61,74 48,24 68,48 68,81 0,10 14,26 30,35 20,11 33,28 37,48 3,18 12,34 19,37 18,7 18,47 0,62 -12,10 -14,53 -13,232 1,198 2,221 19,236 22,20 23,37 1,54 -9,8 -22,29 -30,47 -7,18 -26,40 -42,50 -22,13 -26,22 -21,37 11,30 -6,53 -49,65 -42,11 -91,45 -91,62 0,6 7,20 16,29 41,46 -2,124 -61,111 z m 50,-62 c 0,-34 -1,-35 -40,-35 -34,0 -40,3 -43,23 -5,33 16,54 52,50 28,-3 31,-6 31,-38 z m 8,-447 c 19,-42 22,-65 22,-178 0,-113 -3,-136 -22,-177 -38,-84 -79,-57 -102,67 -14,75 -14,145 0,220 23,124 64,151 102,68 z M 296,864 c 13,-44 15,-86 12,-188 -5,-131 -18,-186 -44,-186 -50,0 -60,359 -12,417 19,23 27,14 44,-43 z m 324,29 c 20,-41 25,-295 8,-353 -17,-56 -41,-63 -58,-18 -17,47 -24,242 -11,312 16,87 38,107 61,59 z"
       id="path4" />
    <path
       d="m 1340,1350 c -26,-26 -26,-65 0,-97 19,-24 19,-27 4,-44 -9,-10 -36,-28 -60,-40 -24,-11 -55,-34 -68,-50 -14,-16 -32,-29 -40,-29 -20,0 -21,-19 -1,-26 25,-10 18,-41 -45,-199 -32,-83 -67,-182 -76,-220 -30,-130 -4,-220 86,-296 49,-41 65,-79 35,-79 -8,0 -15,-9 -15,-20 0,-11 7,-20 15,-20 8,0 35,-16 61,-35 25,-19 51,-35 58,-35 16,0 76,-56 76,-70 0,-6 4,-10 9,-10 14,0 61,45 61,58 0,5 11,13 24,16 13,3 45,21 72,39 27,18 57,36 67,40 21,8 22,26 2,33 -23,9 -18,50 8,67 76,50 116,123 117,211 0,82 -22,164 -91,335 -62,153 -69,181 -44,181 8,0 15,7 15,15 0,8 -6,15 -13,15 -7,0 -28,15 -46,34 -19,19 -48,40 -65,47 -17,7 -40,23 -52,34 -20,22 -20,23 -2,45 26,32 24,85 -4,104 -31,22 -64,20 -88,-4 z m 79,-14 c 7,-8 11,-27 9,-42 -3,-25 -7,-27 -43,-27 -37,0 -40,2 -43,28 -6,46 50,74 77,41 z M 1207,838 c -52,-175 -60,-292 -28,-398 12,-40 20,-74 18,-76 -11,-11 -87,71 -97,104 -26,96 -8,196 73,400 29,73 45,102 57,102 15,0 12,-18 -23,-132 z m 261,15 c 51,-194 67,-353 41,-420 -22,-58 -41,-68 -125,-67 -63,1 -80,5 -92,20 -45,60 -52,128 -27,284 14,85 60,273 72,293 2,4 26,7 52,7 h 48 z m 122,40 c 69,-164 92,-245 93,-323 2,-98 -14,-144 -66,-181 -22,-16 -42,-28 -44,-26 -2,2 6,30 17,62 42,123 37,204 -26,417 -39,136 -38,128 -20,128 8,0 28,-33 46,-77 z"
       id="path5" />
    <path
       d="m 2299,1352 c -27,-23 -30,-73 -6,-100 23,-26 22,-29 -18,-36 -19,-4 -48,-18 -64,-32 -30,-25 -76,-127 -67,-149 6,-16 -45,-65 -67,-65 -19,0 -22,-11 -6,-27 8,-8 7,-27 -2,-69 -18,-83 -16,-284 4,-364 9,-37 12,-66 6,-68 -19,-7 -7,-38 24,-57 18,-11 32,-27 33,-35 0,-8 8,-38 18,-67 21,-63 71,-110 125,-119 33,-5 37,-9 33,-30 -4,-23 12,-54 29,-54 18,0 40,34 35,54 -5,19 1,24 40,34 25,7 58,25 73,40 28,28 66,125 56,142 -4,6 -3,10 2,10 4,1 23,14 42,30 27,23 32,32 23,43 -9,10 -8,31 3,83 18,87 19,269 1,354 -8,36 -10,66 -5,68 14,5 11,32 -3,32 -23,1 -70,50 -64,66 3,8 2,22 -3,32 -54,112 -56,114 -95,132 -23,10 -50,21 -60,25 -18,5 -18,6 2,26 65,60 -20,156 -89,101 z m 75,-18 c 34,-34 16,-70 -34,-68 -31,1 -35,4 -38,29 -6,46 41,71 72,39 z M 2176,868 c -22,-108 -27,-191 -17,-275 14,-116 15,-113 -13,-113 -22,0 -25,5 -36,87 -12,83 -9,237 6,306 5,22 12,27 36,27 29,0 30,-2 24,-32 z m 244,-15 c 19,-76 23,-211 8,-293 l -13,-75 -71,-3 -71,-3 -12,57 c -19,96 -9,316 16,357 2,4 33,7 67,7 h 64 z m 144,38 c 16,-25 26,-201 16,-287 -12,-114 -16,-124 -47,-124 -22,0 -24,3 -19,23 16,50 18,252 4,320 -8,37 -12,69 -10,72 9,8 50,6 56,-4 z"
       id="path6" />
  </g>`,
    },
    {
      viewBox: "0 0 54.700001 119.00001",
      gContent: `<g
     transform="matrix(0.1,0,0,-0.1,-112.1,290)"
     fill="LANTERN_COLOR"
     stroke="none"
     id="g6">
    <path
       d="m 396,2909 c -32,-25 -35,-71 -6,-96 11,-10 20,-21 20,-24 0,-4 -27,-24 -60,-44 -70,-42 -84,-64 -77,-115 4,-29 0,-41 -15,-54 -11,-10 -17,-23 -14,-31 4,-11 -9,-15 -57,-17 -50,-2 -62,-6 -65,-21 -3,-12 4,-20 17,-24 26,-7 22,8 66,-298 20,-137 38,-262 41,-277 5,-24 2,-28 -19,-28 -28,0 -55,-26 -41,-40 5,-4 20,-10 34,-12 16,-2 26,-11 30,-28 5,-21 13,-26 55,-30 58,-7 86,-20 113,-55 19,-24 21,-25 34,-8 30,40 59,56 115,62 55,6 58,8 63,36 3,17 9,29 13,28 4,-2 16,-3 28,-3 34,0 21,44 -13,48 -16,2 -28,7 -28,11 0,18 80,567 85,579 2,6 11,12 19,12 21,0 30,19 16,35 -8,10 -31,15 -66,15 -46,0 -54,3 -54,19 0,10 -7,24 -16,32 -10,8 -14,22 -10,40 10,50 -11,86 -70,119 -29,17 -56,35 -59,41 -4,5 3,21 14,35 27,35 26,59 -4,89 -30,30 -54,31 -89,4 z m 74,-19 c 33,-33 19,-63 -32,-64 -48,-2 -66,35 -32,68 21,21 40,20 64,-4 z M 265,2375 c 24,-23 30,-45 25,-88 -1,-10 6,-27 15,-37 23,-25 44,-302 25,-325 -22,-27 -49,-18 -54,18 -12,69 -56,417 -56,436 0,28 16,26 45,-4 z m 212,3 c 27,-30 32,-47 22,-81 -5,-19 -4,-36 5,-50 11,-18 12,-52 5,-166 -5,-80 -14,-150 -20,-157 -13,-16 -76,-19 -98,-5 -10,6 -16,50 -23,161 -9,136 -8,153 7,170 13,15 14,22 5,40 -14,27 -6,64 20,90 26,26 52,25 77,-2 z m 183,15 c 0,-5 -14,-111 -30,-237 -17,-126 -30,-234 -30,-238 0,-5 -12,-8 -27,-6 -35,4 -37,15 -28,187 6,106 11,137 24,150 12,12 16,28 13,54 -3,30 1,42 26,67 29,29 52,39 52,23 z"
       id="path1" />
    <path
       d="m 2320,2907 c -13,-7 -29,-25 -34,-40 -8,-22 -6,-33 13,-57 12,-17 21,-39 19,-48 -2,-10 -31,-30 -67,-48 -69,-33 -86,-53 -77,-89 5,-19 2,-24 -16,-27 -15,-2 -26,-16 -37,-45 -11,-33 -20,-43 -37,-43 -29,0 -38,-27 -19,-56 22,-33 22,-489 0,-518 -16,-21 -4,-56 20,-56 7,0 21,-24 32,-57 18,-52 23,-58 50,-61 23,-2 34,-11 46,-38 l 17,-34 h 124 124 l 12,34 c 9,29 17,35 43,38 29,3 33,8 48,57 10,36 23,57 36,62 27,10 35,33 18,56 -22,28 -21,484 0,517 19,29 10,56 -19,56 -16,0 -25,10 -36,43 -12,33 -20,42 -38,41 -20,-1 -22,3 -17,27 9,41 -5,58 -76,93 -71,34 -84,59 -49,91 54,49 -13,136 -80,102 z m 75,-38 c 4,-5 4,-20 1,-32 -4,-19 -12,-22 -45,-22 -43,0 -56,13 -45,47 11,36 69,41 89,7 z m -1,-460 36,-21 v -214 -214 h -80 -80 v 214 214 l 33,20 c 41,26 49,26 91,1 z m -194,-14 30,-16 v -209 -210 h -39 c -22,0 -46,-3 -55,-6 -14,-5 -16,16 -16,202 0,203 1,209 23,231 27,27 22,26 57,8 z m 357,-7 c 23,-21 23,-25 23,-228 v -206 l -42,2 c -24,2 -49,3 -55,3 -10,1 -13,50 -13,211 v 209 l 28,15 c 35,19 32,20 59,-6 z"
       id="path2" />
    <path
       d="m 1352,2884 c -26,-18 -30,-69 -6,-95 14,-16 14,-20 -1,-48 -8,-17 -20,-31 -25,-31 -18,0 -48,-42 -54,-75 -4,-18 -18,-44 -31,-57 -14,-13 -25,-34 -25,-50 0,-16 -20,-59 -45,-97 l -44,-70 61,-223 c 34,-123 63,-251 66,-285 2,-37 8,-63 15,-63 16,0 67,-51 67,-67 0,-9 18,-13 63,-13 59,0 63,1 75,29 7,17 26,36 42,43 26,11 29,17 32,73 3,50 54,254 113,457 l 13,46 -44,72 c -24,40 -44,84 -44,100 0,16 -8,33 -20,41 -11,8 -28,37 -38,64 -12,34 -28,57 -49,70 -36,23 -48,62 -27,86 22,25 18,75 -8,93 -12,9 -32,16 -43,16 -11,0 -31,-7 -43,-16 z m 78,-18 c 6,-8 10,-25 8,-37 -2,-19 -10,-24 -45,-26 -41,-3 -43,-1 -43,25 0,15 5,33 12,40 16,16 53,15 68,-2 z m -4,-544 c 12,-9 29,-31 37,-47 14,-28 14,-46 -3,-185 -11,-85 -19,-163 -20,-172 0,-15 -9,-18 -45,-18 -25,0 -45,3 -45,8 0,4 -9,81 -20,171 -18,152 -18,166 -3,198 15,33 48,63 68,63 5,0 20,-8 31,-18 z m -175,-50 c 5,-12 18,-86 29,-165 11,-78 23,-157 27,-175 5,-29 3,-33 -12,-30 -13,2 -29,43 -66,173 -51,181 -55,205 -38,236 10,20 11,20 31,2 11,-10 24,-28 29,-41 z m 349,27 c 12,-27 9,-44 -19,-147 -63,-227 -71,-252 -86,-252 -8,0 -15,2 -15,4 0,2 11,84 25,182 20,140 30,186 48,211 12,18 25,33 28,33 4,0 12,-14 19,-31 z"
       id="path3" />
    <path
       d="m 415,1392 c -54,-11 -75,-81 -35,-117 11,-10 20,-24 20,-31 0,-11 -72,-51 -124,-68 -15,-5 -17,-13 -13,-40 4,-28 1,-36 -18,-46 -13,-7 -31,-27 -39,-45 -9,-18 -22,-38 -31,-45 -19,-16 -19,-54 0,-70 13,-10 15,-49 15,-235 0,-189 -2,-224 -15,-229 -19,-7 -19,-40 0,-56 8,-7 15,-19 15,-27 0,-8 15,-30 33,-48 19,-19 38,-48 43,-65 6,-23 22,-40 55,-58 25,-15 56,-35 69,-44 23,-17 23,-18 6,-37 -32,-35 2,-89 49,-77 30,8 44,50 26,78 -16,26 -2,42 61,74 48,24 68,48 68,81 0,10 14,26 30,35 20,11 33,28 37,48 3,18 12,34 19,37 18,7 18,47 0,62 -12,10 -14,53 -13,232 1,198 2,221 19,236 22,20 23,37 1,54 -9,8 -22,29 -30,47 -7,18 -26,40 -42,50 -22,13 -26,22 -21,37 11,30 -6,53 -49,65 -42,11 -91,45 -91,62 0,6 7,20 16,29 41,46 -2,124 -61,111 z m 50,-62 c 0,-34 -1,-35 -40,-35 -34,0 -40,3 -43,23 -5,33 16,54 52,50 28,-3 31,-6 31,-38 z m 8,-447 c 19,-42 22,-65 22,-178 0,-113 -3,-136 -22,-177 -38,-84 -79,-57 -102,67 -14,75 -14,145 0,220 23,124 64,151 102,68 z M 296,864 c 13,-44 15,-86 12,-188 -5,-131 -18,-186 -44,-186 -50,0 -60,359 -12,417 19,23 27,14 44,-43 z m 324,29 c 20,-41 25,-295 8,-353 -17,-56 -41,-63 -58,-18 -17,47 -24,242 -11,312 16,87 38,107 61,59 z"
       id="path4" />
    <path
       d="m 1340,1350 c -26,-26 -26,-65 0,-97 19,-24 19,-27 4,-44 -9,-10 -36,-28 -60,-40 -24,-11 -55,-34 -68,-50 -14,-16 -32,-29 -40,-29 -20,0 -21,-19 -1,-26 25,-10 18,-41 -45,-199 -32,-83 -67,-182 -76,-220 -30,-130 -4,-220 86,-296 49,-41 65,-79 35,-79 -8,0 -15,-9 -15,-20 0,-11 7,-20 15,-20 8,0 35,-16 61,-35 25,-19 51,-35 58,-35 16,0 76,-56 76,-70 0,-6 4,-10 9,-10 14,0 61,45 61,58 0,5 11,13 24,16 13,3 45,21 72,39 27,18 57,36 67,40 21,8 22,26 2,33 -23,9 -18,50 8,67 76,50 116,123 117,211 0,82 -22,164 -91,335 -62,153 -69,181 -44,181 8,0 15,7 15,15 0,8 -6,15 -13,15 -7,0 -28,15 -46,34 -19,19 -48,40 -65,47 -17,7 -40,23 -52,34 -20,22 -20,23 -2,45 26,32 24,85 -4,104 -31,22 -64,20 -88,-4 z m 79,-14 c 7,-8 11,-27 9,-42 -3,-25 -7,-27 -43,-27 -37,0 -40,2 -43,28 -6,46 50,74 77,41 z M 1207,838 c -52,-175 -60,-292 -28,-398 12,-40 20,-74 18,-76 -11,-11 -87,71 -97,104 -26,96 -8,196 73,400 29,73 45,102 57,102 15,0 12,-18 -23,-132 z m 261,15 c 51,-194 67,-353 41,-420 -22,-58 -41,-68 -125,-67 -63,1 -80,5 -92,20 -45,60 -52,128 -27,284 14,85 60,273 72,293 2,4 26,7 52,7 h 48 z m 122,40 c 69,-164 92,-245 93,-323 2,-98 -14,-144 -66,-181 -22,-16 -42,-28 -44,-26 -2,2 6,30 17,62 42,123 37,204 -26,417 -39,136 -38,128 -20,128 8,0 28,-33 46,-77 z"
       id="path5" />
    <path
       d="m 2299,1352 c -27,-23 -30,-73 -6,-100 23,-26 22,-29 -18,-36 -19,-4 -48,-18 -64,-32 -30,-25 -76,-127 -67,-149 6,-16 -45,-65 -67,-65 -19,0 -22,-11 -6,-27 8,-8 7,-27 -2,-69 -18,-83 -16,-284 4,-364 9,-37 12,-66 6,-68 -19,-7 -7,-38 24,-57 18,-11 32,-27 33,-35 0,-8 8,-38 18,-67 21,-63 71,-110 125,-119 33,-5 37,-9 33,-30 -4,-23 12,-54 29,-54 18,0 40,34 35,54 -5,19 1,24 40,34 25,7 58,25 73,40 28,28 66,125 56,142 -4,6 -3,10 2,10 4,1 23,14 42,30 27,23 32,32 23,43 -9,10 -8,31 3,83 18,87 19,269 1,354 -8,36 -10,66 -5,68 14,5 11,32 -3,32 -23,1 -70,50 -64,66 3,8 2,22 -3,32 -54,112 -56,114 -95,132 -23,10 -50,21 -60,25 -18,5 -18,6 2,26 65,60 -20,156 -89,101 z m 75,-18 c 34,-34 16,-70 -34,-68 -31,1 -35,4 -38,29 -6,46 41,71 72,39 z M 2176,868 c -22,-108 -27,-191 -17,-275 14,-116 15,-113 -13,-113 -22,0 -25,5 -36,87 -12,83 -9,237 6,306 5,22 12,27 36,27 29,0 30,-2 24,-32 z m 244,-15 c 19,-76 23,-211 8,-293 l -13,-75 -71,-3 -71,-3 -12,57 c -19,96 -9,316 16,357 2,4 33,7 67,7 h 64 z m 144,38 c 16,-25 26,-201 16,-287 -12,-114 -16,-124 -47,-124 -22,0 -24,3 -19,23 16,50 18,252 4,320 -8,37 -12,69 -10,72 9,8 50,6 56,-4 z"
       id="path6" />
  </g>`,
    },
    {
      viewBox: "0 0 54.825859 134.11481",
      gContent: `<g
     transform="matrix(0.1,0,0,-0.1,-16.075001,139.34413)"
     fill="LANTERN_COLOR"
     stroke="none"
     id="g6">
    <path
       d="m 396,2909 c -32,-25 -35,-71 -6,-96 11,-10 20,-21 20,-24 0,-4 -27,-24 -60,-44 -70,-42 -84,-64 -77,-115 4,-29 0,-41 -15,-54 -11,-10 -17,-23 -14,-31 4,-11 -9,-15 -57,-17 -50,-2 -62,-6 -65,-21 -3,-12 4,-20 17,-24 26,-7 22,8 66,-298 20,-137 38,-262 41,-277 5,-24 2,-28 -19,-28 -28,0 -55,-26 -41,-40 5,-4 20,-10 34,-12 16,-2 26,-11 30,-28 5,-21 13,-26 55,-30 58,-7 86,-20 113,-55 19,-24 21,-25 34,-8 30,40 59,56 115,62 55,6 58,8 63,36 3,17 9,29 13,28 4,-2 16,-3 28,-3 34,0 21,44 -13,48 -16,2 -28,7 -28,11 0,18 80,567 85,579 2,6 11,12 19,12 21,0 30,19 16,35 -8,10 -31,15 -66,15 -46,0 -54,3 -54,19 0,10 -7,24 -16,32 -10,8 -14,22 -10,40 10,50 -11,86 -70,119 -29,17 -56,35 -59,41 -4,5 3,21 14,35 27,35 26,59 -4,89 -30,30 -54,31 -89,4 z m 74,-19 c 33,-33 19,-63 -32,-64 -48,-2 -66,35 -32,68 21,21 40,20 64,-4 z M 265,2375 c 24,-23 30,-45 25,-88 -1,-10 6,-27 15,-37 23,-25 44,-302 25,-325 -22,-27 -49,-18 -54,18 -12,69 -56,417 -56,436 0,28 16,26 45,-4 z m 212,3 c 27,-30 32,-47 22,-81 -5,-19 -4,-36 5,-50 11,-18 12,-52 5,-166 -5,-80 -14,-150 -20,-157 -13,-16 -76,-19 -98,-5 -10,6 -16,50 -23,161 -9,136 -8,153 7,170 13,15 14,22 5,40 -14,27 -6,64 20,90 26,26 52,25 77,-2 z m 183,15 c 0,-5 -14,-111 -30,-237 -17,-126 -30,-234 -30,-238 0,-5 -12,-8 -27,-6 -35,4 -37,15 -28,187 6,106 11,137 24,150 12,12 16,28 13,54 -3,30 1,42 26,67 29,29 52,39 52,23 z"
       id="path1" />
    <path
       d="m 2320,2907 c -13,-7 -29,-25 -34,-40 -8,-22 -6,-33 13,-57 12,-17 21,-39 19,-48 -2,-10 -31,-30 -67,-48 -69,-33 -86,-53 -77,-89 5,-19 2,-24 -16,-27 -15,-2 -26,-16 -37,-45 -11,-33 -20,-43 -37,-43 -29,0 -38,-27 -19,-56 22,-33 22,-489 0,-518 -16,-21 -4,-56 20,-56 7,0 21,-24 32,-57 18,-52 23,-58 50,-61 23,-2 34,-11 46,-38 l 17,-34 h 124 124 l 12,34 c 9,29 17,35 43,38 29,3 33,8 48,57 10,36 23,57 36,62 27,10 35,33 18,56 -22,28 -21,484 0,517 19,29 10,56 -19,56 -16,0 -25,10 -36,43 -12,33 -20,42 -38,41 -20,-1 -22,3 -17,27 9,41 -5,58 -76,93 -71,34 -84,59 -49,91 54,49 -13,136 -80,102 z m 75,-38 c 4,-5 4,-20 1,-32 -4,-19 -12,-22 -45,-22 -43,0 -56,13 -45,47 11,36 69,41 89,7 z m -1,-460 36,-21 v -214 -214 h -80 -80 v 214 214 l 33,20 c 41,26 49,26 91,1 z m -194,-14 30,-16 v -209 -210 h -39 c -22,0 -46,-3 -55,-6 -14,-5 -16,16 -16,202 0,203 1,209 23,231 27,27 22,26 57,8 z m 357,-7 c 23,-21 23,-25 23,-228 v -206 l -42,2 c -24,2 -49,3 -55,3 -10,1 -13,50 -13,211 v 209 l 28,15 c 35,19 32,20 59,-6 z"
       id="path2" />
    <path
       d="m 1352,2884 c -26,-18 -30,-69 -6,-95 14,-16 14,-20 -1,-48 -8,-17 -20,-31 -25,-31 -18,0 -48,-42 -54,-75 -4,-18 -18,-44 -31,-57 -14,-13 -25,-34 -25,-50 0,-16 -20,-59 -45,-97 l -44,-70 61,-223 c 34,-123 63,-251 66,-285 2,-37 8,-63 15,-63 16,0 67,-51 67,-67 0,-9 18,-13 63,-13 59,0 63,1 75,29 7,17 26,36 42,43 26,11 29,17 32,73 3,50 54,254 113,457 l 13,46 -44,72 c -24,40 -44,84 -44,100 0,16 -8,33 -20,41 -11,8 -28,37 -38,64 -12,34 -28,57 -49,70 -36,23 -48,62 -27,86 22,25 18,75 -8,93 -12,9 -32,16 -43,16 -11,0 -31,-7 -43,-16 z m 78,-18 c 6,-8 10,-25 8,-37 -2,-19 -10,-24 -45,-26 -41,-3 -43,-1 -43,25 0,15 5,33 12,40 16,16 53,15 68,-2 z m -4,-544 c 12,-9 29,-31 37,-47 14,-28 14,-46 -3,-185 -11,-85 -19,-163 -20,-172 0,-15 -9,-18 -45,-18 -25,0 -45,3 -45,8 0,4 -9,81 -20,171 -18,152 -18,166 -3,198 15,33 48,63 68,63 5,0 20,-8 31,-18 z m -175,-50 c 5,-12 18,-86 29,-165 11,-78 23,-157 27,-175 5,-29 3,-33 -12,-30 -13,2 -29,43 -66,173 -51,181 -55,205 -38,236 10,20 11,20 31,2 11,-10 24,-28 29,-41 z m 349,27 c 12,-27 9,-44 -19,-147 -63,-227 -71,-252 -86,-252 -8,0 -15,2 -15,4 0,2 11,84 25,182 20,140 30,186 48,211 12,18 25,33 28,33 4,0 12,-14 19,-31 z"
       id="path3" />
    <path
       d="m 415,1392 c -54,-11 -75,-81 -35,-117 11,-10 20,-24 20,-31 0,-11 -72,-51 -124,-68 -15,-5 -17,-13 -13,-40 4,-28 1,-36 -18,-46 -13,-7 -31,-27 -39,-45 -9,-18 -22,-38 -31,-45 -19,-16 -19,-54 0,-70 13,-10 15,-49 15,-235 0,-189 -2,-224 -15,-229 -19,-7 -19,-40 0,-56 8,-7 15,-19 15,-27 0,-8 15,-30 33,-48 19,-19 38,-48 43,-65 6,-23 22,-40 55,-58 25,-15 56,-35 69,-44 23,-17 23,-18 6,-37 -32,-35 2,-89 49,-77 30,8 44,50 26,78 -16,26 -2,42 61,74 48,24 68,48 68,81 0,10 14,26 30,35 20,11 33,28 37,48 3,18 12,34 19,37 18,7 18,47 0,62 -12,10 -14,53 -13,232 1,198 2,221 19,236 22,20 23,37 1,54 -9,8 -22,29 -30,47 -7,18 -26,40 -42,50 -22,13 -26,22 -21,37 11,30 -6,53 -49,65 -42,11 -91,45 -91,62 0,6 7,20 16,29 41,46 -2,124 -61,111 z m 50,-62 c 0,-34 -1,-35 -40,-35 -34,0 -40,3 -43,23 -5,33 16,54 52,50 28,-3 31,-6 31,-38 z m 8,-447 c 19,-42 22,-65 22,-178 0,-113 -3,-136 -22,-177 -38,-84 -79,-57 -102,67 -14,75 -14,145 0,220 23,124 64,151 102,68 z M 296,864 c 13,-44 15,-86 12,-188 -5,-131 -18,-186 -44,-186 -50,0 -60,359 -12,417 19,23 27,14 44,-43 z m 324,29 c 20,-41 25,-295 8,-353 -17,-56 -41,-63 -58,-18 -17,47 -24,242 -11,312 16,87 38,107 61,59 z"
       id="path4" />
    <path
       d="m 1340,1350 c -26,-26 -26,-65 0,-97 19,-24 19,-27 4,-44 -9,-10 -36,-28 -60,-40 -24,-11 -55,-34 -68,-50 -14,-16 -32,-29 -40,-29 -20,0 -21,-19 -1,-26 25,-10 18,-41 -45,-199 -32,-83 -67,-182 -76,-220 -30,-130 -4,-220 86,-296 49,-41 65,-79 35,-79 -8,0 -15,-9 -15,-20 0,-11 7,-20 15,-20 8,0 35,-16 61,-35 25,-19 51,-35 58,-35 16,0 76,-56 76,-70 0,-6 4,-10 9,-10 14,0 61,45 61,58 0,5 11,13 24,16 13,3 45,21 72,39 27,18 57,36 67,40 21,8 22,26 2,33 -23,9 -18,50 8,67 76,50 116,123 117,211 0,82 -22,164 -91,335 -62,153 -69,181 -44,181 8,0 15,7 15,15 0,8 -6,15 -13,15 -7,0 -28,15 -46,34 -19,19 -48,40 -65,47 -17,7 -40,23 -52,34 -20,22 -20,23 -2,45 26,32 24,85 -4,104 -31,22 -64,20 -88,-4 z m 79,-14 c 7,-8 11,-27 9,-42 -3,-25 -7,-27 -43,-27 -37,0 -40,2 -43,28 -6,46 50,74 77,41 z M 1207,838 c -52,-175 -60,-292 -28,-398 12,-40 20,-74 18,-76 -11,-11 -87,71 -97,104 -26,96 -8,196 73,400 29,73 45,102 57,102 15,0 12,-18 -23,-132 z m 261,15 c 51,-194 67,-353 41,-420 -22,-58 -41,-68 -125,-67 -63,1 -80,5 -92,20 -45,60 -52,128 -27,284 14,85 60,273 72,293 2,4 26,7 52,7 h 48 z m 122,40 c 69,-164 92,-245 93,-323 2,-98 -14,-144 -66,-181 -22,-16 -42,-28 -44,-26 -2,2 6,30 17,62 42,123 37,204 -26,417 -39,136 -38,128 -20,128 8,0 28,-33 46,-77 z"
       id="path5" />
    <path
       d="m 2299,1352 c -27,-23 -30,-73 -6,-100 23,-26 22,-29 -18,-36 -19,-4 -48,-18 -64,-32 -30,-25 -76,-127 -67,-149 6,-16 -45,-65 -67,-65 -19,0 -22,-11 -6,-27 8,-8 7,-27 -2,-69 -18,-83 -16,-284 4,-364 9,-37 12,-66 6,-68 -19,-7 -7,-38 24,-57 18,-11 32,-27 33,-35 0,-8 8,-38 18,-67 21,-63 71,-110 125,-119 33,-5 37,-9 33,-30 -4,-23 12,-54 29,-54 18,0 40,34 35,54 -5,19 1,24 40,34 25,7 58,25 73,40 28,28 66,125 56,142 -4,6 -3,10 2,10 4,1 23,14 42,30 27,23 32,32 23,43 -9,10 -8,31 3,83 18,87 19,269 1,354 -8,36 -10,66 -5,68 14,5 11,32 -3,32 -23,1 -70,50 -64,66 3,8 2,22 -3,32 -54,112 -56,114 -95,132 -23,10 -50,21 -60,25 -18,5 -18,6 2,26 65,60 -20,156 -89,101 z m 75,-18 c 34,-34 16,-70 -34,-68 -31,1 -35,4 -38,29 -6,46 41,71 72,39 z M 2176,868 c -22,-108 -27,-191 -17,-275 14,-116 15,-113 -13,-113 -22,0 -25,5 -36,87 -12,83 -9,237 6,306 5,22 12,27 36,27 29,0 30,-2 24,-32 z m 244,-15 c 19,-76 23,-211 8,-293 l -13,-75 -71,-3 -71,-3 -12,57 c -19,96 -9,316 16,357 2,4 33,7 67,7 h 64 z m 144,38 c 16,-25 26,-201 16,-287 -12,-114 -16,-124 -47,-124 -22,0 -24,3 -19,23 16,50 18,252 4,320 -8,37 -12,69 -10,72 9,8 50,6 56,-4 z"
       id="path6" />
  </g>`,
    },
    {
      viewBox: "0 0 68.790413 128.93234",
      gContent: `<g
     transform="matrix(0.1,0,0,-0.1,-104.20958,136.93233)"
     fill="LANTERN_COLOR"
     stroke="none"
     id="g6">
    <path
       d="m 396,2909 c -32,-25 -35,-71 -6,-96 11,-10 20,-21 20,-24 0,-4 -27,-24 -60,-44 -70,-42 -84,-64 -77,-115 4,-29 0,-41 -15,-54 -11,-10 -17,-23 -14,-31 4,-11 -9,-15 -57,-17 -50,-2 -62,-6 -65,-21 -3,-12 4,-20 17,-24 26,-7 22,8 66,-298 20,-137 38,-262 41,-277 5,-24 2,-28 -19,-28 -28,0 -55,-26 -41,-40 5,-4 20,-10 34,-12 16,-2 26,-11 30,-28 5,-21 13,-26 55,-30 58,-7 86,-20 113,-55 19,-24 21,-25 34,-8 30,40 59,56 115,62 55,6 58,8 63,36 3,17 9,29 13,28 4,-2 16,-3 28,-3 34,0 21,44 -13,48 -16,2 -28,7 -28,11 0,18 80,567 85,579 2,6 11,12 19,12 21,0 30,19 16,35 -8,10 -31,15 -66,15 -46,0 -54,3 -54,19 0,10 -7,24 -16,32 -10,8 -14,22 -10,40 10,50 -11,86 -70,119 -29,17 -56,35 -59,41 -4,5 3,21 14,35 27,35 26,59 -4,89 -30,30 -54,31 -89,4 z m 74,-19 c 33,-33 19,-63 -32,-64 -48,-2 -66,35 -32,68 21,21 40,20 64,-4 z M 265,2375 c 24,-23 30,-45 25,-88 -1,-10 6,-27 15,-37 23,-25 44,-302 25,-325 -22,-27 -49,-18 -54,18 -12,69 -56,417 -56,436 0,28 16,26 45,-4 z m 212,3 c 27,-30 32,-47 22,-81 -5,-19 -4,-36 5,-50 11,-18 12,-52 5,-166 -5,-80 -14,-150 -20,-157 -13,-16 -76,-19 -98,-5 -10,6 -16,50 -23,161 -9,136 -8,153 7,170 13,15 14,22 5,40 -14,27 -6,64 20,90 26,26 52,25 77,-2 z m 183,15 c 0,-5 -14,-111 -30,-237 -17,-126 -30,-234 -30,-238 0,-5 -12,-8 -27,-6 -35,4 -37,15 -28,187 6,106 11,137 24,150 12,12 16,28 13,54 -3,30 1,42 26,67 29,29 52,39 52,23 z"
       id="path1" />
    <path
       d="m 2320,2907 c -13,-7 -29,-25 -34,-40 -8,-22 -6,-33 13,-57 12,-17 21,-39 19,-48 -2,-10 -31,-30 -67,-48 -69,-33 -86,-53 -77,-89 5,-19 2,-24 -16,-27 -15,-2 -26,-16 -37,-45 -11,-33 -20,-43 -37,-43 -29,0 -38,-27 -19,-56 22,-33 22,-489 0,-518 -16,-21 -4,-56 20,-56 7,0 21,-24 32,-57 18,-52 23,-58 50,-61 23,-2 34,-11 46,-38 l 17,-34 h 124 124 l 12,34 c 9,29 17,35 43,38 29,3 33,8 48,57 10,36 23,57 36,62 27,10 35,33 18,56 -22,28 -21,484 0,517 19,29 10,56 -19,56 -16,0 -25,10 -36,43 -12,33 -20,42 -38,41 -20,-1 -22,3 -17,27 9,41 -5,58 -76,93 -71,34 -84,59 -49,91 54,49 -13,136 -80,102 z m 75,-38 c 4,-5 4,-20 1,-32 -4,-19 -12,-22 -45,-22 -43,0 -56,13 -45,47 11,36 69,41 89,7 z m -1,-460 36,-21 v -214 -214 h -80 -80 v 214 214 l 33,20 c 41,26 49,26 91,1 z m -194,-14 30,-16 v -209 -210 h -39 c -22,0 -46,-3 -55,-6 -14,-5 -16,16 -16,202 0,203 1,209 23,231 27,27 22,26 57,8 z m 357,-7 c 23,-21 23,-25 23,-228 v -206 l -42,2 c -24,2 -49,3 -55,3 -10,1 -13,50 -13,211 v 209 l 28,15 c 35,19 32,20 59,-6 z"
       id="path2" />
    <path
       d="m 1352,2884 c -26,-18 -30,-69 -6,-95 14,-16 14,-20 -1,-48 -8,-17 -20,-31 -25,-31 -18,0 -48,-42 -54,-75 -4,-18 -18,-44 -31,-57 -14,-13 -25,-34 -25,-50 0,-16 -20,-59 -45,-97 l -44,-70 61,-223 c 34,-123 63,-251 66,-285 2,-37 8,-63 15,-63 16,0 67,-51 67,-67 0,-9 18,-13 63,-13 59,0 63,1 75,29 7,17 26,36 42,43 26,11 29,17 32,73 3,50 54,254 113,457 l 13,46 -44,72 c -24,40 -44,84 -44,100 0,16 -8,33 -20,41 -11,8 -28,37 -38,64 -12,34 -28,57 -49,70 -36,23 -48,62 -27,86 22,25 18,75 -8,93 -12,9 -32,16 -43,16 -11,0 -31,-7 -43,-16 z m 78,-18 c 6,-8 10,-25 8,-37 -2,-19 -10,-24 -45,-26 -41,-3 -43,-1 -43,25 0,15 5,33 12,40 16,16 53,15 68,-2 z m -4,-544 c 12,-9 29,-31 37,-47 14,-28 14,-46 -3,-185 -11,-85 -19,-163 -20,-172 0,-15 -9,-18 -45,-18 -25,0 -45,3 -45,8 0,4 -9,81 -20,171 -18,152 -18,166 -3,198 15,33 48,63 68,63 5,0 20,-8 31,-18 z m -175,-50 c 5,-12 18,-86 29,-165 11,-78 23,-157 27,-175 5,-29 3,-33 -12,-30 -13,2 -29,43 -66,173 -51,181 -55,205 -38,236 10,20 11,20 31,2 11,-10 24,-28 29,-41 z m 349,27 c 12,-27 9,-44 -19,-147 -63,-227 -71,-252 -86,-252 -8,0 -15,2 -15,4 0,2 11,84 25,182 20,140 30,186 48,211 12,18 25,33 28,33 4,0 12,-14 19,-31 z"
       id="path3" />
    <path
       d="m 415,1392 c -54,-11 -75,-81 -35,-117 11,-10 20,-24 20,-31 0,-11 -72,-51 -124,-68 -15,-5 -17,-13 -13,-40 4,-28 1,-36 -18,-46 -13,-7 -31,-27 -39,-45 -9,-18 -22,-38 -31,-45 -19,-16 -19,-54 0,-70 13,-10 15,-49 15,-235 0,-189 -2,-224 -15,-229 -19,-7 -19,-40 0,-56 8,-7 15,-19 15,-27 0,-8 15,-30 33,-48 19,-19 38,-48 43,-65 6,-23 22,-40 55,-58 25,-15 56,-35 69,-44 23,-17 23,-18 6,-37 -32,-35 2,-89 49,-77 30,8 44,50 26,78 -16,26 -2,42 61,74 48,24 68,48 68,81 0,10 14,26 30,35 20,11 33,28 37,48 3,18 12,34 19,37 18,7 18,47 0,62 -12,10 -14,53 -13,232 1,198 2,221 19,236 22,20 23,37 1,54 -9,8 -22,29 -30,47 -7,18 -26,40 -42,50 -22,13 -26,22 -21,37 11,30 -6,53 -49,65 -42,11 -91,45 -91,62 0,6 7,20 16,29 41,46 -2,124 -61,111 z m 50,-62 c 0,-34 -1,-35 -40,-35 -34,0 -40,3 -43,23 -5,33 16,54 52,50 28,-3 31,-6 31,-38 z m 8,-447 c 19,-42 22,-65 22,-178 0,-113 -3,-136 -22,-177 -38,-84 -79,-57 -102,67 -14,75 -14,145 0,220 23,124 64,151 102,68 z M 296,864 c 13,-44 15,-86 12,-188 -5,-131 -18,-186 -44,-186 -50,0 -60,359 -12,417 19,23 27,14 44,-43 z m 324,29 c 20,-41 25,-295 8,-353 -17,-56 -41,-63 -58,-18 -17,47 -24,242 -11,312 16,87 38,107 61,59 z"
       id="path4" />
    <path
       d="m 1340,1350 c -26,-26 -26,-65 0,-97 19,-24 19,-27 4,-44 -9,-10 -36,-28 -60,-40 -24,-11 -55,-34 -68,-50 -14,-16 -32,-29 -40,-29 -20,0 -21,-19 -1,-26 25,-10 18,-41 -45,-199 -32,-83 -67,-182 -76,-220 -30,-130 -4,-220 86,-296 49,-41 65,-79 35,-79 -8,0 -15,-9 -15,-20 0,-11 7,-20 15,-20 8,0 35,-16 61,-35 25,-19 51,-35 58,-35 16,0 76,-56 76,-70 0,-6 4,-10 9,-10 14,0 61,45 61,58 0,5 11,13 24,16 13,3 45,21 72,39 27,18 57,36 67,40 21,8 22,26 2,33 -23,9 -18,50 8,67 76,50 116,123 117,211 0,82 -22,164 -91,335 -62,153 -69,181 -44,181 8,0 15,7 15,15 0,8 -6,15 -13,15 -7,0 -28,15 -46,34 -19,19 -48,40 -65,47 -17,7 -40,23 -52,34 -20,22 -20,23 -2,45 26,32 24,85 -4,104 -31,22 -64,20 -88,-4 z m 79,-14 c 7,-8 11,-27 9,-42 -3,-25 -7,-27 -43,-27 -37,0 -40,2 -43,28 -6,46 50,74 77,41 z M 1207,838 c -52,-175 -60,-292 -28,-398 12,-40 20,-74 18,-76 -11,-11 -87,71 -97,104 -26,96 -8,196 73,400 29,73 45,102 57,102 15,0 12,-18 -23,-132 z m 261,15 c 51,-194 67,-353 41,-420 -22,-58 -41,-68 -125,-67 -63,1 -80,5 -92,20 -45,60 -52,128 -27,284 14,85 60,273 72,293 2,4 26,7 52,7 h 48 z m 122,40 c 69,-164 92,-245 93,-323 2,-98 -14,-144 -66,-181 -22,-16 -42,-28 -44,-26 -2,2 6,30 17,62 42,123 37,204 -26,417 -39,136 -38,128 -20,128 8,0 28,-33 46,-77 z"
       id="path5" />
    <path
       d="m 2299,1352 c -27,-23 -30,-73 -6,-100 23,-26 22,-29 -18,-36 -19,-4 -48,-18 -64,-32 -30,-25 -76,-127 -67,-149 6,-16 -45,-65 -67,-65 -19,0 -22,-11 -6,-27 8,-8 7,-27 -2,-69 -18,-83 -16,-284 4,-364 9,-37 12,-66 6,-68 -19,-7 -7,-38 24,-57 18,-11 32,-27 33,-35 0,-8 8,-38 18,-67 21,-63 71,-110 125,-119 33,-5 37,-9 33,-30 -4,-23 12,-54 29,-54 18,0 40,34 35,54 -5,19 1,24 40,34 25,7 58,25 73,40 28,28 66,125 56,142 -4,6 -3,10 2,10 4,1 23,14 42,30 27,23 32,32 23,43 -9,10 -8,31 3,83 18,87 19,269 1,354 -8,36 -10,66 -5,68 14,5 11,32 -3,32 -23,1 -70,50 -64,66 3,8 2,22 -3,32 -54,112 -56,114 -95,132 -23,10 -50,21 -60,25 -18,5 -18,6 2,26 65,60 -20,156 -89,101 z m 75,-18 c 34,-34 16,-70 -34,-68 -31,1 -35,4 -38,29 -6,46 41,71 72,39 z M 2176,868 c -22,-108 -27,-191 -17,-275 14,-116 15,-113 -13,-113 -22,0 -25,5 -36,87 -12,83 -9,237 6,306 5,22 12,27 36,27 29,0 30,-2 24,-32 z m 244,-15 c 19,-76 23,-211 8,-293 l -13,-75 -71,-3 -71,-3 -12,57 c -19,96 -9,316 16,357 2,4 33,7 67,7 h 64 z m 144,38 c 16,-25 26,-201 16,-287 -12,-114 -16,-124 -47,-124 -22,0 -24,3 -19,23 16,50 18,252 4,320 -8,37 -12,69 -10,72 9,8 50,6 56,-4 z"
       id="path6" />
  </g>`,
    },
    {
      viewBox: "0 0 57.234924 128.84048",
      gContent: `<g
     transform="matrix(0.1,0,0,-0.1,-205.66613,136.84047)"
     fill="LANTERN_COLOR"
     stroke="none"
     id="g6">
    <path
       d="m 396,2909 c -32,-25 -35,-71 -6,-96 11,-10 20,-21 20,-24 0,-4 -27,-24 -60,-44 -70,-42 -84,-64 -77,-115 4,-29 0,-41 -15,-54 -11,-10 -17,-23 -14,-31 4,-11 -9,-15 -57,-17 -50,-2 -62,-6 -65,-21 -3,-12 4,-20 17,-24 26,-7 22,8 66,-298 20,-137 38,-262 41,-277 5,-24 2,-28 -19,-28 -28,0 -55,-26 -41,-40 5,-4 20,-10 34,-12 16,-2 26,-11 30,-28 5,-21 13,-26 55,-30 58,-7 86,-20 113,-55 19,-24 21,-25 34,-8 30,40 59,56 115,62 55,6 58,8 63,36 3,17 9,29 13,28 4,-2 16,-3 28,-3 34,0 21,44 -13,48 -16,2 -28,7 -28,11 0,18 80,567 85,579 2,6 11,12 19,12 21,0 30,19 16,35 -8,10 -31,15 -66,15 -46,0 -54,3 -54,19 0,10 -7,24 -16,32 -10,8 -14,22 -10,40 10,50 -11,86 -70,119 -29,17 -56,35 -59,41 -4,5 3,21 14,35 27,35 26,59 -4,89 -30,30 -54,31 -89,4 z m 74,-19 c 33,-33 19,-63 -32,-64 -48,-2 -66,35 -32,68 21,21 40,20 64,-4 z M 265,2375 c 24,-23 30,-45 25,-88 -1,-10 6,-27 15,-37 23,-25 44,-302 25,-325 -22,-27 -49,-18 -54,18 -12,69 -56,417 -56,436 0,28 16,26 45,-4 z m 212,3 c 27,-30 32,-47 22,-81 -5,-19 -4,-36 5,-50 11,-18 12,-52 5,-166 -5,-80 -14,-150 -20,-157 -13,-16 -76,-19 -98,-5 -10,6 -16,50 -23,161 -9,136 -8,153 7,170 13,15 14,22 5,40 -14,27 -6,64 20,90 26,26 52,25 77,-2 z m 183,15 c 0,-5 -14,-111 -30,-237 -17,-126 -30,-234 -30,-238 0,-5 -12,-8 -27,-6 -35,4 -37,15 -28,187 6,106 11,137 24,150 12,12 16,28 13,54 -3,30 1,42 26,67 29,29 52,39 52,23 z"
       id="path1" />
    <path
       d="m 2320,2907 c -13,-7 -29,-25 -34,-40 -8,-22 -6,-33 13,-57 12,-17 21,-39 19,-48 -2,-10 -31,-30 -67,-48 -69,-33 -86,-53 -77,-89 5,-19 2,-24 -16,-27 -15,-2 -26,-16 -37,-45 -11,-33 -20,-43 -37,-43 -29,0 -38,-27 -19,-56 22,-33 22,-489 0,-518 -16,-21 -4,-56 20,-56 7,0 21,-24 32,-57 18,-52 23,-58 50,-61 23,-2 34,-11 46,-38 l 17,-34 h 124 124 l 12,34 c 9,29 17,35 43,38 29,3 33,8 48,57 10,36 23,57 36,62 27,10 35,33 18,56 -22,28 -21,484 0,517 19,29 10,56 -19,56 -16,0 -25,10 -36,43 -12,33 -20,42 -38,41 -20,-1 -22,3 -17,27 9,41 -5,58 -76,93 -71,34 -84,59 -49,91 54,49 -13,136 -80,102 z m 75,-38 c 4,-5 4,-20 1,-32 -4,-19 -12,-22 -45,-22 -43,0 -56,13 -45,47 11,36 69,41 89,7 z m -1,-460 36,-21 v -214 -214 h -80 -80 v 214 214 l 33,20 c 41,26 49,26 91,1 z m -194,-14 30,-16 v -209 -210 h -39 c -22,0 -46,-3 -55,-6 -14,-5 -16,16 -16,202 0,203 1,209 23,231 27,27 22,26 57,8 z m 357,-7 c 23,-21 23,-25 23,-228 v -206 l -42,2 c -24,2 -49,3 -55,3 -10,1 -13,50 -13,211 v 209 l 28,15 c 35,19 32,20 59,-6 z"
       id="path2" />
    <path
       d="m 1352,2884 c -26,-18 -30,-69 -6,-95 14,-16 14,-20 -1,-48 -8,-17 -20,-31 -25,-31 -18,0 -48,-42 -54,-75 -4,-18 -18,-44 -31,-57 -14,-13 -25,-34 -25,-50 0,-16 -20,-59 -45,-97 l -44,-70 61,-223 c 34,-123 63,-251 66,-285 2,-37 8,-63 15,-63 16,0 67,-51 67,-67 0,-9 18,-13 63,-13 59,0 63,1 75,29 7,17 26,36 42,43 26,11 29,17 32,73 3,50 54,254 113,457 l 13,46 -44,72 c -24,40 -44,84 -44,100 0,16 -8,33 -20,41 -11,8 -28,37 -38,64 -12,34 -28,57 -49,70 -36,23 -48,62 -27,86 22,25 18,75 -8,93 -12,9 -32,16 -43,16 -11,0 -31,-7 -43,-16 z m 78,-18 c 6,-8 10,-25 8,-37 -2,-19 -10,-24 -45,-26 -41,-3 -43,-1 -43,25 0,15 5,33 12,40 16,16 53,15 68,-2 z m -4,-544 c 12,-9 29,-31 37,-47 14,-28 14,-46 -3,-185 -11,-85 -19,-163 -20,-172 0,-15 -9,-18 -45,-18 -25,0 -45,3 -45,8 0,4 -9,81 -20,171 -18,152 -18,166 -3,198 15,33 48,63 68,63 5,0 20,-8 31,-18 z m -175,-50 c 5,-12 18,-86 29,-165 11,-78 23,-157 27,-175 5,-29 3,-33 -12,-30 -13,2 -29,43 -66,173 -51,181 -55,205 -38,236 10,20 11,20 31,2 11,-10 24,-28 29,-41 z m 349,27 c 12,-27 9,-44 -19,-147 -63,-227 -71,-252 -86,-252 -8,0 -15,2 -15,4 0,2 11,84 25,182 20,140 30,186 48,211 12,18 25,33 28,33 4,0 12,-14 19,-31 z"
       id="path3" />
    <path
       d="m 415,1392 c -54,-11 -75,-81 -35,-117 11,-10 20,-24 20,-31 0,-11 -72,-51 -124,-68 -15,-5 -17,-13 -13,-40 4,-28 1,-36 -18,-46 -13,-7 -31,-27 -39,-45 -9,-18 -22,-38 -31,-45 -19,-16 -19,-54 0,-70 13,-10 15,-49 15,-235 0,-189 -2,-224 -15,-229 -19,-7 -19,-40 0,-56 8,-7 15,-19 15,-27 0,-8 15,-30 33,-48 19,-19 38,-48 43,-65 6,-23 22,-40 55,-58 25,-15 56,-35 69,-44 23,-17 23,-18 6,-37 -32,-35 2,-89 49,-77 30,8 44,50 26,78 -16,26 -2,42 61,74 48,24 68,48 68,81 0,10 14,26 30,35 20,11 33,28 37,48 3,18 12,34 19,37 18,7 18,47 0,62 -12,10 -14,53 -13,232 1,198 2,221 19,236 22,20 23,37 1,54 -9,8 -22,29 -30,47 -7,18 -26,40 -42,50 -22,13 -26,22 -21,37 11,30 -6,53 -49,65 -42,11 -91,45 -91,62 0,6 7,20 16,29 41,46 -2,124 -61,111 z m 50,-62 c 0,-34 -1,-35 -40,-35 -34,0 -40,3 -43,23 -5,33 16,54 52,50 28,-3 31,-6 31,-38 z m 8,-447 c 19,-42 22,-65 22,-178 0,-113 -3,-136 -22,-177 -38,-84 -79,-57 -102,67 -14,75 -14,145 0,220 23,124 64,151 102,68 z M 296,864 c 13,-44 15,-86 12,-188 -5,-131 -18,-186 -44,-186 -50,0 -60,359 -12,417 19,23 27,14 44,-43 z m 324,29 c 20,-41 25,-295 8,-353 -17,-56 -41,-63 -58,-18 -17,47 -24,242 -11,312 16,87 38,107 61,59 z"
       id="path4" />
    <path
       d="m 1340,1350 c -26,-26 -26,-65 0,-97 19,-24 19,-27 4,-44 -9,-10 -36,-28 -60,-40 -24,-11 -55,-34 -68,-50 -14,-16 -32,-29 -40,-29 -20,0 -21,-19 -1,-26 25,-10 18,-41 -45,-199 -32,-83 -67,-182 -76,-220 -30,-130 -4,-220 86,-296 49,-41 65,-79 35,-79 -8,0 -15,-9 -15,-20 0,-11 7,-20 15,-20 8,0 35,-16 61,-35 25,-19 51,-35 58,-35 16,0 76,-56 76,-70 0,-6 4,-10 9,-10 14,0 61,45 61,58 0,5 11,13 24,16 13,3 45,21 72,39 27,18 57,36 67,40 21,8 22,26 2,33 -23,9 -18,50 8,67 76,50 116,123 117,211 0,82 -22,164 -91,335 -62,153 -69,181 -44,181 8,0 15,7 15,15 0,8 -6,15 -13,15 -7,0 -28,15 -46,34 -19,19 -48,40 -65,47 -17,7 -40,23 -52,34 -20,22 -20,23 -2,45 26,32 24,85 -4,104 -31,22 -64,20 -88,-4 z m 79,-14 c 7,-8 11,-27 9,-42 -3,-25 -7,-27 -43,-27 -37,0 -40,2 -43,28 -6,46 50,74 77,41 z M 1207,838 c -52,-175 -60,-292 -28,-398 12,-40 20,-74 18,-76 -11,-11 -87,71 -97,104 -26,96 -8,196 73,400 29,73 45,102 57,102 15,0 12,-18 -23,-132 z m 261,15 c 51,-194 67,-353 41,-420 -22,-58 -41,-68 -125,-67 -63,1 -80,5 -92,20 -45,60 -52,128 -27,284 14,85 60,273 72,293 2,4 26,7 52,7 h 48 z m 122,40 c 69,-164 92,-245 93,-323 2,-98 -14,-144 -66,-181 -22,-16 -42,-28 -44,-26 -2,2 6,30 17,62 42,123 37,204 -26,417 -39,136 -38,128 -20,128 8,0 28,-33 46,-77 z"
       id="path5" />
    <path
       d="m 2299,1352 c -27,-23 -30,-73 -6,-100 23,-26 22,-29 -18,-36 -19,-4 -48,-18 -64,-32 -30,-25 -76,-127 -67,-149 6,-16 -45,-65 -67,-65 -19,0 -22,-11 -6,-27 8,-8 7,-27 -2,-69 -18,-83 -16,-284 4,-364 9,-37 12,-66 6,-68 -19,-7 -7,-38 24,-57 18,-11 32,-27 33,-35 0,-8 8,-38 18,-67 21,-63 71,-110 125,-119 33,-5 37,-9 33,-30 -4,-23 12,-54 29,-54 18,0 40,34 35,54 -5,19 1,24 40,34 25,7 58,25 73,40 28,28 66,125 56,142 -4,6 -3,10 2,10 4,1 23,14 42,30 27,23 32,32 23,43 -9,10 -8,31 3,83 18,87 19,269 1,354 -8,36 -10,66 -5,68 14,5 11,32 -3,32 -23,1 -70,50 -64,66 3,8 2,22 -3,32 -54,112 -56,114 -95,132 -23,10 -50,21 -60,25 -18,5 -18,6 2,26 65,60 -20,156 -89,101 z m 75,-18 c 34,-34 16,-70 -34,-68 -31,1 -35,4 -38,29 -6,46 41,71 72,39 z M 2176,868 c -22,-108 -27,-191 -17,-275 14,-116 15,-113 -13,-113 -22,0 -25,5 -36,87 -12,83 -9,237 6,306 5,22 12,27 36,27 29,0 30,-2 24,-32 z m 244,-15 c 19,-76 23,-211 8,-293 l -13,-75 -71,-3 -71,-3 -12,57 c -19,96 -9,316 16,357 2,4 33,7 67,7 h 64 z m 144,38 c 16,-25 26,-201 16,-287 -12,-114 -16,-124 -47,-124 -22,0 -24,3 -19,23 16,50 18,252 4,320 -8,37 -12,69 -10,72 9,8 50,6 56,-4 z"
       id="path6" />
  </g>`,
    },
    {
      viewBox: "0 0 56.962593 119.25",
      gContent: `<g
     transform="matrix(0.1,0,0,-0.1,-49.999994,322)"
     fill="LANTERN_COLOR"
     stroke="none"
     id="g6">
    <path
       d="m 743,3205 c -39,-27 -38,-82 4,-123 7,-7 13,-18 13,-23 0,-5 -58,-69 -130,-143 L 500,2782 v -54 c 0,-36 7,-64 20,-86 19,-30 21,-52 23,-240 2,-193 1,-208 -17,-223 -27,-23 -14,-49 24,-49 22,0 38,-9 56,-30 16,-19 38,-31 62,-35 20,-3 55,-14 77,-24 39,-18 41,-18 75,0 19,11 45,19 58,19 31,0 79,26 92,50 7,14 21,20 44,20 43,0 57,27 27,52 -20,15 -21,26 -21,212 0,190 1,198 25,246 27,53 32,108 14,143 -7,12 -65,77 -130,144 -66,66 -119,126 -119,131 0,6 6,17 13,24 55,55 32,138 -38,138 -11,0 -30,-7 -42,-15 z m 69,-17 c 20,-17 28,-42 18,-58 -9,-15 -90,-24 -90,-10 0,5 -3,15 -6,23 -6,17 28,57 49,57 7,0 20,-6 29,-12 z M 678,2554 c 21,-15 22,-21 22,-175 v -159 h -55 -55 v 159 c 0,132 3,162 16,175 20,20 43,20 72,0 z m 152,-24 c 5,-10 10,-84 10,-164 v -146 h -55 -55 v 153 c 0,83 4,157 8,163 25,37 71,34 92,-6 z m 132,23 c 16,-14 18,-34 18,-175 v -158 h -55 -55 v 157 c 0,132 3,159 17,175 20,22 51,23 75,1 z"
       id="path1" />
    <path
       d="m 2720,3200 c -28,-28 -25,-72 6,-109 l 26,-31 -26,-34 c -31,-41 -73,-68 -142,-90 -66,-21 -98,-55 -98,-103 0,-28 7,-42 32,-63 l 32,-26 v -292 -291 l 55,-38 c 30,-21 55,-42 55,-46 0,-4 -7,-21 -15,-37 l -16,-30 h 142 141 l -16,25 c -25,38 -20,49 39,90 l 55,37 v 294 c 0,283 1,294 20,304 33,18 52,64 39,97 -17,44 -36,60 -107,85 -64,22 -152,89 -152,115 0,5 11,22 25,37 15,16 25,39 25,56 0,60 -78,92 -120,50 z m 84,-16 c 34,-33 16,-69 -34,-69 -19,0 -38,4 -42,10 -21,28 6,75 42,75 10,0 26,-7 34,-16 z m -169,-734 v -260 h -27 -28 v 260 260 h 28 27 z m 215,0 v -260 h -80 -80 v 260 260 h 80 80 z m 110,0 v -260 h -30 -30 v 260 260 h 30 30 z"
       id="path2" />
    <path
       d="m 1745,3175 c -31,-30 -32,-64 -4,-99 11,-15 19,-33 16,-40 -3,-8 -30,-31 -61,-53 -60,-42 -81,-76 -70,-116 5,-21 3,-27 -10,-27 -10,0 -19,-11 -22,-30 -6,-26 -11,-30 -41,-30 -43,0 -56,-26 -25,-51 22,-17 22,-21 22,-327 v -311 l -22,-3 c -15,-2 -23,-10 -23,-23 0,-19 8,-20 288,-23 l 287,-2 v 25 c 0,20 -5,25 -25,25 h -25 v 311 c 0,307 0,311 22,328 31,25 18,51 -25,51 -30,0 -35,4 -40,30 -4,18 -13,30 -23,30 -12,0 -14,6 -9,29 9,41 -6,64 -71,112 -66,49 -73,63 -45,93 30,32 28,79 -5,105 -35,27 -59,26 -89,-4 z m 88,-19 c 4,-6 6,-22 5,-36 -3,-21 -8,-24 -43,-26 -57,-2 -73,28 -34,67 21,21 56,19 72,-5 z m -201,-513 c 22,-25 26,-45 17,-70 -5,-15 -3,-25 7,-33 11,-10 14,-48 14,-194 0,-196 -2,-206 -52,-206 h -28 v 260 c 0,211 3,260 13,260 8,0 21,-8 29,-17 z m 204,-8 c 10,-15 14,-37 12,-55 -3,-18 1,-35 9,-41 10,-9 13,-53 13,-184 0,-96 -3,-180 -6,-189 -9,-23 -139,-23 -148,0 -12,31 -7,359 6,372 7,7 11,28 10,47 -6,66 70,102 104,50 z m 154,-235 v -260 h -28 c -15,0 -33,5 -40,12 -15,15 -17,374 -3,383 6,3 9,23 8,45 -1,40 23,80 50,80 10,0 13,-49 13,-260 z"
       id="path3" />
    <path
       d="m 735,1705 c -30,-29 -32,-68 -5,-95 l 20,-20 -62,-59 -63,-59 1,-58 c 0,-55 -2,-59 -43,-97 l -43,-40 V 1007 737 l 40,-34 c 38,-33 40,-37 40,-91 0,-71 24,-113 85,-150 24,-15 45,-34 45,-43 0,-9 7,-22 16,-30 21,-17 49,0 48,29 0,14 8,24 25,30 72,25 117,96 109,173 -3,37 0,44 39,80 l 43,39 v 268 268 l -46,38 c -45,37 -46,40 -39,82 8,55 -8,87 -76,148 -31,28 -48,50 -42,54 57,38 19,132 -53,132 -8,0 -26,-11 -39,-25 z m 74,-5 c 4,0 13,-10 18,-23 15,-31 -1,-60 -28,-52 -11,4 -26,1 -34,-5 -11,-9 -16,-7 -24,9 -6,11 -11,24 -11,30 0,19 41,53 57,47 8,-3 18,-6 22,-6 z m -151,-692 2,-248 h -50 -50 v 243 c 0,134 3,247 7,251 4,4 25,6 48,4 l 40,-3 z m 190,0 2,-248 h -65 -65 v 243 c 0,134 3,247 7,251 4,4 32,6 63,4 l 55,-3 z m 152,2 V 760 h -45 -45 v 250 250 h 45 45 z"
       id="path4" />
    <path
       d="m 1740,1710 c -26,-26 -26,-74 2,-102 23,-23 26,-19 -36,-63 -16,-12 -17,-17 -7,-29 10,-12 2,-30 -48,-103 -33,-48 -83,-117 -111,-153 -59,-77 -82,-140 -81,-221 1,-62 16,-110 52,-160 17,-24 19,-32 8,-45 -9,-11 -9,-18 -1,-26 7,-7 9,-32 6,-67 -7,-68 11,-97 91,-142 29,-16 65,-41 80,-54 24,-23 25,-27 11,-41 -20,-19 -15,-28 24,-44 23,-10 29,-17 25,-34 -8,-31 8,-48 41,-44 25,3 29,7 28,34 -1,26 4,34 32,48 37,17 43,33 18,43 -22,8 24,54 92,93 79,44 97,73 91,142 -3,33 -1,60 6,67 7,7 6,15 -3,26 -11,13 -10,18 3,33 57,62 74,197 38,292 -11,28 -44,81 -74,118 -95,117 -160,221 -148,236 9,10 3,21 -24,45 l -35,31 20,20 c 26,26 26,74 0,100 -11,11 -33,20 -50,20 -17,0 -39,-9 -50,-20 z m 84,-16 c 34,-33 16,-69 -34,-69 -19,0 -38,4 -42,10 -21,28 6,75 42,75 10,0 26,-7 34,-16 z m -130,-310 c -9,-21 -41,-92 -71,-157 -69,-151 -77,-217 -37,-322 5,-13 2,-16 -17,-13 -29,4 -66,65 -75,125 -9,63 19,147 79,228 28,39 69,96 91,127 22,32 41,56 43,54 2,-1 -4,-20 -13,-42 z m 241,-36 c 128,-180 135,-194 146,-254 13,-66 4,-116 -31,-171 -21,-35 -68,-49 -56,-17 35,90 32,169 -9,260 -82,181 -113,254 -107,254 4,-1 30,-33 57,-72 z m -97,-76 c 10,-20 35,-67 55,-104 58,-103 60,-193 6,-262 -19,-24 -26,-26 -109,-26 -84,0 -90,1 -109,26 -55,71 -51,164 13,274 36,63 59,117 93,220 3,8 11,-9 19,-38 7,-29 22,-69 32,-90 z M 1613,718 c 3,-22 15,-54 27,-70 28,-38 3,-38 -38,0 -48,45 -56,112 -14,112 15,0 21,-9 25,-42 z m 277,8 c 0,-21 -11,-41 -34,-66 -19,-19 -41,-48 -50,-64 -14,-27 -15,-27 -25,-8 -6,12 -29,42 -51,67 -26,30 -40,56 -40,74 v 28 h 100 l 100,-1 z m 128,11 c 6,-29 -18,-76 -50,-98 -38,-27 -44,-20 -19,22 12,19 21,49 21,67 0,29 3,33 22,30 13,-2 24,-11 26,-21 z"
       id="path5" />
    <path
       d="m 2733,1700 c -49,-20 -58,-93 -17,-137 l 26,-28 -44,-11 c -63,-16 -101,-38 -138,-80 -37,-42 -60,-92 -60,-128 0,-17 -7,-26 -25,-30 -62,-16 -47,-96 18,-96 h 32 l -3,-197 c -1,-109 -2,-213 -2,-230 0,-28 -4,-33 -23,-33 -26,0 -52,-17 -60,-41 -6,-19 18,-59 37,-59 7,0 18,-23 25,-54 36,-163 237,-242 406,-161 27,13 57,30 65,37 32,27 60,77 70,125 8,35 17,51 33,58 29,13 36,64 11,82 -10,7 -30,13 -46,13 h -28 v 230 230 h 33 c 41,0 57,15 57,53 0,23 -6,31 -30,40 -20,7 -30,18 -30,32 -1,28 -37,105 -63,133 -32,34 -82,63 -134,76 l -45,12 26,31 c 41,49 32,103 -21,131 -25,14 -40,14 -70,2 z m 83,-45 c 27,-41 8,-69 -45,-70 -36,-1 -45,3 -54,22 -7,17 -6,28 7,48 23,34 69,34 92,0 z M 2610,965 V 780 h -30 -30 v 185 185 h 30 30 z m 258,-2 2,-183 h -100 -100 v 185 186 l 98,-3 97,-3 z m 120,0 2,-183 h -30 -30 v 186 185 l 28,-3 27,-3 z"
       id="path6" />
  </g>`,
    },
    {
      viewBox: "0 0 56.712639 120.90999",
      gContent: `<g
     transform="matrix(0.1,0,0,-0.1,-248.60001,321.90998)"
     fill="LANTERN_COLOR"
     stroke="none"
     id="g6">
    <path
       d="m 743,3205 c -39,-27 -38,-82 4,-123 7,-7 13,-18 13,-23 0,-5 -58,-69 -130,-143 L 500,2782 v -54 c 0,-36 7,-64 20,-86 19,-30 21,-52 23,-240 2,-193 1,-208 -17,-223 -27,-23 -14,-49 24,-49 22,0 38,-9 56,-30 16,-19 38,-31 62,-35 20,-3 55,-14 77,-24 39,-18 41,-18 75,0 19,11 45,19 58,19 31,0 79,26 92,50 7,14 21,20 44,20 43,0 57,27 27,52 -20,15 -21,26 -21,212 0,190 1,198 25,246 27,53 32,108 14,143 -7,12 -65,77 -130,144 -66,66 -119,126 -119,131 0,6 6,17 13,24 55,55 32,138 -38,138 -11,0 -30,-7 -42,-15 z m 69,-17 c 20,-17 28,-42 18,-58 -9,-15 -90,-24 -90,-10 0,5 -3,15 -6,23 -6,17 28,57 49,57 7,0 20,-6 29,-12 z M 678,2554 c 21,-15 22,-21 22,-175 v -159 h -55 -55 v 159 c 0,132 3,162 16,175 20,20 43,20 72,0 z m 152,-24 c 5,-10 10,-84 10,-164 v -146 h -55 -55 v 153 c 0,83 4,157 8,163 25,37 71,34 92,-6 z m 132,23 c 16,-14 18,-34 18,-175 v -158 h -55 -55 v 157 c 0,132 3,159 17,175 20,22 51,23 75,1 z"
       id="path1" />
    <path
       d="m 2720,3200 c -28,-28 -25,-72 6,-109 l 26,-31 -26,-34 c -31,-41 -73,-68 -142,-90 -66,-21 -98,-55 -98,-103 0,-28 7,-42 32,-63 l 32,-26 v -292 -291 l 55,-38 c 30,-21 55,-42 55,-46 0,-4 -7,-21 -15,-37 l -16,-30 h 142 141 l -16,25 c -25,38 -20,49 39,90 l 55,37 v 294 c 0,283 1,294 20,304 33,18 52,64 39,97 -17,44 -36,60 -107,85 -64,22 -152,89 -152,115 0,5 11,22 25,37 15,16 25,39 25,56 0,60 -78,92 -120,50 z m 84,-16 c 34,-33 16,-69 -34,-69 -19,0 -38,4 -42,10 -21,28 6,75 42,75 10,0 26,-7 34,-16 z m -169,-734 v -260 h -27 -28 v 260 260 h 28 27 z m 215,0 v -260 h -80 -80 v 260 260 h 80 80 z m 110,0 v -260 h -30 -30 v 260 260 h 30 30 z"
       id="path2" />
    <path
       d="m 1745,3175 c -31,-30 -32,-64 -4,-99 11,-15 19,-33 16,-40 -3,-8 -30,-31 -61,-53 -60,-42 -81,-76 -70,-116 5,-21 3,-27 -10,-27 -10,0 -19,-11 -22,-30 -6,-26 -11,-30 -41,-30 -43,0 -56,-26 -25,-51 22,-17 22,-21 22,-327 v -311 l -22,-3 c -15,-2 -23,-10 -23,-23 0,-19 8,-20 288,-23 l 287,-2 v 25 c 0,20 -5,25 -25,25 h -25 v 311 c 0,307 0,311 22,328 31,25 18,51 -25,51 -30,0 -35,4 -40,30 -4,18 -13,30 -23,30 -12,0 -14,6 -9,29 9,41 -6,64 -71,112 -66,49 -73,63 -45,93 30,32 28,79 -5,105 -35,27 -59,26 -89,-4 z m 88,-19 c 4,-6 6,-22 5,-36 -3,-21 -8,-24 -43,-26 -57,-2 -73,28 -34,67 21,21 56,19 72,-5 z m -201,-513 c 22,-25 26,-45 17,-70 -5,-15 -3,-25 7,-33 11,-10 14,-48 14,-194 0,-196 -2,-206 -52,-206 h -28 v 260 c 0,211 3,260 13,260 8,0 21,-8 29,-17 z m 204,-8 c 10,-15 14,-37 12,-55 -3,-18 1,-35 9,-41 10,-9 13,-53 13,-184 0,-96 -3,-180 -6,-189 -9,-23 -139,-23 -148,0 -12,31 -7,359 6,372 7,7 11,28 10,47 -6,66 70,102 104,50 z m 154,-235 v -260 h -28 c -15,0 -33,5 -40,12 -15,15 -17,374 -3,383 6,3 9,23 8,45 -1,40 23,80 50,80 10,0 13,-49 13,-260 z"
       id="path3" />
    <path
       d="m 735,1705 c -30,-29 -32,-68 -5,-95 l 20,-20 -62,-59 -63,-59 1,-58 c 0,-55 -2,-59 -43,-97 l -43,-40 V 1007 737 l 40,-34 c 38,-33 40,-37 40,-91 0,-71 24,-113 85,-150 24,-15 45,-34 45,-43 0,-9 7,-22 16,-30 21,-17 49,0 48,29 0,14 8,24 25,30 72,25 117,96 109,173 -3,37 0,44 39,80 l 43,39 v 268 268 l -46,38 c -45,37 -46,40 -39,82 8,55 -8,87 -76,148 -31,28 -48,50 -42,54 57,38 19,132 -53,132 -8,0 -26,-11 -39,-25 z m 74,-5 c 4,0 13,-10 18,-23 15,-31 -1,-60 -28,-52 -11,4 -26,1 -34,-5 -11,-9 -16,-7 -24,9 -6,11 -11,24 -11,30 0,19 41,53 57,47 8,-3 18,-6 22,-6 z m -151,-692 2,-248 h -50 -50 v 243 c 0,134 3,247 7,251 4,4 25,6 48,4 l 40,-3 z m 190,0 2,-248 h -65 -65 v 243 c 0,134 3,247 7,251 4,4 32,6 63,4 l 55,-3 z m 152,2 V 760 h -45 -45 v 250 250 h 45 45 z"
       id="path4" />
    <path
       d="m 1740,1710 c -26,-26 -26,-74 2,-102 23,-23 26,-19 -36,-63 -16,-12 -17,-17 -7,-29 10,-12 2,-30 -48,-103 -33,-48 -83,-117 -111,-153 -59,-77 -82,-140 -81,-221 1,-62 16,-110 52,-160 17,-24 19,-32 8,-45 -9,-11 -9,-18 -1,-26 7,-7 9,-32 6,-67 -7,-68 11,-97 91,-142 29,-16 65,-41 80,-54 24,-23 25,-27 11,-41 -20,-19 -15,-28 24,-44 23,-10 29,-17 25,-34 -8,-31 8,-48 41,-44 25,3 29,7 28,34 -1,26 4,34 32,48 37,17 43,33 18,43 -22,8 24,54 92,93 79,44 97,73 91,142 -3,33 -1,60 6,67 7,7 6,15 -3,26 -11,13 -10,18 3,33 57,62 74,197 38,292 -11,28 -44,81 -74,118 -95,117 -160,221 -148,236 9,10 3,21 -24,45 l -35,31 20,20 c 26,26 26,74 0,100 -11,11 -33,20 -50,20 -17,0 -39,-9 -50,-20 z m 84,-16 c 34,-33 16,-69 -34,-69 -19,0 -38,4 -42,10 -21,28 6,75 42,75 10,0 26,-7 34,-16 z m -130,-310 c -9,-21 -41,-92 -71,-157 -69,-151 -77,-217 -37,-322 5,-13 2,-16 -17,-13 -29,4 -66,65 -75,125 -9,63 19,147 79,228 28,39 69,96 91,127 22,32 41,56 43,54 2,-1 -4,-20 -13,-42 z m 241,-36 c 128,-180 135,-194 146,-254 13,-66 4,-116 -31,-171 -21,-35 -68,-49 -56,-17 35,90 32,169 -9,260 -82,181 -113,254 -107,254 4,-1 30,-33 57,-72 z m -97,-76 c 10,-20 35,-67 55,-104 58,-103 60,-193 6,-262 -19,-24 -26,-26 -109,-26 -84,0 -90,1 -109,26 -55,71 -51,164 13,274 36,63 59,117 93,220 3,8 11,-9 19,-38 7,-29 22,-69 32,-90 z M 1613,718 c 3,-22 15,-54 27,-70 28,-38 3,-38 -38,0 -48,45 -56,112 -14,112 15,0 21,-9 25,-42 z m 277,8 c 0,-21 -11,-41 -34,-66 -19,-19 -41,-48 -50,-64 -14,-27 -15,-27 -25,-8 -6,12 -29,42 -51,67 -26,30 -40,56 -40,74 v 28 h 100 l 100,-1 z m 128,11 c 6,-29 -18,-76 -50,-98 -38,-27 -44,-20 -19,22 12,19 21,49 21,67 0,29 3,33 22,30 13,-2 24,-11 26,-21 z"
       id="path5" />
    <path
       d="m 2733,1700 c -49,-20 -58,-93 -17,-137 l 26,-28 -44,-11 c -63,-16 -101,-38 -138,-80 -37,-42 -60,-92 -60,-128 0,-17 -7,-26 -25,-30 -62,-16 -47,-96 18,-96 h 32 l -3,-197 c -1,-109 -2,-213 -2,-230 0,-28 -4,-33 -23,-33 -26,0 -52,-17 -60,-41 -6,-19 18,-59 37,-59 7,0 18,-23 25,-54 36,-163 237,-242 406,-161 27,13 57,30 65,37 32,27 60,77 70,125 8,35 17,51 33,58 29,13 36,64 11,82 -10,7 -30,13 -46,13 h -28 v 230 230 h 33 c 41,0 57,15 57,53 0,23 -6,31 -30,40 -20,7 -30,18 -30,32 -1,28 -37,105 -63,133 -32,34 -82,63 -134,76 l -45,12 26,31 c 41,49 32,103 -21,131 -25,14 -40,14 -70,2 z m 83,-45 c 27,-41 8,-69 -45,-70 -36,-1 -45,3 -54,22 -7,17 -6,28 7,48 23,34 69,34 92,0 z M 2610,965 V 780 h -30 -30 v 185 185 h 30 30 z m 258,-2 2,-183 h -100 -100 v 185 186 l 98,-3 97,-3 z m 120,0 2,-183 h -30 -30 v 186 185 l 28,-3 27,-3 z"
       id="path6" />
  </g>`,
    },
    {
      viewBox: "0 0 57.500004 115.84162",
      gContent: `<g
     transform="matrix(0.1,0,0,-0.1,-150.5,319.84161)"
     fill="LANTERN_COLOR"
     stroke="none"
     id="g6">
    <path
       d="m 743,3205 c -39,-27 -38,-82 4,-123 7,-7 13,-18 13,-23 0,-5 -58,-69 -130,-143 L 500,2782 v -54 c 0,-36 7,-64 20,-86 19,-30 21,-52 23,-240 2,-193 1,-208 -17,-223 -27,-23 -14,-49 24,-49 22,0 38,-9 56,-30 16,-19 38,-31 62,-35 20,-3 55,-14 77,-24 39,-18 41,-18 75,0 19,11 45,19 58,19 31,0 79,26 92,50 7,14 21,20 44,20 43,0 57,27 27,52 -20,15 -21,26 -21,212 0,190 1,198 25,246 27,53 32,108 14,143 -7,12 -65,77 -130,144 -66,66 -119,126 -119,131 0,6 6,17 13,24 55,55 32,138 -38,138 -11,0 -30,-7 -42,-15 z m 69,-17 c 20,-17 28,-42 18,-58 -9,-15 -90,-24 -90,-10 0,5 -3,15 -6,23 -6,17 28,57 49,57 7,0 20,-6 29,-12 z M 678,2554 c 21,-15 22,-21 22,-175 v -159 h -55 -55 v 159 c 0,132 3,162 16,175 20,20 43,20 72,0 z m 152,-24 c 5,-10 10,-84 10,-164 v -146 h -55 -55 v 153 c 0,83 4,157 8,163 25,37 71,34 92,-6 z m 132,23 c 16,-14 18,-34 18,-175 v -158 h -55 -55 v 157 c 0,132 3,159 17,175 20,22 51,23 75,1 z"
       id="path1" />
    <path
       d="m 2720,3200 c -28,-28 -25,-72 6,-109 l 26,-31 -26,-34 c -31,-41 -73,-68 -142,-90 -66,-21 -98,-55 -98,-103 0,-28 7,-42 32,-63 l 32,-26 v -292 -291 l 55,-38 c 30,-21 55,-42 55,-46 0,-4 -7,-21 -15,-37 l -16,-30 h 142 141 l -16,25 c -25,38 -20,49 39,90 l 55,37 v 294 c 0,283 1,294 20,304 33,18 52,64 39,97 -17,44 -36,60 -107,85 -64,22 -152,89 -152,115 0,5 11,22 25,37 15,16 25,39 25,56 0,60 -78,92 -120,50 z m 84,-16 c 34,-33 16,-69 -34,-69 -19,0 -38,4 -42,10 -21,28 6,75 42,75 10,0 26,-7 34,-16 z m -169,-734 v -260 h -27 -28 v 260 260 h 28 27 z m 215,0 v -260 h -80 -80 v 260 260 h 80 80 z m 110,0 v -260 h -30 -30 v 260 260 h 30 30 z"
       id="path2" />
    <path
       d="m 1745,3175 c -31,-30 -32,-64 -4,-99 11,-15 19,-33 16,-40 -3,-8 -30,-31 -61,-53 -60,-42 -81,-76 -70,-116 5,-21 3,-27 -10,-27 -10,0 -19,-11 -22,-30 -6,-26 -11,-30 -41,-30 -43,0 -56,-26 -25,-51 22,-17 22,-21 22,-327 v -311 l -22,-3 c -15,-2 -23,-10 -23,-23 0,-19 8,-20 288,-23 l 287,-2 v 25 c 0,20 -5,25 -25,25 h -25 v 311 c 0,307 0,311 22,328 31,25 18,51 -25,51 -30,0 -35,4 -40,30 -4,18 -13,30 -23,30 -12,0 -14,6 -9,29 9,41 -6,64 -71,112 -66,49 -73,63 -45,93 30,32 28,79 -5,105 -35,27 -59,26 -89,-4 z m 88,-19 c 4,-6 6,-22 5,-36 -3,-21 -8,-24 -43,-26 -57,-2 -73,28 -34,67 21,21 56,19 72,-5 z m -201,-513 c 22,-25 26,-45 17,-70 -5,-15 -3,-25 7,-33 11,-10 14,-48 14,-194 0,-196 -2,-206 -52,-206 h -28 v 260 c 0,211 3,260 13,260 8,0 21,-8 29,-17 z m 204,-8 c 10,-15 14,-37 12,-55 -3,-18 1,-35 9,-41 10,-9 13,-53 13,-184 0,-96 -3,-180 -6,-189 -9,-23 -139,-23 -148,0 -12,31 -7,359 6,372 7,7 11,28 10,47 -6,66 70,102 104,50 z m 154,-235 v -260 h -28 c -15,0 -33,5 -40,12 -15,15 -17,374 -3,383 6,3 9,23 8,45 -1,40 23,80 50,80 10,0 13,-49 13,-260 z"
       id="path3" />
    <path
       d="m 735,1705 c -30,-29 -32,-68 -5,-95 l 20,-20 -62,-59 -63,-59 1,-58 c 0,-55 -2,-59 -43,-97 l -43,-40 V 1007 737 l 40,-34 c 38,-33 40,-37 40,-91 0,-71 24,-113 85,-150 24,-15 45,-34 45,-43 0,-9 7,-22 16,-30 21,-17 49,0 48,29 0,14 8,24 25,30 72,25 117,96 109,173 -3,37 0,44 39,80 l 43,39 v 268 268 l -46,38 c -45,37 -46,40 -39,82 8,55 -8,87 -76,148 -31,28 -48,50 -42,54 57,38 19,132 -53,132 -8,0 -26,-11 -39,-25 z m 74,-5 c 4,0 13,-10 18,-23 15,-31 -1,-60 -28,-52 -11,4 -26,1 -34,-5 -11,-9 -16,-7 -24,9 -6,11 -11,24 -11,30 0,19 41,53 57,47 8,-3 18,-6 22,-6 z m -151,-692 2,-248 h -50 -50 v 243 c 0,134 3,247 7,251 4,4 25,6 48,4 l 40,-3 z m 190,0 2,-248 h -65 -65 v 243 c 0,134 3,247 7,251 4,4 32,6 63,4 l 55,-3 z m 152,2 V 760 h -45 -45 v 250 250 h 45 45 z"
       id="path4" />
    <path
       d="m 1740,1710 c -26,-26 -26,-74 2,-102 23,-23 26,-19 -36,-63 -16,-12 -17,-17 -7,-29 10,-12 2,-30 -48,-103 -33,-48 -83,-117 -111,-153 -59,-77 -82,-140 -81,-221 1,-62 16,-110 52,-160 17,-24 19,-32 8,-45 -9,-11 -9,-18 -1,-26 7,-7 9,-32 6,-67 -7,-68 11,-97 91,-142 29,-16 65,-41 80,-54 24,-23 25,-27 11,-41 -20,-19 -15,-28 24,-44 23,-10 29,-17 25,-34 -8,-31 8,-48 41,-44 25,3 29,7 28,34 -1,26 4,34 32,48 37,17 43,33 18,43 -22,8 24,54 92,93 79,44 97,73 91,142 -3,33 -1,60 6,67 7,7 6,15 -3,26 -11,13 -10,18 3,33 57,62 74,197 38,292 -11,28 -44,81 -74,118 -95,117 -160,221 -148,236 9,10 3,21 -24,45 l -35,31 20,20 c 26,26 26,74 0,100 -11,11 -33,20 -50,20 -17,0 -39,-9 -50,-20 z m 84,-16 c 34,-33 16,-69 -34,-69 -19,0 -38,4 -42,10 -21,28 6,75 42,75 10,0 26,-7 34,-16 z m -130,-310 c -9,-21 -41,-92 -71,-157 -69,-151 -77,-217 -37,-322 5,-13 2,-16 -17,-13 -29,4 -66,65 -75,125 -9,63 19,147 79,228 28,39 69,96 91,127 22,32 41,56 43,54 2,-1 -4,-20 -13,-42 z m 241,-36 c 128,-180 135,-194 146,-254 13,-66 4,-116 -31,-171 -21,-35 -68,-49 -56,-17 35,90 32,169 -9,260 -82,181 -113,254 -107,254 4,-1 30,-33 57,-72 z m -97,-76 c 10,-20 35,-67 55,-104 58,-103 60,-193 6,-262 -19,-24 -26,-26 -109,-26 -84,0 -90,1 -109,26 -55,71 -51,164 13,274 36,63 59,117 93,220 3,8 11,-9 19,-38 7,-29 22,-69 32,-90 z M 1613,718 c 3,-22 15,-54 27,-70 28,-38 3,-38 -38,0 -48,45 -56,112 -14,112 15,0 21,-9 25,-42 z m 277,8 c 0,-21 -11,-41 -34,-66 -19,-19 -41,-48 -50,-64 -14,-27 -15,-27 -25,-8 -6,12 -29,42 -51,67 -26,30 -40,56 -40,74 v 28 h 100 l 100,-1 z m 128,11 c 6,-29 -18,-76 -50,-98 -38,-27 -44,-20 -19,22 12,19 21,49 21,67 0,29 3,33 22,30 13,-2 24,-11 26,-21 z"
       id="path5" />
    <path
       d="m 2733,1700 c -49,-20 -58,-93 -17,-137 l 26,-28 -44,-11 c -63,-16 -101,-38 -138,-80 -37,-42 -60,-92 -60,-128 0,-17 -7,-26 -25,-30 -62,-16 -47,-96 18,-96 h 32 l -3,-197 c -1,-109 -2,-213 -2,-230 0,-28 -4,-33 -23,-33 -26,0 -52,-17 -60,-41 -6,-19 18,-59 37,-59 7,0 18,-23 25,-54 36,-163 237,-242 406,-161 27,13 57,30 65,37 32,27 60,77 70,125 8,35 17,51 33,58 29,13 36,64 11,82 -10,7 -30,13 -46,13 h -28 v 230 230 h 33 c 41,0 57,15 57,53 0,23 -6,31 -30,40 -20,7 -30,18 -30,32 -1,28 -37,105 -63,133 -32,34 -82,63 -134,76 l -45,12 26,31 c 41,49 32,103 -21,131 -25,14 -40,14 -70,2 z m 83,-45 c 27,-41 8,-69 -45,-70 -36,-1 -45,3 -54,22 -7,17 -6,28 7,48 23,34 69,34 92,0 z M 2610,965 V 780 h -30 -30 v 185 185 h 30 30 z m 258,-2 2,-183 h -100 -100 v 185 186 l 98,-3 97,-3 z m 120,0 2,-183 h -30 -30 v 186 185 l 28,-3 27,-3 z"
       id="path6" />
  </g>`,
    },
    {
      viewBox: "0 0 48.999996 134.77687",
      gContent: `<g
     transform="matrix(0.1,0,0,-0.1,-54,172.99999)"
     fill="LANTERN_COLOR"
     stroke="none"
     id="g6">
    <path
       d="m 743,3205 c -39,-27 -38,-82 4,-123 7,-7 13,-18 13,-23 0,-5 -58,-69 -130,-143 L 500,2782 v -54 c 0,-36 7,-64 20,-86 19,-30 21,-52 23,-240 2,-193 1,-208 -17,-223 -27,-23 -14,-49 24,-49 22,0 38,-9 56,-30 16,-19 38,-31 62,-35 20,-3 55,-14 77,-24 39,-18 41,-18 75,0 19,11 45,19 58,19 31,0 79,26 92,50 7,14 21,20 44,20 43,0 57,27 27,52 -20,15 -21,26 -21,212 0,190 1,198 25,246 27,53 32,108 14,143 -7,12 -65,77 -130,144 -66,66 -119,126 -119,131 0,6 6,17 13,24 55,55 32,138 -38,138 -11,0 -30,-7 -42,-15 z m 69,-17 c 20,-17 28,-42 18,-58 -9,-15 -90,-24 -90,-10 0,5 -3,15 -6,23 -6,17 28,57 49,57 7,0 20,-6 29,-12 z M 678,2554 c 21,-15 22,-21 22,-175 v -159 h -55 -55 v 159 c 0,132 3,162 16,175 20,20 43,20 72,0 z m 152,-24 c 5,-10 10,-84 10,-164 v -146 h -55 -55 v 153 c 0,83 4,157 8,163 25,37 71,34 92,-6 z m 132,23 c 16,-14 18,-34 18,-175 v -158 h -55 -55 v 157 c 0,132 3,159 17,175 20,22 51,23 75,1 z"
       id="path1" />
    <path
       d="m 2720,3200 c -28,-28 -25,-72 6,-109 l 26,-31 -26,-34 c -31,-41 -73,-68 -142,-90 -66,-21 -98,-55 -98,-103 0,-28 7,-42 32,-63 l 32,-26 v -292 -291 l 55,-38 c 30,-21 55,-42 55,-46 0,-4 -7,-21 -15,-37 l -16,-30 h 142 141 l -16,25 c -25,38 -20,49 39,90 l 55,37 v 294 c 0,283 1,294 20,304 33,18 52,64 39,97 -17,44 -36,60 -107,85 -64,22 -152,89 -152,115 0,5 11,22 25,37 15,16 25,39 25,56 0,60 -78,92 -120,50 z m 84,-16 c 34,-33 16,-69 -34,-69 -19,0 -38,4 -42,10 -21,28 6,75 42,75 10,0 26,-7 34,-16 z m -169,-734 v -260 h -27 -28 v 260 260 h 28 27 z m 215,0 v -260 h -80 -80 v 260 260 h 80 80 z m 110,0 v -260 h -30 -30 v 260 260 h 30 30 z"
       id="path2" />
    <path
       d="m 1745,3175 c -31,-30 -32,-64 -4,-99 11,-15 19,-33 16,-40 -3,-8 -30,-31 -61,-53 -60,-42 -81,-76 -70,-116 5,-21 3,-27 -10,-27 -10,0 -19,-11 -22,-30 -6,-26 -11,-30 -41,-30 -43,0 -56,-26 -25,-51 22,-17 22,-21 22,-327 v -311 l -22,-3 c -15,-2 -23,-10 -23,-23 0,-19 8,-20 288,-23 l 287,-2 v 25 c 0,20 -5,25 -25,25 h -25 v 311 c 0,307 0,311 22,328 31,25 18,51 -25,51 -30,0 -35,4 -40,30 -4,18 -13,30 -23,30 -12,0 -14,6 -9,29 9,41 -6,64 -71,112 -66,49 -73,63 -45,93 30,32 28,79 -5,105 -35,27 -59,26 -89,-4 z m 88,-19 c 4,-6 6,-22 5,-36 -3,-21 -8,-24 -43,-26 -57,-2 -73,28 -34,67 21,21 56,19 72,-5 z m -201,-513 c 22,-25 26,-45 17,-70 -5,-15 -3,-25 7,-33 11,-10 14,-48 14,-194 0,-196 -2,-206 -52,-206 h -28 v 260 c 0,211 3,260 13,260 8,0 21,-8 29,-17 z m 204,-8 c 10,-15 14,-37 12,-55 -3,-18 1,-35 9,-41 10,-9 13,-53 13,-184 0,-96 -3,-180 -6,-189 -9,-23 -139,-23 -148,0 -12,31 -7,359 6,372 7,7 11,28 10,47 -6,66 70,102 104,50 z m 154,-235 v -260 h -28 c -15,0 -33,5 -40,12 -15,15 -17,374 -3,383 6,3 9,23 8,45 -1,40 23,80 50,80 10,0 13,-49 13,-260 z"
       id="path3" />
    <path
       d="m 735,1705 c -30,-29 -32,-68 -5,-95 l 20,-20 -62,-59 -63,-59 1,-58 c 0,-55 -2,-59 -43,-97 l -43,-40 V 1007 737 l 40,-34 c 38,-33 40,-37 40,-91 0,-71 24,-113 85,-150 24,-15 45,-34 45,-43 0,-9 7,-22 16,-30 21,-17 49,0 48,29 0,14 8,24 25,30 72,25 117,96 109,173 -3,37 0,44 39,80 l 43,39 v 268 268 l -46,38 c -45,37 -46,40 -39,82 8,55 -8,87 -76,148 -31,28 -48,50 -42,54 57,38 19,132 -53,132 -8,0 -26,-11 -39,-25 z m 74,-5 c 4,0 13,-10 18,-23 15,-31 -1,-60 -28,-52 -11,4 -26,1 -34,-5 -11,-9 -16,-7 -24,9 -6,11 -11,24 -11,30 0,19 41,53 57,47 8,-3 18,-6 22,-6 z m -151,-692 2,-248 h -50 -50 v 243 c 0,134 3,247 7,251 4,4 25,6 48,4 l 40,-3 z m 190,0 2,-248 h -65 -65 v 243 c 0,134 3,247 7,251 4,4 32,6 63,4 l 55,-3 z m 152,2 V 760 h -45 -45 v 250 250 h 45 45 z"
       id="path4" />
    <path
       d="m 1740,1710 c -26,-26 -26,-74 2,-102 23,-23 26,-19 -36,-63 -16,-12 -17,-17 -7,-29 10,-12 2,-30 -48,-103 -33,-48 -83,-117 -111,-153 -59,-77 -82,-140 -81,-221 1,-62 16,-110 52,-160 17,-24 19,-32 8,-45 -9,-11 -9,-18 -1,-26 7,-7 9,-32 6,-67 -7,-68 11,-97 91,-142 29,-16 65,-41 80,-54 24,-23 25,-27 11,-41 -20,-19 -15,-28 24,-44 23,-10 29,-17 25,-34 -8,-31 8,-48 41,-44 25,3 29,7 28,34 -1,26 4,34 32,48 37,17 43,33 18,43 -22,8 24,54 92,93 79,44 97,73 91,142 -3,33 -1,60 6,67 7,7 6,15 -3,26 -11,13 -10,18 3,33 57,62 74,197 38,292 -11,28 -44,81 -74,118 -95,117 -160,221 -148,236 9,10 3,21 -24,45 l -35,31 20,20 c 26,26 26,74 0,100 -11,11 -33,20 -50,20 -17,0 -39,-9 -50,-20 z m 84,-16 c 34,-33 16,-69 -34,-69 -19,0 -38,4 -42,10 -21,28 6,75 42,75 10,0 26,-7 34,-16 z m -130,-310 c -9,-21 -41,-92 -71,-157 -69,-151 -77,-217 -37,-322 5,-13 2,-16 -17,-13 -29,4 -66,65 -75,125 -9,63 19,147 79,228 28,39 69,96 91,127 22,32 41,56 43,54 2,-1 -4,-20 -13,-42 z m 241,-36 c 128,-180 135,-194 146,-254 13,-66 4,-116 -31,-171 -21,-35 -68,-49 -56,-17 35,90 32,169 -9,260 -82,181 -113,254 -107,254 4,-1 30,-33 57,-72 z m -97,-76 c 10,-20 35,-67 55,-104 58,-103 60,-193 6,-262 -19,-24 -26,-26 -109,-26 -84,0 -90,1 -109,26 -55,71 -51,164 13,274 36,63 59,117 93,220 3,8 11,-9 19,-38 7,-29 22,-69 32,-90 z M 1613,718 c 3,-22 15,-54 27,-70 28,-38 3,-38 -38,0 -48,45 -56,112 -14,112 15,0 21,-9 25,-42 z m 277,8 c 0,-21 -11,-41 -34,-66 -19,-19 -41,-48 -50,-64 -14,-27 -15,-27 -25,-8 -6,12 -29,42 -51,67 -26,30 -40,56 -40,74 v 28 h 100 l 100,-1 z m 128,11 c 6,-29 -18,-76 -50,-98 -38,-27 -44,-20 -19,22 12,19 21,49 21,67 0,29 3,33 22,30 13,-2 24,-11 26,-21 z"
       id="path5" />
    <path
       d="m 2733,1700 c -49,-20 -58,-93 -17,-137 l 26,-28 -44,-11 c -63,-16 -101,-38 -138,-80 -37,-42 -60,-92 -60,-128 0,-17 -7,-26 -25,-30 -62,-16 -47,-96 18,-96 h 32 l -3,-197 c -1,-109 -2,-213 -2,-230 0,-28 -4,-33 -23,-33 -26,0 -52,-17 -60,-41 -6,-19 18,-59 37,-59 7,0 18,-23 25,-54 36,-163 237,-242 406,-161 27,13 57,30 65,37 32,27 60,77 70,125 8,35 17,51 33,58 29,13 36,64 11,82 -10,7 -30,13 -46,13 h -28 v 230 230 h 33 c 41,0 57,15 57,53 0,23 -6,31 -30,40 -20,7 -30,18 -30,32 -1,28 -37,105 -63,133 -32,34 -82,63 -134,76 l -45,12 26,31 c 41,49 32,103 -21,131 -25,14 -40,14 -70,2 z m 83,-45 c 27,-41 8,-69 -45,-70 -36,-1 -45,3 -54,22 -7,17 -6,28 7,48 23,34 69,34 92,0 z M 2610,965 V 780 h -30 -30 v 185 185 h 30 30 z m 258,-2 2,-183 h -100 -100 v 185 186 l 98,-3 97,-3 z m 120,0 2,-183 h -30 -30 v 186 185 l 28,-3 27,-3 z"
       id="path6" />
  </g>`,
    },
    {
      viewBox: "0 0 66.091484 134.85776",
      gContent: `<g
     transform="matrix(0.1,0,0,-0.1,-145.89688,173)"
     fill="LANTERN_COLOR"
     stroke="none"
     id="g6">
    <path
       d="m 743,3205 c -39,-27 -38,-82 4,-123 7,-7 13,-18 13,-23 0,-5 -58,-69 -130,-143 L 500,2782 v -54 c 0,-36 7,-64 20,-86 19,-30 21,-52 23,-240 2,-193 1,-208 -17,-223 -27,-23 -14,-49 24,-49 22,0 38,-9 56,-30 16,-19 38,-31 62,-35 20,-3 55,-14 77,-24 39,-18 41,-18 75,0 19,11 45,19 58,19 31,0 79,26 92,50 7,14 21,20 44,20 43,0 57,27 27,52 -20,15 -21,26 -21,212 0,190 1,198 25,246 27,53 32,108 14,143 -7,12 -65,77 -130,144 -66,66 -119,126 -119,131 0,6 6,17 13,24 55,55 32,138 -38,138 -11,0 -30,-7 -42,-15 z m 69,-17 c 20,-17 28,-42 18,-58 -9,-15 -90,-24 -90,-10 0,5 -3,15 -6,23 -6,17 28,57 49,57 7,0 20,-6 29,-12 z M 678,2554 c 21,-15 22,-21 22,-175 v -159 h -55 -55 v 159 c 0,132 3,162 16,175 20,20 43,20 72,0 z m 152,-24 c 5,-10 10,-84 10,-164 v -146 h -55 -55 v 153 c 0,83 4,157 8,163 25,37 71,34 92,-6 z m 132,23 c 16,-14 18,-34 18,-175 v -158 h -55 -55 v 157 c 0,132 3,159 17,175 20,22 51,23 75,1 z"
       id="path1" />
    <path
       d="m 2720,3200 c -28,-28 -25,-72 6,-109 l 26,-31 -26,-34 c -31,-41 -73,-68 -142,-90 -66,-21 -98,-55 -98,-103 0,-28 7,-42 32,-63 l 32,-26 v -292 -291 l 55,-38 c 30,-21 55,-42 55,-46 0,-4 -7,-21 -15,-37 l -16,-30 h 142 141 l -16,25 c -25,38 -20,49 39,90 l 55,37 v 294 c 0,283 1,294 20,304 33,18 52,64 39,97 -17,44 -36,60 -107,85 -64,22 -152,89 -152,115 0,5 11,22 25,37 15,16 25,39 25,56 0,60 -78,92 -120,50 z m 84,-16 c 34,-33 16,-69 -34,-69 -19,0 -38,4 -42,10 -21,28 6,75 42,75 10,0 26,-7 34,-16 z m -169,-734 v -260 h -27 -28 v 260 260 h 28 27 z m 215,0 v -260 h -80 -80 v 260 260 h 80 80 z m 110,0 v -260 h -30 -30 v 260 260 h 30 30 z"
       id="path2" />
    <path
       d="m 1745,3175 c -31,-30 -32,-64 -4,-99 11,-15 19,-33 16,-40 -3,-8 -30,-31 -61,-53 -60,-42 -81,-76 -70,-116 5,-21 3,-27 -10,-27 -10,0 -19,-11 -22,-30 -6,-26 -11,-30 -41,-30 -43,0 -56,-26 -25,-51 22,-17 22,-21 22,-327 v -311 l -22,-3 c -15,-2 -23,-10 -23,-23 0,-19 8,-20 288,-23 l 287,-2 v 25 c 0,20 -5,25 -25,25 h -25 v 311 c 0,307 0,311 22,328 31,25 18,51 -25,51 -30,0 -35,4 -40,30 -4,18 -13,30 -23,30 -12,0 -14,6 -9,29 9,41 -6,64 -71,112 -66,49 -73,63 -45,93 30,32 28,79 -5,105 -35,27 -59,26 -89,-4 z m 88,-19 c 4,-6 6,-22 5,-36 -3,-21 -8,-24 -43,-26 -57,-2 -73,28 -34,67 21,21 56,19 72,-5 z m -201,-513 c 22,-25 26,-45 17,-70 -5,-15 -3,-25 7,-33 11,-10 14,-48 14,-194 0,-196 -2,-206 -52,-206 h -28 v 260 c 0,211 3,260 13,260 8,0 21,-8 29,-17 z m 204,-8 c 10,-15 14,-37 12,-55 -3,-18 1,-35 9,-41 10,-9 13,-53 13,-184 0,-96 -3,-180 -6,-189 -9,-23 -139,-23 -148,0 -12,31 -7,359 6,372 7,7 11,28 10,47 -6,66 70,102 104,50 z m 154,-235 v -260 h -28 c -15,0 -33,5 -40,12 -15,15 -17,374 -3,383 6,3 9,23 8,45 -1,40 23,80 50,80 10,0 13,-49 13,-260 z"
       id="path3" />
    <path
       d="m 735,1705 c -30,-29 -32,-68 -5,-95 l 20,-20 -62,-59 -63,-59 1,-58 c 0,-55 -2,-59 -43,-97 l -43,-40 V 1007 737 l 40,-34 c 38,-33 40,-37 40,-91 0,-71 24,-113 85,-150 24,-15 45,-34 45,-43 0,-9 7,-22 16,-30 21,-17 49,0 48,29 0,14 8,24 25,30 72,25 117,96 109,173 -3,37 0,44 39,80 l 43,39 v 268 268 l -46,38 c -45,37 -46,40 -39,82 8,55 -8,87 -76,148 -31,28 -48,50 -42,54 57,38 19,132 -53,132 -8,0 -26,-11 -39,-25 z m 74,-5 c 4,0 13,-10 18,-23 15,-31 -1,-60 -28,-52 -11,4 -26,1 -34,-5 -11,-9 -16,-7 -24,9 -6,11 -11,24 -11,30 0,19 41,53 57,47 8,-3 18,-6 22,-6 z m -151,-692 2,-248 h -50 -50 v 243 c 0,134 3,247 7,251 4,4 25,6 48,4 l 40,-3 z m 190,0 2,-248 h -65 -65 v 243 c 0,134 3,247 7,251 4,4 32,6 63,4 l 55,-3 z m 152,2 V 760 h -45 -45 v 250 250 h 45 45 z"
       id="path4" />
    <path
       d="m 1740,1710 c -26,-26 -26,-74 2,-102 23,-23 26,-19 -36,-63 -16,-12 -17,-17 -7,-29 10,-12 2,-30 -48,-103 -33,-48 -83,-117 -111,-153 -59,-77 -82,-140 -81,-221 1,-62 16,-110 52,-160 17,-24 19,-32 8,-45 -9,-11 -9,-18 -1,-26 7,-7 9,-32 6,-67 -7,-68 11,-97 91,-142 29,-16 65,-41 80,-54 24,-23 25,-27 11,-41 -20,-19 -15,-28 24,-44 23,-10 29,-17 25,-34 -8,-31 8,-48 41,-44 25,3 29,7 28,34 -1,26 4,34 32,48 37,17 43,33 18,43 -22,8 24,54 92,93 79,44 97,73 91,142 -3,33 -1,60 6,67 7,7 6,15 -3,26 -11,13 -10,18 3,33 57,62 74,197 38,292 -11,28 -44,81 -74,118 -95,117 -160,221 -148,236 9,10 3,21 -24,45 l -35,31 20,20 c 26,26 26,74 0,100 -11,11 -33,20 -50,20 -17,0 -39,-9 -50,-20 z m 84,-16 c 34,-33 16,-69 -34,-69 -19,0 -38,4 -42,10 -21,28 6,75 42,75 10,0 26,-7 34,-16 z m -130,-310 c -9,-21 -41,-92 -71,-157 -69,-151 -77,-217 -37,-322 5,-13 2,-16 -17,-13 -29,4 -66,65 -75,125 -9,63 19,147 79,228 28,39 69,96 91,127 22,32 41,56 43,54 2,-1 -4,-20 -13,-42 z m 241,-36 c 128,-180 135,-194 146,-254 13,-66 4,-116 -31,-171 -21,-35 -68,-49 -56,-17 35,90 32,169 -9,260 -82,181 -113,254 -107,254 4,-1 30,-33 57,-72 z m -97,-76 c 10,-20 35,-67 55,-104 58,-103 60,-193 6,-262 -19,-24 -26,-26 -109,-26 -84,0 -90,1 -109,26 -55,71 -51,164 13,274 36,63 59,117 93,220 3,8 11,-9 19,-38 7,-29 22,-69 32,-90 z M 1613,718 c 3,-22 15,-54 27,-70 28,-38 3,-38 -38,0 -48,45 -56,112 -14,112 15,0 21,-9 25,-42 z m 277,8 c 0,-21 -11,-41 -34,-66 -19,-19 -41,-48 -50,-64 -14,-27 -15,-27 -25,-8 -6,12 -29,42 -51,67 -26,30 -40,56 -40,74 v 28 h 100 l 100,-1 z m 128,11 c 6,-29 -18,-76 -50,-98 -38,-27 -44,-20 -19,22 12,19 21,49 21,67 0,29 3,33 22,30 13,-2 24,-11 26,-21 z"
       id="path5" />
    <path
       d="m 2733,1700 c -49,-20 -58,-93 -17,-137 l 26,-28 -44,-11 c -63,-16 -101,-38 -138,-80 -37,-42 -60,-92 -60,-128 0,-17 -7,-26 -25,-30 -62,-16 -47,-96 18,-96 h 32 l -3,-197 c -1,-109 -2,-213 -2,-230 0,-28 -4,-33 -23,-33 -26,0 -52,-17 -60,-41 -6,-19 18,-59 37,-59 7,0 18,-23 25,-54 36,-163 237,-242 406,-161 27,13 57,30 65,37 32,27 60,77 70,125 8,35 17,51 33,58 29,13 36,64 11,82 -10,7 -30,13 -46,13 h -28 v 230 230 h 33 c 41,0 57,15 57,53 0,23 -6,31 -30,40 -20,7 -30,18 -30,32 -1,28 -37,105 -63,133 -32,34 -82,63 -134,76 l -45,12 26,31 c 41,49 32,103 -21,131 -25,14 -40,14 -70,2 z m 83,-45 c 27,-41 8,-69 -45,-70 -36,-1 -45,3 -54,22 -7,17 -6,28 7,48 23,34 69,34 92,0 z M 2610,965 V 780 h -30 -30 v 185 185 h 30 30 z m 258,-2 2,-183 h -100 -100 v 185 186 l 98,-3 97,-3 z m 120,0 2,-183 h -30 -30 v 186 185 l 28,-3 27,-3 z"
       id="path6" />
  </g>`,
    },
    {
      viewBox: "0 0 66.442177 132.58786",
      gContent: `<g
     transform="matrix(0.1,0,0,-0.1,-243.55783,170.87642)"
     fill="LANTERN_COLOR"
     stroke="none"
     id="g6">
    <path
       d="m 743,3205 c -39,-27 -38,-82 4,-123 7,-7 13,-18 13,-23 0,-5 -58,-69 -130,-143 L 500,2782 v -54 c 0,-36 7,-64 20,-86 19,-30 21,-52 23,-240 2,-193 1,-208 -17,-223 -27,-23 -14,-49 24,-49 22,0 38,-9 56,-30 16,-19 38,-31 62,-35 20,-3 55,-14 77,-24 39,-18 41,-18 75,0 19,11 45,19 58,19 31,0 79,26 92,50 7,14 21,20 44,20 43,0 57,27 27,52 -20,15 -21,26 -21,212 0,190 1,198 25,246 27,53 32,108 14,143 -7,12 -65,77 -130,144 -66,66 -119,126 -119,131 0,6 6,17 13,24 55,55 32,138 -38,138 -11,0 -30,-7 -42,-15 z m 69,-17 c 20,-17 28,-42 18,-58 -9,-15 -90,-24 -90,-10 0,5 -3,15 -6,23 -6,17 28,57 49,57 7,0 20,-6 29,-12 z M 678,2554 c 21,-15 22,-21 22,-175 v -159 h -55 -55 v 159 c 0,132 3,162 16,175 20,20 43,20 72,0 z m 152,-24 c 5,-10 10,-84 10,-164 v -146 h -55 -55 v 153 c 0,83 4,157 8,163 25,37 71,34 92,-6 z m 132,23 c 16,-14 18,-34 18,-175 v -158 h -55 -55 v 157 c 0,132 3,159 17,175 20,22 51,23 75,1 z"
       id="path1" />
    <path
       d="m 2720,3200 c -28,-28 -25,-72 6,-109 l 26,-31 -26,-34 c -31,-41 -73,-68 -142,-90 -66,-21 -98,-55 -98,-103 0,-28 7,-42 32,-63 l 32,-26 v -292 -291 l 55,-38 c 30,-21 55,-42 55,-46 0,-4 -7,-21 -15,-37 l -16,-30 h 142 141 l -16,25 c -25,38 -20,49 39,90 l 55,37 v 294 c 0,283 1,294 20,304 33,18 52,64 39,97 -17,44 -36,60 -107,85 -64,22 -152,89 -152,115 0,5 11,22 25,37 15,16 25,39 25,56 0,60 -78,92 -120,50 z m 84,-16 c 34,-33 16,-69 -34,-69 -19,0 -38,4 -42,10 -21,28 6,75 42,75 10,0 26,-7 34,-16 z m -169,-734 v -260 h -27 -28 v 260 260 h 28 27 z m 215,0 v -260 h -80 -80 v 260 260 h 80 80 z m 110,0 v -260 h -30 -30 v 260 260 h 30 30 z"
       id="path2" />
    <path
       d="m 1745,3175 c -31,-30 -32,-64 -4,-99 11,-15 19,-33 16,-40 -3,-8 -30,-31 -61,-53 -60,-42 -81,-76 -70,-116 5,-21 3,-27 -10,-27 -10,0 -19,-11 -22,-30 -6,-26 -11,-30 -41,-30 -43,0 -56,-26 -25,-51 22,-17 22,-21 22,-327 v -311 l -22,-3 c -15,-2 -23,-10 -23,-23 0,-19 8,-20 288,-23 l 287,-2 v 25 c 0,20 -5,25 -25,25 h -25 v 311 c 0,307 0,311 22,328 31,25 18,51 -25,51 -30,0 -35,4 -40,30 -4,18 -13,30 -23,30 -12,0 -14,6 -9,29 9,41 -6,64 -71,112 -66,49 -73,63 -45,93 30,32 28,79 -5,105 -35,27 -59,26 -89,-4 z m 88,-19 c 4,-6 6,-22 5,-36 -3,-21 -8,-24 -43,-26 -57,-2 -73,28 -34,67 21,21 56,19 72,-5 z m -201,-513 c 22,-25 26,-45 17,-70 -5,-15 -3,-25 7,-33 11,-10 14,-48 14,-194 0,-196 -2,-206 -52,-206 h -28 v 260 c 0,211 3,260 13,260 8,0 21,-8 29,-17 z m 204,-8 c 10,-15 14,-37 12,-55 -3,-18 1,-35 9,-41 10,-9 13,-53 13,-184 0,-96 -3,-180 -6,-189 -9,-23 -139,-23 -148,0 -12,31 -7,359 6,372 7,7 11,28 10,47 -6,66 70,102 104,50 z m 154,-235 v -260 h -28 c -15,0 -33,5 -40,12 -15,15 -17,374 -3,383 6,3 9,23 8,45 -1,40 23,80 50,80 10,0 13,-49 13,-260 z"
       id="path3" />
    <path
       d="m 735,1705 c -30,-29 -32,-68 -5,-95 l 20,-20 -62,-59 -63,-59 1,-58 c 0,-55 -2,-59 -43,-97 l -43,-40 V 1007 737 l 40,-34 c 38,-33 40,-37 40,-91 0,-71 24,-113 85,-150 24,-15 45,-34 45,-43 0,-9 7,-22 16,-30 21,-17 49,0 48,29 0,14 8,24 25,30 72,25 117,96 109,173 -3,37 0,44 39,80 l 43,39 v 268 268 l -46,38 c -45,37 -46,40 -39,82 8,55 -8,87 -76,148 -31,28 -48,50 -42,54 57,38 19,132 -53,132 -8,0 -26,-11 -39,-25 z m 74,-5 c 4,0 13,-10 18,-23 15,-31 -1,-60 -28,-52 -11,4 -26,1 -34,-5 -11,-9 -16,-7 -24,9 -6,11 -11,24 -11,30 0,19 41,53 57,47 8,-3 18,-6 22,-6 z m -151,-692 2,-248 h -50 -50 v 243 c 0,134 3,247 7,251 4,4 25,6 48,4 l 40,-3 z m 190,0 2,-248 h -65 -65 v 243 c 0,134 3,247 7,251 4,4 32,6 63,4 l 55,-3 z m 152,2 V 760 h -45 -45 v 250 250 h 45 45 z"
       id="path4" />
    <path
       d="m 1740,1710 c -26,-26 -26,-74 2,-102 23,-23 26,-19 -36,-63 -16,-12 -17,-17 -7,-29 10,-12 2,-30 -48,-103 -33,-48 -83,-117 -111,-153 -59,-77 -82,-140 -81,-221 1,-62 16,-110 52,-160 17,-24 19,-32 8,-45 -9,-11 -9,-18 -1,-26 7,-7 9,-32 6,-67 -7,-68 11,-97 91,-142 29,-16 65,-41 80,-54 24,-23 25,-27 11,-41 -20,-19 -15,-28 24,-44 23,-10 29,-17 25,-34 -8,-31 8,-48 41,-44 25,3 29,7 28,34 -1,26 4,34 32,48 37,17 43,33 18,43 -22,8 24,54 92,93 79,44 97,73 91,142 -3,33 -1,60 6,67 7,7 6,15 -3,26 -11,13 -10,18 3,33 57,62 74,197 38,292 -11,28 -44,81 -74,118 -95,117 -160,221 -148,236 9,10 3,21 -24,45 l -35,31 20,20 c 26,26 26,74 0,100 -11,11 -33,20 -50,20 -17,0 -39,-9 -50,-20 z m 84,-16 c 34,-33 16,-69 -34,-69 -19,0 -38,4 -42,10 -21,28 6,75 42,75 10,0 26,-7 34,-16 z m -130,-310 c -9,-21 -41,-92 -71,-157 -69,-151 -77,-217 -37,-322 5,-13 2,-16 -17,-13 -29,4 -66,65 -75,125 -9,63 19,147 79,228 28,39 69,96 91,127 22,32 41,56 43,54 2,-1 -4,-20 -13,-42 z m 241,-36 c 128,-180 135,-194 146,-254 13,-66 4,-116 -31,-171 -21,-35 -68,-49 -56,-17 35,90 32,169 -9,260 -82,181 -113,254 -107,254 4,-1 30,-33 57,-72 z m -97,-76 c 10,-20 35,-67 55,-104 58,-103 60,-193 6,-262 -19,-24 -26,-26 -109,-26 -84,0 -90,1 -109,26 -55,71 -51,164 13,274 36,63 59,117 93,220 3,8 11,-9 19,-38 7,-29 22,-69 32,-90 z M 1613,718 c 3,-22 15,-54 27,-70 28,-38 3,-38 -38,0 -48,45 -56,112 -14,112 15,0 21,-9 25,-42 z m 277,8 c 0,-21 -11,-41 -34,-66 -19,-19 -41,-48 -50,-64 -14,-27 -15,-27 -25,-8 -6,12 -29,42 -51,67 -26,30 -40,56 -40,74 v 28 h 100 l 100,-1 z m 128,11 c 6,-29 -18,-76 -50,-98 -38,-27 -44,-20 -19,22 12,19 21,49 21,67 0,29 3,33 22,30 13,-2 24,-11 26,-21 z"
       id="path5" />
    <path
       d="m 2733,1700 c -49,-20 -58,-93 -17,-137 l 26,-28 -44,-11 c -63,-16 -101,-38 -138,-80 -37,-42 -60,-92 -60,-128 0,-17 -7,-26 -25,-30 -62,-16 -47,-96 18,-96 h 32 l -3,-197 c -1,-109 -2,-213 -2,-230 0,-28 -4,-33 -23,-33 -26,0 -52,-17 -60,-41 -6,-19 18,-59 37,-59 7,0 18,-23 25,-54 36,-163 237,-242 406,-161 27,13 57,30 65,37 32,27 60,77 70,125 8,35 17,51 33,58 29,13 36,64 11,82 -10,7 -30,13 -46,13 h -28 v 230 230 h 33 c 41,0 57,15 57,53 0,23 -6,31 -30,40 -20,7 -30,18 -30,32 -1,28 -37,105 -63,133 -32,34 -82,63 -134,76 l -45,12 26,31 c 41,49 32,103 -21,131 -25,14 -40,14 -70,2 z m 83,-45 c 27,-41 8,-69 -45,-70 -36,-1 -45,3 -54,22 -7,17 -6,28 7,48 23,34 69,34 92,0 z M 2610,965 V 780 h -30 -30 v 185 185 h 30 30 z m 258,-2 2,-183 h -100 -100 v 185 186 l 98,-3 97,-3 z m 120,0 2,-183 h -30 -30 v 186 185 l 28,-3 27,-3 z"
       id="path6" />
  </g>`,
    },
  ],
  cc = (e, t) => {
    const n = t.colors,
      o = [
        "#c9a84c",
        "#e8c96b",
        "#8b4513",
        "#2d5a27",
        "#4a8a3a",
        "#8b1a1a",
        "#cc4444",
        "#1a3a6b",
        "#3a6ab8",
        "#6b2fa0",
        "#c44d8a",
        "#1a7a6b",
      ].map((j, k) => (n && n.length > 0 ? n[k % n.length] : j));
    t.ceilingColor;
    const a = t.ropeColor;
    function i(j, k) {
      const { viewBox: A, gContent: M } = Wn[j],
        P = M.replace(/LANTERN_COLOR/g, k);
      return `<svg viewBox="${A}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${P}</svg>`;
    }
    const s = Pn(t.position);
    if (s.length > 0) {
      const j = [];
      let k = Math.max(2, Math.min(6, Math.round(window.innerHeight / 220)));
      const A = (P) => {
        for (const I of j) {
          I.querySelectorAll(".ro-lantern-unit").forEach((B) => B.remove());
          for (let B = 0; B < P; B++) {
            const U =
                t.lanternStyle > 0
                  ? (t.lanternStyle - 1) % Wn.length
                  : B % Wn.length,
              G = o[B % o.length],
              le = (3.2 + ((B * 0.23) % 1.2)).toFixed(1),
              E = -((B * 0.73) % parseFloat(le)),
              H = (10 + (B * 80) / (P > 1 ? P - 1 : 1)).toFixed(1),
              b = document.createElement("div");
            ((b.className = "ro-lantern-unit"),
              (b.style.top = `${H}%`),
              b.style.setProperty("--ro-swing-duration", `${le}s`),
              (b.style.animationDelay = `${E.toFixed(2)}s`));
            const y = document.createElement("div");
            ((y.className = "ro-lantern-dropline"), (y.style.background = a));
            const D = document.createElement("div");
            ((D.className = "ro-lantern-svg-wrap"),
              (D.innerHTML = i(U, G)),
              b.appendChild(y),
              b.appendChild(D),
              I.appendChild(b));
          }
        }
      };
      for (const P of s) {
        const I = document.createElement("div");
        I.className = `ro-lantern-side ro-lantern-side--${P}`;
        const L = document.createElement("div");
        ((L.className = "ro-lantern-spine"),
          I.appendChild(L),
          e.appendChild(I),
          j.push(I));
      }
      A(k);
      const M = () => {
        const P = Math.max(
          2,
          Math.min(6, Math.round(window.innerHeight / 220))
        );
        P !== k && ((k = P), A(k));
      };
      return (
        window.addEventListener("resize", M, { passive: !0 }),
        () => {
          (j.forEach((P) => P.remove()),
            window.removeEventListener("resize", M));
        }
      );
    }
    function c(j, k, A, M) {
      const P = k.length;
      let I = `M 0 ${A}`;
      const L = k[0] / 2,
        B = A + M * 1.5;
      I += ` Q ${L.toFixed(1)} ${B.toFixed(1)}, ${k[0].toFixed(1)} ${A}`;
      for (let E = 0; E < P - 1; E++) {
        const H = k[E],
          b = k[E + 1],
          y = (H + b) / 2,
          D = A + M * 2;
        I += ` Q ${y.toFixed(1)} ${D.toFixed(1)}, ${b.toFixed(1)} ${A}`;
      }
      const G = (k[P - 1] + j) / 2,
        le = A + M * 1.5;
      return ((I += ` Q ${G.toFixed(1)} ${le.toFixed(1)}, ${j} ${A}`), I);
    }
    function u(j, k, A, M) {
      k.forEach((P) => {
        const I = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );
        (I.setAttribute("x1", P.toFixed(1)),
          I.setAttribute("y1", String(A)),
          I.setAttribute("x2", P.toFixed(1)),
          I.setAttribute("y2", M.toFixed(1)),
          I.setAttribute("stroke", "var(--ro-rope)"),
          I.setAttribute("stroke-width", "1.5"),
          I.setAttribute("class", "ro-dropline-path"),
          j.appendChild(I));
      });
    }
    function v(j, k, A, M) {
      const I = document.createElementNS("http://www.w3.org/2000/svg", "line");
      return (
        I.setAttribute("x1", "0"),
        I.setAttribute("y1", String(2)),
        I.setAttribute("x2", String(k)),
        I.setAttribute("y2", String(2)),
        I.setAttribute("stroke", "var(--ro-ceiling)"),
        I.setAttribute("stroke-width", "3"),
        I.setAttribute("stroke-opacity", "0.75"),
        I.setAttribute("class", "ro-rope-path"),
        j.appendChild(I),
        u(j, A, 2, 2 + M),
        2 + M
      );
    }
    function m(j, k, A, M, P) {
      const L = document.createElementNS("http://www.w3.org/2000/svg", "path");
      return (
        L.setAttribute("d", c(k, A, 4, M)),
        L.setAttribute("stroke", "var(--ro-ceiling)"),
        L.setAttribute("stroke-width", "2.2"),
        L.setAttribute("stroke-opacity", "0.85"),
        L.setAttribute("class", "ro-rope-path"),
        j.appendChild(L),
        u(j, A, 4, 4 + P),
        4 + P
      );
    }
    function f(j, k, A, M, P) {
      const U = document.createElementNS("http://www.w3.org/2000/svg", "path");
      (U.setAttribute("d", c(k, A, 2, M)),
        U.setAttribute("stroke", "var(--ro-ceiling)"),
        U.setAttribute("stroke-width", "2.0"),
        U.setAttribute("stroke-opacity", "0.85"),
        U.setAttribute("class", "ro-rope-path"),
        j.appendChild(U));
      const G = document.createElementNS("http://www.w3.org/2000/svg", "path");
      return (
        G.setAttribute("d", c(k, A, 16, M)),
        G.setAttribute("stroke", "var(--ro-ceiling)"),
        G.setAttribute("stroke-width", "1.6"),
        G.setAttribute("stroke-opacity", "0.65"),
        G.setAttribute("class", "ro-rope-path"),
        j.appendChild(G),
        u(j, A, 2, 16 + P),
        16 + P
      );
    }
    const h = 28,
      g = t.ropeStyle ?? "straight",
      S = t.ropeSag ?? 20,
      T = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    (T.setAttribute("class", "ro-lantern-ropes"),
      T.setAttribute("aria-hidden", "true"),
      T.setAttribute("width", "100%"),
      T.setAttribute("height", "100%"));
    const d = document.createElement("div");
    d.className = "ro-lantern-row";
    let p = 0,
      w = [];
    const x = () => {
      var G, le;
      const k =
          (e.clientWidth > 0 ? e.clientWidth : 0) ||
          ((G = e.parentElement) != null && G.clientWidth
            ? e.parentElement.clientWidth
            : 0) ||
          (typeof window < "u" && window.innerWidth) ||
          (typeof document < "u" &&
            ((le = document.documentElement) == null
              ? void 0
              : le.clientWidth)) ||
          1024,
        A = t.density === "low" ? 360 : t.density === "high" ? 180 : 260,
        M = t.density === "low" ? 4 : t.density === "high" ? 8 : 6,
        P = Math.max(2, Math.min(M, Math.round(k / A))),
        I =
          typeof t.lanternCount == "number" && t.lanternCount > 0
            ? Math.min(12, Math.max(1, Math.round(t.lanternCount)))
            : P,
        L = k < 600 ? Math.max(6, Math.round(S * (k / 600))) : S,
        B = [];
      for (let E = 0; E < I; E++) B.push((E + 0.5) * (k / I));
      T.innerHTML = "";
      let U = 2 + h;
      if (
        (g === "u-shaped"
          ? (U = m(T, k, B, L, h))
          : g === "dual"
            ? (U = f(T, k, B, L, h))
            : (U = v(T, k, B, h)),
        I !== p || w.length !== I)
      ) {
        ((d.innerHTML = ""), (w = []), (p = I));
        for (let E = 0; E < I; E++) {
          const H =
              t.lanternStyle > 0
                ? (t.lanternStyle - 1) % Wn.length
                : E % Wn.length,
            b = o[E % o.length],
            y = (2.5 + ((E * 0.17) % 1.5)).toFixed(1),
            D = -((E * 0.37) % parseFloat(y)),
            F = document.createElement("div");
          ((F.className = "ro-lantern"),
            F.style.setProperty("--ro-swing-duration", `${y}s`),
            (F.style.animationDelay = `${D.toFixed(2)}s`),
            (F.style.left = `${B[E].toFixed(1)}px`),
            (F.style.top = `${U}px`));
          const V = document.createElement("div");
          ((V.innerHTML = i(H, b)),
            F.appendChild(V),
            d.appendChild(F),
            w.push(F));
        }
      } else
        for (let E = 0; E < I; E++)
          ((w[E].style.left = `${B[E].toFixed(1)}px`),
            (w[E].style.top = `${U}px`));
    };
    (e.appendChild(T), e.appendChild(d), x());
    const C = () => {
      x();
    };
    let z = null;
    if (typeof ResizeObserver < "u" && e.parentElement)
      try {
        ((z = new ResizeObserver(() => {
          x();
        })),
          z.observe(e.parentElement));
      } catch {}
    return () => {
      (z == null || z.disconnect(),
        T.remove(),
        d.remove(),
        window.removeEventListener("resize", C));
    };
  };
function z0(e, t) {
  return `<svg width="${t}" height="${t}" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M20 3 C8 3 2 11 2 20 C2 29 8 37 20 37 C14 32 11 26 11 20 C11 14 14 8 20 3Z" fill="${e}"/>
  </svg>`;
}
function j0(e, t) {
  const n = [];
  for (let r = 0; r < 8; r++) {
    const i = (r * Math.PI) / 4,
      s = i + Math.PI / 8;
    (n.push(`${20 + 18 * Math.sin(i)},${20 - 18 * Math.cos(i)}`),
      n.push(`${20 + 9 * Math.sin(s)},${20 - 9 * Math.cos(s)}`));
  }
  return `<svg width="${t}" height="${t}" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <polygon points="${n.join(" ")}" fill="${e}"/>
  </svg>`;
}
const M0 = (e, t) => {
  if (!Cr()) return () => {};
  const n = t.colors.length
      ? t.colors
      : ["#c9a84c", "#e8c96b", "#fff7cc", "#4a8a3a"],
    r = bl(t.intensity, t.density),
    o = Math.round(12 + r * 6.5),
    a = 0.5 + (r / 10) * 0.8,
    i = [];
  function s() {
    const v = n[Math.floor(Math.random() * n.length)],
      m = Math.random(),
      f = document.createElement("div");
    let h;
    (m < 0.18
      ? ((h = 18 + Math.random() * 14),
        (f.className = "ro-crescent"),
        (f.innerHTML = z0(v, h)),
        (f.style.cssText = `
        position:absolute;
        width:${h}px;height:${h}px;
        filter:drop-shadow(0 0 ${h * 0.5}px ${v});
        animation:none;
      `))
      : m < 0.38
        ? ((h = 14 + Math.random() * 12),
          (f.className = "ro-star"),
          (f.innerHTML = j0(v, h)),
          (f.style.cssText = `
        position:absolute;
        width:${h}px;height:${h}px;
        filter:drop-shadow(0 0 ${h * 0.5}px ${v});
        animation:none;
      `))
        : ((h = 3 + Math.random() * 7),
          (f.className = "ro-sparkle"),
          (f.style.cssText = `
        position:absolute;
        width:${h}px;height:${h}px;
        background:${v};
        box-shadow:0 0 ${h * 1.5}px ${v};
        animation:none;
      `)),
      e.appendChild(f));
    let g, S;
    const T = t.position,
      d = Pn(T);
    d.length > 0
      ? ((g =
          d[Math.floor(Math.random() * d.length)] === "left"
            ? Math.random() * 4
            : 96 + Math.random() * 4),
        (S = Math.random() * 100))
      : T === "top"
        ? ((g = Math.random() * 100), (S = Math.random() * 20))
        : T === "bottom"
          ? ((g = Math.random() * 100), (S = 80 + Math.random() * 20))
          : T === "full"
            ? ((g = Math.random() * 100), (S = Math.random() * 100))
            : ((g = Math.random() * 100),
              (S =
                Math.random() < 0.5
                  ? Math.random() * 20
                  : 80 + Math.random() * 20));
    const p = 80 + Math.random() * 80;
    return (
      (f.style.left = `${g}%`),
      (f.style.top = `${S}%`),
      {
        el: f,
        x: g,
        y: S,
        vx: (Math.random() - 0.5) * 0.06 * a,
        vy: (-0.035 - Math.random() * 0.055) * a,
        size: h,
        opacity: 0,
        life: 0,
        maxLife: p,
        color: v,
      }
    );
  }
  for (; i.length < o;) i.push(s());
  function c(v) {
    for (; i.length < o;) i.push(s());
    for (let m = i.length - 1; m >= 0; m--) {
      const f = i[m];
      (f.life++, (f.x += f.vx), (f.y += f.vy));
      const h = f.life / f.maxLife;
      ((f.opacity = h < 0.3 ? h / 0.3 : h > 0.7 ? (1 - h) / 0.3 : 1),
        (f.el.style.left = `${f.x}%`),
        (f.el.style.top = `${f.y}%`),
        (f.el.style.opacity = String(Math.min(1, Math.max(0, f.opacity)))),
        (f.el.style.transform = `scale(${0.5 + f.opacity * 0.5})`),
        f.life >= f.maxLife && (f.el.remove(), i.splice(m, 1)));
    }
  }
  const u = Jd(c);
  return () => {
    (u(), i.forEach((v) => v.el.remove()), (i.length = 0));
  };
};
function Pn(
  e,
  t = typeof document < "u" &&
    (document.documentElement.dir === "rtl" ||
      ((n) => ((n = document.body) == null ? void 0 : n.dir))() === "rtl")
) {
  switch (e) {
    case "left":
      return ["left"];
    case "right":
      return ["right"];
    case "sides":
      return ["left", "right"];
    case "start":
      return [t ? "right" : "left"];
    case "end":
      return [t ? "left" : "right"];
    default:
      return [];
  }
}
function E0(e) {
  const t = Pn(e);
  return t.length > 0
    ? {
        x:
          t[Math.floor(Math.random() * t.length)] === "left"
            ? Math.random() * 3.5
            : 96.5 + Math.random() * 3.5,
        y: Math.random() * 90,
      }
    : e === "top"
      ? { x: Math.random() * 95, y: Math.random() * 25 }
      : e === "bottom"
        ? { x: Math.random() * 95, y: 75 + Math.random() * 20 }
        : e === "full"
          ? { x: Math.random() * 95, y: Math.random() * 90 }
          : {
              x: Math.random() * 95,
              y:
                Math.random() < 0.5
                  ? Math.random() * 25
                  : 75 + Math.random() * 20,
            };
}
function uc(
  e,
  t = "edges",
  n = typeof window < "u" && window.innerWidth < 640
) {
  if (t === "edges") {
    const o =
      Math.random() < 0.5 ? 2 + Math.random() * 16 : 82 + Math.random() * 16;
    let a;
    return (
      n
        ? (a =
            Math.random() < 0.5
              ? 2 + Math.random() * 20
              : 78 + Math.random() * 18)
        : (a = Math.random() * 95),
      { x: Number(o.toFixed(2)), y: Number(a.toFixed(2)) }
    );
  }
  return E0(e);
}
const N0 = {
    lanterns: cc,
    "crescent-stars": w0,
    geometric: T0,
    sparkles: M0,
    eid: Ta,
    "eid-fitr": Ta,
    "eid-adha": Ta,
  },
  A0 = "ramadan-overlay-root",
  Ci = "ramadan-overlay-styles";
function L0() {
  var e, t;
  try {
    if (typeof document > "u") return;
    ((e = document.getElementById(A0)) == null || e.remove(),
      (t = document.getElementById(Ci)) == null || t.remove());
  } catch {}
}
function I0() {
  if (typeof document > "u" || document.getElementById(Ci)) return;
  const e = `
#ramadan-overlay-root{--ro-color-1:#c9a84c;--ro-color-2:#e8c96b;--ro-color-3:#8b4513;--ro-color-4:#2d5a27;--ro-color-5:#1a3a1a;--ro-opacity:0.85;--ro-z:9999;--ro-lantern-z:2;--ro-shadow:drop-shadow(0 6px 12px rgba(0,0,0,0.18));--ro-gutter-width:clamp(28px,4vw,64px);--ro-lantern-side-size:clamp(20px,2.8vw,36px);position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:var(--ro-z);overflow:hidden;opacity:var(--ro-opacity);will-change:opacity;contain:strict}
#ramadan-overlay-root .ro-lantern-row{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:var(--ro-lantern-z,2)}
#ramadan-overlay-root .ro-lantern{position:absolute;display:flex;flex-direction:column;align-items:center;translate:-50% 0;transform-origin:top center;animation:ro-swing var(--ro-swing-duration,3s) ease-in-out infinite alternate;will-change:transform;z-index:var(--ro-lantern-z,2)}
#ramadan-overlay-root .ro-lantern svg{width:var(--ro-lantern-size,clamp(18px,2.5vw,38px));height:auto;animation:ro-glow-pulse 2.5s ease-in-out infinite;will-change:transform,opacity}
#ramadan-overlay-root .ro-lantern-string{width:1px;height:var(--ro-string-height,clamp(20px,3vw,48px));background:var(--ro-color-1);opacity:.7}
#ramadan-overlay-root .ro-lantern-ropes{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;shape-rendering:geometricPrecision;filter:var(--ro-shadow,none)}
#ramadan-overlay-root .ro-rope-path{fill:none;stroke-linecap:round;stroke-linejoin:round;vector-effect:non-scaling-stroke}
#ramadan-overlay-root .ro-dropline-path{fill:none;stroke-linecap:round;vector-effect:non-scaling-stroke}
#ramadan-overlay-root .ro-lantern-side,#ramadan-overlay-root .ro-side-band{position:fixed;top:0;bottom:0;height:100vh;height:100dvh;width:var(--ro-gutter-width,clamp(28px,4vw,64px));pointer-events:none;overflow:hidden;contain:strict;z-index:var(--ro-lantern-z,var(--ro-z,9999))}
#ramadan-overlay-root .ro-lantern-side--left,#ramadan-overlay-root .ro-side-band--left{left:0}
#ramadan-overlay-root .ro-lantern-side--right,#ramadan-overlay-root .ro-side-band--right{right:0}
#ramadan-overlay-root .ro-lantern-spine{position:absolute;top:0;bottom:0;left:50%;width:2px;transform:translateX(-50%);background:linear-gradient(180deg,transparent 0%,var(--ro-ceiling,#8b4513) 5%,var(--ro-ceiling,#8b4513) 95%,transparent 100%);opacity:0.5}
#ramadan-overlay-root .ro-lantern-unit{position:absolute;left:50%;transform-origin:top center;animation:ro-swing-side var(--ro-swing-duration,3.5s) ease-in-out infinite alternate;will-change:transform}
#ramadan-overlay-root .ro-lantern-dropline{width:1.5px;height:24px;margin:0 auto;background:var(--ro-rope,#8b4513)}
#ramadan-overlay-root .ro-lantern-svg-wrap svg{display:block;width:var(--ro-lantern-side-size,clamp(20px,2.8vw,36px));height:auto;filter:drop-shadow(0 2px 8px rgba(232,201,107,0.4)) var(--ro-shadow,none)}
#ramadan-overlay-root .ro-side-band svg{width:100%;height:100%;display:block}
#ramadan-overlay-root .ro-crescent,#ramadan-overlay-root .ro-star,#ramadan-overlay-root .ro-balloon,#ramadan-overlay-root .ro-gift,#ramadan-overlay-root .ro-sheep{position:absolute;top:102%;animation:ro-ascend var(--ro-float-duration,12s) linear infinite;will-change:transform,opacity;filter:var(--ro-shadow,none)}
#ramadan-overlay-root .ro-sparkle{position:absolute;border-radius:50%;background:var(--ro-color-2);opacity:0;will-change:transform,opacity}
#ramadan-overlay-root .ro-geo-band{position:absolute;left:0;width:100%;overflow:hidden;opacity:.6}
#ramadan-overlay-root .ro-geo-band--top{top:0}
#ramadan-overlay-root .ro-geo-band--bottom{bottom:0}
#ramadan-overlay-root .ro-geo-band svg{width:100%;height:100%}
#ramadan-overlay-root.ro-scoped-host{position:absolute!important;inset:0!important;width:100%!important;height:100%!important}
#ramadan-overlay-root.ro-attached{position:absolute!important;left:0!important;right:0!important;width:100%!important;pointer-events:none!important;overflow:visible!important;contain:none!important}
#ramadan-overlay-root.ro-attached--bottom{top:100%!important;height:0!important}
#ramadan-overlay-root.ro-attached--top{top:0!important;height:100%!important}
#ramadan-overlay-root.ro-attached .ro-lantern-ropes{height:160px!important;overflow:visible!important}
#ramadan-overlay-root.ro-attached .ro-lantern-row{overflow:visible!important}
@keyframes ro-swing{from{transform:rotate(-8deg)}to{transform:rotate(8deg)}}
@keyframes ro-swing-side{0%{transform:translateX(-50%) rotate(-3.5deg)}100%{transform:translateX(-50%) rotate(3.5deg)}}
@keyframes ro-float{from{transform:translateY(0) rotate(0deg);opacity:.7}to{transform:translateY(-12px) rotate(10deg);opacity:1}}
@keyframes ro-ascend{0%{transform:translateY(0) translateX(0) rotate(0deg);opacity:0}8%{opacity:.9}30%{transform:translateY(calc(-32vh - 40px)) translateX(var(--ro-sway-1,16px)) rotate(var(--ro-rot-1,10deg))}60%{transform:translateY(calc(-65vh - 80px)) translateX(var(--ro-sway-2,-14px)) rotate(var(--ro-rot-2,-8deg))}85%{opacity:.85}100%{transform:translateY(calc(-105vh - 140px)) translateX(var(--ro-sway-end,8px)) rotate(var(--ro-rot-3,15deg));opacity:0}}
@keyframes ro-glow-pulse{0%,100%{filter:drop-shadow(0 2px 6px var(--ro-glow,rgba(201,168,76,0.5))) var(--ro-shadow,none)}50%{filter:drop-shadow(0 2px 18px var(--ro-glow,rgba(201,168,76,0.9))) drop-shadow(0 0 8px var(--ro-glow,rgba(201,168,76,0.6))) var(--ro-shadow,none)}}
@media(prefers-reduced-motion:reduce){#ramadan-overlay-root *{animation:none!important;transition:none!important}}
@media (max-width: 767px){#ramadan-overlay-root[data-mobile-side="hide"] .ro-lantern-side,#ramadan-overlay-root[data-mobile-side="hide"] .ro-side-band,#ramadan-overlay-root[data-mobile-side="hide"][data-is-side="true"] > *{display:none!important}}
  `,
    t = document.createElement("style");
  ((t.id = Ci), (t.textContent = e), document.head.appendChild(t));
}
function Fs(e, t) {
  const n = e.style;
  (n.setProperty("--ro-opacity", String(t.opacity)),
    t.layer === "background"
      ? (e.classList.add("ro-layer--background"), n.setProperty("--ro-z", "-1"))
      : (e.classList.remove("ro-layer--background"),
        n.setProperty("--ro-z", String(t.zIndex))),
    n.setProperty("--ro-lantern-z", String(t.lanternZIndex ?? 2)),
    n.setProperty("--ro-glow", t.glowColor));
  const r = {
    none: "none",
    soft: "drop-shadow(0 6px 12px rgba(0, 0, 0, 0.18))",
    deep: "drop-shadow(0 10px 22px rgba(0, 0, 0, 0.42))",
  };
  (n.setProperty("--ro-shadow", r[t.shadows] ?? r.soft),
    n.setProperty("--ro-ceiling", t.ceilingColor),
    n.setProperty("--ro-rope", t.ropeColor),
    n.setProperty("--ro-banner-bg", t.bannerBg),
    n.setProperty("--ro-banner-text", t.bannerTextColor),
    n.setProperty("--ro-banner-icon", t.bannerIconColor),
    t.countdownBg && n.setProperty("--ro-countdown-bg", t.countdownBg),
    t.countdownBorder &&
      n.setProperty("--ro-countdown-border", t.countdownBorder),
    t.countdownAccent &&
      n.setProperty("--ro-countdown-gold", t.countdownAccent),
    t.colors.forEach((o, a) => {
      n.setProperty(`--ro-color-${a + 1}`, o);
    }),
    e.setAttribute("data-theme", t.themeName ?? "classic"),
    e.setAttribute("data-shadows", t.shadows ?? "soft"),
    e.setAttribute("data-mobile-side", t.mobileSideBehavior),
    e.setAttribute("data-position", t.position),
    e.setAttribute("data-clearance", t.clearance),
    e.setAttribute("data-layer", t.layer),
    Pn(t.position).length > 0
      ? e.setAttribute("data-is-side", "true")
      : e.removeAttribute("data-is-side"));
}
function D0(e, t) {
  return e.variant === "banner" ? R0(e, t) : P0(e, t);
}
function P0(e, t) {
  var m, f, h, g;
  I0();
  const n = document.createElement("div");
  ((n.id = "ramadan-overlay-root"),
    n.setAttribute("aria-hidden", "true"),
    n.setAttribute("role", "presentation"),
    Fs(n, e));
  let r = document.body,
    o = !1;
  const a = e.attachTo ?? e.mountTarget;
  if (a)
    if (typeof a == "string" && a.trim().length > 0) {
      const S = a.trim();
      let T = null;
      try {
        T = document.querySelector(S);
      } catch {}
      if (!T && !S.startsWith(".") && !S.startsWith("#"))
        try {
          T = document.querySelector(`.${S}`);
        } catch {}
      T && ((r = T), (o = !0));
    } else
      typeof HTMLElement < "u" &&
        a instanceof HTMLElement &&
        ((r = a), (o = !0));
  if (o) {
    (n.classList.add("ro-scoped-host"),
      n.classList.add("ro-attached"),
      e.attachEdge === "top"
        ? n.classList.add("ro-attached--top")
        : n.classList.add("ro-attached--bottom"));
    const S =
      (f =
        (m = window.getComputedStyle) == null ? void 0 : m.call(window, r)) ==
      null
        ? void 0
        : f.position;
    (S === "static" || !S) && (r.style.position = "relative");
    const T =
      (g =
        (h = window.getComputedStyle) == null ? void 0 : h.call(window, r)) ==
      null
        ? void 0
        : g.overflow;
    (T === "hidden" || T === "clip") && (r.style.overflow = "visible");
  }
  r.appendChild(n);
  const s = (N0[e.variant] ?? cc)(n, e, t),
    c = () => {
      n.style.visibility = document.hidden ? "hidden" : "";
    };
  return (
    document.addEventListener("visibilitychange", c),
    {
      container: n,
      cleanup: () => {
        (s(), document.removeEventListener("visibilitychange", c), n.remove());
      },
      updateTokens: (S) => {
        Fs(n, S);
      },
    }
  );
}
function R0(e, t) {
  const { elements: n, cleanup: r } = v0(e, t);
  return {
    container: n[0] ?? document.body,
    cleanup: r,
    updateTokens: (i) => {
      for (const s of n)
        (s.style.setProperty("--ro-banner-bg", i.bannerBg),
          s.style.setProperty("--ro-banner-text", i.bannerTextColor),
          s.style.setProperty("--ro-banner-icon", i.bannerIconColor));
    },
  };
}
const _0 = {
  en: {
    title: "Iftar Countdown",
    targetTime: "Maghrib at {time}",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    celebration: "Iftar Mubarak!",
    dismissButton: "Dismiss countdown",
    minimizeButton: "Minimize countdown widget",
    expandButton: "Expand countdown widget",
    muteButton: "Mute alert sound",
    unmuteButton: "Enable alert sound",
    playButton: "Tap to play Iftar chime",
    srInitialAnnouncement:
      "Iftar countdown active: {minutes} minutes remaining until Maghrib.",
    srMilestoneMinutes: "{minutes} minutes remaining until Iftar.",
    srArrivedAnnouncement:
      "Iftar time! Maghrib prayer has arrived. Iftar Mubarak!",
  },
  ar: {
    title: "العد التنازلي للإفطار",
    targetTime: "المغرب في {time}",
    hours: "ساعة",
    minutes: "دقيقة",
    seconds: "ثانية",
    celebration: "إفطار مبارك!",
    dismissButton: "إغلاق العد التنازلي",
    minimizeButton: "تصغير أداة العد التنازلي",
    expandButton: "توسيع أداة العد التنازلي",
    muteButton: "كتم صوت التنبيه",
    unmuteButton: "تشغيل صوت التنبيه",
    playButton: "انقر لتشغيل تكبيرات الإفطار",
    srInitialAnnouncement:
      "العد التنازلي للإفطار نشط: متبقي {minutes} دقيقة حتى أذان المغرب.",
    srMilestoneMinutes: "متبقي {minutes} دقيقة حتى موعد الإفطار.",
    srArrivedAnnouncement: "حان الآن موعد أذان المغرب. إفطار مبارك وذنب مغفور!",
  },
};
function O0(e = "auto", t) {
  var a, i;
  let n = "en";
  return (
    e === "ar"
      ? (n = "ar")
      : e === "en"
        ? (n = "en")
        : typeof document < "u" &&
          ((
            ((a = document.documentElement.lang) == null
              ? void 0
              : a.toLowerCase()) || ""
          ).startsWith("ar") ||
            (typeof navigator < "u" &&
              (i = navigator.language) != null &&
              i.toLowerCase().startsWith("ar"))) &&
          (n = "ar"),
    { dict: { ..._0[n], ...t }, isRtl: n === "ar", lang: n }
  );
}
const B0 = [30, 15, 5, 1];
class F0 {
  constructor(t, n) {
    ((this.announcedMilestones = new Set()),
      (this.initialAnnounced = !1),
      (this.arrivedAnnounced = !1),
      (this.announcerEl = t),
      (this.dict = n));
  }
  announceInitial(t) {
    if (this.initialAnnounced) return;
    this.initialAnnounced = !0;
    const n = this.dict.srInitialAnnouncement.replace("{minutes}", String(t));
    this.announcerEl.textContent = n;
  }
  checkMilestone(t) {
    if (t <= 0) {
      this.arrivedAnnounced ||
        ((this.arrivedAnnounced = !0),
        (this.announcerEl.textContent = this.dict.srArrivedAnnouncement));
      return;
    }
    const n = Math.floor(t / 6e4);
    if (B0.includes(n) && !this.announcedMilestones.has(n)) {
      this.announcedMilestones.add(n);
      const r = this.dict.srMilestoneMinutes.replace("{minutes}", String(n));
      this.announcerEl.textContent = r;
    }
  }
}
function $0(e, t) {
  const n = (r) => {
    var o, a;
    r.key === "Escape" &&
      (r.stopPropagation(),
      t(),
      typeof document < "u" &&
        document.body &&
        ((a = (o = document.body).focus) == null || a.call(o)));
  };
  return (
    e.addEventListener("keydown", n),
    () => {
      e.removeEventListener("keydown", n);
    }
  );
}
async function H0(e) {
  try {
    const t = e.play();
    return (t !== void 0 && (await t), !0);
  } catch (t) {
    if (t instanceof DOMException)
      switch (t.name) {
        case "NotAllowedError":
          return (
            console.debug(
              "[ramadan-overlay] Audio alert autoplay blocked by browser policy."
            ),
            !1
          );
        case "NotSupportedError":
          return (
            console.warn(
              "[ramadan-overlay] Audio source format unsupported or invalid."
            ),
            !1
          );
        default:
          return (
            console.debug(
              `[ramadan-overlay] Audio playback failed with DOMException: ${t.name}`
            ),
            !1
          );
      }
    return !1;
  }
}
async function V0(e) {
  if (typeof window > "u") return !1;
  try {
    let t = e;
    if (!t || t.state === "closed") {
      const a = window.AudioContext || window.webkitAudioContext;
      if (!a) return !1;
      t = new a();
    }
    if (t.state === "suspended")
      try {
        await t.resume();
      } catch {}
    if (t.state === "suspended")
      return (
        console.debug(
          "[ramadan-overlay] Web Audio chime playback blocked by browser autoplay policy."
        ),
        !1
      );
    const n = t.currentTime,
      r = t.createGain();
    (r.gain.setValueAtTime(0.7, n), r.connect(t.destination));
    const o = [
      { freq: 523.25, time: 0, duration: 1.8, gain: 0.28 },
      { freq: 659.25, time: 0.16, duration: 1.7, gain: 0.25 },
      { freq: 783.99, time: 0.32, duration: 1.8, gain: 0.22 },
      { freq: 1046.5, time: 0.48, duration: 2, gain: 0.2 },
    ];
    for (const a of o) {
      const i = n + a.time,
        s = i + a.duration,
        c = t.createOscillator();
      ((c.type = "sine"), c.frequency.setValueAtTime(a.freq, i));
      const u = t.createOscillator();
      ((u.type = "sine"), u.frequency.setValueAtTime(a.freq * 2.01, i));
      const v = t.createGain();
      (v.gain.setValueAtTime(1e-4, i),
        v.gain.exponentialRampToValueAtTime(a.gain, i + 0.025),
        v.gain.exponentialRampToValueAtTime(1e-4, s));
      const m = t.createGain();
      (m.gain.setValueAtTime(1e-4, i),
        m.gain.exponentialRampToValueAtTime(a.gain * 0.2, i + 0.02),
        m.gain.exponentialRampToValueAtTime(1e-4, i + 0.7),
        c.connect(v),
        v.connect(r),
        u.connect(m),
        m.connect(r),
        c.start(i),
        c.stop(s),
        u.start(i),
        u.stop(i + 0.75));
    }
    return !0;
  } catch (t) {
    return (console.debug("[ramadan-overlay] Web Audio chime error:", t), !1);
  }
}
class W0 {
  constructor(t = {}) {
    if (
      ((this.audio = null),
      (this.audioCtx = null),
      (this.muted = t.defaultMuted ?? !0),
      (this.onAudioBlocked = t.onAudioBlocked),
      (this.soundUrl = t.soundUrl),
      this.hasCustomSoundUrl(t.soundUrl) && typeof Audio < "u")
    )
      try {
        ((this.audio = new Audio(t.soundUrl)),
          (this.audio.preload = "auto"),
          (this.audio.loop = !1));
      } catch {
        this.audio = null;
      }
  }
  hasCustomSoundUrl(t) {
    return (
      typeof t == "string" &&
      t.trim().length > 0 &&
      t !== "default" &&
      t !== "none"
    );
  }
  setSoundUrl(t) {
    if (this.soundUrl !== t) {
      if (((this.soundUrl = t), this.audio)) {
        try {
          (this.audio.pause(),
            this.audio.removeAttribute("src"),
            this.audio.load());
        } catch {}
        this.audio = null;
      }
      if (this.hasCustomSoundUrl(t) && typeof Audio < "u")
        try {
          ((this.audio = new Audio(t)),
            (this.audio.preload = "auto"),
            (this.audio.loop = !1));
        } catch {
          this.audio = null;
        }
    }
  }
  prime() {
    if (this.audio)
      try {
        const t = this.audio.play();
        t !== void 0 &&
          t
            .then(() => {
              this.audio && (this.audio.pause(), (this.audio.currentTime = 0));
            })
            .catch(() => {});
      } catch {}
    try {
      if (typeof window < "u") {
        const t = window.AudioContext || window.webkitAudioContext;
        t &&
          ((!this.audioCtx || this.audioCtx.state === "closed") &&
            (this.audioCtx = new t()),
          this.audioCtx &&
            this.audioCtx.state === "suspended" &&
            this.audioCtx.resume());
      }
    } catch {}
  }
  async playAlert() {
    var n, r;
    if (this.muted || this.soundUrl === !1 || this.soundUrl === "none")
      return !1;
    if (this.hasCustomSoundUrl(this.soundUrl) && this.audio) {
      const o = await H0(this.audio);
      return (o || (n = this.onAudioBlocked) == null || n.call(this), o);
    }
    const t = await V0(this.audioCtx);
    return (t || (r = this.onAudioBlocked) == null || r.call(this), t);
  }
  setMuted(t) {
    this.muted = t;
  }
  toggleMute() {
    return ((this.muted = !this.muted), this.muted);
  }
  isMuted() {
    return this.muted;
  }
  destroy() {
    if (this.audio) {
      try {
        (this.audio.pause(),
          (this.audio.currentTime = 0),
          this.audio.removeAttribute("src"),
          this.audio.load());
      } catch {}
      this.audio = null;
    }
    if (this.audioCtx && this.audioCtx.state !== "closed") {
      try {
        this.audioCtx.close();
      } catch {}
      this.audioCtx = null;
    }
  }
}
const Ti = "ramadan-countdown-styles",
  U0 = "ramadan-countdown-root";
function G0() {
  var e, t;
  try {
    if (typeof document > "u") return;
    ((e = document.getElementById(U0)) == null || e.remove(),
      (t = document.getElementById(Ti)) == null || t.remove());
  } catch {}
}
function Q0() {
  if (typeof document > "u" || document.getElementById(Ti)) return;
  const e = `
:root {
  --ro-countdown-z: calc(var(--ro-z, 99999) + 1);
  --ro-countdown-margin: 24px;
  --ro-countdown-bg: rgba(18, 24, 38, 0.95);
  --ro-countdown-border: rgba(245, 158, 11, 0.3);
  --ro-countdown-gold: #f59e0b;
  --ro-countdown-text: #ffffff;
  --ro-countdown-muted: #9ca3af;
}

.ro-countdown-host {
  position: fixed;
  z-index: var(--ro-countdown-z);
  pointer-events: auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.ro-countdown-host--bottom-right {
  bottom: calc(var(--ro-countdown-margin) + env(safe-area-inset-bottom, 0px));
  inset-inline-end: calc(var(--ro-countdown-margin) + env(safe-area-inset-right, 0px));
}

.ro-countdown-host--bottom-left {
  bottom: calc(var(--ro-countdown-margin) + env(safe-area-inset-bottom, 0px));
  inset-inline-start: calc(var(--ro-countdown-margin) + env(safe-area-inset-left, 0px));
}

.ro-countdown-host--top-right {
  top: calc(var(--ro-countdown-margin) + env(safe-area-inset-top, 0px));
  inset-inline-end: calc(var(--ro-countdown-margin) + env(safe-area-inset-right, 0px));
}

.ro-countdown-host--top-left {
  top: calc(var(--ro-countdown-margin) + env(safe-area-inset-top, 0px));
  inset-inline-start: calc(var(--ro-countdown-margin) + env(safe-area-inset-left, 0px));
}

.ro-countdown-host--banner-offset-top {
  top: calc(var(--ro-countdown-margin) + env(safe-area-inset-top, 0px) + var(--ro-banner-height, 48px) + 16px) !important;
}

.ro-countdown-card {
  background: var(--ro-countdown-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--ro-countdown-border);
  border-radius: 16px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.3);
  padding: 14px 18px;
  min-width: 270px;
  max-width: 320px;
  color: var(--ro-countdown-text);
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  box-sizing: border-box;
}

.ro-countdown-card.ro-countdown--celebrating {
  border-color: var(--ro-countdown-gold);
  box-shadow: 0 0 24px rgba(245, 158, 11, 0.5), 0 10px 25px -5px rgba(0, 0, 0, 0.4);
  animation: ro-countdown-pulse 2s infinite alternate;
}

@keyframes ro-countdown-pulse {
  from { box-shadow: 0 0 12px rgba(245, 158, 11, 0.3), 0 10px 25px -5px rgba(0, 0, 0, 0.4); }
  to { box-shadow: 0 0 28px rgba(245, 158, 11, 0.7), 0 10px 25px -5px rgba(0, 0, 0, 0.4); }
}

.ro-countdown-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.ro-countdown-badge {
  font-size: 20px;
  line-height: 1;
}

.ro-countdown-titles {
  flex: 1;
  min-width: 0;
}

.ro-countdown-title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.2;
  color: var(--ro-countdown-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ro-countdown-target {
  display: block;
  font-size: 11px;
  color: var(--ro-countdown-muted);
  margin-top: 2px;
}

.ro-countdown-actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.ro-countdown-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 8px;
  color: var(--ro-countdown-muted);
  font-size: 14px;
  line-height: 1;
  transition: background 0.15s ease, color 0.15s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ro-countdown-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--ro-countdown-text);
}

.ro-countdown-btn:focus-visible {
  outline: 2px solid var(--ro-countdown-gold);
  outline-offset: 2px;
}

.ro-countdown-btn--prompt {
  color: var(--ro-countdown-gold);
  background: rgba(245, 158, 11, 0.25);
  box-shadow: 0 0 10px rgba(245, 158, 11, 0.4);
  animation: ro-countdown-pulse 1.5s infinite alternate ease-in-out;
}

.ro-countdown-digits {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 12px 0 2px;
}

.ro-countdown-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ro-countdown-value {
  font-size: 26px;
  font-weight: 700;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.02em;
  color: var(--ro-countdown-gold);
}

.ro-countdown-sep {
  font-size: 22px;
  font-weight: 700;
  color: var(--ro-countdown-muted);
  margin-top: -10px;
}

.ro-countdown-label {
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--ro-countdown-muted);
  margin-top: 4px;
}

.ro-countdown-celebration {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 10px 0 2px;
  padding: 8px 12px;
  background: rgba(245, 158, 11, 0.15);
  border-radius: 8px;
}

.ro-celebration-badge {
  font-size: 18px;
}

.ro-celebration-text {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: var(--ro-countdown-gold);
}

.ro-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.ro-countdown-pill {
  display: none;
  align-items: center;
  gap: 8px;
  background: var(--ro-countdown-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--ro-countdown-border);
  border-radius: 9999px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  padding: 8px 14px;
  cursor: pointer;
  color: var(--ro-countdown-text);
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  user-select: none;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease, box-shadow 0.2s ease;
}

.ro-countdown-pill:hover {
  transform: scale(1.04);
  border-color: var(--ro-countdown-gold);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4), 0 0 12px rgba(245, 158, 11, 0.2);
}

.ro-countdown-pill:focus-visible {
  outline: 2px solid var(--ro-countdown-gold);
  outline-offset: 2px;
}

.ro-countdown-pill-badge {
  font-size: 16px;
  line-height: 1;
}

.ro-countdown-pill-target {
  font-size: 12px;
  color: var(--ro-countdown-muted);
}

.ro-countdown-pill-sep {
  font-size: 12px;
  color: var(--ro-countdown-muted);
}

.ro-countdown-pill-time {
  font-size: 13px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--ro-countdown-gold);
}

.ro-countdown-host--minimized .ro-countdown-card {
  display: none;
}

.ro-countdown-host--minimized .ro-countdown-pill {
  display: flex;
}

@media (prefers-reduced-motion: reduce) {
  #ramadan-countdown-root * {
    animation: none !important;
    transition: none !important;
  }
}
  `,
    t = document.createElement("style");
  ((t.id = Ti), (t.textContent = e), document.head.appendChild(t));
}
function Y0(e) {
  Q0();
  const t = document.createElement("aside");
  ((t.id = "ramadan-countdown-root"),
    t.setAttribute("role", "complementary"),
    t.setAttribute("aria-label", e.labels.title));
  const n = e.position ?? "bottom-right";
  ((t.className = `ro-countdown-host ro-countdown-host--${n}`),
    e.isBannerTopActive &&
      n.startsWith("top-") &&
      t.classList.add("ro-countdown-host--banner-offset-top"),
    e.isRtl && t.setAttribute("dir", "rtl"),
    t.setAttribute("lang", e.lang));
  const r = e.targetTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    o = e.labels.targetTime.replace("{time}", r),
    a = document.createElement("div");
  ((a.className = "ro-countdown-card"),
    a.setAttribute("role", "region"),
    a.setAttribute("aria-label", e.labels.title));
  const i = document.createElement("div");
  i.className = "ro-countdown-header";
  const s = document.createElement("span");
  ((s.className = "ro-countdown-badge"), (s.textContent = "🌙"));
  const c = document.createElement("div");
  c.className = "ro-countdown-titles";
  const u = document.createElement("h3");
  ((u.className = "ro-countdown-title"), (u.textContent = e.labels.title));
  const v = document.createElement("span");
  ((v.className = "ro-countdown-target"),
    (v.textContent = o),
    c.appendChild(u),
    c.appendChild(v));
  const m = document.createElement("div");
  m.className = "ro-countdown-actions";
  let f = null;
  e.hasSound &&
    ((f = document.createElement("button")),
    (f.type = "button"),
    (f.className = "ro-countdown-btn ro-countdown-sound-btn"),
    f.setAttribute(
      "aria-label",
      e.initialMuted ? e.labels.unmuteButton : e.labels.muteButton
    ),
    f.setAttribute("aria-pressed", String(!e.initialMuted)),
    (f.innerHTML = e.initialMuted
      ? '<span class="ro-countdown-icon">🔇</span>'
      : '<span class="ro-countdown-icon">🔊</span>'),
    f.addEventListener("click", () => {
      var R;
      f != null && f.classList.contains("ro-countdown-btn--prompt")
        ? (f.classList.remove("ro-countdown-btn--prompt"),
          (R = e.onPlayAlert) == null || R.call(e))
        : e.onToggleSound();
    }),
    m.appendChild(f));
  const h = e.minimizable !== !1;
  let g = null;
  h &&
    ((g = document.createElement("button")),
    (g.type = "button"),
    (g.className = "ro-countdown-btn ro-countdown-minimize-btn"),
    g.setAttribute("aria-label", e.labels.minimizeButton),
    (g.innerHTML = '<span class="ro-countdown-icon">−</span>'),
    g.addEventListener("click", (R) => {
      (R.stopPropagation(), U());
    }),
    m.appendChild(g));
  const S = document.createElement("button");
  ((S.type = "button"),
    (S.className = "ro-countdown-btn ro-countdown-close-btn"),
    S.setAttribute("aria-label", e.labels.dismissButton),
    (S.innerHTML = '<span class="ro-countdown-icon">✕</span>'),
    S.addEventListener("click", () => {
      e.onDismiss();
    }),
    m.appendChild(S),
    i.appendChild(s),
    i.appendChild(c),
    i.appendChild(m),
    a.appendChild(i));
  const T = document.createElement("div");
  ((T.className = "ro-countdown-digits"),
    T.setAttribute("aria-hidden", "true"));
  const d = (R, $) => {
      const O = document.createElement("span");
      ((O.className = `ro-countdown-value ${R}`), (O.textContent = "00"));
      const W = document.createElement("div");
      W.className = "ro-countdown-unit";
      const K = document.createElement("span");
      return (
        (K.className = "ro-countdown-label"),
        (K.textContent = $),
        W.appendChild(O),
        W.appendChild(K),
        { unit: W, val: O }
      );
    },
    { unit: p, val: w } = d("ro-val-hours", e.labels.hours),
    x = document.createElement("span");
  ((x.className = "ro-countdown-sep"), (x.textContent = ":"));
  const { unit: C, val: z } = d("ro-val-minutes", e.labels.minutes),
    j = document.createElement("span");
  ((j.className = "ro-countdown-sep"), (j.textContent = ":"));
  const { unit: k, val: A } = d("ro-val-seconds", e.labels.seconds);
  (T.appendChild(p),
    T.appendChild(x),
    T.appendChild(C),
    T.appendChild(j),
    T.appendChild(k),
    a.appendChild(T));
  const M = document.createElement("div");
  ((M.className = "ro-countdown-celebration"),
    (M.style.display = "none"),
    (M.innerHTML = `
    <span class="ro-celebration-badge">✨</span>
    <p class="ro-celebration-text">${e.labels.celebration}</p>
  `),
    a.appendChild(M));
  const P = document.createElement("div");
  ((P.className = "ro-sr-only ro-countdown-announcer"),
    P.setAttribute("role", "status"),
    P.setAttribute("aria-live", "polite"),
    P.setAttribute("aria-atomic", "true"),
    a.appendChild(P));
  let I = null,
    L = null;
  if (h) {
    ((I = document.createElement("div")),
      (I.className = "ro-countdown-pill"),
      I.setAttribute("role", "button"),
      I.setAttribute("tabindex", "0"),
      I.setAttribute("aria-label", e.labels.expandButton));
    const R = document.createElement("span");
    ((R.className = "ro-countdown-pill-badge"), (R.textContent = "🌙"));
    const $ = document.createElement("span");
    (($.className = "ro-countdown-pill-target"), ($.textContent = r));
    const O = document.createElement("span");
    ((O.className = "ro-countdown-pill-sep"),
      (O.textContent = "·"),
      (L = document.createElement("span")),
      (L.className = "ro-countdown-pill-time"),
      (L.textContent = "--:--"),
      I.appendChild(R),
      I.appendChild($),
      I.appendChild(O),
      I.appendChild(L),
      I.addEventListener("click", () => {
        G();
      }),
      I.addEventListener("keydown", (W) => {
        (W.key === "Enter" || W.key === " ") && (W.preventDefault(), G());
      }),
      t.appendChild(I));
  }
  (t.appendChild(a), document.body.appendChild(t));
  let B = !1;
  const U = () => {
      var R;
      if (h) {
        ((B = !0), t.classList.add("ro-countdown-host--minimized"));
        try {
          typeof sessionStorage < "u" &&
            sessionStorage.setItem("ro_countdown_minimized", "true");
        } catch {}
        (R = e.onMinimize) == null || R.call(e);
      }
    },
    G = () => {
      var R;
      if (h) {
        ((B = !1), t.classList.remove("ro-countdown-host--minimized"));
        try {
          typeof sessionStorage < "u" &&
            sessionStorage.setItem("ro_countdown_minimized", "false");
        } catch {}
        (R = e.onExpand) == null || R.call(e);
      }
    },
    le = () => B;
  if (h) {
    let R = e.initiallyMinimized ?? !1;
    try {
      if (typeof sessionStorage < "u") {
        const $ = sessionStorage.getItem("ro_countdown_minimized");
        $ === "true" ? (R = !0) : $ === "false" && (R = !1);
      }
    } catch {}
    R && U();
  }
  const E = $0(t, e.onDismiss),
    H = new F0(P, e.labels),
    b = (R) => {
      const $ = Math.max(0, Math.floor(R / 1e3)),
        O = Math.floor($ / 3600),
        W = Math.floor(($ % 3600) / 60),
        K = $ % 60;
      ((w.textContent = String(O).padStart(2, "0")),
        (z.textContent = String(W).padStart(2, "0")),
        (A.textContent = String(K).padStart(2, "0")),
        L &&
          !a.classList.contains("ro-countdown--celebrating") &&
          (O > 0
            ? (L.textContent = `${O}h ${W}m`)
            : (L.textContent = `${W}m ${String(K).padStart(2, "0")}s`)),
        H.checkMilestone(R));
    },
    y = () => {
      (a.classList.add("ro-countdown--celebrating"),
        I &&
          (I.classList.add("ro-countdown--celebrating"),
          L && (L.textContent = e.labels.celebration)),
        (T.style.display = "none"),
        (M.style.display = "flex"),
        H.checkMilestone(0));
    };
  return {
    root: t,
    updateDigits: b,
    showCelebration: y,
    triggerCelebrationFlare: y,
    endCelebration: () => {
      (a.classList.remove("ro-countdown--celebrating"),
        I && I.classList.remove("ro-countdown--celebrating"),
        (M.style.display = "none"),
        (T.style.display = "flex"));
    },
    updateSoundButton: (R, $) => {
      f &&
        (f.setAttribute(
          "aria-label",
          R ? e.labels.unmuteButton : e.labels.muteButton
        ),
        f.setAttribute("aria-pressed", String(!R)),
        $
          ? (f.classList.add("ro-countdown-btn--prompt"),
            (f.innerHTML = '<span class="ro-countdown-icon">🔊</span>'),
            f.setAttribute("aria-label", e.labels.playButton))
          : (f.classList.remove("ro-countdown-btn--prompt"),
            (f.innerHTML = R
              ? '<span class="ro-countdown-icon">🔇</span>'
              : '<span class="ro-countdown-icon">🔊</span>')));
    },
    minimize: U,
    expand: G,
    isMinimized: le,
    announcer: H,
    destroy: () => {
      (E(), t.remove());
    },
  };
}
const K0 = /^([01]?\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?$/;
function $s(e, t = new Date(), n = 10) {
  if (!e) return null;
  let r = e;
  if (typeof r == "function")
    try {
      const o = r(t);
      if (!o) return null;
      r = o;
    } catch {
      return null;
    }
  if (r instanceof Date)
    return isNaN(r.getTime()) ? null : new Date(r.getTime());
  if (typeof r == "string") {
    const o = r.trim(),
      a = o.match(K0);
    if (a) {
      const s = parseInt(a[1], 10),
        c = parseInt(a[2], 10),
        u = a[3] !== void 0 ? parseInt(a[3], 10) : 0,
        v = new Date(t.getTime());
      v.setHours(s, c, u, 0);
      const m = n * 6e4;
      return (t.getTime() > v.getTime() + m && v.setDate(v.getDate() + 1), v);
    }
    const i = new Date(o);
    return isNaN(i.getTime()) ? null : i;
  }
  return null;
}
class Z0 {
  constructor(t, n = {}) {
    ((this.dormantTimeoutId = null),
      (this.tickTimeoutId = null),
      (this.celebrationTimeoutId = null),
      (this.autoDismissTimeoutId = null),
      (this.alertWindowActive = !1),
      (this.t0Fired = !1),
      (this.celebrationEndFired = !1),
      (this.autoDismissFired = !1),
      (this.destroyed = !1),
      (this.onVisibilityChange = () => {
        typeof document < "u" &&
          !document.hidden &&
          !this.destroyed &&
          this.forceTick();
      }),
      (this.targetTime = new Date(t.getTime())),
      (this.alertWindowMinutes = n.alertWindowMinutes ?? 30),
      (this.autoDismissMinutes = n.autoDismissMinutes ?? 10),
      (this.celebrationDurationMs = n.celebrationDurationMs ?? 3e4),
      (this.onAlertWindow = n.onAlertWindow),
      (this.onTick = n.onTick),
      (this.onT0 = n.onT0),
      (this.onCelebrationEnd = n.onCelebrationEnd),
      (this.onAutoDismiss = n.onAutoDismiss));
  }
  start() {
    if (this.destroyed) return;
    typeof document < "u" &&
      document.addEventListener("visibilitychange", this.onVisibilityChange);
    const t = Date.now(),
      r = this.targetTime.getTime() - this.alertWindowMinutes * 6e4;
    if (t >= r) this.enterAlertWindow();
    else {
      const o = r - t;
      this.dormantTimeoutId = window.setTimeout(() => {
        this.enterAlertWindow();
      }, o);
    }
  }
  enterAlertWindow() {
    var t;
    this.destroyed ||
      this.alertWindowActive ||
      ((this.alertWindowActive = !0),
      (t = this.onAlertWindow) == null || t.call(this),
      this.startActiveTickLoop());
  }
  startActiveTickLoop() {
    const t = () => {
      var a, i, s;
      if (this.destroyed) return;
      const n = Date.now(),
        r = this.targetTime.getTime() - n;
      if (r <= 0) {
        this.t0Fired ||
          ((this.t0Fired = !0),
          (a = this.onTick) == null || a.call(this, 0),
          (i = this.onT0) == null || i.call(this),
          this.scheduleCelebrationEnd(),
          this.scheduleAutoDismiss());
        return;
      }
      (s = this.onTick) == null || s.call(this, r);
      const o = 1e3 - (Date.now() % 1e3);
      this.tickTimeoutId = window.setTimeout(t, o);
    };
    t();
  }
  scheduleCelebrationEnd() {
    if (this.celebrationDurationMs <= 0 || this.celebrationEndFired) return;
    const t = Date.now(),
      n = this.targetTime.getTime() + this.celebrationDurationMs,
      r = Math.max(0, n - t);
    this.celebrationTimeoutId = window.setTimeout(() => {
      var o;
      !this.destroyed &&
        !this.celebrationEndFired &&
        ((this.celebrationEndFired = !0),
        (o = this.onCelebrationEnd) == null || o.call(this));
    }, r);
  }
  scheduleAutoDismiss() {
    if (this.autoDismissMinutes <= 0 || this.autoDismissFired) return;
    const t = Date.now(),
      n = this.targetTime.getTime() + this.autoDismissMinutes * 6e4,
      r = Math.max(0, n - t);
    this.autoDismissTimeoutId = window.setTimeout(() => {
      var o;
      !this.destroyed &&
        !this.autoDismissFired &&
        ((this.autoDismissFired = !0),
        (o = this.onAutoDismiss) == null || o.call(this));
    }, r);
  }
  forceOpen() {
    this.destroyed ||
      (this.dormantTimeoutId !== null &&
        (clearTimeout(this.dormantTimeoutId), (this.dormantTimeoutId = null)),
      this.alertWindowActive
        ? this.t0Fired ||
          (this.tickTimeoutId !== null &&
            (clearTimeout(this.tickTimeoutId), (this.tickTimeoutId = null)),
          this.startActiveTickLoop())
        : this.enterAlertWindow());
  }
  forceTick() {
    if (this.destroyed) return;
    const t = Date.now(),
      r = this.targetTime.getTime() - this.alertWindowMinutes * 6e4;
    if (!this.alertWindowActive && t >= r) {
      (this.dormantTimeoutId !== null &&
        (clearTimeout(this.dormantTimeoutId), (this.dormantTimeoutId = null)),
        this.enterAlertWindow());
      return;
    }
    this.alertWindowActive &&
      !this.t0Fired &&
      (this.tickTimeoutId !== null &&
        (clearTimeout(this.tickTimeoutId), (this.tickTimeoutId = null)),
      this.startActiveTickLoop());
  }
  updateTarget(t, n, r, o) {
    ((this.targetTime = new Date(t.getTime())),
      n !== void 0 && (this.alertWindowMinutes = n),
      r !== void 0 && (this.autoDismissMinutes = r),
      o !== void 0 && (this.celebrationDurationMs = o),
      this.stop(),
      (this.alertWindowActive = !1),
      (this.t0Fired = !1),
      (this.celebrationEndFired = !1),
      (this.autoDismissFired = !1),
      this.start());
  }
  isAlertWindowActive() {
    return this.alertWindowActive;
  }
  getTargetTime() {
    return new Date(this.targetTime.getTime());
  }
  stop() {
    (this.dormantTimeoutId !== null &&
      (clearTimeout(this.dormantTimeoutId), (this.dormantTimeoutId = null)),
      this.tickTimeoutId !== null &&
        (clearTimeout(this.tickTimeoutId), (this.tickTimeoutId = null)),
      this.celebrationTimeoutId !== null &&
        (clearTimeout(this.celebrationTimeoutId),
        (this.celebrationTimeoutId = null)),
      this.autoDismissTimeoutId !== null &&
        (clearTimeout(this.autoDismissTimeoutId),
        (this.autoDismissTimeoutId = null)));
  }
  destroy() {
    ((this.destroyed = !0),
      this.stop(),
      typeof document < "u" &&
        document.removeEventListener(
          "visibilitychange",
          this.onVisibilityChange
        ));
  }
}
function Hs(e, t = {}) {
  if (!e)
    return {
      start: () => {},
      stop: () => {},
      destroy: () => {},
      isMounted: () => !1,
      controller: null,
    };
  const { isBannerActive: n = !1, hijriYear: r = 1447, colors: o } = t,
    a = typeof e == "boolean" ? {} : e,
    i = a.iftarTime ?? a.maghribTime ?? "18:45",
    s = { ...a, iftarTime: i },
    c = s.alertWindowMinutes ?? 30,
    u = s.autoDismissAfterMinutes !== void 0 ? s.autoDismissAfterMinutes : 10,
    v = s.celebrationDurationMs ?? 3e4,
    m = $s(s.iftarTime, new Date(), u);
  if (!m)
    return (
      console.debug(
        "[ramadan-overlay] Invalid or unresolvable Iftar time provided."
      ),
      {
        start: () => {},
        stop: () => {},
        destroy: () => {},
        isMounted: () => !1,
        controller: null,
      }
    );
  const { dict: f, isRtl: h, lang: g } = O0(s.locale, s.labels),
    S = new W0({
      soundUrl: s.soundUrl,
      defaultMuted: s.defaultMuted,
      onAudioBlocked: () => {
        var k;
        ((k = s.onAudioBlocked) == null || k.call(s),
          d && d.updateSoundButton(S.isMuted(), !0));
      },
    }),
    T = (k) => !(k.sound === !1 || k.soundUrl === !1 || k.soundUrl === "none");
  let d = null,
    p = !1,
    w,
    x = null;
  if (typeof window < "u") {
    const k = () => {
        (S.prime(), A());
      },
      A = () => {
        (window.removeEventListener("pointerdown", k),
          window.removeEventListener("keydown", k),
          (x = null));
      };
    ((x = A),
      window.addEventListener("pointerdown", k, { once: !0, passive: !0 }),
      window.addEventListener("keydown", k, { once: !0, passive: !0 }));
  }
  const C = () => {
      if (d || p) return;
      ((d = Y0({
        targetTime: z.getTargetTime(),
        position: s.position ?? "bottom-right",
        isBannerTopActive: n,
        hasSound: T(s),
        initialMuted: S.isMuted(),
        minimizable: s.minimizable,
        initiallyMinimized: w !== void 0 ? w : s.initiallyMinimized,
        labels: f,
        isRtl: h,
        lang: g,
        onDismiss: () => {
          j.dismiss();
        },
        onToggleSound: () => {
          j.toggleMute();
        },
        onPlayAlert: () => {
          S.playAlert();
        },
      })),
        S.prime());
      const A = z.getTargetTime().getTime() - Date.now();
      d.updateDigits(A);
      const M = Math.max(1, Math.floor(A / 6e4));
      d.announcer.announceInitial(M);
    },
    z = new Z0(m, {
      alertWindowMinutes: c,
      autoDismissMinutes: u,
      celebrationDurationMs: v,
      onAlertWindow: () => {
        C();
      },
      onTick: (k) => {
        d && d.updateDigits(k);
      },
      onT0: () => {
        var k;
        if ((d && d.triggerCelebrationFlare(), s.confetti !== !1))
          try {
            bi(r, o, "ramadan");
          } catch {}
        (S.playAlert(), (k = s.onIftar) == null || k.call(s));
      },
      onCelebrationEnd: () => {
        d && d.endCelebration();
      },
      onAutoDismiss: () => {
        j.dismiss();
      },
    }),
    j = {
      show: () => {
        (C(), z.forceOpen());
      },
      dismiss: () => {
        var k;
        (d && (d.destroy(), (d = null)),
          z.stop(),
          S.destroy(),
          (k = s.onDismiss) == null || k.call(s));
      },
      minimize: () => {
        ((w = !0), d == null || d.minimize());
      },
      expand: () => {
        ((w = !1), d == null || d.expand());
      },
      isMinimized: () =>
        d ? d.isMinimized() : (w ?? (s.initiallyMinimized || !1)),
      toggleMute: () => {
        const k = S.toggleMute();
        return (k || S.prime(), d && d.updateSoundButton(k, !1), k);
      },
      isMuted: () => S.isMuted(),
      playAlert: () => S.playAlert(),
      getTargetTime: () => z.getTargetTime(),
      updateConfig: (k) => {
        if (
          (Object.assign(s, k),
          k.defaultMuted !== void 0 && S.setMuted(k.defaultMuted),
          k.soundUrl !== void 0 && S.setSoundUrl(k.soundUrl),
          k.iftarTime !== void 0 ||
            k.alertWindowMinutes !== void 0 ||
            k.autoDismissAfterMinutes !== void 0 ||
            k.celebrationDurationMs !== void 0)
        ) {
          const A = $s(
            s.iftarTime,
            new Date(),
            s.autoDismissAfterMinutes ?? 10
          );
          A &&
            z.updateTarget(
              A,
              s.alertWindowMinutes ?? 30,
              s.autoDismissAfterMinutes ?? 10,
              s.celebrationDurationMs ?? 3e4
            );
        }
        k.position &&
          d &&
          ((d.root.className = `ro-countdown-host ro-countdown-host--${k.position}`),
          n &&
            k.position.startsWith("top-") &&
            d.root.classList.add("ro-countdown-host--banner-offset-top"));
      },
    };
  return {
    start: () => {
      p || z.start();
    },
    stop: () => {
      z.stop();
    },
    destroy: () => {
      ((p = !0), x && x(), j.dismiss(), z.destroy());
    },
    isMounted: () => d !== null,
    controller: j,
  };
}
const Zr = {
  classic: {
    name: "classic",
    colors: ["#c9a84c", "#e5c158", "#8b4513", "#2d5a27", "#fff7cc", "#1a3a1a"],
    glowColor: "rgba(201, 168, 76, 0.55)",
    ceilingColor: "#8b4513",
    ropeColor: "#c9a84c",
    bannerBg: "rgba(24, 19, 8, 0.95)",
    bannerTextColor: "#fae17d",
    bannerIconColor: "#e5c158",
    countdownBg: "rgba(26, 20, 10, 0.95)",
    countdownBorder: "rgba(201, 168, 76, 0.35)",
    countdownAccent: "#e5c158",
  },
  midnight: {
    name: "midnight",
    colors: ["#fbbf24", "#e2e8f0", "#38bdf8", "#6366f1", "#f8fafc", "#1e293b"],
    glowColor: "rgba(56, 189, 248, 0.55)",
    ceilingColor: "#1e293b",
    ropeColor: "#64748b",
    bannerBg: "rgba(15, 23, 42, 0.95)",
    bannerTextColor: "#f8fafc",
    bannerIconColor: "#fbbf24",
    countdownBg: "rgba(15, 23, 42, 0.95)",
    countdownBorder: "rgba(56, 189, 248, 0.35)",
    countdownAccent: "#fbbf24",
  },
  emerald: {
    name: "emerald",
    colors: ["#f59e0b", "#10b981", "#059669", "#064e3b", "#fde68a", "#022c22"],
    glowColor: "rgba(16, 185, 129, 0.55)",
    ceilingColor: "#064e3b",
    ropeColor: "#059669",
    bannerBg: "rgba(2, 44, 34, 0.95)",
    bannerTextColor: "#fef3c7",
    bannerIconColor: "#f59e0b",
    countdownBg: "rgba(4, 38, 28, 0.95)",
    countdownBorder: "rgba(16, 185, 129, 0.35)",
    countdownAccent: "#f59e0b",
  },
  royal: {
    name: "royal",
    colors: ["#fcd34d", "#a78bfa", "#7c3aed", "#4c1d95", "#fef08a", "#2e1065"],
    glowColor: "rgba(167, 139, 250, 0.55)",
    ceilingColor: "#4c1d95",
    ropeColor: "#8b5cf6",
    bannerBg: "rgba(30, 11, 64, 0.95)",
    bannerTextColor: "#fef08a",
    bannerIconColor: "#fcd34d",
    countdownBg: "rgba(32, 13, 64, 0.95)",
    countdownBorder: "rgba(167, 139, 250, 0.35)",
    countdownAccent: "#fcd34d",
  },
  "desert-dusk": {
    name: "desert-dusk",
    colors: ["#f97316", "#fde047", "#ea580c", "#c2410c", "#fed7aa", "#7c2d12"],
    glowColor: "rgba(249, 115, 22, 0.55)",
    ceilingColor: "#7c2d12",
    ropeColor: "#c2410c",
    bannerBg: "rgba(43, 14, 5, 0.95)",
    bannerTextColor: "#fef3c7",
    bannerIconColor: "#f97316",
    countdownBg: "rgba(43, 14, 5, 0.95)",
    countdownBorder: "rgba(249, 115, 22, 0.35)",
    countdownAccent: "#fde047",
  },
  "platinum-minimal": {
    name: "platinum-minimal",
    colors: ["#e2e8f0", "#94a3b8", "#cbd5e1", "#64748b", "#f8fafc", "#334155"],
    glowColor: "rgba(226, 232, 240, 0.45)",
    ceilingColor: "#475569",
    ropeColor: "#94a3b8",
    bannerBg: "rgba(15, 23, 42, 0.95)",
    bannerTextColor: "#f8fafc",
    bannerIconColor: "#e2e8f0",
    countdownBg: "rgba(15, 23, 42, 0.95)",
    countdownBorder: "rgba(148, 163, 184, 0.35)",
    countdownAccent: "#f8fafc",
  },
  "rose-sahara": {
    name: "rose-sahara",
    colors: ["#fb7185", "#f43f5e", "#fda4af", "#e11d48", "#fff1f2", "#be123c"],
    glowColor: "rgba(251, 113, 133, 0.55)",
    ceilingColor: "#881337",
    ropeColor: "#e11d48",
    bannerBg: "rgba(40, 10, 20, 0.95)",
    bannerTextColor: "#fff1f2",
    bannerIconColor: "#fb7185",
    countdownBg: "rgba(40, 10, 20, 0.95)",
    countdownBorder: "rgba(251, 113, 133, 0.35)",
    countdownAccent: "#fda4af",
  },
};
function X0(e, t) {
  let n = "classic",
    r = {};
  typeof e == "string"
    ? Zr[e] && (n = e)
    : typeof e == "object" &&
      e !== null &&
      (e.extends && Zr[e.extends] && (n = e.extends), (r = e));
  const o = Zr[n];
  let a = [...o.colors];
  return (
    t != null && t.colors && t.colors.length > 0
      ? (a = t.colors)
      : r.colors && r.colors.length > 0 && (a = r.colors),
    {
      name:
        typeof e == "string"
          ? Zr[e]
            ? e
            : "classic"
          : (r.name ?? (e ? "custom" : "classic")),
      extends: n,
      colors: a,
      glowColor:
        (t == null ? void 0 : t.glowColor) ?? r.glowColor ?? o.glowColor,
      ceilingColor:
        (t == null ? void 0 : t.ceilingColor) ??
        r.ceilingColor ??
        o.ceilingColor,
      ropeColor:
        (t == null ? void 0 : t.ropeColor) ?? r.ropeColor ?? o.ropeColor,
      bannerBg: (t == null ? void 0 : t.bannerBg) ?? r.bannerBg ?? o.bannerBg,
      bannerTextColor:
        (t == null ? void 0 : t.bannerTextColor) ??
        r.bannerTextColor ??
        o.bannerTextColor,
      bannerIconColor:
        (t == null ? void 0 : t.bannerIconColor) ??
        r.bannerIconColor ??
        o.bannerIconColor,
      countdownBg: r.countdownBg ?? o.countdownBg,
      countdownBorder: r.countdownBorder ?? o.countdownBorder,
      countdownAccent: r.countdownAccent ?? o.countdownAccent,
    }
  );
}
const J0 = [
    "classic",
    "midnight",
    "emerald",
    "royal",
    "desert-dusk",
    "platinum-minimal",
    "rose-sahara",
  ],
  q0 = ["none", "soft", "deep"],
  e3 = [
    "lanterns",
    "crescent-stars",
    "geometric",
    "sparkles",
    "banner",
    "eid",
    "eid-fitr",
    "eid-adha",
  ],
  t3 = [
    "top",
    "bottom",
    "left",
    "right",
    "sides",
    "both",
    "full",
    "start",
    "end",
  ],
  n3 = ["low", "normal", "high"],
  r3 = ["straight", "u-shaped", "dual"],
  o3 = ["ramadan", "eid-fitr", "eid-adha"],
  a3 = ["hide", "top", "show"],
  i3 = ["on", "off"],
  l3 = ["en", "ar"],
  s3 = ["edges", "full"],
  c3 = ["foreground", "background"];
function dc(e) {
  if (e && typeof e.debug == "boolean") return e.debug;
  if (typeof window < "u" && window.__RAMADAN_OVERLAY_DEBUG__) return !0;
  try {
    typeof process < "u";
  } catch {}
  return !1;
}
function Un(e, t, n, r) {
  return typeof e != "number" || isNaN(e) || !isFinite(e)
    ? r
    : Math.max(t, Math.min(n, e));
}
function Tr(e) {
  return {
    info: (t, ...n) => {
      e && typeof console < "u" && console.info && console.info(t, ...n);
    },
    warn: (t, ...n) => {
      e && typeof console < "u" && console.warn && console.warn(t, ...n);
    },
    error: (t, ...n) => {
      e && typeof console < "u" && console.error && console.error(t, ...n);
    },
  };
}
function Ze(e, t, n, r, o) {
  return typeof e == "string" && t.includes(e)
    ? e
    : (e !== void 0 &&
        Tr(o).warn(
          `[ramadan-overlay] Invalid ${r} "${String(e)}"; falling back to "${n}".`
        ),
      n);
}
function u3() {
  (L0(), G0());
}
function Vs(e, t, n) {
  if (typeof e == "function")
    try {
      e(t);
    } catch (r) {
      Tr(n).warn(
        "[ramadan-overlay] Exception thrown inside consumer onError callback:",
        r
      );
    }
}
function Ws(e, t = ki) {
  return {
    destroy: () => {},
    update: () => {},
    setTheme: () => {},
    container: null,
    config: e,
    state: t,
    getState: () => ({ ...t }),
    getCountdownController: () => null,
    countdown: null,
    fireConfetti: async () => {},
  };
}
function d3() {
  const e = new Date(),
    t = new Date(e.getFullYear(), e.getMonth(), e.getDate() + 1, 0, 0, 1);
  return Math.max(1e3, t.getTime() - e.getTime());
}
function za(e, t) {
  return t.isEid && (e.variant === "lanterns" || e.variant === "eid")
    ? e.eidVariant
    : e.variant;
}
function on(e) {
  return e.mobileSideBehavior === "top" &&
    Pn(e.position).length > 0 &&
    typeof window < "u" &&
    window.innerWidth < 768
    ? "top"
    : e.position;
}
function Gn(e, t) {
  return t.previewMode || !t.autoTrigger
    ? !0
    : e.occasion === "none"
      ? !1
      : t.occasions.includes(e.occasion);
}
function Us(e, t) {
  return e.occasion && e.occasion !== "none"
    ? e.occasion
    : t.variant === "eid-adha"
      ? "eid-adha"
      : t.variant === "eid-fitr" || t.variant === "eid"
        ? "eid-fitr"
        : "ramadan";
}
function Xr(e) {
  const t = dc(e),
    n = Tr(t);
  let r = "classic";
  typeof e.theme == "string"
    ? (r = Ze(e.theme, J0, "classic", "theme", t))
    : typeof e.theme == "object" && e.theme !== null && (r = e.theme);
  const o = X0(r, e),
    a = Ze(e.variant, e3, "lanterns", "variant", t);
  let i = Ze(e.position, t3, "both", "position", t);
  a === "banner" &&
    ["left", "right", "sides", "start", "end"].includes(i) &&
    (n.warn(
      '[ramadan-overlay] Banner variant does not support vertical side positioning; falling back to "top"'
    ),
    (i = "top"));
  const s = typeof window < "u" && window.innerWidth < 640 ? "low" : "normal",
    c = Ze(e.density, n3, s, "density", t);
  let u = e.ropeStyle;
  u === "u-shape" || u === "curved"
    ? (u = "u-shaped")
    : u === "dual-rope" && (u = "dual");
  const v = Ze(u, r3, "straight", "ropeStyle", t),
    m = Ze(e.mobileSideBehavior, a3, "hide", "mobileSideBehavior", t),
    f = Ze(e.confetti, i3, "on", "confetti", t),
    h = Ze(e.locale, l3, "en", "locale", t),
    g = Un(e.opacity, 0, 1, 0.85),
    S = Un(e.zIndex, -2147483648, 2147483647, 9999),
    T = Un(e.lanternZIndex, -2147483648, 2147483647, 2),
    d = Un(e.ropeSag, 6, 60, 20),
    p =
      typeof e.lanternCount == "number" ? Un(e.lanternCount, 1, 12, 4) : void 0,
    w = Ze(e.shadows, q0, "soft", "shadows", t),
    x = ["crescent-stars", "eid", "eid-fitr", "eid-adha"].includes(a)
      ? "edges"
      : "full",
    C = Ze(e.clearance, s3, x, "clearance", t),
    z = Ze(e.layer, c3, "foreground", "layer", t),
    j = e.attachTo ?? e.mountTarget;
  let k;
  typeof j == "string" && j.trim().length > 0
    ? (k = j.trim())
    : typeof HTMLElement < "u" && j instanceof HTMLElement && (k = j);
  const A = k,
    M = e.attachEdge === "top" ? "top" : "bottom";
  let P = ["ramadan", "eid-fitr", "eid-adha"];
  if (Array.isArray(e.occasions)) {
    const B = e.occasions.filter((U) => o3.includes(U));
    B.length > 0 && (P = B);
  }
  let I;
  if (e.date instanceof Date) I = isNaN(e.date.getTime()) ? void 0 : e.date;
  else if (typeof e.date == "string" || typeof e.date == "number") {
    const B = new Date(e.date);
    I = isNaN(B.getTime()) ? void 0 : B;
  }
  let L = "normal";
  return (
    typeof e.intensity == "number"
      ? (L = Math.max(1, Math.min(10, Math.round(e.intensity))))
      : e.intensity === "low" ||
          e.intensity === "normal" ||
          e.intensity === "high"
        ? (L = e.intensity)
        : (e.density === "low" ||
            e.density === "normal" ||
            e.density === "high") &&
          (L = e.density),
    {
      date: I,
      debug: t,
      onError: e.onError,
      theme: e.theme ?? "classic",
      themeName: o.name ?? "classic",
      variant: a,
      position: i,
      clearance: C,
      layer: z,
      mountTarget: A,
      attachTo: k,
      attachEdge: M,
      mobileSideBehavior: m,
      opacity: g,
      shadows: w,
      colors: o.colors,
      zIndex: S,
      lanternZIndex: T,
      autoTrigger: e.autoTrigger ?? !0,
      previewMode: e.previewMode ?? !1,
      confetti: f,
      locale: h,
      bannerBg: o.bannerBg,
      bannerTextColor: o.bannerTextColor,
      bannerTextEn: e.bannerTextEn ?? "",
      bannerTextAr: e.bannerTextAr ?? "",
      bannerIconColor: o.bannerIconColor,
      lanternStyle: e.lanternStyle ?? 0,
      lanternCount: p,
      glowColor: o.glowColor,
      ceilingColor: o.ceilingColor,
      ropeColor: o.ropeColor,
      ropeStyle: v,
      ropeSag: d,
      region: e.region ?? "standard",
      hijriAdjustment: sc(e.region, e.hijriAdjustment),
      density: c,
      intensity: L,
      occasions: P,
      eidVariant: e.eidVariant ?? "eid",
      liveTransition: e.liveTransition ?? !0,
      countdown: e.countdown ?? !1,
      countdownBg: o.countdownBg,
      countdownBorder: o.countdownBorder,
      countdownAccent: o.countdownAccent,
      onRamadanStart: e.onRamadanStart,
      onRamadanEnd: e.onRamadanEnd,
      onEidStart: e.onEidStart,
      onOccasionChange: e.onOccasionChange,
    }
  );
}
function uo(e = {}) {
  if (typeof document > "u") return Ws(Xr(e), ki);
  let t = { ...e },
    n;
  try {
    n = Xr(t);
  } catch {
    n = Xr({});
  }
  const r = dc(n);
  try {
    let o = Cn({
      date: n.date ?? new Date(),
      region: n.region,
      hijriAdjustment: n.hijriAdjustment,
    });
    const a = Tr(r);
    if (n.autoTrigger && !n.previewMode && o.occasion === "none") {
      const x = n.date ?? new Date();
      a.info(
        `[ramadan-overlay] Overlay dormant: autoTrigger is enabled, but current date (${x.toISOString().slice(0, 10)}) does not fall within configured occasions (${n.occasions.join(", ")}). Pass previewMode: true to force display during development.`
      );
    }
    n.previewMode &&
      a.info(
        "[ramadan-overlay] Preview mode active: overlay forced visible regardless of Hijri calendar date."
      );
    let i = null,
      s = new Date().toDateString();
    const c = (x) => {
        const C = za(n, x),
          z = on(n),
          j = { ...n, variant: C, position: z };
        ((i = D0(j, x.occasion)), (w.container = i.container));
      },
      u = () => {
        i && (i.cleanup(), (i = null), (w.container = null));
      },
      v = (x, C) => {
        var z, j, k, A;
        if (
          ((!x || x.occasion !== C.occasion) &&
            ((z = n.onOccasionChange) == null || z.call(n, C.occasion, C)),
          (C.isRamadan || n.previewMode) &&
            (!x || !x.isRamadan) &&
            ((j = n.onRamadanStart) == null || j.call(n, C)),
          C.isEid &&
            (!x || !x.isEid) &&
            ((k = n.onEidStart) == null || k.call(n, C)),
          x != null &&
            x.isRamadan &&
            !C.isRamadan &&
            ((A = n.onRamadanEnd) == null || A.call(n)),
          a0(C, n.confetti, n.previewMode))
        ) {
          const M = C.hijriYear || 1447,
            P = Us(C, n);
          bi(M, n.colors, P);
        }
      };
    let m = null;
    const f = () => {
        if (!n.liveTransition || typeof window > "u") return;
        m && clearTimeout(m);
        const x = d3();
        m = setTimeout(() => {
          h();
        }, x);
      },
      h = () => {
        var M, P;
        const x = new Date();
        s = x.toDateString();
        const C = Cn({
            date: x,
            region: n.region,
            hijriAdjustment: n.hijriAdjustment,
          }),
          z = o,
          j = z.occasion,
          k = Gn(z, n),
          A = Gn(C, n);
        ((o = C),
          (w.state = C),
          A
            ? k
              ? j !== C.occasion && (u(), c(C), v(z, C))
              : (c(C), v(z, C))
            : k &&
              (u(),
              (M = n.onOccasionChange) == null || M.call(n, C.occasion, C),
              z.isRamadan && ((P = n.onRamadanEnd) == null || P.call(n))),
          f());
      },
      g = () => {
        new Date().toDateString() !== s && h();
      };
    n.liveTransition &&
      typeof document < "u" &&
      (f(),
      document.addEventListener("visibilitychange", g),
      typeof window < "u" && window.addEventListener("focus", g));
    let S = on(n);
    const T = () => {
      const x = on(n);
      x !== S && ((S = x), i && Gn(o, n) && (u(), c(o)));
    };
    typeof window < "u" &&
      window.addEventListener("resize", T, { passive: !0 });
    const d = (x, C) => x.isRamadan || C.previewMode || !C.autoTrigger;
    let p = null;
    n.countdown &&
      ((p = Hs(n.countdown, {
        isBannerActive: n.variant === "banner",
        hijriYear: o.hijriYear || 1447,
        colors: n.colors,
      })),
      d(o, n) && p.start());
    const w = {
      destroy: () => {
        var x;
        (p && (p.destroy(), (p = null)),
          m && (clearTimeout(m), (m = null)),
          typeof document < "u" &&
            document.removeEventListener("visibilitychange", g),
          typeof window < "u" &&
            (window.removeEventListener("focus", g),
            window.removeEventListener("resize", T)),
          u(),
          o.isRamadan && ((x = n.onRamadanEnd) == null || x.call(n)));
      },
      update: (x) => {
        try {
          t = { ...t, ...x };
          const C = Xr(t);
          if (
            x.date !== void 0 ||
            x.region !== void 0 ||
            x.hijriAdjustment !== void 0
          ) {
            const k = o;
            ((o = Cn({
              date: C.date ?? new Date(),
              region: C.region,
              hijriAdjustment: C.hijriAdjustment,
            })),
              (w.state = o),
              k.occasion !== o.occasion && v(k, o));
          }
          const z = Gn(o, C),
            j = !!i;
          if (z && !j) ((n = C), c(o));
          else if (!z && j) ((n = C), u());
          else if (i) {
            const k = za(n, o),
              A = za(C, o),
              M =
                C.variant === "banner" &&
                (JSON.stringify(C.bannerTextEn) !==
                  JSON.stringify(n.bannerTextEn) ||
                  JSON.stringify(C.bannerTextAr) !==
                    JSON.stringify(n.bannerTextAr) ||
                  C.locale !== n.locale),
              P = on(n),
              I = on(C),
              L =
                A !== k ||
                I !== P ||
                C.mobileSideBehavior !== n.mobileSideBehavior ||
                C.density !== n.density ||
                C.intensity !== n.intensity ||
                C.lanternStyle !== n.lanternStyle ||
                C.ropeStyle !== n.ropeStyle ||
                C.ropeSag !== n.ropeSag ||
                C.clearance !== n.clearance ||
                C.lanternCount !== n.lanternCount ||
                C.attachTo !== n.attachTo ||
                C.attachEdge !== n.attachEdge ||
                C.mountTarget !== n.mountTarget ||
                M;
            ((n = C), (S = I), L ? (u(), c(o)) : i.updateTokens(C));
          } else ((n = C), (S = on(C)));
          (n.liveTransition ? f() : m && (clearTimeout(m), (m = null)),
            x.countdown !== void 0 &&
              (p && (p.destroy(), (p = null)),
              C.countdown &&
                ((p = Hs(C.countdown, {
                  isBannerActive: C.variant === "banner",
                  hijriYear: o.hijriYear || 1447,
                  colors: C.colors,
                })),
                d(o, C) && p.start())));
        } catch (C) {
          (Vs(t.onError, C, r),
            a.error(
              "[ramadan-overlay] Dynamic update error caught by containment boundary:",
              C
            ));
        }
      },
      setTheme: (x) => {
        w.update({ theme: x });
      },
      container: null,
      state: o,
      get config() {
        return n;
      },
      getCountdownController: () => (p ? p.controller : null),
      get countdown() {
        return p ? p.controller : null;
      },
      getState: () => o,
      fireConfetti: async (x) => {
        const C = o.hijriYear || 1447,
          z = x || Us(o, n);
        await bi(C, n.colors, z);
      },
    };
    return (Gn(o, n) && c(o), v(null, o), w);
  } catch (o) {
    return (
      u3(),
      Vs(e.onError, o, r),
      Tr(r).error(
        "[ramadan-overlay] Catastrophic initialization error caught by containment boundary:",
        o
      ),
      Ws(n, ki)
    );
  }
}
function p3(e = {}) {
  const t = Y.useRef(null),
    [n, r] = Y.useState(() => Cn(e)),
    o = JSON.stringify(e),
    a = Y.useRef(!1);
  Y.useEffect(() => {
    if (((a.current = !0), !t.current)) {
      const s = uo({
        ...e,
        onOccasionChange: (c, u) => {
          var v;
          (r(u), (v = e.onOccasionChange) == null || v.call(e, c, u));
        },
      });
      ((t.current = s), r(s.state));
    }
    return () => {
      var s;
      ((a.current = !1),
        (s = t.current) == null || s.destroy(),
        (t.current = null));
    };
  }, []);
  const i = typeof e.theme == "object" ? JSON.stringify(e.theme) : e.theme;
  return (
    Y.useEffect(() => {
      a.current &&
        t.current &&
        e.theme !== void 0 &&
        t.current.setTheme(e.theme);
    }, [i]),
    Y.useEffect(() => {
      a.current && t.current && t.current.update(e);
    }, [o]),
    { state: n, instance: t.current }
  );
}
const f3 = (e) => {
    const { config: t, onInstance: n, children: r, ...o } = e,
      a = { ...t, ...o },
      { state: i, instance: s } = p3(a);
    return (
      Y.useEffect(() => {
        n && n(s);
      }, [s, n]),
      r ? l.jsx(l.Fragment, { children: r(i) }) : null
    );
  },
  m3 = {
    nav: {
      brandTitle: "زينة رمضان",
      versionBadge: "الإصدار 0.7.0",
      occasionBadge: "المناسبة الحالية",
      occasionSelectLabel: "معاينة المناسبة",
      occasions: {
        ramadan: "🌙 شهر رمضان المبارك",
        "eid-fitr": "🎉 عيد الفطر المبارك",
        "eid-adha": "🐑 عيد الأضحى المبارك",
      },
      overlayOn: "الزينة مفعّلة",
      overlayOff: "الزينة متوقفة",
      chimeTest: "صوت التنبيه",
      confettiLaunch: "احتفال زينة",
      switchLang: "English",
      githubLink: "مستودع GitHub",
      toggleMobileDrawer: "لوحة التحكم",
    },
    hero: {
      badge: "رمضان مبارك و كل عام وأنتم بخير",
      title: "أجواء رمضانية واحتفالية ساحرة لموقعك",
      subtitle:
        "مكتبة تايب سكريبت خفيفة ومستقلة لإضفاء الزينة الرمضانية وفوانيس العيد تلقائياً بحسب التقويم الهجري، مع دعم كامل للرياكت وجميع أطر العمل وعداد الإفطار التفاعلي.",
      ctaWorkbench: "جرب المخصّص التفاعلي",
      ctaLab: "مختبر الأمان والعداد",
      statVariants: "8 أنماط زخرفية (Variants)",
      statZeroDeps: "خفيف ودون اعتماديات",
      statFrameworks: "React, Vue, Svelte, Angular",
    },
    workbench: {
      title: "المخصّص الحي والأنماط التفاعلية",
      subtitle:
        "اختر النمط الزخرفي المناسب لموقعك وخصص الألوان والمواضع واحصل على كود التضمين فوراً.",
      variantHeading: "1. اختر النمط الزخرفي (Overlay Variant)",
      optionsHeading: "2. تخصيص إعدادات النمط",
      variants: {
        lanterns: {
          name: "فوانيس تقليدية",
          desc: "صف فوانيس متدلية من السقف أو الجوانب مع حبال متحركة واقعية.",
        },
        banner: {
          name: "شريط التهنئة",
          desc: "شريط أنيق أعلى أو أسفل الشاشة يحمل عبارات التهنئة بالعربية والإنجليزية.",
        },
        "crescent-stars": {
          name: "هلال ونجوم طائرة",
          desc: "أشكال هلال ونجوم تسبح بخفة عبر الشاشة مع حماية منطقة المحتوى الآمنة (Content Safe Zone).",
        },
        geometric: {
          name: "زخارف إسلامية هندسية",
          desc: "أنماط هندسية إسلامية متحركة بزوايا ناعمة وألوان تراثية.",
        },
        sparkles: {
          name: "بريق ووميض نجوم",
          desc: "جزيئات مضيئة ونجوم ساطعة تتلألأ بهدوء في خلفية الموقع.",
        },
        eid: {
          name: "احتفالات العيد الشاملة",
          desc: "أشكال بهيجة تجمع هلال العيد والبالونات والهدايا.",
        },
        "eid-fitr": {
          name: "عيد الفطر المبارك",
          desc: "زينة عيد الفطر المبهجة مع تهاني خاصة وبالونات احتفالية.",
        },
        "eid-adha": {
          name: "عيد الأضحى المبارك",
          desc: "زينة عيد الأضحى بمجسمات خراف وبالونات وهلال مبارك.",
        },
      },
      tabs: {
        variantTheme: "النمط والمظهر",
        layout: "الموضع والطبقات",
        styling: "التأثيرات والزينة",
        calendar: "التقويم والمناسبات",
        countdownBanner: "العد التنازلي والبانر",
        codeExport: "الكود والتصدير",
      },
      stepper: {
        step: "الخطوة",
        of: "من",
        progress: "مكتمل",
        back: "← السابق",
        next: "الخطوة التالية →",
        finish: "إنهاء وتصدير الكود →",
        reset: "إعادة ضبط للافتراضي",
      },
      universal: {
        theme: "السمة اللونية المعتمدة (Theme Preset)",
        themeOptions: {
          classic: "كلاسيكي (ذهبي ملكي)",
          midnight: "منتصف الليل (كحلي ولازوردي)",
          emerald: "زمردي (أخضر إسلامي فاخر)",
          royal: "ملكي (أرجواني وذهبي)",
          "desert-dusk": "شفق الصحراء (غروب دافئ)",
          "platinum-minimal": "بلاتيني هادئ",
          "rose-sahara": "ورد الصحراء",
          custom: "تخصيص يدوي للألوان",
        },
        position: "موضع الظهور على الشاشة",
        positionOptions: {
          top: "أعلى الشاشة (سقف الموقع)",
          bottom: "أسفل الشاشة",
          both: "أعلى وأسفل معاً",
          full: "كامل مساحة الشاشة",
          sides: "كلا الجانبين (يمين ويسار)",
          left: "الجانب الأيسر فقط",
          right: "الجانب الأيمن فقط",
          start: "بداية المحتوى (يمين في العربية)",
          end: "نهاية المحتوى (يسار في العربية)",
        },
        opacity: "مستوى الشفافية",
        layer: "طبقة العرض (Layer Stacking)",
        layerOptions: {
          foreground: "في المقدمة (أعلى محتوى الموقع)",
          background: "في الخلفية (خلف نصوص الموقع)",
        },
        zIndex: "ترتيب الطبقة الشامل (z-index)",
        zIndexHelp:
          "قيمة ترتيب طبقة الغلاف الرئيسية على صفحة الويب (الافتراضي 9999).",
        shadows: "عمق الظلال الواقعية (Elevation Shadow)",
        shadowOptions: {
          none: "دون ظلال (توهج مسطح)",
          soft: "ظل ناعم وطبيعي",
          deep: "ظل غامق ومجسم",
        },
        confetti: "تأثير احتفال الزينة (Confetti)",
        confettiOptions: { on: "مفعّل (عند وقت الإفطار)", off: "معطل" },
        attachTo: "مكان وتثبيت الزينة",
        attachToOptions: {
          overlay: "طبقة فوق كامل الصفحة (الافتراضي)",
          header: "إرفاق بالهيدر (.celestial-nav)",
          custom: "محدد CSS مخصص",
        },
        attachToCustomPlaceholder:
          "مثال: site-header. أو main-navbar# أو ro-attach-target.",
        attachEdge: "حافة التثبيت (نقطة التعليق)",
        attachEdgeOptions: {
          bottom: "الحافة السفلية (تتدلى أسفل الهيدر)",
          top: "الحافة العلوية (معلقة من أعلى السقف)",
        },
        mobileSideBehavior: "سلوك الزخارف الجانبية على الجوال (<768px)",
        mobileSideBehaviorOptions: {
          hide: "إخفاء على شاشات الجوال (الافتراضي الأنيق)",
          top: "نقل إلى أعلى الصفحة",
          show: "إبقاء على الجوانب",
        },
        autoTrigger: "الكشف التلقائي بالتقويم الهجري",
        autoTriggerHelp:
          "يظهر تلقائياً في شهر رمضان وأيام العيد ويختفي في باقي شهور السنة.",
        previewMode: "فرض وضع المعاينة الدائم",
        previewModeHelp:
          "يتجاوز التحقق من التاريخ ويعرض الزينة باستمرار لأغراض التطوير والتصميم.",
        debug: "سجلات تشخيص المطورين (Debug)",
        debugHelp:
          "طباعة إرشادات في كونسول المتصفح عند خمول الزينة أو تصحيح القيم المقيدة.",
        overlayLocale: "لغة نصوص المكتبة والأرقام (Locale)",
        overlayLocaleHelp:
          "تحديد لغة نصوص شريط التهنئة وأرقام العداد التنازلي ('auto' تتبع لغة متصفح الزائر).",
        overlayLocaleOptions: {
          auto: "تلقائي (حسب متصفح الزائر)",
          en: "الإنجليزية (English)",
          ar: "العربية (Arabic)",
        },
        countdown: "تفعيل ودجت عداد وقت الإفطار",
        countdownHelp:
          "يعرض بطاقة عد تنازلي حتى أذان المغرب مع تنبيهات صوتية واحتفال عند الوصول.",
      },
      calendar: {
        heading: "إعدادات التقويم والحساب الفلكي الإقليمي",
        region: "منطقة الحساب الفلكي (Region Preset)",
        regionHelp:
          "تحديد مرجعية رؤية الهلال والحساب الفلكي بحسب الدولة والجهات الرسمية.",
        regions: {
          standard: "المعياري (تقويم أم القرى الفلكي)",
          saudi: "المملكة العربية السعودية (أم القرى)",
          uae: "الإمارات العربية المتحدة",
          malaysia: "ماليزيا (جاكيم)",
          egypt: "مصر (دار الإفتاء المصرية، +1 يوم غالباً)",
          turkey: "تركيا (رئاسة الشؤون الدينية، +1 يوم)",
          pakistan: "باكستان (لجنة رؤية الهلال، +1 يوم)",
          indonesia: "إندونيسيا (وزارة الشؤون الدينية، +1 يوم)",
          morocco: "المملكة المغربية (وزارة الأوقاف، +1 يوم)",
          us: "الولايات المتحدة (إسنا / مجمع الفقه، +1 يوم)",
          uk: "المملكة المتحدة (الرؤية المحلية / إسنا، +1 يوم)",
        },
        hijriAdjustment: "تعديل أيام التقويم الهجري يدوياً",
        hijriAdjustmentHelp:
          "إزاحة التاريخ من -3 إلى +3 أيام لتوافق إعلان ثبوت الهلال محلياً.",
        days: "أيام",
        astronomicStandard: "المعيار الفلكي الافتراضي",
        clearBtn: "مسح (تاريخ اليوم)",
        testDate: "تاريخ المحاكاة والتجربة الميلادي",
        testDateHelp:
          "اختر أي تاريخ لتجربة الكشف الفوري عن حلول رمضان أو العيد ومحاكاته حياً.",
        occasions: "المناسبات المفعلة للعرض",
        occasionsHelp:
          "اختر الأعياد والمناسبات التي يتم تفعيل الزخارف خلالها تلقائياً.",
        occasionOptions: {
          ramadan: "شهر رمضان المبارك (الشهر 9)",
          "eid-fitr": "عيد الفطر السعيد (1–3 شوال)",
          "eid-adha": "عيد الأضحى المبارك (10–13 ذو الحجة)",
        },
        eidVariant: "نمط زينة العيد",
        eidVariantHelp:
          "نمط الزينة المرئية التي ستظهر تلقائياً في عيدي الفطر والأضحى.",
        liveTransition: "التبديل اللحظي عند منتصف الليل",
        liveTransitionHelp:
          "تحديث نمط المناسبة تلقائياً عند الساعة 00:00 دون الحاجة لتحديث الصفحة.",
      },
      countdown: {
        heading: "خيارات عداد وقت الإفطار التنازلي",
        enabled: "تفعيل عداد الإفطار",
        enabledHelp:
          "يعرض ودجت عائم يحسب الوقت المتبقي حتى موعد الإفطار اليومي.",
        iftarTime: "موعد الإفطار بالتوقيت المحلي (HH:mm)",
        iftarTimeHelp: "توقيت أذان المغرب بنظام 24 ساعة (مثال: 18:45).",
        position: "ركن التثبيت على الشاشة",
        positions: {
          "bottom-right": "الركن السفلي الأيمن",
          "bottom-left": "الركن السفلي الأيسر",
          "top-right": "الركن العلوي الأيمن",
          "top-left": "الركن العلوي الأيسر",
        },
        alertWindowMinutes: "نافذة التنبيه المسبق (بالدقائق)",
        alertWindowHelp:
          "المدة الزمنية قبل موعد الإفطار التي يبدأ الودجت بالظهور خلالها.",
        minimizable: "السماح بالتصغير للشريط المصغر (Docked Pill)",
        minimizableHelp: "إتاحة زر تصغير البطاقة إلى شريط مضغوط أنيق.",
        initiallyMinimized: "البدء في الوضع المصغر",
        initiallyMinimizedHelp: "ظهور الودجت مصغراً فور تحميله.",
        autoDismissAfterMinutes: "الإخفاء التلقائي بعد الإفطار (بالدقائق)",
        autoDismissHelp:
          "المدة بعد حلول الإفطار قبل إغلاق البطاقة واختفائها تلقائياً.",
        celebrationDurationMs: "مدة احتفال الإفطار (بالمللي ثانية)",
        celebrationDurationHelp:
          "مدة نبض التوهج واحتفال الزينة (Confetti) عند الوصول للحظة الإفطار.",
        sound: "التنبيه الصوتي عند حلول الإفطار",
        soundHelp: "تشغيل نغمة تنبيه صوتية وتوفير زر كتم الصوت في البطاقة.",
        defaultMuted: "كتم الصوت افتراضياً",
        defaultMutedHelp:
          "بدء التنبيه الصوتي في حالة الكتم حتى يقوم الزائر بإلغاء الكتم.",
        soundUrl: "رابط ملف صوتي مخصص / أذان",
        soundUrlHelp:
          "رابط ملف صوتي خارجي. اتركه فارغاً لنغمة الويب الصوتية المتناسقة.",
        soundUrlPlaceholder: "رابط صوتي اختياري مثل https://.../adhan.mp3",
      },
      exportStudio: {
        heading: "الكود المصدري وتكامل التثبيت",
        description:
          "تمت مزامنة كافة إعدادات التخصيص المرئية مع لوحة الأكواد الجانبية. يمكنك نسخ كود وسم CDN المستقل دون تجميع أو مشاركة رابط الإعدادات مع فريقك.",
        copyLink: "نسخ رابط الاستوديو المباشر",
        linkCopied: "تم نسخ الرابط!",
        resetDefaults: "استعادة الإعدادات الافتراضية",
        cdnHeading: "تضمين عبر كود CDN (لأي صفحة HTML دون تجميع)",
        copyCdn: "نسخ كود CDN",
        cdnCopied: "تم نسخ كود CDN!",
      },
      variantSpecific: {
        activeVariantBadge: "النموذج النشط",
        lanternHeading: "خيارات الفوانيس والحبال",
        lanternStyle: "تصميم الفانوس",
        lanternCycle: "عرض جميع التصاميم الـ 12 بالتناوب",
        lanternCount: "كثافة وعدد الفوانيس",
        lanternCountAuto: "تلقائي انسيابي (2–6)",
        lanternZIndex: "مستوى طبقة الفوانيس (Z-Index)",
        lanternZIndexOptions: {
          auto: "تلقائي (-1 خلف حبل الزينة)",
          1: "1 (منخفض / أمام الحبل)",
          2: "2 (الافتراضي)",
          10: "10 (مرتفع)",
          100: "100 (عالي)",
          9999: "9999 (في الصدارة)",
        },
        ropeStyle: "نمط حبل التعليق",
        ropeStraight: "حبل مستقيم أفقي",
        ropeUshaped: "حبال متدلية ومنحنية (U-Shaped Swag)",
        ropeDual: "حبل مزدوج احتفالي (Dual Festoon)",
        ropeSag: "عمق تدلي الحبال (بكسل)",
        ceilingColor: "لون مسطرة التثبيت العلوية",
        ropeColor: "لون خيوط الفوانيس المتدلية",
        bannerHeading: "خيارات شريط التهنئة",
        bannerTextAr: "نص التهنئة بالعربية",
        bannerTextEn: "نص التهنئة بالإنجليزية",
        bannerBg: "لون خلفية الشريط",
        bannerTextColor: "لون نص التهنئة",
        bannerIconColor: "لون أيقونة الفانوس",
        motifsHeading: "خيارات حركة الأشكال والهلال",
        clearance: "حماية منطقة المحتوى الآمنة (Content Safe Zone)",
        clearanceEdges: "حصر الأشكال في هوامش الجوانب فقط (الموصى به)",
        clearanceFull: "حركة حرة عبر كامل الشاشة",
        intensity: "كثافة وسرعة حركة الأشكال",
        intensityLevel: "مستوى الكثافة",
        intensityLow: "حركة هادئة وخفيفة",
        intensityNormal: "حركة متوازنة ومعتدلة",
        intensityHigh: "تدفق احتفالي كثيف",
        sparklesHeading: "خيارات البريق والوميض",
        density: "كثافة الجزيئات والنجوم",
        densityOptions: {
          low: "منخفض (خفيف)",
          normal: "عادي (متوازن)",
          high: "مرتفع (احتفالي مكثف)",
        },
        glowColor: "لون توهج الجزيئات والبريق",
      },
      colors: {
        heading: "3. تخصيص لوحة الألوان اليدوية",
        customPalette: "لوحة ألوان متناسقة",
        primary: "اللون الأساسي",
        accent: "لون الزخرفة والتمييز",
        glow: "لون التوهج والبريق",
        ceiling: "لون مسطرة التثبيت",
        rope: "لون الحبال والخيوط",
        bannerBg: "خلفية شريط التهنئة",
        bannerText: "لون نص التهنئة",
        resetBtn: "استعادة ألوان السمة الافتراضية",
      },
      code: {
        heading: "طريقة التضمين وكود الإنتاج",
        chooseSetup: "اختر طريقة التضمين والتشغيل",
        chooseSetupHelp:
          "حدد إطار العمل أو بيئة التشغيل الخاصة بمشروعك للحصول على كود إنتاج مخصص وجاهز للنسخ:",
        installCmd: "أمر تثبيت الحزمة عبر npm",
        installCmdCopied: "✓ تم النسخ!",
        copyBtn: "📋 نسخ الكود",
        copiedBtn: "✓ تم النسخ إلى الحافظة!",
        copyPromptSeamBtn:
          "📋 نسخ مسار وكيل الذكاء الاصطناعي (Agent Prompt Seam)",
        promptSeamCopiedBtn: "✓ تم نسخ مسار الوكيل للحافظة!",
        tabs: {
          react: "React",
          cdn: "وسم CDN مباشر",
          vanilla: "Vanilla JS",
          vue: "Vue 3",
          svelte: "Svelte",
          angular: "Angular",
          ai: "🤖 مسار وكيل الذكاء الاصطناعي (Agent Prompt Seam)",
        },
        promptTitle:
          "مسار مباشر لمساعدي البرمجة بالذكاء الاصطناعي (Cursor / Claude Code / Copilot)",
      },
    },
    lab: {
      title: "مختبر المطور وعداد الإفطار",
      badge: "المختبر المتقدم",
      desc: "أدوات متقدمة لتجربة التحكم البرمجي في عداد الإفطار واختبار صلابة المكتبة وأمانها ضد الانهيارات.",
      countdownTitle: "التحكم التفاعلي في ودجت الإفطار",
      btnShow: "إظهار العداد فوراً",
      btnDismiss: "إخفاء العداد",
      btnMinimize: "تصغير إلى شارة مدمجة (Docked Pill)",
      btnExpand: "توسيع البطاقة بالكامل",
      btnMute: "كتم الصوت",
      btnUnmute: "تشغيل الصوت",
      btnPlayChime: "تجربة نغمة أذان المغرب",
      resilienceTitle: "اختبارات الصلابة وحماية التطبيق (Defensive Resilience)",
      resilienceDesc:
        "تختبر هذه الأزرار منظومة حماية الموقع ضد أي انهيارات برمجية غير متوقعة.",
      btnClamping: "اختبار تقييد الإعدادات الشاذة",
      btnInvalidDate: "اختبار تواريخ غير صالحة (NaN Date)",
      btnCrash: "محاكاة انهيار حقن الأنماط (DOM Rollback)",
      btnOnError: "اختبار عزل استدعاءات Telemetry التالفة",
      btnToggleDebug: "تفعيل السجل التشخيصي",
      debugOn: "السجل التشخيصي: مفعّل",
      debugOff: "السجل التشخيصي: معطل",
      terminalHeading: "سجل التشخيص الفوري (Console Logs)",
      clearTerminal: "مسح السجل",
    },
    footer: {
      copy: "مكتبة مفتوحة المصدر للاحتفال بشهر رمضان المبارك والأعياد.",
      license: "مرخصة تحت رخصة MIT.",
      builtWith: "صنعت بشغف وإتقان.",
    },
  },
  h3 = {
    nav: {
      brandTitle: "ramadan-overlay",
      versionBadge: "v0.7.0",
      occasionBadge: "Festive Occasion",
      occasionSelectLabel: "Preview Occasion",
      occasions: {
        ramadan: "🌙 Ramadan Mubarak",
        "eid-fitr": "🎉 Eid Al-Fitr",
        "eid-adha": "🐑 Eid Al-Adha",
      },
      overlayOn: "Overlay ON",
      overlayOff: "Overlay OFF",
      chimeTest: "Test Chime",
      confettiLaunch: "Celebration Confetti",
      switchLang: "العربية",
      githubLink: "GitHub Repository",
      toggleMobileDrawer: "Toggle Configurator",
    },
    hero: {
      badge: "Ramadan Mubarak & Festive Celebrations",
      title: "Festive Visuals & Iftar Countdown for Modern Web",
      subtitle:
        "A lightweight, zero-dependency TypeScript library that automatically displays Ramadan & Eid decorations based on the Hijri calendar, with first-class React support, all major frameworks, and an accessible countdown timer.",
      ctaWorkbench: "Open Configurator",
      ctaLab: "Safety & Countdown Lab",
      statVariants: "8 Overlay Variants",
      statZeroDeps: "Lightweight & Zero-Deps",
      statFrameworks: "React, Vue, Svelte, Angular",
    },
    workbench: {
      title: "Live Interactive Configurator",
      subtitle:
        "Select an overlay variant, adjust positioning and colors, and copy production code instantly.",
      variantHeading: "1. Select Overlay Variant",
      optionsHeading: "2. Configure Variant Parameters",
      variants: {
        lanterns: {
          name: "Traditional Lanterns",
          desc: "Hanging lanterns from the ceiling or lateral gutters with realistic swinging rope physics.",
        },
        banner: {
          name: "Greeting Banner",
          desc: "Sleek top or bottom greeting bar featuring festive bilingual greetings in Arabic & English.",
        },
        "crescent-stars": {
          name: "Ascending Crescent & Stars",
          desc: "Floating celestial crescents drifting gracefully while keeping the central Content Safe Zone clean.",
        },
        geometric: {
          name: "Islamic Geometric Patterns",
          desc: "Subtle traditional Arabesque lattice patterns rotating smoothly across the viewport.",
        },
        sparkles: {
          name: "Luminous Star Sparkles",
          desc: "Gentle shimmering light particles and twinkling stars creating ambient festive warmth.",
        },
        eid: {
          name: "Eid Celebrations Suite",
          desc: "Celebratory mix of festive crescents, balloons, and gifts for Eid festivities.",
        },
        "eid-fitr": {
          name: "Eid Al-Fitr",
          desc: "Joyful Eid Al-Fitr motifs, sweets, floating balloons, and holiday crescent decorations.",
        },
        "eid-adha": {
          name: "Eid Al-Adha",
          desc: "Festive motifs with cute sheep silhouettes, festive balloons, and warm holiday blessings.",
        },
      },
      tabs: {
        variantTheme: "Variant & Theme",
        layout: "Layout & Placement",
        styling: "Styling & Motifs",
        calendar: "Calendar & Region",
        countdownBanner: "Countdown & Banner",
        codeExport: "Code & Export",
      },
      stepper: {
        step: "Step",
        of: "of",
        progress: "Complete",
        back: "← Back",
        next: "Next Step →",
        finish: "Finish & Export →",
        reset: "Reset to Defaults",
      },
      universal: {
        theme: "Curated Visual Theme",
        themeOptions: {
          classic: "Classic (Royal Gold)",
          midnight: "Midnight (Deep Navy & Lapis)",
          emerald: "Emerald (Sacred Islamic Green)",
          royal: "Royal (Velvet Purple & Gold)",
          "desert-dusk": "Desert Dusk (Warm Sunset Terracotta)",
          "platinum-minimal": "Platinum Minimal (Silver & Ice)",
          "rose-sahara": "Rose Sahara (Muted Blush Gold)",
          custom: "Custom Palette Overrides",
        },
        position: "Viewport Screen Placement",
        positionOptions: {
          top: "Top (Ceiling Rail)",
          bottom: "Bottom Viewport",
          both: "Both (Top & Bottom)",
          full: "Full Viewport Scatter",
          sides: "Both Lateral Sides",
          left: "Left Margin Only",
          right: "Right Margin Only",
          start: "Start Margin (Right in RTL)",
          end: "End Margin (Left in RTL)",
        },
        opacity: "Layer Opacity",
        layer: "Layer Stacking",
        layerOptions: {
          foreground: "Foreground (Above page elements)",
          background: "Background (Ambient backdrop)",
        },
        zIndex: "Root Overlay Z-Index",
        zIndexHelp:
          "Stacking order for the overlay host element (default 9999).",
        shadows: "Elevation Shadow Depth",
        shadowOptions: {
          none: "None (Flat minimalist glow)",
          soft: "Soft (Realistic depth shadow)",
          deep: "Deep (High-contrast elevation)",
        },
        confetti: "Celebration Confetti at Iftar",
        confettiOptions: { on: "Enabled (Flare at T-0)", off: "Disabled" },
        attachTo: "Attachment Mode / Target",
        attachToOptions: {
          overlay: "Overlay Above All (Full Screen Default)",
          header: "Attach to Header (.celestial-nav)",
          custom: "Custom CSS Selector",
        },
        attachToCustomPlaceholder:
          "e.g. .site-header, #main-nav, .ro-attach-target",
        attachEdge: "Attachment Edge (Anchor Point)",
        attachEdgeOptions: {
          bottom: "Bottom Edge (Dangles below header)",
          top: "Top Edge (Hangs along top ceiling)",
        },
        mobileSideBehavior: "Mobile Side Decor Behavior (<768px)",
        mobileSideBehaviorOptions: {
          hide: "Hide on Mobile (Clean layout)",
          top: "Relocate to Top Row",
          show: "Keep on Sides",
        },
        autoTrigger: "Automatic Hijri Calendar Trigger",
        autoTriggerHelp:
          "Automatically displays during Ramadan and Eid periods and sleeps the rest of the year.",
        previewMode: "Force Preview Mode",
        previewModeHelp:
          "Bypasses calendar checks and forces decorations visible for testing.",
        debug: "Diagnostic Developer Logging",
        debugHelp:
          "Emits guidance in developer console when overlay is dormant or values clamped.",
        overlayLocale: "Library Language & Numerals",
        overlayLocaleHelp:
          "Sets language used by greeting banner and countdown numerals ('auto' follows browser language).",
        overlayLocaleOptions: {
          auto: "Auto (Browser Locale)",
          en: "English (en)",
          ar: "Arabic (العربية - ar)",
        },
        countdown: "Enable Iftar Countdown Widget",
        countdownHelp:
          "Mounts an accessible floating countdown card with audio chime alerts and confetti flare at Maghrib.",
      },
      calendar: {
        heading: "Calendar & Regional Settings",
        region: "Calculation Region Preset",
        regionHelp:
          "Matches regional moon-sighting astronomical calculation conventions.",
        regions: {
          standard: "Standard (Umm al-Qura astronomical)",
          saudi: "Saudi Arabia (Umm al-Qura)",
          uae: "United Arab Emirates",
          malaysia: "Malaysia (JAKIM)",
          egypt: "Egypt (Dar al-Ifta, +1 day)",
          turkey: "Turkey (Diyanet, +1 day)",
          pakistan: "Pakistan (Ruet-e-Hilal, +1 day)",
          indonesia: "Indonesia (BIMAS, +1 day)",
          morocco: "Morocco (Habous, +1 day)",
          us: "United States (ISNA / Fiqh Council, +1 day)",
          uk: "United Kingdom (ISNA / Local sighting, +1 day)",
        },
        hijriAdjustment: "Manual Hijri Day Adjustment",
        hijriAdjustmentHelp:
          "Shift calendar by -3 to +3 days. Overrides region preset.",
        days: "Days",
        astronomicStandard: "Astronomic Standard",
        clearBtn: "Clear",
        testDate: "Gregorian Simulation Date",
        testDateHelp:
          "Simulate any calendar day live to test Ramadan or Eid triggers.",
        occasions: "Active Trigger Occasions",
        occasionsHelp:
          "Select which holidays activate the overlay when autoTrigger is on.",
        occasionOptions: {
          ramadan: "Ramadan (Month 9)",
          "eid-fitr": "Eid Al-Fitr (Shawwal 1–3)",
          "eid-adha": "Eid Al-Adha (Dhu al-Hijjah 10–13)",
        },
        eidVariant: "Eid Decoration Variant",
        eidVariantHelp:
          "Decoration variant to display during Eid Al-Fitr and Eid Al-Adha.",
        liveTransition: "Midnight Live Transition",
        liveTransitionHelp:
          "Hot-swaps occasions automatically at midnight without reloading.",
      },
      countdown: {
        heading: "Iftar Countdown Widget Parameters",
        enabled: "Enable Countdown Widget",
        enabledHelp:
          "Displays floating card counting down to daily sunset fast-breaking.",
        iftarTime: "Target Iftar Time (HH:mm)",
        iftarTimeHelp: "24-hour local sunset time (e.g. '18:45').",
        position: "Screen Anchor Corner",
        positions: {
          "bottom-right": "Bottom Right Corner",
          "bottom-left": "Bottom Left Corner",
          "top-right": "Top Right Corner",
          "top-left": "Top Left Corner",
        },
        alertWindowMinutes: "Pre-Iftar Alert Window (Minutes)",
        alertWindowHelp: "Minutes prior to Iftar when widget becomes visible.",
        minimizable: "Allow Minimizing to Docked Pill",
        minimizableHelp:
          "Enables collapse button to tuck widget into compact badge.",
        initiallyMinimized: "Start Initially Minimized",
        initiallyMinimizedHelp: "Mounts widget collapsed in docked pill state.",
        autoDismissAfterMinutes: "Auto-Dismiss After Iftar (Minutes)",
        autoDismissHelp:
          "Minutes after Iftar arrives before card automatically closes.",
        celebrationDurationMs: "Celebration Flare Duration (ms)",
        celebrationDurationHelp:
          "Duration of festive confetti flare and pulse at T-0.",
        sound: "Audio Alert Chime",
        soundHelp: "Plays chime and provides mute toggle on countdown widget.",
        defaultMuted: "Default Muted",
        defaultMutedHelp: "Initial mute state for audio alert chime.",
        soundUrl: "Custom Sound / Adhan URL",
        soundUrlHelp:
          "Custom audio chime file. Leave empty for Web Audio harmonic chime.",
        soundUrlPlaceholder: "Optional audio URL, e.g. https://.../adhan.mp3",
      },
      exportStudio: {
        heading: "Complete Configuration & Integration",
        description:
          "Your active visual setup is synchronized live across all frameworks in the side panel. You can also copy the standalone CDN drop-in script tag or share this exact setup with teammates.",
        copyLink: "Copy Shareable Studio Link",
        linkCopied: "Link Copied!",
        resetDefaults: "Reset to Defaults",
        cdnHeading: "Standalone CDN Script Drop-in (Drop into any HTML)",
        copyCdn: "Copy CDN Script",
        cdnCopied: "Copied!",
      },
      variantSpecific: {
        activeVariantBadge: "Active Variant",
        lanternHeading: "Lantern & Rope Parameters",
        lanternStyle: "Lantern SVG Design",
        lanternCycle: "Cycle all 12 distinct designs",
        lanternCount: "Lantern Density / Count",
        lanternCountAuto: "Auto Decorative (Airy 2–6)",
        lanternZIndex: "Lantern Row Z-Index",
        lanternZIndexOptions: {
          auto: "Auto (-1 under rope festoon)",
          1: "1 (Low / Above festoon)",
          2: "2 (Default)",
          10: "10 (Elevated)",
          100: "100 (High)",
          9999: "9999 (Topmost)",
        },
        ropeStyle: "Suspension String Style",
        ropeStraight: "Straight Ceiling Rail",
        ropeUshaped: "Curved U-Shaped Festoon Swag",
        ropeDual: "Dual Parallel Festival Cables",
        ropeSag: "Rope Sag Depth (px)",
        ceilingColor: "Ceiling Mounting Bar Color",
        ropeColor: "Lantern Dropline Cord Color",
        bannerHeading: "Greeting Banner Parameters",
        bannerTextAr: "Arabic Greeting Text",
        bannerTextEn: "English Greeting Text",
        bannerBg: "Banner Background (RGBA)",
        bannerTextColor: "Greeting Typography Color",
        bannerIconColor: "Lantern Icon Accent Color",
        motifsHeading: "Floating Motif Dynamics",
        clearance: "Content Safe Zone Clearance",
        clearanceEdges: "Constrain to peripheral gutters (Recommended)",
        clearanceFull: "Full viewport scatter",
        intensity: "Motion Cadence & Density",
        intensityLevel: "Intensity Level",
        intensityLow: "Serene & Gentle Float",
        intensityNormal: "Balanced Festive Ambient",
        intensityHigh: "Festive Surge Stream",
        sparklesHeading: "Ambient Sparkle Parameters",
        density: "Particle Density",
        densityOptions: {
          low: "Low (Subtle)",
          normal: "Normal (Balanced)",
          high: "High (Festive)",
        },
        glowColor: "Ambient Glow Halo Color",
      },
      colors: {
        heading: "3. Custom Color Palette",
        customPalette: "Harmonized Color Palette",
        primary: "Primary Accent Color",
        accent: "Secondary Accent Color",
        glow: "Ambient Halo Glow",
        ceiling: "Ceiling Rail Color",
        rope: "Dropline Cord Color",
        bannerBg: "Banner Background",
        bannerText: "Banner Typography Color",
        resetBtn: "Reset to Classic Palette",
      },
      code: {
        heading: "Production Integration & Setup",
        chooseSetup: "Choose Your Setup Method",
        chooseSetupHelp:
          "Select how you want to integrate the overlay into your application to generate customized production code:",
        installCmd: "Package Install Command",
        installCmdCopied: "✓ Copied!",
        copyBtn: "📋 Copy Code",
        copiedBtn: "✓ Copied to clipboard!",
        copyPromptSeamBtn: "📋 Copy Agent Prompt Seam",
        promptSeamCopiedBtn: "✓ Agent Prompt Seam copied!",
        tabs: {
          react: "React",
          cdn: "HTML / CDN Script",
          vanilla: "Vanilla JS",
          vue: "Vue 3",
          svelte: "Svelte",
          angular: "Angular",
          ai: "🤖 Agent Prompt Seam",
        },
        promptTitle:
          "Direct Prompt for AI Assistants (Cursor / Claude Code / Copilot)",
      },
    },
    lab: {
      title: "Developer Lab & Iftar Countdown Sandbox",
      badge: "Advanced Lab",
      desc: "Interactive developer tools to test programmatic countdown widget controls and verify defensive safety and crash containment.",
      countdownTitle: "Iftar Countdown Widget Playground",
      btnShow: "Show Countdown",
      btnDismiss: "Dismiss Widget",
      btnMinimize: "Minimize to Docked Pill",
      btnExpand: "Expand to Full Card",
      btnMute: "Mute Audio Alert",
      btnUnmute: "Unmute Audio Alert",
      btnPlayChime: "Preview Harmonic Chime",
      resilienceTitle: "Defensive Safety & Crash Containment Harness",
      resilienceDesc:
        "Verify that unexpected runtime errors or malformed configs never crash the host application.",
      btnClamping: "Test Extreme Config Clamping",
      btnInvalidDate: "Test Invalid Date (NaN Date)",
      btnCrash: "Simulate DOM Injection Crash (Atomic Rollback)",
      btnOnError: "Test Double-Contained onError Isolation",
      btnToggleDebug: "Toggle Diagnostic Logging",
      debugOn: "Debug Logging: Active",
      debugOff: "Debug Logging: Off",
      terminalHeading: "Real-time Diagnostic Log Terminal",
      clearTerminal: "Clear Terminal",
    },
    footer: {
      copy: "Open-source Ramadan & Eid celebration overlay library.",
      license: "MIT Licensed.",
      builtWith: "Crafted with dedication and care.",
    },
  },
  pc = "ro_demo_lang";
function v3() {
  if (typeof window > "u") return "ar";
  try {
    const t = new URLSearchParams(window.location.search).get("lang");
    if (t === "ar" || t === "en") return t;
  } catch {}
  try {
    const e = window.location.hash.replace(/^#/, ""),
      n = new URLSearchParams(e).get("lang");
    if (n === "ar" || n === "en") return n;
  } catch {}
  try {
    const e = localStorage.getItem(pc);
    if (e === "ar" || e === "en") return e;
  } catch {}
  return "ar";
}
function fc(e) {
  if (typeof document > "u") return;
  const t = e === "ar" ? "rtl" : "ltr";
  (document.documentElement.setAttribute("dir", t),
    document.documentElement.setAttribute("lang", e));
}
function g3(e) {
  if (!(typeof window > "u")) {
    try {
      localStorage.setItem(pc, e);
    } catch {}
    try {
      fc(e);
    } catch {}
  }
}
const y3 = {
  lanterns: ["top", "left", "right", "sides", "start", "end"],
  banner: ["top", "bottom"],
  "crescent-stars": ["full", "both", "top", "bottom", "sides"],
  eid: ["full", "both", "top", "bottom", "sides"],
  "eid-fitr": ["full", "both", "top", "bottom", "sides"],
  "eid-adha": ["full", "both", "top", "bottom", "sides"],
  geometric: ["full", "both", "top", "bottom", "sides", "left", "right"],
  sparkles: ["full", "both", "top", "bottom", "sides"],
};
function mc(e) {
  return y3[e] || ["top"];
}
function w3(e) {
  switch (e) {
    case "lanterns":
    case "banner":
      return "top";
    case "sparkles":
      return "full";
    case "crescent-stars":
    case "eid":
    case "eid-fitr":
    case "eid-adha":
    case "geometric":
    default:
      return "both";
  }
}
function x3(e, t, n) {
  switch (e) {
    case "lanternStyle":
    case "lanternCount":
    case "lanternZIndex":
    case "ropeStyle":
    case "ceilingColor":
    case "ropeColor":
      return t === "lanterns";
    case "ropeSag":
      return t === "lanterns" && (n == null ? void 0 : n.ropeStyle) === "dual";
    case "bannerBg":
    case "bannerTextColor":
    case "bannerIconColor":
    case "bannerTextEn":
    case "bannerTextAr":
      return t === "banner";
    case "clearance":
      return (
        t === "crescent-stars" ||
        t === "eid" ||
        t === "eid-fitr" ||
        t === "eid-adha"
      );
    case "intensity":
      return (
        t === "crescent-stars" ||
        t === "eid" ||
        t === "eid-fitr" ||
        t === "eid-adha"
      );
    case "density":
      return t === "geometric" || t === "sparkles";
    case "shadows":
      return (
        t === "lanterns" ||
        t === "crescent-stars" ||
        t === "eid" ||
        t === "eid-fitr" ||
        t === "eid-adha"
      );
    case "glowColor":
      return t === "sparkles";
    case "colors":
      return t === "lanterns" || t === "geometric";
    case "theme":
    case "position":
    case "opacity":
    case "layer":
    case "autoTrigger":
    case "countdown":
    case "confetti":
    case "attachTo":
      return !0;
    case "attachEdge":
      return !!(n != null && n.attachTo);
    case "mobileSideBehavior":
      return ["left", "right", "sides", "start", "end"].includes("");
    default:
      return !1;
  }
}
function Qn(e, t) {
  const n = mc(t);
  let r = e.position;
  return (
    (!r || !n.includes(r)) && (r = w3(t)),
    { ...e, variant: t, position: r }
  );
}
const b3 = new URL(
    "" + new URL("logo-yOUHX95I.png", import.meta.url).href,
    import.meta.url
  ).href,
  k3 = ({
    t: e,
    locale: t,
    onToggleLocale: n,
    occasion: r,
    onChangeOccasion: o,
    overlayOn: a,
    onToggleOverlay: i,
    onPlayChime: s,
    onFireConfetti: c,
    onToggleDrawer: u,
  }) =>
    l.jsxs("header", {
      className: "celestial-nav ro-attach-target",
      children: [
        l.jsxs("div", {
          className: "nav-brand",
          onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
          children: [
            l.jsx("img", {
              src: b3,
              alt: "ramadan-overlay",
              className: "nav-logo-img",
            }),
            l.jsx("span", {
              className: "nav-title font-display",
              children: e.nav.brandTitle,
            }),
            l.jsx("span", {
              className: "nav-version-badge",
              children: e.nav.versionBadge,
            }),
            l.jsx("span", {
              className: "nav-occasion-badge",
              title: e.nav.occasionBadge,
              children: e.nav.occasions[r],
            }),
          ],
        }),
        l.jsxs("div", {
          className: "nav-controls",
          children: [
            l.jsx("div", {
              className: "nav-dropdown-wrap",
              children: l.jsxs("select", {
                className: "nav-select",
                value: r,
                "aria-label": e.nav.occasionSelectLabel,
                onChange: (v) => o(v.target.value),
                children: [
                  l.jsx("option", {
                    value: "ramadan",
                    children: e.nav.occasions.ramadan,
                  }),
                  l.jsx("option", {
                    value: "eid-fitr",
                    children: e.nav.occasions["eid-fitr"],
                  }),
                  l.jsx("option", {
                    value: "eid-adha",
                    children: e.nav.occasions["eid-adha"],
                  }),
                ],
              }),
            }),
            l.jsxs("button", {
              className: "nav-btn-pill lang-toggle",
              onClick: n,
              title: t === "ar" ? "Switch to English" : "التبديل إلى العربية",
              children: [
                l.jsx("span", { style: { fontSize: "1rem" }, children: "🌐" }),
                l.jsx("span", { children: e.nav.switchLang }),
              ],
            }),
            l.jsxs("button", {
              className: `nav-btn-pill ${a ? "active" : ""}`,
              onClick: i,
              children: [
                l.jsx("span", {
                  style: { fontSize: "0.9rem" },
                  children: a ? "✨" : "💤",
                }),
                l.jsx("span", {
                  children: a ? e.nav.overlayOn : e.nav.overlayOff,
                }),
              ],
            }),
            l.jsxs("button", {
              className: "nav-btn-pill chime-btn",
              onClick: s,
              title: e.nav.chimeTest,
              children: [
                l.jsxs("div", {
                  className: "audio-wave",
                  children: [
                    l.jsx("div", { className: "audio-bar" }),
                    l.jsx("div", { className: "audio-bar" }),
                    l.jsx("div", { className: "audio-bar" }),
                  ],
                }),
                l.jsx("span", { children: e.nav.chimeTest }),
              ],
            }),
            l.jsxs("button", {
              className: "nav-btn-pill",
              onClick: c,
              title: e.nav.confettiLaunch,
              children: [
                l.jsx("span", { children: "🎉" }),
                l.jsx("span", { children: e.nav.confettiLaunch }),
              ],
            }),
            u &&
              l.jsx("button", {
                className: "nav-btn-pill mobile-drawer-btn",
                onClick: u,
                title: e.nav.toggleMobileDrawer,
                children: l.jsx("span", { children: "🎛️" }),
              }),
            l.jsx("a", {
              href: "https://github.com/3mr-5aled/ramadan-overlay",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "nav-btn-pill",
              style: { padding: "7px 12px" },
              title: e.nav.githubLink,
              children: l.jsx("svg", {
                height: "18",
                width: "18",
                viewBox: "0 0 16 16",
                fill: "currentColor",
                "aria-hidden": "true",
                children: l.jsx("path", {
                  d: "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z",
                }),
              }),
            }),
          ],
        }),
      ],
    }),
  S3 = new URL(
    "" + new URL("logo-yOUHX95I.png", import.meta.url).href,
    import.meta.url
  ).href,
  C3 = ({
    t: e,
    locale: t = "ar",
    occasion: n = "ramadan",
    onFireConfetti: r,
    onScrollToWorkbench: o,
    onScrollToLab: a,
  }) => {
    const [i, s] = Y.useState(!1),
      c = async () => {
        try {
          (await navigator.clipboard.writeText("npm i ramadan-overlay"),
            s(!0),
            setTimeout(() => s(!1), 2200));
        } catch {}
      },
      u = e.nav.occasions[n] ?? e.hero.badge,
      v = n === "eid-adha" ? "🐑" : n === "eid-fitr" ? "🎁" : "🌙";
    return l.jsxs("section", {
      id: "hero",
      className: "canopy-stage",
      children: [
        l.jsx("div", {
          className: "canopy-logo-wrap",
          onClick: r,
          title: e.nav.confettiLaunch,
          role: r ? "button" : void 0,
          tabIndex: r ? 0 : void 0,
          onKeyDown: (m) => {
            r &&
              (m.key === "Enter" || m.key === " ") &&
              (m.preventDefault(), r());
          },
          children: l.jsx("img", {
            src: S3,
            alt: "ramadan-overlay logo",
            className: "canopy-hero-logo clickable",
          }),
        }),
        l.jsxs("div", {
          className: "canopy-badge-wrap font-calligraphy",
          children: [
            l.jsx("span", {
              role: "img",
              "aria-label": "occasion icon",
              children: v,
            }),
            l.jsx("span", { children: u }),
          ],
        }),
        l.jsx("h1", {
          className: "canopy-title font-display",
          children: e.hero.title,
        }),
        l.jsx("p", { className: "canopy-subtitle", children: e.hero.subtitle }),
        l.jsxs("div", {
          className: "quick-install-box",
          children: [
            l.jsx("span", { className: "quick-install-prompt", children: "$" }),
            l.jsx("code", {
              className: "quick-install-code",
              children: "npm i ramadan-overlay",
            }),
            l.jsx("button", {
              className: "quick-install-copy-btn",
              onClick: c,
              "aria-label": i ? "Copied" : "Copy install command",
              title: i ? "Copied!" : "Copy command",
              children: i ? "✓" : "📋",
            }),
            i &&
              l.jsx("span", {
                className: "quick-install-toast",
                children: t === "ar" ? "تم النسخ!" : "Copied!",
              }),
          ],
        }),
        l.jsxs("div", {
          className: "canopy-actions",
          children: [
            l.jsxs("button", {
              className: "btn-primary",
              onClick: o,
              children: [
                l.jsx("span", { children: "🎨" }),
                l.jsx("span", { children: e.hero.ctaWorkbench }),
              ],
            }),
            r &&
              l.jsxs("button", {
                className: "btn-celebrate",
                onClick: r,
                title: e.nav.confettiLaunch,
                children: [
                  l.jsx("span", { children: v }),
                  l.jsx("span", { children: e.nav.confettiLaunch }),
                ],
              }),
            l.jsxs("button", {
              className: "btn-secondary",
              onClick: a,
              children: [
                l.jsx("span", { children: "⚡" }),
                l.jsx("span", { children: e.hero.ctaLab }),
              ],
            }),
          ],
        }),
        l.jsxs("div", {
          className: "canopy-stats",
          children: [
            l.jsxs("div", {
              className: "stat-item",
              children: [
                l.jsx("span", { className: "stat-icon", children: "❖" }),
                l.jsx("span", { children: e.hero.statVariants }),
              ],
            }),
            l.jsxs("div", {
              className: "stat-item",
              children: [
                l.jsx("span", { className: "stat-icon", children: "⚡" }),
                l.jsx("span", { children: e.hero.statZeroDeps }),
              ],
            }),
            l.jsxs("div", {
              className: "stat-item",
              children: [
                l.jsx("span", { className: "stat-icon", children: "⚛" }),
                l.jsx("span", { children: e.hero.statFrameworks }),
              ],
            }),
          ],
        }),
      ],
    });
  },
  pt = [
    "variantTheme",
    "layout",
    "styling",
    "calendar",
    "countdownBanner",
    "codeExport",
  ],
  T3 = ({
    t: e,
    locale: t,
    activeTab: n,
    onSelectTab: r,
    onPrevTab: o,
    onNextTab: a,
    onResetDefaults: i,
  }) => {
    const s = [
        {
          key: "variantTheme",
          icon: "🎨",
          label: e.workbench.tabs.variantTheme,
          step: 1,
        },
        { key: "layout", icon: "📐", label: e.workbench.tabs.layout, step: 2 },
        {
          key: "styling",
          icon: "🏮",
          label: e.workbench.tabs.styling,
          step: 3,
        },
        {
          key: "calendar",
          icon: "📅",
          label: e.workbench.tabs.calendar,
          step: 4,
        },
        {
          key: "countdownBanner",
          icon: "⏳",
          label: e.workbench.tabs.countdownBanner,
          step: 5,
        },
        {
          key: "codeExport",
          icon: "💻",
          label: e.workbench.tabs.codeExport,
          step: 6,
        },
      ],
      c = pt.indexOf(n),
      u = pt.length,
      v = c >= 0 ? c + 1 : 1,
      m = Math.round((v / u) * 100);
    return l.jsxs("div", {
      className: "ro-config-tabs-container",
      children: [
        l.jsxs("div", {
          className: "ro-progress-header",
          children: [
            l.jsxs("div", {
              className: "ro-progress-meta",
              children: [
                l.jsxs("span", {
                  className: "ro-progress-label font-mono",
                  children: [
                    e.workbench.stepper.step,
                    " ",
                    v,
                    " ",
                    e.workbench.stepper.of,
                    " ",
                    u,
                    " · ",
                    m,
                    "% ",
                    e.workbench.stepper.progress,
                  ],
                }),
                i &&
                  l.jsxs("button", {
                    type: "button",
                    className: "ro-tab-reset-btn",
                    onClick: i,
                    title: e.workbench.stepper.reset,
                    children: ["🔄 ", e.workbench.stepper.reset],
                  }),
              ],
            }),
            l.jsx("div", {
              className: "ro-progress-track",
              role: "progressbar",
              "aria-valuenow": m,
              "aria-valuemin": 0,
              "aria-valuemax": 100,
              children: l.jsx("div", {
                className: "ro-progress-fill",
                style: { width: `${m}%` },
              }),
            }),
          ],
        }),
        l.jsx("nav", {
          className: "ro-config-tabs-nav",
          "aria-label": "Configuration Steps",
          children: s.map((f) => {
            const h = f.key === n,
              g = f.step < v;
            return l.jsxs(
              "button",
              {
                type: "button",
                className: `ro-config-tab-btn ${h ? "active" : ""} ${g ? "passed" : ""}`,
                onClick: () => r(f.key),
                "aria-selected": h,
                role: "tab",
                children: [
                  l.jsx("span", {
                    className: "ro-tab-step-badge",
                    children: f.step,
                  }),
                  l.jsx("span", { className: "ro-tab-icon", children: f.icon }),
                  l.jsx("span", {
                    className: "ro-tab-title",
                    children: f.label,
                  }),
                ],
              },
              f.key
            );
          }),
        }),
      ],
    });
  },
  z3 = ({ t: e, activeTab: t, onPrevTab: n, onNextTab: r }) => {
    const o = pt.indexOf(t),
      a = o === 0,
      i = o === pt.length - 1;
    return l.jsxs("div", {
      className: "ro-stepper-footer",
      children: [
        l.jsx("button", {
          type: "button",
          className: "ro-stepper-btn ro-stepper-back-btn",
          onClick: n,
          disabled: a,
          "aria-disabled": a,
          children: e.workbench.stepper.back,
        }),
        l.jsx("button", {
          type: "button",
          className: "ro-stepper-btn ro-stepper-next-btn btn-primary",
          onClick: r,
          children: i ? e.workbench.stepper.finish : e.workbench.stepper.next,
        }),
      ],
    });
  },
  j3 = [
    { id: "lanterns", icon: "🏮" },
    { id: "banner", icon: "🏷️" },
    { id: "crescent-stars", icon: "🌙" },
    { id: "geometric", icon: "💠" },
    { id: "sparkles", icon: "✨" },
    { id: "eid", icon: "🎉" },
    { id: "eid-fitr", icon: "🍬" },
    { id: "eid-adha", icon: "🐑" },
  ],
  M3 = ({ t: e, activeVariant: t, onSelectVariant: n }) =>
    l.jsxs("div", {
      className: "panel-card",
      children: [
        l.jsxs("h3", {
          className: "panel-heading",
          children: [
            l.jsx("span", { children: "❖" }),
            l.jsx("span", { children: e.workbench.variantHeading }),
          ],
        }),
        l.jsx("div", {
          className: "variant-grid",
          children: j3.map(({ id: r, icon: o }) => {
            const a = e.workbench.variants[r] || { name: r, desc: "" },
              i = t === r;
            return l.jsxs(
              "div",
              {
                className: `variant-card ${i ? "active" : ""}`,
                onClick: () => n(r),
                role: "button",
                tabIndex: 0,
                onKeyDown: (s) => {
                  (s.key === "Enter" || s.key === " ") && n(r);
                },
                children: [
                  l.jsxs("div", {
                    className: "variant-card-title",
                    children: [
                      l.jsx("span", {
                        style: { fontSize: "1.2rem" },
                        children: o,
                      }),
                      l.jsx("span", { children: a.name }),
                    ],
                  }),
                  l.jsx("p", {
                    className: "variant-card-desc",
                    children: a.desc,
                  }),
                ],
              },
              r
            );
          }),
        }),
      ],
    }),
  E3 = ({ customTheme: e, onChangeColor: t, onReset: n, translations: r }) => {
    const o = e.colors || [
        "#c9a84c",
        "#e5c158",
        "#9a7b2c",
        "#f3e5ab",
        "#1b3b2b",
        "#0f172a",
      ],
      a = o[0] || "#c9a84c",
      i = o[3] || "#f3e5ab";
    return l.jsxs("div", {
      className: "card-panel color-customizer-panel",
      children: [
        l.jsxs("div", {
          className: "panel-header",
          children: [
            l.jsx("h3", { className: "panel-title", children: r.heading }),
            l.jsx("button", {
              type: "button",
              className: "btn-outline btn-sm",
              onClick: n,
              children: r.resetBtn,
            }),
          ],
        }),
        l.jsxs("div", {
          className: "color-grid",
          children: [
            l.jsxs("div", {
              className: "color-field",
              children: [
                l.jsx("label", {
                  htmlFor: "color-primary",
                  children: r.primary,
                }),
                l.jsxs("div", {
                  className: "color-input-wrapper",
                  children: [
                    l.jsx("input", {
                      id: "color-primary",
                      type: "color",
                      value: a,
                      onChange: (s) => t("primaryColor", s.target.value),
                      className: "color-picker",
                    }),
                    l.jsx("span", { className: "color-code", children: a }),
                  ],
                }),
              ],
            }),
            l.jsxs("div", {
              className: "color-field",
              children: [
                l.jsx("label", { htmlFor: "color-accent", children: r.accent }),
                l.jsxs("div", {
                  className: "color-input-wrapper",
                  children: [
                    l.jsx("input", {
                      id: "color-accent",
                      type: "color",
                      value: i,
                      onChange: (s) => t("accentColor", s.target.value),
                      className: "color-picker",
                    }),
                    l.jsx("span", { className: "color-code", children: i }),
                  ],
                }),
              ],
            }),
            l.jsxs("div", {
              className: "color-field",
              children: [
                l.jsx("label", { htmlFor: "color-glow", children: r.glow }),
                l.jsx("div", {
                  className: "color-input-wrapper",
                  children: l.jsx("input", {
                    id: "color-glow",
                    type: "text",
                    value: e.glowColor || "rgba(201,168,76,0.55)",
                    onChange: (s) => t("glowColor", s.target.value),
                    className: "form-input text-mono",
                  }),
                }),
              ],
            }),
            l.jsxs("div", {
              className: "color-field",
              children: [
                l.jsx("label", {
                  htmlFor: "color-ceiling",
                  children: r.ceiling,
                }),
                l.jsxs("div", {
                  className: "color-input-wrapper",
                  children: [
                    l.jsx("input", {
                      id: "color-ceiling",
                      type: "color",
                      value: e.ceilingColor || "#c9a84c",
                      onChange: (s) => t("ceilingColor", s.target.value),
                      className: "color-picker",
                    }),
                    l.jsx("span", {
                      className: "color-code",
                      children: e.ceilingColor || "#c9a84c",
                    }),
                  ],
                }),
              ],
            }),
            l.jsxs("div", {
              className: "color-field",
              children: [
                l.jsx("label", { htmlFor: "color-rope", children: r.rope }),
                l.jsxs("div", {
                  className: "color-input-wrapper",
                  children: [
                    l.jsx("input", {
                      id: "color-rope",
                      type: "color",
                      value: e.ropeColor || "#c9a84c",
                      onChange: (s) => t("ropeColor", s.target.value),
                      className: "color-picker",
                    }),
                    l.jsx("span", {
                      className: "color-code",
                      children: e.ropeColor || "#c9a84c",
                    }),
                  ],
                }),
              ],
            }),
            l.jsxs("div", {
              className: "color-field",
              children: [
                l.jsx("label", {
                  htmlFor: "color-banner-bg",
                  children: r.bannerBg,
                }),
                l.jsx("div", {
                  className: "color-input-wrapper",
                  children: l.jsx("input", {
                    id: "color-banner-bg",
                    type: "text",
                    value: e.bannerBg || "rgba(15,15,20,0.92)",
                    onChange: (s) => t("bannerBg", s.target.value),
                    className: "form-input text-mono",
                  }),
                }),
              ],
            }),
            l.jsxs("div", {
              className: "color-field",
              children: [
                l.jsx("label", {
                  htmlFor: "color-banner-text",
                  children: r.bannerText,
                }),
                l.jsxs("div", {
                  className: "color-input-wrapper",
                  children: [
                    l.jsx("input", {
                      id: "color-banner-text",
                      type: "color",
                      value: e.bannerTextColor || "#f1f5f9",
                      onChange: (s) => t("bannerTextColor", s.target.value),
                      className: "color-picker",
                    }),
                    l.jsx("span", {
                      className: "color-code",
                      children: e.bannerTextColor || "#f1f5f9",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    });
  },
  N3 = [
    "classic",
    "midnight",
    "emerald",
    "royal",
    "desert-dusk",
    "platinum-minimal",
    "rose-sahara",
  ],
  A3 = ({
    t: e,
    activeVariant: t,
    onSelectVariant: n,
    themeName: r,
    onChangeTheme: o,
    customTheme: a,
    onUpdateCustomColor: i,
    onResetCustomColors: s,
    config: c,
    onUpdateConfig: u,
  }) => {
    const v = c.autoTrigger ?? !1,
      m = c.previewMode ?? !0,
      f = c.debug ?? !1;
    return l.jsxs("div", {
      className: "ro-tab-content-pane",
      children: [
        l.jsx(M3, { t: e, activeVariant: t, onSelectVariant: n }),
        l.jsxs("div", {
          className: "panel-card",
          style: { marginTop: "20px" },
          children: [
            l.jsxs("h3", {
              className: "panel-heading",
              children: [
                l.jsx("span", { children: "🎨" }),
                l.jsx("span", { children: e.workbench.universal.theme }),
              ],
            }),
            l.jsx("div", {
              style: {
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "18px",
              },
              children: l.jsxs("div", {
                className: "form-group",
                children: [
                  l.jsx("label", {
                    className: "form-label",
                    children: e.workbench.universal.theme,
                  }),
                  l.jsxs("select", {
                    className: "form-select",
                    "data-field": "theme",
                    value: r,
                    onChange: (h) => o(h.target.value),
                    children: [
                      l.jsx("optgroup", {
                        label: "Theme Presets",
                        children: N3.map((h) =>
                          l.jsx(
                            "option",
                            {
                              value: h,
                              children:
                                e.workbench.universal.themeOptions[h] || h,
                            },
                            h
                          )
                        ),
                      }),
                      l.jsx("optgroup", {
                        label: "Theme Overrides",
                        children: l.jsx("option", {
                          value: "custom",
                          children: e.workbench.universal.themeOptions.custom,
                        }),
                      }),
                    ],
                  }),
                ],
              }),
            }),
            r === "custom" &&
              l.jsx("div", {
                style: { marginTop: "16px" },
                children: l.jsx(E3, {
                  customTheme: a,
                  onChangeColor: i,
                  onReset: s,
                  translations: e.workbench.colors,
                }),
              }),
            l.jsxs("div", {
              style: {
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "14px",
                marginTop: "20px",
                paddingTop: "16px",
                borderTop: "1px solid var(--border-dark)",
              },
              children: [
                l.jsxs("div", {
                  className: "form-toggle-wrap",
                  onClick: () => u({ autoTrigger: !v }),
                  children: [
                    l.jsxs("div", {
                      children: [
                        l.jsx("div", {
                          style: { fontWeight: 600, fontSize: "0.9rem" },
                          children: e.workbench.universal.autoTrigger,
                        }),
                        l.jsx("div", {
                          className: "form-help",
                          children: e.workbench.universal.autoTriggerHelp,
                        }),
                      ],
                    }),
                    l.jsxs("div", {
                      className: "toggle-switch",
                      children: [
                        l.jsx("input", {
                          type: "checkbox",
                          "data-field": "autoTrigger",
                          checked: v,
                          onChange: () => u({ autoTrigger: !v }),
                          onClick: (h) => h.stopPropagation(),
                        }),
                        l.jsx("span", { className: "toggle-slider" }),
                      ],
                    }),
                  ],
                }),
                l.jsxs("div", {
                  className: "form-toggle-wrap",
                  onClick: () => u({ previewMode: !m }),
                  children: [
                    l.jsxs("div", {
                      children: [
                        l.jsx("div", {
                          style: { fontWeight: 600, fontSize: "0.9rem" },
                          children: e.workbench.universal.previewMode,
                        }),
                        l.jsx("div", {
                          className: "form-help",
                          children: e.workbench.universal.previewModeHelp,
                        }),
                      ],
                    }),
                    l.jsxs("div", {
                      className: "toggle-switch",
                      children: [
                        l.jsx("input", {
                          type: "checkbox",
                          "data-field": "previewMode",
                          checked: m,
                          onChange: () => u({ previewMode: !m }),
                          onClick: (h) => h.stopPropagation(),
                        }),
                        l.jsx("span", { className: "toggle-slider" }),
                      ],
                    }),
                  ],
                }),
                l.jsxs("div", {
                  className: "form-toggle-wrap",
                  onClick: () => u({ debug: !f }),
                  children: [
                    l.jsxs("div", {
                      children: [
                        l.jsx("div", {
                          style: { fontWeight: 600, fontSize: "0.9rem" },
                          children: e.workbench.universal.debug,
                        }),
                        l.jsx("div", {
                          className: "form-help",
                          children: e.workbench.universal.debugHelp,
                        }),
                      ],
                    }),
                    l.jsxs("div", {
                      className: "toggle-switch",
                      children: [
                        l.jsx("input", {
                          type: "checkbox",
                          "data-field": "debug",
                          checked: f,
                          onChange: () => u({ debug: !f }),
                          onClick: (h) => h.stopPropagation(),
                        }),
                        l.jsx("span", { className: "toggle-slider" }),
                      ],
                    }),
                  ],
                }),
                l.jsxs("div", {
                  className: "form-group",
                  style: { gridColumn: "1 / -1", marginTop: "4px" },
                  children: [
                    l.jsx("label", {
                      className: "form-label",
                      children: e.workbench.universal.overlayLocale,
                    }),
                    l.jsxs("select", {
                      className: "form-select",
                      "data-field": "locale",
                      value: c.locale || "auto",
                      onChange: (h) => u({ locale: h.target.value }),
                      children: [
                        l.jsx("option", {
                          value: "auto",
                          children:
                            e.workbench.universal.overlayLocaleOptions.auto,
                        }),
                        l.jsx("option", {
                          value: "en",
                          children:
                            e.workbench.universal.overlayLocaleOptions.en,
                        }),
                        l.jsx("option", {
                          value: "ar",
                          children:
                            e.workbench.universal.overlayLocaleOptions.ar,
                        }),
                      ],
                    }),
                    l.jsx("span", {
                      className: "form-help",
                      children: e.workbench.universal.overlayLocaleHelp,
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    });
  },
  L3 = ({ variant: e, position: t, onChangePosition: n, translations: r }) => {
    const o = mc(e);
    return l.jsxs("div", {
      className: "control-group",
      children: [
        l.jsx("label", { htmlFor: "position-select", children: r.position }),
        l.jsx("select", {
          id: "position-select",
          value: t,
          onChange: (a) => n(a.target.value),
          className: "form-select",
          children: o.map((a) =>
            l.jsx(
              "option",
              { value: a, children: r.positionOptions[a] || a },
              a
            )
          ),
        }),
      ],
    });
  },
  I3 = ({
    t: e,
    variant: t,
    position: n,
    onChangePosition: r,
    config: o,
    onUpdateConfig: a,
  }) => {
    const i = o.layer || "foreground",
      s = o.zIndex ?? 9999,
      c = o.attachTo,
      u = o.attachEdge || "bottom",
      v = o.mobileSideBehavior || "hide",
      m = o.clearance || "edges",
      f = c === ".celestial-nav",
      h = !!(c && typeof c == "string" && !f),
      [g, S] = ja.useState(h);
    return (
      ja.useEffect(() => {
        h && S(!0);
      }, [h]),
      l.jsx("div", {
        className: "ro-tab-content-pane",
        children: l.jsxs("div", {
          className: "panel-card",
          children: [
            l.jsxs("h3", {
              className: "panel-heading",
              children: [
                l.jsx("span", { children: "📐" }),
                l.jsx("span", { children: e.workbench.tabs.layout }),
              ],
            }),
            l.jsxs("div", {
              style: {
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "18px",
              },
              children: [
                l.jsx(L3, {
                  variant: t,
                  position: n,
                  onChangePosition: r,
                  translations: e.workbench.universal,
                }),
                l.jsxs("div", {
                  className: "form-group",
                  children: [
                    l.jsx("label", {
                      className: "form-label",
                      children: e.workbench.universal.layer,
                    }),
                    l.jsxs("select", {
                      className: "form-select",
                      "data-field": "layer",
                      value: i,
                      onChange: (T) => a({ layer: T.target.value }),
                      children: [
                        l.jsx("option", {
                          value: "foreground",
                          children:
                            e.workbench.universal.layerOptions.foreground,
                        }),
                        l.jsx("option", {
                          value: "background",
                          children:
                            e.workbench.universal.layerOptions.background,
                        }),
                      ],
                    }),
                  ],
                }),
                l.jsxs("div", {
                  className: "form-group",
                  children: [
                    l.jsx("label", {
                      className: "form-label",
                      children: e.workbench.universal.zIndex,
                    }),
                    l.jsx("input", {
                      type: "number",
                      className: "form-input",
                      "data-field": "zIndex",
                      value: s,
                      onChange: (T) => {
                        const d = parseInt(T.target.value, 10);
                        a({ zIndex: isNaN(d) ? 9999 : d });
                      },
                    }),
                    l.jsx("span", {
                      className: "form-help",
                      children: e.workbench.universal.zIndexHelp,
                    }),
                  ],
                }),
                l.jsxs("div", {
                  className: "form-group",
                  children: [
                    l.jsx("label", {
                      className: "form-label",
                      children: e.workbench.universal.attachTo,
                    }),
                    l.jsxs("select", {
                      className: "form-select",
                      "data-field": "attachTo",
                      value: g || h ? "custom" : f ? "header" : "overlay",
                      onChange: (T) => {
                        T.target.value === "overlay"
                          ? (S(!1), a({ attachTo: void 0 }))
                          : T.target.value === "header"
                            ? (S(!1), a({ attachTo: ".celestial-nav" }))
                            : (S(!0),
                              a({
                                attachTo:
                                  typeof c == "string" &&
                                  c &&
                                  c !== ".celestial-nav"
                                    ? c
                                    : ".ro-attach-target",
                              }));
                      },
                      children: [
                        l.jsx("option", {
                          value: "header",
                          children:
                            e.workbench.universal.attachToOptions.header,
                        }),
                        l.jsx("option", {
                          value: "overlay",
                          children:
                            e.workbench.universal.attachToOptions.overlay,
                        }),
                        l.jsx("option", {
                          value: "custom",
                          children:
                            e.workbench.universal.attachToOptions.custom,
                        }),
                      ],
                    }),
                    (g || h) &&
                      l.jsx("input", {
                        type: "text",
                        className: "form-input",
                        "data-field": "attachToCustom",
                        style: { marginTop: "8px" },
                        placeholder:
                          e.workbench.universal.attachToCustomPlaceholder,
                        value: typeof c == "string" ? c : "",
                        onChange: (T) => a({ attachTo: T.target.value }),
                      }),
                  ],
                }),
                (!!c || g) &&
                  l.jsxs("div", {
                    className: "form-group",
                    children: [
                      l.jsx("label", {
                        className: "form-label",
                        children: e.workbench.universal.attachEdge,
                      }),
                      l.jsxs("select", {
                        className: "form-select",
                        "data-field": "attachEdge",
                        value: u,
                        onChange: (T) => a({ attachEdge: T.target.value }),
                        children: [
                          l.jsx("option", {
                            value: "bottom",
                            children:
                              e.workbench.universal.attachEdgeOptions.bottom,
                          }),
                          l.jsx("option", {
                            value: "top",
                            children:
                              e.workbench.universal.attachEdgeOptions.top,
                          }),
                        ],
                      }),
                    ],
                  }),
                l.jsxs("div", {
                  className: "form-group",
                  children: [
                    l.jsx("label", {
                      className: "form-label",
                      children: e.workbench.universal.mobileSideBehavior,
                    }),
                    l.jsxs("select", {
                      className: "form-select",
                      "data-field": "mobileSideBehavior",
                      value: v,
                      onChange: (T) =>
                        a({ mobileSideBehavior: T.target.value }),
                      children: [
                        l.jsx("option", {
                          value: "hide",
                          children:
                            e.workbench.universal.mobileSideBehaviorOptions
                              .hide,
                        }),
                        l.jsx("option", {
                          value: "top",
                          children:
                            e.workbench.universal.mobileSideBehaviorOptions.top,
                        }),
                        l.jsx("option", {
                          value: "show",
                          children:
                            e.workbench.universal.mobileSideBehaviorOptions
                              .show,
                        }),
                      ],
                    }),
                  ],
                }),
                l.jsxs("div", {
                  className: "form-group",
                  children: [
                    l.jsx("label", {
                      className: "form-label",
                      children: e.workbench.variantSpecific.clearance,
                    }),
                    l.jsxs("select", {
                      className: "form-select",
                      "data-field": "clearance",
                      value: m,
                      onChange: (T) => a({ clearance: T.target.value }),
                      children: [
                        l.jsx("option", {
                          value: "edges",
                          children: e.workbench.variantSpecific.clearanceEdges,
                        }),
                        l.jsx("option", {
                          value: "full",
                          children: e.workbench.variantSpecific.clearanceFull,
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      })
    );
  },
  D3 = ({ t: e, config: t, onUpdateConfig: n }) => {
    var T, d, p, w, x, C, z, j;
    const r = t.opacity ?? 0.85,
      o = t.shadows || "soft",
      a = t.confetti === "off" ? "off" : "on",
      i = t.variant === "lanterns",
      s = t.lanternStyle ?? 0,
      c = t.lanternCount,
      u = t.lanternZIndex ?? 2,
      v = t.ropeStyle || "straight",
      m = t.ropeSag ?? 20,
      f = t.ceilingColor || "#c9a84c",
      h = t.ropeColor || "#c9a84c",
      g = t.density || "normal",
      S =
        typeof t.intensity == "number"
          ? t.intensity
          : t.intensity === "high"
            ? 8
            : t.intensity === "low"
              ? 3
              : 5;
    return (
      t.glowColor,
      l.jsxs("div", {
        className: "ro-tab-content-pane",
        children: [
          l.jsxs("div", {
            className: "panel-card",
            children: [
              l.jsxs("h3", {
                className: "panel-heading",
                children: [
                  l.jsx("span", { children: "✨" }),
                  l.jsx("span", { children: e.workbench.tabs.styling }),
                ],
              }),
              l.jsxs("div", {
                style: {
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: "18px",
                },
                children: [
                  l.jsxs("div", {
                    className: "form-group",
                    children: [
                      l.jsxs("div", {
                        style: {
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "6px",
                        },
                        children: [
                          l.jsx("label", {
                            className: "form-label",
                            style: { margin: 0 },
                            children: e.workbench.universal.opacity,
                          }),
                          l.jsxs("span", {
                            style: {
                              fontFamily: "var(--font-mono)",
                              fontSize: "0.82rem",
                              color: "var(--gold-400)",
                            },
                            children: [Math.round(r * 100), "%"],
                          }),
                        ],
                      }),
                      l.jsx("input", {
                        type: "range",
                        min: "0.1",
                        max: "1",
                        step: "0.05",
                        className: "form-range",
                        "data-field": "opacity",
                        value: r,
                        onChange: (k) =>
                          n({ opacity: parseFloat(k.target.value) }),
                      }),
                    ],
                  }),
                  l.jsxs("div", {
                    className: "form-group",
                    children: [
                      l.jsx("label", {
                        className: "form-label",
                        children: e.workbench.universal.shadows,
                      }),
                      l.jsxs("select", {
                        className: "form-select",
                        "data-field": "shadows",
                        value: o,
                        onChange: (k) => n({ shadows: k.target.value }),
                        children: [
                          l.jsx("option", {
                            value: "soft",
                            children: e.workbench.universal.shadowOptions.soft,
                          }),
                          l.jsx("option", {
                            value: "deep",
                            children: e.workbench.universal.shadowOptions.deep,
                          }),
                          l.jsx("option", {
                            value: "none",
                            children: e.workbench.universal.shadowOptions.none,
                          }),
                        ],
                      }),
                    ],
                  }),
                  l.jsxs("div", {
                    className: "form-group",
                    children: [
                      l.jsx("label", {
                        className: "form-label",
                        children: e.workbench.universal.confetti,
                      }),
                      l.jsxs("select", {
                        className: "form-select",
                        "data-field": "confetti",
                        value: a,
                        onChange: (k) => n({ confetti: k.target.value }),
                        children: [
                          l.jsx("option", {
                            value: "on",
                            children: e.workbench.universal.confettiOptions.on,
                          }),
                          l.jsx("option", {
                            value: "off",
                            children: e.workbench.universal.confettiOptions.off,
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          l.jsxs("div", {
            className: "panel-card",
            style: {
              marginTop: "16px",
              border: i ? "1px solid var(--border-gold-glow)" : void 0,
            },
            children: [
              l.jsxs("h3", {
                className: "panel-heading",
                children: [
                  l.jsx("span", { children: "🏮" }),
                  l.jsx("span", {
                    children: e.workbench.variantSpecific.lanternHeading,
                  }),
                  i &&
                    l.jsx("span", {
                      className: "badge",
                      style: {
                        fontSize: "0.75rem",
                        padding: "2px 8px",
                        background: "rgba(201, 168, 76, 0.15)",
                        color: "var(--gold-300)",
                        borderRadius: "12px",
                        marginInlineStart: "8px",
                      },
                      children: e.workbench.variantSpecific.activeVariantBadge,
                    }),
                ],
              }),
              l.jsxs("div", {
                style: {
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "16px",
                },
                children: [
                  l.jsxs("div", {
                    className: "form-group",
                    children: [
                      l.jsx("label", {
                        className: "form-label",
                        children: e.workbench.variantSpecific.lanternStyle,
                      }),
                      l.jsxs("select", {
                        className: "form-select",
                        "data-field": "lanternStyle",
                        value: s,
                        onChange: (k) =>
                          n({ lanternStyle: parseInt(k.target.value, 10) }),
                        children: [
                          l.jsx("option", {
                            value: 0,
                            children: e.workbench.variantSpecific.lanternCycle,
                          }),
                          [...Array(12)].map((k, A) =>
                            l.jsxs(
                              "option",
                              { value: A + 1, children: ["Design #", A + 1] },
                              A + 1
                            )
                          ),
                        ],
                      }),
                    ],
                  }),
                  l.jsxs("div", {
                    className: "form-group",
                    children: [
                      l.jsx("label", {
                        className: "form-label",
                        children: e.workbench.variantSpecific.lanternCount,
                      }),
                      l.jsxs("select", {
                        className: "form-select",
                        "data-field": "lanternCount",
                        value: c ?? 0,
                        onChange: (k) => {
                          const A = parseInt(k.target.value, 10);
                          n({ lanternCount: A === 0 ? void 0 : A });
                        },
                        children: [
                          l.jsx("option", {
                            value: 0,
                            children:
                              e.workbench.variantSpecific.lanternCountAuto,
                          }),
                          [1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((k) =>
                            l.jsx("option", { value: k, children: k }, k)
                          ),
                        ],
                      }),
                    ],
                  }),
                  l.jsxs("div", {
                    className: "form-group",
                    children: [
                      l.jsx("label", {
                        className: "form-label",
                        children: e.workbench.variantSpecific.lanternZIndex,
                      }),
                      l.jsxs("select", {
                        className: "form-select",
                        "data-field": "lanternZIndex",
                        value: u,
                        onChange: (k) =>
                          n({ lanternZIndex: parseInt(k.target.value, 10) }),
                        children: [
                          l.jsx("option", {
                            value: 1,
                            children:
                              ((T =
                                e.workbench.variantSpecific
                                  .lanternZIndexOptions) == null
                                ? void 0
                                : T["1"]) || "1 (Low)",
                          }),
                          l.jsx("option", {
                            value: 2,
                            children:
                              ((d =
                                e.workbench.variantSpecific
                                  .lanternZIndexOptions) == null
                                ? void 0
                                : d["2"]) || "2 (Default)",
                          }),
                          l.jsx("option", {
                            value: 10,
                            children:
                              ((p =
                                e.workbench.variantSpecific
                                  .lanternZIndexOptions) == null
                                ? void 0
                                : p["10"]) || "10 (Elevated)",
                          }),
                          l.jsx("option", {
                            value: 100,
                            children:
                              ((w =
                                e.workbench.variantSpecific
                                  .lanternZIndexOptions) == null
                                ? void 0
                                : w["100"]) || "100 (High)",
                          }),
                          l.jsx("option", {
                            value: 9999,
                            children:
                              ((x =
                                e.workbench.variantSpecific
                                  .lanternZIndexOptions) == null
                                ? void 0
                                : x["9999"]) || "9999 (Topmost)",
                          }),
                        ],
                      }),
                    ],
                  }),
                  l.jsxs("div", {
                    className: "form-group",
                    children: [
                      l.jsx("label", {
                        className: "form-label",
                        children: e.workbench.variantSpecific.ropeStyle,
                      }),
                      l.jsxs("select", {
                        className: "form-select",
                        "data-field": "ropeStyle",
                        value: v,
                        onChange: (k) => n({ ropeStyle: k.target.value }),
                        children: [
                          l.jsx("option", {
                            value: "straight",
                            children: e.workbench.variantSpecific.ropeStraight,
                          }),
                          l.jsx("option", {
                            value: "u-shaped",
                            children: e.workbench.variantSpecific.ropeUshaped,
                          }),
                          l.jsx("option", {
                            value: "dual",
                            children: e.workbench.variantSpecific.ropeDual,
                          }),
                        ],
                      }),
                    ],
                  }),
                  v !== "straight" &&
                    l.jsxs("div", {
                      className: "form-group",
                      children: [
                        l.jsxs("div", {
                          style: {
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "4px",
                          },
                          children: [
                            l.jsx("label", {
                              className: "form-label",
                              style: { margin: 0 },
                              children: e.workbench.variantSpecific.ropeSag,
                            }),
                            l.jsxs("span", {
                              className: "font-mono",
                              style: { color: "var(--gold-400)" },
                              children: [m, "px"],
                            }),
                          ],
                        }),
                        l.jsx("input", {
                          type: "range",
                          min: "6",
                          max: "60",
                          step: "2",
                          className: "form-range",
                          "data-field": "ropeSag",
                          value: m,
                          onChange: (k) =>
                            n({ ropeSag: parseInt(k.target.value, 10) }),
                        }),
                      ],
                    }),
                  l.jsxs("div", {
                    className: "form-group",
                    children: [
                      l.jsx("label", {
                        className: "form-label",
                        children: e.workbench.variantSpecific.ceilingColor,
                      }),
                      l.jsxs("div", {
                        style: {
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        },
                        children: [
                          l.jsx("input", {
                            type: "color",
                            className: "color-picker",
                            "data-field": "ceilingColor",
                            value: f.startsWith("#") ? f : "#c9a84c",
                            onChange: (k) =>
                              n({ ceilingColor: k.target.value }),
                          }),
                          l.jsx("span", {
                            className: "color-code font-mono",
                            children: f,
                          }),
                        ],
                      }),
                    ],
                  }),
                  l.jsxs("div", {
                    className: "form-group",
                    children: [
                      l.jsx("label", {
                        className: "form-label",
                        children: e.workbench.variantSpecific.ropeColor,
                      }),
                      l.jsxs("div", {
                        style: {
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        },
                        children: [
                          l.jsx("input", {
                            type: "color",
                            className: "color-picker",
                            "data-field": "ropeColor",
                            value: h.startsWith("#") ? h : "#c9a84c",
                            onChange: (k) => n({ ropeColor: k.target.value }),
                          }),
                          l.jsx("span", {
                            className: "color-code font-mono",
                            children: h,
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          l.jsxs("div", {
            className: "panel-card",
            style: { marginTop: "16px" },
            children: [
              l.jsxs("h3", {
                className: "panel-heading",
                children: [
                  l.jsx("span", { children: "✨" }),
                  l.jsx("span", {
                    children: e.workbench.variantSpecific.motifsHeading,
                  }),
                ],
              }),
              l.jsxs("div", {
                style: {
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: "16px",
                },
                children: [
                  l.jsxs("div", {
                    className: "form-group",
                    children: [
                      l.jsx("label", {
                        className: "form-label",
                        children: e.workbench.variantSpecific.density,
                      }),
                      l.jsxs("select", {
                        className: "form-select",
                        "data-field": "density",
                        value: g,
                        onChange: (k) => n({ density: k.target.value }),
                        children: [
                          l.jsx("option", {
                            value: "low",
                            children:
                              ((C =
                                e.workbench.variantSpecific.densityOptions) ==
                              null
                                ? void 0
                                : C.low) || "Low (Subtle)",
                          }),
                          l.jsx("option", {
                            value: "normal",
                            children:
                              ((z =
                                e.workbench.variantSpecific.densityOptions) ==
                              null
                                ? void 0
                                : z.normal) || "Normal (Balanced)",
                          }),
                          l.jsx("option", {
                            value: "high",
                            children:
                              ((j =
                                e.workbench.variantSpecific.densityOptions) ==
                              null
                                ? void 0
                                : j.high) || "High (Festive)",
                          }),
                        ],
                      }),
                    ],
                  }),
                  l.jsxs("div", {
                    className: "form-group",
                    children: [
                      l.jsxs("div", {
                        style: {
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "4px",
                        },
                        children: [
                          l.jsx("label", {
                            className: "form-label",
                            style: { margin: 0 },
                            children: e.workbench.variantSpecific.intensity,
                          }),
                          l.jsxs("span", {
                            className: "font-mono",
                            style: { color: "var(--gold-400)" },
                            children: [
                              e.workbench.variantSpecific.intensityLevel,
                              " ",
                              S,
                              " / 10",
                            ],
                          }),
                        ],
                      }),
                      l.jsx("input", {
                        type: "range",
                        min: "1",
                        max: "10",
                        step: "1",
                        className: "form-range",
                        "data-field": "intensity",
                        value: S,
                        onChange: (k) =>
                          n({ intensity: parseInt(k.target.value, 10) }),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      })
    );
  },
  P3 = [
    "standard",
    "saudi",
    "uae",
    "malaysia",
    "egypt",
    "turkey",
    "pakistan",
    "indonesia",
    "morocco",
    "us",
    "uk",
  ],
  R3 = [
    { id: "ramadan", labelKey: "Ramadan (Month 9)" },
    { id: "eid-fitr", labelKey: "Eid Al-Fitr (Shawwal 1–3)" },
    { id: "eid-adha", labelKey: "Eid Al-Adha (Dhu al-Hijjah 10–13)" },
  ],
  _3 = ({ t: e, config: t, onUpdateConfig: n }) => {
    var v, m, f, h, g, S, T, d, p, w, x, C, z, j, k, A;
    const r = t.region || "standard",
      o = t.hijriAdjustment ?? 0,
      a = t.occasions || ["ramadan", "eid-fitr", "eid-adha"],
      i = t.eidVariant || "eid",
      s = t.liveTransition ?? !0,
      c = t.date
        ? typeof t.date == "string"
          ? t.date.slice(0, 10)
          : t.date instanceof Date
            ? t.date.toISOString().slice(0, 10)
            : ""
        : "",
      u = (M) => {
        let P;
        (a.includes(M) ? (P = a.filter((I) => I !== M)) : (P = [...a, M]),
          n({ occasions: P }));
      };
    return l.jsx("div", {
      className: "ro-tab-content-pane",
      children: l.jsxs("div", {
        className: "panel-card",
        children: [
          l.jsxs("h3", {
            className: "panel-heading",
            children: [
              l.jsx("span", { children: "📅" }),
              l.jsx("span", { children: e.workbench.calendar.heading }),
            ],
          }),
          l.jsxs("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "18px",
            },
            children: [
              l.jsxs("div", {
                className: "form-group",
                children: [
                  l.jsx("label", {
                    className: "form-label",
                    children: e.workbench.calendar.region,
                  }),
                  l.jsx("select", {
                    className: "form-select",
                    "data-field": "region",
                    value: r,
                    onChange: (M) => n({ region: M.target.value }),
                    children: P3.map((M) =>
                      l.jsx(
                        "option",
                        {
                          value: M,
                          children: e.workbench.calendar.regions[M] || M,
                        },
                        M
                      )
                    ),
                  }),
                  l.jsx("span", {
                    className: "form-help",
                    children: e.workbench.calendar.regionHelp,
                  }),
                ],
              }),
              l.jsxs("div", {
                className: "form-group",
                children: [
                  l.jsx("label", {
                    className: "form-label",
                    children: e.workbench.calendar.hijriAdjustment,
                  }),
                  l.jsx("div", {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    },
                    children: l.jsxs("select", {
                      className: "form-select",
                      "data-field": "hijriAdjustment",
                      value: o,
                      onChange: (M) =>
                        n({ hijriAdjustment: parseInt(M.target.value, 10) }),
                      children: [
                        l.jsxs("option", {
                          value: -3,
                          children: ["-3 ", e.workbench.calendar.days],
                        }),
                        l.jsxs("option", {
                          value: -2,
                          children: ["-2 ", e.workbench.calendar.days],
                        }),
                        l.jsxs("option", {
                          value: -1,
                          children: ["-1 ", e.workbench.calendar.days],
                        }),
                        l.jsxs("option", {
                          value: 0,
                          children: [
                            "0 (",
                            e.workbench.calendar.astronomicStandard,
                            ")",
                          ],
                        }),
                        l.jsxs("option", {
                          value: 1,
                          children: ["+1 ", e.workbench.calendar.days],
                        }),
                        l.jsxs("option", {
                          value: 2,
                          children: ["+2 ", e.workbench.calendar.days],
                        }),
                        l.jsxs("option", {
                          value: 3,
                          children: ["+3 ", e.workbench.calendar.days],
                        }),
                      ],
                    }),
                  }),
                  l.jsx("span", {
                    className: "form-help",
                    children: e.workbench.calendar.hijriAdjustmentHelp,
                  }),
                ],
              }),
              l.jsxs("div", {
                className: "form-group",
                children: [
                  l.jsx("label", {
                    className: "form-label",
                    children: e.workbench.calendar.testDate,
                  }),
                  l.jsxs("div", {
                    style: { display: "flex", gap: "8px" },
                    children: [
                      l.jsx("input", {
                        type: "date",
                        className: "form-input font-mono",
                        "data-field": "testDate",
                        value: c,
                        onChange: (M) => {
                          const P = M.target.value;
                          n({ date: P ? new Date(P) : void 0 });
                        },
                      }),
                      c &&
                        l.jsx("button", {
                          type: "button",
                          className: "btn-outline btn-sm",
                          onClick: () => n({ date: void 0 }),
                          title: e.workbench.calendar.clearBtn,
                          children: e.workbench.calendar.clearBtn,
                        }),
                    ],
                  }),
                  l.jsx("span", {
                    className: "form-help",
                    children: e.workbench.calendar.testDateHelp,
                  }),
                ],
              }),
              l.jsxs("div", {
                className: "form-group",
                children: [
                  l.jsx("label", {
                    className: "form-label",
                    children: e.workbench.calendar.eidVariant,
                  }),
                  l.jsxs("select", {
                    className: "form-select",
                    "data-field": "eidVariant",
                    value: i,
                    onChange: (M) => n({ eidVariant: M.target.value }),
                    children: [
                      l.jsx("option", {
                        value: "eid",
                        children:
                          ((m =
                            (v = e.workbench.variants) == null
                              ? void 0
                              : v.eid) == null
                            ? void 0
                            : m.name) || "Eid Celebrations Suite",
                      }),
                      l.jsx("option", {
                        value: "eid-fitr",
                        children:
                          ((h =
                            (f = e.workbench.variants) == null
                              ? void 0
                              : f["eid-fitr"]) == null
                            ? void 0
                            : h.name) || "Eid Al-Fitr",
                      }),
                      l.jsx("option", {
                        value: "eid-adha",
                        children:
                          ((S =
                            (g = e.workbench.variants) == null
                              ? void 0
                              : g["eid-adha"]) == null
                            ? void 0
                            : S.name) || "Eid Al-Adha",
                      }),
                      l.jsx("option", {
                        value: "lanterns",
                        children:
                          ((d =
                            (T = e.workbench.variants) == null
                              ? void 0
                              : T.lanterns) == null
                            ? void 0
                            : d.name) || "Traditional Lanterns",
                      }),
                      l.jsx("option", {
                        value: "crescent-stars",
                        children:
                          ((w =
                            (p = e.workbench.variants) == null
                              ? void 0
                              : p["crescent-stars"]) == null
                            ? void 0
                            : w.name) || "Ascending Crescent & Stars",
                      }),
                      l.jsx("option", {
                        value: "geometric",
                        children:
                          ((C =
                            (x = e.workbench.variants) == null
                              ? void 0
                              : x.geometric) == null
                            ? void 0
                            : C.name) || "Islamic Geometric Patterns",
                      }),
                      l.jsx("option", {
                        value: "sparkles",
                        children:
                          ((j =
                            (z = e.workbench.variants) == null
                              ? void 0
                              : z.sparkles) == null
                            ? void 0
                            : j.name) || "Luminous Star Sparkles",
                      }),
                      l.jsx("option", {
                        value: "banner",
                        children:
                          ((A =
                            (k = e.workbench.variants) == null
                              ? void 0
                              : k.banner) == null
                            ? void 0
                            : A.name) || "Greeting Banner",
                      }),
                    ],
                  }),
                  l.jsx("span", {
                    className: "form-help",
                    children: e.workbench.calendar.eidVariantHelp,
                  }),
                ],
              }),
            ],
          }),
          l.jsxs("div", {
            style: {
              marginTop: "20px",
              paddingTop: "16px",
              borderTop: "1px solid var(--border-dark)",
            },
            children: [
              l.jsx("label", {
                className: "form-label",
                children: e.workbench.calendar.occasions,
              }),
              l.jsx("div", {
                className: "form-help",
                style: { marginBottom: "12px" },
                children: e.workbench.calendar.occasionsHelp,
              }),
              l.jsx("div", {
                style: { display: "flex", flexWrap: "wrap", gap: "12px" },
                children: R3.map((M) => {
                  var I;
                  const P = a.includes(M.id);
                  return l.jsxs(
                    "label",
                    {
                      style: {
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "8px 14px",
                        borderRadius: "var(--radius-md)",
                        background: P
                          ? "rgba(201, 168, 76, 0.14)"
                          : "rgba(255, 255, 255, 0.03)",
                        border: P
                          ? "1px solid var(--border-gold-glow)"
                          : "1px solid var(--border-mid)",
                        cursor: "pointer",
                        fontSize: "0.88rem",
                        color: P ? "var(--gold-200)" : "var(--text-secondary)",
                        userSelect: "none",
                      },
                      children: [
                        l.jsx("input", {
                          type: "checkbox",
                          checked: P,
                          onChange: () => u(M.id),
                        }),
                        l.jsx("span", {
                          children:
                            ((I = e.workbench.calendar.occasionOptions) == null
                              ? void 0
                              : I[M.id]) || M.labelKey,
                        }),
                      ],
                    },
                    M.id
                  );
                }),
              }),
            ],
          }),
          l.jsx("div", {
            style: { marginTop: "16px" },
            children: l.jsxs("div", {
              className: "form-toggle-wrap",
              onClick: () => n({ liveTransition: !s }),
              children: [
                l.jsxs("div", {
                  children: [
                    l.jsx("div", {
                      style: { fontWeight: 600, fontSize: "0.9rem" },
                      children: e.workbench.calendar.liveTransition,
                    }),
                    l.jsx("div", {
                      className: "form-help",
                      children: e.workbench.calendar.liveTransitionHelp,
                    }),
                  ],
                }),
                l.jsxs("div", {
                  className: "toggle-switch",
                  children: [
                    l.jsx("input", {
                      type: "checkbox",
                      "data-field": "liveTransition",
                      checked: s,
                      onChange: () => n({ liveTransition: !s }),
                      onClick: (M) => M.stopPropagation(),
                    }),
                    l.jsx("span", { className: "toggle-slider" }),
                  ],
                }),
              ],
            }),
          }),
        ],
      }),
    });
  },
  O3 = ({ t: e, config: t, onUpdateConfig: n }) => {
    const r =
        typeof t.bannerTextAr == "string" ? t.bannerTextAr : "رَمَضَان كَرِيم",
      o =
        typeof t.bannerTextEn == "string" ? t.bannerTextEn : "Ramadan Mubarak",
      a = t.bannerBg || "rgba(15,15,20,0.92)",
      i = t.bannerTextColor || "#f1f5f9",
      s = t.bannerIconColor || "#c9a84c",
      c = !!t.countdown,
      u =
        typeof t.countdown == "object" && t.countdown !== null
          ? t.countdown
          : {},
      v = typeof u.iftarTime == "string" ? u.iftarTime : "18:45",
      m = u.position || "bottom-right",
      f = u.alertWindowMinutes ?? 30,
      h = u.minimizable ?? !0,
      g = u.initiallyMinimized ?? !1,
      S = u.autoDismissAfterMinutes ?? 10,
      T = u.celebrationDurationMs ?? 3e4,
      d = u.sound ?? !0,
      p = u.defaultMuted ?? !0,
      w = typeof u.soundUrl == "string" ? u.soundUrl : "",
      x = (z) => {
        n({ countdown: { ...u, ...z } });
      },
      C = () => {
        n(
          c
            ? { countdown: !1 }
            : { countdown: { ...u, iftarTime: v, position: m } }
        );
      };
    return l.jsxs("div", {
      className: "ro-tab-content-pane",
      children: [
        l.jsxs("div", {
          className: "panel-card",
          children: [
            l.jsxs("h3", {
              className: "panel-heading",
              children: [
                l.jsx("span", { children: "📜" }),
                l.jsx("span", {
                  children: e.workbench.variantSpecific.bannerHeading,
                }),
              ],
            }),
            l.jsxs("div", {
              style: {
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "18px",
              },
              children: [
                l.jsxs("div", {
                  className: "form-group",
                  children: [
                    l.jsx("label", {
                      className: "form-label",
                      children: e.workbench.variantSpecific.bannerTextAr,
                    }),
                    l.jsx("input", {
                      type: "text",
                      className: "form-input",
                      "data-field": "bannerTextAr",
                      dir: "rtl",
                      value: r,
                      onChange: (z) => n({ bannerTextAr: z.target.value }),
                    }),
                  ],
                }),
                l.jsxs("div", {
                  className: "form-group",
                  children: [
                    l.jsx("label", {
                      className: "form-label",
                      children: e.workbench.variantSpecific.bannerTextEn,
                    }),
                    l.jsx("input", {
                      type: "text",
                      className: "form-input",
                      "data-field": "bannerTextEn",
                      dir: "ltr",
                      value: o,
                      onChange: (z) => n({ bannerTextEn: z.target.value }),
                    }),
                  ],
                }),
                l.jsxs("div", {
                  className: "form-group",
                  children: [
                    l.jsx("label", {
                      className: "form-label",
                      children: e.workbench.variantSpecific.bannerBg,
                    }),
                    l.jsxs("div", {
                      style: {
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      },
                      children: [
                        l.jsx("input", {
                          type: "color",
                          className: "color-picker",
                          "data-field": "bannerBg",
                          value: a.startsWith("#") ? a : "#0f0f14",
                          onChange: (z) => n({ bannerBg: z.target.value }),
                        }),
                        l.jsx("span", {
                          className: "color-code font-mono",
                          children: a,
                        }),
                      ],
                    }),
                  ],
                }),
                l.jsxs("div", {
                  className: "form-group",
                  children: [
                    l.jsx("label", {
                      className: "form-label",
                      children: e.workbench.variantSpecific.bannerTextColor,
                    }),
                    l.jsxs("div", {
                      style: {
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      },
                      children: [
                        l.jsx("input", {
                          type: "color",
                          className: "color-picker",
                          "data-field": "bannerTextColor",
                          value: i.startsWith("#") ? i : "#f1f5f9",
                          onChange: (z) =>
                            n({ bannerTextColor: z.target.value }),
                        }),
                        l.jsx("span", {
                          className: "color-code font-mono",
                          children: i,
                        }),
                      ],
                    }),
                  ],
                }),
                l.jsxs("div", {
                  className: "form-group",
                  children: [
                    l.jsx("label", {
                      className: "form-label",
                      children: e.workbench.variantSpecific.bannerIconColor,
                    }),
                    l.jsxs("div", {
                      style: {
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      },
                      children: [
                        l.jsx("input", {
                          type: "color",
                          className: "color-picker",
                          "data-field": "bannerIconColor",
                          value: s.startsWith("#") ? s : "#c9a84c",
                          onChange: (z) =>
                            n({ bannerIconColor: z.target.value }),
                        }),
                        l.jsx("span", {
                          className: "color-code font-mono",
                          children: s,
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        l.jsxs("div", {
          className: "panel-card",
          style: { marginTop: "16px" },
          children: [
            l.jsxs("h3", {
              className: "panel-heading",
              children: [
                l.jsx("span", { children: "⏳" }),
                l.jsx("span", { children: e.workbench.countdown.heading }),
              ],
            }),
            l.jsxs("div", {
              className: "form-toggle-wrap",
              onClick: C,
              children: [
                l.jsxs("div", {
                  children: [
                    l.jsx("div", {
                      style: { fontWeight: 600, fontSize: "0.95rem" },
                      children: e.workbench.countdown.enabled,
                    }),
                    l.jsx("div", {
                      className: "form-help",
                      children: e.workbench.countdown.enabledHelp,
                    }),
                  ],
                }),
                l.jsxs("div", {
                  className: "toggle-switch",
                  children: [
                    l.jsx("input", {
                      type: "checkbox",
                      "data-field": "countdownEnabled",
                      checked: c,
                      onChange: C,
                      onClick: (z) => z.stopPropagation(),
                    }),
                    l.jsx("span", { className: "toggle-slider" }),
                  ],
                }),
              ],
            }),
            c &&
              l.jsxs("div", {
                style: {
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: "18px",
                  marginTop: "20px",
                  paddingTop: "16px",
                  borderTop: "1px solid var(--border-dark)",
                },
                children: [
                  l.jsxs("div", {
                    className: "form-group",
                    children: [
                      l.jsx("label", {
                        className: "form-label",
                        children: e.workbench.countdown.iftarTime,
                      }),
                      l.jsx("input", {
                        type: "time",
                        className: "form-input font-mono",
                        "data-field": "iftarTime",
                        value: v,
                        onChange: (z) => x({ iftarTime: z.target.value }),
                      }),
                      l.jsx("span", {
                        className: "form-help",
                        children: e.workbench.countdown.iftarTimeHelp,
                      }),
                    ],
                  }),
                  l.jsxs("div", {
                    className: "form-group",
                    children: [
                      l.jsx("label", {
                        className: "form-label",
                        children: e.workbench.countdown.position,
                      }),
                      l.jsxs("select", {
                        className: "form-select",
                        "data-field": "countdownPosition",
                        value: m,
                        onChange: (z) => x({ position: z.target.value }),
                        children: [
                          l.jsx("option", {
                            value: "bottom-right",
                            children:
                              e.workbench.countdown.positions["bottom-right"],
                          }),
                          l.jsx("option", {
                            value: "bottom-left",
                            children:
                              e.workbench.countdown.positions["bottom-left"],
                          }),
                          l.jsx("option", {
                            value: "top-right",
                            children:
                              e.workbench.countdown.positions["top-right"],
                          }),
                          l.jsx("option", {
                            value: "top-left",
                            children:
                              e.workbench.countdown.positions["top-left"],
                          }),
                        ],
                      }),
                    ],
                  }),
                  l.jsxs("div", {
                    className: "form-group",
                    children: [
                      l.jsx("label", {
                        className: "form-label",
                        children: e.workbench.countdown.alertWindowMinutes,
                      }),
                      l.jsx("input", {
                        type: "number",
                        className: "form-input",
                        "data-field": "alertWindowMinutes",
                        min: 1,
                        max: 300,
                        value: f,
                        onChange: (z) => {
                          const j = parseInt(z.target.value, 10);
                          x({ alertWindowMinutes: isNaN(j) ? 30 : j });
                        },
                      }),
                      l.jsx("span", {
                        className: "form-help",
                        children: e.workbench.countdown.alertWindowHelp,
                      }),
                    ],
                  }),
                  l.jsxs("div", {
                    className: "form-group",
                    children: [
                      l.jsx("label", {
                        className: "form-label",
                        children: e.workbench.countdown.autoDismissAfterMinutes,
                      }),
                      l.jsx("input", {
                        type: "number",
                        className: "form-input",
                        "data-field": "autoDismissAfterMinutes",
                        min: 0,
                        max: 120,
                        value: S,
                        onChange: (z) => {
                          const j = parseInt(z.target.value, 10);
                          x({ autoDismissAfterMinutes: isNaN(j) ? 10 : j });
                        },
                      }),
                      l.jsx("span", {
                        className: "form-help",
                        children: e.workbench.countdown.autoDismissHelp,
                      }),
                    ],
                  }),
                  l.jsxs("div", {
                    className: "form-group",
                    children: [
                      l.jsx("label", {
                        className: "form-label",
                        children: e.workbench.countdown.celebrationDurationMs,
                      }),
                      l.jsx("input", {
                        type: "number",
                        className: "form-input",
                        "data-field": "celebrationDurationMs",
                        step: 1e3,
                        min: 1e3,
                        max: 12e4,
                        value: T,
                        onChange: (z) => {
                          const j = parseInt(z.target.value, 10);
                          x({ celebrationDurationMs: isNaN(j) ? 3e4 : j });
                        },
                      }),
                      l.jsx("span", {
                        className: "form-help",
                        children: e.workbench.countdown.celebrationDurationHelp,
                      }),
                    ],
                  }),
                  l.jsxs("div", {
                    className: "form-group",
                    children: [
                      l.jsx("label", {
                        className: "form-label",
                        children: e.workbench.countdown.soundUrl,
                      }),
                      l.jsx("input", {
                        type: "text",
                        className: "form-input",
                        "data-field": "soundUrl",
                        placeholder: e.workbench.countdown.soundUrlPlaceholder,
                        value: w,
                        onChange: (z) => x({ soundUrl: z.target.value || !1 }),
                      }),
                      l.jsx("span", {
                        className: "form-help",
                        children: e.workbench.countdown.soundUrlHelp,
                      }),
                    ],
                  }),
                  l.jsx("div", {
                    className: "form-group",
                    style: { gridColumn: "1 / -1" },
                    children: l.jsxs("div", {
                      style: {
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(220px, 1fr))",
                        gap: "12px",
                      },
                      children: [
                        l.jsxs("label", {
                          style: {
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            cursor: "pointer",
                          },
                          children: [
                            l.jsx("input", {
                              type: "checkbox",
                              checked: h,
                              onChange: (z) =>
                                x({ minimizable: z.target.checked }),
                            }),
                            l.jsx("span", {
                              children: e.workbench.countdown.minimizable,
                            }),
                          ],
                        }),
                        l.jsxs("label", {
                          style: {
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            cursor: "pointer",
                          },
                          children: [
                            l.jsx("input", {
                              type: "checkbox",
                              checked: g,
                              onChange: (z) =>
                                x({ initiallyMinimized: z.target.checked }),
                            }),
                            l.jsx("span", {
                              children:
                                e.workbench.countdown.initiallyMinimized,
                            }),
                          ],
                        }),
                        l.jsxs("label", {
                          style: {
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            cursor: "pointer",
                          },
                          children: [
                            l.jsx("input", {
                              type: "checkbox",
                              checked: d,
                              onChange: (z) => x({ sound: z.target.checked }),
                            }),
                            l.jsx("span", {
                              children: e.workbench.countdown.sound,
                            }),
                          ],
                        }),
                        l.jsxs("label", {
                          style: {
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            cursor: "pointer",
                          },
                          children: [
                            l.jsx("input", {
                              type: "checkbox",
                              checked: p,
                              onChange: (z) =>
                                x({ defaultMuted: z.target.checked }),
                            }),
                            l.jsx("span", {
                              children: e.workbench.countdown.defaultMuted,
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                ],
              }),
          ],
        }),
      ],
    });
  },
  B3 = [
    { id: "react", labelKey: "react", icon: "⚛️", badge: "Next.js / Vite" },
    { id: "cdn", labelKey: "cdn", icon: "🌐", badge: "No build step" },
    { id: "vanilla", labelKey: "vanilla", icon: "⚡", badge: "ESM / Bundler" },
    { id: "vue", labelKey: "vue", icon: "💚", badge: "Vue 3 / Nuxt" },
    { id: "svelte", labelKey: "svelte", icon: "🧡", badge: "SvelteKit" },
    {
      id: "angular",
      labelKey: "angular",
      icon: "🔴",
      badge: "v14+ Standalone",
    },
    { id: "ai", labelKey: "ai", icon: "🤖", badge: "Cursor / Copilot" },
  ],
  F3 = ({ t: e, locale: t, config: n, themeName: r, onResetDefaults: o }) => {
    var x, C, z;
    const [a, i] = Y.useState("react"),
      [s, c] = Y.useState(!1),
      [u, v] = Y.useState(!1),
      [m, f] = Y.useState(!1),
      h = n.variant || "lanterns",
      g = {};
    (n.variant && n.variant !== "lanterns" && (g.variant = n.variant),
      r &&
        r !== "classic" &&
        (g.theme = typeof n.theme == "object" ? n.theme : r),
      n.position &&
        n.position !== "top" &&
        n.position !== "both" &&
        (g.position = n.position),
      n.opacity !== void 0 && n.opacity !== 0.85 && (g.opacity = n.opacity),
      n.layer && n.layer !== "foreground" && (g.layer = n.layer),
      n.zIndex !== void 0 && n.zIndex !== 9999 && (g.zIndex = n.zIndex),
      x3("shadows", h) &&
        n.shadows &&
        n.shadows !== "soft" &&
        (g.shadows = n.shadows),
      n.autoTrigger !== void 0 && !n.autoTrigger && (g.autoTrigger = !1),
      n.previewMode !== void 0 && !n.previewMode && (g.previewMode = !1),
      n.debug && (g.debug = !0),
      n.locale && n.locale !== "auto" && (g.locale = n.locale),
      n.confetti === "off" && (g.confetti = "off"),
      n.attachTo &&
        n.attachTo !== ".celestial-nav" &&
        (g.attachTo = n.attachTo),
      n.attachEdge &&
        n.attachEdge !== "bottom" &&
        (g.attachEdge = n.attachEdge),
      n.mobileSideBehavior &&
        n.mobileSideBehavior !== "hide" &&
        (g.mobileSideBehavior = n.mobileSideBehavior),
      n.clearance && n.clearance !== "edges" && (g.clearance = n.clearance),
      h === "lanterns" &&
        (n.lanternStyle && (g.lanternStyle = n.lanternStyle),
        n.lanternCount && (g.lanternCount = n.lanternCount),
        n.lanternZIndex !== void 0 &&
          n.lanternZIndex !== 2 &&
          (g.lanternZIndex = n.lanternZIndex),
        n.ropeStyle &&
          n.ropeStyle !== "straight" &&
          ((g.ropeStyle = n.ropeStyle),
          n.ropeSag !== void 0 && n.ropeSag !== 20 && (g.ropeSag = n.ropeSag)),
        n.ceilingColor &&
          n.ceilingColor !== "#c9a84c" &&
          (g.ceilingColor = n.ceilingColor),
        n.ropeColor &&
          n.ropeColor !== "#c9a84c" &&
          (g.ropeColor = n.ropeColor)),
      h === "banner" &&
        (n.bannerTextAr &&
          n.bannerTextAr !== "رَمَضَان كَرِيم" &&
          (g.bannerTextAr = n.bannerTextAr),
        n.bannerTextEn &&
          n.bannerTextEn !== "Ramadan Mubarak" &&
          (g.bannerTextEn = n.bannerTextEn),
        n.bannerBg &&
          n.bannerBg !== "rgba(15,15,20,0.92)" &&
          (g.bannerBg = n.bannerBg),
        n.bannerTextColor &&
          n.bannerTextColor !== "#f1f5f9" &&
          (g.bannerTextColor = n.bannerTextColor),
        n.bannerIconColor &&
          n.bannerIconColor !== "#c9a84c" &&
          (g.bannerIconColor = n.bannerIconColor)),
      h !== "lanterns" &&
        h !== "banner" &&
        (n.density && n.density !== "normal" && (g.density = n.density),
        n.intensity !== void 0 &&
          n.intensity !== "normal" &&
          n.intensity !== 5 &&
          (g.intensity = n.intensity),
        n.glowColor &&
          n.glowColor !== "rgba(201,168,76,0.55)" &&
          (g.glowColor = n.glowColor)),
      n.region && n.region !== "standard" && (g.region = n.region),
      n.hijriAdjustment && (g.hijriAdjustment = n.hijriAdjustment),
      n.date &&
        (g.date =
          n.date instanceof Date ? n.date.toISOString().slice(0, 10) : n.date),
      n.occasions && n.occasions.length < 3 && (g.occasions = n.occasions),
      n.eidVariant && n.eidVariant !== "eid" && (g.eidVariant = n.eidVariant),
      n.liveTransition === !1 && (g.liveTransition = !1),
      n.countdown &&
        ((g.countdown = !0),
        n.iftarTime && (g.iftarTime = n.iftarTime),
        n.countdownPosition &&
          n.countdownPosition !== "bottom-right" &&
          (g.countdownPosition = n.countdownPosition),
        n.alertWindowMinutes !== void 0 &&
          n.alertWindowMinutes !== 60 &&
          (g.alertWindowMinutes = n.alertWindowMinutes),
        n.minimizable === !1 && (g.minimizable = !1),
        n.initiallyMinimized && (g.initiallyMinimized = !0),
        n.autoDismissAfterMinutes !== void 0 &&
          n.autoDismissAfterMinutes !== 120 &&
          (g.autoDismissAfterMinutes = n.autoDismissAfterMinutes),
        n.celebrationDurationMs !== void 0 &&
          n.celebrationDurationMs !== 15e3 &&
          (g.celebrationDurationMs = n.celebrationDurationMs),
        n.sound === !1 && (g.sound = !1),
        n.defaultMuted && (g.defaultMuted = !0),
        n.soundUrl && (g.soundUrl = n.soundUrl)));
    const S = JSON.stringify(g, null, 2),
      T = () => {
        switch (a) {
          case "react": {
            const j = Object.entries(g);
            return `// 1. Install via npm
// npm install ramadan-overlay

import React from 'react';
import { RamadanOverlay } from 'ramadan-overlay/react';

export default function App() {
  return (
    <div>
      {/* Your app content */}
      <RamadanOverlay${
        j.length === 0
          ? ""
          : `
        ` +
            j.map(([A, M]) =>
              typeof M == "string"
                ? `${A}="${M}"`
                : typeof M == "boolean"
                  ? M
                    ? A
                    : `${A}={false}`
                  : `${A}={${JSON.stringify(M)}}`
            ).join(`
        `) +
            `
      `
      }/>
    </div>
  );
}`;
          }
          case "cdn":
            return `<!-- 1. Include ramadan-overlay via CDN (no build step required) -->
<script src="https://cdn.jsdelivr.net/npm/ramadan-overlay/dist/index.global.js"><\/script>

<script>
  // 2. Initialize overlay with your configured setup
  const overlay = RamadanOverlay.init(${S});
<\/script>`;
          case "vanilla":
            return `// 1. Install via npm
// npm install ramadan-overlay

import { init } from 'ramadan-overlay';

// 2. Initialize overlay with your configured setup
const overlay = init(${S});

// 3. Optional lifecycle cleanup on page change / SPA transition
// overlay.destroy();`;
          case "vue":
            return `<!-- 1. Install: npm install ramadan-overlay -->
<script setup>
import { RamadanOverlay } from 'ramadan-overlay/vue';

const config = ${S};
<\/script>

<template>
  <main>
    <!-- Your app content -->
    <RamadanOverlay v-bind="config" />
  </main>
</template>`;
          case "svelte":
            return `<!-- 1. Install: npm install ramadan-overlay -->
<script>
  import { RamadanOverlay } from 'ramadan-overlay/svelte';

  const config = ${S};
<\/script>

<main>
  <!-- Your app content -->
  <RamadanOverlay {...config} />
</main>`;
          case "angular":
            return `// 1. Install: npm install ramadan-overlay
import { Component } from '@angular/core';
import { RamadanOverlayComponent } from 'ramadan-overlay/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RamadanOverlayComponent],
  template: \`
    <div>
      <ramadan-overlay [config]="config"></ramadan-overlay>
    </div>
  \`
})
export class AppComponent {
  config = ${S};
}`;
          case "ai":
            return t === "ar"
              ? `أريد إضافة زينة رمضانية واحتفالية لمشروعي باستخدام مكتبة ramadan-overlay.
يرجى تثبيت الحزمة عبر npm install ramadan-overlay وتضمين الزينة بالإعدادات التالية:

- نمط الزخرفة (Overlay Variant): ${g.variant || "lanterns"}
- السمة اللونية (Theme): ${typeof g.theme == "string" ? g.theme : "custom"}
- الموضع (Position): ${g.position || "top"}
- الشفافية (Opacity): ${g.opacity ?? 0.85}
- العداد التنازلي لوقت الإفطار: ${g.countdown ? "مفعّل" : "معطل"}
- الكشف التلقائي بالتقويم الهجري: ${g.autoTrigger !== !1 ? "مفعّل" : "معطل"}

كود التهيئة المقترح:
${S}

يرجى مراعاة تنظيف دورة الحياة عند تدمير المكون والتأكد من توافق أنماط العرض.`
              : `I want to add Ramadan and Eid festive decorations to my web application using the ramadan-overlay library.
Please install the package via npm install ramadan-overlay and configure the overlay with the following parameters:

- Overlay Variant: ${g.variant || "lanterns"}
- Theme: ${typeof g.theme == "string" ? g.theme : "custom"}
- Position: ${g.position || "top"}
- Opacity: ${g.opacity ?? 0.85}
- Iftar Countdown Widget: ${g.countdown ? "Enabled" : "Disabled"}
- Auto Hijri Trigger: ${g.autoTrigger !== !1 ? "Enabled" : "Disabled"}

Target Configuration:
${S}

Please ensure clean lifecycle cleanup on component unmount and smooth z-index integration.`;
          default:
            return "";
        }
      },
      d = () => {
        navigator.clipboard.writeText(T()).then(() => {
          (c(!0), setTimeout(() => c(!1), 2200));
        });
      },
      p = () => {
        navigator.clipboard
          .writeText("npm install ramadan-overlay")
          .then(() => {
            (v(!0), setTimeout(() => v(!1), 2200));
          });
      },
      w = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
          (f(!0), setTimeout(() => f(!1), 2200));
        });
      };
    return l.jsx("div", {
      className: "ro-tab-content-pane",
      children: l.jsxs("div", {
        className: "panel-card",
        children: [
          l.jsxs("h3", {
            className: "panel-heading",
            children: [
              l.jsx("span", { children: "🚀" }),
              l.jsx("span", { children: e.workbench.code.chooseSetup }),
            ],
          }),
          l.jsx("p", {
            className: "form-help",
            style: { marginBottom: "16px", fontSize: "0.9rem" },
            children: e.workbench.code.chooseSetupHelp,
          }),
          l.jsx("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "10px",
              marginBottom: "18px",
            },
            children: B3.map((j) => {
              const k = a === j.id;
              return l.jsxs(
                "button",
                {
                  type: "button",
                  className: `setup-target-card ${k ? "active" : ""}`,
                  onClick: () => i(j.id),
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "4px",
                    padding: "10px 12px",
                    borderRadius: "var(--radius-md)",
                    border: k
                      ? "1px solid var(--border-gold-glow)"
                      : "1px solid var(--border-mid)",
                    background: k
                      ? "rgba(201, 168, 76, 0.12)"
                      : "rgba(255, 255, 255, 0.02)",
                    color: k ? "var(--gold-200)" : "var(--text-primary)",
                    cursor: "pointer",
                    textAlign: "start",
                    transition: "all var(--transition-fast)",
                  },
                  children: [
                    l.jsxs("div", {
                      style: {
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontWeight: 600,
                        fontSize: "0.92rem",
                      },
                      children: [
                        l.jsx("span", { children: j.icon }),
                        l.jsx("span", {
                          children: e.workbench.code.tabs[j.labelKey],
                        }),
                      ],
                    }),
                    l.jsx("span", {
                      style: {
                        fontSize: "0.74rem",
                        color: "var(--text-muted)",
                        fontWeight: 400,
                      },
                      children: j.badge,
                    }),
                  ],
                },
                j.id
              );
            }),
          }),
          a !== "cdn" &&
            a !== "ai" &&
            l.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 14px",
                marginBottom: "16px",
                background: "rgba(10, 14, 26, 0.7)",
                border: "1px solid var(--border-dark)",
                borderRadius: "var(--radius-md)",
              },
              children: [
                l.jsxs("div", {
                  style: { display: "flex", alignItems: "center", gap: "10px" },
                  children: [
                    l.jsxs("span", {
                      style: {
                        fontSize: "0.8rem",
                        color: "var(--text-secondary)",
                      },
                      children: [e.workbench.code.installCmd, ":"],
                    }),
                    l.jsx("code", {
                      className: "font-mono",
                      style: { fontSize: "0.85rem", color: "var(--gold-300)" },
                      children: "npm install ramadan-overlay",
                    }),
                  ],
                }),
                l.jsx("button", {
                  type: "button",
                  className: "btn-outline btn-sm",
                  onClick: p,
                  children: u ? e.workbench.code.installCmdCopied : "Copy",
                }),
              ],
            }),
          l.jsxs("div", {
            children: [
              l.jsxs("div", {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                },
                children: [
                  l.jsx("label", {
                    className: "form-label",
                    style: { margin: 0 },
                    children:
                      a === "ai"
                        ? e.workbench.code.promptTitle
                        : `${e.workbench.code.tabs[a]} ${e.workbench.code.heading}`,
                  }),
                  l.jsx("button", {
                    type: "button",
                    className: `btn-primary btn-sm ${s ? "copied" : ""}`,
                    onClick: d,
                    style: {
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    },
                    children: l.jsx("span", {
                      children: s
                        ? a === "ai"
                          ? e.workbench.code.promptSeamCopiedBtn
                          : e.workbench.code.copiedBtn
                        : a === "ai"
                          ? e.workbench.code.copyPromptSeamBtn
                          : e.workbench.code.copyBtn,
                    }),
                  }),
                ],
              }),
              l.jsx("pre", {
                className: "code-pre",
                style: {
                  maxHeight: "320px",
                  padding: "14px 16px",
                  background: "rgba(10, 14, 26, 0.88)",
                  borderRadius: "var(--radius-md)",
                  fontSize: "0.84rem",
                  lineHeight: 1.5,
                  border: "1px solid var(--border-dark)",
                  overflowX: "auto",
                },
                children: l.jsx("code", { children: T() }),
              }),
            ],
          }),
          l.jsxs("div", {
            style: {
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              marginTop: "20px",
              paddingTop: "16px",
              borderTop: "1px solid var(--border-dark)",
            },
            children: [
              l.jsxs("button", {
                type: "button",
                className: "btn-outline",
                onClick: w,
                style: {
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                },
                children: [
                  l.jsx("span", { children: "🔗" }),
                  l.jsx("span", {
                    children: m
                      ? ((x = e.workbench.exportStudio) == null
                          ? void 0
                          : x.linkCopied) || "Link Copied!"
                      : ((C = e.workbench.exportStudio) == null
                          ? void 0
                          : C.copyLink) || "Copy Shareable Studio Link",
                  }),
                ],
              }),
              o &&
                l.jsxs("button", {
                  type: "button",
                  className: "btn-outline",
                  onClick: o,
                  style: {
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  },
                  children: [
                    l.jsx("span", { children: "🔄" }),
                    l.jsx("span", {
                      children:
                        ((z = e.workbench.exportStudio) == null
                          ? void 0
                          : z.resetDefaults) || e.workbench.stepper.reset,
                    }),
                  ],
                }),
            ],
          }),
        ],
      }),
    });
  },
  $3 = ({
    t: e,
    locale: t,
    config: n,
    themeName: r,
    customTheme: o,
    onSelectVariant: a,
    onChangePosition: i,
    onChangeTheme: s,
    onUpdateConfig: c,
    onUpdateCustomColor: u,
    onResetCustomColors: v,
    onToggleAutoTrigger: m,
    onToggleCountdown: f,
  }) => {
    const [h, g] = Y.useState("variantTheme"),
      S = n.variant || "lanterns",
      T = n.position || "top",
      d = () => {
        const x = pt.indexOf(h);
        x > 0 && g(pt[x - 1]);
      },
      p = () => {
        const x = pt.indexOf(h);
        x < pt.length - 1 && g(pt[x + 1]);
      },
      w = () => {
        (v(),
          s("classic"),
          i("top"),
          a("lanterns"),
          c({
            variant: "lanterns",
            position: "top",
            opacity: 0.85,
            layer: "foreground",
            zIndex: 9999,
            shadows: "soft",
            autoTrigger: !1,
            previewMode: !0,
            countdown: !1,
            confetti: "on",
            attachTo: ".celestial-nav",
            attachEdge: "bottom",
            lanternStyle: 0,
            lanternCount: void 0,
            lanternZIndex: 2,
            ropeStyle: "straight",
            ropeSag: 20,
            ceilingColor: "#c9a84c",
            ropeColor: "#c9a84c",
            density: "normal",
            intensity: "normal",
            region: "standard",
            hijriAdjustment: 0,
            date: void 0,
            occasions: ["ramadan", "eid-fitr", "eid-adha"],
            eidVariant: "eid",
            liveTransition: !0,
            bannerTextAr: "رَمَضَان كَرِيم",
            bannerTextEn: "Ramadan Mubarak",
            bannerBg: "rgba(15,15,20,0.92)",
            bannerTextColor: "#f1f5f9",
            bannerIconColor: "#c9a84c",
            clearance: "edges",
          }));
      };
    return l.jsxs("section", {
      id: "workbench",
      className: "workbench-section",
      children: [
        l.jsxs("div", {
          className: "section-header",
          children: [
            l.jsx("h2", {
              className: "section-title font-display",
              children: e.workbench.title,
            }),
            l.jsx("p", {
              className: "section-subtitle",
              children: e.workbench.subtitle,
            }),
          ],
        }),
        l.jsx("div", {
          className: "workbench-grid",
          children: l.jsxs("div", {
            className: "controls-column ro-controls-column-studio",
            children: [
              l.jsx(T3, {
                t: e,
                locale: t,
                activeTab: h,
                onSelectTab: g,
                onPrevTab: d,
                onNextTab: p,
                onResetDefaults: w,
              }),
              l.jsxs("div", {
                className: "ro-tab-viewport",
                children: [
                  h === "variantTheme" &&
                    l.jsx(A3, {
                      t: e,
                      activeVariant: S,
                      onSelectVariant: a,
                      themeName: r,
                      onChangeTheme: s,
                      customTheme: o,
                      onUpdateCustomColor: u,
                      onResetCustomColors: v,
                      config: n,
                      onUpdateConfig: c,
                    }),
                  h === "layout" &&
                    l.jsx(I3, {
                      t: e,
                      variant: S,
                      position: T,
                      onChangePosition: i,
                      config: n,
                      onUpdateConfig: c,
                    }),
                  h === "styling" &&
                    l.jsx(D3, { t: e, config: n, onUpdateConfig: c }),
                  h === "calendar" &&
                    l.jsx(_3, { t: e, config: n, onUpdateConfig: c }),
                  h === "countdownBanner" &&
                    l.jsx(O3, { t: e, config: n, onUpdateConfig: c }),
                  h === "codeExport" &&
                    l.jsx(F3, {
                      t: e,
                      locale: t,
                      config: n,
                      themeName: r,
                      onResetDefaults: w,
                    }),
                  l.jsx(z3, { t: e, activeTab: h, onPrevTab: d, onNextTab: p }),
                ],
              }),
            ],
          }),
        }),
      ],
    });
  },
  H3 = ({ t: e, overlayInstance: t }) => {
    const [n, r] = Y.useState(!0),
      o = t == null ? void 0 : t.countdown,
      a = () => (o == null ? void 0 : o.show()),
      i = () => (o == null ? void 0 : o.dismiss()),
      s = () => {
        var m;
        return (m = o == null ? void 0 : o.minimize) == null
          ? void 0
          : m.call(o);
      },
      c = () => {
        var m;
        return (m = o == null ? void 0 : o.expand) == null ? void 0 : m.call(o);
      },
      u = () => {
        if (o) {
          const m = o.toggleMute();
          r(m);
        }
      },
      v = () => {
        var m;
        (m = o == null ? void 0 : o.playAlert) == null || m.call(o);
      };
    return l.jsxs("div", {
      className: "panel-card",
      style: { marginBottom: 0 },
      children: [
        l.jsxs("h4", {
          className: "panel-heading",
          style: { fontSize: "1.1rem" },
          children: [
            l.jsx("span", { children: "⏱️" }),
            l.jsx("span", { children: e.lab.countdownTitle }),
          ],
        }),
        l.jsx("p", {
          style: {
            fontSize: "0.85rem",
            color: "var(--text-secondary)",
            marginBottom: "16px",
          },
          children: e.workbench.universal.countdownHelp,
        }),
        l.jsxs("div", {
          className: "lab-btn-grid",
          children: [
            l.jsxs("button", {
              className: "lab-btn",
              onClick: a,
              children: [
                l.jsx("span", { children: "👁️" }),
                l.jsx("span", { children: e.lab.btnShow }),
              ],
            }),
            l.jsxs("button", {
              className: "lab-btn",
              onClick: i,
              children: [
                l.jsx("span", { children: "✕" }),
                l.jsx("span", { children: e.lab.btnDismiss }),
              ],
            }),
            l.jsxs("button", {
              className: "lab-btn",
              onClick: s,
              children: [
                l.jsx("span", { children: "🗕" }),
                l.jsx("span", { children: e.lab.btnMinimize }),
              ],
            }),
            l.jsxs("button", {
              className: "lab-btn",
              onClick: c,
              children: [
                l.jsx("span", { children: "🗖" }),
                l.jsx("span", { children: e.lab.btnExpand }),
              ],
            }),
            l.jsxs("button", {
              className: "lab-btn",
              onClick: u,
              children: [
                l.jsx("span", { children: n ? "🔇" : "🔊" }),
                l.jsx("span", {
                  children: n ? e.lab.btnUnmute : e.lab.btnMute,
                }),
              ],
            }),
            l.jsxs("button", {
              className: "lab-btn",
              onClick: v,
              children: [
                l.jsx("span", { children: "🔔" }),
                l.jsx("span", { children: e.lab.btnPlayChime }),
              ],
            }),
          ],
        }),
      ],
    });
  },
  V3 = ({ t: e }) => {
    const [t, n] = Y.useState([
        {
          id: "init",
          time: new Date().toISOString().slice(11, 19),
          msg: "Diagnostic logging engine initialized. Ready for resilience tests.",
          color: "#7ee787",
        },
      ]),
      [r, o] = Y.useState(!1),
      a = Y.useRef(null),
      i = (h, g = "#7ee787") => {
        const S = new Date().toISOString().slice(11, 19),
          T = `${Date.now()}-${Math.random()}`;
        n((d) => [...d, { id: T, time: S, msg: h, color: g }]);
      };
    (Y.useEffect(() => {
      a.current && (a.current.scrollTop = a.current.scrollHeight);
    }, [t]),
      Y.useEffect(() => {
        const h = console.warn,
          g = console.error;
        return (
          (console.warn = (...S) => {
            h.apply(console, S);
            const T = S.map((d) =>
              typeof d == "object" ? JSON.stringify(d) : String(d)
            ).join(" ");
            T.includes("[ramadan-overlay]") && i(T, "#e3b341");
          }),
          (console.error = (...S) => {
            g.apply(console, S);
            const T = S.map((d) =>
              typeof d == "object" ? JSON.stringify(d) : String(d)
            ).join(" ");
            T.includes("[ramadan-overlay]") && i(T, "#f85149");
          }),
          () => {
            ((console.warn = h), (console.error = g));
          }
        );
      }, []));
    const s = () => {
        i("Testing defensive config clamping...", "#e3b341");
        try {
          const h = uo({
            variant: "lanterns",
            opacity: 99,
            zIndex: -9999999999,
            ropeSag: 999,
            hijriAdjustment: 50,
            debug: !0,
            previewMode: !0,
          });
          (i(
            "✅ Result: Extreme configuration values safely clamped within valid boundaries without throwing!",
            "#7ee787"
          ),
            h.destroy());
        } catch (h) {
          i(`❌ Clamping failed: ${h}`, "#f85149");
        }
      },
      c = () => {
        i("Testing invalid Date input resilience...", "#e3b341");
        try {
          const h = Cn(new Date(NaN), 0, !0),
            g = Cn(null, 0, !0);
          (i(
            `✅ Result: getRamadanState(NaN) -> occasion: '${h.occasion}', isRamadan: ${h.isRamadan}`,
            "#7ee787"
          ),
            i(
              `✅ Result: getRamadanState(null) -> occasion: '${g.occasion}', isRamadan: ${g.isRamadan}`,
              "#7ee787"
            ));
        } catch (h) {
          i(`❌ Date test failed: ${h}`, "#f85149");
        }
      },
      u = () => {
        i(
          "Testing Error Containment Boundary & Atomic DOM Rollback...",
          "#e3b341"
        );
        const h = document.createElement;
        let g = 0;
        document.createElement = function (S) {
          if (S.toLowerCase() === "style" && ++g === 1)
            throw new Error(
              "Simulated catastrophic CSS stylesheet mounting crash"
            );
          return h.call(document, S);
        };
        try {
          const S = uo({
            previewMode: !0,
            debug: !0,
            onError: (T) => {
              const d =
                T && typeof T == "object" && "message" in T
                  ? T.message
                  : String(T);
              i(`onError hook captured crash: ${d}`, "#f85149");
            },
          });
          (i(
            "✅ Result: Host application did NOT crash! Safe No-Op instance returned.",
            "#7ee787"
          ),
            S.destroy());
        } catch (S) {
          i(`❌ Crash escaped boundary: ${S}`, "#f85149");
        } finally {
          document.createElement = h;
        }
      },
      v = () => {
        i("Testing double-contained onError isolation...", "#e3b341");
        try {
          (uo({
            previewMode: !0,
            debug: !0,
            onError: () => {
              throw new Error(
                "Faulty external telemetry service threw an uncaught error"
              );
            },
          }),
            i(
              "✅ Result: Faulty consumer onError callback threw, but double-containment seam protected host from crash!",
              "#7ee787"
            ));
        } catch (h) {
          i(`❌ onError escaped boundary: ${h}`, "#f85149");
        }
      },
      m = () => {
        const h = !r;
        (o(h),
          i(
            `Debug mode toggled: ${h ? "ON" : "OFF"}`,
            h ? "#7ee787" : "#8b8f98"
          ));
      },
      f = () => n([]);
    return l.jsxs("div", {
      className: "panel-card",
      style: { marginBottom: 0 },
      children: [
        l.jsxs("div", {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px",
          },
          children: [
            l.jsxs("h4", {
              className: "panel-heading",
              style: { fontSize: "1.1rem", margin: 0 },
              children: [
                l.jsx("span", { children: "🛡️" }),
                l.jsx("span", { children: e.lab.resilienceTitle }),
              ],
            }),
            l.jsx("button", {
              className: "nav-btn-pill",
              style: { fontSize: "0.75rem", padding: "4px 10px" },
              onClick: f,
              children: e.lab.clearTerminal,
            }),
          ],
        }),
        l.jsx("p", {
          style: {
            fontSize: "0.85rem",
            color: "var(--text-secondary)",
            marginBottom: "16px",
          },
          children: e.lab.resilienceDesc,
        }),
        l.jsxs("div", {
          className: "lab-btn-grid",
          children: [
            l.jsxs("button", {
              className: "lab-btn",
              onClick: s,
              children: [
                l.jsx("span", { children: "⚙️" }),
                l.jsx("span", { children: e.lab.btnClamping }),
              ],
            }),
            l.jsxs("button", {
              className: "lab-btn",
              onClick: c,
              children: [
                l.jsx("span", { children: "📅" }),
                l.jsx("span", { children: e.lab.btnInvalidDate }),
              ],
            }),
            l.jsxs("button", {
              className: "lab-btn",
              onClick: u,
              children: [
                l.jsx("span", { children: "💥" }),
                l.jsx("span", { children: e.lab.btnCrash }),
              ],
            }),
            l.jsxs("button", {
              className: "lab-btn",
              onClick: v,
              children: [
                l.jsx("span", { children: "📡" }),
                l.jsx("span", { children: e.lab.btnOnError }),
              ],
            }),
            l.jsxs("button", {
              className: "lab-btn",
              onClick: m,
              children: [
                l.jsx("span", { children: "🔍" }),
                l.jsx("span", { children: r ? e.lab.debugOn : e.lab.debugOff }),
              ],
            }),
          ],
        }),
        l.jsx("div", {
          className: "lab-terminal",
          ref: a,
          children: t.map((h) =>
            l.jsxs(
              "div",
              {
                className: "lab-terminal-line",
                style: { color: h.color },
                children: ["[", h.time, "] ", h.msg],
              },
              h.id
            )
          ),
        }),
      ],
    });
  },
  W3 = ({ t: e, overlayInstance: t }) => {
    const [n, r] = Y.useState(!1);
    return l.jsxs("section", {
      id: "lab",
      className: "lab-section",
      children: [
        l.jsxs("div", {
          className: "lab-drawer-header",
          onClick: () => r(!n),
          role: "button",
          tabIndex: 0,
          onKeyDown: (o) => {
            (o.key === "Enter" || o.key === " ") && r(!n);
          },
          children: [
            l.jsxs("div", {
              className: "lab-drawer-title font-display",
              children: [
                l.jsx("span", { children: "⚡" }),
                l.jsx("span", { children: e.lab.title }),
                l.jsx("span", {
                  className: "lab-drawer-badge",
                  children: e.lab.badge,
                }),
              ],
            }),
            l.jsx("div", {
              style: { fontSize: "1.4rem", color: "var(--gold-400)" },
              children: n ? "▲" : "▼",
            }),
          ],
        }),
        n &&
          l.jsxs("div", {
            className: "lab-content",
            children: [
              l.jsx(H3, { t: e, overlayInstance: t }),
              l.jsx(V3, { t: e }),
            ],
          }),
      ],
    });
  },
  U3 = ({ t: e }) =>
    l.jsxs("footer", {
      className: "celestial-footer",
      children: [
        l.jsxs("div", {
          className: "footer-links",
          children: [
            l.jsx("a", {
              href: "https://github.com/3mr-5aled/ramadan-overlay",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "footer-link",
              children: "GitHub",
            }),
            l.jsx("span", { children: "•" }),
            l.jsx("a", {
              href: "https://www.npmjs.com/package/ramadan-overlay",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "footer-link",
              children: "NPM Package",
            }),
            l.jsx("span", { children: "•" }),
            l.jsx("a", {
              href: "https://github.com/3mr-5aled/ramadan-overlay/blob/main/LICENSE",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "footer-link",
              children: e.footer.license,
            }),
          ],
        }),
        l.jsxs("p", {
          style: { marginTop: "8px" },
          children: ["🌙 ", e.footer.copy, " ", e.footer.builtWith],
        }),
      ],
    }),
  Gs = {
    colors: ["#c9a84c", "#e5c158", "#9a7b2c", "#f3e5ab", "#1b3b2b", "#0f172a"],
    glowColor: "rgba(201,168,76,0.55)",
    ceilingColor: "#c9a84c",
    ropeColor: "#c9a84c",
    bannerBg: "rgba(15,15,20,0.92)",
    bannerTextColor: "#f1f5f9",
    bannerIconColor: "#c9a84c",
  },
  G3 = () => {
    const [e, t] = Y.useState(v3),
      n = e === "ar" ? m3 : h3,
      [r, o] = Y.useState(!0),
      [a, i] = Y.useState("classic"),
      [s, c] = Y.useState("ramadan"),
      [u, v] = Y.useState(!1),
      [m, f] = Y.useState(null),
      [h, g] = Y.useState(Gs),
      [S, T] = Y.useState({
        variant: "lanterns",
        position: "top",
        opacity: 0.85,
        layer: "foreground",
        shadows: "soft",
        autoTrigger: !1,
        previewMode: !0,
        countdown: !1,
        confetti: "on",
        attachTo: ".celestial-nav",
        attachEdge: "bottom",
        lanternStyle: 0,
        ropeStyle: "straight",
        ropeSag: 20,
        ceilingColor: "#c9a84c",
        ropeColor: "#c9a84c",
        bannerTextAr: "رَمَضَان كَرِيم",
        bannerTextEn: "Ramadan Mubarak",
        bannerBg: "rgba(15,15,20,0.92)",
        bannerTextColor: "#f1f5f9",
        bannerIconColor: "#c9a84c",
        clearance: "edges",
        intensity: "normal",
        density: "normal",
        glowColor: "rgba(201,168,76,0.55)",
      });
    (Y.useEffect(() => {
      (fc(e), g3(e));
    }, [e]),
      Y.useEffect(() => {
        try {
          const L = window.location.hash.replace(/^#/, "");
          if (L) {
            const B = new URLSearchParams(L),
              U = B.get("variant"),
              G = B.get("theme"),
              le = B.get("position"),
              E = B.get("occasion");
            (U &&
              T((H) => Qn({ ...H, variant: U, position: le || H.position }, U)),
              G && i(G),
              E && c(E));
          }
        } catch {}
      }, []),
      Y.useEffect(() => {
        try {
          const L = new URLSearchParams();
          (S.variant && L.set("variant", S.variant),
            a && L.set("theme", a),
            S.position && L.set("position", S.position),
            L.set("occasion", s),
            L.set("lang", e),
            window.history.replaceState(null, "", `#${L.toString()}`));
        } catch {}
      }, [S.variant, S.position, a, s, e]));
    const d = r
        ? { ...S, theme: a === "custom" ? h : a, previewMode: !0 }
        : { autoTrigger: !1, previewMode: !1 },
      p = () => {
        t((L) => (L === "ar" ? "en" : "ar"));
      },
      w = () => {
        o((L) => !L);
      },
      x = () => {
        var L;
        if ((L = m == null ? void 0 : m.countdown) != null && L.playAlert)
          m.countdown.playAlert();
        else
          try {
            const B = window.AudioContext || window.webkitAudioContext;
            if (B) {
              const U = new B(),
                G = U.createOscillator(),
                le = U.createGain();
              ((G.type = "sine"),
                G.frequency.setValueAtTime(587.33, U.currentTime),
                G.frequency.exponentialRampToValueAtTime(
                  880,
                  U.currentTime + 0.8
                ),
                le.gain.setValueAtTime(0.3, U.currentTime),
                le.gain.exponentialRampToValueAtTime(
                  0.001,
                  U.currentTime + 1.2
                ),
                G.connect(le),
                le.connect(U.destination),
                G.start(),
                G.stop(U.currentTime + 1.2));
            }
          } catch {}
      },
      C = () => {
        m != null && m.fireConfetti && m.fireConfetti(s);
      },
      z = (L) => {
        T((B) => Qn(B, L));
      },
      j = (L) => {
        T((B) => ({ ...B, position: L }));
      },
      k = (L) => {
        i(L);
      },
      A = (L) => {
        T((B) => ({ ...B, ...L }));
      },
      M = (L, B) => {
        g((U) => {
          const G = U.colors
            ? [...U.colors]
            : [
                "#c9a84c",
                "#e5c158",
                "#9a7b2c",
                "#f3e5ab",
                "#1b3b2b",
                "#0f172a",
              ];
          return L === "primaryColor"
            ? ((G[0] = B), { ...U, colors: G })
            : L === "accentColor"
              ? ((G[3] = B), { ...U, colors: G })
              : { ...U, [L]: B };
        });
      },
      P = () => {
        g(Gs);
      },
      I = (L) => {
        (c(L),
          T(
            L === "eid-fitr"
              ? (B) =>
                  Qn(
                    {
                      ...B,
                      bannerTextAr: "عِيد فِطْر مُبَارَك",
                      bannerTextEn: "Eid Al-Fitr Mubarak",
                    },
                    "eid-fitr"
                  )
              : L === "eid-adha"
                ? (B) =>
                    Qn(
                      {
                        ...B,
                        bannerTextAr: "عِيد أَضْحَى مُبَارَك",
                        bannerTextEn: "Eid Al-Adha Mubarak",
                      },
                      "eid-adha"
                    )
                : (B) =>
                    Qn(
                      {
                        ...B,
                        bannerTextAr: "رَمَضَان كَرِيم",
                        bannerTextEn: "Ramadan Mubarak",
                      },
                      "lanterns"
                    )
          ));
      };
    return l.jsxs("div", {
      className: `app-container ${u ? "drawer-open" : ""}`,
      children: [
        l.jsx(k3, {
          t: n,
          locale: e,
          onToggleLocale: p,
          occasion: s,
          onChangeOccasion: I,
          overlayOn: r,
          onToggleOverlay: w,
          onPlayChime: x,
          onFireConfetti: C,
          onToggleDrawer: () => v((L) => !L),
        }),
        r && l.jsx(f3, { config: d, onInstance: f }),
        l.jsxs("main", {
          children: [
            l.jsx(C3, {
              t: n,
              locale: e,
              occasion: s,
              onFireConfetti: C,
              onScrollToWorkbench: () => {
                var L;
                (L = document.getElementById("workbench")) == null ||
                  L.scrollIntoView({ behavior: "smooth" });
              },
              onScrollToLab: () => {
                var L;
                (L = document.getElementById("lab")) == null ||
                  L.scrollIntoView({ behavior: "smooth" });
              },
            }),
            l.jsx($3, {
              t: n,
              locale: e,
              config: S,
              themeName: a,
              customTheme: h,
              onSelectVariant: z,
              onChangePosition: j,
              onChangeTheme: k,
              onUpdateConfig: A,
              onUpdateCustomColor: M,
              onResetCustomColors: P,
              onToggleAutoTrigger: () =>
                T((L) => ({ ...L, autoTrigger: !L.autoTrigger })),
              onToggleCountdown: () =>
                T((L) => ({ ...L, countdown: !L.countdown })),
            }),
            l.jsx(W3, { t: n, overlayInstance: m }),
          ],
        }),
        l.jsx(U3, { t: n }),
      ],
    });
  },
  Qs = document.getElementById("root");
Qs &&
  Ma.createRoot(Qs).render(l.jsx(ja.StrictMode, { children: l.jsx(G3, {}) }));
