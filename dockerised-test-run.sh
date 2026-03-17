#!/bin/bash
set -e

TOTAL_SHARDS=3
TAG=""
TEST_ENV="dev"
IMAGE_NAME="nhs-dtx-tests"

while [[ "$#" -gt 0 ]]; do
  case $1 in
    --shards)
      TOTAL_SHARDS="$2"
      shift
      ;;
    --tag)
      TAG="$2"
      shift
      ;;
    --env)
      TEST_ENV="$2"
      shift
      ;;
    --image)
      IMAGE_NAME="$2"
      shift
      ;;
    *)
      echo "Unknown parameter: $1"
      exit 1
      ;;
  esac
  shift
done

if [[ -z "$TAG" ]]; then
  echo "Error: You must provide a tag using --tag"
  exit 1
fi

for i in $(seq 1 "$TOTAL_SHARDS"); do
  echo "Starting shard $i of $TOTAL_SHARDS | tag=$TAG | env=$TEST_ENV"

  docker run --rm \
    -e CI=true \
    -e TEST_ENV="$TEST_ENV" \
    "$IMAGE_NAME" \
    sh -c "npx playwright test --project=chromium --shard=$i/$TOTAL_SHARDS --grep \"$TAG\"" &
done

wait
echo "All shards completed"