from google.cloud import firestore
import requests

def fetch_team_data(team_id):
    team_api_url = "https://h26hqa9ooe.execute-api.us-east-1.amazonaws.com/get-team"
    try:
        response = requests.post(team_api_url, json={"teamID": team_id})
        team_data = response.json()
        return team_data.get('team')[0]
    except Exception as e:
        print(f"Error fetching team data: {e}")
        return None

def join_game(request):
    try:
        user_email = request.args.get('user_email')
        game_id = request.args.get('game_id')
        team_id = request.args.get('team_id')
        print(user_email, game_id, team_id)

        if not user_email or not game_id:
            return 'Error: user_id and game_id parameters are required.', 400

        db = firestore.Client()

        game_ref = db.collection('games').document(game_id).collection('teams')
        team_ref = game_ref.document(team_id)
        team_data_from_response = fetch_team_data(team_id)

        if not team_data_from_response:
            return 'Error: Team data not found.', 404

        team_ref.set(team_data_from_response)
       
        return 'User successfully joined the game.', 200

    except Exception as e:
        return f'Error: {str(e)}', 500
