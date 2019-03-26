#!/user/bin/env bash

postgress_docker_name=vci-db

#docker cp data $postgress_docker_name:/
##TABLES

PGPASSWORD=postgres psql -h localhost -U postgres -d vci  -a -f "ContagensVCI.sql"
PGPASSWORD=postgres psql -h localhost -U postgres -d vci  -a -f "ZoneCoords.sql"


#zonecoords
#docker exec $postgress_docker_name psql -d vci -U postgres -c "\copy zonecoords(name, latitude, longitude) from '/data/ZoneCoords.csv' with (format csv, header true, delimiter ';');"

PGPASSWORD=postgres psql -h localhost -U postgres -d vci -c "\copy zonecoords(name, latitude, longitude) from './data/ZoneCoords.csv' with (format csv, header true, delimiter ',');"

#tripdistribution
PGPASSWORD=postgres psql -h localhost -U postgres -d vci  -a -f "TripDistribution.sql"

#contagens 
PGPASSWORD=postgres psql -h localhost -U postgres -d vci -c '\copy contagem("trafficdataid","equipmentid","agg_period_start","agg_period_len_mins",LANE_BUNDLE_DIRECTION,TOTAL_VOLUME,AVG_SPEED_ARITHMETIC,OCCUPANCY
) from './data/ContagensVCI_Data.csv' with (format csv, header true, delimiter ",");'



