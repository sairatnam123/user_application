from flask import Flask, request,render_template,redirect,url_for
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)
# Database connection
def create_connection():
    connection = None
    try:
        connection = mysql.connector.connect(
            host="localhost",
            user="root",
            password="*****",
            database="user_management"
        )
    except Error as e:
        print(f"Error: '{e}'")
    return connection
@app.route('/')
def index():
    connection = create_connection()
    cursor = connection.cursor(dictionary=True)

    query = "SELECT * FROM users"
    cursor.execute(query)
    users = cursor.fetchall()

    cursor.close()
    connection.close()
    return render_template('index.html',users=users)



# Create a new user
@app.route('/user', methods=['POST','GET'])
def add_user():
    if request.method == 'POST':
        first_name = request.form['firstName']
        last_name = request.form['lastName']
        phone_number = request.form['phoneNumber']
        email = request.form['email']
        address = request.form['address']

        connection = create_connection()
        cursor = connection.cursor()

        query = """
        INSERT INTO users (first_name, last_name, phone_number, email, address)
        VALUES (%s, %s, %s, %s, %s)
        """
        try:
            cursor.execute(query, (first_name, last_name, phone_number, email, address))
            connection.commit()
        except Error as e:
            print ("error", str(e))
        finally:
            cursor.close()
            connection.close()
        return redirect(url_for('index'))
    return render_template('user.html')

@app.route('/edit/<int:user_id>', methods=['GET'])
def edit_user(user_id):
    # Fetch user details to pre-fill the form
    connection = create_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
    user = cursor.fetchone()
    cursor.close()
    return render_template('update.html', user=user)

@app.route('/update/<int:user_id>', methods=['POST'])
def update_user(user_id):
    # Get form data
    first_name = request.form['firstName']
    last_name = request.form['lastName']
    phone_number = request.form['phoneNumber']
    email = request.form['email']
    address = request.form['address']

    connection = create_connection()
    cursor = connection.cursor()

    query = """
    UPDATE users SET first_name = %s, last_name = %s, phone_number = %s, email = %s, address = %s
    WHERE id = %s
    """
    try:
        cursor.execute(query, (first_name, last_name, phone_number, email, address,user_id))
        connection.commit()    
    except Error as e:
        pass
    finally:
        cursor.close()
        connection.close()
    return redirect(url_for('index'))

# Delete a user
@app.route('/delete/<int:id>', methods=['DELETE','GET'])
def delete_user(id):
    connection = create_connection()
    cursor = connection.cursor()

    query = "DELETE FROM users WHERE id = %s"
    try:
        cursor.execute(query, (id,))
        connection.commit()
    except Error as e:
        pass
    finally:
        cursor.close()
        connection.close()

    return redirect(url_for('index'))

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
