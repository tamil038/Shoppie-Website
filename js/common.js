
function getCart(){ try{ return JSON.parse(localStorage.getItem('cart')) || []; }catch(e){ return []; } }
function setCart(cart){ localStorage.setItem('cart', JSON.stringify(cart)); }
function getCartCount(){ const cart = getCart(); return cart.reduce((s,i)=>s+(i.qty||0),0); }
function updateCartBadge(){
  const badge = document.getElementById('cart-count-badge');
  if(!badge) return;
  const count = getCartCount();
  if(count>0){ badge.textContent = count; badge.style.display = 'flex'; }
  else { badge.style.display = 'none'; }
}
function addItemToCart(product){
  const cart = getCart();
  const existing = cart.find(i=>i.id===product.id);
  if(existing){ existing.qty += 1; } else { cart.push({...product, qty:1}); }
  setCart(cart); updateCartBadge();
}
function changeQty(id, delta){
  let cart = getCart();
  const item = cart.find(i=>i.id===id);
  if(!item) return;
  item.qty += delta;
  if(item.qty<=0){ cart = cart.filter(i=>i.id!==id); }
  setCart(cart); updateCartBadge();
}
function clearCart(){ localStorage.removeItem('cart'); updateCartBadge(); }
document.addEventListener('DOMContentLoaded', updateCartBadge);
