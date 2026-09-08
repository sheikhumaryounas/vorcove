// Reusable logo lockup: the V mark + "Vorcove".
// inverted=true flips it white for dark backgrounds (footer).
export default function Logo({ inverted = false, size = 30 }) {
  return (
    <span className="logo">
      <img
        src="/assets/v-mark.png"
        alt="Vorcove"
        style={{
          height: size,
          width: "auto",
          filter: inverted ? "brightness(0) invert(1)" : "none",
        }}
      />
      <span className={`logo-word ${inverted ? "on-dark" : ""}`}>Vorcove</span>
    </span>
  );
}
