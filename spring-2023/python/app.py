from flask import Flask, render_template, request
import os
from os import listdir

app = Flask(__name__)

folder_dir_selfies = r"C:\Users\jan7j\Documents\College\3rd year\spring\python\JaniceJi_Python_FinalProject\static\images\selfies"
folder_dir_food = r"C:\Users\jan7j\Documents\College\3rd year\spring\python\JaniceJi_Python_FinalProject\static\images\food"
folder_dir_places = r"C:\Users\jan7j\Documents\College\3rd year\spring\python\JaniceJi_Python_FinalProject\static\images\places"
folder_dir_polaroids = r"C:\Users\jan7j\Documents\College\3rd year\spring\python\JaniceJi_Python_FinalProject\static\images\polaroids"

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/selfies')
def selfies():
    images_selfies = []
    for image in os.listdir(folder_dir_selfies):
        if (image.endswith(".png") or image.endswith(".jpg") or image.endswith(".jpeg")):
            images_selfies.append(image)
    
    return render_template('selfies.html', images = images_selfies)

@app.route('/food')
def food():
    return render_template('food.html')

@app.route('/places')
def places():
    return render_template('places.html')

@app.route('/polaroids')
def polaroids():
    return render_template('polaroids.html')


if __name__ == '__main__':
    app.run(debug = True)