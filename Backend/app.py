from flask import Flask, jsonify, request
from flask_cors import CORS
from flask import send_file
import joblib as jb
import subprocess

app = Flask(__name__)
CORS(app)


@app.route('/dashboard', methods=['POST'])
def dashboard():
        file=request.files['file'].read()
        period=request.form['period']
        count=request.form['count']
        f=open("sales.csv",'wb')
        f.write(file)
        f.close()
        p=subprocess.Popen("python plot.py "+period+" "+str(count),shell=True)
        p.wait()
        return "{code:'success'}"

@app.route('/getoutput',methods=['GET','POST'])
def getoutput():
     return send_file('temp.png',mimetype='image/png')

if __name__ == "__main__":
    app.run(debug=True)