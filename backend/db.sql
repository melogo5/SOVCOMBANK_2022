--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3
-- Dumped by pg_dump version 12.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY users.list DROP CONSTRAINT IF EXISTS list_pkey;
ALTER TABLE IF EXISTS ONLY roles.permissions DROP CONSTRAINT IF EXISTS permissions_pkey;
ALTER TABLE IF EXISTS ONLY roles.list DROP CONSTRAINT IF EXISTS list_pkey;
ALTER TABLE IF EXISTS ONLY public.migrations DROP CONSTRAINT IF EXISTS migrations_pkey;
ALTER TABLE IF EXISTS ONLY permissions.list DROP CONSTRAINT IF EXISTS list_pkey;
ALTER TABLE IF EXISTS ONLY cards.list DROP CONSTRAINT IF EXISTS list_pkey;
DROP TABLE IF EXISTS users.list;
DROP TABLE IF EXISTS roles.permissions;
DROP TABLE IF EXISTS roles.list;
DROP TABLE IF EXISTS public.migrations;
DROP TABLE IF EXISTS permissions.list;
DROP TABLE IF EXISTS cards.list;
DROP EXTENSION IF EXISTS "uuid-ossp";
DROP SCHEMA IF EXISTS users;
DROP SCHEMA IF EXISTS roles;
DROP SCHEMA IF EXISTS permissions;
DROP SCHEMA IF EXISTS cards;
--
-- Name: cards; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA cards;


--
-- Name: permissions; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA permissions;


--
-- Name: roles; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA roles;


--
-- Name: users; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA users;


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: list; Type: TABLE; Schema: cards; Owner: -
--

CREATE TABLE cards.list (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    cardnumber text,
    cardholder text,
    cardexpiredate text,
    cardsecret text,
    created timestamp(0) without time zone DEFAULT now() NOT NULL
);


--
-- Name: list; Type: TABLE; Schema: permissions; Owner: -
--

CREATE TABLE permissions.list (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name text,
    enabled boolean DEFAULT true
);


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.migrations (
    id text NOT NULL
);


--
-- Name: list; Type: TABLE; Schema: roles; Owner: -
--

CREATE TABLE roles.list (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name text,
    enabled boolean DEFAULT true
);


--
-- Name: permissions; Type: TABLE; Schema: roles; Owner: -
--

CREATE TABLE roles.permissions (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    role uuid,
    permission uuid,
    enabled boolean DEFAULT true
);


--
-- Name: list; Type: TABLE; Schema: users; Owner: -
--

CREATE TABLE users.list (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name text,
    password text,
    created timestamp(0) without time zone DEFAULT now() NOT NULL,
    role uuid
);


--
-- Data for Name: list; Type: TABLE DATA; Schema: cards; Owner: -
--

COPY cards.list (id, cardnumber, cardholder, cardexpiredate, cardsecret, created) FROM stdin;
\.


--
-- Data for Name: list; Type: TABLE DATA; Schema: permissions; Owner: -
--

COPY permissions.list (id, name, enabled) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.migrations (id) FROM stdin;
0
\.


--
-- Data for Name: list; Type: TABLE DATA; Schema: roles; Owner: -
--

COPY roles.list (id, name, enabled) FROM stdin;
\.


--
-- Data for Name: permissions; Type: TABLE DATA; Schema: roles; Owner: -
--

COPY roles.permissions (id, role, permission, enabled) FROM stdin;
\.


--
-- Data for Name: list; Type: TABLE DATA; Schema: users; Owner: -
--

COPY users.list (id, name, password, created, role) FROM stdin;
\.


--
-- Name: list list_pkey; Type: CONSTRAINT; Schema: cards; Owner: -
--

ALTER TABLE ONLY cards.list
    ADD CONSTRAINT list_pkey PRIMARY KEY (id);


--
-- Name: list list_pkey; Type: CONSTRAINT; Schema: permissions; Owner: -
--

ALTER TABLE ONLY permissions.list
    ADD CONSTRAINT list_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: list list_pkey; Type: CONSTRAINT; Schema: roles; Owner: -
--

ALTER TABLE ONLY roles.list
    ADD CONSTRAINT list_pkey PRIMARY KEY (id);


--
-- Name: permissions permissions_pkey; Type: CONSTRAINT; Schema: roles; Owner: -
--

ALTER TABLE ONLY roles.permissions
    ADD CONSTRAINT permissions_pkey PRIMARY KEY (id);


--
-- Name: list list_pkey; Type: CONSTRAINT; Schema: users; Owner: -
--

ALTER TABLE ONLY users.list
    ADD CONSTRAINT list_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

