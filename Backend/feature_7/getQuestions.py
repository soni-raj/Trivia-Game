import boto3
import json
import random

dynamodb = boto3.resource('dynamodb')
table_name = 'Question'
table = dynamodb.Table(table_name)

def lambda_handler(event, context):
    try:
        print(event)
        query_params = event.get('queryStringParameters', {})
        if not query_params:
            query_params = {}
        category = query_params.get('category')
        difficulty_level = query_params.get('difficulty_level')
        num_questions = int(query_params.get('num_questions', 5))

        filter_expression = None
        expression_attribute_values = {}
        
        if category:
            filter_expression = 'category = :cat'
            expression_attribute_values[':cat'] = category
        
        if difficulty_level:
            if filter_expression:
                filter_expression += ' AND difficulty_level = :diff'
            else:
                filter_expression = 'difficulty_level = :diff'
            expression_attribute_values[':diff'] = difficulty_level

        if filter_expression:
            response = table.scan(
                FilterExpression=filter_expression,
                ExpressionAttributeValues=expression_attribute_values
            )
        else:
            response = table.scan()

        all_questions = response['Items']
        print(all_questions)
        num_questions = min(num_questions, len(all_questions))
        selected_questions = random.sample(all_questions, num_questions)
        print(selected_questions)

        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET',
            },
            'body': json.dumps(selected_questions)
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
