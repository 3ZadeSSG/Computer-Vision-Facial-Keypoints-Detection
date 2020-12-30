<img src="https://img.shields.io/badge/python%20-%2314354C.svg?&style=for-the-badge&logo=python&logoColor=white"/><img src="https://img.shields.io/badge/PyTorch%20-%23EE4C2C.svg?&style=for-the-badge&logo=PyTorch&logoColor=white" /><img src="https://img.shields.io/badge/node.js%20-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white"/>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/3ZadeSSG/Computer-Vision-Facial-Keypoints-Detection/blob/master/LICENSE)

# Facial Keypoint Detection

## 1. Project Overview

This project focuses on Computer Vision for creating a facial keypoint detection system. 
* It uses Haar Cascade to detect face boundaries in a RGB image.
* After that a "Convolutional Neural Network (CNN)" is applied to generate facial keypoint locations. 
* Finally translation methods are used to plot those keypoints into original full resolution image.
* `Facial Keypoints Detection Model with GPU Training Support.ipynb` Notebook contains all code from start to end for data visualization, network architecture definition and training, generation of results.
* `Node.js` is used to create API for serving model for Web Apps. A Single page web app is located in `Node.js_Server`
* Application takes images and returns mapped keypoints.

### Example

* First Stage

<img src="https://github.com/3ZadeSSG/Computer-Vision-Facial-Keypoints-Detection/blob/master/Original%20Training%20Notebooks/images/sample_plot.png">

* Second Stage

<img src="https://github.com/3ZadeSSG/Computer-Vision-Facial-Keypoints-Detection/blob/master/Original%20Training%20Notebooks/images/sample_plot_gray.png"><img src="https://github.com/3ZadeSSG/Computer-Vision-Facial-Keypoints-Detection/blob/master/Original%20Training%20Notebooks/images/sample_plot_rgb.png">

* Web Application Example
<img src="https://github.com/3ZadeSSG/Computer-Vision-Facial-Keypoints-Detection/blob/master/Node.js_Server/screenshots/screenshot1.png">


## 2. About "Original Training Notebooks"

__Notebook 1__ : Loading and Visualizing the Facial Keypoint Data

__Notebook 2__ : Defining and Training a Convolutional Neural Network (CNN) to Predict Facial Keypoints

__Notebook 3__ : Facial Keypoint Detection Using Haar Cascades and your Trained CNN

__Notebook 4__ : Fun Filters and Keypoint Uses


### Setup

Install a few required pip packages, which are specified in the requirements text file (including OpenCV).
```
pip install -r requirements.txt
```


### Data

All of the data is in the subdirectory `Original Training Notebooks/data`.


## 3. Running Node.js Application

  Implemented Node.js Application works by creating a python child process for facial keypoints mapping.
  
  1. Navigate to `Node.js_Server`
  2. Place the trained pytorch model's checkpoint file `checkpoint.pth` to `python_models/saved_models` folder.
  4. In case checkpoint name is not `checkpoint.pth` , rename the file name in `CNN_MODEL_CHECKPOINT = "python_models/saved_models/checkpoint.pth"` line of `python_models/model.py`
  5. Run following commands
     ```
     npm install                      (This installs Node.js dependencies)
     pip install -r requirements.txt  (If python packages haven't been already installed from project root)
     npm start
     ```
  6. To test it on other devices on local network
     ```
     node app.js <your_ip>:8000
     ```
     Example
     ```
     node app.js 192.168.32.134:8000
     ```
     
 LICENSE: This project is licensed under the terms of the MIT license.
 
 
 #### Source Repo for starter code:
 
 The project's root repo is : https://github.com/udacity/P1_Facial_Keypoints
 
 Due to limits of not being able to make a forked repo private, it has to follow these stpes: https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/duplicating-a-repository
 
 
 
 
 
     
