from google.cloud import firestore
from flask import jsonify

def addUserToGame(request):
    try:
        user_email = request.args.get('user_email')
        game_id = request.args.get('game_id')
        print(user_email, game_id)

        if not user_email or not game_id:
            return jsonify({'error': 'user_email and game_id parameters are required'}), 400

        db = firestore.Client()

        game_ref = db.collection('games').document(game_id).collection('users')
        user_ref = game_ref.document(user_email)
        user_data = {
            'user_email': user_email,
            'score': 0
        }
        user_ref.set(user_data)
        if request.method == "OPTIONS":
            headers = {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Max-Age": "3600",
            }

            return jsonify({'message': 'User successfully joined the game'}), 200, headers

        headers = {"Access-Control-Allow-Origin": "*"}
        return jsonify({'message': 'User successfully joined the game'}), 200, headers

    except Exception as e:
        return jsonify({'error': str(e)}), 500
