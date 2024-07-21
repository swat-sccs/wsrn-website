DROP TABLE IF EXISTS Shows;
CREATE TABLE Shows (
    id int(11) NOT NULL AUTO_INCREMENT,
    title varchar(191) NOT NULL,
    img varchar(191) NOT NULL DEFAULT 'wsrn2.png',
    startTime datetime NOT NULL ,
    endTime datetime NOT NULL ,
    dotw int(1) NOT NULL DEFAULT 0, 
    description text,
    dj varchar(191) NOT NULL DEFAULT 'WSRN DJ',
    PRIMARY KEY (id)
);

SET @descriptionOne = 'This is a WSRN Show';
INSERT INTO Shows (title, dj, description, dotw, img)
VALUES ('TestShow1', 'DJ JD', @descriptionOne, 1, 'testshow1.jpg');

INSERT INTO Shows (title, dj, description, dotw, img)
VALUES ('TestShow2', 'ME', @descriptionOne, 1, 'testshow2.jpg');