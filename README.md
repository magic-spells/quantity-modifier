# Quantity Modifier Web Component

A professional, highly-customizable Web Component for creating intuitive quantity modification controls in e-commerce applications. Features increment/decrement buttons with an input field, perfect for shopping carts, product quantities, and any numeric input scenarios.

[**Live Demo**](https://magic-spells.github.io/quantity-modifier/demo/)

## Features

- ⚡ **Intuitive controls** - Plus/minus buttons with numeric input
- 🎛️ **Configurable constraints** - Set min/max values and default quantities
- 📡 **Event-driven architecture** - Clean separation between UI and logic
- 🔧 **Zero dependencies** - Pure Web Components
- ⚡ **Lightweight and performant** - Minimal footprint, maximum performance
- 📱 **Framework agnostic** - Pure Web Components work with any framework
- 🛒 **Shopify-ready** - Designed for real-world e-commerce applications
- ♿ **Accessible** - Proper ARIA labels and keyboard navigation

## Installation

```bash
npm install @magic-spells/quantity-modifier
```

```javascript
// Import the component
import '@magic-spells/quantity-modifier';
```

Or include directly in your HTML:

```html
<script src="https://unpkg.com/@magic-spells/quantity-modifier"></script>
```

## Usage

```html
<!-- Basic usage -->
<quantity-modifier></quantity-modifier>

<!-- With custom min/max/value -->
<quantity-modifier min="1" max="10" value="5"></quantity-modifier>

<!-- Large inventory quantities -->
<quantity-modifier min="0" max="1000" value="100"></quantity-modifier>
```

## How It Works

The quantity modifier component provides three ways to modify quantities:

- **Decrement button**: Reduces quantity by 1 (respects min value)
- **Increment button**: Increases quantity by 1 (respects max value)
- **Direct input**: Users can type quantities directly (automatically clamped to min/max)

The component emits `quantity-modifier:change` events when the value changes, allowing parent components to react to quantity updates.

## Configuration

### Attributes

| Attribute | Description                    | Default | Required |
| --------- | ------------------------------ | ------- | -------- |
| `min`     | Minimum allowed quantity       | 1       | No       |
| `max`     | Maximum allowed quantity       | 99      | No       |
| `value`   | Initial/current quantity value | 1       | No       |

### Events

| Event Name                 | Description                        | Detail Properties |
| -------------------------- | ---------------------------------- | ----------------- |
| `quantity-modifier:change` | Triggered when quantity changes    | `{ value }`       |

Example:

```html
<!-- Custom configuration -->
<quantity-modifier min="5" max="50" value="10"></quantity-modifier>

<!-- Inventory with no minimum -->
<quantity-modifier min="0" max="999" value="0"></quantity-modifier>
```

## Customization

### Styling

The component provides complete styling control. Style the content elements however you like:

```css
/* Basic styling */
quantity-modifier {
  display: inline-flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
}

quantity-modifier button {
  background: #f8f9fa;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

quantity-modifier button:hover {
  background: #e9ecef;
}

quantity-modifier input {
  border: none;
  padding: 8px 12px;
  text-align: center;
  width: 60px;
  font-size: 14px;
}
```

### JavaScript API

#### Properties

- `min`: Get/set the minimum allowed value
- `max`: Get/set the maximum allowed value  
- `value`: Get/set the current quantity value

#### Events

The component emits custom events that bubble up for parent components to handle:

**`quantity-modifier:change`**
- Triggered when quantity value changes via buttons or direct input
- `event.detail`: `{ value }`

#### Programmatic Control

```javascript
const quantityModifier = document.querySelector('quantity-modifier');

// Set values programmatically
quantityModifier.value = 5;
quantityModifier.min = 1;
quantityModifier.max = 20;

// Get current values
console.log(quantityModifier.value); // 5
console.log(quantityModifier.min);   // 1
console.log(quantityModifier.max);   // 20

// Listen for changes
document.addEventListener('quantity-modifier:change', (e) => {
  console.log('Quantity changed to:', e.detail.value);
});
```

## Integration Examples

### Shopify Cart Integration

```javascript
// Example cart quantity management
class CartManager {
  constructor() {
    document.addEventListener('quantity-modifier:change', this.handleQuantityChange.bind(this));
  }
  
  async handleQuantityChange(e) {
    const newQuantity = e.detail.value;
    const cartItem = e.target.closest('[data-line-item-key]');
    const lineItemKey = cartItem.dataset.lineItemKey;
    
    try {
      // Update Shopify cart
      const response = await fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id: lineItemKey, 
          quantity: newQuantity 
        })
      });
      
      const cart = await response.json();
      this.updateCartDisplay(cart);
      
    } catch (error) {
      console.error('Failed to update cart:', error);
      // Optionally revert the quantity modifier to previous value
    }
  }
  
  updateCartDisplay(cart) {
    // Update cart totals, item counts, etc.
  }
}

new CartManager();
```

### HTML Structure for Shopify

```html
<div data-line-item-key="40123456789:abc123">
  <div class="product-info">
    <h4>Awesome T-Shirt</h4>
    <div class="price">$29.99</div>
  </div>
  
  <quantity-modifier 
    min="1" 
    max="10" 
    value="2">
  </quantity-modifier>
  
  <div class="line-total">$59.98</div>
</div>
```

### React Integration

```jsx
import '@magic-spells/quantity-modifier';

function ProductQuantity({ min = 1, max = 99, value = 1, onChange }) {
  const handleQuantityChange = (e) => {
    onChange(e.detail.value);
  };
  
  return (
    <quantity-modifier
      min={min}
      max={max}
      value={value}
      onQuantity-modifierChange={handleQuantityChange}
    />
  );
}
```

### Vue Integration

```vue
<template>
  <quantity-modifier
    :min="min"
    :max="max" 
    :value="quantity"
    @quantity-modifier:change="handleQuantityChange"
  />
</template>

<script>
import '@magic-spells/quantity-modifier';

export default {
  props: {
    min: { type: Number, default: 1 },
    max: { type: Number, default: 99 },
    quantity: { type: Number, default: 1 }
  },
  methods: {
    handleQuantityChange(e) {
      this.$emit('update:quantity', e.detail.value);
    }
  }
}
</script>
```

## Browser Support

- Chrome 54+
- Firefox 63+ 
- Safari 10.1+
- Edge 79+

All modern browsers with Web Components support.

## License

MIT