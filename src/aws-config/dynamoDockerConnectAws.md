docker pull amazon/dynamodb-local

docker run -p 8000:8000 amazon/dynamodb-local

then start the container

aws dynamodb create-table --cli-input-json file://table-script.json --endpoint-url http://localhost:8000

yarn add aws-sdk @aws-sdk/client-dynamodb class-validator uuid

aws dynamodb list-tables --endpoint-url http://localhost:8000