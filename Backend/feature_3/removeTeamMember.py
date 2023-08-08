import boto3
import json

def lambda_handler(event, context):

    body = json.loads(event['body'])
    email = body["email"]
    team = body["team"]

    dynamodb = boto3.client("dynamodb")

    response = dynamodb.get_item(
        TableName="teams",
        Key={
            "teamID": {"S": team["teamID"]}
        }
    )

    if "Item" not in response:
        return {
            "statusCode": 404,
            "body": "Team not found"
        }

    team_document = response["Item"]

    # Remove the email from the members array
    if "members" in team_document:
        members = team_document["members"]["M"]
        if email in members:
            del members[email]

            # Check if the updated members array is empty
            if not members:
                # Delete the entire document from DynamoDB
                dynamodb.delete_item(
                    TableName="teams",
                    Key={
                        "teamID": {"S": team["teamID"]}
                    }
                )
            else:
                # Update the team document in DynamoDB with the updated members
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
        'body': 'Email removed successfully'
    }
