-- KabadiMarket Database Schema
-- PostgreSQL 16

-- ── Bookings ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bookings (
    id           SERIAL PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    mobile       VARCHAR(15) NOT NULL,
    address      TEXT NOT NULL,
    scrap_types  TEXT[] NOT NULL DEFAULT '{}',
    preferred_date DATE,
    time_slot    VARCHAR(50),
    notes        TEXT,
    status       VARCHAR(20) NOT NULL DEFAULT 'pending'
                   CHECK (status IN ('pending','confirmed','completed','cancelled')),
    created_at   TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created ON bookings(created_at DESC);

-- ── Scrap Rates ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS scrap_rates (
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(100) NOT NULL,
    category   VARCHAR(50) NOT NULL
                 CHECK (category IN ('paper','plastic','metal','ewaste','glass','rubber','other')),
    price      NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    unit       VARCHAR(20) NOT NULL CHECK (unit IN ('kg','pcs')),
    emoji      VARCHAR(10) DEFAULT '♻️',
    is_active  BOOLEAN NOT NULL DEFAULT TRUE,
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_rates_category ON scrap_rates(category);

-- ── Contact Messages ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_messages (
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(100) NOT NULL,
    mobile     VARCHAR(15),
    email      VARCHAR(100),
    message    TEXT NOT NULL,
    is_read    BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ── Reviews ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reviews (
    id            SERIAL PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    location      VARCHAR(100),
    rating        INTEGER NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
    comment       TEXT NOT NULL,
    initials      VARCHAR(5),
    is_published  BOOLEAN NOT NULL DEFAULT FALSE,
    created_at    TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ── Seed Scrap Rates ──────────────────────────────────────────────────────────
INSERT INTO scrap_rates (name, category, price, unit, emoji) VALUES
-- Paper
('Newspaper',           'paper',   14.00, 'kg',  '📰'),
('Cardboard / Boxes',   'paper',    8.00, 'kg',  '📦'),
('Books / Copies',      'paper',   10.00, 'kg',  '📚'),
('Office Paper',        'paper',   12.00, 'kg',  '📄'),
-- Plastic
('Hard Plastic',        'plastic',  8.00, 'kg',  '🪣'),
('PET Bottles',         'plastic', 10.00, 'kg',  '🍶'),
('Plastic Bags',        'plastic',  5.00, 'kg',  '🛍️'),
-- Metal
('Iron / Steel',        'metal',   28.00, 'kg',  '⚙️'),
('Copper',              'metal',  420.00, 'kg',  '🔧'),
('Aluminium',           'metal',   90.00, 'kg',  '🥫'),
('Brass',               'metal',  270.00, 'kg',  '🔩'),
('Steel Utensils',      'metal',   30.00, 'kg',  '🍳'),
-- E-Waste
('Mobile Phone',        'ewaste', 150.00, 'pcs', '📱'),
('Laptop',              'ewaste', 500.00, 'pcs', '💻'),
('CPU / Desktop',       'ewaste', 300.00, 'pcs', '🖥️'),
('TV / Monitor',        'ewaste', 200.00, 'pcs', '📺'),
('AC / Fridge (scrap)', 'ewaste', 800.00, 'pcs', '❄️'),
('Washing Machine',     'ewaste', 600.00, 'pcs', '🫧'),
-- Glass
('Glass Bottles',       'glass',   2.00, 'kg',  '🍾'),
('Broken Glass',        'glass',   1.00, 'kg',  '🪟'),
-- Rubber
('Rubber / Tyres',      'rubber',  6.00, 'kg',  '🛞'),
-- Other
('Wooden Furniture',    'other',   3.00, 'kg',  '🪑'),
('Batteries (Lead)',    'other',  80.00, 'kg',  '🔋')
ON CONFLICT DO NOTHING;

-- ── Seed Reviews ──────────────────────────────────────────────────────────────
INSERT INTO reviews (customer_name, location, rating, comment, initials, is_published) VALUES
('Ramesh Sharma',  'Lajpat Nagar, Delhi',      5, 'Excellent service! They came on time and gave the best price for my newspaper and cardboard. Very professional team.',           'RS', TRUE),
('Priya Patel',    'Koramangala, Bangalore',   5, 'Very happy with Kabadi Market. They took away my old AC and washing machine. Quick pickup and instant payment. Highly recommended!', 'PP', TRUE),
('Amit Kumar',     'Andheri West, Mumbai',     5, 'Best rates in the city! I sold my old laptop and mobile phones. Got ₹650 instantly. Will definitely use again.',                  'AK', TRUE),
('Sunita Verma',   'Sector 14, Gurgaon',       4, 'Good experience overall. The team was polite and efficient. Received payment immediately after weighing the scrap.',               'SV', TRUE),
('Rohit Jain',     'Aundh, Pune',              5, 'Cleared out years of accumulated scrap from my house. The kabadiwala team handled everything. Super easy process!',               'RJ', TRUE),
('Meena Iyer',     'T. Nagar, Chennai',        5, 'Very trustworthy service. They weighed everything in front of me and paid the exact amount. No tricks, no haggling.',             'MI', TRUE)
ON CONFLICT DO NOTHING;
