# MinfulnessMini
ELevate your mood

## Contents
* [Overview](overview)
* [Screenshots](#screenshots)
* [Links](#links)
* [Process](#the-process)
* [Built With](#built-with)
* [What I learnt](#what-i-learnt)
* [Continued development](#continued-development)

## Overview
MVP: To create a restful API where you can fetch uplifting quotes to mirror or elevate your mood. Add those you find inspirational and store them in the approriate section.


## Process
Beginning with Disney Ideation to channel and refine ideas. The plan was still pretty loose going into the first MVP as I wanted to be certain I didn't bite off more than I could chew!
Make a restful API capable of serving up quotes.

![image](https://github.com/user-attachments/assets/098ffe3d-a43f-43d9-9f0d-8336ad7b2602)

Looking around for a free API I first came across https://zenquotes.io/ which seemed perfect but required a paid key to access keyword searches. I decided to download a dataset to keep things simple and found a nice set of quotes with keywords on Kaggle. 
Even better it was already in JSON and didnt need formatting.

Remembering how to make the server was more of a struggle than I anticipated. It's amazing what a week and a lot of Christmas pudding will do to you. It did mean though that I got some good practice googling about and even running my plans past chatGPT when I got frustrated. Adding error handling was new for me and somewhat overwhelming as there seem to be many different ways to do it. I mostly went with wrapping try catches around the juicy bits of functions but discovered that there is a lot more to learn about possible problems with ports and I'll have to do a deep dive there sometime as it seemed really interesting.<br/><br/>


![image](https://github.com/user-attachments/assets/ca056c84-0a57-4517-ba8d-4f3d95086286)

I needed to implement a DELETE request function earlier than I had anticipated as the data had repeated quotes. It was an enjoyable challenge to figure out how to do this. I looked through quite a bit of documentation for ways of managing arrays including .filter, .splice, indexOf and map! I finally settled on set() and discovered its friend .has!
I missed a couple of 'awaits' in my first attempt. It took me a while to reason that the empty object the response body was returning was a promise object!

I was adding more and more error handlers and began to wonder if I was overdoing it: checking for errors in functions that were working with data coming from functions I had previously checked! I decided that not only is safe better than sorry but also I was getting good practice in.
