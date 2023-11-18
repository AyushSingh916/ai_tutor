# backend/app.py
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/run-python-script')
def run_python_script():
    # Your Python script logic goes here
    result = {'output': 'Hello from Python!'}
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
