import boto3
import json
import uuid

dynamodb = boto3.resource('dynamodb')
table_name = 'Question'
table = dynamodb.Table(table_name)

def add_single_question(question):
    question_id = str(uuid.uuid4())
    category = question['category']
    difficulty_level = question['difficulty_level']
    question_text = question['question']
    options = question['options']
    correct_answer = question['correct_answer']

    table.put_item(
        Item={
            'question_id': question_id,
            'category': category,
            'difficulty_level': difficulty_level,
            'question': question_text,
            'options': options,
            'correct_answer': correct_answer
        }
    )

def lambda_handler(event, context):
    try:
        print(event)
        data = event
        
        if 'questions' in data:
            questions = data['questions']
            with table.batch_writer() as batch:
                for question in questions:
                    add_single_question(question)
        else:
            question = data['question']
            add_single_question(question)
        
        return {
            'statusCode': 200,
            'body': json.dumps('Trivia questions added successfully!')
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error: {str(e)}')
        }
