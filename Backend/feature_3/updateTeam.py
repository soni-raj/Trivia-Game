import boto3
import json

def lambda_handler(event, context):
    request_data = json.loads(event['body'])
    team_id = request_data.get('teamID')

    if not team_id:
        return {
            'statusCode': 400,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
            'body': json.dumps({'message': 'Invalid request. Missing teamID attribute.'})
        }


    update_expression_parts = []
    expression_attribute_values = {}
    expression_attribute_names = {}


    if 'losses' in request_data:
        update_expression_parts.append('#L = :l')
        expression_attribute_values[':l'] = {'N': str(request_data['losses'])}
        expression_attribute_names['#L'] = 'losses'
    if 'total_points' in request_data:
        update_expression_parts.append('#TP = :tp')
        expression_attribute_values[':tp'] = {'N': str(request_data['total_points'])}
        expression_attribute_names['#TP'] = 'total_points'
    if 'games_played' in request_data:
        update_expression_parts.append('#GP = :gp')
        expression_attribute_values[':gp'] = {'N': str(request_data['games_played'])}
        expression_attribute_names['#GP'] = 'games_played'
    if 'wins' in request_data:
        update_expression_parts.append('#W = :w')
        expression_attribute_values[':w'] = {'N': str(request_data['wins'])}
        expression_attribute_names['#W'] = 'wins'

    update_expression = 'set ' + ', '.join(update_expression_parts)

    dynamodb_client = boto3.client('dynamodb')

    try:
        response = dynamodb_client.update_item(
            TableName='teams',
            Key={'teamID': {'S': team_id}},
            UpdateExpression=update_expression,
            ExpressionAttributeValues=expression_attribute_values,
            ExpressionAttributeNames=expression_attribute_names,
            ReturnValues='UPDATED_NEW'
        )

        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
            'body': json.dumps({'message': 'Successfully updated team!'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
            'body': json.dumps({'message': 'Error updating the team: ' + str(e)})
        }
