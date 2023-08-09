import json
import boto3

sns_client = boto3.client('sns')

def lambda_handler(event, context):
    body = json.loads(event['body'])
    email = body['email']

    if 'game_name' in body:
        team_id = body['teamID']
        team_name = body['team_name']
        cloud_run_url = body['cloud_run_url']
        game_name = body['game_name']
        send_game_invitation_email(email, team_name, team_id, game_name, cloud_run_url)
    else:
        team_id = body['team']['teamID']
        team_name = body['team']['team_name'].replace(' ', '-')
        send_invitation_email(email, team_name, team_id)

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
        },
        'body': 'Invitation sent successfully'
    }

def send_invitation_email(email, team_name, team_id):
    subject = 'Team Invitation'
    message = f'You have been invited to join {team_name}\n'
    message += 'Please click on ACCEPT or REJECT to indicate your decision.\n'
    message += '\nACCEPT:\n'
    message += f'https://q7mrklt73d.execute-api.us-east-1.amazonaws.com/t1/action?type=accept&email={email}&teamID={team_id}&teamName={team_name}'
    message += '\nREJECT:\n'
    message += f'https://q7mrklt73d.execute-api.us-east-1.amazonaws.com/t1/action?type=reject&email={email}&teamID={team_id}&teamName={team_name}'

    response = sns_client.publish(
        TopicArn='arn:aws:sns:us-east-1:412016756953:team-invitations-topic',
        Message=message,
        Subject=subject,
        MessageAttributes={
            'email': {
                'DataType': 'String',
                'StringValue': email
            }
        }
    )

    print(f"Invitation sent to {email}")

def send_game_invitation_email(email, team_name, team_id, game_name, cloud_run_url):
    subject = 'Game Invitation'
    message = f'You have been invited to join {game_name} by your {team_name} member.\n'
    message += 'Please click on below link to login to TRIVIA GAME\n'
    message += cloud_run_url

    response = sns_client.publish(
        TopicArn='arn:aws:sns:us-east-1:412016756953:team-invitations-topic',
        Message=message,
        Subject=subject,
        MessageAttributes={
            'email': {
                'DataType': 'String',
                'StringValue': email
            }
        }
    )

    print(f"Invitation sent to {email}")

