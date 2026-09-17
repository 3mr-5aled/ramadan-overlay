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
function Cc(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var Ks = { exports: {} },
  Ro = {},
  Zs = { exports: {} },
  Q = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var jr = Symbol.for("react.element"),
  Tc = Symbol.for("react.portal"),
  jc = Symbol.for("react.fragment"),
  zc = Symbol.for("react.strict_mode"),
  Ec = Symbol.for("react.profiler"),
  Nc = Symbol.for("react.provider"),
  Mc = Symbol.for("react.context"),
  Ac = Symbol.for("react.forward_ref"),
  Lc = Symbol.for("react.suspense"),
  Ic = Symbol.for("react.memo"),
  Dc = Symbol.for("react.lazy"),
  jl = Symbol.iterator;
function Pc(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (jl && e[jl]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var Xs = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  Js = Object.assign,
  qs = {};
function Ln(e, t, n) {
  ((this.props = e),
    (this.context = t),
    (this.refs = qs),
    (this.updater = n || Xs));
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
function e1() {}
e1.prototype = Ln.prototype;
function ji(e, t, n) {
  ((this.props = e),
    (this.context = t),
    (this.refs = qs),
    (this.updater = n || Xs));
}
var zi = (ji.prototype = new e1());
zi.constructor = ji;
Js(zi, Ln.prototype);
zi.isPureReactComponent = !0;
var zl = Array.isArray,
  t1 = Object.prototype.hasOwnProperty,
  Ei = { current: null },
  n1 = { key: !0, ref: !0, __self: !0, __source: !0 };
function r1(e, t, n) {
  var r,
    o = {},
    a = null,
    i = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (i = t.ref),
    t.key !== void 0 && (a = "" + t.key),
    t))
      t1.call(t, r) && !n1.hasOwnProperty(r) && (o[r] = t[r]);
  var s = arguments.length - 2;
  if (s === 1) o.children = n;
  else if (1 < s) {
    for (var c = Array(s), u = 0; u < s; u++) c[u] = arguments[u + 2];
    o.children = c;
  }
  if (e && e.defaultProps)
    for (r in ((s = e.defaultProps), s)) o[r] === void 0 && (o[r] = s[r]);
  return {
    $$typeof: jr,
    type: e,
    key: a,
    ref: i,
    props: o,
    _owner: Ei.current,
  };
}
function Rc(e, t) {
  return {
    $$typeof: jr,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function Ni(e) {
  return typeof e == "object" && e !== null && e.$$typeof === jr;
}
function _c(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var El = /\/+/g;
function qo(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? _c("" + e.key)
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
          case jr:
          case Tc:
            i = !0;
        }
    }
  if (i)
    return (
      (i = e),
      (o = o(i)),
      (e = r === "" ? "." + qo(i, 0) : r),
      zl(o)
        ? ((n = ""),
          e != null && (n = e.replace(El, "$&/") + "/"),
          Jr(o, t, n, "", function (u) {
            return u;
          }))
        : o != null &&
          (Ni(o) &&
            (o = Rc(
              o,
              n +
                (!o.key || (i && i.key === o.key)
                  ? ""
                  : ("" + o.key).replace(El, "$&/") + "/") +
                e
            )),
          t.push(o)),
      1
    );
  if (((i = 0), (r = r === "" ? "." : r + ":"), zl(e)))
    for (var s = 0; s < e.length; s++) {
      a = e[s];
      var c = r + qo(a, s);
      i += Jr(a, t, n, c, o);
    }
  else if (((c = Pc(e)), typeof c == "function"))
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
function Oc(e) {
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
var ze = { current: null },
  qr = { transition: null },
  Bc = {
    ReactCurrentDispatcher: ze,
    ReactCurrentBatchConfig: qr,
    ReactCurrentOwner: Ei,
  };
function o1() {
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
    if (!Ni(e))
      throw Error(
        "React.Children.only expected to receive a single React element child."
      );
    return e;
  },
};
Q.Component = Ln;
Q.Fragment = jc;
Q.Profiler = Ec;
Q.PureComponent = ji;
Q.StrictMode = zc;
Q.Suspense = Lc;
Q.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Bc;
Q.act = o1;
Q.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        "."
    );
  var r = Js({}, e.props),
    o = e.key,
    a = e.ref,
    i = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((a = t.ref), (i = Ei.current)),
      t.key !== void 0 && (o = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var s = e.type.defaultProps;
    for (c in t)
      t1.call(t, c) &&
        !n1.hasOwnProperty(c) &&
        (r[c] = t[c] === void 0 && s !== void 0 ? s[c] : t[c]);
  }
  var c = arguments.length - 2;
  if (c === 1) r.children = n;
  else if (1 < c) {
    s = Array(c);
    for (var u = 0; u < c; u++) s[u] = arguments[u + 2];
    r.children = s;
  }
  return { $$typeof: jr, type: e.type, key: o, ref: a, props: r, _owner: i };
};
Q.createContext = function (e) {
  return (
    (e = {
      $$typeof: Mc,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: Nc, _context: e }),
    (e.Consumer = e)
  );
};
Q.createElement = r1;
Q.createFactory = function (e) {
  var t = r1.bind(null, e);
  return ((t.type = e), t);
};
Q.createRef = function () {
  return { current: null };
};
Q.forwardRef = function (e) {
  return { $$typeof: Ac, render: e };
};
Q.isValidElement = Ni;
Q.lazy = function (e) {
  return { $$typeof: Dc, _payload: { _status: -1, _result: e }, _init: Oc };
};
Q.memo = function (e, t) {
  return { $$typeof: Ic, type: e, compare: t === void 0 ? null : t };
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
Q.unstable_act = o1;
Q.useCallback = function (e, t) {
  return ze.current.useCallback(e, t);
};
Q.useContext = function (e) {
  return ze.current.useContext(e);
};
Q.useDebugValue = function () {};
Q.useDeferredValue = function (e) {
  return ze.current.useDeferredValue(e);
};
Q.useEffect = function (e, t) {
  return ze.current.useEffect(e, t);
};
Q.useId = function () {
  return ze.current.useId();
};
Q.useImperativeHandle = function (e, t, n) {
  return ze.current.useImperativeHandle(e, t, n);
};
Q.useInsertionEffect = function (e, t) {
  return ze.current.useInsertionEffect(e, t);
};
Q.useLayoutEffect = function (e, t) {
  return ze.current.useLayoutEffect(e, t);
};
Q.useMemo = function (e, t) {
  return ze.current.useMemo(e, t);
};
Q.useReducer = function (e, t, n) {
  return ze.current.useReducer(e, t, n);
};
Q.useRef = function (e) {
  return ze.current.useRef(e);
};
Q.useState = function (e) {
  return ze.current.useState(e);
};
Q.useSyncExternalStore = function (e, t, n) {
  return ze.current.useSyncExternalStore(e, t, n);
};
Q.useTransition = function () {
  return ze.current.useTransition();
};
Q.version = "18.3.1";
Zs.exports = Q;
var Y = Zs.exports;
const za = Cc(Y);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Fc = Y,
  $c = Symbol.for("react.element"),
  Hc = Symbol.for("react.fragment"),
  Vc = Object.prototype.hasOwnProperty,
  Wc = Fc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  Uc = { key: !0, ref: !0, __self: !0, __source: !0 };
function a1(e, t, n) {
  var r,
    o = {},
    a = null,
    i = null;
  (n !== void 0 && (a = "" + n),
    t.key !== void 0 && (a = "" + t.key),
    t.ref !== void 0 && (i = t.ref));
  for (r in t) Vc.call(t, r) && !Uc.hasOwnProperty(r) && (o[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) o[r] === void 0 && (o[r] = t[r]);
  return {
    $$typeof: $c,
    type: e,
    key: a,
    ref: i,
    props: o,
    _owner: Wc.current,
  };
}
Ro.Fragment = Hc;
Ro.jsx = a1;
Ro.jsxs = a1;
Ks.exports = Ro;
var l = Ks.exports,
  Ea = {},
  i1 = { exports: {} },
  Be = {},
  l1 = { exports: {} },
  s1 = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(N, H) {
    var x = N.length;
    N.push(H);
    e: for (; 0 < x;) {
      var g = (x - 1) >>> 1,
        D = N[g];
      if (0 < o(D, H)) ((N[g] = H), (N[x] = D), (x = g));
      else break e;
    }
  }
  function n(N) {
    return N.length === 0 ? null : N[0];
  }
  function r(N) {
    if (N.length === 0) return null;
    var H = N[0],
      x = N.pop();
    if (x !== H) {
      N[0] = x;
      e: for (var g = 0, D = N.length, F = D >>> 1; g < F;) {
        var V = 2 * (g + 1) - 1,
          R = N[V],
          $ = V + 1,
          O = N[$];
        if (0 > o(R, x))
          $ < D && 0 > o(O, R)
            ? ((N[g] = O), (N[$] = x), (g = $))
            : ((N[g] = R), (N[V] = x), (g = V));
        else if ($ < D && 0 > o(O, x)) ((N[g] = O), (N[$] = x), (g = $));
        else break e;
      }
    }
    return H;
  }
  function o(N, H) {
    var x = N.sortIndex - H.sortIndex;
    return x !== 0 ? x : N.id - H.id;
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
    h = null,
    f = 3,
    m = !1,
    S = !1,
    b = !1,
    T = typeof setTimeout == "function" ? setTimeout : null,
    d = typeof clearTimeout == "function" ? clearTimeout : null,
    p = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function y(N) {
    for (var H = n(u); H !== null;) {
      if (H.callback === null) r(u);
      else if (H.startTime <= N)
        (r(u), (H.sortIndex = H.expirationTime), t(c, H));
      else break;
      H = n(u);
    }
  }
  function w(N) {
    if (((b = !1), y(N), !S))
      if (n(c) !== null) ((S = !0), G(C));
      else {
        var H = n(u);
        H !== null && le(w, H.startTime - N);
      }
  }
  function C(N, H) {
    ((S = !1), b && ((b = !1), d(k), (k = -1)), (m = !0));
    var x = f;
    try {
      for (
        y(H), h = n(c);
        h !== null && (!(h.expirationTime > H) || (N && !P()));
      ) {
        var g = h.callback;
        if (typeof g == "function") {
          ((h.callback = null), (f = h.priorityLevel));
          var D = g(h.expirationTime <= H);
          ((H = e.unstable_now()),
            typeof D == "function" ? (h.callback = D) : h === n(c) && r(c),
            y(H));
        } else r(c);
        h = n(c);
      }
      if (h !== null) var F = !0;
      else {
        var V = n(u);
        (V !== null && le(w, V.startTime - H), (F = !1));
      }
      return F;
    } finally {
      ((h = null), (f = x), (m = !1));
    }
  }
  var j = !1,
    z = null,
    k = -1,
    L = 5,
    E = -1;
  function P() {
    return !(e.unstable_now() - E < L);
  }
  function I() {
    if (z !== null) {
      var N = e.unstable_now();
      E = N;
      var H = !0;
      try {
        H = z(!0, N);
      } finally {
        H ? A() : ((j = !1), (z = null));
      }
    } else j = !1;
  }
  var A;
  if (typeof p == "function")
    A = function () {
      p(I);
    };
  else if (typeof MessageChannel < "u") {
    var B = new MessageChannel(),
      U = B.port2;
    ((B.port1.onmessage = I),
      (A = function () {
        U.postMessage(null);
      }));
  } else
    A = function () {
      T(I, 0);
    };
  function G(N) {
    ((z = N), j || ((j = !0), A()));
  }
  function le(N, H) {
    k = T(function () {
      N(e.unstable_now());
    }, H);
  }
  ((e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (N) {
      N.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      S || m || ((S = !0), G(C));
    }),
    (e.unstable_forceFrameRate = function (N) {
      0 > N || 125 < N
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
          )
        : (L = 0 < N ? Math.floor(1e3 / N) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return f;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(c);
    }),
    (e.unstable_next = function (N) {
      switch (f) {
        case 1:
        case 2:
        case 3:
          var H = 3;
          break;
        default:
          H = f;
      }
      var x = f;
      f = H;
      try {
        return N();
      } finally {
        f = x;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (N, H) {
      switch (N) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          N = 3;
      }
      var x = f;
      f = N;
      try {
        return H();
      } finally {
        f = x;
      }
    }),
    (e.unstable_scheduleCallback = function (N, H, x) {
      var g = e.unstable_now();
      switch (
        (typeof x == "object" && x !== null
          ? ((x = x.delay), (x = typeof x == "number" && 0 < x ? g + x : g))
          : (x = g),
        N)
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
        (D = x + D),
        (N = {
          id: v++,
          callback: H,
          priorityLevel: N,
          startTime: x,
          expirationTime: D,
          sortIndex: -1,
        }),
        x > g
          ? ((N.sortIndex = x),
            t(u, N),
            n(c) === null &&
              N === n(u) &&
              (b ? (d(k), (k = -1)) : (b = !0), le(w, x - g)))
          : ((N.sortIndex = D), t(c, N), S || m || ((S = !0), G(C))),
        N
      );
    }),
    (e.unstable_shouldYield = P),
    (e.unstable_wrapCallback = function (N) {
      var H = f;
      return function () {
        var x = f;
        f = H;
        try {
          return N.apply(this, arguments);
        } finally {
          f = x;
        }
      };
    }));
})(s1);
l1.exports = s1;
var Gc = l1.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Qc = Y,
  Oe = Gc;
function M(e) {
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
var c1 = new Set(),
  lr = {};
function en(e, t) {
  (Tn(e, t), Tn(e + "Capture", t));
}
function Tn(e, t) {
  for (lr[e] = t, e = 0; e < t.length; e++) c1.add(t[e]);
}
var vt = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  Na = Object.prototype.hasOwnProperty,
  Yc =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  Nl = {},
  Ml = {};
function Kc(e) {
  return Na.call(Ml, e)
    ? !0
    : Na.call(Nl, e)
      ? !1
      : Yc.test(e)
        ? (Ml[e] = !0)
        : ((Nl[e] = !0), !1);
}
function Zc(e, t, n, r) {
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
function Xc(e, t, n, r) {
  if (t === null || typeof t > "u" || Zc(e, t, n, r)) return !0;
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
function Ee(e, t, n, r, o, a, i) {
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
    xe[e] = new Ee(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  xe[t] = new Ee(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  xe[e] = new Ee(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  xe[e] = new Ee(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    xe[e] = new Ee(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  xe[e] = new Ee(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  xe[e] = new Ee(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  xe[e] = new Ee(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  xe[e] = new Ee(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Mi = /[\-:]([a-z])/g;
function Ai(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(Mi, Ai);
    xe[t] = new Ee(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(Mi, Ai);
    xe[t] = new Ee(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(Mi, Ai);
  xe[t] = new Ee(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  xe[e] = new Ee(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
xe.xlinkHref = new Ee(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1
);
["src", "href", "action", "formAction"].forEach(function (e) {
  xe[e] = new Ee(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Li(e, t, n, r) {
  var o = xe.hasOwnProperty(t) ? xe[t] : null;
  (o !== null
    ? o.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (Xc(t, n, o, r) && (n = null),
    r || o === null
      ? Kc(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
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
var xt = Qc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  Lr = Symbol.for("react.element"),
  an = Symbol.for("react.portal"),
  ln = Symbol.for("react.fragment"),
  Ii = Symbol.for("react.strict_mode"),
  Ma = Symbol.for("react.profiler"),
  u1 = Symbol.for("react.provider"),
  d1 = Symbol.for("react.context"),
  Di = Symbol.for("react.forward_ref"),
  Aa = Symbol.for("react.suspense"),
  La = Symbol.for("react.suspense_list"),
  Pi = Symbol.for("react.memo"),
  kt = Symbol.for("react.lazy"),
  p1 = Symbol.for("react.offscreen"),
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
function Jc(e) {
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
    case Ma:
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
      case d1:
        return (e.displayName || "Context") + ".Consumer";
      case u1:
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
function qc(e) {
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
function f1(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function eu(e) {
  var t = f1(e) ? "checked" : "value",
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
  e._valueTracker || (e._valueTracker = eu(e));
}
function h1(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = f1(e) ? (e.checked ? "true" : "false") : e.value),
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
  if (t.dangerouslySetInnerHTML != null) throw Error(M(91));
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
      if (t != null) throw Error(M(92));
      if (Kn(n)) {
        if (1 < n.length) throw Error(M(93));
        n = n[0];
      }
      t = n;
    }
    (t == null && (t = ""), (n = t));
  }
  e._wrapperState = { initialValue: Rt(n) };
}
function v1(e, t) {
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
function g1(e) {
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
    ? g1(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
      ? "http://www.w3.org/1999/xhtml"
      : e;
}
var Dr,
  y1 = (function (e) {
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
  tu = ["Webkit", "ms", "Moz", "O"];
Object.keys(Jn).forEach(function (e) {
  tu.forEach(function (t) {
    ((t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Jn[t] = Jn[e]));
  });
});
function w1(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (Jn.hasOwnProperty(e) && Jn[e])
      ? ("" + t).trim()
      : t + "px";
}
function x1(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        o = w1(n, t[n], r);
      (n === "float" && (n = "cssFloat"), r ? e.setProperty(n, o) : (e[n] = o));
    }
}
var nu = ie(
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
    if (nu[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(M(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(M(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(M(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(M(62));
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
  if ((e = Nr(e))) {
    if (typeof Ha != "function") throw Error(M(280));
    var t = e.stateNode;
    t && ((t = $o(t)), Ha(e.stateNode, e.type, t));
  }
}
function b1(e) {
  wn ? (xn ? xn.push(e) : (xn = [e])) : (wn = e);
}
function k1() {
  if (wn) {
    var e = wn,
      t = xn;
    if (((xn = wn = null), Rl(e), t)) for (e = 0; e < t.length; e++) Rl(t[e]);
  }
}
function S1(e, t) {
  return e(t);
}
function C1() {}
var ra = !1;
function T1(e, t, n) {
  if (ra) return e(t, n);
  ra = !0;
  try {
    return S1(e, t, n);
  } finally {
    ((ra = !1), (wn !== null || xn !== null) && (C1(), k1()));
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
  if (n && typeof n != "function") throw Error(M(231, t, typeof n));
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
function ru(e, t, n, r, o, a, i, s, c) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, u);
  } catch (v) {
    this.onError(v);
  }
}
var qn = !1,
  fo = null,
  ho = !1,
  Wa = null,
  ou = {
    onError: function (e) {
      ((qn = !0), (fo = e));
    },
  };
function au(e, t, n, r, o, a, i, s, c) {
  ((qn = !1), (fo = null), ru.apply(ou, arguments));
}
function iu(e, t, n, r, o, a, i, s, c) {
  if ((au.apply(this, arguments), qn)) {
    if (qn) {
      var u = fo;
      ((qn = !1), (fo = null));
    } else throw Error(M(198));
    ho || ((ho = !0), (Wa = u));
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
function j1(e) {
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
  if (tn(e) !== e) throw Error(M(188));
}
function lu(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = tn(e)), t === null)) throw Error(M(188));
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
      throw Error(M(188));
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
        if (!i) throw Error(M(189));
      }
    }
    if (n.alternate !== r) throw Error(M(190));
  }
  if (n.tag !== 3) throw Error(M(188));
  return n.stateNode.current === n ? e : t;
}
function z1(e) {
  return ((e = lu(e)), e !== null ? E1(e) : null);
}
function E1(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null;) {
    var t = E1(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var N1 = Oe.unstable_scheduleCallback,
  Ol = Oe.unstable_cancelCallback,
  su = Oe.unstable_shouldYield,
  cu = Oe.unstable_requestPaint,
  de = Oe.unstable_now,
  uu = Oe.unstable_getCurrentPriorityLevel,
  _i = Oe.unstable_ImmediatePriority,
  M1 = Oe.unstable_UserBlockingPriority,
  mo = Oe.unstable_NormalPriority,
  du = Oe.unstable_LowPriority,
  A1 = Oe.unstable_IdlePriority,
  _o = null,
  lt = null;
function pu(e) {
  if (lt && typeof lt.onCommitFiberRoot == "function")
    try {
      lt.onCommitFiberRoot(_o, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var et = Math.clz32 ? Math.clz32 : mu,
  fu = Math.log,
  hu = Math.LN2;
function mu(e) {
  return ((e >>>= 0), e === 0 ? 32 : (31 - ((fu(e) / hu) | 0)) | 0);
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
function vu(e, t) {
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
function gu(e, t) {
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
      ? (!(s & n) || s & r) && (o[i] = vu(s, t))
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
function L1() {
  var e = Pr;
  return ((Pr <<= 1), !(Pr & 4194240) && (Pr = 64), e);
}
function oa(e) {
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
function yu(e, t) {
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
function I1(e) {
  return (
    (e &= -e),
    1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1
  );
}
var D1,
  Bi,
  P1,
  R1,
  _1,
  Ga = !1,
  _r = [],
  Et = null,
  Nt = null,
  Mt = null,
  ur = new Map(),
  dr = new Map(),
  Ct = [],
  wu =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " "
    );
function Bl(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      Et = null;
      break;
    case "dragenter":
    case "dragleave":
      Nt = null;
      break;
    case "mouseover":
    case "mouseout":
      Mt = null;
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
      t !== null && ((t = Nr(t)), t !== null && Bi(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      o !== null && t.indexOf(o) === -1 && t.push(o),
      e);
}
function xu(e, t, n, r, o) {
  switch (t) {
    case "focusin":
      return ((Et = On(Et, e, t, n, r, o)), !0);
    case "dragenter":
      return ((Nt = On(Nt, e, t, n, r, o)), !0);
    case "mouseover":
      return ((Mt = On(Mt, e, t, n, r, o)), !0);
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
function O1(e) {
  var t = Wt(e.target);
  if (t !== null) {
    var n = tn(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = j1(n)), t !== null)) {
          ((e.blockedOn = t),
            _1(e.priority, function () {
              P1(n);
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
    } else return ((t = Nr(n)), t !== null && Bi(t), (e.blockedOn = n), !1);
    t.shift();
  }
  return !0;
}
function Fl(e, t, n) {
  eo(e) && n.delete(t);
}
function bu() {
  ((Ga = !1),
    Et !== null && eo(Et) && (Et = null),
    Nt !== null && eo(Nt) && (Nt = null),
    Mt !== null && eo(Mt) && (Mt = null),
    ur.forEach(Fl),
    dr.forEach(Fl));
}
function Bn(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    Ga ||
      ((Ga = !0),
      Oe.unstable_scheduleCallback(Oe.unstable_NormalPriority, bu)));
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
    Et !== null && Bn(Et, e),
      Nt !== null && Bn(Nt, e),
      Mt !== null && Bn(Mt, e),
      ur.forEach(t),
      dr.forEach(t),
      n = 0;
    n < Ct.length;
    n++
  )
    ((r = Ct[n]), r.blockedOn === e && (r.blockedOn = null));
  for (; 0 < Ct.length && ((n = Ct[0]), n.blockedOn === null);)
    (O1(n), n.blockedOn === null && Ct.shift());
}
var bn = xt.ReactCurrentBatchConfig,
  go = !0;
function ku(e, t, n, r) {
  var o = J,
    a = bn.transition;
  bn.transition = null;
  try {
    ((J = 1), Fi(e, t, n, r));
  } finally {
    ((J = o), (bn.transition = a));
  }
}
function Su(e, t, n, r) {
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
    if (o === null) (ha(e, t, r, yo, n), Bl(e, r));
    else if (xu(o, e, t, n, r)) r.stopPropagation();
    else if ((Bl(e, r), t & 4 && -1 < wu.indexOf(e))) {
      for (; o !== null;) {
        var a = Nr(o);
        if (
          (a !== null && D1(a),
          (a = Qa(e, t, n, r)),
          a === null && ha(e, t, r, yo, n),
          a === o)
        )
          break;
        o = a;
      }
      o !== null && r.stopPropagation();
    } else ha(e, t, r, null, n);
  }
}
var yo = null;
function Qa(e, t, n, r) {
  if (((yo = null), (e = Ri(r)), (e = Wt(e)), e !== null))
    if (((t = tn(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = j1(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return ((yo = e), null);
}
function B1(e) {
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
      switch (uu()) {
        case _i:
          return 1;
        case M1:
          return 4;
        case mo:
        case du:
          return 16;
        case A1:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var jt = null,
  $i = null,
  to = null;
function F1() {
  if (to) return to;
  var e,
    t = $i,
    n = t.length,
    r,
    o = "value" in jt ? jt.value : jt.textContent,
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
  Er = ie({}, In, { view: 0, detail: 0 }),
  Cu = Fe(Er),
  aa,
  ia,
  Fn,
  Oo = ie({}, Er, {
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
  Tu = ie({}, Oo, { dataTransfer: 0 }),
  ju = Fe(Tu),
  zu = ie({}, Er, { relatedTarget: 0 }),
  la = Fe(zu),
  Eu = ie({}, In, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Nu = Fe(Eu),
  Mu = ie({}, In, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  Au = Fe(Mu),
  Lu = ie({}, In, { data: 0 }),
  Vl = Fe(Lu),
  Iu = {
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
  Du = {
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
  Pu = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function Ru(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Pu[e]) ? !!t[e] : !1;
}
function Vi() {
  return Ru;
}
var _u = ie({}, Er, {
    key: function (e) {
      if (e.key) {
        var t = Iu[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = no(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
          ? Du[e.keyCode] || "Unidentified"
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
  Ou = Fe(_u),
  Bu = ie({}, Oo, {
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
  Wl = Fe(Bu),
  Fu = ie({}, Er, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Vi,
  }),
  $u = Fe(Fu),
  Hu = ie({}, In, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Vu = Fe(Hu),
  Wu = ie({}, Oo, {
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
  Uu = Fe(Wu),
  Gu = [9, 13, 27, 32],
  Wi = vt && "CompositionEvent" in window,
  er = null;
vt && "documentMode" in document && (er = document.documentMode);
var Qu = vt && "TextEvent" in window && !er,
  $1 = vt && (!Wi || (er && 8 < er && 11 >= er)),
  Ul = " ",
  Gl = !1;
function H1(e, t) {
  switch (e) {
    case "keyup":
      return Gu.indexOf(t.keyCode) !== -1;
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
function V1(e) {
  return ((e = e.detail), typeof e == "object" && "data" in e ? e.data : null);
}
var sn = !1;
function Yu(e, t) {
  switch (e) {
    case "compositionend":
      return V1(t);
    case "keypress":
      return t.which !== 32 ? null : ((Gl = !0), Ul);
    case "textInput":
      return ((e = t.data), e === Ul && Gl ? null : e);
    default:
      return null;
  }
}
function Ku(e, t) {
  if (sn)
    return e === "compositionend" || (!Wi && H1(e, t))
      ? ((e = F1()), (to = $i = jt = null), (sn = !1), e)
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
      return $1 && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Zu = {
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
  return t === "input" ? !!Zu[e.type] : t === "textarea";
}
function W1(e, t, n, r) {
  (b1(r),
    (t = wo(t, "onChange")),
    0 < t.length &&
      ((n = new Hi("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t })));
}
var tr = null,
  fr = null;
function Xu(e) {
  t2(e, 0);
}
function Bo(e) {
  var t = dn(e);
  if (h1(t)) return e;
}
function Ju(e, t) {
  if (e === "change") return t;
}
var U1 = !1;
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
  U1 = sa && (!document.documentMode || 9 < document.documentMode);
}
function Kl() {
  tr && (tr.detachEvent("onpropertychange", G1), (fr = tr = null));
}
function G1(e) {
  if (e.propertyName === "value" && Bo(fr)) {
    var t = [];
    (W1(t, fr, e, Ri(e)), T1(Xu, t));
  }
}
function qu(e, t, n) {
  e === "focusin"
    ? (Kl(), (tr = t), (fr = n), tr.attachEvent("onpropertychange", G1))
    : e === "focusout" && Kl();
}
function ed(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return Bo(fr);
}
function td(e, t) {
  if (e === "click") return Bo(t);
}
function nd(e, t) {
  if (e === "input" || e === "change") return Bo(t);
}
function rd(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var nt = typeof Object.is == "function" ? Object.is : rd;
function hr(e, t) {
  if (nt(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var o = n[r];
    if (!Na.call(t, o) || !nt(e[o], t[o])) return !1;
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
function Q1(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
          ? Q1(e, t.parentNode)
          : "contains" in e
            ? e.contains(t)
            : e.compareDocumentPosition
              ? !!(e.compareDocumentPosition(t) & 16)
              : !1
    : !1;
}
function Y1() {
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
function od(e) {
  var t = Y1(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    Q1(n.ownerDocument.documentElement, n)
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
var ad = vt && "documentMode" in document && 11 >= document.documentMode,
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
    (nr && hr(nr, r)) ||
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
  K1 = {};
vt &&
  ((K1 = document.createElement("div").style),
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
  for (n in t) if (t.hasOwnProperty(n) && n in K1) return (ua[e] = t[n]);
  return e;
}
var Z1 = Fo("animationend"),
  X1 = Fo("animationiteration"),
  J1 = Fo("animationstart"),
  q1 = Fo("transitionend"),
  e2 = new Map(),
  ql =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " "
    );
function Ot(e, t) {
  (e2.set(e, t), en(t, [e]));
}
for (var da = 0; da < ql.length; da++) {
  var pa = ql[da],
    id = pa.toLowerCase(),
    ld = pa[0].toUpperCase() + pa.slice(1);
  Ot(id, "on" + ld);
}
Ot(Z1, "onAnimationEnd");
Ot(X1, "onAnimationIteration");
Ot(J1, "onAnimationStart");
Ot("dblclick", "onDoubleClick");
Ot("focusin", "onFocus");
Ot("focusout", "onBlur");
Ot(q1, "onTransitionEnd");
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
  sd = new Set("cancel close invalid load scroll toggle".split(" ").concat(Xn));
function es(e, t, n) {
  var r = e.type || "unknown-event";
  ((e.currentTarget = n), iu(r, t, void 0, e), (e.currentTarget = null));
}
function t2(e, t) {
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
  if (ho) throw ((e = Wa), (ho = !1), (Wa = null), e);
}
function te(e, t) {
  var n = t[ei];
  n === void 0 && (n = t[ei] = new Set());
  var r = e + "__bubble";
  n.has(r) || (n2(t, e, 2, !1), n.add(r));
}
function fa(e, t, n) {
  var r = 0;
  (t && (r |= 4), n2(n, e, r, t));
}
var Fr = "_reactListening" + Math.random().toString(36).slice(2);
function mr(e) {
  if (!e[Fr]) {
    ((e[Fr] = !0),
      c1.forEach(function (n) {
        n !== "selectionchange" && (sd.has(n) || fa(n, !1, e), fa(n, !0, e));
      }));
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Fr] || ((t[Fr] = !0), fa("selectionchange", !1, t));
  }
}
function n2(e, t, n, r) {
  switch (B1(t)) {
    case 1:
      var o = ku;
      break;
    case 4:
      o = Su;
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
function ha(e, t, n, r, o) {
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
  T1(function () {
    var u = a,
      v = Ri(n),
      h = [];
    e: {
      var f = e2.get(e);
      if (f !== void 0) {
        var m = Hi,
          S = e;
        switch (e) {
          case "keypress":
            if (no(n) === 0) break e;
          case "keydown":
          case "keyup":
            m = Ou;
            break;
          case "focusin":
            ((S = "focus"), (m = la));
            break;
          case "focusout":
            ((S = "blur"), (m = la));
            break;
          case "beforeblur":
          case "afterblur":
            m = la;
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
            m = Hl;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            m = ju;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            m = $u;
            break;
          case Z1:
          case X1:
          case J1:
            m = Nu;
            break;
          case q1:
            m = Vu;
            break;
          case "scroll":
            m = Cu;
            break;
          case "wheel":
            m = Uu;
            break;
          case "copy":
          case "cut":
          case "paste":
            m = Au;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            m = Wl;
        }
        var b = (t & 4) !== 0,
          T = !b && e === "scroll",
          d = b ? (f !== null ? f + "Capture" : null) : f;
        b = [];
        for (var p = u, y; p !== null;) {
          y = p;
          var w = y.stateNode;
          if (
            (y.tag === 5 &&
              w !== null &&
              ((y = w),
              d !== null && ((w = cr(p, d)), w != null && b.push(vr(p, w, y)))),
            T)
          )
            break;
          p = p.return;
        }
        0 < b.length &&
          ((f = new m(f, S, null, n, v)), h.push({ event: f, listeners: b }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((f = e === "mouseover" || e === "pointerover"),
          (m = e === "mouseout" || e === "pointerout"),
          f &&
            n !== $a &&
            (S = n.relatedTarget || n.fromElement) &&
            (Wt(S) || S[gt]))
        )
          break e;
        if (
          (m || f) &&
          ((f =
            v.window === v
              ? v
              : (f = v.ownerDocument)
                ? f.defaultView || f.parentWindow
                : window),
          m
            ? ((S = n.relatedTarget || n.toElement),
              (m = u),
              (S = S ? Wt(S) : null),
              S !== null &&
                ((T = tn(S)), S !== T || (S.tag !== 5 && S.tag !== 6)) &&
                (S = null))
            : ((m = null), (S = u)),
          m !== S)
        ) {
          if (
            ((b = Hl),
            (w = "onMouseLeave"),
            (d = "onMouseEnter"),
            (p = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((b = Wl),
              (w = "onPointerLeave"),
              (d = "onPointerEnter"),
              (p = "pointer")),
            (T = m == null ? f : dn(m)),
            (y = S == null ? f : dn(S)),
            (f = new b(w, p + "leave", m, n, v)),
            (f.target = T),
            (f.relatedTarget = y),
            (w = null),
            Wt(v) === u &&
              ((b = new b(d, p + "enter", S, n, v)),
              (b.target = y),
              (b.relatedTarget = T),
              (w = b)),
            (T = w),
            m && S)
          )
            t: {
              for (b = m, d = S, p = 0, y = b; y; y = nn(y)) p++;
              for (y = 0, w = d; w; w = nn(w)) y++;
              for (; 0 < p - y;) ((b = nn(b)), p--);
              for (; 0 < y - p;) ((d = nn(d)), y--);
              for (; p--;) {
                if (b === d || (d !== null && b === d.alternate)) break t;
                ((b = nn(b)), (d = nn(d)));
              }
              b = null;
            }
          else b = null;
          (m !== null && ts(h, f, m, b, !1),
            S !== null && T !== null && ts(h, T, S, b, !0));
        }
      }
      e: {
        if (
          ((f = u ? dn(u) : window),
          (m = f.nodeName && f.nodeName.toLowerCase()),
          m === "select" || (m === "input" && f.type === "file"))
        )
          var C = Ju;
        else if (Ql(f))
          if (U1) C = nd;
          else {
            C = ed;
            var j = qu;
          }
        else
          (m = f.nodeName) &&
            m.toLowerCase() === "input" &&
            (f.type === "checkbox" || f.type === "radio") &&
            (C = td);
        if (C && (C = C(e, u))) {
          W1(h, C, n, v);
          break e;
        }
        (j && j(e, f, u),
          e === "focusout" &&
            (j = f._wrapperState) &&
            j.controlled &&
            f.type === "number" &&
            Ra(f, "number", f.value));
      }
      switch (((j = u ? dn(u) : window), e)) {
        case "focusin":
          (Ql(j) || j.contentEditable === "true") &&
            ((cn = j), (Ya = u), (nr = null));
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
          ((Ka = !1), Jl(h, n, v));
          break;
        case "selectionchange":
          if (ad) break;
        case "keydown":
        case "keyup":
          Jl(h, n, v);
      }
      var z;
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
          ? H1(e, n) && (k = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (k = "onCompositionStart");
      (k &&
        ($1 &&
          n.locale !== "ko" &&
          (sn || k !== "onCompositionStart"
            ? k === "onCompositionEnd" && sn && (z = F1())
            : ((jt = v),
              ($i = "value" in jt ? jt.value : jt.textContent),
              (sn = !0))),
        (j = wo(u, k)),
        0 < j.length &&
          ((k = new Vl(k, e, null, n, v)),
          h.push({ event: k, listeners: j }),
          z ? (k.data = z) : ((z = V1(n)), z !== null && (k.data = z)))),
        (z = Qu ? Yu(e, n) : Ku(e, n)) &&
          ((u = wo(u, "onBeforeInput")),
          0 < u.length &&
            ((v = new Vl("onBeforeInput", "beforeinput", null, n, v)),
            h.push({ event: v, listeners: u }),
            (v.data = z))));
    }
    t2(h, t);
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
var cd = /\r\n?/g,
  ud = /\u0000|\uFFFD/g;
function ns(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      cd,
      `
`
    )
    .replace(ud, "");
}
function $r(e, t, n) {
  if (((t = ns(t)), ns(e) !== t && n)) throw Error(M(425));
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
  dd = typeof clearTimeout == "function" ? clearTimeout : void 0,
  rs = typeof Promise == "function" ? Promise : void 0,
  pd =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof rs < "u"
        ? function (e) {
            return rs.resolve(null).then(e).catch(fd);
          }
        : qa;
function fd(e) {
  setTimeout(function () {
    throw e;
  });
}
function ma(e, t) {
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
  hd = "__reactListeners$" + Dn,
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
function Nr(e) {
  return (
    (e = e[it] || e[gt]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function dn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(M(33));
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
function jn(e, t) {
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
  if (Ce.current !== _t) throw Error(M(168));
  (q(Ce, t), q(Le, n));
}
function r2(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
    return n;
  r = r.getChildContext();
  for (var o in r) if (!(o in t)) throw Error(M(108, qc(e) || "Unknown", o));
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
  if (!r) throw Error(M(169));
  (n
    ? ((e = r2(e, t, Kt)),
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
function o2(e) {
  dt === null ? (dt = [e]) : dt.push(e);
}
function vd(e) {
  ((Ho = !0), o2(e));
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
      throw (dt !== null && (dt = dt.slice(e + 1)), N1(_i, Ft), o);
    } finally {
      ((J = t), (va = !1));
    }
  }
  return null;
}
var fn = [],
  hn = 0,
  So = null,
  Co = 0,
  $e = [],
  He = 0,
  Zt = null,
  ft = 1,
  ht = "";
function Ht(e, t) {
  ((fn[hn++] = Co), (fn[hn++] = So), (So = e), (Co = t));
}
function a2(e, t, n) {
  (($e[He++] = ft), ($e[He++] = ht), ($e[He++] = Zt), (Zt = e));
  var r = ft;
  e = ht;
  var o = 32 - et(r) - 1;
  ((r &= ~(1 << o)), (n += 1));
  var a = 32 - et(t) + o;
  if (30 < a) {
    var i = o - (o % 5);
    ((a = (r & ((1 << i) - 1)).toString(32)),
      (r >>= i),
      (o -= i),
      (ft = (1 << (32 - et(t) + o)) | (n << o) | r),
      (ht = a + e));
  } else ((ft = (1 << a) | (n << o) | r), (ht = e));
}
function Gi(e) {
  e.return !== null && (Ht(e, 1), a2(e, 1, 0));
}
function Qi(e) {
  for (; e === So;)
    ((So = fn[--hn]), (fn[hn] = null), (Co = fn[--hn]), (fn[hn] = null));
  for (; e === Zt;)
    ((Zt = $e[--He]),
      ($e[He] = null),
      (ht = $e[--He]),
      ($e[He] = null),
      (ft = $e[--He]),
      ($e[He] = null));
}
var _e = null,
  Re = null,
  re = !1,
  qe = null;
function i2(e, t) {
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
          ? ((n = Zt !== null ? { id: ft, overflow: ht } : null),
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
        if (ni(e)) throw Error(M(418));
        t = At(n.nextSibling);
        var r = _e;
        t && ls(e, t)
          ? i2(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (re = !1), (_e = e));
      }
    } else {
      if (ni(e)) throw Error(M(418));
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
    if (ni(e)) throw (l2(), Error(M(418)));
    for (; t;) (i2(e, t), (t = At(t.nextSibling)));
  }
  if ((ss(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(M(317));
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
function l2() {
  for (var e = Re; e;) e = At(e.nextSibling);
}
function zn() {
  ((Re = _e = null), (re = !1));
}
function Yi(e) {
  qe === null ? (qe = [e]) : qe.push(e);
}
var gd = xt.ReactCurrentBatchConfig;
function $n(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(M(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(M(147, e));
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
    if (typeof e != "string") throw Error(M(284));
    if (!n._owner) throw Error(M(290, e));
  }
  return e;
}
function Vr(e, t) {
  throw (
    (e = Object.prototype.toString.call(t)),
    Error(
      M(
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
function s2(e) {
  function t(d, p) {
    if (e) {
      var y = d.deletions;
      y === null ? ((d.deletions = [p]), (d.flags |= 16)) : y.push(p);
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
  function a(d, p, y) {
    return (
      (d.index = y),
      e
        ? ((y = d.alternate),
          y !== null
            ? ((y = y.index), y < p ? ((d.flags |= 2), p) : y)
            : ((d.flags |= 2), p))
        : ((d.flags |= 1048576), p)
    );
  }
  function i(d) {
    return (e && d.alternate === null && (d.flags |= 2), d);
  }
  function s(d, p, y, w) {
    return p === null || p.tag !== 6
      ? ((p = Sa(y, d.mode, w)), (p.return = d), p)
      : ((p = o(p, y)), (p.return = d), p);
  }
  function c(d, p, y, w) {
    var C = y.type;
    return C === ln
      ? v(d, p, y.props.children, w, y.key)
      : p !== null &&
          (p.elementType === C ||
            (typeof C == "object" &&
              C !== null &&
              C.$$typeof === kt &&
              cs(C) === p.type))
        ? ((w = o(p, y.props)), (w.ref = $n(d, p, y)), (w.return = d), w)
        : ((w = co(y.type, y.key, y.props, null, d.mode, w)),
          (w.ref = $n(d, p, y)),
          (w.return = d),
          w);
  }
  function u(d, p, y, w) {
    return p === null ||
      p.tag !== 4 ||
      p.stateNode.containerInfo !== y.containerInfo ||
      p.stateNode.implementation !== y.implementation
      ? ((p = Ca(y, d.mode, w)), (p.return = d), p)
      : ((p = o(p, y.children || [])), (p.return = d), p);
  }
  function v(d, p, y, w, C) {
    return p === null || p.tag !== 7
      ? ((p = Yt(y, d.mode, w, C)), (p.return = d), p)
      : ((p = o(p, y)), (p.return = d), p);
  }
  function h(d, p, y) {
    if ((typeof p == "string" && p !== "") || typeof p == "number")
      return ((p = Sa("" + p, d.mode, y)), (p.return = d), p);
    if (typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case Lr:
          return (
            (y = co(p.type, p.key, p.props, null, d.mode, y)),
            (y.ref = $n(d, null, p)),
            (y.return = d),
            y
          );
        case an:
          return ((p = Ca(p, d.mode, y)), (p.return = d), p);
        case kt:
          var w = p._init;
          return h(d, w(p._payload), y);
      }
      if (Kn(p) || Rn(p))
        return ((p = Yt(p, d.mode, y, null)), (p.return = d), p);
      Vr(d, p);
    }
    return null;
  }
  function f(d, p, y, w) {
    var C = p !== null ? p.key : null;
    if ((typeof y == "string" && y !== "") || typeof y == "number")
      return C !== null ? null : s(d, p, "" + y, w);
    if (typeof y == "object" && y !== null) {
      switch (y.$$typeof) {
        case Lr:
          return y.key === C ? c(d, p, y, w) : null;
        case an:
          return y.key === C ? u(d, p, y, w) : null;
        case kt:
          return ((C = y._init), f(d, p, C(y._payload), w));
      }
      if (Kn(y) || Rn(y)) return C !== null ? null : v(d, p, y, w, null);
      Vr(d, y);
    }
    return null;
  }
  function m(d, p, y, w, C) {
    if ((typeof w == "string" && w !== "") || typeof w == "number")
      return ((d = d.get(y) || null), s(p, d, "" + w, C));
    if (typeof w == "object" && w !== null) {
      switch (w.$$typeof) {
        case Lr:
          return (
            (d = d.get(w.key === null ? y : w.key) || null),
            c(p, d, w, C)
          );
        case an:
          return (
            (d = d.get(w.key === null ? y : w.key) || null),
            u(p, d, w, C)
          );
        case kt:
          var j = w._init;
          return m(d, p, y, j(w._payload), C);
      }
      if (Kn(w) || Rn(w)) return ((d = d.get(y) || null), v(p, d, w, C, null));
      Vr(p, w);
    }
    return null;
  }
  function S(d, p, y, w) {
    for (
      var C = null, j = null, z = p, k = (p = 0), L = null;
      z !== null && k < y.length;
      k++
    ) {
      z.index > k ? ((L = z), (z = null)) : (L = z.sibling);
      var E = f(d, z, y[k], w);
      if (E === null) {
        z === null && (z = L);
        break;
      }
      (e && z && E.alternate === null && t(d, z),
        (p = a(E, p, k)),
        j === null ? (C = E) : (j.sibling = E),
        (j = E),
        (z = L));
    }
    if (k === y.length) return (n(d, z), re && Ht(d, k), C);
    if (z === null) {
      for (; k < y.length; k++)
        ((z = h(d, y[k], w)),
          z !== null &&
            ((p = a(z, p, k)),
            j === null ? (C = z) : (j.sibling = z),
            (j = z)));
      return (re && Ht(d, k), C);
    }
    for (z = r(d, z); k < y.length; k++)
      ((L = m(z, d, k, y[k], w)),
        L !== null &&
          (e && L.alternate !== null && z.delete(L.key === null ? k : L.key),
          (p = a(L, p, k)),
          j === null ? (C = L) : (j.sibling = L),
          (j = L)));
    return (
      e &&
        z.forEach(function (P) {
          return t(d, P);
        }),
      re && Ht(d, k),
      C
    );
  }
  function b(d, p, y, w) {
    var C = Rn(y);
    if (typeof C != "function") throw Error(M(150));
    if (((y = C.call(y)), y == null)) throw Error(M(151));
    for (
      var j = (C = null), z = p, k = (p = 0), L = null, E = y.next();
      z !== null && !E.done;
      k++, E = y.next()
    ) {
      z.index > k ? ((L = z), (z = null)) : (L = z.sibling);
      var P = f(d, z, E.value, w);
      if (P === null) {
        z === null && (z = L);
        break;
      }
      (e && z && P.alternate === null && t(d, z),
        (p = a(P, p, k)),
        j === null ? (C = P) : (j.sibling = P),
        (j = P),
        (z = L));
    }
    if (E.done) return (n(d, z), re && Ht(d, k), C);
    if (z === null) {
      for (; !E.done; k++, E = y.next())
        ((E = h(d, E.value, w)),
          E !== null &&
            ((p = a(E, p, k)),
            j === null ? (C = E) : (j.sibling = E),
            (j = E)));
      return (re && Ht(d, k), C);
    }
    for (z = r(d, z); !E.done; k++, E = y.next())
      ((E = m(z, d, k, E.value, w)),
        E !== null &&
          (e && E.alternate !== null && z.delete(E.key === null ? k : E.key),
          (p = a(E, p, k)),
          j === null ? (C = E) : (j.sibling = E),
          (j = E)));
    return (
      e &&
        z.forEach(function (I) {
          return t(d, I);
        }),
      re && Ht(d, k),
      C
    );
  }
  function T(d, p, y, w) {
    if (
      (typeof y == "object" &&
        y !== null &&
        y.type === ln &&
        y.key === null &&
        (y = y.props.children),
      typeof y == "object" && y !== null)
    ) {
      switch (y.$$typeof) {
        case Lr:
          e: {
            for (var C = y.key, j = p; j !== null;) {
              if (j.key === C) {
                if (((C = y.type), C === ln)) {
                  if (j.tag === 7) {
                    (n(d, j.sibling),
                      (p = o(j, y.props.children)),
                      (p.return = d),
                      (d = p));
                    break e;
                  }
                } else if (
                  j.elementType === C ||
                  (typeof C == "object" &&
                    C !== null &&
                    C.$$typeof === kt &&
                    cs(C) === j.type)
                ) {
                  (n(d, j.sibling),
                    (p = o(j, y.props)),
                    (p.ref = $n(d, j, y)),
                    (p.return = d),
                    (d = p));
                  break e;
                }
                n(d, j);
                break;
              } else t(d, j);
              j = j.sibling;
            }
            y.type === ln
              ? ((p = Yt(y.props.children, d.mode, w, y.key)),
                (p.return = d),
                (d = p))
              : ((w = co(y.type, y.key, y.props, null, d.mode, w)),
                (w.ref = $n(d, p, y)),
                (w.return = d),
                (d = w));
          }
          return i(d);
        case an:
          e: {
            for (j = y.key; p !== null;) {
              if (p.key === j)
                if (
                  p.tag === 4 &&
                  p.stateNode.containerInfo === y.containerInfo &&
                  p.stateNode.implementation === y.implementation
                ) {
                  (n(d, p.sibling),
                    (p = o(p, y.children || [])),
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
            ((p = Ca(y, d.mode, w)), (p.return = d), (d = p));
          }
          return i(d);
        case kt:
          return ((j = y._init), T(d, p, j(y._payload), w));
      }
      if (Kn(y)) return S(d, p, y, w);
      if (Rn(y)) return b(d, p, y, w);
      Vr(d, y);
    }
    return (typeof y == "string" && y !== "") || typeof y == "number"
      ? ((y = "" + y),
        p !== null && p.tag === 6
          ? (n(d, p.sibling), (p = o(p, y)), (p.return = d), (d = p))
          : (n(d, p), (p = Sa(y, d.mode, w)), (p.return = d), (d = p)),
        i(d))
      : n(d, p);
  }
  return T;
}
var En = s2(!0),
  c2 = s2(!1),
  To = Bt(null),
  jo = null,
  mn = null,
  Ki = null;
function Zi() {
  Ki = mn = jo = null;
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
  ((jo = e),
    (Ki = mn = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (Ae = !0), (e.firstContext = null)));
}
function Ue(e) {
  var t = e._currentValue;
  if (Ki !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), mn === null)) {
      if (jo === null) throw Error(M(308));
      ((mn = e), (jo.dependencies = { lanes: 0, firstContext: e }));
    } else mn = mn.next = e;
  return t;
}
var Ut = null;
function Ji(e) {
  Ut === null ? (Ut = [e]) : Ut.push(e);
}
function u2(e, t, n, r) {
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
function d2(e, t) {
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
function zo(e, t, n, r) {
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
    var h = o.baseState;
    ((i = 0), (v = u = c = null), (s = a));
    do {
      var f = s.lane,
        m = s.eventTime;
      if ((r & f) === f) {
        v !== null &&
          (v = v.next =
            {
              eventTime: m,
              lane: 0,
              tag: s.tag,
              payload: s.payload,
              callback: s.callback,
              next: null,
            });
        e: {
          var S = e,
            b = s;
          switch (((f = t), (m = n), b.tag)) {
            case 1:
              if (((S = b.payload), typeof S == "function")) {
                h = S.call(m, h, f);
                break e;
              }
              h = S;
              break e;
            case 3:
              S.flags = (S.flags & -65537) | 128;
            case 0:
              if (
                ((S = b.payload),
                (f = typeof S == "function" ? S.call(m, h, f) : S),
                f == null)
              )
                break e;
              h = ie({}, h, f);
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
        ((m = {
          eventTime: m,
          lane: f,
          tag: s.tag,
          payload: s.payload,
          callback: s.callback,
          next: null,
        }),
          v === null ? ((u = v = m), (c = h)) : (v = v.next = m),
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
      (v === null && (c = h),
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
    ((Jt |= i), (e.lanes = i), (e.memoizedState = h));
  }
}
function ds(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        o = r.callback;
      if (o !== null) {
        if (((r.callback = null), (r = n), typeof o != "function"))
          throw Error(M(191, o));
        o.call(r);
      }
    }
}
var Mr = {},
  st = Bt(Mr),
  yr = Bt(Mr),
  wr = Bt(Mr);
function Gt(e) {
  if (e === Mr) throw Error(M(174));
  return e;
}
function el(e, t) {
  switch ((q(wr, t), q(yr, e), q(st, Mr), (e = t.nodeType), e)) {
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
function Nn() {
  (ne(st), ne(yr), ne(wr));
}
function p2(e) {
  Gt(wr.current);
  var t = Gt(st.current),
    n = Oa(t, e.type);
  t !== n && (q(yr, e), q(st, n));
}
function tl(e) {
  yr.current === e && (ne(st), ne(yr));
}
var oe = Bt(0);
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
  me = null,
  No = !1,
  rr = !1,
  xr = 0,
  yd = 0;
function be() {
  throw Error(M(321));
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
    (oo.current = e === null || e.memoizedState === null ? kd : Sd),
    (e = n(r, o)),
    rr)
  ) {
    a = 0;
    do {
      if (((rr = !1), (xr = 0), 25 <= a)) throw Error(M(301));
      ((a += 1),
        (me = fe = null),
        (t.updateQueue = null),
        (oo.current = Cd),
        (e = n(r, o)));
    } while (rr);
  }
  if (
    ((oo.current = Mo),
    (t = fe !== null && fe.next !== null),
    (Xt = 0),
    (me = fe = ae = null),
    (No = !1),
    t)
  )
    throw Error(M(300));
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
  return (me === null ? (ae.memoizedState = me = e) : (me = me.next = e), me);
}
function Ge() {
  if (fe === null) {
    var e = ae.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = fe.next;
  var t = me === null ? ae.memoizedState : me.next;
  if (t !== null) ((me = t), (fe = e));
  else {
    if (e === null) throw Error(M(310));
    ((fe = e),
      (e = {
        memoizedState: fe.memoizedState,
        baseState: fe.baseState,
        baseQueue: fe.baseQueue,
        queue: fe.queue,
        next: null,
      }),
      me === null ? (ae.memoizedState = me = e) : (me = me.next = e));
  }
  return me;
}
function br(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function wa(e) {
  var t = Ge(),
    n = t.queue;
  if (n === null) throw Error(M(311));
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
        var h = {
          lane: v,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null,
        };
        (c === null ? ((s = c = h), (i = r)) : (c = c.next = h),
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
  if (n === null) throw Error(M(311));
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
function f2() {}
function h2(e, t) {
  var n = ae,
    r = Ge(),
    o = t(),
    a = !nt(r.memoizedState, o);
  if (
    (a && ((r.memoizedState = o), (Ae = !0)),
    (r = r.queue),
    il(g2.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || a || (me !== null && me.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      kr(9, v2.bind(null, n, r, o, t), void 0, null),
      ve === null)
    )
      throw Error(M(349));
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
function v2(e, t, n, r) {
  ((t.value = n), (t.getSnapshot = r), y2(t) && w2(e));
}
function g2(e, t, n) {
  return n(function () {
    y2(t) && w2(e);
  });
}
function y2(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !nt(e, n);
  } catch {
    return !0;
  }
}
function w2(e) {
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
    (e = e.dispatch = bd.bind(null, ae, e)),
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
function x2() {
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
function b2(e, t) {
  return Vo(4, 2, e, t);
}
function k2(e, t) {
  return Vo(4, 4, e, t);
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
function C2(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null),
    Vo(4, 4, S2.bind(null, t, e), n)
  );
}
function ll() {}
function T2(e, t) {
  var n = Ge();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && rl(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function j2(e, t) {
  var n = Ge();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && rl(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function z2(e, t, n) {
  return Xt & 21
    ? (nt(n, t) || ((n = L1()), (ae.lanes |= n), (Jt |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (Ae = !0)), (e.memoizedState = n));
}
function wd(e, t) {
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
function E2() {
  return Ge().memoizedState;
}
function xd(e, t, n) {
  var r = Dt(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    N2(e))
  )
    M2(t, n);
  else if (((n = u2(e, t, n, r)), n !== null)) {
    var o = je();
    (tt(n, e, r, o), A2(n, t, r));
  }
}
function bd(e, t, n) {
  var r = Dt(e),
    o = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (N2(e)) M2(t, o);
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
    ((n = u2(e, t, o, r)),
      n !== null && ((o = je()), tt(n, e, r, o), A2(n, t, r)));
  }
}
function N2(e) {
  var t = e.alternate;
  return e === ae || (t !== null && t === ae);
}
function M2(e, t) {
  rr = No = !0;
  var n = e.pending;
  (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t));
}
function A2(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    ((r &= e.pendingLanes), (n |= r), (t.lanes = n), Oi(e, n));
  }
}
var Mo = {
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
  kd = {
    readContext: Ue,
    useCallback: function (e, t) {
      return ((at().memoizedState = [e, t === void 0 ? null : t]), e);
    },
    useContext: Ue,
    useEffect: fs,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        ao(4194308, 4, S2.bind(null, t, e), n)
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
        (e = e.dispatch = xd.bind(null, ae, e)),
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
      return ((e = wd.bind(null, e[1])), (at().memoizedState = e), [t, e]);
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = ae,
        o = at();
      if (re) {
        if (n === void 0) throw Error(M(407));
        n = n();
      } else {
        if (((n = t()), ve === null)) throw Error(M(349));
        Xt & 30 || m2(r, t, n);
      }
      o.memoizedState = n;
      var a = { value: n, getSnapshot: t };
      return (
        (o.queue = a),
        fs(g2.bind(null, r, a, e), [e]),
        (r.flags |= 2048),
        kr(9, v2.bind(null, r, a, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = at(),
        t = ve.identifierPrefix;
      if (re) {
        var n = ht,
          r = ft;
        ((n = (r & ~(1 << (32 - et(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = xr++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":"));
      } else ((n = yd++), (t = ":" + t + "r" + n.toString(32) + ":"));
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  Sd = {
    readContext: Ue,
    useCallback: T2,
    useContext: Ue,
    useEffect: il,
    useImperativeHandle: C2,
    useInsertionEffect: b2,
    useLayoutEffect: k2,
    useMemo: j2,
    useReducer: wa,
    useRef: x2,
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
    useMutableSource: f2,
    useSyncExternalStore: h2,
    useId: E2,
    unstable_isNewReconciler: !1,
  },
  Cd = {
    readContext: Ue,
    useCallback: T2,
    useContext: Ue,
    useEffect: il,
    useImperativeHandle: C2,
    useInsertionEffect: b2,
    useLayoutEffect: k2,
    useMemo: j2,
    useReducer: xa,
    useRef: x2,
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
    useMutableSource: f2,
    useSyncExternalStore: h2,
    useId: E2,
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
    var r = je(),
      o = Dt(e),
      a = mt(r, o);
    ((a.payload = t),
      n != null && (a.callback = n),
      (t = Lt(e, a, o)),
      t !== null && (tt(t, e, o, r), ro(t, e, o)));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = je(),
      o = Dt(e),
      a = mt(r, o);
    ((a.tag = 1),
      (a.payload = t),
      n != null && (a.callback = n),
      (t = Lt(e, a, o)),
      t !== null && (tt(t, e, o, r), ro(t, e, o)));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = je(),
      r = Dt(e),
      o = mt(n, r);
    ((o.tag = 2),
      t != null && (o.callback = t),
      (t = Lt(e, o, r)),
      t !== null && (tt(t, e, r, n), ro(t, e, r)));
  },
};
function hs(e, t, n, r, o, a, i) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, a, i)
      : t.prototype && t.prototype.isPureReactComponent
        ? !hr(n, r) || !hr(o, a)
        : !0
  );
}
function L2(e, t, n) {
  var r = !1,
    o = _t,
    a = t.contextType;
  return (
    typeof a == "object" && a !== null
      ? (a = Ue(a))
      : ((o = Ie(t) ? Kt : Ce.current),
        (r = t.contextTypes),
        (a = (r = r != null) ? jn(e, o) : _t)),
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
function ms(e, t, n, r) {
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
    : ((a = Ie(t) ? Kt : Ce.current), (o.context = jn(e, a))),
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
      zo(e, n, o, r),
      (o.state = e.memoizedState)),
    typeof o.componentDidMount == "function" && (e.flags |= 4194308));
}
function Mn(e, t) {
  try {
    var n = "",
      r = t;
    do ((n += Jc(r)), (r = r.return));
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
var Td = typeof WeakMap == "function" ? WeakMap : Map;
function I2(e, t, n) {
  ((n = mt(-1, n)), (n.tag = 3), (n.payload = { element: null }));
  var r = t.value;
  return (
    (n.callback = function () {
      (Lo || ((Lo = !0), (gi = r)), li(e, t));
    }),
    n
  );
}
function D2(e, t, n) {
  ((n = mt(-1, n)), (n.tag = 3));
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
    r = e.pingCache = new Td();
    var o = new Set();
    r.set(t, o);
  } else ((o = r.get(t)), o === void 0 && ((o = new Set()), r.set(t, o)));
  o.has(n) || (o.add(n), (e = Bd.bind(null, e, t, n)), t.then(e, e));
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
              : ((t = mt(-1, 1)), (t.tag = 2), Lt(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var jd = xt.ReactCurrentOwner,
  Ae = !1;
function Te(e, t, n, r) {
  t.child = e === null ? c2(t, null, n, r) : En(t, e.child, n, r);
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
      !ml(a) &&
      a.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = a), P2(e, t, a, r, o))
      : ((e = co(n.type, null, r, t, t.mode, o)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((a = e.child), !(e.lanes & o))) {
    var i = a.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : hr), n(i, r) && e.ref === t.ref)
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
function P2(e, t, n, r, o) {
  if (e !== null) {
    var a = e.memoizedProps;
    if (hr(a, r) && e.ref === t.ref)
      if (((Ae = !1), (t.pendingProps = r = a), (e.lanes & o) !== 0))
        e.flags & 131072 && (Ae = !0);
      else return ((t.lanes = e.lanes), wt(e, t, o));
  }
  return si(e, t, n, r, o);
}
function R2(e, t, n) {
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
function _2(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function si(e, t, n, r, o) {
  var a = Ie(n) ? Kt : Ce.current;
  return (
    (a = jn(t, a)),
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
    (io(e, t), L2(t, n, r), ii(t, n, r, o), (r = !0));
  else if (e === null) {
    var i = t.stateNode,
      s = t.memoizedProps;
    i.props = s;
    var c = i.context,
      u = n.contextType;
    typeof u == "object" && u !== null
      ? (u = Ue(u))
      : ((u = Ie(n) ? Kt : Ce.current), (u = jn(t, u)));
    var v = n.getDerivedStateFromProps,
      h =
        typeof v == "function" ||
        typeof i.getSnapshotBeforeUpdate == "function";
    (h ||
      (typeof i.UNSAFE_componentWillReceiveProps != "function" &&
        typeof i.componentWillReceiveProps != "function") ||
      ((s !== r || c !== u) && ms(t, i, r, u)),
      (St = !1));
    var f = t.memoizedState;
    ((i.state = f),
      zo(t, r, i, o),
      (c = t.memoizedState),
      s !== r || f !== c || Le.current || St
        ? (typeof v == "function" && (ai(t, n, v, r), (c = t.memoizedState)),
          (s = St || hs(t, n, s, r, f, c, u))
            ? (h ||
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
      d2(e, t),
      (s = t.memoizedProps),
      (u = t.type === t.elementType ? s : Xe(t.type, s)),
      (i.props = u),
      (h = t.pendingProps),
      (f = i.context),
      (c = n.contextType),
      typeof c == "object" && c !== null
        ? (c = Ue(c))
        : ((c = Ie(n) ? Kt : Ce.current), (c = jn(t, c))));
    var m = n.getDerivedStateFromProps;
    ((v =
      typeof m == "function" ||
      typeof i.getSnapshotBeforeUpdate == "function") ||
      (typeof i.UNSAFE_componentWillReceiveProps != "function" &&
        typeof i.componentWillReceiveProps != "function") ||
      ((s !== h || f !== c) && ms(t, i, r, c)),
      (St = !1),
      (f = t.memoizedState),
      (i.state = f),
      zo(t, r, i, o));
    var S = t.memoizedState;
    s !== h || f !== S || Le.current || St
      ? (typeof m == "function" && (ai(t, n, m, r), (S = t.memoizedState)),
        (u = St || hs(t, n, u, r, f, S, c) || !1)
          ? (v ||
              (typeof i.UNSAFE_componentWillUpdate != "function" &&
                typeof i.componentWillUpdate != "function") ||
              (typeof i.componentWillUpdate == "function" &&
                i.componentWillUpdate(r, S, c),
              typeof i.UNSAFE_componentWillUpdate == "function" &&
                i.UNSAFE_componentWillUpdate(r, S, c)),
            typeof i.componentDidUpdate == "function" && (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof i.componentDidUpdate != "function" ||
              (s === e.memoizedProps && f === e.memoizedState) ||
              (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate != "function" ||
              (s === e.memoizedProps && f === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = S)),
        (i.props = r),
        (i.state = S),
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
  _2(e, t);
  var i = (t.flags & 128) !== 0;
  if (!r && !i) return (o && is(t, n, !1), wt(e, t, a));
  ((r = t.stateNode), (jd.current = t));
  var s =
    i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && i
      ? ((t.child = En(t, e.child, null, a)), (t.child = En(t, null, s, a)))
      : Te(e, t, s, a),
    (t.memoizedState = r.state),
    o && is(t, n, !0),
    t.child
  );
}
function O2(e) {
  var t = e.stateNode;
  (t.pendingContext
    ? as(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && as(e, t.context, !1),
    el(e, t.containerInfo));
}
function ks(e, t, n, r, o) {
  return (zn(), Yi(o), (t.flags |= 256), Te(e, t, n, r), t.child);
}
var ui = { dehydrated: null, treeContext: null, retryLane: 0 };
function di(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function B2(e, t, n) {
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
    En(t, e.child, null, n),
    (e = sl(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function zd(e, t, n, r, o, a, i) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = ba(Error(M(422)))), Wr(e, t, i, r))
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
          t.mode & 1 && En(t, e.child, null, i),
          (t.child.memoizedState = di(i)),
          (t.memoizedState = ui),
          a);
  if (!(t.mode & 1)) return Wr(e, t, i, null);
  if (o.data === "$!") {
    if (((r = o.nextSibling && o.nextSibling.dataset), r)) var s = r.dgst;
    return (
      (r = s),
      (a = Error(M(419))),
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
    return (hl(), (r = ba(Error(M(421)))), Wr(e, t, i, r));
  }
  return o.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = Fd.bind(null, e)),
      (o._reactRetry = t),
      null)
    : ((e = a.treeContext),
      (Re = At(o.nextSibling)),
      (_e = t),
      (re = !0),
      (qe = null),
      e !== null &&
        (($e[He++] = ft),
        ($e[He++] = ht),
        ($e[He++] = Zt),
        (ft = e.id),
        (ht = e.overflow),
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
function F2(e, t, n) {
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
            e !== null && Eo(e) === null && (o = n),
            (n = n.sibling));
        ((n = o),
          n === null
            ? ((o = t.child), (t.child = null))
            : ((o = n.sibling), (n.sibling = null)),
          ka(t, !1, o, n, a));
        break;
      case "backwards":
        for (n = null, o = t.child, t.child = null; o !== null;) {
          if (((e = o.alternate), e !== null && Eo(e) === null)) {
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
  if (e !== null && t.child !== e.child) throw Error(M(153));
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
function Ed(e, t, n) {
  switch (t.tag) {
    case 3:
      (O2(t), zn());
      break;
    case 5:
      p2(t);
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
            ? B2(e, t, n)
            : (q(oe, oe.current & 1),
              (e = wt(e, t, n)),
              e !== null ? e.sibling : null);
      q(oe, oe.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return F2(e, t, n);
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
      return ((t.lanes = 0), R2(e, t, n));
  }
  return wt(e, t, n);
}
var $2, pi, H2, V2;
$2 = function (e, t) {
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
H2 = function (e, t, n, r) {
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
V2 = function (e, t, n, r) {
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
function Nd(e, t, n) {
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
        Nn(),
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
        (H2(e, t, n, r, o),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152)));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(M(166));
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
            e === "http://www.w3.org/1999/xhtml" && (e = g1(n)),
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
            $2(e, t, !1, !1),
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
                  ? x1(e, c)
                  : a === "dangerouslySetInnerHTML"
                    ? ((c = c ? c.__html : void 0), c != null && y1(e, c))
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
      if (e && t.stateNode != null) V2(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(M(166));
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
          (l2(), zn(), (t.flags |= 98560), (a = !1));
        else if (((a = Hr(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!a) throw Error(M(318));
            if (
              ((a = t.memoizedState),
              (a = a !== null ? a.dehydrated : null),
              !a)
            )
              throw Error(M(317));
            a[it] = t;
          } else
            (zn(),
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
              (e === null || oe.current & 1 ? he === 0 && (he = 3) : hl())),
          t.updateQueue !== null && (t.flags |= 4),
          ke(t),
          null);
    case 4:
      return (
        Nn(),
        pi(e, t),
        e === null && mr(t.stateNode.containerInfo),
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
          if (he !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null;) {
              if (((i = Eo(e)), i !== null)) {
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
          if (((e = Eo(i)), e !== null)) {
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
  throw Error(M(156, t.tag));
}
function Md(e, t) {
  switch ((Qi(t), t.tag)) {
    case 1:
      return (
        Ie(t.type) && bo(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        Nn(),
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
        if (t.alternate === null) throw Error(M(340));
        zn();
      }
      return (
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return (ne(oe), null);
    case 4:
      return (Nn(), null);
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
  Ad = typeof WeakSet == "function" ? WeakSet : Set,
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
function Ld(e, t) {
  if (((Za = go), (e = Y1()), Ui(e))) {
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
            h = e,
            f = null;
          t: for (;;) {
            for (
              var m;
              h !== n || (o !== 0 && h.nodeType !== 3) || (s = i + o),
                h !== a || (r !== 0 && h.nodeType !== 3) || (c = i + r),
                h.nodeType === 3 && (i += h.nodeValue.length),
                (m = h.firstChild) !== null;
            )
              ((f = h), (h = m));
            for (;;) {
              if (h === e) break t;
              if (
                (f === n && ++u === o && (s = i),
                f === a && ++v === r && (c = i),
                (m = h.nextSibling) !== null)
              )
                break;
              ((h = f), (f = h.parentNode));
            }
            h = m;
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
          var S = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (S !== null) {
                  var b = S.memoizedProps,
                    T = S.memoizedState,
                    d = t.stateNode,
                    p = d.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? b : Xe(t.type, b),
                      T
                    );
                  d.__reactInternalSnapshotBeforeUpdate = p;
                }
                break;
              case 3:
                var y = t.stateNode.containerInfo;
                y.nodeType === 1
                  ? (y.textContent = "")
                  : y.nodeType === 9 &&
                    y.documentElement &&
                    y.removeChild(y.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(M(163));
            }
        } catch (w) {
          ue(t, t.return, w);
        }
        if (((e = t.sibling), e !== null)) {
          ((e.return = t.return), (_ = e));
          break;
        }
        _ = t.return;
      }
  return ((S = Cs), (Cs = !1), S);
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
function hi(e) {
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
function W2(e) {
  var t = e.alternate;
  (t !== null && ((e.alternate = null), W2(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[it], delete t[gr], delete t[ei], delete t[hd], delete t[md])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null));
}
function U2(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Ts(e) {
  e: for (;;) {
    for (; e.sibling === null;) {
      if (e.return === null || U2(e.return)) return null;
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
function mi(e, t, n) {
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
    for (mi(e, t, n), e = e.sibling; e !== null;)
      (mi(e, t, n), (e = e.sibling));
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
  for (n = n.child; n !== null;) (G2(e, t, n), (n = n.sibling));
}
function G2(e, t, n) {
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
              ? ma(e.parentNode, n)
              : e.nodeType === 1 && ma(e, n),
            pr(e))
          : ma(ye, n.stateNode));
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
function js(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    (n === null && (n = e.stateNode = new Ad()),
      t.forEach(function (r) {
        var o = $d.bind(null, e, r);
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
        if (ye === null) throw Error(M(160));
        (G2(a, i, o), (ye = null), (Je = !1));
        var c = o.alternate;
        (c !== null && (c.return = null), (o.return = null));
      } catch (u) {
        ue(o, t, u);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null;) (Q2(t, e), (t = t.sibling));
}
function Q2(e, t) {
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
        } catch (b) {
          ue(e, e.return, b);
        }
        try {
          or(5, e, e.return);
        } catch (b) {
          ue(e, e.return, b);
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
        } catch (b) {
          ue(e, e.return, b);
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
                h = c[i + 1];
              v === "style"
                ? x1(o, h)
                : v === "dangerouslySetInnerHTML"
                  ? y1(o, h)
                  : v === "children"
                    ? sr(o, h)
                    : Li(o, v, h, u);
            }
            switch (s) {
              case "input":
                Pa(o, a);
                break;
              case "textarea":
                v1(o, a);
                break;
              case "select":
                var f = o._wrapperState.wasMultiple;
                o._wrapperState.wasMultiple = !!a.multiple;
                var m = a.value;
                m != null
                  ? yn(o, !!a.multiple, m, !1)
                  : f !== !!a.multiple &&
                    (a.defaultValue != null
                      ? yn(o, !!a.multiple, a.defaultValue, !0)
                      : yn(o, !!a.multiple, a.multiple ? [] : "", !1));
            }
            o[gr] = a;
          } catch (b) {
            ue(e, e.return, b);
          }
      }
      break;
    case 6:
      if ((Ke(t, e), ot(e), r & 4)) {
        if (e.stateNode === null) throw Error(M(162));
        ((o = e.stateNode), (a = e.memoizedProps));
        try {
          o.nodeValue = a;
        } catch (b) {
          ue(e, e.return, b);
        }
      }
      break;
    case 3:
      if (
        (Ke(t, e), ot(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          pr(t.containerInfo);
        } catch (b) {
          ue(e, e.return, b);
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
        r & 4 && js(e));
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
            for (h = _ = v; _ !== null;) {
              switch (((f = _), (m = f.child), f.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  or(4, f, f.return);
                  break;
                case 1:
                  vn(f, f.return);
                  var S = f.stateNode;
                  if (typeof S.componentWillUnmount == "function") {
                    ((r = f), (n = f.return));
                    try {
                      ((t = r),
                        (S.props = t.memoizedProps),
                        (S.state = t.memoizedState),
                        S.componentWillUnmount());
                    } catch (b) {
                      ue(r, n, b);
                    }
                  }
                  break;
                case 5:
                  vn(f, f.return);
                  break;
                case 22:
                  if (f.memoizedState !== null) {
                    Es(h);
                    continue;
                  }
              }
              m !== null ? ((m.return = f), (_ = m)) : Es(h);
            }
            v = v.sibling;
          }
        e: for (v = null, h = e; ;) {
          if (h.tag === 5) {
            if (v === null) {
              v = h;
              try {
                ((o = h.stateNode),
                  u
                    ? ((a = o.style),
                      typeof a.setProperty == "function"
                        ? a.setProperty("display", "none", "important")
                        : (a.display = "none"))
                    : ((s = h.stateNode),
                      (c = h.memoizedProps.style),
                      (i =
                        c != null && c.hasOwnProperty("display")
                          ? c.display
                          : null),
                      (s.style.display = w1("display", i))));
              } catch (b) {
                ue(e, e.return, b);
              }
            }
          } else if (h.tag === 6) {
            if (v === null)
              try {
                h.stateNode.nodeValue = u ? "" : h.memoizedProps;
              } catch (b) {
                ue(e, e.return, b);
              }
          } else if (
            ((h.tag !== 22 && h.tag !== 23) ||
              h.memoizedState === null ||
              h === e) &&
            h.child !== null
          ) {
            ((h.child.return = h), (h = h.child));
            continue;
          }
          if (h === e) break e;
          for (; h.sibling === null;) {
            if (h.return === null || h.return === e) break e;
            (v === h && (v = null), (h = h.return));
          }
          (v === h && (v = null),
            (h.sibling.return = h.return),
            (h = h.sibling));
        }
      }
      break;
    case 19:
      (Ke(t, e), ot(e), r & 4 && js(e));
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
          if (U2(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(M(160));
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
          mi(e, s, i);
          break;
        default:
          throw Error(M(161));
      }
    } catch (c) {
      ue(e, e.return, c);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Id(e, t, n) {
  ((_ = e), Y2(e));
}
function Y2(e, t, n) {
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
                ? Ns(o)
                : c !== null
                  ? ((c.return = i), (_ = c))
                  : Ns(o));
        for (; a !== null;) ((_ = a), Y2(a), (a = a.sibling));
        ((_ = o), (Ur = s), (Se = u));
      }
      zs(e);
    } else
      o.subtreeFlags & 8772 && a !== null ? ((a.return = o), (_ = a)) : zs(e);
  }
}
function zs(e) {
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
                    var h = v.dehydrated;
                    h !== null && pr(h);
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
              throw Error(M(163));
          }
        Se || (t.flags & 512 && hi(t));
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
function Es(e) {
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
function Ns(e) {
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
            hi(t);
          } catch (c) {
            ue(t, a, c);
          }
          break;
        case 5:
          var i = t.return;
          try {
            hi(t);
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
var Dd = Math.ceil,
  Ao = xt.ReactCurrentDispatcher,
  cl = xt.ReactCurrentOwner,
  We = xt.ReactCurrentBatchConfig,
  X = 0,
  ve = null,
  pe = null,
  we = 0,
  Pe = 0,
  gn = Bt(0),
  he = 0,
  Sr = null,
  Jt = 0,
  Go = 0,
  ul = 0,
  ar = null,
  Me = null,
  dl = 0,
  An = 1 / 0,
  ut = null,
  Lo = !1,
  gi = null,
  It = null,
  Gr = !1,
  zt = null,
  Io = 0,
  ir = 0,
  yi = null,
  lo = -1,
  so = 0;
function je() {
  return X & 6 ? de() : lo !== -1 ? lo : (lo = de());
}
function Dt(e) {
  return e.mode & 1
    ? X & 2 && we !== 0
      ? we & -we
      : gd.transition !== null
        ? (so === 0 && (so = L1()), so)
        : ((e = J),
          e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : B1(e.type))),
          e)
    : 1;
}
function tt(e, t, n, r) {
  if (50 < ir) throw ((ir = 0), (yi = null), Error(M(185)));
  (zr(e, n, r),
    (!(X & 2) || e !== ve) &&
      (e === ve && (!(X & 2) && (Go |= n), he === 4 && Tt(e, we)),
      De(e, r),
      n === 1 && X === 0 && !(t.mode & 1) && ((An = de() + 500), Ho && Ft())));
}
function De(e, t) {
  var n = e.callbackNode;
  gu(e, t);
  var r = vo(e, e === ve ? we : 0);
  if (r === 0)
    (n !== null && Ol(n), (e.callbackNode = null), (e.callbackPriority = 0));
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && Ol(n), t === 1))
      (e.tag === 0 ? vd(Ms.bind(null, e)) : o2(Ms.bind(null, e)),
        pd(function () {
          !(X & 6) && Ft();
        }),
        (n = null));
    else {
      switch (I1(r)) {
        case 1:
          n = _i;
          break;
        case 4:
          n = M1;
          break;
        case 16:
          n = mo;
          break;
        case 536870912:
          n = A1;
          break;
        default:
          n = mo;
      }
      n = nc(n, K2.bind(null, e));
    }
    ((e.callbackPriority = t), (e.callbackNode = n));
  }
}
function K2(e, t) {
  if (((lo = -1), (so = 0), X & 6)) throw Error(M(327));
  var n = e.callbackNode;
  if (Sn() && e.callbackNode !== n) return null;
  var r = vo(e, e === ve ? we : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = Do(e, r);
  else {
    t = r;
    var o = X;
    X |= 2;
    var a = X2();
    (ve !== e || we !== t) && ((ut = null), (An = de() + 500), Qt(e, t));
    do
      try {
        _d();
        break;
      } catch (s) {
        Z2(e, s);
      }
    while (!0);
    (Zi(),
      (Ao.current = a),
      (X = o),
      pe !== null ? (t = 0) : ((ve = null), (we = 0), (t = he)));
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
          !Pd(o) &&
          ((t = Do(e, r)),
          t === 2 && ((a = Ua(e)), a !== 0 && ((r = a), (t = wi(e, a)))),
          t === 1))
      )
        throw ((n = Sr), Qt(e, 0), Tt(e, r), De(e, de()), n);
      switch (((e.finishedWork = o), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(M(345));
        case 2:
          Vt(e, Me, ut);
          break;
        case 3:
          if (
            (Tt(e, r), (r & 130023424) === r && ((t = dl + 500 - de()), 10 < t))
          ) {
            if (vo(e, 0) !== 0) break;
            if (((o = e.suspendedLanes), (o & r) !== r)) {
              (je(), (e.pingedLanes |= e.suspendedLanes & o));
              break;
            }
            e.timeoutHandle = qa(Vt.bind(null, e, Me, ut), t);
            break;
          }
          Vt(e, Me, ut);
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
                          : 1960 * Dd(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = qa(Vt.bind(null, e, Me, ut), r);
            break;
          }
          Vt(e, Me, ut);
          break;
        case 5:
          Vt(e, Me, ut);
          break;
        default:
          throw Error(M(329));
      }
    }
  }
  return (De(e, de()), e.callbackNode === n ? K2.bind(null, e) : null);
}
function wi(e, t) {
  var n = ar;
  return (
    e.current.memoizedState.isDehydrated && (Qt(e, t).flags |= 256),
    (e = Do(e, t)),
    e !== 2 && ((t = Me), (Me = n), t !== null && xi(t)),
    e
  );
}
function xi(e) {
  Me === null ? (Me = e) : Me.push.apply(Me, e);
}
function Pd(e) {
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
function Ms(e) {
  if (X & 6) throw Error(M(327));
  Sn();
  var t = vo(e, 0);
  if (!(t & 1)) return (De(e, de()), null);
  var n = Do(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Ua(e);
    r !== 0 && ((t = r), (n = wi(e, r)));
  }
  if (n === 1) throw ((n = Sr), Qt(e, 0), Tt(e, t), De(e, de()), n);
  if (n === 6) throw Error(M(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    Vt(e, Me, ut),
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
  zt !== null && zt.tag === 0 && !(X & 6) && Sn();
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
  if ((n !== -1 && ((e.timeoutHandle = -1), dd(n)), pe !== null))
    for (n = pe.return; n !== null;) {
      var r = n;
      switch ((Qi(r), r.tag)) {
        case 1:
          ((r = r.type.childContextTypes), r != null && bo());
          break;
        case 3:
          (Nn(), ne(Le), ne(Ce), nl());
          break;
        case 5:
          tl(r);
          break;
        case 4:
          Nn();
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
    (he = 0),
    (Sr = null),
    (ul = Go = Jt = 0),
    (Me = ar = null),
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
function Z2(e, t) {
  do {
    var n = pe;
    try {
      if ((Zi(), (oo.current = Mo), No)) {
        for (var r = ae.memoizedState; r !== null;) {
          var o = r.queue;
          (o !== null && (o.pending = null), (r = r.next));
        }
        No = !1;
      }
      if (
        ((Xt = 0),
        (me = fe = ae = null),
        (rr = !1),
        (xr = 0),
        (cl.current = null),
        n === null || n.return === null)
      ) {
        ((he = 1), (Sr = t), (pe = null));
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
            h = v.tag;
          if (!(v.mode & 1) && (h === 0 || h === 11 || h === 15)) {
            var f = v.alternate;
            f
              ? ((v.updateQueue = f.updateQueue),
                (v.memoizedState = f.memoizedState),
                (v.lanes = f.lanes))
              : ((v.updateQueue = null), (v.memoizedState = null));
          }
          var m = gs(i);
          if (m !== null) {
            ((m.flags &= -257),
              ys(m, i, s, a, t),
              m.mode & 1 && vs(a, u, t),
              (t = m),
              (c = u));
            var S = t.updateQueue;
            if (S === null) {
              var b = new Set();
              (b.add(c), (t.updateQueue = b));
            } else S.add(c);
            break e;
          } else {
            if (!(t & 1)) {
              (vs(a, u, t), hl());
              break e;
            }
            c = Error(M(426));
          }
        } else if (re && s.mode & 1) {
          var T = gs(i);
          if (T !== null) {
            (!(T.flags & 65536) && (T.flags |= 256),
              ys(T, i, s, a, t),
              Yi(Mn(c, s)));
            break e;
          }
        }
        ((a = c = Mn(c, s)),
          he !== 4 && (he = 2),
          ar === null ? (ar = [a]) : ar.push(a),
          (a = i));
        do {
          switch (a.tag) {
            case 3:
              ((a.flags |= 65536), (t &= -t), (a.lanes |= t));
              var d = I2(a, c, t);
              us(a, d);
              break e;
            case 1:
              s = c;
              var p = a.type,
                y = a.stateNode;
              if (
                !(a.flags & 128) &&
                (typeof p.getDerivedStateFromError == "function" ||
                  (y !== null &&
                    typeof y.componentDidCatch == "function" &&
                    (It === null || !It.has(y))))
              ) {
                ((a.flags |= 65536), (t &= -t), (a.lanes |= t));
                var w = D2(a, s, t);
                us(a, w);
                break e;
              }
          }
          a = a.return;
        } while (a !== null);
      }
      q2(n);
    } catch (C) {
      ((t = C), pe === n && n !== null && (pe = n = n.return));
      continue;
    }
    break;
  } while (!0);
}
function X2() {
  var e = Ao.current;
  return ((Ao.current = Mo), e === null ? Mo : e);
}
function hl() {
  ((he === 0 || he === 3 || he === 2) && (he = 4),
    ve === null || (!(Jt & 268435455) && !(Go & 268435455)) || Tt(ve, we));
}
function Do(e, t) {
  var n = X;
  X |= 2;
  var r = X2();
  (ve !== e || we !== t) && ((ut = null), Qt(e, t));
  do
    try {
      Rd();
      break;
    } catch (o) {
      Z2(e, o);
    }
  while (!0);
  if ((Zi(), (X = n), (Ao.current = r), pe !== null)) throw Error(M(261));
  return ((ve = null), (we = 0), he);
}
function Rd() {
  for (; pe !== null;) J2(pe);
}
function _d() {
  for (; pe !== null && !su();) J2(pe);
}
function J2(e) {
  var t = tc(e.alternate, e, Pe);
  ((e.memoizedProps = e.pendingProps),
    t === null ? q2(e) : (pe = t),
    (cl.current = null));
}
function q2(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = Md(n, t)), n !== null)) {
        ((n.flags &= 32767), (pe = n));
        return;
      }
      if (e !== null)
        ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null));
      else {
        ((he = 6), (pe = null));
        return;
      }
    } else if (((n = Nd(n, t, Pe)), n !== null)) {
      pe = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      pe = t;
      return;
    }
    pe = t = e;
  } while (t !== null);
  he === 0 && (he = 5);
}
function Vt(e, t, n) {
  var r = J,
    o = We.transition;
  try {
    ((We.transition = null), (J = 1), Od(e, t, n, r));
  } finally {
    ((We.transition = o), (J = r));
  }
  return null;
}
function Od(e, t, n, r) {
  do Sn();
  while (zt !== null);
  if (X & 6) throw Error(M(327));
  n = e.finishedWork;
  var o = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(M(177));
  ((e.callbackNode = null), (e.callbackPriority = 0));
  var a = n.lanes | n.childLanes;
  if (
    (yu(e, a),
    e === ve && ((pe = ve = null), (we = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      Gr ||
      ((Gr = !0),
      nc(mo, function () {
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
      Ld(e, n),
      Q2(n, e),
      od(Xa),
      (go = !!Za),
      (Xa = Za = null),
      (e.current = n),
      Id(n),
      cu(),
      (X = s),
      (J = i),
      (We.transition = a));
  } else e.current = n;
  if (
    (Gr && ((Gr = !1), (zt = e), (Io = o)),
    (a = e.pendingLanes),
    a === 0 && (It = null),
    pu(n.stateNode),
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
  if (zt !== null) {
    var e = I1(Io),
      t = We.transition,
      n = J;
    try {
      if (((We.transition = null), (J = 16 > e ? 16 : e), zt === null))
        var r = !1;
      else {
        if (((e = zt), (zt = null), (Io = 0), X & 6)) throw Error(M(331));
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
                  var h = v.child;
                  if (h !== null) ((h.return = v), (_ = h));
                  else
                    for (; _ !== null;) {
                      v = _;
                      var f = v.sibling,
                        m = v.return;
                      if ((W2(v), v === u)) {
                        _ = null;
                        break;
                      }
                      if (f !== null) {
                        ((f.return = m), (_ = f));
                        break;
                      }
                      _ = m;
                    }
                }
              }
              var S = a.alternate;
              if (S !== null) {
                var b = S.child;
                if (b !== null) {
                  S.child = null;
                  do {
                    var T = b.sibling;
                    ((b.sibling = null), (b = T));
                  } while (b !== null);
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
          var y = i.child;
          if (i.subtreeFlags & 2064 && y !== null) ((y.return = i), (_ = y));
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
              var w = s.sibling;
              if (w !== null) {
                ((w.return = s.return), (_ = w));
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
  ((t = Mn(n, t)),
    (t = I2(e, t, 1)),
    (e = Lt(e, t, 1)),
    (t = je()),
    e !== null && (zr(e, 1, t), De(e, t)));
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
          ((e = Mn(n, e)),
            (e = D2(t, e, 1)),
            (t = Lt(t, e, 1)),
            (e = je()),
            t !== null && (zr(t, 1, e), De(t, e)));
          break;
        }
      }
      t = t.return;
    }
}
function Bd(e, t, n) {
  var r = e.pingCache;
  (r !== null && r.delete(t),
    (t = je()),
    (e.pingedLanes |= e.suspendedLanes & n),
    ve === e &&
      (we & n) === n &&
      (he === 4 || (he === 3 && (we & 130023424) === we && 500 > de() - dl)
        ? Qt(e, 0)
        : (ul |= n)),
    De(e, t));
}
function ec(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = Rr), (Rr <<= 1), !(Rr & 130023424) && (Rr = 4194304))
      : (t = 1));
  var n = je();
  ((e = yt(e, t)), e !== null && (zr(e, t, n), De(e, n)));
}
function Fd(e) {
  var t = e.memoizedState,
    n = 0;
  (t !== null && (n = t.retryLane), ec(e, n));
}
function $d(e, t) {
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
      throw Error(M(314));
  }
  (r !== null && r.delete(t), ec(e, n));
}
var tc;
tc = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || Le.current) Ae = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return ((Ae = !1), Ed(e, t, n));
      Ae = !!(e.flags & 131072);
    }
  else ((Ae = !1), re && t.flags & 1048576 && a2(t, Co, t.index));
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      (io(e, t), (e = t.pendingProps));
      var o = jn(t, Ce.current);
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
          (o = t.tag = Vd(r)),
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
        throw Error(M(306, r, ""));
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
        if ((O2(t), e === null)) throw Error(M(387));
        ((r = t.pendingProps),
          (a = t.memoizedState),
          (o = a.element),
          d2(e, t),
          zo(t, r, null, n));
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
            ((o = Mn(Error(M(423)), t)), (t = ks(e, t, r, n, o)));
            break e;
          } else if (r !== o) {
            ((o = Mn(Error(M(424)), t)), (t = ks(e, t, r, n, o)));
            break e;
          } else
            for (
              Re = At(t.stateNode.containerInfo.firstChild),
                _e = t,
                re = !0,
                qe = null,
                n = c2(t, null, r, n),
                t.child = n;
              n;
            )
              ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
        else {
          if ((zn(), r === o)) {
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
        p2(t),
        e === null && ri(t),
        (r = t.type),
        (o = t.pendingProps),
        (a = e !== null ? e.memoizedProps : null),
        (i = o.children),
        Ja(r, o) ? (i = null) : a !== null && Ja(r, a) && (t.flags |= 32),
        _2(e, t),
        Te(e, t, i, n),
        t.child
      );
    case 6:
      return (e === null && ri(t), null);
    case 13:
      return B2(e, t, n);
    case 4:
      return (
        el(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = En(t, null, r, n)) : Te(e, t, r, n),
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
                      ((c = mt(-1, n & -n)), (c.tag = 2));
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
                if (((i = a.return), i === null)) throw Error(M(341));
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
      return P2(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : Xe(r, o)),
        io(e, t),
        (t.tag = 1),
        Ie(r) ? ((e = !0), ko(t)) : (e = !1),
        kn(t, n),
        L2(t, r, o),
        ii(t, r, o, n),
        ci(null, t, r, !0, e, n)
      );
    case 19:
      return F2(e, t, n);
    case 22:
      return R2(e, t, n);
  }
  throw Error(M(156, t.tag));
};
function nc(e, t) {
  return N1(e, t);
}
function Hd(e, t, n, r) {
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
  return new Hd(e, t, n, r);
}
function ml(e) {
  return ((e = e.prototype), !(!e || !e.isReactComponent));
}
function Vd(e) {
  if (typeof e == "function") return ml(e) ? 1 : 0;
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
  if (((r = e), typeof e == "function")) ml(e) && (i = 1);
  else if (typeof e == "string") i = 5;
  else
    e: switch (e) {
      case ln:
        return Yt(n.children, o, a, t);
      case Ii:
        ((i = 8), (o |= 8));
        break;
      case Ma:
        return (
          (e = Ve(12, n, t, o | 2)),
          (e.elementType = Ma),
          (e.lanes = a),
          e
        );
      case Aa:
        return ((e = Ve(13, n, t, o)), (e.elementType = Aa), (e.lanes = a), e);
      case La:
        return ((e = Ve(19, n, t, o)), (e.elementType = La), (e.lanes = a), e);
      case p1:
        return Qo(n, o, a, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case u1:
              i = 10;
              break e;
            case d1:
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
        throw Error(M(130, e == null ? e : typeof e, ""));
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
    (e.elementType = p1),
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
function Wd(e, t, n, r, o) {
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
    (e = new Wd(e, t, n, s, c)),
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
function Ud(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: an,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function rc(e) {
  if (!e) return _t;
  e = e._reactInternals;
  e: {
    if (tn(e) !== e || e.tag !== 1) throw Error(M(170));
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
    throw Error(M(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Ie(n)) return r2(e, n, t);
  }
  return t;
}
function oc(e, t, n, r, o, a, i, s, c) {
  return (
    (e = vl(n, r, !0, e, o, a, i, s, c)),
    (e.context = rc(null)),
    (n = e.current),
    (r = je()),
    (o = Dt(n)),
    (a = mt(r, o)),
    (a.callback = t ?? null),
    Lt(n, a, o),
    (e.current.lanes = o),
    zr(e, o, r),
    De(e, r),
    e
  );
}
function Yo(e, t, n, r) {
  var o = t.current,
    a = je(),
    i = Dt(o);
  return (
    (n = rc(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = mt(a, i)),
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
function Gd() {
  return null;
}
var ac =
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
  if (t === null) throw Error(M(409));
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
    var t = R1();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < Ct.length && t !== 0 && t < Ct[n].priority; n++);
    (Ct.splice(n, 0, e), n === 0 && O1(e));
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
function Qd(e, t, n, r, o) {
  if (o) {
    if (typeof r == "function") {
      var a = r;
      r = function () {
        var u = Po(i);
        a.call(u);
      };
    }
    var i = oc(t, r, e, 0, null, !1, !1, "", Is);
    return (
      (e._reactRootContainer = i),
      (e[gt] = i.current),
      mr(e.nodeType === 8 ? e.parentNode : e),
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
    mr(e.nodeType === 8 ? e.parentNode : e),
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
  } else i = Qd(n, t, e, o, r);
  return Po(i);
}
D1 = function (e) {
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
          var o = je();
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
      var n = je();
      tt(t, e, 134217728, n);
    }
    gl(e, 134217728);
  }
};
P1 = function (e) {
  if (e.tag === 13) {
    var t = Dt(e),
      n = yt(e, t);
    if (n !== null) {
      var r = je();
      tt(n, e, t, r);
    }
    gl(e, t);
  }
};
R1 = function () {
  return J;
};
_1 = function (e, t) {
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
            if (!o) throw Error(M(90));
            (h1(r), Pa(r, o));
          }
        }
      }
      break;
    case "textarea":
      v1(e, n);
      break;
    case "select":
      ((t = n.value), t != null && yn(e, !!n.multiple, t, !1));
  }
};
S1 = pl;
C1 = qt;
var Yd = { usingClientEntryPoint: !1, Events: [Nr, dn, $o, b1, k1, pl] },
  Vn = {
    findFiberByHostInstance: Wt,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom",
  },
  Kd = {
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
    findFiberByHostInstance: Vn.findFiberByHostInstance || Gd,
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
      ((_o = Qr.inject(Kd)), (lt = Qr));
    } catch {}
}
Be.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Yd;
Be.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!wl(t)) throw Error(M(200));
  return Ud(e, t, null, n);
};
Be.createRoot = function (e, t) {
  if (!wl(e)) throw Error(M(299));
  var n = !1,
    r = "",
    o = ac;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (o = t.onRecoverableError)),
    (t = vl(e, 1, !1, null, null, n, !1, r, o)),
    (e[gt] = t.current),
    mr(e.nodeType === 8 ? e.parentNode : e),
    new yl(t)
  );
};
Be.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(M(188))
      : ((e = Object.keys(e).join(",")), Error(M(268, e)));
  return ((e = z1(t)), (e = e === null ? null : e.stateNode), e);
};
Be.flushSync = function (e) {
  return qt(e);
};
Be.hydrate = function (e, t, n) {
  if (!Zo(t)) throw Error(M(200));
  return Xo(null, e, t, !0, n);
};
Be.hydrateRoot = function (e, t, n) {
  if (!wl(e)) throw Error(M(405));
  var r = (n != null && n.hydratedSources) || null,
    o = !1,
    a = "",
    i = ac;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (o = !0),
      n.identifierPrefix !== void 0 && (a = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (i = n.onRecoverableError)),
    (t = oc(t, null, e, 1, n ?? null, o, !1, a, i)),
    (e[gt] = t.current),
    mr(e),
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
  if (!Zo(t)) throw Error(M(200));
  return Xo(null, e, t, !1, n);
};
Be.unmountComponentAtNode = function (e) {
  if (!Zo(e)) throw Error(M(40));
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
  if (!Zo(n)) throw Error(M(200));
  if (e == null || e._reactInternals === void 0) throw Error(M(38));
  return Xo(e, t, n, !1, r);
};
Be.version = "18.3.1-next-f1338f8080-20240426";
function ic() {
  if (!(
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
  ))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ic);
    } catch (e) {
      console.error(e);
    }
}
(ic(), (i1.exports = Be));
var Zd = i1.exports,
  Ds = Zd;
((Ea.createRoot = Ds.createRoot), (Ea.hydrateRoot = Ds.hydrateRoot));
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
        var x = new OffscreenCanvas(1, 1),
          g = x.getContext("2d");
        g.fillRect(0, 0, 1, 1);
        var D = x.transferToImageBitmap();
        g.createPattern(D, "no-repeat");
      } catch {
        return !1;
      }
      return !0;
    })();
  function c() {}
  function u(x) {
    var g = n.exports.Promise,
      D = g !== void 0 ? g : t.Promise;
    return typeof D == "function" ? new D(x) : (x(c, c), null);
  }
  var v = (function (x, g) {
      return {
        transform: function (D) {
          if (x) return D;
          if (g.has(D)) return g.get(D);
          var F = new OffscreenCanvas(D.width, D.height),
            V = F.getContext("2d");
          return (V.drawImage(D, 0, 0), g.set(D, F), F);
        },
        clear: function () {
          g.clear();
        },
      };
    })(s, new Map()),
    h = (function () {
      var x = Math.floor(16.666666666666668),
        g,
        D,
        F = {},
        V = 0;
      return (
        typeof requestAnimationFrame == "function" &&
        typeof cancelAnimationFrame == "function"
          ? ((g = function (R) {
              var $ = Math.random();
              return (
                (F[$] = requestAnimationFrame(function O(W) {
                  V === W || V + x - 1 < W
                    ? ((V = W), delete F[$], R())
                    : (F[$] = requestAnimationFrame(O));
                })),
                $
              );
            }),
            (D = function (R) {
              F[R] && cancelAnimationFrame(F[R]);
            }))
          : ((g = function (R) {
              return setTimeout(R, x);
            }),
            (D = function (R) {
              return clearTimeout(R);
            })),
        { frame: g, cancel: D }
      );
    })(),
    f = (function () {
      var x,
        g,
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
            if (g) return (R(O, null), g);
            var se = Math.random().toString(36).slice(2);
            return (
              (g = u(function (ee) {
                function ce(ge) {
                  ge.data.callback === se &&
                    (delete D[se],
                    V.removeEventListener("message", ce),
                    (g = null),
                    v.clear(),
                    K(),
                    ee());
                }
                (V.addEventListener("message", ce),
                  R(O, se),
                  (D[se] = ce.bind(null, { data: { callback: se } })));
              })),
              g
            );
          }),
          (V.reset = function () {
            V.postMessage({ reset: !0 });
            for (var O in D) (D[O](), delete D[O]);
          }));
      }
      return function () {
        if (x) return x;
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
            x = new Worker(URL.createObjectURL(new Blob([V])));
          } catch (R) {
            return (
              typeof console < "u" &&
                typeof console.warn == "function" &&
                console.warn("🎊 Could not load worker", R),
              null
            );
          }
          F(x);
        }
        return x;
      };
    })(),
    m = {
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
  function S(x, g) {
    return g ? g(x) : x;
  }
  function b(x) {
    return x != null;
  }
  function T(x, g, D) {
    return S(x && b(x[g]) ? x[g] : m[g], D);
  }
  function d(x) {
    return x < 0 ? 0 : Math.floor(x);
  }
  function p(x, g) {
    return Math.floor(Math.random() * (g - x)) + x;
  }
  function y(x) {
    return parseInt(x, 16);
  }
  function w(x) {
    return x.map(C);
  }
  function C(x) {
    var g = String(x).replace(/[^0-9a-f]/gi, "");
    return (
      g.length < 6 && (g = g[0] + g[0] + g[1] + g[1] + g[2] + g[2]),
      {
        r: y(g.substring(0, 2)),
        g: y(g.substring(2, 4)),
        b: y(g.substring(4, 6)),
      }
    );
  }
  function j(x) {
    var g = T(x, "origin", Object);
    return ((g.x = T(g, "x", Number)), (g.y = T(g, "y", Number)), g);
  }
  function z(x) {
    ((x.width = document.documentElement.clientWidth),
      (x.height = document.documentElement.clientHeight));
  }
  function k(x) {
    var g = x.getBoundingClientRect();
    ((x.width = g.width), (x.height = g.height));
  }
  function L(x) {
    var g = document.createElement("canvas");
    return (
      (g.style.position = "fixed"),
      (g.style.top = "0px"),
      (g.style.left = "0px"),
      (g.style.pointerEvents = "none"),
      (g.style.zIndex = x),
      g
    );
  }
  function E(x, g, D, F, V, R, $, O, W) {
    (x.save(),
      x.translate(g, D),
      x.rotate(R),
      x.scale(F, V),
      x.arc(0, 0, 1, $, O, W),
      x.restore());
  }
  function P(x) {
    var g = x.angle * (Math.PI / 180),
      D = x.spread * (Math.PI / 180);
    return {
      x: x.x,
      y: x.y,
      wobble: Math.random() * 10,
      wobbleSpeed: Math.min(0.11, Math.random() * 0.1 + 0.05),
      velocity: x.startVelocity * 0.5 + Math.random() * x.startVelocity,
      angle2D: -g + (0.5 * D - Math.random() * D),
      tiltAngle: (Math.random() * (0.75 - 0.25) + 0.25) * Math.PI,
      color: x.color,
      shape: x.shape,
      tick: 0,
      totalTicks: x.ticks,
      decay: x.decay,
      drift: x.drift,
      random: Math.random() + 2,
      tiltSin: 0,
      tiltCos: 0,
      wobbleX: 0,
      wobbleY: 0,
      gravity: x.gravity * 3,
      ovalScalar: 0.6,
      scalar: x.scalar,
      flat: x.flat,
    };
  }
  function I(x, g) {
    ((g.x += Math.cos(g.angle2D) * g.velocity + g.drift),
      (g.y += Math.sin(g.angle2D) * g.velocity + g.gravity),
      (g.velocity *= g.decay),
      g.flat
        ? ((g.wobble = 0),
          (g.wobbleX = g.x + 10 * g.scalar),
          (g.wobbleY = g.y + 10 * g.scalar),
          (g.tiltSin = 0),
          (g.tiltCos = 0),
          (g.random = 1))
        : ((g.wobble += g.wobbleSpeed),
          (g.wobbleX = g.x + 10 * g.scalar * Math.cos(g.wobble)),
          (g.wobbleY = g.y + 10 * g.scalar * Math.sin(g.wobble)),
          (g.tiltAngle += 0.1),
          (g.tiltSin = Math.sin(g.tiltAngle)),
          (g.tiltCos = Math.cos(g.tiltAngle)),
          (g.random = Math.random() + 2)));
    var D = g.tick++ / g.totalTicks,
      F = g.x + g.random * g.tiltCos,
      V = g.y + g.random * g.tiltSin,
      R = g.wobbleX + g.random * g.tiltCos,
      $ = g.wobbleY + g.random * g.tiltSin;
    if (
      ((x.fillStyle =
        "rgba(" +
        g.color.r +
        ", " +
        g.color.g +
        ", " +
        g.color.b +
        ", " +
        (1 - D) +
        ")"),
      x.beginPath(),
      i &&
        g.shape.type === "path" &&
        typeof g.shape.path == "string" &&
        Array.isArray(g.shape.matrix))
    )
      x.fill(
        le(
          g.shape.path,
          g.shape.matrix,
          g.x,
          g.y,
          Math.abs(R - F) * 0.1,
          Math.abs($ - V) * 0.1,
          (Math.PI / 10) * g.wobble
        )
      );
    else if (g.shape.type === "bitmap") {
      var O = (Math.PI / 10) * g.wobble,
        W = Math.abs(R - F) * 0.1,
        K = Math.abs($ - V) * 0.1,
        se = g.shape.bitmap.width * g.scalar,
        ee = g.shape.bitmap.height * g.scalar,
        ce = new DOMMatrix([
          Math.cos(O) * W,
          Math.sin(O) * W,
          -Math.sin(O) * K,
          Math.cos(O) * K,
          g.x,
          g.y,
        ]);
      ce.multiplySelf(new DOMMatrix(g.shape.matrix));
      var ge = x.createPattern(v.transform(g.shape.bitmap), "no-repeat");
      (ge.setTransform(ce),
        (x.globalAlpha = 1 - D),
        (x.fillStyle = ge),
        x.fillRect(g.x - se / 2, g.y - ee / 2, se, ee),
        (x.globalAlpha = 1));
    } else if (g.shape === "circle")
      x.ellipse
        ? x.ellipse(
            g.x,
            g.y,
            Math.abs(R - F) * g.ovalScalar,
            Math.abs($ - V) * g.ovalScalar,
            (Math.PI / 10) * g.wobble,
            0,
            2 * Math.PI
          )
        : E(
            x,
            g.x,
            g.y,
            Math.abs(R - F) * g.ovalScalar,
            Math.abs($ - V) * g.ovalScalar,
            (Math.PI / 10) * g.wobble,
            0,
            2 * Math.PI
          );
    else if (g.shape === "star")
      for (
        var Z = (Math.PI / 2) * 3,
          Ne = 4 * g.scalar,
          Qe = 8 * g.scalar,
          Ye = g.x,
          ct = g.y,
          $t = 5,
          rt = Math.PI / $t;
        $t--;
      )
        ((Ye = g.x + Math.cos(Z) * Qe),
          (ct = g.y + Math.sin(Z) * Qe),
          x.lineTo(Ye, ct),
          (Z += rt),
          (Ye = g.x + Math.cos(Z) * Ne),
          (ct = g.y + Math.sin(Z) * Ne),
          x.lineTo(Ye, ct),
          (Z += rt));
    else
      (x.moveTo(Math.floor(g.x), Math.floor(g.y)),
        x.lineTo(Math.floor(g.wobbleX), Math.floor(V)),
        x.lineTo(Math.floor(R), Math.floor($)),
        x.lineTo(Math.floor(F), Math.floor(g.wobbleY)));
    return (x.closePath(), x.fill(), g.tick < g.totalTicks);
  }
  function A(x, g, D, F, V) {
    var R = g.slice(),
      $ = x.getContext("2d"),
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
            ((F.width = x.width = o.width), (F.height = x.height = o.height)),
            !F.width &&
              !F.height &&
              (D(x), (F.width = x.width), (F.height = x.height)),
            $.clearRect(0, 0, F.width, F.height),
            (R = R.filter(function (ge) {
              return I($, ge);
            })),
            R.length ? (O = h.frame(ce)) : ee());
        }
        ((O = h.frame(ce)), (W = ee));
      });
    return {
      addFettis: function (se) {
        return ((R = R.concat(se)), K);
      },
      canvas: x,
      promise: K,
      reset: function () {
        (O && h.cancel(O), W && W());
      },
    };
  }
  function B(x, g) {
    var D = !x,
      F = !!T(g || {}, "resize"),
      V = !1,
      R = T(g, "disableForReducedMotion", Boolean),
      $ = a && !!T(g || {}, "useWorker"),
      O = $ ? f() : null,
      W = D ? z : k,
      K = x && O ? !!x.__confetti_initialized : !1,
      se =
        typeof matchMedia == "function" &&
        matchMedia("(prefers-reduced-motion)").matches,
      ee;
    function ce(Z, Ne, Qe) {
      for (
        var Ye = T(Z, "particleCount", d),
          ct = T(Z, "angle", Number),
          $t = T(Z, "spread", Number),
          rt = T(Z, "startVelocity", Number),
          vc = T(Z, "decay", Number),
          gc = T(Z, "gravity", Number),
          yc = T(Z, "drift", Number),
          kl = T(Z, "colors", w),
          wc = T(Z, "ticks", Number),
          Sl = T(Z, "shapes"),
          xc = T(Z, "scalar"),
          bc = !!T(Z, "flat"),
          Cl = j(Z),
          Tl = Ye,
          Jo = [],
          kc = x.width * Cl.x,
          Sc = x.height * Cl.y;
        Tl--;
      )
        Jo.push(
          P({
            x: kc,
            y: Sc,
            angle: ct,
            spread: $t,
            startVelocity: rt,
            color: kl[Tl % kl.length],
            shape: Sl[p(0, Sl.length)],
            ticks: wc,
            decay: vc,
            gravity: gc,
            drift: yc,
            scalar: xc,
            flat: bc,
          })
        );
      return ee ? ee.addFettis(Jo) : ((ee = A(x, Jo, W, Ne, Qe)), ee.promise);
    }
    function ge(Z) {
      var Ne = R || T(Z, "disableForReducedMotion", Boolean),
        Qe = T(Z, "zIndex", Number);
      if (Ne && se)
        return u(function (rt) {
          rt();
        });
      (D && ee
        ? (x = ee.canvas)
        : D && !x && ((x = L(Qe)), document.body.appendChild(x)),
        F && !K && W(x));
      var Ye = { width: x.width, height: x.height };
      (O && !K && O.init(x), (K = !0), O && (x.__confetti_initialized = !0));
      function ct() {
        if (O) {
          var rt = {
            getBoundingClientRect: function () {
              if (!D) return x.getBoundingClientRect();
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
            x &&
            (document.body.contains(x) && document.body.removeChild(x),
            (x = null),
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
  function le(x, g, D, F, V, R, $) {
    var O = new Path2D(x),
      W = new Path2D();
    W.addPath(O, new DOMMatrix(g));
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
  function N(x) {
    if (!i) throw new Error("path confetti are not supported in this browser");
    var g, D;
    typeof x == "string" ? (g = x) : ((g = x.path), (D = x.matrix));
    var F = new Path2D(g),
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
      var Ne = 10,
        Qe = Math.min(Ne / ee, Ne / ce);
      D = [
        Qe,
        0,
        0,
        Qe,
        -Math.round(ee / 2 + O) * Qe,
        -Math.round(ce / 2 + W) * Qe,
      ];
    }
    return { type: "path", path: g, matrix: D };
  }
  function H(x) {
    var g,
      D = 1,
      F = "#000000",
      V =
        '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';
    typeof x == "string"
      ? (g = x)
      : ((g = x.text),
        (D = "scalar" in x ? x.scalar : D),
        (V = "fontFamily" in x ? x.fontFamily : V),
        (F = "color" in x ? x.color : F));
    var R = 10 * D,
      $ = "" + R + "px " + V,
      O = new OffscreenCanvas(R, R),
      W = O.getContext("2d");
    W.font = $;
    var K = W.measureText(g),
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
      W.fillText(g, ge, Z));
    var Ne = 1 / D;
    return {
      type: "bitmap",
      bitmap: O.transferToImageBitmap(),
      matrix: [Ne, 0, 0, Ne, (-se * Ne) / 2, (-ee * Ne) / 2],
    };
  }
  ((n.exports = function () {
    return G().apply(this, arguments);
  }),
    (n.exports.reset = function () {
      G().reset();
    }),
    (n.exports.create = B),
    (n.exports.shapeFromPath = N),
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
function Xd(e = {}) {
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
        n.forEach((h) => h(v)),
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
const Jd = Xd();
function qd(e) {
  return Jd.scheduleRender(e);
}
function bl(e, t) {
  if (typeof e == "number") return Math.min(10, Math.max(1, Math.round(e)));
  const n = e && e !== "normal" ? e : (t ?? e ?? "normal");
  return n === "low" ? 3 : n === "high" ? 8 : 5;
}
function lc(e, t = !1) {
  const n = Math.round(5 + e * 3.1);
  return t ? Math.max(4, Math.round(n * 0.6)) : n;
}
function sc(e) {
  const t = Math.max(4, 18.5 - e * 1.35),
    n = Math.max(3, 9 - e * 0.5);
  return {
    minDuration: Number(t.toFixed(1)),
    maxDuration: Number((t + n).toFixed(1)),
  };
}
const e0 = "#c9a84c",
  t0 = "#2d5a27",
  n0 = "#fff7cc";
function r0() {
  if (typeof document > "u") return !1;
  try {
    const e = document.createElement("canvas");
    return !!(e.getContext && e.getContext("2d"));
  } catch {
    return !1;
  }
}
function o0(e) {
  return e === "eid-adha"
    ? ["🐑", "🎁"]
    : e === "eid-fitr" || e === "eid"
      ? ["🎁", "✨"]
      : ["🌙", "✨"];
}
async function bi(e, t, n) {
  if (!Cr() || !r0()) return;
  const r =
      t != null && t.length ? t : [e0, t0, n0, "#e8c96b", "#4a8a3a", "#ffffff"],
    [o, a] = o0(n);
  let i;
  if (typeof OffscreenCanvas < "u")
    try {
      const c = Ps(o),
        u = Ps(a),
        v = (e || 1447).toString(),
        h = a0(v);
      i = [c, u, h];
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
    h =
      typeof s.actualBoundingBoxAscent == "number"
        ? s.actualBoundingBoxAscent
        : 20,
    f =
      typeof s.actualBoundingBoxDescent == "number"
        ? s.actualBoundingBoxDescent
        : 0,
    m = Math.max(1, Math.ceil(v + u) + c * 2),
    S = Math.max(1, Math.ceil(h + f) + c * 2),
    b = u + c,
    T = h + c;
  ((a = new OffscreenCanvas(m, S)),
    (i = a.getContext("2d")),
    (i.font = r),
    (i.lineJoin = "round"),
    (i.lineWidth = 3 * 2),
    (i.strokeStyle = "rgba(0,0,0,0.55)"),
    i.strokeText(e, b, T),
    i.fillText(e, b, T));
  const d = 1 / 2;
  return {
    type: "bitmap",
    bitmap: a.transferToImageBitmap(),
    matrix: [d, 0, 0, d, (-m * d) / 2, (-S * d) / 2],
  };
}
function a0(e) {
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
    h =
      typeof i.actualBoundingBoxDescent == "number"
        ? i.actualBoundingBoxDescent
        : 0,
    f = Math.max(1, Math.ceil(u + c) + s * 2),
    m = Math.max(1, Math.ceil(v + h) + s * 2),
    S = c + s,
    b = v + s;
  ((o = new OffscreenCanvas(f, m)),
    (a = o.getContext("2d")),
    (a.font = r),
    (a.lineJoin = "round"),
    (a.lineWidth = 15 * 0.28),
    (a.strokeStyle = "#000000"),
    a.strokeText(e, S, b),
    (a.fillStyle = "#ffffff"),
    a.fillText(e, S, b));
  const T = 1 / 1.5;
  return {
    type: "bitmap",
    bitmap: o.transferToImageBitmap(),
    matrix: [T, 0, 0, T, (-f * T) / 2, (-m * T) / 2],
  };
}
function i0(e, t, n = !1) {
  return t === "off" || !Cr() ? !1 : e.isRamadan || e.isEid || n;
}
function Yr(e) {
  return new Promise((t) => setTimeout(t, e));
}
const l0 = {
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
function cc(e, t) {
  return t !== void 0
    ? typeof t == "number" && !isNaN(t) && isFinite(t)
      ? Math.max(-3, Math.min(3, Math.round(t)))
      : 0
    : e
      ? (l0[e] ?? 0)
      : 0;
}
const s0 = {
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
  c0 = {
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
function u0(e) {
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
        const v = o.find((h) => h.type === u);
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
function d0(e) {
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
  for (const [o, a] of Object.entries(c0)) {
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
  for (const [o, a] of Object.entries(s0)) {
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
function p0(e, t = 0, n = !1) {
  const r = typeof t == "number" ? t : 0;
  let o = typeof t == "boolean" ? t : n,
    a,
    i = r;
  if (e instanceof Date) a = e;
  else if (typeof e == "object" && e !== null) {
    const u = e;
    ((a = u.date),
      typeof u.debug == "boolean" && (o = u.debug),
      (i = cc(u.region, u.hijriAdjustment)));
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
    { targetDate: r, effectiveOffset: o } = p0(e, t, n),
    a = o === 0 ? r : new Date(r.getTime() - o * 24 * 60 * 60 * 1e3),
    i = u0(a);
  if (i) {
    const v = i.month === 9,
      h = i.month === 10 && i.day >= 1 && i.day <= 3,
      f = i.month === 12 && i.day >= 10 && i.day <= 13;
    let m = "none",
      S = 0;
    return (
      v
        ? ((m = "ramadan"), (S = i.day))
        : h
          ? ((m = "eid-fitr"), (S = i.day))
          : f && ((m = "eid-adha"), (S = i.day - 9)),
      {
        isRamadan: v,
        occasion: m,
        isEid: h || f,
        hijriYear: i.year,
        hijriMonth: i.month,
        hijriDay: i.day,
        dayNumber: S,
      }
    );
  }
  return d0(a);
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
const f0 = {
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
function h0(e) {
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
function v0(e) {
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
function g0(e, t) {
  const n = e.bannerBg,
    r = e.bannerTextColor,
    o = e.bannerIconColor,
    a = e.zIndex,
    i = e.locale ?? "en",
    s = t === "eid-fitr" || t === "eid-adha" || t === "ramadan" ? t : "ramadan",
    c = _s(e.bannerTextEn, s),
    u = _s(e.bannerTextAr, s),
    v = f0[s],
    h = i === "ar" ? u || c || v.ar : c || u || v.en,
    f = i === "ar",
    m = [],
    S = document.body.style.paddingTop,
    b = document.body.style.paddingBottom,
    T = e.position !== "bottom",
    d =
      e.position === "bottom" || e.position === "both" || e.position === "full";
  let p;
  if (
    (s === "eid-fitr"
      ? (p = m0(o))
      : s === "eid-adha"
        ? (p = v0())
        : (p = h0(o)),
    T)
  ) {
    const w = Os(n, r, p, h, f, a, "top");
    (w.style.setProperty("--ro-banner-bg", n),
      w.style.setProperty("--ro-banner-text", r),
      w.style.setProperty("--ro-banner-icon", o),
      document.body.prepend(w),
      m.push(w));
    const C = parseFloat(getComputedStyle(document.body).paddingTop) || 0;
    document.body.style.paddingTop = `${C + Si}px`;
  }
  if (d) {
    const w = Os(n, r, p, h, f, a, "bottom");
    (w.style.setProperty("--ro-banner-bg", n),
      w.style.setProperty("--ro-banner-text", r),
      w.style.setProperty("--ro-banner-icon", o),
      document.body.appendChild(w),
      m.push(w));
    const C = parseFloat(getComputedStyle(document.body).paddingBottom) || 0;
    document.body.style.paddingBottom = `${C + Si}px`;
  }
  return {
    elements: m,
    cleanup: () => {
      (m.forEach((w) => w.remove()),
        (document.body.style.paddingTop = S),
        (document.body.style.paddingBottom = b));
    },
  };
}
function y0(e, t) {
  return `<svg width="${t}" height="${t}" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M20 3 C8 3 2 11 2 20 C2 29 8 37 20 37 C14 32 11 26 11 20 C11 14 14 8 20 3Z" fill="${e}"/>
  </svg>`;
}
function w0(e, t) {
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
const x0 = (e, t) => {
  const n = t.colors,
    r = [],
    o = bl(t.intensity, t.density),
    a = typeof window < "u" && window.innerWidth < 640,
    i = lc(o, a),
    { minDuration: s, maxDuration: c } = sc(o),
    u = a ? 0.7 : 1;
  for (let v = 0; v < i; v++) {
    const h = Math.random() < 0.35,
      f = n[Math.floor(Math.random() * Math.min(n.length, 4))] ?? "#c9a84c",
      m = (h ? 32 : 20) * u,
      S = m + Math.random() * m * 0.6,
      b = document.createElement("div");
    ((b.className = h ? "ro-crescent" : "ro-star"),
      (b.innerHTML = h ? y0(f, S) : w0(f, S)));
    const { x: T } = dc(t.position, t.clearance, a),
      d = s + Math.random() * (c - s),
      p = d.toFixed(1),
      y = (-Math.random() * d).toFixed(1),
      w = (10 + Math.random() * 16) * (Math.random() < 0.5 ? 1 : -1),
      C = (10 + Math.random() * 16) * (Math.random() < 0.5 ? 1 : -1),
      j = (8 + Math.random() * 14) * (Math.random() < 0.5 ? 1 : -1),
      z = (5 + Math.random() * 12) * (Math.random() < 0.5 ? 1 : -1),
      k = (5 + Math.random() * 12) * (Math.random() < 0.5 ? 1 : -1),
      L = (5 + Math.random() * 12) * (Math.random() < 0.5 ? 1 : -1);
    ((b.style.cssText = `
      left:${T}%;
      top:102%;
      --ro-float-duration:${p}s;
      --ro-sway-1:${w.toFixed(1)}px;
      --ro-sway-2:${C.toFixed(1)}px;
      --ro-sway-end:${j.toFixed(1)}px;
      --ro-rot-1:${z.toFixed(1)}deg;
      --ro-rot-2:${k.toFixed(1)}deg;
      --ro-rot-3:${L.toFixed(1)}deg;
      animation-delay:${y}s;
    `),
      e.appendChild(b),
      r.push(b));
  }
  return () => {
    r.forEach((v) => v.remove());
  };
};
function b0(e, t, n) {
  return `<svg width="${n}" height="${(n * 1.5).toFixed(0)}" viewBox="0 0 32 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="overflow:visible">
    <ellipse cx="16" cy="18" rx="13" ry="16" fill="${e}" opacity="0.95"/>
    <ellipse cx="12" cy="12" rx="3.5" ry="6" fill="white" opacity="0.3" transform="rotate(-20 12 12)"/>
    <polygon points="16,34 13,38 19,38" fill="${e}"/>
    <path d="M16 38 Q19 43 14 46 T16 52" stroke="${t}" fill="none" stroke-width="1.2" opacity="0.75"/>
  </svg>`;
}
function k0(e, t, n) {
  return `<svg width="${n}" height="${n}" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="4" y="10" width="24" height="18" rx="2" fill="${e}"/>
    <rect x="2" y="8" width="28" height="5" rx="1.5" fill="${t}"/>
    <rect x="14" y="8" width="4" height="20" fill="${t}"/>
    <path d="M16 8 C13 3 8 4 10 7 C13 9 16 8 16 8 C16 8 19 9 22 7 C24 4 19 3 16 8" fill="none" stroke="${t}" stroke-width="1.8"/>
  </svg>`;
}
function S0(e, t) {
  return `<svg width="${t}" height="${t}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 0 C12 7 17 12 24 12 C17 12 12 17 12 24 C12 17 7 12 0 12 C7 12 12 7 12 0 Z" fill="${e}"/>
  </svg>`;
}
function C0(e, t, n) {
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
function T0(e, t) {
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
    c = lc(i, s),
    { minDuration: u, maxDuration: v } = sc(i),
    h = s ? 0.7 : 1;
  for (let f = 0; f < c; f++) {
    const m = document.createElement("div"),
      S = o[0] ?? "#c9a84c",
      b = o[1] ?? "#e8c96b",
      T = o[2] ?? "#2d5a27",
      d = o[Math.floor(Math.random() * o.length)] ?? S;
    if (r)
      Math.random() < 0.5
        ? ((m.className = "ro-sheep"),
          (m.innerHTML = C0("#f8f9fa", T, Math.round(36 * h))))
        : ((m.className = "ro-crescent"),
          (m.innerHTML = T0(b, Math.round(30 * h))));
    else {
      const I = Math.random();
      I < 0.45
        ? ((m.className = "ro-balloon"),
          (m.innerHTML = b0(d, S, Math.round(26 * h))))
        : I < 0.75
          ? ((m.className = "ro-gift"),
            (m.innerHTML = k0(d, b, Math.round(24 * h))))
          : ((m.className = "ro-star"),
            (m.innerHTML = S0(b, Math.round(18 * h))));
    }
    const { x: p } = dc(t.position, t.clearance, s),
      y = u + Math.random() * (v - u),
      w = y.toFixed(1),
      C = (-Math.random() * y).toFixed(1),
      j = (10 + Math.random() * 16) * (Math.random() < 0.5 ? 1 : -1),
      z = (10 + Math.random() * 16) * (Math.random() < 0.5 ? 1 : -1),
      k = (8 + Math.random() * 14) * (Math.random() < 0.5 ? 1 : -1),
      L = (5 + Math.random() * 12) * (Math.random() < 0.5 ? 1 : -1),
      E = (5 + Math.random() * 12) * (Math.random() < 0.5 ? 1 : -1),
      P = (5 + Math.random() * 12) * (Math.random() < 0.5 ? 1 : -1);
    ((m.style.cssText = `
      left:${p}%;
      top:102%;
      --ro-float-duration:${w}s;
      --ro-sway-1:${j.toFixed(1)}px;
      --ro-sway-2:${z.toFixed(1)}px;
      --ro-sway-end:${k.toFixed(1)}px;
      --ro-rot-1:${L.toFixed(1)}deg;
      --ro-rot-2:${E.toFixed(1)}deg;
      --ro-rot-3:${P.toFixed(1)}deg;
      animation-delay:${C}s;
    `),
      e.appendChild(m),
      a.push(m));
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
const j0 = (e, t) => {
    const n = t.colors,
      r = n[0] ?? "#c9a84c",
      o = n[1] ?? "#e8c96b",
      a = Pn(t.position);
    if (a.length > 0) {
      const u = [];
      for (const v of a) {
        const h = document.createElement("div");
        h.className = `ro-side-band ro-side-band--${v}`;
        const f = `ro-geo-tile-${v}`;
        ((h.innerHTML = `<svg width="100%" height="100%" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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
          e.appendChild(h),
          u.push(h));
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
  uc = (e, t) => {
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
      ].map((z, k) => (n && n.length > 0 ? n[k % n.length] : z));
    t.ceilingColor;
    const a = t.ropeColor;
    function i(z, k) {
      const { viewBox: L, gContent: E } = Wn[z],
        P = E.replace(/LANTERN_COLOR/g, k);
      return `<svg viewBox="${L}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${P}</svg>`;
    }
    const s = Pn(t.position);
    if (s.length > 0) {
      const z = [];
      let k = Math.max(2, Math.min(6, Math.round(window.innerHeight / 220)));
      const L = (P) => {
        for (const I of z) {
          I.querySelectorAll(".ro-lantern-unit").forEach((B) => B.remove());
          for (let B = 0; B < P; B++) {
            const U =
                t.lanternStyle > 0
                  ? (t.lanternStyle - 1) % Wn.length
                  : B % Wn.length,
              G = o[B % o.length],
              le = (3.2 + ((B * 0.23) % 1.2)).toFixed(1),
              N = -((B * 0.73) % parseFloat(le)),
              H = (10 + (B * 80) / (P > 1 ? P - 1 : 1)).toFixed(1),
              x = document.createElement("div");
            ((x.className = "ro-lantern-unit"),
              (x.style.top = `${H}%`),
              x.style.setProperty("--ro-swing-duration", `${le}s`),
              (x.style.animationDelay = `${N.toFixed(2)}s`));
            const g = document.createElement("div");
            ((g.className = "ro-lantern-dropline"), (g.style.background = a));
            const D = document.createElement("div");
            ((D.className = "ro-lantern-svg-wrap"),
              (D.innerHTML = i(U, G)),
              x.appendChild(g),
              x.appendChild(D),
              I.appendChild(x));
          }
        }
      };
      for (const P of s) {
        const I = document.createElement("div");
        I.className = `ro-lantern-side ro-lantern-side--${P}`;
        const A = document.createElement("div");
        ((A.className = "ro-lantern-spine"),
          I.appendChild(A),
          e.appendChild(I),
          z.push(I));
      }
      L(k);
      const E = () => {
        const P = Math.max(
          2,
          Math.min(6, Math.round(window.innerHeight / 220))
        );
        P !== k && ((k = P), L(k));
      };
      return (
        window.addEventListener("resize", E, { passive: !0 }),
        () => {
          (z.forEach((P) => P.remove()),
            window.removeEventListener("resize", E));
        }
      );
    }
    function c(z, k, L, E) {
      const P = k.length;
      let I = `M 0 ${L}`;
      const A = k[0] / 2,
        B = L + E * 1.5;
      I += ` Q ${A.toFixed(1)} ${B.toFixed(1)}, ${k[0].toFixed(1)} ${L}`;
      for (let N = 0; N < P - 1; N++) {
        const H = k[N],
          x = k[N + 1],
          g = (H + x) / 2,
          D = L + E * 2;
        I += ` Q ${g.toFixed(1)} ${D.toFixed(1)}, ${x.toFixed(1)} ${L}`;
      }
      const G = (k[P - 1] + z) / 2,
        le = L + E * 1.5;
      return ((I += ` Q ${G.toFixed(1)} ${le.toFixed(1)}, ${z} ${L}`), I);
    }
    function u(z, k, L, E) {
      k.forEach((P) => {
        const I = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );
        (I.setAttribute("x1", P.toFixed(1)),
          I.setAttribute("y1", String(L)),
          I.setAttribute("x2", P.toFixed(1)),
          I.setAttribute("y2", E.toFixed(1)),
          I.setAttribute("stroke", "var(--ro-rope)"),
          I.setAttribute("stroke-width", "1.5"),
          I.setAttribute("class", "ro-dropline-path"),
          z.appendChild(I));
      });
    }
    function v(z, k, L, E) {
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
        z.appendChild(I),
        u(z, L, 2, 2 + E),
        2 + E
      );
    }
    function h(z, k, L, E, P) {
      const A = document.createElementNS("http://www.w3.org/2000/svg", "path");
      return (
        A.setAttribute("d", c(k, L, 4, E)),
        A.setAttribute("stroke", "var(--ro-ceiling)"),
        A.setAttribute("stroke-width", "2.2"),
        A.setAttribute("stroke-opacity", "0.85"),
        A.setAttribute("class", "ro-rope-path"),
        z.appendChild(A),
        u(z, L, 4, 4 + P),
        4 + P
      );
    }
    function f(z, k, L, E, P) {
      const U = document.createElementNS("http://www.w3.org/2000/svg", "path");
      (U.setAttribute("d", c(k, L, 2, E)),
        U.setAttribute("stroke", "var(--ro-ceiling)"),
        U.setAttribute("stroke-width", "2.0"),
        U.setAttribute("stroke-opacity", "0.85"),
        U.setAttribute("class", "ro-rope-path"),
        z.appendChild(U));
      const G = document.createElementNS("http://www.w3.org/2000/svg", "path");
      return (
        G.setAttribute("d", c(k, L, 16, E)),
        G.setAttribute("stroke", "var(--ro-ceiling)"),
        G.setAttribute("stroke-width", "1.6"),
        G.setAttribute("stroke-opacity", "0.65"),
        G.setAttribute("class", "ro-rope-path"),
        z.appendChild(G),
        u(z, L, 2, 16 + P),
        16 + P
      );
    }
    const m = 28,
      S = t.ropeStyle ?? "straight",
      b = t.ropeSag ?? 20,
      T = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    (T.setAttribute("class", "ro-lantern-ropes"),
      T.setAttribute("aria-hidden", "true"),
      T.setAttribute("width", "100%"),
      T.setAttribute("height", "100%"));
    const d = document.createElement("div");
    d.className = "ro-lantern-row";
    let p = 0,
      y = [];
    const w = () => {
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
        L = t.density === "low" ? 360 : t.density === "high" ? 180 : 260,
        E = t.density === "low" ? 4 : t.density === "high" ? 8 : 6,
        P = Math.max(2, Math.min(E, Math.round(k / L))),
        I =
          typeof t.lanternCount == "number" && t.lanternCount > 0
            ? Math.min(12, Math.max(1, Math.round(t.lanternCount)))
            : P,
        A = k < 600 ? Math.max(6, Math.round(b * (k / 600))) : b,
        B = [];
      for (let N = 0; N < I; N++) B.push((N + 0.5) * (k / I));
      T.innerHTML = "";
      let U = 2 + m;
      if (
        (S === "u-shaped"
          ? (U = h(T, k, B, A, m))
          : S === "dual"
            ? (U = f(T, k, B, A, m))
            : (U = v(T, k, B, m)),
        I !== p || y.length !== I)
      ) {
        ((d.innerHTML = ""), (y = []), (p = I));
        for (let N = 0; N < I; N++) {
          const H =
              t.lanternStyle > 0
                ? (t.lanternStyle - 1) % Wn.length
                : N % Wn.length,
            x = o[N % o.length],
            g = (2.5 + ((N * 0.17) % 1.5)).toFixed(1),
            D = -((N * 0.37) % parseFloat(g)),
            F = document.createElement("div");
          ((F.className = "ro-lantern"),
            F.style.setProperty("--ro-swing-duration", `${g}s`),
            (F.style.animationDelay = `${D.toFixed(2)}s`),
            (F.style.left = `${B[N].toFixed(1)}px`),
            (F.style.top = `${U}px`));
          const V = document.createElement("div");
          ((V.innerHTML = i(H, x)),
            F.appendChild(V),
            d.appendChild(F),
            y.push(F));
        }
      } else
        for (let N = 0; N < I; N++)
          ((y[N].style.left = `${B[N].toFixed(1)}px`),
            (y[N].style.top = `${U}px`));
    };
    (e.appendChild(T), e.appendChild(d), w());
    const C = () => {
      w();
    };
    let j = null;
    if (typeof ResizeObserver < "u" && e.parentElement)
      try {
        ((j = new ResizeObserver(() => {
          w();
        })),
          j.observe(e.parentElement));
      } catch {}
    return () => {
      (j == null || j.disconnect(),
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
function E0(e, t) {
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
const N0 = (e, t) => {
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
      h = Math.random(),
      f = document.createElement("div");
    let m;
    (h < 0.18
      ? ((m = 18 + Math.random() * 14),
        (f.className = "ro-crescent"),
        (f.innerHTML = z0(v, m)),
        (f.style.cssText = `
        position:absolute;
        width:${m}px;height:${m}px;
        filter:drop-shadow(0 0 ${m * 0.5}px ${v});
        animation:none;
      `))
      : h < 0.38
        ? ((m = 14 + Math.random() * 12),
          (f.className = "ro-star"),
          (f.innerHTML = E0(v, m)),
          (f.style.cssText = `
        position:absolute;
        width:${m}px;height:${m}px;
        filter:drop-shadow(0 0 ${m * 0.5}px ${v});
        animation:none;
      `))
        : ((m = 3 + Math.random() * 7),
          (f.className = "ro-sparkle"),
          (f.style.cssText = `
        position:absolute;
        width:${m}px;height:${m}px;
        background:${v};
        box-shadow:0 0 ${m * 1.5}px ${v};
        animation:none;
      `)),
      e.appendChild(f));
    let S, b;
    const T = t.position,
      d = Pn(T);
    d.length > 0
      ? ((S =
          d[Math.floor(Math.random() * d.length)] === "left"
            ? Math.random() * 4
            : 96 + Math.random() * 4),
        (b = Math.random() * 100))
      : T === "top"
        ? ((S = Math.random() * 100), (b = Math.random() * 20))
        : T === "bottom"
          ? ((S = Math.random() * 100), (b = 80 + Math.random() * 20))
          : T === "full"
            ? ((S = Math.random() * 100), (b = Math.random() * 100))
            : ((S = Math.random() * 100),
              (b =
                Math.random() < 0.5
                  ? Math.random() * 20
                  : 80 + Math.random() * 20));
    const p = 80 + Math.random() * 80;
    return (
      (f.style.left = `${S}%`),
      (f.style.top = `${b}%`),
      {
        el: f,
        x: S,
        y: b,
        vx: (Math.random() - 0.5) * 0.06 * a,
        vy: (-0.035 - Math.random() * 0.055) * a,
        size: m,
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
    for (let h = i.length - 1; h >= 0; h--) {
      const f = i[h];
      (f.life++, (f.x += f.vx), (f.y += f.vy));
      const m = f.life / f.maxLife;
      ((f.opacity = m < 0.3 ? m / 0.3 : m > 0.7 ? (1 - m) / 0.3 : 1),
        (f.el.style.left = `${f.x}%`),
        (f.el.style.top = `${f.y}%`),
        (f.el.style.opacity = String(Math.min(1, Math.max(0, f.opacity)))),
        (f.el.style.transform = `scale(${0.5 + f.opacity * 0.5})`),
        f.life >= f.maxLife && (f.el.remove(), i.splice(h, 1)));
    }
  }
  const u = qd(c);
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
function M0(e) {
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
function dc(
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
  return M0(e);
}
const A0 = {
    lanterns: uc,
    "crescent-stars": x0,
    geometric: j0,
    sparkles: N0,
    eid: Ta,
    "eid-fitr": Ta,
    "eid-adha": Ta,
  },
  L0 = "ramadan-overlay-root",
  Ci = "ramadan-overlay-styles";
function I0() {
  var e, t;
  try {
    if (typeof document > "u") return;
    ((e = document.getElementById(L0)) == null || e.remove(),
      (t = document.getElementById(Ci)) == null || t.remove());
  } catch {}
}
function D0() {
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
function P0(e, t) {
  return e.variant === "banner" ? _0(e, t) : R0(e, t);
}
function R0(e, t) {
  var h, f, m, S;
  D0();
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
      const b = a.trim();
      let T = null;
      try {
        T = document.querySelector(b);
      } catch {}
      if (!T && !b.startsWith(".") && !b.startsWith("#"))
        try {
          T = document.querySelector(`.${b}`);
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
    const b =
      (f =
        (h = window.getComputedStyle) == null ? void 0 : h.call(window, r)) ==
      null
        ? void 0
        : f.position;
    (b === "static" || !b) && (r.style.position = "relative");
    const T =
      (S =
        (m = window.getComputedStyle) == null ? void 0 : m.call(window, r)) ==
      null
        ? void 0
        : S.overflow;
    (T === "hidden" || T === "clip") && (r.style.overflow = "visible");
  }
  r.appendChild(n);
  const s = (A0[e.variant] ?? uc)(n, e, t),
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
      updateTokens: (b) => {
        Fs(n, b);
      },
    }
  );
}
function _0(e, t) {
  const { elements: n, cleanup: r } = g0(e, t);
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
const O0 = {
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
function B0(e = "auto", t) {
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
    { dict: { ...O0[n], ...t }, isRtl: n === "ar", lang: n }
  );
}
const F0 = [30, 15, 5, 1];
class $0 {
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
    if (F0.includes(n) && !this.announcedMilestones.has(n)) {
      this.announcedMilestones.add(n);
      const r = this.dict.srMilestoneMinutes.replace("{minutes}", String(n));
      this.announcerEl.textContent = r;
    }
  }
}
function H0(e, t) {
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
async function V0(e) {
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
async function W0(e) {
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
      const h = t.createGain();
      (h.gain.setValueAtTime(1e-4, i),
        h.gain.exponentialRampToValueAtTime(a.gain * 0.2, i + 0.02),
        h.gain.exponentialRampToValueAtTime(1e-4, i + 0.7),
        c.connect(v),
        v.connect(r),
        u.connect(h),
        h.connect(r),
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
class U0 {
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
      const o = await V0(this.audio);
      return (o || (n = this.onAudioBlocked) == null || n.call(this), o);
    }
    const t = await W0(this.audioCtx);
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
  G0 = "ramadan-countdown-root";
function Q0() {
  var e, t;
  try {
    if (typeof document > "u") return;
    ((e = document.getElementById(G0)) == null || e.remove(),
      (t = document.getElementById(Ti)) == null || t.remove());
  } catch {}
}
function Y0() {
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
function K0(e) {
  Y0();
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
  const h = document.createElement("div");
  h.className = "ro-countdown-actions";
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
    h.appendChild(f));
  const m = e.minimizable !== !1;
  let S = null;
  m &&
    ((S = document.createElement("button")),
    (S.type = "button"),
    (S.className = "ro-countdown-btn ro-countdown-minimize-btn"),
    S.setAttribute("aria-label", e.labels.minimizeButton),
    (S.innerHTML = '<span class="ro-countdown-icon">−</span>'),
    S.addEventListener("click", (R) => {
      (R.stopPropagation(), U());
    }),
    h.appendChild(S));
  const b = document.createElement("button");
  ((b.type = "button"),
    (b.className = "ro-countdown-btn ro-countdown-close-btn"),
    b.setAttribute("aria-label", e.labels.dismissButton),
    (b.innerHTML = '<span class="ro-countdown-icon">✕</span>'),
    b.addEventListener("click", () => {
      e.onDismiss();
    }),
    h.appendChild(b),
    i.appendChild(s),
    i.appendChild(c),
    i.appendChild(h),
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
    { unit: p, val: y } = d("ro-val-hours", e.labels.hours),
    w = document.createElement("span");
  ((w.className = "ro-countdown-sep"), (w.textContent = ":"));
  const { unit: C, val: j } = d("ro-val-minutes", e.labels.minutes),
    z = document.createElement("span");
  ((z.className = "ro-countdown-sep"), (z.textContent = ":"));
  const { unit: k, val: L } = d("ro-val-seconds", e.labels.seconds);
  (T.appendChild(p),
    T.appendChild(w),
    T.appendChild(C),
    T.appendChild(z),
    T.appendChild(k),
    a.appendChild(T));
  const E = document.createElement("div");
  ((E.className = "ro-countdown-celebration"),
    (E.style.display = "none"),
    (E.innerHTML = `
    <span class="ro-celebration-badge">✨</span>
    <p class="ro-celebration-text">${e.labels.celebration}</p>
  `),
    a.appendChild(E));
  const P = document.createElement("div");
  ((P.className = "ro-sr-only ro-countdown-announcer"),
    P.setAttribute("role", "status"),
    P.setAttribute("aria-live", "polite"),
    P.setAttribute("aria-atomic", "true"),
    a.appendChild(P));
  let I = null,
    A = null;
  if (m) {
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
      (A = document.createElement("span")),
      (A.className = "ro-countdown-pill-time"),
      (A.textContent = "--:--"),
      I.appendChild(R),
      I.appendChild($),
      I.appendChild(O),
      I.appendChild(A),
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
      if (m) {
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
      if (m) {
        ((B = !1), t.classList.remove("ro-countdown-host--minimized"));
        try {
          typeof sessionStorage < "u" &&
            sessionStorage.setItem("ro_countdown_minimized", "false");
        } catch {}
        (R = e.onExpand) == null || R.call(e);
      }
    },
    le = () => B;
  if (m) {
    let R = e.initiallyMinimized ?? !1;
    try {
      if (typeof sessionStorage < "u") {
        const $ = sessionStorage.getItem("ro_countdown_minimized");
        $ === "true" ? (R = !0) : $ === "false" && (R = !1);
      }
    } catch {}
    R && U();
  }
  const N = H0(t, e.onDismiss),
    H = new $0(P, e.labels),
    x = (R) => {
      const $ = Math.max(0, Math.floor(R / 1e3)),
        O = Math.floor($ / 3600),
        W = Math.floor(($ % 3600) / 60),
        K = $ % 60;
      ((y.textContent = String(O).padStart(2, "0")),
        (j.textContent = String(W).padStart(2, "0")),
        (L.textContent = String(K).padStart(2, "0")),
        A &&
          !a.classList.contains("ro-countdown--celebrating") &&
          (O > 0
            ? (A.textContent = `${O}h ${W}m`)
            : (A.textContent = `${W}m ${String(K).padStart(2, "0")}s`)),
        H.checkMilestone(R));
    },
    g = () => {
      (a.classList.add("ro-countdown--celebrating"),
        I &&
          (I.classList.add("ro-countdown--celebrating"),
          A && (A.textContent = e.labels.celebration)),
        (T.style.display = "none"),
        (E.style.display = "flex"),
        H.checkMilestone(0));
    };
  return {
    root: t,
    updateDigits: x,
    showCelebration: g,
    triggerCelebrationFlare: g,
    endCelebration: () => {
      (a.classList.remove("ro-countdown--celebrating"),
        I && I.classList.remove("ro-countdown--celebrating"),
        (E.style.display = "none"),
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
      (N(), t.remove());
    },
  };
}
const Z0 = /^([01]?\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?$/;
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
      a = o.match(Z0);
    if (a) {
      const s = parseInt(a[1], 10),
        c = parseInt(a[2], 10),
        u = a[3] !== void 0 ? parseInt(a[3], 10) : 0,
        v = new Date(t.getTime());
      v.setHours(s, c, u, 0);
      const h = n * 6e4;
      return (t.getTime() > v.getTime() + h && v.setDate(v.getDate() + 1), v);
    }
    const i = new Date(o);
    return isNaN(i.getTime()) ? null : i;
  }
  return null;
}
class X0 {
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
    h = $s(s.iftarTime, new Date(), u);
  if (!h)
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
  const { dict: f, isRtl: m, lang: S } = B0(s.locale, s.labels),
    b = new U0({
      soundUrl: s.soundUrl,
      defaultMuted: s.defaultMuted,
      onAudioBlocked: () => {
        var k;
        ((k = s.onAudioBlocked) == null || k.call(s),
          d && d.updateSoundButton(b.isMuted(), !0));
      },
    }),
    T = (k) => !(k.sound === !1 || k.soundUrl === !1 || k.soundUrl === "none");
  let d = null,
    p = !1,
    y,
    w = null;
  if (typeof window < "u") {
    const k = () => {
        (b.prime(), L());
      },
      L = () => {
        (window.removeEventListener("pointerdown", k),
          window.removeEventListener("keydown", k),
          (w = null));
      };
    ((w = L),
      window.addEventListener("pointerdown", k, { once: !0, passive: !0 }),
      window.addEventListener("keydown", k, { once: !0, passive: !0 }));
  }
  const C = () => {
      if (d || p) return;
      ((d = K0({
        targetTime: j.getTargetTime(),
        position: s.position ?? "bottom-right",
        isBannerTopActive: n,
        hasSound: T(s),
        initialMuted: b.isMuted(),
        minimizable: s.minimizable,
        initiallyMinimized: y !== void 0 ? y : s.initiallyMinimized,
        labels: f,
        isRtl: m,
        lang: S,
        onDismiss: () => {
          z.dismiss();
        },
        onToggleSound: () => {
          z.toggleMute();
        },
        onPlayAlert: () => {
          b.playAlert();
        },
      })),
        b.prime());
      const L = j.getTargetTime().getTime() - Date.now();
      d.updateDigits(L);
      const E = Math.max(1, Math.floor(L / 6e4));
      d.announcer.announceInitial(E);
    },
    j = new X0(h, {
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
        (b.playAlert(), (k = s.onIftar) == null || k.call(s));
      },
      onCelebrationEnd: () => {
        d && d.endCelebration();
      },
      onAutoDismiss: () => {
        z.dismiss();
      },
    }),
    z = {
      show: () => {
        (C(), j.forceOpen());
      },
      dismiss: () => {
        var k;
        (d && (d.destroy(), (d = null)),
          j.stop(),
          b.destroy(),
          (k = s.onDismiss) == null || k.call(s));
      },
      minimize: () => {
        ((y = !0), d == null || d.minimize());
      },
      expand: () => {
        ((y = !1), d == null || d.expand());
      },
      isMinimized: () =>
        d ? d.isMinimized() : (y ?? (s.initiallyMinimized || !1)),
      toggleMute: () => {
        const k = b.toggleMute();
        return (k || b.prime(), d && d.updateSoundButton(k, !1), k);
      },
      isMuted: () => b.isMuted(),
      playAlert: () => b.playAlert(),
      getTargetTime: () => j.getTargetTime(),
      updateConfig: (k) => {
        if (
          (Object.assign(s, k),
          k.defaultMuted !== void 0 && b.setMuted(k.defaultMuted),
          k.soundUrl !== void 0 && b.setSoundUrl(k.soundUrl),
          k.iftarTime !== void 0 ||
            k.alertWindowMinutes !== void 0 ||
            k.autoDismissAfterMinutes !== void 0 ||
            k.celebrationDurationMs !== void 0)
        ) {
          const L = $s(
            s.iftarTime,
            new Date(),
            s.autoDismissAfterMinutes ?? 10
          );
          L &&
            j.updateTarget(
              L,
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
      p || j.start();
    },
    stop: () => {
      j.stop();
    },
    destroy: () => {
      ((p = !0), w && w(), z.dismiss(), j.destroy());
    },
    isMounted: () => d !== null,
    controller: z,
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
function J0(e, t) {
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
const q0 = [
    "classic",
    "midnight",
    "emerald",
    "royal",
    "desert-dusk",
    "platinum-minimal",
    "rose-sahara",
  ],
  e3 = ["none", "soft", "deep"],
  t3 = [
    "lanterns",
    "crescent-stars",
    "geometric",
    "sparkles",
    "banner",
    "eid",
    "eid-fitr",
    "eid-adha",
  ],
  n3 = [
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
  r3 = ["low", "normal", "high"],
  o3 = ["straight", "u-shaped", "dual"],
  a3 = ["ramadan", "eid-fitr", "eid-adha"],
  i3 = ["hide", "top", "show"],
  l3 = ["on", "off"],
  s3 = ["en", "ar"],
  c3 = ["edges", "full"],
  u3 = ["foreground", "background"];
function pc(e) {
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
function d3() {
  (I0(), Q0());
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
function p3() {
  const e = new Date(),
    t = new Date(e.getFullYear(), e.getMonth(), e.getDate() + 1, 0, 0, 1);
  return Math.max(1e3, t.getTime() - e.getTime());
}
function ja(e, t) {
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
  const t = pc(e),
    n = Tr(t);
  let r = "classic";
  typeof e.theme == "string"
    ? (r = Ze(e.theme, q0, "classic", "theme", t))
    : typeof e.theme == "object" && e.theme !== null && (r = e.theme);
  const o = J0(r, e),
    a = Ze(e.variant, t3, "lanterns", "variant", t);
  let i = Ze(e.position, n3, "both", "position", t);
  a === "banner" &&
    ["left", "right", "sides", "start", "end"].includes(i) &&
    (n.warn(
      '[ramadan-overlay] Banner variant does not support vertical side positioning; falling back to "top"'
    ),
    (i = "top"));
  const s = typeof window < "u" && window.innerWidth < 640 ? "low" : "normal",
    c = Ze(e.density, r3, s, "density", t);
  let u = e.ropeStyle;
  u === "u-shape" || u === "curved"
    ? (u = "u-shaped")
    : u === "dual-rope" && (u = "dual");
  const v = Ze(u, o3, "straight", "ropeStyle", t),
    h = Ze(e.mobileSideBehavior, i3, "hide", "mobileSideBehavior", t),
    f = Ze(e.confetti, l3, "on", "confetti", t),
    m = Ze(e.locale, s3, "en", "locale", t),
    S = Un(e.opacity, 0, 1, 0.85),
    b = Un(e.zIndex, -2147483648, 2147483647, 9999),
    T = Un(e.lanternZIndex, -2147483648, 2147483647, 2),
    d = Un(e.ropeSag, 6, 60, 20),
    p =
      typeof e.lanternCount == "number" ? Un(e.lanternCount, 1, 12, 4) : void 0,
    y = Ze(e.shadows, e3, "soft", "shadows", t),
    w = ["crescent-stars", "eid", "eid-fitr", "eid-adha"].includes(a)
      ? "edges"
      : "full",
    C = Ze(e.clearance, c3, w, "clearance", t),
    j = Ze(e.layer, u3, "foreground", "layer", t),
    z = e.attachTo ?? e.mountTarget;
  let k;
  typeof z == "string" && z.trim().length > 0
    ? (k = z.trim())
    : typeof HTMLElement < "u" && z instanceof HTMLElement && (k = z);
  const L = k,
    E = e.attachEdge === "top" ? "top" : "bottom";
  let P = ["ramadan", "eid-fitr", "eid-adha"];
  if (Array.isArray(e.occasions)) {
    const B = e.occasions.filter((U) => a3.includes(U));
    B.length > 0 && (P = B);
  }
  let I;
  if (e.date instanceof Date) I = isNaN(e.date.getTime()) ? void 0 : e.date;
  else if (typeof e.date == "string" || typeof e.date == "number") {
    const B = new Date(e.date);
    I = isNaN(B.getTime()) ? void 0 : B;
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
      date: I,
      debug: t,
      onError: e.onError,
      theme: e.theme ?? "classic",
      themeName: o.name ?? "classic",
      variant: a,
      position: i,
      clearance: C,
      layer: j,
      mountTarget: L,
      attachTo: k,
      attachEdge: E,
      mobileSideBehavior: h,
      opacity: S,
      shadows: y,
      colors: o.colors,
      zIndex: b,
      lanternZIndex: T,
      autoTrigger: e.autoTrigger ?? !0,
      previewMode: e.previewMode ?? !1,
      confetti: f,
      locale: m,
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
      hijriAdjustment: cc(e.region, e.hijriAdjustment),
      density: c,
      intensity: A,
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
  const r = pc(n);
  try {
    let o = Cn({
      date: n.date ?? new Date(),
      region: n.region,
      hijriAdjustment: n.hijriAdjustment,
    });
    const a = Tr(r);
    if (n.autoTrigger && !n.previewMode && o.occasion === "none") {
      const w = n.date ?? new Date();
      a.info(
        `[ramadan-overlay] Overlay dormant: autoTrigger is enabled, but current date (${w.toISOString().slice(0, 10)}) does not fall within configured occasions (${n.occasions.join(", ")}). Pass previewMode: true to force display during development.`
      );
    }
    n.previewMode &&
      a.info(
        "[ramadan-overlay] Preview mode active: overlay forced visible regardless of Hijri calendar date."
      );
    let i = null,
      s = new Date().toDateString();
    const c = (w) => {
        const C = ja(n, w),
          j = on(n),
          z = { ...n, variant: C, position: j };
        ((i = P0(z, w.occasion)), (y.container = i.container));
      },
      u = () => {
        i && (i.cleanup(), (i = null), (y.container = null));
      },
      v = (w, C) => {
        var j, z, k, L;
        if (
          ((!w || w.occasion !== C.occasion) &&
            ((j = n.onOccasionChange) == null || j.call(n, C.occasion, C)),
          (C.isRamadan || n.previewMode) &&
            (!w || !w.isRamadan) &&
            ((z = n.onRamadanStart) == null || z.call(n, C)),
          C.isEid &&
            (!w || !w.isEid) &&
            ((k = n.onEidStart) == null || k.call(n, C)),
          w != null &&
            w.isRamadan &&
            !C.isRamadan &&
            ((L = n.onRamadanEnd) == null || L.call(n)),
          i0(C, n.confetti, n.previewMode))
        ) {
          const E = C.hijriYear || 1447,
            P = Us(C, n);
          bi(E, n.colors, P);
        }
      };
    let h = null;
    const f = () => {
        if (!n.liveTransition || typeof window > "u") return;
        h && clearTimeout(h);
        const w = p3();
        h = setTimeout(() => {
          m();
        }, w);
      },
      m = () => {
        var E, P;
        const w = new Date();
        s = w.toDateString();
        const C = Cn({
            date: w,
            region: n.region,
            hijriAdjustment: n.hijriAdjustment,
          }),
          j = o,
          z = j.occasion,
          k = Gn(j, n),
          L = Gn(C, n);
        ((o = C),
          (y.state = C),
          L
            ? k
              ? z !== C.occasion && (u(), c(C), v(j, C))
              : (c(C), v(j, C))
            : k &&
              (u(),
              (E = n.onOccasionChange) == null || E.call(n, C.occasion, C),
              j.isRamadan && ((P = n.onRamadanEnd) == null || P.call(n))),
          f());
      },
      S = () => {
        new Date().toDateString() !== s && m();
      };
    n.liveTransition &&
      typeof document < "u" &&
      (f(),
      document.addEventListener("visibilitychange", S),
      typeof window < "u" && window.addEventListener("focus", S));
    let b = on(n);
    const T = () => {
      const w = on(n);
      w !== b && ((b = w), i && Gn(o, n) && (u(), c(o)));
    };
    typeof window < "u" &&
      window.addEventListener("resize", T, { passive: !0 });
    const d = (w, C) => w.isRamadan || C.previewMode || !C.autoTrigger;
    let p = null;
    n.countdown &&
      ((p = Hs(n.countdown, {
        isBannerActive: n.variant === "banner",
        hijriYear: o.hijriYear || 1447,
        colors: n.colors,
      })),
      d(o, n) && p.start());
    const y = {
      destroy: () => {
        var w;
        (p && (p.destroy(), (p = null)),
          h && (clearTimeout(h), (h = null)),
          typeof document < "u" &&
            document.removeEventListener("visibilitychange", S),
          typeof window < "u" &&
            (window.removeEventListener("focus", S),
            window.removeEventListener("resize", T)),
          u(),
          o.isRamadan && ((w = n.onRamadanEnd) == null || w.call(n)));
      },
      update: (w) => {
        try {
          t = { ...t, ...w };
          const C = Xr(t);
          if (
            w.date !== void 0 ||
            w.region !== void 0 ||
            w.hijriAdjustment !== void 0
          ) {
            const k = o;
            ((o = Cn({
              date: C.date ?? new Date(),
              region: C.region,
              hijriAdjustment: C.hijriAdjustment,
            })),
              (y.state = o),
              k.occasion !== o.occasion && v(k, o));
          }
          const j = Gn(o, C),
            z = !!i;
          if (j && !z) ((n = C), c(o));
          else if (!j && z) ((n = C), u());
          else if (i) {
            const k = ja(n, o),
              L = ja(C, o),
              E =
                C.variant === "banner" &&
                (JSON.stringify(C.bannerTextEn) !==
                  JSON.stringify(n.bannerTextEn) ||
                  JSON.stringify(C.bannerTextAr) !==
                    JSON.stringify(n.bannerTextAr) ||
                  C.locale !== n.locale),
              P = on(n),
              I = on(C),
              A =
                L !== k ||
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
                E;
            ((n = C), (b = I), A ? (u(), c(o)) : i.updateTokens(C));
          } else ((n = C), (b = on(C)));
          (n.liveTransition ? f() : h && (clearTimeout(h), (h = null)),
            w.countdown !== void 0 &&
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
      setTheme: (w) => {
        y.update({ theme: w });
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
      fireConfetti: async (w) => {
        const C = o.hijriYear || 1447,
          j = w || Us(o, n);
        await bi(C, n.colors, j);
      },
    };
    return (Gn(o, n) && c(o), v(null, o), y);
  } catch (o) {
    return (
      d3(),
      Vs(e.onError, o, r),
      Tr(r).error(
        "[ramadan-overlay] Catastrophic initialization error caught by containment boundary:",
        o
      ),
      Ws(n, ki)
    );
  }
}
function f3(e = {}) {
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
const h3 = (e) => {
    const { config: t, onInstance: n, children: r, ...o } = e,
      a = { ...t, ...o },
      { state: i, instance: s } = f3(a);
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
  v3 = {
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
  fc = "ro_demo_lang";
function g3() {
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
    const e = localStorage.getItem(fc);
    if (e === "ar" || e === "en") return e;
  } catch {}
  return "ar";
}
function hc(e) {
  if (typeof document > "u") return;
  const t = e === "ar" ? "rtl" : "ltr";
  (document.documentElement.setAttribute("dir", t),
    document.documentElement.setAttribute("lang", e));
}
function y3(e) {
  if (!(typeof window > "u")) {
    try {
      localStorage.setItem(fc, e);
    } catch {}
    try {
      hc(e);
    } catch {}
  }
}
const w3 = {
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
  return w3[e] || ["top"];
}
function x3(e) {
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
function Gs(e, t, n) {
  switch (e) {
    case "lanternStyle":
    case "lanternCount":
    case "lanternZIndex":
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
    case "attachTo":
      return !0;
    case "attachEdge":
      return !!(n != null && n.attachTo);
    case "mobileSideBehavior":
      return ["left", "right", "sides", "start", "end"].includes(
        (n == null ? void 0 : n.position) || ""
      );
    default:
      return !1;
  }
}
function Qn(e, t) {
  const n = mc(t);
  let r = e.position;
  return (
    (!r || !n.includes(r)) && (r = x3(t)),
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
          onKeyDown: (h) => {
            r &&
              (h.key === "Enter" || h.key === " ") &&
              (h.preventDefault(), r());
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
      h = Math.round((v / u) * 100);
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
                    h,
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
              "aria-valuenow": h,
              "aria-valuemin": 0,
              "aria-valuemax": 100,
              children: l.jsx("div", {
                className: "ro-progress-fill",
                style: { width: `${h}%` },
              }),
            }),
          ],
        }),
        l.jsx("nav", {
          className: "ro-config-tabs-nav",
          "aria-label": "Configuration Steps",
          children: s.map((f) => {
            const m = f.key === n,
              S = f.step < v;
            return l.jsxs(
              "button",
              {
                type: "button",
                className: `ro-config-tab-btn ${m ? "active" : ""} ${S ? "passed" : ""}`,
                onClick: () => r(f.key),
                "aria-selected": m,
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
  j3 = ({ t: e, activeTab: t, onPrevTab: n, onNextTab: r }) => {
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
  z3 = [
    { id: "lanterns", icon: "🏮" },
    { id: "banner", icon: "🏷️" },
    { id: "crescent-stars", icon: "🌙" },
    { id: "geometric", icon: "💠" },
    { id: "sparkles", icon: "✨" },
    { id: "eid", icon: "🎉" },
    { id: "eid-fitr", icon: "🍬" },
    { id: "eid-adha", icon: "🐑" },
  ],
  E3 = ({ t: e, activeVariant: t, onSelectVariant: n }) =>
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
          children: z3.map(({ id: r, icon: o }) => {
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
  N3 = ({ customTheme: e, onChangeColor: t, onReset: n, translations: r }) => {
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
  M3 = [
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
      h = c.previewMode ?? !0,
      f = c.debug ?? !1;
    return l.jsxs("div", {
      className: "ro-tab-content-pane",
      children: [
        l.jsx(E3, { t: e, activeVariant: t, onSelectVariant: n }),
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
                    onChange: (m) => o(m.target.value),
                    children: [
                      l.jsx("optgroup", {
                        label: "Theme Presets",
                        children: M3.map((m) =>
                          l.jsx(
                            "option",
                            {
                              value: m,
                              children:
                                e.workbench.universal.themeOptions[m] || m,
                            },
                            m
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
                children: l.jsx(N3, {
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
                          onClick: (m) => m.stopPropagation(),
                        }),
                        l.jsx("span", { className: "toggle-slider" }),
                      ],
                    }),
                  ],
                }),
                l.jsxs("div", {
                  className: "form-toggle-wrap",
                  onClick: () => u({ previewMode: !h }),
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
                          checked: h,
                          onChange: () => u({ previewMode: !h }),
                          onClick: (m) => m.stopPropagation(),
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
                          onClick: (m) => m.stopPropagation(),
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
                      onChange: (m) => u({ locale: m.target.value }),
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
      h = o.clearance || "edges",
      f = c === ".celestial-nav",
      m = !!(c && typeof c == "string" && !f),
      [S, b] = za.useState(m);
    return (
      za.useEffect(() => {
        m && b(!0);
      }, [m]),
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
                      value: S || m ? "custom" : f ? "header" : "overlay",
                      onChange: (T) => {
                        T.target.value === "overlay"
                          ? (b(!1), a({ attachTo: void 0 }))
                          : T.target.value === "header"
                            ? (b(!1), a({ attachTo: ".celestial-nav" }))
                            : (b(!0),
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
                    (S || m) &&
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
                (!!c || S) &&
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
                      value: h,
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
    var T, d, p, y, w, C, j, z;
    const r = t.opacity ?? 0.85,
      o = t.shadows || "soft",
      a = t.confetti === "off" ? "off" : "on",
      i = t.variant === "lanterns",
      s = t.lanternStyle ?? 0,
      c = t.lanternCount,
      u = t.lanternZIndex ?? 2,
      v = t.ropeStyle || "straight",
      h = t.ropeSag ?? 20,
      f = t.ceilingColor || "#c9a84c",
      m = t.ropeColor || "#c9a84c",
      S = t.density || "normal",
      b =
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
                          [...Array(12)].map((k, L) =>
                            l.jsxs(
                              "option",
                              { value: L + 1, children: ["Design #", L + 1] },
                              L + 1
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
                          const L = parseInt(k.target.value, 10);
                          n({ lanternCount: L === 0 ? void 0 : L });
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
                              ((y =
                                e.workbench.variantSpecific
                                  .lanternZIndexOptions) == null
                                ? void 0
                                : y["100"]) || "100 (High)",
                          }),
                          l.jsx("option", {
                            value: 9999,
                            children:
                              ((w =
                                e.workbench.variantSpecific
                                  .lanternZIndexOptions) == null
                                ? void 0
                                : w["9999"]) || "9999 (Topmost)",
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
                              children: [h, "px"],
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
                          value: h,
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
                            value: m.startsWith("#") ? m : "#c9a84c",
                            onChange: (k) => n({ ropeColor: k.target.value }),
                          }),
                          l.jsx("span", {
                            className: "color-code font-mono",
                            children: m,
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
                        value: S,
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
                              ((j =
                                e.workbench.variantSpecific.densityOptions) ==
                              null
                                ? void 0
                                : j.normal) || "Normal (Balanced)",
                          }),
                          l.jsx("option", {
                            value: "high",
                            children:
                              ((z =
                                e.workbench.variantSpecific.densityOptions) ==
                              null
                                ? void 0
                                : z.high) || "High (Festive)",
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
                              b,
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
                        value: b,
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
    var v, h, f, m, S, b, T, d, p, y, w, C, j, z, k, L;
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
      u = (E) => {
        let P;
        (a.includes(E) ? (P = a.filter((I) => I !== E)) : (P = [...a, E]),
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
                    onChange: (E) => n({ region: E.target.value }),
                    children: P3.map((E) =>
                      l.jsx(
                        "option",
                        {
                          value: E,
                          children: e.workbench.calendar.regions[E] || E,
                        },
                        E
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
                      onChange: (E) =>
                        n({ hijriAdjustment: parseInt(E.target.value, 10) }),
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
                        onChange: (E) => {
                          const P = E.target.value;
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
                    onChange: (E) => n({ eidVariant: E.target.value }),
                    children: [
                      l.jsx("option", {
                        value: "eid",
                        children:
                          ((h =
                            (v = e.workbench.variants) == null
                              ? void 0
                              : v.eid) == null
                            ? void 0
                            : h.name) || "Eid Celebrations Suite",
                      }),
                      l.jsx("option", {
                        value: "eid-fitr",
                        children:
                          ((m =
                            (f = e.workbench.variants) == null
                              ? void 0
                              : f["eid-fitr"]) == null
                            ? void 0
                            : m.name) || "Eid Al-Fitr",
                      }),
                      l.jsx("option", {
                        value: "eid-adha",
                        children:
                          ((b =
                            (S = e.workbench.variants) == null
                              ? void 0
                              : S["eid-adha"]) == null
                            ? void 0
                            : b.name) || "Eid Al-Adha",
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
                          ((y =
                            (p = e.workbench.variants) == null
                              ? void 0
                              : p["crescent-stars"]) == null
                            ? void 0
                            : y.name) || "Ascending Crescent & Stars",
                      }),
                      l.jsx("option", {
                        value: "geometric",
                        children:
                          ((C =
                            (w = e.workbench.variants) == null
                              ? void 0
                              : w.geometric) == null
                            ? void 0
                            : C.name) || "Islamic Geometric Patterns",
                      }),
                      l.jsx("option", {
                        value: "sparkles",
                        children:
                          ((z =
                            (j = e.workbench.variants) == null
                              ? void 0
                              : j.sparkles) == null
                            ? void 0
                            : z.name) || "Luminous Star Sparkles",
                      }),
                      l.jsx("option", {
                        value: "banner",
                        children:
                          ((L =
                            (k = e.workbench.variants) == null
                              ? void 0
                              : k.banner) == null
                            ? void 0
                            : L.name) || "Greeting Banner",
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
                children: R3.map((E) => {
                  var I;
                  const P = a.includes(E.id);
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
                          onChange: () => u(E.id),
                        }),
                        l.jsx("span", {
                          children:
                            ((I = e.workbench.calendar.occasionOptions) == null
                              ? void 0
                              : I[E.id]) || E.labelKey,
                        }),
                      ],
                    },
                    E.id
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
                      onClick: (E) => E.stopPropagation(),
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
      h = u.position || "bottom-right",
      f = u.alertWindowMinutes ?? 30,
      m = u.minimizable ?? !0,
      S = u.initiallyMinimized ?? !1,
      b = u.autoDismissAfterMinutes ?? 10,
      T = u.celebrationDurationMs ?? 3e4,
      d = u.sound ?? !0,
      p = u.defaultMuted ?? !0,
      y = typeof u.soundUrl == "string" ? u.soundUrl : "",
      w = (j) => {
        n({ countdown: { ...u, ...j } });
      },
      C = () => {
        n(
          c
            ? { countdown: !1 }
            : { countdown: { ...u, iftarTime: v, position: h } }
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
                      onChange: (j) => n({ bannerTextAr: j.target.value }),
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
                      onChange: (j) => n({ bannerTextEn: j.target.value }),
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
                          onChange: (j) => n({ bannerBg: j.target.value }),
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
                          onChange: (j) =>
                            n({ bannerTextColor: j.target.value }),
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
                          onChange: (j) =>
                            n({ bannerIconColor: j.target.value }),
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
                      onClick: (j) => j.stopPropagation(),
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
                        onChange: (j) => w({ iftarTime: j.target.value }),
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
                        value: h,
                        onChange: (j) => w({ position: j.target.value }),
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
                        onChange: (j) => {
                          const z = parseInt(j.target.value, 10);
                          w({ alertWindowMinutes: isNaN(z) ? 30 : z });
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
                        value: b,
                        onChange: (j) => {
                          const z = parseInt(j.target.value, 10);
                          w({ autoDismissAfterMinutes: isNaN(z) ? 10 : z });
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
                        onChange: (j) => {
                          const z = parseInt(j.target.value, 10);
                          w({ celebrationDurationMs: isNaN(z) ? 3e4 : z });
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
                        value: y,
                        onChange: (j) => w({ soundUrl: j.target.value || !1 }),
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
                              checked: m,
                              onChange: (j) =>
                                w({ minimizable: j.target.checked }),
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
                              checked: S,
                              onChange: (j) =>
                                w({ initiallyMinimized: j.target.checked }),
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
                              onChange: (j) => w({ sound: j.target.checked }),
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
                              onChange: (j) =>
                                w({ defaultMuted: j.target.checked }),
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
  B3 = ({ t: e, locale: t, config: n, themeName: r, onResetDefaults: o }) => {
    var m, S, b, T, d, p, y, w;
    const [a, i] = Y.useState(!1),
      [s, c] = Y.useState(!1),
      u = { ...n };
    (r !== "custom" && (u.theme = r),
      n.date instanceof Date && (u.date = n.date.toISOString().slice(0, 10)));
    const v = `<!-- Ramadan & Eid Festive Overlay (CDN Drop-in) -->
<script src="https://cdn.jsdelivr.net/npm/ramadan-overlay/dist/index.global.js"><\/script>
<script>
  // Initialize overlay automatically
  const overlay = RamadanOverlay.init(${JSON.stringify(u, null, 2)});
<\/script>`,
      h = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
          (i(!0), setTimeout(() => i(!1), 2200));
        });
      },
      f = () => {
        navigator.clipboard.writeText(v).then(() => {
          (c(!0), setTimeout(() => c(!1), 2200));
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
              l.jsx("span", { children: "💻" }),
              l.jsx("span", {
                children:
                  ((m = e.workbench.exportStudio) == null
                    ? void 0
                    : m.heading) || e.workbench.tabs.codeExport,
              }),
            ],
          }),
          l.jsx("p", {
            className: "form-help",
            style: { marginBottom: "16px", fontSize: "0.9rem" },
            children:
              (S = e.workbench.exportStudio) == null ? void 0 : S.description,
          }),
          l.jsxs("div", {
            style: {
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              marginBottom: "20px",
            },
            children: [
              l.jsxs("button", {
                type: "button",
                className: "btn-primary",
                onClick: h,
                style: {
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                },
                children: [
                  l.jsx("span", { children: "🔗" }),
                  l.jsx("span", {
                    children: a
                      ? ((b = e.workbench.exportStudio) == null
                          ? void 0
                          : b.linkCopied) || "Link Copied!"
                      : ((T = e.workbench.exportStudio) == null
                          ? void 0
                          : T.copyLink) || "Copy Shareable Link",
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
                        ((d = e.workbench.exportStudio) == null
                          ? void 0
                          : d.resetDefaults) || e.workbench.stepper.reset,
                    }),
                  ],
                }),
            ],
          }),
          l.jsxs("div", {
            style: { marginTop: "16px" },
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
                      ((p = e.workbench.exportStudio) == null
                        ? void 0
                        : p.cdnHeading) || "CDN Script Tag",
                  }),
                  l.jsx("button", {
                    type: "button",
                    className: "btn-outline btn-sm",
                    onClick: f,
                    children: s
                      ? ((y = e.workbench.exportStudio) == null
                          ? void 0
                          : y.cdnCopied) || "Copied!"
                      : ((w = e.workbench.exportStudio) == null
                          ? void 0
                          : w.copyCdn) || "Copy Script",
                  }),
                ],
              }),
              l.jsx("pre", {
                className: "code-pre",
                style: {
                  maxHeight: "220px",
                  padding: "12px 14px",
                  background: "rgba(10, 14, 26, 0.8)",
                  borderRadius: "var(--radius-md)",
                  fontSize: "0.82rem",
                  lineHeight: 1.45,
                },
                children: l.jsx("code", { children: v }),
              }),
            ],
          }),
        ],
      }),
    });
  },
  F3 = ({ t: e, locale: t, config: n, themeName: r }) => {
    const [o, a] = Y.useState("react"),
      [i, s] = Y.useState(!1),
      c = n.variant || "lanterns",
      u = {};
    (n.variant && n.variant !== "lanterns" && (u.variant = n.variant),
      r &&
        r !== "classic" &&
        (u.theme = typeof n.theme == "object" ? n.theme : r),
      n.position &&
        n.position !== "top" &&
        n.position !== "both" &&
        (u.position = n.position),
      n.opacity !== void 0 && n.opacity !== 0.85 && (u.opacity = n.opacity),
      n.layer && n.layer !== "foreground" && (u.layer = n.layer),
      Gs("shadows", c) &&
        n.shadows &&
        n.shadows !== "soft" &&
        (u.shadows = n.shadows),
      n.autoTrigger !== void 0 && !n.autoTrigger && (u.autoTrigger = !1),
      n.countdown && (u.countdown = !0),
      n.confetti === "off" && (u.confetti = "off"),
      n.attachTo &&
        ((u.attachTo = n.attachTo),
        n.attachEdge && (u.attachEdge = n.attachEdge)),
      n.mobileSideBehavior &&
        n.mobileSideBehavior !== "hide" &&
        (u.mobileSideBehavior = n.mobileSideBehavior),
      n.lanternCount && (u.lanternCount = n.lanternCount),
      n.lanternZIndex !== void 0 &&
        n.lanternZIndex !== 2 &&
        (u.lanternZIndex = n.lanternZIndex));
    const v = [
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
    for (const S of v) Gs(S, c, n) && n[S] !== void 0 && (u[S] = n[S]);
    const h = JSON.stringify(u, null, 2),
      f = () => {
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
        ${Object.entries(u).map(([b, T]) =>
          typeof T == "string"
            ? `${b}="${T}"`
            : typeof T == "boolean"
              ? T
                ? b
                : `${b}={false}`
              : `${b}={${JSON.stringify(T)}}`
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
const overlay = init(${h});

// Cleanup when leaving the page
// overlay.destroy();`;
          case "vue":
            return `<!-- 1. Install: npm install ramadan-overlay -->
<script setup>
import { RamadanOverlay } from 'ramadan-overlay/vue';

const config = ${h};
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

  const config = ${h};
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
  config = ${h};
}`;
          case "ai":
            return t === "ar"
              ? `أريد إضافة زينة رمضانية واحتفالية لمشروعي باستخدام مكتبة ramadan-overlay.
يرجى تثبيت الحزمة عبر npm install ramadan-overlay وتضمين الزينة بالإعدادات التالية:

- نمط الزخرفة (Overlay Variant): ${u.variant || "lanterns"}
- السمة اللونية (Theme): ${typeof u.theme == "string" ? u.theme : "custom"}
- الموضع (Position): ${u.position || "top"}
- الشفافية (Opacity): ${u.opacity ?? 0.85}
- العداد التنازلي لوقت الإفطار: ${u.countdown ? "مفعّل" : "معطل"}
- الكشف التلقائي بالتقويم الهجري: ${u.autoTrigger !== !1 ? "مفعّل" : "معطل"}

كود التهيئة المقترح:
${h}

يرجى مراعاة تنظيف دورة الحياة عند تدمير المكون والتأكد من توافق أنماط العرض.`
              : `I want to add Ramadan and Eid festive decorations to my web application using the ramadan-overlay library.
Please install the package via npm install ramadan-overlay and configure the overlay with the following parameters:

- Overlay Variant: ${u.variant || "lanterns"}
- Theme: ${typeof u.theme == "string" ? u.theme : "custom"}
- Position: ${u.position || "top"}
- Opacity: ${u.opacity ?? 0.85}
- Iftar Countdown Widget: ${u.countdown ? "Enabled" : "Disabled"}
- Auto Hijri Trigger: ${u.autoTrigger !== !1 ? "Enabled" : "Disabled"}

Target Configuration:
${h}

Please ensure clean lifecycle cleanup on component unmount and smooth z-index integration.`;
          default:
            return "";
        }
      },
      m = () => {
        const S = f();
        navigator.clipboard.writeText(S).then(() => {
          (s(!0), setTimeout(() => s(!1), 2200));
        });
      };
    return l.jsxs("div", {
      className: "panel-card code-viewer-card",
      children: [
        l.jsxs("h3", {
          className: "panel-heading",
          children: [
            l.jsx("span", { children: "💻" }),
            l.jsx("span", { children: e.workbench.code.heading }),
          ],
        }),
        l.jsx("div", {
          className: "code-tabs",
          children: ["react", "vanilla", "vue", "svelte", "angular", "ai"].map(
            (S) =>
              l.jsx(
                "button",
                {
                  className: `code-tab-btn ${o === S ? "active" : ""}`,
                  onClick: () => a(S),
                  children: e.workbench.code.tabs[S],
                },
                S
              )
          ),
        }),
        l.jsxs("div", {
          className: "code-box-container",
          children: [
            l.jsx("button", {
              className: `code-copy-floating ${i ? "copied" : ""}`,
              onClick: m,
              children: i
                ? o === "ai"
                  ? e.workbench.code.promptSeamCopiedBtn
                  : e.workbench.code.copiedBtn
                : o === "ai"
                  ? e.workbench.code.copyPromptSeamBtn
                  : e.workbench.code.copyBtn,
            }),
            l.jsx("pre", {
              className: "code-pre",
              children: l.jsx("code", { children: f() }),
            }),
          ],
        }),
      ],
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
    onToggleAutoTrigger: h,
    onToggleCountdown: f,
  }) => {
    const [m, S] = Y.useState("variantTheme"),
      b = n.variant || "lanterns",
      T = n.position || "top",
      d = () => {
        const w = pt.indexOf(m);
        w > 0 && S(pt[w - 1]);
      },
      p = () => {
        const w = pt.indexOf(m);
        w < pt.length - 1 && S(pt[w + 1]);
      },
      y = () => {
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
        l.jsxs("div", {
          className: "workbench-grid",
          children: [
            l.jsxs("div", {
              className: "controls-column ro-controls-column-studio",
              children: [
                l.jsx(T3, {
                  t: e,
                  locale: t,
                  activeTab: m,
                  onSelectTab: S,
                  onPrevTab: d,
                  onNextTab: p,
                  onResetDefaults: y,
                }),
                l.jsxs("div", {
                  className: "ro-tab-viewport",
                  children: [
                    m === "variantTheme" &&
                      l.jsx(A3, {
                        t: e,
                        activeVariant: b,
                        onSelectVariant: a,
                        themeName: r,
                        onChangeTheme: s,
                        customTheme: o,
                        onUpdateCustomColor: u,
                        onResetCustomColors: v,
                        config: n,
                        onUpdateConfig: c,
                      }),
                    m === "layout" &&
                      l.jsx(I3, {
                        t: e,
                        variant: b,
                        position: T,
                        onChangePosition: i,
                        config: n,
                        onUpdateConfig: c,
                      }),
                    m === "styling" &&
                      l.jsx(D3, { t: e, config: n, onUpdateConfig: c }),
                    m === "calendar" &&
                      l.jsx(_3, { t: e, config: n, onUpdateConfig: c }),
                    m === "countdownBanner" &&
                      l.jsx(O3, { t: e, config: n, onUpdateConfig: c }),
                    m === "codeExport" &&
                      l.jsx(B3, {
                        t: e,
                        locale: t,
                        config: n,
                        themeName: r,
                        onResetDefaults: y,
                      }),
                    l.jsx(j3, {
                      t: e,
                      activeTab: m,
                      onPrevTab: d,
                      onNextTab: p,
                    }),
                  ],
                }),
              ],
            }),
            l.jsx("div", {
              className: "code-column",
              children: l.jsx(F3, { t: e, locale: t, config: n, themeName: r }),
            }),
          ],
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
        var h;
        return (h = o == null ? void 0 : o.minimize) == null
          ? void 0
          : h.call(o);
      },
      c = () => {
        var h;
        return (h = o == null ? void 0 : o.expand) == null ? void 0 : h.call(o);
      },
      u = () => {
        if (o) {
          const h = o.toggleMute();
          r(h);
        }
      },
      v = () => {
        var h;
        (h = o == null ? void 0 : o.playAlert) == null || h.call(o);
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
      i = (m, S = "#7ee787") => {
        const b = new Date().toISOString().slice(11, 19),
          T = `${Date.now()}-${Math.random()}`;
        n((d) => [...d, { id: T, time: b, msg: m, color: S }]);
      };
    (Y.useEffect(() => {
      a.current && (a.current.scrollTop = a.current.scrollHeight);
    }, [t]),
      Y.useEffect(() => {
        const m = console.warn,
          S = console.error;
        return (
          (console.warn = (...b) => {
            m.apply(console, b);
            const T = b
              .map((d) =>
                typeof d == "object" ? JSON.stringify(d) : String(d)
              )
              .join(" ");
            T.includes("[ramadan-overlay]") && i(T, "#e3b341");
          }),
          (console.error = (...b) => {
            S.apply(console, b);
            const T = b
              .map((d) =>
                typeof d == "object" ? JSON.stringify(d) : String(d)
              )
              .join(" ");
            T.includes("[ramadan-overlay]") && i(T, "#f85149");
          }),
          () => {
            ((console.warn = m), (console.error = S));
          }
        );
      }, []));
    const s = () => {
        i("Testing defensive config clamping...", "#e3b341");
        try {
          const m = uo({
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
            m.destroy());
        } catch (m) {
          i(`❌ Clamping failed: ${m}`, "#f85149");
        }
      },
      c = () => {
        i("Testing invalid Date input resilience...", "#e3b341");
        try {
          const m = Cn(new Date(NaN), 0, !0),
            S = Cn(null, 0, !0);
          (i(
            `✅ Result: getRamadanState(NaN) -> occasion: '${m.occasion}', isRamadan: ${m.isRamadan}`,
            "#7ee787"
          ),
            i(
              `✅ Result: getRamadanState(null) -> occasion: '${S.occasion}', isRamadan: ${S.isRamadan}`,
              "#7ee787"
            ));
        } catch (m) {
          i(`❌ Date test failed: ${m}`, "#f85149");
        }
      },
      u = () => {
        i(
          "Testing Error Containment Boundary & Atomic DOM Rollback...",
          "#e3b341"
        );
        const m = document.createElement;
        let S = 0;
        document.createElement = function (b) {
          if (b.toLowerCase() === "style" && ++S === 1)
            throw new Error(
              "Simulated catastrophic CSS stylesheet mounting crash"
            );
          return m.call(document, b);
        };
        try {
          const b = uo({
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
            b.destroy());
        } catch (b) {
          i(`❌ Crash escaped boundary: ${b}`, "#f85149");
        } finally {
          document.createElement = m;
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
        } catch (m) {
          i(`❌ onError escaped boundary: ${m}`, "#f85149");
        }
      },
      h = () => {
        const m = !r;
        (o(m),
          i(
            `Debug mode toggled: ${m ? "ON" : "OFF"}`,
            m ? "#7ee787" : "#8b8f98"
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
              onClick: h,
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
          children: t.map((m) =>
            l.jsxs(
              "div",
              {
                className: "lab-terminal-line",
                style: { color: m.color },
                children: ["[", m.time, "] ", m.msg],
              },
              m.id
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
  Qs = {
    colors: ["#c9a84c", "#e5c158", "#9a7b2c", "#f3e5ab", "#1b3b2b", "#0f172a"],
    glowColor: "rgba(201,168,76,0.55)",
    ceilingColor: "#c9a84c",
    ropeColor: "#c9a84c",
    bannerBg: "rgba(15,15,20,0.92)",
    bannerTextColor: "#f1f5f9",
    bannerIconColor: "#c9a84c",
  },
  G3 = () => {
    const [e, t] = Y.useState(g3),
      n = e === "ar" ? m3 : v3,
      [r, o] = Y.useState(!0),
      [a, i] = Y.useState("classic"),
      [s, c] = Y.useState("ramadan"),
      [u, v] = Y.useState(!1),
      [h, f] = Y.useState(null),
      [m, S] = Y.useState(Qs),
      [b, T] = Y.useState({
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
      (hc(e), y3(e));
    }, [e]),
      Y.useEffect(() => {
        try {
          const A = window.location.hash.replace(/^#/, "");
          if (A) {
            const B = new URLSearchParams(A),
              U = B.get("variant"),
              G = B.get("theme"),
              le = B.get("position"),
              N = B.get("occasion");
            (U &&
              T((H) => Qn({ ...H, variant: U, position: le || H.position }, U)),
              G && i(G),
              N && c(N));
          }
        } catch {}
      }, []),
      Y.useEffect(() => {
        try {
          const A = new URLSearchParams();
          (b.variant && A.set("variant", b.variant),
            a && A.set("theme", a),
            b.position && A.set("position", b.position),
            A.set("occasion", s),
            A.set("lang", e),
            window.history.replaceState(null, "", `#${A.toString()}`));
        } catch {}
      }, [b.variant, b.position, a, s, e]));
    const d = r
        ? { ...b, theme: a === "custom" ? m : a, previewMode: !0 }
        : { autoTrigger: !1, previewMode: !1 },
      p = () => {
        t((A) => (A === "ar" ? "en" : "ar"));
      },
      y = () => {
        o((A) => !A);
      },
      w = () => {
        var A;
        if ((A = h == null ? void 0 : h.countdown) != null && A.playAlert)
          h.countdown.playAlert();
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
        h != null && h.fireConfetti && h.fireConfetti(s);
      },
      j = (A) => {
        T((B) => Qn(B, A));
      },
      z = (A) => {
        T((B) => ({ ...B, position: A }));
      },
      k = (A) => {
        i(A);
      },
      L = (A) => {
        T((B) => ({ ...B, ...A }));
      },
      E = (A, B) => {
        S((U) => {
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
          return A === "primaryColor"
            ? ((G[0] = B), { ...U, colors: G })
            : A === "accentColor"
              ? ((G[3] = B), { ...U, colors: G })
              : { ...U, [A]: B };
        });
      },
      P = () => {
        S(Qs);
      },
      I = (A) => {
        (c(A),
          T(
            A === "eid-fitr"
              ? (B) =>
                  Qn(
                    {
                      ...B,
                      bannerTextAr: "عِيد فِطْر مُبَارَك",
                      bannerTextEn: "Eid Al-Fitr Mubarak",
                    },
                    "eid-fitr"
                  )
              : A === "eid-adha"
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
          onToggleOverlay: y,
          onPlayChime: w,
          onFireConfetti: C,
          onToggleDrawer: () => v((A) => !A),
        }),
        r && l.jsx(h3, { config: d, onInstance: f }),
        l.jsxs("main", {
          children: [
            l.jsx(C3, {
              t: n,
              locale: e,
              occasion: s,
              onFireConfetti: C,
              onScrollToWorkbench: () => {
                var A;
                (A = document.getElementById("workbench")) == null ||
                  A.scrollIntoView({ behavior: "smooth" });
              },
              onScrollToLab: () => {
                var A;
                (A = document.getElementById("lab")) == null ||
                  A.scrollIntoView({ behavior: "smooth" });
              },
            }),
            l.jsx($3, {
              t: n,
              locale: e,
              config: b,
              themeName: a,
              customTheme: m,
              onSelectVariant: j,
              onChangePosition: z,
              onChangeTheme: k,
              onUpdateConfig: L,
              onUpdateCustomColor: E,
              onResetCustomColors: P,
              onToggleAutoTrigger: () =>
                T((A) => ({ ...A, autoTrigger: !A.autoTrigger })),
              onToggleCountdown: () =>
                T((A) => ({ ...A, countdown: !A.countdown })),
            }),
            l.jsx(W3, { t: n, overlayInstance: h }),
          ],
        }),
        l.jsx(U3, { t: n }),
      ],
    });
  },
  Ys = document.getElementById("root");
Ys &&
  Ea.createRoot(Ys).render(l.jsx(za.StrictMode, { children: l.jsx(G3, {}) }));
