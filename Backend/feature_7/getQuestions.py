import boto3
import json

dynamodb = boto3.resource('dynamodb')
table_name = 'Question'
table = dynamodb.Table(table_name)

def lambda_handler(event, context):
    try:
        query_params = event.get('queryStringParameters', {})
        category = query_params.get('category')
        difficulty_level = query_params.get('difficulty_level')

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

        questions = response['Items']

        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET',
            },
            'body': json.dumps(questions)
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
