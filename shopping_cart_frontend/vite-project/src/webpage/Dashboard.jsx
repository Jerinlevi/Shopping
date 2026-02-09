import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "../api/api";

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState(null);
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("loading");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const loadData = async () => {
    setStatus("loading");
    try {
      const [itemsData, cartData, ordersData] = await Promise.all([
        apiFetch("/items"),
        apiFetch("/carts"),
        apiFetch("/orders")
      ]);
      setItems(Array.isArray(itemsData) ? itemsData : []);
      setCart(cartData || null);
      setOrders(Array.isArray(ordersData) ? ordersData : []);
      setStatus("ready");
    } catch (error) {
      setStatus("error");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const categories = useMemo(() => {
    const list = ["All"];
    items.forEach((item) => {
      if (item.category && !list.includes(item.category)) {
        list.push(item.category);
      }
    });
    return list;
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = item.title
        ?.toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory = category === "All" || item.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [items, search, category]);

  const cartItems = cart?.items || [];
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);

  const handleAddToCart = async (itemId) => {
    try {
      await apiFetch("/carts", {
        method: "POST",
        body: JSON.stringify({ itemId })
      });
      const cartData = await apiFetch("/carts");
      setCart(cartData || null);
    } catch (error) {
      alert("Could not add item to cart.");
    }
  };

  const handleCheckout = async () => {
    try {
      await apiFetch("/orders", { method: "POST" });
      await loadData();
    } catch (error) {
      alert("Checkout failed. Please try again.");
    }
  };

  return (
    <div className="page dashboard">
      <header className="dash-head">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1>Welcome back. Ready to stock up?</h1>
          <p className="muted">
            Browse the live catalog, build your cart, and ship in one flow.
          </p>
        </div>
        <button className="button ghost" onClick={loadData}>
          Refresh data
        </button>
      </header>

      <section className="dash-panel">
        <div className="panel-head">
          <h2>Catalog</h2>
          <div className="panel-actions">
            <input
              className="input"
              type="search"
              placeholder="Search products"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <select
              className="input"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {status === "loading" && <p className="muted">Loading catalog…</p>}
        {status === "error" && (
          <p className="muted">
            We could not load your dashboard data yet.
          </p>
        )}

        <div className="grid">
          {filteredItems.map((item) => (
            <article className="product-card" key={item._id}>
              <div className="product-media">
                <img
                  src={
                    item.image ||
                    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop"
                  }
                  alt={item.title}
                  loading="lazy"
                  // className="product-image"
                />
              </div>
              <div className="product-body">
                <div className="product-meta">
                  <span>{item.category || "Essentials"}</span>
                  <span>★ {item.rating || 4.7}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description || "Limited release, high demand."}</p>
                <div className="product-foot">
                  <span className="price">₹{item.price}</span>
                  <button
                    className="button primary small"
                    onClick={() => handleAddToCart(item._id)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="dash-split">
        <div className="panel">
          <div className="panel-head">
            <h2>Cart</h2>
            <span className="muted">{cartItems.length} items</span>
          </div>
          {cartItems.length === 0 && (
            <p className="muted">Your cart is empty.</p>
          )}
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item._id}>
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.category || "Essentials"}</span>
                </div>
                <span className="price">₹{item.price}</span>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <span>Total</span>
            <strong>{cartTotal.toFixed(2)}</strong>
          </div>
          <button
            className="button primary full"
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
          >
            Checkout & create order
          </button>
        </div>

        <div className="panel">
          <div className="panel-head">
            <h2>Orders</h2>
            <span className="muted">{orders.length} total</span>
          </div>
          {orders.length === 0 && (
            <p className="muted">No orders yet. Checkout to create one.</p>
          )}
          <ul className="order-list">
            {orders.map((order) => (
              <li key={order._id}>
                <div>
                  <strong>Order #{order._id.slice(-5)}</strong>
                  <span>{new Date(order.createdAt).toDateString()}</span>
                </div>
                <span>{order.items?.length || 0} items</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
