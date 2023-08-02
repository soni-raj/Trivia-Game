import boto3
import json

dynamodb = boto3.resource('dynamodb')
table_name = 'Game'
table = dynamodb.Table(table_name)

def lambda_handler(event, context):
    try:
        data = event
        game = data['game']
        
        game_id = game['game_id']
    
        response = table.get_item(Key={'game_id': game_id})
        item = response.get('Item')
        
        if not item:
            return {
                'statusCode': 404,
                'body': json.dumps(f'Trivia Game with ID {game_id} not found!')
            }
    
        item['category'] = game['category']
        item['difficulty_level'] = game['difficulty_level']
        item['name'] = game['name']
        item['time_frame'] = game['time_frame']
        item['no_of_questions'] = game['no_of_questions']
        item['datetime'] = game['datetime']
        item['description'] = game['description']
        
        table.put_item(Item=item)
        
        return {
            'statusCode': 200,
            'body': json.dumps('Trivia game updated successfully!')
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error: {str(e)}')
        }
