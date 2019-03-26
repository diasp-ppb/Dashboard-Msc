DROP zonecoords;

CREATE TABLE zonecoords(
   Name      VARCHAR(20) NOT NULL PRIMARY KEY
  ,Latitude  NUMERIC(20,20) NOT NULL
  ,Longitude NUMERIC(20,20) NOT NULL
);