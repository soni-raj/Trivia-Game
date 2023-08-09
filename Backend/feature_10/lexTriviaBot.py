import json
import boto3

dynamodb = boto3.client('dynamodb')

def validate(metric_type):
    valid_metric_types = ['wins', 'losses', 'played', 'points']
    return metric_type.lower() in valid_metric_types

def get_team_metric(team_name, metric_type):
    if metric_type == "points":
        metric_attribute = "total_points"
    elif metric_type == "played":
        metric_attribute = "games_played"
    else:
        metric_attribute = metric_type


    response = dynamodb.scan(
        TableName='teams',
        FilterExpression='team_name = :team',
        ExpressionAttributeValues={
            ':team': {'S': team_name}
        },
        ProjectionExpression=metric_attribute
    )

    items = response.get('Items', [])
    if items:
        metric_value = items[0].get(metric_attribute, {}).get('N', 'N/A')
        return metric_value
    else:
        return 'Team not found'

def lambda_handler(event, context):
    slots = event['sessionState']['intent']['slots']
    intent = event['sessionState']['intent']['name']
    invocation_source = event['invocationSource']


    if 'metricType' in slots:
        metric_type = slots['metricType']['value']['originalValue'].lower()
        team_name = slots.get('TeamName', {}).get('value', {}).get('originalValue', 'your team')
        is_valid_metric_type = validate(metric_type)

        if invocation_source == 'DialogCodeHook':
            if not is_valid_metric_type:
                response = {
                    "sessionState": {
                        "dialogAction": {
                            'slotToElicit': 'metricType',
                            "type": "ElicitSlot"
                        },
                        "intent": {
                            'name': intent,
                            'slots': slots
                        }
                    },
                    "messages": [
                        {
                            "contentType": "PlainText",
                            "content": f"Invalid metric type for {team_name}. Please choose from wins, losses, played, or points."
                        }
                    ]
                }
                return response

            else:
                response = {
                    "sessionState": {
                        "dialogAction": {
                            "type": "Delegate"
                        },
                        "intent": {
                            'name': intent,
                            'slots': slots
                        }
                    }
                }
                return response

        elif invocation_source == 'FulfillmentCodeHook':
            if is_valid_metric_type:
                metric_value = get_team_metric(team_name, metric_type)
                if metric_value != 'Team not found':
                    response_message = f"Team {team_name} has {metric_value} {metric_type}."
                else:
                    response_message = f"Team {team_name} not found."
            else:
                response_message = f"Invalid metric type for {team_name}. Please choose from wins, losses, played, or points."

            response = {
                "sessionState": {
                    "dialogAction": {
                        "type": "Close"
                    },
                    "intent": {
                        'name': intent,
                        'slots': slots,
                        'state': 'Fulfilled'
                    }
                },
                "messages": [
                    {
                        "contentType": "PlainText",
                        "content": response_message
                    }
                ]
            }
            return response

    else:
        response_message = f"Please provide a metric type for {team_name}."
        response = {
            "sessionState": {
                "dialogAction": {
                    'slotToElicit': 'metricType',
                    "type": "ElicitSlot"
                },
                "intent": {
                    'name': intent,
                    'slots': slots
                }
            },
            "messages": [
                {
                    "contentType": "PlainText",
                    "content": response_message
                }
            ]
        }
        return response