import boto3
import json

dynamodb = boto3.resource('dynamodb')
table_name = 'Question'
table = dynamodb.Table(table_name)

def lambda_handler(event, context):
    try:
        data = event
        question = data['question']
        
        question_id = question['question_id']
    
        response = table.get_item(Key={'question_id': question_id})
        item = response.get('Item')
        
        if not item:
            return {
                'statusCode': 404,
                'body': json.dumps(f'Trivia question with ID {question_id} not found!')
            }
    
        item['category'] = question['category']
        item['difficulty_level'] = question['difficulty_level']
        item['question'] = question['question']
        item['options'] = question['options']
        item['correct_answer'] = question['correct_answer']
        
        table.put_item(Item=item)
        
        return {
            'statusCode': 200,
            'body': json.dumps('Trivia questions updated successfully!')
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error: {str(e)}')
        }
