# Add your Python code here. E.g.
from microbit import *


def PixelXY(a):
    if a>=200:
        b = 4
    elif a>=50:
        b = 3
    elif a> -50:
        b = 2
    elif a> -200:
        b = 1
    else:
        b = 0
    return(b)

while True:
    x = PixelXY(accelerometer.get_x())
    y = PixelXY(accelerometer.get_y())
    display.clear()
    display.set_pixel(x, y, 9)
    if button_a.is_pressed() :
        a = x*y
        display.set_pixel(a%5, a//5, 9)
        sleep(300)
    if button_b.is_pressed():
        a = x*y
        display.show(a)
        sleep(300)
    
  #------------------이심전심---------------------------------------
  
# Add your Python code here. E.g.
from microbit import *
import radio

radio.on()
radio.config(group = 2)
bt = ''
Rbt = ''

while True:
    if button_a.is_pressed():
        bt = 'A'
        radio.send(bt)
#-----------------------반응속도 혼자---------------------------------------

# Add your Python code here. E.g.
from microbit import *
import random as rd

t = rd.randint(1000, 10000)
while True:
    if running_time() >= t:
        display.show(Image.HEART)
    if button_a.was_pressed():
        if abs(running_time() - t)<= 300:
            display.show(Image.HAPPY)
        else:
            display.show(Image.SAD)
        break

#-----------------------반응속도 둘이---------------------------------------
# Add your Python code here. E.g.
from microbit import *
import radio

radio.on()
radio.config(group = 2)
Rbt = 0

while True:
    if button_a.is_pressed():
        radio.send('A')
        display.show(Image.HEART)
        
    R = radio.receive()
    if R != None:
        Rbt = running_time()
        display.show(Image.HEART)
        
    if button_b.was_pressed():
        term = abs(running_time() - Rbt)
        if term <= 300:
            display.show(Image.HAPPY)
        else:
            display.show(Image.SAD)
