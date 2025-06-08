-- Crear esquema
CREATE SCHEMA IF NOT EXISTS eurovision;

-- Tabla países
CREATE TABLE eurovision.paises (
    pais TEXT PRIMARY KEY,
    code_pais CHAR(3) NOT NULL UNIQUE
);

-- Tabla actuaciones
CREATE TABLE eurovision.actuaciones (
    id SERIAL PRIMARY KEY,
    nombre_artista TEXT NOT NULL,
    code_pais CHAR(3) NOT NULL,
    titulo_cancion TEXT NOT NULL,
    url_artista TEXT,
    CONSTRAINT fk_pais_actuacion FOREIGN KEY (code_pais) REFERENCES eurovision.paises(code_pais)
);

-- Tabla votantes
CREATE TABLE eurovision.votantes (
    "idVotante" SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    ip_address INET NOT NULL,
    "codigoPais" CHAR(3) NOT NULL,
    CONSTRAINT fk_pais_votante FOREIGN KEY ("codigoPais") REFERENCES eurovision.paises(code_pais)
);

-- Tabla votos
CREATE TABLE eurovision.votos (
    "idVotante" INT NOT NULL,
    "idActuacion" INT NOT NULL,
    "fechaVoto" DATE NOT NULL,
    voto NUMERIC(4,1) NOT NULL CHECK (voto >= 0),
    PRIMARY KEY ("idVotante", "idActuacion"),
    CONSTRAINT fk_voto_votante FOREIGN KEY ("idVotante") REFERENCES eurovision.votantes("idVotante"),
    CONSTRAINT fk_voto_actuacion FOREIGN KEY ("idActuacion") REFERENCES eurovision.actuaciones(id)
);

-- Insertar datos en paises
INSERT INTO eurovision.paises (pais, code_pais) VALUES
('Albania', 'ALB'),
('Andorra', 'AND'),
('Armenia', 'ARM'),
('Austria', 'AUT'),
('Azerbaijan', 'AZE'),
('Belarus', 'BLR'),
('Belgium', 'BEL'),
('Bosnia and Herzegovina', 'BIH'),
('Bulgaria', 'BGR'),
('Croatia', 'HRV'),
('Cyprus', 'CYP'),
('Czechia', 'CZE'),
('Denmark', 'DNK'),
('Estonia', 'EST'),
('Finland', 'FIN'),
('France', 'FRA'),
('Georgia', 'GEO'),
('Germany', 'DEU'),
('Greece', 'GRC'),
('Hungary', 'HUN'),
('Iceland', 'ISL'),
('Ireland', 'IRL'),
('Italy', 'ITA'),
('Kazakhstan', 'KAZ'),
('Latvia', 'LVA'),
('Liechtenstein', 'LIE'),
('Lithuania', 'LTU'),
('Luxembourg', 'LUX'),
('Malta', 'MLT'),
('Moldova', 'MDA'),
('Monaco', 'MCO'),
('Montenegro', 'MNE'),
('Netherlands', 'NLD'),
('Norway', 'NOR'),
('Poland', 'POL'),
('Portugal', 'PRT'),
('Republic of North Macedonia', 'MKD'),
('Romania', 'ROU'),
('Russia', 'RUS'),
('San Marino', 'SMR'),
('Serbia', 'SRB'),
('Slovakia', 'SVK'),
('Slovenia', 'SVN'),
('Spain', 'ESP'),
('Sweden', 'SWE'),
('Switzerland', 'CHE'),
('Ukraine', 'UKR'),
('United Kingdom', 'GBR'),
('Vatican City', 'VAT');

-- Insertar datos en actuaciones
INSERT INTO eurovision.actuaciones (nombre_artista, code_pais, titulo_cancion, id, url_artista) VALUES
('Kyle Alessandro', 'NOR', 'Lighter', 81, 'WReEi3jLRFQ'),
('Laura Thorn', 'LUX', 'La poupée monte le son', 82, 'jMY-eUDTs0Q'),
('Tommy Cash', 'EST', 'Espresso Macchiato', 83, 'F3wsy8bywXQ'),
('Katarsis', 'LTU', 'Tavo akys', 84, '2vLHs89Akzo'),
('Melody', 'ESP', 'Esa diva', 85, 'BvVxhbCW9rw'),
('Ziferblat', 'UKR', 'Bird of Pray', 86, '0Jc02OFU42w'),
('Remember Monday', 'GBR', 'What the Hell Just Happened?', 87, '-hu6R3ZnOdY'),
('JJ', 'AUT', 'Wasted Love', 88, 'coGaxAWtp58'),
('Væb', 'ISL', 'Róa', 89, 'f3mAIpm5QxI'),
('Tautumeitas', 'LVA', 'Bur man laimi', 90, 'tRTfxUJtDOs'),
('Claude', 'NLD', 'C’est la vie', 91, 'Wb8-gbgan80'),
('Erika Vikman', 'FIN', 'Ich komme', 92, 'Kg3QoTpnqyw'),
('Lucio Corsi', 'ITA', 'Volevo essere un duro', 93, 'CyoY1fiVIjM'),
('Justyna Steczkowska', 'POL', 'Gaja', 94, 'NQXhvclWuPE'),
('Abor & Tynna', 'DEU', 'Baller', 95, 'xF_sNQXP5g8'),
('Klavdia', 'GRC', 'Asteromáta', 96, 'OP9n_cO-6V4'),
('Parg', 'ARM', 'Survivor', 97, '5sXbxyQ5K0M'),
('Zoë Më', 'CHE', 'Voyage', 98, 'F4lALgxBiYI'),
('Miriana Conte', 'MLT', 'Serving', 99, '2AN3vvLORuw'),
('Napa', 'PRT', 'Deslocado', 100, '6QRHcLJS0T0'),
('Sissal', 'DNK', 'Hallucination', 101, 'Q_ND8mF9d3c'),
('KAJ', 'SWE', 'Bara bada bastu', 102, 'WK3HOMhAeQY'),
('Louane', 'FRA', 'Maman', 103, 'TUyvT65c9ok'),
('Gabry Ponte', 'SMR', 'Tutta l’Italia', 104, 'Le3WpaLYRvE'),
('Shkodra Elektronike', 'ALB', 'Zjerm', 105, 'cwVL1dbjqj4');

-- Insertar datos en votantes
INSERT INTO eurovision.votantes ("idVotante", nombre, email, ip_address, "codigoPais") VALUES
(1, 'Carlos Pérez', 'carlos.perez@example.com', '192.168.1.1', 'ESP'),
(2, 'Maria López', 'maria.lopez@example.com', '192.168.1.2', 'FRA'),
(3, 'John Smith', 'john.smith@example.com', '192.168.1.3', 'GBR'),
(4, 'Elena García', 'elena.garcia@example.com', '192.168.1.4', 'ITA'),
(5, 'David Müller', 'david.mueller@example.com', '192.168.1.5', 'DEU'),
(7, 'Lucía Martínez', 'lucia.martinez@example.com', '192.168.1.7', 'POL'),
(8, 'Marek Kowalski', 'marek.kowalski@example.com', '192.168.1.8', 'SWE'),
(9, 'Pierre Dupont', 'pierre.dupont@example.com', '192.168.1.9', 'FRA'),
(10, 'Katarina Jovanović', 'katarina.jovanovic@example.com', '192.168.1.10', 'SRB'),
(11, 'Anna Svensson', 'anna.swe@example.com', '192.168.1.1', 'UKR'),
(12, 'Anna Svensson22', 'anna.swe22@example.com', '192.168.1.1', 'SWE'),
(13, 'Andrej Novak', 'andrej.novak@example.com', '192.168.2.1', 'SVN'),
(14, 'Nina Petrović', 'nina.petrovic@example.com', '192.168.2.2', 'HRV'),
(15, 'Timo Laine', 'timo.laine@example.com', '192.168.2.3', 'FIN'),
(16, 'Álvaro Costa', 'alvaro.costa@example.com', '192.168.2.4', 'PRT'),
(17, 'Roksana Wójcik', 'roksana.wojcik@example.com', '192.168.2.5', 'POL'),
(18, 'Henrik Sørensen', 'henrik.sorensen@example.com', '192.168.2.6', 'DNK'),
(19, 'Isabelle Laurent', 'isabelle.laurent@example.com', '192.168.2.7', 'BEL'),
(20, 'Kristaps Ozols', 'kristaps.ozols@example.com', '192.168.2.8', 'LVA'),
(21, 'Matteo Ricci', 'matteo.ricci@example.com', '192.168.2.10', 'ITA'),
(22, 'Emma Nilsen', 'emma.nilsen@example.com', '192.168.2.11', 'NOR'),
(23, 'Stefan Popescu', 'stefan.popescu@example.com', '192.168.2.13', 'ROU'),
(24, 'Georgios Papadopoulos', 'georgios.papadopoulos@example.com', '192.168.2.15', 'GRC'),
(25, 'Anton Ivanov', 'anton.ivanov@example.com', '192.168.2.16', 'BGR'),
(26, 'Éva Tóth', 'eva.toth@example.com', '192.168.2.17', 'HUN'),
(27, 'Jakub Dvořák', 'jakub.dvorak@example.com', '192.168.2.18', 'CZE');

-- Insertar datos en votos
INSERT INTO eurovision.votos ("idVotante", "idActuacion", "fechaVoto", voto) VALUES
(1, 81, '2025-05-10', 10.0),
(2, 82, '2025-05-10', 8.0),
(3, 83, '2025-05-10', 12.0),
(4, 84, '2025-05-10', 6.0),
(5, 85, '2025-05-11', 9.0),
(7, 87, '2025-05-11', 5.0),
(8, 88, '2025-05-11', 11.0),
(9, 89, '2025-05-12', 4.0),
(10, 90, '2025-05-12', 3.0),
(11, 91, '2025-05-12', 8.0),
(12, 91, '2025-05-12', 8.0);
