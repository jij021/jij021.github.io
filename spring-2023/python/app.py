from flask import Flask, render_template, request
import os
from os import listdir

app = Flask(__name__)

folder_dir_selfies = r"C:\Users\jan7j\Documents\College\GITHUB\jij021.github.io\spring-2023\python\static\images\selfies"
folder_dir_food = r"C:\Users\jan7j\Documents\College\GITHUB\jij021.github.io\spring-2023\python\static\images\food"
folder_dir_places = r"C:\Users\jan7j\Documents\College\GITHUB\jij021.github.io\spring-2023\python\static\images\places"
folder_dir_polaroids = r"C:\Users\jan7j\Documents\College\GITHUB\jij021.github.io\spring-2023\python\static\images\polaroids"

# for when I break the lists holding the images into 3 lists, then i can make 3 columns with them
# takes in 'lst' (list of data) and 'n' (number to be broken into)
def chunks(lst, n):
    # for i starting at 0, take the length of the list and turn them into n number of separate lists
    for i in range(0, len(lst), n):
        # return a list holding the items broken up into chunks around the same size
        yield lst[i:i + n]

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/selfies')
def selfies():
    # put our images in a list
    my_images = []
    # get the images from the directory
    for image in os.listdir(folder_dir_selfies):
        # if the image ends with these file names, add them into our list (we only want images)
        if (image.endswith(".png") or image.endswith(".jpg") or image.endswith(".jpeg")):
            my_images.append(image)
    
    # break the images_selfies list into chunks of 3, which is also put into a new list
    my_images_chunks = list(chunks(my_images, 3))
    # how many rows i need
    num_of_rows = len(my_images_chunks)
    # repeat this for every page
    
    return render_template('selfies.html', images = my_images_chunks, length = num_of_rows)

@app.route('/food')
def food():
    my_images = []
    for image in os.listdir(folder_dir_food):
        if (image.endswith(".png") or image.endswith(".jpg") or image.endswith(".jpeg")):
            my_images.append(image)
    
    my_images_chunks = list(chunks(my_images, 3))
    num_of_rows = len(my_images_chunks)
    return render_template('food.html', images = my_images_chunks, length = num_of_rows)

@app.route('/places')
def places():
    my_images = []
    for image in os.listdir(folder_dir_places):
        if (image.endswith(".png") or image.endswith(".jpg") or image.endswith(".jpeg")):
            my_images.append(image)
    
    my_images_chunks = list(chunks(my_images, 3))
    num_of_rows = len(my_images_chunks)
    return render_template('places.html', images = my_images_chunks, length = num_of_rows)

@app.route('/polaroids')
def polaroids():
    my_images = []
    for image in os.listdir(folder_dir_polaroids):
        if (image.endswith(".png") or image.endswith(".jpg") or image.endswith(".jpeg")):
            my_images.append(image)
    
    my_images_chunks = list(chunks(my_images, 3))
    num_of_rows = len(my_images_chunks)
    return render_template('polaroids.html', images = my_images_chunks, length = num_of_rows)


if __name__ == '__main__':
    app.run(debug = True)