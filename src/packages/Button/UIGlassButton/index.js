import { GlassButton } from 'react-glass-ui';
import './UIGlassButton.css';

// Capsule geometry: 22px line-height + 13px vertical padding = 48px tall, so radius 24 is a full pill
const glassDefaults = {
    blur: 2,
    distortion: 40,
    saturation: 140,
    brightness: 108,
    borderRadius: 24,
    // The gradient outline is supplied in CSS so every glass control matches
    // the profile card. Keep the library border disabled to avoid a white ring.
    borderSize: 0,
    borderColor: '#8b7dff',
    borderOpacity: 0,
    backgroundColor: '#8b7dff',
    backgroundOpacity: 0.08,
    innerLightBlur: 10,
    innerLightSpread: 1,
    innerLightColor: '#a5b4fc',
    innerLightOpacity: 0.24,
    outerLightBlur: 16,
    outerLightSpread: 0,
    outerLightColor: '#7c5cff',
    outerLightOpacity: 0.14,
    flexibility: 10,
    onHoverScale: 1.02,
    padding: '13px 24px',
    contentCenter: true,
    itemsCenter: true,
    // The library defaults the glass container to width 100%; 'auto' lets it hug the label
    width: 'auto',
    color: '#fff',
};

function UIGlassButton({ children, className = '', onClick, disabled = false, glass, ...props }) {
    return (
        <button
            type="button"
            className={`ui-glass-button ${className}`}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            <GlassButton {...glassDefaults} {...glass}>
                {children}
            </GlassButton>
        </button>
    );
}

export default UIGlassButton;
