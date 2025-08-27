# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Build all distribution formats
npm run build

# Development server with hot reload at http://localhost:3000
npm run dev
npm run serve  # alias for dev

# Code quality
npm run lint
npm run format

# Publishing
npm run prepublishOnly  # automatically runs build before publish
```

## Architecture Overview

This is a Web Component library for e-commerce quantity controls, built as a Custom Element that extends HTMLElement.

### Core Structure
- **Single source file**: `src/quantity-modifier.js` - The entire component implementation
- **Multiple build targets**: ESM, CommonJS, UMD, and minified UMD via Rollup
- **Framework agnostic**: Works with React, Vue, vanilla JS, etc.

### Web Component Implementation
- Uses Custom Elements API with `customElements.define('quantity-modifier', QuantityModifier)`
- Observed attributes: `min`, `max`, `value` trigger `attributeChangedCallback`
- Global style injection (once per page) to hide number input spinners using private static field `#stylesInjected`
- Event-driven architecture: dispatches `quantity-modifier:change` events with `{ value }` detail

### Key Behaviors
- **Smart rendering**: Checks for existing DOM elements before re-rendering innerHTML
- **Input clamping**: Automatically constrains values between min/max bounds
- **Memory management**: Properly removes event listeners in `disconnectedCallback`
- **Accessibility**: Uses proper ARIA labels and semantic HTML

### Build System
Rollup configuration generates:
- `dist/quantity-modifier.esm.js` - ES modules
- `dist/quantity-modifier.cjs.js` - CommonJS
- `dist/quantity-modifier.js` - UMD
- `dist/quantity-modifier.min.js` - Minified UMD
- Development mode copies built files to `demo/` directory

### Demo & Testing
- Live demo at `demo/index.html` showcases various configurations
- Event logging demonstrates the custom event system
- Multiple instances test component isolation

## Publishing Notes
- Package exports both named (`QuantityModifier`) and default exports
- Uses `sideEffects: true` due to custom element registration
- Files array includes both `src/` and `dist/` directories
- NPM registry: `@magic-spells/quantity-modifier`