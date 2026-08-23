import UIGlassButton from '../UIGlassButton';
import './UIGlassIconButton.css';

// Icon-only buttons are circular: iconSize + both paddings is the diameter, so radius is half of that
const ICON_ONLY_PADDING = 13;

function UIGlassIconButton({
    icon,
    alt = 'Icon',
    iconSize = 24,
    children,
    className = '',
    glass,
    ...props
}) {
    const iconOnly = !children;
    const shapeGlass = iconOnly
        ? {
              padding: `${ICON_ONLY_PADDING}px`,
              borderRadius: (iconSize + ICON_ONLY_PADDING * 2) / 2,
          }
        : null;

    return (
        <UIGlassButton
            className={`ui-glass-icon-button ${iconOnly ? 'icon-only' : ''} ${className}`}
            glass={{ ...shapeGlass, ...glass }}
            aria-label={iconOnly ? alt : undefined}
            {...props}
        >
            {icon && (
                <img
                    src={icon}
                    alt={iconOnly ? '' : alt}
                    className="ui-glass-icon-button-icon"
                    style={{ width: iconSize, height: iconSize }}
                />
            )}
            {children && <span className="ui-glass-icon-button-text">{children}</span>}
        </UIGlassButton>
    );
}

export default UIGlassIconButton;
