#! /bin/bash
#set -e
echo "### Stopping cluster of containers..."

TO_STOP=$(docker ps --all --filter="name=ipfs_cluster_instance" -q)

if [ -z "${TO_STOP}" ]; then
	echo "No containers found, exiting..."
	exit 0
fi

echo "### I'm stopping $TO_STOP"

echo ""
echo "### Killing containers..."
docker kill $TO_STOP
echo ""
echo "### Removing containers..."
docker rm $TO_STOP

echo ""
echo ""
echo "### All done!"
