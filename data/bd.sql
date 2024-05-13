DROP DATABASE IF EXISTS unaalmesapi;

CREATE DATABASE unaalmesapi;

USE unaalmesapi;

CREATE TABLE userapp(
    id BINARY(16) PRIMARY KEY DEFAULT UNHEX(REPLACE(UUID(), '-', '')),
    username varchar(15) NOT NULL UNIQUE,
    password text NOT NULL,
    admin bool NOT NULL default false
);

CREATE TABLE comic(
    id int PRIMARY KEY AUTO_INCREMENT,
    name text not null UNIQUE,
    thumbnail text UNIQUE,
    publication_year varchar(15) not null
);

CREATE TABLE universe(
    id int PRIMARY KEY,
    name varchar(15) not null UNIQUE,
    description text,
    thumbnail text,
    first_aparition int REFERENCES comic(id)
);

CREATE TABLE marvelcharacter(
    id int PRIMARY KEY AUTO_INCREMENT,
    superhero_name varchar(25) NOT NULL,
    real_name varchar(25),
    description text,
    thumbnail text,
    id_universe int REFERENCES universe(id),
    id_original int REFERENCES marvelcharacter(id), -- Este campo referencia a si mismo, es decir, spiderman no tendría un id original, ya que este es el original, pero las variantes como spiderman 2099 tendría como id original el spiderman normal
    first_aparition int REFERENCES comic(id)
);

CREATE TABLE creator(
    id int PRIMARY KEY AUTO_INCREMENT,
    name varchar(25) not null,
    year_of_birth date,
    thumbnail text,
    email text,
    first_aparition int REFERENCES comic(id)
); 

CREATE TABLE creator_character(
    id_creator int not null REFERENCES creator(id),
    id_character int not null REFERENCES marvelcharacter(id),
    PRIMARY KEY(id_character, id_creator)
);

-- Tabla de cómics
INSERT INTO comic (name, thumbnail, publication_year)
VALUES
    ('Motion Picture Funnies Weekly Vol 1 #1', '/api/v2/comic/image/1', 'April 1939'), -- Primera aparición Universo 616
    ('Ultimate Spider-Man Vol 1 #1', '/api/v2/comic/image/2', 'October 2000'), -- Primera aparición Universo Últimate
    ('Spider-Man 2099 Vol 1 #1', '/api/v2/comic/image/3', 'November 1992'), -- Primera Aparición Spider-Man 2099 y universo 2099
    ('Amazing Fantasy Vol 1 #15', '/api/v2/comic/image/4', 'August 1962'), -- Primera aparición Spider-Man y supuesto debut de steve ditko
    ('Ultimate Comics Fallout #4', '/api/v2/comic/image/5', 'October 2011'), -- Primera aparición Miles Morales
    ('Tales of Suspense Vol 1 #39', '/api/v2/comic/image/6', 'March 1963'), -- Primera aparición Iron-Man
    ('Strange Tales Vol 1 #110', '/api/v2/comic/image/7', 'July 1963'), -- Primera aparición Doctor Strange
    ('Daredevil Vol 1 #1', '/api/v2/comic/image/8', 'April 1964'), -- Primera aparición Daredevil
    ('Marvel Spotlight Vol 1 #5', '/api/v2/comic/image/9', 'August 1972'), -- Primera aparición Ghost Rider 616
    ('Ghost Rider 2099 Vol 1 #1', '/api/v2/comic/image/10', 'May 1994'), -- Primera aparición Ghost Rider 2099
    ('Fantastic Four Vol 1 #1', '/api/v2/comic/image/11', 'November 1961'), -- Primera aparición Mr Fantastico
    ('Ultimates Vol 2 #1', '/api/v2/comic/image/12', 'December 2004'), -- Primera aparición The Maker
    ('Incredible Hulk Vol 1 #180', '/api/v2/comic/image/13', 'October 1974'), -- Primera aparición Wolverine
    ('New Mutants #98', '/api/v2/comic/image/14', 'February 1991'), -- Primera aparición Deadpool
    ('X-Men Vol 1 #4', '/api/v2/comic/image/15', 'March 1964'), -- Primera aparición Scarlet Wich
    ('Captain America Vol 1 #3', '/api/v2/comic/image/16', 'May 1941'), -- Debut Stan Lee
    ('Captain America Vol 1 #1', '/api/v2/comic/image/17', 'March 1941'), -- Debut Jack Kirby
    ('Fantastic Four Vol 1 #3', '/api/v2/comic/image/18', 'November 1965'), -- Debut Peter David
    ('Thor Vol 1 #303', '/api/v2/comic/image/19', 'January 1981'), -- Debut Rick Leonardi
    ('Marvel Comics Vol 1 #1', '/api/v2/comic/image/20', 'October 1939'), -- Debut Bill Everett
    ('Tales of Suspense Vol 1 #73', '/api/v2/comic/image/21', 'January 1966'), -- Debut Roy Thomas
    ('Peter Parker, The Spectacular Spider-Man Vol 1 #114', '/api/v2/comic/image/22', 'May 1986'), -- Debut de Len Kaminski
    ('Amazing Spider-Man Vol 1 #154', '/api/v2/comic/image/23', 'March 1976'); -- Debut de Len Wein

-- Tabla de universos
INSERT INTO universe (id, name, description, thumbnail, first_aparition)
VALUES
    (616, 'Marvel', 'The Marvel Universe is a fictional universe where the stories in most American comic book titles and other media published by Marvel Comics take place.', '/api/v2/universe/image/1', 1),
    (1610, 'Ultimate Marvel', 'Ultimate Marvel is a modern reimagining of the Marvel Universe with updated storylines and character origins.', '/api/v2/universe/image/2', 5),
    (928, 'Marvel 2099', 'Marvel 2099 is a future timeline in the Marvel Comics universe, introduced in 1992.', '/api/v2/universe/image/3', 4);

-- Tabla de personajes de Marvel
INSERT INTO marvelcharacter (superhero_name, real_name, description, thumbnail, id_universe, id_original, first_aparition)
VALUES
    ('Spider-Man', 'Peter Parker', 'The bite of a radioactive spider turned Peter Parker into Spider-Man, a superhero with amazing powers. He was the favorite character of Stan Lee`s mother, CELIA LIEBER.', '/api/v2/character/image/1', 616, NULL, 4),
    ('Spider-Man', 'Miles Morales', 'After a bite from a radioactive spider, Miles Morales was transformed into Spider-Man, a superhero wielding incredible powers.', '/api/v2/character/image/2', 1610, 1, 5),
    ('Spider-Man 2099', 'Miguel O´Hara', 'Miguel O´Hara is Spider-Man in the year 2099 with enhanced abilities.', '/api/v2/character/image/3', 928, 1, 3),
    ('Iron Man', 'Tony Stark', 'Billionaire inventor Tony Stark created a suit of armor to fight evil as Iron Man.', '/api/v2/character/image/4', 616, NULL, 6),
    ('Doctor Strange', 'Stephen Strange', 'Stephen Strange is a former neurosurgeon who becomaes the Sorcerer Supreme, protecting Earth from mystical threats.', '/api/v2/character/image/5', 616, NULL, 7),
    ('Daredevil', 'Matt Murdock', 'Daredevil, aka Matt Murdock, is a Marvel superhero blinded by radioactive material as a child. His heightened senses grant him superhuman abilities, enabling him to fight crime as a vigilante in Hell`s Kitchen, New York', '/api/v2/character/image/6', 616, NULL, 8),
    ('Ghost Rider', 'Johnny Blaze', 'Ghost Rider, alias Johnny Blaze, is a Marvel antihero cursed to become the fiery Spirit of Vengeance. With his flaming skull and supernatural powers, he rides a blazing motorcycle to punish the wicked.', '/api/v2/character/image/7', 616, NULL, 9),
    ('Ghost Rider 2099', 'Kenshiro "Zero" Cochrane', 'Ghost Rider 2099 is a futuristic incarnation of the Ghost Rider legacy in Marvel Comics. In the year 2099, Kenshiro "Zero" Cochrane becomes the Ghost Rider, wielding advanced cybernetic enhancements and riding a high-tech motorcycle. In this dystopian future, he roams the cyberpunk streets, dispensing justice in a world dominated by technology and corruption.', '/api/v2/character/image/8', 928, 7, 10),
    ('Mr Fantastic', 'Reed Richard', 'Mr. Fantastic, aka Reed Richards, is the leader of the Fantastic Four. His exposure to cosmic radiation granted him elastic abilities, allowing him to stretch his body and explore the limits of science.', '/api/v2/character/image/9', 616, NULL, 11),
    ('The Maker', 'Reed Richard', 'The Maker, also known as Reed Richards from the Ultimate Marvel universe, is a villainous counterpart to Mr. Fantastic. Driven by his unchecked ambition and intellect, he uses his scientific prowess to manipulate and conquer. Unlike his heroic counterpart, The Maker has a ruthless and amoral nature, making him a formidable adversary.', '/api/v2/character/image/10', 1610, 9, 12),
    ('Wolverine', 'Logan', 'Wolverine, also known as Logan, is a Marvel superhero with retractable claws, a powerful healing factor, and heightened senses. His adamantium skeleton and savage combat skills make him a formidable member of the X-Men.', '/api/v2/character/image/11', 616, NULL, 13),
    ('Deadpool', 'Wade Wilson', 'Deadpool, also known as Wade Wilson, is a Marvel antihero with a twisted sense of humor and a penchant for breaking the fourth wall. Cursed with accelerated healing powers, he`s virtually immortal, and his combat skills are matched only by his mouth. Armed with katanas and a variety of firearms, Deadpool takes on mercenary work while often causing chaos along the way.', '/api/v2/character/image/12', 616, NULL, 14),
    ('Scarlet Wich', 'Wanda Maximoff', 'Scarlet Witch, also known as Wanda Maximoff, is a Marvel superheroine with reality-warping powers. Born with innate magical abilities, she can manipulate probability and cast powerful hexes. As a member of the Avengers, her complex history and inner turmoil often lead her on a journey of redemption and self-discovery, making her both a powerful ally and a formidable adversary.', '/api/v2/character/image/13', 616, NULL, 15);

-- Tabla de creadores
INSERT INTO creator (name, year_of_birth, thumbnail, email, first_aparition)
VALUES
    ('Stan Lee', '1922-12-28', '/api/v2/creator/image/1', 'stanlee@hispamarvel.com', 16),
    ('Steve Ditko', '1927-11-02', '/api/v2/creator/image/2', 'steveditko@gmail.com', 4),
    ('Jack Kirby', '1917-08-28', '/api/v2/creator/image/3', 'jackkirby@gmail.com', 17),
    ('Peter David', '1956-09-23', '/api/v2/creator/image/4', 'peterdavid@gmail.com', 18),
    ('Brian Michael Bendis', '1967-08-18', '/api/v2/creator/image/5', 'brianmichaelbendis@gmail.com', 2),
    ('Rick Leonardi', '1957-08-09', '/api/v2/creator/image/6', 'rickleonardi@gmail.com', 19),
    ('Bill Everett', '1917-05-18', '/api/v2/creator/image/7', 'billeveret@gmail.com', 20),
    ('Roy Thomas', '1940-11-22', '/api/v2/creator/image/8', 'roythomas@gmail.com', 21),
    ('Len Kaminski', '1962-10-20', '/api/v2/creator/image/9', 'lenkaminski@gmail.com', 22),
    ('Len Wein', '1948-06-12', '/api/v2/creator/image/10', 'lenwein@gmail.com', 23),
    ('Rob Liefeld', '1967-10-03', '/api/v2/creator/image/11', 'robliefeld@gmail.com', 14);

-- Relación entre personajes de Marvel y creadores
INSERT INTO creator_character (id_creator, id_character)
VALUES
    (1, 1), -- Stan Lee es creador de Spider-Man
    (2, 1), -- Steve Ditko es creador de Spider-Man
    (5, 2), -- Brian Michael Bendis es creador de Miles Morales
    (4, 3), -- Peter David es creador de Spider-Man 2099
    (6, 3), -- Rick Leonardi es creador de Spider-Man 2099
    (1, 4), -- Stan Lee es creador de Iron Man
    (3, 4), -- Jack Kirby es creador de Iron Man
    (1, 5), -- Stan Lee es creador de Doctor Strange
    (2, 5), -- Steve Ditko es creador de Doctor Strange
    (1, 6), -- Stan Lee es creador de Daredevil
    (7, 6), -- Bill Everett es creador de Daredevil
    (8, 7), -- Roy Thomas es creador de Ghost Rider
    (9, 8), -- Len Kaminski es creador de Ghost Rider 2099
    (1, 9), -- Stan Lee es creador de Mr Fantastic
    (3, 9), -- Jack Kirby es creador de Mr Fantastic
    (5, 10), -- Brian Michael Bendis es creador de The Maker
    (10, 11), -- Len Wein es creador de Wolverine
    (11, 12), -- Rob Liefeld es creador de Deadpool
    (1, 13), -- Stan Lee es creador de Scarlet Wich
    (3, 13); -- Jack Kirby es creador de Scarlet Wich


-- TODO Posible Implementación: Los comic creados por los creadores
/*
CREATE TABLE creator_comic(
    id_comic int not null REFERENCES comic(id),
    id_creator int not null REFERENCES creator(id)
);*/