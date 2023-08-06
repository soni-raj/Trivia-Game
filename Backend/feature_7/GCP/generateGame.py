import requests
from google.cloud import firestore

def fetch_game_data(game_id):
    game_api_url = f"https://a42hfubjdc.execute-api.us-east-1.amazonaws.com/prod/game?game_id={game_id}"
    try:
        response = requests.get(game_api_url)
        game_data = response.json()
        return game_data[0] if game_data else None
    except Exception as e:
        print(f"Error fetching game data: {e}")
        return None

def fetch_questions_data(category, difficulty_level, num_questions):
    questions_api_url = f"https://a42hfubjdc.execute-api.us-east-1.amazonaws.com/prod/questions?category={category}&difficulty_level={difficulty_level}&num_questions={num_questions}"
    try:
        response = requests.get(questions_api_url)
        questions_data = response.json()
        if questions_data:
            return questions_data
        else:
            questions_api_url = f"https://a42hfubjdc.execute-api.us-east-1.amazonaws.com/prod/questions?category={category}&num_questions={num_questions}"
            response = requests.get(questions_api_url)
            questions_data = response.json()
            return questions_data
    except Exception as e:
        print(f"Error fetching questions data: {e}")
        return None

def join_game(game_id, user_email, team_id):
    join_game_url = f"https://us-central1-big-depth-391317.cloudfunctions.net/joinGame?game_id={game_id}&user_email={user_email}&team_id={team_id}"
    try:
        join_game_data = requests.get(join_game_url)
        print(join_game_data, "join data")
        return "Game joined Successfully"
    except Exception as e:
        print(f"Error fetching game data: {e}")
        return None

def store_data(request):
    user_email = request.args.get('user_email')
    game_id = request.args.get('game_id')
    team_id = request.args.get('team_id')

    game_data = fetch_game_data(game_id)
    category = game_data.get("category")
    difficulty_level = game_data.get("difficulty_level")
    num_questions = game_data.get("no_of_questions")
    questions_data = fetch_questions_data(category, difficulty_level, num_questions)

    if game_data and questions_data:
        db = firestore.Client()
        game_ref = db.collection("games").document(game_id)
        game_data["questions"] = questions_data
        game_ref.set(game_data)
        join_game_data = join_game(game_id, user_email, team_id)
        if join_game_data:
            if request.method == "OPTIONS":
                headers = {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET",
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Max-Age": "3600",
                }

                return join_game_data, 204, headers

            headers = {"Access-Control-Allow-Origin": "*"}
            return join_game_data, 204, headers
        else:
             return "Error joining Game."
    else:
        return "Error fetching data or no data received."
