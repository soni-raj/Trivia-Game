import boto3
import json

dynamodb = boto3.resource('dynamodb')
table_name = 'Game'
table = dynamodb.Table(table_name)

def lambda_handler(event, context):
    try:
        data = event
        game_id = data['game_id']

        with table.batch_writer() as batch:
            batch.delete_item(Key={'game_id': game_id})
        
        return {
            'statusCode': 200,
            'body': json.dumps('Trivia Game deleted successfully!')
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error: {str(e)}')
        }
