rm -rf .env
touch .env
touch ~/.astrarc
echo "[default]" >> ~/.astrarc
echo "Please paste the export block from the connect page here:"
while :
do 
 read line
 [[ $line =~ .*database_password.* ]]&& break
 echo "${line#export }" >> .env
 echo "${line#export }" >> ~/.astrarc
done
echo "Please enter your database password"
read password
echo "ASTRA_DB_PASSWORD=$password" >> ~/.astrarc
echo "GAMES_COLLECTION=games" >> ~/.astrarc
echo "ASTRA_DB_TOKEN=0" >> ~/.astrarc
echo "ASTRA_DB_TOKEN_TIME=0" >> ~/.astrarc
echo "ASTRA_DB_PASSWORD=$password" >> .env
echo "GAMES_COLLECTION=games" >> .env
