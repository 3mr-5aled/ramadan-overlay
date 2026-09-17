(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) r(o);
  new MutationObserver((o) => {
    for (const i of o)
      if (i.type === "childList")
        for (const a of i.addedNodes)
          a.tagName === "LINK" && a.rel === "modulepreload" && r(a);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(o) {
    const i = {};
    return (
      o.integrity && (i.integrity = o.integrity),
      o.referrerPolicy && (i.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === "use-credentials"
        ? (i.credentials = "include")
        : o.crossOrigin === "anonymous"
          ? (i.credentials = "omit")
          : (i.credentials = "same-origin"),
      i
    );
  }
  function r(o) {
    if (o.ep) return;
    o.ep = !0;
    const i = n(o);
    fetch(o.href, i);
  }
})();
function ku(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var Ql = { exports: {} },
  Io = {},
  Yl = { exports: {} },
  G = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var br = Symbol.for("react.element"),
  Cu = Symbol.for("react.portal"),
  bu = Symbol.for("react.fragment"),
  zu = Symbol.for("react.strict_mode"),
  Tu = Symbol.for("react.profiler"),
  Eu = Symbol.for("react.provider"),
  Mu = Symbol.for("react.context"),
  Nu = Symbol.for("react.forward_ref"),
  ju = Symbol.for("react.suspense"),
  Au = Symbol.for("react.memo"),
  Lu = Symbol.for("react.lazy"),
  za = Symbol.iterator;
function Pu(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (za && e[za]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var Kl = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  Zl = Object.assign,
  Xl = {};
function An(e, t, n) {
  ((this.props = e),
    (this.context = t),
    (this.refs = Xl),
    (this.updater = n || Kl));
}
An.prototype.isReactComponent = {};
An.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
An.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Jl() {}
Jl.prototype = An.prototype;
function z1(e, t, n) {
  ((this.props = e),
    (this.context = t),
    (this.refs = Xl),
    (this.updater = n || Kl));
}
var T1 = (z1.prototype = new Jl());
T1.constructor = z1;
Zl(T1, An.prototype);
T1.isPureReactComponent = !0;
var Ta = Array.isArray,
  ql = Object.prototype.hasOwnProperty,
  E1 = { current: null },
  es = { key: !0, ref: !0, __self: !0, __source: !0 };
function ts(e, t, n) {
  var r,
    o = {},
    i = null,
    a = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (a = t.ref),
    t.key !== void 0 && (i = "" + t.key),
    t))
      ql.call(t, r) && !es.hasOwnProperty(r) && (o[r] = t[r]);
  var l = arguments.length - 2;
  if (l === 1) o.children = n;
  else if (1 < l) {
    for (var u = Array(l), c = 0; c < l; c++) u[c] = arguments[c + 2];
    o.children = u;
  }
  if (e && e.defaultProps)
    for (r in ((l = e.defaultProps), l)) o[r] === void 0 && (o[r] = l[r]);
  return {
    $$typeof: br,
    type: e,
    key: i,
    ref: a,
    props: o,
    _owner: E1.current,
  };
}
function _u(e, t) {
  return {
    $$typeof: br,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function M1(e) {
  return typeof e == "object" && e !== null && e.$$typeof === br;
}
function Du(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var Ea = /\/+/g;
function qo(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? Du("" + e.key)
    : t.toString(36);
}
function Xr(e, t, n, r, o) {
  var i = typeof e;
  (i === "undefined" || i === "boolean") && (e = null);
  var a = !1;
  if (e === null) a = !0;
  else
    switch (i) {
      case "string":
      case "number":
        a = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case br:
          case Cu:
            a = !0;
        }
    }
  if (a)
    return (
      (a = e),
      (o = o(a)),
      (e = r === "" ? "." + qo(a, 0) : r),
      Ta(o)
        ? ((n = ""),
          e != null && (n = e.replace(Ea, "$&/") + "/"),
          Xr(o, t, n, "", function (c) {
            return c;
          }))
        : o != null &&
          (M1(o) &&
            (o = _u(
              o,
              n +
                (!o.key || (a && a.key === o.key)
                  ? ""
                  : ("" + o.key).replace(Ea, "$&/") + "/") +
                e
            )),
          t.push(o)),
      1
    );
  if (((a = 0), (r = r === "" ? "." : r + ":"), Ta(e)))
    for (var l = 0; l < e.length; l++) {
      i = e[l];
      var u = r + qo(i, l);
      a += Xr(i, t, n, u, o);
    }
  else if (((u = Pu(e)), typeof u == "function"))
    for (e = u.call(e), l = 0; !(i = e.next()).done;)
      ((i = i.value), (u = r + qo(i, l++)), (a += Xr(i, t, n, u, o)));
  else if (i === "object")
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
  return a;
}
function Nr(e, t, n) {
  if (e == null) return e;
  var r = [],
    o = 0;
  return (
    Xr(e, r, "", "", function (i) {
      return t.call(n, i, o++);
    }),
    r
  );
}
function Iu(e) {
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
var Ee = { current: null },
  Jr = { transition: null },
  Ru = {
    ReactCurrentDispatcher: Ee,
    ReactCurrentBatchConfig: Jr,
    ReactCurrentOwner: E1,
  };
function ns() {
  throw Error("act(...) is not supported in production builds of React.");
}
G.Children = {
  map: Nr,
  forEach: function (e, t, n) {
    Nr(
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
      Nr(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      Nr(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!M1(e))
      throw Error(
        "React.Children.only expected to receive a single React element child."
      );
    return e;
  },
};
G.Component = An;
G.Fragment = bu;
G.Profiler = Tu;
G.PureComponent = z1;
G.StrictMode = zu;
G.Suspense = ju;
G.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ru;
G.act = ns;
G.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        "."
    );
  var r = Zl({}, e.props),
    o = e.key,
    i = e.ref,
    a = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((i = t.ref), (a = E1.current)),
      t.key !== void 0 && (o = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var l = e.type.defaultProps;
    for (u in t)
      ql.call(t, u) &&
        !es.hasOwnProperty(u) &&
        (r[u] = t[u] === void 0 && l !== void 0 ? l[u] : t[u]);
  }
  var u = arguments.length - 2;
  if (u === 1) r.children = n;
  else if (1 < u) {
    l = Array(u);
    for (var c = 0; c < u; c++) l[c] = arguments[c + 2];
    r.children = l;
  }
  return { $$typeof: br, type: e.type, key: o, ref: i, props: r, _owner: a };
};
G.createContext = function (e) {
  return (
    (e = {
      $$typeof: Mu,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: Eu, _context: e }),
    (e.Consumer = e)
  );
};
G.createElement = ts;
G.createFactory = function (e) {
  var t = ts.bind(null, e);
  return ((t.type = e), t);
};
G.createRef = function () {
  return { current: null };
};
G.forwardRef = function (e) {
  return { $$typeof: Nu, render: e };
};
G.isValidElement = M1;
G.lazy = function (e) {
  return { $$typeof: Lu, _payload: { _status: -1, _result: e }, _init: Iu };
};
G.memo = function (e, t) {
  return { $$typeof: Au, type: e, compare: t === void 0 ? null : t };
};
G.startTransition = function (e) {
  var t = Jr.transition;
  Jr.transition = {};
  try {
    e();
  } finally {
    Jr.transition = t;
  }
};
G.unstable_act = ns;
G.useCallback = function (e, t) {
  return Ee.current.useCallback(e, t);
};
G.useContext = function (e) {
  return Ee.current.useContext(e);
};
G.useDebugValue = function () {};
G.useDeferredValue = function (e) {
  return Ee.current.useDeferredValue(e);
};
G.useEffect = function (e, t) {
  return Ee.current.useEffect(e, t);
};
G.useId = function () {
  return Ee.current.useId();
};
G.useImperativeHandle = function (e, t, n) {
  return Ee.current.useImperativeHandle(e, t, n);
};
G.useInsertionEffect = function (e, t) {
  return Ee.current.useInsertionEffect(e, t);
};
G.useLayoutEffect = function (e, t) {
  return Ee.current.useLayoutEffect(e, t);
};
G.useMemo = function (e, t) {
  return Ee.current.useMemo(e, t);
};
G.useReducer = function (e, t, n) {
  return Ee.current.useReducer(e, t, n);
};
G.useRef = function (e) {
  return Ee.current.useRef(e);
};
G.useState = function (e) {
  return Ee.current.useState(e);
};
G.useSyncExternalStore = function (e, t, n) {
  return Ee.current.useSyncExternalStore(e, t, n);
};
G.useTransition = function () {
  return Ee.current.useTransition();
};
G.version = "18.3.1";
Yl.exports = G;
var J = Yl.exports;
const Ou = ku(J);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Bu = J,
  Fu = Symbol.for("react.element"),
  $u = Symbol.for("react.fragment"),
  Vu = Object.prototype.hasOwnProperty,
  Hu = Bu.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  Uu = { key: !0, ref: !0, __self: !0, __source: !0 };
function rs(e, t, n) {
  var r,
    o = {},
    i = null,
    a = null;
  (n !== void 0 && (i = "" + n),
    t.key !== void 0 && (i = "" + t.key),
    t.ref !== void 0 && (a = t.ref));
  for (r in t) Vu.call(t, r) && !Uu.hasOwnProperty(r) && (o[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) o[r] === void 0 && (o[r] = t[r]);
  return {
    $$typeof: Fu,
    type: e,
    key: i,
    ref: a,
    props: o,
    _owner: Hu.current,
  };
}
Io.Fragment = $u;
Io.jsx = rs;
Io.jsxs = rs;
Ql.exports = Io;
var s = Ql.exports,
  Ei = {},
  os = { exports: {} },
  Be = {},
  is = { exports: {} },
  as = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(L, B) {
    var w = L.length;
    L.push(B);
    e: for (; 0 < w;) {
      var v = (w - 1) >>> 1,
        P = L[v];
      if (0 < o(P, B)) ((L[v] = B), (L[w] = P), (w = v));
      else break e;
    }
  }
  function n(L) {
    return L.length === 0 ? null : L[0];
  }
  function r(L) {
    if (L.length === 0) return null;
    var B = L[0],
      w = L.pop();
    if (w !== B) {
      L[0] = w;
      e: for (var v = 0, P = L.length, $ = P >>> 1; v < $;) {
        var H = 2 * (v + 1) - 1,
          D = L[H],
          F = H + 1,
          O = L[F];
        if (0 > o(D, w))
          F < P && 0 > o(O, D)
            ? ((L[v] = O), (L[F] = w), (v = F))
            : ((L[v] = D), (L[H] = w), (v = H));
        else if (F < P && 0 > o(O, w)) ((L[v] = O), (L[F] = w), (v = F));
        else break e;
      }
    }
    return B;
  }
  function o(L, B) {
    var w = L.sortIndex - B.sortIndex;
    return w !== 0 ? w : L.id - B.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var i = performance;
    e.unstable_now = function () {
      return i.now();
    };
  } else {
    var a = Date,
      l = a.now();
    e.unstable_now = function () {
      return a.now() - l;
    };
  }
  var u = [],
    c = [],
    g = 1,
    m = null,
    p = 3,
    y = !1,
    C = !1,
    S = !1,
    T = typeof setTimeout == "function" ? setTimeout : null,
    d = typeof clearTimeout == "function" ? clearTimeout : null,
    f = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function h(L) {
    for (var B = n(c); B !== null;) {
      if (B.callback === null) r(c);
      else if (B.startTime <= L)
        (r(c), (B.sortIndex = B.expirationTime), t(u, B));
      else break;
      B = n(c);
    }
  }
  function x(L) {
    if (((S = !1), h(L), !C))
      if (n(u) !== null) ((C = !0), Z(k));
      else {
        var B = n(c);
        B !== null && X(x, B.startTime - L);
      }
  }
  function k(L, B) {
    ((C = !1), S && ((S = !1), d(b), (b = -1)), (y = !0));
    var w = p;
    try {
      for (
        h(B), m = n(u);
        m !== null && (!(m.expirationTime > B) || (L && !_()));
      ) {
        var v = m.callback;
        if (typeof v == "function") {
          ((m.callback = null), (p = m.priorityLevel));
          var P = v(m.expirationTime <= B);
          ((B = e.unstable_now()),
            typeof P == "function" ? (m.callback = P) : m === n(u) && r(u),
            h(B));
        } else r(u);
        m = n(u);
      }
      if (m !== null) var $ = !0;
      else {
        var H = n(c);
        (H !== null && X(x, H.startTime - B), ($ = !1));
      }
      return $;
    } finally {
      ((m = null), (p = w), (y = !1));
    }
  }
  var z = !1,
    E = null,
    b = -1,
    A = 5,
    M = -1;
  function _() {
    return !(e.unstable_now() - M < A);
  }
  function R() {
    if (E !== null) {
      var L = e.unstable_now();
      M = L;
      var B = !0;
      try {
        B = E(!0, L);
      } finally {
        B ? j() : ((z = !1), (E = null));
      }
    } else z = !1;
  }
  var j;
  if (typeof f == "function")
    j = function () {
      f(R);
    };
  else if (typeof MessageChannel < "u") {
    var U = new MessageChannel(),
      W = U.port2;
    ((U.port1.onmessage = R),
      (j = function () {
        W.postMessage(null);
      }));
  } else
    j = function () {
      T(R, 0);
    };
  function Z(L) {
    ((E = L), z || ((z = !0), j()));
  }
  function X(L, B) {
    b = T(function () {
      L(e.unstable_now());
    }, B);
  }
  ((e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (L) {
      L.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      C || y || ((C = !0), Z(k));
    }),
    (e.unstable_forceFrameRate = function (L) {
      0 > L || 125 < L
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
          )
        : (A = 0 < L ? Math.floor(1e3 / L) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return p;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(u);
    }),
    (e.unstable_next = function (L) {
      switch (p) {
        case 1:
        case 2:
        case 3:
          var B = 3;
          break;
        default:
          B = p;
      }
      var w = p;
      p = B;
      try {
        return L();
      } finally {
        p = w;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (L, B) {
      switch (L) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          L = 3;
      }
      var w = p;
      p = L;
      try {
        return B();
      } finally {
        p = w;
      }
    }),
    (e.unstable_scheduleCallback = function (L, B, w) {
      var v = e.unstable_now();
      switch (
        (typeof w == "object" && w !== null
          ? ((w = w.delay), (w = typeof w == "number" && 0 < w ? v + w : v))
          : (w = v),
        L)
      ) {
        case 1:
          var P = -1;
          break;
        case 2:
          P = 250;
          break;
        case 5:
          P = 1073741823;
          break;
        case 4:
          P = 1e4;
          break;
        default:
          P = 5e3;
      }
      return (
        (P = w + P),
        (L = {
          id: g++,
          callback: B,
          priorityLevel: L,
          startTime: w,
          expirationTime: P,
          sortIndex: -1,
        }),
        w > v
          ? ((L.sortIndex = w),
            t(c, L),
            n(u) === null &&
              L === n(c) &&
              (S ? (d(b), (b = -1)) : (S = !0), X(x, w - v)))
          : ((L.sortIndex = P), t(u, L), C || y || ((C = !0), Z(k))),
        L
      );
    }),
    (e.unstable_shouldYield = _),
    (e.unstable_wrapCallback = function (L) {
      var B = p;
      return function () {
        var w = p;
        p = B;
        try {
          return L.apply(this, arguments);
        } finally {
          p = w;
        }
      };
    }));
})(as);
is.exports = as;
var Wu = is.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Gu = J,
  Oe = Wu;
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
var ls = new Set(),
  ir = {};
function qt(e, t) {
  (bn(e, t), bn(e + "Capture", t));
}
function bn(e, t) {
  for (ir[e] = t, e = 0; e < t.length; e++) ls.add(t[e]);
}
var ht = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  Mi = Object.prototype.hasOwnProperty,
  Qu =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  Ma = {},
  Na = {};
function Yu(e) {
  return Mi.call(Na, e)
    ? !0
    : Mi.call(Ma, e)
      ? !1
      : Qu.test(e)
        ? (Na[e] = !0)
        : ((Ma[e] = !0), !1);
}
function Ku(e, t, n, r) {
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
function Zu(e, t, n, r) {
  if (t === null || typeof t > "u" || Ku(e, t, n, r)) return !0;
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
function Me(e, t, n, r, o, i, a) {
  ((this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = o),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = i),
    (this.removeEmptyString = a));
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
var N1 = /[\-:]([a-z])/g;
function j1(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(N1, j1);
    xe[t] = new Me(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(N1, j1);
    xe[t] = new Me(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(N1, j1);
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
function A1(e, t, n, r) {
  var o = xe.hasOwnProperty(t) ? xe[t] : null;
  (o !== null
    ? o.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (Zu(t, n, o, r) && (n = null),
    r || o === null
      ? Yu(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
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
var wt = Gu.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  jr = Symbol.for("react.element"),
  on = Symbol.for("react.portal"),
  an = Symbol.for("react.fragment"),
  L1 = Symbol.for("react.strict_mode"),
  Ni = Symbol.for("react.profiler"),
  ss = Symbol.for("react.provider"),
  us = Symbol.for("react.context"),
  P1 = Symbol.for("react.forward_ref"),
  ji = Symbol.for("react.suspense"),
  Ai = Symbol.for("react.suspense_list"),
  _1 = Symbol.for("react.memo"),
  St = Symbol.for("react.lazy"),
  cs = Symbol.for("react.offscreen"),
  ja = Symbol.iterator;
function Dn(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (ja && e[ja]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var le = Object.assign,
  ei;
function Gn(e) {
  if (ei === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      ei = (t && t[1]) || "";
    }
  return (
    `
` +
    ei +
    e
  );
}
var ti = !1;
function ni(e, t) {
  if (!e || ti) return "";
  ti = !0;
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
        } catch (c) {
          var r = c;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (c) {
          r = c;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (c) {
        r = c;
      }
      e();
    }
  } catch (c) {
    if (c && r && typeof c.stack == "string") {
      for (
        var o = c.stack.split(`
`),
          i = r.stack.split(`
`),
          a = o.length - 1,
          l = i.length - 1;
        1 <= a && 0 <= l && o[a] !== i[l];
      )
        l--;
      for (; 1 <= a && 0 <= l; a--, l--)
        if (o[a] !== i[l]) {
          if (a !== 1 || l !== 1)
            do
              if ((a--, l--, 0 > l || o[a] !== i[l])) {
                var u =
                  `
` + o[a].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    u.includes("<anonymous>") &&
                    (u = u.replace("<anonymous>", e.displayName)),
                  u
                );
              }
            while (1 <= a && 0 <= l);
          break;
        }
    }
  } finally {
    ((ti = !1), (Error.prepareStackTrace = n));
  }
  return (e = e ? e.displayName || e.name : "") ? Gn(e) : "";
}
function Xu(e) {
  switch (e.tag) {
    case 5:
      return Gn(e.type);
    case 16:
      return Gn("Lazy");
    case 13:
      return Gn("Suspense");
    case 19:
      return Gn("SuspenseList");
    case 0:
    case 2:
    case 15:
      return ((e = ni(e.type, !1)), e);
    case 11:
      return ((e = ni(e.type.render, !1)), e);
    case 1:
      return ((e = ni(e.type, !0)), e);
    default:
      return "";
  }
}
function Li(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case an:
      return "Fragment";
    case on:
      return "Portal";
    case Ni:
      return "Profiler";
    case L1:
      return "StrictMode";
    case ji:
      return "Suspense";
    case Ai:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case us:
        return (e.displayName || "Context") + ".Consumer";
      case ss:
        return (e._context.displayName || "Context") + ".Provider";
      case P1:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case _1:
        return (
          (t = e.displayName || null),
          t !== null ? t : Li(e.type) || "Memo"
        );
      case St:
        ((t = e._payload), (e = e._init));
        try {
          return Li(e(t));
        } catch {}
    }
  return null;
}
function Ju(e) {
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
      return Li(t);
    case 8:
      return t === L1 ? "StrictMode" : "Mode";
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
function Dt(e) {
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
function ds(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function qu(e) {
  var t = ds(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var o = n.get,
      i = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return o.call(this);
        },
        set: function (a) {
          ((r = "" + a), i.call(this, a));
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (a) {
          r = "" + a;
        },
        stopTracking: function () {
          ((e._valueTracker = null), delete e[t]);
        },
      }
    );
  }
}
function Ar(e) {
  e._valueTracker || (e._valueTracker = qu(e));
}
function fs(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = ds(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function co(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Pi(e, t) {
  var n = t.checked;
  return le({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function Aa(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  ((n = Dt(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    }));
}
function ps(e, t) {
  ((t = t.checked), t != null && A1(e, "checked", t, !1));
}
function _i(e, t) {
  ps(e, t);
  var n = Dt(t.value),
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
    ? Di(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && Di(e, t.type, Dt(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked));
}
function La(e, t, n) {
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
function Di(e, t, n) {
  (t !== "number" || co(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Qn = Array.isArray;
function gn(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var o = 0; o < n.length; o++) t["$" + n[o]] = !0;
    for (n = 0; n < e.length; n++)
      ((o = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== o && (e[n].selected = o),
        o && r && (e[n].defaultSelected = !0));
  } else {
    for (n = "" + Dt(n), t = null, o = 0; o < e.length; o++) {
      if (e[o].value === n) {
        ((e[o].selected = !0), r && (e[o].defaultSelected = !0));
        return;
      }
      t !== null || e[o].disabled || (t = e[o]);
    }
    t !== null && (t.selected = !0);
  }
}
function Ii(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(N(91));
  return le({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function Pa(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(N(92));
      if (Qn(n)) {
        if (1 < n.length) throw Error(N(93));
        n = n[0];
      }
      t = n;
    }
    (t == null && (t = ""), (n = t));
  }
  e._wrapperState = { initialValue: Dt(n) };
}
function ms(e, t) {
  var n = Dt(t.value),
    r = Dt(t.defaultValue);
  (n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r));
}
function _a(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function hs(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Ri(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? hs(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
      ? "http://www.w3.org/1999/xhtml"
      : e;
}
var Lr,
  vs = (function (e) {
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
        Lr = Lr || document.createElement("div"),
          Lr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = Lr.firstChild;
        e.firstChild;
      )
        e.removeChild(e.firstChild);
      for (; t.firstChild;) e.appendChild(t.firstChild);
    }
  });
function ar(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Zn = {
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
  ec = ["Webkit", "ms", "Moz", "O"];
Object.keys(Zn).forEach(function (e) {
  ec.forEach(function (t) {
    ((t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Zn[t] = Zn[e]));
  });
});
function gs(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (Zn.hasOwnProperty(e) && Zn[e])
      ? ("" + t).trim()
      : t + "px";
}
function ys(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        o = gs(n, t[n], r);
      (n === "float" && (n = "cssFloat"), r ? e.setProperty(n, o) : (e[n] = o));
    }
}
var tc = le(
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
function Oi(e, t) {
  if (t) {
    if (tc[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
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
function Bi(e, t) {
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
var Fi = null;
function D1(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var $i = null,
  yn = null,
  wn = null;
function Da(e) {
  if ((e = Er(e))) {
    if (typeof $i != "function") throw Error(N(280));
    var t = e.stateNode;
    t && ((t = $o(t)), $i(e.stateNode, e.type, t));
  }
}
function ws(e) {
  yn ? (wn ? wn.push(e) : (wn = [e])) : (yn = e);
}
function xs() {
  if (yn) {
    var e = yn,
      t = wn;
    if (((wn = yn = null), Da(e), t)) for (e = 0; e < t.length; e++) Da(t[e]);
  }
}
function Ss(e, t) {
  return e(t);
}
function ks() {}
var ri = !1;
function Cs(e, t, n) {
  if (ri) return e(t, n);
  ri = !0;
  try {
    return Ss(e, t, n);
  } finally {
    ((ri = !1), (yn !== null || wn !== null) && (ks(), xs()));
  }
}
function lr(e, t) {
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
var Vi = !1;
if (ht)
  try {
    var In = {};
    (Object.defineProperty(In, "passive", {
      get: function () {
        Vi = !0;
      },
    }),
      window.addEventListener("test", In, In),
      window.removeEventListener("test", In, In));
  } catch {
    Vi = !1;
  }
function nc(e, t, n, r, o, i, a, l, u) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, c);
  } catch (g) {
    this.onError(g);
  }
}
var Xn = !1,
  fo = null,
  po = !1,
  Hi = null,
  rc = {
    onError: function (e) {
      ((Xn = !0), (fo = e));
    },
  };
function oc(e, t, n, r, o, i, a, l, u) {
  ((Xn = !1), (fo = null), nc.apply(rc, arguments));
}
function ic(e, t, n, r, o, i, a, l, u) {
  if ((oc.apply(this, arguments), Xn)) {
    if (Xn) {
      var c = fo;
      ((Xn = !1), (fo = null));
    } else throw Error(N(198));
    po || ((po = !0), (Hi = c));
  }
}
function en(e) {
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
function bs(e) {
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
function Ia(e) {
  if (en(e) !== e) throw Error(N(188));
}
function ac(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = en(e)), t === null)) throw Error(N(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ;) {
    var o = n.return;
    if (o === null) break;
    var i = o.alternate;
    if (i === null) {
      if (((r = o.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (o.child === i.child) {
      for (i = o.child; i;) {
        if (i === n) return (Ia(o), e);
        if (i === r) return (Ia(o), t);
        i = i.sibling;
      }
      throw Error(N(188));
    }
    if (n.return !== r.return) ((n = o), (r = i));
    else {
      for (var a = !1, l = o.child; l;) {
        if (l === n) {
          ((a = !0), (n = o), (r = i));
          break;
        }
        if (l === r) {
          ((a = !0), (r = o), (n = i));
          break;
        }
        l = l.sibling;
      }
      if (!a) {
        for (l = i.child; l;) {
          if (l === n) {
            ((a = !0), (n = i), (r = o));
            break;
          }
          if (l === r) {
            ((a = !0), (r = i), (n = o));
            break;
          }
          l = l.sibling;
        }
        if (!a) throw Error(N(189));
      }
    }
    if (n.alternate !== r) throw Error(N(190));
  }
  if (n.tag !== 3) throw Error(N(188));
  return n.stateNode.current === n ? e : t;
}
function zs(e) {
  return ((e = ac(e)), e !== null ? Ts(e) : null);
}
function Ts(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null;) {
    var t = Ts(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Es = Oe.unstable_scheduleCallback,
  Ra = Oe.unstable_cancelCallback,
  lc = Oe.unstable_shouldYield,
  sc = Oe.unstable_requestPaint,
  de = Oe.unstable_now,
  uc = Oe.unstable_getCurrentPriorityLevel,
  I1 = Oe.unstable_ImmediatePriority,
  Ms = Oe.unstable_UserBlockingPriority,
  mo = Oe.unstable_NormalPriority,
  cc = Oe.unstable_LowPriority,
  Ns = Oe.unstable_IdlePriority,
  Ro = null,
  lt = null;
function dc(e) {
  if (lt && typeof lt.onCommitFiberRoot == "function")
    try {
      lt.onCommitFiberRoot(Ro, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var et = Math.clz32 ? Math.clz32 : mc,
  fc = Math.log,
  pc = Math.LN2;
function mc(e) {
  return ((e >>>= 0), e === 0 ? 32 : (31 - ((fc(e) / pc) | 0)) | 0);
}
var Pr = 64,
  _r = 4194304;
function Yn(e) {
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
function ho(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    o = e.suspendedLanes,
    i = e.pingedLanes,
    a = n & 268435455;
  if (a !== 0) {
    var l = a & ~o;
    l !== 0 ? (r = Yn(l)) : ((i &= a), i !== 0 && (r = Yn(i)));
  } else ((a = n & ~o), a !== 0 ? (r = Yn(a)) : i !== 0 && (r = Yn(i)));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & o) &&
    ((o = r & -r), (i = t & -t), o >= i || (o === 16 && (i & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t;)
      ((n = 31 - et(t)), (o = 1 << n), (r |= e[n]), (t &= ~o));
  return r;
}
function hc(e, t) {
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
function vc(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      o = e.expirationTimes,
      i = e.pendingLanes;
    0 < i;
  ) {
    var a = 31 - et(i),
      l = 1 << a,
      u = o[a];
    (u === -1
      ? (!(l & n) || l & r) && (o[a] = hc(l, t))
      : u <= t && (e.expiredLanes |= l),
      (i &= ~l));
  }
}
function Ui(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function js() {
  var e = Pr;
  return ((Pr <<= 1), !(Pr & 4194240) && (Pr = 64), e);
}
function oi(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function zr(e, t, n) {
  ((e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - et(t)),
    (e[t] = n));
}
function gc(e, t) {
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
      i = 1 << o;
    ((t[o] = 0), (r[o] = -1), (e[o] = -1), (n &= ~i));
  }
}
function R1(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n;) {
    var r = 31 - et(n),
      o = 1 << r;
    ((o & t) | (e[r] & t) && (e[r] |= t), (n &= ~o));
  }
}
var q = 0;
function As(e) {
  return (
    (e &= -e),
    1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1
  );
}
var Ls,
  O1,
  Ps,
  _s,
  Ds,
  Wi = !1,
  Dr = [],
  Et = null,
  Mt = null,
  Nt = null,
  sr = new Map(),
  ur = new Map(),
  Ct = [],
  yc =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " "
    );
function Oa(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      Et = null;
      break;
    case "dragenter":
    case "dragleave":
      Mt = null;
      break;
    case "mouseover":
    case "mouseout":
      Nt = null;
      break;
    case "pointerover":
    case "pointerout":
      sr.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      ur.delete(t.pointerId);
  }
}
function Rn(e, t, n, r, o, i) {
  return e === null || e.nativeEvent !== i
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: i,
        targetContainers: [o],
      }),
      t !== null && ((t = Er(t)), t !== null && O1(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      o !== null && t.indexOf(o) === -1 && t.push(o),
      e);
}
function wc(e, t, n, r, o) {
  switch (t) {
    case "focusin":
      return ((Et = Rn(Et, e, t, n, r, o)), !0);
    case "dragenter":
      return ((Mt = Rn(Mt, e, t, n, r, o)), !0);
    case "mouseover":
      return ((Nt = Rn(Nt, e, t, n, r, o)), !0);
    case "pointerover":
      var i = o.pointerId;
      return (sr.set(i, Rn(sr.get(i) || null, e, t, n, r, o)), !0);
    case "gotpointercapture":
      return (
        (i = o.pointerId),
        ur.set(i, Rn(ur.get(i) || null, e, t, n, r, o)),
        !0
      );
  }
  return !1;
}
function Is(e) {
  var t = Ht(e.target);
  if (t !== null) {
    var n = en(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = bs(n)), t !== null)) {
          ((e.blockedOn = t),
            Ds(e.priority, function () {
              Ps(n);
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
function qr(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length;) {
    var n = Gi(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      ((Fi = r), n.target.dispatchEvent(r), (Fi = null));
    } else return ((t = Er(n)), t !== null && O1(t), (e.blockedOn = n), !1);
    t.shift();
  }
  return !0;
}
function Ba(e, t, n) {
  qr(e) && n.delete(t);
}
function xc() {
  ((Wi = !1),
    Et !== null && qr(Et) && (Et = null),
    Mt !== null && qr(Mt) && (Mt = null),
    Nt !== null && qr(Nt) && (Nt = null),
    sr.forEach(Ba),
    ur.forEach(Ba));
}
function On(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    Wi ||
      ((Wi = !0),
      Oe.unstable_scheduleCallback(Oe.unstable_NormalPriority, xc)));
}
function cr(e) {
  function t(o) {
    return On(o, e);
  }
  if (0 < Dr.length) {
    On(Dr[0], e);
    for (var n = 1; n < Dr.length; n++) {
      var r = Dr[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    Et !== null && On(Et, e),
      Mt !== null && On(Mt, e),
      Nt !== null && On(Nt, e),
      sr.forEach(t),
      ur.forEach(t),
      n = 0;
    n < Ct.length;
    n++
  )
    ((r = Ct[n]), r.blockedOn === e && (r.blockedOn = null));
  for (; 0 < Ct.length && ((n = Ct[0]), n.blockedOn === null);)
    (Is(n), n.blockedOn === null && Ct.shift());
}
var xn = wt.ReactCurrentBatchConfig,
  vo = !0;
function Sc(e, t, n, r) {
  var o = q,
    i = xn.transition;
  xn.transition = null;
  try {
    ((q = 1), B1(e, t, n, r));
  } finally {
    ((q = o), (xn.transition = i));
  }
}
function kc(e, t, n, r) {
  var o = q,
    i = xn.transition;
  xn.transition = null;
  try {
    ((q = 4), B1(e, t, n, r));
  } finally {
    ((q = o), (xn.transition = i));
  }
}
function B1(e, t, n, r) {
  if (vo) {
    var o = Gi(e, t, n, r);
    if (o === null) (mi(e, t, r, go, n), Oa(e, r));
    else if (wc(o, e, t, n, r)) r.stopPropagation();
    else if ((Oa(e, r), t & 4 && -1 < yc.indexOf(e))) {
      for (; o !== null;) {
        var i = Er(o);
        if (
          (i !== null && Ls(i),
          (i = Gi(e, t, n, r)),
          i === null && mi(e, t, r, go, n),
          i === o)
        )
          break;
        o = i;
      }
      o !== null && r.stopPropagation();
    } else mi(e, t, r, null, n);
  }
}
var go = null;
function Gi(e, t, n, r) {
  if (((go = null), (e = D1(r)), (e = Ht(e)), e !== null))
    if (((t = en(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = bs(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return ((go = e), null);
}
function Rs(e) {
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
      switch (uc()) {
        case I1:
          return 1;
        case Ms:
          return 4;
        case mo:
        case cc:
          return 16;
        case Ns:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var zt = null,
  F1 = null,
  eo = null;
function Os() {
  if (eo) return eo;
  var e,
    t = F1,
    n = t.length,
    r,
    o = "value" in zt ? zt.value : zt.textContent,
    i = o.length;
  for (e = 0; e < n && t[e] === o[e]; e++);
  var a = n - e;
  for (r = 1; r <= a && t[n - r] === o[i - r]; r++);
  return (eo = o.slice(e, 1 < r ? 1 - r : void 0));
}
function to(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function Ir() {
  return !0;
}
function Fa() {
  return !1;
}
function Fe(e) {
  function t(n, r, o, i, a) {
    ((this._reactName = n),
      (this._targetInst = o),
      (this.type = r),
      (this.nativeEvent = i),
      (this.target = a),
      (this.currentTarget = null));
    for (var l in e)
      e.hasOwnProperty(l) && ((n = e[l]), (this[l] = n ? n(i) : i[l]));
    return (
      (this.isDefaultPrevented = (
        i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1
      )
        ? Ir
        : Fa),
      (this.isPropagationStopped = Fa),
      this
    );
  }
  return (
    le(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = Ir));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = Ir));
      },
      persist: function () {},
      isPersistent: Ir,
    }),
    t
  );
}
var Ln = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  $1 = Fe(Ln),
  Tr = le({}, Ln, { view: 0, detail: 0 }),
  Cc = Fe(Tr),
  ii,
  ai,
  Bn,
  Oo = le({}, Tr, {
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
    getModifierState: V1,
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
        : (e !== Bn &&
            (Bn && e.type === "mousemove"
              ? ((ii = e.screenX - Bn.screenX), (ai = e.screenY - Bn.screenY))
              : (ai = ii = 0),
            (Bn = e)),
          ii);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : ai;
    },
  }),
  $a = Fe(Oo),
  bc = le({}, Oo, { dataTransfer: 0 }),
  zc = Fe(bc),
  Tc = le({}, Tr, { relatedTarget: 0 }),
  li = Fe(Tc),
  Ec = le({}, Ln, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Mc = Fe(Ec),
  Nc = le({}, Ln, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  jc = Fe(Nc),
  Ac = le({}, Ln, { data: 0 }),
  Va = Fe(Ac),
  Lc = {
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
  Pc = {
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
  _c = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function Dc(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = _c[e]) ? !!t[e] : !1;
}
function V1() {
  return Dc;
}
var Ic = le({}, Tr, {
    key: function (e) {
      if (e.key) {
        var t = Lc[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = to(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
          ? Pc[e.keyCode] || "Unidentified"
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
    getModifierState: V1,
    charCode: function (e) {
      return e.type === "keypress" ? to(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? to(e)
        : e.type === "keydown" || e.type === "keyup"
          ? e.keyCode
          : 0;
    },
  }),
  Rc = Fe(Ic),
  Oc = le({}, Oo, {
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
  Ha = Fe(Oc),
  Bc = le({}, Tr, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: V1,
  }),
  Fc = Fe(Bc),
  $c = le({}, Ln, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Vc = Fe($c),
  Hc = le({}, Oo, {
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
  Uc = Fe(Hc),
  Wc = [9, 13, 27, 32],
  H1 = ht && "CompositionEvent" in window,
  Jn = null;
ht && "documentMode" in document && (Jn = document.documentMode);
var Gc = ht && "TextEvent" in window && !Jn,
  Bs = ht && (!H1 || (Jn && 8 < Jn && 11 >= Jn)),
  Ua = " ",
  Wa = !1;
function Fs(e, t) {
  switch (e) {
    case "keyup":
      return Wc.indexOf(t.keyCode) !== -1;
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
function $s(e) {
  return ((e = e.detail), typeof e == "object" && "data" in e ? e.data : null);
}
var ln = !1;
function Qc(e, t) {
  switch (e) {
    case "compositionend":
      return $s(t);
    case "keypress":
      return t.which !== 32 ? null : ((Wa = !0), Ua);
    case "textInput":
      return ((e = t.data), e === Ua && Wa ? null : e);
    default:
      return null;
  }
}
function Yc(e, t) {
  if (ln)
    return e === "compositionend" || (!H1 && Fs(e, t))
      ? ((e = Os()), (eo = F1 = zt = null), (ln = !1), e)
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
      return Bs && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Kc = {
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
function Ga(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Kc[e.type] : t === "textarea";
}
function Vs(e, t, n, r) {
  (ws(r),
    (t = yo(t, "onChange")),
    0 < t.length &&
      ((n = new $1("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t })));
}
var qn = null,
  dr = null;
function Zc(e) {
  qs(e, 0);
}
function Bo(e) {
  var t = cn(e);
  if (fs(t)) return e;
}
function Xc(e, t) {
  if (e === "change") return t;
}
var Hs = !1;
if (ht) {
  var si;
  if (ht) {
    var ui = "oninput" in document;
    if (!ui) {
      var Qa = document.createElement("div");
      (Qa.setAttribute("oninput", "return;"),
        (ui = typeof Qa.oninput == "function"));
    }
    si = ui;
  } else si = !1;
  Hs = si && (!document.documentMode || 9 < document.documentMode);
}
function Ya() {
  qn && (qn.detachEvent("onpropertychange", Us), (dr = qn = null));
}
function Us(e) {
  if (e.propertyName === "value" && Bo(dr)) {
    var t = [];
    (Vs(t, dr, e, D1(e)), Cs(Zc, t));
  }
}
function Jc(e, t, n) {
  e === "focusin"
    ? (Ya(), (qn = t), (dr = n), qn.attachEvent("onpropertychange", Us))
    : e === "focusout" && Ya();
}
function qc(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return Bo(dr);
}
function e0(e, t) {
  if (e === "click") return Bo(t);
}
function t0(e, t) {
  if (e === "input" || e === "change") return Bo(t);
}
function n0(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var nt = typeof Object.is == "function" ? Object.is : n0;
function fr(e, t) {
  if (nt(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var o = n[r];
    if (!Mi.call(t, o) || !nt(e[o], t[o])) return !1;
  }
  return !0;
}
function Ka(e) {
  for (; e && e.firstChild;) e = e.firstChild;
  return e;
}
function Za(e, t) {
  var n = Ka(e);
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
    n = Ka(n);
  }
}
function Ws(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
          ? Ws(e, t.parentNode)
          : "contains" in e
            ? e.contains(t)
            : e.compareDocumentPosition
              ? !!(e.compareDocumentPosition(t) & 16)
              : !1
    : !1;
}
function Gs() {
  for (var e = window, t = co(); t instanceof e.HTMLIFrameElement;) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = co(e.document);
  }
  return t;
}
function U1(e) {
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
function r0(e) {
  var t = Gs(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    Ws(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && U1(n)) {
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
          i = Math.min(r.start, o);
        ((r = r.end === void 0 ? i : Math.min(r.end, o)),
          !e.extend && i > r && ((o = r), (r = i), (i = o)),
          (o = Za(n, i)));
        var a = Za(n, r);
        o &&
          a &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== o.node ||
            e.anchorOffset !== o.offset ||
            e.focusNode !== a.node ||
            e.focusOffset !== a.offset) &&
          ((t = t.createRange()),
          t.setStart(o.node, o.offset),
          e.removeAllRanges(),
          i > r
            ? (e.addRange(t), e.extend(a.node, a.offset))
            : (t.setEnd(a.node, a.offset), e.addRange(t)));
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
var o0 = ht && "documentMode" in document && 11 >= document.documentMode,
  sn = null,
  Qi = null,
  er = null,
  Yi = !1;
function Xa(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Yi ||
    sn == null ||
    sn !== co(r) ||
    ((r = sn),
    "selectionStart" in r && U1(r)
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
    (er && fr(er, r)) ||
      ((er = r),
      (r = yo(Qi, "onSelect")),
      0 < r.length &&
        ((t = new $1("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = sn))));
}
function Rr(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var un = {
    animationend: Rr("Animation", "AnimationEnd"),
    animationiteration: Rr("Animation", "AnimationIteration"),
    animationstart: Rr("Animation", "AnimationStart"),
    transitionend: Rr("Transition", "TransitionEnd"),
  },
  ci = {},
  Qs = {};
ht &&
  ((Qs = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete un.animationend.animation,
    delete un.animationiteration.animation,
    delete un.animationstart.animation),
  "TransitionEvent" in window || delete un.transitionend.transition);
function Fo(e) {
  if (ci[e]) return ci[e];
  if (!un[e]) return e;
  var t = un[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in Qs) return (ci[e] = t[n]);
  return e;
}
var Ys = Fo("animationend"),
  Ks = Fo("animationiteration"),
  Zs = Fo("animationstart"),
  Xs = Fo("transitionend"),
  Js = new Map(),
  Ja =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " "
    );
function Rt(e, t) {
  (Js.set(e, t), qt(t, [e]));
}
for (var di = 0; di < Ja.length; di++) {
  var fi = Ja[di],
    i0 = fi.toLowerCase(),
    a0 = fi[0].toUpperCase() + fi.slice(1);
  Rt(i0, "on" + a0);
}
Rt(Ys, "onAnimationEnd");
Rt(Ks, "onAnimationIteration");
Rt(Zs, "onAnimationStart");
Rt("dblclick", "onDoubleClick");
Rt("focusin", "onFocus");
Rt("focusout", "onBlur");
Rt(Xs, "onTransitionEnd");
bn("onMouseEnter", ["mouseout", "mouseover"]);
bn("onMouseLeave", ["mouseout", "mouseover"]);
bn("onPointerEnter", ["pointerout", "pointerover"]);
bn("onPointerLeave", ["pointerout", "pointerover"]);
qt(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(" ")
);
qt(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " "
  )
);
qt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
qt(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
qt(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
qt(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var Kn =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ),
  l0 = new Set("cancel close invalid load scroll toggle".split(" ").concat(Kn));
function qa(e, t, n) {
  var r = e.type || "unknown-event";
  ((e.currentTarget = n), ic(r, t, void 0, e), (e.currentTarget = null));
}
function qs(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      o = r.event;
    r = r.listeners;
    e: {
      var i = void 0;
      if (t)
        for (var a = r.length - 1; 0 <= a; a--) {
          var l = r[a],
            u = l.instance,
            c = l.currentTarget;
          if (((l = l.listener), u !== i && o.isPropagationStopped())) break e;
          (qa(o, l, c), (i = u));
        }
      else
        for (a = 0; a < r.length; a++) {
          if (
            ((l = r[a]),
            (u = l.instance),
            (c = l.currentTarget),
            (l = l.listener),
            u !== i && o.isPropagationStopped())
          )
            break e;
          (qa(o, l, c), (i = u));
        }
    }
  }
  if (po) throw ((e = Hi), (po = !1), (Hi = null), e);
}
function ne(e, t) {
  var n = t[qi];
  n === void 0 && (n = t[qi] = new Set());
  var r = e + "__bubble";
  n.has(r) || (e2(t, e, 2, !1), n.add(r));
}
function pi(e, t, n) {
  var r = 0;
  (t && (r |= 4), e2(n, e, r, t));
}
var Or = "_reactListening" + Math.random().toString(36).slice(2);
function pr(e) {
  if (!e[Or]) {
    ((e[Or] = !0),
      ls.forEach(function (n) {
        n !== "selectionchange" && (l0.has(n) || pi(n, !1, e), pi(n, !0, e));
      }));
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Or] || ((t[Or] = !0), pi("selectionchange", !1, t));
  }
}
function e2(e, t, n, r) {
  switch (Rs(t)) {
    case 1:
      var o = Sc;
      break;
    case 4:
      o = kc;
      break;
    default:
      o = B1;
  }
  ((n = o.bind(null, t, n, e)),
    (o = void 0),
    !Vi ||
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
function mi(e, t, n, r, o) {
  var i = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var a = r.tag;
      if (a === 3 || a === 4) {
        var l = r.stateNode.containerInfo;
        if (l === o || (l.nodeType === 8 && l.parentNode === o)) break;
        if (a === 4)
          for (a = r.return; a !== null;) {
            var u = a.tag;
            if (
              (u === 3 || u === 4) &&
              ((u = a.stateNode.containerInfo),
              u === o || (u.nodeType === 8 && u.parentNode === o))
            )
              return;
            a = a.return;
          }
        for (; l !== null;) {
          if (((a = Ht(l)), a === null)) return;
          if (((u = a.tag), u === 5 || u === 6)) {
            r = i = a;
            continue e;
          }
          l = l.parentNode;
        }
      }
      r = r.return;
    }
  Cs(function () {
    var c = i,
      g = D1(n),
      m = [];
    e: {
      var p = Js.get(e);
      if (p !== void 0) {
        var y = $1,
          C = e;
        switch (e) {
          case "keypress":
            if (to(n) === 0) break e;
          case "keydown":
          case "keyup":
            y = Rc;
            break;
          case "focusin":
            ((C = "focus"), (y = li));
            break;
          case "focusout":
            ((C = "blur"), (y = li));
            break;
          case "beforeblur":
          case "afterblur":
            y = li;
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
            y = $a;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            y = zc;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            y = Fc;
            break;
          case Ys:
          case Ks:
          case Zs:
            y = Mc;
            break;
          case Xs:
            y = Vc;
            break;
          case "scroll":
            y = Cc;
            break;
          case "wheel":
            y = Uc;
            break;
          case "copy":
          case "cut":
          case "paste":
            y = jc;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            y = Ha;
        }
        var S = (t & 4) !== 0,
          T = !S && e === "scroll",
          d = S ? (p !== null ? p + "Capture" : null) : p;
        S = [];
        for (var f = c, h; f !== null;) {
          h = f;
          var x = h.stateNode;
          if (
            (h.tag === 5 &&
              x !== null &&
              ((h = x),
              d !== null && ((x = lr(f, d)), x != null && S.push(mr(f, x, h)))),
            T)
          )
            break;
          f = f.return;
        }
        0 < S.length &&
          ((p = new y(p, C, null, n, g)), m.push({ event: p, listeners: S }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((p = e === "mouseover" || e === "pointerover"),
          (y = e === "mouseout" || e === "pointerout"),
          p &&
            n !== Fi &&
            (C = n.relatedTarget || n.fromElement) &&
            (Ht(C) || C[vt]))
        )
          break e;
        if (
          (y || p) &&
          ((p =
            g.window === g
              ? g
              : (p = g.ownerDocument)
                ? p.defaultView || p.parentWindow
                : window),
          y
            ? ((C = n.relatedTarget || n.toElement),
              (y = c),
              (C = C ? Ht(C) : null),
              C !== null &&
                ((T = en(C)), C !== T || (C.tag !== 5 && C.tag !== 6)) &&
                (C = null))
            : ((y = null), (C = c)),
          y !== C)
        ) {
          if (
            ((S = $a),
            (x = "onMouseLeave"),
            (d = "onMouseEnter"),
            (f = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((S = Ha),
              (x = "onPointerLeave"),
              (d = "onPointerEnter"),
              (f = "pointer")),
            (T = y == null ? p : cn(y)),
            (h = C == null ? p : cn(C)),
            (p = new S(x, f + "leave", y, n, g)),
            (p.target = T),
            (p.relatedTarget = h),
            (x = null),
            Ht(g) === c &&
              ((S = new S(d, f + "enter", C, n, g)),
              (S.target = h),
              (S.relatedTarget = T),
              (x = S)),
            (T = x),
            y && C)
          )
            t: {
              for (S = y, d = C, f = 0, h = S; h; h = tn(h)) f++;
              for (h = 0, x = d; x; x = tn(x)) h++;
              for (; 0 < f - h;) ((S = tn(S)), f--);
              for (; 0 < h - f;) ((d = tn(d)), h--);
              for (; f--;) {
                if (S === d || (d !== null && S === d.alternate)) break t;
                ((S = tn(S)), (d = tn(d)));
              }
              S = null;
            }
          else S = null;
          (y !== null && el(m, p, y, S, !1),
            C !== null && T !== null && el(m, T, C, S, !0));
        }
      }
      e: {
        if (
          ((p = c ? cn(c) : window),
          (y = p.nodeName && p.nodeName.toLowerCase()),
          y === "select" || (y === "input" && p.type === "file"))
        )
          var k = Xc;
        else if (Ga(p))
          if (Hs) k = t0;
          else {
            k = qc;
            var z = Jc;
          }
        else
          (y = p.nodeName) &&
            y.toLowerCase() === "input" &&
            (p.type === "checkbox" || p.type === "radio") &&
            (k = e0);
        if (k && (k = k(e, c))) {
          Vs(m, k, n, g);
          break e;
        }
        (z && z(e, p, c),
          e === "focusout" &&
            (z = p._wrapperState) &&
            z.controlled &&
            p.type === "number" &&
            Di(p, "number", p.value));
      }
      switch (((z = c ? cn(c) : window), e)) {
        case "focusin":
          (Ga(z) || z.contentEditable === "true") &&
            ((sn = z), (Qi = c), (er = null));
          break;
        case "focusout":
          er = Qi = sn = null;
          break;
        case "mousedown":
          Yi = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          ((Yi = !1), Xa(m, n, g));
          break;
        case "selectionchange":
          if (o0) break;
        case "keydown":
        case "keyup":
          Xa(m, n, g);
      }
      var E;
      if (H1)
        e: {
          switch (e) {
            case "compositionstart":
              var b = "onCompositionStart";
              break e;
            case "compositionend":
              b = "onCompositionEnd";
              break e;
            case "compositionupdate":
              b = "onCompositionUpdate";
              break e;
          }
          b = void 0;
        }
      else
        ln
          ? Fs(e, n) && (b = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (b = "onCompositionStart");
      (b &&
        (Bs &&
          n.locale !== "ko" &&
          (ln || b !== "onCompositionStart"
            ? b === "onCompositionEnd" && ln && (E = Os())
            : ((zt = g),
              (F1 = "value" in zt ? zt.value : zt.textContent),
              (ln = !0))),
        (z = yo(c, b)),
        0 < z.length &&
          ((b = new Va(b, e, null, n, g)),
          m.push({ event: b, listeners: z }),
          E ? (b.data = E) : ((E = $s(n)), E !== null && (b.data = E)))),
        (E = Gc ? Qc(e, n) : Yc(e, n)) &&
          ((c = yo(c, "onBeforeInput")),
          0 < c.length &&
            ((g = new Va("onBeforeInput", "beforeinput", null, n, g)),
            m.push({ event: g, listeners: c }),
            (g.data = E))));
    }
    qs(m, t);
  });
}
function mr(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function yo(e, t) {
  for (var n = t + "Capture", r = []; e !== null;) {
    var o = e,
      i = o.stateNode;
    (o.tag === 5 &&
      i !== null &&
      ((o = i),
      (i = lr(e, n)),
      i != null && r.unshift(mr(e, i, o)),
      (i = lr(e, t)),
      i != null && r.push(mr(e, i, o))),
      (e = e.return));
  }
  return r;
}
function tn(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function el(e, t, n, r, o) {
  for (var i = t._reactName, a = []; n !== null && n !== r;) {
    var l = n,
      u = l.alternate,
      c = l.stateNode;
    if (u !== null && u === r) break;
    (l.tag === 5 &&
      c !== null &&
      ((l = c),
      o
        ? ((u = lr(n, i)), u != null && a.unshift(mr(n, u, l)))
        : o || ((u = lr(n, i)), u != null && a.push(mr(n, u, l)))),
      (n = n.return));
  }
  a.length !== 0 && e.push({ event: t, listeners: a });
}
var s0 = /\r\n?/g,
  u0 = /\u0000|\uFFFD/g;
function tl(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      s0,
      `
`
    )
    .replace(u0, "");
}
function Br(e, t, n) {
  if (((t = tl(t)), tl(e) !== t && n)) throw Error(N(425));
}
function wo() {}
var Ki = null,
  Zi = null;
function Xi(e, t) {
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
var Ji = typeof setTimeout == "function" ? setTimeout : void 0,
  c0 = typeof clearTimeout == "function" ? clearTimeout : void 0,
  nl = typeof Promise == "function" ? Promise : void 0,
  d0 =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof nl < "u"
        ? function (e) {
            return nl.resolve(null).then(e).catch(f0);
          }
        : Ji;
function f0(e) {
  setTimeout(function () {
    throw e;
  });
}
function hi(e, t) {
  var n = t,
    r = 0;
  do {
    var o = n.nextSibling;
    if ((e.removeChild(n), o && o.nodeType === 8))
      if (((n = o.data), n === "/$")) {
        if (r === 0) {
          (e.removeChild(o), cr(t));
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = o;
  } while (n);
  cr(t);
}
function jt(e) {
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
function rl(e) {
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
var Pn = Math.random().toString(36).slice(2),
  at = "__reactFiber$" + Pn,
  hr = "__reactProps$" + Pn,
  vt = "__reactContainer$" + Pn,
  qi = "__reactEvents$" + Pn,
  p0 = "__reactListeners$" + Pn,
  m0 = "__reactHandles$" + Pn;
function Ht(e) {
  var t = e[at];
  if (t) return t;
  for (var n = e.parentNode; n;) {
    if ((t = n[vt] || n[at])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = rl(e); e !== null;) {
          if ((n = e[at])) return n;
          e = rl(e);
        }
      return t;
    }
    ((e = n), (n = e.parentNode));
  }
  return null;
}
function Er(e) {
  return (
    (e = e[at] || e[vt]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function cn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(N(33));
}
function $o(e) {
  return e[hr] || null;
}
var e1 = [],
  dn = -1;
function Ot(e) {
  return { current: e };
}
function re(e) {
  0 > dn || ((e.current = e1[dn]), (e1[dn] = null), dn--);
}
function ee(e, t) {
  (dn++, (e1[dn] = e.current), (e.current = t));
}
var It = {},
  be = Ot(It),
  Le = Ot(!1),
  Yt = It;
function zn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return It;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var o = {},
    i;
  for (i in n) o[i] = t[i];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = o)),
    o
  );
}
function Pe(e) {
  return ((e = e.childContextTypes), e != null);
}
function xo() {
  (re(Le), re(be));
}
function ol(e, t, n) {
  if (be.current !== It) throw Error(N(168));
  (ee(be, t), ee(Le, n));
}
function t2(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
    return n;
  r = r.getChildContext();
  for (var o in r) if (!(o in t)) throw Error(N(108, Ju(e) || "Unknown", o));
  return le({}, n, r);
}
function So(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || It),
    (Yt = be.current),
    ee(be, e),
    ee(Le, Le.current),
    !0
  );
}
function il(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(N(169));
  (n
    ? ((e = t2(e, t, Yt)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      re(Le),
      re(be),
      ee(be, e))
    : re(Le),
    ee(Le, n));
}
var dt = null,
  Vo = !1,
  vi = !1;
function n2(e) {
  dt === null ? (dt = [e]) : dt.push(e);
}
function h0(e) {
  ((Vo = !0), n2(e));
}
function Bt() {
  if (!vi && dt !== null) {
    vi = !0;
    var e = 0,
      t = q;
    try {
      var n = dt;
      for (q = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      ((dt = null), (Vo = !1));
    } catch (o) {
      throw (dt !== null && (dt = dt.slice(e + 1)), Es(I1, Bt), o);
    } finally {
      ((q = t), (vi = !1));
    }
  }
  return null;
}
var fn = [],
  pn = 0,
  ko = null,
  Co = 0,
  $e = [],
  Ve = 0,
  Kt = null,
  ft = 1,
  pt = "";
function $t(e, t) {
  ((fn[pn++] = Co), (fn[pn++] = ko), (ko = e), (Co = t));
}
function r2(e, t, n) {
  (($e[Ve++] = ft), ($e[Ve++] = pt), ($e[Ve++] = Kt), (Kt = e));
  var r = ft;
  e = pt;
  var o = 32 - et(r) - 1;
  ((r &= ~(1 << o)), (n += 1));
  var i = 32 - et(t) + o;
  if (30 < i) {
    var a = o - (o % 5);
    ((i = (r & ((1 << a) - 1)).toString(32)),
      (r >>= a),
      (o -= a),
      (ft = (1 << (32 - et(t) + o)) | (n << o) | r),
      (pt = i + e));
  } else ((ft = (1 << i) | (n << o) | r), (pt = e));
}
function W1(e) {
  e.return !== null && ($t(e, 1), r2(e, 1, 0));
}
function G1(e) {
  for (; e === ko;)
    ((ko = fn[--pn]), (fn[pn] = null), (Co = fn[--pn]), (fn[pn] = null));
  for (; e === Kt;)
    ((Kt = $e[--Ve]),
      ($e[Ve] = null),
      (pt = $e[--Ve]),
      ($e[Ve] = null),
      (ft = $e[--Ve]),
      ($e[Ve] = null));
}
var Re = null,
  Ie = null,
  oe = !1,
  qe = null;
function o2(e, t) {
  var n = He(5, null, null, 0);
  ((n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n));
}
function al(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (Re = e), (Ie = jt(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (Re = e), (Ie = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = Kt !== null ? { id: ft, overflow: pt } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = He(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (Re = e),
            (Ie = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function t1(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function n1(e) {
  if (oe) {
    var t = Ie;
    if (t) {
      var n = t;
      if (!al(e, t)) {
        if (t1(e)) throw Error(N(418));
        t = jt(n.nextSibling);
        var r = Re;
        t && al(e, t)
          ? o2(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (oe = !1), (Re = e));
      }
    } else {
      if (t1(e)) throw Error(N(418));
      ((e.flags = (e.flags & -4097) | 2), (oe = !1), (Re = e));
    }
  }
}
function ll(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;)
    e = e.return;
  Re = e;
}
function Fr(e) {
  if (e !== Re) return !1;
  if (!oe) return (ll(e), (oe = !0), !1);
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !Xi(e.type, e.memoizedProps))),
    t && (t = Ie))
  ) {
    if (t1(e)) throw (i2(), Error(N(418)));
    for (; t;) (o2(e, t), (t = jt(t.nextSibling)));
  }
  if ((ll(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(N(317));
    e: {
      for (e = e.nextSibling, t = 0; e;) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Ie = jt(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      Ie = null;
    }
  } else Ie = Re ? jt(e.stateNode.nextSibling) : null;
  return !0;
}
function i2() {
  for (var e = Ie; e;) e = jt(e.nextSibling);
}
function Tn() {
  ((Ie = Re = null), (oe = !1));
}
function Q1(e) {
  qe === null ? (qe = [e]) : qe.push(e);
}
var v0 = wt.ReactCurrentBatchConfig;
function Fn(e, t, n) {
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
        i = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === i
        ? t.ref
        : ((t = function (a) {
            var l = o.refs;
            a === null ? delete l[i] : (l[i] = a);
          }),
          (t._stringRef = i),
          t);
    }
    if (typeof e != "string") throw Error(N(284));
    if (!n._owner) throw Error(N(290, e));
  }
  return e;
}
function $r(e, t) {
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
function sl(e) {
  var t = e._init;
  return t(e._payload);
}
function a2(e) {
  function t(d, f) {
    if (e) {
      var h = d.deletions;
      h === null ? ((d.deletions = [f]), (d.flags |= 16)) : h.push(f);
    }
  }
  function n(d, f) {
    if (!e) return null;
    for (; f !== null;) (t(d, f), (f = f.sibling));
    return null;
  }
  function r(d, f) {
    for (d = new Map(); f !== null;)
      (f.key !== null ? d.set(f.key, f) : d.set(f.index, f), (f = f.sibling));
    return d;
  }
  function o(d, f) {
    return ((d = _t(d, f)), (d.index = 0), (d.sibling = null), d);
  }
  function i(d, f, h) {
    return (
      (d.index = h),
      e
        ? ((h = d.alternate),
          h !== null
            ? ((h = h.index), h < f ? ((d.flags |= 2), f) : h)
            : ((d.flags |= 2), f))
        : ((d.flags |= 1048576), f)
    );
  }
  function a(d) {
    return (e && d.alternate === null && (d.flags |= 2), d);
  }
  function l(d, f, h, x) {
    return f === null || f.tag !== 6
      ? ((f = Ci(h, d.mode, x)), (f.return = d), f)
      : ((f = o(f, h)), (f.return = d), f);
  }
  function u(d, f, h, x) {
    var k = h.type;
    return k === an
      ? g(d, f, h.props.children, x, h.key)
      : f !== null &&
          (f.elementType === k ||
            (typeof k == "object" &&
              k !== null &&
              k.$$typeof === St &&
              sl(k) === f.type))
        ? ((x = o(f, h.props)), (x.ref = Fn(d, f, h)), (x.return = d), x)
        : ((x = so(h.type, h.key, h.props, null, d.mode, x)),
          (x.ref = Fn(d, f, h)),
          (x.return = d),
          x);
  }
  function c(d, f, h, x) {
    return f === null ||
      f.tag !== 4 ||
      f.stateNode.containerInfo !== h.containerInfo ||
      f.stateNode.implementation !== h.implementation
      ? ((f = bi(h, d.mode, x)), (f.return = d), f)
      : ((f = o(f, h.children || [])), (f.return = d), f);
  }
  function g(d, f, h, x, k) {
    return f === null || f.tag !== 7
      ? ((f = Qt(h, d.mode, x, k)), (f.return = d), f)
      : ((f = o(f, h)), (f.return = d), f);
  }
  function m(d, f, h) {
    if ((typeof f == "string" && f !== "") || typeof f == "number")
      return ((f = Ci("" + f, d.mode, h)), (f.return = d), f);
    if (typeof f == "object" && f !== null) {
      switch (f.$$typeof) {
        case jr:
          return (
            (h = so(f.type, f.key, f.props, null, d.mode, h)),
            (h.ref = Fn(d, null, f)),
            (h.return = d),
            h
          );
        case on:
          return ((f = bi(f, d.mode, h)), (f.return = d), f);
        case St:
          var x = f._init;
          return m(d, x(f._payload), h);
      }
      if (Qn(f) || Dn(f))
        return ((f = Qt(f, d.mode, h, null)), (f.return = d), f);
      $r(d, f);
    }
    return null;
  }
  function p(d, f, h, x) {
    var k = f !== null ? f.key : null;
    if ((typeof h == "string" && h !== "") || typeof h == "number")
      return k !== null ? null : l(d, f, "" + h, x);
    if (typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case jr:
          return h.key === k ? u(d, f, h, x) : null;
        case on:
          return h.key === k ? c(d, f, h, x) : null;
        case St:
          return ((k = h._init), p(d, f, k(h._payload), x));
      }
      if (Qn(h) || Dn(h)) return k !== null ? null : g(d, f, h, x, null);
      $r(d, h);
    }
    return null;
  }
  function y(d, f, h, x, k) {
    if ((typeof x == "string" && x !== "") || typeof x == "number")
      return ((d = d.get(h) || null), l(f, d, "" + x, k));
    if (typeof x == "object" && x !== null) {
      switch (x.$$typeof) {
        case jr:
          return (
            (d = d.get(x.key === null ? h : x.key) || null),
            u(f, d, x, k)
          );
        case on:
          return (
            (d = d.get(x.key === null ? h : x.key) || null),
            c(f, d, x, k)
          );
        case St:
          var z = x._init;
          return y(d, f, h, z(x._payload), k);
      }
      if (Qn(x) || Dn(x)) return ((d = d.get(h) || null), g(f, d, x, k, null));
      $r(f, x);
    }
    return null;
  }
  function C(d, f, h, x) {
    for (
      var k = null, z = null, E = f, b = (f = 0), A = null;
      E !== null && b < h.length;
      b++
    ) {
      E.index > b ? ((A = E), (E = null)) : (A = E.sibling);
      var M = p(d, E, h[b], x);
      if (M === null) {
        E === null && (E = A);
        break;
      }
      (e && E && M.alternate === null && t(d, E),
        (f = i(M, f, b)),
        z === null ? (k = M) : (z.sibling = M),
        (z = M),
        (E = A));
    }
    if (b === h.length) return (n(d, E), oe && $t(d, b), k);
    if (E === null) {
      for (; b < h.length; b++)
        ((E = m(d, h[b], x)),
          E !== null &&
            ((f = i(E, f, b)),
            z === null ? (k = E) : (z.sibling = E),
            (z = E)));
      return (oe && $t(d, b), k);
    }
    for (E = r(d, E); b < h.length; b++)
      ((A = y(E, d, b, h[b], x)),
        A !== null &&
          (e && A.alternate !== null && E.delete(A.key === null ? b : A.key),
          (f = i(A, f, b)),
          z === null ? (k = A) : (z.sibling = A),
          (z = A)));
    return (
      e &&
        E.forEach(function (_) {
          return t(d, _);
        }),
      oe && $t(d, b),
      k
    );
  }
  function S(d, f, h, x) {
    var k = Dn(h);
    if (typeof k != "function") throw Error(N(150));
    if (((h = k.call(h)), h == null)) throw Error(N(151));
    for (
      var z = (k = null), E = f, b = (f = 0), A = null, M = h.next();
      E !== null && !M.done;
      b++, M = h.next()
    ) {
      E.index > b ? ((A = E), (E = null)) : (A = E.sibling);
      var _ = p(d, E, M.value, x);
      if (_ === null) {
        E === null && (E = A);
        break;
      }
      (e && E && _.alternate === null && t(d, E),
        (f = i(_, f, b)),
        z === null ? (k = _) : (z.sibling = _),
        (z = _),
        (E = A));
    }
    if (M.done) return (n(d, E), oe && $t(d, b), k);
    if (E === null) {
      for (; !M.done; b++, M = h.next())
        ((M = m(d, M.value, x)),
          M !== null &&
            ((f = i(M, f, b)),
            z === null ? (k = M) : (z.sibling = M),
            (z = M)));
      return (oe && $t(d, b), k);
    }
    for (E = r(d, E); !M.done; b++, M = h.next())
      ((M = y(E, d, b, M.value, x)),
        M !== null &&
          (e && M.alternate !== null && E.delete(M.key === null ? b : M.key),
          (f = i(M, f, b)),
          z === null ? (k = M) : (z.sibling = M),
          (z = M)));
    return (
      e &&
        E.forEach(function (R) {
          return t(d, R);
        }),
      oe && $t(d, b),
      k
    );
  }
  function T(d, f, h, x) {
    if (
      (typeof h == "object" &&
        h !== null &&
        h.type === an &&
        h.key === null &&
        (h = h.props.children),
      typeof h == "object" && h !== null)
    ) {
      switch (h.$$typeof) {
        case jr:
          e: {
            for (var k = h.key, z = f; z !== null;) {
              if (z.key === k) {
                if (((k = h.type), k === an)) {
                  if (z.tag === 7) {
                    (n(d, z.sibling),
                      (f = o(z, h.props.children)),
                      (f.return = d),
                      (d = f));
                    break e;
                  }
                } else if (
                  z.elementType === k ||
                  (typeof k == "object" &&
                    k !== null &&
                    k.$$typeof === St &&
                    sl(k) === z.type)
                ) {
                  (n(d, z.sibling),
                    (f = o(z, h.props)),
                    (f.ref = Fn(d, z, h)),
                    (f.return = d),
                    (d = f));
                  break e;
                }
                n(d, z);
                break;
              } else t(d, z);
              z = z.sibling;
            }
            h.type === an
              ? ((f = Qt(h.props.children, d.mode, x, h.key)),
                (f.return = d),
                (d = f))
              : ((x = so(h.type, h.key, h.props, null, d.mode, x)),
                (x.ref = Fn(d, f, h)),
                (x.return = d),
                (d = x));
          }
          return a(d);
        case on:
          e: {
            for (z = h.key; f !== null;) {
              if (f.key === z)
                if (
                  f.tag === 4 &&
                  f.stateNode.containerInfo === h.containerInfo &&
                  f.stateNode.implementation === h.implementation
                ) {
                  (n(d, f.sibling),
                    (f = o(f, h.children || [])),
                    (f.return = d),
                    (d = f));
                  break e;
                } else {
                  n(d, f);
                  break;
                }
              else t(d, f);
              f = f.sibling;
            }
            ((f = bi(h, d.mode, x)), (f.return = d), (d = f));
          }
          return a(d);
        case St:
          return ((z = h._init), T(d, f, z(h._payload), x));
      }
      if (Qn(h)) return C(d, f, h, x);
      if (Dn(h)) return S(d, f, h, x);
      $r(d, h);
    }
    return (typeof h == "string" && h !== "") || typeof h == "number"
      ? ((h = "" + h),
        f !== null && f.tag === 6
          ? (n(d, f.sibling), (f = o(f, h)), (f.return = d), (d = f))
          : (n(d, f), (f = Ci(h, d.mode, x)), (f.return = d), (d = f)),
        a(d))
      : n(d, f);
  }
  return T;
}
var En = a2(!0),
  l2 = a2(!1),
  bo = Ot(null),
  zo = null,
  mn = null,
  Y1 = null;
function K1() {
  Y1 = mn = zo = null;
}
function Z1(e) {
  var t = bo.current;
  (re(bo), (e._currentValue = t));
}
function r1(e, t, n) {
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
function Sn(e, t) {
  ((zo = e),
    (Y1 = mn = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (Ae = !0), (e.firstContext = null)));
}
function We(e) {
  var t = e._currentValue;
  if (Y1 !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), mn === null)) {
      if (zo === null) throw Error(N(308));
      ((mn = e), (zo.dependencies = { lanes: 0, firstContext: e }));
    } else mn = mn.next = e;
  return t;
}
var Ut = null;
function X1(e) {
  Ut === null ? (Ut = [e]) : Ut.push(e);
}
function s2(e, t, n, r) {
  var o = t.interleaved;
  return (
    o === null ? ((n.next = n), X1(t)) : ((n.next = o.next), (o.next = n)),
    (t.interleaved = n),
    gt(e, r)
  );
}
function gt(e, t) {
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
var kt = !1;
function J1(e) {
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
function mt(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function At(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), K & 2)) {
    var o = r.pending;
    return (
      o === null ? (t.next = t) : ((t.next = o.next), (o.next = t)),
      (r.pending = t),
      gt(e, n)
    );
  }
  return (
    (o = r.interleaved),
    o === null ? ((t.next = t), X1(r)) : ((t.next = o.next), (o.next = t)),
    (r.interleaved = t),
    gt(e, n)
  );
}
function no(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    ((r &= e.pendingLanes), (n |= r), (t.lanes = n), R1(e, n));
  }
}
function ul(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var o = null,
      i = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var a = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        (i === null ? (o = i = a) : (i = i.next = a), (n = n.next));
      } while (n !== null);
      i === null ? (o = i = t) : (i = i.next = t);
    } else o = i = t;
    ((n = {
      baseState: r.baseState,
      firstBaseUpdate: o,
      lastBaseUpdate: i,
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
function To(e, t, n, r) {
  var o = e.updateQueue;
  kt = !1;
  var i = o.firstBaseUpdate,
    a = o.lastBaseUpdate,
    l = o.shared.pending;
  if (l !== null) {
    o.shared.pending = null;
    var u = l,
      c = u.next;
    ((u.next = null), a === null ? (i = c) : (a.next = c), (a = u));
    var g = e.alternate;
    g !== null &&
      ((g = g.updateQueue),
      (l = g.lastBaseUpdate),
      l !== a &&
        (l === null ? (g.firstBaseUpdate = c) : (l.next = c),
        (g.lastBaseUpdate = u)));
  }
  if (i !== null) {
    var m = o.baseState;
    ((a = 0), (g = c = u = null), (l = i));
    do {
      var p = l.lane,
        y = l.eventTime;
      if ((r & p) === p) {
        g !== null &&
          (g = g.next =
            {
              eventTime: y,
              lane: 0,
              tag: l.tag,
              payload: l.payload,
              callback: l.callback,
              next: null,
            });
        e: {
          var C = e,
            S = l;
          switch (((p = t), (y = n), S.tag)) {
            case 1:
              if (((C = S.payload), typeof C == "function")) {
                m = C.call(y, m, p);
                break e;
              }
              m = C;
              break e;
            case 3:
              C.flags = (C.flags & -65537) | 128;
            case 0:
              if (
                ((C = S.payload),
                (p = typeof C == "function" ? C.call(y, m, p) : C),
                p == null)
              )
                break e;
              m = le({}, m, p);
              break e;
            case 2:
              kt = !0;
          }
        }
        l.callback !== null &&
          l.lane !== 0 &&
          ((e.flags |= 64),
          (p = o.effects),
          p === null ? (o.effects = [l]) : p.push(l));
      } else
        ((y = {
          eventTime: y,
          lane: p,
          tag: l.tag,
          payload: l.payload,
          callback: l.callback,
          next: null,
        }),
          g === null ? ((c = g = y), (u = m)) : (g = g.next = y),
          (a |= p));
      if (((l = l.next), l === null)) {
        if (((l = o.shared.pending), l === null)) break;
        ((p = l),
          (l = p.next),
          (p.next = null),
          (o.lastBaseUpdate = p),
          (o.shared.pending = null));
      }
    } while (!0);
    if (
      (g === null && (u = m),
      (o.baseState = u),
      (o.firstBaseUpdate = c),
      (o.lastBaseUpdate = g),
      (t = o.shared.interleaved),
      t !== null)
    ) {
      o = t;
      do ((a |= o.lane), (o = o.next));
      while (o !== t);
    } else i === null && (o.shared.lanes = 0);
    ((Xt |= a), (e.lanes = a), (e.memoizedState = m));
  }
}
function cl(e, t, n) {
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
var Mr = {},
  st = Ot(Mr),
  vr = Ot(Mr),
  gr = Ot(Mr);
function Wt(e) {
  if (e === Mr) throw Error(N(174));
  return e;
}
function q1(e, t) {
  switch ((ee(gr, t), ee(vr, e), ee(st, Mr), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Ri(null, "");
      break;
    default:
      ((e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = Ri(t, e)));
  }
  (re(st), ee(st, t));
}
function Mn() {
  (re(st), re(vr), re(gr));
}
function c2(e) {
  Wt(gr.current);
  var t = Wt(st.current),
    n = Ri(t, e.type);
  t !== n && (ee(vr, e), ee(st, n));
}
function ea(e) {
  vr.current === e && (re(st), re(vr));
}
var ie = Ot(0);
function Eo(e) {
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
var gi = [];
function ta() {
  for (var e = 0; e < gi.length; e++)
    gi[e]._workInProgressVersionPrimary = null;
  gi.length = 0;
}
var ro = wt.ReactCurrentDispatcher,
  yi = wt.ReactCurrentBatchConfig,
  Zt = 0,
  ae = null,
  pe = null,
  he = null,
  Mo = !1,
  tr = !1,
  yr = 0,
  g0 = 0;
function Se() {
  throw Error(N(321));
}
function na(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!nt(e[n], t[n])) return !1;
  return !0;
}
function ra(e, t, n, r, o, i) {
  if (
    ((Zt = i),
    (ae = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (ro.current = e === null || e.memoizedState === null ? S0 : k0),
    (e = n(r, o)),
    tr)
  ) {
    i = 0;
    do {
      if (((tr = !1), (yr = 0), 25 <= i)) throw Error(N(301));
      ((i += 1),
        (he = pe = null),
        (t.updateQueue = null),
        (ro.current = C0),
        (e = n(r, o)));
    } while (tr);
  }
  if (
    ((ro.current = No),
    (t = pe !== null && pe.next !== null),
    (Zt = 0),
    (he = pe = ae = null),
    (Mo = !1),
    t)
  )
    throw Error(N(300));
  return e;
}
function oa() {
  var e = yr !== 0;
  return ((yr = 0), e);
}
function it() {
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
  if (pe === null) {
    var e = ae.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = pe.next;
  var t = he === null ? ae.memoizedState : he.next;
  if (t !== null) ((he = t), (pe = e));
  else {
    if (e === null) throw Error(N(310));
    ((pe = e),
      (e = {
        memoizedState: pe.memoizedState,
        baseState: pe.baseState,
        baseQueue: pe.baseQueue,
        queue: pe.queue,
        next: null,
      }),
      he === null ? (ae.memoizedState = he = e) : (he = he.next = e));
  }
  return he;
}
function wr(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function wi(e) {
  var t = Ge(),
    n = t.queue;
  if (n === null) throw Error(N(311));
  n.lastRenderedReducer = e;
  var r = pe,
    o = r.baseQueue,
    i = n.pending;
  if (i !== null) {
    if (o !== null) {
      var a = o.next;
      ((o.next = i.next), (i.next = a));
    }
    ((r.baseQueue = o = i), (n.pending = null));
  }
  if (o !== null) {
    ((i = o.next), (r = r.baseState));
    var l = (a = null),
      u = null,
      c = i;
    do {
      var g = c.lane;
      if ((Zt & g) === g)
        (u !== null &&
          (u = u.next =
            {
              lane: 0,
              action: c.action,
              hasEagerState: c.hasEagerState,
              eagerState: c.eagerState,
              next: null,
            }),
          (r = c.hasEagerState ? c.eagerState : e(r, c.action)));
      else {
        var m = {
          lane: g,
          action: c.action,
          hasEagerState: c.hasEagerState,
          eagerState: c.eagerState,
          next: null,
        };
        (u === null ? ((l = u = m), (a = r)) : (u = u.next = m),
          (ae.lanes |= g),
          (Xt |= g));
      }
      c = c.next;
    } while (c !== null && c !== i);
    (u === null ? (a = r) : (u.next = l),
      nt(r, t.memoizedState) || (Ae = !0),
      (t.memoizedState = r),
      (t.baseState = a),
      (t.baseQueue = u),
      (n.lastRenderedState = r));
  }
  if (((e = n.interleaved), e !== null)) {
    o = e;
    do ((i = o.lane), (ae.lanes |= i), (Xt |= i), (o = o.next));
    while (o !== e);
  } else o === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function xi(e) {
  var t = Ge(),
    n = t.queue;
  if (n === null) throw Error(N(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    o = n.pending,
    i = t.memoizedState;
  if (o !== null) {
    n.pending = null;
    var a = (o = o.next);
    do ((i = e(i, a.action)), (a = a.next));
    while (a !== o);
    (nt(i, t.memoizedState) || (Ae = !0),
      (t.memoizedState = i),
      t.baseQueue === null && (t.baseState = i),
      (n.lastRenderedState = i));
  }
  return [i, r];
}
function d2() {}
function f2(e, t) {
  var n = ae,
    r = Ge(),
    o = t(),
    i = !nt(r.memoizedState, o);
  if (
    (i && ((r.memoizedState = o), (Ae = !0)),
    (r = r.queue),
    ia(h2.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || i || (he !== null && he.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      xr(9, m2.bind(null, n, r, o, t), void 0, null),
      ve === null)
    )
      throw Error(N(349));
    Zt & 30 || p2(n, t, o);
  }
  return o;
}
function p2(e, t, n) {
  ((e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = ae.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (ae.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
}
function m2(e, t, n, r) {
  ((t.value = n), (t.getSnapshot = r), v2(t) && g2(e));
}
function h2(e, t, n) {
  return n(function () {
    v2(t) && g2(e);
  });
}
function v2(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !nt(e, n);
  } catch {
    return !0;
  }
}
function g2(e) {
  var t = gt(e, 1);
  t !== null && tt(t, e, 1, -1);
}
function dl(e) {
  var t = it();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: wr,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = x0.bind(null, ae, e)),
    [t.memoizedState, e]
  );
}
function xr(e, t, n, r) {
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
function y2() {
  return Ge().memoizedState;
}
function oo(e, t, n, r) {
  var o = it();
  ((ae.flags |= e),
    (o.memoizedState = xr(1 | t, n, void 0, r === void 0 ? null : r)));
}
function Ho(e, t, n, r) {
  var o = Ge();
  r = r === void 0 ? null : r;
  var i = void 0;
  if (pe !== null) {
    var a = pe.memoizedState;
    if (((i = a.destroy), r !== null && na(r, a.deps))) {
      o.memoizedState = xr(t, n, i, r);
      return;
    }
  }
  ((ae.flags |= e), (o.memoizedState = xr(1 | t, n, i, r)));
}
function fl(e, t) {
  return oo(8390656, 8, e, t);
}
function ia(e, t) {
  return Ho(2048, 8, e, t);
}
function w2(e, t) {
  return Ho(4, 2, e, t);
}
function x2(e, t) {
  return Ho(4, 4, e, t);
}
function S2(e, t) {
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
function k2(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null),
    Ho(4, 4, S2.bind(null, t, e), n)
  );
}
function aa() {}
function C2(e, t) {
  var n = Ge();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && na(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function b2(e, t) {
  var n = Ge();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && na(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function z2(e, t, n) {
  return Zt & 21
    ? (nt(n, t) || ((n = js()), (ae.lanes |= n), (Xt |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (Ae = !0)), (e.memoizedState = n));
}
function y0(e, t) {
  var n = q;
  ((q = n !== 0 && 4 > n ? n : 4), e(!0));
  var r = yi.transition;
  yi.transition = {};
  try {
    (e(!1), t());
  } finally {
    ((q = n), (yi.transition = r));
  }
}
function T2() {
  return Ge().memoizedState;
}
function w0(e, t, n) {
  var r = Pt(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    E2(e))
  )
    M2(t, n);
  else if (((n = s2(e, t, n, r)), n !== null)) {
    var o = Te();
    (tt(n, e, r, o), N2(n, t, r));
  }
}
function x0(e, t, n) {
  var r = Pt(e),
    o = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (E2(e)) M2(t, o);
  else {
    var i = e.alternate;
    if (
      e.lanes === 0 &&
      (i === null || i.lanes === 0) &&
      ((i = t.lastRenderedReducer), i !== null)
    )
      try {
        var a = t.lastRenderedState,
          l = i(a, n);
        if (((o.hasEagerState = !0), (o.eagerState = l), nt(l, a))) {
          var u = t.interleaved;
          (u === null
            ? ((o.next = o), X1(t))
            : ((o.next = u.next), (u.next = o)),
            (t.interleaved = o));
          return;
        }
      } catch {
      } finally {
      }
    ((n = s2(e, t, o, r)),
      n !== null && ((o = Te()), tt(n, e, r, o), N2(n, t, r)));
  }
}
function E2(e) {
  var t = e.alternate;
  return e === ae || (t !== null && t === ae);
}
function M2(e, t) {
  tr = Mo = !0;
  var n = e.pending;
  (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t));
}
function N2(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    ((r &= e.pendingLanes), (n |= r), (t.lanes = n), R1(e, n));
  }
}
var No = {
    readContext: We,
    useCallback: Se,
    useContext: Se,
    useEffect: Se,
    useImperativeHandle: Se,
    useInsertionEffect: Se,
    useLayoutEffect: Se,
    useMemo: Se,
    useReducer: Se,
    useRef: Se,
    useState: Se,
    useDebugValue: Se,
    useDeferredValue: Se,
    useTransition: Se,
    useMutableSource: Se,
    useSyncExternalStore: Se,
    useId: Se,
    unstable_isNewReconciler: !1,
  },
  S0 = {
    readContext: We,
    useCallback: function (e, t) {
      return ((it().memoizedState = [e, t === void 0 ? null : t]), e);
    },
    useContext: We,
    useEffect: fl,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        oo(4194308, 4, S2.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return oo(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return oo(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = it();
      return (
        (t = t === void 0 ? null : t),
        (e = e()),
        (n.memoizedState = [e, t]),
        e
      );
    },
    useReducer: function (e, t, n) {
      var r = it();
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
        (e = e.dispatch = w0.bind(null, ae, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = it();
      return ((e = { current: e }), (t.memoizedState = e));
    },
    useState: dl,
    useDebugValue: aa,
    useDeferredValue: function (e) {
      return (it().memoizedState = e);
    },
    useTransition: function () {
      var e = dl(!1),
        t = e[0];
      return ((e = y0.bind(null, e[1])), (it().memoizedState = e), [t, e]);
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = ae,
        o = it();
      if (oe) {
        if (n === void 0) throw Error(N(407));
        n = n();
      } else {
        if (((n = t()), ve === null)) throw Error(N(349));
        Zt & 30 || p2(r, t, n);
      }
      o.memoizedState = n;
      var i = { value: n, getSnapshot: t };
      return (
        (o.queue = i),
        fl(h2.bind(null, r, i, e), [e]),
        (r.flags |= 2048),
        xr(9, m2.bind(null, r, i, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = it(),
        t = ve.identifierPrefix;
      if (oe) {
        var n = pt,
          r = ft;
        ((n = (r & ~(1 << (32 - et(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = yr++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":"));
      } else ((n = g0++), (t = ":" + t + "r" + n.toString(32) + ":"));
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  k0 = {
    readContext: We,
    useCallback: C2,
    useContext: We,
    useEffect: ia,
    useImperativeHandle: k2,
    useInsertionEffect: w2,
    useLayoutEffect: x2,
    useMemo: b2,
    useReducer: wi,
    useRef: y2,
    useState: function () {
      return wi(wr);
    },
    useDebugValue: aa,
    useDeferredValue: function (e) {
      var t = Ge();
      return z2(t, pe.memoizedState, e);
    },
    useTransition: function () {
      var e = wi(wr)[0],
        t = Ge().memoizedState;
      return [e, t];
    },
    useMutableSource: d2,
    useSyncExternalStore: f2,
    useId: T2,
    unstable_isNewReconciler: !1,
  },
  C0 = {
    readContext: We,
    useCallback: C2,
    useContext: We,
    useEffect: ia,
    useImperativeHandle: k2,
    useInsertionEffect: w2,
    useLayoutEffect: x2,
    useMemo: b2,
    useReducer: xi,
    useRef: y2,
    useState: function () {
      return xi(wr);
    },
    useDebugValue: aa,
    useDeferredValue: function (e) {
      var t = Ge();
      return pe === null ? (t.memoizedState = e) : z2(t, pe.memoizedState, e);
    },
    useTransition: function () {
      var e = xi(wr)[0],
        t = Ge().memoizedState;
      return [e, t];
    },
    useMutableSource: d2,
    useSyncExternalStore: f2,
    useId: T2,
    unstable_isNewReconciler: !1,
  };
function Xe(e, t) {
  if (e && e.defaultProps) {
    ((t = le({}, t)), (e = e.defaultProps));
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function o1(e, t, n, r) {
  ((t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : le({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n));
}
var Uo = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? en(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = Te(),
      o = Pt(e),
      i = mt(r, o);
    ((i.payload = t),
      n != null && (i.callback = n),
      (t = At(e, i, o)),
      t !== null && (tt(t, e, o, r), no(t, e, o)));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = Te(),
      o = Pt(e),
      i = mt(r, o);
    ((i.tag = 1),
      (i.payload = t),
      n != null && (i.callback = n),
      (t = At(e, i, o)),
      t !== null && (tt(t, e, o, r), no(t, e, o)));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = Te(),
      r = Pt(e),
      o = mt(n, r);
    ((o.tag = 2),
      t != null && (o.callback = t),
      (t = At(e, o, r)),
      t !== null && (tt(t, e, r, n), no(t, e, r)));
  },
};
function pl(e, t, n, r, o, i, a) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, i, a)
      : t.prototype && t.prototype.isPureReactComponent
        ? !fr(n, r) || !fr(o, i)
        : !0
  );
}
function j2(e, t, n) {
  var r = !1,
    o = It,
    i = t.contextType;
  return (
    typeof i == "object" && i !== null
      ? (i = We(i))
      : ((o = Pe(t) ? Yt : be.current),
        (r = t.contextTypes),
        (i = (r = r != null) ? zn(e, o) : It)),
    (t = new t(n, i)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = Uo),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = o),
      (e.__reactInternalMemoizedMaskedChildContext = i)),
    t
  );
}
function ml(e, t, n, r) {
  ((e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && Uo.enqueueReplaceState(t, t.state, null));
}
function i1(e, t, n, r) {
  var o = e.stateNode;
  ((o.props = n), (o.state = e.memoizedState), (o.refs = {}), J1(e));
  var i = t.contextType;
  (typeof i == "object" && i !== null
    ? (o.context = We(i))
    : ((i = Pe(t) ? Yt : be.current), (o.context = zn(e, i))),
    (o.state = e.memoizedState),
    (i = t.getDerivedStateFromProps),
    typeof i == "function" && (o1(e, t, i, n), (o.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof o.getSnapshotBeforeUpdate == "function" ||
      (typeof o.UNSAFE_componentWillMount != "function" &&
        typeof o.componentWillMount != "function") ||
      ((t = o.state),
      typeof o.componentWillMount == "function" && o.componentWillMount(),
      typeof o.UNSAFE_componentWillMount == "function" &&
        o.UNSAFE_componentWillMount(),
      t !== o.state && Uo.enqueueReplaceState(o, o.state, null),
      To(e, n, o, r),
      (o.state = e.memoizedState)),
    typeof o.componentDidMount == "function" && (e.flags |= 4194308));
}
function Nn(e, t) {
  try {
    var n = "",
      r = t;
    do ((n += Xu(r)), (r = r.return));
    while (r);
    var o = n;
  } catch (i) {
    o =
      `
Error generating stack: ` +
      i.message +
      `
` +
      i.stack;
  }
  return { value: e, source: t, stack: o, digest: null };
}
function Si(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function a1(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var b0 = typeof WeakMap == "function" ? WeakMap : Map;
function A2(e, t, n) {
  ((n = mt(-1, n)), (n.tag = 3), (n.payload = { element: null }));
  var r = t.value;
  return (
    (n.callback = function () {
      (Ao || ((Ao = !0), (v1 = r)), a1(e, t));
    }),
    n
  );
}
function L2(e, t, n) {
  ((n = mt(-1, n)), (n.tag = 3));
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var o = t.value;
    ((n.payload = function () {
      return r(o);
    }),
      (n.callback = function () {
        a1(e, t);
      }));
  }
  var i = e.stateNode;
  return (
    i !== null &&
      typeof i.componentDidCatch == "function" &&
      (n.callback = function () {
        (a1(e, t),
          typeof r != "function" &&
            (Lt === null ? (Lt = new Set([this])) : Lt.add(this)));
        var a = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: a !== null ? a : "",
        });
      }),
    n
  );
}
function hl(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new b0();
    var o = new Set();
    r.set(t, o);
  } else ((o = r.get(t)), o === void 0 && ((o = new Set()), r.set(t, o)));
  o.has(n) || (o.add(n), (e = O0.bind(null, e, t, n)), t.then(e, e));
}
function vl(e) {
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
function gl(e, t, n, r, o) {
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
              : ((t = mt(-1, 1)), (t.tag = 2), At(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var z0 = wt.ReactCurrentOwner,
  Ae = !1;
function ze(e, t, n, r) {
  t.child = e === null ? l2(t, null, n, r) : En(t, e.child, n, r);
}
function yl(e, t, n, r, o) {
  n = n.render;
  var i = t.ref;
  return (
    Sn(t, o),
    (r = ra(e, t, n, r, i, o)),
    (n = oa()),
    e !== null && !Ae
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~o),
        yt(e, t, o))
      : (oe && n && W1(t), (t.flags |= 1), ze(e, t, r, o), t.child)
  );
}
function wl(e, t, n, r, o) {
  if (e === null) {
    var i = n.type;
    return typeof i == "function" &&
      !ma(i) &&
      i.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = i), P2(e, t, i, r, o))
      : ((e = so(n.type, null, r, t, t.mode, o)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((i = e.child), !(e.lanes & o))) {
    var a = i.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : fr), n(a, r) && e.ref === t.ref)
    )
      return yt(e, t, o);
  }
  return (
    (t.flags |= 1),
    (e = _t(i, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function P2(e, t, n, r, o) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (fr(i, r) && e.ref === t.ref)
      if (((Ae = !1), (t.pendingProps = r = i), (e.lanes & o) !== 0))
        e.flags & 131072 && (Ae = !0);
      else return ((t.lanes = e.lanes), yt(e, t, o));
  }
  return l1(e, t, n, r, o);
}
function _2(e, t, n) {
  var r = t.pendingProps,
    o = r.children,
    i = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        ee(vn, De),
        (De |= n));
    else {
      if (!(n & 1073741824))
        return (
          (e = i !== null ? i.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          ee(vn, De),
          (De |= e),
          null
        );
      ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = i !== null ? i.baseLanes : n),
        ee(vn, De),
        (De |= r));
    }
  else
    (i !== null ? ((r = i.baseLanes | n), (t.memoizedState = null)) : (r = n),
      ee(vn, De),
      (De |= r));
  return (ze(e, t, o, n), t.child);
}
function D2(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function l1(e, t, n, r, o) {
  var i = Pe(n) ? Yt : be.current;
  return (
    (i = zn(t, i)),
    Sn(t, o),
    (n = ra(e, t, n, r, i, o)),
    (r = oa()),
    e !== null && !Ae
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~o),
        yt(e, t, o))
      : (oe && r && W1(t), (t.flags |= 1), ze(e, t, n, o), t.child)
  );
}
function xl(e, t, n, r, o) {
  if (Pe(n)) {
    var i = !0;
    So(t);
  } else i = !1;
  if ((Sn(t, o), t.stateNode === null))
    (io(e, t), j2(t, n, r), i1(t, n, r, o), (r = !0));
  else if (e === null) {
    var a = t.stateNode,
      l = t.memoizedProps;
    a.props = l;
    var u = a.context,
      c = n.contextType;
    typeof c == "object" && c !== null
      ? (c = We(c))
      : ((c = Pe(n) ? Yt : be.current), (c = zn(t, c)));
    var g = n.getDerivedStateFromProps,
      m =
        typeof g == "function" ||
        typeof a.getSnapshotBeforeUpdate == "function";
    (m ||
      (typeof a.UNSAFE_componentWillReceiveProps != "function" &&
        typeof a.componentWillReceiveProps != "function") ||
      ((l !== r || u !== c) && ml(t, a, r, c)),
      (kt = !1));
    var p = t.memoizedState;
    ((a.state = p),
      To(t, r, a, o),
      (u = t.memoizedState),
      l !== r || p !== u || Le.current || kt
        ? (typeof g == "function" && (o1(t, n, g, r), (u = t.memoizedState)),
          (l = kt || pl(t, n, l, r, p, u, c))
            ? (m ||
                (typeof a.UNSAFE_componentWillMount != "function" &&
                  typeof a.componentWillMount != "function") ||
                (typeof a.componentWillMount == "function" &&
                  a.componentWillMount(),
                typeof a.UNSAFE_componentWillMount == "function" &&
                  a.UNSAFE_componentWillMount()),
              typeof a.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof a.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = u)),
          (a.props = r),
          (a.state = u),
          (a.context = c),
          (r = l))
        : (typeof a.componentDidMount == "function" && (t.flags |= 4194308),
          (r = !1)));
  } else {
    ((a = t.stateNode),
      u2(e, t),
      (l = t.memoizedProps),
      (c = t.type === t.elementType ? l : Xe(t.type, l)),
      (a.props = c),
      (m = t.pendingProps),
      (p = a.context),
      (u = n.contextType),
      typeof u == "object" && u !== null
        ? (u = We(u))
        : ((u = Pe(n) ? Yt : be.current), (u = zn(t, u))));
    var y = n.getDerivedStateFromProps;
    ((g =
      typeof y == "function" ||
      typeof a.getSnapshotBeforeUpdate == "function") ||
      (typeof a.UNSAFE_componentWillReceiveProps != "function" &&
        typeof a.componentWillReceiveProps != "function") ||
      ((l !== m || p !== u) && ml(t, a, r, u)),
      (kt = !1),
      (p = t.memoizedState),
      (a.state = p),
      To(t, r, a, o));
    var C = t.memoizedState;
    l !== m || p !== C || Le.current || kt
      ? (typeof y == "function" && (o1(t, n, y, r), (C = t.memoizedState)),
        (c = kt || pl(t, n, c, r, p, C, u) || !1)
          ? (g ||
              (typeof a.UNSAFE_componentWillUpdate != "function" &&
                typeof a.componentWillUpdate != "function") ||
              (typeof a.componentWillUpdate == "function" &&
                a.componentWillUpdate(r, C, u),
              typeof a.UNSAFE_componentWillUpdate == "function" &&
                a.UNSAFE_componentWillUpdate(r, C, u)),
            typeof a.componentDidUpdate == "function" && (t.flags |= 4),
            typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof a.componentDidUpdate != "function" ||
              (l === e.memoizedProps && p === e.memoizedState) ||
              (t.flags |= 4),
            typeof a.getSnapshotBeforeUpdate != "function" ||
              (l === e.memoizedProps && p === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = C)),
        (a.props = r),
        (a.state = C),
        (a.context = u),
        (r = c))
      : (typeof a.componentDidUpdate != "function" ||
          (l === e.memoizedProps && p === e.memoizedState) ||
          (t.flags |= 4),
        typeof a.getSnapshotBeforeUpdate != "function" ||
          (l === e.memoizedProps && p === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return s1(e, t, n, r, i, o);
}
function s1(e, t, n, r, o, i) {
  D2(e, t);
  var a = (t.flags & 128) !== 0;
  if (!r && !a) return (o && il(t, n, !1), yt(e, t, i));
  ((r = t.stateNode), (z0.current = t));
  var l =
    a && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && a
      ? ((t.child = En(t, e.child, null, i)), (t.child = En(t, null, l, i)))
      : ze(e, t, l, i),
    (t.memoizedState = r.state),
    o && il(t, n, !0),
    t.child
  );
}
function I2(e) {
  var t = e.stateNode;
  (t.pendingContext
    ? ol(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && ol(e, t.context, !1),
    q1(e, t.containerInfo));
}
function Sl(e, t, n, r, o) {
  return (Tn(), Q1(o), (t.flags |= 256), ze(e, t, n, r), t.child);
}
var u1 = { dehydrated: null, treeContext: null, retryLane: 0 };
function c1(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function R2(e, t, n) {
  var r = t.pendingProps,
    o = ie.current,
    i = !1,
    a = (t.flags & 128) !== 0,
    l;
  if (
    ((l = a) ||
      (l = e !== null && e.memoizedState === null ? !1 : (o & 2) !== 0),
    l
      ? ((i = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (o |= 1),
    ee(ie, o & 1),
    e === null)
  )
    return (
      n1(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === "$!"
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((a = r.children),
          (e = r.fallback),
          i
            ? ((r = t.mode),
              (i = t.child),
              (a = { mode: "hidden", children: a }),
              !(r & 1) && i !== null
                ? ((i.childLanes = 0), (i.pendingProps = a))
                : (i = Qo(a, r, 0, null)),
              (e = Qt(e, r, n, null)),
              (i.return = t),
              (e.return = t),
              (i.sibling = e),
              (t.child = i),
              (t.child.memoizedState = c1(n)),
              (t.memoizedState = u1),
              e)
            : la(t, a))
    );
  if (((o = e.memoizedState), o !== null && ((l = o.dehydrated), l !== null)))
    return T0(e, t, a, r, l, o, n);
  if (i) {
    ((i = r.fallback), (a = t.mode), (o = e.child), (l = o.sibling));
    var u = { mode: "hidden", children: r.children };
    return (
      !(a & 1) && t.child !== o
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = u),
          (t.deletions = null))
        : ((r = _t(o, u)), (r.subtreeFlags = o.subtreeFlags & 14680064)),
      l !== null ? (i = _t(l, i)) : ((i = Qt(i, a, n, null)), (i.flags |= 2)),
      (i.return = t),
      (r.return = t),
      (r.sibling = i),
      (t.child = r),
      (r = i),
      (i = t.child),
      (a = e.child.memoizedState),
      (a =
        a === null
          ? c1(n)
          : {
              baseLanes: a.baseLanes | n,
              cachePool: null,
              transitions: a.transitions,
            }),
      (i.memoizedState = a),
      (i.childLanes = e.childLanes & ~n),
      (t.memoizedState = u1),
      r
    );
  }
  return (
    (i = e.child),
    (e = i.sibling),
    (r = _t(i, { mode: "visible", children: r.children })),
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
function la(e, t) {
  return (
    (t = Qo({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function Vr(e, t, n, r) {
  return (
    r !== null && Q1(r),
    En(t, e.child, null, n),
    (e = la(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function T0(e, t, n, r, o, i, a) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = Si(Error(N(422)))), Vr(e, t, a, r))
      : t.memoizedState !== null
        ? ((t.child = e.child), (t.flags |= 128), null)
        : ((i = r.fallback),
          (o = t.mode),
          (r = Qo({ mode: "visible", children: r.children }, o, 0, null)),
          (i = Qt(i, o, a, null)),
          (i.flags |= 2),
          (r.return = t),
          (i.return = t),
          (r.sibling = i),
          (t.child = r),
          t.mode & 1 && En(t, e.child, null, a),
          (t.child.memoizedState = c1(a)),
          (t.memoizedState = u1),
          i);
  if (!(t.mode & 1)) return Vr(e, t, a, null);
  if (o.data === "$!") {
    if (((r = o.nextSibling && o.nextSibling.dataset), r)) var l = r.dgst;
    return (
      (r = l),
      (i = Error(N(419))),
      (r = Si(i, r, void 0)),
      Vr(e, t, a, r)
    );
  }
  if (((l = (a & e.childLanes) !== 0), Ae || l)) {
    if (((r = ve), r !== null)) {
      switch (a & -a) {
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
      ((o = o & (r.suspendedLanes | a) ? 0 : o),
        o !== 0 &&
          o !== i.retryLane &&
          ((i.retryLane = o), gt(e, o), tt(r, e, o, -1)));
    }
    return (pa(), (r = Si(Error(N(421)))), Vr(e, t, a, r));
  }
  return o.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = B0.bind(null, e)),
      (o._reactRetry = t),
      null)
    : ((e = i.treeContext),
      (Ie = jt(o.nextSibling)),
      (Re = t),
      (oe = !0),
      (qe = null),
      e !== null &&
        (($e[Ve++] = ft),
        ($e[Ve++] = pt),
        ($e[Ve++] = Kt),
        (ft = e.id),
        (pt = e.overflow),
        (Kt = t)),
      (t = la(t, r.children)),
      (t.flags |= 4096),
      t);
}
function kl(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  (r !== null && (r.lanes |= t), r1(e.return, t, n));
}
function ki(e, t, n, r, o) {
  var i = e.memoizedState;
  i === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: o,
      })
    : ((i.isBackwards = t),
      (i.rendering = null),
      (i.renderingStartTime = 0),
      (i.last = r),
      (i.tail = n),
      (i.tailMode = o));
}
function O2(e, t, n) {
  var r = t.pendingProps,
    o = r.revealOrder,
    i = r.tail;
  if ((ze(e, t, r.children, n), (r = ie.current), r & 2))
    ((r = (r & 1) | 2), (t.flags |= 128));
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null;) {
        if (e.tag === 13) e.memoizedState !== null && kl(e, n, t);
        else if (e.tag === 19) kl(e, n, t);
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
  if ((ee(ie, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (o) {
      case "forwards":
        for (n = t.child, o = null; n !== null;)
          ((e = n.alternate),
            e !== null && Eo(e) === null && (o = n),
            (n = n.sibling));
        ((n = o),
          n === null
            ? ((o = t.child), (t.child = null))
            : ((o = n.sibling), (n.sibling = null)),
          ki(t, !1, o, n, i));
        break;
      case "backwards":
        for (n = null, o = t.child, t.child = null; o !== null;) {
          if (((e = o.alternate), e !== null && Eo(e) === null)) {
            t.child = o;
            break;
          }
          ((e = o.sibling), (o.sibling = n), (n = o), (o = e));
        }
        ki(t, !0, n, null, i);
        break;
      case "together":
        ki(t, !1, null, null, void 0);
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
function yt(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (Xt |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(N(153));
  if (t.child !== null) {
    for (
      e = t.child, n = _t(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;
    )
      ((e = e.sibling),
        (n = n.sibling = _t(e, e.pendingProps)),
        (n.return = t));
    n.sibling = null;
  }
  return t.child;
}
function E0(e, t, n) {
  switch (t.tag) {
    case 3:
      (I2(t), Tn());
      break;
    case 5:
      c2(t);
      break;
    case 1:
      Pe(t.type) && So(t);
      break;
    case 4:
      q1(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        o = t.memoizedProps.value;
      (ee(bo, r._currentValue), (r._currentValue = o));
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (ee(ie, ie.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
            ? R2(e, t, n)
            : (ee(ie, ie.current & 1),
              (e = yt(e, t, n)),
              e !== null ? e.sibling : null);
      ee(ie, ie.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return O2(e, t, n);
        t.flags |= 128;
      }
      if (
        ((o = t.memoizedState),
        o !== null &&
          ((o.rendering = null), (o.tail = null), (o.lastEffect = null)),
        ee(ie, ie.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return ((t.lanes = 0), _2(e, t, n));
  }
  return yt(e, t, n);
}
var B2, d1, F2, $2;
B2 = function (e, t) {
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
d1 = function () {};
F2 = function (e, t, n, r) {
  var o = e.memoizedProps;
  if (o !== r) {
    ((e = t.stateNode), Wt(st.current));
    var i = null;
    switch (n) {
      case "input":
        ((o = Pi(e, o)), (r = Pi(e, r)), (i = []));
        break;
      case "select":
        ((o = le({}, o, { value: void 0 })),
          (r = le({}, r, { value: void 0 })),
          (i = []));
        break;
      case "textarea":
        ((o = Ii(e, o)), (r = Ii(e, r)), (i = []));
        break;
      default:
        typeof o.onClick != "function" &&
          typeof r.onClick == "function" &&
          (e.onclick = wo);
    }
    Oi(n, r);
    var a;
    n = null;
    for (c in o)
      if (!r.hasOwnProperty(c) && o.hasOwnProperty(c) && o[c] != null)
        if (c === "style") {
          var l = o[c];
          for (a in l) l.hasOwnProperty(a) && (n || (n = {}), (n[a] = ""));
        } else
          c !== "dangerouslySetInnerHTML" &&
            c !== "children" &&
            c !== "suppressContentEditableWarning" &&
            c !== "suppressHydrationWarning" &&
            c !== "autoFocus" &&
            (ir.hasOwnProperty(c)
              ? i || (i = [])
              : (i = i || []).push(c, null));
    for (c in r) {
      var u = r[c];
      if (
        ((l = o != null ? o[c] : void 0),
        r.hasOwnProperty(c) && u !== l && (u != null || l != null))
      )
        if (c === "style")
          if (l) {
            for (a in l)
              !l.hasOwnProperty(a) ||
                (u && u.hasOwnProperty(a)) ||
                (n || (n = {}), (n[a] = ""));
            for (a in u)
              u.hasOwnProperty(a) &&
                l[a] !== u[a] &&
                (n || (n = {}), (n[a] = u[a]));
          } else (n || (i || (i = []), i.push(c, n)), (n = u));
        else
          c === "dangerouslySetInnerHTML"
            ? ((u = u ? u.__html : void 0),
              (l = l ? l.__html : void 0),
              u != null && l !== u && (i = i || []).push(c, u))
            : c === "children"
              ? (typeof u != "string" && typeof u != "number") ||
                (i = i || []).push(c, "" + u)
              : c !== "suppressContentEditableWarning" &&
                c !== "suppressHydrationWarning" &&
                (ir.hasOwnProperty(c)
                  ? (u != null && c === "onScroll" && ne("scroll", e),
                    i || l === u || (i = []))
                  : (i = i || []).push(c, u));
    }
    n && (i = i || []).push("style", n);
    var c = i;
    (t.updateQueue = c) && (t.flags |= 4);
  }
};
$2 = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function $n(e, t) {
  if (!oe)
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
function M0(e, t, n) {
  var r = t.pendingProps;
  switch ((G1(t), t.tag)) {
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
      return (Pe(t.type) && xo(), ke(t), null);
    case 3:
      return (
        (r = t.stateNode),
        Mn(),
        re(Le),
        re(be),
        ta(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (Fr(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), qe !== null && (w1(qe), (qe = null)))),
        d1(e, t),
        ke(t),
        null
      );
    case 5:
      ea(t);
      var o = Wt(gr.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        (F2(e, t, n, r, o),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152)));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(N(166));
          return (ke(t), null);
        }
        if (((e = Wt(st.current)), Fr(t))) {
          ((r = t.stateNode), (n = t.type));
          var i = t.memoizedProps;
          switch (((r[at] = t), (r[hr] = i), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              (ne("cancel", r), ne("close", r));
              break;
            case "iframe":
            case "object":
            case "embed":
              ne("load", r);
              break;
            case "video":
            case "audio":
              for (o = 0; o < Kn.length; o++) ne(Kn[o], r);
              break;
            case "source":
              ne("error", r);
              break;
            case "img":
            case "image":
            case "link":
              (ne("error", r), ne("load", r));
              break;
            case "details":
              ne("toggle", r);
              break;
            case "input":
              (Aa(r, i), ne("invalid", r));
              break;
            case "select":
              ((r._wrapperState = { wasMultiple: !!i.multiple }),
                ne("invalid", r));
              break;
            case "textarea":
              (Pa(r, i), ne("invalid", r));
          }
          (Oi(n, i), (o = null));
          for (var a in i)
            if (i.hasOwnProperty(a)) {
              var l = i[a];
              a === "children"
                ? typeof l == "string"
                  ? r.textContent !== l &&
                    (i.suppressHydrationWarning !== !0 &&
                      Br(r.textContent, l, e),
                    (o = ["children", l]))
                  : typeof l == "number" &&
                    r.textContent !== "" + l &&
                    (i.suppressHydrationWarning !== !0 &&
                      Br(r.textContent, l, e),
                    (o = ["children", "" + l]))
                : ir.hasOwnProperty(a) &&
                  l != null &&
                  a === "onScroll" &&
                  ne("scroll", r);
            }
          switch (n) {
            case "input":
              (Ar(r), La(r, i, !0));
              break;
            case "textarea":
              (Ar(r), _a(r));
              break;
            case "select":
            case "option":
              break;
            default:
              typeof i.onClick == "function" && (r.onclick = wo);
          }
          ((r = o), (t.updateQueue = r), r !== null && (t.flags |= 4));
        } else {
          ((a = o.nodeType === 9 ? o : o.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = hs(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = a.createElement("div")),
                  (e.innerHTML = "<script><\/script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                  ? (e = a.createElement(n, { is: r.is }))
                  : ((e = a.createElement(n)),
                    n === "select" &&
                      ((a = e),
                      r.multiple
                        ? (a.multiple = !0)
                        : r.size && (a.size = r.size)))
              : (e = a.createElementNS(e, n)),
            (e[at] = t),
            (e[hr] = r),
            B2(e, t, !1, !1),
            (t.stateNode = e));
          e: {
            switch (((a = Bi(n, r)), n)) {
              case "dialog":
                (ne("cancel", e), ne("close", e), (o = r));
                break;
              case "iframe":
              case "object":
              case "embed":
                (ne("load", e), (o = r));
                break;
              case "video":
              case "audio":
                for (o = 0; o < Kn.length; o++) ne(Kn[o], e);
                o = r;
                break;
              case "source":
                (ne("error", e), (o = r));
                break;
              case "img":
              case "image":
              case "link":
                (ne("error", e), ne("load", e), (o = r));
                break;
              case "details":
                (ne("toggle", e), (o = r));
                break;
              case "input":
                (Aa(e, r), (o = Pi(e, r)), ne("invalid", e));
                break;
              case "option":
                o = r;
                break;
              case "select":
                ((e._wrapperState = { wasMultiple: !!r.multiple }),
                  (o = le({}, r, { value: void 0 })),
                  ne("invalid", e));
                break;
              case "textarea":
                (Pa(e, r), (o = Ii(e, r)), ne("invalid", e));
                break;
              default:
                o = r;
            }
            (Oi(n, o), (l = o));
            for (i in l)
              if (l.hasOwnProperty(i)) {
                var u = l[i];
                i === "style"
                  ? ys(e, u)
                  : i === "dangerouslySetInnerHTML"
                    ? ((u = u ? u.__html : void 0), u != null && vs(e, u))
                    : i === "children"
                      ? typeof u == "string"
                        ? (n !== "textarea" || u !== "") && ar(e, u)
                        : typeof u == "number" && ar(e, "" + u)
                      : i !== "suppressContentEditableWarning" &&
                        i !== "suppressHydrationWarning" &&
                        i !== "autoFocus" &&
                        (ir.hasOwnProperty(i)
                          ? u != null && i === "onScroll" && ne("scroll", e)
                          : u != null && A1(e, i, u, a));
              }
            switch (n) {
              case "input":
                (Ar(e), La(e, r, !1));
                break;
              case "textarea":
                (Ar(e), _a(e));
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + Dt(r.value));
                break;
              case "select":
                ((e.multiple = !!r.multiple),
                  (i = r.value),
                  i != null
                    ? gn(e, !!r.multiple, i, !1)
                    : r.defaultValue != null &&
                      gn(e, !!r.multiple, r.defaultValue, !0));
                break;
              default:
                typeof o.onClick == "function" && (e.onclick = wo);
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
      if (e && t.stateNode != null) $2(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(N(166));
        if (((n = Wt(gr.current)), Wt(st.current), Fr(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[at] = t),
            (i = r.nodeValue !== n) && ((e = Re), e !== null))
          )
            switch (e.tag) {
              case 3:
                Br(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  Br(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          i && (t.flags |= 4);
        } else
          ((r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[at] = t),
            (t.stateNode = r));
      }
      return (ke(t), null);
    case 13:
      if (
        (re(ie),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (oe && Ie !== null && t.mode & 1 && !(t.flags & 128))
          (i2(), Tn(), (t.flags |= 98560), (i = !1));
        else if (((i = Fr(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!i) throw Error(N(318));
            if (
              ((i = t.memoizedState),
              (i = i !== null ? i.dehydrated : null),
              !i)
            )
              throw Error(N(317));
            i[at] = t;
          } else
            (Tn(),
              !(t.flags & 128) && (t.memoizedState = null),
              (t.flags |= 4));
          (ke(t), (i = !1));
        } else (qe !== null && (w1(qe), (qe = null)), (i = !0));
        if (!i) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || ie.current & 1 ? me === 0 && (me = 3) : pa())),
          t.updateQueue !== null && (t.flags |= 4),
          ke(t),
          null);
    case 4:
      return (
        Mn(),
        d1(e, t),
        e === null && pr(t.stateNode.containerInfo),
        ke(t),
        null
      );
    case 10:
      return (Z1(t.type._context), ke(t), null);
    case 17:
      return (Pe(t.type) && xo(), ke(t), null);
    case 19:
      if ((re(ie), (i = t.memoizedState), i === null)) return (ke(t), null);
      if (((r = (t.flags & 128) !== 0), (a = i.rendering), a === null))
        if (r) $n(i, !1);
        else {
          if (me !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null;) {
              if (((a = Eo(e)), a !== null)) {
                for (
                  t.flags |= 128,
                    $n(i, !1),
                    r = a.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;
                )
                  ((i = n),
                    (e = r),
                    (i.flags &= 14680066),
                    (a = i.alternate),
                    a === null
                      ? ((i.childLanes = 0),
                        (i.lanes = e),
                        (i.child = null),
                        (i.subtreeFlags = 0),
                        (i.memoizedProps = null),
                        (i.memoizedState = null),
                        (i.updateQueue = null),
                        (i.dependencies = null),
                        (i.stateNode = null))
                      : ((i.childLanes = a.childLanes),
                        (i.lanes = a.lanes),
                        (i.child = a.child),
                        (i.subtreeFlags = 0),
                        (i.deletions = null),
                        (i.memoizedProps = a.memoizedProps),
                        (i.memoizedState = a.memoizedState),
                        (i.updateQueue = a.updateQueue),
                        (i.type = a.type),
                        (e = a.dependencies),
                        (i.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling));
                return (ee(ie, (ie.current & 1) | 2), t.child);
              }
              e = e.sibling;
            }
          i.tail !== null &&
            de() > jn &&
            ((t.flags |= 128), (r = !0), $n(i, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = Eo(a)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              $n(i, !0),
              i.tail === null && i.tailMode === "hidden" && !a.alternate && !oe)
            )
              return (ke(t), null);
          } else
            2 * de() - i.renderingStartTime > jn &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), $n(i, !1), (t.lanes = 4194304));
        i.isBackwards
          ? ((a.sibling = t.child), (t.child = a))
          : ((n = i.last),
            n !== null ? (n.sibling = a) : (t.child = a),
            (i.last = a));
      }
      return i.tail !== null
        ? ((t = i.tail),
          (i.rendering = t),
          (i.tail = t.sibling),
          (i.renderingStartTime = de()),
          (t.sibling = null),
          (n = ie.current),
          ee(ie, r ? (n & 1) | 2 : n & 1),
          t)
        : (ke(t), null);
    case 22:
    case 23:
      return (
        fa(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? De & 1073741824 && (ke(t), t.subtreeFlags & 6 && (t.flags |= 8192))
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
function N0(e, t) {
  switch ((G1(t), t.tag)) {
    case 1:
      return (
        Pe(t.type) && xo(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        Mn(),
        re(Le),
        re(be),
        ta(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return (ea(t), null);
    case 13:
      if (
        (re(ie), (e = t.memoizedState), e !== null && e.dehydrated !== null)
      ) {
        if (t.alternate === null) throw Error(N(340));
        Tn();
      }
      return (
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return (re(ie), null);
    case 4:
      return (Mn(), null);
    case 10:
      return (Z1(t.type._context), null);
    case 22:
    case 23:
      return (fa(), null);
    case 24:
      return null;
    default:
      return null;
  }
}
var Hr = !1,
  Ce = !1,
  j0 = typeof WeakSet == "function" ? WeakSet : Set,
  I = null;
function hn(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        ce(e, t, r);
      }
    else n.current = null;
}
function f1(e, t, n) {
  try {
    n();
  } catch (r) {
    ce(e, t, r);
  }
}
var Cl = !1;
function A0(e, t) {
  if (((Ki = vo), (e = Gs()), U1(e))) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var o = r.anchorOffset,
            i = r.focusNode;
          r = r.focusOffset;
          try {
            (n.nodeType, i.nodeType);
          } catch {
            n = null;
            break e;
          }
          var a = 0,
            l = -1,
            u = -1,
            c = 0,
            g = 0,
            m = e,
            p = null;
          t: for (;;) {
            for (
              var y;
              m !== n || (o !== 0 && m.nodeType !== 3) || (l = a + o),
                m !== i || (r !== 0 && m.nodeType !== 3) || (u = a + r),
                m.nodeType === 3 && (a += m.nodeValue.length),
                (y = m.firstChild) !== null;
            )
              ((p = m), (m = y));
            for (;;) {
              if (m === e) break t;
              if (
                (p === n && ++c === o && (l = a),
                p === i && ++g === r && (u = a),
                (y = m.nextSibling) !== null)
              )
                break;
              ((m = p), (p = m.parentNode));
            }
            m = y;
          }
          n = l === -1 || u === -1 ? null : { start: l, end: u };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Zi = { focusedElem: e, selectionRange: n }, vo = !1, I = t; I !== null;)
    if (((t = I), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      ((e.return = t), (I = e));
    else
      for (; I !== null;) {
        t = I;
        try {
          var C = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (C !== null) {
                  var S = C.memoizedProps,
                    T = C.memoizedState,
                    d = t.stateNode,
                    f = d.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? S : Xe(t.type, S),
                      T
                    );
                  d.__reactInternalSnapshotBeforeUpdate = f;
                }
                break;
              case 3:
                var h = t.stateNode.containerInfo;
                h.nodeType === 1
                  ? (h.textContent = "")
                  : h.nodeType === 9 &&
                    h.documentElement &&
                    h.removeChild(h.documentElement);
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
          ce(t, t.return, x);
        }
        if (((e = t.sibling), e !== null)) {
          ((e.return = t.return), (I = e));
          break;
        }
        I = t.return;
      }
  return ((C = Cl), (Cl = !1), C);
}
function nr(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var o = (r = r.next);
    do {
      if ((o.tag & e) === e) {
        var i = o.destroy;
        ((o.destroy = void 0), i !== void 0 && f1(t, n, i));
      }
      o = o.next;
    } while (o !== r);
  }
}
function Wo(e, t) {
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
function p1(e) {
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
        (delete t[at], delete t[hr], delete t[qi], delete t[p0], delete t[m0])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null));
}
function H2(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function bl(e) {
  e: for (;;) {
    for (; e.sibling === null;) {
      if (e.return === null || H2(e.return)) return null;
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
function m1(e, t, n) {
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
          n != null || t.onclick !== null || (t.onclick = wo)));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (m1(e, t, n), e = e.sibling; e !== null;)
      (m1(e, t, n), (e = e.sibling));
}
function h1(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (h1(e, t, n), e = e.sibling; e !== null;)
      (h1(e, t, n), (e = e.sibling));
}
var ye = null,
  Je = !1;
function xt(e, t, n) {
  for (n = n.child; n !== null;) (U2(e, t, n), (n = n.sibling));
}
function U2(e, t, n) {
  if (lt && typeof lt.onCommitFiberUnmount == "function")
    try {
      lt.onCommitFiberUnmount(Ro, n);
    } catch {}
  switch (n.tag) {
    case 5:
      Ce || hn(n, t);
    case 6:
      var r = ye,
        o = Je;
      ((ye = null),
        xt(e, t, n),
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
              ? hi(e.parentNode, n)
              : e.nodeType === 1 && hi(e, n),
            cr(e))
          : hi(ye, n.stateNode));
      break;
    case 4:
      ((r = ye),
        (o = Je),
        (ye = n.stateNode.containerInfo),
        (Je = !0),
        xt(e, t, n),
        (ye = r),
        (Je = o));
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !Ce &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        o = r = r.next;
        do {
          var i = o,
            a = i.destroy;
          ((i = i.tag),
            a !== void 0 && (i & 2 || i & 4) && f1(n, t, a),
            (o = o.next));
        } while (o !== r);
      }
      xt(e, t, n);
      break;
    case 1:
      if (
        !Ce &&
        (hn(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          ((r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount());
        } catch (l) {
          ce(n, t, l);
        }
      xt(e, t, n);
      break;
    case 21:
      xt(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((Ce = (r = Ce) || n.memoizedState !== null), xt(e, t, n), (Ce = r))
        : xt(e, t, n);
      break;
    default:
      xt(e, t, n);
  }
}
function zl(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    (n === null && (n = e.stateNode = new j0()),
      t.forEach(function (r) {
        var o = F0.bind(null, e, r);
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
        var i = e,
          a = t,
          l = a;
        e: for (; l !== null;) {
          switch (l.tag) {
            case 5:
              ((ye = l.stateNode), (Je = !1));
              break e;
            case 3:
              ((ye = l.stateNode.containerInfo), (Je = !0));
              break e;
            case 4:
              ((ye = l.stateNode.containerInfo), (Je = !0));
              break e;
          }
          l = l.return;
        }
        if (ye === null) throw Error(N(160));
        (U2(i, a, o), (ye = null), (Je = !1));
        var u = o.alternate;
        (u !== null && (u.return = null), (o.return = null));
      } catch (c) {
        ce(o, t, c);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null;) (W2(t, e), (t = t.sibling));
}
function W2(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((Ke(t, e), ot(e), r & 4)) {
        try {
          (nr(3, e, e.return), Wo(3, e));
        } catch (S) {
          ce(e, e.return, S);
        }
        try {
          nr(5, e, e.return);
        } catch (S) {
          ce(e, e.return, S);
        }
      }
      break;
    case 1:
      (Ke(t, e), ot(e), r & 512 && n !== null && hn(n, n.return));
      break;
    case 5:
      if (
        (Ke(t, e),
        ot(e),
        r & 512 && n !== null && hn(n, n.return),
        e.flags & 32)
      ) {
        var o = e.stateNode;
        try {
          ar(o, "");
        } catch (S) {
          ce(e, e.return, S);
        }
      }
      if (r & 4 && ((o = e.stateNode), o != null)) {
        var i = e.memoizedProps,
          a = n !== null ? n.memoizedProps : i,
          l = e.type,
          u = e.updateQueue;
        if (((e.updateQueue = null), u !== null))
          try {
            (l === "input" && i.type === "radio" && i.name != null && ps(o, i),
              Bi(l, a));
            var c = Bi(l, i);
            for (a = 0; a < u.length; a += 2) {
              var g = u[a],
                m = u[a + 1];
              g === "style"
                ? ys(o, m)
                : g === "dangerouslySetInnerHTML"
                  ? vs(o, m)
                  : g === "children"
                    ? ar(o, m)
                    : A1(o, g, m, c);
            }
            switch (l) {
              case "input":
                _i(o, i);
                break;
              case "textarea":
                ms(o, i);
                break;
              case "select":
                var p = o._wrapperState.wasMultiple;
                o._wrapperState.wasMultiple = !!i.multiple;
                var y = i.value;
                y != null
                  ? gn(o, !!i.multiple, y, !1)
                  : p !== !!i.multiple &&
                    (i.defaultValue != null
                      ? gn(o, !!i.multiple, i.defaultValue, !0)
                      : gn(o, !!i.multiple, i.multiple ? [] : "", !1));
            }
            o[hr] = i;
          } catch (S) {
            ce(e, e.return, S);
          }
      }
      break;
    case 6:
      if ((Ke(t, e), ot(e), r & 4)) {
        if (e.stateNode === null) throw Error(N(162));
        ((o = e.stateNode), (i = e.memoizedProps));
        try {
          o.nodeValue = i;
        } catch (S) {
          ce(e, e.return, S);
        }
      }
      break;
    case 3:
      if (
        (Ke(t, e), ot(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          cr(t.containerInfo);
        } catch (S) {
          ce(e, e.return, S);
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
          ((i = o.memoizedState !== null),
          (o.stateNode.isHidden = i),
          !i ||
            (o.alternate !== null && o.alternate.memoizedState !== null) ||
            (ca = de())),
        r & 4 && zl(e));
      break;
    case 22:
      if (
        ((g = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((Ce = (c = Ce) || g), Ke(t, e), (Ce = c)) : Ke(t, e),
        ot(e),
        r & 8192)
      ) {
        if (
          ((c = e.memoizedState !== null),
          (e.stateNode.isHidden = c) && !g && e.mode & 1)
        )
          for (I = e, g = e.child; g !== null;) {
            for (m = I = g; I !== null;) {
              switch (((p = I), (y = p.child), p.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  nr(4, p, p.return);
                  break;
                case 1:
                  hn(p, p.return);
                  var C = p.stateNode;
                  if (typeof C.componentWillUnmount == "function") {
                    ((r = p), (n = p.return));
                    try {
                      ((t = r),
                        (C.props = t.memoizedProps),
                        (C.state = t.memoizedState),
                        C.componentWillUnmount());
                    } catch (S) {
                      ce(r, n, S);
                    }
                  }
                  break;
                case 5:
                  hn(p, p.return);
                  break;
                case 22:
                  if (p.memoizedState !== null) {
                    El(m);
                    continue;
                  }
              }
              y !== null ? ((y.return = p), (I = y)) : El(m);
            }
            g = g.sibling;
          }
        e: for (g = null, m = e; ;) {
          if (m.tag === 5) {
            if (g === null) {
              g = m;
              try {
                ((o = m.stateNode),
                  c
                    ? ((i = o.style),
                      typeof i.setProperty == "function"
                        ? i.setProperty("display", "none", "important")
                        : (i.display = "none"))
                    : ((l = m.stateNode),
                      (u = m.memoizedProps.style),
                      (a =
                        u != null && u.hasOwnProperty("display")
                          ? u.display
                          : null),
                      (l.style.display = gs("display", a))));
              } catch (S) {
                ce(e, e.return, S);
              }
            }
          } else if (m.tag === 6) {
            if (g === null)
              try {
                m.stateNode.nodeValue = c ? "" : m.memoizedProps;
              } catch (S) {
                ce(e, e.return, S);
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
            (g === m && (g = null), (m = m.return));
          }
          (g === m && (g = null),
            (m.sibling.return = m.return),
            (m = m.sibling));
        }
      }
      break;
    case 19:
      (Ke(t, e), ot(e), r & 4 && zl(e));
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
          if (H2(n)) {
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
          r.flags & 32 && (ar(o, ""), (r.flags &= -33));
          var i = bl(e);
          h1(e, i, o);
          break;
        case 3:
        case 4:
          var a = r.stateNode.containerInfo,
            l = bl(e);
          m1(e, l, a);
          break;
        default:
          throw Error(N(161));
      }
    } catch (u) {
      ce(e, e.return, u);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function L0(e, t, n) {
  ((I = e), G2(e));
}
function G2(e, t, n) {
  for (var r = (e.mode & 1) !== 0; I !== null;) {
    var o = I,
      i = o.child;
    if (o.tag === 22 && r) {
      var a = o.memoizedState !== null || Hr;
      if (!a) {
        var l = o.alternate,
          u = (l !== null && l.memoizedState !== null) || Ce;
        l = Hr;
        var c = Ce;
        if (((Hr = a), (Ce = u) && !c))
          for (I = o; I !== null;)
            ((a = I),
              (u = a.child),
              a.tag === 22 && a.memoizedState !== null
                ? Ml(o)
                : u !== null
                  ? ((u.return = a), (I = u))
                  : Ml(o));
        for (; i !== null;) ((I = i), G2(i), (i = i.sibling));
        ((I = o), (Hr = l), (Ce = c));
      }
      Tl(e);
    } else
      o.subtreeFlags & 8772 && i !== null ? ((i.return = o), (I = i)) : Tl(e);
  }
}
function Tl(e) {
  for (; I !== null;) {
    var t = I;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              Ce || Wo(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !Ce)
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
              var i = t.updateQueue;
              i !== null && cl(t, i, r);
              break;
            case 3:
              var a = t.updateQueue;
              if (a !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                cl(t, a, n);
              }
              break;
            case 5:
              var l = t.stateNode;
              if (n === null && t.flags & 4) {
                n = l;
                var u = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    u.autoFocus && n.focus();
                    break;
                  case "img":
                    u.src && (n.src = u.src);
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
                var c = t.alternate;
                if (c !== null) {
                  var g = c.memoizedState;
                  if (g !== null) {
                    var m = g.dehydrated;
                    m !== null && cr(m);
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
        Ce || (t.flags & 512 && p1(t));
      } catch (p) {
        ce(t, t.return, p);
      }
    }
    if (t === e) {
      I = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      ((n.return = t.return), (I = n));
      break;
    }
    I = t.return;
  }
}
function El(e) {
  for (; I !== null;) {
    var t = I;
    if (t === e) {
      I = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      ((n.return = t.return), (I = n));
      break;
    }
    I = t.return;
  }
}
function Ml(e) {
  for (; I !== null;) {
    var t = I;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Wo(4, t);
          } catch (u) {
            ce(t, n, u);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var o = t.return;
            try {
              r.componentDidMount();
            } catch (u) {
              ce(t, o, u);
            }
          }
          var i = t.return;
          try {
            p1(t);
          } catch (u) {
            ce(t, i, u);
          }
          break;
        case 5:
          var a = t.return;
          try {
            p1(t);
          } catch (u) {
            ce(t, a, u);
          }
      }
    } catch (u) {
      ce(t, t.return, u);
    }
    if (t === e) {
      I = null;
      break;
    }
    var l = t.sibling;
    if (l !== null) {
      ((l.return = t.return), (I = l));
      break;
    }
    I = t.return;
  }
}
var P0 = Math.ceil,
  jo = wt.ReactCurrentDispatcher,
  sa = wt.ReactCurrentOwner,
  Ue = wt.ReactCurrentBatchConfig,
  K = 0,
  ve = null,
  fe = null,
  we = 0,
  De = 0,
  vn = Ot(0),
  me = 0,
  Sr = null,
  Xt = 0,
  Go = 0,
  ua = 0,
  rr = null,
  je = null,
  ca = 0,
  jn = 1 / 0,
  ct = null,
  Ao = !1,
  v1 = null,
  Lt = null,
  Ur = !1,
  Tt = null,
  Lo = 0,
  or = 0,
  g1 = null,
  ao = -1,
  lo = 0;
function Te() {
  return K & 6 ? de() : ao !== -1 ? ao : (ao = de());
}
function Pt(e) {
  return e.mode & 1
    ? K & 2 && we !== 0
      ? we & -we
      : v0.transition !== null
        ? (lo === 0 && (lo = js()), lo)
        : ((e = q),
          e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : Rs(e.type))),
          e)
    : 1;
}
function tt(e, t, n, r) {
  if (50 < or) throw ((or = 0), (g1 = null), Error(N(185)));
  (zr(e, n, r),
    (!(K & 2) || e !== ve) &&
      (e === ve && (!(K & 2) && (Go |= n), me === 4 && bt(e, we)),
      _e(e, r),
      n === 1 && K === 0 && !(t.mode & 1) && ((jn = de() + 500), Vo && Bt())));
}
function _e(e, t) {
  var n = e.callbackNode;
  vc(e, t);
  var r = ho(e, e === ve ? we : 0);
  if (r === 0)
    (n !== null && Ra(n), (e.callbackNode = null), (e.callbackPriority = 0));
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && Ra(n), t === 1))
      (e.tag === 0 ? h0(Nl.bind(null, e)) : n2(Nl.bind(null, e)),
        d0(function () {
          !(K & 6) && Bt();
        }),
        (n = null));
    else {
      switch (As(r)) {
        case 1:
          n = I1;
          break;
        case 4:
          n = Ms;
          break;
        case 16:
          n = mo;
          break;
        case 536870912:
          n = Ns;
          break;
        default:
          n = mo;
      }
      n = eu(n, Q2.bind(null, e));
    }
    ((e.callbackPriority = t), (e.callbackNode = n));
  }
}
function Q2(e, t) {
  if (((ao = -1), (lo = 0), K & 6)) throw Error(N(327));
  var n = e.callbackNode;
  if (kn() && e.callbackNode !== n) return null;
  var r = ho(e, e === ve ? we : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = Po(e, r);
  else {
    t = r;
    var o = K;
    K |= 2;
    var i = K2();
    (ve !== e || we !== t) && ((ct = null), (jn = de() + 500), Gt(e, t));
    do
      try {
        I0();
        break;
      } catch (l) {
        Y2(e, l);
      }
    while (!0);
    (K1(),
      (jo.current = i),
      (K = o),
      fe !== null ? (t = 0) : ((ve = null), (we = 0), (t = me)));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((o = Ui(e)), o !== 0 && ((r = o), (t = y1(e, o)))), t === 1)
    )
      throw ((n = Sr), Gt(e, 0), bt(e, r), _e(e, de()), n);
    if (t === 6) bt(e, r);
    else {
      if (
        ((o = e.current.alternate),
        !(r & 30) &&
          !_0(o) &&
          ((t = Po(e, r)),
          t === 2 && ((i = Ui(e)), i !== 0 && ((r = i), (t = y1(e, i)))),
          t === 1))
      )
        throw ((n = Sr), Gt(e, 0), bt(e, r), _e(e, de()), n);
      switch (((e.finishedWork = o), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(N(345));
        case 2:
          Vt(e, je, ct);
          break;
        case 3:
          if (
            (bt(e, r), (r & 130023424) === r && ((t = ca + 500 - de()), 10 < t))
          ) {
            if (ho(e, 0) !== 0) break;
            if (((o = e.suspendedLanes), (o & r) !== r)) {
              (Te(), (e.pingedLanes |= e.suspendedLanes & o));
              break;
            }
            e.timeoutHandle = Ji(Vt.bind(null, e, je, ct), t);
            break;
          }
          Vt(e, je, ct);
          break;
        case 4:
          if ((bt(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, o = -1; 0 < r;) {
            var a = 31 - et(r);
            ((i = 1 << a), (a = t[a]), a > o && (o = a), (r &= ~i));
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
                          : 1960 * P0(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = Ji(Vt.bind(null, e, je, ct), r);
            break;
          }
          Vt(e, je, ct);
          break;
        case 5:
          Vt(e, je, ct);
          break;
        default:
          throw Error(N(329));
      }
    }
  }
  return (_e(e, de()), e.callbackNode === n ? Q2.bind(null, e) : null);
}
function y1(e, t) {
  var n = rr;
  return (
    e.current.memoizedState.isDehydrated && (Gt(e, t).flags |= 256),
    (e = Po(e, t)),
    e !== 2 && ((t = je), (je = n), t !== null && w1(t)),
    e
  );
}
function w1(e) {
  je === null ? (je = e) : je.push.apply(je, e);
}
function _0(e) {
  for (var t = e; ;) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var o = n[r],
            i = o.getSnapshot;
          o = o.value;
          try {
            if (!nt(i(), o)) return !1;
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
function bt(e, t) {
  for (
    t &= ~ua,
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
function Nl(e) {
  if (K & 6) throw Error(N(327));
  kn();
  var t = ho(e, 0);
  if (!(t & 1)) return (_e(e, de()), null);
  var n = Po(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Ui(e);
    r !== 0 && ((t = r), (n = y1(e, r)));
  }
  if (n === 1) throw ((n = Sr), Gt(e, 0), bt(e, t), _e(e, de()), n);
  if (n === 6) throw Error(N(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    Vt(e, je, ct),
    _e(e, de()),
    null
  );
}
function da(e, t) {
  var n = K;
  K |= 1;
  try {
    return e(t);
  } finally {
    ((K = n), K === 0 && ((jn = de() + 500), Vo && Bt()));
  }
}
function Jt(e) {
  Tt !== null && Tt.tag === 0 && !(K & 6) && kn();
  var t = K;
  K |= 1;
  var n = Ue.transition,
    r = q;
  try {
    if (((Ue.transition = null), (q = 1), e)) return e();
  } finally {
    ((q = r), (Ue.transition = n), (K = t), !(K & 6) && Bt());
  }
}
function fa() {
  ((De = vn.current), re(vn));
}
function Gt(e, t) {
  ((e.finishedWork = null), (e.finishedLanes = 0));
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), c0(n)), fe !== null))
    for (n = fe.return; n !== null;) {
      var r = n;
      switch ((G1(r), r.tag)) {
        case 1:
          ((r = r.type.childContextTypes), r != null && xo());
          break;
        case 3:
          (Mn(), re(Le), re(be), ta());
          break;
        case 5:
          ea(r);
          break;
        case 4:
          Mn();
          break;
        case 13:
          re(ie);
          break;
        case 19:
          re(ie);
          break;
        case 10:
          Z1(r.type._context);
          break;
        case 22:
        case 23:
          fa();
      }
      n = n.return;
    }
  if (
    ((ve = e),
    (fe = e = _t(e.current, null)),
    (we = De = t),
    (me = 0),
    (Sr = null),
    (ua = Go = Xt = 0),
    (je = rr = null),
    Ut !== null)
  ) {
    for (t = 0; t < Ut.length; t++)
      if (((n = Ut[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var o = r.next,
          i = n.pending;
        if (i !== null) {
          var a = i.next;
          ((i.next = o), (r.next = a));
        }
        n.pending = r;
      }
    Ut = null;
  }
  return e;
}
function Y2(e, t) {
  do {
    var n = fe;
    try {
      if ((K1(), (ro.current = No), Mo)) {
        for (var r = ae.memoizedState; r !== null;) {
          var o = r.queue;
          (o !== null && (o.pending = null), (r = r.next));
        }
        Mo = !1;
      }
      if (
        ((Zt = 0),
        (he = pe = ae = null),
        (tr = !1),
        (yr = 0),
        (sa.current = null),
        n === null || n.return === null)
      ) {
        ((me = 1), (Sr = t), (fe = null));
        break;
      }
      e: {
        var i = e,
          a = n.return,
          l = n,
          u = t;
        if (
          ((t = we),
          (l.flags |= 32768),
          u !== null && typeof u == "object" && typeof u.then == "function")
        ) {
          var c = u,
            g = l,
            m = g.tag;
          if (!(g.mode & 1) && (m === 0 || m === 11 || m === 15)) {
            var p = g.alternate;
            p
              ? ((g.updateQueue = p.updateQueue),
                (g.memoizedState = p.memoizedState),
                (g.lanes = p.lanes))
              : ((g.updateQueue = null), (g.memoizedState = null));
          }
          var y = vl(a);
          if (y !== null) {
            ((y.flags &= -257),
              gl(y, a, l, i, t),
              y.mode & 1 && hl(i, c, t),
              (t = y),
              (u = c));
            var C = t.updateQueue;
            if (C === null) {
              var S = new Set();
              (S.add(u), (t.updateQueue = S));
            } else C.add(u);
            break e;
          } else {
            if (!(t & 1)) {
              (hl(i, c, t), pa());
              break e;
            }
            u = Error(N(426));
          }
        } else if (oe && l.mode & 1) {
          var T = vl(a);
          if (T !== null) {
            (!(T.flags & 65536) && (T.flags |= 256),
              gl(T, a, l, i, t),
              Q1(Nn(u, l)));
            break e;
          }
        }
        ((i = u = Nn(u, l)),
          me !== 4 && (me = 2),
          rr === null ? (rr = [i]) : rr.push(i),
          (i = a));
        do {
          switch (i.tag) {
            case 3:
              ((i.flags |= 65536), (t &= -t), (i.lanes |= t));
              var d = A2(i, u, t);
              ul(i, d);
              break e;
            case 1:
              l = u;
              var f = i.type,
                h = i.stateNode;
              if (
                !(i.flags & 128) &&
                (typeof f.getDerivedStateFromError == "function" ||
                  (h !== null &&
                    typeof h.componentDidCatch == "function" &&
                    (Lt === null || !Lt.has(h))))
              ) {
                ((i.flags |= 65536), (t &= -t), (i.lanes |= t));
                var x = L2(i, l, t);
                ul(i, x);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      X2(n);
    } catch (k) {
      ((t = k), fe === n && n !== null && (fe = n = n.return));
      continue;
    }
    break;
  } while (!0);
}
function K2() {
  var e = jo.current;
  return ((jo.current = No), e === null ? No : e);
}
function pa() {
  ((me === 0 || me === 3 || me === 2) && (me = 4),
    ve === null || (!(Xt & 268435455) && !(Go & 268435455)) || bt(ve, we));
}
function Po(e, t) {
  var n = K;
  K |= 2;
  var r = K2();
  (ve !== e || we !== t) && ((ct = null), Gt(e, t));
  do
    try {
      D0();
      break;
    } catch (o) {
      Y2(e, o);
    }
  while (!0);
  if ((K1(), (K = n), (jo.current = r), fe !== null)) throw Error(N(261));
  return ((ve = null), (we = 0), me);
}
function D0() {
  for (; fe !== null;) Z2(fe);
}
function I0() {
  for (; fe !== null && !lc();) Z2(fe);
}
function Z2(e) {
  var t = q2(e.alternate, e, De);
  ((e.memoizedProps = e.pendingProps),
    t === null ? X2(e) : (fe = t),
    (sa.current = null));
}
function X2(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = N0(n, t)), n !== null)) {
        ((n.flags &= 32767), (fe = n));
        return;
      }
      if (e !== null)
        ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null));
      else {
        ((me = 6), (fe = null));
        return;
      }
    } else if (((n = M0(n, t, De)), n !== null)) {
      fe = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      fe = t;
      return;
    }
    fe = t = e;
  } while (t !== null);
  me === 0 && (me = 5);
}
function Vt(e, t, n) {
  var r = q,
    o = Ue.transition;
  try {
    ((Ue.transition = null), (q = 1), R0(e, t, n, r));
  } finally {
    ((Ue.transition = o), (q = r));
  }
  return null;
}
function R0(e, t, n, r) {
  do kn();
  while (Tt !== null);
  if (K & 6) throw Error(N(327));
  n = e.finishedWork;
  var o = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(N(177));
  ((e.callbackNode = null), (e.callbackPriority = 0));
  var i = n.lanes | n.childLanes;
  if (
    (gc(e, i),
    e === ve && ((fe = ve = null), (we = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      Ur ||
      ((Ur = !0),
      eu(mo, function () {
        return (kn(), null);
      })),
    (i = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || i)
  ) {
    ((i = Ue.transition), (Ue.transition = null));
    var a = q;
    q = 1;
    var l = K;
    ((K |= 4),
      (sa.current = null),
      A0(e, n),
      W2(n, e),
      r0(Zi),
      (vo = !!Ki),
      (Zi = Ki = null),
      (e.current = n),
      L0(n),
      sc(),
      (K = l),
      (q = a),
      (Ue.transition = i));
  } else e.current = n;
  if (
    (Ur && ((Ur = !1), (Tt = e), (Lo = o)),
    (i = e.pendingLanes),
    i === 0 && (Lt = null),
    dc(n.stateNode),
    _e(e, de()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      ((o = t[n]), r(o.value, { componentStack: o.stack, digest: o.digest }));
  if (Ao) throw ((Ao = !1), (e = v1), (v1 = null), e);
  return (
    Lo & 1 && e.tag !== 0 && kn(),
    (i = e.pendingLanes),
    i & 1 ? (e === g1 ? or++ : ((or = 0), (g1 = e))) : (or = 0),
    Bt(),
    null
  );
}
function kn() {
  if (Tt !== null) {
    var e = As(Lo),
      t = Ue.transition,
      n = q;
    try {
      if (((Ue.transition = null), (q = 16 > e ? 16 : e), Tt === null))
        var r = !1;
      else {
        if (((e = Tt), (Tt = null), (Lo = 0), K & 6)) throw Error(N(331));
        var o = K;
        for (K |= 4, I = e.current; I !== null;) {
          var i = I,
            a = i.child;
          if (I.flags & 16) {
            var l = i.deletions;
            if (l !== null) {
              for (var u = 0; u < l.length; u++) {
                var c = l[u];
                for (I = c; I !== null;) {
                  var g = I;
                  switch (g.tag) {
                    case 0:
                    case 11:
                    case 15:
                      nr(8, g, i);
                  }
                  var m = g.child;
                  if (m !== null) ((m.return = g), (I = m));
                  else
                    for (; I !== null;) {
                      g = I;
                      var p = g.sibling,
                        y = g.return;
                      if ((V2(g), g === c)) {
                        I = null;
                        break;
                      }
                      if (p !== null) {
                        ((p.return = y), (I = p));
                        break;
                      }
                      I = y;
                    }
                }
              }
              var C = i.alternate;
              if (C !== null) {
                var S = C.child;
                if (S !== null) {
                  C.child = null;
                  do {
                    var T = S.sibling;
                    ((S.sibling = null), (S = T));
                  } while (S !== null);
                }
              }
              I = i;
            }
          }
          if (i.subtreeFlags & 2064 && a !== null) ((a.return = i), (I = a));
          else
            e: for (; I !== null;) {
              if (((i = I), i.flags & 2048))
                switch (i.tag) {
                  case 0:
                  case 11:
                  case 15:
                    nr(9, i, i.return);
                }
              var d = i.sibling;
              if (d !== null) {
                ((d.return = i.return), (I = d));
                break e;
              }
              I = i.return;
            }
        }
        var f = e.current;
        for (I = f; I !== null;) {
          a = I;
          var h = a.child;
          if (a.subtreeFlags & 2064 && h !== null) ((h.return = a), (I = h));
          else
            e: for (a = f; I !== null;) {
              if (((l = I), l.flags & 2048))
                try {
                  switch (l.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Wo(9, l);
                  }
                } catch (k) {
                  ce(l, l.return, k);
                }
              if (l === a) {
                I = null;
                break e;
              }
              var x = l.sibling;
              if (x !== null) {
                ((x.return = l.return), (I = x));
                break e;
              }
              I = l.return;
            }
        }
        if (
          ((K = o), Bt(), lt && typeof lt.onPostCommitFiberRoot == "function")
        )
          try {
            lt.onPostCommitFiberRoot(Ro, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      ((q = n), (Ue.transition = t));
    }
  }
  return !1;
}
function jl(e, t, n) {
  ((t = Nn(n, t)),
    (t = A2(e, t, 1)),
    (e = At(e, t, 1)),
    (t = Te()),
    e !== null && (zr(e, 1, t), _e(e, t)));
}
function ce(e, t, n) {
  if (e.tag === 3) jl(e, e, n);
  else
    for (; t !== null;) {
      if (t.tag === 3) {
        jl(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (Lt === null || !Lt.has(r)))
        ) {
          ((e = Nn(n, e)),
            (e = L2(t, e, 1)),
            (t = At(t, e, 1)),
            (e = Te()),
            t !== null && (zr(t, 1, e), _e(t, e)));
          break;
        }
      }
      t = t.return;
    }
}
function O0(e, t, n) {
  var r = e.pingCache;
  (r !== null && r.delete(t),
    (t = Te()),
    (e.pingedLanes |= e.suspendedLanes & n),
    ve === e &&
      (we & n) === n &&
      (me === 4 || (me === 3 && (we & 130023424) === we && 500 > de() - ca)
        ? Gt(e, 0)
        : (ua |= n)),
    _e(e, t));
}
function J2(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = _r), (_r <<= 1), !(_r & 130023424) && (_r = 4194304))
      : (t = 1));
  var n = Te();
  ((e = gt(e, t)), e !== null && (zr(e, t, n), _e(e, n)));
}
function B0(e) {
  var t = e.memoizedState,
    n = 0;
  (t !== null && (n = t.retryLane), J2(e, n));
}
function F0(e, t) {
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
  (r !== null && r.delete(t), J2(e, n));
}
var q2;
q2 = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || Le.current) Ae = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return ((Ae = !1), E0(e, t, n));
      Ae = !!(e.flags & 131072);
    }
  else ((Ae = !1), oe && t.flags & 1048576 && r2(t, Co, t.index));
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      (io(e, t), (e = t.pendingProps));
      var o = zn(t, be.current);
      (Sn(t, n), (o = ra(null, t, r, e, o, n)));
      var i = oa();
      return (
        (t.flags |= 1),
        typeof o == "object" &&
        o !== null &&
        typeof o.render == "function" &&
        o.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            Pe(r) ? ((i = !0), So(t)) : (i = !1),
            (t.memoizedState =
              o.state !== null && o.state !== void 0 ? o.state : null),
            J1(t),
            (o.updater = Uo),
            (t.stateNode = o),
            (o._reactInternals = t),
            i1(t, r, e, n),
            (t = s1(null, t, r, !0, i, n)))
          : ((t.tag = 0), oe && i && W1(t), ze(null, t, o, n), (t = t.child)),
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
          (o = t.tag = V0(r)),
          (e = Xe(r, e)),
          o)
        ) {
          case 0:
            t = l1(null, t, r, e, n);
            break e;
          case 1:
            t = xl(null, t, r, e, n);
            break e;
          case 11:
            t = yl(null, t, r, e, n);
            break e;
          case 14:
            t = wl(null, t, r, Xe(r.type, e), n);
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
        l1(e, t, r, o, n)
      );
    case 1:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : Xe(r, o)),
        xl(e, t, r, o, n)
      );
    case 3:
      e: {
        if ((I2(t), e === null)) throw Error(N(387));
        ((r = t.pendingProps),
          (i = t.memoizedState),
          (o = i.element),
          u2(e, t),
          To(t, r, null, n));
        var a = t.memoizedState;
        if (((r = a.element), i.isDehydrated))
          if (
            ((i = {
              element: r,
              isDehydrated: !1,
              cache: a.cache,
              pendingSuspenseBoundaries: a.pendingSuspenseBoundaries,
              transitions: a.transitions,
            }),
            (t.updateQueue.baseState = i),
            (t.memoizedState = i),
            t.flags & 256)
          ) {
            ((o = Nn(Error(N(423)), t)), (t = Sl(e, t, r, n, o)));
            break e;
          } else if (r !== o) {
            ((o = Nn(Error(N(424)), t)), (t = Sl(e, t, r, n, o)));
            break e;
          } else
            for (
              Ie = jt(t.stateNode.containerInfo.firstChild),
                Re = t,
                oe = !0,
                qe = null,
                n = l2(t, null, r, n),
                t.child = n;
              n;
            )
              ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
        else {
          if ((Tn(), r === o)) {
            t = yt(e, t, n);
            break e;
          }
          ze(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        c2(t),
        e === null && n1(t),
        (r = t.type),
        (o = t.pendingProps),
        (i = e !== null ? e.memoizedProps : null),
        (a = o.children),
        Xi(r, o) ? (a = null) : i !== null && Xi(r, i) && (t.flags |= 32),
        D2(e, t),
        ze(e, t, a, n),
        t.child
      );
    case 6:
      return (e === null && n1(t), null);
    case 13:
      return R2(e, t, n);
    case 4:
      return (
        q1(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = En(t, null, r, n)) : ze(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : Xe(r, o)),
        yl(e, t, r, o, n)
      );
    case 7:
      return (ze(e, t, t.pendingProps, n), t.child);
    case 8:
      return (ze(e, t, t.pendingProps.children, n), t.child);
    case 12:
      return (ze(e, t, t.pendingProps.children, n), t.child);
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (o = t.pendingProps),
          (i = t.memoizedProps),
          (a = o.value),
          ee(bo, r._currentValue),
          (r._currentValue = a),
          i !== null)
        )
          if (nt(i.value, a)) {
            if (i.children === o.children && !Le.current) {
              t = yt(e, t, n);
              break e;
            }
          } else
            for (i = t.child, i !== null && (i.return = t); i !== null;) {
              var l = i.dependencies;
              if (l !== null) {
                a = i.child;
                for (var u = l.firstContext; u !== null;) {
                  if (u.context === r) {
                    if (i.tag === 1) {
                      ((u = mt(-1, n & -n)), (u.tag = 2));
                      var c = i.updateQueue;
                      if (c !== null) {
                        c = c.shared;
                        var g = c.pending;
                        (g === null
                          ? (u.next = u)
                          : ((u.next = g.next), (g.next = u)),
                          (c.pending = u));
                      }
                    }
                    ((i.lanes |= n),
                      (u = i.alternate),
                      u !== null && (u.lanes |= n),
                      r1(i.return, n, t),
                      (l.lanes |= n));
                    break;
                  }
                  u = u.next;
                }
              } else if (i.tag === 10) a = i.type === t.type ? null : i.child;
              else if (i.tag === 18) {
                if (((a = i.return), a === null)) throw Error(N(341));
                ((a.lanes |= n),
                  (l = a.alternate),
                  l !== null && (l.lanes |= n),
                  r1(a, n, t),
                  (a = i.sibling));
              } else a = i.child;
              if (a !== null) a.return = i;
              else
                for (a = i; a !== null;) {
                  if (a === t) {
                    a = null;
                    break;
                  }
                  if (((i = a.sibling), i !== null)) {
                    ((i.return = a.return), (a = i));
                    break;
                  }
                  a = a.return;
                }
              i = a;
            }
        (ze(e, t, o.children, n), (t = t.child));
      }
      return t;
    case 9:
      return (
        (o = t.type),
        (r = t.pendingProps.children),
        Sn(t, n),
        (o = We(o)),
        (r = r(o)),
        (t.flags |= 1),
        ze(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (o = Xe(r, t.pendingProps)),
        (o = Xe(r.type, o)),
        wl(e, t, r, o, n)
      );
    case 15:
      return P2(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : Xe(r, o)),
        io(e, t),
        (t.tag = 1),
        Pe(r) ? ((e = !0), So(t)) : (e = !1),
        Sn(t, n),
        j2(t, r, o),
        i1(t, r, o, n),
        s1(null, t, r, !0, e, n)
      );
    case 19:
      return O2(e, t, n);
    case 22:
      return _2(e, t, n);
  }
  throw Error(N(156, t.tag));
};
function eu(e, t) {
  return Es(e, t);
}
function $0(e, t, n, r) {
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
function He(e, t, n, r) {
  return new $0(e, t, n, r);
}
function ma(e) {
  return ((e = e.prototype), !(!e || !e.isReactComponent));
}
function V0(e) {
  if (typeof e == "function") return ma(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === P1)) return 11;
    if (e === _1) return 14;
  }
  return 2;
}
function _t(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = He(e.tag, t, e.key, e.mode)),
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
function so(e, t, n, r, o, i) {
  var a = 2;
  if (((r = e), typeof e == "function")) ma(e) && (a = 1);
  else if (typeof e == "string") a = 5;
  else
    e: switch (e) {
      case an:
        return Qt(n.children, o, i, t);
      case L1:
        ((a = 8), (o |= 8));
        break;
      case Ni:
        return (
          (e = He(12, n, t, o | 2)),
          (e.elementType = Ni),
          (e.lanes = i),
          e
        );
      case ji:
        return ((e = He(13, n, t, o)), (e.elementType = ji), (e.lanes = i), e);
      case Ai:
        return ((e = He(19, n, t, o)), (e.elementType = Ai), (e.lanes = i), e);
      case cs:
        return Qo(n, o, i, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case ss:
              a = 10;
              break e;
            case us:
              a = 9;
              break e;
            case P1:
              a = 11;
              break e;
            case _1:
              a = 14;
              break e;
            case St:
              ((a = 16), (r = null));
              break e;
          }
        throw Error(N(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = He(a, n, t, o)),
    (t.elementType = e),
    (t.type = r),
    (t.lanes = i),
    t
  );
}
function Qt(e, t, n, r) {
  return ((e = He(7, e, r, t)), (e.lanes = n), e);
}
function Qo(e, t, n, r) {
  return (
    (e = He(22, e, r, t)),
    (e.elementType = cs),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function Ci(e, t, n) {
  return ((e = He(6, e, null, t)), (e.lanes = n), e);
}
function bi(e, t, n) {
  return (
    (t = He(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function H0(e, t, n, r, o) {
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
    (this.eventTimes = oi(0)),
    (this.expirationTimes = oi(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = oi(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = o),
    (this.mutableSourceEagerHydrationData = null));
}
function ha(e, t, n, r, o, i, a, l, u) {
  return (
    (e = new H0(e, t, n, l, u)),
    t === 1 ? ((t = 1), i === !0 && (t |= 8)) : (t = 0),
    (i = He(3, null, null, t)),
    (e.current = i),
    (i.stateNode = e),
    (i.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    J1(i),
    e
  );
}
function U0(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: on,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function tu(e) {
  if (!e) return It;
  e = e._reactInternals;
  e: {
    if (en(e) !== e || e.tag !== 1) throw Error(N(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Pe(t.type)) {
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
    if (Pe(n)) return t2(e, n, t);
  }
  return t;
}
function nu(e, t, n, r, o, i, a, l, u) {
  return (
    (e = ha(n, r, !0, e, o, i, a, l, u)),
    (e.context = tu(null)),
    (n = e.current),
    (r = Te()),
    (o = Pt(n)),
    (i = mt(r, o)),
    (i.callback = t ?? null),
    At(n, i, o),
    (e.current.lanes = o),
    zr(e, o, r),
    _e(e, r),
    e
  );
}
function Yo(e, t, n, r) {
  var o = t.current,
    i = Te(),
    a = Pt(o);
  return (
    (n = tu(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = mt(i, a)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = At(o, t, a)),
    e !== null && (tt(e, o, a, i), no(e, o, a)),
    a
  );
}
function _o(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Al(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function va(e, t) {
  (Al(e, t), (e = e.alternate) && Al(e, t));
}
function W0() {
  return null;
}
var ru =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function ga(e) {
  this._internalRoot = e;
}
Ko.prototype.render = ga.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(N(409));
  Yo(e, t, null, null);
};
Ko.prototype.unmount = ga.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    (Jt(function () {
      Yo(null, e, null, null);
    }),
      (t[vt] = null));
  }
};
function Ko(e) {
  this._internalRoot = e;
}
Ko.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = _s();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < Ct.length && t !== 0 && t < Ct[n].priority; n++);
    (Ct.splice(n, 0, e), n === 0 && Is(e));
  }
};
function ya(e) {
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
function Ll() {}
function G0(e, t, n, r, o) {
  if (o) {
    if (typeof r == "function") {
      var i = r;
      r = function () {
        var c = _o(a);
        i.call(c);
      };
    }
    var a = nu(t, r, e, 0, null, !1, !1, "", Ll);
    return (
      (e._reactRootContainer = a),
      (e[vt] = a.current),
      pr(e.nodeType === 8 ? e.parentNode : e),
      Jt(),
      a
    );
  }
  for (; (o = e.lastChild);) e.removeChild(o);
  if (typeof r == "function") {
    var l = r;
    r = function () {
      var c = _o(u);
      l.call(c);
    };
  }
  var u = ha(e, 0, !1, null, null, !1, !1, "", Ll);
  return (
    (e._reactRootContainer = u),
    (e[vt] = u.current),
    pr(e.nodeType === 8 ? e.parentNode : e),
    Jt(function () {
      Yo(t, u, n, r);
    }),
    u
  );
}
function Xo(e, t, n, r, o) {
  var i = n._reactRootContainer;
  if (i) {
    var a = i;
    if (typeof o == "function") {
      var l = o;
      o = function () {
        var u = _o(a);
        l.call(u);
      };
    }
    Yo(t, a, e, o);
  } else a = G0(n, t, e, o, r);
  return _o(a);
}
Ls = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Yn(t.pendingLanes);
        n !== 0 &&
          (R1(t, n | 1), _e(t, de()), !(K & 6) && ((jn = de() + 500), Bt()));
      }
      break;
    case 13:
      (Jt(function () {
        var r = gt(e, 1);
        if (r !== null) {
          var o = Te();
          tt(r, e, 1, o);
        }
      }),
        va(e, 1));
  }
};
O1 = function (e) {
  if (e.tag === 13) {
    var t = gt(e, 134217728);
    if (t !== null) {
      var n = Te();
      tt(t, e, 134217728, n);
    }
    va(e, 134217728);
  }
};
Ps = function (e) {
  if (e.tag === 13) {
    var t = Pt(e),
      n = gt(e, t);
    if (n !== null) {
      var r = Te();
      tt(n, e, t, r);
    }
    va(e, t);
  }
};
_s = function () {
  return q;
};
Ds = function (e, t) {
  var n = q;
  try {
    return ((q = e), t());
  } finally {
    q = n;
  }
};
$i = function (e, t, n) {
  switch (t) {
    case "input":
      if ((_i(e, n), (t = n.name), n.type === "radio" && t != null)) {
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
            (fs(r), _i(r, o));
          }
        }
      }
      break;
    case "textarea":
      ms(e, n);
      break;
    case "select":
      ((t = n.value), t != null && gn(e, !!n.multiple, t, !1));
  }
};
Ss = da;
ks = Jt;
var Q0 = { usingClientEntryPoint: !1, Events: [Er, cn, $o, ws, xs, da] },
  Vn = {
    findFiberByHostInstance: Ht,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom",
  },
  Y0 = {
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
    currentDispatcherRef: wt.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return ((e = zs(e)), e === null ? null : e.stateNode);
    },
    findFiberByHostInstance: Vn.findFiberByHostInstance || W0,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Wr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Wr.isDisabled && Wr.supportsFiber)
    try {
      ((Ro = Wr.inject(Y0)), (lt = Wr));
    } catch {}
}
Be.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Q0;
Be.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!ya(t)) throw Error(N(200));
  return U0(e, t, null, n);
};
Be.createRoot = function (e, t) {
  if (!ya(e)) throw Error(N(299));
  var n = !1,
    r = "",
    o = ru;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (o = t.onRecoverableError)),
    (t = ha(e, 1, !1, null, null, n, !1, r, o)),
    (e[vt] = t.current),
    pr(e.nodeType === 8 ? e.parentNode : e),
    new ga(t)
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
  return ((e = zs(t)), (e = e === null ? null : e.stateNode), e);
};
Be.flushSync = function (e) {
  return Jt(e);
};
Be.hydrate = function (e, t, n) {
  if (!Zo(t)) throw Error(N(200));
  return Xo(null, e, t, !0, n);
};
Be.hydrateRoot = function (e, t, n) {
  if (!ya(e)) throw Error(N(405));
  var r = (n != null && n.hydratedSources) || null,
    o = !1,
    i = "",
    a = ru;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (o = !0),
      n.identifierPrefix !== void 0 && (i = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (a = n.onRecoverableError)),
    (t = nu(t, null, e, 1, n ?? null, o, !1, i, a)),
    (e[vt] = t.current),
    pr(e),
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
    ? (Jt(function () {
        Xo(null, null, e, !1, function () {
          ((e._reactRootContainer = null), (e[vt] = null));
        });
      }),
      !0)
    : !1;
};
Be.unstable_batchedUpdates = da;
Be.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!Zo(n)) throw Error(N(200));
  if (e == null || e._reactInternals === void 0) throw Error(N(38));
  return Xo(e, t, n, !1, r);
};
Be.version = "18.3.1-next-f1338f8080-20240426";
function ou() {
  if (!(
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
  ))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ou);
    } catch (e) {
      console.error(e);
    }
}
(ou(), (os.exports = Be));
var K0 = os.exports,
  Pl = K0;
((Ei.createRoot = Pl.createRoot), (Ei.hydrateRoot = Pl.hydrateRoot));
var wa = {};
(function e(t, n, r, o) {
  var i = !!(
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
    a = typeof Path2D == "function" && typeof DOMMatrix == "function",
    l = (function () {
      if (!t.OffscreenCanvas) return !1;
      try {
        var w = new OffscreenCanvas(1, 1),
          v = w.getContext("2d");
        v.fillRect(0, 0, 1, 1);
        var P = w.transferToImageBitmap();
        v.createPattern(P, "no-repeat");
      } catch {
        return !1;
      }
      return !0;
    })();
  function u() {}
  function c(w) {
    var v = n.exports.Promise,
      P = v !== void 0 ? v : t.Promise;
    return typeof P == "function" ? new P(w) : (w(u, u), null);
  }
  var g = (function (w, v) {
      return {
        transform: function (P) {
          if (w) return P;
          if (v.has(P)) return v.get(P);
          var $ = new OffscreenCanvas(P.width, P.height),
            H = $.getContext("2d");
          return (H.drawImage(P, 0, 0), v.set(P, $), $);
        },
        clear: function () {
          v.clear();
        },
      };
    })(l, new Map()),
    m = (function () {
      var w = Math.floor(16.666666666666668),
        v,
        P,
        $ = {},
        H = 0;
      return (
        typeof requestAnimationFrame == "function" &&
        typeof cancelAnimationFrame == "function"
          ? ((v = function (D) {
              var F = Math.random();
              return (
                ($[F] = requestAnimationFrame(function O(V) {
                  H === V || H + w - 1 < V
                    ? ((H = V), delete $[F], D())
                    : ($[F] = requestAnimationFrame(O));
                })),
                F
              );
            }),
            (P = function (D) {
              $[D] && cancelAnimationFrame($[D]);
            }))
          : ((v = function (D) {
              return setTimeout(D, w);
            }),
            (P = function (D) {
              return clearTimeout(D);
            })),
        { frame: v, cancel: P }
      );
    })(),
    p = (function () {
      var w,
        v,
        P = {};
      function $(H) {
        function D(F, O) {
          H.postMessage({ options: F || {}, callback: O });
        }
        ((H.init = function (O) {
          var V = O.transferControlToOffscreen();
          H.postMessage({ canvas: V }, [V]);
        }),
          (H.fire = function (O, V, Q) {
            if (v) return (D(O, null), v);
            var se = Math.random().toString(36).slice(2);
            return (
              (v = c(function (te) {
                function ue(ge) {
                  ge.data.callback === se &&
                    (delete P[se],
                    H.removeEventListener("message", ue),
                    (v = null),
                    g.clear(),
                    Q(),
                    te());
                }
                (H.addEventListener("message", ue),
                  D(O, se),
                  (P[se] = ue.bind(null, { data: { callback: se } })));
              })),
              v
            );
          }),
          (H.reset = function () {
            H.postMessage({ reset: !0 });
            for (var O in P) (P[O](), delete P[O]);
          }));
      }
      return function () {
        if (w) return w;
        if (!r && i) {
          var H = [
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
            w = new Worker(URL.createObjectURL(new Blob([H])));
          } catch (D) {
            return (
              typeof console < "u" &&
                typeof console.warn == "function" &&
                console.warn("🎊 Could not load worker", D),
              null
            );
          }
          $(w);
        }
        return w;
      };
    })(),
    y = {
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
  function C(w, v) {
    return v ? v(w) : w;
  }
  function S(w) {
    return w != null;
  }
  function T(w, v, P) {
    return C(w && S(w[v]) ? w[v] : y[v], P);
  }
  function d(w) {
    return w < 0 ? 0 : Math.floor(w);
  }
  function f(w, v) {
    return Math.floor(Math.random() * (v - w)) + w;
  }
  function h(w) {
    return parseInt(w, 16);
  }
  function x(w) {
    return w.map(k);
  }
  function k(w) {
    var v = String(w).replace(/[^0-9a-f]/gi, "");
    return (
      v.length < 6 && (v = v[0] + v[0] + v[1] + v[1] + v[2] + v[2]),
      {
        r: h(v.substring(0, 2)),
        g: h(v.substring(2, 4)),
        b: h(v.substring(4, 6)),
      }
    );
  }
  function z(w) {
    var v = T(w, "origin", Object);
    return ((v.x = T(v, "x", Number)), (v.y = T(v, "y", Number)), v);
  }
  function E(w) {
    ((w.width = document.documentElement.clientWidth),
      (w.height = document.documentElement.clientHeight));
  }
  function b(w) {
    var v = w.getBoundingClientRect();
    ((w.width = v.width), (w.height = v.height));
  }
  function A(w) {
    var v = document.createElement("canvas");
    return (
      (v.style.position = "fixed"),
      (v.style.top = "0px"),
      (v.style.left = "0px"),
      (v.style.pointerEvents = "none"),
      (v.style.zIndex = w),
      v
    );
  }
  function M(w, v, P, $, H, D, F, O, V) {
    (w.save(),
      w.translate(v, P),
      w.rotate(D),
      w.scale($, H),
      w.arc(0, 0, 1, F, O, V),
      w.restore());
  }
  function _(w) {
    var v = w.angle * (Math.PI / 180),
      P = w.spread * (Math.PI / 180);
    return {
      x: w.x,
      y: w.y,
      wobble: Math.random() * 10,
      wobbleSpeed: Math.min(0.11, Math.random() * 0.1 + 0.05),
      velocity: w.startVelocity * 0.5 + Math.random() * w.startVelocity,
      angle2D: -v + (0.5 * P - Math.random() * P),
      tiltAngle: (Math.random() * (0.75 - 0.25) + 0.25) * Math.PI,
      color: w.color,
      shape: w.shape,
      tick: 0,
      totalTicks: w.ticks,
      decay: w.decay,
      drift: w.drift,
      random: Math.random() + 2,
      tiltSin: 0,
      tiltCos: 0,
      wobbleX: 0,
      wobbleY: 0,
      gravity: w.gravity * 3,
      ovalScalar: 0.6,
      scalar: w.scalar,
      flat: w.flat,
    };
  }
  function R(w, v) {
    ((v.x += Math.cos(v.angle2D) * v.velocity + v.drift),
      (v.y += Math.sin(v.angle2D) * v.velocity + v.gravity),
      (v.velocity *= v.decay),
      v.flat
        ? ((v.wobble = 0),
          (v.wobbleX = v.x + 10 * v.scalar),
          (v.wobbleY = v.y + 10 * v.scalar),
          (v.tiltSin = 0),
          (v.tiltCos = 0),
          (v.random = 1))
        : ((v.wobble += v.wobbleSpeed),
          (v.wobbleX = v.x + 10 * v.scalar * Math.cos(v.wobble)),
          (v.wobbleY = v.y + 10 * v.scalar * Math.sin(v.wobble)),
          (v.tiltAngle += 0.1),
          (v.tiltSin = Math.sin(v.tiltAngle)),
          (v.tiltCos = Math.cos(v.tiltAngle)),
          (v.random = Math.random() + 2)));
    var P = v.tick++ / v.totalTicks,
      $ = v.x + v.random * v.tiltCos,
      H = v.y + v.random * v.tiltSin,
      D = v.wobbleX + v.random * v.tiltCos,
      F = v.wobbleY + v.random * v.tiltSin;
    if (
      ((w.fillStyle =
        "rgba(" +
        v.color.r +
        ", " +
        v.color.g +
        ", " +
        v.color.b +
        ", " +
        (1 - P) +
        ")"),
      w.beginPath(),
      a &&
        v.shape.type === "path" &&
        typeof v.shape.path == "string" &&
        Array.isArray(v.shape.matrix))
    )
      w.fill(
        X(
          v.shape.path,
          v.shape.matrix,
          v.x,
          v.y,
          Math.abs(D - $) * 0.1,
          Math.abs(F - H) * 0.1,
          (Math.PI / 10) * v.wobble
        )
      );
    else if (v.shape.type === "bitmap") {
      var O = (Math.PI / 10) * v.wobble,
        V = Math.abs(D - $) * 0.1,
        Q = Math.abs(F - H) * 0.1,
        se = v.shape.bitmap.width * v.scalar,
        te = v.shape.bitmap.height * v.scalar,
        ue = new DOMMatrix([
          Math.cos(O) * V,
          Math.sin(O) * V,
          -Math.sin(O) * Q,
          Math.cos(O) * Q,
          v.x,
          v.y,
        ]);
      ue.multiplySelf(new DOMMatrix(v.shape.matrix));
      var ge = w.createPattern(g.transform(v.shape.bitmap), "no-repeat");
      (ge.setTransform(ue),
        (w.globalAlpha = 1 - P),
        (w.fillStyle = ge),
        w.fillRect(v.x - se / 2, v.y - te / 2, se, te),
        (w.globalAlpha = 1));
    } else if (v.shape === "circle")
      w.ellipse
        ? w.ellipse(
            v.x,
            v.y,
            Math.abs(D - $) * v.ovalScalar,
            Math.abs(F - H) * v.ovalScalar,
            (Math.PI / 10) * v.wobble,
            0,
            2 * Math.PI
          )
        : M(
            w,
            v.x,
            v.y,
            Math.abs(D - $) * v.ovalScalar,
            Math.abs(F - H) * v.ovalScalar,
            (Math.PI / 10) * v.wobble,
            0,
            2 * Math.PI
          );
    else if (v.shape === "star")
      for (
        var Y = (Math.PI / 2) * 3,
          Ne = 4 * v.scalar,
          Qe = 8 * v.scalar,
          Ye = v.x,
          ut = v.y,
          Ft = 5,
          rt = Math.PI / Ft;
        Ft--;
      )
        ((Ye = v.x + Math.cos(Y) * Qe),
          (ut = v.y + Math.sin(Y) * Qe),
          w.lineTo(Ye, ut),
          (Y += rt),
          (Ye = v.x + Math.cos(Y) * Ne),
          (ut = v.y + Math.sin(Y) * Ne),
          w.lineTo(Ye, ut),
          (Y += rt));
    else
      (w.moveTo(Math.floor(v.x), Math.floor(v.y)),
        w.lineTo(Math.floor(v.wobbleX), Math.floor(H)),
        w.lineTo(Math.floor(D), Math.floor(F)),
        w.lineTo(Math.floor($), Math.floor(v.wobbleY)));
    return (w.closePath(), w.fill(), v.tick < v.totalTicks);
  }
  function j(w, v, P, $, H) {
    var D = v.slice(),
      F = w.getContext("2d"),
      O,
      V,
      Q = c(function (se) {
        function te() {
          ((O = V = null),
            F.clearRect(0, 0, $.width, $.height),
            g.clear(),
            H(),
            se());
        }
        function ue() {
          (r &&
            !($.width === o.width && $.height === o.height) &&
            (($.width = w.width = o.width), ($.height = w.height = o.height)),
            !$.width &&
              !$.height &&
              (P(w), ($.width = w.width), ($.height = w.height)),
            F.clearRect(0, 0, $.width, $.height),
            (D = D.filter(function (ge) {
              return R(F, ge);
            })),
            D.length ? (O = m.frame(ue)) : te());
        }
        ((O = m.frame(ue)), (V = te));
      });
    return {
      addFettis: function (se) {
        return ((D = D.concat(se)), Q);
      },
      canvas: w,
      promise: Q,
      reset: function () {
        (O && m.cancel(O), V && V());
      },
    };
  }
  function U(w, v) {
    var P = !w,
      $ = !!T(v || {}, "resize"),
      H = !1,
      D = T(v, "disableForReducedMotion", Boolean),
      F = i && !!T(v || {}, "useWorker"),
      O = F ? p() : null,
      V = P ? E : b,
      Q = w && O ? !!w.__confetti_initialized : !1,
      se =
        typeof matchMedia == "function" &&
        matchMedia("(prefers-reduced-motion)").matches,
      te;
    function ue(Y, Ne, Qe) {
      for (
        var Ye = T(Y, "particleCount", d),
          ut = T(Y, "angle", Number),
          Ft = T(Y, "spread", Number),
          rt = T(Y, "startVelocity", Number),
          mu = T(Y, "decay", Number),
          hu = T(Y, "gravity", Number),
          vu = T(Y, "drift", Number),
          Sa = T(Y, "colors", x),
          gu = T(Y, "ticks", Number),
          ka = T(Y, "shapes"),
          yu = T(Y, "scalar"),
          wu = !!T(Y, "flat"),
          Ca = z(Y),
          ba = Ye,
          Jo = [],
          xu = w.width * Ca.x,
          Su = w.height * Ca.y;
        ba--;
      )
        Jo.push(
          _({
            x: xu,
            y: Su,
            angle: ut,
            spread: Ft,
            startVelocity: rt,
            color: Sa[ba % Sa.length],
            shape: ka[f(0, ka.length)],
            ticks: gu,
            decay: mu,
            gravity: hu,
            drift: vu,
            scalar: yu,
            flat: wu,
          })
        );
      return te ? te.addFettis(Jo) : ((te = j(w, Jo, V, Ne, Qe)), te.promise);
    }
    function ge(Y) {
      var Ne = D || T(Y, "disableForReducedMotion", Boolean),
        Qe = T(Y, "zIndex", Number);
      if (Ne && se)
        return c(function (rt) {
          rt();
        });
      (P && te
        ? (w = te.canvas)
        : P && !w && ((w = A(Qe)), document.body.appendChild(w)),
        $ && !Q && V(w));
      var Ye = { width: w.width, height: w.height };
      (O && !Q && O.init(w), (Q = !0), O && (w.__confetti_initialized = !0));
      function ut() {
        if (O) {
          var rt = {
            getBoundingClientRect: function () {
              if (!P) return w.getBoundingClientRect();
            },
          };
          (V(rt),
            O.postMessage({ resize: { width: rt.width, height: rt.height } }));
          return;
        }
        Ye.width = Ye.height = null;
      }
      function Ft() {
        ((te = null),
          $ && ((H = !1), t.removeEventListener("resize", ut)),
          P &&
            w &&
            (document.body.contains(w) && document.body.removeChild(w),
            (w = null),
            (Q = !1)));
      }
      return (
        $ && !H && ((H = !0), t.addEventListener("resize", ut, !1)),
        O ? O.fire(Y, Ye, Ft) : ue(Y, Ye, Ft)
      );
    }
    return (
      (ge.reset = function () {
        (O && O.reset(), te && te.reset());
      }),
      ge
    );
  }
  var W;
  function Z() {
    return (W || (W = U(null, { useWorker: !0, resize: !0 })), W);
  }
  function X(w, v, P, $, H, D, F) {
    var O = new Path2D(w),
      V = new Path2D();
    V.addPath(O, new DOMMatrix(v));
    var Q = new Path2D();
    return (
      Q.addPath(
        V,
        new DOMMatrix([
          Math.cos(F) * H,
          Math.sin(F) * H,
          -Math.sin(F) * D,
          Math.cos(F) * D,
          P,
          $,
        ])
      ),
      Q
    );
  }
  function L(w) {
    if (!a) throw new Error("path confetti are not supported in this browser");
    var v, P;
    typeof w == "string" ? (v = w) : ((v = w.path), (P = w.matrix));
    var $ = new Path2D(v),
      H = document.createElement("canvas"),
      D = H.getContext("2d");
    if (!P) {
      for (
        var F = 1e3, O = F, V = F, Q = 0, se = 0, te, ue, ge = 0;
        ge < F;
        ge += 2
      )
        for (var Y = 0; Y < F; Y += 2)
          D.isPointInPath($, ge, Y, "nonzero") &&
            ((O = Math.min(O, ge)),
            (V = Math.min(V, Y)),
            (Q = Math.max(Q, ge)),
            (se = Math.max(se, Y)));
      ((te = Q - O), (ue = se - V));
      var Ne = 10,
        Qe = Math.min(Ne / te, Ne / ue);
      P = [
        Qe,
        0,
        0,
        Qe,
        -Math.round(te / 2 + O) * Qe,
        -Math.round(ue / 2 + V) * Qe,
      ];
    }
    return { type: "path", path: v, matrix: P };
  }
  function B(w) {
    var v,
      P = 1,
      $ = "#000000",
      H =
        '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';
    typeof w == "string"
      ? (v = w)
      : ((v = w.text),
        (P = "scalar" in w ? w.scalar : P),
        (H = "fontFamily" in w ? w.fontFamily : H),
        ($ = "color" in w ? w.color : $));
    var D = 10 * P,
      F = "" + D + "px " + H,
      O = new OffscreenCanvas(D, D),
      V = O.getContext("2d");
    V.font = F;
    var Q = V.measureText(v),
      se = Math.ceil(Q.actualBoundingBoxRight + Q.actualBoundingBoxLeft),
      te = Math.ceil(Q.actualBoundingBoxAscent + Q.actualBoundingBoxDescent),
      ue = 2,
      ge = Q.actualBoundingBoxLeft + ue,
      Y = Q.actualBoundingBoxAscent + ue;
    ((se += ue + ue),
      (te += ue + ue),
      (O = new OffscreenCanvas(se, te)),
      (V = O.getContext("2d")),
      (V.font = F),
      (V.fillStyle = $),
      V.fillText(v, ge, Y));
    var Ne = 1 / P;
    return {
      type: "bitmap",
      bitmap: O.transferToImageBitmap(),
      matrix: [Ne, 0, 0, Ne, (-se * Ne) / 2, (-te * Ne) / 2],
    };
  }
  ((n.exports = function () {
    return Z().apply(this, arguments);
  }),
    (n.exports.reset = function () {
      Z().reset();
    }),
    (n.exports.create = U),
    (n.exports.shapeFromPath = L),
    (n.exports.shapeFromText = B));
})(
  (function () {
    return typeof window < "u" ? window : typeof self < "u" ? self : this || {};
  })(),
  wa,
  !1
);
const nn = wa.exports;
wa.exports.create;
function kr(e = !0) {
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
function Z0(e = {}) {
  const t = e.respectReducedMotion ?? !0,
    n = new Set();
  let r = null,
    o = 0,
    i = !1;
  const a = () => {
      typeof document > "u" ||
        (!document.hidden &&
          n.size > 0 &&
          r === null &&
          (i && (document.removeEventListener("visibilitychange", a), (i = !1)),
          (o = typeof performance < "u" ? performance.now() : Date.now()),
          (r = requestAnimationFrame(l))));
    },
    l = (c) => {
      if (typeof document < "u" && document.hidden) {
        ((r = null),
          i || ((i = !0), document.addEventListener("visibilitychange", a)));
        return;
      }
      const g = c - o;
      ((o = c),
        n.forEach((m) => m(g)),
        (r = n.size > 0 ? requestAnimationFrame(l) : null));
    },
    u = () => {
      if (r === null) {
        if (typeof document < "u" && document.hidden) {
          i || ((i = !0), document.addEventListener("visibilitychange", a));
          return;
        }
        ((o = typeof performance < "u" ? performance.now() : Date.now()),
          (r = requestAnimationFrame(l)));
      }
    };
  return {
    isMotionAllowed: () => kr(t),
    scheduleRender: (c) =>
      kr(t)
        ? (n.add(c),
          u(),
          () => {
            (n.delete(c),
              n.size === 0 &&
                (r !== null && (cancelAnimationFrame(r), (r = null)),
                i &&
                  typeof document < "u" &&
                  (document.removeEventListener("visibilitychange", a),
                  (i = !1))));
          })
        : () => {},
    destroy: () => {
      (n.clear(),
        r !== null && (cancelAnimationFrame(r), (r = null)),
        i &&
          typeof document < "u" &&
          (document.removeEventListener("visibilitychange", a), (i = !1)));
    },
  };
}
const X0 = Z0();
function J0(e) {
  return X0.scheduleRender(e);
}
function xa(e, t) {
  if (typeof e == "number") return Math.min(10, Math.max(1, Math.round(e)));
  const n = e && e !== "normal" ? e : (t ?? e ?? "normal");
  return n === "low" ? 3 : n === "high" ? 8 : 5;
}
function iu(e, t = !1) {
  const n = Math.round(5 + e * 3.1);
  return t ? Math.max(4, Math.round(n * 0.6)) : n;
}
function au(e) {
  const t = Math.max(4, 18.5 - e * 1.35),
    n = Math.max(3, 9 - e * 0.5);
  return {
    minDuration: Number(t.toFixed(1)),
    maxDuration: Number((t + n).toFixed(1)),
  };
}
const q0 = "#c9a84c",
  e3 = "#2d5a27",
  t3 = "#fff7cc";
function n3() {
  if (typeof document > "u") return !1;
  try {
    const e = document.createElement("canvas");
    return !!(e.getContext && e.getContext("2d"));
  } catch {
    return !1;
  }
}
function r3(e) {
  return e === "eid-adha"
    ? ["🐑", "🎁"]
    : e === "eid-fitr" || e === "eid"
      ? ["🎁", "✨"]
      : ["🌙", "✨"];
}
async function x1(e, t, n) {
  if (!kr() || !n3()) return;
  const r =
      t != null && t.length ? t : [q0, e3, t3, "#e8c96b", "#4a8a3a", "#ffffff"],
    [o, i] = r3(n);
  let a;
  if (typeof OffscreenCanvas < "u")
    try {
      const u = _l(o),
        c = _l(i),
        g = (e || 1447).toString(),
        m = o3(g);
      a = [u, c, m];
    } catch {
      a = void 0;
    }
  const l = {
    particleCount: 60,
    spread: 70,
    colors: r,
    ticks: 200,
    gravity: 0.8,
    scalar: a ? 1.8 : 1.2,
    drift: 0,
    disableForReducedMotion: !0,
  };
  a
    ? (nn({ ...l, angle: 60, origin: { x: 0, y: 0.85 }, shapes: [a[0], a[1]] }),
      await Gr(300),
      nn({ ...l, angle: 120, origin: { x: 1, y: 0.85 }, shapes: [a[0], a[1]] }),
      await Gr(300),
      await nn({
        ...l,
        angle: 90,
        particleCount: 80,
        spread: 100,
        origin: { x: 0.5, y: 0.7 },
        shapes: a,
        scalar: 2,
      }))
    : (nn({ ...l, angle: 60, origin: { x: 0, y: 0.85 } }),
      await Gr(300),
      nn({ ...l, angle: 120, origin: { x: 1, y: 0.85 } }),
      await Gr(300),
      await nn({
        ...l,
        angle: 90,
        particleCount: 80,
        spread: 100,
        origin: { x: 0.5, y: 0.7 },
        scalar: 1.4,
      }));
}
function _l(e) {
  const r = "20px serif";
  let i = new OffscreenCanvas(1, 1),
    a = i.getContext("2d");
  a.font = r;
  const l = a.measureText(e),
    u = 5,
    c =
      typeof l.actualBoundingBoxLeft == "number" ? l.actualBoundingBoxLeft : 0,
    g =
      typeof l.actualBoundingBoxRight == "number"
        ? l.actualBoundingBoxRight
        : l.width || 20,
    m =
      typeof l.actualBoundingBoxAscent == "number"
        ? l.actualBoundingBoxAscent
        : 20,
    p =
      typeof l.actualBoundingBoxDescent == "number"
        ? l.actualBoundingBoxDescent
        : 0,
    y = Math.max(1, Math.ceil(g + c) + u * 2),
    C = Math.max(1, Math.ceil(m + p) + u * 2),
    S = c + u,
    T = m + u;
  ((i = new OffscreenCanvas(y, C)),
    (a = i.getContext("2d")),
    (a.font = r),
    (a.lineJoin = "round"),
    (a.lineWidth = 3 * 2),
    (a.strokeStyle = "rgba(0,0,0,0.55)"),
    a.strokeText(e, S, T),
    a.fillText(e, S, T));
  const d = 1 / 2;
  return {
    type: "bitmap",
    bitmap: i.transferToImageBitmap(),
    matrix: [d, 0, 0, d, (-y * d) / 2, (-C * d) / 2],
  };
}
function o3(e) {
  const r = "bold 15px system-ui, -apple-system, sans-serif";
  let o = new OffscreenCanvas(1, 1),
    i = o.getContext("2d");
  i.font = r;
  const a = i.measureText(e),
    l = 3,
    u =
      typeof a.actualBoundingBoxLeft == "number" ? a.actualBoundingBoxLeft : 0,
    c =
      typeof a.actualBoundingBoxRight == "number"
        ? a.actualBoundingBoxRight
        : a.width || 15,
    g =
      typeof a.actualBoundingBoxAscent == "number"
        ? a.actualBoundingBoxAscent
        : 15,
    m =
      typeof a.actualBoundingBoxDescent == "number"
        ? a.actualBoundingBoxDescent
        : 0,
    p = Math.max(1, Math.ceil(c + u) + l * 2),
    y = Math.max(1, Math.ceil(g + m) + l * 2),
    C = u + l,
    S = g + l;
  ((o = new OffscreenCanvas(p, y)),
    (i = o.getContext("2d")),
    (i.font = r),
    (i.lineJoin = "round"),
    (i.lineWidth = 15 * 0.28),
    (i.strokeStyle = "#000000"),
    i.strokeText(e, C, S),
    (i.fillStyle = "#ffffff"),
    i.fillText(e, C, S));
  const T = 1 / 1.5;
  return {
    type: "bitmap",
    bitmap: o.transferToImageBitmap(),
    matrix: [T, 0, 0, T, (-p * T) / 2, (-y * T) / 2],
  };
}
function i3(e, t, n = !1) {
  return t === "off" || !kr() ? !1 : e.isRamadan || e.isEid || n;
}
function Gr(e) {
  return new Promise((t) => setTimeout(t, e));
}
const a3 = {
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
function lu(e, t) {
  return t !== void 0
    ? typeof t == "number" && !isNaN(t) && isFinite(t)
      ? Math.max(-3, Math.min(3, Math.round(t)))
      : 0
    : e
      ? (a3[e] ?? 0)
      : 0;
}
const l3 = {
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
  Dl = {
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
  s3 = {
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
  S1 = Object.freeze({
    isRamadan: !1,
    occasion: "none",
    isEid: !1,
    hijriYear: 0,
    hijriMonth: 0,
    hijriDay: 0,
    dayNumber: 0,
  });
function u3(e) {
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
    const i = (c) => {
        const g = o.find((m) => m.type === c);
        return g ? parseInt(g.value, 10) : NaN;
      },
      a = i("month"),
      l = i("day"),
      u = i("year");
    return isNaN(a) || isNaN(l) || isNaN(u)
      ? null
      : { month: a, day: l, year: u };
  } catch {
    return null;
  }
}
const Qr = 24 * 60 * 60 * 1e3;
function c3(e) {
  const t = e.getTime();
  for (const [o, i] of Object.entries(Dl)) {
    const a = new Date(i).getTime(),
      l = Math.floor((t - a) / Qr);
    if (l >= 0 && l < 3) {
      const u = parseInt(o, 10),
        c = l + 1;
      return {
        isRamadan: !1,
        occasion: "eid-fitr",
        isEid: !0,
        hijriYear: u,
        hijriMonth: 10,
        hijriDay: c,
        dayNumber: c,
      };
    }
  }
  for (const [o, i] of Object.entries(s3)) {
    const a = new Date(i).getTime(),
      l = Math.floor((t - a) / Qr);
    if (l >= 0 && l < 4) {
      const u = parseInt(o, 10),
        c = l + 1;
      return {
        isRamadan: !1,
        occasion: "eid-adha",
        isEid: !0,
        hijriYear: u,
        hijriMonth: 12,
        hijriDay: l + 10,
        dayNumber: c,
      };
    }
  }
  let n = 0,
    r = null;
  for (const [o, i] of Object.entries(l3)) {
    const a = new Date(i);
    a.getTime() <= t &&
      (!r || a.getTime() > r.getTime()) &&
      ((r = a), (n = parseInt(o, 10)));
  }
  if (r) {
    const o = Dl[n],
      i = o ? new Date(o).getTime() : r.getTime() + 30 * Qr;
    if (t < i) {
      const a = Math.floor((t - r.getTime()) / Qr) + 1;
      return {
        isRamadan: !0,
        occasion: "ramadan",
        isEid: !1,
        hijriYear: n,
        hijriMonth: 9,
        hijriDay: a,
        dayNumber: a,
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
function d3(e, t = 0, n = !1) {
  const r = typeof t == "number" ? t : 0;
  let o = typeof t == "boolean" ? t : n,
    i,
    a = r;
  if (e instanceof Date) i = e;
  else if (typeof e == "object" && e !== null) {
    const c = e;
    ((i = c.date),
      typeof c.debug == "boolean" && (o = c.debug),
      (a = lu(c.region, c.hijriAdjustment)));
  }
  let l;
  if (i instanceof Date) l = isNaN(i.getTime()) ? new Date() : i;
  else if (typeof i == "string" || typeof i == "number") {
    const c = new Date(i);
    l = isNaN(c.getTime()) ? new Date() : c;
  } else
    (i !== void 0 &&
      o &&
      typeof console < "u" &&
      console.warn &&
      console.warn(
        `[ramadan-overlay] Invalid Date "${String(i)}"; falling back to current date.`
      ),
      (l = new Date()));
  const u =
    typeof a == "number" && !isNaN(a) && isFinite(a)
      ? Math.max(-3, Math.min(3, Math.round(a)))
      : 0;
  return { targetDate: l, effectiveOffset: u };
}
function Cn(e = new Date(), t = 0) {
  const n = typeof e == "object" && e !== null && "debug" in e ? !!e.debug : !1,
    { targetDate: r, effectiveOffset: o } = d3(e, t, n),
    i = o === 0 ? r : new Date(r.getTime() - o * 24 * 60 * 60 * 1e3),
    a = u3(i);
  if (a) {
    const g = a.month === 9,
      m = a.month === 10 && a.day >= 1 && a.day <= 3,
      p = a.month === 12 && a.day >= 10 && a.day <= 13;
    let y = "none",
      C = 0;
    return (
      g
        ? ((y = "ramadan"), (C = a.day))
        : m
          ? ((y = "eid-fitr"), (C = a.day))
          : p && ((y = "eid-adha"), (C = a.day - 9)),
      {
        isRamadan: g,
        occasion: y,
        isEid: m || p,
        hijriYear: a.year,
        hijriMonth: a.month,
        hijriDay: a.day,
        dayNumber: C,
      }
    );
  }
  return c3(i);
}
function Il(e, t) {
  var n, r, o, i;
  return e
    ? typeof e == "string"
      ? e.trim()
      : (typeof e == "object" &&
          (((n = e[t]) == null ? void 0 : n.trim()) ||
            ((r = e.ramadan) == null ? void 0 : r.trim()) ||
            ((o = e["eid-fitr"]) == null ? void 0 : o.trim()) ||
            ((i = e["eid-adha"]) == null ? void 0 : i.trim()))) ||
        ""
    : "";
}
const f3 = {
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
function p3(e) {
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
function m3(e) {
  return `<svg viewBox="0 0 36 36" height="34" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="flex-shrink:0;display:block">
    <path d="M18 3 C9 3 4 10 4 18 C4 26 9 33 18 33 C12 29 10 24 10 18 C10 12 12 7 18 3 Z" fill="var(--ro-banner-icon, ${e})"/>
    <polygon points="26,10 27.2,13.5 31,13.5 28,15.5 29.2,19 26,17 22.8,19 24,15.5 21,13.5 24.8,13.5" fill="var(--ro-banner-icon, ${e})"/>
    <circle cx="15" cy="11" r="1.4" fill="var(--ro-banner-icon, ${e})" opacity="0.85"/>
    <circle cx="28" cy="25" r="1.6" fill="var(--ro-banner-icon, ${e})" opacity="0.9"/>
  </svg>`;
}
function h3(e) {
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
const k1 = 52;
function Rl(e, t, n, r, o, i, a) {
  const l = document.createElement("div");
  (l.setAttribute("role", "banner"),
    l.setAttribute("aria-label", r),
    (l.style.cssText = [
      `background:var(--ro-banner-bg, ${e})`,
      "position:fixed",
      "left:0",
      "width:100%",
      `height:${k1}px`,
      "display:flex",
      "align-items:center",
      "justify-content:center",
      "overflow:hidden",
      `z-index:${i}`,
      "box-sizing:border-box",
      `${a}:0`,
    ].join(";")));
  const u = document.createElement("div");
  u.style.cssText = `display:flex;align-items:center;justify-content:center;gap:12px;max-width:960px;width:100%;padding:0 20px;direction:${o ? "rtl" : "ltr"}`;
  const c = document.createElement("span");
  ((c.style.cssText = "display:flex;align-items:center;flex-shrink:0"),
    (c.innerHTML = n));
  const g = document.createElement("span");
  return (
    (g.textContent = r),
    (g.style.cssText = [
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
    u.appendChild(c),
    u.appendChild(g),
    l.appendChild(u),
    l
  );
}
function v3(e, t) {
  const n = e.bannerBg,
    r = e.bannerTextColor,
    o = e.bannerIconColor,
    i = e.zIndex,
    a = e.locale ?? "en",
    l = t === "eid-fitr" || t === "eid-adha" || t === "ramadan" ? t : "ramadan",
    u = Il(e.bannerTextEn, l),
    c = Il(e.bannerTextAr, l),
    g = f3[l],
    m = a === "ar" ? c || u || g.ar : u || c || g.en,
    p = a === "ar",
    y = [],
    C = document.body.style.paddingTop,
    S = document.body.style.paddingBottom,
    T = e.position !== "bottom",
    d =
      e.position === "bottom" || e.position === "both" || e.position === "full";
  let f;
  if (
    (l === "eid-fitr"
      ? (f = m3(o))
      : l === "eid-adha"
        ? (f = h3())
        : (f = p3(o)),
    T)
  ) {
    const x = Rl(n, r, f, m, p, i, "top");
    (x.style.setProperty("--ro-banner-bg", n),
      x.style.setProperty("--ro-banner-text", r),
      x.style.setProperty("--ro-banner-icon", o),
      document.body.prepend(x),
      y.push(x));
    const k = parseFloat(getComputedStyle(document.body).paddingTop) || 0;
    document.body.style.paddingTop = `${k + k1}px`;
  }
  if (d) {
    const x = Rl(n, r, f, m, p, i, "bottom");
    (x.style.setProperty("--ro-banner-bg", n),
      x.style.setProperty("--ro-banner-text", r),
      x.style.setProperty("--ro-banner-icon", o),
      document.body.appendChild(x),
      y.push(x));
    const k = parseFloat(getComputedStyle(document.body).paddingBottom) || 0;
    document.body.style.paddingBottom = `${k + k1}px`;
  }
  return {
    elements: y,
    cleanup: () => {
      (y.forEach((x) => x.remove()),
        (document.body.style.paddingTop = C),
        (document.body.style.paddingBottom = S));
    },
  };
}
function g3(e, t) {
  return `<svg width="${t}" height="${t}" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M20 3 C8 3 2 11 2 20 C2 29 8 37 20 37 C14 32 11 26 11 20 C11 14 14 8 20 3Z" fill="${e}"/>
  </svg>`;
}
function y3(e, t) {
  const n = [];
  for (let r = 0; r < 8; r++) {
    const a = (r * Math.PI) / 4,
      l = a + Math.PI / 8;
    (n.push(`${20 + 18 * Math.sin(a)},${20 - 18 * Math.cos(a)}`),
      n.push(`${20 + 9 * Math.sin(l)},${20 - 9 * Math.cos(l)}`));
  }
  return `<svg width="${t}" height="${t}" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <polygon points="${n.join(" ")}" fill="${e}"/>
  </svg>`;
}
const w3 = (e, t) => {
  const n = t.colors,
    r = [],
    o = xa(t.intensity, t.density),
    i = typeof window < "u" && window.innerWidth < 640,
    a = iu(o, i),
    { minDuration: l, maxDuration: u } = au(o),
    c = i ? 0.7 : 1;
  for (let g = 0; g < a; g++) {
    const m = Math.random() < 0.35,
      p = n[Math.floor(Math.random() * Math.min(n.length, 4))] ?? "#c9a84c",
      y = (m ? 32 : 20) * c,
      C = y + Math.random() * y * 0.6,
      S = document.createElement("div");
    ((S.className = m ? "ro-crescent" : "ro-star"),
      (S.innerHTML = m ? g3(p, C) : y3(p, C)));
    const { x: T } = uu(t.position, t.clearance, i),
      d = l + Math.random() * (u - l),
      f = d.toFixed(1),
      h = (-Math.random() * d).toFixed(1),
      x = (10 + Math.random() * 16) * (Math.random() < 0.5 ? 1 : -1),
      k = (10 + Math.random() * 16) * (Math.random() < 0.5 ? 1 : -1),
      z = (8 + Math.random() * 14) * (Math.random() < 0.5 ? 1 : -1),
      E = (5 + Math.random() * 12) * (Math.random() < 0.5 ? 1 : -1),
      b = (5 + Math.random() * 12) * (Math.random() < 0.5 ? 1 : -1),
      A = (5 + Math.random() * 12) * (Math.random() < 0.5 ? 1 : -1);
    ((S.style.cssText = `
      left:${T}%;
      top:102%;
      --ro-float-duration:${f}s;
      --ro-sway-1:${x.toFixed(1)}px;
      --ro-sway-2:${k.toFixed(1)}px;
      --ro-sway-end:${z.toFixed(1)}px;
      --ro-rot-1:${E.toFixed(1)}deg;
      --ro-rot-2:${b.toFixed(1)}deg;
      --ro-rot-3:${A.toFixed(1)}deg;
      animation-delay:${h}s;
    `),
      e.appendChild(S),
      r.push(S));
  }
  return () => {
    r.forEach((g) => g.remove());
  };
};
function x3(e, t, n) {
  return `<svg width="${n}" height="${(n * 1.5).toFixed(0)}" viewBox="0 0 32 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="overflow:visible">
    <ellipse cx="16" cy="18" rx="13" ry="16" fill="${e}" opacity="0.95"/>
    <ellipse cx="12" cy="12" rx="3.5" ry="6" fill="white" opacity="0.3" transform="rotate(-20 12 12)"/>
    <polygon points="16,34 13,38 19,38" fill="${e}"/>
    <path d="M16 38 Q19 43 14 46 T16 52" stroke="${t}" fill="none" stroke-width="1.2" opacity="0.75"/>
  </svg>`;
}
function S3(e, t, n) {
  return `<svg width="${n}" height="${n}" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="4" y="10" width="24" height="18" rx="2" fill="${e}"/>
    <rect x="2" y="8" width="28" height="5" rx="1.5" fill="${t}"/>
    <rect x="14" y="8" width="4" height="20" fill="${t}"/>
    <path d="M16 8 C13 3 8 4 10 7 C13 9 16 8 16 8 C16 8 19 9 22 7 C24 4 19 3 16 8" fill="none" stroke="${t}" stroke-width="1.8"/>
  </svg>`;
}
function k3(e, t) {
  return `<svg width="${t}" height="${t}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 0 C12 7 17 12 24 12 C17 12 12 17 12 24 C12 17 7 12 0 12 C7 12 12 7 12 0 Z" fill="${e}"/>
  </svg>`;
}
function C3(e, t, n) {
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
function b3(e, t) {
  return `<svg width="${t}" height="${t}" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M20 3 C8 3 2 11 2 20 C2 29 8 37 20 37 C14 32 11 26 11 20 C11 14 14 8 20 3Z" fill="${e}"/>
    <polygon points="26,11 27.5,15.5 32,15.5 28.5,18 30,22 26,19.5 22,22 23.5,18 20,15.5 24.5,15.5" fill="${e}"/>
  </svg>`;
}
const zi = (e, t, n) => {
  const r =
      t.variant === "eid-adha" || (t.variant === "eid" && n === "eid-adha"),
    o = t.colors,
    i = [],
    a = xa(t.intensity, t.density),
    l = typeof window < "u" && window.innerWidth < 640,
    u = iu(a, l),
    { minDuration: c, maxDuration: g } = au(a),
    m = l ? 0.7 : 1;
  for (let p = 0; p < u; p++) {
    const y = document.createElement("div"),
      C = o[0] ?? "#c9a84c",
      S = o[1] ?? "#e8c96b",
      T = o[2] ?? "#2d5a27",
      d = o[Math.floor(Math.random() * o.length)] ?? C;
    if (r)
      Math.random() < 0.5
        ? ((y.className = "ro-sheep"),
          (y.innerHTML = C3("#f8f9fa", T, Math.round(36 * m))))
        : ((y.className = "ro-crescent"),
          (y.innerHTML = b3(S, Math.round(30 * m))));
    else {
      const R = Math.random();
      R < 0.45
        ? ((y.className = "ro-balloon"),
          (y.innerHTML = x3(d, C, Math.round(26 * m))))
        : R < 0.75
          ? ((y.className = "ro-gift"),
            (y.innerHTML = S3(d, S, Math.round(24 * m))))
          : ((y.className = "ro-star"),
            (y.innerHTML = k3(S, Math.round(18 * m))));
    }
    const { x: f } = uu(t.position, t.clearance, l),
      h = c + Math.random() * (g - c),
      x = h.toFixed(1),
      k = (-Math.random() * h).toFixed(1),
      z = (10 + Math.random() * 16) * (Math.random() < 0.5 ? 1 : -1),
      E = (10 + Math.random() * 16) * (Math.random() < 0.5 ? 1 : -1),
      b = (8 + Math.random() * 14) * (Math.random() < 0.5 ? 1 : -1),
      A = (5 + Math.random() * 12) * (Math.random() < 0.5 ? 1 : -1),
      M = (5 + Math.random() * 12) * (Math.random() < 0.5 ? 1 : -1),
      _ = (5 + Math.random() * 12) * (Math.random() < 0.5 ? 1 : -1);
    ((y.style.cssText = `
      left:${f}%;
      top:102%;
      --ro-float-duration:${x}s;
      --ro-sway-1:${z.toFixed(1)}px;
      --ro-sway-2:${E.toFixed(1)}px;
      --ro-sway-end:${b.toFixed(1)}px;
      --ro-rot-1:${A.toFixed(1)}deg;
      --ro-rot-2:${M.toFixed(1)}deg;
      --ro-rot-3:${_.toFixed(1)}deg;
      animation-delay:${k}s;
    `),
      e.appendChild(y),
      i.push(y));
  }
  return () => {
    i.forEach((p) => p.remove());
  };
};
function Ol(e, t, n, r) {
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
const z3 = (e, t) => {
    const n = t.colors,
      r = n[0] ?? "#c9a84c",
      o = n[1] ?? "#e8c96b",
      i = _n(t.position);
    if (i.length > 0) {
      const c = [];
      for (const g of i) {
        const m = document.createElement("div");
        m.className = `ro-side-band ro-side-band--${g}`;
        const p = `ro-geo-tile-${g}`;
        ((m.innerHTML = `<svg width="100%" height="100%" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <pattern id="${p}" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
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
        <rect width="100%" height="100%" fill="url(#${p})"/>
      </svg>`),
          e.appendChild(m),
          c.push(m));
      }
      return () => {
        c.forEach((g) => g.remove());
      };
    }
    const a = [],
      l =
        t.position === "top"
          ? ["top"]
          : t.position === "bottom"
            ? ["bottom"]
            : t.position === "full"
              ? ["top", "bottom"]
              : ["top", "bottom"],
      u = Math.max(28, Math.min(56, Math.round(window.innerWidth * 0.035)));
    for (const c of l) {
      const g = document.createElement("div");
      ((g.className = `ro-geo-band ro-geo-band--${c}`),
        (g.innerHTML = Ol(r, o, window.innerWidth, u)),
        e.appendChild(g),
        a.push(g));
    }
    if (t.position === "full") {
      const c = document.createElement("div");
      ((c.style.cssText = `
      position:absolute;inset:0;width:100%;height:100%;opacity:0.08;overflow:hidden;
    `),
        (c.innerHTML = Ol(r, o, window.innerWidth, window.innerHeight)),
        e.appendChild(c),
        a.push(c));
    }
    return () => {
      a.forEach((c) => c.remove());
    };
  },
  Hn = [
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
  su = (e, t) => {
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
      ].map((z, E) => (n && n.length > 0 ? n[E % n.length] : z));
    t.ceilingColor;
    const i = t.ropeColor;
    function a(z, E) {
      const { viewBox: b, gContent: A } = Hn[z],
        M = A.replace(/LANTERN_COLOR/g, E);
      return `<svg viewBox="${b}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${M}</svg>`;
    }
    const l = _n(t.position);
    if (l.length > 0) {
      const z = [];
      let E = Math.max(2, Math.min(6, Math.round(window.innerHeight / 220)));
      const b = (M) => {
        for (const _ of z) {
          _.querySelectorAll(".ro-lantern-unit").forEach((j) => j.remove());
          for (let j = 0; j < M; j++) {
            const U =
                t.lanternStyle > 0
                  ? (t.lanternStyle - 1) % Hn.length
                  : j % Hn.length,
              W = o[j % o.length],
              Z = (3.2 + ((j * 0.23) % 1.2)).toFixed(1),
              X = -((j * 0.73) % parseFloat(Z)),
              L = (10 + (j * 80) / (M > 1 ? M - 1 : 1)).toFixed(1),
              B = document.createElement("div");
            ((B.className = "ro-lantern-unit"),
              (B.style.top = `${L}%`),
              B.style.setProperty("--ro-swing-duration", `${Z}s`),
              (B.style.animationDelay = `${X.toFixed(2)}s`));
            const w = document.createElement("div");
            ((w.className = "ro-lantern-dropline"), (w.style.background = i));
            const v = document.createElement("div");
            ((v.className = "ro-lantern-svg-wrap"),
              (v.innerHTML = a(U, W)),
              B.appendChild(w),
              B.appendChild(v),
              _.appendChild(B));
          }
        }
      };
      for (const M of l) {
        const _ = document.createElement("div");
        _.className = `ro-lantern-side ro-lantern-side--${M}`;
        const R = document.createElement("div");
        ((R.className = "ro-lantern-spine"),
          _.appendChild(R),
          e.appendChild(_),
          z.push(_));
      }
      b(E);
      const A = () => {
        const M = Math.max(
          2,
          Math.min(6, Math.round(window.innerHeight / 220))
        );
        M !== E && ((E = M), b(E));
      };
      return (
        window.addEventListener("resize", A, { passive: !0 }),
        () => {
          (z.forEach((M) => M.remove()),
            window.removeEventListener("resize", A));
        }
      );
    }
    function u(z, E, b, A) {
      const M = E.length;
      let _ = `M 0 ${b}`;
      const R = E[0] / 2,
        j = b + A * 1.5;
      _ += ` Q ${R.toFixed(1)} ${j.toFixed(1)}, ${E[0].toFixed(1)} ${b}`;
      for (let X = 0; X < M - 1; X++) {
        const L = E[X],
          B = E[X + 1],
          w = (L + B) / 2,
          v = b + A * 2;
        _ += ` Q ${w.toFixed(1)} ${v.toFixed(1)}, ${B.toFixed(1)} ${b}`;
      }
      const W = (E[M - 1] + z) / 2,
        Z = b + A * 1.5;
      return ((_ += ` Q ${W.toFixed(1)} ${Z.toFixed(1)}, ${z} ${b}`), _);
    }
    function c(z, E, b, A) {
      E.forEach((M) => {
        const _ = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );
        (_.setAttribute("x1", M.toFixed(1)),
          _.setAttribute("y1", String(b)),
          _.setAttribute("x2", M.toFixed(1)),
          _.setAttribute("y2", A.toFixed(1)),
          _.setAttribute("stroke", "var(--ro-rope)"),
          _.setAttribute("stroke-width", "1.5"),
          _.setAttribute("class", "ro-dropline-path"),
          z.appendChild(_));
      });
    }
    function g(z, E, b, A) {
      const _ = document.createElementNS("http://www.w3.org/2000/svg", "line");
      return (
        _.setAttribute("x1", "0"),
        _.setAttribute("y1", String(2)),
        _.setAttribute("x2", String(E)),
        _.setAttribute("y2", String(2)),
        _.setAttribute("stroke", "var(--ro-ceiling)"),
        _.setAttribute("stroke-width", "3"),
        _.setAttribute("stroke-opacity", "0.75"),
        _.setAttribute("class", "ro-rope-path"),
        z.appendChild(_),
        c(z, b, 2, 2 + A),
        2 + A
      );
    }
    function m(z, E, b, A, M) {
      const R = document.createElementNS("http://www.w3.org/2000/svg", "path");
      return (
        R.setAttribute("d", u(E, b, 4, A)),
        R.setAttribute("stroke", "var(--ro-ceiling)"),
        R.setAttribute("stroke-width", "2.2"),
        R.setAttribute("stroke-opacity", "0.85"),
        R.setAttribute("class", "ro-rope-path"),
        z.appendChild(R),
        c(z, b, 4, 4 + M),
        4 + M
      );
    }
    function p(z, E, b, A, M) {
      const U = document.createElementNS("http://www.w3.org/2000/svg", "path");
      (U.setAttribute("d", u(E, b, 2, A)),
        U.setAttribute("stroke", "var(--ro-ceiling)"),
        U.setAttribute("stroke-width", "2.0"),
        U.setAttribute("stroke-opacity", "0.85"),
        U.setAttribute("class", "ro-rope-path"),
        z.appendChild(U));
      const W = document.createElementNS("http://www.w3.org/2000/svg", "path");
      return (
        W.setAttribute("d", u(E, b, 16, A)),
        W.setAttribute("stroke", "var(--ro-ceiling)"),
        W.setAttribute("stroke-width", "1.6"),
        W.setAttribute("stroke-opacity", "0.65"),
        W.setAttribute("class", "ro-rope-path"),
        z.appendChild(W),
        c(z, b, 2, 16 + M),
        16 + M
      );
    }
    const y = 28,
      C = t.ropeStyle ?? "straight",
      S = t.ropeSag ?? 20,
      T = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    (T.setAttribute("class", "ro-lantern-ropes"),
      T.setAttribute("aria-hidden", "true"),
      T.setAttribute("width", "100%"),
      T.setAttribute("height", "100%"));
    const d = document.createElement("div");
    d.className = "ro-lantern-row";
    let f = 0,
      h = [];
    const x = () => {
      var _;
      const z =
          (typeof window < "u" && window.innerWidth) ||
          (typeof document < "u" &&
            ((_ = document.documentElement) == null
              ? void 0
              : _.clientWidth)) ||
          1024,
        E = Math.max(4, Math.min(12, Math.round(z / 120))),
        b = z < 600 ? Math.max(6, Math.round(S * (z / 600))) : S,
        A = [];
      for (let R = 0; R < E; R++) A.push((R + 0.5) * (z / E));
      T.innerHTML = "";
      let M = 2 + y;
      if (
        (C === "u-shaped"
          ? (M = m(T, z, A, b, y))
          : C === "dual"
            ? (M = p(T, z, A, b, y))
            : (M = g(T, z, A, y)),
        E !== f || h.length !== E)
      ) {
        ((d.innerHTML = ""), (h = []), (f = E));
        for (let R = 0; R < E; R++) {
          const j =
              t.lanternStyle > 0
                ? (t.lanternStyle - 1) % Hn.length
                : R % Hn.length,
            U = o[R % o.length],
            W = (2.5 + ((R * 0.17) % 1.5)).toFixed(1),
            Z = -((R * 0.37) % parseFloat(W)),
            X = document.createElement("div");
          ((X.className = "ro-lantern"),
            X.style.setProperty("--ro-swing-duration", `${W}s`),
            (X.style.animationDelay = `${Z.toFixed(2)}s`),
            (X.style.left = `${A[R].toFixed(1)}px`),
            (X.style.top = `${M}px`));
          const L = document.createElement("div");
          ((L.innerHTML = a(j, U)),
            X.appendChild(L),
            d.appendChild(X),
            h.push(X));
        }
      } else
        for (let R = 0; R < E; R++)
          ((h[R].style.left = `${A[R].toFixed(1)}px`),
            (h[R].style.top = `${M}px`));
    };
    (e.appendChild(T), e.appendChild(d), x());
    const k = () => {
      x();
    };
    return (
      window.addEventListener("resize", k, { passive: !0 }),
      () => {
        (T.remove(), d.remove(), window.removeEventListener("resize", k));
      }
    );
  };
function T3(e, t) {
  return `<svg width="${t}" height="${t}" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M20 3 C8 3 2 11 2 20 C2 29 8 37 20 37 C14 32 11 26 11 20 C11 14 14 8 20 3Z" fill="${e}"/>
  </svg>`;
}
function E3(e, t) {
  const n = [];
  for (let r = 0; r < 8; r++) {
    const a = (r * Math.PI) / 4,
      l = a + Math.PI / 8;
    (n.push(`${20 + 18 * Math.sin(a)},${20 - 18 * Math.cos(a)}`),
      n.push(`${20 + 9 * Math.sin(l)},${20 - 9 * Math.cos(l)}`));
  }
  return `<svg width="${t}" height="${t}" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <polygon points="${n.join(" ")}" fill="${e}"/>
  </svg>`;
}
const M3 = (e, t) => {
  if (!kr()) return () => {};
  const n = t.colors.length
      ? t.colors
      : ["#c9a84c", "#e8c96b", "#fff7cc", "#4a8a3a"],
    r = xa(t.intensity, t.density),
    o = Math.round(12 + r * 6.5),
    i = 0.5 + (r / 10) * 0.8,
    a = [];
  function l() {
    const g = n[Math.floor(Math.random() * n.length)],
      m = Math.random(),
      p = document.createElement("div");
    let y;
    (m < 0.18
      ? ((y = 18 + Math.random() * 14),
        (p.className = "ro-crescent"),
        (p.innerHTML = T3(g, y)),
        (p.style.cssText = `
        position:absolute;
        width:${y}px;height:${y}px;
        filter:drop-shadow(0 0 ${y * 0.5}px ${g});
        animation:none;
      `))
      : m < 0.38
        ? ((y = 14 + Math.random() * 12),
          (p.className = "ro-star"),
          (p.innerHTML = E3(g, y)),
          (p.style.cssText = `
        position:absolute;
        width:${y}px;height:${y}px;
        filter:drop-shadow(0 0 ${y * 0.5}px ${g});
        animation:none;
      `))
        : ((y = 3 + Math.random() * 7),
          (p.className = "ro-sparkle"),
          (p.style.cssText = `
        position:absolute;
        width:${y}px;height:${y}px;
        background:${g};
        box-shadow:0 0 ${y * 1.5}px ${g};
        animation:none;
      `)),
      e.appendChild(p));
    let C, S;
    const T = t.position,
      d = _n(T);
    d.length > 0
      ? ((C =
          d[Math.floor(Math.random() * d.length)] === "left"
            ? Math.random() * 4
            : 96 + Math.random() * 4),
        (S = Math.random() * 100))
      : T === "top"
        ? ((C = Math.random() * 100), (S = Math.random() * 20))
        : T === "bottom"
          ? ((C = Math.random() * 100), (S = 80 + Math.random() * 20))
          : T === "full"
            ? ((C = Math.random() * 100), (S = Math.random() * 100))
            : ((C = Math.random() * 100),
              (S =
                Math.random() < 0.5
                  ? Math.random() * 20
                  : 80 + Math.random() * 20));
    const f = 80 + Math.random() * 80;
    return (
      (p.style.left = `${C}%`),
      (p.style.top = `${S}%`),
      {
        el: p,
        x: C,
        y: S,
        vx: (Math.random() - 0.5) * 0.06 * i,
        vy: (-0.035 - Math.random() * 0.055) * i,
        size: y,
        opacity: 0,
        life: 0,
        maxLife: f,
        color: g,
      }
    );
  }
  for (; a.length < o;) a.push(l());
  function u(g) {
    for (; a.length < o;) a.push(l());
    for (let m = a.length - 1; m >= 0; m--) {
      const p = a[m];
      (p.life++, (p.x += p.vx), (p.y += p.vy));
      const y = p.life / p.maxLife;
      ((p.opacity = y < 0.3 ? y / 0.3 : y > 0.7 ? (1 - y) / 0.3 : 1),
        (p.el.style.left = `${p.x}%`),
        (p.el.style.top = `${p.y}%`),
        (p.el.style.opacity = String(Math.min(1, Math.max(0, p.opacity)))),
        (p.el.style.transform = `scale(${0.5 + p.opacity * 0.5})`),
        p.life >= p.maxLife && (p.el.remove(), a.splice(m, 1)));
    }
  }
  const c = J0(u);
  return () => {
    (c(), a.forEach((g) => g.el.remove()), (a.length = 0));
  };
};
function _n(
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
function N3(e) {
  const t = _n(e);
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
function uu(
  e,
  t = "edges",
  n = typeof window < "u" && window.innerWidth < 640
) {
  if (t === "edges") {
    const o =
      Math.random() < 0.5 ? 2 + Math.random() * 16 : 82 + Math.random() * 16;
    let i;
    return (
      n
        ? (i =
            Math.random() < 0.5
              ? 2 + Math.random() * 20
              : 78 + Math.random() * 18)
        : (i = Math.random() * 95),
      { x: Number(o.toFixed(2)), y: Number(i.toFixed(2)) }
    );
  }
  return N3(e);
}
const j3 = {
    lanterns: su,
    "crescent-stars": w3,
    geometric: z3,
    sparkles: M3,
    eid: zi,
    "eid-fitr": zi,
    "eid-adha": zi,
  },
  A3 = "ramadan-overlay-root",
  C1 = "ramadan-overlay-styles";
function L3() {
  var e, t;
  try {
    if (typeof document > "u") return;
    ((e = document.getElementById(A3)) == null || e.remove(),
      (t = document.getElementById(C1)) == null || t.remove());
  } catch {}
}
function P3() {
  if (typeof document > "u" || document.getElementById(C1)) return;
  const e = `
#ramadan-overlay-root{--ro-color-1:#c9a84c;--ro-color-2:#e8c96b;--ro-color-3:#8b4513;--ro-color-4:#2d5a27;--ro-color-5:#1a3a1a;--ro-opacity:0.85;--ro-z:9999;--ro-lantern-z:2;--ro-shadow:drop-shadow(0 6px 12px rgba(0,0,0,0.18));--ro-gutter-width:clamp(28px,4vw,64px);--ro-lantern-side-size:clamp(20px,2.8vw,36px);position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:var(--ro-z);overflow:hidden;opacity:var(--ro-opacity);will-change:opacity;contain:strict}
#ramadan-overlay-root .ro-lantern-row{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:var(--ro-lantern-z,2)}
#ramadan-overlay-root .ro-lantern{position:absolute;display:flex;flex-direction:column;align-items:center;translate:-50% 0;transform-origin:top center;animation:ro-swing var(--ro-swing-duration,3s) cubic-bezier(0.25,1,0.5,1) infinite alternate;z-index:var(--ro-lantern-z,2)}
#ramadan-overlay-root .ro-lantern svg{width:var(--ro-lantern-size,clamp(18px,2.5vw,38px));height:auto;animation:ro-glow-pulse 2.5s ease-in-out infinite;will-change:transform,opacity}
#ramadan-overlay-root .ro-lantern-string{width:1px;height:var(--ro-string-height,clamp(20px,3vw,48px));background:var(--ro-color-1);opacity:.7}
#ramadan-overlay-root .ro-lantern-ropes{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;shape-rendering:geometricPrecision;filter:var(--ro-shadow,none)}
#ramadan-overlay-root .ro-rope-path{fill:none;stroke-linecap:round;stroke-linejoin:round;vector-effect:non-scaling-stroke}
#ramadan-overlay-root .ro-dropline-path{fill:none;stroke-linecap:round;vector-effect:non-scaling-stroke}
#ramadan-overlay-root .ro-lantern-side,#ramadan-overlay-root .ro-side-band{position:fixed;top:0;bottom:0;height:100vh;height:100dvh;width:var(--ro-gutter-width,clamp(28px,4vw,64px));pointer-events:none;overflow:hidden;contain:strict;z-index:var(--ro-lantern-z,var(--ro-z,9999))}
#ramadan-overlay-root .ro-lantern-side--left,#ramadan-overlay-root .ro-side-band--left{left:0}
#ramadan-overlay-root .ro-lantern-side--right,#ramadan-overlay-root .ro-side-band--right{right:0}
#ramadan-overlay-root .ro-lantern-spine{position:absolute;top:0;bottom:0;left:50%;width:2px;transform:translateX(-50%);background:linear-gradient(180deg,transparent 0%,var(--ro-ceiling,#8b4513) 5%,var(--ro-ceiling,#8b4513) 95%,transparent 100%);opacity:0.5}
#ramadan-overlay-root .ro-lantern-unit{position:absolute;left:50%;transform-origin:top center;animation:ro-swing-side var(--ro-swing-duration,3.5s) cubic-bezier(0.25,1,0.5,1) infinite alternate;will-change:transform}
#ramadan-overlay-root .ro-lantern-dropline{width:1.5px;height:24px;margin:0 auto;background:var(--ro-rope,#8b4513)}
#ramadan-overlay-root .ro-lantern-svg-wrap svg{display:block;width:var(--ro-lantern-side-size,clamp(20px,2.8vw,36px));height:auto;filter:drop-shadow(0 2px 8px rgba(232,201,107,0.4)) var(--ro-shadow,none)}
#ramadan-overlay-root .ro-side-band svg{width:100%;height:100%;display:block}
#ramadan-overlay-root .ro-crescent,#ramadan-overlay-root .ro-star,#ramadan-overlay-root .ro-balloon,#ramadan-overlay-root .ro-gift,#ramadan-overlay-root .ro-sheep{position:absolute;top:102%;animation:ro-ascend var(--ro-float-duration,12s) linear infinite;will-change:transform,opacity;filter:var(--ro-shadow,none)}
#ramadan-overlay-root .ro-sparkle{position:absolute;border-radius:50%;background:var(--ro-color-2);opacity:0;will-change:transform,opacity}
#ramadan-overlay-root .ro-geo-band{position:absolute;left:0;width:100%;overflow:hidden;opacity:.6}
#ramadan-overlay-root .ro-geo-band--top{top:0}
#ramadan-overlay-root .ro-geo-band--bottom{bottom:0}
#ramadan-overlay-root .ro-geo-band svg{width:100%;height:100%}
#ramadan-overlay-root.ro-layer--background{z-index:-1!important}
#ramadan-overlay-root.ro-scoped-host{position:absolute!important;inset:0!important;width:100%!important;height:100%!important}
@keyframes ro-swing{from{transform:rotate(-8deg)}to{transform:rotate(8deg)}}
@keyframes ro-swing-side{0%{transform:translateX(-50%) rotate(-3.5deg)}100%{transform:translateX(-50%) rotate(3.5deg)}}
@keyframes ro-float{from{transform:translateY(0) rotate(0deg);opacity:.7}to{transform:translateY(-12px) rotate(10deg);opacity:1}}
@keyframes ro-ascend{0%{transform:translateY(0) translateX(0) rotate(0deg);opacity:0}8%{opacity:.9}30%{transform:translateY(calc(-32vh - 40px)) translateX(var(--ro-sway-1,16px)) rotate(var(--ro-rot-1,10deg))}60%{transform:translateY(calc(-65vh - 80px)) translateX(var(--ro-sway-2,-14px)) rotate(var(--ro-rot-2,-8deg))}85%{opacity:.85}100%{transform:translateY(calc(-105vh - 140px)) translateX(var(--ro-sway-end,8px)) rotate(var(--ro-rot-3,15deg));opacity:0}}
@keyframes ro-glow-pulse{0%,100%{filter:drop-shadow(0 2px 6px var(--ro-glow,rgba(201,168,76,0.5))) var(--ro-shadow,none)}50%{filter:drop-shadow(0 2px 18px var(--ro-glow,rgba(201,168,76,0.9))) drop-shadow(0 0 8px var(--ro-glow,rgba(201,168,76,0.6))) var(--ro-shadow,none)}}
@media(prefers-reduced-motion:reduce){#ramadan-overlay-root *{animation:none!important;transition:none!important}}
@media (max-width: 767px){#ramadan-overlay-root[data-mobile-side="hide"] .ro-lantern-side,#ramadan-overlay-root[data-mobile-side="hide"] .ro-side-band,#ramadan-overlay-root[data-mobile-side="hide"][data-is-side="true"] > *{display:none!important}}
  `,
    t = document.createElement("style");
  ((t.id = C1), (t.textContent = e), document.head.appendChild(t));
}
function Bl(e, t) {
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
    t.colors.forEach((o, i) => {
      n.setProperty(`--ro-color-${i + 1}`, o);
    }),
    e.setAttribute("data-theme", t.themeName ?? "classic"),
    e.setAttribute("data-shadows", t.shadows ?? "soft"),
    e.setAttribute("data-mobile-side", t.mobileSideBehavior),
    e.setAttribute("data-position", t.position),
    e.setAttribute("data-clearance", t.clearance),
    e.setAttribute("data-layer", t.layer),
    _n(t.position).length > 0
      ? e.setAttribute("data-is-side", "true")
      : e.removeAttribute("data-is-side"));
}
function _3(e, t) {
  return e.variant === "banner" ? I3(e, t) : D3(e, t);
}
function D3(e, t) {
  var g, m;
  P3();
  const n = document.createElement("div");
  ((n.id = "ramadan-overlay-root"),
    n.setAttribute("aria-hidden", "true"),
    n.setAttribute("role", "presentation"),
    Bl(n, e));
  let r = document.body,
    o = !1;
  if (e.mountTarget)
    if (typeof e.mountTarget == "string") {
      const p = document.querySelector(e.mountTarget);
      p && ((r = p), (o = !0));
    } else
      typeof HTMLElement < "u" &&
        e.mountTarget instanceof HTMLElement &&
        ((r = e.mountTarget), (o = !0));
  if (o) {
    n.classList.add("ro-scoped-host");
    const p =
      (m =
        (g = window.getComputedStyle) == null ? void 0 : g.call(window, r)) ==
      null
        ? void 0
        : m.position;
    (p === "static" || !p) && (r.style.position = "relative");
  }
  r.appendChild(n);
  const a = (j3[e.variant] ?? su)(n, e, t),
    l = () => {
      n.style.visibility = document.hidden ? "hidden" : "";
    };
  return (
    document.addEventListener("visibilitychange", l),
    {
      container: n,
      cleanup: () => {
        (a(), document.removeEventListener("visibilitychange", l), n.remove());
      },
      updateTokens: (p) => {
        Bl(n, p);
      },
    }
  );
}
function I3(e, t) {
  const { elements: n, cleanup: r } = v3(e, t);
  return {
    container: n[0] ?? document.body,
    cleanup: r,
    updateTokens: (a) => {
      for (const l of n)
        (l.style.setProperty("--ro-banner-bg", a.bannerBg),
          l.style.setProperty("--ro-banner-text", a.bannerTextColor),
          l.style.setProperty("--ro-banner-icon", a.bannerIconColor));
    },
  };
}
const R3 = {
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
function O3(e = "auto", t) {
  var i, a;
  let n = "en";
  return (
    e === "ar"
      ? (n = "ar")
      : e === "en"
        ? (n = "en")
        : typeof document < "u" &&
          ((
            ((i = document.documentElement.lang) == null
              ? void 0
              : i.toLowerCase()) || ""
          ).startsWith("ar") ||
            (typeof navigator < "u" &&
              (a = navigator.language) != null &&
              a.toLowerCase().startsWith("ar"))) &&
          (n = "ar"),
    { dict: { ...R3[n], ...t }, isRtl: n === "ar", lang: n }
  );
}
const B3 = [30, 15, 5, 1];
class F3 {
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
    if (B3.includes(n) && !this.announcedMilestones.has(n)) {
      this.announcedMilestones.add(n);
      const r = this.dict.srMilestoneMinutes.replace("{minutes}", String(n));
      this.announcerEl.textContent = r;
    }
  }
}
function $3(e, t) {
  const n = (r) => {
    var o, i;
    r.key === "Escape" &&
      (r.stopPropagation(),
      t(),
      typeof document < "u" &&
        document.body &&
        ((i = (o = document.body).focus) == null || i.call(o)));
  };
  return (
    e.addEventListener("keydown", n),
    () => {
      e.removeEventListener("keydown", n);
    }
  );
}
async function V3(e) {
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
async function H3(e) {
  if (typeof window > "u") return !1;
  try {
    let t = e;
    if (!t || t.state === "closed") {
      const i = window.AudioContext || window.webkitAudioContext;
      if (!i) return !1;
      t = new i();
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
    for (const i of o) {
      const a = n + i.time,
        l = a + i.duration,
        u = t.createOscillator();
      ((u.type = "sine"), u.frequency.setValueAtTime(i.freq, a));
      const c = t.createOscillator();
      ((c.type = "sine"), c.frequency.setValueAtTime(i.freq * 2.01, a));
      const g = t.createGain();
      (g.gain.setValueAtTime(1e-4, a),
        g.gain.exponentialRampToValueAtTime(i.gain, a + 0.025),
        g.gain.exponentialRampToValueAtTime(1e-4, l));
      const m = t.createGain();
      (m.gain.setValueAtTime(1e-4, a),
        m.gain.exponentialRampToValueAtTime(i.gain * 0.2, a + 0.02),
        m.gain.exponentialRampToValueAtTime(1e-4, a + 0.7),
        u.connect(g),
        g.connect(r),
        c.connect(m),
        m.connect(r),
        u.start(a),
        u.stop(l),
        c.start(a),
        c.stop(a + 0.75));
    }
    return !0;
  } catch (t) {
    return (console.debug("[ramadan-overlay] Web Audio chime error:", t), !1);
  }
}
class U3 {
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
      const o = await V3(this.audio);
      return (o || (n = this.onAudioBlocked) == null || n.call(this), o);
    }
    const t = await H3(this.audioCtx);
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
const b1 = "ramadan-countdown-styles",
  W3 = "ramadan-countdown-root";
function G3() {
  var e, t;
  try {
    if (typeof document > "u") return;
    ((e = document.getElementById(W3)) == null || e.remove(),
      (t = document.getElementById(b1)) == null || t.remove());
  } catch {}
}
function Q3() {
  if (typeof document > "u" || document.getElementById(b1)) return;
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
  ((t.id = b1), (t.textContent = e), document.head.appendChild(t));
}
function Y3(e) {
  Q3();
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
    i = document.createElement("div");
  ((i.className = "ro-countdown-card"),
    i.setAttribute("role", "region"),
    i.setAttribute("aria-label", e.labels.title));
  const a = document.createElement("div");
  a.className = "ro-countdown-header";
  const l = document.createElement("span");
  ((l.className = "ro-countdown-badge"), (l.textContent = "🌙"));
  const u = document.createElement("div");
  u.className = "ro-countdown-titles";
  const c = document.createElement("h3");
  ((c.className = "ro-countdown-title"), (c.textContent = e.labels.title));
  const g = document.createElement("span");
  ((g.className = "ro-countdown-target"),
    (g.textContent = o),
    u.appendChild(c),
    u.appendChild(g));
  const m = document.createElement("div");
  m.className = "ro-countdown-actions";
  let p = null;
  e.hasSound &&
    ((p = document.createElement("button")),
    (p.type = "button"),
    (p.className = "ro-countdown-btn ro-countdown-sound-btn"),
    p.setAttribute(
      "aria-label",
      e.initialMuted ? e.labels.unmuteButton : e.labels.muteButton
    ),
    p.setAttribute("aria-pressed", String(!e.initialMuted)),
    (p.innerHTML = e.initialMuted
      ? '<span class="ro-countdown-icon">🔇</span>'
      : '<span class="ro-countdown-icon">🔊</span>'),
    p.addEventListener("click", () => {
      var D;
      p != null && p.classList.contains("ro-countdown-btn--prompt")
        ? (p.classList.remove("ro-countdown-btn--prompt"),
          (D = e.onPlayAlert) == null || D.call(e))
        : e.onToggleSound();
    }),
    m.appendChild(p));
  const y = e.minimizable !== !1;
  let C = null;
  y &&
    ((C = document.createElement("button")),
    (C.type = "button"),
    (C.className = "ro-countdown-btn ro-countdown-minimize-btn"),
    C.setAttribute("aria-label", e.labels.minimizeButton),
    (C.innerHTML = '<span class="ro-countdown-icon">−</span>'),
    C.addEventListener("click", (D) => {
      (D.stopPropagation(), W());
    }),
    m.appendChild(C));
  const S = document.createElement("button");
  ((S.type = "button"),
    (S.className = "ro-countdown-btn ro-countdown-close-btn"),
    S.setAttribute("aria-label", e.labels.dismissButton),
    (S.innerHTML = '<span class="ro-countdown-icon">✕</span>'),
    S.addEventListener("click", () => {
      e.onDismiss();
    }),
    m.appendChild(S),
    a.appendChild(l),
    a.appendChild(u),
    a.appendChild(m),
    i.appendChild(a));
  const T = document.createElement("div");
  ((T.className = "ro-countdown-digits"),
    T.setAttribute("aria-hidden", "true"));
  const d = (D, F) => {
      const O = document.createElement("span");
      ((O.className = `ro-countdown-value ${D}`), (O.textContent = "00"));
      const V = document.createElement("div");
      V.className = "ro-countdown-unit";
      const Q = document.createElement("span");
      return (
        (Q.className = "ro-countdown-label"),
        (Q.textContent = F),
        V.appendChild(O),
        V.appendChild(Q),
        { unit: V, val: O }
      );
    },
    { unit: f, val: h } = d("ro-val-hours", e.labels.hours),
    x = document.createElement("span");
  ((x.className = "ro-countdown-sep"), (x.textContent = ":"));
  const { unit: k, val: z } = d("ro-val-minutes", e.labels.minutes),
    E = document.createElement("span");
  ((E.className = "ro-countdown-sep"), (E.textContent = ":"));
  const { unit: b, val: A } = d("ro-val-seconds", e.labels.seconds);
  (T.appendChild(f),
    T.appendChild(x),
    T.appendChild(k),
    T.appendChild(E),
    T.appendChild(b),
    i.appendChild(T));
  const M = document.createElement("div");
  ((M.className = "ro-countdown-celebration"),
    (M.style.display = "none"),
    (M.innerHTML = `
    <span class="ro-celebration-badge">✨</span>
    <p class="ro-celebration-text">${e.labels.celebration}</p>
  `),
    i.appendChild(M));
  const _ = document.createElement("div");
  ((_.className = "ro-sr-only ro-countdown-announcer"),
    _.setAttribute("role", "status"),
    _.setAttribute("aria-live", "polite"),
    _.setAttribute("aria-atomic", "true"),
    i.appendChild(_));
  let R = null,
    j = null;
  if (y) {
    ((R = document.createElement("div")),
      (R.className = "ro-countdown-pill"),
      R.setAttribute("role", "button"),
      R.setAttribute("tabindex", "0"),
      R.setAttribute("aria-label", e.labels.expandButton));
    const D = document.createElement("span");
    ((D.className = "ro-countdown-pill-badge"), (D.textContent = "🌙"));
    const F = document.createElement("span");
    ((F.className = "ro-countdown-pill-target"), (F.textContent = r));
    const O = document.createElement("span");
    ((O.className = "ro-countdown-pill-sep"),
      (O.textContent = "·"),
      (j = document.createElement("span")),
      (j.className = "ro-countdown-pill-time"),
      (j.textContent = "--:--"),
      R.appendChild(D),
      R.appendChild(F),
      R.appendChild(O),
      R.appendChild(j),
      R.addEventListener("click", () => {
        Z();
      }),
      R.addEventListener("keydown", (V) => {
        (V.key === "Enter" || V.key === " ") && (V.preventDefault(), Z());
      }),
      t.appendChild(R));
  }
  (t.appendChild(i), document.body.appendChild(t));
  let U = !1;
  const W = () => {
      var D;
      if (y) {
        ((U = !0), t.classList.add("ro-countdown-host--minimized"));
        try {
          typeof sessionStorage < "u" &&
            sessionStorage.setItem("ro_countdown_minimized", "true");
        } catch {}
        (D = e.onMinimize) == null || D.call(e);
      }
    },
    Z = () => {
      var D;
      if (y) {
        ((U = !1), t.classList.remove("ro-countdown-host--minimized"));
        try {
          typeof sessionStorage < "u" &&
            sessionStorage.setItem("ro_countdown_minimized", "false");
        } catch {}
        (D = e.onExpand) == null || D.call(e);
      }
    },
    X = () => U;
  if (y) {
    let D = e.initiallyMinimized ?? !1;
    try {
      if (typeof sessionStorage < "u") {
        const F = sessionStorage.getItem("ro_countdown_minimized");
        F === "true" ? (D = !0) : F === "false" && (D = !1);
      }
    } catch {}
    D && W();
  }
  const L = $3(t, e.onDismiss),
    B = new F3(_, e.labels),
    w = (D) => {
      const F = Math.max(0, Math.floor(D / 1e3)),
        O = Math.floor(F / 3600),
        V = Math.floor((F % 3600) / 60),
        Q = F % 60;
      ((h.textContent = String(O).padStart(2, "0")),
        (z.textContent = String(V).padStart(2, "0")),
        (A.textContent = String(Q).padStart(2, "0")),
        j &&
          !i.classList.contains("ro-countdown--celebrating") &&
          (O > 0
            ? (j.textContent = `${O}h ${V}m`)
            : (j.textContent = `${V}m ${String(Q).padStart(2, "0")}s`)),
        B.checkMilestone(D));
    },
    v = () => {
      (i.classList.add("ro-countdown--celebrating"),
        R &&
          (R.classList.add("ro-countdown--celebrating"),
          j && (j.textContent = e.labels.celebration)),
        (T.style.display = "none"),
        (M.style.display = "flex"),
        B.checkMilestone(0));
    };
  return {
    root: t,
    updateDigits: w,
    showCelebration: v,
    triggerCelebrationFlare: v,
    endCelebration: () => {
      (i.classList.remove("ro-countdown--celebrating"),
        R && R.classList.remove("ro-countdown--celebrating"),
        (M.style.display = "none"),
        (T.style.display = "flex"));
    },
    updateSoundButton: (D, F) => {
      p &&
        (p.setAttribute(
          "aria-label",
          D ? e.labels.unmuteButton : e.labels.muteButton
        ),
        p.setAttribute("aria-pressed", String(!D)),
        F
          ? (p.classList.add("ro-countdown-btn--prompt"),
            (p.innerHTML = '<span class="ro-countdown-icon">🔊</span>'),
            p.setAttribute("aria-label", e.labels.playButton))
          : (p.classList.remove("ro-countdown-btn--prompt"),
            (p.innerHTML = D
              ? '<span class="ro-countdown-icon">🔇</span>'
              : '<span class="ro-countdown-icon">🔊</span>')));
    },
    minimize: W,
    expand: Z,
    isMinimized: X,
    announcer: B,
    destroy: () => {
      (L(), t.remove());
    },
  };
}
const K3 = /^([01]?\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?$/;
function Fl(e, t = new Date(), n = 10) {
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
      i = o.match(K3);
    if (i) {
      const l = parseInt(i[1], 10),
        u = parseInt(i[2], 10),
        c = i[3] !== void 0 ? parseInt(i[3], 10) : 0,
        g = new Date(t.getTime());
      g.setHours(l, u, c, 0);
      const m = n * 6e4;
      return (t.getTime() > g.getTime() + m && g.setDate(g.getDate() + 1), g);
    }
    const a = new Date(o);
    return isNaN(a.getTime()) ? null : a;
  }
  return null;
}
class Z3 {
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
      var i, a, l;
      if (this.destroyed) return;
      const n = Date.now(),
        r = this.targetTime.getTime() - n;
      if (r <= 0) {
        this.t0Fired ||
          ((this.t0Fired = !0),
          (i = this.onTick) == null || i.call(this, 0),
          (a = this.onT0) == null || a.call(this),
          this.scheduleCelebrationEnd(),
          this.scheduleAutoDismiss());
        return;
      }
      (l = this.onTick) == null || l.call(this, r);
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
function $l(e, t = {}) {
  if (!e)
    return {
      start: () => {},
      stop: () => {},
      destroy: () => {},
      isMounted: () => !1,
      controller: null,
    };
  const { isBannerActive: n = !1, hijriYear: r = 1447, colors: o } = t,
    i = typeof e == "boolean" ? {} : e,
    a = i.iftarTime ?? i.maghribTime ?? "18:45",
    l = { ...i, iftarTime: a },
    u = l.alertWindowMinutes ?? 30,
    c = l.autoDismissAfterMinutes !== void 0 ? l.autoDismissAfterMinutes : 10,
    g = l.celebrationDurationMs ?? 3e4,
    m = Fl(l.iftarTime, new Date(), c);
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
  const { dict: p, isRtl: y, lang: C } = O3(l.locale, l.labels),
    S = new U3({
      soundUrl: l.soundUrl,
      defaultMuted: l.defaultMuted,
      onAudioBlocked: () => {
        var b;
        ((b = l.onAudioBlocked) == null || b.call(l),
          d && d.updateSoundButton(S.isMuted(), !0));
      },
    }),
    T = (b) => !(b.sound === !1 || b.soundUrl === !1 || b.soundUrl === "none");
  let d = null,
    f = !1,
    h,
    x = null;
  if (typeof window < "u") {
    const b = () => {
        (S.prime(), A());
      },
      A = () => {
        (window.removeEventListener("pointerdown", b),
          window.removeEventListener("keydown", b),
          (x = null));
      };
    ((x = A),
      window.addEventListener("pointerdown", b, { once: !0, passive: !0 }),
      window.addEventListener("keydown", b, { once: !0, passive: !0 }));
  }
  const k = () => {
      if (d || f) return;
      ((d = Y3({
        targetTime: z.getTargetTime(),
        position: l.position ?? "bottom-right",
        isBannerTopActive: n,
        hasSound: T(l),
        initialMuted: S.isMuted(),
        minimizable: l.minimizable,
        initiallyMinimized: h !== void 0 ? h : l.initiallyMinimized,
        labels: p,
        isRtl: y,
        lang: C,
        onDismiss: () => {
          E.dismiss();
        },
        onToggleSound: () => {
          E.toggleMute();
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
    z = new Z3(m, {
      alertWindowMinutes: u,
      autoDismissMinutes: c,
      celebrationDurationMs: g,
      onAlertWindow: () => {
        k();
      },
      onTick: (b) => {
        d && d.updateDigits(b);
      },
      onT0: () => {
        var b;
        if ((d && d.triggerCelebrationFlare(), l.confetti !== !1))
          try {
            x1(r, o, "ramadan");
          } catch {}
        (S.playAlert(), (b = l.onIftar) == null || b.call(l));
      },
      onCelebrationEnd: () => {
        d && d.endCelebration();
      },
      onAutoDismiss: () => {
        E.dismiss();
      },
    }),
    E = {
      show: () => {
        (k(), z.forceOpen());
      },
      dismiss: () => {
        var b;
        (d && (d.destroy(), (d = null)),
          z.stop(),
          S.destroy(),
          (b = l.onDismiss) == null || b.call(l));
      },
      minimize: () => {
        ((h = !0), d == null || d.minimize());
      },
      expand: () => {
        ((h = !1), d == null || d.expand());
      },
      isMinimized: () =>
        d ? d.isMinimized() : (h ?? (l.initiallyMinimized || !1)),
      toggleMute: () => {
        const b = S.toggleMute();
        return (b || S.prime(), d && d.updateSoundButton(b, !1), b);
      },
      isMuted: () => S.isMuted(),
      playAlert: () => S.playAlert(),
      getTargetTime: () => z.getTargetTime(),
      updateConfig: (b) => {
        if (
          (Object.assign(l, b),
          b.defaultMuted !== void 0 && S.setMuted(b.defaultMuted),
          b.soundUrl !== void 0 && S.setSoundUrl(b.soundUrl),
          b.iftarTime !== void 0 ||
            b.alertWindowMinutes !== void 0 ||
            b.autoDismissAfterMinutes !== void 0 ||
            b.celebrationDurationMs !== void 0)
        ) {
          const A = Fl(
            l.iftarTime,
            new Date(),
            l.autoDismissAfterMinutes ?? 10
          );
          A &&
            z.updateTarget(
              A,
              l.alertWindowMinutes ?? 30,
              l.autoDismissAfterMinutes ?? 10,
              l.celebrationDurationMs ?? 3e4
            );
        }
        b.position &&
          d &&
          ((d.root.className = `ro-countdown-host ro-countdown-host--${b.position}`),
          n &&
            b.position.startsWith("top-") &&
            d.root.classList.add("ro-countdown-host--banner-offset-top"));
      },
    };
  return {
    start: () => {
      f || z.start();
    },
    stop: () => {
      z.stop();
    },
    destroy: () => {
      ((f = !0), x && x(), E.dismiss(), z.destroy());
    },
    isMounted: () => d !== null,
    controller: E,
  };
}
const Yr = {
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
function X3(e, t) {
  let n = "classic",
    r = {};
  typeof e == "string"
    ? Yr[e] && (n = e)
    : typeof e == "object" &&
      e !== null &&
      (e.extends && Yr[e.extends] && (n = e.extends), (r = e));
  const o = Yr[n];
  let i = [...o.colors];
  return (
    t != null && t.colors && t.colors.length > 0
      ? (i = t.colors)
      : r.colors && r.colors.length > 0 && (i = r.colors),
    {
      name:
        typeof e == "string"
          ? Yr[e]
            ? e
            : "classic"
          : (r.name ?? (e ? "custom" : "classic")),
      extends: n,
      colors: i,
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
const J3 = [
    "classic",
    "midnight",
    "emerald",
    "royal",
    "desert-dusk",
    "platinum-minimal",
    "rose-sahara",
  ],
  q3 = ["none", "soft", "deep"],
  ed = [
    "lanterns",
    "crescent-stars",
    "geometric",
    "sparkles",
    "banner",
    "eid",
    "eid-fitr",
    "eid-adha",
  ],
  td = [
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
  nd = ["low", "normal", "high"],
  rd = ["straight", "u-shaped", "dual"],
  od = ["ramadan", "eid-fitr", "eid-adha"],
  id = ["hide", "top", "show"],
  ad = ["on", "off"],
  ld = ["en", "ar"],
  sd = ["edges", "full"],
  ud = ["foreground", "background"];
function cu(e) {
  if (e && typeof e.debug == "boolean") return e.debug;
  if (typeof window < "u" && window.__RAMADAN_OVERLAY_DEBUG__) return !0;
  try {
    typeof process < "u";
  } catch {}
  return !1;
}
function Kr(e, t, n, r) {
  return typeof e != "number" || isNaN(e) || !isFinite(e)
    ? r
    : Math.max(t, Math.min(n, e));
}
function Cr(e) {
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
        Cr(o).warn(
          `[ramadan-overlay] Invalid ${r} "${String(e)}"; falling back to "${n}".`
        ),
      n);
}
function cd() {
  (L3(), G3());
}
function Vl(e, t, n) {
  if (typeof e == "function")
    try {
      e(t);
    } catch (r) {
      Cr(n).warn(
        "[ramadan-overlay] Exception thrown inside consumer onError callback:",
        r
      );
    }
}
function Hl(e, t = S1) {
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
function dd() {
  const e = new Date(),
    t = new Date(e.getFullYear(), e.getMonth(), e.getDate() + 1, 0, 0, 1);
  return Math.max(1e3, t.getTime() - e.getTime());
}
function Ti(e, t) {
  return t.isEid && (e.variant === "lanterns" || e.variant === "eid")
    ? e.eidVariant
    : e.variant;
}
function rn(e) {
  return e.mobileSideBehavior === "top" &&
    _n(e.position).length > 0 &&
    typeof window < "u" &&
    window.innerWidth < 768
    ? "top"
    : e.position;
}
function Un(e, t) {
  return t.previewMode || !t.autoTrigger
    ? !0
    : e.occasion === "none"
      ? !1
      : t.occasions.includes(e.occasion);
}
function Ul(e, t) {
  return e.occasion && e.occasion !== "none"
    ? e.occasion
    : t.variant === "eid-adha"
      ? "eid-adha"
      : t.variant === "eid-fitr" || t.variant === "eid"
        ? "eid-fitr"
        : "ramadan";
}
function Zr(e) {
  const t = cu(e),
    n = Cr(t);
  let r = "classic";
  typeof e.theme == "string"
    ? (r = Ze(e.theme, J3, "classic", "theme", t))
    : typeof e.theme == "object" && e.theme !== null && (r = e.theme);
  const o = X3(r, e),
    i = Ze(e.variant, ed, "lanterns", "variant", t);
  let a = Ze(e.position, td, "both", "position", t);
  i === "banner" &&
    ["left", "right", "sides", "start", "end"].includes(a) &&
    (n.warn(
      '[ramadan-overlay] Banner variant does not support vertical side positioning; falling back to "top"'
    ),
    (a = "top"));
  const l = typeof window < "u" && window.innerWidth < 640 ? "low" : "normal",
    u = Ze(e.density, nd, l, "density", t);
  let c = e.ropeStyle;
  c === "u-shape" || c === "curved"
    ? (c = "u-shaped")
    : c === "dual-rope" && (c = "dual");
  const g = Ze(c, rd, "straight", "ropeStyle", t),
    m = Ze(e.mobileSideBehavior, id, "hide", "mobileSideBehavior", t),
    p = Ze(e.confetti, ad, "on", "confetti", t),
    y = Ze(e.locale, ld, "en", "locale", t),
    C = Kr(e.opacity, 0, 1, 0.85),
    S = Kr(e.zIndex, -2147483648, 2147483647, 9999),
    T = Kr(e.lanternZIndex, -2147483648, 2147483647, 2),
    d = Kr(e.ropeSag, 6, 60, 20),
    f = Ze(e.shadows, q3, "soft", "shadows", t),
    h = ["crescent-stars", "eid", "eid-fitr", "eid-adha"].includes(i)
      ? "edges"
      : "full",
    x = Ze(e.clearance, sd, h, "clearance", t),
    k = Ze(e.layer, ud, "foreground", "layer", t);
  let z;
  typeof e.mountTarget == "string" && e.mountTarget.trim().length > 0
    ? (z = e.mountTarget.trim())
    : typeof HTMLElement < "u" &&
      e.mountTarget instanceof HTMLElement &&
      (z = e.mountTarget);
  let E = ["ramadan", "eid-fitr", "eid-adha"];
  if (Array.isArray(e.occasions)) {
    const M = e.occasions.filter((_) => od.includes(_));
    M.length > 0 && (E = M);
  }
  let b;
  if (e.date instanceof Date) b = isNaN(e.date.getTime()) ? void 0 : e.date;
  else if (typeof e.date == "string" || typeof e.date == "number") {
    const M = new Date(e.date);
    b = isNaN(M.getTime()) ? void 0 : M;
  }
  let A = "normal";
  return (
    typeof e.intensity == "number"
      ? (A = Math.max(1, Math.min(10, Math.round(e.intensity))))
      : e.intensity === "low" ||
          e.intensity === "normal" ||
          e.intensity === "high"
        ? (A = e.intensity)
        : (e.density === "low" ||
            e.density === "normal" ||
            e.density === "high") &&
          (A = e.density),
    {
      date: b,
      debug: t,
      onError: e.onError,
      theme: e.theme ?? "classic",
      themeName: o.name ?? "classic",
      variant: i,
      position: a,
      clearance: x,
      layer: k,
      mountTarget: z,
      mobileSideBehavior: m,
      opacity: C,
      shadows: f,
      colors: o.colors,
      zIndex: S,
      lanternZIndex: T,
      autoTrigger: e.autoTrigger ?? !0,
      previewMode: e.previewMode ?? !1,
      confetti: p,
      locale: y,
      bannerBg: o.bannerBg,
      bannerTextColor: o.bannerTextColor,
      bannerTextEn: e.bannerTextEn ?? "",
      bannerTextAr: e.bannerTextAr ?? "",
      bannerIconColor: o.bannerIconColor,
      lanternStyle: e.lanternStyle ?? 0,
      glowColor: o.glowColor,
      ceilingColor: o.ceilingColor,
      ropeColor: o.ropeColor,
      ropeStyle: g,
      ropeSag: d,
      region: e.region ?? "standard",
      hijriAdjustment: lu(e.region, e.hijriAdjustment),
      density: u,
      intensity: A,
      occasions: E,
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
  if (typeof document > "u") return Hl(Zr(e), S1);
  let t = { ...e },
    n;
  try {
    n = Zr(t);
  } catch {
    n = Zr({});
  }
  const r = cu(n);
  try {
    let o = Cn({
      date: n.date ?? new Date(),
      region: n.region,
      hijriAdjustment: n.hijriAdjustment,
    });
    const i = Cr(r);
    if (n.autoTrigger && !n.previewMode && o.occasion === "none") {
      const x = n.date ?? new Date();
      i.info(
        `[ramadan-overlay] Overlay dormant: autoTrigger is enabled, but current date (${x.toISOString().slice(0, 10)}) does not fall within configured occasions (${n.occasions.join(", ")}). Pass previewMode: true to force display during development.`
      );
    }
    n.previewMode &&
      i.info(
        "[ramadan-overlay] Preview mode active: overlay forced visible regardless of Hijri calendar date."
      );
    let a = null,
      l = new Date().toDateString();
    const u = (x) => {
        const k = Ti(n, x),
          z = rn(n),
          E = { ...n, variant: k, position: z };
        ((a = _3(E, x.occasion)), (h.container = a.container));
      },
      c = () => {
        a && (a.cleanup(), (a = null), (h.container = null));
      },
      g = (x, k) => {
        var z, E, b, A;
        if (
          ((!x || x.occasion !== k.occasion) &&
            ((z = n.onOccasionChange) == null || z.call(n, k.occasion, k)),
          (k.isRamadan || n.previewMode) &&
            (!x || !x.isRamadan) &&
            ((E = n.onRamadanStart) == null || E.call(n, k)),
          k.isEid &&
            (!x || !x.isEid) &&
            ((b = n.onEidStart) == null || b.call(n, k)),
          x != null &&
            x.isRamadan &&
            !k.isRamadan &&
            ((A = n.onRamadanEnd) == null || A.call(n)),
          i3(k, n.confetti, n.previewMode))
        ) {
          const M = k.hijriYear || 1447,
            _ = Ul(k, n);
          x1(M, n.colors, _);
        }
      };
    let m = null;
    const p = () => {
        if (!n.liveTransition || typeof window > "u") return;
        m && clearTimeout(m);
        const x = dd();
        m = setTimeout(() => {
          y();
        }, x);
      },
      y = () => {
        var M, _;
        const x = new Date();
        l = x.toDateString();
        const k = Cn({
            date: x,
            region: n.region,
            hijriAdjustment: n.hijriAdjustment,
          }),
          z = o,
          E = z.occasion,
          b = Un(z, n),
          A = Un(k, n);
        ((o = k),
          (h.state = k),
          A
            ? b
              ? E !== k.occasion && (c(), u(k), g(z, k))
              : (u(k), g(z, k))
            : b &&
              (c(),
              (M = n.onOccasionChange) == null || M.call(n, k.occasion, k),
              z.isRamadan && ((_ = n.onRamadanEnd) == null || _.call(n))),
          p());
      },
      C = () => {
        new Date().toDateString() !== l && y();
      };
    n.liveTransition &&
      typeof document < "u" &&
      (p(),
      document.addEventListener("visibilitychange", C),
      typeof window < "u" && window.addEventListener("focus", C));
    let S = rn(n);
    const T = () => {
      const x = rn(n);
      x !== S && ((S = x), a && Un(o, n) && (c(), u(o)));
    };
    typeof window < "u" &&
      window.addEventListener("resize", T, { passive: !0 });
    const d = (x, k) => x.isRamadan || k.previewMode || !k.autoTrigger;
    let f = null;
    n.countdown &&
      ((f = $l(n.countdown, {
        isBannerActive: n.variant === "banner",
        hijriYear: o.hijriYear || 1447,
        colors: n.colors,
      })),
      d(o, n) && f.start());
    const h = {
      destroy: () => {
        var x;
        (f && (f.destroy(), (f = null)),
          m && (clearTimeout(m), (m = null)),
          typeof document < "u" &&
            document.removeEventListener("visibilitychange", C),
          typeof window < "u" &&
            (window.removeEventListener("focus", C),
            window.removeEventListener("resize", T)),
          c(),
          o.isRamadan && ((x = n.onRamadanEnd) == null || x.call(n)));
      },
      update: (x) => {
        try {
          t = { ...t, ...x };
          const k = Zr(t);
          if (
            x.date !== void 0 ||
            x.region !== void 0 ||
            x.hijriAdjustment !== void 0
          ) {
            const b = o;
            ((o = Cn({
              date: k.date ?? new Date(),
              region: k.region,
              hijriAdjustment: k.hijriAdjustment,
            })),
              (h.state = o),
              b.occasion !== o.occasion && g(b, o));
          }
          const z = Un(o, k),
            E = !!a;
          if (z && !E) ((n = k), u(o));
          else if (!z && E) ((n = k), c());
          else if (a) {
            const b = Ti(n, o),
              A = Ti(k, o),
              M =
                k.variant === "banner" &&
                (JSON.stringify(k.bannerTextEn) !==
                  JSON.stringify(n.bannerTextEn) ||
                  JSON.stringify(k.bannerTextAr) !==
                    JSON.stringify(n.bannerTextAr) ||
                  k.locale !== n.locale),
              _ = rn(n),
              R = rn(k),
              j =
                A !== b ||
                R !== _ ||
                k.mobileSideBehavior !== n.mobileSideBehavior ||
                k.density !== n.density ||
                k.intensity !== n.intensity ||
                k.lanternStyle !== n.lanternStyle ||
                k.ropeStyle !== n.ropeStyle ||
                k.ropeSag !== n.ropeSag ||
                k.clearance !== n.clearance ||
                k.mountTarget !== n.mountTarget ||
                M;
            ((n = k), (S = R), j ? (c(), u(o)) : a.updateTokens(k));
          } else ((n = k), (S = rn(k)));
          (n.liveTransition ? p() : m && (clearTimeout(m), (m = null)),
            x.countdown !== void 0 &&
              (f && (f.destroy(), (f = null)),
              k.countdown &&
                ((f = $l(k.countdown, {
                  isBannerActive: k.variant === "banner",
                  hijriYear: o.hijriYear || 1447,
                  colors: k.colors,
                })),
                d(o, k) && f.start())));
        } catch (k) {
          (Vl(t.onError, k, r),
            i.error(
              "[ramadan-overlay] Dynamic update error caught by containment boundary:",
              k
            ));
        }
      },
      setTheme: (x) => {
        h.update({ theme: x });
      },
      container: null,
      state: o,
      get config() {
        return n;
      },
      getCountdownController: () => (f ? f.controller : null),
      get countdown() {
        return f ? f.controller : null;
      },
      getState: () => o,
      fireConfetti: async (x) => {
        const k = o.hijriYear || 1447,
          z = x || Ul(o, n);
        await x1(k, n.colors, z);
      },
    };
    return (Un(o, n) && u(o), g(null, o), h);
  } catch (o) {
    return (
      cd(),
      Vl(e.onError, o, r),
      Cr(r).error(
        "[ramadan-overlay] Catastrophic initialization error caught by containment boundary:",
        o
      ),
      Hl(n, S1)
    );
  }
}
function fd(e = {}) {
  const t = J.useRef(null),
    [n, r] = J.useState(() => Cn(e)),
    o = JSON.stringify(e),
    i = J.useRef(!1);
  J.useEffect(() => {
    if (((i.current = !0), !t.current)) {
      const l = uo({
        ...e,
        onOccasionChange: (u, c) => {
          var g;
          (r(c), (g = e.onOccasionChange) == null || g.call(e, u, c));
        },
      });
      ((t.current = l), r(l.state));
    }
    return () => {
      var l;
      ((i.current = !1),
        (l = t.current) == null || l.destroy(),
        (t.current = null));
    };
  }, []);
  const a = typeof e.theme == "object" ? JSON.stringify(e.theme) : e.theme;
  return (
    J.useEffect(() => {
      i.current &&
        t.current &&
        e.theme !== void 0 &&
        t.current.setTheme(e.theme);
    }, [a]),
    J.useEffect(() => {
      i.current && t.current && t.current.update(e);
    }, [o]),
    { state: n, instance: t.current }
  );
}
const pd = (e) => {
    const { config: t, onInstance: n, children: r, ...o } = e,
      i = { ...t, ...o },
      { state: a, instance: l } = fd(i);
    return (
      J.useEffect(() => {
        n && n(l);
      }, [l, n]),
      r ? s.jsx(s.Fragment, { children: r(a) }) : null
    );
  },
  md = {
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
        shadows: "عمق الظلال الواقعية (Elevation Shadow)",
        shadowOptions: {
          none: "دون ظلال (توهج مسطح)",
          soft: "ظل ناعم وطبيعي",
          deep: "ظل غامق ومجسم",
        },
        confetti: "تأثير احتفال الزينة (Confetti)",
        confettiOptions: { on: "مفعّل (عند وقت الإفطار)", off: "معطل" },
        autoTrigger: "الكشف التلقائي بالتقويم الهجري",
        autoTriggerHelp:
          "يظهر تلقائياً في شهر رمضان وأيام العيد ويختفي في باقي شهور السنة.",
        countdown: "تفعيل ودجت عداد وقت الإفطار",
        countdownHelp:
          "يعرض بطاقة عد تنازلي حتى أذان المغرب مع تنبيهات صوتية واحتفال عند الوصول.",
      },
      variantSpecific: {
        lanternHeading: "خيارات الفوانيس والحبال",
        lanternStyle: "تصميم الفانوس",
        lanternCycle: "عرض جميع التصاميم الـ 12 بالتناوب",
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
        intensityLow: "حركة هادئة وخفيفة",
        intensityNormal: "حركة متوازنة ومعتدلة",
        intensityHigh: "تدفق احتفالي كثيف",
        sparklesHeading: "خيارات البريق والوميض",
        density: "كثافة الجزيئات والنجوم",
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
        heading: "4. كود التضمين الفوري",
        copyBtn: "📋 نسخ الكود",
        copiedBtn: "✓ تم النسخ إلى الحافظة!",
        copyPromptSeamBtn:
          "📋 نسخ مسار وكيل الذكاء الاصطناعي (Agent Prompt Seam)",
        promptSeamCopiedBtn: "✓ تم نسخ مسار الوكيل للحافظة!",
        tabs: {
          react: "React",
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
  hd = {
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
        shadows: "Elevation Shadow Depth",
        shadowOptions: {
          none: "None (Flat minimalist glow)",
          soft: "Soft (Realistic depth shadow)",
          deep: "Deep (High-contrast elevation)",
        },
        confetti: "Celebration Confetti at Iftar",
        confettiOptions: { on: "Enabled (Flare at T-0)", off: "Disabled" },
        autoTrigger: "Automatic Hijri Calendar Trigger",
        autoTriggerHelp:
          "Automatically displays during Ramadan and Eid periods and sleeps the rest of the year.",
        countdown: "Enable Iftar Countdown Widget",
        countdownHelp:
          "Mounts an accessible floating countdown card with audio chime alerts and confetti flare at Maghrib.",
      },
      variantSpecific: {
        lanternHeading: "Lantern & Rope Parameters",
        lanternStyle: "Lantern SVG Design",
        lanternCycle: "Cycle all 12 distinct designs",
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
        intensityLow: "Serene & Gentle Float",
        intensityNormal: "Balanced Festive Ambient",
        intensityHigh: "Festive Surge Stream",
        sparklesHeading: "Ambient Sparkle Parameters",
        density: "Particle Density",
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
        heading: "4. Production Integration Code",
        copyBtn: "📋 Copy Code",
        copiedBtn: "✓ Copied to clipboard!",
        copyPromptSeamBtn: "📋 Copy Agent Prompt Seam",
        promptSeamCopiedBtn: "✓ Agent Prompt Seam copied!",
        tabs: {
          react: "React",
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
  du = "ro_demo_lang";
function vd() {
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
    const e = localStorage.getItem(du);
    if (e === "ar" || e === "en") return e;
  } catch {}
  return "ar";
}
function fu(e) {
  if (typeof document > "u") return;
  const t = e === "ar" ? "rtl" : "ltr";
  (document.documentElement.setAttribute("dir", t),
    document.documentElement.setAttribute("lang", e));
}
function gd(e) {
  if (!(typeof window > "u")) {
    try {
      localStorage.setItem(du, e);
    } catch {}
    try {
      fu(e);
    } catch {}
  }
}
const yd = {
  lanterns: ["top", "left", "right", "sides", "start", "end"],
  banner: ["top", "bottom"],
  "crescent-stars": ["full", "both", "top", "bottom", "sides"],
  eid: ["full", "both", "top", "bottom", "sides"],
  "eid-fitr": ["full", "both", "top", "bottom", "sides"],
  "eid-adha": ["full", "both", "top", "bottom", "sides"],
  geometric: ["full", "both", "top", "bottom", "sides", "left", "right"],
  sparkles: ["full", "both", "top", "bottom", "sides"],
};
function pu(e) {
  return yd[e] || ["top"];
}
function wd(e) {
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
function Do(e, t, n) {
  switch (e) {
    case "lanternStyle":
    case "ropeStyle":
    case "ceilingColor":
    case "ropeColor":
      return t === "lanterns";
    case "ropeSag":
      return (
        t === "lanterns" &&
        ((n == null ? void 0 : n.ropeStyle) === "u-shaped" ||
          (n == null ? void 0 : n.ropeStyle) === "dual")
      );
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
      return !0;
    default:
      return !1;
  }
}
function Wn(e, t) {
  const n = pu(t);
  let r = e.position;
  return (
    (!r || !n.includes(r)) && (r = wd(t)),
    { ...e, variant: t, position: r }
  );
}
const xd = new URL(
    "" + new URL("logo-yOUHX95I.png", import.meta.url).href,
    import.meta.url
  ).href,
  Sd = ({
    t: e,
    locale: t,
    onToggleLocale: n,
    occasion: r,
    onChangeOccasion: o,
    overlayOn: i,
    onToggleOverlay: a,
    onPlayChime: l,
    onFireConfetti: u,
    onToggleDrawer: c,
  }) =>
    s.jsxs("header", {
      className: "celestial-nav",
      children: [
        s.jsxs("div", {
          className: "nav-brand",
          onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
          children: [
            s.jsx("img", {
              src: xd,
              alt: "ramadan-overlay",
              className: "nav-logo-img",
            }),
            s.jsx("span", {
              className: "nav-title font-display",
              children: e.nav.brandTitle,
            }),
            s.jsx("span", {
              className: "nav-version-badge",
              children: e.nav.versionBadge,
            }),
            s.jsx("span", {
              className: "nav-occasion-badge",
              title: e.nav.occasionBadge,
              children: e.nav.occasions[r],
            }),
          ],
        }),
        s.jsxs("div", {
          className: "nav-controls",
          children: [
            s.jsx("div", {
              className: "nav-dropdown-wrap",
              children: s.jsxs("select", {
                className: "nav-select",
                value: r,
                "aria-label": e.nav.occasionSelectLabel,
                onChange: (g) => o(g.target.value),
                children: [
                  s.jsx("option", {
                    value: "ramadan",
                    children: e.nav.occasions.ramadan,
                  }),
                  s.jsx("option", {
                    value: "eid-fitr",
                    children: e.nav.occasions["eid-fitr"],
                  }),
                  s.jsx("option", {
                    value: "eid-adha",
                    children: e.nav.occasions["eid-adha"],
                  }),
                ],
              }),
            }),
            s.jsxs("button", {
              className: "nav-btn-pill lang-toggle",
              onClick: n,
              title: t === "ar" ? "Switch to English" : "التبديل إلى العربية",
              children: [
                s.jsx("span", { style: { fontSize: "1rem" }, children: "🌐" }),
                s.jsx("span", { children: e.nav.switchLang }),
              ],
            }),
            s.jsxs("button", {
              className: `nav-btn-pill ${i ? "active" : ""}`,
              onClick: a,
              children: [
                s.jsx("span", {
                  style: { fontSize: "0.9rem" },
                  children: i ? "✨" : "💤",
                }),
                s.jsx("span", {
                  children: i ? e.nav.overlayOn : e.nav.overlayOff,
                }),
              ],
            }),
            s.jsxs("button", {
              className: "nav-btn-pill chime-btn",
              onClick: l,
              title: e.nav.chimeTest,
              children: [
                s.jsxs("div", {
                  className: "audio-wave",
                  children: [
                    s.jsx("div", { className: "audio-bar" }),
                    s.jsx("div", { className: "audio-bar" }),
                    s.jsx("div", { className: "audio-bar" }),
                  ],
                }),
                s.jsx("span", { children: e.nav.chimeTest }),
              ],
            }),
            s.jsxs("button", {
              className: "nav-btn-pill",
              onClick: u,
              title: e.nav.confettiLaunch,
              children: [
                s.jsx("span", { children: "🎉" }),
                s.jsx("span", { children: e.nav.confettiLaunch }),
              ],
            }),
            c &&
              s.jsx("button", {
                className: "nav-btn-pill mobile-drawer-btn",
                onClick: c,
                title: e.nav.toggleMobileDrawer,
                children: s.jsx("span", { children: "🎛️" }),
              }),
            s.jsx("a", {
              href: "https://github.com/3mr-5aled/ramadan-overlay",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "nav-btn-pill",
              style: { padding: "7px 12px" },
              title: e.nav.githubLink,
              children: s.jsx("svg", {
                height: "18",
                width: "18",
                viewBox: "0 0 16 16",
                fill: "currentColor",
                "aria-hidden": "true",
                children: s.jsx("path", {
                  d: "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z",
                }),
              }),
            }),
          ],
        }),
      ],
    }),
  kd = ({ t: e, onScrollToWorkbench: t, onScrollToLab: n }) =>
    s.jsxs("section", {
      className: "canopy-stage",
      children: [
        s.jsxs("div", {
          className: "canopy-badge-wrap font-calligraphy",
          children: [
            s.jsx("span", {
              role: "img",
              "aria-label": "sparkles",
              children: "✨",
            }),
            s.jsx("span", { children: e.hero.badge }),
          ],
        }),
        s.jsx("h1", {
          className: "canopy-title font-display",
          children: e.hero.title,
        }),
        s.jsx("p", { className: "canopy-subtitle", children: e.hero.subtitle }),
        s.jsxs("div", {
          className: "canopy-actions",
          children: [
            s.jsxs("button", {
              className: "btn-primary",
              onClick: t,
              children: [
                s.jsx("span", { children: "🎨" }),
                s.jsx("span", { children: e.hero.ctaWorkbench }),
              ],
            }),
            s.jsxs("button", {
              className: "btn-secondary",
              onClick: n,
              children: [
                s.jsx("span", { children: "⚡" }),
                s.jsx("span", { children: e.hero.ctaLab }),
              ],
            }),
          ],
        }),
        s.jsxs("div", {
          className: "canopy-stats",
          children: [
            s.jsxs("div", {
              className: "stat-item",
              children: [
                s.jsx("span", { className: "stat-icon", children: "❖" }),
                s.jsx("span", { children: e.hero.statVariants }),
              ],
            }),
            s.jsxs("div", {
              className: "stat-item",
              children: [
                s.jsx("span", { className: "stat-icon", children: "⚡" }),
                s.jsx("span", { children: e.hero.statZeroDeps }),
              ],
            }),
            s.jsxs("div", {
              className: "stat-item",
              children: [
                s.jsx("span", { className: "stat-icon", children: "⚛" }),
                s.jsx("span", { children: e.hero.statFrameworks }),
              ],
            }),
          ],
        }),
      ],
    }),
  Cd = [
    { id: "lanterns", icon: "🏮" },
    { id: "banner", icon: "🏷️" },
    { id: "crescent-stars", icon: "🌙" },
    { id: "geometric", icon: "💠" },
    { id: "sparkles", icon: "✨" },
    { id: "eid", icon: "🎉" },
    { id: "eid-fitr", icon: "🍬" },
    { id: "eid-adha", icon: "🐑" },
  ],
  bd = ({ t: e, activeVariant: t, onSelectVariant: n }) =>
    s.jsxs("div", {
      className: "panel-card",
      children: [
        s.jsxs("h3", {
          className: "panel-heading",
          children: [
            s.jsx("span", { children: "❖" }),
            s.jsx("span", { children: e.workbench.variantHeading }),
          ],
        }),
        s.jsx("div", {
          className: "variant-grid",
          children: Cd.map(({ id: r, icon: o }) => {
            const i = e.workbench.variants[r] || { name: r, desc: "" },
              a = t === r;
            return s.jsxs(
              "div",
              {
                className: `variant-card ${a ? "active" : ""}`,
                onClick: () => n(r),
                role: "button",
                tabIndex: 0,
                onKeyDown: (l) => {
                  (l.key === "Enter" || l.key === " ") && n(r);
                },
                children: [
                  s.jsxs("div", {
                    className: "variant-card-title",
                    children: [
                      s.jsx("span", {
                        style: { fontSize: "1.2rem" },
                        children: o,
                      }),
                      s.jsx("span", { children: i.name }),
                    ],
                  }),
                  s.jsx("p", {
                    className: "variant-card-desc",
                    children: i.desc,
                  }),
                ],
              },
              r
            );
          }),
        }),
      ],
    }),
  zd = ({ variant: e, position: t, onChangePosition: n, translations: r }) => {
    const o = pu(e);
    return s.jsxs("div", {
      className: "control-group",
      children: [
        s.jsx("label", { htmlFor: "position-select", children: r.position }),
        s.jsx("select", {
          id: "position-select",
          value: t,
          onChange: (i) => n(i.target.value),
          className: "form-select",
          children: o.map((i) =>
            s.jsx(
              "option",
              { value: i, children: r.positionOptions[i] || i },
              i
            )
          ),
        }),
      ],
    });
  },
  Td = [
    "classic",
    "midnight",
    "emerald",
    "royal",
    "desert-dusk",
    "platinum-minimal",
    "rose-sahara",
  ],
  Ed = ({
    t: e,
    variant: t,
    position: n,
    onChangePosition: r,
    themeName: o,
    onChangeTheme: i,
    opacity: a,
    onChangeOpacity: l,
    layer: u,
    onChangeLayer: c,
    shadows: g,
    onChangeShadows: m,
    confetti: p,
    onChangeConfetti: y,
    autoTrigger: C,
    onToggleAutoTrigger: S,
    countdownEnabled: T,
    onToggleCountdown: d,
  }) => {
    const f = Do("shadows", t);
    return s.jsxs("div", {
      className: "panel-card",
      children: [
        s.jsxs("h3", {
          className: "panel-heading",
          children: [
            s.jsx("span", { children: "⚙️" }),
            s.jsx("span", { children: e.workbench.optionsHeading }),
          ],
        }),
        s.jsxs("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "18px",
          },
          children: [
            s.jsxs("div", {
              className: "form-group",
              children: [
                s.jsx("label", {
                  className: "form-label",
                  children: e.workbench.universal.theme,
                }),
                s.jsxs("select", {
                  className: "form-select",
                  value: o,
                  onChange: (h) => i(h.target.value),
                  children: [
                    s.jsx("optgroup", {
                      label: "Theme Presets",
                      children: Td.map((h) =>
                        s.jsx(
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
                    s.jsx("optgroup", {
                      label: "Theme Overrides",
                      children: s.jsx("option", {
                        value: "custom",
                        children: e.workbench.universal.themeOptions.custom,
                      }),
                    }),
                  ],
                }),
              ],
            }),
            s.jsx(zd, {
              variant: t,
              position: n,
              onChangePosition: r,
              translations: e.workbench.universal,
            }),
            s.jsxs("div", {
              className: "form-group",
              children: [
                s.jsx("label", {
                  className: "form-label",
                  children: e.workbench.universal.layer,
                }),
                s.jsxs("select", {
                  className: "form-select",
                  value: u,
                  onChange: (h) => c(h.target.value),
                  children: [
                    s.jsx("option", {
                      value: "foreground",
                      children: e.workbench.universal.layerOptions.foreground,
                    }),
                    s.jsx("option", {
                      value: "background",
                      children: e.workbench.universal.layerOptions.background,
                    }),
                  ],
                }),
              ],
            }),
            s.jsxs("div", {
              className: "form-group",
              children: [
                s.jsx("label", {
                  className: "form-label",
                  children: e.workbench.universal.confetti,
                }),
                s.jsxs("select", {
                  className: "form-select",
                  value: p,
                  onChange: (h) => y(h.target.value),
                  children: [
                    s.jsx("option", {
                      value: "on",
                      children: e.workbench.universal.confettiOptions.on,
                    }),
                    s.jsx("option", {
                      value: "off",
                      children: e.workbench.universal.confettiOptions.off,
                    }),
                  ],
                }),
              ],
            }),
            f &&
              s.jsxs("div", {
                className: "form-group",
                children: [
                  s.jsx("label", {
                    className: "form-label",
                    children: e.workbench.universal.shadows,
                  }),
                  s.jsxs("select", {
                    className: "form-select",
                    value: g,
                    onChange: (h) => m(h.target.value),
                    children: [
                      s.jsx("option", {
                        value: "soft",
                        children: e.workbench.universal.shadowOptions.soft,
                      }),
                      s.jsx("option", {
                        value: "deep",
                        children: e.workbench.universal.shadowOptions.deep,
                      }),
                      s.jsx("option", {
                        value: "none",
                        children: e.workbench.universal.shadowOptions.none,
                      }),
                    ],
                  }),
                ],
              }),
            s.jsxs("div", {
              className: "form-group",
              children: [
                s.jsxs("div", {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "6px",
                  },
                  children: [
                    s.jsx("label", {
                      className: "form-label",
                      style: { margin: 0 },
                      children: e.workbench.universal.opacity,
                    }),
                    s.jsxs("span", {
                      style: {
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.82rem",
                        color: "var(--gold-400)",
                      },
                      children: [Math.round(a * 100), "%"],
                    }),
                  ],
                }),
                s.jsx("input", {
                  type: "range",
                  min: "0.1",
                  max: "1",
                  step: "0.05",
                  className: "form-range",
                  value: a,
                  onChange: (h) => l(parseFloat(h.target.value)),
                }),
              ],
            }),
          ],
        }),
        s.jsxs("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "14px",
            marginTop: "16px",
          },
          children: [
            s.jsxs("div", {
              className: "form-toggle-wrap",
              onClick: S,
              children: [
                s.jsxs("div", {
                  children: [
                    s.jsx("div", {
                      style: { fontWeight: 600, fontSize: "0.9rem" },
                      children: e.workbench.universal.autoTrigger,
                    }),
                    s.jsx("div", {
                      className: "form-help",
                      children: e.workbench.universal.autoTriggerHelp,
                    }),
                  ],
                }),
                s.jsxs("div", {
                  className: "toggle-switch",
                  children: [
                    s.jsx("input", {
                      type: "checkbox",
                      checked: C,
                      onChange: S,
                      onClick: (h) => h.stopPropagation(),
                    }),
                    s.jsx("span", { className: "toggle-slider" }),
                  ],
                }),
              ],
            }),
            s.jsxs("div", {
              className: "form-toggle-wrap",
              onClick: d,
              children: [
                s.jsxs("div", {
                  children: [
                    s.jsx("div", {
                      style: { fontWeight: 600, fontSize: "0.9rem" },
                      children: e.workbench.universal.countdown,
                    }),
                    s.jsx("div", {
                      className: "form-help",
                      children: e.workbench.universal.countdownHelp,
                    }),
                  ],
                }),
                s.jsxs("div", {
                  className: "toggle-switch",
                  children: [
                    s.jsx("input", {
                      type: "checkbox",
                      checked: T,
                      onChange: d,
                      onClick: (h) => h.stopPropagation(),
                    }),
                    s.jsx("span", { className: "toggle-slider" }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    });
  },
  Md = ({ t: e, config: t, onUpdateConfig: n }) => {
    const r = t.variant || "lanterns",
      o = r === "lanterns",
      i = r === "banner",
      a = ["crescent-stars", "eid", "eid-fitr", "eid-adha"].includes(r),
      l = r === "sparkles",
      u = r === "geometric";
    return !o && !i && !a && !l && !u
      ? null
      : s.jsxs("div", {
          className: "panel-card",
          children: [
            o &&
              s.jsxs(s.Fragment, {
                children: [
                  s.jsxs("h3", {
                    className: "panel-heading",
                    children: [
                      s.jsx("span", { children: "🏮" }),
                      s.jsx("span", {
                        children: e.workbench.variantSpecific.lanternHeading,
                      }),
                    ],
                  }),
                  s.jsxs("div", {
                    style: {
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(240px, 1fr))",
                      gap: "18px",
                    },
                    children: [
                      s.jsxs("div", {
                        className: "form-group",
                        children: [
                          s.jsx("label", {
                            className: "form-label",
                            children: e.workbench.variantSpecific.lanternStyle,
                          }),
                          s.jsxs("select", {
                            className: "form-select",
                            value: t.lanternStyle ?? 0,
                            onChange: (c) =>
                              n({ lanternStyle: parseInt(c.target.value, 10) }),
                            children: [
                              s.jsx("option", {
                                value: 0,
                                children:
                                  e.workbench.variantSpecific.lanternCycle,
                              }),
                              [...Array(12)].map((c, g) =>
                                s.jsxs(
                                  "option",
                                  {
                                    value: g + 1,
                                    children: ["Design #", g + 1],
                                  },
                                  g + 1
                                )
                              ),
                            ],
                          }),
                        ],
                      }),
                      s.jsxs("div", {
                        className: "form-group",
                        children: [
                          s.jsx("label", {
                            className: "form-label",
                            children: e.workbench.variantSpecific.ropeStyle,
                          }),
                          s.jsxs("select", {
                            className: "form-select",
                            value: t.ropeStyle ?? "straight",
                            onChange: (c) => n({ ropeStyle: c.target.value }),
                            children: [
                              s.jsx("option", {
                                value: "straight",
                                children:
                                  e.workbench.variantSpecific.ropeStraight,
                              }),
                              s.jsx("option", {
                                value: "u-shaped",
                                children:
                                  e.workbench.variantSpecific.ropeUshaped,
                              }),
                              s.jsx("option", {
                                value: "dual",
                                children: e.workbench.variantSpecific.ropeDual,
                              }),
                            ],
                          }),
                        ],
                      }),
                      Do("ropeSag", "lanterns", { ropeStyle: t.ropeStyle }) &&
                        s.jsxs("div", {
                          className: "form-group",
                          children: [
                            s.jsxs("div", {
                              style: {
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "6px",
                              },
                              children: [
                                s.jsx("label", {
                                  className: "form-label",
                                  style: { margin: 0 },
                                  children: e.workbench.variantSpecific.ropeSag,
                                }),
                                s.jsxs("span", {
                                  style: {
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "0.82rem",
                                    color: "var(--gold-400)",
                                  },
                                  children: [t.ropeSag ?? 20, "px"],
                                }),
                              ],
                            }),
                            s.jsx("input", {
                              type: "range",
                              min: "6",
                              max: "60",
                              step: "2",
                              className: "form-range",
                              value: t.ropeSag ?? 20,
                              onChange: (c) =>
                                n({ ropeSag: parseInt(c.target.value, 10) }),
                            }),
                          ],
                        }),
                      s.jsxs("div", {
                        className: "form-group",
                        children: [
                          s.jsx("label", {
                            className: "form-label",
                            children: e.workbench.variantSpecific.ceilingColor,
                          }),
                          s.jsxs("div", {
                            style: {
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                            },
                            children: [
                              s.jsx("input", {
                                type: "color",
                                value: t.ceilingColor || "#c9a84c",
                                onChange: (c) =>
                                  n({ ceilingColor: c.target.value }),
                                style: {
                                  width: "40px",
                                  height: "40px",
                                  borderRadius: "50%",
                                  cursor: "pointer",
                                },
                              }),
                              s.jsx("input", {
                                type: "text",
                                className: "form-input",
                                value: t.ceilingColor || "#c9a84c",
                                onChange: (c) =>
                                  n({ ceilingColor: c.target.value }),
                              }),
                            ],
                          }),
                        ],
                      }),
                      s.jsxs("div", {
                        className: "form-group",
                        children: [
                          s.jsx("label", {
                            className: "form-label",
                            children: e.workbench.variantSpecific.ropeColor,
                          }),
                          s.jsxs("div", {
                            style: {
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                            },
                            children: [
                              s.jsx("input", {
                                type: "color",
                                value: t.ropeColor || "#c9a84c",
                                onChange: (c) =>
                                  n({ ropeColor: c.target.value }),
                                style: {
                                  width: "40px",
                                  height: "40px",
                                  borderRadius: "50%",
                                  cursor: "pointer",
                                },
                              }),
                              s.jsx("input", {
                                type: "text",
                                className: "form-input",
                                value: t.ropeColor || "#c9a84c",
                                onChange: (c) =>
                                  n({ ropeColor: c.target.value }),
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            i &&
              s.jsxs(s.Fragment, {
                children: [
                  s.jsxs("h3", {
                    className: "panel-heading",
                    children: [
                      s.jsx("span", { children: "🏷️" }),
                      s.jsx("span", {
                        children: e.workbench.variantSpecific.bannerHeading,
                      }),
                    ],
                  }),
                  s.jsxs("div", {
                    style: {
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(260px, 1fr))",
                      gap: "18px",
                    },
                    children: [
                      s.jsxs("div", {
                        className: "form-group",
                        children: [
                          s.jsx("label", {
                            className: "form-label",
                            children: e.workbench.variantSpecific.bannerTextAr,
                          }),
                          s.jsx("input", {
                            type: "text",
                            className: "form-input",
                            value: t.bannerTextAr || "رَمَضَان كَرِيم",
                            onChange: (c) =>
                              n({ bannerTextAr: c.target.value }),
                            placeholder: "رَمَضَان كَرِيم",
                          }),
                        ],
                      }),
                      s.jsxs("div", {
                        className: "form-group",
                        children: [
                          s.jsx("label", {
                            className: "form-label",
                            children: e.workbench.variantSpecific.bannerTextEn,
                          }),
                          s.jsx("input", {
                            type: "text",
                            className: "form-input",
                            value: t.bannerTextEn || "Ramadan Mubarak",
                            onChange: (c) =>
                              n({ bannerTextEn: c.target.value }),
                            placeholder: "Ramadan Mubarak",
                          }),
                        ],
                      }),
                      s.jsxs("div", {
                        className: "form-group",
                        children: [
                          s.jsx("label", {
                            className: "form-label",
                            children: e.workbench.variantSpecific.bannerBg,
                          }),
                          s.jsx("input", {
                            type: "text",
                            className: "form-input",
                            value: t.bannerBg || "rgba(15,15,20,0.92)",
                            onChange: (c) => n({ bannerBg: c.target.value }),
                          }),
                        ],
                      }),
                      s.jsxs("div", {
                        className: "form-group",
                        children: [
                          s.jsx("label", {
                            className: "form-label",
                            children:
                              e.workbench.variantSpecific.bannerTextColor,
                          }),
                          s.jsx("input", {
                            type: "text",
                            className: "form-input",
                            value: t.bannerTextColor || "#f1f5f9",
                            onChange: (c) =>
                              n({ bannerTextColor: c.target.value }),
                          }),
                        ],
                      }),
                      s.jsxs("div", {
                        className: "form-group",
                        children: [
                          s.jsx("label", {
                            className: "form-label",
                            children:
                              e.workbench.variantSpecific.bannerIconColor,
                          }),
                          s.jsx("input", {
                            type: "text",
                            className: "form-input",
                            value: t.bannerIconColor || "#c9a84c",
                            onChange: (c) =>
                              n({ bannerIconColor: c.target.value }),
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            a &&
              s.jsxs(s.Fragment, {
                children: [
                  s.jsxs("h3", {
                    className: "panel-heading",
                    children: [
                      s.jsx("span", { children: "🌙" }),
                      s.jsx("span", {
                        children: e.workbench.variantSpecific.motifsHeading,
                      }),
                    ],
                  }),
                  s.jsxs("div", {
                    style: {
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(260px, 1fr))",
                      gap: "18px",
                    },
                    children: [
                      s.jsxs("div", {
                        className: "form-group",
                        children: [
                          s.jsx("label", {
                            className: "form-label",
                            children: e.workbench.variantSpecific.clearance,
                          }),
                          s.jsxs("select", {
                            className: "form-select",
                            value: t.clearance ?? "edges",
                            onChange: (c) => n({ clearance: c.target.value }),
                            children: [
                              s.jsx("option", {
                                value: "edges",
                                children:
                                  e.workbench.variantSpecific.clearanceEdges,
                              }),
                              s.jsx("option", {
                                value: "full",
                                children:
                                  e.workbench.variantSpecific.clearanceFull,
                              }),
                            ],
                          }),
                        ],
                      }),
                      s.jsxs("div", {
                        className: "form-group",
                        children: [
                          s.jsx("label", {
                            className: "form-label",
                            children: e.workbench.variantSpecific.intensity,
                          }),
                          s.jsxs("select", {
                            className: "form-select",
                            value: t.intensity ?? "normal",
                            onChange: (c) => n({ intensity: c.target.value }),
                            children: [
                              s.jsx("option", {
                                value: "low",
                                children:
                                  e.workbench.variantSpecific.intensityLow,
                              }),
                              s.jsx("option", {
                                value: "normal",
                                children:
                                  e.workbench.variantSpecific.intensityNormal,
                              }),
                              s.jsx("option", {
                                value: "high",
                                children:
                                  e.workbench.variantSpecific.intensityHigh,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            (l || u) &&
              s.jsxs(s.Fragment, {
                children: [
                  s.jsxs("h3", {
                    className: "panel-heading",
                    children: [
                      s.jsx("span", { children: "✨" }),
                      s.jsx("span", {
                        children: e.workbench.variantSpecific.sparklesHeading,
                      }),
                    ],
                  }),
                  s.jsxs("div", {
                    style: {
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(260px, 1fr))",
                      gap: "18px",
                    },
                    children: [
                      s.jsxs("div", {
                        className: "form-group",
                        children: [
                          s.jsx("label", {
                            className: "form-label",
                            children: e.workbench.variantSpecific.density,
                          }),
                          s.jsxs("select", {
                            className: "form-select",
                            value: t.density ?? "normal",
                            onChange: (c) => n({ density: c.target.value }),
                            children: [
                              s.jsx("option", {
                                value: "low",
                                children:
                                  e.workbench.variantSpecific.intensityLow,
                              }),
                              s.jsx("option", {
                                value: "normal",
                                children:
                                  e.workbench.variantSpecific.intensityNormal,
                              }),
                              s.jsx("option", {
                                value: "high",
                                children:
                                  e.workbench.variantSpecific.intensityHigh,
                              }),
                            ],
                          }),
                        ],
                      }),
                      l &&
                        s.jsxs("div", {
                          className: "form-group",
                          children: [
                            s.jsx("label", {
                              className: "form-label",
                              children: e.workbench.variantSpecific.glowColor,
                            }),
                            s.jsx("input", {
                              type: "text",
                              className: "form-input",
                              value: t.glowColor || "rgba(201,168,76,0.55)",
                              onChange: (c) => n({ glowColor: c.target.value }),
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
  Nd = ({ customTheme: e, onChangeColor: t, onReset: n, translations: r }) => {
    const o = e.colors || [
        "#c9a84c",
        "#e5c158",
        "#9a7b2c",
        "#f3e5ab",
        "#1b3b2b",
        "#0f172a",
      ],
      i = o[0] || "#c9a84c",
      a = o[3] || "#f3e5ab";
    return s.jsxs("div", {
      className: "card-panel color-customizer-panel",
      children: [
        s.jsxs("div", {
          className: "panel-header",
          children: [
            s.jsx("h3", { className: "panel-title", children: r.heading }),
            s.jsx("button", {
              type: "button",
              className: "btn-outline btn-sm",
              onClick: n,
              children: r.resetBtn,
            }),
          ],
        }),
        s.jsxs("div", {
          className: "color-grid",
          children: [
            s.jsxs("div", {
              className: "color-field",
              children: [
                s.jsx("label", {
                  htmlFor: "color-primary",
                  children: r.primary,
                }),
                s.jsxs("div", {
                  className: "color-input-wrapper",
                  children: [
                    s.jsx("input", {
                      id: "color-primary",
                      type: "color",
                      value: i,
                      onChange: (l) => t("primaryColor", l.target.value),
                      className: "color-picker",
                    }),
                    s.jsx("span", { className: "color-code", children: i }),
                  ],
                }),
              ],
            }),
            s.jsxs("div", {
              className: "color-field",
              children: [
                s.jsx("label", { htmlFor: "color-accent", children: r.accent }),
                s.jsxs("div", {
                  className: "color-input-wrapper",
                  children: [
                    s.jsx("input", {
                      id: "color-accent",
                      type: "color",
                      value: a,
                      onChange: (l) => t("accentColor", l.target.value),
                      className: "color-picker",
                    }),
                    s.jsx("span", { className: "color-code", children: a }),
                  ],
                }),
              ],
            }),
            s.jsxs("div", {
              className: "color-field",
              children: [
                s.jsx("label", { htmlFor: "color-glow", children: r.glow }),
                s.jsx("div", {
                  className: "color-input-wrapper",
                  children: s.jsx("input", {
                    id: "color-glow",
                    type: "text",
                    value: e.glowColor || "rgba(201,168,76,0.55)",
                    onChange: (l) => t("glowColor", l.target.value),
                    className: "form-input text-mono",
                  }),
                }),
              ],
            }),
            s.jsxs("div", {
              className: "color-field",
              children: [
                s.jsx("label", {
                  htmlFor: "color-ceiling",
                  children: r.ceiling,
                }),
                s.jsxs("div", {
                  className: "color-input-wrapper",
                  children: [
                    s.jsx("input", {
                      id: "color-ceiling",
                      type: "color",
                      value: e.ceilingColor || "#c9a84c",
                      onChange: (l) => t("ceilingColor", l.target.value),
                      className: "color-picker",
                    }),
                    s.jsx("span", {
                      className: "color-code",
                      children: e.ceilingColor || "#c9a84c",
                    }),
                  ],
                }),
              ],
            }),
            s.jsxs("div", {
              className: "color-field",
              children: [
                s.jsx("label", { htmlFor: "color-rope", children: r.rope }),
                s.jsxs("div", {
                  className: "color-input-wrapper",
                  children: [
                    s.jsx("input", {
                      id: "color-rope",
                      type: "color",
                      value: e.ropeColor || "#c9a84c",
                      onChange: (l) => t("ropeColor", l.target.value),
                      className: "color-picker",
                    }),
                    s.jsx("span", {
                      className: "color-code",
                      children: e.ropeColor || "#c9a84c",
                    }),
                  ],
                }),
              ],
            }),
            s.jsxs("div", {
              className: "color-field",
              children: [
                s.jsx("label", {
                  htmlFor: "color-banner-bg",
                  children: r.bannerBg,
                }),
                s.jsx("div", {
                  className: "color-input-wrapper",
                  children: s.jsx("input", {
                    id: "color-banner-bg",
                    type: "text",
                    value: e.bannerBg || "rgba(15,15,20,0.92)",
                    onChange: (l) => t("bannerBg", l.target.value),
                    className: "form-input text-mono",
                  }),
                }),
              ],
            }),
            s.jsxs("div", {
              className: "color-field",
              children: [
                s.jsx("label", {
                  htmlFor: "color-banner-text",
                  children: r.bannerText,
                }),
                s.jsxs("div", {
                  className: "color-input-wrapper",
                  children: [
                    s.jsx("input", {
                      id: "color-banner-text",
                      type: "color",
                      value: e.bannerTextColor || "#f1f5f9",
                      onChange: (l) => t("bannerTextColor", l.target.value),
                      className: "color-picker",
                    }),
                    s.jsx("span", {
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
  jd = ({ t: e, locale: t, config: n, themeName: r }) => {
    const [o, i] = J.useState("react"),
      [a, l] = J.useState(!1),
      u = n.variant || "lanterns",
      c = {};
    (n.variant && n.variant !== "lanterns" && (c.variant = n.variant),
      r &&
        r !== "classic" &&
        (c.theme = typeof n.theme == "object" ? n.theme : r),
      n.position &&
        n.position !== "top" &&
        n.position !== "both" &&
        (c.position = n.position),
      n.opacity !== void 0 && n.opacity !== 0.85 && (c.opacity = n.opacity),
      n.layer && n.layer !== "foreground" && (c.layer = n.layer),
      Do("shadows", u) &&
        n.shadows &&
        n.shadows !== "soft" &&
        (c.shadows = n.shadows),
      n.autoTrigger !== void 0 && !n.autoTrigger && (c.autoTrigger = !1),
      n.countdown && (c.countdown = !0),
      n.confetti === "off" && (c.confetti = "off"));
    const g = [
      "lanternStyle",
      "ropeStyle",
      "ropeSag",
      "ceilingColor",
      "ropeColor",
      "bannerTextAr",
      "bannerTextEn",
      "bannerBg",
      "bannerTextColor",
      "bannerIconColor",
      "clearance",
      "intensity",
      "density",
      "glowColor",
    ];
    for (const C of g) Do(C, u, n) && n[C] !== void 0 && (c[C] = n[C]);
    const m = JSON.stringify(c, null, 2),
      p = () => {
        switch (o) {
          case "react":
            return `// 1. Install
// npm install ramadan-overlay

import React from 'react';
import { RamadanOverlay } from 'ramadan-overlay/react';

export default function App() {
  return (
    <div>
      {/* Your app content */}
      <RamadanOverlay
        ${Object.entries(c).map(([S, T]) =>
          typeof T == "string"
            ? `${S}="${T}"`
            : typeof T == "boolean"
              ? T
                ? S
                : `${S}={false}`
              : `${S}={${JSON.stringify(T)}}`
        ).join(`
  `)}
      />
    </div>
  );
}`;
          case "vanilla":
            return `// 1. Install via npm or CDN:
// npm install ramadan-overlay

import { init } from 'ramadan-overlay';

// Initialize overlay with selected options
const overlay = init(${m});

// Cleanup when leaving the page
// overlay.destroy();`;
          case "vue":
            return `<!-- 1. Install: npm install ramadan-overlay -->
<script setup>
import { RamadanOverlay } from 'ramadan-overlay/vue';

const config = ${m};
<\/script>

<template>
  <main>
    <RamadanOverlay v-bind="config" />
  </main>
</template>`;
          case "svelte":
            return `<!-- 1. Install: npm install ramadan-overlay -->
<script>
  import { RamadanOverlay } from 'ramadan-overlay/svelte';

  const config = ${m};
<\/script>

<RamadanOverlay {...config} />`;
          case "angular":
            return `// 1. Install: npm install ramadan-overlay
import { Component } from '@angular/core';
import { RamadanOverlayComponent } from 'ramadan-overlay/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RamadanOverlayComponent],
  template: \`
    <ramadan-overlay [config]="config"></ramadan-overlay>
  \`
})
export class AppComponent {
  config = ${m};
}`;
          case "ai":
            return t === "ar"
              ? `أريد إضافة زينة رمضانية واحتفالية لمشروعي باستخدام مكتبة ramadan-overlay.
يرجى تثبيت الحزمة عبر npm install ramadan-overlay وتضمين الزينة بالإعدادات التالية:

- نمط الزخرفة (Overlay Variant): ${c.variant || "lanterns"}
- السمة اللونية (Theme): ${typeof c.theme == "string" ? c.theme : "custom"}
- الموضع (Position): ${c.position || "top"}
- الشفافية (Opacity): ${c.opacity ?? 0.85}
- العداد التنازلي لوقت الإفطار: ${c.countdown ? "مفعّل" : "معطل"}
- الكشف التلقائي بالتقويم الهجري: ${c.autoTrigger !== !1 ? "مفعّل" : "معطل"}

كود التهيئة المقترح:
${m}

يرجى مراعاة تنظيف دورة الحياة عند تدمير المكون والتأكد من توافق أنماط العرض.`
              : `I want to add Ramadan and Eid festive decorations to my web application using the ramadan-overlay library.
Please install the package via npm install ramadan-overlay and configure the overlay with the following parameters:

- Overlay Variant: ${c.variant || "lanterns"}
- Theme: ${typeof c.theme == "string" ? c.theme : "custom"}
- Position: ${c.position || "top"}
- Opacity: ${c.opacity ?? 0.85}
- Iftar Countdown Widget: ${c.countdown ? "Enabled" : "Disabled"}
- Auto Hijri Trigger: ${c.autoTrigger !== !1 ? "Enabled" : "Disabled"}

Target Configuration:
${m}

Please ensure clean lifecycle cleanup on component unmount and smooth z-index integration.`;
          default:
            return "";
        }
      },
      y = () => {
        const C = p();
        navigator.clipboard.writeText(C).then(() => {
          (l(!0), setTimeout(() => l(!1), 2200));
        });
      };
    return s.jsxs("div", {
      className: "panel-card code-viewer-card",
      children: [
        s.jsxs("h3", {
          className: "panel-heading",
          children: [
            s.jsx("span", { children: "💻" }),
            s.jsx("span", { children: e.workbench.code.heading }),
          ],
        }),
        s.jsx("div", {
          className: "code-tabs",
          children: ["react", "vanilla", "vue", "svelte", "angular", "ai"].map(
            (C) =>
              s.jsx(
                "button",
                {
                  className: `code-tab-btn ${o === C ? "active" : ""}`,
                  onClick: () => i(C),
                  children: e.workbench.code.tabs[C],
                },
                C
              )
          ),
        }),
        s.jsxs("div", {
          className: "code-box-container",
          children: [
            s.jsx("button", {
              className: `code-copy-floating ${a ? "copied" : ""}`,
              onClick: y,
              children: a
                ? o === "ai"
                  ? e.workbench.code.promptSeamCopiedBtn
                  : e.workbench.code.copiedBtn
                : o === "ai"
                  ? e.workbench.code.copyPromptSeamBtn
                  : e.workbench.code.copyBtn,
            }),
            s.jsx("pre", {
              className: "code-pre",
              children: s.jsx("code", { children: p() }),
            }),
          ],
        }),
      ],
    });
  },
  Ad = ({
    t: e,
    locale: t,
    config: n,
    themeName: r,
    customTheme: o,
    onSelectVariant: i,
    onChangePosition: a,
    onChangeTheme: l,
    onUpdateConfig: u,
    onUpdateCustomColor: c,
    onResetCustomColors: g,
    onToggleAutoTrigger: m,
    onToggleCountdown: p,
  }) => {
    const y = n.variant || "lanterns",
      C = n.position || "top",
      S = n.opacity ?? 0.85,
      T = n.layer || "foreground",
      d = n.shadows || "soft",
      f = n.confetti === "off" ? "off" : "on",
      h = n.autoTrigger ?? !0,
      x = !!n.countdown;
    return s.jsxs("section", {
      id: "workbench",
      className: "workbench-section",
      children: [
        s.jsxs("div", {
          className: "section-header",
          children: [
            s.jsx("h2", {
              className: "section-title font-display",
              children: e.workbench.title,
            }),
            s.jsx("p", {
              className: "section-subtitle",
              children: e.workbench.subtitle,
            }),
          ],
        }),
        s.jsxs("div", {
          className: "workbench-grid",
          children: [
            s.jsxs("div", {
              className: "controls-column",
              children: [
                s.jsx(bd, { t: e, activeVariant: y, onSelectVariant: i }),
                s.jsx(Ed, {
                  t: e,
                  variant: y,
                  position: C,
                  onChangePosition: a,
                  themeName: r,
                  onChangeTheme: l,
                  opacity: S,
                  onChangeOpacity: (k) => u({ opacity: k }),
                  layer: T,
                  onChangeLayer: (k) => u({ layer: k }),
                  shadows: d,
                  onChangeShadows: (k) => u({ shadows: k }),
                  confetti: f,
                  onChangeConfetti: (k) => u({ confetti: k }),
                  autoTrigger: h,
                  onToggleAutoTrigger: m,
                  countdownEnabled: x,
                  onToggleCountdown: p,
                }),
                r === "custom" &&
                  s.jsx(Nd, {
                    customTheme: o,
                    onChangeColor: c,
                    onReset: g,
                    translations: e.workbench.colors,
                  }),
                s.jsx(Md, { t: e, config: n, onUpdateConfig: u }),
              ],
            }),
            s.jsx("div", {
              className: "code-column",
              children: s.jsx(jd, { t: e, locale: t, config: n, themeName: r }),
            }),
          ],
        }),
      ],
    });
  },
  Ld = ({ t: e, overlayInstance: t }) => {
    const [n, r] = J.useState(!0),
      o = t == null ? void 0 : t.countdown,
      i = () => (o == null ? void 0 : o.show()),
      a = () => (o == null ? void 0 : o.dismiss()),
      l = () => {
        var m;
        return (m = o == null ? void 0 : o.minimize) == null
          ? void 0
          : m.call(o);
      },
      u = () => {
        var m;
        return (m = o == null ? void 0 : o.expand) == null ? void 0 : m.call(o);
      },
      c = () => {
        if (o) {
          const m = o.toggleMute();
          r(m);
        }
      },
      g = () => {
        var m;
        (m = o == null ? void 0 : o.playAlert) == null || m.call(o);
      };
    return s.jsxs("div", {
      className: "panel-card",
      style: { marginBottom: 0 },
      children: [
        s.jsxs("h4", {
          className: "panel-heading",
          style: { fontSize: "1.1rem" },
          children: [
            s.jsx("span", { children: "⏱️" }),
            s.jsx("span", { children: e.lab.countdownTitle }),
          ],
        }),
        s.jsx("p", {
          style: {
            fontSize: "0.85rem",
            color: "var(--text-secondary)",
            marginBottom: "16px",
          },
          children: e.workbench.universal.countdownHelp,
        }),
        s.jsxs("div", {
          className: "lab-btn-grid",
          children: [
            s.jsxs("button", {
              className: "lab-btn",
              onClick: i,
              children: [
                s.jsx("span", { children: "👁️" }),
                s.jsx("span", { children: e.lab.btnShow }),
              ],
            }),
            s.jsxs("button", {
              className: "lab-btn",
              onClick: a,
              children: [
                s.jsx("span", { children: "✕" }),
                s.jsx("span", { children: e.lab.btnDismiss }),
              ],
            }),
            s.jsxs("button", {
              className: "lab-btn",
              onClick: l,
              children: [
                s.jsx("span", { children: "🗕" }),
                s.jsx("span", { children: e.lab.btnMinimize }),
              ],
            }),
            s.jsxs("button", {
              className: "lab-btn",
              onClick: u,
              children: [
                s.jsx("span", { children: "🗖" }),
                s.jsx("span", { children: e.lab.btnExpand }),
              ],
            }),
            s.jsxs("button", {
              className: "lab-btn",
              onClick: c,
              children: [
                s.jsx("span", { children: n ? "🔇" : "🔊" }),
                s.jsx("span", {
                  children: n ? e.lab.btnUnmute : e.lab.btnMute,
                }),
              ],
            }),
            s.jsxs("button", {
              className: "lab-btn",
              onClick: g,
              children: [
                s.jsx("span", { children: "🔔" }),
                s.jsx("span", { children: e.lab.btnPlayChime }),
              ],
            }),
          ],
        }),
      ],
    });
  },
  Pd = ({ t: e }) => {
    const [t, n] = J.useState([
        {
          id: "init",
          time: new Date().toISOString().slice(11, 19),
          msg: "Diagnostic logging engine initialized. Ready for resilience tests.",
          color: "#7ee787",
        },
      ]),
      [r, o] = J.useState(!1),
      i = J.useRef(null),
      a = (y, C = "#7ee787") => {
        const S = new Date().toISOString().slice(11, 19),
          T = `${Date.now()}-${Math.random()}`;
        n((d) => [...d, { id: T, time: S, msg: y, color: C }]);
      };
    (J.useEffect(() => {
      i.current && (i.current.scrollTop = i.current.scrollHeight);
    }, [t]),
      J.useEffect(() => {
        const y = console.warn,
          C = console.error;
        return (
          (console.warn = (...S) => {
            y.apply(console, S);
            const T = S.map((d) =>
              typeof d == "object" ? JSON.stringify(d) : String(d)
            ).join(" ");
            T.includes("[ramadan-overlay]") && a(T, "#e3b341");
          }),
          (console.error = (...S) => {
            C.apply(console, S);
            const T = S.map((d) =>
              typeof d == "object" ? JSON.stringify(d) : String(d)
            ).join(" ");
            T.includes("[ramadan-overlay]") && a(T, "#f85149");
          }),
          () => {
            ((console.warn = y), (console.error = C));
          }
        );
      }, []));
    const l = () => {
        a("Testing defensive config clamping...", "#e3b341");
        try {
          const y = uo({
            variant: "lanterns",
            opacity: 99,
            zIndex: -9999999999,
            ropeSag: 999,
            hijriAdjustment: 50,
            debug: !0,
            previewMode: !0,
          });
          (a(
            "✅ Result: Extreme configuration values safely clamped within valid boundaries without throwing!",
            "#7ee787"
          ),
            y.destroy());
        } catch (y) {
          a(`❌ Clamping failed: ${y}`, "#f85149");
        }
      },
      u = () => {
        a("Testing invalid Date input resilience...", "#e3b341");
        try {
          const y = Cn(new Date(NaN), 0, !0),
            C = Cn(null, 0, !0);
          (a(
            `✅ Result: getRamadanState(NaN) -> occasion: '${y.occasion}', isRamadan: ${y.isRamadan}`,
            "#7ee787"
          ),
            a(
              `✅ Result: getRamadanState(null) -> occasion: '${C.occasion}', isRamadan: ${C.isRamadan}`,
              "#7ee787"
            ));
        } catch (y) {
          a(`❌ Date test failed: ${y}`, "#f85149");
        }
      },
      c = () => {
        a(
          "Testing Error Containment Boundary & Atomic DOM Rollback...",
          "#e3b341"
        );
        const y = document.createElement;
        let C = 0;
        document.createElement = function (S) {
          if (S.toLowerCase() === "style" && ++C === 1)
            throw new Error(
              "Simulated catastrophic CSS stylesheet mounting crash"
            );
          return y.call(document, S);
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
              a(`onError hook captured crash: ${d}`, "#f85149");
            },
          });
          (a(
            "✅ Result: Host application did NOT crash! Safe No-Op instance returned.",
            "#7ee787"
          ),
            S.destroy());
        } catch (S) {
          a(`❌ Crash escaped boundary: ${S}`, "#f85149");
        } finally {
          document.createElement = y;
        }
      },
      g = () => {
        a("Testing double-contained onError isolation...", "#e3b341");
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
            a(
              "✅ Result: Faulty consumer onError callback threw, but double-containment seam protected host from crash!",
              "#7ee787"
            ));
        } catch (y) {
          a(`❌ onError escaped boundary: ${y}`, "#f85149");
        }
      },
      m = () => {
        const y = !r;
        (o(y),
          a(
            `Debug mode toggled: ${y ? "ON" : "OFF"}`,
            y ? "#7ee787" : "#8b8f98"
          ));
      },
      p = () => n([]);
    return s.jsxs("div", {
      className: "panel-card",
      style: { marginBottom: 0 },
      children: [
        s.jsxs("div", {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px",
          },
          children: [
            s.jsxs("h4", {
              className: "panel-heading",
              style: { fontSize: "1.1rem", margin: 0 },
              children: [
                s.jsx("span", { children: "🛡️" }),
                s.jsx("span", { children: e.lab.resilienceTitle }),
              ],
            }),
            s.jsx("button", {
              className: "nav-btn-pill",
              style: { fontSize: "0.75rem", padding: "4px 10px" },
              onClick: p,
              children: e.lab.clearTerminal,
            }),
          ],
        }),
        s.jsx("p", {
          style: {
            fontSize: "0.85rem",
            color: "var(--text-secondary)",
            marginBottom: "16px",
          },
          children: e.lab.resilienceDesc,
        }),
        s.jsxs("div", {
          className: "lab-btn-grid",
          children: [
            s.jsxs("button", {
              className: "lab-btn",
              onClick: l,
              children: [
                s.jsx("span", { children: "⚙️" }),
                s.jsx("span", { children: e.lab.btnClamping }),
              ],
            }),
            s.jsxs("button", {
              className: "lab-btn",
              onClick: u,
              children: [
                s.jsx("span", { children: "📅" }),
                s.jsx("span", { children: e.lab.btnInvalidDate }),
              ],
            }),
            s.jsxs("button", {
              className: "lab-btn",
              onClick: c,
              children: [
                s.jsx("span", { children: "💥" }),
                s.jsx("span", { children: e.lab.btnCrash }),
              ],
            }),
            s.jsxs("button", {
              className: "lab-btn",
              onClick: g,
              children: [
                s.jsx("span", { children: "📡" }),
                s.jsx("span", { children: e.lab.btnOnError }),
              ],
            }),
            s.jsxs("button", {
              className: "lab-btn",
              onClick: m,
              children: [
                s.jsx("span", { children: "🔍" }),
                s.jsx("span", { children: r ? e.lab.debugOn : e.lab.debugOff }),
              ],
            }),
          ],
        }),
        s.jsx("div", {
          className: "lab-terminal",
          ref: i,
          children: t.map((y) =>
            s.jsxs(
              "div",
              {
                className: "lab-terminal-line",
                style: { color: y.color },
                children: ["[", y.time, "] ", y.msg],
              },
              y.id
            )
          ),
        }),
      ],
    });
  },
  _d = ({ t: e, overlayInstance: t }) => {
    const [n, r] = J.useState(!1);
    return s.jsxs("section", {
      id: "lab",
      className: "lab-section",
      children: [
        s.jsxs("div", {
          className: "lab-drawer-header",
          onClick: () => r(!n),
          role: "button",
          tabIndex: 0,
          onKeyDown: (o) => {
            (o.key === "Enter" || o.key === " ") && r(!n);
          },
          children: [
            s.jsxs("div", {
              className: "lab-drawer-title font-display",
              children: [
                s.jsx("span", { children: "⚡" }),
                s.jsx("span", { children: e.lab.title }),
                s.jsx("span", {
                  className: "lab-drawer-badge",
                  children: e.lab.badge,
                }),
              ],
            }),
            s.jsx("div", {
              style: { fontSize: "1.4rem", color: "var(--gold-400)" },
              children: n ? "▲" : "▼",
            }),
          ],
        }),
        n &&
          s.jsxs("div", {
            className: "lab-content",
            children: [
              s.jsx(Ld, { t: e, overlayInstance: t }),
              s.jsx(Pd, { t: e }),
            ],
          }),
      ],
    });
  },
  Dd = ({ t: e }) =>
    s.jsxs("footer", {
      className: "celestial-footer",
      children: [
        s.jsxs("div", {
          className: "footer-links",
          children: [
            s.jsx("a", {
              href: "https://github.com/3mr-5aled/ramadan-overlay",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "footer-link",
              children: "GitHub",
            }),
            s.jsx("span", { children: "•" }),
            s.jsx("a", {
              href: "https://www.npmjs.com/package/ramadan-overlay",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "footer-link",
              children: "NPM Package",
            }),
            s.jsx("span", { children: "•" }),
            s.jsx("a", {
              href: "https://github.com/3mr-5aled/ramadan-overlay/blob/main/LICENSE",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "footer-link",
              children: e.footer.license,
            }),
          ],
        }),
        s.jsxs("p", {
          style: { marginTop: "8px" },
          children: ["🌙 ", e.footer.copy, " ", e.footer.builtWith],
        }),
      ],
    }),
  Wl = {
    colors: ["#c9a84c", "#e5c158", "#9a7b2c", "#f3e5ab", "#1b3b2b", "#0f172a"],
    glowColor: "rgba(201,168,76,0.55)",
    ceilingColor: "#c9a84c",
    ropeColor: "#c9a84c",
    bannerBg: "rgba(15,15,20,0.92)",
    bannerTextColor: "#f1f5f9",
    bannerIconColor: "#c9a84c",
  },
  Id = () => {
    const [e, t] = J.useState(vd),
      n = e === "ar" ? md : hd,
      [r, o] = J.useState(!0),
      [i, a] = J.useState("classic"),
      [l, u] = J.useState("ramadan"),
      [c, g] = J.useState(!1),
      [m, p] = J.useState(null),
      [y, C] = J.useState(Wl),
      [S, T] = J.useState({
        variant: "lanterns",
        position: "top",
        opacity: 0.85,
        layer: "foreground",
        shadows: "soft",
        autoTrigger: !1,
        previewMode: !0,
        countdown: !1,
        confetti: "on",
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
    (J.useEffect(() => {
      (fu(e), gd(e));
    }, [e]),
      J.useEffect(() => {
        try {
          const j = window.location.hash.replace(/^#/, "");
          if (j) {
            const U = new URLSearchParams(j),
              W = U.get("variant"),
              Z = U.get("theme"),
              X = U.get("position"),
              L = U.get("occasion");
            (W &&
              T((B) => Wn({ ...B, variant: W, position: X || B.position }, W)),
              Z && a(Z),
              L && u(L));
          }
        } catch {}
      }, []),
      J.useEffect(() => {
        try {
          const j = new URLSearchParams();
          (S.variant && j.set("variant", S.variant),
            i && j.set("theme", i),
            S.position && j.set("position", S.position),
            j.set("occasion", l),
            j.set("lang", e),
            window.history.replaceState(null, "", `#${j.toString()}`));
        } catch {}
      }, [S.variant, S.position, i, l, e]));
    const d = r
        ? { ...S, theme: i === "custom" ? y : i, previewMode: !0 }
        : { autoTrigger: !1, previewMode: !1 },
      f = () => {
        t((j) => (j === "ar" ? "en" : "ar"));
      },
      h = () => {
        o((j) => !j);
      },
      x = () => {
        var j;
        if ((j = m == null ? void 0 : m.countdown) != null && j.playAlert)
          m.countdown.playAlert();
        else
          try {
            const U = window.AudioContext || window.webkitAudioContext;
            if (U) {
              const W = new U(),
                Z = W.createOscillator(),
                X = W.createGain();
              ((Z.type = "sine"),
                Z.frequency.setValueAtTime(587.33, W.currentTime),
                Z.frequency.exponentialRampToValueAtTime(
                  880,
                  W.currentTime + 0.8
                ),
                X.gain.setValueAtTime(0.3, W.currentTime),
                X.gain.exponentialRampToValueAtTime(0.001, W.currentTime + 1.2),
                Z.connect(X),
                X.connect(W.destination),
                Z.start(),
                Z.stop(W.currentTime + 1.2));
            }
          } catch {}
      },
      k = () => {
        m != null && m.fireConfetti && m.fireConfetti(l);
      },
      z = (j) => {
        T((U) => Wn(U, j));
      },
      E = (j) => {
        T((U) => ({ ...U, position: j }));
      },
      b = (j) => {
        a(j);
      },
      A = (j) => {
        T((U) => ({ ...U, ...j }));
      },
      M = (j, U) => {
        C((W) => {
          const Z = W.colors
            ? [...W.colors]
            : [
                "#c9a84c",
                "#e5c158",
                "#9a7b2c",
                "#f3e5ab",
                "#1b3b2b",
                "#0f172a",
              ];
          return j === "primaryColor"
            ? ((Z[0] = U), { ...W, colors: Z })
            : j === "accentColor"
              ? ((Z[3] = U), { ...W, colors: Z })
              : { ...W, [j]: U };
        });
      },
      _ = () => {
        C(Wl);
      },
      R = (j) => {
        (u(j),
          T(
            j === "eid-fitr"
              ? (U) =>
                  Wn(
                    {
                      ...U,
                      bannerTextAr: "عِيد فِطْر مُبَارَك",
                      bannerTextEn: "Eid Al-Fitr Mubarak",
                    },
                    "eid-fitr"
                  )
              : j === "eid-adha"
                ? (U) =>
                    Wn(
                      {
                        ...U,
                        bannerTextAr: "عِيد أَضْحَى مُبَارَك",
                        bannerTextEn: "Eid Al-Adha Mubarak",
                      },
                      "eid-adha"
                    )
                : (U) =>
                    Wn(
                      {
                        ...U,
                        bannerTextAr: "رَمَضَان كَرِيم",
                        bannerTextEn: "Ramadan Mubarak",
                      },
                      "lanterns"
                    )
          ));
      };
    return s.jsxs("div", {
      className: `app-container ${c ? "drawer-open" : ""}`,
      children: [
        r && s.jsx(pd, { config: d, onInstance: p }),
        s.jsx(Sd, {
          t: n,
          locale: e,
          onToggleLocale: f,
          occasion: l,
          onChangeOccasion: R,
          overlayOn: r,
          onToggleOverlay: h,
          onPlayChime: x,
          onFireConfetti: k,
          onToggleDrawer: () => g((j) => !j),
        }),
        s.jsxs("main", {
          children: [
            s.jsx(kd, {
              t: n,
              onScrollToWorkbench: () => {
                var j;
                (j = document.getElementById("workbench")) == null ||
                  j.scrollIntoView({ behavior: "smooth" });
              },
              onScrollToLab: () => {
                var j;
                (j = document.getElementById("lab")) == null ||
                  j.scrollIntoView({ behavior: "smooth" });
              },
            }),
            s.jsx(Ad, {
              t: n,
              locale: e,
              config: S,
              themeName: i,
              customTheme: y,
              onSelectVariant: z,
              onChangePosition: E,
              onChangeTheme: b,
              onUpdateConfig: A,
              onUpdateCustomColor: M,
              onResetCustomColors: _,
              onToggleAutoTrigger: () =>
                T((j) => ({ ...j, autoTrigger: !j.autoTrigger })),
              onToggleCountdown: () =>
                T((j) => ({ ...j, countdown: !j.countdown })),
            }),
            s.jsx(_d, { t: n, overlayInstance: m }),
          ],
        }),
        s.jsx(Dd, { t: n }),
      ],
    });
  },
  Gl = document.getElementById("root");
Gl &&
  Ei.createRoot(Gl).render(s.jsx(Ou.StrictMode, { children: s.jsx(Id, {}) }));
