create table if not exists tasks(
    id SERIAL PRIMARY KEY,
    title varchar(100) not null,
    description VARCHAR(200),
    created_on timestamp WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tasks(title, description) VALUES('Task 1', 'Description 1');