# Icon Component

This directory contains the `Icon` component which is used to integrate SVG icons into the application.

## Usage

To use an icon, specify the `iconName` which corresponds to the name of the SVG file in the `@/svg/` directory.

Example usage:

```jsx
import Icon from "@/components/Icon";

const MyComponent = () => (
  <div>
    <Icon iconName="CheckMarkIcon" />
  </div>
);
```

## Adding New Icons

To add a new icon:

1. Place the optimized SVG file in the @/svg/ directory.
2. Import the SVG in the Icon component file and add it to the iconRegistry.

```
// src/components/Icon/Icon.js
import NewIcon from '@/svg/NewIcon.svg';

const iconRegistry = {
  // ... existing icons
  NewIcon,
};
```

## Accessibility

Ensure that icons used for conveying information are accompanied by a descriptive title and `isDecorative` is set to false. For purely decorative icons, you can omit the title prop or set `isDecorative` to true.
