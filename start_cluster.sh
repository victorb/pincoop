#! /bin/bash

echo "Starting cluster of containers..."

ADD_IN_OPENIPFS=$1


MULTIADDRS=();

# Number of nodes
for NUM in {1..10}
do
	echo "Starting container #$NUM"
	CONTAINER_ID=$(docker run --name "ipfs_cluster_instance_$NUM" -d eris/ipfs)
	echo "Container #$NUM got ID $CONTAINER_ID"
	# echo "Waiting for #$NUM to boot..."
	# sleep 5
	# #TODO Check if the ipfs daemon started, otherwise repeat
	# echo "Checking logs for #$NUM"
	# docker logs $CONTAINER_ID

	CONTAINER_IP=$(docker inspect --format '{{ .NetworkSettings.IPAddress }}' $CONTAINER_ID)
	echo "#$NUM have IP $CONTAINER_IP"

	MULTIADDR="/ip4/$CONTAINER_IP/tcp/5001"
	echo "#$NUM have multiaddr $MULTIADDR"
	MULTIADDRS=("${MULTIADDRS[@]}" "$MULTIADDR")

	if [ ! -z $ADD_IN_OPENIPFS ] 
	then 
		echo "Adding $MULTIADDR to OpenIPFS"
			curl -X POST --silent localhost:3001/api/daemons -H "Content-Type: application/json" --data '{"multiaddr":"'$MULTIADDR'"}' > /dev/null
	fi
	# sleep 10
	# echo "Killing #$NUM"
	# docker kill $CONTAINER_ID
done

echo "### ALL CONTAINERS:"
echo ${MULTIADDRS[@]}

