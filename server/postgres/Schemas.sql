-- creating database in postgresql

BEGIN;
-- Table for Users info
CREATE TABLE IF NOT EXISTS public."Users"
(
    user_id character varying,
    "Name" character varying,
    email_id character varying,
    "Phn_number" integer,
    password character varying,
    PRIMARY KEY (user_id)
);
-- Table for NGO's info
CREATE TABLE IF NOT EXISTS public."NGO"
(
    ngo_id character varying,
    name character varying,
    admin character varying,
    PRIMARY KEY (ngo_id)
);
-- Tables to define roles users in Ngo's
CREATE TABLE IF NOT EXISTS public."User_Roles"
(
    role character varying,
    ngo_id character varying,
    user_id character varying
);
-- making foreign keys in user_roles
ALTER TABLE IF EXISTS public."User_Roles"
    ADD CONSTRAINT ngo_id FOREIGN KEY (ngo_id)
    REFERENCES public."NGO" (ngo_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

    
ALTER TABLE IF EXISTS public."User_Roles"
    ADD CONSTRAINT user_id FOREIGN KEY (user_id)
    REFERENCES public."Users" (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

END;