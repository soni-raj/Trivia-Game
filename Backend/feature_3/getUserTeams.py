import boto3
import json
from decimal import Decimal

def decimal_to_int(data):
    if isinstance(data, Decimal):
        return int(data)
    if isinstance(data, dict):
        return {k: decimal_to_int(v) for k, v in data.items()}
    if isinstance(data, list):
        return [decimal_to_int(item) for item in data]
    return data

def lambda_handler(event, context):
    request_data = json.loads(event['body'])
    email = request_data['email']

    dynamodb_resource = boto3.resource('dynamodb')
    table = dynamodb_resource.Table('teams')


    response = table.scan(
        FilterExpression=f'attribute_exists(members.#email)',
        ExpressionAttributeNames={
            '#email': email
        }
    )

    response_with_integers = decimal_to_int(response)

    teams = response_with_integers.pop('Items', [])

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
        },
        'body': json.dumps({'teams': teams})
    }
