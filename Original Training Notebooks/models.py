## TODO: define the convolutional neural network architecture

import torch
from torch.autograd import Variable
import torch.nn as nn
import torch.nn.functional as F
# can use the below import should you choose to initialize the weights of your Net
import torch.nn.init as I


class Net(nn.Module):

    def __init__(self):
        super(Net, self).__init__()
        
        ## TODO: Define all the layers of this CNN, the only requirements are:
        ## 1. This network takes in a square (same width and height), grayscale image as input
        ## 2. It ends with a linear layer that represents the keypoints
        ## it's suggested that you make this last layer output 136 values, 2 for each of the 68 keypoint (x, y) pairs
        
        self.conv1 = nn.Conv2d(1,32,5)
        # O/P = (224-5)/1 + 1 = 220, (32,220,220)
        
        self.pool1 = nn.MaxPool2d(2,2)
        # O/P = (W - F)/S + 1 = (220 - 2)/2 + 1 = (32,110,110)
        
        self.conv2 = nn.Conv2d(32,64,3)
        # O/P = (110-3)/1 + 1 = 108, (64,108,108)
        
        self.pool2 = nn.MaxPool2d(2,2)
        # O/P = (W - F)/S + 1 = (108 - 2)/2 + 1 = (64,54,54)

        self.conv3 = nn.Conv2d(64,128,3)
        # O/P = (54-3)/1 + 1 = 52, (64,52,52)
        
        self.pool3 = nn.MaxPool2d(2,2)
        # O/P = (W - F)/S + 1 = (52 - 2)/2 + 1 = (128,26,26)

        self.conv4 = nn.Conv2d(128,256,3)
        # O/P = (26-3)/1 + 1 = 24, (64,24,24)
        
        self.pool4 = nn.MaxPool2d(2,2)
        # O/P = (W - F)/S + 1 = (24 - 2)/2 + 1 = (256,12,12)
                                      
        self.fc1 = nn.Linear(256*12*12,1024)
        self.fc2 = nn.Linear(1024,512)
        self.fc3 = nn.Linear(512,136)

        self.conv1_drop = nn.Dropout(p = 0.5)
        self.conv2_drop = nn.Dropout(p = 0.4)
        self.conv3_drop = nn.Dropout(p = 0.3)
        self.conv4_drop = nn.Dropout(p = 0.2)

        self.fc1_drop = nn.Dropout(p = 0.4)
        self.fc2_drop = nn.Dropout(p = 0.2)
        
        
    def forward(self, x):
        ## TODO: Define the feedforward behavior of this model
        ## x is the input image and, as an example, here you may choose to include a pool/conv step:
        ## x = self.pool(F.relu(self.conv1(x)))
        x = self.conv1_drop(self.pool1(F.relu(self.conv1(x))))
        x = self.conv2_drop(self.pool2(F.relu(self.conv2(x))))
        x = self.conv3_drop(self.pool3(F.relu(self.conv3(x))))
        x = self.conv4_drop(self.pool4(F.relu(self.conv4(x))))
        
        x = x.view(x.size(0),-1)
        
        x = self.fc1_drop(F.relu(self.fc1(x)))
        x = self.fc2_drop(F.relu(self.fc2(x)))
        x = self.fc3(x)
        return x
