const getContrastTextColor = (hue: number, saturation: number, lightness: number) => {
    // تحويل HSL إلى RGB
    const h = hue / 360;
    const s = saturation / 100;
    const l = lightness / 100;

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    const hueToRgb = (t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    };

    const r = hueToRgb(h + 1 / 3);
    const g = hueToRgb(h);
    const b = hueToRgb(h - 1 / 3);

    // حساب **Relative Luminance** باستخدام معادلة W3C
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    // إذا كانت الإضاءة أعلى من 0.5، استخدم لون داكن، وإلا استخدم الأبيض
    return luminance > 0.5 ? "#2b3035" : "#fff";
};

export default getContrastTextColor;