#과제5.py
# Add your Python code here. E.g.
from microbit import *


while True:
    if button_a.was_pressed():
        start = running_time()
        display.show(Image.HEART)
    elif button_b_was_pressed():
        end = running_time()
        term = (end-start)
        if term == 10:
            display.show(Image.SMILE)
        else:
            display.scroll(term, loop=True)
#과제6.py
# Add your Python code here. E.g.
from microbit import *


a1 = Image("09000:" "09000:" "09000:" "99999:" "09000")
a2 = Image("00000:" "09990:" "09990:" "09990:" "00000")
a3 = Image("99999:" "90009:" "90009:" "90009:" "99999")
a = [a1, a2, a3]

while True:
    i = temperature()
    i=i%3
    display.show(a[i])
    
#과제7.py
from microbit import *
import random as rd
x = y = 0 
while True :
    if pin0.is_touched() :
        x=rd.randint(0,4)
        y=rd.randint(0,4)
    display.clear() 
    display.set_pixel(x, y, 9) 
    sleep(300)
