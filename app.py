from flask import Flask, request, jsonify,render_template,redirect,url_for
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)

@app.route('/')
@app.route('/users')
def index():
    return render_template('index.html')

# Database connection
def create_connection():
    connection = None
    try:
        connection = mysql.connector.connect(
            host="localhost",
            user="root",
            password="Sai@12345",
            database="user_management"
        )
    except Error as e:
        print(f"Error: '{e}'")
    return connection

# Create a new user
@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    print(data)
    first_name = data['first_name']
    last_name = data['last_name']
    phone_number = data['phone_number']
    email = data['email']
    address = data['address']

    connection = create_connection()
    print(connection)
    cursor = connection.cursor()

    query = """
    INSERT INTO users (first_name, last_name, phone_number, email, address)
    VALUES (%s, %s, %s, %s, %s)
    """
    try:
        cursor.execute(query, (first_name, last_name, phone_number, email, address))
        connection.commit()
        response = {"message": "User created successfully", "user_id": cursor.lastrowid}
    except Error as e:
        response = {"error": str(e)}
    finally:
        cursor.close()
        connection.close()

    return jsonify(response)

# Get all users
@app.route('/users', methods=['GET'])
def get_users():
    connection = create_connection()
    cursor = connection.cursor(dictionary=True)

    query = "SELECT * FROM users"
    cursor.execute(query)
    users = cursor.fetchall()

    cursor.close()
    connection.close()

    return jsonify(users)

# Update a user
@app.route('/users/<int:id>', methods=['PUT'])
def update_user(id):
    data = request.get_json()
    first_name = data['first_name']
    last_name = data['last_name']
    phone_number = data['phone_number']
    email = data['email']
    address = data['address']

    connection = create_connection()
    cursor = connection.cursor()

    query = """
    UPDATE users SET first_name = %s, last_name = %s, phone_number = %s, email = %s, address = %s
    WHERE id = %s
    """
    try:
        cursor.execute(query, (first_name, last_name, phone_number, email, address, id))
        connection.commit()
        response = {"message": "User updated successfully"}
    except Error as e:
        response = {"error": str(e)}
    finally:
        cursor.close()
        connection.close()

    return jsonify(response)

# Delete a user
@app.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    connection = create_connection()
    cursor = connection.cursor()

    query = "DELETE FROM users WHERE id = %s"
    try:
        cursor.execute(query, (id,))
        connection.commit()
        response = {"message": "User deleted successfully"}
    except Error as e:
        response = {"error": str(e)}
    finally:
        cursor.close()
        connection.close()

    return jsonify(response)

@app.route('/submit', methods=['POST'])
def submit_form():
    first_name = request.form.get('firstName')
    last_name = request.form.get('lastName')
    email = request.form.get('email')

    # Process the form data (e.g., save to database)
    print(f"Received: {first_name} {last_name}, Email: {email}")

    return redirect(url_for('index')) 

if __name__ == "__main__":
    app.run(debug=True)
