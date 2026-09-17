import React from "react";
import type { Translations } from "../translations/types";

interface FooterProps {
  t: Translations;
}

export const Footer: React.FC<FooterProps> = ({ t }) => {
  return (
    <footer className="celestial-footer">
      <div className="footer-links">
        <a
          href="https://github.com/3mr-5aled/ramadan-overlay"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          GitHub
        </a>
        <span>•</span>
        <a
          href="https://www.npmjs.com/package/ramadan-overlay"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          NPM Package
        </a>
        <span>•</span>
        <a
          href="https://github.com/3mr-5aled/ramadan-overlay/blob/main/LICENSE"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          {t.footer.license}
        </a>
      </div>
      <p style={{ marginTop: "8px" }}>
        🌙 {t.footer.copy} {t.footer.builtWith}
      </p>
    </footer>
  );
};
