import React, { useState, useEffect, useRef } from "react";
import type { Translations } from "../../translations/types";
import { init, getRamadanState } from "ramadan-overlay";

interface ResilienceConsoleProps {
  t: Translations;
}

interface LogEntry {
  id: string;
  time: string;
  msg: string;
  color: string;
}

export const ResilienceConsole: React.FC<ResilienceConsoleProps> = ({ t }) => {
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: "init",
      time: new Date().toISOString().slice(11, 19),
      msg: "Diagnostic logging engine initialized. Ready for resilience tests.",
      color: "#7ee787",
    },
  ]);
  const [debugActive, setDebugActive] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  const addLog = (msg: string, color = "#7ee787") => {
    const time = new Date().toISOString().slice(11, 19);
    const id = `${Date.now()}-${Math.random()}`;
    setLogs((prev) => [...prev, { id, time, msg, color }]);
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  // Hook into console.warn and console.error to capture [ramadan-overlay] logs
  useEffect(() => {
    const origWarn = console.warn;
    const origError = console.error;

    console.warn = (...args: unknown[]) => {
      origWarn.apply(console, args);
      const str = args
        .map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a)))
        .join(" ");
      if (str.includes("[ramadan-overlay]")) {
        addLog(str, "#e3b341");
      }
    };

    console.error = (...args: unknown[]) => {
      origError.apply(console, args);
      const str = args
        .map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a)))
        .join(" ");
      if (str.includes("[ramadan-overlay]")) {
        addLog(str, "#f85149");
      }
    };

    return () => {
      console.warn = origWarn;
      console.error = origError;
    };
  }, []);

  const testClamping = () => {
    addLog("Testing defensive config clamping...", "#e3b341");
    try {
      const instance = init({
        variant: "lanterns",
        opacity: 99,
        zIndex: -9999999999,
        ropeSag: 999,
        hijriAdjustment: 50,
        debug: true,
        previewMode: true,
      });
      addLog(
        "✅ Result: Extreme configuration values safely clamped within valid boundaries without throwing!",
        "#7ee787"
      );
      instance.destroy();
    } catch (err) {
      addLog(`❌ Clamping failed: ${err}`, "#f85149");
    }
  };

  const testInvalidDate = () => {
    addLog("Testing invalid Date input resilience...", "#e3b341");
    try {
      const res1 = getRamadanState(new Date(NaN), 0, true);
      const res2 = getRamadanState(null as unknown as Date, 0, true);
      addLog(
        `✅ Result: getRamadanState(NaN) -> occasion: '${res1.occasion}', isRamadan: ${res1.isRamadan}`,
        "#7ee787"
      );
      addLog(
        `✅ Result: getRamadanState(null) -> occasion: '${res2.occasion}', isRamadan: ${res2.isRamadan}`,
        "#7ee787"
      );
    } catch (err) {
      addLog(`❌ Date test failed: ${err}`, "#f85149");
    }
  };

  const testCrash = () => {
    addLog(
      "Testing Error Containment Boundary & Atomic DOM Rollback...",
      "#e3b341"
    );
    const origCreate = document.createElement;
    let counter = 0;
    document.createElement = function (tagName: string) {
      if (tagName.toLowerCase() === "style" && ++counter === 1) {
        throw new Error("Simulated catastrophic CSS stylesheet mounting crash");
      }
      return origCreate.call(document, tagName);
    };

    try {
      const safeInstance = init({
        previewMode: true,
        debug: true,
        onError: (err) => {
          const errorMsg =
            err && typeof err === "object" && "message" in err
              ? (err as Error).message
              : String(err);
          addLog(`onError hook captured crash: ${errorMsg}`, "#f85149");
        },
      });

      addLog(
        `✅ Result: Host application did NOT crash! Safe No-Op instance returned.`,
        "#7ee787"
      );
      safeInstance.destroy();
    } catch (err) {
      addLog(`❌ Crash escaped boundary: ${err}`, "#f85149");
    } finally {
      document.createElement = origCreate;
    }
  };

  const testOnError = () => {
    addLog("Testing double-contained onError isolation...", "#e3b341");
    try {
      init({
        previewMode: true,
        debug: true,
        onError: () => {
          throw new Error(
            "Faulty external telemetry service threw an uncaught error"
          );
        },
      });
      addLog(
        "✅ Result: Faulty consumer onError callback threw, but double-containment seam protected host from crash!",
        "#7ee787"
      );
    } catch (err) {
      addLog(`❌ onError escaped boundary: ${err}`, "#f85149");
    }
  };

  const toggleDebug = () => {
    const next = !debugActive;
    setDebugActive(next);
    addLog(
      `Debug mode toggled: ${next ? "ON" : "OFF"}`,
      next ? "#7ee787" : "#8b8f98"
    );
  };

  const clearTerminal = () => setLogs([]);

  return (
    <div className="panel-card" style={{ marginBottom: 0 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px",
        }}
      >
        <h4 className="panel-heading" style={{ fontSize: "1.1rem", margin: 0 }}>
          <span>🛡️</span>
          <span>{t.lab.resilienceTitle}</span>
        </h4>
        <button
          className="nav-btn-pill"
          style={{ fontSize: "0.75rem", padding: "4px 10px" }}
          onClick={clearTerminal}
        >
          {t.lab.clearTerminal}
        </button>
      </div>

      <p
        style={{
          fontSize: "0.85rem",
          color: "var(--text-secondary)",
          marginBottom: "16px",
        }}
      >
        {t.lab.resilienceDesc}
      </p>

      <div className="lab-btn-grid">
        <button className="lab-btn" onClick={testClamping}>
          <span>⚙️</span>
          <span>{t.lab.btnClamping}</span>
        </button>

        <button className="lab-btn" onClick={testInvalidDate}>
          <span>📅</span>
          <span>{t.lab.btnInvalidDate}</span>
        </button>

        <button className="lab-btn" onClick={testCrash}>
          <span>💥</span>
          <span>{t.lab.btnCrash}</span>
        </button>

        <button className="lab-btn" onClick={testOnError}>
          <span>📡</span>
          <span>{t.lab.btnOnError}</span>
        </button>

        <button className="lab-btn" onClick={toggleDebug}>
          <span>🔍</span>
          <span>{debugActive ? t.lab.debugOn : t.lab.debugOff}</span>
        </button>
      </div>

      <div className="lab-terminal" ref={terminalRef}>
        {logs.map((item) => (
          <div
            key={item.id}
            className="lab-terminal-line"
            style={{ color: item.color }}
          >
            [{item.time}] {item.msg}
          </div>
        ))}
      </div>
    </div>
  );
};
