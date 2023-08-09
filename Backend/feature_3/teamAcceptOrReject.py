import json
import boto3

dynamodb = boto3.client('dynamodb')

def lambda_handler(event, context):
    query_params = event['queryStringParameters']
    email = query_params.get('email')
    action_type = query_params.get('type')
    team_id = query_params.get('teamID')
    team_name = query_params.get('teamName')

    if action_type == 'accept':
        # Handle action 1
        print(f"accept performed by {email} {team_name}")
        response_message = f'Successfully accepted the team invitation to {team_name}. You can close this page.'
        add_member_to_team(email, team_id, 'player')
    elif action_type == 'reject':
        # Handle action 2
        print(f"reject performed by {email} {team_id}")
        response_message = f'Successfully declined the team invitation to {team_name}. You can close this page.'

    html_response = f'''
        <html>
        <head>
            <title>Response Page</title>
        </head>
        <body>
            <div style="display: flex; align-items: center; justify-content: center; height: 100vh;">
                <h1>{response_message}</h1>
            </div>
        </body>
        </html>
    '''

    return {
        'statusCode': 200,
        'body': html_response,
        'headers': {
            'Content-Type': 'text/html',
        }
    }

def add_member_to_team(email, team_id, role):
    response = dynamodb.update_item(
        TableName='teams',
        Key={
            'teamID': {'S': team_id}
        },
        UpdateExpression='SET members.#email = :member',
        ExpressionAttributeNames={
            '#email': email
        },
        ExpressionAttributeValues={
            ':member': {
                'M': {
                    'role': {'S': role}
                }
            }
        }
    )

    print(f"Added member {email} to team {team_id} with role {role}")
