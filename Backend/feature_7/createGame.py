import boto3
import json
import uuid

dynamodb = boto3.resource('dynamodb')
table_name = 'Game'
table = dynamodb.Table(table_name)

def add_single_game(game):
    game_id = str(uuid.uuid4())
    category = game['category']
    difficulty_level = game['difficulty_level']
    name = game['name']
    time_frame = game['time_frame']
    no_of_questions = game['no_of_questions']
    datetime = game['datetime']
    description = game['description']

    table.put_item(
        Item={
            'game_id': game_id,
            'category': category,
            'difficulty_level': difficulty_level,
            'name': name,
            'time_frame': time_frame,
            'no_of_questions': no_of_questions,
            'datetime': datetime,
            'description': description,
        }
    )

def lambda_handler(event, context):
    try:
        print(event)
        data = event
        
        if 'games' in data:
            games = data['games']
            with table.batch_writer() as batch:
                for game in games:
                    add_single_game(game)
        else:
            game = data['game']
            add_single_game(game)
        
        return {
            'statusCode': 200,
            'body': json.dumps('Trivia game added successfully!')
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error: {str(e)}')
        }
