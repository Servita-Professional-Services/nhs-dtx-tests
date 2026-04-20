import {DynamoDBClient, GetItemCommand} from '@aws-sdk/client-dynamodb';
import {unmarshall} from '@aws-sdk/util-dynamodb';

const client = new DynamoDBClient({
    region: process.env.AWS_REGION ?? 'eu-west-2',
});

const TABLE_NAME = process.env.DYNAMO_TABLE_NAME ?? 'dtx-dev-dtx-batches';

export async function getBatchByCorrelationId(correlationId: string): Promise<Record<string, unknown> | null> {
    const result = await client.send(
        new GetItemCommand({
            TableName: TABLE_NAME,
            Key: {
                correlationId: {S: correlationId},
            },
        }),
    );

    if (!result.Item) {
        return null;
    }

    return unmarshall(result.Item);
}
