import boto3
import json

dynamodb = boto3.resource('dynamodb')
table_name = 'Question'
table = dynamodb.Table(table_name)

def lambda_handler(event, context):
    try:
        data = event
        question_id = data['question_id']

        with table.batch_writer() as batch:
            batch.delete_item(Key={'question_id': question_id})
        
        return {
            'statusCode': 200,
            'body': json.dumps('Trivia question deleted successfully!')
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error: {str(e)}')
        }
