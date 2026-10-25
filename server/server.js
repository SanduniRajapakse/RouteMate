const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Jungkook97',
    database: 'routemate_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test DB Connection on Startup
(async () => {
    try {
        const conn = await pool.getConnection();
        console.log('Database connected successfully to routemate_db!');
        conn.release();
    } catch (err) {
        console.error('Database connection failed:', err.message);
    }
})();

// REQ-1: Category Exploration
app.get('/api/categories', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM categories');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

// REQ-1, REQ-2, REQ-3: Search, Filter & Photo Galleries
app.get('/api/places', async (req, res) => {
    try {
        const { search, categoryId } = req.query;
        let query = `
            SELECT 
                p.id, 
                p.name, 
                p.description, 
                p.category_id as categoryId, 
                c.name as categoryName, 
                p.latitude, 
                p.longitude, 
                p.opening_time as openingTime, 
                p.fees, 
                p.travel_tips as travelTips
            FROM places p 
            LEFT JOIN categories c ON p.category_id = c.id 
            WHERE 1=1
        `;
        let params = [];

        if (search) {
            query += ` AND (p.name LIKE ? OR p.description LIKE ?)`;
            params.push(`%${search}%`, `%${search}%`);
        }
        if (categoryId) {
            query += ` AND p.category_id = ?`;
            params.push(categoryId);
        }

        const [places] = await pool.query(query, params);

        for (let place of places) {
            const [photos] = await pool.query('SELECT image_url FROM place_photos WHERE place_id = ?', [place.id]);
            place.photos = photos.map(p => p.image_url);
            place.thumbnail = place.photos.length > 0 ? place.photos[0] : null;
        }

        res.json(places);
    } catch (err) {
        res.status(500).json({ error: 'Database error fetching places' });
    }
});

// REQ-10: Admin Create Category
app.post('/api/admin/categories', async (req, res) => {
    const { name, thumbnailUrl } = req.body;
    try {
        await pool.query(
            'INSERT INTO categories (name, thumbnail_url) VALUES (?, ?)',
            [name, thumbnailUrl]
        );
        res.status(201).json({ message: 'Category created successfully' });
    } catch (err) {
        console.error('Error creating category:', err.message);
        res.status(500).json({ error: 'Failed to create category' });
    }
});

// REQ-10: Admin Reassign Attractions Between Categories
app.post('/api/admin/categories/reassign', async (req, res) => {
    const { fromCategoryId, toCategoryId } = req.body;
    try {
        await pool.query(
            'UPDATE places SET category_id = ? WHERE category_id = ?',
            [toCategoryId, fromCategoryId]
        );
        res.json({ message: 'Attractions reassigned successfully' });
    } catch (err) {
        console.error('Error reassigning attractions:', err.message);
        res.status(500).json({ error: 'Failed to reassign attractions' });
    }
});

// REQ-10: Admin Delete Category
app.delete('/api/admin/categories/:id', async (req, res) => {
    const categoryId = req.params.id;
    const { reassignToId } = req.body; 
    const connection = await pool.getConnection();
    
    try {
        await connection.beginTransaction();

        if (reassignToId) {
            await connection.query('UPDATE places SET category_id = ? WHERE category_id = ?', [reassignToId, categoryId]);
        } else {
            await connection.query('UPDATE places SET category_id = NULL WHERE category_id = ?', [categoryId]);
        }

        await connection.query('DELETE FROM categories WHERE id = ?', [categoryId]);
        await connection.commit();
        res.json({ message: 'Category removed' });
    } catch (err) {
        await connection.rollback();
        res.status(500).json({ error: 'Failed to remove category' });
    } finally {
        connection.release();
    }
});

// REQ-9: Admin Attractions Management
app.post('/api/admin/places', async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const { name, description, categoryId, latitude, longitude, openingTime, fees, travelTips, photos } = req.body;

        const [result] = await connection.query(
            `INSERT INTO places (name, description, category_id, latitude, longitude, opening_time, fees, travel_tips) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, description, categoryId, latitude, longitude, openingTime, fees, travelTips]
        );

        const placeId = result.insertId;
        if (photos && Array.isArray(photos)) {
            for (const url of photos) {
                if (url.trim()) {
                    await connection.query(`INSERT INTO place_photos (place_id, image_url) VALUES (?, ?)`, [placeId, url.trim()]);
                }
            }
        }

        await connection.commit();
        res.status(201).json({ message: 'Place added successfully', placeId });
    } catch (err) {
        await connection.rollback();
        res.status(500).json({ error: 'Failed to add place' });
    } finally {
        connection.release();
    }
});

// REQ-9: Admin Update Place
app.put('/api/admin/places/:id', async (req, res) => {
    const placeId = req.params.id;
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const { name, description, categoryId, latitude, longitude, openingTime, fees, travelTips, photos } = req.body;

        // 1. Update main place details
        await connection.query(
            `UPDATE places SET name = ?, description = ?, category_id = ?, latitude = ?, longitude = ?, opening_time = ?, fees = ?, travel_tips = ? WHERE id = ?`,
            [name, description, categoryId, latitude, longitude, openingTime, fees, travelTips, placeId]
        );

        // 2. Clear old photo records and insert the updated photo array
        await connection.query('DELETE FROM place_photos WHERE place_id = ?', [placeId]);
        if (photos && Array.isArray(photos)) {
            for (const url of photos) {
                if (url.trim()) {
                    await connection.query('INSERT INTO place_photos (place_id, image_url) VALUES (?, ?)', [placeId, url.trim()]);
                }
            }
        }

        await connection.commit();
        res.json({ message: 'Place updated successfully' });
    } catch (err) {
        await connection.rollback();
        console.error('Error updating place:', err.message);
        res.status(500).json({ error: 'Failed to update place' });
    } finally {
        connection.release();
    }
});

// REQ-9: Admin Delete Place
app.delete('/api/admin/places/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM places WHERE id = ?', [req.params.id]);
        res.json({ message: 'Place deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete place' });
    }
});

// REQ-5, REQ-6: Database Persistence & Share Links
app.post('/api/itineraries', async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const { userId, title, placesWithTravelTime } = req.body; 

        const shareCode = crypto.randomBytes(4).toString('hex');

        const [resItinerary] = await connection.query(
            `INSERT INTO itineraries (user_id, title, share_code) VALUES (?, ?, ?)`,
            [userId || null, title, shareCode]
        );

        const itineraryId = resItinerary.insertId;

        if (placesWithTravelTime && Array.isArray(placesWithTravelTime)) {
            for (let i = 0; i < placesWithTravelTime.length; i++) {
                const item = placesWithTravelTime[i];
                await connection.query(
                    `INSERT INTO itinerary_items (itinerary_id, place_id, stop_order, estimated_travel_time_from_prev) VALUES (?, ?, ?, ?)`,
                    [itineraryId, item.placeId, i + 1, item.travelTimeFromPrev || '0 mins']
                );
            }
        }

        await connection.commit();
        res.status(201).json({ 
            message: 'Itinerary saved successfully!', 
            itineraryId, 
            shareCode,
            shareLink: `http://localhost:5173/itinerary/shared/${shareCode}` 
        });
    } catch (err) {
        await connection.rollback();
        console.error("Error saving itinerary to DB:", err.message);
        res.status(500).json({ error: 'Failed to save itinerary' });
    } finally {
        connection.release();
    }
});

// REQ-6: Shared Itinerary Lookup
app.get('/api/itineraries/shared/:code', async (req, res) => {
    try {
        const [itineraries] = await pool.query('SELECT * FROM itineraries WHERE share_code = ?', [req.params.code]);
        if (itineraries.length === 0) return res.status(404).json({ error: 'Itinerary not found' });

        const itinerary = itineraries[0];
        const [items] = await pool.query(`
            SELECT 
                p.id, 
                p.name, 
                p.description, 
                p.category_id as categoryId, 
                p.latitude, 
                p.longitude, 
                p.opening_time as openingTime, 
                p.fees, 
                p.travel_tips as travelTips,
                ii.stop_order, 
                ii.estimated_travel_time_from_prev
            FROM itinerary_items ii
            JOIN places p ON ii.place_id = p.id
            WHERE ii.itinerary_id = ?
            ORDER BY ii.stop_order ASC
        `, [itinerary.id]);

        res.json({ ...itinerary, items, viewOnly: true });
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve shared itinerary' });
    }
});

// REQ-6: User Login Authentication to save and share itineraries
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await pool.query(
            'SELECT id, username, email, role FROM users WHERE email = ? AND password_hash = ?',
            [email, password]
        );
        if (rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        res.json({ message: 'Login successful', user: rows[0] });
    } catch (err) {
        res.status(500).json({ error: 'Database login error' });
    }
});

// REQ-5/6: Delete Saved Itinerary
app.delete('/api/itineraries/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM itineraries WHERE id = ?', [req.params.id]);
        res.json({ message: 'Itinerary deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete itinerary' });
    }
});

// REQ-5/Authentication: User Registration / Sign Up
app.post('/api/auth/register', async (req, res) => {
    const { email, password, username } = req.body;
    try {
        const [existing] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existing.length > 0) {
            return res.status(400).json({ error: 'Email already registered' });
        }
        const [result] = await pool.query(
            'INSERT INTO users (email, password, username) VALUES (?, ?, ?)',
            [email, password, username || email.split('@')[0]]
        );
        res.status(201).json({
            message: 'Account created successfully',
            user: { id: result.insertId, email, username: username || email.split('@')[0] }
        });
    } catch (err) {
        console.error('Registration error:', err.message);
        res.status(500).json({ error: 'Failed to register user' });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));