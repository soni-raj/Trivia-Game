import boto3
import json

def lambda_handler(event, context):
    body = json.loads(event['body'])
    email = body["email"]
    role = body["role"]
    team = body["team"]

    dynamodb = boto3.client("dynamodb")

    # Search for the team document using the partition key (teamID)
    response = dynamodb.get_item(
        TableName="teams",
        Key={
            "teamID": {"S": team["teamID"]}
        }
    )

    # Check if the team document was found
    if "Item" not in response:
        return {
            "statusCode": 404,
            "body": "Team not found"
        }

    # Get the team document
    team_document = response["Item"]

    # Remove the email from the members array
    if "members" in team_document:
        members = team_document["members"]["M"]
        if email in members:
            members[email]["M"]["role"]["S"] = role

    # Update the team document in DynamoDB
    dynamodb.update_item(
        TableName="teams",
        Key={
            "teamID": {"S": team["teamID"]}
        },
        UpdateExpression="SET #members = :members",
        ExpressionAttributeNames={
            "#members": "members"
        },
        ExpressionAttributeValues={
            ":members": {"M": members}
        }
    )

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
        },
        'body': "Role updated successfully"
    }
