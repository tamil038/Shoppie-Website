# 🛍️ Shoppie — Front-End E-Commerce Website

Shoppie is a static, front-end-only e-commerce website built with plain **HTML, CSS, and vanilla JavaScript**. It simulates a full shopping experience — login/signup, product browsing, cart management, checkout, and order tracking — using the browser's **localStorage** as the data layer (no backend/database required).

## 🚀 Live Demo / Preview

Since this is a static site, it can be opened directly in a browser or hosted for free on **GitHub Pages** (instructions below).

---

## 📁 Project Structure

```
shoppie website/
├── index.html            # Login / Signup page (entry point)
├── home.html              # Landing page with hero banner + featured products
├── products.html          # Full product catalog
├── cart.html               # Shopping cart (view/update/remove items)
├── checkout.html          # Checkout form + order placement
├── order-complete.html    # Order confirmation page
├── orders.html            # Order history + simulated tracking
├── profile.html           # User profile (name, email, address)
├── about.html              # About us page
├── contact.html            # Contact form
├── css/
│   └── style.css          # Global styling (theme, layout, components)
├── js/
│   └── common.js           # Shared cart logic used across all pages
└── img/                     # Product images
```

---

## 🔄 How the Website Works (Workflow)

### 1. Login / Signup (`index.html`)
- The entry point of the site. Presents a **Login** and **Sign Up** tab (pure UI toggle, no real authentication).
- Submitting either form calls `enterSite()`, which simply redirects to `home.html`.
- ⚠️ There is no backend validation — any input takes the user into the site.

### 2. Home Page (`home.html`)
- Displays a hero banner, shop-by-category cards, and a **Featured Products** section.
- Featured products are hardcoded in a JS array and rendered dynamically into the page.
- Each product card has an **Add to Cart** button that calls `addItemToCart()` from `common.js`.

### 3. Products Page (`products.html`)
- Displays the **entire product catalog** (9 items) as cards with image, name, price, and an Add to Cart button.
- Same cart logic as the home page — data comes from a hardcoded JS array (no API).

### 4. Cart Logic (`js/common.js`)
This file is the shared "engine" powering the shopping cart across every page:

| Function | Purpose |
|---|---|
| `getCart()` | Reads the cart array from `localStorage` |
| `setCart(cart)` | Saves the cart array back to `localStorage` |
| `getCartCount()` | Totals up quantities for the cart badge |
| `updateCartBadge()` | Updates the 🛒 icon's item-count badge in the navbar |
| `addItemToCart(product)` | Adds a product or increments its quantity |
| `changeQty(id, delta)` | Increases/decreases quantity, or removes item at 0 |
| `clearCart()` | Empties the cart (called after an order is placed) |

The cart persists in the browser via `localStorage.cart`, so it survives page reloads and navigation.

### 5. Cart Page (`cart.html`)
- Lists all items currently in the cart with quantity +/− controls and a Remove button.
- Shows a running subtotal and a **Proceed to Checkout** button.

### 6. Checkout Page (`checkout.html`)
- Collects customer details (name, phone, address, city, state, zip) and a payment method (COD / Card / UPI).
- On **Place Order**:
  1. Builds an `order` object (id = timestamp, items, customer info, payment method, total, date).
  2. Saves it into `localStorage.orders` (array of past orders).
  3. Clears the cart (`clearCart()`).
  4. Redirects to `order-complete.html?id=<orderId>`.

### 7. Order Confirmation (`order-complete.html`)
- Reads the `id` from the URL query string and displays a success message with the Order ID.

### 8. My Orders (`orders.html`)
- Reads `localStorage.orders` and lists all past orders (most recent first), including items, total, and payment method.
- **Track Order** button runs a simulated status animation (`Processing → Packed → Shipped → Out for Delivery → Delivered`) via sequential `alert()` popups — purely cosmetic, no real tracking.

### 9. Profile Page (`profile.html`)
- Lets the user save a name/email/address into `localStorage.profile`.
- Also displays their 3 most recent orders.

### 10. About & Contact Pages
- `about.html` — static company description.
- `contact.html` — a message form that just shows a confirmation alert (no email is actually sent — front-end only).

---

## 🧠 Data Flow Summary

```
index.html (login) 
      │
      ▼
  home.html ──► products.html ──► [Add to Cart] ──► localStorage.cart
      │                                                      │
      ▼                                                      ▼
  cart.html  ◄───────────────────────────────────────  updates via common.js
      │
      ▼
 checkout.html ──► [Place Order] ──► localStorage.orders (+ clears cart)
      │
      ▼
 order-complete.html ──► orders.html (order history) / profile.html
```

All "persistence" (cart, orders, profile) lives in the browser's `localStorage` — there is **no server, database, or real authentication**. This makes the site 100% static and deployable anywhere that serves plain HTML/CSS/JS (like GitHub Pages).

---

## 🛠️ Tech Stack

- **HTML5** — page structure
- **CSS3** — custom properties (`:root` theme variables), flexbox/grid layout, responsive design
- **Vanilla JavaScript (ES6)** — DOM manipulation, `localStorage` for cart/orders/profile persistence
- No frameworks, build tools, or dependencies — runs directly in any browser

---

## ▶️ Running Locally

1. Download or clone this repository.
2. Open `index.html` directly in your browser, **or** serve it with a simple local server for best results:
   ```bash
   # Python 3
   python -m http.server 8000
   ```
   Then visit `http://localhost:8000`.

---

## 🌐 Deploying with GitHub Pages

1. Push this project to a GitHub repository (see step-by-step guide below).
2. In the repo, go to **Settings → Pages**.
3. Under **Source**, select the `main` branch and `/ (root)` folder, then **Save**.
4. GitHub will publish the site at:
   `https://<your-username>.github.io/<repo-name>/index.html`

---

## ⚠️ Known Limitations

- Login/Signup do not validate or store credentials — anyone can "log in."
- Product data is hardcoded in JS (not fetched from an API/database).
- Order tracking is a simulated animation, not real-time tracking.
- Contact form does not send actual emails.
- Cart/orders/profile data is stored per-browser (`localStorage`) — not shared across devices.

## 💡 Possible Future Enhancements

- Real authentication (Firebase/Auth0) and a backend (Node/Express, Spring Boot, etc.)
- Product data served from a database/API instead of hardcoded arrays
- Payment gateway integration
- Order tracking backed by real order-status updates
- Search & filter functionality on the Products page

---

## 📄 License

This project is open-source and free to use for learning purposes.
