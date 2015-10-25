#! /bin/bash
set -e

echo "Checking if there is any old containers to remove..."

./stop_cluster.sh

echo "Starting cluster of containers..."

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

	echo "Adding $MULTIADDR to OpenIPFS"
	curl -X POST --silent localhost:3001/api/daemons -H "Content-Type: application/json" --data '{"multiaddr":"'$MULTIADDR'"}' > /dev/null
	sleep 1
done

echo "## ALL DONE!"
