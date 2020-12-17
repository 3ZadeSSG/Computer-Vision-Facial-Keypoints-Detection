<img src="https://img.shields.io/badge/python%20-%2314354C.svg?&style=for-the-badge&logo=python&logoColor=white"/><img src="https://img.shields.io/badge/PyTorch%20-%23EE4C2C.svg?&style=for-the-badge&logo=PyTorch&logoColor=white" /><img src="https://img.shields.io/badge/node.js%20-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white"/>

# Facial Keypoint Detection

## 1. Project Overview

This project focuses on Computer Vision for creating a facial keypoint detection system. 
* It uses a Haar Cascade to detection face boundaries in a RGB image.
* After that a "Convolutional Neural Network (CNN)" is applied to generate facial keypoint locations. 
* Finally generate translation methods is used to plot those keypoints into original full resolution image.

### Example

* First Stage

<img src="https://github.com/3ZadeSSG/Computer-Vision-Facial-Keypoints-Detection/blob/master/Original%20Training%20Notebooks/images/sample_plot.png">

* Second Stage

<img src="https://github.com/3ZadeSSG/Computer-Vision-Facial-Keypoints-Detection/blob/master/Original%20Training%20Notebooks/images/sample_plot_gray.png"><img src="https://github.com/3ZadeSSG/Computer-Vision-Facial-Keypoints-Detection/blob/master/Original%20Training%20Notebooks/images/sample_plot_rgb.png">


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


LICENSE: This project is licensed under the terms of the MIT license.
