// Centralized Color Configuration
// Cart Corner — accent yellow as primary

export interface ColorPalette {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  primaryLight2: string;
  primaryLight3: string;
  primaryLight4: string;
  primaryLight5: string;
}

export const defaultColors: ColorPalette = {
  primary: "#FFD54F",
  primaryDark: "#F9A825",
  primaryLight: "#FFE082",
  primaryLight2: "#FFECB3",
  primaryLight3: "#FFF8E1",
  primaryLight4: "#FFFDE7",
  primaryLight5: "#FFFFF8",
};

export function generateColorPalette(baseColor: string): ColorPalette {
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
  };

  const lighten = (hex: string, percent: number) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;
    const amount = percent / 100;
    return rgbToHex(
      Math.min(255, Math.round(rgb.r + (255 - rgb.r) * amount)),
      Math.min(255, Math.round(rgb.g + (255 - rgb.g) * amount)),
      Math.min(255, Math.round(rgb.b + (255 - rgb.b) * amount))
    );
  };

  const darken = (hex: string, percent: number) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;
    const amount = percent / 100;
    return rgbToHex(
      Math.max(0, Math.round(rgb.r * (1 - amount))),
      Math.max(0, Math.round(rgb.g * (1 - amount))),
      Math.max(0, Math.round(rgb.b * (1 - amount)))
    );
  };

  return {
    primary: baseColor,
    primaryDark: darken(baseColor, 25),
    primaryLight: lighten(baseColor, 10),
    primaryLight2: lighten(baseColor, 25),
    primaryLight3: lighten(baseColor, 40),
    primaryLight4: lighten(baseColor, 50),
    primaryLight5: lighten(baseColor, 65),
  };
}

export const presetColors = [
  { name: "Amber", value: "#FFD54F" },
  { name: "Yellow", value: "#EAB308" },
  { name: "Orange", value: "#F97316" },
  { name: "Red", value: "#EF4444" },
  { name: "Pink", value: "#EC4899" },
  { name: "Purple", value: "#9333EA" },
  { name: "Blue", value: "#3C50E0" },
  { name: "Cyan", value: "#06B6D4" },
  { name: "Teal", value: "#14B8A6" },
  { name: "Green", value: "#22C55E" },
  { name: "Lime", value: "#84CC16" },
  { name: "Indigo", value: "#6366F1" },
  { name: "Violet", value: "#8B5CF6" },
  { name: "Sky", value: "#0EA5E9" },
  { name: "Emerald", value: "#10B981" },
];
