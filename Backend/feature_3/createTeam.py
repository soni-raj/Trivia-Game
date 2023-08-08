import json
import random
import string
import boto3
import uuid
import openai

dynamodb = boto3.client('dynamodb')
openai.api_key = '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'


def generate_fantasy_team_name():
    prompt = "Generate a random team name using fantasy words and quizz words for a trivia quizz game."
    response = openai.Completion.create(
        engine='text-davinci-003',
        prompt=prompt,
        temperature=0.8,
        max_tokens=32,
        n=1,
        stop=None,
        timeout=10
    )
    return response.choices[0].text.strip()



def lambda_handler(event, context):
    # Retrieve the email from the JSON request
    request_body = json.loads(event['body'])
    email = request_body['email']


    # Generate a random fantasy team name
    #'hardcodedname' + str(random.randint(0, 100))
    #team_name = 'hardcodedname' + str(random.randint(0, 100))
    team_name = generate_fantasy_team_name()

    # Generate a random team ID UUID
    team_id = str(uuid.uuid4())

    # Create a new document for the team in DynamoDB
    team_item = {
        "teamID": {"S": team_id},
        "games_played": {"N": "0"},
        "losses": {"N": "0"},
        "members": {
            "M": {
                email: {
                    "M": {
                        "role": {"S": "admin"}
                    }
                }
            }
        },
        "team_name": {"S": team_name},
        "total_points": {"N": "0"},
        "wins": {"N": "0"}
    }

    # Store the new document in DynamoDB
    dynamodb.put_item(TableName='teams', Item=team_item)

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
        },
        'body': json.dumps({'team_name': team_name})  # Return team_name in the response body
    }
