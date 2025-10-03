import type { JSX } from "react";

export const App = (): JSX.Element => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "sans-serif",
        background: "linear-gradient(135deg, #e0f7fa, #fff3e0)",
        color: "#333",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
        🌿 Fresh code, fresh air 💫
      </h1>
      <p style={{ maxWidth: "650px", fontSize: "1.2rem", lineHeight: "1.6" }}>
        «Кожен рядок — мов крок до світла.» 🇺🇦
        <br />
        «Elke gedachte kan een brug zijn.» 🇳🇱
        <br />
        «هر خط کد، پنجره‌ای به فرداست.» 🇮🇷
        <br />
        «Chaque projet commence par une étincelle.» 🇫🇷
        <br />
        «Jeder Anfang trägt Musik in sich.» 🇩🇪
        <br />
        «Cada idea es un viaje.» 🇪🇸
        <br />
        «Every dream deserves a syntax.» 🇬🇧
        <br />
        «Små ord kan bære store drømme.» 🇩🇰
      </p>
      <p style={{ marginTop: "2rem", fontStyle: "italic", fontSize: "1rem" }}>
        // alles op gevoel 💫 — joyful coding for everyone!
      </p>
    </div>
  );
};
