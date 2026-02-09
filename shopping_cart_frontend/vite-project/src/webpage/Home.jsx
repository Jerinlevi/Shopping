import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../api/api";

export default function Home() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let mounted = true;
    apiFetch("/items")
      .then((data) => {
        if (!mounted) return;
        setItems(Array.isArray(data) ? data : []);
        setStatus("ready");
      })
      .catch(() => {
        if (!mounted) return;
        setStatus("error");
      });
    return () => {
      mounted = false;
    };
  }, []);

  const featured = useMemo(() => items.slice(0, 6), [items]);
  const categories = useMemo(() => {
    const map = new Map();
    items.forEach((item) => {
      const key = item.category || "Essentials";
      if (!map.has(key)) {
        map.set(key, item);
      }
    });
    return Array.from(map.entries()).slice(0, 4);
  }, [items]);

  return (
    <div className="page">
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">New season, new rituals</p>
          <h1>Shop smarter with a cart that feels like a boutique.</h1>
          <p className="hero-copy">
            Browse curated essentials, add them instantly, and track your
            orders with a dashboard built for speed. Everything syncs to your
            account.
          </p>
          <div className="hero-actions">
            <Link className="button primary" to="/signup">
              Start shopping
            </Link>
            <Link className="button ghost" to="/dashboard">
              Visit dashboard
            </Link>
          </div>
          <div className="hero-stats">
            <div>
              <strong>120+</strong>
              <span>products live</span>
            </div>
            <div>
              <strong>24h</strong>
              <span>order turnaround</span>
            </div>
            <div>
              <strong>4.9</strong>
              <span>average rating</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card">
            <p className="card-title">Top pick</p>
            <h3>Studio Shelf Set</h3>
            <p>Minimal storage, maximum calm.</p>
            <div className="price">₹189</div>
          </div>
          <div className="hero-orbit" />
          <div className="hero-glow" />
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Featured drops</h2>
          <p>Handpicked items from the live catalog.</p>
        </div>
        {status === "loading" && <p className="muted">Loading catalog…</p>}
        {status === "error" && (
          <p className="muted">
            We could not reach the catalog. Try again in a moment.
          </p>
        )}
        <div className="grid">
          {featured.map((item) => (
            <article className="product-card" key={item._id}>
              <div className="product-media">
                <img
                  src={
                    item.image ||
                    "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=800&auto=format&fit=crop"
                  }
                  alt={item.title}
                  loading="lazy"
                />
              </div>
              <div className="product-body">
                <div className="product-meta">
                  <span>{item.category || "Essentials"}</span>
                  <span>★ {item.rating || 4.6}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description || "A smart addition to any cart."}</p>
                <div className="product-foot">
                  <span className="price">₹{item.price}</span>
                  <Link className="button ghost small" to="/dashboard">
                    View details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section alt">
        <div className="section-head">
          <h2>Browse by mood</h2>
          <p>Collections designed around how you shop.</p>
        </div>
        <div className="category-grid">
          {categories.map(([name, sample]) => (
            <div className="category-card" key={name}>
              <img
                src={
                  sample.image ||
                  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop"
                }
                alt={name}
                loading="lazy"
              />
              <div>
                <h3>{name}</h3>
                <p>{sample.description || "Fresh edits for modern carts."}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Why Arcade Cart</h2>
          <p>Every order is backed by real-time tracking and secure checkout.</p>
        </div>
        <div className="perk-grid">
          {[1,2].map(() => ( 
            <>
          <div className="perk">
            <h3>Fast add-to-cart</h3>
            <p>One click from catalog to cart with live inventory sync.</p>
          </div>
          <div className="perk">
            <h3>Smart order history</h3>
            <p>See every purchase and reorder the best sellers instantly.</p>
          </div>
          <div className="perk">
            <h3>Secure accounts</h3>
            <p>Protected routes and token-based access keep it safe.</p>
          </div>
          </>
          ))}
        </div>
      </section>
    </div>
  );
}
