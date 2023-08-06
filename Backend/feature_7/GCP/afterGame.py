import requests
from google.cloud import firestore

def store_user(userData):
    user_api_url = "https://1avdpqxrm4.execute-api.us-east-1.amazonaws.com/default/triviaEditUserDetails"
    try:
        response = requests.post(user_api_url, userData)
        if response:
            return "User Updated"
    except Exception as e:
        print(f"Error fetching game data: {e}")
        return None
    
def store_team(teamData):
    team_api_url = "https://j3nw67updb.execute-api.us-east-1.amazonaws.com/update-team"
    try:
        response = requests.post(team_api_url, teamData)
        if response:
            return "Team Updated",200
    except Exception as e:
        print(f"Error fetching game data: {e}")
        return None
    
def get_user(email):
    user_api_url = "https://84aajwise3.execute-api.us-east-1.amazonaws.com/default/triviaGetUserData"
    try:
        response = requests.post(user_api_url, {email:email})
        return response.json()
    except Exception as e:
        print(f"Error fetching game data: {e}")
        return None

def update_team_score(game_id):
    try:
        db = firestore.Client()
        teams_ref = db.collection('games').document(game_id).collection('teams')
        teams = teams_ref.stream()

        highest_score = 0
        highest_score_team_id = None
        
        for team in teams:
            team_data = team.to_dict()
            in_game_score = team_data.get('in_game_score', 0)
            
            if in_game_score > highest_score:
                highest_score = in_game_score
                highest_score_team_id = team.id

        game_ref = db.collection('games').document(game_id)
        game_ref.update({
            'winner': highest_score_team_id,
            'highest_score': highest_score
        })
        
        for team in teams:
            team_id = team.teamID
            team_ref = teams_ref.document(team_id)
            team_data = team.to_dict()
            in_game_score = team_data.get('in_game_score', 0)
            total_points = team_data.get('total_points', 0)
            
            if team_id == highest_score_team_id:
                team_ref.update({
                    'wins': firestore.Increment(1),
                    'total_points': total_points + in_game_score,
                    'games_played': firestore.Increment(1),
                    'done': True
                })
                users_ref = db.collection('games').document(game_id).collection('users')
                users = user_ref.stream()
                for user in users:
                    print(user)
                    if user in team_data.get('members'):
                        user_ref = users_ref.document(user)
                        user_ref.update({
                            'win': True
                        })
            else:
                team_ref.update({
                    'losses': firestore.Increment(1),
                    'total_points': total_points + in_game_score,
                    'games_played': firestore.Increment(1),
                    'done': True
                })
            team_ref = db.collection('games').document(game_id).collection('teams')
            doc_snapshot = team_ref.get()
            if doc_snapshot.exists:
                doc_data = doc_snapshot.to_dict()
                del doc_data['done']
                del doc_data['answeredQuestions']
                del doc_data['in_game_score']
                update_team_score(doc_data)
            
        return {"message": "Team scores updated"}
    except Exception as e:
        print(f"Error updating score: {e}")
        return None

def after_game(request):
    user_email = request.args.get('user_email')
    game_id = request.args.get('game_id')
    team_id = request.args.get('team_id')

    print(user_email, game_id, team_id)
    db = firestore.Client()
    teams_ref = db.collection('games').document(game_id).collection('teams').document(team_id)
    teams_ref = teams_ref.get().to_dict()
    print(teams_ref.get('done'), "team_ref fone")
    if not teams_ref.get('done'):
        print(update_team_score(game_id))
    user_ref = db.collection('games').document(game_id).collection('users').document(user_email)
    user_ref = user_ref.get().to_dict()
    user_data = get_user(user_email)
    print(user_data)
    if user_ref.get('win'):
        print(user_ref.get('win'))
        user_data['total_points'] += user_ref.get('score')
        user_data['games_played'] += 1
        user_data['win_loss'] += 1
    else:
        user_data['total_points'] += user_ref.get('score')
        user_data['games_played'] += 1
        user_data['win_loss'] -= 1
        print(user_data)
    
    store_user(user_data)

    
    if request.method == "OPTIONS":
        headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Max-Age": "3600",
        }
        return {'message': 'Score stored'}, 200, headers

    headers = {"Access-Control-Allow-Origin": "*"}
    return {'message': 'Score stored'}, 200, headers