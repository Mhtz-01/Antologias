ALTER TABLE sponsors
ADD icon_url TEXT,
ADD description TEXT,
ADD website TEXT,
ADD contact_email TEXT,
ADD phone TEXT,
ADD created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

