import boto3
import json

dynamodb = boto3.resource('dynamodb')
table_name = 'Game'
table = dynamodb.Table(table_name)

def lambda_handler(event, context):
    try:
        print(event)
        query_params = event.get('queryStringParameters', {})
        if not query_params:
            response = table.scan()
            games = response['Items']
        else:
            game_id = query_params.get('game_id')

            if game_id:
                response = table.get_item(Key={'game_id': game_id})
                if 'Item' in response:
                    games = [response['Item']]
                else:
                    return {
                        'statusCode': 404,
                        'headers': {
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Headers': 'Content-Type',
                            'Access-Control-Allow-Methods': 'GET',
                        },
                        'body': json.dumps('Error: Game not found.')
                    }
            else:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Content-Type',
                        'Access-Control-Allow-Methods': 'GET',
                    },
                    'body': json.dumps('Error: game_id parameter is required.')
                }

        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET',
            },
            'body': json.dumps(games)
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET',
            },
            'body': json.dumps(f'Error: {str(e)}')
        }
