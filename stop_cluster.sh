#! /bin/bash
echo "### Stopping cluster of containers..."

TO_STOP=$(docker ps --filter="name=ipfs_cluster_instance" -q)

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
