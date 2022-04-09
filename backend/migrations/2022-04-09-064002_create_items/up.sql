-- Your SQL goes here
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    img VARCHAR NOT NULL,
    type VARCHAR NOT NULL,
)