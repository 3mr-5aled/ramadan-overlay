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
function bc(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var Y1 = { exports: {} },
  Do = {},
  K1 = { exports: {} },
  Q = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Er = Symbol.for("react.element"),
  Cc = Symbol.for("react.portal"),
  zc = Symbol.for("react.fragment"),
  Ec = Symbol.for("react.strict_mode"),
  Tc = Symbol.for("react.profiler"),
  Mc = Symbol.for("react.provider"),
  Nc = Symbol.for("react.context"),
  jc = Symbol.for("react.forward_ref"),
  Ac = Symbol.for("react.suspense"),
  Lc = Symbol.for("react.memo"),
  Pc = Symbol.for("react.lazy"),
  El = Symbol.iterator;
function Ic(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (El && e[El]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var Z1 = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  X1 = Object.assign,
  J1 = {};
function An(e, t, n) {
  ((this.props = e),
    (this.context = t),
    (this.refs = J1),
    (this.updater = n || Z1));
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
function q1() {}
q1.prototype = An.prototype;
function Ei(e, t, n) {
  ((this.props = e),
    (this.context = t),
    (this.refs = J1),
    (this.updater = n || Z1));
}
var Ti = (Ei.prototype = new q1());
Ti.constructor = Ei;
X1(Ti, An.prototype);
Ti.isPureReactComponent = !0;
var Tl = Array.isArray,
  es = Object.prototype.hasOwnProperty,
  Mi = { current: null },
  ts = { key: !0, ref: !0, __self: !0, __source: !0 };
function ns(e, t, n) {
  var r,
    o = {},
    a = null,
    i = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (i = t.ref),
    t.key !== void 0 && (a = "" + t.key),
    t))
      es.call(t, r) && !ts.hasOwnProperty(r) && (o[r] = t[r]);
  var l = arguments.length - 2;
  if (l === 1) o.children = n;
  else if (1 < l) {
    for (var u = Array(l), c = 0; c < l; c++) u[c] = arguments[c + 2];
    o.children = u;
  }
  if (e && e.defaultProps)
    for (r in ((l = e.defaultProps), l)) o[r] === void 0 && (o[r] = l[r]);
  return {
    $$typeof: Er,
    type: e,
    key: a,
    ref: i,
    props: o,
    _owner: Mi.current,
  };
}
function _c(e, t) {
  return {
    $$typeof: Er,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function Ni(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Er;
}
function Dc(e) {
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
    ? Dc("" + e.key)
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
          case Er:
          case Cc:
            i = !0;
        }
    }
  if (i)
    return (
      (i = e),
      (o = o(i)),
      (e = r === "" ? "." + qo(i, 0) : r),
      Tl(o)
        ? ((n = ""),
          e != null && (n = e.replace(Ml, "$&/") + "/"),
          Jr(o, t, n, "", function (c) {
            return c;
          }))
        : o != null &&
          (Ni(o) &&
            (o = _c(
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
  if (((i = 0), (r = r === "" ? "." : r + ":"), Tl(e)))
    for (var l = 0; l < e.length; l++) {
      a = e[l];
      var u = r + qo(a, l);
      i += Jr(a, t, n, u, o);
    }
  else if (((u = Ic(e)), typeof u == "function"))
    for (e = u.call(e), l = 0; !(a = e.next()).done;)
      ((a = a.value), (u = r + qo(a, l++)), (i += Jr(a, t, n, u, o)));
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
function Rc(e) {
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
var Te = { current: null },
  qr = { transition: null },
  Oc = {
    ReactCurrentDispatcher: Te,
    ReactCurrentBatchConfig: qr,
    ReactCurrentOwner: Mi,
  };
function rs() {
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
Q.Component = An;
Q.Fragment = zc;
Q.Profiler = Tc;
Q.PureComponent = Ei;
Q.StrictMode = Ec;
Q.Suspense = Ac;
Q.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Oc;
Q.act = rs;
Q.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        "."
    );
  var r = X1({}, e.props),
    o = e.key,
    a = e.ref,
    i = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((a = t.ref), (i = Mi.current)),
      t.key !== void 0 && (o = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var l = e.type.defaultProps;
    for (u in t)
      es.call(t, u) &&
        !ts.hasOwnProperty(u) &&
        (r[u] = t[u] === void 0 && l !== void 0 ? l[u] : t[u]);
  }
  var u = arguments.length - 2;
  if (u === 1) r.children = n;
  else if (1 < u) {
    l = Array(u);
    for (var c = 0; c < u; c++) l[c] = arguments[c + 2];
    r.children = l;
  }
  return { $$typeof: Er, type: e.type, key: o, ref: a, props: r, _owner: i };
};
Q.createContext = function (e) {
  return (
    (e = {
      $$typeof: Nc,
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
Q.createElement = ns;
Q.createFactory = function (e) {
  var t = ns.bind(null, e);
  return ((t.type = e), t);
};
Q.createRef = function () {
  return { current: null };
};
Q.forwardRef = function (e) {
  return { $$typeof: jc, render: e };
};
Q.isValidElement = Ni;
Q.lazy = function (e) {
  return { $$typeof: Pc, _payload: { _status: -1, _result: e }, _init: Rc };
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
Q.unstable_act = rs;
Q.useCallback = function (e, t) {
  return Te.current.useCallback(e, t);
};
Q.useContext = function (e) {
  return Te.current.useContext(e);
};
Q.useDebugValue = function () {};
Q.useDeferredValue = function (e) {
  return Te.current.useDeferredValue(e);
};
Q.useEffect = function (e, t) {
  return Te.current.useEffect(e, t);
};
Q.useId = function () {
  return Te.current.useId();
};
Q.useImperativeHandle = function (e, t, n) {
  return Te.current.useImperativeHandle(e, t, n);
};
Q.useInsertionEffect = function (e, t) {
  return Te.current.useInsertionEffect(e, t);
};
Q.useLayoutEffect = function (e, t) {
  return Te.current.useLayoutEffect(e, t);
};
Q.useMemo = function (e, t) {
  return Te.current.useMemo(e, t);
};
Q.useReducer = function (e, t, n) {
  return Te.current.useReducer(e, t, n);
};
Q.useRef = function (e) {
  return Te.current.useRef(e);
};
Q.useState = function (e) {
  return Te.current.useState(e);
};
Q.useSyncExternalStore = function (e, t, n) {
  return Te.current.useSyncExternalStore(e, t, n);
};
Q.useTransition = function () {
  return Te.current.useTransition();
};
Q.version = "18.3.1";
K1.exports = Q;
var X = K1.exports;
const Ta = bc(X);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Bc = X,
  Fc = Symbol.for("react.element"),
  $c = Symbol.for("react.fragment"),
  Vc = Object.prototype.hasOwnProperty,
  Hc = Bc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  Uc = { key: !0, ref: !0, __self: !0, __source: !0 };
function os(e, t, n) {
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
    $$typeof: Fc,
    type: e,
    key: a,
    ref: i,
    props: o,
    _owner: Hc.current,
  };
}
Do.Fragment = $c;
Do.jsx = os;
Do.jsxs = os;
Y1.exports = Do;
var s = Y1.exports,
  Ma = {},
  as = { exports: {} },
  Be = {},
  is = { exports: {} },
  ls = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(M, V) {
    var y = M.length;
    M.push(V);
    e: for (; 0 < y;) {
      var v = (y - 1) >>> 1,
        I = M[v];
      if (0 < o(I, V)) ((M[v] = V), (M[y] = I), (y = v));
      else break e;
    }
  }
  function n(M) {
    return M.length === 0 ? null : M[0];
  }
  function r(M) {
    if (M.length === 0) return null;
    var V = M[0],
      y = M.pop();
    if (y !== V) {
      M[0] = y;
      e: for (var v = 0, I = M.length, F = I >>> 1; v < F;) {
        var H = 2 * (v + 1) - 1,
          D = M[H],
          $ = H + 1,
          B = M[$];
        if (0 > o(D, y))
          $ < I && 0 > o(B, D)
            ? ((M[v] = B), (M[$] = y), (v = $))
            : ((M[v] = D), (M[H] = y), (v = H));
        else if ($ < I && 0 > o(B, y)) ((M[v] = B), (M[$] = y), (v = $));
        else break e;
      }
    }
    return V;
  }
  function o(M, V) {
    var y = M.sortIndex - V.sortIndex;
    return y !== 0 ? y : M.id - V.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var a = performance;
    e.unstable_now = function () {
      return a.now();
    };
  } else {
    var i = Date,
      l = i.now();
    e.unstable_now = function () {
      return i.now() - l;
    };
  }
  var u = [],
    c = [],
    h = 1,
    p = null,
    m = 3,
    w = !1,
    b = !1,
    S = !1,
    z = typeof setTimeout == "function" ? setTimeout : null,
    f = typeof clearTimeout == "function" ? clearTimeout : null,
    d = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function g(M) {
    for (var V = n(c); V !== null;) {
      if (V.callback === null) r(c);
      else if (V.startTime <= M)
        (r(c), (V.sortIndex = V.expirationTime), t(u, V));
      else break;
      V = n(c);
    }
  }
  function x(M) {
    if (((S = !1), g(M), !b))
      if (n(u) !== null) ((b = !0), G(k));
      else {
        var V = n(c);
        V !== null && le(x, V.startTime - M);
      }
  }
  function k(M, V) {
    ((b = !1), S && ((S = !1), f(C), (C = -1)), (w = !0));
    var y = m;
    try {
      for (
        g(V), p = n(u);
        p !== null && (!(p.expirationTime > V) || (M && !R()));
      ) {
        var v = p.callback;
        if (typeof v == "function") {
          ((p.callback = null), (m = p.priorityLevel));
          var I = v(p.expirationTime <= V);
          ((V = e.unstable_now()),
            typeof I == "function" ? (p.callback = I) : p === n(u) && r(u),
            g(V));
        } else r(u);
        p = n(u);
      }
      if (p !== null) var F = !0;
      else {
        var H = n(c);
        (H !== null && le(x, H.startTime - V), (F = !1));
      }
      return F;
    } finally {
      ((p = null), (m = y), (w = !1));
    }
  }
  var T = !1,
    E = null,
    C = -1,
    _ = 5,
    L = -1;
  function R() {
    return !(e.unstable_now() - L < _);
  }
  function P() {
    if (E !== null) {
      var M = e.unstable_now();
      L = M;
      var V = !0;
      try {
        V = E(!0, M);
      } finally {
        V ? N() : ((T = !1), (E = null));
      }
    } else T = !1;
  }
  var N;
  if (typeof d == "function")
    N = function () {
      d(P);
    };
  else if (typeof MessageChannel < "u") {
    var A = new MessageChannel(),
      W = A.port2;
    ((A.port1.onmessage = P),
      (N = function () {
        W.postMessage(null);
      }));
  } else
    N = function () {
      z(P, 0);
    };
  function G(M) {
    ((E = M), T || ((T = !0), N()));
  }
  function le(M, V) {
    C = z(function () {
      M(e.unstable_now());
    }, V);
  }
  ((e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (M) {
      M.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      b || w || ((b = !0), G(k));
    }),
    (e.unstable_forceFrameRate = function (M) {
      0 > M || 125 < M
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
          )
        : (_ = 0 < M ? Math.floor(1e3 / M) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return m;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(u);
    }),
    (e.unstable_next = function (M) {
      switch (m) {
        case 1:
        case 2:
        case 3:
          var V = 3;
          break;
        default:
          V = m;
      }
      var y = m;
      m = V;
      try {
        return M();
      } finally {
        m = y;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (M, V) {
      switch (M) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          M = 3;
      }
      var y = m;
      m = M;
      try {
        return V();
      } finally {
        m = y;
      }
    }),
    (e.unstable_scheduleCallback = function (M, V, y) {
      var v = e.unstable_now();
      switch (
        (typeof y == "object" && y !== null
          ? ((y = y.delay), (y = typeof y == "number" && 0 < y ? v + y : v))
          : (y = v),
        M)
      ) {
        case 1:
          var I = -1;
          break;
        case 2:
          I = 250;
          break;
        case 5:
          I = 1073741823;
          break;
        case 4:
          I = 1e4;
          break;
        default:
          I = 5e3;
      }
      return (
        (I = y + I),
        (M = {
          id: h++,
          callback: V,
          priorityLevel: M,
          startTime: y,
          expirationTime: I,
          sortIndex: -1,
        }),
        y > v
          ? ((M.sortIndex = y),
            t(c, M),
            n(u) === null &&
              M === n(c) &&
              (S ? (f(C), (C = -1)) : (S = !0), le(x, y - v)))
          : ((M.sortIndex = I), t(u, M), b || w || ((b = !0), G(k))),
        M
      );
    }),
    (e.unstable_shouldYield = R),
    (e.unstable_wrapCallback = function (M) {
      var V = m;
      return function () {
        var y = m;
        m = V;
        try {
          return M.apply(this, arguments);
        } finally {
          m = y;
        }
      };
    }));
})(ls);
is.exports = ls;
var Wc = is.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Gc = X,
  Oe = Wc;
function j(e) {
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
var ss = new Set(),
  ir = {};
function qt(e, t) {
  (Cn(e, t), Cn(e + "Capture", t));
}
function Cn(e, t) {
  for (ir[e] = t, e = 0; e < t.length; e++) ss.add(t[e]);
}
var ht = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  Na = Object.prototype.hasOwnProperty,
  Qc =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  Nl = {},
  jl = {};
function Yc(e) {
  return Na.call(jl, e)
    ? !0
    : Na.call(Nl, e)
      ? !1
      : Qc.test(e)
        ? (jl[e] = !0)
        : ((Nl[e] = !0), !1);
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
var ji = /[\-:]([a-z])/g;
function Ai(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(ji, Ai);
    xe[t] = new Me(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(ji, Ai);
    xe[t] = new Me(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(ji, Ai);
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
var wt = Gc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  Lr = Symbol.for("react.element"),
  on = Symbol.for("react.portal"),
  an = Symbol.for("react.fragment"),
  Pi = Symbol.for("react.strict_mode"),
  ja = Symbol.for("react.profiler"),
  cs = Symbol.for("react.provider"),
  us = Symbol.for("react.context"),
  Ii = Symbol.for("react.forward_ref"),
  Aa = Symbol.for("react.suspense"),
  La = Symbol.for("react.suspense_list"),
  _i = Symbol.for("react.memo"),
  St = Symbol.for("react.lazy"),
  ds = Symbol.for("react.offscreen"),
  Al = Symbol.iterator;
function _n(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (Al && e[Al]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var ie = Object.assign,
  ea;
function Qn(e) {
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
          a = r.stack.split(`
`),
          i = o.length - 1,
          l = a.length - 1;
        1 <= i && 0 <= l && o[i] !== a[l];
      )
        l--;
      for (; 1 <= i && 0 <= l; i--, l--)
        if (o[i] !== a[l]) {
          if (i !== 1 || l !== 1)
            do
              if ((i--, l--, 0 > l || o[i] !== a[l])) {
                var u =
                  `
` + o[i].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    u.includes("<anonymous>") &&
                    (u = u.replace("<anonymous>", e.displayName)),
                  u
                );
              }
            while (1 <= i && 0 <= l);
          break;
        }
    }
  } finally {
    ((ta = !1), (Error.prepareStackTrace = n));
  }
  return (e = e ? e.displayName || e.name : "") ? Qn(e) : "";
}
function Xc(e) {
  switch (e.tag) {
    case 5:
      return Qn(e.type);
    case 16:
      return Qn("Lazy");
    case 13:
      return Qn("Suspense");
    case 19:
      return Qn("SuspenseList");
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
function Pa(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case an:
      return "Fragment";
    case on:
      return "Portal";
    case ja:
      return "Profiler";
    case Pi:
      return "StrictMode";
    case Aa:
      return "Suspense";
    case La:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case us:
        return (e.displayName || "Context") + ".Consumer";
      case cs:
        return (e._context.displayName || "Context") + ".Provider";
      case Ii:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case _i:
        return (
          (t = e.displayName || null),
          t !== null ? t : Pa(e.type) || "Memo"
        );
      case St:
        ((t = e._payload), (e = e._init));
        try {
          return Pa(e(t));
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
      return Pa(t);
    case 8:
      return t === Pi ? "StrictMode" : "Mode";
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
function _t(e) {
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
function fs(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function qc(e) {
  var t = fs(e) ? "checked" : "value",
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
function Pr(e) {
  e._valueTracker || (e._valueTracker = qc(e));
}
function ps(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = fs(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function fo(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Ia(e, t) {
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
  ((n = _t(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    }));
}
function ms(e, t) {
  ((t = t.checked), t != null && Li(e, "checked", t, !1));
}
function _a(e, t) {
  ms(e, t);
  var n = _t(t.value),
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
    ? Da(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && Da(e, t.type, _t(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked));
}
function Pl(e, t, n) {
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
function Da(e, t, n) {
  (t !== "number" || fo(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Yn = Array.isArray;
function gn(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var o = 0; o < n.length; o++) t["$" + n[o]] = !0;
    for (n = 0; n < e.length; n++)
      ((o = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== o && (e[n].selected = o),
        o && r && (e[n].defaultSelected = !0));
  } else {
    for (n = "" + _t(n), t = null, o = 0; o < e.length; o++) {
      if (e[o].value === n) {
        ((e[o].selected = !0), r && (e[o].defaultSelected = !0));
        return;
      }
      t !== null || e[o].disabled || (t = e[o]);
    }
    t !== null && (t.selected = !0);
  }
}
function Ra(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(j(91));
  return ie({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function Il(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(j(92));
      if (Yn(n)) {
        if (1 < n.length) throw Error(j(93));
        n = n[0];
      }
      t = n;
    }
    (t == null && (t = ""), (n = t));
  }
  e._wrapperState = { initialValue: _t(n) };
}
function hs(e, t) {
  var n = _t(t.value),
    r = _t(t.defaultValue);
  (n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r));
}
function _l(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function vs(e) {
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
    ? vs(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
      ? "http://www.w3.org/1999/xhtml"
      : e;
}
var Ir,
  gs = (function (e) {
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
        Ir = Ir || document.createElement("div"),
          Ir.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = Ir.firstChild;
        e.firstChild;
      )
        e.removeChild(e.firstChild);
      for (; t.firstChild;) e.appendChild(t.firstChild);
    }
  });
function lr(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Xn = {
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
Object.keys(Xn).forEach(function (e) {
  eu.forEach(function (t) {
    ((t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Xn[t] = Xn[e]));
  });
});
function ys(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (Xn.hasOwnProperty(e) && Xn[e])
      ? ("" + t).trim()
      : t + "px";
}
function ws(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        o = ys(n, t[n], r);
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
      throw Error(j(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(j(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(j(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(j(62));
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
function Di(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var Va = null,
  yn = null,
  wn = null;
function Dl(e) {
  if ((e = Nr(e))) {
    if (typeof Va != "function") throw Error(j(280));
    var t = e.stateNode;
    t && ((t = $o(t)), Va(e.stateNode, e.type, t));
  }
}
function xs(e) {
  yn ? (wn ? wn.push(e) : (wn = [e])) : (yn = e);
}
function Ss() {
  if (yn) {
    var e = yn,
      t = wn;
    if (((wn = yn = null), Dl(e), t)) for (e = 0; e < t.length; e++) Dl(t[e]);
  }
}
function ks(e, t) {
  return e(t);
}
function bs() {}
var ra = !1;
function Cs(e, t, n) {
  if (ra) return e(t, n);
  ra = !0;
  try {
    return ks(e, t, n);
  } finally {
    ((ra = !1), (yn !== null || wn !== null) && (bs(), Ss()));
  }
}
function sr(e, t) {
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
  if (n && typeof n != "function") throw Error(j(231, t, typeof n));
  return n;
}
var Ha = !1;
if (ht)
  try {
    var Dn = {};
    (Object.defineProperty(Dn, "passive", {
      get: function () {
        Ha = !0;
      },
    }),
      window.addEventListener("test", Dn, Dn),
      window.removeEventListener("test", Dn, Dn));
  } catch {
    Ha = !1;
  }
function nu(e, t, n, r, o, a, i, l, u) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, c);
  } catch (h) {
    this.onError(h);
  }
}
var Jn = !1,
  po = null,
  mo = !1,
  Ua = null,
  ru = {
    onError: function (e) {
      ((Jn = !0), (po = e));
    },
  };
function ou(e, t, n, r, o, a, i, l, u) {
  ((Jn = !1), (po = null), nu.apply(ru, arguments));
}
function au(e, t, n, r, o, a, i, l, u) {
  if ((ou.apply(this, arguments), Jn)) {
    if (Jn) {
      var c = po;
      ((Jn = !1), (po = null));
    } else throw Error(j(198));
    mo || ((mo = !0), (Ua = c));
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
function zs(e) {
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
function Rl(e) {
  if (en(e) !== e) throw Error(j(188));
}
function iu(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = en(e)), t === null)) throw Error(j(188));
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
        if (a === n) return (Rl(o), e);
        if (a === r) return (Rl(o), t);
        a = a.sibling;
      }
      throw Error(j(188));
    }
    if (n.return !== r.return) ((n = o), (r = a));
    else {
      for (var i = !1, l = o.child; l;) {
        if (l === n) {
          ((i = !0), (n = o), (r = a));
          break;
        }
        if (l === r) {
          ((i = !0), (r = o), (n = a));
          break;
        }
        l = l.sibling;
      }
      if (!i) {
        for (l = a.child; l;) {
          if (l === n) {
            ((i = !0), (n = a), (r = o));
            break;
          }
          if (l === r) {
            ((i = !0), (r = a), (n = o));
            break;
          }
          l = l.sibling;
        }
        if (!i) throw Error(j(189));
      }
    }
    if (n.alternate !== r) throw Error(j(190));
  }
  if (n.tag !== 3) throw Error(j(188));
  return n.stateNode.current === n ? e : t;
}
function Es(e) {
  return ((e = iu(e)), e !== null ? Ts(e) : null);
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
var Ms = Oe.unstable_scheduleCallback,
  Ol = Oe.unstable_cancelCallback,
  lu = Oe.unstable_shouldYield,
  su = Oe.unstable_requestPaint,
  de = Oe.unstable_now,
  cu = Oe.unstable_getCurrentPriorityLevel,
  Ri = Oe.unstable_ImmediatePriority,
  Ns = Oe.unstable_UserBlockingPriority,
  ho = Oe.unstable_NormalPriority,
  uu = Oe.unstable_LowPriority,
  js = Oe.unstable_IdlePriority,
  Ro = null,
  lt = null;
function du(e) {
  if (lt && typeof lt.onCommitFiberRoot == "function")
    try {
      lt.onCommitFiberRoot(Ro, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var et = Math.clz32 ? Math.clz32 : mu,
  fu = Math.log,
  pu = Math.LN2;
function mu(e) {
  return ((e >>>= 0), e === 0 ? 32 : (31 - ((fu(e) / pu) | 0)) | 0);
}
var _r = 64,
  Dr = 4194304;
function Kn(e) {
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
    var l = i & ~o;
    l !== 0 ? (r = Kn(l)) : ((a &= i), a !== 0 && (r = Kn(a)));
  } else ((i = n & ~o), i !== 0 ? (r = Kn(i)) : a !== 0 && (r = Kn(a)));
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
      l = 1 << i,
      u = o[i];
    (u === -1
      ? (!(l & n) || l & r) && (o[i] = hu(l, t))
      : u <= t && (e.expiredLanes |= l),
      (a &= ~l));
  }
}
function Wa(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function As() {
  var e = _r;
  return ((_r <<= 1), !(_r & 4194240) && (_r = 64), e);
}
function oa(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Tr(e, t, n) {
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
function Ls(e) {
  return (
    (e &= -e),
    1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1
  );
}
var Ps,
  Bi,
  Is,
  _s,
  Ds,
  Ga = !1,
  Rr = [],
  Tt = null,
  Mt = null,
  Nt = null,
  cr = new Map(),
  ur = new Map(),
  bt = [],
  yu =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " "
    );
function Bl(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      Tt = null;
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
      cr.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      ur.delete(t.pointerId);
  }
}
function Rn(e, t, n, r, o, a) {
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
function wu(e, t, n, r, o) {
  switch (t) {
    case "focusin":
      return ((Tt = Rn(Tt, e, t, n, r, o)), !0);
    case "dragenter":
      return ((Mt = Rn(Mt, e, t, n, r, o)), !0);
    case "mouseover":
      return ((Nt = Rn(Nt, e, t, n, r, o)), !0);
    case "pointerover":
      var a = o.pointerId;
      return (cr.set(a, Rn(cr.get(a) || null, e, t, n, r, o)), !0);
    case "gotpointercapture":
      return (
        (a = o.pointerId),
        ur.set(a, Rn(ur.get(a) || null, e, t, n, r, o)),
        !0
      );
  }
  return !1;
}
function Rs(e) {
  var t = Ht(e.target);
  if (t !== null) {
    var n = en(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = zs(n)), t !== null)) {
          ((e.blockedOn = t),
            Ds(e.priority, function () {
              Is(n);
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
function xu() {
  ((Ga = !1),
    Tt !== null && eo(Tt) && (Tt = null),
    Mt !== null && eo(Mt) && (Mt = null),
    Nt !== null && eo(Nt) && (Nt = null),
    cr.forEach(Fl),
    ur.forEach(Fl));
}
function On(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    Ga ||
      ((Ga = !0),
      Oe.unstable_scheduleCallback(Oe.unstable_NormalPriority, xu)));
}
function dr(e) {
  function t(o) {
    return On(o, e);
  }
  if (0 < Rr.length) {
    On(Rr[0], e);
    for (var n = 1; n < Rr.length; n++) {
      var r = Rr[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    Tt !== null && On(Tt, e),
      Mt !== null && On(Mt, e),
      Nt !== null && On(Nt, e),
      cr.forEach(t),
      ur.forEach(t),
      n = 0;
    n < bt.length;
    n++
  )
    ((r = bt[n]), r.blockedOn === e && (r.blockedOn = null));
  for (; 0 < bt.length && ((n = bt[0]), n.blockedOn === null);)
    (Rs(n), n.blockedOn === null && bt.shift());
}
var xn = wt.ReactCurrentBatchConfig,
  go = !0;
function Su(e, t, n, r) {
  var o = J,
    a = xn.transition;
  xn.transition = null;
  try {
    ((J = 1), Fi(e, t, n, r));
  } finally {
    ((J = o), (xn.transition = a));
  }
}
function ku(e, t, n, r) {
  var o = J,
    a = xn.transition;
  xn.transition = null;
  try {
    ((J = 4), Fi(e, t, n, r));
  } finally {
    ((J = o), (xn.transition = a));
  }
}
function Fi(e, t, n, r) {
  if (go) {
    var o = Qa(e, t, n, r);
    if (o === null) (ma(e, t, r, yo, n), Bl(e, r));
    else if (wu(o, e, t, n, r)) r.stopPropagation();
    else if ((Bl(e, r), t & 4 && -1 < yu.indexOf(e))) {
      for (; o !== null;) {
        var a = Nr(o);
        if (
          (a !== null && Ps(a),
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
  if (((yo = null), (e = Di(r)), (e = Ht(e)), e !== null))
    if (((t = en(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = zs(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return ((yo = e), null);
}
function Os(e) {
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
        case Ri:
          return 1;
        case Ns:
          return 4;
        case ho:
        case uu:
          return 16;
        case js:
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
function Bs() {
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
    for (var l in e)
      e.hasOwnProperty(l) && ((n = e[l]), (this[l] = n ? n(a) : a[l]));
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
  Vi = Fe(Ln),
  Mr = ie({}, Ln, { view: 0, detail: 0 }),
  bu = Fe(Mr),
  aa,
  ia,
  Bn,
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
    getModifierState: Hi,
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
              ? ((aa = e.screenX - Bn.screenX), (ia = e.screenY - Bn.screenY))
              : (ia = aa = 0),
            (Bn = e)),
          aa);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : ia;
    },
  }),
  Vl = Fe(Oo),
  Cu = ie({}, Oo, { dataTransfer: 0 }),
  zu = Fe(Cu),
  Eu = ie({}, Mr, { relatedTarget: 0 }),
  la = Fe(Eu),
  Tu = ie({}, Ln, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Mu = Fe(Tu),
  Nu = ie({}, Ln, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  ju = Fe(Nu),
  Au = ie({}, Ln, { data: 0 }),
  Hl = Fe(Au),
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
  Pu = {
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
  Iu = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function _u(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Iu[e]) ? !!t[e] : !1;
}
function Hi() {
  return _u;
}
var Du = ie({}, Mr, {
    key: function (e) {
      if (e.key) {
        var t = Lu[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = no(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
          ? Pu[e.keyCode] || "Unidentified"
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
    getModifierState: Hi,
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
  Ru = Fe(Du),
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
  Ul = Fe(Ou),
  Bu = ie({}, Mr, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Hi,
  }),
  Fu = Fe(Bu),
  $u = ie({}, Ln, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Vu = Fe($u),
  Hu = ie({}, Oo, {
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
  Uu = Fe(Hu),
  Wu = [9, 13, 27, 32],
  Ui = ht && "CompositionEvent" in window,
  qn = null;
ht && "documentMode" in document && (qn = document.documentMode);
var Gu = ht && "TextEvent" in window && !qn,
  Fs = ht && (!Ui || (qn && 8 < qn && 11 >= qn)),
  Wl = " ",
  Gl = !1;
function $s(e, t) {
  switch (e) {
    case "keyup":
      return Wu.indexOf(t.keyCode) !== -1;
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
function Vs(e) {
  return ((e = e.detail), typeof e == "object" && "data" in e ? e.data : null);
}
var ln = !1;
function Qu(e, t) {
  switch (e) {
    case "compositionend":
      return Vs(t);
    case "keypress":
      return t.which !== 32 ? null : ((Gl = !0), Wl);
    case "textInput":
      return ((e = t.data), e === Wl && Gl ? null : e);
    default:
      return null;
  }
}
function Yu(e, t) {
  if (ln)
    return e === "compositionend" || (!Ui && $s(e, t))
      ? ((e = Bs()), (to = $i = zt = null), (ln = !1), e)
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
      return Fs && t.locale !== "ko" ? null : t.data;
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
function Hs(e, t, n, r) {
  (xs(r),
    (t = wo(t, "onChange")),
    0 < t.length &&
      ((n = new Vi("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t })));
}
var er = null,
  fr = null;
function Zu(e) {
  e2(e, 0);
}
function Bo(e) {
  var t = un(e);
  if (ps(t)) return e;
}
function Xu(e, t) {
  if (e === "change") return t;
}
var Us = !1;
if (ht) {
  var sa;
  if (ht) {
    var ca = "oninput" in document;
    if (!ca) {
      var Yl = document.createElement("div");
      (Yl.setAttribute("oninput", "return;"),
        (ca = typeof Yl.oninput == "function"));
    }
    sa = ca;
  } else sa = !1;
  Us = sa && (!document.documentMode || 9 < document.documentMode);
}
function Kl() {
  er && (er.detachEvent("onpropertychange", Ws), (fr = er = null));
}
function Ws(e) {
  if (e.propertyName === "value" && Bo(fr)) {
    var t = [];
    (Hs(t, fr, e, Di(e)), Cs(Zu, t));
  }
}
function Ju(e, t, n) {
  e === "focusin"
    ? (Kl(), (er = t), (fr = n), er.attachEvent("onpropertychange", Ws))
    : e === "focusout" && Kl();
}
function qu(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return Bo(fr);
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
function pr(e, t) {
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
function Gs(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
          ? Gs(e, t.parentNode)
          : "contains" in e
            ? e.contains(t)
            : e.compareDocumentPosition
              ? !!(e.compareDocumentPosition(t) & 16)
              : !1
    : !1;
}
function Qs() {
  for (var e = window, t = fo(); t instanceof e.HTMLIFrameElement;) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = fo(e.document);
  }
  return t;
}
function Wi(e) {
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
  var t = Qs(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    Gs(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && Wi(n)) {
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
var o0 = ht && "documentMode" in document && 11 >= document.documentMode,
  sn = null,
  Ya = null,
  tr = null,
  Ka = !1;
function Jl(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Ka ||
    sn == null ||
    sn !== fo(r) ||
    ((r = sn),
    "selectionStart" in r && Wi(r)
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
    (tr && pr(tr, r)) ||
      ((tr = r),
      (r = wo(Ya, "onSelect")),
      0 < r.length &&
        ((t = new Vi("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = sn))));
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
var cn = {
    animationend: Br("Animation", "AnimationEnd"),
    animationiteration: Br("Animation", "AnimationIteration"),
    animationstart: Br("Animation", "AnimationStart"),
    transitionend: Br("Transition", "TransitionEnd"),
  },
  ua = {},
  Ys = {};
ht &&
  ((Ys = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete cn.animationend.animation,
    delete cn.animationiteration.animation,
    delete cn.animationstart.animation),
  "TransitionEvent" in window || delete cn.transitionend.transition);
function Fo(e) {
  if (ua[e]) return ua[e];
  if (!cn[e]) return e;
  var t = cn[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in Ys) return (ua[e] = t[n]);
  return e;
}
var Ks = Fo("animationend"),
  Zs = Fo("animationiteration"),
  Xs = Fo("animationstart"),
  Js = Fo("transitionend"),
  qs = new Map(),
  ql =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " "
    );
function Rt(e, t) {
  (qs.set(e, t), qt(t, [e]));
}
for (var da = 0; da < ql.length; da++) {
  var fa = ql[da],
    a0 = fa.toLowerCase(),
    i0 = fa[0].toUpperCase() + fa.slice(1);
  Rt(a0, "on" + i0);
}
Rt(Ks, "onAnimationEnd");
Rt(Zs, "onAnimationIteration");
Rt(Xs, "onAnimationStart");
Rt("dblclick", "onDoubleClick");
Rt("focusin", "onFocus");
Rt("focusout", "onBlur");
Rt(Js, "onTransitionEnd");
Cn("onMouseEnter", ["mouseout", "mouseover"]);
Cn("onMouseLeave", ["mouseout", "mouseover"]);
Cn("onPointerEnter", ["pointerout", "pointerover"]);
Cn("onPointerLeave", ["pointerout", "pointerover"]);
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
var Zn =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ),
  l0 = new Set("cancel close invalid load scroll toggle".split(" ").concat(Zn));
function e1(e, t, n) {
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
          var l = r[i],
            u = l.instance,
            c = l.currentTarget;
          if (((l = l.listener), u !== a && o.isPropagationStopped())) break e;
          (e1(o, l, c), (a = u));
        }
      else
        for (i = 0; i < r.length; i++) {
          if (
            ((l = r[i]),
            (u = l.instance),
            (c = l.currentTarget),
            (l = l.listener),
            u !== a && o.isPropagationStopped())
          )
            break e;
          (e1(o, l, c), (a = u));
        }
    }
  }
  if (mo) throw ((e = Ua), (mo = !1), (Ua = null), e);
}
function te(e, t) {
  var n = t[ei];
  n === void 0 && (n = t[ei] = new Set());
  var r = e + "__bubble";
  n.has(r) || (t2(t, e, 2, !1), n.add(r));
}
function pa(e, t, n) {
  var r = 0;
  (t && (r |= 4), t2(n, e, r, t));
}
var Fr = "_reactListening" + Math.random().toString(36).slice(2);
function mr(e) {
  if (!e[Fr]) {
    ((e[Fr] = !0),
      ss.forEach(function (n) {
        n !== "selectionchange" && (l0.has(n) || pa(n, !1, e), pa(n, !0, e));
      }));
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Fr] || ((t[Fr] = !0), pa("selectionchange", !1, t));
  }
}
function t2(e, t, n, r) {
  switch (Os(t)) {
    case 1:
      var o = Su;
      break;
    case 4:
      o = ku;
      break;
    default:
      o = Fi;
  }
  ((n = o.bind(null, t, n, e)),
    (o = void 0),
    !Ha ||
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
        var l = r.stateNode.containerInfo;
        if (l === o || (l.nodeType === 8 && l.parentNode === o)) break;
        if (i === 4)
          for (i = r.return; i !== null;) {
            var u = i.tag;
            if (
              (u === 3 || u === 4) &&
              ((u = i.stateNode.containerInfo),
              u === o || (u.nodeType === 8 && u.parentNode === o))
            )
              return;
            i = i.return;
          }
        for (; l !== null;) {
          if (((i = Ht(l)), i === null)) return;
          if (((u = i.tag), u === 5 || u === 6)) {
            r = a = i;
            continue e;
          }
          l = l.parentNode;
        }
      }
      r = r.return;
    }
  Cs(function () {
    var c = a,
      h = Di(n),
      p = [];
    e: {
      var m = qs.get(e);
      if (m !== void 0) {
        var w = Vi,
          b = e;
        switch (e) {
          case "keypress":
            if (no(n) === 0) break e;
          case "keydown":
          case "keyup":
            w = Ru;
            break;
          case "focusin":
            ((b = "focus"), (w = la));
            break;
          case "focusout":
            ((b = "blur"), (w = la));
            break;
          case "beforeblur":
          case "afterblur":
            w = la;
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
            w = Vl;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            w = zu;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            w = Fu;
            break;
          case Ks:
          case Zs:
          case Xs:
            w = Mu;
            break;
          case Js:
            w = Vu;
            break;
          case "scroll":
            w = bu;
            break;
          case "wheel":
            w = Uu;
            break;
          case "copy":
          case "cut":
          case "paste":
            w = ju;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            w = Ul;
        }
        var S = (t & 4) !== 0,
          z = !S && e === "scroll",
          f = S ? (m !== null ? m + "Capture" : null) : m;
        S = [];
        for (var d = c, g; d !== null;) {
          g = d;
          var x = g.stateNode;
          if (
            (g.tag === 5 &&
              x !== null &&
              ((g = x),
              f !== null && ((x = sr(d, f)), x != null && S.push(hr(d, x, g)))),
            z)
          )
            break;
          d = d.return;
        }
        0 < S.length &&
          ((m = new w(m, b, null, n, h)), p.push({ event: m, listeners: S }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((m = e === "mouseover" || e === "pointerover"),
          (w = e === "mouseout" || e === "pointerout"),
          m &&
            n !== $a &&
            (b = n.relatedTarget || n.fromElement) &&
            (Ht(b) || b[vt]))
        )
          break e;
        if (
          (w || m) &&
          ((m =
            h.window === h
              ? h
              : (m = h.ownerDocument)
                ? m.defaultView || m.parentWindow
                : window),
          w
            ? ((b = n.relatedTarget || n.toElement),
              (w = c),
              (b = b ? Ht(b) : null),
              b !== null &&
                ((z = en(b)), b !== z || (b.tag !== 5 && b.tag !== 6)) &&
                (b = null))
            : ((w = null), (b = c)),
          w !== b)
        ) {
          if (
            ((S = Vl),
            (x = "onMouseLeave"),
            (f = "onMouseEnter"),
            (d = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((S = Ul),
              (x = "onPointerLeave"),
              (f = "onPointerEnter"),
              (d = "pointer")),
            (z = w == null ? m : un(w)),
            (g = b == null ? m : un(b)),
            (m = new S(x, d + "leave", w, n, h)),
            (m.target = z),
            (m.relatedTarget = g),
            (x = null),
            Ht(h) === c &&
              ((S = new S(f, d + "enter", b, n, h)),
              (S.target = g),
              (S.relatedTarget = z),
              (x = S)),
            (z = x),
            w && b)
          )
            t: {
              for (S = w, f = b, d = 0, g = S; g; g = tn(g)) d++;
              for (g = 0, x = f; x; x = tn(x)) g++;
              for (; 0 < d - g;) ((S = tn(S)), d--);
              for (; 0 < g - d;) ((f = tn(f)), g--);
              for (; d--;) {
                if (S === f || (f !== null && S === f.alternate)) break t;
                ((S = tn(S)), (f = tn(f)));
              }
              S = null;
            }
          else S = null;
          (w !== null && t1(p, m, w, S, !1),
            b !== null && z !== null && t1(p, z, b, S, !0));
        }
      }
      e: {
        if (
          ((m = c ? un(c) : window),
          (w = m.nodeName && m.nodeName.toLowerCase()),
          w === "select" || (w === "input" && m.type === "file"))
        )
          var k = Xu;
        else if (Ql(m))
          if (Us) k = t0;
          else {
            k = qu;
            var T = Ju;
          }
        else
          (w = m.nodeName) &&
            w.toLowerCase() === "input" &&
            (m.type === "checkbox" || m.type === "radio") &&
            (k = e0);
        if (k && (k = k(e, c))) {
          Hs(p, k, n, h);
          break e;
        }
        (T && T(e, m, c),
          e === "focusout" &&
            (T = m._wrapperState) &&
            T.controlled &&
            m.type === "number" &&
            Da(m, "number", m.value));
      }
      switch (((T = c ? un(c) : window), e)) {
        case "focusin":
          (Ql(T) || T.contentEditable === "true") &&
            ((sn = T), (Ya = c), (tr = null));
          break;
        case "focusout":
          tr = Ya = sn = null;
          break;
        case "mousedown":
          Ka = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          ((Ka = !1), Jl(p, n, h));
          break;
        case "selectionchange":
          if (o0) break;
        case "keydown":
        case "keyup":
          Jl(p, n, h);
      }
      var E;
      if (Ui)
        e: {
          switch (e) {
            case "compositionstart":
              var C = "onCompositionStart";
              break e;
            case "compositionend":
              C = "onCompositionEnd";
              break e;
            case "compositionupdate":
              C = "onCompositionUpdate";
              break e;
          }
          C = void 0;
        }
      else
        ln
          ? $s(e, n) && (C = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (C = "onCompositionStart");
      (C &&
        (Fs &&
          n.locale !== "ko" &&
          (ln || C !== "onCompositionStart"
            ? C === "onCompositionEnd" && ln && (E = Bs())
            : ((zt = h),
              ($i = "value" in zt ? zt.value : zt.textContent),
              (ln = !0))),
        (T = wo(c, C)),
        0 < T.length &&
          ((C = new Hl(C, e, null, n, h)),
          p.push({ event: C, listeners: T }),
          E ? (C.data = E) : ((E = Vs(n)), E !== null && (C.data = E)))),
        (E = Gu ? Qu(e, n) : Yu(e, n)) &&
          ((c = wo(c, "onBeforeInput")),
          0 < c.length &&
            ((h = new Hl("onBeforeInput", "beforeinput", null, n, h)),
            p.push({ event: h, listeners: c }),
            (h.data = E))));
    }
    e2(p, t);
  });
}
function hr(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function wo(e, t) {
  for (var n = t + "Capture", r = []; e !== null;) {
    var o = e,
      a = o.stateNode;
    (o.tag === 5 &&
      a !== null &&
      ((o = a),
      (a = sr(e, n)),
      a != null && r.unshift(hr(e, a, o)),
      (a = sr(e, t)),
      a != null && r.push(hr(e, a, o))),
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
function t1(e, t, n, r, o) {
  for (var a = t._reactName, i = []; n !== null && n !== r;) {
    var l = n,
      u = l.alternate,
      c = l.stateNode;
    if (u !== null && u === r) break;
    (l.tag === 5 &&
      c !== null &&
      ((l = c),
      o
        ? ((u = sr(n, a)), u != null && i.unshift(hr(n, u, l)))
        : o || ((u = sr(n, a)), u != null && i.push(hr(n, u, l)))),
      (n = n.return));
  }
  i.length !== 0 && e.push({ event: t, listeners: i });
}
var s0 = /\r\n?/g,
  c0 = /\u0000|\uFFFD/g;
function n1(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      s0,
      `
`
    )
    .replace(c0, "");
}
function $r(e, t, n) {
  if (((t = n1(t)), n1(e) !== t && n)) throw Error(j(425));
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
  u0 = typeof clearTimeout == "function" ? clearTimeout : void 0,
  r1 = typeof Promise == "function" ? Promise : void 0,
  d0 =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof r1 < "u"
        ? function (e) {
            return r1.resolve(null).then(e).catch(f0);
          }
        : qa;
function f0(e) {
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
          (e.removeChild(o), dr(t));
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = o;
  } while (n);
  dr(t);
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
function o1(e) {
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
  it = "__reactFiber$" + Pn,
  vr = "__reactProps$" + Pn,
  vt = "__reactContainer$" + Pn,
  ei = "__reactEvents$" + Pn,
  p0 = "__reactListeners$" + Pn,
  m0 = "__reactHandles$" + Pn;
function Ht(e) {
  var t = e[it];
  if (t) return t;
  for (var n = e.parentNode; n;) {
    if ((t = n[vt] || n[it])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = o1(e); e !== null;) {
          if ((n = e[it])) return n;
          e = o1(e);
        }
      return t;
    }
    ((e = n), (n = e.parentNode));
  }
  return null;
}
function Nr(e) {
  return (
    (e = e[it] || e[vt]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function un(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(j(33));
}
function $o(e) {
  return e[vr] || null;
}
var ti = [],
  dn = -1;
function Ot(e) {
  return { current: e };
}
function ne(e) {
  0 > dn || ((e.current = ti[dn]), (ti[dn] = null), dn--);
}
function q(e, t) {
  (dn++, (ti[dn] = e.current), (e.current = t));
}
var Dt = {},
  Ce = Ot(Dt),
  Le = Ot(!1),
  Yt = Dt;
function zn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return Dt;
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
function Pe(e) {
  return ((e = e.childContextTypes), e != null);
}
function So() {
  (ne(Le), ne(Ce));
}
function a1(e, t, n) {
  if (Ce.current !== Dt) throw Error(j(168));
  (q(Ce, t), q(Le, n));
}
function n2(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
    return n;
  r = r.getChildContext();
  for (var o in r) if (!(o in t)) throw Error(j(108, Jc(e) || "Unknown", o));
  return ie({}, n, r);
}
function ko(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || Dt),
    (Yt = Ce.current),
    q(Ce, e),
    q(Le, Le.current),
    !0
  );
}
function i1(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(j(169));
  (n
    ? ((e = n2(e, t, Yt)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      ne(Le),
      ne(Ce),
      q(Ce, e))
    : ne(Le),
    q(Le, n));
}
var dt = null,
  Vo = !1,
  va = !1;
function r2(e) {
  dt === null ? (dt = [e]) : dt.push(e);
}
function h0(e) {
  ((Vo = !0), r2(e));
}
function Bt() {
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
      ((dt = null), (Vo = !1));
    } catch (o) {
      throw (dt !== null && (dt = dt.slice(e + 1)), Ms(Ri, Bt), o);
    } finally {
      ((J = t), (va = !1));
    }
  }
  return null;
}
var fn = [],
  pn = 0,
  bo = null,
  Co = 0,
  $e = [],
  Ve = 0,
  Kt = null,
  ft = 1,
  pt = "";
function $t(e, t) {
  ((fn[pn++] = Co), (fn[pn++] = bo), (bo = e), (Co = t));
}
function o2(e, t, n) {
  (($e[Ve++] = ft), ($e[Ve++] = pt), ($e[Ve++] = Kt), (Kt = e));
  var r = ft;
  e = pt;
  var o = 32 - et(r) - 1;
  ((r &= ~(1 << o)), (n += 1));
  var a = 32 - et(t) + o;
  if (30 < a) {
    var i = o - (o % 5);
    ((a = (r & ((1 << i) - 1)).toString(32)),
      (r >>= i),
      (o -= i),
      (ft = (1 << (32 - et(t) + o)) | (n << o) | r),
      (pt = a + e));
  } else ((ft = (1 << a) | (n << o) | r), (pt = e));
}
function Gi(e) {
  e.return !== null && ($t(e, 1), o2(e, 1, 0));
}
function Qi(e) {
  for (; e === bo;)
    ((bo = fn[--pn]), (fn[pn] = null), (Co = fn[--pn]), (fn[pn] = null));
  for (; e === Kt;)
    ((Kt = $e[--Ve]),
      ($e[Ve] = null),
      (pt = $e[--Ve]),
      ($e[Ve] = null),
      (ft = $e[--Ve]),
      ($e[Ve] = null));
}
var Re = null,
  De = null,
  re = !1,
  qe = null;
function a2(e, t) {
  var n = He(5, null, null, 0);
  ((n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n));
}
function l1(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (Re = e), (De = jt(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (Re = e), (De = null), !0) : !1
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
            (De = null),
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
    var t = De;
    if (t) {
      var n = t;
      if (!l1(e, t)) {
        if (ni(e)) throw Error(j(418));
        t = jt(n.nextSibling);
        var r = Re;
        t && l1(e, t)
          ? a2(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (re = !1), (Re = e));
      }
    } else {
      if (ni(e)) throw Error(j(418));
      ((e.flags = (e.flags & -4097) | 2), (re = !1), (Re = e));
    }
  }
}
function s1(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;)
    e = e.return;
  Re = e;
}
function Vr(e) {
  if (e !== Re) return !1;
  if (!re) return (s1(e), (re = !0), !1);
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !Ja(e.type, e.memoizedProps))),
    t && (t = De))
  ) {
    if (ni(e)) throw (i2(), Error(j(418)));
    for (; t;) (a2(e, t), (t = jt(t.nextSibling)));
  }
  if ((s1(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(j(317));
    e: {
      for (e = e.nextSibling, t = 0; e;) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              De = jt(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      De = null;
    }
  } else De = Re ? jt(e.stateNode.nextSibling) : null;
  return !0;
}
function i2() {
  for (var e = De; e;) e = jt(e.nextSibling);
}
function En() {
  ((De = Re = null), (re = !1));
}
function Yi(e) {
  qe === null ? (qe = [e]) : qe.push(e);
}
var v0 = wt.ReactCurrentBatchConfig;
function Fn(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(j(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(j(147, e));
      var o = r,
        a = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === a
        ? t.ref
        : ((t = function (i) {
            var l = o.refs;
            i === null ? delete l[a] : (l[a] = i);
          }),
          (t._stringRef = a),
          t);
    }
    if (typeof e != "string") throw Error(j(284));
    if (!n._owner) throw Error(j(290, e));
  }
  return e;
}
function Hr(e, t) {
  throw (
    (e = Object.prototype.toString.call(t)),
    Error(
      j(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e
      )
    )
  );
}
function c1(e) {
  var t = e._init;
  return t(e._payload);
}
function l2(e) {
  function t(f, d) {
    if (e) {
      var g = f.deletions;
      g === null ? ((f.deletions = [d]), (f.flags |= 16)) : g.push(d);
    }
  }
  function n(f, d) {
    if (!e) return null;
    for (; d !== null;) (t(f, d), (d = d.sibling));
    return null;
  }
  function r(f, d) {
    for (f = new Map(); d !== null;)
      (d.key !== null ? f.set(d.key, d) : f.set(d.index, d), (d = d.sibling));
    return f;
  }
  function o(f, d) {
    return ((f = It(f, d)), (f.index = 0), (f.sibling = null), f);
  }
  function a(f, d, g) {
    return (
      (f.index = g),
      e
        ? ((g = f.alternate),
          g !== null
            ? ((g = g.index), g < d ? ((f.flags |= 2), d) : g)
            : ((f.flags |= 2), d))
        : ((f.flags |= 1048576), d)
    );
  }
  function i(f) {
    return (e && f.alternate === null && (f.flags |= 2), f);
  }
  function l(f, d, g, x) {
    return d === null || d.tag !== 6
      ? ((d = ba(g, f.mode, x)), (d.return = f), d)
      : ((d = o(d, g)), (d.return = f), d);
  }
  function u(f, d, g, x) {
    var k = g.type;
    return k === an
      ? h(f, d, g.props.children, x, g.key)
      : d !== null &&
          (d.elementType === k ||
            (typeof k == "object" &&
              k !== null &&
              k.$$typeof === St &&
              c1(k) === d.type))
        ? ((x = o(d, g.props)), (x.ref = Fn(f, d, g)), (x.return = f), x)
        : ((x = co(g.type, g.key, g.props, null, f.mode, x)),
          (x.ref = Fn(f, d, g)),
          (x.return = f),
          x);
  }
  function c(f, d, g, x) {
    return d === null ||
      d.tag !== 4 ||
      d.stateNode.containerInfo !== g.containerInfo ||
      d.stateNode.implementation !== g.implementation
      ? ((d = Ca(g, f.mode, x)), (d.return = f), d)
      : ((d = o(d, g.children || [])), (d.return = f), d);
  }
  function h(f, d, g, x, k) {
    return d === null || d.tag !== 7
      ? ((d = Qt(g, f.mode, x, k)), (d.return = f), d)
      : ((d = o(d, g)), (d.return = f), d);
  }
  function p(f, d, g) {
    if ((typeof d == "string" && d !== "") || typeof d == "number")
      return ((d = ba("" + d, f.mode, g)), (d.return = f), d);
    if (typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case Lr:
          return (
            (g = co(d.type, d.key, d.props, null, f.mode, g)),
            (g.ref = Fn(f, null, d)),
            (g.return = f),
            g
          );
        case on:
          return ((d = Ca(d, f.mode, g)), (d.return = f), d);
        case St:
          var x = d._init;
          return p(f, x(d._payload), g);
      }
      if (Yn(d) || _n(d))
        return ((d = Qt(d, f.mode, g, null)), (d.return = f), d);
      Hr(f, d);
    }
    return null;
  }
  function m(f, d, g, x) {
    var k = d !== null ? d.key : null;
    if ((typeof g == "string" && g !== "") || typeof g == "number")
      return k !== null ? null : l(f, d, "" + g, x);
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case Lr:
          return g.key === k ? u(f, d, g, x) : null;
        case on:
          return g.key === k ? c(f, d, g, x) : null;
        case St:
          return ((k = g._init), m(f, d, k(g._payload), x));
      }
      if (Yn(g) || _n(g)) return k !== null ? null : h(f, d, g, x, null);
      Hr(f, g);
    }
    return null;
  }
  function w(f, d, g, x, k) {
    if ((typeof x == "string" && x !== "") || typeof x == "number")
      return ((f = f.get(g) || null), l(d, f, "" + x, k));
    if (typeof x == "object" && x !== null) {
      switch (x.$$typeof) {
        case Lr:
          return (
            (f = f.get(x.key === null ? g : x.key) || null),
            u(d, f, x, k)
          );
        case on:
          return (
            (f = f.get(x.key === null ? g : x.key) || null),
            c(d, f, x, k)
          );
        case St:
          var T = x._init;
          return w(f, d, g, T(x._payload), k);
      }
      if (Yn(x) || _n(x)) return ((f = f.get(g) || null), h(d, f, x, k, null));
      Hr(d, x);
    }
    return null;
  }
  function b(f, d, g, x) {
    for (
      var k = null, T = null, E = d, C = (d = 0), _ = null;
      E !== null && C < g.length;
      C++
    ) {
      E.index > C ? ((_ = E), (E = null)) : (_ = E.sibling);
      var L = m(f, E, g[C], x);
      if (L === null) {
        E === null && (E = _);
        break;
      }
      (e && E && L.alternate === null && t(f, E),
        (d = a(L, d, C)),
        T === null ? (k = L) : (T.sibling = L),
        (T = L),
        (E = _));
    }
    if (C === g.length) return (n(f, E), re && $t(f, C), k);
    if (E === null) {
      for (; C < g.length; C++)
        ((E = p(f, g[C], x)),
          E !== null &&
            ((d = a(E, d, C)),
            T === null ? (k = E) : (T.sibling = E),
            (T = E)));
      return (re && $t(f, C), k);
    }
    for (E = r(f, E); C < g.length; C++)
      ((_ = w(E, f, C, g[C], x)),
        _ !== null &&
          (e && _.alternate !== null && E.delete(_.key === null ? C : _.key),
          (d = a(_, d, C)),
          T === null ? (k = _) : (T.sibling = _),
          (T = _)));
    return (
      e &&
        E.forEach(function (R) {
          return t(f, R);
        }),
      re && $t(f, C),
      k
    );
  }
  function S(f, d, g, x) {
    var k = _n(g);
    if (typeof k != "function") throw Error(j(150));
    if (((g = k.call(g)), g == null)) throw Error(j(151));
    for (
      var T = (k = null), E = d, C = (d = 0), _ = null, L = g.next();
      E !== null && !L.done;
      C++, L = g.next()
    ) {
      E.index > C ? ((_ = E), (E = null)) : (_ = E.sibling);
      var R = m(f, E, L.value, x);
      if (R === null) {
        E === null && (E = _);
        break;
      }
      (e && E && R.alternate === null && t(f, E),
        (d = a(R, d, C)),
        T === null ? (k = R) : (T.sibling = R),
        (T = R),
        (E = _));
    }
    if (L.done) return (n(f, E), re && $t(f, C), k);
    if (E === null) {
      for (; !L.done; C++, L = g.next())
        ((L = p(f, L.value, x)),
          L !== null &&
            ((d = a(L, d, C)),
            T === null ? (k = L) : (T.sibling = L),
            (T = L)));
      return (re && $t(f, C), k);
    }
    for (E = r(f, E); !L.done; C++, L = g.next())
      ((L = w(E, f, C, L.value, x)),
        L !== null &&
          (e && L.alternate !== null && E.delete(L.key === null ? C : L.key),
          (d = a(L, d, C)),
          T === null ? (k = L) : (T.sibling = L),
          (T = L)));
    return (
      e &&
        E.forEach(function (P) {
          return t(f, P);
        }),
      re && $t(f, C),
      k
    );
  }
  function z(f, d, g, x) {
    if (
      (typeof g == "object" &&
        g !== null &&
        g.type === an &&
        g.key === null &&
        (g = g.props.children),
      typeof g == "object" && g !== null)
    ) {
      switch (g.$$typeof) {
        case Lr:
          e: {
            for (var k = g.key, T = d; T !== null;) {
              if (T.key === k) {
                if (((k = g.type), k === an)) {
                  if (T.tag === 7) {
                    (n(f, T.sibling),
                      (d = o(T, g.props.children)),
                      (d.return = f),
                      (f = d));
                    break e;
                  }
                } else if (
                  T.elementType === k ||
                  (typeof k == "object" &&
                    k !== null &&
                    k.$$typeof === St &&
                    c1(k) === T.type)
                ) {
                  (n(f, T.sibling),
                    (d = o(T, g.props)),
                    (d.ref = Fn(f, T, g)),
                    (d.return = f),
                    (f = d));
                  break e;
                }
                n(f, T);
                break;
              } else t(f, T);
              T = T.sibling;
            }
            g.type === an
              ? ((d = Qt(g.props.children, f.mode, x, g.key)),
                (d.return = f),
                (f = d))
              : ((x = co(g.type, g.key, g.props, null, f.mode, x)),
                (x.ref = Fn(f, d, g)),
                (x.return = f),
                (f = x));
          }
          return i(f);
        case on:
          e: {
            for (T = g.key; d !== null;) {
              if (d.key === T)
                if (
                  d.tag === 4 &&
                  d.stateNode.containerInfo === g.containerInfo &&
                  d.stateNode.implementation === g.implementation
                ) {
                  (n(f, d.sibling),
                    (d = o(d, g.children || [])),
                    (d.return = f),
                    (f = d));
                  break e;
                } else {
                  n(f, d);
                  break;
                }
              else t(f, d);
              d = d.sibling;
            }
            ((d = Ca(g, f.mode, x)), (d.return = f), (f = d));
          }
          return i(f);
        case St:
          return ((T = g._init), z(f, d, T(g._payload), x));
      }
      if (Yn(g)) return b(f, d, g, x);
      if (_n(g)) return S(f, d, g, x);
      Hr(f, g);
    }
    return (typeof g == "string" && g !== "") || typeof g == "number"
      ? ((g = "" + g),
        d !== null && d.tag === 6
          ? (n(f, d.sibling), (d = o(d, g)), (d.return = f), (f = d))
          : (n(f, d), (d = ba(g, f.mode, x)), (d.return = f), (f = d)),
        i(f))
      : n(f, d);
  }
  return z;
}
var Tn = l2(!0),
  s2 = l2(!1),
  zo = Ot(null),
  Eo = null,
  mn = null,
  Ki = null;
function Zi() {
  Ki = mn = Eo = null;
}
function Xi(e) {
  var t = zo.current;
  (ne(zo), (e._currentValue = t));
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
function Sn(e, t) {
  ((Eo = e),
    (Ki = mn = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (Ae = !0), (e.firstContext = null)));
}
function We(e) {
  var t = e._currentValue;
  if (Ki !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), mn === null)) {
      if (Eo === null) throw Error(j(308));
      ((mn = e), (Eo.dependencies = { lanes: 0, firstContext: e }));
    } else mn = mn.next = e;
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
  if (((r = r.shared), Z & 2)) {
    var o = r.pending;
    return (
      o === null ? (t.next = t) : ((t.next = o.next), (o.next = t)),
      (r.pending = t),
      gt(e, n)
    );
  }
  return (
    (o = r.interleaved),
    o === null ? ((t.next = t), Ji(r)) : ((t.next = o.next), (o.next = t)),
    (r.interleaved = t),
    gt(e, n)
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
function u1(e, t) {
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
function To(e, t, n, r) {
  var o = e.updateQueue;
  kt = !1;
  var a = o.firstBaseUpdate,
    i = o.lastBaseUpdate,
    l = o.shared.pending;
  if (l !== null) {
    o.shared.pending = null;
    var u = l,
      c = u.next;
    ((u.next = null), i === null ? (a = c) : (i.next = c), (i = u));
    var h = e.alternate;
    h !== null &&
      ((h = h.updateQueue),
      (l = h.lastBaseUpdate),
      l !== i &&
        (l === null ? (h.firstBaseUpdate = c) : (l.next = c),
        (h.lastBaseUpdate = u)));
  }
  if (a !== null) {
    var p = o.baseState;
    ((i = 0), (h = c = u = null), (l = a));
    do {
      var m = l.lane,
        w = l.eventTime;
      if ((r & m) === m) {
        h !== null &&
          (h = h.next =
            {
              eventTime: w,
              lane: 0,
              tag: l.tag,
              payload: l.payload,
              callback: l.callback,
              next: null,
            });
        e: {
          var b = e,
            S = l;
          switch (((m = t), (w = n), S.tag)) {
            case 1:
              if (((b = S.payload), typeof b == "function")) {
                p = b.call(w, p, m);
                break e;
              }
              p = b;
              break e;
            case 3:
              b.flags = (b.flags & -65537) | 128;
            case 0:
              if (
                ((b = S.payload),
                (m = typeof b == "function" ? b.call(w, p, m) : b),
                m == null)
              )
                break e;
              p = ie({}, p, m);
              break e;
            case 2:
              kt = !0;
          }
        }
        l.callback !== null &&
          l.lane !== 0 &&
          ((e.flags |= 64),
          (m = o.effects),
          m === null ? (o.effects = [l]) : m.push(l));
      } else
        ((w = {
          eventTime: w,
          lane: m,
          tag: l.tag,
          payload: l.payload,
          callback: l.callback,
          next: null,
        }),
          h === null ? ((c = h = w), (u = p)) : (h = h.next = w),
          (i |= m));
      if (((l = l.next), l === null)) {
        if (((l = o.shared.pending), l === null)) break;
        ((m = l),
          (l = m.next),
          (m.next = null),
          (o.lastBaseUpdate = m),
          (o.shared.pending = null));
      }
    } while (!0);
    if (
      (h === null && (u = p),
      (o.baseState = u),
      (o.firstBaseUpdate = c),
      (o.lastBaseUpdate = h),
      (t = o.shared.interleaved),
      t !== null)
    ) {
      o = t;
      do ((i |= o.lane), (o = o.next));
      while (o !== t);
    } else a === null && (o.shared.lanes = 0);
    ((Xt |= i), (e.lanes = i), (e.memoizedState = p));
  }
}
function d1(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        o = r.callback;
      if (o !== null) {
        if (((r.callback = null), (r = n), typeof o != "function"))
          throw Error(j(191, o));
        o.call(r);
      }
    }
}
var jr = {},
  st = Ot(jr),
  gr = Ot(jr),
  yr = Ot(jr);
function Wt(e) {
  if (e === jr) throw Error(j(174));
  return e;
}
function el(e, t) {
  switch ((q(yr, t), q(gr, e), q(st, jr), (e = t.nodeType), e)) {
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
function Mn() {
  (ne(st), ne(gr), ne(yr));
}
function d2(e) {
  Wt(yr.current);
  var t = Wt(st.current),
    n = Oa(t, e.type);
  t !== n && (q(gr, e), q(st, n));
}
function tl(e) {
  gr.current === e && (ne(st), ne(gr));
}
var oe = Ot(0);
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
var oo = wt.ReactCurrentDispatcher,
  ya = wt.ReactCurrentBatchConfig,
  Zt = 0,
  ae = null,
  pe = null,
  he = null,
  No = !1,
  nr = !1,
  wr = 0,
  g0 = 0;
function Se() {
  throw Error(j(321));
}
function rl(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!nt(e[n], t[n])) return !1;
  return !0;
}
function ol(e, t, n, r, o, a) {
  if (
    ((Zt = a),
    (ae = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (oo.current = e === null || e.memoizedState === null ? S0 : k0),
    (e = n(r, o)),
    nr)
  ) {
    a = 0;
    do {
      if (((nr = !1), (wr = 0), 25 <= a)) throw Error(j(301));
      ((a += 1),
        (he = pe = null),
        (t.updateQueue = null),
        (oo.current = b0),
        (e = n(r, o)));
    } while (nr);
  }
  if (
    ((oo.current = jo),
    (t = pe !== null && pe.next !== null),
    (Zt = 0),
    (he = pe = ae = null),
    (No = !1),
    t)
  )
    throw Error(j(300));
  return e;
}
function al() {
  var e = wr !== 0;
  return ((wr = 0), e);
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
  if (pe === null) {
    var e = ae.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = pe.next;
  var t = he === null ? ae.memoizedState : he.next;
  if (t !== null) ((he = t), (pe = e));
  else {
    if (e === null) throw Error(j(310));
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
function xr(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function wa(e) {
  var t = Ge(),
    n = t.queue;
  if (n === null) throw Error(j(311));
  n.lastRenderedReducer = e;
  var r = pe,
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
    var l = (i = null),
      u = null,
      c = a;
    do {
      var h = c.lane;
      if ((Zt & h) === h)
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
        var p = {
          lane: h,
          action: c.action,
          hasEagerState: c.hasEagerState,
          eagerState: c.eagerState,
          next: null,
        };
        (u === null ? ((l = u = p), (i = r)) : (u = u.next = p),
          (ae.lanes |= h),
          (Xt |= h));
      }
      c = c.next;
    } while (c !== null && c !== a);
    (u === null ? (i = r) : (u.next = l),
      nt(r, t.memoizedState) || (Ae = !0),
      (t.memoizedState = r),
      (t.baseState = i),
      (t.baseQueue = u),
      (n.lastRenderedState = r));
  }
  if (((e = n.interleaved), e !== null)) {
    o = e;
    do ((a = o.lane), (ae.lanes |= a), (Xt |= a), (o = o.next));
    while (o !== e);
  } else o === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function xa(e) {
  var t = Ge(),
    n = t.queue;
  if (n === null) throw Error(j(311));
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
function p2(e, t) {
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
      Sr(9, h2.bind(null, n, r, o, t), void 0, null),
      ve === null)
    )
      throw Error(j(349));
    Zt & 30 || m2(n, t, o);
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
  var t = gt(e, 1);
  t !== null && tt(t, e, 1, -1);
}
function f1(e) {
  var t = at();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: xr,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = x0.bind(null, ae, e)),
    [t.memoizedState, e]
  );
}
function Sr(e, t, n, r) {
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
    (o.memoizedState = Sr(1 | t, n, void 0, r === void 0 ? null : r)));
}
function Ho(e, t, n, r) {
  var o = Ge();
  r = r === void 0 ? null : r;
  var a = void 0;
  if (pe !== null) {
    var i = pe.memoizedState;
    if (((a = i.destroy), r !== null && rl(r, i.deps))) {
      o.memoizedState = Sr(t, n, a, r);
      return;
    }
  }
  ((ae.flags |= e), (o.memoizedState = Sr(1 | t, n, a, r)));
}
function p1(e, t) {
  return ao(8390656, 8, e, t);
}
function il(e, t) {
  return Ho(2048, 8, e, t);
}
function x2(e, t) {
  return Ho(4, 2, e, t);
}
function S2(e, t) {
  return Ho(4, 4, e, t);
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
function b2(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null),
    Ho(4, 4, k2.bind(null, t, e), n)
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
function z2(e, t) {
  var n = Ge();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && rl(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function E2(e, t, n) {
  return Zt & 21
    ? (nt(n, t) || ((n = As()), (ae.lanes |= n), (Xt |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (Ae = !0)), (e.memoizedState = n));
}
function y0(e, t) {
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
    M2(e))
  )
    N2(t, n);
  else if (((n = c2(e, t, n, r)), n !== null)) {
    var o = Ee();
    (tt(n, e, r, o), j2(n, t, r));
  }
}
function x0(e, t, n) {
  var r = Pt(e),
    o = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (M2(e)) N2(t, o);
  else {
    var a = e.alternate;
    if (
      e.lanes === 0 &&
      (a === null || a.lanes === 0) &&
      ((a = t.lastRenderedReducer), a !== null)
    )
      try {
        var i = t.lastRenderedState,
          l = a(i, n);
        if (((o.hasEagerState = !0), (o.eagerState = l), nt(l, i))) {
          var u = t.interleaved;
          (u === null
            ? ((o.next = o), Ji(t))
            : ((o.next = u.next), (u.next = o)),
            (t.interleaved = o));
          return;
        }
      } catch {
      } finally {
      }
    ((n = c2(e, t, o, r)),
      n !== null && ((o = Ee()), tt(n, e, r, o), j2(n, t, r)));
  }
}
function M2(e) {
  var t = e.alternate;
  return e === ae || (t !== null && t === ae);
}
function N2(e, t) {
  nr = No = !0;
  var n = e.pending;
  (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t));
}
function j2(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    ((r &= e.pendingLanes), (n |= r), (t.lanes = n), Oi(e, n));
  }
}
var jo = {
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
      return ((at().memoizedState = [e, t === void 0 ? null : t]), e);
    },
    useContext: We,
    useEffect: p1,
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
        (e = e.dispatch = w0.bind(null, ae, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = at();
      return ((e = { current: e }), (t.memoizedState = e));
    },
    useState: f1,
    useDebugValue: ll,
    useDeferredValue: function (e) {
      return (at().memoizedState = e);
    },
    useTransition: function () {
      var e = f1(!1),
        t = e[0];
      return ((e = y0.bind(null, e[1])), (at().memoizedState = e), [t, e]);
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = ae,
        o = at();
      if (re) {
        if (n === void 0) throw Error(j(407));
        n = n();
      } else {
        if (((n = t()), ve === null)) throw Error(j(349));
        Zt & 30 || m2(r, t, n);
      }
      o.memoizedState = n;
      var a = { value: n, getSnapshot: t };
      return (
        (o.queue = a),
        p1(v2.bind(null, r, a, e), [e]),
        (r.flags |= 2048),
        Sr(9, h2.bind(null, r, a, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = at(),
        t = ve.identifierPrefix;
      if (re) {
        var n = pt,
          r = ft;
        ((n = (r & ~(1 << (32 - et(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = wr++),
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
    useEffect: il,
    useImperativeHandle: b2,
    useInsertionEffect: x2,
    useLayoutEffect: S2,
    useMemo: z2,
    useReducer: wa,
    useRef: w2,
    useState: function () {
      return wa(xr);
    },
    useDebugValue: ll,
    useDeferredValue: function (e) {
      var t = Ge();
      return E2(t, pe.memoizedState, e);
    },
    useTransition: function () {
      var e = wa(xr)[0],
        t = Ge().memoizedState;
      return [e, t];
    },
    useMutableSource: f2,
    useSyncExternalStore: p2,
    useId: T2,
    unstable_isNewReconciler: !1,
  },
  b0 = {
    readContext: We,
    useCallback: C2,
    useContext: We,
    useEffect: il,
    useImperativeHandle: b2,
    useInsertionEffect: x2,
    useLayoutEffect: S2,
    useMemo: z2,
    useReducer: xa,
    useRef: w2,
    useState: function () {
      return xa(xr);
    },
    useDebugValue: ll,
    useDeferredValue: function (e) {
      var t = Ge();
      return pe === null ? (t.memoizedState = e) : E2(t, pe.memoizedState, e);
    },
    useTransition: function () {
      var e = xa(xr)[0],
        t = Ge().memoizedState;
      return [e, t];
    },
    useMutableSource: f2,
    useSyncExternalStore: p2,
    useId: T2,
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
var Uo = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? en(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = Ee(),
      o = Pt(e),
      a = mt(r, o);
    ((a.payload = t),
      n != null && (a.callback = n),
      (t = At(e, a, o)),
      t !== null && (tt(t, e, o, r), ro(t, e, o)));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = Ee(),
      o = Pt(e),
      a = mt(r, o);
    ((a.tag = 1),
      (a.payload = t),
      n != null && (a.callback = n),
      (t = At(e, a, o)),
      t !== null && (tt(t, e, o, r), ro(t, e, o)));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = Ee(),
      r = Pt(e),
      o = mt(n, r);
    ((o.tag = 2),
      t != null && (o.callback = t),
      (t = At(e, o, r)),
      t !== null && (tt(t, e, r, n), ro(t, e, r)));
  },
};
function m1(e, t, n, r, o, a, i) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, a, i)
      : t.prototype && t.prototype.isPureReactComponent
        ? !pr(n, r) || !pr(o, a)
        : !0
  );
}
function A2(e, t, n) {
  var r = !1,
    o = Dt,
    a = t.contextType;
  return (
    typeof a == "object" && a !== null
      ? (a = We(a))
      : ((o = Pe(t) ? Yt : Ce.current),
        (r = t.contextTypes),
        (a = (r = r != null) ? zn(e, o) : Dt)),
    (t = new t(n, a)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = Uo),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = o),
      (e.__reactInternalMemoizedMaskedChildContext = a)),
    t
  );
}
function h1(e, t, n, r) {
  ((e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && Uo.enqueueReplaceState(t, t.state, null));
}
function ii(e, t, n, r) {
  var o = e.stateNode;
  ((o.props = n), (o.state = e.memoizedState), (o.refs = {}), qi(e));
  var a = t.contextType;
  (typeof a == "object" && a !== null
    ? (o.context = We(a))
    : ((a = Pe(t) ? Yt : Ce.current), (o.context = zn(e, a))),
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
      t !== o.state && Uo.enqueueReplaceState(o, o.state, null),
      To(e, n, o, r),
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
function Sa(e, t, n) {
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
var C0 = typeof WeakMap == "function" ? WeakMap : Map;
function L2(e, t, n) {
  ((n = mt(-1, n)), (n.tag = 3), (n.payload = { element: null }));
  var r = t.value;
  return (
    (n.callback = function () {
      (Lo || ((Lo = !0), (gi = r)), li(e, t));
    }),
    n
  );
}
function P2(e, t, n) {
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
            (Lt === null ? (Lt = new Set([this])) : Lt.add(this)));
        var i = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: i !== null ? i : "",
        });
      }),
    n
  );
}
function v1(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new C0();
    var o = new Set();
    r.set(t, o);
  } else ((o = r.get(t)), o === void 0 && ((o = new Set()), r.set(t, o)));
  o.has(n) || (o.add(n), (e = O0.bind(null, e, t, n)), t.then(e, e));
}
function g1(e) {
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
function y1(e, t, n, r, o) {
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
  t.child = e === null ? s2(t, null, n, r) : Tn(t, e.child, n, r);
}
function w1(e, t, n, r, o) {
  n = n.render;
  var a = t.ref;
  return (
    Sn(t, o),
    (r = ol(e, t, n, r, a, o)),
    (n = al()),
    e !== null && !Ae
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~o),
        yt(e, t, o))
      : (re && n && Gi(t), (t.flags |= 1), ze(e, t, r, o), t.child)
  );
}
function x1(e, t, n, r, o) {
  if (e === null) {
    var a = n.type;
    return typeof a == "function" &&
      !hl(a) &&
      a.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = a), I2(e, t, a, r, o))
      : ((e = co(n.type, null, r, t, t.mode, o)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((a = e.child), !(e.lanes & o))) {
    var i = a.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : pr), n(i, r) && e.ref === t.ref)
    )
      return yt(e, t, o);
  }
  return (
    (t.flags |= 1),
    (e = It(a, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function I2(e, t, n, r, o) {
  if (e !== null) {
    var a = e.memoizedProps;
    if (pr(a, r) && e.ref === t.ref)
      if (((Ae = !1), (t.pendingProps = r = a), (e.lanes & o) !== 0))
        e.flags & 131072 && (Ae = !0);
      else return ((t.lanes = e.lanes), yt(e, t, o));
  }
  return si(e, t, n, r, o);
}
function _2(e, t, n) {
  var r = t.pendingProps,
    o = r.children,
    a = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        q(vn, _e),
        (_e |= n));
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
          q(vn, _e),
          (_e |= e),
          null
        );
      ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = a !== null ? a.baseLanes : n),
        q(vn, _e),
        (_e |= r));
    }
  else
    (a !== null ? ((r = a.baseLanes | n), (t.memoizedState = null)) : (r = n),
      q(vn, _e),
      (_e |= r));
  return (ze(e, t, o, n), t.child);
}
function D2(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function si(e, t, n, r, o) {
  var a = Pe(n) ? Yt : Ce.current;
  return (
    (a = zn(t, a)),
    Sn(t, o),
    (n = ol(e, t, n, r, a, o)),
    (r = al()),
    e !== null && !Ae
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~o),
        yt(e, t, o))
      : (re && r && Gi(t), (t.flags |= 1), ze(e, t, n, o), t.child)
  );
}
function S1(e, t, n, r, o) {
  if (Pe(n)) {
    var a = !0;
    ko(t);
  } else a = !1;
  if ((Sn(t, o), t.stateNode === null))
    (io(e, t), A2(t, n, r), ii(t, n, r, o), (r = !0));
  else if (e === null) {
    var i = t.stateNode,
      l = t.memoizedProps;
    i.props = l;
    var u = i.context,
      c = n.contextType;
    typeof c == "object" && c !== null
      ? (c = We(c))
      : ((c = Pe(n) ? Yt : Ce.current), (c = zn(t, c)));
    var h = n.getDerivedStateFromProps,
      p =
        typeof h == "function" ||
        typeof i.getSnapshotBeforeUpdate == "function";
    (p ||
      (typeof i.UNSAFE_componentWillReceiveProps != "function" &&
        typeof i.componentWillReceiveProps != "function") ||
      ((l !== r || u !== c) && h1(t, i, r, c)),
      (kt = !1));
    var m = t.memoizedState;
    ((i.state = m),
      To(t, r, i, o),
      (u = t.memoizedState),
      l !== r || m !== u || Le.current || kt
        ? (typeof h == "function" && (ai(t, n, h, r), (u = t.memoizedState)),
          (l = kt || m1(t, n, l, r, m, u, c))
            ? (p ||
                (typeof i.UNSAFE_componentWillMount != "function" &&
                  typeof i.componentWillMount != "function") ||
                (typeof i.componentWillMount == "function" &&
                  i.componentWillMount(),
                typeof i.UNSAFE_componentWillMount == "function" &&
                  i.UNSAFE_componentWillMount()),
              typeof i.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof i.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = u)),
          (i.props = r),
          (i.state = u),
          (i.context = c),
          (r = l))
        : (typeof i.componentDidMount == "function" && (t.flags |= 4194308),
          (r = !1)));
  } else {
    ((i = t.stateNode),
      u2(e, t),
      (l = t.memoizedProps),
      (c = t.type === t.elementType ? l : Xe(t.type, l)),
      (i.props = c),
      (p = t.pendingProps),
      (m = i.context),
      (u = n.contextType),
      typeof u == "object" && u !== null
        ? (u = We(u))
        : ((u = Pe(n) ? Yt : Ce.current), (u = zn(t, u))));
    var w = n.getDerivedStateFromProps;
    ((h =
      typeof w == "function" ||
      typeof i.getSnapshotBeforeUpdate == "function") ||
      (typeof i.UNSAFE_componentWillReceiveProps != "function" &&
        typeof i.componentWillReceiveProps != "function") ||
      ((l !== p || m !== u) && h1(t, i, r, u)),
      (kt = !1),
      (m = t.memoizedState),
      (i.state = m),
      To(t, r, i, o));
    var b = t.memoizedState;
    l !== p || m !== b || Le.current || kt
      ? (typeof w == "function" && (ai(t, n, w, r), (b = t.memoizedState)),
        (c = kt || m1(t, n, c, r, m, b, u) || !1)
          ? (h ||
              (typeof i.UNSAFE_componentWillUpdate != "function" &&
                typeof i.componentWillUpdate != "function") ||
              (typeof i.componentWillUpdate == "function" &&
                i.componentWillUpdate(r, b, u),
              typeof i.UNSAFE_componentWillUpdate == "function" &&
                i.UNSAFE_componentWillUpdate(r, b, u)),
            typeof i.componentDidUpdate == "function" && (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof i.componentDidUpdate != "function" ||
              (l === e.memoizedProps && m === e.memoizedState) ||
              (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate != "function" ||
              (l === e.memoizedProps && m === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = b)),
        (i.props = r),
        (i.state = b),
        (i.context = u),
        (r = c))
      : (typeof i.componentDidUpdate != "function" ||
          (l === e.memoizedProps && m === e.memoizedState) ||
          (t.flags |= 4),
        typeof i.getSnapshotBeforeUpdate != "function" ||
          (l === e.memoizedProps && m === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return ci(e, t, n, r, a, o);
}
function ci(e, t, n, r, o, a) {
  D2(e, t);
  var i = (t.flags & 128) !== 0;
  if (!r && !i) return (o && i1(t, n, !1), yt(e, t, a));
  ((r = t.stateNode), (z0.current = t));
  var l =
    i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && i
      ? ((t.child = Tn(t, e.child, null, a)), (t.child = Tn(t, null, l, a)))
      : ze(e, t, l, a),
    (t.memoizedState = r.state),
    o && i1(t, n, !0),
    t.child
  );
}
function R2(e) {
  var t = e.stateNode;
  (t.pendingContext
    ? a1(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && a1(e, t.context, !1),
    el(e, t.containerInfo));
}
function k1(e, t, n, r, o) {
  return (En(), Yi(o), (t.flags |= 256), ze(e, t, n, r), t.child);
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
    l;
  if (
    ((l = i) ||
      (l = e !== null && e.memoizedState === null ? !1 : (o & 2) !== 0),
    l
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
              (e = Qt(e, r, n, null)),
              (a.return = t),
              (e.return = t),
              (a.sibling = e),
              (t.child = a),
              (t.child.memoizedState = di(n)),
              (t.memoizedState = ui),
              e)
            : sl(t, i))
    );
  if (((o = e.memoizedState), o !== null && ((l = o.dehydrated), l !== null)))
    return E0(e, t, i, r, l, o, n);
  if (a) {
    ((a = r.fallback), (i = t.mode), (o = e.child), (l = o.sibling));
    var u = { mode: "hidden", children: r.children };
    return (
      !(i & 1) && t.child !== o
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = u),
          (t.deletions = null))
        : ((r = It(o, u)), (r.subtreeFlags = o.subtreeFlags & 14680064)),
      l !== null ? (a = It(l, a)) : ((a = Qt(a, i, n, null)), (a.flags |= 2)),
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
    (r = It(a, { mode: "visible", children: r.children })),
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
function Ur(e, t, n, r) {
  return (
    r !== null && Yi(r),
    Tn(t, e.child, null, n),
    (e = sl(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function E0(e, t, n, r, o, a, i) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = Sa(Error(j(422)))), Ur(e, t, i, r))
      : t.memoizedState !== null
        ? ((t.child = e.child), (t.flags |= 128), null)
        : ((a = r.fallback),
          (o = t.mode),
          (r = Qo({ mode: "visible", children: r.children }, o, 0, null)),
          (a = Qt(a, o, i, null)),
          (a.flags |= 2),
          (r.return = t),
          (a.return = t),
          (r.sibling = a),
          (t.child = r),
          t.mode & 1 && Tn(t, e.child, null, i),
          (t.child.memoizedState = di(i)),
          (t.memoizedState = ui),
          a);
  if (!(t.mode & 1)) return Ur(e, t, i, null);
  if (o.data === "$!") {
    if (((r = o.nextSibling && o.nextSibling.dataset), r)) var l = r.dgst;
    return (
      (r = l),
      (a = Error(j(419))),
      (r = Sa(a, r, void 0)),
      Ur(e, t, i, r)
    );
  }
  if (((l = (i & e.childLanes) !== 0), Ae || l)) {
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
          ((a.retryLane = o), gt(e, o), tt(r, e, o, -1)));
    }
    return (ml(), (r = Sa(Error(j(421)))), Ur(e, t, i, r));
  }
  return o.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = B0.bind(null, e)),
      (o._reactRetry = t),
      null)
    : ((e = a.treeContext),
      (De = jt(o.nextSibling)),
      (Re = t),
      (re = !0),
      (qe = null),
      e !== null &&
        (($e[Ve++] = ft),
        ($e[Ve++] = pt),
        ($e[Ve++] = Kt),
        (ft = e.id),
        (pt = e.overflow),
        (Kt = t)),
      (t = sl(t, r.children)),
      (t.flags |= 4096),
      t);
}
function b1(e, t, n) {
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
  if ((ze(e, t, r.children, n), (r = oe.current), r & 2))
    ((r = (r & 1) | 2), (t.flags |= 128));
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null;) {
        if (e.tag === 13) e.memoizedState !== null && b1(e, n, t);
        else if (e.tag === 19) b1(e, n, t);
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
function yt(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (Xt |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(j(153));
  if (t.child !== null) {
    for (
      e = t.child, n = It(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;
    )
      ((e = e.sibling),
        (n = n.sibling = It(e, e.pendingProps)),
        (n.return = t));
    n.sibling = null;
  }
  return t.child;
}
function T0(e, t, n) {
  switch (t.tag) {
    case 3:
      (R2(t), En());
      break;
    case 5:
      d2(t);
      break;
    case 1:
      Pe(t.type) && ko(t);
      break;
    case 4:
      el(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        o = t.memoizedProps.value;
      (q(zo, r._currentValue), (r._currentValue = o));
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (q(oe, oe.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
            ? O2(e, t, n)
            : (q(oe, oe.current & 1),
              (e = yt(e, t, n)),
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
      return ((t.lanes = 0), _2(e, t, n));
  }
  return yt(e, t, n);
}
var F2, fi, $2, V2;
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
fi = function () {};
$2 = function (e, t, n, r) {
  var o = e.memoizedProps;
  if (o !== r) {
    ((e = t.stateNode), Wt(st.current));
    var a = null;
    switch (n) {
      case "input":
        ((o = Ia(e, o)), (r = Ia(e, r)), (a = []));
        break;
      case "select":
        ((o = ie({}, o, { value: void 0 })),
          (r = ie({}, r, { value: void 0 })),
          (a = []));
        break;
      case "textarea":
        ((o = Ra(e, o)), (r = Ra(e, r)), (a = []));
        break;
      default:
        typeof o.onClick != "function" &&
          typeof r.onClick == "function" &&
          (e.onclick = xo);
    }
    Ba(n, r);
    var i;
    n = null;
    for (c in o)
      if (!r.hasOwnProperty(c) && o.hasOwnProperty(c) && o[c] != null)
        if (c === "style") {
          var l = o[c];
          for (i in l) l.hasOwnProperty(i) && (n || (n = {}), (n[i] = ""));
        } else
          c !== "dangerouslySetInnerHTML" &&
            c !== "children" &&
            c !== "suppressContentEditableWarning" &&
            c !== "suppressHydrationWarning" &&
            c !== "autoFocus" &&
            (ir.hasOwnProperty(c)
              ? a || (a = [])
              : (a = a || []).push(c, null));
    for (c in r) {
      var u = r[c];
      if (
        ((l = o != null ? o[c] : void 0),
        r.hasOwnProperty(c) && u !== l && (u != null || l != null))
      )
        if (c === "style")
          if (l) {
            for (i in l)
              !l.hasOwnProperty(i) ||
                (u && u.hasOwnProperty(i)) ||
                (n || (n = {}), (n[i] = ""));
            for (i in u)
              u.hasOwnProperty(i) &&
                l[i] !== u[i] &&
                (n || (n = {}), (n[i] = u[i]));
          } else (n || (a || (a = []), a.push(c, n)), (n = u));
        else
          c === "dangerouslySetInnerHTML"
            ? ((u = u ? u.__html : void 0),
              (l = l ? l.__html : void 0),
              u != null && l !== u && (a = a || []).push(c, u))
            : c === "children"
              ? (typeof u != "string" && typeof u != "number") ||
                (a = a || []).push(c, "" + u)
              : c !== "suppressContentEditableWarning" &&
                c !== "suppressHydrationWarning" &&
                (ir.hasOwnProperty(c)
                  ? (u != null && c === "onScroll" && te("scroll", e),
                    a || l === u || (a = []))
                  : (a = a || []).push(c, u));
    }
    n && (a = a || []).push("style", n);
    var c = a;
    (t.updateQueue = c) && (t.flags |= 4);
  }
};
V2 = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function $n(e, t) {
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
function M0(e, t, n) {
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
      return (Pe(t.type) && So(), ke(t), null);
    case 3:
      return (
        (r = t.stateNode),
        Mn(),
        ne(Le),
        ne(Ce),
        nl(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (Vr(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), qe !== null && (xi(qe), (qe = null)))),
        fi(e, t),
        ke(t),
        null
      );
    case 5:
      tl(t);
      var o = Wt(yr.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        ($2(e, t, n, r, o),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152)));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(j(166));
          return (ke(t), null);
        }
        if (((e = Wt(st.current)), Vr(t))) {
          ((r = t.stateNode), (n = t.type));
          var a = t.memoizedProps;
          switch (((r[it] = t), (r[vr] = a), (e = (t.mode & 1) !== 0), n)) {
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
              for (o = 0; o < Zn.length; o++) te(Zn[o], r);
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
              (Il(r, a), te("invalid", r));
          }
          (Ba(n, a), (o = null));
          for (var i in a)
            if (a.hasOwnProperty(i)) {
              var l = a[i];
              i === "children"
                ? typeof l == "string"
                  ? r.textContent !== l &&
                    (a.suppressHydrationWarning !== !0 &&
                      $r(r.textContent, l, e),
                    (o = ["children", l]))
                  : typeof l == "number" &&
                    r.textContent !== "" + l &&
                    (a.suppressHydrationWarning !== !0 &&
                      $r(r.textContent, l, e),
                    (o = ["children", "" + l]))
                : ir.hasOwnProperty(i) &&
                  l != null &&
                  i === "onScroll" &&
                  te("scroll", r);
            }
          switch (n) {
            case "input":
              (Pr(r), Pl(r, a, !0));
              break;
            case "textarea":
              (Pr(r), _l(r));
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
            e === "http://www.w3.org/1999/xhtml" && (e = vs(n)),
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
            (e[vr] = r),
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
                for (o = 0; o < Zn.length; o++) te(Zn[o], e);
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
                (Ll(e, r), (o = Ia(e, r)), te("invalid", e));
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
                (Il(e, r), (o = Ra(e, r)), te("invalid", e));
                break;
              default:
                o = r;
            }
            (Ba(n, o), (l = o));
            for (a in l)
              if (l.hasOwnProperty(a)) {
                var u = l[a];
                a === "style"
                  ? ws(e, u)
                  : a === "dangerouslySetInnerHTML"
                    ? ((u = u ? u.__html : void 0), u != null && gs(e, u))
                    : a === "children"
                      ? typeof u == "string"
                        ? (n !== "textarea" || u !== "") && lr(e, u)
                        : typeof u == "number" && lr(e, "" + u)
                      : a !== "suppressContentEditableWarning" &&
                        a !== "suppressHydrationWarning" &&
                        a !== "autoFocus" &&
                        (ir.hasOwnProperty(a)
                          ? u != null && a === "onScroll" && te("scroll", e)
                          : u != null && Li(e, a, u, i));
              }
            switch (n) {
              case "input":
                (Pr(e), Pl(e, r, !1));
                break;
              case "textarea":
                (Pr(e), _l(e));
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + _t(r.value));
                break;
              case "select":
                ((e.multiple = !!r.multiple),
                  (a = r.value),
                  a != null
                    ? gn(e, !!r.multiple, a, !1)
                    : r.defaultValue != null &&
                      gn(e, !!r.multiple, r.defaultValue, !0));
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
        if (typeof r != "string" && t.stateNode === null) throw Error(j(166));
        if (((n = Wt(yr.current)), Wt(st.current), Vr(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[it] = t),
            (a = r.nodeValue !== n) && ((e = Re), e !== null))
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
        if (re && De !== null && t.mode & 1 && !(t.flags & 128))
          (i2(), En(), (t.flags |= 98560), (a = !1));
        else if (((a = Vr(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!a) throw Error(j(318));
            if (
              ((a = t.memoizedState),
              (a = a !== null ? a.dehydrated : null),
              !a)
            )
              throw Error(j(317));
            a[it] = t;
          } else
            (En(),
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
        Mn(),
        fi(e, t),
        e === null && mr(t.stateNode.containerInfo),
        ke(t),
        null
      );
    case 10:
      return (Xi(t.type._context), ke(t), null);
    case 17:
      return (Pe(t.type) && So(), ke(t), null);
    case 19:
      if ((ne(oe), (a = t.memoizedState), a === null)) return (ke(t), null);
      if (((r = (t.flags & 128) !== 0), (i = a.rendering), i === null))
        if (r) $n(a, !1);
        else {
          if (me !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null;) {
              if (((i = Mo(e)), i !== null)) {
                for (
                  t.flags |= 128,
                    $n(a, !1),
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
            de() > jn &&
            ((t.flags |= 128), (r = !0), $n(a, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = Mo(i)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              $n(a, !0),
              a.tail === null && a.tailMode === "hidden" && !i.alternate && !re)
            )
              return (ke(t), null);
          } else
            2 * de() - a.renderingStartTime > jn &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), $n(a, !1), (t.lanes = 4194304));
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
        pl(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? _e & 1073741824 && (ke(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : ke(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(j(156, t.tag));
}
function N0(e, t) {
  switch ((Qi(t), t.tag)) {
    case 1:
      return (
        Pe(t.type) && So(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        Mn(),
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
        if (t.alternate === null) throw Error(j(340));
        En();
      }
      return (
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return (ne(oe), null);
    case 4:
      return (Mn(), null);
    case 10:
      return (Xi(t.type._context), null);
    case 22:
    case 23:
      return (pl(), null);
    case 24:
      return null;
    default:
      return null;
  }
}
var Wr = !1,
  be = !1,
  j0 = typeof WeakSet == "function" ? WeakSet : Set,
  O = null;
function hn(e, t) {
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
function pi(e, t, n) {
  try {
    n();
  } catch (r) {
    ue(e, t, r);
  }
}
var C1 = !1;
function A0(e, t) {
  if (((Za = go), (e = Qs()), Wi(e))) {
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
            l = -1,
            u = -1,
            c = 0,
            h = 0,
            p = e,
            m = null;
          t: for (;;) {
            for (
              var w;
              p !== n || (o !== 0 && p.nodeType !== 3) || (l = i + o),
                p !== a || (r !== 0 && p.nodeType !== 3) || (u = i + r),
                p.nodeType === 3 && (i += p.nodeValue.length),
                (w = p.firstChild) !== null;
            )
              ((m = p), (p = w));
            for (;;) {
              if (p === e) break t;
              if (
                (m === n && ++c === o && (l = i),
                m === a && ++h === r && (u = i),
                (w = p.nextSibling) !== null)
              )
                break;
              ((p = m), (m = p.parentNode));
            }
            p = w;
          }
          n = l === -1 || u === -1 ? null : { start: l, end: u };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Xa = { focusedElem: e, selectionRange: n }, go = !1, O = t; O !== null;)
    if (((t = O), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      ((e.return = t), (O = e));
    else
      for (; O !== null;) {
        t = O;
        try {
          var b = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (b !== null) {
                  var S = b.memoizedProps,
                    z = b.memoizedState,
                    f = t.stateNode,
                    d = f.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? S : Xe(t.type, S),
                      z
                    );
                  f.__reactInternalSnapshotBeforeUpdate = d;
                }
                break;
              case 3:
                var g = t.stateNode.containerInfo;
                g.nodeType === 1
                  ? (g.textContent = "")
                  : g.nodeType === 9 &&
                    g.documentElement &&
                    g.removeChild(g.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(j(163));
            }
        } catch (x) {
          ue(t, t.return, x);
        }
        if (((e = t.sibling), e !== null)) {
          ((e.return = t.return), (O = e));
          break;
        }
        O = t.return;
      }
  return ((b = C1), (C1 = !1), b);
}
function rr(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var o = (r = r.next);
    do {
      if ((o.tag & e) === e) {
        var a = o.destroy;
        ((o.destroy = void 0), a !== void 0 && pi(t, n, a));
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
function H2(e) {
  var t = e.alternate;
  (t !== null && ((e.alternate = null), H2(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[it], delete t[vr], delete t[ei], delete t[p0], delete t[m0])),
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
function z1(e) {
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
function xt(e, t, n) {
  for (n = n.child; n !== null;) (W2(e, t, n), (n = n.sibling));
}
function W2(e, t, n) {
  if (lt && typeof lt.onCommitFiberUnmount == "function")
    try {
      lt.onCommitFiberUnmount(Ro, n);
    } catch {}
  switch (n.tag) {
    case 5:
      be || hn(n, t);
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
              ? ha(e.parentNode, n)
              : e.nodeType === 1 && ha(e, n),
            dr(e))
          : ha(ye, n.stateNode));
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
        !be &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        o = r = r.next;
        do {
          var a = o,
            i = a.destroy;
          ((a = a.tag),
            i !== void 0 && (a & 2 || a & 4) && pi(n, t, i),
            (o = o.next));
        } while (o !== r);
      }
      xt(e, t, n);
      break;
    case 1:
      if (
        !be &&
        (hn(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          ((r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount());
        } catch (l) {
          ue(n, t, l);
        }
      xt(e, t, n);
      break;
    case 21:
      xt(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((be = (r = be) || n.memoizedState !== null), xt(e, t, n), (be = r))
        : xt(e, t, n);
      break;
    default:
      xt(e, t, n);
  }
}
function E1(e) {
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
        var a = e,
          i = t,
          l = i;
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
        if (ye === null) throw Error(j(160));
        (W2(a, i, o), (ye = null), (Je = !1));
        var u = o.alternate;
        (u !== null && (u.return = null), (o.return = null));
      } catch (c) {
        ue(o, t, c);
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
          (rr(3, e, e.return), Wo(3, e));
        } catch (S) {
          ue(e, e.return, S);
        }
        try {
          rr(5, e, e.return);
        } catch (S) {
          ue(e, e.return, S);
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
          lr(o, "");
        } catch (S) {
          ue(e, e.return, S);
        }
      }
      if (r & 4 && ((o = e.stateNode), o != null)) {
        var a = e.memoizedProps,
          i = n !== null ? n.memoizedProps : a,
          l = e.type,
          u = e.updateQueue;
        if (((e.updateQueue = null), u !== null))
          try {
            (l === "input" && a.type === "radio" && a.name != null && ms(o, a),
              Fa(l, i));
            var c = Fa(l, a);
            for (i = 0; i < u.length; i += 2) {
              var h = u[i],
                p = u[i + 1];
              h === "style"
                ? ws(o, p)
                : h === "dangerouslySetInnerHTML"
                  ? gs(o, p)
                  : h === "children"
                    ? lr(o, p)
                    : Li(o, h, p, c);
            }
            switch (l) {
              case "input":
                _a(o, a);
                break;
              case "textarea":
                hs(o, a);
                break;
              case "select":
                var m = o._wrapperState.wasMultiple;
                o._wrapperState.wasMultiple = !!a.multiple;
                var w = a.value;
                w != null
                  ? gn(o, !!a.multiple, w, !1)
                  : m !== !!a.multiple &&
                    (a.defaultValue != null
                      ? gn(o, !!a.multiple, a.defaultValue, !0)
                      : gn(o, !!a.multiple, a.multiple ? [] : "", !1));
            }
            o[vr] = a;
          } catch (S) {
            ue(e, e.return, S);
          }
      }
      break;
    case 6:
      if ((Ke(t, e), ot(e), r & 4)) {
        if (e.stateNode === null) throw Error(j(162));
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
          dr(t.containerInfo);
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
        r & 4 && E1(e));
      break;
    case 22:
      if (
        ((h = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((be = (c = be) || h), Ke(t, e), (be = c)) : Ke(t, e),
        ot(e),
        r & 8192)
      ) {
        if (
          ((c = e.memoizedState !== null),
          (e.stateNode.isHidden = c) && !h && e.mode & 1)
        )
          for (O = e, h = e.child; h !== null;) {
            for (p = O = h; O !== null;) {
              switch (((m = O), (w = m.child), m.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  rr(4, m, m.return);
                  break;
                case 1:
                  hn(m, m.return);
                  var b = m.stateNode;
                  if (typeof b.componentWillUnmount == "function") {
                    ((r = m), (n = m.return));
                    try {
                      ((t = r),
                        (b.props = t.memoizedProps),
                        (b.state = t.memoizedState),
                        b.componentWillUnmount());
                    } catch (S) {
                      ue(r, n, S);
                    }
                  }
                  break;
                case 5:
                  hn(m, m.return);
                  break;
                case 22:
                  if (m.memoizedState !== null) {
                    M1(p);
                    continue;
                  }
              }
              w !== null ? ((w.return = m), (O = w)) : M1(p);
            }
            h = h.sibling;
          }
        e: for (h = null, p = e; ;) {
          if (p.tag === 5) {
            if (h === null) {
              h = p;
              try {
                ((o = p.stateNode),
                  c
                    ? ((a = o.style),
                      typeof a.setProperty == "function"
                        ? a.setProperty("display", "none", "important")
                        : (a.display = "none"))
                    : ((l = p.stateNode),
                      (u = p.memoizedProps.style),
                      (i =
                        u != null && u.hasOwnProperty("display")
                          ? u.display
                          : null),
                      (l.style.display = ys("display", i))));
              } catch (S) {
                ue(e, e.return, S);
              }
            }
          } else if (p.tag === 6) {
            if (h === null)
              try {
                p.stateNode.nodeValue = c ? "" : p.memoizedProps;
              } catch (S) {
                ue(e, e.return, S);
              }
          } else if (
            ((p.tag !== 22 && p.tag !== 23) ||
              p.memoizedState === null ||
              p === e) &&
            p.child !== null
          ) {
            ((p.child.return = p), (p = p.child));
            continue;
          }
          if (p === e) break e;
          for (; p.sibling === null;) {
            if (p.return === null || p.return === e) break e;
            (h === p && (h = null), (p = p.return));
          }
          (h === p && (h = null),
            (p.sibling.return = p.return),
            (p = p.sibling));
        }
      }
      break;
    case 19:
      (Ke(t, e), ot(e), r & 4 && E1(e));
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
        throw Error(j(160));
      }
      switch (r.tag) {
        case 5:
          var o = r.stateNode;
          r.flags & 32 && (lr(o, ""), (r.flags &= -33));
          var a = z1(e);
          vi(e, a, o);
          break;
        case 3:
        case 4:
          var i = r.stateNode.containerInfo,
            l = z1(e);
          hi(e, l, i);
          break;
        default:
          throw Error(j(161));
      }
    } catch (u) {
      ue(e, e.return, u);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function L0(e, t, n) {
  ((O = e), Q2(e));
}
function Q2(e, t, n) {
  for (var r = (e.mode & 1) !== 0; O !== null;) {
    var o = O,
      a = o.child;
    if (o.tag === 22 && r) {
      var i = o.memoizedState !== null || Wr;
      if (!i) {
        var l = o.alternate,
          u = (l !== null && l.memoizedState !== null) || be;
        l = Wr;
        var c = be;
        if (((Wr = i), (be = u) && !c))
          for (O = o; O !== null;)
            ((i = O),
              (u = i.child),
              i.tag === 22 && i.memoizedState !== null
                ? N1(o)
                : u !== null
                  ? ((u.return = i), (O = u))
                  : N1(o));
        for (; a !== null;) ((O = a), Q2(a), (a = a.sibling));
        ((O = o), (Wr = l), (be = c));
      }
      T1(e);
    } else
      o.subtreeFlags & 8772 && a !== null ? ((a.return = o), (O = a)) : T1(e);
  }
}
function T1(e) {
  for (; O !== null;) {
    var t = O;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              be || Wo(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !be)
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
              a !== null && d1(t, a, r);
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
                d1(t, i, n);
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
                  var h = c.memoizedState;
                  if (h !== null) {
                    var p = h.dehydrated;
                    p !== null && dr(p);
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
              throw Error(j(163));
          }
        be || (t.flags & 512 && mi(t));
      } catch (m) {
        ue(t, t.return, m);
      }
    }
    if (t === e) {
      O = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      ((n.return = t.return), (O = n));
      break;
    }
    O = t.return;
  }
}
function M1(e) {
  for (; O !== null;) {
    var t = O;
    if (t === e) {
      O = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      ((n.return = t.return), (O = n));
      break;
    }
    O = t.return;
  }
}
function N1(e) {
  for (; O !== null;) {
    var t = O;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Wo(4, t);
          } catch (u) {
            ue(t, n, u);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var o = t.return;
            try {
              r.componentDidMount();
            } catch (u) {
              ue(t, o, u);
            }
          }
          var a = t.return;
          try {
            mi(t);
          } catch (u) {
            ue(t, a, u);
          }
          break;
        case 5:
          var i = t.return;
          try {
            mi(t);
          } catch (u) {
            ue(t, i, u);
          }
      }
    } catch (u) {
      ue(t, t.return, u);
    }
    if (t === e) {
      O = null;
      break;
    }
    var l = t.sibling;
    if (l !== null) {
      ((l.return = t.return), (O = l));
      break;
    }
    O = t.return;
  }
}
var P0 = Math.ceil,
  Ao = wt.ReactCurrentDispatcher,
  cl = wt.ReactCurrentOwner,
  Ue = wt.ReactCurrentBatchConfig,
  Z = 0,
  ve = null,
  fe = null,
  we = 0,
  _e = 0,
  vn = Ot(0),
  me = 0,
  kr = null,
  Xt = 0,
  Go = 0,
  ul = 0,
  or = null,
  je = null,
  dl = 0,
  jn = 1 / 0,
  ut = null,
  Lo = !1,
  gi = null,
  Lt = null,
  Gr = !1,
  Et = null,
  Po = 0,
  ar = 0,
  yi = null,
  lo = -1,
  so = 0;
function Ee() {
  return Z & 6 ? de() : lo !== -1 ? lo : (lo = de());
}
function Pt(e) {
  return e.mode & 1
    ? Z & 2 && we !== 0
      ? we & -we
      : v0.transition !== null
        ? (so === 0 && (so = As()), so)
        : ((e = J),
          e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : Os(e.type))),
          e)
    : 1;
}
function tt(e, t, n, r) {
  if (50 < ar) throw ((ar = 0), (yi = null), Error(j(185)));
  (Tr(e, n, r),
    (!(Z & 2) || e !== ve) &&
      (e === ve && (!(Z & 2) && (Go |= n), me === 4 && Ct(e, we)),
      Ie(e, r),
      n === 1 && Z === 0 && !(t.mode & 1) && ((jn = de() + 500), Vo && Bt())));
}
function Ie(e, t) {
  var n = e.callbackNode;
  vu(e, t);
  var r = vo(e, e === ve ? we : 0);
  if (r === 0)
    (n !== null && Ol(n), (e.callbackNode = null), (e.callbackPriority = 0));
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && Ol(n), t === 1))
      (e.tag === 0 ? h0(j1.bind(null, e)) : r2(j1.bind(null, e)),
        d0(function () {
          !(Z & 6) && Bt();
        }),
        (n = null));
    else {
      switch (Ls(r)) {
        case 1:
          n = Ri;
          break;
        case 4:
          n = Ns;
          break;
        case 16:
          n = ho;
          break;
        case 536870912:
          n = js;
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
  if (((lo = -1), (so = 0), Z & 6)) throw Error(j(327));
  var n = e.callbackNode;
  if (kn() && e.callbackNode !== n) return null;
  var r = vo(e, e === ve ? we : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = Io(e, r);
  else {
    t = r;
    var o = Z;
    Z |= 2;
    var a = Z2();
    (ve !== e || we !== t) && ((ut = null), (jn = de() + 500), Gt(e, t));
    do
      try {
        D0();
        break;
      } catch (l) {
        K2(e, l);
      }
    while (!0);
    (Zi(),
      (Ao.current = a),
      (Z = o),
      fe !== null ? (t = 0) : ((ve = null), (we = 0), (t = me)));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((o = Wa(e)), o !== 0 && ((r = o), (t = wi(e, o)))), t === 1)
    )
      throw ((n = kr), Gt(e, 0), Ct(e, r), Ie(e, de()), n);
    if (t === 6) Ct(e, r);
    else {
      if (
        ((o = e.current.alternate),
        !(r & 30) &&
          !I0(o) &&
          ((t = Io(e, r)),
          t === 2 && ((a = Wa(e)), a !== 0 && ((r = a), (t = wi(e, a)))),
          t === 1))
      )
        throw ((n = kr), Gt(e, 0), Ct(e, r), Ie(e, de()), n);
      switch (((e.finishedWork = o), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(j(345));
        case 2:
          Vt(e, je, ut);
          break;
        case 3:
          if (
            (Ct(e, r), (r & 130023424) === r && ((t = dl + 500 - de()), 10 < t))
          ) {
            if (vo(e, 0) !== 0) break;
            if (((o = e.suspendedLanes), (o & r) !== r)) {
              (Ee(), (e.pingedLanes |= e.suspendedLanes & o));
              break;
            }
            e.timeoutHandle = qa(Vt.bind(null, e, je, ut), t);
            break;
          }
          Vt(e, je, ut);
          break;
        case 4:
          if ((Ct(e, r), (r & 4194240) === r)) break;
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
                          : 1960 * P0(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = qa(Vt.bind(null, e, je, ut), r);
            break;
          }
          Vt(e, je, ut);
          break;
        case 5:
          Vt(e, je, ut);
          break;
        default:
          throw Error(j(329));
      }
    }
  }
  return (Ie(e, de()), e.callbackNode === n ? Y2.bind(null, e) : null);
}
function wi(e, t) {
  var n = or;
  return (
    e.current.memoizedState.isDehydrated && (Gt(e, t).flags |= 256),
    (e = Io(e, t)),
    e !== 2 && ((t = je), (je = n), t !== null && xi(t)),
    e
  );
}
function xi(e) {
  je === null ? (je = e) : je.push.apply(je, e);
}
function I0(e) {
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
function Ct(e, t) {
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
function j1(e) {
  if (Z & 6) throw Error(j(327));
  kn();
  var t = vo(e, 0);
  if (!(t & 1)) return (Ie(e, de()), null);
  var n = Io(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Wa(e);
    r !== 0 && ((t = r), (n = wi(e, r)));
  }
  if (n === 1) throw ((n = kr), Gt(e, 0), Ct(e, t), Ie(e, de()), n);
  if (n === 6) throw Error(j(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    Vt(e, je, ut),
    Ie(e, de()),
    null
  );
}
function fl(e, t) {
  var n = Z;
  Z |= 1;
  try {
    return e(t);
  } finally {
    ((Z = n), Z === 0 && ((jn = de() + 500), Vo && Bt()));
  }
}
function Jt(e) {
  Et !== null && Et.tag === 0 && !(Z & 6) && kn();
  var t = Z;
  Z |= 1;
  var n = Ue.transition,
    r = J;
  try {
    if (((Ue.transition = null), (J = 1), e)) return e();
  } finally {
    ((J = r), (Ue.transition = n), (Z = t), !(Z & 6) && Bt());
  }
}
function pl() {
  ((_e = vn.current), ne(vn));
}
function Gt(e, t) {
  ((e.finishedWork = null), (e.finishedLanes = 0));
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), u0(n)), fe !== null))
    for (n = fe.return; n !== null;) {
      var r = n;
      switch ((Qi(r), r.tag)) {
        case 1:
          ((r = r.type.childContextTypes), r != null && So());
          break;
        case 3:
          (Mn(), ne(Le), ne(Ce), nl());
          break;
        case 5:
          tl(r);
          break;
        case 4:
          Mn();
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
          pl();
      }
      n = n.return;
    }
  if (
    ((ve = e),
    (fe = e = It(e.current, null)),
    (we = _e = t),
    (me = 0),
    (kr = null),
    (ul = Go = Xt = 0),
    (je = or = null),
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
    var n = fe;
    try {
      if ((Zi(), (oo.current = jo), No)) {
        for (var r = ae.memoizedState; r !== null;) {
          var o = r.queue;
          (o !== null && (o.pending = null), (r = r.next));
        }
        No = !1;
      }
      if (
        ((Zt = 0),
        (he = pe = ae = null),
        (nr = !1),
        (wr = 0),
        (cl.current = null),
        n === null || n.return === null)
      ) {
        ((me = 1), (kr = t), (fe = null));
        break;
      }
      e: {
        var a = e,
          i = n.return,
          l = n,
          u = t;
        if (
          ((t = we),
          (l.flags |= 32768),
          u !== null && typeof u == "object" && typeof u.then == "function")
        ) {
          var c = u,
            h = l,
            p = h.tag;
          if (!(h.mode & 1) && (p === 0 || p === 11 || p === 15)) {
            var m = h.alternate;
            m
              ? ((h.updateQueue = m.updateQueue),
                (h.memoizedState = m.memoizedState),
                (h.lanes = m.lanes))
              : ((h.updateQueue = null), (h.memoizedState = null));
          }
          var w = g1(i);
          if (w !== null) {
            ((w.flags &= -257),
              y1(w, i, l, a, t),
              w.mode & 1 && v1(a, c, t),
              (t = w),
              (u = c));
            var b = t.updateQueue;
            if (b === null) {
              var S = new Set();
              (S.add(u), (t.updateQueue = S));
            } else b.add(u);
            break e;
          } else {
            if (!(t & 1)) {
              (v1(a, c, t), ml());
              break e;
            }
            u = Error(j(426));
          }
        } else if (re && l.mode & 1) {
          var z = g1(i);
          if (z !== null) {
            (!(z.flags & 65536) && (z.flags |= 256),
              y1(z, i, l, a, t),
              Yi(Nn(u, l)));
            break e;
          }
        }
        ((a = u = Nn(u, l)),
          me !== 4 && (me = 2),
          or === null ? (or = [a]) : or.push(a),
          (a = i));
        do {
          switch (a.tag) {
            case 3:
              ((a.flags |= 65536), (t &= -t), (a.lanes |= t));
              var f = L2(a, u, t);
              u1(a, f);
              break e;
            case 1:
              l = u;
              var d = a.type,
                g = a.stateNode;
              if (
                !(a.flags & 128) &&
                (typeof d.getDerivedStateFromError == "function" ||
                  (g !== null &&
                    typeof g.componentDidCatch == "function" &&
                    (Lt === null || !Lt.has(g))))
              ) {
                ((a.flags |= 65536), (t &= -t), (a.lanes |= t));
                var x = P2(a, l, t);
                u1(a, x);
                break e;
              }
          }
          a = a.return;
        } while (a !== null);
      }
      J2(n);
    } catch (k) {
      ((t = k), fe === n && n !== null && (fe = n = n.return));
      continue;
    }
    break;
  } while (!0);
}
function Z2() {
  var e = Ao.current;
  return ((Ao.current = jo), e === null ? jo : e);
}
function ml() {
  ((me === 0 || me === 3 || me === 2) && (me = 4),
    ve === null || (!(Xt & 268435455) && !(Go & 268435455)) || Ct(ve, we));
}
function Io(e, t) {
  var n = Z;
  Z |= 2;
  var r = Z2();
  (ve !== e || we !== t) && ((ut = null), Gt(e, t));
  do
    try {
      _0();
      break;
    } catch (o) {
      K2(e, o);
    }
  while (!0);
  if ((Zi(), (Z = n), (Ao.current = r), fe !== null)) throw Error(j(261));
  return ((ve = null), (we = 0), me);
}
function _0() {
  for (; fe !== null;) X2(fe);
}
function D0() {
  for (; fe !== null && !lu();) X2(fe);
}
function X2(e) {
  var t = ec(e.alternate, e, _e);
  ((e.memoizedProps = e.pendingProps),
    t === null ? J2(e) : (fe = t),
    (cl.current = null));
}
function J2(e) {
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
    } else if (((n = M0(n, t, _e)), n !== null)) {
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
  var r = J,
    o = Ue.transition;
  try {
    ((Ue.transition = null), (J = 1), R0(e, t, n, r));
  } finally {
    ((Ue.transition = o), (J = r));
  }
  return null;
}
function R0(e, t, n, r) {
  do kn();
  while (Et !== null);
  if (Z & 6) throw Error(j(327));
  n = e.finishedWork;
  var o = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(j(177));
  ((e.callbackNode = null), (e.callbackPriority = 0));
  var a = n.lanes | n.childLanes;
  if (
    (gu(e, a),
    e === ve && ((fe = ve = null), (we = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      Gr ||
      ((Gr = !0),
      tc(ho, function () {
        return (kn(), null);
      })),
    (a = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || a)
  ) {
    ((a = Ue.transition), (Ue.transition = null));
    var i = J;
    J = 1;
    var l = Z;
    ((Z |= 4),
      (cl.current = null),
      A0(e, n),
      G2(n, e),
      r0(Xa),
      (go = !!Za),
      (Xa = Za = null),
      (e.current = n),
      L0(n),
      su(),
      (Z = l),
      (J = i),
      (Ue.transition = a));
  } else e.current = n;
  if (
    (Gr && ((Gr = !1), (Et = e), (Po = o)),
    (a = e.pendingLanes),
    a === 0 && (Lt = null),
    du(n.stateNode),
    Ie(e, de()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      ((o = t[n]), r(o.value, { componentStack: o.stack, digest: o.digest }));
  if (Lo) throw ((Lo = !1), (e = gi), (gi = null), e);
  return (
    Po & 1 && e.tag !== 0 && kn(),
    (a = e.pendingLanes),
    a & 1 ? (e === yi ? ar++ : ((ar = 0), (yi = e))) : (ar = 0),
    Bt(),
    null
  );
}
function kn() {
  if (Et !== null) {
    var e = Ls(Po),
      t = Ue.transition,
      n = J;
    try {
      if (((Ue.transition = null), (J = 16 > e ? 16 : e), Et === null))
        var r = !1;
      else {
        if (((e = Et), (Et = null), (Po = 0), Z & 6)) throw Error(j(331));
        var o = Z;
        for (Z |= 4, O = e.current; O !== null;) {
          var a = O,
            i = a.child;
          if (O.flags & 16) {
            var l = a.deletions;
            if (l !== null) {
              for (var u = 0; u < l.length; u++) {
                var c = l[u];
                for (O = c; O !== null;) {
                  var h = O;
                  switch (h.tag) {
                    case 0:
                    case 11:
                    case 15:
                      rr(8, h, a);
                  }
                  var p = h.child;
                  if (p !== null) ((p.return = h), (O = p));
                  else
                    for (; O !== null;) {
                      h = O;
                      var m = h.sibling,
                        w = h.return;
                      if ((H2(h), h === c)) {
                        O = null;
                        break;
                      }
                      if (m !== null) {
                        ((m.return = w), (O = m));
                        break;
                      }
                      O = w;
                    }
                }
              }
              var b = a.alternate;
              if (b !== null) {
                var S = b.child;
                if (S !== null) {
                  b.child = null;
                  do {
                    var z = S.sibling;
                    ((S.sibling = null), (S = z));
                  } while (S !== null);
                }
              }
              O = a;
            }
          }
          if (a.subtreeFlags & 2064 && i !== null) ((i.return = a), (O = i));
          else
            e: for (; O !== null;) {
              if (((a = O), a.flags & 2048))
                switch (a.tag) {
                  case 0:
                  case 11:
                  case 15:
                    rr(9, a, a.return);
                }
              var f = a.sibling;
              if (f !== null) {
                ((f.return = a.return), (O = f));
                break e;
              }
              O = a.return;
            }
        }
        var d = e.current;
        for (O = d; O !== null;) {
          i = O;
          var g = i.child;
          if (i.subtreeFlags & 2064 && g !== null) ((g.return = i), (O = g));
          else
            e: for (i = d; O !== null;) {
              if (((l = O), l.flags & 2048))
                try {
                  switch (l.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Wo(9, l);
                  }
                } catch (k) {
                  ue(l, l.return, k);
                }
              if (l === i) {
                O = null;
                break e;
              }
              var x = l.sibling;
              if (x !== null) {
                ((x.return = l.return), (O = x));
                break e;
              }
              O = l.return;
            }
        }
        if (
          ((Z = o), Bt(), lt && typeof lt.onPostCommitFiberRoot == "function")
        )
          try {
            lt.onPostCommitFiberRoot(Ro, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      ((J = n), (Ue.transition = t));
    }
  }
  return !1;
}
function A1(e, t, n) {
  ((t = Nn(n, t)),
    (t = L2(e, t, 1)),
    (e = At(e, t, 1)),
    (t = Ee()),
    e !== null && (Tr(e, 1, t), Ie(e, t)));
}
function ue(e, t, n) {
  if (e.tag === 3) A1(e, e, n);
  else
    for (; t !== null;) {
      if (t.tag === 3) {
        A1(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (Lt === null || !Lt.has(r)))
        ) {
          ((e = Nn(n, e)),
            (e = P2(t, e, 1)),
            (t = At(t, e, 1)),
            (e = Ee()),
            t !== null && (Tr(t, 1, e), Ie(t, e)));
          break;
        }
      }
      t = t.return;
    }
}
function O0(e, t, n) {
  var r = e.pingCache;
  (r !== null && r.delete(t),
    (t = Ee()),
    (e.pingedLanes |= e.suspendedLanes & n),
    ve === e &&
      (we & n) === n &&
      (me === 4 || (me === 3 && (we & 130023424) === we && 500 > de() - dl)
        ? Gt(e, 0)
        : (ul |= n)),
    Ie(e, t));
}
function q2(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = Dr), (Dr <<= 1), !(Dr & 130023424) && (Dr = 4194304))
      : (t = 1));
  var n = Ee();
  ((e = gt(e, t)), e !== null && (Tr(e, t, n), Ie(e, n)));
}
function B0(e) {
  var t = e.memoizedState,
    n = 0;
  (t !== null && (n = t.retryLane), q2(e, n));
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
      throw Error(j(314));
  }
  (r !== null && r.delete(t), q2(e, n));
}
var ec;
ec = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || Le.current) Ae = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return ((Ae = !1), T0(e, t, n));
      Ae = !!(e.flags & 131072);
    }
  else ((Ae = !1), re && t.flags & 1048576 && o2(t, Co, t.index));
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      (io(e, t), (e = t.pendingProps));
      var o = zn(t, Ce.current);
      (Sn(t, n), (o = ol(null, t, r, e, o, n)));
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
            Pe(r) ? ((a = !0), ko(t)) : (a = !1),
            (t.memoizedState =
              o.state !== null && o.state !== void 0 ? o.state : null),
            qi(t),
            (o.updater = Uo),
            (t.stateNode = o),
            (o._reactInternals = t),
            ii(t, r, e, n),
            (t = ci(null, t, r, !0, a, n)))
          : ((t.tag = 0), re && a && Gi(t), ze(null, t, o, n), (t = t.child)),
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
            t = si(null, t, r, e, n);
            break e;
          case 1:
            t = S1(null, t, r, e, n);
            break e;
          case 11:
            t = w1(null, t, r, e, n);
            break e;
          case 14:
            t = x1(null, t, r, Xe(r.type, e), n);
            break e;
        }
        throw Error(j(306, r, ""));
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
        S1(e, t, r, o, n)
      );
    case 3:
      e: {
        if ((R2(t), e === null)) throw Error(j(387));
        ((r = t.pendingProps),
          (a = t.memoizedState),
          (o = a.element),
          u2(e, t),
          To(t, r, null, n));
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
            ((o = Nn(Error(j(423)), t)), (t = k1(e, t, r, n, o)));
            break e;
          } else if (r !== o) {
            ((o = Nn(Error(j(424)), t)), (t = k1(e, t, r, n, o)));
            break e;
          } else
            for (
              De = jt(t.stateNode.containerInfo.firstChild),
                Re = t,
                re = !0,
                qe = null,
                n = s2(t, null, r, n),
                t.child = n;
              n;
            )
              ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
        else {
          if ((En(), r === o)) {
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
        d2(t),
        e === null && ri(t),
        (r = t.type),
        (o = t.pendingProps),
        (a = e !== null ? e.memoizedProps : null),
        (i = o.children),
        Ja(r, o) ? (i = null) : a !== null && Ja(r, a) && (t.flags |= 32),
        D2(e, t),
        ze(e, t, i, n),
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
        e === null ? (t.child = Tn(t, null, r, n)) : ze(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : Xe(r, o)),
        w1(e, t, r, o, n)
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
          (a = t.memoizedProps),
          (i = o.value),
          q(zo, r._currentValue),
          (r._currentValue = i),
          a !== null)
        )
          if (nt(a.value, i)) {
            if (a.children === o.children && !Le.current) {
              t = yt(e, t, n);
              break e;
            }
          } else
            for (a = t.child, a !== null && (a.return = t); a !== null;) {
              var l = a.dependencies;
              if (l !== null) {
                i = a.child;
                for (var u = l.firstContext; u !== null;) {
                  if (u.context === r) {
                    if (a.tag === 1) {
                      ((u = mt(-1, n & -n)), (u.tag = 2));
                      var c = a.updateQueue;
                      if (c !== null) {
                        c = c.shared;
                        var h = c.pending;
                        (h === null
                          ? (u.next = u)
                          : ((u.next = h.next), (h.next = u)),
                          (c.pending = u));
                      }
                    }
                    ((a.lanes |= n),
                      (u = a.alternate),
                      u !== null && (u.lanes |= n),
                      oi(a.return, n, t),
                      (l.lanes |= n));
                    break;
                  }
                  u = u.next;
                }
              } else if (a.tag === 10) i = a.type === t.type ? null : a.child;
              else if (a.tag === 18) {
                if (((i = a.return), i === null)) throw Error(j(341));
                ((i.lanes |= n),
                  (l = i.alternate),
                  l !== null && (l.lanes |= n),
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
        x1(e, t, r, o, n)
      );
    case 15:
      return I2(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : Xe(r, o)),
        io(e, t),
        (t.tag = 1),
        Pe(r) ? ((e = !0), ko(t)) : (e = !1),
        Sn(t, n),
        A2(t, r, o),
        ii(t, r, o, n),
        ci(null, t, r, !0, e, n)
      );
    case 19:
      return B2(e, t, n);
    case 22:
      return _2(e, t, n);
  }
  throw Error(j(156, t.tag));
};
function tc(e, t) {
  return Ms(e, t);
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
function hl(e) {
  return ((e = e.prototype), !(!e || !e.isReactComponent));
}
function V0(e) {
  if (typeof e == "function") return hl(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === Ii)) return 11;
    if (e === _i) return 14;
  }
  return 2;
}
function It(e, t) {
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
function co(e, t, n, r, o, a) {
  var i = 2;
  if (((r = e), typeof e == "function")) hl(e) && (i = 1);
  else if (typeof e == "string") i = 5;
  else
    e: switch (e) {
      case an:
        return Qt(n.children, o, a, t);
      case Pi:
        ((i = 8), (o |= 8));
        break;
      case ja:
        return (
          (e = He(12, n, t, o | 2)),
          (e.elementType = ja),
          (e.lanes = a),
          e
        );
      case Aa:
        return ((e = He(13, n, t, o)), (e.elementType = Aa), (e.lanes = a), e);
      case La:
        return ((e = He(19, n, t, o)), (e.elementType = La), (e.lanes = a), e);
      case ds:
        return Qo(n, o, a, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case cs:
              i = 10;
              break e;
            case us:
              i = 9;
              break e;
            case Ii:
              i = 11;
              break e;
            case _i:
              i = 14;
              break e;
            case St:
              ((i = 16), (r = null));
              break e;
          }
        throw Error(j(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = He(i, n, t, o)),
    (t.elementType = e),
    (t.type = r),
    (t.lanes = a),
    t
  );
}
function Qt(e, t, n, r) {
  return ((e = He(7, e, r, t)), (e.lanes = n), e);
}
function Qo(e, t, n, r) {
  return (
    (e = He(22, e, r, t)),
    (e.elementType = ds),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function ba(e, t, n) {
  return ((e = He(6, e, null, t)), (e.lanes = n), e);
}
function Ca(e, t, n) {
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
function vl(e, t, n, r, o, a, i, l, u) {
  return (
    (e = new H0(e, t, n, l, u)),
    t === 1 ? ((t = 1), a === !0 && (t |= 8)) : (t = 0),
    (a = He(3, null, null, t)),
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
function nc(e) {
  if (!e) return Dt;
  e = e._reactInternals;
  e: {
    if (en(e) !== e || e.tag !== 1) throw Error(j(170));
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
    throw Error(j(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Pe(n)) return n2(e, n, t);
  }
  return t;
}
function rc(e, t, n, r, o, a, i, l, u) {
  return (
    (e = vl(n, r, !0, e, o, a, i, l, u)),
    (e.context = nc(null)),
    (n = e.current),
    (r = Ee()),
    (o = Pt(n)),
    (a = mt(r, o)),
    (a.callback = t ?? null),
    At(n, a, o),
    (e.current.lanes = o),
    Tr(e, o, r),
    Ie(e, r),
    e
  );
}
function Yo(e, t, n, r) {
  var o = t.current,
    a = Ee(),
    i = Pt(o);
  return (
    (n = nc(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = mt(a, i)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = At(o, t, i)),
    e !== null && (tt(e, o, i, a), ro(e, o, i)),
    i
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
function L1(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function gl(e, t) {
  (L1(e, t), (e = e.alternate) && L1(e, t));
}
function W0() {
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
  if (t === null) throw Error(j(409));
  Yo(e, t, null, null);
};
Ko.prototype.unmount = yl.prototype.unmount = function () {
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
    for (var n = 0; n < bt.length && t !== 0 && t < bt[n].priority; n++);
    (bt.splice(n, 0, e), n === 0 && Rs(e));
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
function P1() {}
function G0(e, t, n, r, o) {
  if (o) {
    if (typeof r == "function") {
      var a = r;
      r = function () {
        var c = _o(i);
        a.call(c);
      };
    }
    var i = rc(t, r, e, 0, null, !1, !1, "", P1);
    return (
      (e._reactRootContainer = i),
      (e[vt] = i.current),
      mr(e.nodeType === 8 ? e.parentNode : e),
      Jt(),
      i
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
  var u = vl(e, 0, !1, null, null, !1, !1, "", P1);
  return (
    (e._reactRootContainer = u),
    (e[vt] = u.current),
    mr(e.nodeType === 8 ? e.parentNode : e),
    Jt(function () {
      Yo(t, u, n, r);
    }),
    u
  );
}
function Xo(e, t, n, r, o) {
  var a = n._reactRootContainer;
  if (a) {
    var i = a;
    if (typeof o == "function") {
      var l = o;
      o = function () {
        var u = _o(i);
        l.call(u);
      };
    }
    Yo(t, i, e, o);
  } else i = G0(n, t, e, o, r);
  return _o(i);
}
Ps = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Kn(t.pendingLanes);
        n !== 0 &&
          (Oi(t, n | 1), Ie(t, de()), !(Z & 6) && ((jn = de() + 500), Bt()));
      }
      break;
    case 13:
      (Jt(function () {
        var r = gt(e, 1);
        if (r !== null) {
          var o = Ee();
          tt(r, e, 1, o);
        }
      }),
        gl(e, 1));
  }
};
Bi = function (e) {
  if (e.tag === 13) {
    var t = gt(e, 134217728);
    if (t !== null) {
      var n = Ee();
      tt(t, e, 134217728, n);
    }
    gl(e, 134217728);
  }
};
Is = function (e) {
  if (e.tag === 13) {
    var t = Pt(e),
      n = gt(e, t);
    if (n !== null) {
      var r = Ee();
      tt(n, e, t, r);
    }
    gl(e, t);
  }
};
_s = function () {
  return J;
};
Ds = function (e, t) {
  var n = J;
  try {
    return ((J = e), t());
  } finally {
    J = n;
  }
};
Va = function (e, t, n) {
  switch (t) {
    case "input":
      if ((_a(e, n), (t = n.name), n.type === "radio" && t != null)) {
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
            if (!o) throw Error(j(90));
            (ps(r), _a(r, o));
          }
        }
      }
      break;
    case "textarea":
      hs(e, n);
      break;
    case "select":
      ((t = n.value), t != null && gn(e, !!n.multiple, t, !1));
  }
};
ks = fl;
bs = Jt;
var Q0 = { usingClientEntryPoint: !1, Events: [Nr, un, $o, xs, Ss, fl] },
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
      return ((e = Es(e)), e === null ? null : e.stateNode);
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
  var Qr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Qr.isDisabled && Qr.supportsFiber)
    try {
      ((Ro = Qr.inject(Y0)), (lt = Qr));
    } catch {}
}
Be.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Q0;
Be.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!wl(t)) throw Error(j(200));
  return U0(e, t, null, n);
};
Be.createRoot = function (e, t) {
  if (!wl(e)) throw Error(j(299));
  var n = !1,
    r = "",
    o = oc;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (o = t.onRecoverableError)),
    (t = vl(e, 1, !1, null, null, n, !1, r, o)),
    (e[vt] = t.current),
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
      ? Error(j(188))
      : ((e = Object.keys(e).join(",")), Error(j(268, e)));
  return ((e = Es(t)), (e = e === null ? null : e.stateNode), e);
};
Be.flushSync = function (e) {
  return Jt(e);
};
Be.hydrate = function (e, t, n) {
  if (!Zo(t)) throw Error(j(200));
  return Xo(null, e, t, !0, n);
};
Be.hydrateRoot = function (e, t, n) {
  if (!wl(e)) throw Error(j(405));
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
    (e[vt] = t.current),
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
  if (!Zo(t)) throw Error(j(200));
  return Xo(null, e, t, !1, n);
};
Be.unmountComponentAtNode = function (e) {
  if (!Zo(e)) throw Error(j(40));
  return e._reactRootContainer
    ? (Jt(function () {
        Xo(null, null, e, !1, function () {
          ((e._reactRootContainer = null), (e[vt] = null));
        });
      }),
      !0)
    : !1;
};
Be.unstable_batchedUpdates = fl;
Be.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!Zo(n)) throw Error(j(200));
  if (e == null || e._reactInternals === void 0) throw Error(j(38));
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
(ac(), (as.exports = Be));
var K0 = as.exports,
  I1 = K0;
((Ma.createRoot = I1.createRoot), (Ma.hydrateRoot = I1.hydrateRoot));
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
    l = (function () {
      if (!t.OffscreenCanvas) return !1;
      try {
        var y = new OffscreenCanvas(1, 1),
          v = y.getContext("2d");
        v.fillRect(0, 0, 1, 1);
        var I = y.transferToImageBitmap();
        v.createPattern(I, "no-repeat");
      } catch {
        return !1;
      }
      return !0;
    })();
  function u() {}
  function c(y) {
    var v = n.exports.Promise,
      I = v !== void 0 ? v : t.Promise;
    return typeof I == "function" ? new I(y) : (y(u, u), null);
  }
  var h = (function (y, v) {
      return {
        transform: function (I) {
          if (y) return I;
          if (v.has(I)) return v.get(I);
          var F = new OffscreenCanvas(I.width, I.height),
            H = F.getContext("2d");
          return (H.drawImage(I, 0, 0), v.set(I, F), F);
        },
        clear: function () {
          v.clear();
        },
      };
    })(l, new Map()),
    p = (function () {
      var y = Math.floor(16.666666666666668),
        v,
        I,
        F = {},
        H = 0;
      return (
        typeof requestAnimationFrame == "function" &&
        typeof cancelAnimationFrame == "function"
          ? ((v = function (D) {
              var $ = Math.random();
              return (
                (F[$] = requestAnimationFrame(function B(U) {
                  H === U || H + y - 1 < U
                    ? ((H = U), delete F[$], D())
                    : (F[$] = requestAnimationFrame(B));
                })),
                $
              );
            }),
            (I = function (D) {
              F[D] && cancelAnimationFrame(F[D]);
            }))
          : ((v = function (D) {
              return setTimeout(D, y);
            }),
            (I = function (D) {
              return clearTimeout(D);
            })),
        { frame: v, cancel: I }
      );
    })(),
    m = (function () {
      var y,
        v,
        I = {};
      function F(H) {
        function D($, B) {
          H.postMessage({ options: $ || {}, callback: B });
        }
        ((H.init = function (B) {
          var U = B.transferControlToOffscreen();
          H.postMessage({ canvas: U }, [U]);
        }),
          (H.fire = function (B, U, Y) {
            if (v) return (D(B, null), v);
            var se = Math.random().toString(36).slice(2);
            return (
              (v = c(function (ee) {
                function ce(ge) {
                  ge.data.callback === se &&
                    (delete I[se],
                    H.removeEventListener("message", ce),
                    (v = null),
                    h.clear(),
                    Y(),
                    ee());
                }
                (H.addEventListener("message", ce),
                  D(B, se),
                  (I[se] = ce.bind(null, { data: { callback: se } })));
              })),
              v
            );
          }),
          (H.reset = function () {
            H.postMessage({ reset: !0 });
            for (var B in I) (I[B](), delete I[B]);
          }));
      }
      return function () {
        if (y) return y;
        if (!r && a) {
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
            y = new Worker(URL.createObjectURL(new Blob([H])));
          } catch (D) {
            return (
              typeof console < "u" &&
                typeof console.warn == "function" &&
                console.warn("🎊 Could not load worker", D),
              null
            );
          }
          F(y);
        }
        return y;
      };
    })(),
    w = {
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
  function b(y, v) {
    return v ? v(y) : y;
  }
  function S(y) {
    return y != null;
  }
  function z(y, v, I) {
    return b(y && S(y[v]) ? y[v] : w[v], I);
  }
  function f(y) {
    return y < 0 ? 0 : Math.floor(y);
  }
  function d(y, v) {
    return Math.floor(Math.random() * (v - y)) + y;
  }
  function g(y) {
    return parseInt(y, 16);
  }
  function x(y) {
    return y.map(k);
  }
  function k(y) {
    var v = String(y).replace(/[^0-9a-f]/gi, "");
    return (
      v.length < 6 && (v = v[0] + v[0] + v[1] + v[1] + v[2] + v[2]),
      {
        r: g(v.substring(0, 2)),
        g: g(v.substring(2, 4)),
        b: g(v.substring(4, 6)),
      }
    );
  }
  function T(y) {
    var v = z(y, "origin", Object);
    return ((v.x = z(v, "x", Number)), (v.y = z(v, "y", Number)), v);
  }
  function E(y) {
    ((y.width = document.documentElement.clientWidth),
      (y.height = document.documentElement.clientHeight));
  }
  function C(y) {
    var v = y.getBoundingClientRect();
    ((y.width = v.width), (y.height = v.height));
  }
  function _(y) {
    var v = document.createElement("canvas");
    return (
      (v.style.position = "fixed"),
      (v.style.top = "0px"),
      (v.style.left = "0px"),
      (v.style.pointerEvents = "none"),
      (v.style.zIndex = y),
      v
    );
  }
  function L(y, v, I, F, H, D, $, B, U) {
    (y.save(),
      y.translate(v, I),
      y.rotate(D),
      y.scale(F, H),
      y.arc(0, 0, 1, $, B, U),
      y.restore());
  }
  function R(y) {
    var v = y.angle * (Math.PI / 180),
      I = y.spread * (Math.PI / 180);
    return {
      x: y.x,
      y: y.y,
      wobble: Math.random() * 10,
      wobbleSpeed: Math.min(0.11, Math.random() * 0.1 + 0.05),
      velocity: y.startVelocity * 0.5 + Math.random() * y.startVelocity,
      angle2D: -v + (0.5 * I - Math.random() * I),
      tiltAngle: (Math.random() * (0.75 - 0.25) + 0.25) * Math.PI,
      color: y.color,
      shape: y.shape,
      tick: 0,
      totalTicks: y.ticks,
      decay: y.decay,
      drift: y.drift,
      random: Math.random() + 2,
      tiltSin: 0,
      tiltCos: 0,
      wobbleX: 0,
      wobbleY: 0,
      gravity: y.gravity * 3,
      ovalScalar: 0.6,
      scalar: y.scalar,
      flat: y.flat,
    };
  }
  function P(y, v) {
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
    var I = v.tick++ / v.totalTicks,
      F = v.x + v.random * v.tiltCos,
      H = v.y + v.random * v.tiltSin,
      D = v.wobbleX + v.random * v.tiltCos,
      $ = v.wobbleY + v.random * v.tiltSin;
    if (
      ((y.fillStyle =
        "rgba(" +
        v.color.r +
        ", " +
        v.color.g +
        ", " +
        v.color.b +
        ", " +
        (1 - I) +
        ")"),
      y.beginPath(),
      i &&
        v.shape.type === "path" &&
        typeof v.shape.path == "string" &&
        Array.isArray(v.shape.matrix))
    )
      y.fill(
        le(
          v.shape.path,
          v.shape.matrix,
          v.x,
          v.y,
          Math.abs(D - F) * 0.1,
          Math.abs($ - H) * 0.1,
          (Math.PI / 10) * v.wobble
        )
      );
    else if (v.shape.type === "bitmap") {
      var B = (Math.PI / 10) * v.wobble,
        U = Math.abs(D - F) * 0.1,
        Y = Math.abs($ - H) * 0.1,
        se = v.shape.bitmap.width * v.scalar,
        ee = v.shape.bitmap.height * v.scalar,
        ce = new DOMMatrix([
          Math.cos(B) * U,
          Math.sin(B) * U,
          -Math.sin(B) * Y,
          Math.cos(B) * Y,
          v.x,
          v.y,
        ]);
      ce.multiplySelf(new DOMMatrix(v.shape.matrix));
      var ge = y.createPattern(h.transform(v.shape.bitmap), "no-repeat");
      (ge.setTransform(ce),
        (y.globalAlpha = 1 - I),
        (y.fillStyle = ge),
        y.fillRect(v.x - se / 2, v.y - ee / 2, se, ee),
        (y.globalAlpha = 1));
    } else if (v.shape === "circle")
      y.ellipse
        ? y.ellipse(
            v.x,
            v.y,
            Math.abs(D - F) * v.ovalScalar,
            Math.abs($ - H) * v.ovalScalar,
            (Math.PI / 10) * v.wobble,
            0,
            2 * Math.PI
          )
        : L(
            y,
            v.x,
            v.y,
            Math.abs(D - F) * v.ovalScalar,
            Math.abs($ - H) * v.ovalScalar,
            (Math.PI / 10) * v.wobble,
            0,
            2 * Math.PI
          );
    else if (v.shape === "star")
      for (
        var K = (Math.PI / 2) * 3,
          Ne = 4 * v.scalar,
          Qe = 8 * v.scalar,
          Ye = v.x,
          ct = v.y,
          Ft = 5,
          rt = Math.PI / Ft;
        Ft--;
      )
        ((Ye = v.x + Math.cos(K) * Qe),
          (ct = v.y + Math.sin(K) * Qe),
          y.lineTo(Ye, ct),
          (K += rt),
          (Ye = v.x + Math.cos(K) * Ne),
          (ct = v.y + Math.sin(K) * Ne),
          y.lineTo(Ye, ct),
          (K += rt));
    else
      (y.moveTo(Math.floor(v.x), Math.floor(v.y)),
        y.lineTo(Math.floor(v.wobbleX), Math.floor(H)),
        y.lineTo(Math.floor(D), Math.floor($)),
        y.lineTo(Math.floor(F), Math.floor(v.wobbleY)));
    return (y.closePath(), y.fill(), v.tick < v.totalTicks);
  }
  function N(y, v, I, F, H) {
    var D = v.slice(),
      $ = y.getContext("2d"),
      B,
      U,
      Y = c(function (se) {
        function ee() {
          ((B = U = null),
            $.clearRect(0, 0, F.width, F.height),
            h.clear(),
            H(),
            se());
        }
        function ce() {
          (r &&
            !(F.width === o.width && F.height === o.height) &&
            ((F.width = y.width = o.width), (F.height = y.height = o.height)),
            !F.width &&
              !F.height &&
              (I(y), (F.width = y.width), (F.height = y.height)),
            $.clearRect(0, 0, F.width, F.height),
            (D = D.filter(function (ge) {
              return P($, ge);
            })),
            D.length ? (B = p.frame(ce)) : ee());
        }
        ((B = p.frame(ce)), (U = ee));
      });
    return {
      addFettis: function (se) {
        return ((D = D.concat(se)), Y);
      },
      canvas: y,
      promise: Y,
      reset: function () {
        (B && p.cancel(B), U && U());
      },
    };
  }
  function A(y, v) {
    var I = !y,
      F = !!z(v || {}, "resize"),
      H = !1,
      D = z(v, "disableForReducedMotion", Boolean),
      $ = a && !!z(v || {}, "useWorker"),
      B = $ ? m() : null,
      U = I ? E : C,
      Y = y && B ? !!y.__confetti_initialized : !1,
      se =
        typeof matchMedia == "function" &&
        matchMedia("(prefers-reduced-motion)").matches,
      ee;
    function ce(K, Ne, Qe) {
      for (
        var Ye = z(K, "particleCount", f),
          ct = z(K, "angle", Number),
          Ft = z(K, "spread", Number),
          rt = z(K, "startVelocity", Number),
          hc = z(K, "decay", Number),
          vc = z(K, "gravity", Number),
          gc = z(K, "drift", Number),
          kl = z(K, "colors", x),
          yc = z(K, "ticks", Number),
          bl = z(K, "shapes"),
          wc = z(K, "scalar"),
          xc = !!z(K, "flat"),
          Cl = T(K),
          zl = Ye,
          Jo = [],
          Sc = y.width * Cl.x,
          kc = y.height * Cl.y;
        zl--;
      )
        Jo.push(
          R({
            x: Sc,
            y: kc,
            angle: ct,
            spread: Ft,
            startVelocity: rt,
            color: kl[zl % kl.length],
            shape: bl[d(0, bl.length)],
            ticks: yc,
            decay: hc,
            gravity: vc,
            drift: gc,
            scalar: wc,
            flat: xc,
          })
        );
      return ee ? ee.addFettis(Jo) : ((ee = N(y, Jo, U, Ne, Qe)), ee.promise);
    }
    function ge(K) {
      var Ne = D || z(K, "disableForReducedMotion", Boolean),
        Qe = z(K, "zIndex", Number);
      if (Ne && se)
        return c(function (rt) {
          rt();
        });
      (I && ee
        ? (y = ee.canvas)
        : I && !y && ((y = _(Qe)), document.body.appendChild(y)),
        F && !Y && U(y));
      var Ye = { width: y.width, height: y.height };
      (B && !Y && B.init(y), (Y = !0), B && (y.__confetti_initialized = !0));
      function ct() {
        if (B) {
          var rt = {
            getBoundingClientRect: function () {
              if (!I) return y.getBoundingClientRect();
            },
          };
          (U(rt),
            B.postMessage({ resize: { width: rt.width, height: rt.height } }));
          return;
        }
        Ye.width = Ye.height = null;
      }
      function Ft() {
        ((ee = null),
          F && ((H = !1), t.removeEventListener("resize", ct)),
          I &&
            y &&
            (document.body.contains(y) && document.body.removeChild(y),
            (y = null),
            (Y = !1)));
      }
      return (
        F && !H && ((H = !0), t.addEventListener("resize", ct, !1)),
        B ? B.fire(K, Ye, Ft) : ce(K, Ye, Ft)
      );
    }
    return (
      (ge.reset = function () {
        (B && B.reset(), ee && ee.reset());
      }),
      ge
    );
  }
  var W;
  function G() {
    return (W || (W = A(null, { useWorker: !0, resize: !0 })), W);
  }
  function le(y, v, I, F, H, D, $) {
    var B = new Path2D(y),
      U = new Path2D();
    U.addPath(B, new DOMMatrix(v));
    var Y = new Path2D();
    return (
      Y.addPath(
        U,
        new DOMMatrix([
          Math.cos($) * H,
          Math.sin($) * H,
          -Math.sin($) * D,
          Math.cos($) * D,
          I,
          F,
        ])
      ),
      Y
    );
  }
  function M(y) {
    if (!i) throw new Error("path confetti are not supported in this browser");
    var v, I;
    typeof y == "string" ? (v = y) : ((v = y.path), (I = y.matrix));
    var F = new Path2D(v),
      H = document.createElement("canvas"),
      D = H.getContext("2d");
    if (!I) {
      for (
        var $ = 1e3, B = $, U = $, Y = 0, se = 0, ee, ce, ge = 0;
        ge < $;
        ge += 2
      )
        for (var K = 0; K < $; K += 2)
          D.isPointInPath(F, ge, K, "nonzero") &&
            ((B = Math.min(B, ge)),
            (U = Math.min(U, K)),
            (Y = Math.max(Y, ge)),
            (se = Math.max(se, K)));
      ((ee = Y - B), (ce = se - U));
      var Ne = 10,
        Qe = Math.min(Ne / ee, Ne / ce);
      I = [
        Qe,
        0,
        0,
        Qe,
        -Math.round(ee / 2 + B) * Qe,
        -Math.round(ce / 2 + U) * Qe,
      ];
    }
    return { type: "path", path: v, matrix: I };
  }
  function V(y) {
    var v,
      I = 1,
      F = "#000000",
      H =
        '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';
    typeof y == "string"
      ? (v = y)
      : ((v = y.text),
        (I = "scalar" in y ? y.scalar : I),
        (H = "fontFamily" in y ? y.fontFamily : H),
        (F = "color" in y ? y.color : F));
    var D = 10 * I,
      $ = "" + D + "px " + H,
      B = new OffscreenCanvas(D, D),
      U = B.getContext("2d");
    U.font = $;
    var Y = U.measureText(v),
      se = Math.ceil(Y.actualBoundingBoxRight + Y.actualBoundingBoxLeft),
      ee = Math.ceil(Y.actualBoundingBoxAscent + Y.actualBoundingBoxDescent),
      ce = 2,
      ge = Y.actualBoundingBoxLeft + ce,
      K = Y.actualBoundingBoxAscent + ce;
    ((se += ce + ce),
      (ee += ce + ce),
      (B = new OffscreenCanvas(se, ee)),
      (U = B.getContext("2d")),
      (U.font = $),
      (U.fillStyle = F),
      U.fillText(v, ge, K));
    var Ne = 1 / I;
    return {
      type: "bitmap",
      bitmap: B.transferToImageBitmap(),
      matrix: [Ne, 0, 0, Ne, (-se * Ne) / 2, (-ee * Ne) / 2],
    };
  }
  ((n.exports = function () {
    return G().apply(this, arguments);
  }),
    (n.exports.reset = function () {
      G().reset();
    }),
    (n.exports.create = A),
    (n.exports.shapeFromPath = M),
    (n.exports.shapeFromText = V));
})(
  (function () {
    return typeof window < "u" ? window : typeof self < "u" ? self : this || {};
  })(),
  xl,
  !1
);
const nn = xl.exports;
xl.exports.create;
function br(e = !0) {
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
    a = !1;
  const i = () => {
      typeof document > "u" ||
        (!document.hidden &&
          n.size > 0 &&
          r === null &&
          (a && (document.removeEventListener("visibilitychange", i), (a = !1)),
          (o = typeof performance < "u" ? performance.now() : Date.now()),
          (r = requestAnimationFrame(l))));
    },
    l = (c) => {
      if (typeof document < "u" && document.hidden) {
        ((r = null),
          a || ((a = !0), document.addEventListener("visibilitychange", i)));
        return;
      }
      const h = c - o;
      ((o = c),
        n.forEach((p) => p(h)),
        (r = n.size > 0 ? requestAnimationFrame(l) : null));
    },
    u = () => {
      if (r === null) {
        if (typeof document < "u" && document.hidden) {
          a || ((a = !0), document.addEventListener("visibilitychange", i));
          return;
        }
        ((o = typeof performance < "u" ? performance.now() : Date.now()),
          (r = requestAnimationFrame(l)));
      }
    };
  return {
    isMotionAllowed: () => br(t),
    scheduleRender: (c) =>
      br(t)
        ? (n.add(c),
          u(),
          () => {
            (n.delete(c),
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
const X0 = Z0();
function J0(e) {
  return X0.scheduleRender(e);
}
function Sl(e, t) {
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
async function Si(e, t, n) {
  if (!br() || !n3()) return;
  const r =
      t != null && t.length ? t : [q0, e3, t3, "#e8c96b", "#4a8a3a", "#ffffff"],
    [o, a] = r3(n);
  let i;
  if (typeof OffscreenCanvas < "u")
    try {
      const u = _1(o),
        c = _1(a),
        h = (e || 1447).toString(),
        p = o3(h);
      i = [u, c, p];
    } catch {
      i = void 0;
    }
  const l = {
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
    ? (nn({ ...l, angle: 60, origin: { x: 0, y: 0.85 }, shapes: [i[0], i[1]] }),
      await Yr(300),
      nn({ ...l, angle: 120, origin: { x: 1, y: 0.85 }, shapes: [i[0], i[1]] }),
      await Yr(300),
      await nn({
        ...l,
        angle: 90,
        particleCount: 80,
        spread: 100,
        origin: { x: 0.5, y: 0.7 },
        shapes: i,
        scalar: 2,
      }))
    : (nn({ ...l, angle: 60, origin: { x: 0, y: 0.85 } }),
      await Yr(300),
      nn({ ...l, angle: 120, origin: { x: 1, y: 0.85 } }),
      await Yr(300),
      await nn({
        ...l,
        angle: 90,
        particleCount: 80,
        spread: 100,
        origin: { x: 0.5, y: 0.7 },
        scalar: 1.4,
      }));
}
function _1(e) {
  const r = "20px serif";
  let a = new OffscreenCanvas(1, 1),
    i = a.getContext("2d");
  i.font = r;
  const l = i.measureText(e),
    u = 5,
    c =
      typeof l.actualBoundingBoxLeft == "number" ? l.actualBoundingBoxLeft : 0,
    h =
      typeof l.actualBoundingBoxRight == "number"
        ? l.actualBoundingBoxRight
        : l.width || 20,
    p =
      typeof l.actualBoundingBoxAscent == "number"
        ? l.actualBoundingBoxAscent
        : 20,
    m =
      typeof l.actualBoundingBoxDescent == "number"
        ? l.actualBoundingBoxDescent
        : 0,
    w = Math.max(1, Math.ceil(h + c) + u * 2),
    b = Math.max(1, Math.ceil(p + m) + u * 2),
    S = c + u,
    z = p + u;
  ((a = new OffscreenCanvas(w, b)),
    (i = a.getContext("2d")),
    (i.font = r),
    (i.lineJoin = "round"),
    (i.lineWidth = 3 * 2),
    (i.strokeStyle = "rgba(0,0,0,0.55)"),
    i.strokeText(e, S, z),
    i.fillText(e, S, z));
  const f = 1 / 2;
  return {
    type: "bitmap",
    bitmap: a.transferToImageBitmap(),
    matrix: [f, 0, 0, f, (-w * f) / 2, (-b * f) / 2],
  };
}
function o3(e) {
  const r = "bold 15px system-ui, -apple-system, sans-serif";
  let o = new OffscreenCanvas(1, 1),
    a = o.getContext("2d");
  a.font = r;
  const i = a.measureText(e),
    l = 3,
    u =
      typeof i.actualBoundingBoxLeft == "number" ? i.actualBoundingBoxLeft : 0,
    c =
      typeof i.actualBoundingBoxRight == "number"
        ? i.actualBoundingBoxRight
        : i.width || 15,
    h =
      typeof i.actualBoundingBoxAscent == "number"
        ? i.actualBoundingBoxAscent
        : 15,
    p =
      typeof i.actualBoundingBoxDescent == "number"
        ? i.actualBoundingBoxDescent
        : 0,
    m = Math.max(1, Math.ceil(c + u) + l * 2),
    w = Math.max(1, Math.ceil(h + p) + l * 2),
    b = u + l,
    S = h + l;
  ((o = new OffscreenCanvas(m, w)),
    (a = o.getContext("2d")),
    (a.font = r),
    (a.lineJoin = "round"),
    (a.lineWidth = 15 * 0.28),
    (a.strokeStyle = "#000000"),
    a.strokeText(e, b, S),
    (a.fillStyle = "#ffffff"),
    a.fillText(e, b, S));
  const z = 1 / 1.5;
  return {
    type: "bitmap",
    bitmap: o.transferToImageBitmap(),
    matrix: [z, 0, 0, z, (-m * z) / 2, (-w * z) / 2],
  };
}
function a3(e, t, n = !1) {
  return t === "off" || !br() ? !1 : e.isRamadan || e.isEid || n;
}
function Yr(e) {
  return new Promise((t) => setTimeout(t, e));
}
const i3 = {
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
      ? (i3[e] ?? 0)
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
  D1 = {
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
  ki = Object.freeze({
    isRamadan: !1,
    occasion: "none",
    isEid: !1,
    hijriYear: 0,
    hijriMonth: 0,
    hijriDay: 0,
    dayNumber: 0,
  });
function c3(e) {
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
    const a = (c) => {
        const h = o.find((p) => p.type === c);
        return h ? parseInt(h.value, 10) : NaN;
      },
      i = a("month"),
      l = a("day"),
      u = a("year");
    return isNaN(i) || isNaN(l) || isNaN(u)
      ? null
      : { month: i, day: l, year: u };
  } catch {
    return null;
  }
}
const Kr = 24 * 60 * 60 * 1e3;
function u3(e) {
  const t = e.getTime();
  for (const [o, a] of Object.entries(D1)) {
    const i = new Date(a).getTime(),
      l = Math.floor((t - i) / Kr);
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
  for (const [o, a] of Object.entries(s3)) {
    const i = new Date(a).getTime(),
      l = Math.floor((t - i) / Kr);
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
  for (const [o, a] of Object.entries(l3)) {
    const i = new Date(a);
    i.getTime() <= t &&
      (!r || i.getTime() > r.getTime()) &&
      ((r = i), (n = parseInt(o, 10)));
  }
  if (r) {
    const o = D1[n],
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
function d3(e, t = 0, n = !1) {
  const r = typeof t == "number" ? t : 0;
  let o = typeof t == "boolean" ? t : n,
    a,
    i = r;
  if (e instanceof Date) a = e;
  else if (typeof e == "object" && e !== null) {
    const c = e;
    ((a = c.date),
      typeof c.debug == "boolean" && (o = c.debug),
      (i = sc(c.region, c.hijriAdjustment)));
  }
  let l;
  if (a instanceof Date) l = isNaN(a.getTime()) ? new Date() : a;
  else if (typeof a == "string" || typeof a == "number") {
    const c = new Date(a);
    l = isNaN(c.getTime()) ? new Date() : c;
  } else
    (a !== void 0 &&
      o &&
      typeof console < "u" &&
      console.warn &&
      console.warn(
        `[ramadan-overlay] Invalid Date "${String(a)}"; falling back to current date.`
      ),
      (l = new Date()));
  const u =
    typeof i == "number" && !isNaN(i) && isFinite(i)
      ? Math.max(-3, Math.min(3, Math.round(i)))
      : 0;
  return { targetDate: l, effectiveOffset: u };
}
function bn(e = new Date(), t = 0) {
  const n = typeof e == "object" && e !== null && "debug" in e ? !!e.debug : !1,
    { targetDate: r, effectiveOffset: o } = d3(e, t, n),
    a = o === 0 ? r : new Date(r.getTime() - o * 24 * 60 * 60 * 1e3),
    i = c3(a);
  if (i) {
    const h = i.month === 9,
      p = i.month === 10 && i.day >= 1 && i.day <= 3,
      m = i.month === 12 && i.day >= 10 && i.day <= 13;
    let w = "none",
      b = 0;
    return (
      h
        ? ((w = "ramadan"), (b = i.day))
        : p
          ? ((w = "eid-fitr"), (b = i.day))
          : m && ((w = "eid-adha"), (b = i.day - 9)),
      {
        isRamadan: h,
        occasion: w,
        isEid: p || m,
        hijriYear: i.year,
        hijriMonth: i.month,
        hijriDay: i.day,
        dayNumber: b,
      }
    );
  }
  return u3(a);
}
function R1(e, t) {
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
const bi = 52;
function O1(e, t, n, r, o, a, i) {
  const l = document.createElement("div");
  (l.setAttribute("role", "banner"),
    l.setAttribute("aria-label", r),
    (l.style.cssText = [
      `background:var(--ro-banner-bg, ${e})`,
      "position:fixed",
      "left:0",
      "width:100%",
      `height:${bi}px`,
      "display:flex",
      "align-items:center",
      "justify-content:center",
      "overflow:hidden",
      `z-index:${a}`,
      "box-sizing:border-box",
      `${i}:0`,
    ].join(";")));
  const u = document.createElement("div");
  u.style.cssText = `display:flex;align-items:center;justify-content:center;gap:12px;max-width:960px;width:100%;padding:0 20px;direction:${o ? "rtl" : "ltr"}`;
  const c = document.createElement("span");
  ((c.style.cssText = "display:flex;align-items:center;flex-shrink:0"),
    (c.innerHTML = n));
  const h = document.createElement("span");
  return (
    (h.textContent = r),
    (h.style.cssText = [
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
    u.appendChild(h),
    l.appendChild(u),
    l
  );
}
function v3(e, t) {
  const n = e.bannerBg,
    r = e.bannerTextColor,
    o = e.bannerIconColor,
    a = e.zIndex,
    i = e.locale ?? "en",
    l = t === "eid-fitr" || t === "eid-adha" || t === "ramadan" ? t : "ramadan",
    u = R1(e.bannerTextEn, l),
    c = R1(e.bannerTextAr, l),
    h = f3[l],
    p = i === "ar" ? c || u || h.ar : u || c || h.en,
    m = i === "ar",
    w = [],
    b = document.body.style.paddingTop,
    S = document.body.style.paddingBottom,
    z = e.position !== "bottom",
    f =
      e.position === "bottom" || e.position === "both" || e.position === "full";
  let d;
  if (
    (l === "eid-fitr"
      ? (d = m3(o))
      : l === "eid-adha"
        ? (d = h3())
        : (d = p3(o)),
    z)
  ) {
    const x = O1(n, r, d, p, m, a, "top");
    (x.style.setProperty("--ro-banner-bg", n),
      x.style.setProperty("--ro-banner-text", r),
      x.style.setProperty("--ro-banner-icon", o),
      document.body.prepend(x),
      w.push(x));
    const k = parseFloat(getComputedStyle(document.body).paddingTop) || 0;
    document.body.style.paddingTop = `${k + bi}px`;
  }
  if (f) {
    const x = O1(n, r, d, p, m, a, "bottom");
    (x.style.setProperty("--ro-banner-bg", n),
      x.style.setProperty("--ro-banner-text", r),
      x.style.setProperty("--ro-banner-icon", o),
      document.body.appendChild(x),
      w.push(x));
    const k = parseFloat(getComputedStyle(document.body).paddingBottom) || 0;
    document.body.style.paddingBottom = `${k + bi}px`;
  }
  return {
    elements: w,
    cleanup: () => {
      (w.forEach((x) => x.remove()),
        (document.body.style.paddingTop = b),
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
    const i = (r * Math.PI) / 4,
      l = i + Math.PI / 8;
    (n.push(`${20 + 18 * Math.sin(i)},${20 - 18 * Math.cos(i)}`),
      n.push(`${20 + 9 * Math.sin(l)},${20 - 9 * Math.cos(l)}`));
  }
  return `<svg width="${t}" height="${t}" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <polygon points="${n.join(" ")}" fill="${e}"/>
  </svg>`;
}
const w3 = (e, t) => {
  const n = t.colors,
    r = [],
    o = Sl(t.intensity, t.density),
    a = typeof window < "u" && window.innerWidth < 640,
    i = ic(o, a),
    { minDuration: l, maxDuration: u } = lc(o),
    c = a ? 0.7 : 1;
  for (let h = 0; h < i; h++) {
    const p = Math.random() < 0.35,
      m = n[Math.floor(Math.random() * Math.min(n.length, 4))] ?? "#c9a84c",
      w = (p ? 32 : 20) * c,
      b = w + Math.random() * w * 0.6,
      S = document.createElement("div");
    ((S.className = p ? "ro-crescent" : "ro-star"),
      (S.innerHTML = p ? g3(m, b) : y3(m, b)));
    const { x: z } = uc(t.position, t.clearance, a),
      f = l + Math.random() * (u - l),
      d = f.toFixed(1),
      g = (-Math.random() * f).toFixed(1),
      x = (10 + Math.random() * 16) * (Math.random() < 0.5 ? 1 : -1),
      k = (10 + Math.random() * 16) * (Math.random() < 0.5 ? 1 : -1),
      T = (8 + Math.random() * 14) * (Math.random() < 0.5 ? 1 : -1),
      E = (5 + Math.random() * 12) * (Math.random() < 0.5 ? 1 : -1),
      C = (5 + Math.random() * 12) * (Math.random() < 0.5 ? 1 : -1),
      _ = (5 + Math.random() * 12) * (Math.random() < 0.5 ? 1 : -1);
    ((S.style.cssText = `
      left:${z}%;
      top:102%;
      --ro-float-duration:${d}s;
      --ro-sway-1:${x.toFixed(1)}px;
      --ro-sway-2:${k.toFixed(1)}px;
      --ro-sway-end:${T.toFixed(1)}px;
      --ro-rot-1:${E.toFixed(1)}deg;
      --ro-rot-2:${C.toFixed(1)}deg;
      --ro-rot-3:${_.toFixed(1)}deg;
      animation-delay:${g}s;
    `),
      e.appendChild(S),
      r.push(S));
  }
  return () => {
    r.forEach((h) => h.remove());
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
function b3(e, t, n) {
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
function C3(e, t) {
  return `<svg width="${t}" height="${t}" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M20 3 C8 3 2 11 2 20 C2 29 8 37 20 37 C14 32 11 26 11 20 C11 14 14 8 20 3Z" fill="${e}"/>
    <polygon points="26,11 27.5,15.5 32,15.5 28.5,18 30,22 26,19.5 22,22 23.5,18 20,15.5 24.5,15.5" fill="${e}"/>
  </svg>`;
}
const za = (e, t, n) => {
  const r =
      t.variant === "eid-adha" || (t.variant === "eid" && n === "eid-adha"),
    o = t.colors,
    a = [],
    i = Sl(t.intensity, t.density),
    l = typeof window < "u" && window.innerWidth < 640,
    u = ic(i, l),
    { minDuration: c, maxDuration: h } = lc(i),
    p = l ? 0.7 : 1;
  for (let m = 0; m < u; m++) {
    const w = document.createElement("div"),
      b = o[0] ?? "#c9a84c",
      S = o[1] ?? "#e8c96b",
      z = o[2] ?? "#2d5a27",
      f = o[Math.floor(Math.random() * o.length)] ?? b;
    if (r)
      Math.random() < 0.5
        ? ((w.className = "ro-sheep"),
          (w.innerHTML = b3("#f8f9fa", z, Math.round(36 * p))))
        : ((w.className = "ro-crescent"),
          (w.innerHTML = C3(S, Math.round(30 * p))));
    else {
      const P = Math.random();
      P < 0.45
        ? ((w.className = "ro-balloon"),
          (w.innerHTML = x3(f, b, Math.round(26 * p))))
        : P < 0.75
          ? ((w.className = "ro-gift"),
            (w.innerHTML = S3(f, S, Math.round(24 * p))))
          : ((w.className = "ro-star"),
            (w.innerHTML = k3(S, Math.round(18 * p))));
    }
    const { x: d } = uc(t.position, t.clearance, l),
      g = c + Math.random() * (h - c),
      x = g.toFixed(1),
      k = (-Math.random() * g).toFixed(1),
      T = (10 + Math.random() * 16) * (Math.random() < 0.5 ? 1 : -1),
      E = (10 + Math.random() * 16) * (Math.random() < 0.5 ? 1 : -1),
      C = (8 + Math.random() * 14) * (Math.random() < 0.5 ? 1 : -1),
      _ = (5 + Math.random() * 12) * (Math.random() < 0.5 ? 1 : -1),
      L = (5 + Math.random() * 12) * (Math.random() < 0.5 ? 1 : -1),
      R = (5 + Math.random() * 12) * (Math.random() < 0.5 ? 1 : -1);
    ((w.style.cssText = `
      left:${d}%;
      top:102%;
      --ro-float-duration:${x}s;
      --ro-sway-1:${T.toFixed(1)}px;
      --ro-sway-2:${E.toFixed(1)}px;
      --ro-sway-end:${C.toFixed(1)}px;
      --ro-rot-1:${_.toFixed(1)}deg;
      --ro-rot-2:${L.toFixed(1)}deg;
      --ro-rot-3:${R.toFixed(1)}deg;
      animation-delay:${k}s;
    `),
      e.appendChild(w),
      a.push(w));
  }
  return () => {
    a.forEach((m) => m.remove());
  };
};
function B1(e, t, n, r) {
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
      a = In(t.position);
    if (a.length > 0) {
      const c = [];
      for (const h of a) {
        const p = document.createElement("div");
        p.className = `ro-side-band ro-side-band--${h}`;
        const m = `ro-geo-tile-${h}`;
        ((p.innerHTML = `<svg width="100%" height="100%" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <pattern id="${m}" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
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
        <rect width="100%" height="100%" fill="url(#${m})"/>
      </svg>`),
          e.appendChild(p),
          c.push(p));
      }
      return () => {
        c.forEach((h) => h.remove());
      };
    }
    const i = [],
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
      const h = document.createElement("div");
      ((h.className = `ro-geo-band ro-geo-band--${c}`),
        (h.innerHTML = B1(r, o, window.innerWidth, u)),
        e.appendChild(h),
        i.push(h));
    }
    if (t.position === "full") {
      const c = document.createElement("div");
      ((c.style.cssText = `
      position:absolute;inset:0;width:100%;height:100%;opacity:0.08;overflow:hidden;
    `),
        (c.innerHTML = B1(r, o, window.innerWidth, window.innerHeight)),
        e.appendChild(c),
        i.push(c));
    }
    return () => {
      i.forEach((c) => c.remove());
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
      ].map((E, C) => (n && n.length > 0 ? n[C % n.length] : E));
    t.ceilingColor;
    const a = t.ropeColor;
    function i(E, C) {
      const { viewBox: _, gContent: L } = Hn[E],
        R = L.replace(/LANTERN_COLOR/g, C);
      return `<svg viewBox="${_}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${R}</svg>`;
    }
    const l = In(t.position);
    if (l.length > 0) {
      const E = [];
      let C = Math.max(2, Math.min(6, Math.round(window.innerHeight / 220)));
      const _ = (R) => {
        for (const P of E) {
          P.querySelectorAll(".ro-lantern-unit").forEach((A) => A.remove());
          for (let A = 0; A < R; A++) {
            const W =
                t.lanternStyle > 0
                  ? (t.lanternStyle - 1) % Hn.length
                  : A % Hn.length,
              G = o[A % o.length],
              le = (3.2 + ((A * 0.23) % 1.2)).toFixed(1),
              M = -((A * 0.73) % parseFloat(le)),
              V = (10 + (A * 80) / (R > 1 ? R - 1 : 1)).toFixed(1),
              y = document.createElement("div");
            ((y.className = "ro-lantern-unit"),
              (y.style.top = `${V}%`),
              y.style.setProperty("--ro-swing-duration", `${le}s`),
              (y.style.animationDelay = `${M.toFixed(2)}s`));
            const v = document.createElement("div");
            ((v.className = "ro-lantern-dropline"), (v.style.background = a));
            const I = document.createElement("div");
            ((I.className = "ro-lantern-svg-wrap"),
              (I.innerHTML = i(W, G)),
              y.appendChild(v),
              y.appendChild(I),
              P.appendChild(y));
          }
        }
      };
      for (const R of l) {
        const P = document.createElement("div");
        P.className = `ro-lantern-side ro-lantern-side--${R}`;
        const N = document.createElement("div");
        ((N.className = "ro-lantern-spine"),
          P.appendChild(N),
          e.appendChild(P),
          E.push(P));
      }
      _(C);
      const L = () => {
        const R = Math.max(
          2,
          Math.min(6, Math.round(window.innerHeight / 220))
        );
        R !== C && ((C = R), _(C));
      };
      return (
        window.addEventListener("resize", L, { passive: !0 }),
        () => {
          (E.forEach((R) => R.remove()),
            window.removeEventListener("resize", L));
        }
      );
    }
    function u(E, C, _, L) {
      const R = C.length;
      let P = `M 0 ${_}`;
      const N = C[0] / 2,
        A = _ + L * 1.5;
      P += ` Q ${N.toFixed(1)} ${A.toFixed(1)}, ${C[0].toFixed(1)} ${_}`;
      for (let M = 0; M < R - 1; M++) {
        const V = C[M],
          y = C[M + 1],
          v = (V + y) / 2,
          I = _ + L * 2;
        P += ` Q ${v.toFixed(1)} ${I.toFixed(1)}, ${y.toFixed(1)} ${_}`;
      }
      const G = (C[R - 1] + E) / 2,
        le = _ + L * 1.5;
      return ((P += ` Q ${G.toFixed(1)} ${le.toFixed(1)}, ${E} ${_}`), P);
    }
    function c(E, C, _, L) {
      C.forEach((R) => {
        const P = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );
        (P.setAttribute("x1", R.toFixed(1)),
          P.setAttribute("y1", String(_)),
          P.setAttribute("x2", R.toFixed(1)),
          P.setAttribute("y2", L.toFixed(1)),
          P.setAttribute("stroke", "var(--ro-rope)"),
          P.setAttribute("stroke-width", "1.5"),
          P.setAttribute("class", "ro-dropline-path"),
          E.appendChild(P));
      });
    }
    function h(E, C, _, L) {
      const P = document.createElementNS("http://www.w3.org/2000/svg", "line");
      return (
        P.setAttribute("x1", "0"),
        P.setAttribute("y1", String(2)),
        P.setAttribute("x2", String(C)),
        P.setAttribute("y2", String(2)),
        P.setAttribute("stroke", "var(--ro-ceiling)"),
        P.setAttribute("stroke-width", "3"),
        P.setAttribute("stroke-opacity", "0.75"),
        P.setAttribute("class", "ro-rope-path"),
        E.appendChild(P),
        c(E, _, 2, 2 + L),
        2 + L
      );
    }
    function p(E, C, _, L, R) {
      const N = document.createElementNS("http://www.w3.org/2000/svg", "path");
      return (
        N.setAttribute("d", u(C, _, 4, L)),
        N.setAttribute("stroke", "var(--ro-ceiling)"),
        N.setAttribute("stroke-width", "2.2"),
        N.setAttribute("stroke-opacity", "0.85"),
        N.setAttribute("class", "ro-rope-path"),
        E.appendChild(N),
        c(E, _, 4, 4 + R),
        4 + R
      );
    }
    function m(E, C, _, L, R) {
      const W = document.createElementNS("http://www.w3.org/2000/svg", "path");
      (W.setAttribute("d", u(C, _, 2, L)),
        W.setAttribute("stroke", "var(--ro-ceiling)"),
        W.setAttribute("stroke-width", "2.0"),
        W.setAttribute("stroke-opacity", "0.85"),
        W.setAttribute("class", "ro-rope-path"),
        E.appendChild(W));
      const G = document.createElementNS("http://www.w3.org/2000/svg", "path");
      return (
        G.setAttribute("d", u(C, _, 16, L)),
        G.setAttribute("stroke", "var(--ro-ceiling)"),
        G.setAttribute("stroke-width", "1.6"),
        G.setAttribute("stroke-opacity", "0.65"),
        G.setAttribute("class", "ro-rope-path"),
        E.appendChild(G),
        c(E, _, 2, 16 + R),
        16 + R
      );
    }
    const w = 28,
      b = t.ropeStyle ?? "straight",
      S = t.ropeSag ?? 20,
      z = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    (z.setAttribute("class", "ro-lantern-ropes"),
      z.setAttribute("aria-hidden", "true"),
      z.setAttribute("width", "100%"),
      z.setAttribute("height", "100%"));
    const f = document.createElement("div");
    f.className = "ro-lantern-row";
    let d = 0,
      g = [];
    const x = () => {
      var G, le;
      const C =
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
        _ = t.density === "low" ? 360 : t.density === "high" ? 180 : 260,
        L = t.density === "low" ? 4 : t.density === "high" ? 8 : 6,
        R = Math.max(2, Math.min(L, Math.round(C / _))),
        P =
          typeof t.lanternCount == "number" && t.lanternCount > 0
            ? Math.min(12, Math.max(1, Math.round(t.lanternCount)))
            : R,
        N = C < 600 ? Math.max(6, Math.round(S * (C / 600))) : S,
        A = [];
      for (let M = 0; M < P; M++) A.push((M + 0.5) * (C / P));
      z.innerHTML = "";
      let W = 2 + w;
      if (
        (b === "u-shaped"
          ? (W = p(z, C, A, N, w))
          : b === "dual"
            ? (W = m(z, C, A, N, w))
            : (W = h(z, C, A, w)),
        P !== d || g.length !== P)
      ) {
        ((f.innerHTML = ""), (g = []), (d = P));
        for (let M = 0; M < P; M++) {
          const V =
              t.lanternStyle > 0
                ? (t.lanternStyle - 1) % Hn.length
                : M % Hn.length,
            y = o[M % o.length],
            v = (2.5 + ((M * 0.17) % 1.5)).toFixed(1),
            I = -((M * 0.37) % parseFloat(v)),
            F = document.createElement("div");
          ((F.className = "ro-lantern"),
            F.style.setProperty("--ro-swing-duration", `${v}s`),
            (F.style.animationDelay = `${I.toFixed(2)}s`),
            (F.style.left = `${A[M].toFixed(1)}px`),
            (F.style.top = `${W}px`));
          const H = document.createElement("div");
          ((H.innerHTML = i(V, y)),
            F.appendChild(H),
            f.appendChild(F),
            g.push(F));
        }
      } else
        for (let M = 0; M < P; M++)
          ((g[M].style.left = `${A[M].toFixed(1)}px`),
            (g[M].style.top = `${W}px`));
    };
    (e.appendChild(z), e.appendChild(f), x());
    const k = () => {
      x();
    };
    let T = null;
    if (typeof ResizeObserver < "u" && e.parentElement)
      try {
        ((T = new ResizeObserver(() => {
          x();
        })),
          T.observe(e.parentElement));
      } catch {}
    return () => {
      (T == null || T.disconnect(),
        z.remove(),
        f.remove(),
        window.removeEventListener("resize", k));
    };
  };
function E3(e, t) {
  return `<svg width="${t}" height="${t}" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M20 3 C8 3 2 11 2 20 C2 29 8 37 20 37 C14 32 11 26 11 20 C11 14 14 8 20 3Z" fill="${e}"/>
  </svg>`;
}
function T3(e, t) {
  const n = [];
  for (let r = 0; r < 8; r++) {
    const i = (r * Math.PI) / 4,
      l = i + Math.PI / 8;
    (n.push(`${20 + 18 * Math.sin(i)},${20 - 18 * Math.cos(i)}`),
      n.push(`${20 + 9 * Math.sin(l)},${20 - 9 * Math.cos(l)}`));
  }
  return `<svg width="${t}" height="${t}" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <polygon points="${n.join(" ")}" fill="${e}"/>
  </svg>`;
}
const M3 = (e, t) => {
  if (!br()) return () => {};
  const n = t.colors.length
      ? t.colors
      : ["#c9a84c", "#e8c96b", "#fff7cc", "#4a8a3a"],
    r = Sl(t.intensity, t.density),
    o = Math.round(12 + r * 6.5),
    a = 0.5 + (r / 10) * 0.8,
    i = [];
  function l() {
    const h = n[Math.floor(Math.random() * n.length)],
      p = Math.random(),
      m = document.createElement("div");
    let w;
    (p < 0.18
      ? ((w = 18 + Math.random() * 14),
        (m.className = "ro-crescent"),
        (m.innerHTML = E3(h, w)),
        (m.style.cssText = `
        position:absolute;
        width:${w}px;height:${w}px;
        filter:drop-shadow(0 0 ${w * 0.5}px ${h});
        animation:none;
      `))
      : p < 0.38
        ? ((w = 14 + Math.random() * 12),
          (m.className = "ro-star"),
          (m.innerHTML = T3(h, w)),
          (m.style.cssText = `
        position:absolute;
        width:${w}px;height:${w}px;
        filter:drop-shadow(0 0 ${w * 0.5}px ${h});
        animation:none;
      `))
        : ((w = 3 + Math.random() * 7),
          (m.className = "ro-sparkle"),
          (m.style.cssText = `
        position:absolute;
        width:${w}px;height:${w}px;
        background:${h};
        box-shadow:0 0 ${w * 1.5}px ${h};
        animation:none;
      `)),
      e.appendChild(m));
    let b, S;
    const z = t.position,
      f = In(z);
    f.length > 0
      ? ((b =
          f[Math.floor(Math.random() * f.length)] === "left"
            ? Math.random() * 4
            : 96 + Math.random() * 4),
        (S = Math.random() * 100))
      : z === "top"
        ? ((b = Math.random() * 100), (S = Math.random() * 20))
        : z === "bottom"
          ? ((b = Math.random() * 100), (S = 80 + Math.random() * 20))
          : z === "full"
            ? ((b = Math.random() * 100), (S = Math.random() * 100))
            : ((b = Math.random() * 100),
              (S =
                Math.random() < 0.5
                  ? Math.random() * 20
                  : 80 + Math.random() * 20));
    const d = 80 + Math.random() * 80;
    return (
      (m.style.left = `${b}%`),
      (m.style.top = `${S}%`),
      {
        el: m,
        x: b,
        y: S,
        vx: (Math.random() - 0.5) * 0.06 * a,
        vy: (-0.035 - Math.random() * 0.055) * a,
        size: w,
        opacity: 0,
        life: 0,
        maxLife: d,
        color: h,
      }
    );
  }
  for (; i.length < o;) i.push(l());
  function u(h) {
    for (; i.length < o;) i.push(l());
    for (let p = i.length - 1; p >= 0; p--) {
      const m = i[p];
      (m.life++, (m.x += m.vx), (m.y += m.vy));
      const w = m.life / m.maxLife;
      ((m.opacity = w < 0.3 ? w / 0.3 : w > 0.7 ? (1 - w) / 0.3 : 1),
        (m.el.style.left = `${m.x}%`),
        (m.el.style.top = `${m.y}%`),
        (m.el.style.opacity = String(Math.min(1, Math.max(0, m.opacity)))),
        (m.el.style.transform = `scale(${0.5 + m.opacity * 0.5})`),
        m.life >= m.maxLife && (m.el.remove(), i.splice(p, 1)));
    }
  }
  const c = J0(u);
  return () => {
    (c(), i.forEach((h) => h.el.remove()), (i.length = 0));
  };
};
function In(
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
  const t = In(e);
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
  return N3(e);
}
const j3 = {
    lanterns: cc,
    "crescent-stars": w3,
    geometric: z3,
    sparkles: M3,
    eid: za,
    "eid-fitr": za,
    "eid-adha": za,
  },
  A3 = "ramadan-overlay-root",
  Ci = "ramadan-overlay-styles";
function L3() {
  var e, t;
  try {
    if (typeof document > "u") return;
    ((e = document.getElementById(A3)) == null || e.remove(),
      (t = document.getElementById(Ci)) == null || t.remove());
  } catch {}
}
function P3() {
  if (typeof document > "u" || document.getElementById(Ci)) return;
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
function F1(e, t) {
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
    In(t.position).length > 0
      ? e.setAttribute("data-is-side", "true")
      : e.removeAttribute("data-is-side"));
}
function I3(e, t) {
  return e.variant === "banner" ? D3(e, t) : _3(e, t);
}
function _3(e, t) {
  var p, m, w, b;
  P3();
  const n = document.createElement("div");
  ((n.id = "ramadan-overlay-root"),
    n.setAttribute("aria-hidden", "true"),
    n.setAttribute("role", "presentation"),
    F1(n, e));
  let r = document.body,
    o = !1;
  const a = e.attachTo ?? e.mountTarget;
  if (a)
    if (typeof a == "string" && a.trim().length > 0) {
      const S = a.trim();
      let z = null;
      try {
        z = document.querySelector(S);
      } catch {}
      if (!z && !S.startsWith(".") && !S.startsWith("#"))
        try {
          z = document.querySelector(`.${S}`);
        } catch {}
      z && ((r = z), (o = !0));
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
      (m =
        (p = window.getComputedStyle) == null ? void 0 : p.call(window, r)) ==
      null
        ? void 0
        : m.position;
    (S === "static" || !S) && (r.style.position = "relative");
    const z =
      (b =
        (w = window.getComputedStyle) == null ? void 0 : w.call(window, r)) ==
      null
        ? void 0
        : b.overflow;
    (z === "hidden" || z === "clip") && (r.style.overflow = "visible");
  }
  r.appendChild(n);
  const l = (j3[e.variant] ?? cc)(n, e, t),
    u = () => {
      n.style.visibility = document.hidden ? "hidden" : "";
    };
  return (
    document.addEventListener("visibilitychange", u),
    {
      container: n,
      cleanup: () => {
        (l(), document.removeEventListener("visibilitychange", u), n.remove());
      },
      updateTokens: (S) => {
        F1(n, S);
      },
    }
  );
}
function D3(e, t) {
  const { elements: n, cleanup: r } = v3(e, t);
  return {
    container: n[0] ?? document.body,
    cleanup: r,
    updateTokens: (i) => {
      for (const l of n)
        (l.style.setProperty("--ro-banner-bg", i.bannerBg),
          l.style.setProperty("--ro-banner-text", i.bannerTextColor),
          l.style.setProperty("--ro-banner-icon", i.bannerIconColor));
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
        l = i + a.duration,
        u = t.createOscillator();
      ((u.type = "sine"), u.frequency.setValueAtTime(a.freq, i));
      const c = t.createOscillator();
      ((c.type = "sine"), c.frequency.setValueAtTime(a.freq * 2.01, i));
      const h = t.createGain();
      (h.gain.setValueAtTime(1e-4, i),
        h.gain.exponentialRampToValueAtTime(a.gain, i + 0.025),
        h.gain.exponentialRampToValueAtTime(1e-4, l));
      const p = t.createGain();
      (p.gain.setValueAtTime(1e-4, i),
        p.gain.exponentialRampToValueAtTime(a.gain * 0.2, i + 0.02),
        p.gain.exponentialRampToValueAtTime(1e-4, i + 0.7),
        u.connect(h),
        h.connect(r),
        c.connect(p),
        p.connect(r),
        u.start(i),
        u.stop(l),
        c.start(i),
        c.stop(i + 0.75));
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
const zi = "ramadan-countdown-styles",
  W3 = "ramadan-countdown-root";
function G3() {
  var e, t;
  try {
    if (typeof document > "u") return;
    ((e = document.getElementById(W3)) == null || e.remove(),
      (t = document.getElementById(zi)) == null || t.remove());
  } catch {}
}
function Q3() {
  if (typeof document > "u" || document.getElementById(zi)) return;
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
  ((t.id = zi), (t.textContent = e), document.head.appendChild(t));
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
    a = document.createElement("div");
  ((a.className = "ro-countdown-card"),
    a.setAttribute("role", "region"),
    a.setAttribute("aria-label", e.labels.title));
  const i = document.createElement("div");
  i.className = "ro-countdown-header";
  const l = document.createElement("span");
  ((l.className = "ro-countdown-badge"), (l.textContent = "🌙"));
  const u = document.createElement("div");
  u.className = "ro-countdown-titles";
  const c = document.createElement("h3");
  ((c.className = "ro-countdown-title"), (c.textContent = e.labels.title));
  const h = document.createElement("span");
  ((h.className = "ro-countdown-target"),
    (h.textContent = o),
    u.appendChild(c),
    u.appendChild(h));
  const p = document.createElement("div");
  p.className = "ro-countdown-actions";
  let m = null;
  e.hasSound &&
    ((m = document.createElement("button")),
    (m.type = "button"),
    (m.className = "ro-countdown-btn ro-countdown-sound-btn"),
    m.setAttribute(
      "aria-label",
      e.initialMuted ? e.labels.unmuteButton : e.labels.muteButton
    ),
    m.setAttribute("aria-pressed", String(!e.initialMuted)),
    (m.innerHTML = e.initialMuted
      ? '<span class="ro-countdown-icon">🔇</span>'
      : '<span class="ro-countdown-icon">🔊</span>'),
    m.addEventListener("click", () => {
      var D;
      m != null && m.classList.contains("ro-countdown-btn--prompt")
        ? (m.classList.remove("ro-countdown-btn--prompt"),
          (D = e.onPlayAlert) == null || D.call(e))
        : e.onToggleSound();
    }),
    p.appendChild(m));
  const w = e.minimizable !== !1;
  let b = null;
  w &&
    ((b = document.createElement("button")),
    (b.type = "button"),
    (b.className = "ro-countdown-btn ro-countdown-minimize-btn"),
    b.setAttribute("aria-label", e.labels.minimizeButton),
    (b.innerHTML = '<span class="ro-countdown-icon">−</span>'),
    b.addEventListener("click", (D) => {
      (D.stopPropagation(), W());
    }),
    p.appendChild(b));
  const S = document.createElement("button");
  ((S.type = "button"),
    (S.className = "ro-countdown-btn ro-countdown-close-btn"),
    S.setAttribute("aria-label", e.labels.dismissButton),
    (S.innerHTML = '<span class="ro-countdown-icon">✕</span>'),
    S.addEventListener("click", () => {
      e.onDismiss();
    }),
    p.appendChild(S),
    i.appendChild(l),
    i.appendChild(u),
    i.appendChild(p),
    a.appendChild(i));
  const z = document.createElement("div");
  ((z.className = "ro-countdown-digits"),
    z.setAttribute("aria-hidden", "true"));
  const f = (D, $) => {
      const B = document.createElement("span");
      ((B.className = `ro-countdown-value ${D}`), (B.textContent = "00"));
      const U = document.createElement("div");
      U.className = "ro-countdown-unit";
      const Y = document.createElement("span");
      return (
        (Y.className = "ro-countdown-label"),
        (Y.textContent = $),
        U.appendChild(B),
        U.appendChild(Y),
        { unit: U, val: B }
      );
    },
    { unit: d, val: g } = f("ro-val-hours", e.labels.hours),
    x = document.createElement("span");
  ((x.className = "ro-countdown-sep"), (x.textContent = ":"));
  const { unit: k, val: T } = f("ro-val-minutes", e.labels.minutes),
    E = document.createElement("span");
  ((E.className = "ro-countdown-sep"), (E.textContent = ":"));
  const { unit: C, val: _ } = f("ro-val-seconds", e.labels.seconds);
  (z.appendChild(d),
    z.appendChild(x),
    z.appendChild(k),
    z.appendChild(E),
    z.appendChild(C),
    a.appendChild(z));
  const L = document.createElement("div");
  ((L.className = "ro-countdown-celebration"),
    (L.style.display = "none"),
    (L.innerHTML = `
    <span class="ro-celebration-badge">✨</span>
    <p class="ro-celebration-text">${e.labels.celebration}</p>
  `),
    a.appendChild(L));
  const R = document.createElement("div");
  ((R.className = "ro-sr-only ro-countdown-announcer"),
    R.setAttribute("role", "status"),
    R.setAttribute("aria-live", "polite"),
    R.setAttribute("aria-atomic", "true"),
    a.appendChild(R));
  let P = null,
    N = null;
  if (w) {
    ((P = document.createElement("div")),
      (P.className = "ro-countdown-pill"),
      P.setAttribute("role", "button"),
      P.setAttribute("tabindex", "0"),
      P.setAttribute("aria-label", e.labels.expandButton));
    const D = document.createElement("span");
    ((D.className = "ro-countdown-pill-badge"), (D.textContent = "🌙"));
    const $ = document.createElement("span");
    (($.className = "ro-countdown-pill-target"), ($.textContent = r));
    const B = document.createElement("span");
    ((B.className = "ro-countdown-pill-sep"),
      (B.textContent = "·"),
      (N = document.createElement("span")),
      (N.className = "ro-countdown-pill-time"),
      (N.textContent = "--:--"),
      P.appendChild(D),
      P.appendChild($),
      P.appendChild(B),
      P.appendChild(N),
      P.addEventListener("click", () => {
        G();
      }),
      P.addEventListener("keydown", (U) => {
        (U.key === "Enter" || U.key === " ") && (U.preventDefault(), G());
      }),
      t.appendChild(P));
  }
  (t.appendChild(a), document.body.appendChild(t));
  let A = !1;
  const W = () => {
      var D;
      if (w) {
        ((A = !0), t.classList.add("ro-countdown-host--minimized"));
        try {
          typeof sessionStorage < "u" &&
            sessionStorage.setItem("ro_countdown_minimized", "true");
        } catch {}
        (D = e.onMinimize) == null || D.call(e);
      }
    },
    G = () => {
      var D;
      if (w) {
        ((A = !1), t.classList.remove("ro-countdown-host--minimized"));
        try {
          typeof sessionStorage < "u" &&
            sessionStorage.setItem("ro_countdown_minimized", "false");
        } catch {}
        (D = e.onExpand) == null || D.call(e);
      }
    },
    le = () => A;
  if (w) {
    let D = e.initiallyMinimized ?? !1;
    try {
      if (typeof sessionStorage < "u") {
        const $ = sessionStorage.getItem("ro_countdown_minimized");
        $ === "true" ? (D = !0) : $ === "false" && (D = !1);
      }
    } catch {}
    D && W();
  }
  const M = $3(t, e.onDismiss),
    V = new F3(R, e.labels),
    y = (D) => {
      const $ = Math.max(0, Math.floor(D / 1e3)),
        B = Math.floor($ / 3600),
        U = Math.floor(($ % 3600) / 60),
        Y = $ % 60;
      ((g.textContent = String(B).padStart(2, "0")),
        (T.textContent = String(U).padStart(2, "0")),
        (_.textContent = String(Y).padStart(2, "0")),
        N &&
          !a.classList.contains("ro-countdown--celebrating") &&
          (B > 0
            ? (N.textContent = `${B}h ${U}m`)
            : (N.textContent = `${U}m ${String(Y).padStart(2, "0")}s`)),
        V.checkMilestone(D));
    },
    v = () => {
      (a.classList.add("ro-countdown--celebrating"),
        P &&
          (P.classList.add("ro-countdown--celebrating"),
          N && (N.textContent = e.labels.celebration)),
        (z.style.display = "none"),
        (L.style.display = "flex"),
        V.checkMilestone(0));
    };
  return {
    root: t,
    updateDigits: y,
    showCelebration: v,
    triggerCelebrationFlare: v,
    endCelebration: () => {
      (a.classList.remove("ro-countdown--celebrating"),
        P && P.classList.remove("ro-countdown--celebrating"),
        (L.style.display = "none"),
        (z.style.display = "flex"));
    },
    updateSoundButton: (D, $) => {
      m &&
        (m.setAttribute(
          "aria-label",
          D ? e.labels.unmuteButton : e.labels.muteButton
        ),
        m.setAttribute("aria-pressed", String(!D)),
        $
          ? (m.classList.add("ro-countdown-btn--prompt"),
            (m.innerHTML = '<span class="ro-countdown-icon">🔊</span>'),
            m.setAttribute("aria-label", e.labels.playButton))
          : (m.classList.remove("ro-countdown-btn--prompt"),
            (m.innerHTML = D
              ? '<span class="ro-countdown-icon">🔇</span>'
              : '<span class="ro-countdown-icon">🔊</span>')));
    },
    minimize: W,
    expand: G,
    isMinimized: le,
    announcer: V,
    destroy: () => {
      (M(), t.remove());
    },
  };
}
const K3 = /^([01]?\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?$/;
function $1(e, t = new Date(), n = 10) {
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
      a = o.match(K3);
    if (a) {
      const l = parseInt(a[1], 10),
        u = parseInt(a[2], 10),
        c = a[3] !== void 0 ? parseInt(a[3], 10) : 0,
        h = new Date(t.getTime());
      h.setHours(l, u, c, 0);
      const p = n * 6e4;
      return (t.getTime() > h.getTime() + p && h.setDate(h.getDate() + 1), h);
    }
    const i = new Date(o);
    return isNaN(i.getTime()) ? null : i;
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
      var a, i, l;
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
function V1(e, t = {}) {
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
    l = { ...a, iftarTime: i },
    u = l.alertWindowMinutes ?? 30,
    c = l.autoDismissAfterMinutes !== void 0 ? l.autoDismissAfterMinutes : 10,
    h = l.celebrationDurationMs ?? 3e4,
    p = $1(l.iftarTime, new Date(), c);
  if (!p)
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
  const { dict: m, isRtl: w, lang: b } = O3(l.locale, l.labels),
    S = new U3({
      soundUrl: l.soundUrl,
      defaultMuted: l.defaultMuted,
      onAudioBlocked: () => {
        var C;
        ((C = l.onAudioBlocked) == null || C.call(l),
          f && f.updateSoundButton(S.isMuted(), !0));
      },
    }),
    z = (C) => !(C.sound === !1 || C.soundUrl === !1 || C.soundUrl === "none");
  let f = null,
    d = !1,
    g,
    x = null;
  if (typeof window < "u") {
    const C = () => {
        (S.prime(), _());
      },
      _ = () => {
        (window.removeEventListener("pointerdown", C),
          window.removeEventListener("keydown", C),
          (x = null));
      };
    ((x = _),
      window.addEventListener("pointerdown", C, { once: !0, passive: !0 }),
      window.addEventListener("keydown", C, { once: !0, passive: !0 }));
  }
  const k = () => {
      if (f || d) return;
      ((f = Y3({
        targetTime: T.getTargetTime(),
        position: l.position ?? "bottom-right",
        isBannerTopActive: n,
        hasSound: z(l),
        initialMuted: S.isMuted(),
        minimizable: l.minimizable,
        initiallyMinimized: g !== void 0 ? g : l.initiallyMinimized,
        labels: m,
        isRtl: w,
        lang: b,
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
      const _ = T.getTargetTime().getTime() - Date.now();
      f.updateDigits(_);
      const L = Math.max(1, Math.floor(_ / 6e4));
      f.announcer.announceInitial(L);
    },
    T = new Z3(p, {
      alertWindowMinutes: u,
      autoDismissMinutes: c,
      celebrationDurationMs: h,
      onAlertWindow: () => {
        k();
      },
      onTick: (C) => {
        f && f.updateDigits(C);
      },
      onT0: () => {
        var C;
        if ((f && f.triggerCelebrationFlare(), l.confetti !== !1))
          try {
            Si(r, o, "ramadan");
          } catch {}
        (S.playAlert(), (C = l.onIftar) == null || C.call(l));
      },
      onCelebrationEnd: () => {
        f && f.endCelebration();
      },
      onAutoDismiss: () => {
        E.dismiss();
      },
    }),
    E = {
      show: () => {
        (k(), T.forceOpen());
      },
      dismiss: () => {
        var C;
        (f && (f.destroy(), (f = null)),
          T.stop(),
          S.destroy(),
          (C = l.onDismiss) == null || C.call(l));
      },
      minimize: () => {
        ((g = !0), f == null || f.minimize());
      },
      expand: () => {
        ((g = !1), f == null || f.expand());
      },
      isMinimized: () =>
        f ? f.isMinimized() : (g ?? (l.initiallyMinimized || !1)),
      toggleMute: () => {
        const C = S.toggleMute();
        return (C || S.prime(), f && f.updateSoundButton(C, !1), C);
      },
      isMuted: () => S.isMuted(),
      playAlert: () => S.playAlert(),
      getTargetTime: () => T.getTargetTime(),
      updateConfig: (C) => {
        if (
          (Object.assign(l, C),
          C.defaultMuted !== void 0 && S.setMuted(C.defaultMuted),
          C.soundUrl !== void 0 && S.setSoundUrl(C.soundUrl),
          C.iftarTime !== void 0 ||
            C.alertWindowMinutes !== void 0 ||
            C.autoDismissAfterMinutes !== void 0 ||
            C.celebrationDurationMs !== void 0)
        ) {
          const _ = $1(
            l.iftarTime,
            new Date(),
            l.autoDismissAfterMinutes ?? 10
          );
          _ &&
            T.updateTarget(
              _,
              l.alertWindowMinutes ?? 30,
              l.autoDismissAfterMinutes ?? 10,
              l.celebrationDurationMs ?? 3e4
            );
        }
        C.position &&
          f &&
          ((f.root.className = `ro-countdown-host ro-countdown-host--${C.position}`),
          n &&
            C.position.startsWith("top-") &&
            f.root.classList.add("ro-countdown-host--banner-offset-top"));
      },
    };
  return {
    start: () => {
      d || T.start();
    },
    stop: () => {
      T.stop();
    },
    destroy: () => {
      ((d = !0), x && x(), E.dismiss(), T.destroy());
    },
    isMounted: () => f !== null,
    controller: E,
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
function X3(e, t) {
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
  ad = ["hide", "top", "show"],
  id = ["on", "off"],
  ld = ["en", "ar"],
  sd = ["edges", "full"],
  cd = ["foreground", "background"];
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
function ud() {
  (L3(), G3());
}
function H1(e, t, n) {
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
function U1(e, t = ki) {
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
function Ea(e, t) {
  return t.isEid && (e.variant === "lanterns" || e.variant === "eid")
    ? e.eidVariant
    : e.variant;
}
function rn(e) {
  return e.mobileSideBehavior === "top" &&
    In(e.position).length > 0 &&
    typeof window < "u" &&
    window.innerWidth < 768
    ? "top"
    : e.position;
}
function Wn(e, t) {
  return t.previewMode || !t.autoTrigger
    ? !0
    : e.occasion === "none"
      ? !1
      : t.occasions.includes(e.occasion);
}
function W1(e, t) {
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
    n = Cr(t);
  let r = "classic";
  typeof e.theme == "string"
    ? (r = Ze(e.theme, J3, "classic", "theme", t))
    : typeof e.theme == "object" && e.theme !== null && (r = e.theme);
  const o = X3(r, e),
    a = Ze(e.variant, ed, "lanterns", "variant", t);
  let i = Ze(e.position, td, "both", "position", t);
  a === "banner" &&
    ["left", "right", "sides", "start", "end"].includes(i) &&
    (n.warn(
      '[ramadan-overlay] Banner variant does not support vertical side positioning; falling back to "top"'
    ),
    (i = "top"));
  const l = typeof window < "u" && window.innerWidth < 640 ? "low" : "normal",
    u = Ze(e.density, nd, l, "density", t);
  let c = e.ropeStyle;
  c === "u-shape" || c === "curved"
    ? (c = "u-shaped")
    : c === "dual-rope" && (c = "dual");
  const h = Ze(c, rd, "straight", "ropeStyle", t),
    p = Ze(e.mobileSideBehavior, ad, "hide", "mobileSideBehavior", t),
    m = Ze(e.confetti, id, "on", "confetti", t),
    w = Ze(e.locale, ld, "en", "locale", t),
    b = Un(e.opacity, 0, 1, 0.85),
    S = Un(e.zIndex, -2147483648, 2147483647, 9999),
    z = Un(e.lanternZIndex, -2147483648, 2147483647, 2),
    f = Un(e.ropeSag, 6, 60, 20),
    d =
      typeof e.lanternCount == "number" ? Un(e.lanternCount, 1, 12, 4) : void 0,
    g = Ze(e.shadows, q3, "soft", "shadows", t),
    x = ["crescent-stars", "eid", "eid-fitr", "eid-adha"].includes(a)
      ? "edges"
      : "full",
    k = Ze(e.clearance, sd, x, "clearance", t),
    T = Ze(e.layer, cd, "foreground", "layer", t),
    E = e.attachTo ?? e.mountTarget;
  let C;
  typeof E == "string" && E.trim().length > 0
    ? (C = E.trim())
    : typeof HTMLElement < "u" && E instanceof HTMLElement && (C = E);
  const _ = C,
    L = e.attachEdge === "top" ? "top" : "bottom";
  let R = ["ramadan", "eid-fitr", "eid-adha"];
  if (Array.isArray(e.occasions)) {
    const A = e.occasions.filter((W) => od.includes(W));
    A.length > 0 && (R = A);
  }
  let P;
  if (e.date instanceof Date) P = isNaN(e.date.getTime()) ? void 0 : e.date;
  else if (typeof e.date == "string" || typeof e.date == "number") {
    const A = new Date(e.date);
    P = isNaN(A.getTime()) ? void 0 : A;
  }
  let N = "normal";
  return (
    typeof e.intensity == "number"
      ? (N = Math.max(1, Math.min(10, Math.round(e.intensity))))
      : e.intensity === "low" ||
          e.intensity === "normal" ||
          e.intensity === "high"
        ? (N = e.intensity)
        : (e.density === "low" ||
            e.density === "normal" ||
            e.density === "high") &&
          (N = e.density),
    {
      date: P,
      debug: t,
      onError: e.onError,
      theme: e.theme ?? "classic",
      themeName: o.name ?? "classic",
      variant: a,
      position: i,
      clearance: k,
      layer: T,
      mountTarget: _,
      attachTo: C,
      attachEdge: L,
      mobileSideBehavior: p,
      opacity: b,
      shadows: g,
      colors: o.colors,
      zIndex: S,
      lanternZIndex: z,
      autoTrigger: e.autoTrigger ?? !0,
      previewMode: e.previewMode ?? !1,
      confetti: m,
      locale: w,
      bannerBg: o.bannerBg,
      bannerTextColor: o.bannerTextColor,
      bannerTextEn: e.bannerTextEn ?? "",
      bannerTextAr: e.bannerTextAr ?? "",
      bannerIconColor: o.bannerIconColor,
      lanternStyle: e.lanternStyle ?? 0,
      lanternCount: d,
      glowColor: o.glowColor,
      ceilingColor: o.ceilingColor,
      ropeColor: o.ropeColor,
      ropeStyle: h,
      ropeSag: f,
      region: e.region ?? "standard",
      hijriAdjustment: sc(e.region, e.hijriAdjustment),
      density: u,
      intensity: N,
      occasions: R,
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
  if (typeof document > "u") return U1(Xr(e), ki);
  let t = { ...e },
    n;
  try {
    n = Xr(t);
  } catch {
    n = Xr({});
  }
  const r = dc(n);
  try {
    let o = bn({
      date: n.date ?? new Date(),
      region: n.region,
      hijriAdjustment: n.hijriAdjustment,
    });
    const a = Cr(r);
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
      l = new Date().toDateString();
    const u = (x) => {
        const k = Ea(n, x),
          T = rn(n),
          E = { ...n, variant: k, position: T };
        ((i = I3(E, x.occasion)), (g.container = i.container));
      },
      c = () => {
        i && (i.cleanup(), (i = null), (g.container = null));
      },
      h = (x, k) => {
        var T, E, C, _;
        if (
          ((!x || x.occasion !== k.occasion) &&
            ((T = n.onOccasionChange) == null || T.call(n, k.occasion, k)),
          (k.isRamadan || n.previewMode) &&
            (!x || !x.isRamadan) &&
            ((E = n.onRamadanStart) == null || E.call(n, k)),
          k.isEid &&
            (!x || !x.isEid) &&
            ((C = n.onEidStart) == null || C.call(n, k)),
          x != null &&
            x.isRamadan &&
            !k.isRamadan &&
            ((_ = n.onRamadanEnd) == null || _.call(n)),
          a3(k, n.confetti, n.previewMode))
        ) {
          const L = k.hijriYear || 1447,
            R = W1(k, n);
          Si(L, n.colors, R);
        }
      };
    let p = null;
    const m = () => {
        if (!n.liveTransition || typeof window > "u") return;
        p && clearTimeout(p);
        const x = dd();
        p = setTimeout(() => {
          w();
        }, x);
      },
      w = () => {
        var L, R;
        const x = new Date();
        l = x.toDateString();
        const k = bn({
            date: x,
            region: n.region,
            hijriAdjustment: n.hijriAdjustment,
          }),
          T = o,
          E = T.occasion,
          C = Wn(T, n),
          _ = Wn(k, n);
        ((o = k),
          (g.state = k),
          _
            ? C
              ? E !== k.occasion && (c(), u(k), h(T, k))
              : (u(k), h(T, k))
            : C &&
              (c(),
              (L = n.onOccasionChange) == null || L.call(n, k.occasion, k),
              T.isRamadan && ((R = n.onRamadanEnd) == null || R.call(n))),
          m());
      },
      b = () => {
        new Date().toDateString() !== l && w();
      };
    n.liveTransition &&
      typeof document < "u" &&
      (m(),
      document.addEventListener("visibilitychange", b),
      typeof window < "u" && window.addEventListener("focus", b));
    let S = rn(n);
    const z = () => {
      const x = rn(n);
      x !== S && ((S = x), i && Wn(o, n) && (c(), u(o)));
    };
    typeof window < "u" &&
      window.addEventListener("resize", z, { passive: !0 });
    const f = (x, k) => x.isRamadan || k.previewMode || !k.autoTrigger;
    let d = null;
    n.countdown &&
      ((d = V1(n.countdown, {
        isBannerActive: n.variant === "banner",
        hijriYear: o.hijriYear || 1447,
        colors: n.colors,
      })),
      f(o, n) && d.start());
    const g = {
      destroy: () => {
        var x;
        (d && (d.destroy(), (d = null)),
          p && (clearTimeout(p), (p = null)),
          typeof document < "u" &&
            document.removeEventListener("visibilitychange", b),
          typeof window < "u" &&
            (window.removeEventListener("focus", b),
            window.removeEventListener("resize", z)),
          c(),
          o.isRamadan && ((x = n.onRamadanEnd) == null || x.call(n)));
      },
      update: (x) => {
        try {
          t = { ...t, ...x };
          const k = Xr(t);
          if (
            x.date !== void 0 ||
            x.region !== void 0 ||
            x.hijriAdjustment !== void 0
          ) {
            const C = o;
            ((o = bn({
              date: k.date ?? new Date(),
              region: k.region,
              hijriAdjustment: k.hijriAdjustment,
            })),
              (g.state = o),
              C.occasion !== o.occasion && h(C, o));
          }
          const T = Wn(o, k),
            E = !!i;
          if (T && !E) ((n = k), u(o));
          else if (!T && E) ((n = k), c());
          else if (i) {
            const C = Ea(n, o),
              _ = Ea(k, o),
              L =
                k.variant === "banner" &&
                (JSON.stringify(k.bannerTextEn) !==
                  JSON.stringify(n.bannerTextEn) ||
                  JSON.stringify(k.bannerTextAr) !==
                    JSON.stringify(n.bannerTextAr) ||
                  k.locale !== n.locale),
              R = rn(n),
              P = rn(k),
              N =
                _ !== C ||
                P !== R ||
                k.mobileSideBehavior !== n.mobileSideBehavior ||
                k.density !== n.density ||
                k.intensity !== n.intensity ||
                k.lanternStyle !== n.lanternStyle ||
                k.ropeStyle !== n.ropeStyle ||
                k.ropeSag !== n.ropeSag ||
                k.clearance !== n.clearance ||
                k.lanternCount !== n.lanternCount ||
                k.attachTo !== n.attachTo ||
                k.attachEdge !== n.attachEdge ||
                k.mountTarget !== n.mountTarget ||
                L;
            ((n = k), (S = P), N ? (c(), u(o)) : i.updateTokens(k));
          } else ((n = k), (S = rn(k)));
          (n.liveTransition ? m() : p && (clearTimeout(p), (p = null)),
            x.countdown !== void 0 &&
              (d && (d.destroy(), (d = null)),
              k.countdown &&
                ((d = V1(k.countdown, {
                  isBannerActive: k.variant === "banner",
                  hijriYear: o.hijriYear || 1447,
                  colors: k.colors,
                })),
                f(o, k) && d.start())));
        } catch (k) {
          (H1(t.onError, k, r),
            a.error(
              "[ramadan-overlay] Dynamic update error caught by containment boundary:",
              k
            ));
        }
      },
      setTheme: (x) => {
        g.update({ theme: x });
      },
      container: null,
      state: o,
      get config() {
        return n;
      },
      getCountdownController: () => (d ? d.controller : null),
      get countdown() {
        return d ? d.controller : null;
      },
      getState: () => o,
      fireConfetti: async (x) => {
        const k = o.hijriYear || 1447,
          T = x || W1(o, n);
        await Si(k, n.colors, T);
      },
    };
    return (Wn(o, n) && u(o), h(null, o), g);
  } catch (o) {
    return (
      ud(),
      H1(e.onError, o, r),
      Cr(r).error(
        "[ramadan-overlay] Catastrophic initialization error caught by containment boundary:",
        o
      ),
      U1(n, ki)
    );
  }
}
function fd(e = {}) {
  const t = X.useRef(null),
    [n, r] = X.useState(() => bn(e)),
    o = JSON.stringify(e),
    a = X.useRef(!1);
  X.useEffect(() => {
    if (((a.current = !0), !t.current)) {
      const l = uo({
        ...e,
        onOccasionChange: (u, c) => {
          var h;
          (r(c), (h = e.onOccasionChange) == null || h.call(e, u, c));
        },
      });
      ((t.current = l), r(l.state));
    }
    return () => {
      var l;
      ((a.current = !1),
        (l = t.current) == null || l.destroy(),
        (t.current = null));
    };
  }, []);
  const i = typeof e.theme == "object" ? JSON.stringify(e.theme) : e.theme;
  return (
    X.useEffect(() => {
      a.current &&
        t.current &&
        e.theme !== void 0 &&
        t.current.setTheme(e.theme);
    }, [i]),
    X.useEffect(() => {
      a.current && t.current && t.current.update(e);
    }, [o]),
    { state: n, instance: t.current }
  );
}
const pd = (e) => {
    const { config: t, onInstance: n, children: r, ...o } = e,
      a = { ...t, ...o },
      { state: i, instance: l } = fd(a);
    return (
      X.useEffect(() => {
        n && n(l);
      }, [l, n]),
      r ? s.jsx(s.Fragment, { children: r(i) }) : null
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
        countdown: "تفعيل ودجت عداد وقت الإفطار",
        countdownHelp:
          "يعرض بطاقة عد تنازلي حتى أذان المغرب مع تنبيهات صوتية واحتفال عند الوصول.",
      },
      variantSpecific: {
        lanternHeading: "خيارات الفوانيس والحبال",
        lanternStyle: "تصميم الفانوس",
        lanternCycle: "عرض جميع التصاميم الـ 12 بالتناوب",
        lanternCount: "كثافة وعدد الفوانيس",
        lanternCountAuto: "تلقائي انسيابي (2–6)",
        lanternZIndex: "مستوى طبقة الفوانيس (Z-Index)",
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
        countdown: "Enable Iftar Countdown Widget",
        countdownHelp:
          "Mounts an accessible floating countdown card with audio chime alerts and confetti flare at Maghrib.",
      },
      variantSpecific: {
        lanternHeading: "Lantern & Rope Parameters",
        lanternStyle: "Lantern SVG Design",
        lanternCycle: "Cycle all 12 distinct designs",
        lanternCount: "Lantern Density / Count",
        lanternCountAuto: "Auto Decorative (Airy 2–6)",
        lanternZIndex: "Lantern Row Z-Index",
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
  fc = "ro_demo_lang";
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
    const e = localStorage.getItem(fc);
    if (e === "ar" || e === "en") return e;
  } catch {}
  return "ar";
}
function pc(e) {
  if (typeof document > "u") return;
  const t = e === "ar" ? "rtl" : "ltr";
  (document.documentElement.setAttribute("dir", t),
    document.documentElement.setAttribute("lang", e));
}
function gd(e) {
  if (!(typeof window > "u")) {
    try {
      localStorage.setItem(fc, e);
    } catch {}
    try {
      pc(e);
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
function mc(e) {
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
function zr(e, t, n) {
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
function Gn(e, t) {
  const n = mc(t);
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
    overlayOn: a,
    onToggleOverlay: i,
    onPlayChime: l,
    onFireConfetti: u,
    onToggleDrawer: c,
  }) =>
    s.jsxs("header", {
      className: "celestial-nav ro-attach-target",
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
                onChange: (h) => o(h.target.value),
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
              className: `nav-btn-pill ${a ? "active" : ""}`,
              onClick: i,
              children: [
                s.jsx("span", {
                  style: { fontSize: "0.9rem" },
                  children: a ? "✨" : "💤",
                }),
                s.jsx("span", {
                  children: a ? e.nav.overlayOn : e.nav.overlayOff,
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
  kd = new URL(
    "" + new URL("logo-yOUHX95I.png", import.meta.url).href,
    import.meta.url
  ).href,
  bd = ({
    t: e,
    locale: t = "ar",
    occasion: n = "ramadan",
    onFireConfetti: r,
    onScrollToWorkbench: o,
    onScrollToLab: a,
  }) => {
    const [i, l] = X.useState(!1),
      u = async () => {
        try {
          (await navigator.clipboard.writeText("npm i ramadan-overlay"),
            l(!0),
            setTimeout(() => l(!1), 2200));
        } catch {}
      },
      c = e.nav.occasions[n] ?? e.hero.badge,
      h = n === "eid-adha" ? "🐑" : n === "eid-fitr" ? "🎁" : "🌙";
    return s.jsxs("section", {
      id: "hero",
      className: "canopy-stage",
      children: [
        s.jsx("div", {
          className: "canopy-logo-wrap",
          onClick: r,
          title: e.nav.confettiLaunch,
          role: r ? "button" : void 0,
          tabIndex: r ? 0 : void 0,
          onKeyDown: (p) => {
            r &&
              (p.key === "Enter" || p.key === " ") &&
              (p.preventDefault(), r());
          },
          children: s.jsx("img", {
            src: kd,
            alt: "ramadan-overlay logo",
            className: "canopy-hero-logo clickable",
          }),
        }),
        s.jsxs("div", {
          className: "canopy-badge-wrap font-calligraphy",
          children: [
            s.jsx("span", {
              role: "img",
              "aria-label": "occasion icon",
              children: h,
            }),
            s.jsx("span", { children: c }),
          ],
        }),
        s.jsx("h1", {
          className: "canopy-title font-display",
          children: e.hero.title,
        }),
        s.jsx("p", { className: "canopy-subtitle", children: e.hero.subtitle }),
        s.jsxs("div", {
          className: "quick-install-box",
          children: [
            s.jsx("span", { className: "quick-install-prompt", children: "$" }),
            s.jsx("code", {
              className: "quick-install-code",
              children: "npm i ramadan-overlay",
            }),
            s.jsx("button", {
              className: "quick-install-copy-btn",
              onClick: u,
              "aria-label": i ? "Copied" : "Copy install command",
              title: i ? "Copied!" : "Copy command",
              children: i ? "✓" : "📋",
            }),
            i &&
              s.jsx("span", {
                className: "quick-install-toast",
                children: t === "ar" ? "تم النسخ!" : "Copied!",
              }),
          ],
        }),
        s.jsxs("div", {
          className: "canopy-actions",
          children: [
            s.jsxs("button", {
              className: "btn-primary",
              onClick: o,
              children: [
                s.jsx("span", { children: "🎨" }),
                s.jsx("span", { children: e.hero.ctaWorkbench }),
              ],
            }),
            r &&
              s.jsxs("button", {
                className: "btn-celebrate",
                onClick: r,
                title: e.nav.confettiLaunch,
                children: [
                  s.jsx("span", { children: h }),
                  s.jsx("span", { children: e.nav.confettiLaunch }),
                ],
              }),
            s.jsxs("button", {
              className: "btn-secondary",
              onClick: a,
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
    });
  },
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
  zd = ({ t: e, activeVariant: t, onSelectVariant: n }) =>
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
            const a = e.workbench.variants[r] || { name: r, desc: "" },
              i = t === r;
            return s.jsxs(
              "div",
              {
                className: `variant-card ${i ? "active" : ""}`,
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
                      s.jsx("span", { children: a.name }),
                    ],
                  }),
                  s.jsx("p", {
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
  Ed = ({ variant: e, position: t, onChangePosition: n, translations: r }) => {
    const o = mc(e);
    return s.jsxs("div", {
      className: "control-group",
      children: [
        s.jsx("label", { htmlFor: "position-select", children: r.position }),
        s.jsx("select", {
          id: "position-select",
          value: t,
          onChange: (a) => n(a.target.value),
          className: "form-select",
          children: o.map((a) =>
            s.jsx(
              "option",
              { value: a, children: r.positionOptions[a] || a },
              a
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
  Md = ({
    t: e,
    variant: t,
    position: n,
    onChangePosition: r,
    themeName: o,
    onChangeTheme: a,
    opacity: i,
    onChangeOpacity: l,
    layer: u,
    onChangeLayer: c,
    shadows: h,
    onChangeShadows: p,
    confetti: m,
    onChangeConfetti: w,
    autoTrigger: b,
    onToggleAutoTrigger: S,
    countdownEnabled: z,
    onToggleCountdown: f,
    attachTo: d,
    onChangeAttachTo: g,
    attachEdge: x,
    onChangeAttachEdge: k,
    mobileSideBehavior: T,
    onChangeMobileSideBehavior: E,
  }) => {
    const C = zr("shadows", t),
      _ = zr("mobileSideBehavior", t, { position: n }),
      L = d === ".celestial-nav",
      R = !!(d && typeof d == "string" && !L),
      [P, N] = Ta.useState(R);
    return (
      Ta.useEffect(() => {
        R && N(!0);
      }, [R]),
      s.jsxs("div", {
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
                    onChange: (A) => a(A.target.value),
                    children: [
                      s.jsx("optgroup", {
                        label: "Theme Presets",
                        children: Td.map((A) =>
                          s.jsx(
                            "option",
                            {
                              value: A,
                              children:
                                e.workbench.universal.themeOptions[A] || A,
                            },
                            A
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
              s.jsx(Ed, {
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
                    onChange: (A) => c(A.target.value),
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
                    value: m,
                    onChange: (A) => w(A.target.value),
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
              s.jsxs("div", {
                className: "form-group",
                children: [
                  s.jsx("label", {
                    className: "form-label",
                    children: e.workbench.universal.attachTo,
                  }),
                  s.jsxs("select", {
                    className: "form-select",
                    value: P || R ? "custom" : L ? "header" : "overlay",
                    onChange: (A) => {
                      A.target.value === "overlay"
                        ? (N(!1), g == null || g(void 0))
                        : A.target.value === "header"
                          ? (N(!1), g == null || g(".celestial-nav"))
                          : (N(!0),
                            g == null ||
                              g(
                                typeof d == "string" &&
                                  d &&
                                  d !== ".celestial-nav"
                                  ? d
                                  : ".ro-attach-target"
                              ));
                    },
                    children: [
                      s.jsx("option", {
                        value: "header",
                        children: e.workbench.universal.attachToOptions.header,
                      }),
                      s.jsx("option", {
                        value: "overlay",
                        children: e.workbench.universal.attachToOptions.overlay,
                      }),
                      s.jsx("option", {
                        value: "custom",
                        children: e.workbench.universal.attachToOptions.custom,
                      }),
                    ],
                  }),
                  (P || R) &&
                    s.jsx("input", {
                      type: "text",
                      className: "form-input",
                      style: { marginTop: "8px" },
                      placeholder:
                        e.workbench.universal.attachToCustomPlaceholder,
                      value: typeof d == "string" ? d : "",
                      onChange: (A) => (g == null ? void 0 : g(A.target.value)),
                    }),
                ],
              }),
              (!!d || P) &&
                s.jsxs("div", {
                  className: "form-group",
                  children: [
                    s.jsx("label", {
                      className: "form-label",
                      children: e.workbench.universal.attachEdge,
                    }),
                    s.jsxs("select", {
                      className: "form-select",
                      value: x || "bottom",
                      onChange: (A) => (k == null ? void 0 : k(A.target.value)),
                      children: [
                        s.jsx("option", {
                          value: "bottom",
                          children:
                            e.workbench.universal.attachEdgeOptions.bottom,
                        }),
                        s.jsx("option", {
                          value: "top",
                          children: e.workbench.universal.attachEdgeOptions.top,
                        }),
                      ],
                    }),
                  ],
                }),
              _ &&
                s.jsxs("div", {
                  className: "form-group",
                  children: [
                    s.jsx("label", {
                      className: "form-label",
                      children: e.workbench.universal.mobileSideBehavior,
                    }),
                    s.jsxs("select", {
                      className: "form-select",
                      value: T || "hide",
                      onChange: (A) => (E == null ? void 0 : E(A.target.value)),
                      children: [
                        s.jsx("option", {
                          value: "hide",
                          children:
                            e.workbench.universal.mobileSideBehaviorOptions
                              .hide,
                        }),
                        s.jsx("option", {
                          value: "top",
                          children:
                            e.workbench.universal.mobileSideBehaviorOptions.top,
                        }),
                        s.jsx("option", {
                          value: "show",
                          children:
                            e.workbench.universal.mobileSideBehaviorOptions
                              .show,
                        }),
                      ],
                    }),
                  ],
                }),
              C &&
                s.jsxs("div", {
                  className: "form-group",
                  children: [
                    s.jsx("label", {
                      className: "form-label",
                      children: e.workbench.universal.shadows,
                    }),
                    s.jsxs("select", {
                      className: "form-select",
                      value: h,
                      onChange: (A) => p(A.target.value),
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
                        children: [Math.round(i * 100), "%"],
                      }),
                    ],
                  }),
                  s.jsx("input", {
                    type: "range",
                    min: "0.1",
                    max: "1",
                    step: "0.05",
                    className: "form-range",
                    value: i,
                    onChange: (A) => l(parseFloat(A.target.value)),
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
                        checked: b,
                        onChange: S,
                        onClick: (A) => A.stopPropagation(),
                      }),
                      s.jsx("span", { className: "toggle-slider" }),
                    ],
                  }),
                ],
              }),
              s.jsxs("div", {
                className: "form-toggle-wrap",
                onClick: f,
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
                        checked: z,
                        onChange: f,
                        onClick: (A) => A.stopPropagation(),
                      }),
                      s.jsx("span", { className: "toggle-slider" }),
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
  Nd = ({ t: e, config: t, onUpdateConfig: n }) => {
    const r = t.variant || "lanterns",
      o = r === "lanterns",
      a = r === "banner",
      i = ["crescent-stars", "eid", "eid-fitr", "eid-adha"].includes(r),
      l = r === "sparkles",
      u = r === "geometric";
    return !o && !a && !i && !l && !u
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
                              [...Array(12)].map((c, h) =>
                                s.jsxs(
                                  "option",
                                  {
                                    value: h + 1,
                                    children: ["Design #", h + 1],
                                  },
                                  h + 1
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
                            children: e.workbench.variantSpecific.lanternCount,
                          }),
                          s.jsxs("select", {
                            className: "form-select",
                            value: t.lanternCount ?? 0,
                            onChange: (c) => {
                              const h = parseInt(c.target.value, 10);
                              n({ lanternCount: h === 0 ? void 0 : h });
                            },
                            children: [
                              s.jsx("option", {
                                value: 0,
                                children:
                                  e.workbench.variantSpecific.lanternCountAuto,
                              }),
                              [1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((c) =>
                                s.jsx("option", { value: c, children: c }, c)
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
                            children: e.workbench.variantSpecific.lanternZIndex,
                          }),
                          s.jsxs("select", {
                            className: "form-select",
                            value: t.lanternZIndex ?? 2,
                            onChange: (c) => {
                              const h = parseInt(c.target.value, 10);
                              n({ lanternZIndex: h });
                            },
                            children: [
                              s.jsx("option", {
                                value: 1,
                                children: "1 (Low)",
                              }),
                              s.jsx("option", {
                                value: 2,
                                children: "2 (Default)",
                              }),
                              s.jsx("option", {
                                value: 10,
                                children: "10 (Elevated)",
                              }),
                              s.jsx("option", {
                                value: 100,
                                children: "100 (High)",
                              }),
                              s.jsx("option", {
                                value: 9999,
                                children: "9999 (Topmost)",
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
                      zr("ropeSag", "lanterns", { ropeStyle: t.ropeStyle }) &&
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
            a &&
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
            i &&
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
  jd = ({ customTheme: e, onChangeColor: t, onReset: n, translations: r }) => {
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
                      value: a,
                      onChange: (l) => t("primaryColor", l.target.value),
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
                s.jsx("label", { htmlFor: "color-accent", children: r.accent }),
                s.jsxs("div", {
                  className: "color-input-wrapper",
                  children: [
                    s.jsx("input", {
                      id: "color-accent",
                      type: "color",
                      value: i,
                      onChange: (l) => t("accentColor", l.target.value),
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
  Ad = ({ t: e, locale: t, config: n, themeName: r }) => {
    const [o, a] = X.useState("react"),
      [i, l] = X.useState(!1),
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
      zr("shadows", u) &&
        n.shadows &&
        n.shadows !== "soft" &&
        (c.shadows = n.shadows),
      n.autoTrigger !== void 0 && !n.autoTrigger && (c.autoTrigger = !1),
      n.countdown && (c.countdown = !0),
      n.confetti === "off" && (c.confetti = "off"),
      n.attachTo &&
        ((c.attachTo = n.attachTo),
        n.attachEdge && (c.attachEdge = n.attachEdge)),
      n.mobileSideBehavior &&
        n.mobileSideBehavior !== "hide" &&
        (c.mobileSideBehavior = n.mobileSideBehavior),
      n.lanternCount && (c.lanternCount = n.lanternCount),
      n.lanternZIndex !== void 0 &&
        n.lanternZIndex !== 2 &&
        (c.lanternZIndex = n.lanternZIndex));
    const h = [
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
    for (const b of h) zr(b, u, n) && n[b] !== void 0 && (c[b] = n[b]);
    const p = JSON.stringify(c, null, 2),
      m = () => {
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
        ${Object.entries(c).map(([S, z]) =>
          typeof z == "string"
            ? `${S}="${z}"`
            : typeof z == "boolean"
              ? z
                ? S
                : `${S}={false}`
              : `${S}={${JSON.stringify(z)}}`
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
const overlay = init(${p});

// Cleanup when leaving the page
// overlay.destroy();`;
          case "vue":
            return `<!-- 1. Install: npm install ramadan-overlay -->
<script setup>
import { RamadanOverlay } from 'ramadan-overlay/vue';

const config = ${p};
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

  const config = ${p};
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
  config = ${p};
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
${p}

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
${p}

Please ensure clean lifecycle cleanup on component unmount and smooth z-index integration.`;
          default:
            return "";
        }
      },
      w = () => {
        const b = m();
        navigator.clipboard.writeText(b).then(() => {
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
            (b) =>
              s.jsx(
                "button",
                {
                  className: `code-tab-btn ${o === b ? "active" : ""}`,
                  onClick: () => a(b),
                  children: e.workbench.code.tabs[b],
                },
                b
              )
          ),
        }),
        s.jsxs("div", {
          className: "code-box-container",
          children: [
            s.jsx("button", {
              className: `code-copy-floating ${i ? "copied" : ""}`,
              onClick: w,
              children: i
                ? o === "ai"
                  ? e.workbench.code.promptSeamCopiedBtn
                  : e.workbench.code.copiedBtn
                : o === "ai"
                  ? e.workbench.code.copyPromptSeamBtn
                  : e.workbench.code.copyBtn,
            }),
            s.jsx("pre", {
              className: "code-pre",
              children: s.jsx("code", { children: m() }),
            }),
          ],
        }),
      ],
    });
  },
  Ld = ({
    t: e,
    locale: t,
    config: n,
    themeName: r,
    customTheme: o,
    onSelectVariant: a,
    onChangePosition: i,
    onChangeTheme: l,
    onUpdateConfig: u,
    onUpdateCustomColor: c,
    onResetCustomColors: h,
    onToggleAutoTrigger: p,
    onToggleCountdown: m,
  }) => {
    const w = n.variant || "lanterns",
      b = n.position || "top",
      S = n.opacity ?? 0.85,
      z = n.layer || "foreground",
      f = n.shadows || "soft",
      d = n.confetti === "off" ? "off" : "on",
      g = n.autoTrigger ?? !0,
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
                s.jsx(zd, { t: e, activeVariant: w, onSelectVariant: a }),
                s.jsx(Md, {
                  t: e,
                  variant: w,
                  position: b,
                  onChangePosition: i,
                  themeName: r,
                  onChangeTheme: l,
                  opacity: S,
                  onChangeOpacity: (k) => u({ opacity: k }),
                  layer: z,
                  onChangeLayer: (k) => u({ layer: k }),
                  shadows: f,
                  onChangeShadows: (k) => u({ shadows: k }),
                  confetti: d,
                  onChangeConfetti: (k) => u({ confetti: k }),
                  autoTrigger: g,
                  onToggleAutoTrigger: p,
                  countdownEnabled: x,
                  onToggleCountdown: m,
                  attachTo: n.attachTo,
                  onChangeAttachTo: (k) => u({ attachTo: k }),
                  attachEdge: n.attachEdge,
                  onChangeAttachEdge: (k) => u({ attachEdge: k }),
                  mobileSideBehavior: n.mobileSideBehavior,
                  onChangeMobileSideBehavior: (k) =>
                    u({ mobileSideBehavior: k }),
                }),
                r === "custom" &&
                  s.jsx(jd, {
                    customTheme: o,
                    onChangeColor: c,
                    onReset: h,
                    translations: e.workbench.colors,
                  }),
                s.jsx(Nd, { t: e, config: n, onUpdateConfig: u }),
              ],
            }),
            s.jsx("div", {
              className: "code-column",
              children: s.jsx(Ad, { t: e, locale: t, config: n, themeName: r }),
            }),
          ],
        }),
      ],
    });
  },
  Pd = ({ t: e, overlayInstance: t }) => {
    const [n, r] = X.useState(!0),
      o = t == null ? void 0 : t.countdown,
      a = () => (o == null ? void 0 : o.show()),
      i = () => (o == null ? void 0 : o.dismiss()),
      l = () => {
        var p;
        return (p = o == null ? void 0 : o.minimize) == null
          ? void 0
          : p.call(o);
      },
      u = () => {
        var p;
        return (p = o == null ? void 0 : o.expand) == null ? void 0 : p.call(o);
      },
      c = () => {
        if (o) {
          const p = o.toggleMute();
          r(p);
        }
      },
      h = () => {
        var p;
        (p = o == null ? void 0 : o.playAlert) == null || p.call(o);
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
              onClick: a,
              children: [
                s.jsx("span", { children: "👁️" }),
                s.jsx("span", { children: e.lab.btnShow }),
              ],
            }),
            s.jsxs("button", {
              className: "lab-btn",
              onClick: i,
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
              onClick: h,
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
  Id = ({ t: e }) => {
    const [t, n] = X.useState([
        {
          id: "init",
          time: new Date().toISOString().slice(11, 19),
          msg: "Diagnostic logging engine initialized. Ready for resilience tests.",
          color: "#7ee787",
        },
      ]),
      [r, o] = X.useState(!1),
      a = X.useRef(null),
      i = (w, b = "#7ee787") => {
        const S = new Date().toISOString().slice(11, 19),
          z = `${Date.now()}-${Math.random()}`;
        n((f) => [...f, { id: z, time: S, msg: w, color: b }]);
      };
    (X.useEffect(() => {
      a.current && (a.current.scrollTop = a.current.scrollHeight);
    }, [t]),
      X.useEffect(() => {
        const w = console.warn,
          b = console.error;
        return (
          (console.warn = (...S) => {
            w.apply(console, S);
            const z = S.map((f) =>
              typeof f == "object" ? JSON.stringify(f) : String(f)
            ).join(" ");
            z.includes("[ramadan-overlay]") && i(z, "#e3b341");
          }),
          (console.error = (...S) => {
            b.apply(console, S);
            const z = S.map((f) =>
              typeof f == "object" ? JSON.stringify(f) : String(f)
            ).join(" ");
            z.includes("[ramadan-overlay]") && i(z, "#f85149");
          }),
          () => {
            ((console.warn = w), (console.error = b));
          }
        );
      }, []));
    const l = () => {
        i("Testing defensive config clamping...", "#e3b341");
        try {
          const w = uo({
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
            w.destroy());
        } catch (w) {
          i(`❌ Clamping failed: ${w}`, "#f85149");
        }
      },
      u = () => {
        i("Testing invalid Date input resilience...", "#e3b341");
        try {
          const w = bn(new Date(NaN), 0, !0),
            b = bn(null, 0, !0);
          (i(
            `✅ Result: getRamadanState(NaN) -> occasion: '${w.occasion}', isRamadan: ${w.isRamadan}`,
            "#7ee787"
          ),
            i(
              `✅ Result: getRamadanState(null) -> occasion: '${b.occasion}', isRamadan: ${b.isRamadan}`,
              "#7ee787"
            ));
        } catch (w) {
          i(`❌ Date test failed: ${w}`, "#f85149");
        }
      },
      c = () => {
        i(
          "Testing Error Containment Boundary & Atomic DOM Rollback...",
          "#e3b341"
        );
        const w = document.createElement;
        let b = 0;
        document.createElement = function (S) {
          if (S.toLowerCase() === "style" && ++b === 1)
            throw new Error(
              "Simulated catastrophic CSS stylesheet mounting crash"
            );
          return w.call(document, S);
        };
        try {
          const S = uo({
            previewMode: !0,
            debug: !0,
            onError: (z) => {
              const f =
                z && typeof z == "object" && "message" in z
                  ? z.message
                  : String(z);
              i(`onError hook captured crash: ${f}`, "#f85149");
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
          document.createElement = w;
        }
      },
      h = () => {
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
        } catch (w) {
          i(`❌ onError escaped boundary: ${w}`, "#f85149");
        }
      },
      p = () => {
        const w = !r;
        (o(w),
          i(
            `Debug mode toggled: ${w ? "ON" : "OFF"}`,
            w ? "#7ee787" : "#8b8f98"
          ));
      },
      m = () => n([]);
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
              onClick: m,
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
              onClick: h,
              children: [
                s.jsx("span", { children: "📡" }),
                s.jsx("span", { children: e.lab.btnOnError }),
              ],
            }),
            s.jsxs("button", {
              className: "lab-btn",
              onClick: p,
              children: [
                s.jsx("span", { children: "🔍" }),
                s.jsx("span", { children: r ? e.lab.debugOn : e.lab.debugOff }),
              ],
            }),
          ],
        }),
        s.jsx("div", {
          className: "lab-terminal",
          ref: a,
          children: t.map((w) =>
            s.jsxs(
              "div",
              {
                className: "lab-terminal-line",
                style: { color: w.color },
                children: ["[", w.time, "] ", w.msg],
              },
              w.id
            )
          ),
        }),
      ],
    });
  },
  _d = ({ t: e, overlayInstance: t }) => {
    const [n, r] = X.useState(!1);
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
              s.jsx(Pd, { t: e, overlayInstance: t }),
              s.jsx(Id, { t: e }),
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
  G1 = {
    colors: ["#c9a84c", "#e5c158", "#9a7b2c", "#f3e5ab", "#1b3b2b", "#0f172a"],
    glowColor: "rgba(201,168,76,0.55)",
    ceilingColor: "#c9a84c",
    ropeColor: "#c9a84c",
    bannerBg: "rgba(15,15,20,0.92)",
    bannerTextColor: "#f1f5f9",
    bannerIconColor: "#c9a84c",
  },
  Rd = () => {
    const [e, t] = X.useState(vd),
      n = e === "ar" ? md : hd,
      [r, o] = X.useState(!0),
      [a, i] = X.useState("classic"),
      [l, u] = X.useState("ramadan"),
      [c, h] = X.useState(!1),
      [p, m] = X.useState(null),
      [w, b] = X.useState(G1),
      [S, z] = X.useState({
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
    (X.useEffect(() => {
      (pc(e), gd(e));
    }, [e]),
      X.useEffect(() => {
        try {
          const N = window.location.hash.replace(/^#/, "");
          if (N) {
            const A = new URLSearchParams(N),
              W = A.get("variant"),
              G = A.get("theme"),
              le = A.get("position"),
              M = A.get("occasion");
            (W &&
              z((V) => Gn({ ...V, variant: W, position: le || V.position }, W)),
              G && i(G),
              M && u(M));
          }
        } catch {}
      }, []),
      X.useEffect(() => {
        try {
          const N = new URLSearchParams();
          (S.variant && N.set("variant", S.variant),
            a && N.set("theme", a),
            S.position && N.set("position", S.position),
            N.set("occasion", l),
            N.set("lang", e),
            window.history.replaceState(null, "", `#${N.toString()}`));
        } catch {}
      }, [S.variant, S.position, a, l, e]));
    const f = r
        ? { ...S, theme: a === "custom" ? w : a, previewMode: !0 }
        : { autoTrigger: !1, previewMode: !1 },
      d = () => {
        t((N) => (N === "ar" ? "en" : "ar"));
      },
      g = () => {
        o((N) => !N);
      },
      x = () => {
        var N;
        if ((N = p == null ? void 0 : p.countdown) != null && N.playAlert)
          p.countdown.playAlert();
        else
          try {
            const A = window.AudioContext || window.webkitAudioContext;
            if (A) {
              const W = new A(),
                G = W.createOscillator(),
                le = W.createGain();
              ((G.type = "sine"),
                G.frequency.setValueAtTime(587.33, W.currentTime),
                G.frequency.exponentialRampToValueAtTime(
                  880,
                  W.currentTime + 0.8
                ),
                le.gain.setValueAtTime(0.3, W.currentTime),
                le.gain.exponentialRampToValueAtTime(
                  0.001,
                  W.currentTime + 1.2
                ),
                G.connect(le),
                le.connect(W.destination),
                G.start(),
                G.stop(W.currentTime + 1.2));
            }
          } catch {}
      },
      k = () => {
        p != null && p.fireConfetti && p.fireConfetti(l);
      },
      T = (N) => {
        z((A) => Gn(A, N));
      },
      E = (N) => {
        z((A) => ({ ...A, position: N }));
      },
      C = (N) => {
        i(N);
      },
      _ = (N) => {
        z((A) => ({ ...A, ...N }));
      },
      L = (N, A) => {
        b((W) => {
          const G = W.colors
            ? [...W.colors]
            : [
                "#c9a84c",
                "#e5c158",
                "#9a7b2c",
                "#f3e5ab",
                "#1b3b2b",
                "#0f172a",
              ];
          return N === "primaryColor"
            ? ((G[0] = A), { ...W, colors: G })
            : N === "accentColor"
              ? ((G[3] = A), { ...W, colors: G })
              : { ...W, [N]: A };
        });
      },
      R = () => {
        b(G1);
      },
      P = (N) => {
        (u(N),
          z(
            N === "eid-fitr"
              ? (A) =>
                  Gn(
                    {
                      ...A,
                      bannerTextAr: "عِيد فِطْر مُبَارَك",
                      bannerTextEn: "Eid Al-Fitr Mubarak",
                    },
                    "eid-fitr"
                  )
              : N === "eid-adha"
                ? (A) =>
                    Gn(
                      {
                        ...A,
                        bannerTextAr: "عِيد أَضْحَى مُبَارَك",
                        bannerTextEn: "Eid Al-Adha Mubarak",
                      },
                      "eid-adha"
                    )
                : (A) =>
                    Gn(
                      {
                        ...A,
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
        s.jsx(Sd, {
          t: n,
          locale: e,
          onToggleLocale: d,
          occasion: l,
          onChangeOccasion: P,
          overlayOn: r,
          onToggleOverlay: g,
          onPlayChime: x,
          onFireConfetti: k,
          onToggleDrawer: () => h((N) => !N),
        }),
        r && s.jsx(pd, { config: f, onInstance: m }),
        s.jsxs("main", {
          children: [
            s.jsx(bd, {
              t: n,
              locale: e,
              occasion: l,
              onFireConfetti: k,
              onScrollToWorkbench: () => {
                var N;
                (N = document.getElementById("workbench")) == null ||
                  N.scrollIntoView({ behavior: "smooth" });
              },
              onScrollToLab: () => {
                var N;
                (N = document.getElementById("lab")) == null ||
                  N.scrollIntoView({ behavior: "smooth" });
              },
            }),
            s.jsx(Ld, {
              t: n,
              locale: e,
              config: S,
              themeName: a,
              customTheme: w,
              onSelectVariant: T,
              onChangePosition: E,
              onChangeTheme: C,
              onUpdateConfig: _,
              onUpdateCustomColor: L,
              onResetCustomColors: R,
              onToggleAutoTrigger: () =>
                z((N) => ({ ...N, autoTrigger: !N.autoTrigger })),
              onToggleCountdown: () =>
                z((N) => ({ ...N, countdown: !N.countdown })),
            }),
            s.jsx(_d, { t: n, overlayInstance: p }),
          ],
        }),
        s.jsx(Dd, { t: n }),
      ],
    });
  },
  Q1 = document.getElementById("root");
Q1 &&
  Ma.createRoot(Q1).render(s.jsx(Ta.StrictMode, { children: s.jsx(Rd, {}) }));
